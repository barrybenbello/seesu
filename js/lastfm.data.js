
var lastfm_toptags = ["80s", "90s", "acoustic", "alternative", "alternative rock", "ambient", "black metal", "blues", "british", "chillout", "classical", "classic rock", "country", "dance", "death metal", "electronic", "electronica", "emo", "experimental", "favorites", "female vocalists", "folk", "hardcore", "hard rock", "heavy metal", "hip-hop", "hip hop", "indie", "indie rock", "industrial", "instrumental", "japanese", "jazz", "metal", "metalcore", "pop", "progressive metal", "progressive rock", "punk", "punk rock", "rap", "reggae", "rock", "seen live", "singer-songwriter", "soul", "soundtrack", "thrash metal", "trance", "trip-hop", 'instrumental hip-hop'];




var lastfm_metros = [{"name":"Sydney","country":"Australia"},{"name":"Adelaide","country":"Australia"},{"name":"Melbourne","country":"Australia"},{"name":"Linz","country":"Austria"},{"name":"Graz","country":"Austria"},{"name":"Innsbruck","country":"Austria"},{"name":"Salzburg","country":"Austria"},{"name":"Vienna","country":"Austria"},{"name":"Minsk","country":"Belarus"},{"name":"Charleroi","country":"Belgium"},{"name":"Brussels","country":"Belgium"},{"name":"Ghent","country":"Belgium"},{"name":"Antwerp","country":"Belgium"},{"name":"Liège","country":"Belgium"},{"name":"Rio de Janeiro","country":"Brazil"},{"name":"Belém","country":"Brazil"},{"name":"São Paulo","country":"Brazil"},{"name":"Salvador","country":"Brazil"},{"name":"Fortaleza","country":"Brazil"},{"name":"Belo Horizonte","country":"Brazil"},{"name":"Brasília","country":"Brazil"},{"name":"Curitiba","country":"Brazil"},{"name":"Manaus","country":"Brazil"},{"name":"Recife","country":"Brazil"},{"name":"Porto Alegre","country":"Brazil"},{"name":"Winnipeg","country":"Canada"},{"name":"Calgary","country":"Canada"},{"name":"Vancouver","country":"Canada"},{"name":"Quebec","country":"Canada"},{"name":"Edmonton","country":"Canada"},{"name":"Saskatoon","country":"Canada"},{"name":"Montreal","country":"Canada"},{"name":"Ottawa","country":"Canada"},{"name":"Toronto","country":"Canada"},{"name":"Halifax","country":"Canada"},{"name":"Valparaíso","country":"Chile"},{"name":"Santiago","country":"Chile"},{"name":"Guangzhou","country":"China"},{"name":"Tianjin","country":"China"},{"name":"Shanghai","country":"China"},{"name":"Chongqing","country":"China"},{"name":"Changsha","country":"China"},{"name":"Beijing","country":"China"},{"name":"Bogotá","country":"Colombia"},{"name":"Copenhagen","country":"Denmark"},{"name":"Helsinki","country":"Finland"},{"name":"Bordeaux","country":"France"},{"name":"Montpellier","country":"France"},{"name":"Metz","country":"France"},{"name":"Clermont-Ferrand","country":"France"},{"name":"Nice","country":"France"},{"name":"Rennes","country":"France"},{"name":"Strasbourg","country":"France"},{"name":"Lille","country":"France"},{"name":"Marseille","country":"France"},{"name":"Lyon","country":"France"},{"name":"Paris","country":"France"},{"name":"Nancy","country":"France"},{"name":"Grenoble","country":"France"},{"name":"Toulouse","country":"France"},{"name":"Nantes","country":"France"},{"name":"Cologne","country":"Germany"},{"name":"Hamburg","country":"Germany"},{"name":"Stuttgart","country":"Germany"},{"name":"Berlin","country":"Germany"},{"name":"Rostock","country":"Germany"},{"name":"Dresden","country":"Germany"},{"name":"Bremen","country":"Germany"},{"name":"Munich","country":"Germany"},{"name":"Frankfurt","country":"Germany"},{"name":"Magdeburg","country":"Germany"},{"name":"Hong Kong","country":"Hong Kong"},{"name":"Belfast","country":"Ireland"},{"name":"Dublin","country":"Ireland"},{"name":"Florence","country":"Italy"},{"name":"Turin","country":"Italy"},{"name":"Bari","country":"Italy"},{"name":"Milan","country":"Italy"},{"name":"Rome","country":"Italy"},{"name":"Naples","country":"Italy"},{"name":"Genoa","country":"Italy"},{"name":"Palermo","country":"Italy"},{"name":"Bologna","country":"Italy"},{"name":"Osaka","country":"Japan"},{"name":"Sendai","country":"Japan"},{"name":"Hiroshima","country":"Japan"},{"name":"Kobe","country":"Japan"},{"name":"Tokyo","country":"Japan"},{"name":"Nagoya","country":"Japan"},{"name":"Shizuoka","country":"Japan"},{"name":"Sapporo","country":"Japan"},{"name":"Kyoto","country":"Japan"},{"name":"Fukuoka","country":"Japan"},{"name":"Niigata","country":"Japan"},{"name":"Saitama","country":"Japan"},{"name":"Puebla","country":"Mexico"},{"name":"Ciudad Juárez","country":"Mexico"},{"name":"Guadalajara","country":"Mexico"},{"name":"Mexico City","country":"Mexico"},{"name":"Mérida","country":"Mexico"},{"name":"Mexicali","country":"Mexico"},{"name":"Monterrey","country":"Mexico"},{"name":"Tijuana","country":"Mexico"},{"name":"Villahermosa","country":"Mexico"},{"name":"Christchurch","country":"New Zealand"},{"name":"Wellington","country":"New Zealand"},{"name":"Auckland","country":"New Zealand"},{"name":"Bergen","country":"Norway"},{"name":"Oslo","country":"Norway"},{"name":"Łódź","country":"Poland"},{"name":"Wrocław","country":"Poland"},{"name":"Poznań","country":"Poland"},{"name":"Gdańsk","country":"Poland"},{"name":"Szczecin","country":"Poland"},{"name":"Katowice","country":"Poland"},{"name":"Cracow","country":"Poland"},{"name":"Warsaw","country":"Poland"},{"name":"Coimbra","country":"Portugal"},{"name":"Matosinhos","country":"Portugal"},{"name":"Lisbon","country":"Portugal"},{"name":"Porto","country":"Portugal"},{"name":"Bragança","country":"Portugal"},{"name":"Aveiro","country":"Portugal"},{"name":"Braga","country":"Portugal"},{"name":"Évora","country":"Portugal"},{"name":"Faro","country":"Portugal"},{"name":"Setúbal","country":"Portugal"},{"name":"Vila Nova de Gaia","country":"Portugal"},{"name":"Ekaterinburg","country":"Russian Federation"},{"name":"Saint Petersburg","country":"Russian Federation"},{"name":"Moscow","country":"Russian Federation"},{"name":"Penza","country":"Russian Federation"},{"name":"Ufa","country":"Russian Federation"},{"name":"Ryazan","country":"Russian Federation"},{"name":"Barcelona","country":"Spain"},{"name":"Bilbao","country":"Spain"},{"name":"Gijón","country":"Spain"},{"name":"Oviedo","country":"Spain"},{"name":"Salamanca","country":"Spain"},{"name":"Madrid","country":"Spain"},{"name":"Valencia","country":"Spain"},{"name":"Alicante","country":"Spain"},{"name":"Murcia","country":"Spain"},{"name":"Granada","country":"Spain"},{"name":"Burgos","country":"Spain"},{"name":"Zaragoza","country":"Spain"},{"name":"Seville","country":"Spain"},{"name":"A Coruña","country":"Spain"},{"name":"Uppsala","country":"Sweden"},{"name":"Umeå","country":"Sweden"},{"name":"Malmö","country":"Sweden"},{"name":"Stockholm","country":"Sweden"},{"name":"Gothenburg","country":"Sweden"},{"name":"Västerås","country":"Sweden"},{"name":"Linköping","country":"Sweden"},{"name":"Winterthur","country":"Switzerland"},{"name":"Fribourg","country":"Switzerland"},{"name":"St. Gallen","country":"Switzerland"},{"name":"Lausanne","country":"Switzerland"},{"name":"Berne","country":"Switzerland"},{"name":"Lucerne","country":"Switzerland"},{"name":"Basel","country":"Switzerland"},{"name":"Zurich","country":"Switzerland"},{"name":"Geneva","country":"Switzerland"},{"name":"Taipei","country":"Taiwan"},{"name":"Istanbul","country":"Turkey"},{"name":"Antalya","country":"Turkey"},{"name":"Adana","country":"Turkey"},{"name":"Bursa","country":"Turkey"},{"name":"İzmir","country":"Turkey"},{"name":"Ankara","country":"Turkey"},{"name":"Odesa","country":"Ukraine"},{"name":"Kyiv","country":"Ukraine"},{"name":"Exeter","country":"United Kingdom"},{"name":"Cardiff","country":"United Kingdom"},{"name":"Newport","country":"United Kingdom"},{"name":"Bristol","country":"United Kingdom"},{"name":"Birmingham","country":"United Kingdom"},{"name":"Southampton","country":"United Kingdom"},{"name":"Edinburgh","country":"United Kingdom"},{"name":"Manchester","country":"United Kingdom"},{"name":"Newcastle","country":"United Kingdom"},{"name":"Liverpool","country":"United Kingdom"},{"name":"Brighton","country":"United Kingdom"},{"name":"Leeds","country":"United Kingdom"},{"name":"Aberdeen","country":"United Kingdom"},{"name":"Glasgow","country":"United Kingdom"},{"name":"Nottingham","country":"United Kingdom"},{"name":"Plymouth","country":"United Kingdom"},{"name":"London","country":"United Kingdom"},{"name":"Orlando","country":"United States"},{"name":"Miami","country":"United States"},{"name":"Phoenix","country":"United States"},{"name":"Los Angeles","country":"United States"},{"name":"San Diego","country":"United States"},{"name":"San Francisco","country":"United States"},{"name":"San Jose","country":"United States"},{"name":"Sacramento","country":"United States"},{"name":"Las Vegas","country":"United States"},{"name":"West Palm Beach","country":"United States"},{"name":"Portland","country":"United States"},{"name":"Seattle","country":"United States"},{"name":"Buffalo","country":"United States"},{"name":"Rochester","country":"United States"},{"name":"Syracuse","country":"United States"},{"name":"Cincinnati","country":"United States"},{"name":"Louisville","country":"United States"},{"name":"Indianapolis","country":"United States"},{"name":"St Louis","country":"United States"},{"name":"Chicago","country":"United States"},{"name":"Detroit","country":"United States"},{"name":"Richmond","country":"United States"},{"name":"Virginia Beach","country":"United States"},{"name":"Baltimore","country":"United States"},{"name":"Washington DC","country":"United States"},{"name":"Pittsburgh","country":"United States"},{"name":"Cleveland","country":"United States"},{"name":"Columbus","country":"United States"},{"name":"Minneapolis","country":"United States"},{"name":"Philadelphia","country":"United States"},{"name":"New York","country":"United States"},{"name":"Tampa","country":"United States"},{"name":"El Paso","country":"United States"},{"name":"Milwaukee","country":"United States"},{"name":"Denver","country":"United States"},{"name":"Little Rock","country":"United States"},{"name":"Memphis","country":"United States"},{"name":"Nashville","country":"United States"},{"name":"Atlanta","country":"United States"},{"name":"Houston","country":"United States"},{"name":"New Orleans","country":"United States"},{"name":"Pensacola","country":"United States"},{"name":"Jacksonville","country":"United States"},{"name":"Austin","country":"United States"},{"name":"Boston","country":"United States"},{"name":"Wichita","country":"United States"}]