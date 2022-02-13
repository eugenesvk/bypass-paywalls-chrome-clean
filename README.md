# Bypass Paywalls Clean for Firefox

Add-on allows you to read articles from (supported) sites that implement a paywall.  
You can also add domains as custom site and try to bypass the paywall.  
Weekly updates are released for fixes and new sites.

* [Installation](#installation)
* [Update](#update)
* [List of supported websites](#list-of-supported-websites)
* [Sites with limited number of free articles](#sites-with-limited-number-of-free-articles)
* [New site requests](#new-site-requests)
* [Add custom site](#add-custom-site)
* [Add excluded site](#add-excluded-site)
* [Troubleshooting](#troubleshooting)
* [Changelog-releases](#changelog-releases)
* [License](#license)
* [Disclaimer](#disclaimer)

### Installation
You can install the add-on from Mozilla add-ons (AMO): [Bypass Paywalls Clean](https://addons.mozilla.org/en-US/firefox/addon/bypass-paywalls-clean)\
Latest add-on versions (2.4.8.0+) require a browser based on Firefox 86+ (else use the non-amo version below).\
Or download and install the latest xpi-version from [GitLab](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases)\
 By default BPC has limited permissions, but you can opt-in to enable custom sites (and also clear cookies/block general paywall-scripts for non-listed sites). You can also just request permissions for the custom sites you added yourself (or `clear cookies` to ask for permission for current site).

### Update
Check for updates (in about:addons) and allow permissions for newly supported sites (else no update will be installed).\
You can also check for update of site rules at startup (opt-in).\
For new sites you also have to opt-in to custom sites/request permissions for new domains (or wait for new release).

#### Android
On Android this add-on doesn't work with latest Firefox v84 (Fenix); it only supports a number of 'recommended' add-ons (for now).\
Only from Firefox v85 you can install recommended add-ons via [AMO](https://addons.mozilla.org) - so no more need to add these to your custom add-on collection (see below).

BPC add-on works fine in [Firefox Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix), [Fennec F-Droid](https://f-droid.org/en/packages/org.mozilla.fennec_fdroid) or [IceRaven](https://github.com/fork-maintainers/iceraven-browser) though (when you load BPC from a [custom add-on collection](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly)).\
For Firefox Nightly or Fennec F-Droid (based on latest Firefox for Android) you have to make your own custom add-on collection (or use another that contains BPC). \
[Iceraven (Fenix fork)](https://github.com/fork-maintainers/iceraven-browser) uses: [What I want on Fenix](https://addons.mozilla.org/en-US/firefox/collections/16201230/What-I-want-on-Fenix)\
It has a custom add-ons account: 16201230 & collection: What-I-want-on-Fenix.\
In IceRaven all add-ons are shown (with search option), but In Firefox Nightly and Fennec F-Droid only the first 50 add-ons are shown.\
There you can use custom add-ons account: 15546469 & collection: Fenix.

PS on Android: enabling custom sites isn't working (no optional permissions).\
Then you need the 'custom' add-on version (with access to all sites): [Bypass Paywalls Clean (custom)](https://addons.mozilla.org/en-US/firefox/addon/bypass-paywalls-clean-custom)

#### Chrome/Chromium
Visit the [Chrome repository](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean) of Bypass Paywall Clean.

#### Notes
* This add-on works best alongside the adblocker [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin).
* You will be logged out for most of the sites you have checked.
* Some sites need to redirect to an amp-page (add an exception in your amp2html add-on).

### List of supported websites

_* free articles only._

##### World news
[Foreign Affairs](https://www.foreignaffairs.com) -
[Foreign Policy](https://www.foreignpolicy.com) -
[Harper's Magazine](https://harpers.org) -
[Inkl](https://www.inkl.com) -
[Newsweek](https://www.newsweek.com) -
[Reuters](https://www.reuters.com) -
[Stratfor](https://stratfor.com) -
[The American Interest](https://www.the-american-interest.com) -
[The Atlantic](https://www.theatlantic.com) -
[The Christian Science Monitor](https://www.csmonitor.com) -
[The Nation](https://www.thenation.com) -
[The New Republic](https://newrepublic.com) -
[The New York Review of Books](https://www.nybooks.com) -
[The New York Times](https://www.nytimes.com) -
[The Spectator World](https://spectatorworld.com) -
[The Washington Post](https://www.washingtonpost.com) -
[Time Magazine](https://time.com) -
[World Politics Review](https://www.worldpoliticsreview.com)

##### Business
[Adweek](https://www.adweek.com) -
[American Affairs](https://americanaffairsjournal.org) -
[American Banker](https://www.americanbanker.com) -
[Barron's](https://www.barrons.com) -
[Bloomberg](https://www.bloomberg.com) -
[Business Insider](https://www.businessinsider.com) -
[Digiday](https://digiday.com) -
[Entrepreneur](https://www.entrepreneur.com) -
[Forbes](https://www.forbes.com) -
[Fortune](https://fortune.com) -
[Harvard Business Review](https://www.hbr.org) -
[Inc.com](https://www.inc.com) -
[Law.com](https://www.law.com)* -
[Law360](https://www.law360.com)* -
[MarketWatch](https://www.marketwatch.com) -
[MIT Sloan Management Review](https://sloanreview.mit.edu) -
[Quartz](https://qz.com)* -
[Seeking Alpha](https://seekingalpha.com) -
[Stock News](https://stocknews.com) -
[The Business Journals](https://www.bizjournals.com) -
[The Business of Fashion](https://www.businessoffashion.com) -
[The Wall Street Journal](https://www.wsj.com) -
[Vogue Business](https://www.voguebusiness.com)

Grouped in options:\
*Crain Communications* sites like\
[Ad Age](https://adage.com) -
[Automotive News](https://www.autonews.com) -
[Crain's Chicago Business](https://www.chicagobusiness.com) -
[Crain's Cleveland Business](https://www.crainscleveland.com) -
[Crain's Detroit Business](https://www.crainsdetroit.com) -
[Crain's New York Business](https://www.crainsnewyork.com) -
[Modern Healthcare](https://www.modernhealthcare.com)\
*NHST Media Group* sites like\
[Intrafish](https://www.intrafish.com) -
[Recharge](https://www.rechargenews.com) -
[TradeWinds](https://www.tradewindsnews.com) -
[Upstream](https://www.upstreamonline.com)

##### Tech/Science
[360Dx](https://www.360dx.com) -
[Chemical & Engineering News](https://cen.acs.org) -
[Chronicle of Higher Education](https://www.chronicle.com) -
[Dark Reading](https://www.darkreading.com) -
[Discover Magazine](https://www.discovermagazine.com) -
[GenomeWeb](https://www.genomeweb.com) -
[MIT Technology Review](https://www.technologyreview.com) -
[National Geographic USA](https://www.nationalgeographic.com) -
[Nautilus](https://nautil.us) -
[Precision Oncology News](https://www.precisiononcologynews.com) -
[Science](https://www.science.org)* -
[Scientific American](https://www.scientificamerican.com)* -
[Times Higher Education](https://www.timeshighereducation.com) -
[Towards Data Science](https://www.towardsdatascience.com) -
[VentureBeat](https://venturebeat.com)

##### Encyclopedia/Book library/Knowledge base
[BBC History Extra](https://www.historyextra.com) -
[Encyclopedia Britannica](https://www.britannica.com) -
[Glassdoor](https://www.glassdoor.com) -
[Loeb Classical Library](https://www.loebclassics.com) -
[Philosophy Now](https://philosophynow.org) -
[Quora](https://www.quora.com) -
[Scribd](https://www.scribd.com) -
[Statista](https://www.statista.com) -
[Study.com (no videos)](https://study.com)

##### Magazines/Blogs
[Apollo Magazine](https://www.apollo-magazine.com) -
[Artnet](https://www.artnet.com) -
[Atavist Magazine](https://magazine.atavist.com) -
[Billboard](https://www.billboard.com) -
[Commentary Magazine](https://www.commentary.org) -
[ESPN USA](https://www.espn.com) -
[First Things](https://www.firstthings.com) -
[Medium](https://www.medium.com/topics) (for custom domains enable custom sites) -
[National Review](https://www.nationalreview.com) -
[Rolling Stone](https://www.rollingstone.com) -
[Slate](https://slate.com) -
[SofRep](https://sofrep.com) -
[Sports Illustrated](https://www.si.com) -
[The Art Newspaper](https://www.theartnewspaper.com) -
[The Athletic](https://theathletic.com) -
[The Intercept](https://theintercept.com) -
[The Daily Beast](https://www.thedailybeast.com) -
[The New Atlantis](https://www.thenewatlantis.com) -
[The Point Magazine](https://thepointmag.com) -
[The Wrap](https://www.thewrap.com) -
[Variety](https://variety.com)

Grouped in options:\
*Condé Nast magazines* sites like:\
[Bon Appétit](https://www.bonappetit.com) -
[GC](https://www.gq.com) -
[The New Yorker](https://www.newyorker.com) -
[Vanity Fair](https://www.vanityfair.com) -
[Vogue USA](https://www.vogue.com) -
[Wired](https://www.wired.com)\
*Outside magazines* sites like:\
[Backpacker](https://www.backpacker.com) -
[Beta](https://www.betamtb.com) -
[Clean Eating](https://www.cleaneatingmag.com) -
[Climbing](https://www.climbing.com) -
[Outside](https://www.outsideonline.com) -
[Oxygen](https://www.oxygenmag.com) -
[SKI](https://www.skimag.com) -
[Trail Runner](https://www.trailrunnermag.com) -
[Triathlete](https://www.triathlete.com) -
[Vegetarian Times](https://www.vegetariantimes.com) -
[VeloNews](https://www.velonews.com) -
[Women's Running](https://www.womensrunning.com) -
[Yoga Journal](https://www.yogajournal.com)

##### Local USA news
[Honolulu Star-Advertiser](https://www.staradvertiser.com) -
[Los Angeles Business Journal](https://labusinessjournal.com) -
[Los Angeles Times](https://www.latimes.com) -
[Mountain View Voice](https://www.mv-voice.com) -
[New York Magazine](https://www.nymag.com) (+ [Curbed](https://www.curbed.com), [Grub Street](https://www.grubstreet.com), [The Cut](https://www.thecut.com) & [Vulture](https://www.vulture.com)) -
[Newsday](https://www.newsday.com) -
[Palo Alto Online](https://www.paloaltoonline.com) -
[Pittsburgh Post Gazette](https://www.post-gazette.com) -
[San Diego Union Tribune](https://www.sandiegouniontribune.com) -
[Star Tribune](https://www.startribune.com) -
[Tampa Bay Times](https://www.tampabay.com) -
[The Advocate](https://www.theadvocate.com) -
[The Atlanta Journal-Constitution](https://www.ajc.com) -
[The Boston Globe](https://www.bostonglobe.com) -
[The Dallas Morning News](https://www.dallasnews.com) -
[The New Orleans Advocate/The Times-Picayune](https://www.nola.com) -
[The Seattle Times](https://www.seattletimes.com) -
[The Philadelphia Inquirer](https://www.inquirer.com)

[USA Today](https://www.usatoday.com)\
Grouped in options:\
*Advance Local* sites like:\
[AL/Alabama](https://www.al.com) -
[MLive/Michigan](https://www.mlive.com) -
[NJ/New Jersey](https://www.nj.com) -
[Staten Island Advance](https://www.silive.com) -
[The Express-Times](https://www.lehighvalleylive.com) -
[The Oregonian](https://www.oregonlive.com) -
[The Patriot-News](https://www.pennlive.com) -
[The Plain Dealer](https://www.cleveland.com) -
[The Post-Standard](https://www.syracuse.com) -
[The Republican](https://www.masslive.com)\
*Gannett Group (local USA Today)* sites like (opt-in to custom sites for unlisted)\
[Austin American-Statesman](https://www.statesman.com) -
[Detroit Free Press](https://www.freep.com) -
[Milwaukee Journal Sentinel](https://www.jsonline.com) -
[The Arizona Republic](https://www.azcentral.com) -
[The Cincinnati Enquirer](http://www.cincinnati.com) -
[The Courier-Journal](https://www.courier-journal.com) -
[The Detroit News](https://www.detroitnews.com) -
[The Indianapolis Star](https://www.indystar.com) -
[The Record (North Jersey)](https://www.northjersey.com) -
[The Tennessean](http://www.tennessean.com)\
*Hearst Communications (newspapers)* sites like (opt-in to custom sites for unlisted)\
[Houston Chronicle](https://www.houstonchronicle.com) -
[San Antonio Express-News](https://www.expressnews.com) -
[San Francisco Chronicle](https://www.sfchronicle.com)\
*Lee Enterprises Group* sites like (opt-in to custom sites for unlisted)\
[Arizona Daily Star](https://tucson.com) -
[Richmond Times-Dispatch](https://richmond.com) -
[The Buffalo News](https://buffalonews.com) -
[Tulsa World](https://tulsaworld.com) -
[Winston-Salem Journal](https://www.journalnow.com)\
*McClatchy Group* sites like (opt-in to custom sites for unlisted)\
[Belleville News-Democrat](https://www.bnd.com) -
[Fort Worth Star-Telegram](https://www.star-telegram.com) -
[Lexington Herald-Leader](https://www.kentucky.com) -
[Miami Herald](https://www.miamiherald.com) -
[The Charlotte Observer](https://www.charlotteobserver.com) -
[The Fresno Bee](https://www.fresnobee.com) -
[The Kansas City Star](https://www.kansascity.com) -
[The News & Observer](https://www.newsobserver.com) -
[The Sacramento Bee](https://www.sacbee.com) -
[The State](https://www.thestate.com) -
[The Wichita Eagle](https://www.kansas.com) -
[Tri-City Herald](https://www.tri-cityherald.com)\
*MediaNews Group* sites like (opt-in to custom sites for unlisted/local sites)\
[East Bay Times](https://www.eastbaytimes.com) -
[Orange County Register](https://www.ocregister.com) -
[St. Paul Pioneer Press](https://www.twincities.com) -
[The Denver Post](https://www.denverpost.com) -
[The Mercury News](https://www.mercurynews.com) -
[The Press-Enterprise](https://www.pe.com)\
*TownNews sites (Blox CMS)* sites (opt-in to custom sites)\
*Tribune Publishing Company* sites like\
[Baltimore Sun](https://www.baltimoresun.com) -
[Capital Gazette](https://www.capitalgazette.com) -
[Chicago Tribune](https://www.chicagotribune.com) -
[Daily Press](https://www.dailypress.com) -
[Hartford Courant](https://www.courant.com) -
[New York Daily News](https://www.nydailynews.com) -
[Orlando Sentinel](https://www.orlandosentinel.com) -
[SunSentinel](https://www.sun-sentinel.com) -
[The Morning Call](https://www.mcall.com) -
[The Virginian-Pilot](https://www.pilotonline.com)

#### Canada
[Financial Post](https://www.financialpost.com) -
[Le Devoir](https://www.ledevoir.com) -
[National Post](https://www.nationalpost.com) -
[The Globe and Mail](https://www.theglobeandmail.com) -
[The Hill Times](https://www.hilltimes.com)\
[The Toronto Star](https://www.thestar.com) and regional TorStar sites (grouped in options) like
[Niagara Falls Review](https://www.niagarafallsreview.ca) -
[Peterborough Examiner](https://www.thepeterboroughexaminer.com) -
[St. Catharines Standard](https://www.stcatharinesstandard.ca) -
[The Hamilton Spectator](https://www.thespec.com) -
[Waterloo Region Record](https://www.therecord.com) -
[Welland Tribune](https://www.wellandtribune.ca)

#### Europe

[EUobserver](https://euobserver.com)

##### United Kingdom/Ireland
[Belfast Telegraph](https://www.belfasttelegraph.co.uk) -
[Financial News](https://www.fnlondon.com) -
[Financial Times](https://www.ft.com) -
[Irish Independent](https://www.independent.ie) -
[London Review of Books](https://www.lrb.co.uk) -
[New Left Review](https://newleftreview.org) -
[Prospect Magazine](https://www.prospectmagazine.co.uk) -
[The Athletic UK](https://theathletic.co.uk) -
[The Economist](https://www.economist.com) -
[The Independent](https://www.independent.co.uk) -
[The New Statesman](https://www.newstatesman.com) -
[The Spectator](https://www.spectator.co.uk) -
[The Telegraph](https://www.telegraph.co.uk) -
[The Times (link to archive.today)](https://www.thetimes.co.uk) -
[The Times Literary Supplement](https://www.the-tls.co.uk)

##### Denmark

[Berlingske](https://www.berlingske.dk)

##### Finland
Grouped in options:\
*Sanoma Media Finland* sites like (opt-in to custom sites for unlisted/regional sites)\
[Aamulehti](https://www.aamulehti.fi) -
[Helsingin Sanomat](https://www.hs.fi)

*Alma Talent* sites like\
[Arvopaperi](https://www.arvopaperi.fi) -
[Kauppalehti](https://www.kauppalehti.fi) -
[Markkinointi & Mainonta](https://www.marmai.fi) -
[Mediuutiset](https://www.mediuutiset.fi) -
[Mikrobitti](https://www.mikrobitti.fi) -
[Talouselämä](https://www.talouselama.fi) -
[Tekniikka & Talous](https://www.tekniikkatalous.fi) -
[Tivi](https://www.tivi.fi) -
[Uusi Suomi](https://www.uusisuomi.fi)

##### France/Wallonia
[Alternatives Economiques](https://www.alternatives-economiques.fr) -
[Atlantico](https://atlantico.fr) -
[Challenges](https://www.challenges.fr) -
[Charlie Hebdo](https://charliehebdo.fr) -
[Elle](https://www.elle.fr) -
[Esprit](https://esprit.presse.fr) -
[L'Équipe](https://www.lequipe.fr) -
[L'Express](https://www.lexpress.fr) -
[L'Obs](https://www.nouvelobs.com) -
[L'Oeil de la Photographie (fr/en)](https://loeildelaphotographie.com) -
[L'Opinion](https://www.lopinion.fr) -
[L'Usine Nouvelle](https://www.usinenouvelle.com) -
[La Croix](https://www.la-croix.com) -
[La Libre](https://www.lalibre.be) -
[La Nouvelle République du Centre-Ouest](https://www.lanouvellerepublique.fr) -
[La Tribune](https://www.latribune.fr) -
[Le Journal du Dimanche](https://lejdd.fr) -
[Le Journal du Net](https://www.journaldunet.com) -
[Le Parisien](https://www.leparisien.fr) -
[Le Télégramme](https://www.letelegramme.fr) -
[Le Vif](https://www.levif.be) -
[Les Échos](https://www.lesechos.fr) -
[Les Inrockuptibles](https://www.lesinrocks.com) -
[Marianne](https://www.marianne.net) -
[Paris Match](https://www.parismatch.com) -
[Science & Vie](https://www.science-et-vie.com) -
[Sciences et Avenir](https://www.sciencesetavenir.fr) -
[Télérama](https://www.telerama.fr) -
[Valeurs Actuelles](https://www.valeursactuelles.com)

Grouped in options:\
*Groupe EBRA* sites like\
[Dernières Nouvelles d'Alsace](https://www.dna.fr) -
[L'Alsace](https://www.lalsace.fr) -
[L'Est Républicain](https://www.estrepublicain.fr) -
[Le Bien Public](https://www.bienpublic.com) -
[Le Dauphiné Libéré](https://www.ledauphine.com) -
[Le Journal de Saône-et-Loire](https://www.lejsl.com) -
[Le Progrès](https://www.leprogres.fr) -
[Le Républicain Lorrain](https://www.republicain-lorrain.fr) -
[Vosges Matin](https://www.vosgesmatin.fr)\
*Groupe La Dépêche* sites like\
[Centre Presse](https://www.centrepresseaveyron.fr) -
[L'Indépendant](https://www.lindependant.fr) -
[La Dépêche du Midi](https://www.ladepeche.fr) -
[La Nouvelle République des Pyrénées](https://www.nrpyrenees.fr) -
[Le Petit Bleu d'Agen](https://www.petitbleu.fr) -
[Midi Libre](https://www.midilibre.fr) -
[Midi Olympique](https://www.midi-olympique.fr)\
*Groupe Nice-Matin* sites like\
[Monaco-Matin](https://www.monacomatin.mc) -
[Nice-Matin](https://www.nicematin.com) -
[Var-Matin](https://www.varmatin.com)\
*Groupe Rossel* sites like\
[L'Aisne nouvelle](https://www.aisnenouvelle.fr) -
[L'Ardennais](https://www.lardennais.fr) -
[L'Est-Éclair](https://www.lest-eclair.fr) -
[L'Union](https://www.lunion.fr) -
[La Voix du Nord](https://www.lavoixdunord.fr) -
[Le Courrier picard](https://www.courrier-picard.fr) -
[Le Soir](https://www.lesoir.be) -
[Libération Champagne](https://www.liberation-champagne.fr) -
[Nord Éclair](https://www.nordeclair.fr) -
[Nord Littoral](https://www.nordlittoral.fr) -
[Paris Normandie](https://www.paris-normandie.fr) -
[SudInfo](https://www.sudinfo.be)\
*Groupe Sud Ouest* sites like\
[Charente libre](https://www.charentelibre.fr) -
[La République des Pyrénées](https://www.larepubliquedespyrenees.fr) -
[Sud Ouest](https://www.sudouest.fr)

##### Germany/Austria
[Allgäuer Zeitung](https://www.allgaeuer-zeitung.de) -
[Augsburger Allgemeine](https://www.augsburger-allgemeine.de) -
[Berliner Zeitung](https://www.berliner-zeitung.de) -
[Cicero](https://www.cicero.de) -
[Deutsche Wirtschafts Nachrichten](https://deutsche-wirtschafts-nachrichten.de) -
[Die Rheinpfalz](https://www.rheinpfalz.de) -
[Die Zeit](https://www.zeit.de) -
[Frankfurter Allgemeine Zeitung](https://www.faz.net) -
[Freie Presse](https://www.freiepresse.de) -
[Handelsblatt](https://www.handelsblatt.com)* -
[Kölner Stadt-Anzeiger](https://www.ksta.de) -
[Kölnische Rundschau](https://www.rundschau-online.de) -
[Krautreporter.de](https://krautreporter.de) -
[Kurier.at](https://kurier.at) -
[Mitteldeutsche Zeitung](https://www.mz.de) -
[Neue Osnabrücker Zeitung](https://www.noz.de]) -
[Nordwest Zeitung](https://www.nwzonline.de) -
[Piqd.de](https://www.piqd.de) -
[Rhein-Zeitung](https://www.rhein-zeitung.de) -
[Ruhr Nachrichten](https://www.ruhrnachrichten.de) -
[Schleswig-Holsteinischer Zeitungsverlag](https://www.shz.de) -
[Schweriner Volkszeitung](https://www.svz.de) -
[Westfalen-Blatt](https://www.westfalen-blatt.de) -
[Westfälische Nachrichten](https://www.wn.de)

Grouped in options:\
*Funke Mediengruppe* sites like\
[Berliner Morgenpost](https://www.morgenpost.de) -
[Braunschweiger Zeitung](https://www.braunschweiger-zeitung.de) -
[Hamburger Abendblatt](https://www.abendblatt.de) -
[Neue Ruhr Zeitung](https://www.nrz.de) -
[Ostthüringer Zeitung](https://www.otz.de) -
[Thüringer Allgemeine](https://www.thueringer-allgemeine.de) -
[Thüringische Landeszeitung](https://www.tlz.de) -
[Westdeutsche Allgemeine Zeitung](https://www.waz.de) -
[Westfalenpost](https://www.wp.de) -
[Westfälische Rundschau](https://www.wr.de)\
*Madsack Mediengruppe* sites like (opt-in to custom sites for unlisted)\
[Hannoversche Allgemeine Zeitung](https://www.haz.de) -
[Kieler Nachrichten](https://www.kn-online.de) -
[Leipziger Volkszeitung](https://www.lvz.de) -
[Lübecker Nachrichten](https://www.ln-online.de) -
[Märkische Allgemeine](https://www.maz-online.de) -
[Neue Presse (Hannover)](https://www.neuepresse.de) -
[Ostsee-Zeitung](https://www.ostsee-zeitung.de)

##### Italy
[Corriere della Sera](https://www.corriere.it) -
[Domani](https://editorialedomani.it) -
[Eastwest](https://eastwest.eu) -
[GElocal.it](https://quotidiani.gelocal.it) -
[Huffingtonpost.it](https://www.huffingtonpost.it) -
[Il Fatto Quotidiano](https://www.ilfattoquotidiano.it) -
[Il Foglio](https://www.ilfoglio.it) -
[Il Manifesto](https://ilmanifesto.it) -
[Il Secolo XIX](https://www.ilsecoloxix.it) -
[Internazionale](https://www.internazionale.it) -
[Italian.tech](https://www.italian.tech) -
[La Nuova Sardegna](https://www.lanuovasardegna.it) -
[La Repubblica](https://www.repubblica.it) -
[La Stampa](https://www.lastampa.it) -
[Le Scienze](https://www.lescienze.it) -
[LimesOnline (it/en)](https://www.limesonline.com)

Grouped in options:\
[Il Messaggero](https://www.ilmessaggero.it) and regional sites like
[Corriere Adriatico](https://www.corriereadriatico.it) -
[Il Gazzettino](https://www.ilgazzettino.it) -
[Il Mattino](https://www.ilmattino.it) -
[Quotidiano di Puglia](https://www.quotidianodipuglia.it)\
[Quotidiano Nazionale](https://www.quotidiano.net) and regional sites like
[Il Giorno](https://www.ilgiorno.it) -
[Il Resto del Carlino](https://www.ilrestodelcarlino.it) -
[Il Telegrafo Livorno](https://www.iltelegrafolivorno.it) -
[La Nazione](https://www.lanazione.it)

##### Netherlands/Flanders
[Dagblad van het Noorden](https://www.dvhn.nl) -
[De Morgen](https://www.demorgen.be) -
[Financieele Dagblad](https://fd.nl) -
[Follow the Money](https://www.ftm.nl) -
[Groene Amsterdammer](https://www.groene.nl) -
[Humo](https://www.humo.be) -
[Knack](https://www.knack.be) -
[Leeuwarder Courant](https://www.lc.nl) -
[NRC Handelsblad](https://www.nrc.nl) -
[Parool](https://www.parool.nl) -
[Telegraaf](https://www.telegraaf.nl) -
[Trouw](https://www.trouw.nl) -
[Volkskrant](https://www.volkskrant.nl) -
[Vrij Nederland](https://www.nl.nl)

Grouped in options:\
*Algemeen Dagblad Regional (ADR)* sites like
[BN DeStem](https://www.bndestem.nl) -
[Brabants Dagblad](https://www.bd.nl) -
[Eindhovens Dagblad](https://www.ed.nl) -
[Gelderlander](https://www.gelderlander.nl) -
[PZC](https://www.pzc.nl) -
[Stentor](https://www.destentor.nl) -
[Tubantia](https://tubantia.nl)\
*Mediahuis Nederland Regional* sites like\
[Noordhollands Dagblad](https://www.noordhollandsdagblad.nl) -
[Haarlems Dagblad](https://www.haarlemsdagblad.nl) -
[Leidsch Dagblad](https://www.leidschdagblad.nl) -
[IJmuider Courant](https://www.ijmuidercourant.nl) -
[De Gooi- en Eemlander](https://www.gooieneemlander.nl)

##### Portugal
[Correio da Manhã](https://www.cmjornal.pt) -
[Observador](https://observador.pt)

##### Spain
[ABC](https://www.abc.es) -
[El Confidencial](https://www.elconfidencial.com) -
[El Diario.es](https://www.eldiario.es) -
[El Español](https://www.elespanol.com) -
[El Mundo](https://www.elmundo.es) -
[El País](https://elpais.com) -
[El Periódico de Catalunya](https://www.elperiodico.com) -
[Expansión](https://www.expansion.com) -
[La Vanguardia](https://www.lavanguardia.com) -
[Marca](https://www.marca.com) -
[Política Exterior](https://www.politicaexterior.com)

Grouped in options:\
*Grupo Prensa Ibérica* sites like\
[Diario de Ibiza](https://www.diariodeibiza.es) -
[Diario de Mallorca](https://www.diariodemallorca.es) -
[El Día](https://www.eldia.es) -
[El Periódico Mediterráneo](https://www.elperiodicomediterraneo.com) -
[Faro de Vigo](https://www.farodevigo.es) -
[Información](https://www.informacion.es) -
[La Nueva España](https://www.lne.es) -
[La Provincia](https://www.laprovincia.es) -
[Levante-EMV](https://www.levante-emv.com)\
*Grupo Vocento* (ABC regional) sites like\
[Diario Vasco](https://www.diariovasco.com) -
[El Comercio](https://www.elcomercio.es) -
[El Correo](https://www.elcorreo.com) -
[El Diario Montañés](https://www.eldiariomontanes.es) -
[El Norte de Castilla](https://www.elnortedecastilla.es) -
[Hoy](https://www.hoy.es) -
[Ideal](https://www.ideal.es) -
[La Rioja](https://www.larioja.com) -
[La Verdad](https://www.laverdad.es) -
[La Voz de Cádiz](https://www.lavozdigital.es) -
[Las Provincias](https://www.lasprovincias.es) -
[Sur](https://www.diariosur.es)

##### Sweden
[Dagens Industri](https://www.di.se) -
[Dagens Nyheter](https://www.dn.se) -
[NyTeknik](https://www.nyteknik.se)

##### Switzerland
[Neue Zürcher Zeitung](https://www.nzz.ch) -
[The Market](https://themarket.ch)

#### Africa

###### Kenya

[Daily Nation](https://nation.africa)

#### Australia/New Zealand

[Brisbane Times](https://www.brisbanetimes.com.au) -
[Eureka Report](https://www.eurekareport.com.au) -
[Griffith Review](https://www.griffithreview.com) -
[Intelligent Investor](https://www.intelligentinvestor.com.au) -
[New Zealand Herald](https://www.nzherald.co.nz) -
[The Age](https://www.theage.com.au) -
[The Australian Financial Review](https://www.afr.com) -
[The Saturday Paper](https://www.thesaturdaypaper.com.au) -
[The Spectator Australia](https://www.spectator.com.au) -
[The Sydney Morning Herald](https://www.smh.com.au) -
[The West Australian (+ regional/opt-in to custom sites)](https://thewest.com.au) -
[WAtoday](https://www.watoday.com.au)

Grouped in options:\
*News Corp Australia* site like\
[Cairns Post](https://www.cairnspost.com.au) -
[Code Sports](https://www.codesports.com.au) -
[Geelong Advertiser](https://www.geelongadvertiser.com.au) -
[Gold Coast Bulletin](https://www.goldcoastbulletin.com.au) -
[Herald Sun](https://www.heraldsun.com.au) -
[Northern Territory News](https://www.ntnews.com.au) -
[The Advertiser/AdelaideNow](https://www.adelaidenow.com.au) -
[The Australian](https://www.theaustralian.com.au) -
[The Chronicle](https://www.thechronicle.com.au) -
[The Courier-Mail](https://www.couriermail.com.au) -
[The Daily Telegraph](https://www.dailytelegraph.com.au) -
[The Mercury Tasmania](https://www.themercury.com.au) -
[The Weekly Times](https://www.weeklytimesnow.com.au) -
[Townsville Bulletin](https://www.townsvillebulletin.com.au)\
*Australian Community Media (daily)* sites like (add to custom sites for unlisted & block general paywall-script Piano)\
[Bendigo Advertiser](https://www.bendigoadvertiser.com.au) -
[Central Western Daily](https://www.centralwesterndaily.com.au) -
[Daily Liberal](https://www.dailyliberal.com.au) -
[Illawarra Mercury](https://www.illawarramercury.com.au) -
[Newcastle Herald](https://www.newcastleherald.com.au) -
[The Advocate](https://www.theadvocate.com.au) -
[The Border Mail](https://www.bordermail.com.au) -
[The Canberra Times](https://www.canberratimes.com.au) -
[The Courier](https://www.thecourier.com.au) -
[The Daily Advertiser](https://www.dailyadvertiser.com.au) -
[The Examiner](https://www.examiner.com.au) -
[The Northern Daily Leader](https://www.northerndailyleader.com.au) -
[The Port Macquarie News](https://www.portnews.com.au) -
[The Standard](https://www.standard.net.au) -
[Western Advocate](https://www.westernadvocate.com.au)

#### East Asia
[Asia Times](https://asiatimes.com) -
[CommonWealth Magazine Taiwan](https://www.cw.com.tw)* -
[DealStreetAsia](https://www.dealstreetasia.com) -
[Harvard Business Review China](https://www.hbrchina.org) -
[Harvard Business Review Taiwan](https://www.hbrtaiwan.com) -
[Mainichi Shimbun](https://mainichi.jp) -
[Nikkei Asian Review](https://asia.nikkei.com) -
[NK News](https://www.nknews.org)* -
[South China Morning Post](https://www.scmp.com) -
[Southern Weekly](https://www.infzm.com) -
[Tech in Asia](https://www.techinasia.com) -
[The Diplomat](https://thediplomat.com) -
[The Japan Times](https://www.japantimes.co.jp)

#### India
[Bloomberg Quint](https://www.bloombergquint.com) -
[Business Standard](https://www.business-standard.com) -
[Hindustan Times](https://www.hindustantimes.com) -
[Inc42](https://inc42.com) -
[Live Law](https://www.livelaw.in) -
[LiveMint](https://www.livemint.com) -
[MediaNama](https://www.medianama.com) -
[The Economic Times (ET Prime)](https://economictimes.indiatimes.com) -
[The Hindu](https://www.thehindu.com) -
[The Hindu BusinessLine](https://www.thehindubusinessline.com) -
[The Indian Express](https://indianexpress.com) -
[Times of India](https://timesofindia.indiatimes.com)

#### Israel
[Globes](https://www.globes.co.il) -
[Haaretz.co.il](https://www.haaretz.co.il) -
[Haaretz.com](https://www.haaretz.com) -
[The Jerusalem Post](https://www.jpost.com) -
[The Marker](https://www.themarker.com)

#### Latin America

##### Argentina
[Ámbito](https://www.ambito.com) -
[Clarín](https://www.clarin.com) -
[La Nación](https://www.lanacion.com.ar)
##### Brazil
[Exame](https://exame.com) -
[Folha de S. Paulo](https://www.folha.uol.com.br) -
[Grupo Abril](https://grupoabril.com.br) -
[O Estado de S. Paulo](https://estadao.com.br) -
[O Globo](https://oglobo.globo.com) -
[Valor Econômico](https://valor.globo.com)
##### Chile
[Diario Financiero](https://www.df.cl) -
[El Mercurio](https://digital.elmercurio.com) -
[El Mercurio de Valparaíso](https://www.mercuriovalpo.cl) -
[La Estrella de Valparaíso](https://www.estrellavalpo.cl) -
[La Segunda](https://digital.lasegunda.com) -
[La Tercera](https://www.latercera.com)
##### Colombia
[El Espectador](https://www.elespectador.com)
##### Mexico
[Mexico News Daily](https://mexiconewsdaily.com)
##### Peru
*Grupo El Comercio* sites like:
[Diario Correo](https://diariocorreo.pe) -
[El Comercio](https://elcomercio.pe) -
[Gestión](https://gestion.pe)

_* free articles only._

### Sites with limited number of free articles
The free article limit can normally be bypassed by removing cookies for the site.  
Click on the BPC-icon and then 'clear cookies'-button in the popup (for unsupported sites grant permission for domain).  
If removing the cookies works you can also add the site as a custom site.

### New site requests
You can [submit a request for a new website](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues).  
Please read the following instructions and share your results for a quicker process.  
Remember to check the [previous requests](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues?scope=all&state=all) before asking for a new website.  
1. Visit an article on the site you want to bypass the paywall for and copy the article title.
2. Open up a new incognito window (Ctrl+Shift+P) and paste the article title into Google.
3. Click on the same article from the Google search results page. Or you can:
4. Disable javascript on the website by clicking the button right icon </> on the uBlock Origin panel.
5. Refresh the page.

### Add custom site
Add your own custom site (also for testing).  
Check 'Options'-link in popup-menu and go to custom sites.
\* by default BPC has limited permissions, but you can opt-in to enable custom sites (and also clear cookies/block general paywall-scripts for non-listed sites). You can also just request permissions for the custom sites you added yourself (or `clear cookies` to ask for permission for current site).

By default sites' cookies/local storage are removed after page loads (to bypass article limit).  
Also you can enable Googlebot/Bingbot user-agent, set referer (to Facebook, Google or Twitter; ignored when Googlebot is set), set random ip-address, disable Javascript for (sub)domain(s) and/or external domains, block regular expression and/or unhide text on (or when paywall(selector) redirect to) amp-page.

[Example list of custom sites](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/custom/sites_custom.json) or [download list (json)](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/raw/master/custom/sites_custom.json)

PS on Android: enabling custom sites isn't working (no optional permissions).\
Then you need the 'custom' add-on version (with access to all sites): [Bypass Paywalls Clean (custom)](https://addons.mozilla.org/en-US/firefox/addon/bypass-paywalls-clean-custom)

### Add excluded site
Add excluded sites/domains (for your subscriptions).\
You can also exclude a specific domain which is grouped in options.

### Troubleshooting
* This add-on works best alongside the adblocker [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin).
* Add usefull custom filter [Fanboy's Enhanced Tracking List](https://www.fanboy.co.nz/enhancedstats.txt)
* If a site doesn't work, try turning off uBlock and refreshing.
* Make sure the (new) site is checked under Options.
* You will be logged out for most of the sites you have checked.
* Make sure you're running the latest version of Bypass Paywalls Clean.
* If none of these work, you can [submit an issue](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues).
* If you live in the EU, also consider installing the extension [I don't care about cookies](https://addons.mozilla.org/en-US/firefox/addon/i-dont-care-about-cookies) in order to remove cookie warnings (or add filter [Easylist Cookies](https://easylist-downloads.adblockplus.org/easylist-cookie.txt) | [I don't care about cookies custom filter](https://www.i-dont-care-about-cookies.eu/abp) to uBlock Origin). Some sites need to set a consent-cookie for (social) media.

### Changelog-releases
* Visit the [changelog page](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/changelog.txt).
* Or check the [commits](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/commits/master).
* [Download the latest version](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases)

### License
Bypass Paywalls Clean is [MIT-licensed](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/LICENSE).

### Disclaimer
* This software is provided for educational purposes only and is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
