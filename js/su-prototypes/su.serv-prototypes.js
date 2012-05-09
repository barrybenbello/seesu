var suMapModel = function() {};

mapLevelModel.extendTo(suMapModel, {
	regDOMDocChanges: function(cb) {
		this
			.on('mpl-attach', function() {
				jsLoadComplete(function() {
					su.on('dom', cb);
				});
				
			})
			.on('mpl-detach', function() {
				jsLoadComplete(function() {
					su.off('dom', cb);
				});
			});
	}
});



var suServView = function() {};

provoda.View.extendTo(suServView, {
	init: function() {
		this._super();

		var _this = this;
		var onDOMDie = function(dead_doc, is_current_ui, ui) {
			_this.isAlive(dead_doc);
		};
		su.on('dom-die', onDOMDie);
		this.onDie(function() {
			su.off('dom-die', onDOMDie);	
		});
	},
	getCNode: function(c) {
		return (c = this.getC()) && (typeof length != 'undefined' ? c[0] : c);
	},
	isAlive: function(d) {
		if (this.dead){
			return false;
		} else {
			if (this.getC()){
				var c = this.getCNode();
				if (!c || (d && d === c.ownerDocument) || !getDefaultView(c.ownerDocument)){
					this.markAsDead();
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			
			
		}
	}
});

var commonMessagesStore = function(glob_store, store_name) {
	this.init();
	this.glob_store = glob_store;
	this.store_name = store_name;
};


provoda.Eventor.extendTo(commonMessagesStore, {
	markAsReaded: function(message) {
		var changed = this.glob_store.set(this.store_name, message);
		if (changed){
			this.trigger('read', message);
		}
	},
	getReadedMessages: function() {
		return this.glob_store.get(this.store_name);
	}
});


var gMessagesStore = function(set, get) {
	this.sset = set;
	this.sget = get;
	this.store = this.sget() || {};
	this.cm_store = {};
};

Class.extendTo(gMessagesStore, {
	set: function(space, message) {
		this.store[space] = this.store[space] || [];
		if ( this.store[space].indexOf(message) == -1 ){
			this.store[space].push(message);
			this.sset(this.store);
			return true;
		}
	},
	get: function(space) {
		return this.store[space] || [];
	},
	getStore: function(name) {
		return this.cm_store[name] || (this.cm_store[name] = new commonMessagesStore(this, name));
	}
});




var ContextRow = function() {};

provoda.Model.extendTo(ContextRow, {
	init: function() {
		this._super();
		this.context_parts = {};
		this.active_part = null;
	},
	addPart: function(name, model) {
		if (!this.context_parts[name]){
			this.context_parts[name] = model;
		}
	},
	getAllParts: function(){
		return this.context_parts;
	},
	switchPart: function(name) {
		if (this.context_parts[name] && this.context_parts[name] != this.active_part){
			if (this.active_part){
				this.active_part.deacivate();
			}
			this.active_part = this.context_parts[name];
			this.active_part.acivate();
			this.updateState('active_part', name);
	
		} else if (this.active_part){
			this.updateState('active_part', false);
			this.active_part.deacivate();
			this.active_part = null;
		}
	}
});

var BaseCRowUI = function(){};
suServView.extendTo(BaseCRowUI, {
	bindClick: function(){
		if (this.button){
			var md = this.md;
			this.button.click(function(){
				md.switchView();
			});
		}
	},
	getArrowPos: function(){
		var p = su.ui.getRtPP(this.button);
		return p.left + this.button.outerWidth()/2;
	},
	state_change: {
		'active_view': function(state){
			if (state){
				this.c.removeClass('hidden')
			} else {
				this.c.addClass('hidden')
			}
		}
	}
});

var BaseCRow = function(){};
provoda.Model.extendTo(BaseCRow, {
	switchView: function(){
		this.traackrow.switchPart(this.row_name);
	},
	deacivate: function(){
		this.updateState("active_view", false);
	},
	acivate: function(){
		this.updateState("active_view", true);
	}
});