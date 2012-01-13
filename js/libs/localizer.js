sviga = {};
var localize= (function(){
	var lang = app_env.lang;
	return function(string, j){
		if (localizer[string]){
			return localizer[string][lang] || localizer[string].original;
		} else{
			if (j){
				sviga[string] ={
					original:j
				};
				return j;
			}
			
			return 'no this localization';
		}
		
	}
})();

/*
"":{
		"original": "",
		"ru": ""
	},
*/

localizer = {
	"listeners-looks":{
		"original": "People who listened to this track, look like this",
		"ru": "Люди, слушавшие этот трек, выглядят примерно так:"
	},
	"rels-people-you":{
		"original": "People which want to meet you",
		"ru": "Люди, которые хотят познакомиться с тобой"
	},
	"rels-you-people":{
		"original": "People you want to meet",
		"ru": "Люди, с которыми ты хочешь познакомиться"
	},
	"user-want-you":{
		"original": "This user wants to meet you",
		"ru": "Этот пользователь хочеть познакомиться с тобой"
	},
	"you-want-user":{
		"original": "You want to meet this user",
		"ru": "Ты хочешь познакомиться с этим пользователем"
	},

	"if-you-accept-one-i":{
		"original": "If you accept invite from one of the users, then",
		"ru": "Если ты примешь приглашение от одного из пользователей, то"
	},
	"if-user-accept-i":{
		"original": "If user accepts your invite, then",
		"ru": "Если пользователь примет твоё приглашение, то "
	},
	"you-familiar":{
		"original": "Are you familiar with this user",
		"ru": "Ты знаком с этим пользователем"
	},
	"if-one-accept-i":{
		"original": "If one of the users accepts your invite, then",
		"ru": "Если один из пользователей примет твоё приглашение, то"
	},
	"will-get-link":{
		"original": "you will get link to his profile after 5 days",
		"ru": "через 5 дней ты получешь ссылку на его профиль"	
	},
	"wget-link":{
		"original": "You will get profile link",
		"ru": "Ссылка на профиль появится"
	},
	"Search-resuls": {
		"original": "%query% search resuls",
		"ru": "Результаты поиска %query%"
	},
	"attime":{
		"original":"at",
		"ru": "в"	
	},
	"m1":{
		"original": "January",
		"ru": "января"
	},
	"m2":{
		"original": "February",
		"ru": "февраля"
	},
	"m3":{
		"original": "March",
		"ru": "марта"
	},
	"m4":{
		"original": "April",
		"ru": "апреля"
	},
	"m5":{
		"original": "May",
		"ru": "мая"
	},
	"m6":{
		"original": "June",
		"ru": "июня"
	},
	"m7":{
		"original": "July",
		"ru": "июля"
	},
	"m8":{
		"original": "August",
		"ru": "августа"
	},
	"m9":{
		"original": "September",
		"ru": "сентября"
	},
	"m10":{
		"original": "October",
		"ru": "октября"
	},
	"m11":{
		"original": "November",
		"ru": "ноября"
	},
	"m12":{
		"original": "December",
		"ru": "декабря"
	},
	"enter-code":{
		"original": "Enter here code",
		"ru": "Помести сюда полученный код"
	},
	"use-code":{
		"original": "use code",
		"ru": "использовать код"
	},
	"refresh": {
		"original": "refresh",
		"ru": "обновить"
	},
	"want-meet":{
		"original": "Want to meet",
		"ru": "Хочу познакомиться"	
	},
	"Pop-tags":{
		"original": "Popular tags",
		"ru": "Популярные теги"
	},
	"User-listening":{
		"original":"Users are listening",
		"ru":"Пользователи слушают"
	},
	"last-week-с":{
		"original": "Last week",
		"ru": "Последнюю неделю город"
	},
	"reg":{
		"original": "regisration",
		"ru": "регистрация"
	},
	"listen-this":{
		"original": "listen this",
		"ru": "слушал это"	
	},
	"search": {
		"original": "Search",
		"ru": "Поиск"
	},
	"trysearches": {
		"original": "try to search",
		"ru": "Попробуйте найти"
	},
	"Download": {
		"original": "Download",
		"ru": "Скачать"
	},
	"search-control-hint": {
		"original": "Use keyboard: up and down arrows, enter",
		"ru": "Используйте клавиатуру: стрелки вверх, вниз и клавишу ввод"
		
	},
	"reccoms": {
		"original": "Recommendations",
		"ru": "Рекомендации"
	},
	"lastfm-reccoms-access": {
		"original": "To get your music recommendations you need to grant Seesu your last.fm account access",
		"ru": "Что бы получить рекомендации тебе нужно дать Сису доступ к своей учётной записи на last.fm"
	},
	"grant": {
		"original": "grant",
		"ru": "дать доступ"
	},
	"user-granted-lfm": {
		"original": "I've granted my account access to Seesu",
		"ru": "Я дал Сису доступ к своей учётной записи"
	},
	"give-reccoms": {
		"original": "give me recommendations",
		"ru": "получить рекомендации"
	},
	"grant-lfm-desc": {
		"original": "It's simple and safe. It does not require your last.fm password.",
		"ru": "Это просто и безопасно, не требует твой пароль от last.fm"
	},
	"or-type-username": {
		"original": "or type username",
		"ru": "или введите имя пользователя"
	},
	"type-friend-desc": {
		"original": " (you can type your friend)",
		"ru": "(ты можешь ввести своего друга)"
	},
	"grant-love-lfm-access": {
		"original": "To get your favorite tracks you need to grant Seesu your last.fm account access ",
		"ru": "Что бы получить свои любимые треки тебе нужно дать Сису доступ к своей учётной записи на last.fm"
	},
	"give-love": {
		"original": "give me loved tracks",
		"ru": "получить любимые композиции"
	},
	"loved-tracks": {
		"original": "Loved Tracks",
		"ru": "Любимые композиции"
	},
	"playlists": {
		"original": "Playlists",
		"ru": "Плейлисты"
	},
	"profile":{
		"original": "profile",
		"ru": 'страница'
	},
	"Tags": {
		"original": "Tags",
		"ru": "Теги"	
	},
	"get-albums":{
		"original": "get albums",
		"ru": "получить альбомы"	
	},
	"similar-arts": {
		"original":	"Similar artists",
		"ru": "Похожие артисты"
	},
	"albums": {
		"original": "albums",
		"ru": "альбомы"	
	},
	"artcard": {
		"original": "artist card",
		"ru": "карточка артиста"
	},
	"Best-tracks":{
		"original": "Best tracks",
		"ru": "Лучшие треки"
	},
	"top-tracks":{
		"original": "top tracks",
		"ru": 'лучшие треки'	
	},
	"stop-flash": {
		"original": "To stop annoing «Adobe Flash Player Security» window copy this address:",
		"ru": "Что бы убрать сообщение об  «Adobe Flash Player Security» скопируйте следующий адрес"
	},
	"add-to-wl": {
		"original": "add it to white list on",
		"ru": "добавьте его в белый список на"
	},
	"flashpage": {
		"original": "flash internet security page",
		"ru": "странице безопасности флеша"
	},
	"and-restart": {
		"original": "and then restart Seesu",
		"ru": "и перезапустите Сису"
	},
	
	"bad-flash-desc": {
		"original": "About flash security: usualy flash player works in widget sandbox on your computer. As deafult it has not access to internet. To give it access to mp3 which stores on vk.com you may need change settings on flash security page. On the same page you can deny access.",
		"ru": "О безопасности флеша: по умолчанию флеш плеер работает среди ограничений накладывающееся на виджеты, при этом не имеет доступа в интернет. Чтобы дать доступ к mp3 файлам располагающихся на сайтах тебе нужно изменить настройки на соответствующей странице. Там же ты можешь ограничить доступ."
	},
	"lastfm-scrobble-access": {
		"original": "To scrobble to last.fm you must grant access to Seesu",
		"ru": "Для скроблинга тебе нужно дать Сису доступ к своей учётной записи на last.fm"
	},
	"to-find-and-play":{
		
		"original": "To find and play",
		"ru": "Что бы найти и прослушать"
	},
	"to-find-better":{
		"original": "To find better",
		"ru": "Что бы найти более подходящие"
	},
	"music-files-from-vk":{
		"original": "music files you need to login to vk.com (vkontakte.ru)",
		"ru": "музыкальные файлы тебе необходимо войти во vkontakte.ru (vk.com)"
	},
	
	"stabilization-of-vk":{
		"original": "Some files were found using test vkontakte.ru (vk.com) accaunt. Searching files for new compositions can break at any time. This will not happen if you use your own accaunt",
		"ru": "Некоторые файлы найдены с помощью тестовой учётной записи vkontakte.ru (vk.com), поиск файлов для новых композиций может прекратится в любой момент. Этого не произойдёт, если ты будешь использовать свою учётную запись vkontakte"
	},
	
	"":{
		"original": "",
		"ru": ""
	},
	"":{
		"original": "",
		"ru": ""
	},
	"":{
		"original": "",
		"ru": ""
	},
	"to-meet-man-vk":{
		"original": "If you want to meet this man you need to sign in to vk.com (vkontakte.ru)",
		"ru": "Если ты хочешь познакомиться с этим человеком, то ты должен войти во vkontakte.ru (vk.com)"
	},
	"to-get-mp3-sign-to-vk": {
		"original": "To get mp3 files you need to sign in to vk.com (vkontakte.ru)",
		"ru": "Что бы получить доступ к mp3 файлам ты должен войти во vkontakte.ru (vk.com)"
	},
	"to-get-mp3-login-to-vk": {
		"original": "To get mp3 files you need to login to vk.com or to vkontakte.ru",
		"ru": "Что бы получить доступ к mp3 файлам ты должен дать доступ к своей учётной записи vkontakte.ru или vk.com"
	},
	"sign": {
		"original": "sign in",
		"ru": "войти"
	},
	"you-may": {
		"original": "You may",
		"ru": "Вы можете"
	},
	"create-acc": {
		"original": "create new account",
		"ru": "создать учётную запись"
	},
	"its-free": {
		"original": "(it's free)",
		"ru": "(это бесплатно)"
	},
   
	"open-api-secure": {
		"original": "Try both if you get «Open API security breach».",
		"ru": "Попробуйте и то и другое, если у тебя появляется сообщение «Open API security breach»."
	},
	"email": {
		"original": "E-mail",
		"ru": "Почта"
	},
	"password": {
		"original": "Password",
		"ru": 'Пароль'
	},
	"savepass": {
		"original": "Save password in Seesu",
		"ru": "Сохранить пароль в Сису"
	},
	"playlist-getmp3": {
		"original": "Make playable all tracks in playlist",
		"ru": 'Сделать все песни доступными'
	},
	"playlist-export": {
		"original": "Save playlist to *.m3u file",
		"ru": "Сохранить плейлист в m3u файл"
	},
	"addsong": {
		"original": "add song to",
		"ru": "добавить композицию в"
	},
	 "to-search": {
		"original": "Search ",
		"ru": "Искать "
	},
	"in-artists": {
		"original": "in artists",
		"ru": "в артистах"
	},
	"in-tracks": {
		"original": "in tracks",
		"ru": "в треках"
	},
	"in-tags": {
		"original": "in tags",
		"ru": "в тэгах"
	},
	"in-albums": {
		"original": "in albums",
		"ru": "в альбомах"
	},
	"Artists": {
		"original": "Artists",
		"ru": 'Артисты'
	},
	"Tracks": {
		"original": "Tracks",
		"ru": 'Треки'
	},
	"Show-all": {
		"original": "Show all",
		"ru": "Показать все"
	},
	"Albums": {
		"original": "Albums",
		"ru": 'Альбомы'
	},
	"full-list":{
		"original": "full list",
		"ru": "полный список"	
	},
	"oartists": {
		"original": "artists",
		"ru": 'артистов'
	},
	"otracks": {
		"original": "tracks",
		"ru": 'треков'
	},
	"otags": {
		'original': 'tags',
		"ru": 'тегов'	
	},
	"oalbums":{
		"original": "albums",
		"ru": "альбомов"	
	},
	"video": {
		"original": "Video",
		"ru": "Видео"
	},
	"hide-them": {
		"original": "hide them",
		"ru": "скрыть их"
	},
	"show-them": {
		"original": "show them",
		"ru": "показать их"
	},
	"direct-vk-search": {
		"original": "Search mp3  directly in vkontakte",
		"ru": 'Искать mp3 прямо во вконтакте'
	},
	"fine-more": {
		"original": "find more",
		"ru": 'Найти больше'
	},
	"now-playing": {
		"original": "Now Playing",
		"ru": 'Сейчас играет'
	},
	"nothing-found": {
		"original": "Nothing found",
		"ru": 'Не найдено'
	},
	"Files": {
		"original":"Files",
		"ru": "Файлы"
	},
	"show-all-files":{
		"original":"show all files",
		"ru": "показать все файлы"
	}
}