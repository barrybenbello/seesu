window.connect_dom_to_som = function(d, ui){
	if (!window.window_resized){
		window_resizer(d);
	}

	ui.buttons = {
		search_artists : 
			$('<button type="submit" name="type" value="artist" id="search-artist"><span>Search in artists</span></button>',d)
				.click(function(e){
					var finishing_results = $(this).data('finishing_results');
					$(this).parent().remove();
					var query = seesu.ui.els.search_input.val();
					if (query) {
						su.fs.artist_search(query, finishing_results);
					}
					seesu.ui.make_search_elements_index()
				}),
			
		search_tags:  
			$('<button type="submit" name="type" value="tag" id="search-tag"><span>Search in tags</span></button>',d)
				.click(function(e){
					var finishing_results = $(this).data('finishing_results');
					$(this).parent().remove();
					
					
					var query = seesu.ui.els.search_input.val();
					if (query) {
						su.fs.tag_search(query, finishing_results)
					}
					seesu.ui.make_search_elements_index()
				}),
		search_tracks: 
			$('<button type="submit" name="type" value="track" id="search-track"><span>Search in tracks</span></button>',d)
				.click(function(e){
					var finishing_results = $(this).data('finishing_results');
					$(this).parent().remove();
					
					
					
					
					var query = seesu.ui.els.search_input.val();
					if (query) {
						su.fs.track_search(query, finishing_results)
					}
					seesu.ui.make_search_elements_index()
				}),
		search_vkontakte: 
			$('<button type="submit" name="type" value="vk_track" id="search-vk-track" class="search-button"><span>Use dirty search</span></button>',d)
				.click(function(e){
					
					var query = seesu.ui.els.search_input.val();
					if (query) {
						su.ui.show_track(query)
					}
					
				})
	};
	
	
	seesu.player.controls = (function(volume){
		var o = {};
		var get_click_position = function(e, node){
			var pos = e.offsetX || (e.pageX - $(node).offset().left);
			return pos
		}
		o.track_progress_total = $('<div class="track-progress"></div>',d).click(function(e){
			e.stopPropagation();
			var pos = get_click_position(e, this);
			var new_play_position_factor = pos/$(this).data('mo_titl').c.track_progress_width;
			seesu.player.musicbox.set_new_position(new_play_position_factor);
			
		})
		
		o.track_progress_load = $('<div class="track-load-progress"></div>',d).appendTo(o.track_progress_total);
		o.track_progress_play = $('<div class="track-play-progress"></div>',d).appendTo(o.track_progress_total);
		o.track_node_text = $('<div class="track-node-text"><div>',d).appendTo(o.track_progress_total);
		
		
		o.volume_state = $('<div class="volume-state"></div>',d).click(function(e){
			var pos = get_click_position(e, this);
			var new_volume_factor = pos/50;
			seesu.player.musicbox.changhe_volume(new_volume_factor * 100);
			seesu.player.call_event(VOLUME, new_volume_factor * 100);
			(su.ui.els.volume_s.sheet.cssRules || su.ui.els.volume_s.sheet.rules)[0].style.width = pos + 'px';
		})
		o.volume_state_position = $('<div class="volume-state-position"></div>',d)
			.appendTo(o.volume_state);
			
		o.ph = $('<div class="player-holder"></div>',d)
			.prepend(o.track_progress_total)
			.prepend(o.volume_state);
			
		return o;
	})(seesu.player.player_volume);
	
	addEvent(d, "DOMContentLoaded", function() {
		su.lfm_api.try_to_login();		
		
		var volume_s = d.createElement('style');
			volume_s.setAttribute('title', 'volume');
			volume_s.setAttribute('type', 'text/css');
		var volume_style= '.volume-state-position {width:' + ((seesu.player.player_volume * 50)/100) + 'px' + '}'; 
		if (volume_style.styleSheet){
			volume_s.styleSheet.cssText = volume_style;
		} else{
			volume_s.appendChild(d.createTextNode(volume_style));
		}
		d.documentElement.firstChild.appendChild(volume_s);
		
		dstates.connect_ui(ui);
		var artsHolder	= $('#artist-holder',d);
		var buttmen_node =  $('.play-controls.buttmen',d);
		if (buttmen_node){
			seesu.buttmen = new button_menu(buttmen_node);
		}
		var search_form = $('#search',d).submit(function(){return false;}); 
		
		var vk_auth = $('.vk-auth',d).submit(function(){
			seesu.ui.els.vk_login_error.text('');
			dstates.remove_state('body','vk-needs-captcha');
			var _this = $(this),
				email = $('input.vk-email',_this).val(),
				pass = vk_pass.val();
			
			var save = vk_save_pass.attr('checked');
			if (save){
				seesu.vk.save_pass = true;
			} else{
				seesu.vk.save_pass = false;
			}
			uilogin_to_hapi(email, pass, $('#vk-captcha_key',_this).val(), save);
	
			return false;
		});
		var vk_pass  = $('input.vk-pass', vk_auth)
			.bind('mouseover', function(){
				this.type = 'text';
			})
			.bind('mouseout', function(){
				this.type = 'password';
			});
			
		ui.els = {
			scrolling_viewport: $('#screens',d),
			make_trs: $("#make-trs-plable",d).click(function(){
				make_tracklist_playable(ui.els.make_trs.hide().data('pl'), true);
				seesu.track_event('Controls', 'make playable all tracks in playlist'); 
			}),
			slider: d.getElementById('slider'),
			nav_playlist_page: d.getElementById('nav_playlist_page'),
			nav_track_zoom: $('#nav_track_zoom',d),
			export_playlist: $('#open-external-playlist',d),
			start_screen: $('#start-screen',d),
			artsHolder: artsHolder,
			a_info: $('.artist-info', artsHolder),
			artsTracks: $('.tracks-for-play',artsHolder),
			art_tracks_w_counter: $('#tracks-waiting-for-search',d),
			vk_login_error: $('.error',vk_auth),
			captcha_img: $('.vk-captcha-context img',vk_auth),
			searchres: $('#search_result',d),
			search_input: $('#q',d),
			play_controls: seesu.buttmen,
			search_form: search_form,
			track_c : $('.track-context',d),
			volume_s: volume_s
		};
		ui.views.nav = {
			daddy: $(su.ui.els.slider).children('.navs'),
			start: $('#start_search',d),
			results: $('#search_result_nav',d),
			playlist: $(su.ui.els.nav_playlist_page).parent(),
			track: ui.els.nav_track_zoom.parent()
		}
		
		su.ui.els.search_input.bind('keyup mousemove change', input_change);
	
		var state_recovered;	
		if (window.su && su.player && su.player.c_song){
			if (su.player.c_song.mo_titl && su.player.c_song.mo_titl.plst_titl){
				ui.views.show_start_page(true, true, true);
				su.ui.render_playlist(su.player.c_song.mo_titl.plst_titl);
				su.ui.views.show_playlist_page(su.player.c_song.mo_titl.plst_titl);
				su.player.set_current_song(su.player.c_song, true, true);
				su.ui.views.save_view(su.player.c_song.mo_titl.plst_titl,true);
				su.ui.mark_c_node_as(su.player.player_state);
				state_recovered = true;
			}
		}
	
		$(d).click(function(e) {
			su.ui.els.pl_search.attr('style', '');
			return test_pressed_node(e);
		});
		
		
		
		$('#hint-query',d).text(seesu.popular_artists[(Math.random()*10).toFixed(0)]);
		$('#widget-url',d).val(location.href.replace('index.html', ''));
		var seesu_me_link = $('#seesu-me-link',d);
		seesu_me_link.attr('href', seesu_me_link.attr('href').replace('seesu%2Bapplication', seesu.env.app_type));
		
		
		
		
		
		
		var vk_save_pass = $('#vk-save-pass',d);
		
		  
	  	if ($.browser.opera && ((typeof opera.version == 'function') && (parseFloat(opera.version()) <= 10.1)) ){
	  		
			$('<a id="close-widget">&times;</a>',d)
				.click(function(){
					window.close();
				})
				.prependTo(seesu.ui.els.slider)
		}

		if (su.lfm_api.scrobbling) {
			ui.lfm_enable_scrobbling();
		}
		
		if (su.lfm_api.sk) {
			seesu.ui.lfm_logged();	
		}
		
		
		
		
	
		ui.lfm_auth = {
			lfm_fin_recomm_check : $('#login-lastfm-finish-recomm-check',d),
			lfm_fin_recomm		 : $('#login-lastfm-finish-recomm',d),
			lfm_fin_loved_check  : $('#login-lastfm-finish-loved-check',d),
			lfm_fin_loved		 : $('#login-lastfm-finish-loved',d)
		}
		
			
			
		ui.lfm_auth.lfm_fin_recomm_check.change(function(){
			if ($(this).attr('checked')) {
				lfm('auth.getSession',{'token':su.lfm_api.newtoken },function(r){
					if (!r.error) {
						su.lfm_api.login(r);
						render_recommendations();
					}
				});
				lfm_fin_recomm.attr('disabled', null);
			} else {
				lfm_fin_recomm.attr('disabled', 'disabled');
			}
		});
		ui.lfm_auth.lfm_fin_recomm.click(function(){
			if(lfm_fin_recomm_check.attr('checked')){
				lfm('auth.getSession',{'token':su.lfm_api.newtoken },function(r){
					if (!r.error) {
						su.lfm_api.login(r);
						render_recommendations();
					}
				});
				return false
			}
		});
		
		
		ui.lfm_auth.lfm_fin_loved_check.change(function(){
			if ($(this).attr('checked')) {
				lfm('auth.getSession',{'token':su.lfm_api.newtoken },function(r){
					if (!r.error) {
						su.lfm_api.login(r);
						render_recommendations();
					}
				});
				lfm_fin_loved.attr('disabled', null);
				
			} else {
				lfm_fin_loved.attr('disabled', 'disabled');
			}
		});
		
		ui.lfm_auth.lfm_fin_loved.click(function(){
			if(lfm_fin_loved_check.attr('checked')){
				lfm('auth.getSession',{'token':su.lfm_api.newtoken },function(r){
					if (!r.error) {
						su.lfm_api.login(r);
						render_loved();
					}
				});
				return false
			}
		})
		
		var lfm_recomm = $('#lfm-recomm',d).click(function(){
			if(!su.lfm_api.sk){
				$(d.body).toggleClass('lfm-auth-req-recomm');
			}else {
				render_recommendations();
			}
		});
		
		var lfm_loved = $('#lfm-loved',d).click(function(){
			if(!su.lfm_api.sk){
				$(d.body).toggleClass('lfm-auth-req-loved');
			}else {
				render_loved();
			}
		});

		
		$('#lfm-loved-by-username',d).submit(function(){
			var _this = $(this);
			render_loved(_this[0].loved_by_user_name.value);
			$(d.body).removeClass('lfm-auth-req-loved');
			return false;
		})
		$('#lfm-recomm-for-username',d).submit(function(e){
			var _this = $(this);
			render_recommendations_by_username(_this[0].recomm_for_username.value);
			$(d.body).removeClass('lfm-auth-req-recomm');
			return false;
		})
	
	
	
	
		
		
		$('#app_type', search_form).val(seesu.env.app_type);
		if (search_form) {
			$(d).keydown(function(e){
				if (!seesu.ui.els.slider.className.match(/show-search-results/)) {return}
				if (d.activeElement.nodeName == 'BUTTON'){return}
				arrows_keys_nav(e);
			})
		}
		
		var ext_search_query = seesu.ui.els.search_input.val();
		if (ext_search_query) {
			su.ui.search(ext_search_query);
		}
		
		var playlists = seesu.gena.playlists;
		//[{name: 'loved tracks'}, {name: 'killers'}, {name: 'top british 30'}, {name: 'vkontakte'}, {name: 'best beatles'}];
		var create_plr_entity = function(playlist, song){
			var entity = $('<li></li>', d).text(playlist.playlist_title).click(function(){
				pl_search.attr('style', '');
				su.gena.add(song, playlist);
			});
			return entity;
		};
		var pl_search  = ui.els.pl_search = $('#playlist-search', d).click(function(e){
			e.stopPropagation();
			test_pressed_node(e)
		});
		
		var new_playlist_desc = 'new playlist named '
		var pl_r = $('.pl-r', pl_search);
		
		var pl_q = ui.els.pl_r = $('#pl-q',pl_search).bind('change keyup focus', function(e){
			
			
			var searching_for = this.value;
			if (searching_for == pl_q.data('lastv')){return false;}
			
			var current_song = pl_search.data('current_song');
			if (searching_for){
				var matches = [];
				for (var i=0; i < playlists.length; i++) {
					if (playlists[i].playlist_title == searching_for){
						matches.unshift(i);
						matches.full_match = true;
					} else if (playlists[i].playlist_title.match(new  RegExp('\\b' + searching_for))){
						 matches.push(i);
					}
	
				};
				var pl_results = $();
				
				if (!matches.full_match && searching_for){
					var new_pl_button = $('<li></li>')
						.text('"'+searching_for+'"')
						.prepend($('<span></span>').text(new_playlist_desc));
					new_pl_button.click(function(e){
							pl_search.attr('style', '');
							su.gena.add(current_song, su.gena.create_userplaylist(searching_for));
						});
						
					pl_results = pl_results.add(new_pl_button);
				}
				for (var i=0; i < matches.length; i++) {
					pl_results = pl_results.add(create_plr_entity(playlists[matches[i]], current_song));
				};
				pl_r.empty();
				if (pl_results.length > 0){
					pl_r.append(pl_results);
				}
			} else{
				console.log(current_song)
				var pl_results = $();
				for (var i=0; i < playlists.length; i++) {
					pl_results = pl_results.add(create_plr_entity(playlists[i], current_song));
				};
				pl_r.empty();
				if (pl_results.length > 0){
					pl_r.append(pl_results);
				}
			}
			pl_q.data('lastv', searching_for);
			
		});
		
		
		$('.ext-playlists', pl_search).click(function(){
			$(this).parent().toggleClass('not-want-to')
			return false;
		});
		if (!state_recovered){
			ui.views.show_start_page(true, true, true);
		}
		
		
		ui.create_playlists_link();
	});
	
	var preload_query = d.getElementsByName('search_query');
	if (preload_query && preload_query.length){
		if (preload_query[0] && preload_query[0].content){
			lfm('artist.search',{artist: preload_query[0].content, limit: 15 },function(){ })
			lfm('tag.search',{tag: preload_query[0].content, limit: 15 },function(){ })
			lfm('track.search',{track: preload_query[0].content, limit: 15 },function(){ })
		}
	}

}