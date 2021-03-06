define(['pv', 'spv', 'app_serv', '../invstg', '../comd', 'js/LfmAuth'],
function(pv, spv, app_serv,  invstg, comd, LfmAuth) {
"use strict";
var localize = app_serv.localize;
var app_env = app_serv.app_env;
var pvState = pv.state;

var struserSuggest = spv.inh(invstg.BaseSuggest, {
	init: function(self, wrap) {
		var user = wrap.user;
		self.mo = wrap.mo;
		self.row = wrap.row;
		self.user_id = user.id;
		self.photo = user.photo;
		self.online = self.online;
		//self.name = user.name;
		self.text_title = user.first_name + " " + user.last_name;
		self.updateManyStates({
			photo: user.photo,
			text_title: self.text_title
		});
	}
}, {
	valueOf: function(){
		return this.user_id;
	},
	onView: function(){
		this.mo.postToVKWall(this.user_id);
		this.row.hide();
	}
});

var VKLoginFSearch = spv.inh(comd.VkLoginB, {}, {
	config: {
		desc:  app_env.vkontakte ? localize('to-find-vk-friends') : localize("to-post-and-find-vk"),
		open_opts: {settings_bits: 2}
	}
});



var StrusersRSSection = spv.inh(invstg.SearchSection, {
	init: function(self) {
		self.mo = self.map_parent.mo;
		self.rpl = self.map_parent.map_parent;

		self.updateManyStates({
			vk_env: !!app_env.vkontakte,
			has_vk_api: !!self.app.vk_api,
			vk_opts: !!app_env.vkontakte && self.app._url.api_settings
		});

		self.app.on("vk-api", function(api) {
			pv.update(self, "has_vk_api", !!api);
		});

		if (app_env.vkontakte) {
			self.app.vk_auth.on('settings-change', function(vk_opts) {
				pv.update(self, 'vk_opts', vk_opts);
			});
		}

		var cu_info = self.app.s.getInfo('vk');
		if (cu_info){
			if (cu_info.photo){
				pv.update(self, "own_photo", cu_info.photo);
			}
		} else {
			self.app.s.once("info-change.vk", function(cu_info) {
				if (cu_info.photo){
					pv.update(self, "own_photo", cu_info.photo);
				}
			});
		}
	}
}, {
	resItem: struserSuggest,
	model_name: "section-vk-users",
	'compx-can_searchf_vkopt': [
		['vk_opts'],
		function(vk_opts) {
			return (vk_opts & 2) * 1;
		}
	],
	'compx-can_post_to_own_wall': [
		['vk_env', 'has_vk_api'],
		function(vk_env, has_vk_api) {
			return vk_env || has_vk_api;
		}
	],
	'compx-can_search_friends': [
		['vk_env', 'has_vk_api', 'can_searchf_vkopt'],
		function(vk_env, has_vk_api, can_searchf_vkopt) {
			if (vk_env) {
				return !!can_searchf_vkopt;
			} else {
				return !!has_vk_api;
			}
		}
	],
	'compx-needs_vk_auth': [
		['can_search_friends'],
		function(can_search_friends) {
			return !can_search_friends;
		}
	],
	//desc: improve ?
	'nest-vk_auth': [VKLoginFSearch, false, 'needs_vk_auth'],
	'stch-can_search_friends': function(target, state) {
		if (state){
			target.searchByQuery(pvState(target, 'query'));
		}
	},
	searchByQuery: function(query) {
		this.changeQuery(query);
		var _this = this;
		this.app
			.once("vk-friends.share-row", function(list){
				_this.handleVKFriendsSearch(list);
			}, {exlusive: true})
			.getVKFriends();
	},
	handleVKFriendsSearch: function(list){
		var query = this.state('query');
		var r = (query ? spv.searchInArray(list, query, ["first_name", "last_name"]) : list);
		if (r.length){
			r = r.concat();
			for (var i = 0; i < r.length; i++) {
				r[i] = {
					mo: this.mo,
					user: r[i],
					row: this.rpl
				};
			}
		}

		this.appendResults(r, true);
	},
	postToVKWall: function() {
		this.mo.postToVKWall();
	}

});






var LFMUserSuggest = spv.inh(invstg.BaseSuggest, {
	init: function(target, params) {
		var user = params.user;
		target.app = params.app;
		target.mo = params.mo;
		target.row = params.row;

		target.userid = user.state('userid');
		target.text_title = target.userid;
		target.updateManyStates({
			selected_image: user.state('selected_image'),
			text_title: target.text_title
		});
	}
}, {
	valueOf: function(){
		return this.userid;
	},
	onView: function(){
		this.mo.shareWithLFMUser(this.userid);
		this.row.hide();
	}
});



var LFMFriendsSection = spv.inh(invstg.SearchSection, {
		//'nest-lfm_friends': ['#/users/me/lfm:friends', 'can_share'],
	init: function(target) {
		target.mo = target.map_parent.mo;
		target.rpl = target.map_parent.map_parent;


		target.lfm_friends = target.app.routePathByModels('/users/me/lfm:friends');
		//su.routePathByModels('/users/me/lfm:neighbours')
		//preloadStart

		target.lfm_friends.on('child_change-list_items', function(e) {
			pv.updateNesting(this, 'friends', e.value);
			this.changeQuery('');
			this.searchByQuery(this.state('query'));


		}, target.getContextOpts());

		target.wch(target, 'can_share', function(e) {
			if (e.value){
				this.lfm_friends.preloadStart();
				this.searchLFMFriends();
			}

		});
	},
}, {

	searchByQuery: function(query) {
		this.changeQuery(query);
		this.searchLFMFriends();
	},
	'compx-can_share':{
		depends_on: ['^^active_view', '#lfm_userid'],
		fn: function(active_view, lfm_userid) {
			return lfm_userid && active_view;
		}
	},
	searchLFMFriends: function(){
		var list = this.getNesting('friends') || [];
		var query = this.state('query');
		if (!this.state('can_share')){
			return;
		}
		var r = (query ? spv.searchInArray(list, query, ["states.userid", "states.realname"]) : list);
		if (r.length){
			r = r.concat();
			for (var i = 0; i < r.length; i++) {
				r[i] = {
					mo: this.mo,
					user: r[i],
					row: this.rpl
				};
			}
		}
		this.appendResults(r, true);
	},
	resItem: LFMUserSuggest,
	model_name: "section-lfm-friends"
});



var LFMOneUserSuggest = spv.inh(invstg.BaseSuggest, {
	init: function(target, params) {
		var user = params.user;
	//
		target.app = params.app;
		target.mo = params.mo;
		target.row = params.row;


		target.userid = user.name;
		target.text_title = target.userid;
		target.updateManyStates({
			selected_image: target.app.art_images.getImageWrap(user.image),
			text_title: target.text_title
		});
	}
}, {
	valueOf: function(){
		return this.userid;
	},
	onView: function(){
		var _this = this;
		this.mo.shareWithLFMUser(this.userid);
		_this.row.hide();
		/*.done(function() {
			_this.row.hide();
		});*/

	}
});




var LFMOneUserSection = spv.inh(invstg.SearchSection, {
	init: function(target) {
		target.mo = target.map_parent.mo;
		target.rpl = target.map_parent.map_parent;

		target.wch(target, 'can_share', function(e) {
			if (e.value){
				this.searchLFMFriends();
			}
		});
	}
}, {

	searchByQuery: function(query) {
		this.changeQuery(query);
		this.searchOneUser();
	},
	'compx-can_share':{
		depends_on: ['^^active_view', '#lfm_userid'],
		fn: function(active_view, lfm_userid) {
			return lfm_userid && active_view;
		}
	},
	searchOneUser: spv.debounce(function() {
		var _this = this;

		var q = this.state('query');
		if (!q){
			return;
		}
		if (!this.state('can_share')){
			return;
		}

		this.loading();
		this.addRequest(
			this.app.lfm
				.get('user.getInfo', {user: q})
					.done(function(r){
						if (!_this.doesNeed(q)){return;}
						_this.loaded();

						var result = [];
						if (r.user && r.user.name){
							result.push({
								mo: _this.mo,
								row: _this.rpl,
								app: _this.app,

								user: r.user

							});

						}
						//r = r && parser(r, this.resItem, method);
						_this.appendResults(result, true);


					})
					.fail(function(){
						if (!_this.doesNeed(q)){return;}
						_this.loaded();
					}));
	}, 200),
	searchLFMFriends: function(){
		var list = this.getNesting('friends') || [];
		var query = this.state('query');
		var r = (query ? spv.searchInArray(list, query, ["states.userid", "states.realname"]) : list);
		if (r.length){
			r = r.concat();
			for (var i = 0; i < r.length; i++) {
				r[i] = {
					mo: this.mo,
					user: r[i],
					row: this.rpl
				};
			}
		}
		this.appendResults(r, true);
	},
	resItem: LFMOneUserSuggest,
	model_name: "section-lfm-user"
});


var LfmSharingAuth = spv.inh(LfmAuth.LfmLogin, {}, {
	access_desc: localize('lastfm-sharing-access')
});

var StrusersRowSearch = spv.inh(invstg.Investigation, {
	init: function(target) {
		target.mo = target.map_parent.mo;
	}
}, {
	skip_map_init: true,
	'nest-lfm_auth': [LfmSharingAuth],
	'nest-section': [[StrusersRSSection, LFMFriendsSection, LFMOneUserSection]],


	searchf: function() {
		var query = this.q;
		var _this = this;
		['section-vk-users', 'section-lfm-friends', 'section-lfm-user'].forEach(function(el) {
			var section = _this.g(el);
			if (!section) {
				return;
			}
			section.setActive();
			section.searchByQuery(query);
		});
	}
});


var SongActSharing = spv.inh(comd.BaseCRow, {
	init: function(target){
		target.actionsrow = target.map_parent;
		target.mo = target.map_parent.map_parent;
		target.wch(target.mo, 'url_part', target.hndUpdateShareURL);
		target.search('');
	}
}, {

	'nest-searcher': [StrusersRowSearch],
	hndUpdateShareURL: function() {
		pv.update(this, 'share_url', this.mo.getShareUrl());
	},

	search: function(q) {
		pv.update(this, 'query', q);
		var searcher = this.getNesting('searcher');
		if (searcher) {
			searcher.changeQuery(q);
		}
	},
	model_name: 'row-share'
});



return SongActSharing;
});
