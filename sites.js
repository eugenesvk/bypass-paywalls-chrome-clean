var defaultSites = {
  "60 Millions de consommateurs": {
    domain: "60millions-mag.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Advance Local": {
    domain: "###_usa_adv_local",
    allow_cookies: 1,
    group: [
      "al.com",
      "cleveland.com",
      "lehighvalleylive.com",
      "masslive.com",
      "mlive.com",
      "nj.com",
      "oregonlive.com",
      "pennlive.com",
      "silive.com",
      "syracuse.com"
    ]
  },
  "Adweek": {
    domain: "adweek.com",
    useragent: "googlebot"
  },
  "Albuquerque Journal": {
    domain: "abqjournal.com",
    allow_cookies: 1,
    block_regex: /\.abqjournal\.com\/.+\/tncms\/api\/access\..+\.js/,
    cs_dompurify: 1
  },
  "Algemeen Dagblad (+ regional; link to archive.is)": {
    domain: "###_nl_dpg_adr",
    group: [
      "ad.nl",
      "bd.nl",
      "bndestem.nl",
      "destentor.nl",
      "ed.nl",
      "gelderlander.nl",
      "pzc.nl",
      "tubantia.nl"
    ],
    allow_cookies: 1,
    block_regex: /temptation\..+\.nl\/temptation\.js/,
    cs_dompurify: 1
  },
  "Alternatives Economiques": {
    domain: "alternatives-economiques.fr",
    block_regex: /\.poool\.fr\//
  },
  "Ámbito": {
    domain: "ambito.com",
    remove_cookies_select_drop: ["TDNotesRead"]
  },
  "America's Test Kitchen": {
    domain: "americastestkitchen.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "American Affairs": {
    domain: "americanaffairsjournal.org",
    allow_cookies: 1,
    block_regex: /\/americanaffairsjournal\.org\/wp-content\/mu-plugins\/app\/src\/paywall\/paywall\.js/
  },
  "American Banker (+ Arizent; opt-in to custom sites)": {
    domain: "americanbanker.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Apollo Magazine": {
    domain: "apollo-magazine.com"
  },
  "ARA": {
    domain: "###_cat_ara",
    group: [
      "ara.cat",
      "arabalears.cat"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "Arkansas Democrat-Gazette": {
    domain: "arkansasonline.com",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "Artforum": {
    domain: "artforum.com"
  },
  "Artnet": {
    domain: "artnet.com",
    allow_cookies: 1,
    block_regex: /(\.artnet\.com\/paywall-ajax\.php|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Ärzte Zeitung": {
    domain: "aerztezeitung.de",
    allow_cookies: 1
  },
  "Atavist Magazine": {
    domain: "atavist.com"
  },
  "Atlantico.fr": {
    domain: "atlantico.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Augsburger Allgemeine": {
    domain: "augsburger-allgemeine.de",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Australia News Corp (when blocked disable Googlebot in BPC-settings)": {
    domain: "###_au_news_corp",
    group: [
      "adelaidenow.com.au",
      "cairnspost.com.au",
      "couriermail.com.au",
      "dailytelegraph.com.au",
      "geelongadvertiser.com.au",
      "goldcoastbulletin.com.au",
      "heraldsun.com.au",
      "ntnews.com.au",
      "theaustralian.com.au",
      "thechronicle.com.au",
      "themercury.com.au",
      "townsvillebulletin.com.au",
      "weeklytimesnow.com.au"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/,
    useragent: "googlebot",
    exception: [{
        domain: "cairnspost.com.au",
        allow_cookies: 1,
        block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
      }, {
        domain: "geelongadvertiser.com.au",
        allow_cookies: 1,
        block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
      }, {
        domain: "theaustralian.com.au",
        allow_cookies: 1,
        block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
      }, {
        domain: "townsvillebulletin.com.au",
        allow_cookies: 1,
        block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
      }
    ]
  },
  "Australian Community Media (daily)": {
    domain: "###_au_comm_media",
    group: [
      "bendigoadvertiser.com.au",
      "bordermail.com.au",
      "canberratimes.com.au",
      "centralwesterndaily.com.au",
      "dailyadvertiser.com.au",
      "dailyliberal.com.au",
      "examiner.com.au",
      "illawarramercury.com.au",
      "newcastleherald.com.au",
      "northerndailyleader.com.au",
      "standard.net.au",
      "theadvocate.com.au",
      "thecourier.com.au",
      "westernadvocate.com.au"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Australia Nine Entertainment": {
    domain: "###_au_nine_ent",
    group: [
      "afr.com",
      "brisbanetimes.com.au",
      "smh.com.au",
      "theage.com.au",
      "watoday.com.au"
    ],
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Auto Motor und Sport": {
    domain: "auto-motor-und-sport.de",
    allow_cookies: 1,
    block_regex: /\.auto-motor-und-sport\.de\/thenewsbar\/static\/pw\.js/
  },
  "Autocar.co.uk": {
    domain: "autocar.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Automobilwoche": {
    domain: "automobilwoche.de",
    allow_cookies: 1,
    block_regex: /\.automobilwoche\.de\/sites\/camw\/files\/js\/js_.+\.js/
  },
  "AutoPlus.fr": {
    domain: "autoplus.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Axios": {
    domain: "axios.com",
    allow_cookies: 1,
    block_regex: "\.axios\.com\/api\/v\d\/licenses"
  },
  "Badische Neueste Nachrichten": {
    domain: "bnn.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Balkan Insight": {
    domain: "balkaninsight.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Bar and Bench": {
    domain: "barandbench.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Barron's (when blocked disable Googlebot in BPC-settings)": {
    domain: "barrons.com",
    allow_cookies: 1,
    block_regex: /(cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/,
    useragent: "googlebot"
  },
  "BBC History Extra": {
    domain: "historyextra.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Belfast Telegraph": {
    domain: "belfasttelegraph.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Beobachter.ch": {
    allow_cookies: 1,
    domain: "beobachter.ch",
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1,
    useragent: "googlebot"
  },
  "Berliner Zeitung": {
    domain: "berliner-zeitung.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Berlingske": {
    domain: "berlingske.dk",
    allow_cookies: 1,
    useragent: "bingbot"
  },
  "Bhaskar": {
    domain: "bhaskar.com",
    allow_cookies: 1,
    block_regex: /\.bhaskar\.com\/assets\/js\/react-.+\.bundle\.js/
  },
  "Bild (link to archive.is)": {
    domain: "bild.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Bloomberg": {
    domain: "bloomberg.com",
    allow_cookies: 1,
    block_regex: /(\.cm\.bloomberg\.com\/|assets\.bwbx\.io\/s\d\/javelin\/.+\/transporter\/)/
  },
  "Bloomberg Adria": {
    domain: "bloombergadria.com",
    allow_cookies: 1,
    block_js_inline: /\.bloombergadria\.com\/.+\/news\//
  },
  "Börsen-Zeitung": {
    domain: "boersen-zeitung.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "BQ Prime": {
    domain: "bqprime.com",
    allow_cookies: 1,
    block_js_inline: /\.bqprime\.com\/.+\/.+\?rel=geo_block/,
    block_regex: /(\.tinypass\.com\/api\/tinypass\.min\.js|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Bridge Tower Media (opt-in to custom sites)": {
    domain: "###_usa_bridge_tower",
    group: [],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/script\\.js"
  },
  "Bulletin of the Atomic Scientists": {
    domain: "thebulletin.org",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Business Insider": {
    domain: "businessinsider.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Business Post.ie": {
    domain: "businesspost.ie",
    allow_cookies: 1,
    block_regex: /\.businesspost\.ie\/api\/tinypass\.min\.js/,
    cs_dompurify: 1
  },
  "Business Standard": {
    domain: "business-standard.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "California Business Journals": {
    domain: "###_usa_cbj",
    group: [
      "labusinessjournal.com",
      "ocbj.com",
      "sdbj.com",
      "sfvbj.com"
    ],
    allow_cookies: 1,
    block_regex: /\/olytics\.omeda\.com\//
  },
  "Cambio Colombia": {
    domain: "cambiocolombia.com",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "CartaCapital": {
    domain: "cartacapital.com.br",
    allow_cookies: 1
  },
  "Causeur": {
    domain: "causeur.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Challenges": {
    domain: "challenges.fr",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Charlie Hebdo": {
    domain: "charliehebdo.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Chemical & Engineering News": {
    domain: "cen.acs.org"
  },
  "Cicero.de": {
    domain: "cicero.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Ciel & espace": {
    domain: "cieletespace.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Citywire": {
    domain: "citywire.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "CNBC (news only)": {
    domain: "cnbc.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Commentary Magazine": {
    domain: "commentary.org",
    block_regex: /\.commentary\.org\/.+\/js\/dg-locker-public\.js/
  },
  "CommonWealth Magazine Taiwan (free articles only)": {
    domain: "cw.com.tw"
  },
  "Condé Nast magazines": {
    domain: "###_usa_conde_nast",
    group: [
      "architecturaldigest.com",
      "bonappetit.com",
      "cntraveler.com",
      "epicurious.com",
      "gq.com",
      "newyorker.com",
      "vanityfair.com",
      "vogue.com",
      "wired.com"
    ],
    allow_cookies: 1,
    remove_cookies: 1,
    block_regex: "(\\.{domain}\\/journey\\/compiler\\/build-.+\\.js|cdn\\.ampproject\\.org\\/v\\d\\/amp-subscriptions-.+\\.js)",
    useragent: "googlebot"
  },
  "Connaissance des Arts": {
    domain: "connaissancedesarts.com",
    allow_cookies: 1,
    block_regex: /\.connaissancedesarts\.com\/wp-content\/cache\/.+\.js/
  },
  "Correio da Manhã": {
    domain: "cmjornal.pt",
    allow_cookies: 1
  },
  "Correio do Povo": {
    domain: "correiodopovo.com.br",
    allow_cookies: 1,
    block_regex: /(paywall\.correiodopovo\.com\.br|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Corriere della Sera": {
    domain: "corriere.it",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.corriereobjects\.it\/.+\/js\/_paywall\.sjs|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Corriere dello Sport": {
    domain: "corrieredellosport.it",
    remove_cookies_select_drop: ["paywall_articles"]
  },
  "Cosmopolitan.fr": {
    domain: "cosmopolitan.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Crain Communications": {
    domain: "###_usa_craincomm",
    group: [
      "360dx.com",
      "adage.com",
      "autonews.com",
      "chicagobusiness.com",
      "crainscleveland.com",
      "crainsdetroit.com",
      "crainsnewyork.com",
      "european-rubber-journal.com",
      "genomeweb.com",
      "modernhealthcare.com",
      "pionline.com",
      "plasticsnews.com",
      "precisionmedicineonline.com",
      "rubbernews.com",
      "sustainableplastics.com",
      "tirebusiness.com",
      "utech-polyurethane.com"
    ],
    allow_cookies: 1,
    block_regex: /(js\.pelcro\.com\/|\.com\/.+\/js\/js_.+\.js)/,
    exception: [{
        domain: "european-rubber-journal.com",
        allow_cookies: 1,
      }
    ]
  },
  "Crikey.com.au": {
    domain: "crikey.com.au",
    block_regex: /\.crickey\.com\.au\/zephr\/feature/,
    remove_cookies_select_drop: ["blaize_session"]
  },
  "Crusoe.com.br": {
    domain: "crusoe.com.br",
    allow_cookies: 1,
    block_regex: /\.crusoe\.com\.br\/assets\/js\/swg-wallcontent-crusoe\.js/
  },
  "Dagens ETC": {
    domain: "etc.se",
    allow_cookies: 1
  },
  "Dagens Industri": {
    domain: "di.se",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "De Tijd": {
    domain: "tijd.be",
    referer: "google"
  },
  "Defector": {
    domain: "defector.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Der Freitag": {
    "domain": "freitag.de",
    "allow_cookies": 1
  },
  "Der Spiegel (link to archive.is)": {
    domain: "spiegel.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Der Tagesspiegel (link to archive.is/not background/checkpoint)": {
    domain: "tagesspiegel.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Deutscher Fachverlag Mediengruppe (opt-in to custom sites)": {
    domain: "###_de_dfv_medien",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Diario Financiero": {
    domain: "df.cl",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Die Presse": {
    domain: "diepresse.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Die Welt (link to archive.is)": {
    domain: "welt.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Die Zeit (link to archive.is)": {
    domain: "zeit.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Digiday": {
    domain: "digiday.com",
    allow_cookies: 1,
    block_regex: /(cdn\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Discover Magazine": {
    domain: "discovermagazine.com"
  },
  "Domani": {
    domain: "editorialedomani.it",
    allow_cookies: 1,
    block_regex: /(\.editorialedomani\.it\/pelcro\.js|js\.pelcro\.com\/)/,
    useragent: "googlebot"
  },
  "Doorbraak.be": {
    domain: "doorbraak.be",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "DPG Media (not ADR)": {
    domain: "###_nl_dpg_media",
    group: [
      "demorgen.be",
      "flair.nl",
      "humo.be",
      "libelle.nl",
      "margriet.nl",
      "parool.nl",
      "trouw.nl",
      "volkskrant.nl"
    ],
    remove_cookies_select_drop: ["TID_ID"],
    block_regex: "(\\.{domain}\\/temptation\\/resolve|temptation\\.{domain}\\/temptation\\.js)"
  },
  "Eastwest.eu": {
    domain: "eastwest.eu",
    allow_cookies: 1
  },
  "El Confidencial": {
    domain: "elconfidencial.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "El Cronista": {
    domain: "cronista.com",
    allow_cookies: 1,
    block_regex: /cdn\.wyleex\.com\/elcronista\/pw\.min\.js/
  },
  "El Diario.es": {
    domain: "eldiario.es",
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "El Español": {
    domain: "elespanol.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "El Espectador": {
    domain: "elespectador.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "El Mercurio (not Inversiones/Legal; + regional/opt-in to custom sites)": {
    domain: "elmercurio.com",
    group: [
      "elmercurio.com"
    ],
    block_regex: "(\\.{domain}\\/impresa\\/.+\\/assets\\/(vendor|\\d)\\.js|pram\\.pasedigital\\.cl\\/API\\/User\\/Status\\?)",
    exception: [{
        domain: "elmercurio.com",
        allow_cookies: 1,
        block_regex: /\.(elmercurio\.com|emol\.cl)\/(.+\/)?js\/(.+\/)?(modal|merPramV\d|PramModal\.min)\.js/,
        useragent: "googlebot"
      }
    ]
  },
  "El Observador.com.uy": {
    domain: "elobservador.com.uy",
    allow_cookies: 1,
    block_regex: /(\.elobservador\.com\.uy\/shares|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "El País": {
    domain: "elpais.com",
    allow_cookies: 1,
    block_js_inline: /\.elpais\.com\/.+\.html/,
    block_regex: /(\/elpais\.com\/arc\/subs\/p\.min\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "El País.com.uy": {
    domain: "elpais.com.uy",
    allow_cookies: 1,
    block_regex: /(\.elpais\.com\.uy\/user\/authStatus|\.evolok\.net\/|cdn\.cxense\.com\/)/
  },
  "El Tiempo": {
    domain: "eltiempo.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "El Tribuno": {
    domain: "eltribuno.com",
    allow_cookies: 1,
    block_regex: /\.eltribuno\.com\/scripts\/Bellhop\/dist\/bellhop\.min\.js/
  },
  "Elle.fr": {
    domain: "elle.fr",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Encyclopedia Britannica": {
    domain: "britannica.com"
  },
  "eNotes": {
    domain: "enotes.com",
    allow_cookies: 1
  },
  "ESPN USA (news only)": {
    domain: "espn.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Esprit": {
    domain: "esprit.presse.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Estado de Minas": {
    domain: "em.com.br",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "EUobserver": {
    domain: "euobserver.com",
    allow_cookies: 1
  },
  "Evening Standard (UK)": {
    domain: "standard.co.uk",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Exame": {
    domain: "exame.com",
    block_regex: /\/exame\.com\/.+\/js\/pywll-dyn\.js/
  },
  "Fast Company": {
    domain: "fastcompany.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.fastcompany\.com\/script\.js)/
  },
  "Field & Stream": {
    domain: "fieldandstream.com",
    allow_cookies: 1
  },
  "Financial News (London)": {
    domain: "fnlondon.com",
    allow_cookies: 1,
    referer: "twitter"
  },
  "Financial Times (not Chinese)": {
    domain: "ft.com",
    useragent: "googlebot"
  },
  "Financieele Dagblad (fd.nl)": {
    domain: "fd.nl",
    referer: "facebook",
    remove_cookies_select_drop: ["socialread"]
  },
  "First Things": {
    domain: "firstthings.com"
  },
  "Follow the Money (ftm.nl & ftm.eu)": {
    domain: "###_nl_eu_ftm",
    group: [
      "ftm.eu",
      "ftm.nl"
    ],
    allow_cookies: 1,
    block_regex: /\.ftm\.(nl|eu)\/js\/routing\?/
  },
  "Forbes (not newsletters)": {
    domain: "forbes.com",
    allow_cookies: 1,
    block_regex: /(\.forbes\.com\/zephr\/feature|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Foreign Affairs": {
    domain: "foreignaffairs.com",
    block_regex: /\.foreignaffairs\.com\/modules\/custom\/fa_paywall_js\/js\/paywall\.js/
  },
  "Foreign Policy": {
    domain: "foreignpolicy.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Fortune": {
    domain: "fortune.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Franc-Tireur": {
    domain: "franc-tireur.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Frankfurter Allgemeine Zeitung": {
    domain: "faz.net",
    allow_cookies: 1
  },
  "Freie Presse": {
    domain: "freiepresse.de",
    allow_cookies: 1,
    block_js_inline: /\.freiepresse\.de\/.+-artikel/,
    cs_dompurify: 1
  },
  "Funke Mediengruppe": {
    domain: "###_de_funke_medien",
    group: [
      "abendblatt.de",
      "ikz-online.de",
      "nrz.de",
      "otz.de",
      "thueringer-allgemeine.de",
      "tlz.de",
      "waz.de",
      "wp.de",
      "wr.de"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    block_regex: /\.tinypass\.com\//
  },
  "Gannett Group (local USA Today)": {
    domain: "###_usa_gannett",
    group: [
      "azcentral.com",
      "cincinnati.com",
      "commercialappeal.com",
      "courier-journal.com",
      "democratandchronicle.com",
      "detroitnews.com",
      "freep.com",
      "indystar.com",
      "jsonline.com",
      "knoxnews.com",
      "news-press.com",
      "northjersey.com",
      "oklahoman.com",
      "statesman.com",
      "tennessean.com"
    ],
    allow_cookies: 1,
    amp_unhide: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "GaúchaZH": {
    domain: "gauchazh.clicrbs.com.br",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/api\/tinypass\.min\.js|\.clicrbs\.com\.br\/paywall-api\/count\/)/
  },
  "Gazeta do Povo": {
    domain: "gazetadopovo.com.br",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Glassdoor (regwall)": {
    domain: "glassdoor.com"
  },
  "Globes": {
    domain: "globes.co.il",
    block_regex: /\.tinypass\.com\//
  },
  "Granta Magazine": {
    domain: "granta.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groene Amsterdammer": {
    domain: "groene.nl",
    remove_cookies_select_hold: ["accept-cookies", "popunder-hidden"],
    useragent: "googlebot"
  },
  "Groupe Capitales Médias (+ regional/opt-in to custom sites)": {
    domain: "###_ca_gcm",
    group: [
      "lesoleil.com"
    ],
    allow_cookies: 1,
    remove_cookies: 1
  },
  "Groupe Centre France": {
    domain: "###_fr_gcf",
    group: [
      "lamontagne.fr"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Groupe ESH Médias": {
    domain: "###_ch_esh_medias",
    group: [
      "arcinfo.ch",
      "lacote.ch",
      "lenouvelliste.ch"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groupe IPM": {
    domain: "###_be_groupe_ipm",
    group: [
      "dhnet.be",
      "lalibre.be",
      "lavenir.net"
    ],
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Groupe La Dépêche": {
    domain: "###_fr_groupe_la_depeche",
    group: [
      "centrepresseaveyron.fr",
      "ladepeche.fr",
      "lindependant.fr",
      "midilibre.fr",
      "nrpyrenees.fr",
      "petitbleu.fr",
      "rugbyrama.fr"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "Groupe Nice-Matin": {
    domain: "###_fr_groupe_nice_matin",
    group: [
      "monacomatin.mc",
      "nicematin.com",
      "varmatin.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Groupe Québecor": {
    domain: "###_ca_groupe_quebecor",
    group: [
      "journaldemontreal.com",
      "journaldequebec.com"
    ],
    allow_cookies: 1
  },
  "Groupe Rossel (link to archive.is)": {
    domain: "###_fr_be_groupe_rossel",
    group: [
      "aisnenouvelle.fr",
      "courrier-picard.fr",
      "lardennais.fr",
      "lavoixdunord.fr",
      "lesoir.be",
      "lest-eclair.fr",
      "liberation-champagne.fr",
      "lunion.fr",
      "nordlittoral.fr",
      "paris-normandie.fr",
      "sudinfo.be"
    ],
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Groupe Sud Ouest": {
    domain: "###_fr_groupe_sud_ouest",
    group: [
      "sudouest.fr",
      "charentelibre.fr",
      "larepubliquedespyrenees.fr"
    ],
    allow_cookies: 1
  },
  "Groupe SynerJ Media (opt-in to custom sites)": {
    domain: "###_fr_synerj",
    group: [],
    allow_cookies: 1,
    ld_json_url: "div#encart_abo|div.article_bloc_texte",
    useragent: "googlebot"
  },
  "Grupo Abril": {
    domain: "abril.com.br",
    allow_cookies: 1,
    block_js_inline: /\.abril\.com\.br\/.+\/(\w+\-+){3,}/
  },
  "Grupo Clarín": {
    domain: "###_ar_grupo_clarin",
    group: [
      "clarin.com",
      "lavoz.com.ar",
      "losandes.com.ar"
    ],
    allow_cookies: 1,
    block_regex: /\.clarin\.com\/js\/meter\w*\.js/,
    exception: [{
        domain: "lavoz.com.ar",
        allow_cookies: 1,
        block_regex: /cdn\.wyleex\.com\/lavoz\/pw\.min\.js/
      }, {
        domain: "losandes.com.ar",
        allow_cookies: 1,
        block_regex: /cdn\.lavoz\.com\.ar\/sites\/.+\/paywall\/losandes\/pw\.js/
      }
    ]
  },
  "Grupo El Comercio": {
    domain: "###_pe_grupo_elcomercio",
    group: [
      "diariocorreo.pe",
      "elcomercio.pe",
      "gestion.pe"
    ],
    allow_cookies: 1,
    block_regex: "(\\.tinypass\\.com\\/|\\/{domain}\\/pf\\/dist\\/engine\\/react\\.js)"
  },
  "Grupo Prensa Ibérica": {
    domain: "###_es_epiberica",
    group: [
      "diariodemallorca.es",
      "eldia.es",
      "elperiodico.com",
      "epe.es",
      "farodevigo.es",
      "informacion.es",
      "laprovincia.es",
      "levante-emv.com",
      "lne.es",
      "mallorcazeitung.es"
    ],
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Grupo Unidad Editorial": {
    domain: "###_es_unidad",
    group: [
      "elmundo.es",
      "expansion.com",
      "marca.com"],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js/
  },
  "Grupo Vocento": {
    domain: "###_es_grupo_vocento",
    group: [
      "abc.es",
      "diariosur.es",
      "diariovasco.com",
      "elcomercio.es",
      "elcorreo.com",
      "eldiariomontanes.es",
      "elnortedecastilla.es",
      "hoy.es",
      "ideal.es",
      "larioja.com",
      "lasprovincias.es",
      "laverdad.es",
      "lavozdigital.es"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "Gruppo GEDI.it (listed sites only)": {
    domain: "###_it_gedi",
    group: [
      "ilsecoloxix.it",
      "italian.tech",
      "lastampa.it",
      "lescienze.it",
      "moda.it",
      "repubblica.it"
    ],
    remove_cookies_select_drop: ["blaize_session"],
    block_regex: /(scripts\.repubblica\.it\/pw\/pw\.js|cdn\.ampproject\.org\/v\d\/amp-(access|user-notification)-.+\.js)/,
    useragent: "googlebot",
    exception: [{
        domain: "lastampa.it",
        block_js_inline: /\.lastampa\.it\/.+\/news\//,
        remove_cookies_select_drop: ["blaize_session"]
      }, {
        domain: "repubblica.it",
        block_js_inline: /\.repubblica\.it\/.+\/news\//,
        remove_cookies_select_drop: ["blaize_session"]
      }
    ]
  },
  "Gruppo SAE.it (free articles only)": {
    domain: "###_it_gruppo_sae",
    group: [
      "iltirreno.it",
      "lanuovasardegna.it"
    ]
  },
  "Haaretz English": {
    domain: "haaretz.com",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "Haaretz": {
    domain: "haaretz.co.il",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "Haas Mediengruppe (opt-in to custom sites)": {
    domain: "###_de_haas_medien",
    group: [
      "mannheimer-morgen.de"
    ],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Handelszeitung.ch": {
    allow_cookies: 1,
    domain: "handelszeitung.ch",
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1,
    useragent: "googlebot"
  },
  "Harper's Magazine": {
    domain: "harpers.org",
    block_regex: /\/harpers\.org\/wp-content\/themes\/timber\/static\/js\/modal.+\.js/
  },
  "Harvard Business Review (do not block TinyPass-script externally)": {
    domain: "hbr.org",
    block_regex: /cdn\.cxense\.com\//,
    remove_cookies_select_drop: ["xbc"]
  },
  "Haymarket Media Group (opt-in to custom sites)": {
    domain: "###_uk_haymarket",
    group: [],
    useragent: "googlebot"
  },
  "Haymarket Medical Network (opt-in to custom sites)": {
    domain: "###_uk_haymarket_medical",
    group: [],
    allow_cookies: 1,
    remove_cookies: 1,
    cs_code: [{"cond":"div#modal-register-popup, div.gating-banner", "rm_elem":1}, {"cond":"div[data-gated]", "rm_attrib":"data-gated"}]
  },
  "Hearst Communications (newspapers)": {
    domain: "###_usa_hearst_comm",
    group: [
      "ctpost.com",
      "expressnews.com",
      "houstonchronicle.com",
      "nhregister.com",
      "sfchronicle.com",
      "timesunion.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/script\\.js|\\.ensighten\\.com\\/|js\\.matheranalytics\\.com\\/)"
  },
  "Hearst Communications magazines": {
    domain: "###_usa_hearst_comm_mag",
    group: [
      "bicycling.com",
      "cosmopolitan.com",
      "countryliving.com",
      "delish.com",
      "elle.com",
      "elledecor.com",
      "esquire.com",
      "goodhousekeeping.com",
      "harpersbazaar.com",
      "housebeautiful.com",
      "menshealth.com",
      "oprahdaily.com",
      "popularmechanics.com",
      "prevention.com",
      "roadandtrack.com",
      "runnersworld.com",
      "townandcountrymag.com",
      "womenshealthmag.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.com\/_assets\/jam\/journey-data\.js|\.ensighten\.com\/.+\/Bootstrap\.js)/
  },
  "Hindu Tamil Thisai": {
    domain: "hindutamil.in",
    allow_cookies: 1
  },
  "Hindustan Times": {
    domain: "hindustantimes.com",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "Honolulu Star-Advertiser": {
    domain: "staradvertiser.com",
    allow_cookies: 1,
    block_regex: /js\.matheranalytics\.com\//
  },
  "Il Fatto Quotidiano": {
    domain: "ilfattoquotidiano.it",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "Il Foglio": {
    domain: "ilfoglio.it",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "Il Manifesto": {
    domain: "ilmanifesto.it",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Il Messaggero (+ regional)": {
    domain: "###_it_ilmessaggero",
    group: [
      "corriereadriatico.it",
      "ilgazzettino.it",
      "ilmattino.it",
      "ilmessaggero.it",
      "quotidianodipuglia.it"
    ],
    allow_cookies: 1,
    block_regex: /(\.(cedscdn|cedsdigital)\.it\/.+\/PaywallMeter\.js|cdn\.ampproject\.org\/v\d\/amp-(access|consent|subscriptions)-.+\.(m)?js)/
  },
  "Inc.com": {
    domain: "inc.com",
    block_regex: /\.tinypass\.com\//
  },
  "Inc42": {
    domain: "inc42.com",
    allow_cookies: 1,
    block_regex: /(\.inc42\.com\/wp-content\/plugins\/leaky-paywall\/js\/leaky-paywall-cookie\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Incisive Media (opt-in to custom sites)": {
    domain: "###_uk_incisive_media",
    group: [],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "India Today": {
    domain: "indiatoday.in",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "iNews (UK)": {
    domain: "inews.co.uk",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Inkl": {
    domain: "inkl.com"
  },
  "Inside Higher Ed": {
    domain: "insidehighered.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Inside Retail (opt-in to custom sites)": {
    domain: "###_au_inside_retail",
    group: [],
    ld_json_url: "div#premium-box|div.article__text__holder|1"
  },
  "InvestSmart": {
    domain: "###_au_investsmart",
    group: [
      "intelligentinvestor.com.au",
      "investsmart.com.au"
    ],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Interesting Engineering": {
    domain: "interestingengineering.com",
    allow_cookies: 1
  },
  "Internazionale.it": {
    domain: "internazionale.it",
    allow_cookies: 1,
    block_regex: /\.internazionale\.it\/templates_js_ajax\.inc\.php/
  },
  "Investors' Chronicle": {
    allow_cookies: 1,
    domain: "investorschronicle.co.uk",
    referer: "google"
  },
  "iPolitics.ca": {
    domain: "ipolitics.ca",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Irish Independent": {
    domain: "independent.ie",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Italia Oggi": {
    domain: "italiaoggi.it",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Jacobin.de": {
    domain: "jacobin.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Jane's Defence Weekly": {
    domain: "janes.com",
    allow_cookies: 1
  },
  "Jazziz": {
    domain: "jazziz.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Jazzwise": {
    domain: "jazzwise.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Kölner Stadt-Anzeiger": {
    domain: "ksta.de",
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr\/decide/
  },
  "Kölnische Rundschau": {
    domain: "rundschau-online.de",
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr\/decide/
  },
  "Krautreporter.de": {
    domain: "krautreporter.de"
  },
  "Kurier.at (do not block TinyPass-script externally)": {
    domain: "kurier.at",
    allow_cookies: 1,
    block_regex: /cdn\.cxense\.com\//
  },
  "L'Écho": {
    domain: "lecho.be",
    referer: "google"
  },
  "L'Express": {
    domain: "lexpress.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\/data/
  },
  "L'Humanité": {
    domain: "humanite.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "L'Informé": {
    domain: "linforme.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "L'Obs": {
    domain: "nouvelobs.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "L'Oeil de la Photographie": {
    domain: "loeildelaphotographie.com",
    allow_cookies: 1,
    block_regex: /cdn\.loeildelaphotographie\.com\/wp-content\/.+\/hague-child\/js\/script-.+\.js/
  },
  "L'Opinion": {
    domain: "lopinion.fr",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "L'Usine Nouvelle": {
    domain: "usinenouvelle.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "La Croix": {
    domain: "la-croix.com",
    allow_cookies: 1,
    block_regex: /(\.la-croix\.com\/build\/.+\/paywall.+\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "La Diaria.com.uy": {
    domain: "ladiaria.com.uy",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "La Gazzetta dello Sport (text only)": {
    domain: "gazzetta.it",
    allow_cookies: 1
  },
  "La Nación (free articles only)": {
    domain: "lanacion.com.ar"
  },
  "La Nouvelle République du Centre-Ouest": {
    domain: "lanouvellerepublique.fr",
    allow_cookies: 1,
    block_regex: /(\.weborama\.fr\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "La Segunda": {
    domain: "lasegunda.com",
    block_regex: /\.(lasegunda\.com|emol\.cl)\/(.+\/)?js\/(.+\/)?(modal|merPramV\d|PramModal\.min)\.js/
  },
  "La Tercera": {
    domain: "latercera.com",
    allow_cookies: 1,
    block_regex: /(\.latercera\.com\/arc\/subs\/p\.min\.js|cdn\.cxense\.com\/|\.tinypass\.com\/)/
  },
  "La Tribune": {
    domain: "latribune.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "La Vanguardia": {
    domain: "lavanguardia.com",
    allow_cookies: 1,
    block_regex: /\/ev\.lavanguardia\.com\//
  },
  "Landwirtschaftsverlag": {
    domain: "###_de_lv",
    group: [
      "profi.de",
      "topagrar.at",
      "topagrar.com",
      "wochenblatt.com"
    ]
  },
  "Law.com (free articles only)": {
    domain: "law.com",
    allow_cookies: 1,
    remove_cookies: 1,
    referer: "facebook"
  },
  "Le Courrier des Stratèges": {
    domain: "lecourrierdesstrateges.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Devoir": {
    domain: "ledevoir.com",
    block_regex: /\.tinypass\.com\//,
    remove_cookies_select_drop: ["pw6"]
  },
  "Le Figaro (link to archive.is)": {
    domain: "lefigaro.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Grand Continent": {
    domain: "legrandcontinent.eu",
    allow_cookies: 1
  },
  "Le Journal du Dimanche": {
    domain: "lejdd.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Le Journal du Net": {
    domain: "journaldunet.com",
    allow_cookies: 1
  },
  "Le Monde (link to archive.is)": {
    domain: "lemonde.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Nouvel Economiste": {
    domain: "lenouveleconomiste.fr",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Le Parisien": {
    domain: "leparisien.fr",
    allow_cookies: 1
  },
  "Le Point": {
    domain: "lepoint.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_dompurify: 1
  },
  "Le Télégramme": {
    domain: "letelegramme.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "LeTemps.ch": {
    domain: "letemps.ch",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Lee Enterprises Group": {
    domain: "###_usa_lee_ent",
    group: [
      "buffalonews.com",
      "journalnow.com",
      "journalstar.com",
      "madison.com",
      "nwitimes.com",
      "omaha.com",
      "richmond.com",
      "stltoday.com",
      "tucson.com",
      "tulsaworld.com"
    ],
    allow_cookies: 1,
    block_regex: /\.com\/.+\/tncms\/api\/access\..+\.js/
  },
  "Les Échos": {
    domain: "lesechos.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Les Inrockuptibles": {
    domain: "lesinrocks.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Literary Review (UK)": {
    domain: "literaryreview.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Live Law": {
    domain: "livelaw.in",
    allow_cookies: 1
  },
  "LiveMint": {
    domain: "livemint.com",
    allow_cookies: 1,
    block_regex: /(\.livemint\.com\/__js\/lm_subscription|\.piano\.io\/api\/tinypass\.min\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Loeb Classical Library": {
    domain: "loebclassics.com"
  },
  "London Review of Books": {
    domain: "lrb.co.uk",
    allow_cookies: 1,
    block_js_inline: /\.lrb\.co\.uk\//
  },
  "Los Angeles Times": {
    domain: "latimes.com",
    block_regex: /\.californiatimes\.com\/meteringjs/
  },
  "MacroBusiness.com.au": {
    domain: "macrobusiness.com.au",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Madsack Mediengruppe": {
    domain: "###_de_madsack",
    group: [
      "haz.de",
      "kn-online.de",
      "ln-online.de",
      "lvz.de",
      "maz-online.de",
      "neuepresse.de",
      "ostsee-zeitung.de",
      "rnd.de"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Maine Trust for Local News (opt-in to custom sites)": {
    domain: "###_usa_maine_trust",
    group: [],
    allow_cookies: 1,
    block_regex: /loader\.masthead\.me\//
  },
  "Mainichi Shimbun": {
    domain: "mainichi.jp",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Marianne.net": {
    domain: "marianne.net",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_dompurify: 1
  },
  "MarketWatch": {
    domain: "marketwatch.com",
    allow_cookies: 1,
    block_regex: /(cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "McClatchy Group": {
    domain: "###_usa_mcc",
    group: [
      "bnd.com",
      "charlotteobserver.com",
      "fresnobee.com",
      "kansas.com",
      "kansascity.com",
      "kentucky.com",
      "mcclatchydc.com",
      "miamiherald.com",
      "newsobserver.com",
      "sacbee.com",
      "star-telegram.com",
      "thestate.com",
      "tri-cityherald.com"
    ],
    block_regex: /(\.amplitude\.com\/|js\.matheranalytics\.com|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "Media Group Westfalen (opt-in to custom sites for unlisted)": {
    domain: "###_de_mgw",
    group: [
      "ruhrnachrichten.de"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Mediahuis Noord (+ regional; opt-in to custom sites)": {
    domain: "###_nl_mediahuis_noord",
    group: [
      "dvhn.nl",
      "lc.nl"
    ],
    allow_cookies: 1,
    block_regex: /(\.evolok\.net\/|\.ndcmediagroep\.nl\/js\/evolok\/|\.nl\/_\/zh\/worker)/,
    cs_dompurify: 1
  },
  "MediaNews Group": {
    domain: "###_usa_mng",
    group: [
      "denverpost.com",
      "eastbaytimes.com",
      "mercurynews.com",
      "ocregister.com",
      "pressenterprise.com",
      "twincities.com"
    ],
    allow_cookies: 1,
    block_regex: "((\\.{domain}\\/script|\\/.+\\/loader\\.min)\\.js|\\.tinypass\\.com\\/|cdn\\.ampproject\\.org\\/v\\d\\/amp-subscriptions-.+\\.js)"
  },
  "Medienholding Süd": {
    domain: "###_de_mhs",
    group: [
      "stuttgarter-nachrichten.de",
      "stuttgarter-zeitung.de"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    useragent: "googlebot"
  },
  "Medium (opt-in to custom sites for custom domains)": {
    domain: "medium.com",
    allow_cookies: 1,
    group: [
      "medium.com",
      "betterprogramming.pub",
      "towardsdatascience.com",
      "webcache.googleusercontent.com"
    ],
    exception: [{
        domain: "webcache.googleusercontent.com",
        allow_cookies: 1,
        block_regex: /cdn-client\.medium\.com\/lite\/static\/js\/main\..+\.js/
      }
    ]
  },
  "Medscape (regwall)": {
    domain: "medscape.com",
    allow_cookies: 1,
    block_regex: /\.medscapestatic\.com\/.+\/medscape-library\.js/
  },
  "Mexico News Daily": {
    domain: "mexiconewsdaily.com",
    allow_cookies: 1,
    block_regex: /\/mexiconewsdaily\.com\/wp-content\/plugins\/leaky-paywall\/js\/leaky-paywall-cookie\.js/
  },
  "Mid-Day": {
    domain: "mid-day.com",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "MIT Sloan Management Review": {
    domain: "sloanreview.mit.edu",
    block_regex: /(\.tinypass\.com\/|\/sloanreview\.mit\.edu\/.+\/welcome-ad\.js)/,
    cs_dompurify: 1
  },
  "MIT Technology Review": {
    domain: "technologyreview.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.mjs)/
  },
  "Mitteldeutsche Zeitung": {
    domain: "mz.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Monocle": {
    domain: "monocle.com",
    useragent: "googlebot"
  },
  "Mountain View Voice": {
    domain: "mv-voice.com"
  },
  "Mundo Deportivo": {
    domain: "mundodeportivo.com",
    allow_cookies: 1,
    block_regex: /\.evolok\.net\//
  },
  "National Geographic USA": {
    domain: "nationalgeographic.com",
    allow_cookies: 1,
    block_regex: /\.blueconic\.net\//,
    random_ip: "eu"
  },
  "National Review (disable adblocker)": {
    domain: "nationalreview.com",
    allow_cookies: 1,
    remove_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "National World Publishing (UK)": {
    domain: "###_uk_nat_world",
    group: [
      "scotsman.com",
      "yorkshirepost.co.uk"
    ],
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.axate\.io\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Nautilus": {
    domain: "nautil.us",
    remove_cookies_select_drop: ["arc", "sfa"]
  },
  "Neue Westfälische": {
    domain: "nw.de",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "Neue Zürcher Zeitung (+ regional/CH Media; opt-in to custom sites)": {
    domain: "nzz.ch",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/|(ens\.nzz\.ch|\.ensighten\.com)\/.+\/Bootstrap\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/,
    useragent: "googlebot"
  },
  "New Left Review": {
    domain: "newleftreview.org",
    allow_cookies: 1,
    cs_dompurify: 1,
    useragent: "googlebot"
  },
  "New Scientist": {
    domain: "newscientist.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "New York Magazine (+ Curbed, Grub Street, The Cut & Vulture)": {
    domain: "###_usa_nymag",
    group: [
      "curbed.com",
      "grubstreet.com",
      "nymag.com",
      "thecut.com",
      "vulture.com"
    ],
    block_regex: /\.cloudfront\.net\/embed\/widget\/subx.+\.js/,
    remove_cookies_select_drop: ["nymcid", "first-nymcid"]
  },
  "New Zealand Herald": {
    domain: "nzherald.co.nz",
    allow_cookies: 1,
    block_regex: /\.nzherald\.co\.nz\/sales\/public\/v\d\/entitlements/
  },
  "Newsday": {
    domain: "newsday.com",
    allow_cookies: 1,
    block_regex: /(loader-cdn\.azureedge\.net\/|js\.matheranalytics\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Newsweek": {
    domain: "newsweek.com",
    block_regex: /(js\.pelcro\.com\/|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "NHST Media Group": {
    domain: "###_no_nhst_media",
    group: [
      "europower.no",
      "fiskeribladet.no",
      "intrafish.com",
      "intrafish.no",
      "rechargenews.com",
      "tradewindsnews.com",
      "upstreamonline.com"
    ],
    allow_cookies: 1,
    block_regex: /subscription-static-global\.nhst\.tech\//
  },
  "Nikkei Asian Review (do not block Piano.io-script externally)": {
    domain: "asia.nikkei.com",
    remove_cookies_select_drop: ["xbc"]
  },
  "NOZ/MHN Mediengruppe": {
    domain: "###_de_noz_mhn",
    group: [
      "noz.de",
      "shz.de",
      "svz.de"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "NRC Handelsblad": {
    domain: "nrc.nl",
    remove_cookies_select_drop: ["counter"],
    block_regex: /\.nrc\.nl\/paywall-api\/api\/zephr/
  },
  "NWT Media.se (opt-in to custom sites)": {
    domain: "###_se_nwt_media",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "NyTeknik": {
    domain: "nyteknik.se",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "O Estado de S. Paulo": {
    domain: "estadao.com.br",
    allow_cookies: 1,
    block_regex: /(\.estadao\.com\.br\/(paywall\/|access\.js)|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "O Globo (& Valor Econômico)": {
    domain: "globo.com",
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "Outdoor Life": {
    domain: "outdoorlife.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Outlook Business": {
    domain: "outlookbusiness.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Outlook India": {
    domain: "outlookindia.com",
    allow_cookies: 1
  },
  "Outside magazines": {
    domain: "###_usa_outside_mag",
    group: [
      "backpacker.com",
      "betamtb.com",
      "betternutrition.com",
      "cleaneatingmag.com",
      "climbing.com",
      "outsideonline.com",
      "oxygenmag.com",
      "skimag.com",
      "trailrunnermag.com",
      "triathlete.com",
      "vegetariantimes.com",
      "womensrunning.com",
      "yogajournal.com"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Palo Alto Online": {
    domain: "paloaltoonline.com"
  },
  "Paris Match": {
    domain: "parismatch.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "PEI Media (opt-in to custom sites)": {
    domain: "###_usa_pei",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Penske Media Corporation": {
    domain: "###_usa_penske_media",
    allow_cookies: 1,
    group: [
      "billboard.com",
      "rollingstone.com",
      "sportico.com",
      "variety.com",
      "wwd.com"
    ],
    block_regex: /(\.tinypass\.com\/|cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "PhiloMag.com": {
    domain: "philomag.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "PhiloMag.de": {
    domain: "philomag.de",
    allow_cookies: 1
  },
  "Philosophy Now": {
    domain: "philosophynow.org"
  },
  "Piqd.de": {
    domain: "piqd.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Pittsburgh Post Gazette": {
    domain: "post-gazette.com",
    block_regex: /\.tinypass\.com\//
  },
  "Política Exterior": {
    domain: "politicaexterior.com",
    allow_cookies: 1
  },
  "Popular Science": {
    domain: "popsci.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Postmedia Network": {
    domain: "###_ca_postmedia",
    group: [
      "calgaryherald.com",
      "financialpost.com",
      "nationalpost.com",
      "theprovince.com",
      "torontosun.com",
      "vancouversun.com"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Pour la Science.fr": {
    domain: "pourlascience.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Private Equity News": {
    domain: "penews.com",
    useragent: "googlebot"
  },
  "Profil.at": {
    domain: "profil.at",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Project Syndicate (link to archive.is)": {
    domain: "project-syndicate.org",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "ProMedia.nl Group (opt-in to custom sites)": {
    domain: "###_nl_promedia",
    group: [],
    useragent: "googlebot"
  },
  "Prospect Magazine": {
    domain: "prospectmagazine.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Public.fr": {
    domain: "public.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Puck.news": {
    domain: "puck.news",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Quartz (newsletter)": {
    domain: "qz.com",
    allow_cookies: 1,
    block_regex: /\.kinja-static\.com\/assets\/.+\/regwalled-content.+\.js/
  },
  "Quora": {
    domain: "quora.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Quotidiano.net (+ regional)": {
    domain: "###_it_quotidiano",
    group: [
      "ilgiorno.it",
      "ilrestodelcarlino.it",
      "iltelegrafolivorno.it",
      "lanazione.it",
      "quotidiano.net"
    ],
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Record.pt": {
    domain: "record.pt",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "Reuters": {
    domain: "reuters.com",
    allow_cookies: 1,
    block_regex: /\.reuters\.com\/(arc\/subs\/p\.min|pf\/resources\/dist\/reuters\/js\/index)\.js/
  },
  "Revue Conflits": {
    domain: "revueconflits.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\/data/
  },
  "Revista Oeste": {
    domain: "revistaoeste.com",
    allow_cookies: 1,
    block_regex: /\/revistaoeste\.com\/wp-content\/.+\/js\/app\..+\.js/
  },
  "Rhein-Zeitung": {
    domain: "rhein-zeitung.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Roularta Media Group": {
    domain: "###_be_roularta",
    group: [
      "artsenkrant.com",
      "beleggersbelangen.nl",
      "femmesdaujourdhui.be",
      "flair.be",
      "knack.be",
      "kw.be",
      "levif.be",
      "libelle.be"
    ],
    allow_cookies: 1,
    block_js_inline: /\.(femmesdaujourdhui|flair|knack|levif|libelle)\.be\/.+\/((\w)+(\-)+){3,}/,
    block_regex: "(\\.|\\/){domain}\\/(script|js\\/responsive\\/rmg(Modal|Paywall))\\.js"
  },
  "RugbyPass": {
    domain: "rugbypass.com",
    allow_cookies: 1,
    block_js_inline: /\.rugbypass\.com\/plus\//,
    block_regex: /\.tinypass\.com\//
  },
  "Rzeczpospolita": {
    domain: "rp.pl",
    cs_dompurify: 1
  },
  "S&P Global": {
    domain: "spglobal.com",
    allow_cookies: 1,
    block_regex: /\.blueconic\.net\//
  },
  "Sábado (not video)": {
    domain: "sabado.pt",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/
  },
  "Saltwire Network": {
    domain: "saltwire.com",
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr-browser\//
  },
  "Salzburger Nachrichten": {
    domain: "sn.at",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "San Diego Union Tribune": {
    domain: "sandiegouniontribune.com",
    block_regex: /\.californiatimes\.com\/meteringjs/
  },
  "Schwäbische Zeitung": {
    domain: "schwaebische.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Schweizer Monat": {
    domain: "schweizermonat.ch",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Science (free articles only)": {
    domain: "science.org",
    allow_cookies: 1
  },
  "Science & Vie": {
    domain: "science-et-vie.com",
    block_regex: /\.qiota\.com\//
  },
  "Sciences et Avenir": {
    domain: "sciencesetavenir.fr",
    block_regex: /(\.poool\.fr\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Scientific American": {
    domain: "scientificamerican.com",
    allow_cookies: 1,
    block_regex: /\.scientificamerican\.com\/api\/tinypass\.min\.js/
  },
  "Seeking Alpha": {
    domain: "seekingalpha.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org(\/.+)?\/v\d\/amp-(access|loader)-.+\.js)/
  },
  "Slate": {
    domain: "slate.com",
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "SlideShare": {
    domain: "slideshare.net",
    allow_cookies: 1
  },
  "SOFREP": {
    domain: "sofrep.com"
  },
  "South China Morning Post": {
    domain: "scmp.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js)/
  },
  "Southern Weekly": {
    domain: "infzm.com",
    allow_cookies: 1
  },
  "Sport Life Ibérica (text only; opt-in to custom sites)": {
    domain: "###_es_sport_life",
    group: [],
    allow_cookies: 1,
    ld_json: "div.c-paywall|div.c-mainarticle__body"
  },
  "Sports Illustrated": {
    domain: "si.com",
    allow_cookies: 1,
    block_regex: /\.blueconic\.net\//
  },
  "Springer Medizin": {
    domain: "springermedizin.de",
    allow_cookies: 1
  },
  "Star Tribune": {
    domain: "startribune.com",
    allow_cookies: 1
  },
  "Statista": {
    domain: "statista.com",
    referer: "google"
  },
  "Stereogum": {
    domain: "stereogum.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Stock News": {
    domain: "stocknews.com",
    allow_cookies: 1
  },
  "StuDocu (no downloads)": {
    domain: "studocu.com",
    allow_cookies: 1
  },
  "Stylist.co.uk": {
    domain: "stylist.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Suomen Sotilas": {
    domain: "suomensotilas.fi",
    allow_cookies: 1,
    block_regex: /\/suomensotilas\.fi\/wp-content\/plugins\/epflpw\/js\/pw\.js/
  },
  "Süddeutsche Zeitung (link to archive.is)": {
    domain: "sueddeutsche.de",
    allow_cookies: 1,
    block_regex: /\.sueddeutsche\.de\/api\/tinypass\.min\.js/
  },
  "Swarajyamag": {
    domain: "swarajyamag.com",
    allow_cookies: 1,
    remove_cookies: 1
  },
  "Tampa Bay Times": {
    domain: "tampabay.com",
    allow_cookies: 1,
    block_regex: /(\.zephr\.com\/zephr-browser\/|js\.matheranalytics\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "Tech in Asia": {
    domain: "techinasia.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "TechTarget Group": {
    domain: "###_usa_techtarget",
    allow_cookies: 1,
    group: [
      "computerweekly.com",
      "lemagit.fr",
      "techtarget.com"
    ]
  },
  "Telegraaf": {
    domain: "telegraaf.nl",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Télérama": {
    domain: "telerama.fr",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Tes Magazine": {
    domain: "tes.com",
    remove_cookies_select_drop: ["tg_paywall"]
  },
  "Texas Monthly": {
    domain: "texasmonthly.com",
    allow_cookies: 1,
    block_regex: /\.texasmonthly\.com\/script\.js/
  },
  "The (New Orleans) Advocate": {
    domain: "###_usa_theadvocate",
    group: [
      "nola.com",
      "theadvocate.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/(script||.+\\/tncms\\/user\\/user)\\.js|js\\.matheranalytics\\.com\\/)"
  },
  "The American Conservative": {
    domain: "theamericanconservative.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The American Interest": {
    domain: "the-american-interest.com",
    allow_cookies: 1
  },
  "The Art Newspaper": {
    domain: "theartnewspaper.com",
    allow_cookies: 1,
    block_regex: /\.theartnewspaper\.com\/_next\/static\/chunks\/pages\/access-allowed-.+\.js/
  },
  "The Athletic": {
    domain: "theathletic.com",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-(access|subscriptions)-.+\.js/
  },
  "The Atlanta Journal-Constitution (+ Cox First Media; opt-in to custom sites)": {
    domain: "ajc.com",
    allow_cookies: 1,
    block_regex: /(\.com\/prod\/ajc\/loader\.min\.js|\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Atlantic": {
    domain: "theatlantic.com",
    block_regex: /cdn\.theatlantic\.com\/_next\/static\/chunks\/pages\/.+\/archive\//,
    remove_cookies_select_drop: ["articleViews"]
  },
  "The Baffler": {
    domain: "thebaffler.com",
    allow_cookies: 1,
    block_regex: /\/blink\.net\/.+\/blink-sdk\.js/
  },
  "The Banker": {
    domain: "thebanker.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "The Boston Globe": {
    domain: "bostonglobe.com",
    allow_cookies: 1,
    block_regex: /(\.blueconic\.net\/|meter\.bostonglobe\.com\/js\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "The Business Journals (free articles only; do not block Cxense-script externally)": {
    domain: "bizjournals.com",
    block_regex: /cdn\.cxense\.com\/cx\.js/
  },
  "The Business of Fashion": {
    domain: "businessoffashion.com",
    allow_cookies: 1,
    block_regex: /(\.businessoffashion\.com\/zephr\/feature|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Christian Science Monitor": {
    domain: "csmonitor.com",
    allow_cookies: 1
  },
  "The Chronicle of Higher Education (& Philanthropy)": {
    domain: "###_usa_chronicle",
    group: [
      "chronicle.com",
      "philanthropy.com"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/script\\.js"
  },
  "The Columbian": {
    domain: "columbian.com",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "The Critic": {
    domain: "thecritic.co.uk",
    block_regex: /\.hadrianpaywall\.com\//
  },
  "The Daily Beast": {
    domain: "thedailybeast.com",
    block_regex: /\.tinypass\.com\//
  },
  "The Daily Wire (news only)": {
    domain: "dailywire.com",
    allow_cookies: 1
  },
  "The Dallas Morning News": {
    domain: "dallasnews.com",
    allow_cookies: 1,
    block_regex: /(\.dallasnews\.com\/script\.js|js\.matheranalytics\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/,
    useragent: "googlebot"
  },
  "The Diplomat (refresh magazine)": {
    domain: "thediplomat.com",
    useragent: "facebookbot"
  },
  "The Economic Times (ET Prime)": {
    domain: "###_economictimes",
    group: [
      "economictimes.com",
      "economictimes.indiatimes.com"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "The Economist": {
    domain: "economist.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Epoch Times (+ cz|de|fr|jp|ro; opt-in to custom sites)": {
    domain: "###_usa_epochtimes",
    group: [
      "epoch.org.il",
      "theepochtimes.com"
    ],
    allow_cookies: 1,
    block_regex: /subs\.(theepochtimes\.com|epochbase\.(com|eu))\/rules\/get/,
    exception: [{
        domain: "epoch.org.il",
        allow_cookies: 1,
        block_js_inline: /\/epoch\.org\.il\//,
        cs_dompurify: 1
      }
    ]
  },
  "The Financial Express": {
    domain: "financialexpress.com",
    allow_cookies: 1,
    block_regex: /(\.financialexpress\.com\/.+\/min\/premiumStoryContent\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Globe and Mail": {
    domain: "theglobeandmail.com",
    block_js_inline: /\.theglobeandmail\.com\/.+\/article-.+\?rel=premium/,
    block_regex: /smartwall\.theglobeandmail\.com\//
  },
  "The Hill": {
    domain: "thehill.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Hill Times": {
    domain: "hilltimes.com",
    allow_cookies: 1,
    block_regex: /\.hilltimes\.com\/.+\/js\/loadingoverlay\/loadingoverlay\.min\.js/,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "The Hindu": {
    domain: "thehindu.com",
    allow_cookies: 1,
    block_regex: /(cdn\.cxense\.com\/|\.piano\.io\/xbuilder\/experience\/execute|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "The Hindu BusinessLine": {
    domain: "thehindubusinessline.com",
    allow_cookies: 1,
    block_regex: /(cdn\.cxense\.com\/|\.piano\.io\/xbuilder\/experience\/execute|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/
  },
  "The Impression": {
    "domain": "theimpression.com",
    "allow_cookies": 1
  },
  "The Independent": {
    domain: "independent.co.uk",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Indian Express": {
    domain: "indianexpress.com",
    allow_cookies: 1,
    block_regex: /(\/indianexpress\.com\/.+\/(evolok\/.+|premiumContent)\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Intercept": {
    domain: "theintercept.com",
    allow_cookies: 1,
    block_regex: /\.theintercept\.com\/api\/tinypass\.min\.js/
  },
  "The Irish Times": {
    domain: "irishtimes.com",
    allow_cookies: 1,
    block_regex: /\.irishtimes\.com\/zephr\/feature/
  },
  "The Japan Times (do not block Piano.io-script externally)": {
    domain: "japantimes.co.jp",
    block_regex: /cdn\.cxense\.com\//,
    remove_cookies_select_drop: ["xbc"]
  },
  "The Jerusalem Post": {
    domain: "jpost.com",
    allow_cookies: 1,
    block_regex: /\.jpost\.com\/js\/js_article\.min\.js/
  },
  "The Juggernaut": {
    domain: "###_usa_thejuggernaut",
    group: [
      "thejuggernaut.com",
      "jgnt.co"
    ],
    allow_cookies: 1
  },
  "The Lawyer's Daily": {
    domain: "thelawyersdaily.ca",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "The Marker": {
    domain: "themarker.com",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "The Market.ch": {
    domain: "themarket.ch",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/|ens\.themarket\.ch\/.+\/Bootstrap\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/,
    useragent: "googlebot"
  },
  "The Nation": {
    domain: "thenation.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The New Atlantis": {
    domain: "thenewatlantis.com",
    allow_cookies: 1,
    block_regex: /\.thenewatlantis\.com\/.+\/thenewatlantis\/js\/(gate|donate)\.js/
  },
  "The New European": {
    domain: "theneweuropean.co.uk",
    allow_cookies: 1,
    block_regex: /cdn\.tinypass\.com\//
  },
  "The New Republic": {
    domain: "newrepublic.com",
    allow_cookies: 1,
    block_regex: /\/blink\.net\/.+\/blink-sdk\.js/
  },
  "The New Statesman": {
    domain: "newstatesman.com",
    allow_cookies: 1,
    block_regex: /\.newstatesman\.com\/.+\/nsmg-evolok-paywall\/.+\.js/
  },
  "The New York Post": {
    domain: "nypost.com",
    allow_cookies: 1,
    block_regex: /\.nypost\.com\/zephr\/feature/
  },
  "The New York Review of Books": {
    domain: "nybooks.com",
    allow_cookies: 1,
    block_regex: /\.nybooks\.com\/wp-admin\/admin-ajax\.php/
  },
  "The New York Sun": {
    domain: "nysun.com",
    allow_cookies: 1,
    block_regex: /\.nysun\.com\/zephr\/feature/
  },
  "The New York Times": {
    domain: "nytimes.com",
    allow_cookies: 1,
    block_regex: /(\.nytimes\.com\/meter\.js|mwcm\.nyt\.com\/.+\.js|cooking\.nytimes\.com\/api\/.+\/access)/,
    useragent: "googlebot"
  },
  "The News Minute": {
    domain: "thenewsminute.com",
    allow_cookies: 1
  },
  "The Philadelphia Inquirer": {
    domain: "inquirer.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|js\.matheranalytics\.com\/)/
  },
  "The Point Magazine": {
    domain: "thepointmag.com",
    remove_cookies_select_drop: ["monthly_history"]
  },
  "The Quint": {
    domain: "thequint.com",
    allow_cookies: 1
  },
  "The Saturday Paper": {
    domain: "thesaturdaypaper.com.au",
    block_regex: /\.thesaturdaypaper\.com\.au\/sites\/all\/modules\/custom\/node_meter\/pw\.js/
  },
  "The Scientist (archive)": {
    domain: "the-scientist.com",
    allow_cookies: 1
  },
  "The Seattle Times": {
    domain: "seattletimes.com",
    allow_cookies: 1,
    block_regex: /(\.seattletimes\.com\/.+\/st-user-messaging.+\.js|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Spectator (UK)": {
    domain: "spectator.co.uk",
    useragent: "googlebot"
  },
  "The Spectator Australia": {
    domain: "spectator.com.au",
    useragent: "googlebot"
  },
  "The Spectator World": {
    domain: "thespectator.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Telegraph": {
    domain: "telegraph.co.uk",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.telegraph\.co\.uk\/martech\/js\/|cdn\.ampproject\.org\/v\d\/amp-access-.+\.js)/
  },
  "The Times (UK; link to archive.is)": {
    domain: "thetimes.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Times Literary Supplement": {
    domain: "the-tls.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Toronto Star (+ local TorStar sites)": {
    domain: "###_ca_torstar",
    group: [
      "niagarafallsreview.ca",
      "stcatharinesstandard.ca",
      "thepeterboroughexaminer.com",
      "therecord.com",
      "thespec.com",
      "thestar.com",
      "wellandtribune.ca"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/(script|.+\\/tncms\\/api\\/access\\..+)\\.js|cdn\\.ampproject\\.org\\/v\\d\\/amp-access-.+\\.js)",
    cs_dompurify: 1
  },
  "The Verge (newsletter)": {
    domain: "theverge.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Wall Street Journal": {
    domain: "wsj.com",
    allow_cookies: 1,
    block_regex: /(cdn\.cxense\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/,
    referer: "drudgereport",
    useragent: "googlebot"
  },
  "The Washington Post": {
    domain: "washingtonpost.com",
    allow_cookies: 1,
    block_regex: /\.washingtonpost\.com\/tetro\/metering\/evaluate/
  },
  "The Week (regwall)": {
    domain: "theweek.com",
    allow_cookies: 1
  },
  "The West Australian (+ regional/opt-in to custom sites)": {
    domain: "thewest.com.au",
    allow_cookies: 1
  },
  "The Wrap": {
    domain: "thewrap.com",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "Times Higher Education": {
    domain: "timeshighereducation.com",
    allow_cookies: 1,
    block_regex: /\.timeshighereducation\.com\/sites\/default\/files\/.+\/js__.+\.js/
  },
  "Times of India": {
    domain: "###_timesofindia",
    group: [
      "timesofindia.com",
      "timesofindia.indiatimes.com"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    exception: [{
        domain: "timesofindia.indiatimes.com",
        allow_cookies: 1
      }
    ]
  },
  "Tiroler Tageszeitung": {
    domain: "tt.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\/xbuilder\/experience\/execute/
  },
  "Tribune Publishing Company": {
    domain: "###_usa_tribune",
    group: [
      "baltimoresun.com",
      "capitalgazette.com",
      "chicagotribune.com",
      "courant.com",
      "dailypress.com",
      "mcall.com",
      "nydailynews.com",
      "orlandosentinel.com",
      "pilotonline.com",
      "sun-sentinel.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.tribdss\\.com\\/|\\.{domain}\\/script\\.js|\\.zephr\\.com\\/zephr-browser\\/)"
  },
  "Tuttosport": {
    domain: "tuttosport.com",
    allow_cookies: 1,
    block_regex: /\.tuttosport\.com\/_next\/static\/chunks\/pages\/news\/%5B.+\.js/
  },
  "UnHerd": {
    domain: "unherd.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "UOL.com.br": {
    domain: "uol.com.br",
    allow_cookies: 1,
    block_regex: /(paywall\.folha\.uol\.com\.br\/|\.(tinypass|matheranalytics)\.com\/|cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js)/,
    useragent: "googlebot"
  },
  "USA Today": {
    domain: "usatoday.com",
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "Valeurs Actuelles": {
    domain: "valeursactuelles.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Verlagsgruppe Rhein Main": {
    allow_cookies: 1,
    domain: "###_de_vrm",
    group: [
      "allgemeine-zeitung.de",
      "echo-online.de",
      "wiesbadener-kurier.de"
    ],
    block_regex: /cdn\.cxense\.com\//,
    useragent: "googlebot"
  },
  "Vikatan": {
    domain: "vikatan.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Vogue Business": {
    allow_cookies: 1,
    domain: "voguebusiness.com",
    useragent: "facebookbot"
  },
  "Volksstimme": {
    domain: "volksstimme.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Vorarlberg Nachrichten": {
    domain: "vn.at",
    allow_cookies: 1,
    block_js_inline: /\.vn\.at\/.+\/\d{4}\//,
    block_regex: /\.tinypass\.com\//,
  },
  "Vorarlberg Online": {
    domain: "vol.at",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Vrij Nederland": {
    domain: "vn.nl",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Washington Examiner": {
    domain: "washingtonexaminer.com",
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr-browser\//
  },
  "Weltkunst": {
    domain: "weltkunst.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Weser-Kurier": {
    domain: "weser-kurier.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Westdeutsche Zeitung": {
    allow_cookies: 1,
    domain: "wz.de",
    useragent: "googlebot"
  },
  "Westfälische Mediengruppe": {
    domain: "###_de_westfalen_medien",
    group: [
      "muensterschezeitung.de",
      "westfalen-blatt.de",
      "wn.de"
    ],
    allow_cookies: 1,
    block_regex: /cdn\.ampproject\.org\/v\d\/amp-subscriptions-.+\.js/
  },
  "Winnipeg Free Press": {
    domain: "winnipegfreepress.com",
    allow_cookies: 1,
    block_regex: /(account\.winnipegfreepress\.com\/api\/v\d\/auth\/identify|cdn\.cxense\.com\/)/
  },
  "Wonderzine": {
    domain: "wonderzine.com",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "ZeroHedge": {
    domain: "zerohedge.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "* Block general paywall-scripts (opt-in to custom sites to enable also for unlisted sites)": {
    domain: "###"
  },
  "Amp-access": {
    domain: "cdn.ampproject.org",
    allow_cookies: 1,
    block_regex_general: /cdn\.ampproject\.org\/.+\/amp-(access|(.+-)?ad|analytics|fx-flying-carpet|subscriptions)-.+\.(m)?js/,
    excluded_domains: ["cambridge.org", "cmjornal.pt"]
  },
  "Amplitude": {
    domain: "amplitude.com",
    allow_cookies: 1,
    block_regex_general: /\.amplitude\.com\//,
    excluded_domains: ["amplitude.com"]
  },
  "Axate.io": {
    domain: "###_uk_axate.io",
    allow_cookies: 1,
    block_regex_general: /\.axate\.io\//
  },
  "AzureEdge": {
    domain: "loader-cdn.azureedge.net",
    allow_cookies: 1,
    block_regex_general: /loader-cdn\.azureedge\.net\//
  },
  "BlueConic": {
    domain: "blueconic.net",
    allow_cookies: 1,
    block_regex_general: /(\.blueconic\.net\/|[a-z]{1}[0-9]{2,3}\.[\w-]+\.(co(m|\.uk)|net|org)\/script\.js)/,
    excluded_domains: ["nationalreview.com"]
  },
  "Cxense": {
    domain: "cxense.com",
    allow_cookies: 1,
    block_regex_general: /cdn\.cxense\.com\//,
    excluded_domains: ["bizjournals.com", "journaldemontreal.com", "journaldequebec.com"]
  },
  "Ensighten": {
    domain: "ensighten.com",
    allow_cookies: 1,
    block_regex_general: /\.ensighten\.com\/.+\/Bootstrap\.js/
  },
  "Evolok": {
    domain: "evolok.net",
    allow_cookies: 1,
    block_regex_general: /\.evolok\.net\//
  },
  "Evolok WordPress": {
    domain: "###_wp_evolok",
    allow_cookies: 1,
    block_regex_general: /\/(wp-content\/.+\/ev-em|evolok\/.+\/ev-widgets)\.min\.js/
  },
  "FewCents": {
    domain: "fewcents.co",
    allow_cookies: 1,
    block_regex_general: /paywall\.fewcents\.co\/static\/js\/paywall\.js/
  },
  "Ippen.space": {
    domain: "ippen.space",
    allow_cookies: 1,
    block_regex_general: /(\.ippen\.space\/js\/paywall\.js|\/sub\/js\/pc-offer-west\.js)/
  },
  "Leaky Paywall (WordPress plugin)": {
    domain: "###_wp_leaky_paywall",
    group: [],
  },
  "MatherAnalytics": {
    domain: "matheranalytics.com",
    allow_cookies: 1,
    block_regex_general: /js\.matheranalytics.com\//
  },
  "NewsMemory": {
    domain: "newsmemory.com",
    allow_cookies: 1,
    block_regex_general: /\.newsmemory\.com\/\?meter/
  },
  "Omeda Olytics": {
    domain: "omeda.com",
    allow_cookies: 1,
    block_regex_general: /olytics\.omeda\.com\//
  },
  "OneCount": {
    domain: "onecount.net",
    allow_cookies: 1,
    block_regex_general: /\.onecount\.net\//,
    excluded_domains: ["onecount.net"]
  },
  "Pelcro": {
    domain: "pelcro.com",
    allow_cookies: 1,
    block_regex_general: /js\.pelcro\.com\//
  },
  "Piano.io (+ TinyPass)": {
    domain: "piano.io",
    allow_cookies: 1,
    block_regex_general: /\.piano\.io\/xbuilder\/experience\/execute/,
    excluded_domains: ["piano.io", "asia.nikkei.com", "hbr.org", "japantimes.co.jp", "kurier.at", "nacion.com", "onet.pl"]
  },
  "Pico.tools": {
    domain: "pico.tools",
    allow_cookies: 1,
    block_regex_general: /api\.pico\.tools\//
  },
  "Pigeon (WordPress plugin)": {
    domain: "###_wp_pigeon",
    allow_cookies: 1,
    block_regex_general: /\/c\/assets\/pigeon\.js/
  },
  "Poool.fr": {
    domain: "poool.fr",
    allow_cookies: 1,
    block_regex_general: /\.poool\.fr\//,
    excluded_domains: ["poool.fr"]
  },
  "Qiota": {
    domain: "qiota.com",
    allow_cookies: 1,
    block_regex_general: /\.qiota\.com\/data/,
    excluded_domains: ["qiota.com"]
  },
  "Steady": {
    domain: "steadyhq.com",
    allow_cookies: 1,
    block_regex_general: /\/steadyhq\.com\//,
    excluded_domains: ["steadyhq.com"]
  },
  "TownNews sites (Blox CMS)": {
    domain: "###_usa_townnews",
    block_regex_general: /\/tncms\/api\/access(\..+)?\.js/,
    cs_dompurify: 1
  },
  "TribDss": {
    domain: "tribdss.com",
    allow_cookies: 1,
    block_regex_general: /\.tribdss\.com\//
  },
  "Weborama.fr": {
    domain: "weborama.fr",
    allow_cookies: 1,
    block_regex_general: /\.weborama\.fr\//
  },
  "Zephr": {
    domain: "zephr.com",
    allow_cookies: 1,
    block_regex_general: /(\.zephr\.com\/zephr-browser\/|\/zephr\/feature)/
  },
  "* BPC settings": {
    domain: "###"
  },
  "Show options on update": {
    domain: "#options_on_update"
  },
  "Enable new sites by default": {
    domain: "#options_enable_new_sites"
  },
  "Check for update rules at startup": {
    domain: "#options_optin_update_rules"
  },
  "Australia News Corp - no Googlebot (blocked; only disabled when amp-fix)": {
    domain: "#options_disable_gb_au_news_corp"
  },
  "Barron's - no Googlebot (http error 500)": {
    domain: "#options_disable_gb_barrons"
  },
}

if (typeof browser !== 'object') {
  delete defaultSites['Roularta Media Group']['block_js_inline'];
}

var defaultSites_grouped_domains = Object.values(defaultSites).filter(function (value) {
    return (value.hasOwnProperty('domain') && value.domain !== '###');
  }).map(x => x.domain);
var defaultSites_groups_domains = [].concat.apply([], Object.values(defaultSites).filter(function (value) {
    return value.hasOwnProperty('group');
  }).map(x => x.group));
var defaultSites_domains = defaultSites_grouped_domains.concat(defaultSites_groups_domains);

function expandSiteRules(sites, updated = false) {
  for (let site in sites) {
    let rule = sites[site];
    if (rule.hasOwnProperty('group_rule')) {
      let rules = sites[rule.group_rule];
      for (key in rules) {
        if (key !== 'group_rule_domains')
          sites[site][key] = rules[key];
      }
      //delete sites[site].group_rule;
    }
    if (updated) {
      if (rule.hasOwnProperty('group_rule_domains')) {
        let domains = rule.group_rule_domains;
        for (let domain of domains) {
          let defaultTitle = Object.keys(defaultSites).find(key => defaultSites[key].domain === domain);
          if (defaultTitle) {
            for (key in rule) {
              if (key !== 'group_rule_domains')
                defaultSites[defaultTitle][key] = rule[key];
            }
          }
        }
      }
    }
    if (rule.hasOwnProperty('group')) {
      let domain = rule.domain;
      grouped_sites[domain] = rule.group
    }
  }
}

var grouped_sites = {};
expandSiteRules(defaultSites);

// grouped domains (background)
var au_news_corp_domains = grouped_sites['###_au_news_corp'];
var de_madsack_domains = grouped_sites['###_de_madsack'];
var es_grupo_vocento_domains = grouped_sites['###_es_grupo_vocento'];

// custom domains (background)
var custom_flex_not = {
  "###": ["gitlab.com"],
  "###_ca_postmedia": ["canada.com", "canoe.com", "driving.ca"],
  "###_de_dfv_medien": ["dfv.de"],
  "###_de_madsack": ["madsack.de", "madsack-medien-campus.de"],
  "###_wp_leaky_paywall": ["dominionpost.com", "epsilontheory.com", "heisenbergreport.com", "thewirechina.com"],
  "###_uk_axate.io": ["thecricketer.com", "thinkofx.net"],
  "###_uk_haymarket": ["gpbusiness.co.uk", "scmagazineuk.com", "thecorporatetreasurer.com"],
  "###_uk_haymarket_medical": ["mycme.com"],
  "###_usa_hearst_comm": ["sfgate.com"],
  "###_usa_mcc": ["mcclatchy.com"],
  "###_usa_townnews": ["bloxdigital.com", "townnews.com"],
  "thewest.com.au": ["perthnow.com.au"]
}
var custom_flex;
var custom_flex_domains;
var custom_flex_not_domains;

function init_custom_flex_domains() {
  custom_flex = {};
  custom_flex_domains = [];
  custom_flex_not_domains = [].concat.apply([], Object.values(custom_flex_not));
}
init_custom_flex_domains();

// sites with no fix (background)
var be_mediahuis_nofix_domains = ['gva.be', 'hbvl.be', 'nieuwsblad.be', 'standaard.be'];
var de_funke_medien_nofix_domains = ['braunschweiger-zeitung.de', 'harzkurier.de', 'morgenpost.de'];
var de_rp_aachen_medien_nofix_domains = ['aachener-nachrichten.de', 'aachener-zeitung.de', 'ga.de', 'rp-online.de', 'saarbruecker-zeitung.de', 'volksfreund.de'];
var fr_groupe_ebra_nofix_domains = ['bienpublic.com', 'dna.fr', 'estrepublicain.fr', 'lalsace.fr', 'ledauphine.com', 'lejsl.com', 'leprogres.fr', 'republicain-lorrain.fr', 'vosgesmatin.fr'];
var fr_indigo_nofix_domains = ['africaintelligence.com', 'africaintelligence.fr', 'glitz.paris', 'intelligenceonline.com', 'intelligenceonline.fr', 'lalettre.fr'];
var it_gedi_nofix_domains = ['gelocal.it', 'huffingtonpost.it', 'limesonline.com'];
var nl_mediahuis_region_nofix_domains = ['gooieneemlander.nl', 'haarlemsdagblad.nl', 'ijmuidercourant.nl', 'leidschdagblad.nl', 'noordhollandsdagblad.nl'];
var nofix_sites = ['aamulehti.fi', 'aftenposten.no', 'aftonbladet.se', 'allgaeuer-zeitung.de', 'asahi.com', 'asiatimes.com', 'autosport.com', 'aviationweek.com', 'badische-zeitung.de', 'bloomberglaw.com', 'bloombergtax.com', 'borsen.dk', 'businessinsider.de', 'businesslive.co.za', 'businesstimes.com.sg', 'caixin.com', 'caixinglobal.com', 'caravanmagazine.in', 'catalyst-journal.com', 'codesports.com.au', 'compactmag.com', 'courrierinternational.com', 'coursehero.com',  'deutsche-wirtschafts-nachrichten.de', 'die-glocke.de', 'dn.no', 'dn.se', 'elordenmundial.com', 'entrepreneur.com', 'epw.in', 'expresso.pt', 'falter.at', 'finance.si', 'ftchinese.com', 'ftchineselive.com', 'gamestar.de', 'geo.de', 'golem.de', 'gp.se', 'handelsblatt.com', 'hbrchina.org', 'hbrfrance.fr', 'heise.de', 'hln.be', 'hs.fi', 'ilsole24ore.com', 'information.dk', 'investors.com', 'iltalehti.fi', 'jacobin.com', 'jeuneafrique.com', 'jungefreiheit.de', 'kleinezeitung.at', 'lavie.fr', 'lavozdegalicia.es', 'law360.co.uk', 'law360.com', 'le1hebdo.fr', 'leconomiste.com', 'lefilmfrancais.com', 'lequipe.fr', 'lesjours.fr', 'liberation.fr', 'limburger.nl', 'main-echo.de', 'mainpost.de', 'manager-magazin.de', 'medianama.com', 'mediapart.fr', 'milanofinanza.it', 'mittelbayerische.de', 'monde-diplomatique.fr', 'mondediplo.com', 'money.it', 'moneycontrol.com', 'moodys.com', 'morningstar.com', 'moz.de', 'nachrichten.at', 'nationaljournal.com', 'nature.com', 'nbr.co.nz', 'newslaundry.com', 'nn.de', 'nwzonline.de', 'observador.pt', 'ouest-france.fr', 'philonomist.com', 'pnp.de', 'politicopro.com', 'politiken.dk', 'pressreader.com', 'publico.pt', 'quillette.com', 'republic.ru', 'rheinpfalz.de', 'risk.net', 'rnz.de', 'saechsische.de', 'schwarzwaelder-bote.de', 'sciencedirect.com', 'springer.com', 'statnews.com', 'stern.de', 'stimme.de', 'straitstimes.com', 'stratfor.com', 'substack.com', 'suedkurier.de', 'swp.de', 'techcrunch.com', 'the-ken.com', 'theinformation.com', 'theinitium.com', 'themorningcontext.com', 'theparisreview.org', 'thestar.com.my', 'thewirechina.com', 'weltwoche.ch', 'weltwoche.de', 'wissenschaft.de', 'wiwo.de', 'worldpoliticsreview.com', 'ynet.co.il'].concat(be_mediahuis_nofix_domains, de_funke_medien_nofix_domains, de_rp_aachen_medien_nofix_domains, fr_groupe_ebra_nofix_domains, fr_indigo_nofix_domains, it_gedi_nofix_domains, nl_mediahuis_region_nofix_domains);
