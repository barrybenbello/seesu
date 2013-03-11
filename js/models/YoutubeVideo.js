var YoutubeVideo = function() {};
mapLevelModel.extendTo(YoutubeVideo, {
	model_name: 'youtube_video',
	init: function(opts, params) {
		this._super(opts);


		this.mo = params.mo;
		this.updateState('yt_id', params.yt_id);

		this.updateState('cant_show', params.cant_show);
		this.updateState('previews', params.previews);

		this.updateState('nav_title', params.title);
		this.updateState('url_part', '/youtube/' + params.yt_id);

		var _this = this;

		this.on('vip-state-change.mp_show', function(e) {
			if (e.value && e.value.userwant){
				su.trackEvent('Navigation', 'youtube video');
				_this.mo.pause();
			}
		});
	},
	full_page_need: true,
	requestVideo: function() {
		var cant_show = this.state('cant_show');
		var link = 'http://www.youtube.com/watch?v=' + this.state('yt_id');
		if (!cant_show){
			this.showOnMap();
			
		} else{
			app_env.openURL(link);
		}
	}
});