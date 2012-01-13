var seesuPlayer = function(){
	this.init();
};
seesuPlayer.prototype = new playerComplex();

cloneObj(seesuPlayer.prototype, {
	constructor: seesuPlayer,
	init: function(){
		playerComplex.prototype.init.call(this);
	},
	events: {
		finish: function(e){
			if (this.c_song == e.song_file.mo){
				this.playNext(false, true);
			}
		},
		play: function(e){
			if (this.c_song == e.song_file.mo){
				this.playing();
				if (this.c_song.next_preload_song){
					this.c_song.next_preload_song.prefindFiles();
				}
				this.changeAppMode(true)
				//su.player.preload_song();
			}
		},
		pause: function(e){
			if (this.c_song == e.song_file.mo){
				this.notPlaying();
				this.changeAppMode()
			}
		},
		stop: function(e){
			if (this.c_song == e.song_file.mo){
				this.notPlaying();
				this.changeAppMode()
			}
		},
		playing: function(e){
			
		}
	},
	notPlaying: function(){

		su.ui.mark_c_node_as();
	},
	playing: function(){
		su.ui.mark_c_node_as('play')
	},
	changeAppMode: function(playing){
		if (playing){
			if (app_env.pokki_app){
				pokki.setIdleDetect('popup', false);
			}
			if (window.btapp){
				btapp.properties.set('background', true);
			}
		} else{
			if (app_env.pokki_app){
				pokki.setIdleDetect('popup', true);
			}
			if (window.btapp){
				btapp.properties.set('background', false);
			}
		}
	},
	nowPlaying: function(mo){
		if (!su.ui.now_playing.link || su.ui.now_playing.link[0].ownerDocument != su.ui.d){
			if (su.ui.views.nav){
				su.ui.now_playing.link = $('<a class="np"></a>').click(function(){
					su.ui.views.show_now_playing(true);
				}).appendTo(su.ui.views.nav.justhead);
			}
		}
		if (su.ui.now_playing.link){
			su.ui.now_playing.link.attr('title', (localize('now-playing','Now Playing') + ': ' + mo.artist + " - " + mo.track));	
		}
	}
});

su.p = new seesuPlayer();

su.p
	.on('finish', function(e){
		var mo = e.song_file.mo;
		
		var duration = Math.round(mo.mopla.duration/1000);
		if (lfm.scrobbling) {
			lfm.submit(mo, duration);
		}
		if (su.vk.id){
			su.s.api('track.scrobble', {
				client: su.env.app_type,
				status: 'finished',
				duration: duration,
				artist: mo.artist,
				title: mo.track,
				timestamp: ((new Date()).getTime()/1000).toFixed(0)
			});
		}
	})
	.on('play', function(e){
		var mo = e.song_file.mo;
		var duration = Math.round(mo.mopla.duration/1000);
		if (lfm.scrobbling) {
			lfm.nowplay(mo, duration);
		}
		if (su.vk.id){
			su.s.api('track.scrobble', {
				client: su.env.app_type,
				status: 'playing',
				duration: duration,
				artist: mo.artist,
				title: mo.track,
				timestamp: ((new Date()).getTime()/1000).toFixed(0)
			});
		}
	});


suReady(function(){
	var pcore = new sm2proxy();
	var pcon = $(pcore.getC());
	$(document.body).append(pcon);

	
	pcore
		.done(function(){
			su.p.setCore(pcore);
			pcon.css('border', '1px solid #666')
		})
		.fail(function(){
			pcon.css('border', '1px solid red')
		})

	//$(document.body).append(_this.c);
});



	