# Bypass Paywalls Clean for Firefox

Add-on allows you to read articles from (supported) sites that implement a paywall.  
You can also add a domain as custom site and try to bypass the paywall.  
Weekly updates are released for fixes and new sites.

* [Installation](#installation)
* [Update](#update)
* [Android](#android)
* [Troubleshooting](#troubleshooting)
* [List of supported websites](#list-of-supported-websites)
* [Sites with limited number of free articles](#sites-with-limited-number-of-free-articles)
* [New site requests](#new-site-requests)
* [Add custom site](#add-custom-site)
* [Add excluded site](#add-excluded-site)
* [Changelog-releases](#changelog-releases)
* [License](#license)
* [Disclaimer](#disclaimer)

### Installation
You can install the add-on from [GitLab releases](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases)\
Download the [xpi-file](https://gitlab.com/magnolia1234/bpc-uploads/-/raw/master/bypass_paywalls_clean-latest.xpi) (from latest release), go to downloads and install the add-on (or drag it from your file-manager anywhere on a page/tab in Firefox).\
Or go to Tools > Add-ons (about:addons) > Extensions > Settings/Cogwheel - Install Add-on from File\
You can add/pin the add-on icon to the toolbar with the toolbar extensions menu (jigsaw puzzle shaped icon).\
Custom xpi-file has host permissions for all sites.\
Minumum browser requirement: Firefox 86+.

PS although add-on was removed from [Mozilla's add-on store (AMO)](https://addons.mozilla.org) the add-on is still signed and checked for security by Mozilla ('minor' delays can in reality be a few days or up to a week though):
> Please be aware of a recent change to AMO’s review process: All extension submissions with a significantly large number of users are now subject to human review by the add-ons review team before approval. This may, occasionally, result in minor delays publishing new versions of your extension on AMO. We’ve made this change to provide Firefox users with even greater security assurances for some of AMO’s most popular extensions.

If you want to permanently install the latest [master ZIP-file from GitLab](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/archive/master/bypass-paywalls-firefox-clean-master.zip) (with post-release fixes) use a Firefox browser which allows using unsigned add-ons like Firefox Developer Portable (go to about:config and set xpinstall.signatures.required to false) or LibreWolf (for both no automatic updates of add-on).\
Or load a temporary add-on in regular Firefox (go to about:debugging#/runtime/this-firefox & load manifest.json from unpacked (master-zip) folder.

By default BPC has limited host permissions, but you can opt-in to enable custom sites (and also clear cookies/block general paywall-scripts for unlisted sites). You can also just request host permissions for the custom sites you've added yourself (or click *clear cookies* (BPC-icon) to ask for host permission for current site).\
You can also install the custom add-on version (with host permissions for all sites).

### Update
Add-on will automatically update or you can do a manual check for updates (in about:addons).\
Either way you have to allow host permissions for newly supported sites (else no update will be installed).\
You can also check for update of site rules at startup (opt-in); only available until about 10 days after fix-release.\
For new sites you also have to opt-in to custom sites/request host permissions for new domains (or wait for new release).

### Android
Add-on was removed by Mozilla from [add-on store (AMO)](https://addons.mozilla.org).\
Current installations (by custom collection in Firefox Beta/Nightly or Firefox-fork) will stay active, but with no more updates.

[Firefox Nightly 122+](https://play.google.com/store/apps/details?id=org.mozilla.fenix) can still install/sideload a xpi-file (manual updates) when you enable the debug menu (settings > about > tap Firefox logo 5 times > return to settings).

Or use the Firefox-fork [Iceraven](https://github.com/fork-maintainers/iceraven-browser) v2.13.2+ (manual updates).\
You can install/update Iceraven manually or use the app [FFUpdater](https://github.com/Tobi823/ffupdater)

The experimental Mozac/GeckoView-based browser [SmartCookieWeb-Preview](https://github.com/CookieJarApps/SmartCookieWeb-Preview/releases) can also install/sideload a xpi-file by url (Settings > Advanced settings > Sideload XPI).

There is still an elaborate workaround for regular Firefox (or Beta/fork) though:
* install an old version of Firefox (like v68.11.0 from [archive.mozilla.org](https://archive.mozilla.org/pub/mobile/releases/68.11.0/) or [apkmirror.com](https://www.apkmirror.com/apk/mozilla/firefox/firefox-68-11-0-release)); first you have to remove your current Firefox app.\
Specifically for the add-on you can also use Firefox Beta or a Firefox-fork like [Fennec F-Droid](https://f-droid.org/packages/org.mozilla.fennec_fdroid) where you can [set a custom add-on collection](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly) (for amo-listed add-ons); again first install an old version of [Firefox Beta v68.7](https://www.apkmirror.com/apk/mozilla/firefox-beta/firefox-beta-68-7-release) or [Fennec F-droid  v68.11.0](https://www.apkmirror.com/apk/mozilla/fennec-f-droid/fennec-f-droid-68-11-0-release)
* download add-on's xpi-file (custom version has by default host permissions for all sites) from [releases](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases) and install/open in Firefox (from downloads)
* now you can update Firefox to the latest version
* add-on will stay active & automatically updates to the latest version

Or install a [cloned amo-version](https://www.google.com/search?q=bypass+paywalls+clean+addons.mozilla.org+-lee) in Firefox for Android 120+.

Or switch to [Kiwi browser (Chromium)](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) or use the [adblocker filter/userscripts](https://gitlab.com/magnolia1234/bypass-paywalls-clean-filters) (much less supported sites).

#### Chrome/Chromium
Visit the [Chrome repository](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean) of Bypass Paywall Clean.

#### iOS/iPadOS
Use adblocker with custom (content)filter & userscript (manager): https://gitlab.com/magnolia1234/bypass-paywalls-clean-filters (read instructions).

Although [Orion Browser](https://apps.apple.com/us/app/orion-browser-by-kagi/id1484498200) supports installing this add-on, it won't work for a lot of sites (no full support of WebExtensions API on iOS/iPadOS).

### Troubleshooting
* If a site doesn't work, first try to turn off your adblocker (or other extension) and refresh page.
* Make sure the (new) site is checked under Options.
* Clear cookies by add-on's icon and grant host permission for site (or opt-in to custom sites)
* You will be logged out for some of the sites you have enabled.
* Make sure you're running the latest version of Bypass Paywalls Clean.
* Some sites need to redirect to an amp-page (this may cause a redirect-loop by an amp-to-html add-on or browser setting).
* If none of these work, you can [submit an issue](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues).
* This add-on works best alongside the adblocker [uBlock Origin](https://addons.mozilla.org/firefox/addon/ublock-origin).
* If you live in the EU, also consider adding these filters to your adblocker (in order to remove cookie warnings): [Easylist Cookies](https://secure.fanboy.co.nz/fanboy-cookiemonster.txt) | [I don't care about cookies custom filter](https://www.i-dont-care-about-cookies.eu/abp). Some sites need to set a consent-cookie for (social) media.

### List of supported websites

_* free articles only._

##### International news
[Foreign Affairs](https://www.foreignaffairs.com) -
[Foreign Policy](https://www.foreignpolicy.com) -
[Inkl](https://www.inkl.com) -
[Newsweek](https://www.newsweek.com) -
[Reuters](https://www.reuters.com) -
[The New York Times](https://www.nytimes.com) -
[The Washington Post](https://www.washingtonpost.com)

##### Business
[Adweek](https://www.adweek.com) -
[American Affairs](https://americanaffairsjournal.org) -
[Barron's](https://www.barrons.com) -
[Bloomberg](https://www.bloomberg.com) -
[Business Insider](https://www.businessinsider.com) -
[CNBC](https://www.cnbc.com) -
[Digiday](https://digiday.com) -
[Fast Company](https://www.fastcompany.com) -
[Forbes](https://www.forbes.com) -
[Fortune](https://fortune.com) -
[Harvard Business Review](https://www.hbr.org) -
[Inc.com](https://www.inc.com) -
[Law.com](https://www.law.com)* -
[MarketWatch](https://www.marketwatch.com) -
[MIT Sloan Management Review](https://sloanreview.mit.edu) -
[Quartz](https://qz.com) -
[S&P Global](https://www.spglobal.com) -
[Seeking Alpha](https://seekingalpha.com) -
[Stock News](https://stocknews.com) -
[The Business Journals](https://www.bizjournals.com)* -
[The Business of Fashion](https://www.businessoffashion.com) -
[The Wall Street Journal](https://www.wsj.com) -
[Vogue Business](https://www.voguebusiness.com) -
[ZeroHedge](https://www.zerohedge.com)

Grouped in options:\
*[American Banker](https://www.americanbanker.com) (+ [Arizent](https://www.arizent.com/brands)*; opt-in to custom sites)

*[Bridge Tower Media](https://bridgetowermedia.com/markets)* sites (opt-in to custom sites)

*California Business Journals* sites like\
[Los Angeles Business Journal](https://labusinessjournal.com) -
[Orange County Business Journal](https://www.ocbj.com) -
[San Diego Business Journal](https://www.sdbj.com) -
[San Fernando Valley Business Journal](https://www.sfvbj.com)

*Crain Communications* sites like\
[Ad Age](https://adage.com) -
[Automotive News](https://www.autonews.com) -
[Crain's Chicago Business](https://www.chicagobusiness.com) -
[Crain's Cleveland Business](https://www.crainscleveland.com) -
[Crain's Detroit Business](https://www.crainsdetroit.com) -
[Crain's New York Business](https://www.crainsnewyork.com) -
[Modern Healthcare](https://www.modernhealthcare.com) -
[Pensions & Investments](https://www.pionline.com)\
Global Polymer Group:
[European Rubber Journal](https://www.european-rubber-journal.com) -
[Plastics News](https://www.plasticsnews.com) -
[Rubber News](https://www.rubbernews.com) -
[Sustainable Plastics](https://www.sustainableplastics.com) -
[Tire Business](https://www.tirebusiness.com) -
[Urethanes Technology International](https://www.utech-polyurethane.com)

*[Inside Retail](https://octomedia.com.au/our-brands/inside-retail)* sites (opt-in to custom sites)

*[PEI Media](https://www.pei.group/brands)* sites (opt-in to custom sites)

##### Tech/Science
[Bulletin of the Atomic Scientists](https://thebulletin.org) -
[Chemical & Engineering News](https://cen.acs.org) -
[Discover Magazine](https://www.discovermagazine.com) -
[Inside Higher Ed](https://www.insidehighered.com) -
[Interesting Engineering](https://interestingengineering.com) -
[Medscape](https://www.medscape.com) -
[MIT Technology Review](https://www.technologyreview.com) -
[National Geographic USA](https://www.nationalgeographic.com) -
[Nautilus](https://nautil.us) -
[New Scientist](https://www.newscientist.com) -
[Popular Science](https://www.popsci.com) -
[Science](https://www.science.org)* -
[Scientific American](https://www.scientificamerican.com) -
[The Scientist](https://www.the-scientist.com) -
[Times Higher Education](https://www.timeshighereducation.com)

Grouped in options:\
*Crain Communications* sites like\
[360Dx](https://www.360dx.com) -
[GenomeWeb](https://www.genomeweb.com) -
[Precision Medicine Online](https://www.precisionmedicineonline.com)\
*TechTarget Group* sites like\
[Computer Weekly](https://www.computerweekly.com) -
[TechTarget](https://www.techtarget.com)\
*The Chronicle* sites like\
[The Chronicle of Higher Education](https://www.chronicle.com) -
[The Chronicle of Philanthropy](https://www.philanthropy.com)

##### Encyclopedia/Book library/Knowledge base
[BBC History Extra](https://www.historyextra.com) -
[Encyclopedia Britannica](https://www.britannica.com) -
[eNotes](https://www.enotes.com) -
[Glassdoor](https://www.glassdoor.com) -
[Loeb Classical Library](https://www.loebclassics.com) -
[Philosophy Now](https://philosophynow.org) -
[Quora](https://www.quora.com) -
[SlideShare](https://www.slideshare.net) -
[Statista](https://www.statista.com) -
[StuDocu](https://www.studocu.com)

###### Sports
[ESPN USA](https://www.espn.com) -
[RugbyPass](https://www.rugbypass.com) -
[Sports Illustrated](https://www.si.com) -
[The Athletic](https://theathletic.com)

##### Magazines/Blogs
Grouped in options:\
*Medium (custom) domains* like (opt-in to custom sites for unlisted)\
[Medium](https://www.medium.com) -
[Better Programming](https://betterprogramming.pub) -
[Towards Data Science](https://towardsdatascience.com)

[America's Test Kitchen](https://www.americastestkitchen.com) -
[Apollo Magazine](https://www.apollo-magazine.com) -
[Artforum](https://www.artforum.com) -
[Artnet](https://www.artnet.com) -
[Atavist Magazine](https://magazine.atavist.com) -
[Axios](https://www.axios.com) -
[Commentary Magazine](https://www.commentary.org) -
[Defector](https://defector.com) -
[Field & Stream](https://www.fieldandstream.com) -
[First Things](https://www.firstthings.com) -
[Harper's Magazine](https://harpers.org) -
[Jane's Defence Weekly](https://www.janes.com/defence-news/) -
[Jazziz](https://www.jazziz.com) -
[Jazzwise](https://www.jazzwise.com) -
[National Review](https://www.nationalreview.com) -
[Outdoor Life](https://www.outdoorlife.com) -
[Project Syndicate (link to archive.is)](https://www.project-syndicate.org) -
[Puck.news](https://puck.news) -
[Slate](https://slate.com) -
[SofRep](https://sofrep.com) -
[Stereogum](https://www.stereogum.com) -
[Texas Monthly](https://www.texasmonthly.com) -
[The American Conservative](https://www.theamericanconservative.com) -
[The American Interest](https://www.the-american-interest.com) -
[The Art Newspaper](https://www.theartnewspaper.com) -
[The Atlantic](https://www.theatlantic.com) -
[The Baffler](https://thebaffler.com) -
[The Christian Science Monitor](https://www.csmonitor.com) -
[The Intercept](https://theintercept.com) -
[The Daily Beast](https://www.thedailybeast.com) -
[The Daily Wire](https://www.dailywire.com) -
[The Impression](https://theimpression.com) -
[The Juggernaut](https://www.thejuggernaut.com) -
[The Nation](https://www.thenation.com) -
[The New Atlantis](https://www.thenewatlantis.com) -
[The New Republic](https://newrepublic.com) -
[The New York Review of Books](https://www.nybooks.com) -
[The Point Magazine](https://thepointmag.com) -
[The Spectator World](https://thespectator.com) -
[The Verge](https://www.theverge.com) -
[The Week](https://theweek.com) -
[The Wrap](https://www.thewrap.com) -
[Washington Examiner](https://www.washingtonexaminer.com)

Grouped in options:\
*Condé Nast magazines* sites like\
[Architectural Digest](https://www.architecturaldigest.com) -
[Bon Appétit](https://www.bonappetit.com) -
[Condé Nast Traveler](https://www.cntraveler.com) -
[Epicurious](https://www.epicurious.com) -
[GC](https://www.gq.com) -
[The New Yorker](https://www.newyorker.com) -
[Vanity Fair](https://www.vanityfair.com) -
[Vogue USA](https://www.vogue.com) -
[Wired](https://www.wired.com)\
*Hearst Communications magazines* sites like\
[Bicycling](https://www.bicycling.com) -
[Cosmopolitan](https://www.cosmopolitan.com) -
[Country Living](https://www.countryliving.com) -
[Delish](https://www.delish.com) -
[Elle Decor](https://www.elledecor.com) -
[Elle USA](https://www.elle.com) -
[Esquire](https://www.esquire.com) -
[Good Housekeeping](https://www.goodhousekeeping.com) -
[Harper's Bazaar](https://www.harpersbazaar.com) -
[House Beautiful](https://www.housebeautiful.com) -
[Men's Health](https://www.menshealth.com) -
[Oprah Daily](https://www.oprahdaily.com) -
[Popular Mechanics](https://www.popularmechanics.com) -
[Prevention](https://www.prevention.com) -
[Road & Track](https://www.roadandtrack.com) -
[Runner's World](https://www.runnersworld.com) -
[Town & Country](https://www.townandcountrymag.com) -
[Women's Health](https://www.womenshealthmag.com)

*Outside magazines* sites like\
[Backpacker](https://www.backpacker.com) -
[Beta](https://www.betamtb.com) -
[Better Nutrition](https://www.betternutrition.com) -
[Clean Eating](https://www.cleaneatingmag.com) -
[Climbing](https://www.climbing.com) -
[Outside](https://www.outsideonline.com) -
[Oxygen](https://www.oxygenmag.com) -
[SKI](https://www.skimag.com) -
[Trail Runner](https://www.trailrunnermag.com) -
[Triathlete](https://www.triathlete.com) -
[Vegetarian Times](https://www.vegetariantimes.com) -
[Women's Running](https://www.womensrunning.com) -
[Yoga Journal](https://www.yogajournal.com)\
*Penske Media Corporation* sites like\
[Billboard](https://www.billboard.com) -
[Rolling Stone](https://www.rollingstone.com) -
[Sportico](https://www.sportico.com) -
[Variety](https://variety.com) -
[WWD](https://wwd.com)

*The Epoch Times* sites like (opt-in to custom sites for cz|de|fr|jp|ro sites)\
[Epoch.org.il](https://epoch.org.il) -
[The Epoch Times](https://www.theepochtimes.com)

##### Local USA news
[Albuquerque Journal](https://www.abqjournal.com) -
[Arkansas Democrat-Gazette](https://www.arkansasonline.com) -
[Honolulu Star-Advertiser](https://www.staradvertiser.com) -
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
[The Boston Globe](https://www.bostonglobe.com) -
[The Columbian](https://www.columbian.com) -
[The Dallas Morning News](https://www.dallasnews.com) -
[The Hill](https://thehill.com) -
[The New Orleans Advocate/The Times-Picayune](https://www.nola.com) -
[The New York Post](https://nypost.com) -
[The New York Sun](https://www.nysun.com) -
[The Seattle Times](https://www.seattletimes.com) -
[The Philadelphia Inquirer](https://www.inquirer.com)

[USA Today](https://www.usatoday.com)\
Grouped in options:\
*Advance Local* sites like\
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
[Democrat and Chronicle](https://www.democratandchronicle.com) -
[Detroit Free Press](https://www.freep.com) -
[Knoxville News Sentinel](https://www.knoxnews.com) -
[Memphis Commercial Appeal](https://www.commercialappeal.com) -
[Milwaukee Journal Sentinel](https://www.jsonline.com) -
[The Arizona Republic](https://www.azcentral.com) -
[The Cincinnati Enquirer](https://www.cincinnati.com) -
[The Courier-Journal](https://www.courier-journal.com) -
[The Detroit News](https://www.detroitnews.com) -
[The Indianapolis Star](https://www.indystar.com) -
[The News-Press](https://www.news-press.com) -
[The Oklahoman](https://www.oklahoman.com) -
[The Record (North Jersey)](https://www.northjersey.com) -
[The Tennessean](https://www.tennessean.com)\
*Hearst Communications (newspapers)* sites like (opt-in to custom sites for unlisted)\
[Albany Times Union](https://www.timesunion.com) -
[Connecticut Post](https://www.ctpost.com) -
[Houston Chronicle](https://www.houstonchronicle.com) -
[New Haven Register](https://www.nhregister.com) -
[San Antonio Express-News](https://www.expressnews.com) -
[San Francisco Chronicle](https://www.sfchronicle.com)\
*Lee Enterprises Group* sites like (opt-in to custom sites for unlisted)\
[Arizona Daily Star](https://tucson.com) -
[Lincoln Journal Star](https://journalstar.com) -
[Omaha World-Herald](https://omaha.com) -
[Richmond Times-Dispatch](https://richmond.com) -
[St. Louis Post-Dispatch](https://www.stltoday.com) -
[The Buffalo News](https://buffalonews.com) -
[The Times of Northwest Indiana](https://www.nwitimes.com) -
[Tulsa World](https://tulsaworld.com) -
[Wisconsin State Journal](https://madison.com) -
[Winston-Salem Journal](https://www.journalnow.com)\
*[Maine Trust](https://www.metln.org)* sites (opt-in to custom sites)\
*McClatchy Group* sites like (opt-in to custom sites for unlisted)\
[Belleville News-Democrat](https://www.bnd.com) -
[Fort Worth Star-Telegram](https://www.star-telegram.com) -
[Lexington Herald-Leader](https://www.kentucky.com) -
[McClatchy DC](https://www.mcclatchydc.com) -
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
[The Press-Enterprise](https://www.pressenterprise.com)\
*[The Atlanta Journal-Constitution](https://www.ajc.com) + Cox First Media* (opt-in to custom sites)\
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
[iPolitics](https://www.ipolitics.ca) -
[Le Devoir](https://www.ledevoir.com) -
[Saltwire Network](https://www.saltwire.com) -
[The Globe and Mail](https://www.theglobeandmail.com) -
[The Hill Times](https://www.hilltimes.com) -
[The Lawyer's Daily](https://www.thelawyersdaily.ca) -
[Winnipeg Free Press](https://www.winnipegfreepress.com)

Grouped in options:\
*Groupe Capitales Médias* sites like (opt-in to custom sites for unlisted)\
[Le Soleil](https://www.lesoleil.com)\
*Groupe Québecor* sites like\
[Le Journal de Montréal](https://www.journaldemontreal.com) -
[Le Journal de Québec](https://www.journaldequebec.com)\
*Postmedia Network* sites like (opt-in to custom sites for unlisted)\
[Calgary Herald](https://calgaryherald.com) -
[Financial Post](https://www.financialpost.com) -
[National Post](https://www.nationalpost.com) -
[The Province](https://theprovince.com) -
[Toronto Sun](https://torontosun.com) -
[Vancouver Sun](https://vancouversun.com)\
*TorStar* sites like\
[The Toronto Star](https://www.thestar.com) and regional sites 
[Niagara Falls Review](https://www.niagarafallsreview.ca) -
[Peterborough Examiner](https://www.thepeterboroughexaminer.com) -
[St. Catharines Standard](https://www.stcatharinesstandard.ca) -
[The Hamilton Spectator](https://www.thespec.com) -
[Waterloo Region Record](https://www.therecord.com) -
[Welland Tribune](https://www.wellandtribune.ca)

#### Europe

[Balkan Insight](https://balkaninsight.com) -
[Bloomberg Adria](https://www.bloombergadria.com) -
[EUobserver](https://euobserver.com) -
[Follow the Money (ftm.eu)](https://www.ftm.eu)

##### United Kingdom/Ireland
[Autocar](https://www.autocar.co.uk) -
[Belfast Telegraph](https://www.belfasttelegraph.co.uk) -
[Business Post](https://www.businesspost.ie) -
[Citywire](https://www.citywire.com) -
[Evening Standard](https://www.standard.co.uk) -
[Financial News](https://www.fnlondon.com) -
[Financial Times](https://www.ft.com) -
[Granta Magazine](https://granta.com) -
[iNews](https://inews.co.uk) -
[Investors' Chronicle](https://www.investorschronicle.co.uk) -
[Irish Independent](https://www.independent.ie) -
[Literary Review](https://literaryreview.co.uk) -
[London Review of Books](https://www.lrb.co.uk) -
[Monocle](https://monocle.com) -
[New Left Review](https://newleftreview.org) -
[Private Equity News](https://www.penews.com) -
[Prospect Magazine](https://www.prospectmagazine.co.uk) -
[Stylist](https://www.stylist.co.uk) -
[Tes Magazine](https://www.tes.com/magazine) -
[The Banker](https://www.thebanker.com) -
[The Critic](https://thecritic.co.uk) -
[The Economist](https://www.economist.com) -
[The Independent](https://www.independent.co.uk) -
[The Irish Times](https://www.irishtimes.com) -
[The New European](https://www.theneweuropean.co.uk) -
[The New Statesman](https://www.newstatesman.com) -
[The Spectator](https://www.spectator.co.uk) -
[The Telegraph](https://www.telegraph.co.uk) -
[The Times (link to archive.is)](https://www.thetimes.co.uk) -
[The Times Literary Supplement](https://www.the-tls.co.uk) -
[UnHerd](https://unherd.com)

Grouped in options:\
*[Haymarket Media Group](https://haymarket.com/brands)* sites (opt-in to custom sites)\
*[Haymarket Medical Network](https://www.haymarketmedicalnetwork.com)* sites (opt-in to custom sites)\
*[Incisive Media](https://www.incisivemedia.com/brands)* sites (opt-in to custom sites)\
*National World Publishing* sites like (opt-in to custom sites for unlisted)\
[The Scotsman](https://www.scotsman.com) -
[Yorkshire Post](https://www.yorkshirepost.co.uk)

##### Denmark
[Berlingske](https://www.berlingske.dk)

##### Finland
[Suomen Sotilas](https://suomensotilas.fi)

##### France/Wallonia
[60 Millions de consommateurs](https://www.60millions-mag.com) -
[Alternatives Economiques](https://www.alternatives-economiques.fr) -
[Atlantico](https://atlantico.fr) -
[Auto Plus](https://www.autoplus.fr) -
[Causeur](https://www.causeur.fr) -
[Challenges](https://www.challenges.fr) -
[Charlie Hebdo](https://charliehebdo.fr) -
[Ciel & espace](https://www.cieletespace.fr) -
[Connaissance des Arts](https://www.connaissancedesarts.com) -
[Cosmopolitan](https://www.cosmopolitan.fr) -
[Elle](https://www.elle.fr) -
[Esprit](https://esprit.presse.fr) -
[Franc-Tireur](https://www.franc-tireur.fr) -
[L'Écho](https://lecho.be) -
[L'Express](https://www.lexpress.fr) -
[L'Humanité](https://www.humanite.fr) -
[L'Informé](https://www.linforme.com) -
[L'Obs](https://www.nouvelobs.com) -
[L'Oeil de la Photographie (fr/en)](https://loeildelaphotographie.com) -
[L'Opinion](https://www.lopinion.fr) -
[L'Usine Nouvelle](https://www.usinenouvelle.com) -
[La Croix](https://www.la-croix.com) -
[La Nouvelle République du Centre-Ouest](https://www.lanouvellerepublique.fr) -
[La Tribune](https://www.latribune.fr) -
[Le Courrier des Stratèges](https://lecourrierdesstrateges.fr) -
[Le Figaro (link to archive.is)](https://www.lefigaro.fr) -
[Le Grand Continent](https://legrandcontinent.eu) -
[Le Journal du Dimanche](https://lejdd.fr) -
[Le Journal du Net](https://www.journaldunet.com) -
[Le Monde (link to archive.is)](https://www.lemonde.fr) -
[Le Nouvel Economiste](https://www.lenouveleconomiste.fr) -
[Le Parisien](https://www.leparisien.fr) -
[Le Point](https://www.lepoint.fr) -
[Le Télégramme](https://www.letelegramme.fr) -
[Les Échos](https://www.lesechos.fr) -
[Les Inrockuptibles](https://www.lesinrocks.com) -
[Marianne](https://www.marianne.net) -
[Paris Match](https://www.parismatch.com) -
[Philosophie Magazine](https://www.philomag.com) -
[Pour la Science](https://www.pourlascience.fr) -
[Public](https://www.public.fr) -
[Revue Conflits](https://www.revueconflits.com) -
[Science & Vie](https://www.science-et-vie.com) -
[Sciences et Avenir](https://www.sciencesetavenir.fr) -
[Télérama](https://www.telerama.fr) -
[Valeurs Actuelles](https://www.valeursactuelles.com)

Grouped in options:\
*Groupe Centre France* sites like (opt-in to custom sites for unlisted)\
[La Montagne](https://www.lamontagne.fr)\
*Groupe IPM* sites like\
[DH Les Sports+](https://www.dhnet.be) -
[L'Avenir](https://www.lavenir.net) -
[La Libre](https://www.lalibre.be)\
*Groupe La Dépêche* sites like\
[Centre Presse](https://www.centrepresseaveyron.fr) -
[L'Indépendant](https://www.lindependant.fr) -
[La Dépêche du Midi](https://www.ladepeche.fr) -
[La Nouvelle République des Pyrénées](https://www.nrpyrenees.fr) -
[Le Petit Bleu d'Agen](https://www.petitbleu.fr) -
[Midi Libre](https://www.midilibre.fr) -
[Midi Olympique](https://www.rugbyrama.fr/midi-olympique)\
*Groupe Nice-Matin* sites like\
[Monaco-Matin](https://www.monacomatin.mc) -
[Nice-Matin](https://www.nicematin.com) -
[Var-Matin](https://www.varmatin.com)\
*Groupe Rossel* (link to archive.is) sites like\
[L'Aisne nouvelle](https://www.aisnenouvelle.fr) -
[L'Ardennais](https://www.lardennais.fr) -
[L'Est-Éclair](https://www.lest-eclair.fr) -
[L'Union](https://www.lunion.fr) -
[La Voix du Nord](https://www.lavoixdunord.fr) -
[Le Courrier picard](https://www.courrier-picard.fr) -
[Le Soir](https://www.lesoir.be) -
[Libération Champagne](https://www.liberation-champagne.fr) -
[Nord Littoral](https://www.nordlittoral.fr) -
[Paris Normandie](https://www.paris-normandie.fr) -
[SudInfo](https://www.sudinfo.be)\
*Groupe Sud Ouest* sites like\
[Charente libre](https://www.charentelibre.fr) -
[La République des Pyrénées](https://www.larepubliquedespyrenees.fr) -
[Sud Ouest](https://www.sudouest.fr)\
*[Groupe SynerJ Media](https://synerj.media)* sites (opt-in to custom sites)\
*Roularta Media Group* sites like\
[Femmes d'Aujourd'hui](https://www.femmesdaujourdhui.be) -
[Flair.be](https://www.flair.be/fr) -
[Le Vif](https://www.levif.be)\
*TechTarget Group* sites like\
[LeMagIT](https://www.lemagit.fr)

##### Germany/Austria
[Ärzte Zeitung](https://www.aerztezeitung.de) -
[Augsburger Allgemeine](https://www.augsburger-allgemeine.de) -
[Auto Motor und Sport](https://www.auto-motor-und-sport.de) -
[Automobilwoche](https://www.automobilwoche.de) -
[Badische Neueste Nachrichten](https://www.bnn.de) -
[Berliner Zeitung](https://www.berliner-zeitung.de) -
[Börsen-Zeitung](https://www.boersen-zeitung.de) -
[Cicero](https://www.cicero.de) -
[Der Freitag](https://www.freitag.de) -
[Der Spiegel (link to archive.is)](https://www.spiegel.de) -
[Der Tagesspiegel (link to archive.is)](https://www.tagesspiegel.de) -
[Die Presse](https://www.diepresse.com) -
[Die Welt (link to archive.is)](https://www.welt.de) -
[Die Zeit (link to archive.is)](https://www.zeit.de) -
[Frankfurter Allgemeine Zeitung](https://www.faz.net) -
[Freie Presse](https://www.freiepresse.de) -
[Jacobin Magazin](https://jacobin.de) -
[Kölner Stadt-Anzeiger](https://www.ksta.de) -
[Kölnische Rundschau](https://www.rundschau-online.de) -
[Krautreporter](https://krautreporter.de) -
[Kurier.at](https://kurier.at) -
[Mitteldeutsche Zeitung](https://www.mz.de) -
[Neue Westfälische](https://www.nw.de) -
[Philosophie Magazin](https://www.philomag.de) -
[Piqd](https://www.piqd.de) -
[Profil.at](https://www.profil.at) -
[Rhein-Zeitung](https://www.rhein-zeitung.de) -
[Salzburger Nachrichten](https://www.sn.at) -
[Schwäbische Zeitung](https://www.schwaebische.de) -
[Springer Medizin](https://www.springermedizin.de) -
[Süddeutsche Zeitung (link to archive.is)](https://www.sueddeutsche.de) -
[Tiroler Tageszeitung](https://www.tt.com) -
[Volksstimme](https://www.volksstimme.de) -
[Vorarlberg Nachrichten](https://www.vn.at) -
[Vorarlberg Online](https://www.vol.at) -
[Weltkunst](https://www.weltkunst.de) -
[Weser-Kurier](https://www.weser-kurier.de) -
[Westdeutsche Zeitung](https://www.wz.de)

Grouped in options:\
*[Deutscher Fachverlag Mediengruppe](https://www.dfv.de)* (opt-in to custom sites)\
*Funke Mediengruppe* sites like\
[Hamburger Abendblatt](https://www.abendblatt.de) -
[Iserlohner Kreisanzeiger und Zeitung](https://www.ikz-online.de) -
[Neue Ruhr Zeitung](https://www.nrz.de) -
[Ostthüringer Zeitung](https://www.otz.de) -
[Thüringer Allgemeine](https://www.thueringer-allgemeine.de) -
[Thüringische Landeszeitung](https://www.tlz.de) -
[Westdeutsche Allgemeine Zeitung](https://www.waz.de) -
[Westfalenpost](https://www.wp.de) -
[Westfälische Rundschau](https://www.wr.de)\
*[Haas Mediengruppe](https://www.haas-mediengruppe.de/marken)* sites like (opt-in to custom sites for unlisted)\
[Mannheimer Morgen](https://www.mannheimer-morgen.de)\
*Landwirtschaftsverlag* sites like\
[Profi.de](https://www.profi.de) -
[Top Agrar.at](https://www.topagrar.at) -
[Top Agrar.com](https://www.topagrar.com) -
[Wochenblatt für Landwirtschaft & Landleben](https://www.wochenblatt.com)\
*Madsack Mediengruppe* sites like (opt-in to custom sites for unlisted)\
[Hannoversche Allgemeine Zeitung](https://www.haz.de) -
[Kieler Nachrichten](https://www.kn-online.de) -
[Leipziger Volkszeitung](https://www.lvz.de) -
[Lübecker Nachrichten](https://www.ln-online.de) -
[Märkische Allgemeine](https://www.maz-online.de) -
[Neue Presse (Hannover)](https://www.neuepresse.de) -
[Ostsee-Zeitung](https://www.ostsee-zeitung.de) -
[RedaktionsNetzwerk Deutschland](https://www.rnd.de)\
*[Media Group Westfalen](https://mgw.de/portfolio/tageszeitungen)* sites like (opt-in to custom sites for unlisted)\
[Ruhr Nachrichten](https://www.ruhrnachrichten.de)\
*Medienholding Süd* sites like (opt-in to custom sites for unlisted)\
[Stuttgarter Nachrichten](https://www.stuttgarter-nachrichten.de) -
[Stuttgarter Zeitung](https://www.stuttgarter-zeitung.de)\
*NOZ/MHN Mediengruppe* sites like\
[Neue Osnabrücker Zeitung](https://www.noz.de) -
[Schleswig-Holsteinischer Zeitungsverlag](https://www.shz.de) -
[Schweriner Volkszeitung](https://www.svz.de)\
*Verlagsgruppe Rhein Main* sites like (opt-in to custom sites for unlisted)\
[Allgemeine Zeitung (Mainz)](https://www.allgemeine-zeitung.de) -
[Darmstädter Echo](https://www.echo-online.de) -
[Wiesbadener Kurier](https://www.wiesbadener-kurier.de)\
*Westfälische Mediengruppe* sites like\
[Münstersche Zeitung](https://www.muensterschezeitung.de) -
[Westfalen-Blatt](https://www.westfalen-blatt.de) -
[Westfälische Nachrichten](https://www.wn.de)

##### Italy
[Corriere della Sera](https://www.corriere.it) -
[Corriere dello Sport](https://www.corrieredellosport.it) -
[Domani](https://editorialedomani.it) -
[Eastwest](https://eastwest.eu) -
[Il Fatto Quotidiano](https://www.ilfattoquotidiano.it) -
[Il Foglio](https://www.ilfoglio.it) -
[Il Manifesto](https://ilmanifesto.it) -
[Internazionale](https://www.internazionale.it) -
[Italia Oggi](https://www.italiaoggi.it) -
[La Gazzetta dello Sport](https://www.gazzetta.it) -
[Money.it](https://www.money.it) -
[Tuttosport](https://www.tuttosport.com)

Grouped in options:\
*Gruppo GEDI.it* sites like\
[Il Secolo XIX](https://www.ilsecoloxix.it) -
[Italian.tech](https://www.italian.tech) -
[La Repubblica](https://www.repubblica.it) -
[La Stampa](https://www.lastampa.it) -
[Le Scienze](https://www.lescienze.it) -
[Moda & Beauty](https://www.moda.it)

[Il Messaggero](https://www.ilmessaggero.it) and regional sites like
[Corriere Adriatico](https://www.corriereadriatico.it) -
[Il Gazzettino](https://www.ilgazzettino.it) -
[Il Mattino](https://www.ilmattino.it) -
[Quotidiano di Puglia](https://www.quotidianodipuglia.it)

[Quotidiano Nazionale](https://www.quotidiano.net) and regional sites like
[Il Giorno](https://www.ilgiorno.it) -
[Il Resto del Carlino](https://www.ilrestodelcarlino.it) -
[Il Telegrafo Livorno](https://www.iltelegrafolivorno.it) -
[La Nazione](https://www.lanazione.it)

*[Gruppo SAE.it](https://www.grupposae.it/i-quotidiani)** sites like (opt-in to custom sites for unlisted)\
[Il Tirreno](https://www.iltirreno.it)* -
[La Nuova Sardegna](https://www.lanuovasardegna.it)*

##### Netherlands/Flanders
[De Tijd](https://www.tijd.be) -
[Doorbraak](https://doorbraak.be) -
[Financieele Dagblad](https://fd.nl) -
[Follow the Money](https://www.ftm.nl) -
[Groene Amsterdammer](https://www.groene.nl) -
[NRC Handelsblad](https://www.nrc.nl) -
[Telegraaf](https://www.telegraaf.nl) -
[Vrij Nederland](https://www.vn.nl)

Grouped in options:\
*Algemeen Dagblad (+ regional; link to archive.is)* sites like\
[Algemeen Dagblad](https://www.ad.nl) -
[BN DeStem](https://www.bndestem.nl) -
[Brabants Dagblad](https://www.bd.nl) -
[Eindhovens Dagblad](https://www.ed.nl) -
[Gelderlander](https://www.gelderlander.nl) -
[PZC](https://www.pzc.nl) -
[Stentor](https://www.destentor.nl) -
[Tubantia](https://tubantia.nl)\
*DPG Media (not ADR)* sites like\
[De Morgen](https://www.demorgen.be) -
[De Volkskrant](https://www.volkskrant.nl) -
[Flair.nl](https://www.flair.nl) -
[Humo](https://www.humo.be) -
[Libelle.nl](https://www.libelle.nl) -
[Margriet](https://www.margriet.nl) -
[Parool](https://www.parool.nl) -
[Trouw](https://www.trouw.nl)\
*Mediahuis Noord* sites like (opt-in to custom sites for unlisted)\
[Dagblad van het Noorden](https://www.dvhn.nl) -
[Leeuwarder Courant](https://www.lc.nl)\
*[ProMedia Group](https://www.promedia.nl/publicaties)* sites (opt-in to custom sites)\
*Roularta Media Group* sites like\
[Artsenkrant](https://www.artsenkrant.com) -
[Beleggers Belangen](https://www.beleggersbelangen.nl) -
[Flair.be](https://www.flair.be/nl) -
[Knack](https://www.knack.be) -
[Krant van West-Vlaanderen](https://kw.be) -
[Libelle.be](https://www.libelle.be)

##### Norway
Grouped in options:\
*NHST Media Group* sites like\
[Europower](https://www.europower.no) -
[Fiskeribladet](https://www.fiskeribladet.no) -
[Intrafish](https://www.intrafish.com) -
[Intrafish.no](https://www.intrafish.no) -
[Recharge](https://www.rechargenews.com) -
[TradeWinds](https://www.tradewindsnews.com) -
[Upstream](https://www.upstreamonline.com)

##### Portugal
[Correio da Manhã](https://www.cmjornal.pt) -
[Record](https://www.record.pt) -
[Sábado](https://www.sabado.pt)

##### Russia
[Wonderzine](https://www.wonderzine.com)

##### Spain
[El Confidencial](https://www.elconfidencial.com) -
[El Diario.es](https://www.eldiario.es) -
[El Español](https://www.elespanol.com) -
[El País](https://elpais.com) -
[La Vanguardia](https://www.lavanguardia.com) -
[Mundo Deportivo](https://www.mundodeportivo.com) -
[Política Exterior](https://www.politicaexterior.com)

Grouped in options:\
*ARA* sites like\
[Ara.cat](https://www.ara.cat) -
[Ara Balears](https://www.arabalears.cat)\
*Grupo Prensa Ibérica* sites like (opt-in to custom sites for unlisted)\
[Diario de Mallorca](https://www.diariodemallorca.es) -
[El Día](https://www.eldia.es) -
[El Periódico de Catalunya](https://www.elperiodico.com) -
[El Periódico de España](https://www.epe.es) -
[Faro de Vigo](https://www.farodevigo.es) -
[Información](https://www.informacion.es) -
[La Nueva España](https://www.lne.es) -
[La Provincia](https://www.laprovincia.es) -
[Levante-EMV](https://www.levante-emv.com) -
[Mallorca Zeitung](https://www.mallorcazeitung.es)\
*Grupo Unidad Editorial* sites like\
[El Mundo](https://www.elmundo.es) -
[Expansión](https://www.expansion.com) -
[Marca](https://www.marca.com)\
*Grupo Vocento* sites like\
[ABC](https://www.abc.es) -
[El Comercio](https://www.elcomercio.es) -
[El Correo](https://www.elcorreo.com) -
[El Diario Montañés](https://www.eldiariomontanes.es) -
[El Diario Vasco](https://www.diariovasco.com) -
[El Norte de Castilla](https://www.elnortedecastilla.es) -
[Hoy](https://www.hoy.es) -
[Ideal](https://www.ideal.es) -
[La Rioja](https://www.larioja.com) -
[La Verdad](https://www.laverdad.es) -
[La Voz de Cádiz](https://www.lavozdigital.es) -
[Las Provincias](https://www.lasprovincias.es) -
[Sur](https://www.diariosur.es)

*[Sport Life Ibérica](https://www.sportlifeiberica.es)* sites (opt-in to custom sites)

##### Sweden
[Dagens ETC](https://www.etc.se) -
[Dagens Industri](https://www.di.se) -
[NyTeknik](https://www.nyteknik.se)

Grouped in options:\
*[NWT Media](https://www.nwtmedia.se)* sites (opt-in to custom sites)

##### Switzerland
[Beobachter](https://www.beobachter.ch) -
[Handelszeitung](https://www.handelszeitung.ch) -
[Le Temps](https://www.letemps.ch) -
[Schweizer Monat](https://schweizermonat.ch) -
[The Market](https://themarket.ch)\
[Neue Zürcher Zeitung](https://www.nzz.ch) (+ regional/CH Media; opt-in to custom sites)

Grouped in options:\
*[Groupe ESH Médias](https://www.eshmedias.ch)* sites like\
[ArcInfo](https://www.arcinfo.ch) -
[La Côte](https://www.lacote.ch) -
[Le Nouvelliste](https://www.lenouvelliste.ch)

##### Australia/New Zealand

[Crikey](https://www.crikey.com.au) -
[MacroBusiness](https://www.macrobusiness.com.au) -
[New Zealand Herald](https://www.nzherald.co.nz) -
[The Saturday Paper](https://www.thesaturdaypaper.com.au) -
[The Spectator Australia](https://www.spectator.com.au) -
[The West Australian (+ regional/opt-in to custom sites)](https://thewest.com.au)

Grouped in options:\
*Australia News Corp* sites like\
[Cairns Post](https://www.cairnspost.com.au) -
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
*Australia Nine Entertainment* sites like\
[Brisbane Times](https://www.brisbanetimes.com.au) -
[The Age](https://www.theage.com.au) -
[The Australian Financial Review](https://www.afr.com) -
[The Sydney Morning Herald](https://www.smh.com.au) -
[WAtoday](https://www.watoday.com.au)\
*Australian Community Media (daily)* sites like (opt-in to custom sites for unlisted)\
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
[The Standard](https://www.standard.net.au) -
[Western Advocate](https://www.westernadvocate.com.au)\
*InvestSmart* sites like\
[InvestSmart](https://www.investsmart.com.au) -
[Intelligent Investor](https://www.intelligentinvestor.com.au)

##### East Asia
[CommonWealth Magazine Taiwan](https://www.cw.com.tw)* -
[Mainichi Shimbun](https://mainichi.jp) -
[Nikkei Asian Review](https://asia.nikkei.com) -
[South China Morning Post](https://www.scmp.com) -
[Southern Weekly](https://www.infzm.com) -
[Tech in Asia](https://www.techinasia.com) -
[The Diplomat](https://thediplomat.com) -
[The Japan Times](https://www.japantimes.co.jp)

##### India
[Bar and Bench](https://www.barandbench.com) -
[Bhaskar](https://www.bhaskar.com) -
[BQ Prime](https://www.bqprime.com) -
[Business Standard](https://www.business-standard.com) -
[Hindu Tamil Thisai](https://www.hindutamil.in) -
[Hindustan Times](https://www.hindustantimes.com) -
[Inc42](https://inc42.com) -
[India Today](https://www.indiatoday.in) -
[Live Law](https://www.livelaw.in) -
[LiveMint](https://www.livemint.com) -
[Mid-Day](https://www.mid-day.com) -
[Outlook](https://www.outlookindia.com) -
[Outlook Business](https://www.outlookbusiness.com) -
[Swarajyamag](https://swarajyamag.com) -
[The Economic Times (ET Prime)](https://economictimes.indiatimes.com) -
[The Financial Express](https://www.financialexpress.com) -
[The Hindu](https://www.thehindu.com) -
[The Hindu BusinessLine](https://www.thehindubusinessline.com) -
[The Indian Express](https://indianexpress.com) -
[The News Minute](https://www.thenewsminute.com) -
[The Quint](https://www.thequint.com) -
[Times of India](https://timesofindia.indiatimes.com) -
[Vikatan](https://www.vikatan.com)

##### Israel
[Globes](https://www.globes.co.il) -
[Haaretz.co.il](https://www.haaretz.co.il) -
[Haaretz.com](https://www.haaretz.com) -
[The Jerusalem Post](https://www.jpost.com) -
[The Marker](https://www.themarker.com)

#### Latin America

##### Argentina
[Ámbito](https://www.ambito.com) -
[El Cronista](https://www.cronista.com) -
[El Tribuno](https://www.eltribuno.com) -
[La Nación](https://www.lanacion.com.ar)*

Grouped in options:\
*Grupo Clarín* sites like\
[Clarín](https://www.clarin.com) -
[La Voz del Interior](https://www.lavoz.com.ar) -
[Los Andes](https://www.losandes.com.ar)

##### Brazil
[CartaCapital](https://www.cartacapital.com.br) -
[Correio do Povo](https://www.correiodopovo.com.br) -
[Crusoé](https://crusoe.com.br) -
[Estado de Minas](https://www.em.com.br) -
[Exame](https://exame.com) -
[GaúchaZH](https://gauchazh.clicrbs.com.br) -
[Gazeta do Povo](https://www.gazetadopovo.com.br) -
[Grupo Abril](https://grupoabril.com.br) -
[O Estado de S. Paulo](https://estadao.com.br) -
[O Globo](https://oglobo.globo.com) -
[Revista Oeste](https://revistaoeste.com) -
[Valor Econômico](https://valor.globo.com)

Grouped in options:\
*UOL* sites like\
[Folha de S. Paulo](https://www.folha.uol.com.br) -
[UOL](https://www.uol.com.br)

##### Chile
[Diario Financiero](https://www.df.cl) -
[El Mercurio (+ regional/opt-in to custom sites)](https://digital.elmercurio.com) -
[La Segunda](https://digital.lasegunda.com) -
[La Tercera](https://www.latercera.com)
##### Colombia
[Cambio Colombia](https://cambiocolombia.com) -
[El Espectador](https://www.elespectador.com) -
[El Tiempo](https://www.eltiempo.com)
##### Mexico
[Mexico News Daily](https://mexiconewsdaily.com)
##### Peru
*Grupo El Comercio* sites like\
[Diario Correo](https://diariocorreo.pe) -
[El Comercio](https://elcomercio.pe) -
[Gestión](https://gestion.pe)
##### Uruguay
[El Observador](https://www.elobservador.com.uy) -
[El País](https://www.elpais.com.uy) -
[La Diaria](https://ladiaria.com.uy)

_* free articles only._

### Sites with limited number of free articles
The free article limit can normally be bypassed by removing cookies for the site.  
Click on the BPC-icon and then *clear cookies*-button in the popup (for unsupported sites grant host permission for domain).  
If removing the cookies works you can also add the site as a custom site.

### New site requests
You can [submit a request for a new website](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues).  
Please use the issue template (check READ FIRST issue), read the following instructions and share your results for a quicker process.  
Remember to check the [previous requests](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/issues?scope=all&state=all) before asking for a new website.  
1. Open incognito window and search for article in Google search (or webcache).
2. Clear cookies for the site (by this add-on: opt-in to custom sites or grant host permission for the site; also enables blocking of general paywall scripts).
3. Disable Javascript on the site (by browser, uBlock Origin or other add-on).
4. Add the domain as custom site for more bypass options.
5. Open page in reader view (by browser or add-on).
6. Try one of the archive sites:
* archive.is/today will not work with Secured DNS by Cloudflare (or when you change referer/user-agent for the archive site)
* for Google Search Tool test url & copy html (tab) code to https://codebeautify.org/htmlviewer

### Add custom site
Add your own custom site/group (for group use comma-separated list; set domain like group_...).  
Check 'Options'-link in popup-menu and go to custom sites.
\* by default BPC has limited host permissions, but you can opt-in to enable custom sites (and also clear cookies/block general paywall-scripts for unlisted sites). You can also just request host permissions for the custom sites you added yourself (or *clear cookies* (BPC-icon) to ask for host permission for current site).

By default sites' cookies/local storage are blocked/removed (for example to bypass article limit when metered paywall).

Additional custom options:
* allow/remove cookies (no options selected: cookies are blocked)
* set useragent to Googlebot, Bingbot or Facebookbot
* set referer (to Facebook, Google or Twitter; ignored when Googlebot is set)
* set random ip-address
* disable Javascript for (sub)domain(s), external domains (when host permission) and/or inline scripts
* block regular expression (to block specific script and/or xhr)
* unhide text amp-page
* redirect to amp-page when paywall(selector)
* load text from json when paywall|article(selector)
* load text from Google webcache when paywall|article(selector)
* add external link to archive-site when paywall|article(selector)
* remove/unhide elements in dom (optional for dev; check examples)

[Example list of custom sites](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/custom/sites_custom.json) or [download list (json)](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/raw/master/custom/sites_custom.json)

### Add excluded site
Add excluded sites/domains (for your subscriptions).\
You can also exclude a specific domain which is grouped in options.

### Changelog-releases
* Visit the [changelog page](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/changelog.txt).
* Or check the [commits](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/commits/master).
* [Download the latest version](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases)

### License
* Bypass Paywalls Clean is [MIT-licensed](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/blob/master/LICENSE).

### Disclaimer
* This software is provided for educational purposes only and is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
