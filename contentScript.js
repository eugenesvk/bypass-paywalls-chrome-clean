//"use strict";
var ext_api = (typeof browser === 'object') ? browser : chrome;
var mobile = window.navigator.userAgent.toLowerCase().includes('mobile');
var domain;
var csDone = false;
var csDoneOnce = false;
var dompurify_loaded = (typeof DOMPurify === 'function');

var ar_grupo_clarin_domains = ['clarin.com', 'lavoz.com.ar', 'losandes.com.ar'];
var be_groupe_ipm_domains = ['dhnet.be', 'lalibre.be', 'lavenir.net'];
var be_roularta_domains = ['artsenkrant.com', 'femmesdaujourdhui.be', 'flair.be', 'knack.be', 'kw.be', 'levif.be', 'libelle.be'];
var ca_gcm_domains = ['lesoleil.com'].concat(['latribune.ca', 'lavoixdelest.ca', 'ledroit.com', 'ledroitfranco.com', 'lenouvelliste.ca', 'lequotidien.com']);
var ca_torstar_domains = ['niagarafallsreview.ca', 'stcatharinesstandard.ca', 'thepeterboroughexaminer.com', 'therecord.com', 'thespec.com', 'thestar.com', 'wellandtribune.ca'];
var de_funke_medien_domains = ['abendblatt.de', 'braunschweiger-zeitung.de', 'morgenpost.de', 'nrz.de', 'otz.de', 'thueringer-allgemeine.de', 'tlz.de', 'waz.de', 'wp.de', 'wr.de'];
var de_lv_domains = ['profi.de', 'topagrar.at', 'topagrar.com', 'wochenblatt.com'];
var de_madsack_domains = ['haz.de', 'kn-online.de', 'ln-online.de', 'lvz.de', 'maz-online.de', 'neuepresse.de', 'ostsee-zeitung.de', 'rnd.de'];
var de_vrm_domains = ['allgemeine-zeitung.de', 'echo-online.de', 'wiesbadener-kurier.de'];
var de_westfalen_medien_domains = ['muensterschezeitung.de', 'westfalen-blatt.de', 'wn.de'];
var es_epiberica_domains = ['diariodemallorca.es', 'eldia.es', 'epe.es', 'farodevigo.es', 'informacion.es', 'laprovincia.es', 'levante-emv.com', 'lne.es', 'mallorcazeitung.es'];
var es_epiberica_custom_domains = ['diaridegirona.cat', 'diariocordoba.com', 'diariodeibiza.es', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'laopinioncoruna.es', 'laopiniondemalaga.es', 'laopiniondemurcia.es', 'laopiniondezamora.es', 'regio7.cat'];
var es_grupo_vocento_domains = ['abc.es', 'diariosur.es', 'diariovasco.com', 'elcomercio.es', 'elcorreo.com', 'eldiariomontanes.es', 'elnortedecastilla.es', 'hoy.es', 'ideal.es', 'larioja.com', 'lasprovincias.es', 'laverdad.es', 'lavozdigital.es'];
var es_unidad_domains = ['elmundo.es', 'expansion.com', 'marca.com'];
var fr_be_groupe_rossel = ['aisnenouvelle.fr', 'courrier-picard.fr', 'lardennais.fr', 'lavoixdunord.fr', 'lesoir.be', 'lest-eclair.fr', 'liberation-champagne.fr', 'lunion.fr', 'nordlittoral.fr', 'paris-normandie.fr', 'sudinfo.be'];
var fr_groupe_ebra_domains = ['bienpublic.com', 'dna.fr', 'estrepublicain.fr', 'lalsace.fr', 'ledauphine.com', 'lejsl.com', 'leprogres.fr', 'republicain-lorrain.fr', 'vosgesmatin.fr'];
var fr_groupe_la_depeche_domains = ['centrepresseaveyron.fr', 'ladepeche.fr', 'lindependant.fr', 'midi-olympique.fr', 'midilibre.fr', 'nrpyrenees.fr', 'petitbleu.fr'];
var fr_groupe_nice_matin_domains = ['monacomatin.mc', 'nicematin.com', 'varmatin.com'];
var it_ilmessaggero_domains = ['corriereadriatico.it', 'ilgazzettino.it', 'ilmattino.it', 'ilmessaggero.it', 'quotidianodipuglia.it'];
var it_gedi_domains = ['italian.tech', 'lescienze.it', 'repubblica.it'];
var it_quotidiano_domains = ['ilgiorno.it', 'ilrestodelcarlino.it', 'iltelegrafolivorno.it', 'lanazione.it', 'quotidiano.net'];
var medium_custom_domains = ['betterprogramming.pub', 'towardsdatascience.com'];
var nl_mediahuis_region_domains = ['gooieneemlander.nl', 'haarlemsdagblad.nl', 'ijmuidercourant.nl', 'leidschdagblad.nl', 'noordhollandsdagblad.nl'];
var nl_dpg_adr_domains = ['ad.nl', 'bd.nl', 'bndestem.nl', 'destentor.nl', 'ed.nl', 'gelderlander.nl', 'pzc.nl', 'tubantia.nl'];
var nl_dpg_media_domains = ['demorgen.be', 'flair.nl', 'humo.be', 'libelle.nl', 'margriet.nl', 'parool.nl', 'trouw.nl', 'volkskrant.nl'];
var no_nhst_media_domains = ['europower-energi.no', 'fiskeribladet.no', 'intrafish.com', 'intrafish.no', 'rechargenews.com', 'tradewindsnews.com', 'upstreamonline.com'];
var pe_grupo_elcomercio_domains = ['diariocorreo.pe', 'elcomercio.pe', 'gestion.pe'];
var timesofindia_domains = ['timesofindia.com', 'timesofindia.indiatimes.com'];
var uk_nat_world_domains = ['scotsman.com', 'yorkshirepost.co.uk'];
var usa_adv_local_domains = ['al.com', 'cleveland.com', 'lehighvalleylive.com', 'masslive.com', 'mlive.com', 'nj.com', 'oregonlive.com', 'pennlive.com', 'silive.com', 'syracuse.com'];
var usa_arizent_custom_domains = ['accountingtoday.com', 'benefitnews.com', 'bondbuyer.com', 'dig-in.com', 'financial-planning.com', 'nationalmortgagenews.com'];
var usa_conde_nast_domains = ['architecturaldigest.com', 'bonappetit.com', 'epicurious.com', 'gq.com' , 'newyorker.com', 'vanityfair.com', 'vogue.com', 'wired.com'];
var usa_craincomm_domains = ['adage.com', 'autonews.com', 'chicagobusiness.com', 'crainscleveland.com', 'crainsdetroit.com', 'crainsnewyork.com', 'modernhealthcare.com'];
var usa_gannett_domains = ['azcentral.com', 'cincinnati.com', 'commercialappeal.com', 'courier-journal.com', 'democratandchronicle.com', 'detroitnews.com', 'freep.com', 'indystar.com', 'jsonline.com', 'knoxnews.com', 'news-press.com', 'northjersey.com', 'oklahoman.com', 'statesman.com', 'tennessean.com'];
var usa_genomeweb_domains = ['360dx.com', 'genomeweb.com', 'precisiononcologynews.com'];
var usa_hearst_comm_domains = ['expressnews.com', 'houstonchronicle.com', 'sfchronicle.com'];
var usa_lee_ent_domains = ['buffalonews.com', 'journalnow.com', 'omaha.com', 'richmond.com', 'tucson.com', 'tulsaworld.com'];
var usa_mcc_domains = ['bnd.com', 'charlotteobserver.com', 'fresnobee.com', 'kansas.com', 'kansascity.com', 'kentucky.com', 'mcclatchydc.com', 'miamiherald.com', 'newsobserver.com', 'sacbee.com', 'star-telegram.com', 'thestate.com', 'tri-cityherald.com'];
var usa_mng_domains =   ['denverpost.com', 'eastbaytimes.com', 'mercurynews.com', 'ocregister.com', 'pe.com', 'twincities.com'];
var usa_outside_mag_domains = ["backpacker.com", "betamtb.com", "betternutrition.com", "cleaneatingmag.com", "climbing.com", "cyclingtips.com", "gymclimber.com", "outsideonline.com", "oxygenmag.com", "pelotonmagazine.com", "podiumrunner.com", "rockandice.com", "skimag.com", "trailrunnermag.com", "triathlete.com", "vegetariantimes.com", "velonews.com", "womensrunning.com", "yogajournal.com"];
var usa_tribune_domains = ['baltimoresun.com', 'chicagotribune.com', 'courant.com', 'dailypress.com', 'mcall.com', 'nydailynews.com', 'orlandosentinel.com', 'pilotonline.com', 'sun-sentinel.com'];

// clean local storage of sites (with an exemption for hold-list)
var arr_localstorage_hold = ['aftonbladet.se', 'allgaeuer-zeitung.de', 'augsburger-allgemeine.de', 'barrons.com', 'businessinsider.com', 'businessoffashion.com', 'businesspost.ie', 'challenges.fr', 'charliehebdo.fr', 'cmjornal.pt', 'corriere.it', 'corrieredellosport.it', 'cyclingtips.com', 'dvhn.nl', 'economictimes.com', 'eldiario.es', 'elespanol.com', 'elle.fr', 'elpais.com', 'elperiodico.com', 'enotes.com', 'estadao.com.br', 'forbes.com', 'fortune.com', 'freiepresse.de', 'gauchazh.clicrbs.com.br', 'globo.com', 'ilfoglio.it', 'inc42.com', 'indianexpress.com', 'ksta.de', 'kurier.at', 'lanouvellerepublique.fr', 'latimes.com', 'lc.nl', 'lesechos.fr', 'livemint.com', 'mid-day.com', 'mundodeportivo.com', 'nationalreview.com', 'nrc.nl', 'nw.de', 'nytimes.com', 'nzherald.co.nz', 'record.pt', 'rundschau-online.de', 'sandiegouniontribune.com', 'scmp.com', 'seekingalpha.com', 'telegraph.co.uk', 'tes.com', 'theatlantic.com', 'thebulletin.org', 'thecritic.co.uk', 'thetimes.co.uk', 'uol.com.br', 'wsj.com'].concat(be_roularta_domains, ca_gcm_domains, de_funke_medien_domains, de_lv_domains, de_westfalen_medien_domains, es_epiberica_domains, es_epiberica_custom_domains, es_grupo_vocento_domains, es_unidad_domains, fr_groupe_ebra_domains, fr_groupe_la_depeche_domains, fr_groupe_nice_matin_domains, it_gedi_domains, it_quotidiano_domains, ca_gcm_domains, nl_dpg_media_domains, no_nhst_media_domains, timesofindia_domains, usa_hearst_comm_domains, usa_mcc_domains);
if (!matchDomain(arr_localstorage_hold)) {
  window.localStorage.clear();
}

function runOnMessage(bg2csData, dompurify_loaded) {
// custom/updated sites: load text from json
if (bg2csData.ld_json && dompurify_loaded) {
  if (bg2csData.ld_json.includes('|')) {
    window.setTimeout(function () {
      let ld_json_split = bg2csData.ld_json.split('|');
      let paywall_sel = ld_json_split[0];
      let article_sel = ld_json_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      let article_append = ld_json_split[2];// optional
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = getArticleJsonScript();
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text.replace(/[\r\n]/g, '').replace(/(\\r)?\\n/g, '<br>'));
            let json_key, json_text;
            if (Array.isArray(json)) {
              json = json.filter(x => json_key = Object.keys(x).find(key => key.match(/^articlebody$/i))) || json.filter(x => json_key = Object.keys(x).find(key => key.match(/^text$/i)));
              if (json_key)
                json_text = parseHtmlEntities(json[0][json_key]);
            } else {
              json_key = Object.keys(json).find(key => key.match(/^articlebody$/i)) || Object.keys(json).find(key => key.match(/^text$/i));
              json_text = parseHtmlEntities(json[json_key]);
            }
            if (json_text && article.parentNode) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div style="margin: 25px 0px">' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                article.innerHTML = '';
                article.appendChild(article_new);
              } else
                article.parentNode.replaceChild(article_new, article);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 1000);
  }
}

if (bg2csData.ld_json_next && dompurify_loaded) {
  if (bg2csData.ld_json_next.includes('|')) {
    window.setTimeout(function () {
      let ld_json_next_split = bg2csData.ld_json_next.split('|');
      let paywall_sel = ld_json_next_split[0];
      let article_sel = ld_json_next_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      let article_append = ld_json_next_split[2];// optional
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = document.querySelector('script#__NEXT_DATA__');
        let json = JSON.parse(json_script.text);
        if (json) {
          let url_next = findKeyJson(json, ['slug']);
          if (url_next && !window.location.pathname.endsWith(url_next))
            refreshCurrentTab();
          let json_text = parseHtmlEntities(findKeyJson(json, ['body', 'content', 'description'], 500));
          if (json_text && article.parentNode) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                article.innerHTML = '';
                article.appendChild(article_new);
              } else
                article.parentNode.replaceChild(article_new, article);
          }
        }
      }
    }, 1000);
  }
}

// custom/updated sites: load text from Google webcache
if (bg2csData.ld_google_webcache && dompurify_loaded) {
  if (bg2csData.ld_google_webcache.includes('|')) {
    window.setTimeout(function () {
      let url = window.location.href;
      let ld_google_webcache_split = bg2csData.ld_google_webcache.split('|');
      let paywall_sel = ld_google_webcache_split[0];
      let article_sel = ld_google_webcache_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      if (paywall.length) {
        removeDOMElement(...paywall);
        let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
        replaceDomElementExt(url_cache, true, false, article_sel);
      }
    }, 1000);
  }
}

// custom/updated sites: add link to article
if (bg2csData.add_ext_link) {
  if (bg2csData.add_ext_link.css && bg2csData.add_ext_link.css.includes('|') && bg2csData.add_ext_link.type) {
    window.setTimeout(function () {
      let url = window.location.href.split(/[#\?]/)[0];
      if (matchUrlDomain('zeit.de', url)) {
        if (document.querySelector('link[rel="next"]'))
          url += '/komplettansicht';
      }
      let add_ext_link_split = bg2csData.add_ext_link.css.split('|');
      let paywall_sel = add_ext_link_split[0];
      let article_sel = add_ext_link_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      if (paywall.length) {
        removeDOMElement(...paywall);
        let article = document.querySelector(article_sel);
        if (article) {
          switch (bg2csData.add_ext_link.type) {
          case 'archive.is':
            article.firstChild.before(archiveLink(url));
            break;
          case '12ft.io':
            article.firstChild.before(ext_12ftLink(url));
            break;
          }
        }
      }
    }, 1000);
  }
}

// check for opt-in confirmation (from background.js)
if (bg2csData.optin_setcookie) {
  if (matchDomain(['crusoe.uol.com.br'])) {
    if (!cookieExists('crs_subscriber'))
      setCookie('crs_subscriber', 1, 'crusoe.uol.com.br', '/', 14);
  }
}

// custom/updated sites: try to unhide text on amp-page
if (bg2csData.amp_unhide) {
  window.setTimeout(function () {
    let amp_page_hide = document.querySelector('script[src*="/amp-access-"], script[src*="/amp-subscriptions-"]');
    if (amp_page_hide) {
      amp_unhide_subscr_section();
      amp_unhide_access_hide();
      amp_iframes_replace();
    }
  }, 100);
}

// custom/updated sites: amp-redirect
if (bg2csData.amp_redirect) {
  window.setTimeout(function () {
    let amp_script = document.querySelector('script[src^="https://cdn.ampproject.org/"]');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    let amp_page = amp_script && !amphtml;
    if (!amp_page) {
      let paywall = true;
      if (bg2csData.amp_redirect.paywall)
        paywall = document.querySelector(bg2csData.amp_redirect.paywall);
      if (paywall && amphtml) {
        removeDOMElement(paywall);
        window.location.href = amphtml.href;
      }
    }
  }, 500);
}

function cs_code_elems(elems) {
  for (let elem of elems) {
    let elem_dom = document.querySelectorAll(elem.cond);
    for (let item of elem_dom) {
      if (elem.rm_elem)
        removeDOMElement(item);
      if (elem.rm_class) {
        let rm_class = elem.rm_class.split(',').map(x => x.trim());
        item.classList.remove(...rm_class);
      }
      if (elem.rm_attrib) {
        let rm_attribs = elem.rm_attrib.split('|');
        for (let rm_attrib of rm_attribs)
          item.removeAttribute(rm_attrib);
      }
      if (elem.set_attrib && elem.set_attrib.includes('|')) {
        let attrib = elem.set_attrib.split('|')[0];
        let value = elem.set_attrib.split('|')[1];
        item.setAttribute(attrib, value);
      }
      if (elem.elems)
        cs_code_elems(elem.elems);
    }
  }
}

// updated sites: cs_code
if (bg2csData.cs_code) {
  window.setTimeout(function () {
    cs_code_elems(bg2csData.cs_code);
  }, 1000);
}

}// runOnMessage

var msg_once = false;
if (ext_api.runtime) {
  ext_api.runtime.onMessage.addListener(
    function (request, sender) {
    if (request.msg === 'bg2cs' && !msg_once) {
      msg_once = true;
      runOnMessage(request.data, dompurify_loaded);
    }
  })
}

var div_bpc_done = document.querySelector('div#bpc_done');
if (!div_bpc_done) {

if (ext_api.runtime) {
  ext_api.runtime.onMessage.addListener(
    function (request, sender) {
    if (request.msg === 'showExtSrc') {
      replaceDomElementExtSrc(request.data.url, request.data.html, true, false, request.data.selector, request.data.text_fail, request.data.selector_source);
    }
  })
}

// Content workarounds/domain

if (matchDomain('medium.com') || matchDomain(medium_custom_domains) || document.querySelector('script[src*=".medium.com/"]')) {
  let paywall = document.querySelector('div#paywall-background-color');
  removeDOMElement(paywall);
  if (paywall) {
    refreshCurrentTab();
    csDoneOnce = true;
  }
  window.setTimeout(function () {
    let meter = document.querySelector('[id*="highlight-meter-"]');
    if (meter)
      meter.hidden = true;
  }, 500);
}

else if (window.location.hostname.match(/\.(com|net)\.au$/)) {//australia

if (matchDomain('thesaturdaypaper.com.au')) {
  let hide_end = document.querySelector('div.hide-end');
  if (hide_end) {
    refreshCurrentTab();
    csDoneOnce = true;
  }
  let paywall = document.querySelector('div.paywall-hard-always-show');
  removeDOMElement(paywall);
}

else if (matchDomain(['brisbanetimes.com.au', 'smh.com.au', 'theage.com.au', 'watoday.com.au'])) {
  if (!window.location.hostname.startsWith('amp.')) {
    let paywall = document.querySelector('meta[content^="FOR SUBSCRIBERS"], #paywall_prompt');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  } else {
    amp_unhide_subscr_section();
  }
}

else {
  // Australian Community Media newspapers
  let au_comm_media_domains = ['bendigoadvertiser.com.au', 'bordermail.com.au', 'canberratimes.com.au', 'centralwesterndaily.com.au', 'dailyadvertiser.com.au', 'dailyliberal.com.au', 'examiner.com.au', 'illawarramercury.com.au', 'newcastleherald.com.au', 'northerndailyleader.com.au', 'standard.net.au', 'theadvocate.com.au', 'thecourier.com.au', 'westernadvocate.com.au'];
  let au_comm_media_link = document.querySelector('a[href^="https://australiancommunitymedia.zendesk.com"]');
  if (matchDomain(au_comm_media_domains) || au_comm_media_link) {
    let mask = document.querySelector('div[style*="mask-image"]');
    if (mask) {
      mask.removeAttribute('style');
      let div_hidden = document.querySelectorAll('div.hidden');
      for (let elem of div_hidden)
        elem.classList.remove('hidden');
    } else {
      let subscribe_truncate = document.querySelector('.subscribe-truncate');
      if (subscribe_truncate)
        subscribe_truncate.classList.remove('subscribe-truncate');
      let subscriber_hiders = document.querySelectorAll('.subscriber-hider');
      for (let subscriber_hider of subscriber_hiders)
        subscriber_hider.classList.remove('subscriber-hider');
    }
    let blocker = document.querySelector('div.blocker');
    let overlays = document.querySelectorAll('div.transition-all, div[id^="headlessui-dialog"]');
    let noscroll = document.querySelectorAll('html[style], body[style]');
    for (let elem of noscroll)
      elem.removeAttribute('style');
    let story_generic_iframe = document.querySelector('.story-generic__iframe');
    let ads = document.querySelectorAll('.ad-placeholder, .sticky, [id*="-container"], #hindsight-ads-iframe');
    removeDOMElement(story_generic_iframe, blocker, ...overlays, ...ads);
  } else if (window.location.hostname.endsWith('.com.au')) {
    // Australia News Corp
    let au_news_corp_domains = ['adelaidenow.com.au', 'cairnspost.com.au', 'codesports.com.au', 'couriermail.com.au', 'dailytelegraph.com.au', 'geelongadvertiser.com.au', 'goldcoastbulletin.com.au', 'heraldsun.com.au', 'ntnews.com.au', 'theaustralian.com.au', 'thechronicle.com.au', 'themercury.com.au', 'townsvillebulletin.com.au', 'weeklytimesnow.com.au'];
    if (matchDomain(au_news_corp_domains)) {
      if (window.location.hostname.startsWith('amp.') || window.location.search.match(/[&\?]amp/)) {
        let figure_stretch = document.querySelectorAll('figure.stretch');
        for (let elem of figure_stretch)
          elem.classList.remove('stretch');
        let amp_ads_sel = 'amp-ad, amp-embed, [id^="ad-mrec-"], [class*="ad-container"]';
        let comments;
        if (window.location.hostname.startsWith('amp.')) {
          amp_unhide_subscr_section(amp_ads_sel, true, true, '.newscdn.com.au');
          comments = document.querySelector('#story-comments, .comments-wrapper');
        } else if (window.location.search.match(/(\?|&)amp/)) {
          amp_unhide_subscr_section(amp_ads_sel, true, true, '.newscdn.com.au');
          comments = document.querySelector('#comments-load, .comments-module');
          let amp_iframe_sizers = document.querySelectorAll('amp-iframe > i-amphtml-sizer');
          removeDOMElement(...amp_iframe_sizers)
        }
        removeDOMElement(comments);
      } else {
        if (matchDomain('codesports.com.au')) {
          let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
          for (let elem of lazy_images) {
            elem.src = elem.getAttribute('data-src');
            elem.classList.remove('lazyload');
          }
        }
        let ads = document.querySelectorAll('.header_ads-container, .ad-block, .ad-container');
        removeDOMElement(...ads);
      }
    } else {
      // Australian Seven West Media
      if (matchDomain('thewest.com.au') || document.querySelector('li > a[href*=".sevenwestmedia.com.au"]')) {
        window.setTimeout(function () {
          let breach_screen = document.querySelector('div.paywall div[data-testid*="BreachScreen"], div[class*="StyledBreachWallContent"]');
          if (breach_screen) {
            let scripts = document.querySelectorAll('script:not([src], [type])');
            let json_script;
            for (let script of scripts) {
              if (script.text.includes('window.PAGE_DATA =')) {
                json_script = script;
                break;
              }
            }
            if (json_script) {
              let json_text = json_script.text.split('window.PAGE_DATA =')[1].split('</script')[0];
              json_text = json_text.replace(/:undefined([,}])/g, ':"undefined"$1');
              try {
              let json_article = JSON.parse(json_text);
              let json_pub;
              for (let key in json_article) {
                let json_resolution = json_article[key].data.result.resolution;
                if (json_resolution && json_resolution.publication) {
                  json_pub = json_resolution.publication;
                  break;
                }
              }
              let json_content = [];
              let url_loaded;
              if (json_pub) {
                json_content = json_pub.content.blocks;
                url_loaded = json_pub._self;
              } else
                window.location.reload(true);
              //let json_video = json_pub.mainVideo;
              let url = window.location.href;
              if (!url_loaded || !url.includes(url_loaded.slice(-10)))
                window.location.reload(true);
              let par_elem, par_sub1, par_sub2;
              let par_dom = document.createElement('div');
              let tweet_id = 1;
              for (let par of json_content) {
                par_elem = '';
                if (par.kind === 'text') {
                  par_elem = document.createElement('p');
                  par_elem.innerText = par.text;
                } else if (par.kind === 'subhead') {
                  par_elem = document.createElement('h2');
                  par_elem.innerText = par.text;
                } else if (par.kind === 'pull-quote') {
                  par_elem = document.createElement('i');
                  par_elem.innerText = (par.attribution ? par.attribution + ': ' : '') + par.text;
                } else if (par.kind === 'embed') {
                  if (par.reference.includes('https://omny.fm/') || par.reference.includes('https://docdro.id/')) {
                    par_elem = document.createElement('embed');
                    par_elem.src = par.reference;
                    par_elem.style = 'height:500px; width:100%';
                    par_elem.frameborder = '0';
                  } else {
                    par_elem = document.createElement('a');
                    par_elem.href = par.reference;
                    par_elem.innerText = par.reference.split('?')[0];
                    console.log('embed: ' + par.reference);
                  }
                } else if (par.kind === 'unordered-list') {
                  if (par.items) {
                    par_elem = document.createElement('ul');
                    for (let item of par.items)
                      if (item.text) {
                        par_sub1 = document.createElement('li');
                        if (item.intentions[0] && item.intentions[0].href) {
                          par_sub2 = document.createElement('a');
                          par_sub2.href = item.intentions[0].href;
                        } else {
                          par_sub2 = document.createElement('span');
                        }
                        par_sub2.innerText = item.text;
                        par_sub1.appendChild(par_sub2);
                        par_elem.appendChild(par_sub1);
                      }
                  }
                } else if (par.kind === 'inline') {
                  if (par.asset.kind === 'image') {
                    par_elem = document.createElement('figure');
                    par_sub1 = document.createElement('img');
                    par_sub1.src = par.asset.original.reference;
                    par_sub1.style = 'width:100%';
                    par_elem.appendChild(par_sub1);
                    if (par.asset.captionText) {
                      par_sub2 = document.createElement('figcaption');
                      par_sub2.innerText = par.asset.captionText + ' ' + (par.asset.copyrightByline ? par.asset.copyrightByline : '') +
                        ((par.asset.copyrightCredit && par.asset.captionText !== par.asset.copyrightByline) ? '/' + par.asset.copyrightCredit : '');
                      par_elem.appendChild(par_sub2);
                    }
                  }
                } else if (par.kind === 'inline-related') {
                  par_elem = document.createElement('p');
                  if (par.publications) {
                    for (let elem of par.publications) {
                      let par_link = document.createElement('a');
                      par_link.href = elem._self;
                      par_link.innerText = elem.heading;
                      par_elem.appendChild(par_link);
                      par_elem.appendChild(document.createElement('br'));
                    }
                  }
                } else {
                  par_elem = document.createElement('p');
                  par_elem.innerText = par.text;
                  console.log(par.kind);
                }
                if (par_elem)
                  par_dom.appendChild(par_elem);
              }
              let content = document.querySelector('div[class*="StyledArticleContent"]');
              if (content) {
                content.innerHTML = '';
                content.appendChild(par_dom);
              } else {
                par_dom.setAttribute('style', 'margin: 20px;');
                breach_screen.before(par_dom);
              }
              } catch (err) {
                console.log(err);
              }
            }
            removeDOMElement(breach_screen);
          }
        }, 2000);
        let header_advert = document.querySelector('.headerAdvertisement');
        hideDOMElement(header_advert);
      }
    }
  }
  else
    csDone = true;
}

} else if (window.location.hostname.match(/\.(de|at|ch)$/) || matchDomain(['faz.net', 'topagrar.com', 'wochenblatt.com'])) {//germany/austria/switzerland - ch

if (matchDomain('aerzteblatt.de')) {
  let paywall = document.querySelector('div#restrictedAccessLogin');
  if (paywall) {
    removeDOMElement(paywall);
    let restricted = document.querySelector('div.restricted');
    if (restricted)
      restricted.classList.remove('restricted');
    let unsharp = document.querySelector('div.unsharp');
    if (unsharp)
      unsharp.classList.remove('unsharp');
  }
}

else if (matchDomain('aerztezeitung.de')) {
  let paywall = document.querySelector('div.AZLoginModule');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let content = document.querySelector('p.intro');
        if (json_text && content) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.after(article_new);
        }
      }
    }
  }
}

else if (matchDomain('allgaeuer-zeitung.de')) {
  if (!window.location.search.startsWith('?type=amp')) {
    let paywall = document.querySelector('p.nfy-text-blur');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = window.location.pathname + '?type=amp';
    }
  } else {
    let preview = document.querySelectorAll('p.nfy-text-blur, div[subscriptions-display^="NOT data."]');
    let amp_ads = document.querySelectorAll('amp-ad');
    removeDOMElement(...preview, ...amp_ads);
  }
}

else if (matchDomain(['arcinfo.ch', 'lacote.ch', 'lenouvelliste.ch'])) {// Groupe ESH Médias
  let paywall = document.querySelector('section#paywall-articles');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let url_id = window.location.pathname.match(/\d+$/).pop();
    let html = document.documentElement.outerHTML;
    let og_url = document.querySelector('meta[name="og:url"][content]');
    if (og_url && !og_url.content.endsWith(url_id))
      window.location.reload(true);
    let json;
    if (html.includes('window.__NUXT__='))
      json = html.split('window.__NUXT__=')[1].split('</script>')[0].trim().replace(/blocs:\[\{.*?\}\],/g, '');
    let article = document.querySelector('div.html-content');
    let no_intro = false;
    if (!article) {
      article = document.querySelector('div.container-mobile-full');
      no_intro = true;
    }
    if (article && json) {
      let content = '';
      if (json.includes('text_1="'))
        content = json.split('text_1="').pop().split('";')[0];
      else {
        let parts = json.split('html:"');
        parts.splice(0, 1);
        for (let part of parts)
          content += part.split('",has_pre_content')[0];
      }
      if (content) {
        content = content.replace(/\\u003C/g, '<').replace(/\\u003E/g, '>').replace(/\\u002F/g, '/').replace(/\\"/g, '"').replace(/\\r\\n/g, '');
        let parser = new DOMParser();
        let content_new = parser.parseFromString('<div class="html-content">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
        let article_top;
        if (!no_intro) {
          article_top = article.parentNode.parentNode;
          removeDOMElement(article.parentNode);
        } else
          article_top = article;
        article_top.appendChild(content_new.querySelector('div'));
      } else {
        window.location.reload(true);
      }
    }
  }
}

else if (matchDomain('augsburger-allgemeine.de')) {
  let url = window.location.href;
  if (!url.includes('-amp.html')) {
    let paywall = document.querySelector('div.aa-visible-logged-out');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = url.replace('.html', '-amp.html');
    }
  } else {
    amp_unhide_subscr_section();
  }
}

else if (matchDomain(['beobachter.ch', 'handelszeitung.ch'])) {
  let paywall = document.querySelector('div#piano-inlined');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script#hydrationdata');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json) {
          let url_id = json_script.text.includes('"gcid":"') ? json_script.text.split('"gcid":"')[1].split('","nid"')[0] : '';
          if (url_id && !window.location.pathname.endsWith(url_id))
            refreshCurrentTab();
          let pars = json.state;
          let paragraphs = document.querySelectorAll('div.paragraph');
          let article = paragraphs[0];
          if (article) {
            article.setAttribute('class', 'paragraph text-paragraph');
            for (let paragraph of paragraphs)
              paragraph.innerHTML = '';
            let parser = new DOMParser();
            for (let par in pars) {
              let content = pars[par].text;
              if (content) {
                let content_new = parser.parseFromString('<div style="font-size: 1.7rem; margin: 50px;">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                let article_new = content_new.querySelector('div'); ;
                article.appendChild(article_new);
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  let ads = document.querySelectorAll('div.ad-wrapper');
  hideDOMElement(...ads);
}

else if (matchDomain('berliner-zeitung.de')) {
  window.setTimeout(function () {
    let ads = document.querySelectorAll('[id^="traffective-ad"], [class^="ad-slot_wrapper"], [class^="outbrain_container"]');
    hideDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('boersen-zeitung.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('storefront-element[child-id="paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    replaceDomElementExt(url, false, false, 'article');
  }
}

else if (matchDomain('cicero.de')) {
  let url = window.location.href;
  if (!window.location.search.match(/(\?|&)amp/)) {
    let paywall = document.querySelector('.plenigo-paywall');
    if (paywall) {
      removeDOMElement(paywall);
      let url_amp = url.split('?')[0] + '?amp';
      replaceDomElementExt(url_amp, false, false, '.field-name-field-cc-body');
    }
  } else {
    let teasered_content = document.querySelector('.teasered-content');
    if (teasered_content)
      teasered_content.classList.remove('teasered-content');
    let teasered_content_fader = document.querySelector('.teasered-content-fader');
    let btn_read_more = document.querySelector('.btn--read-more');
    let amp_ads = document.querySelectorAll('amp-ad');
    removeDOMElement(teasered_content_fader, btn_read_more, ...amp_ads);
  }
  let urban_ad_sign = document.querySelectorAll('.urban-ad-sign');
  removeDOMElement(...urban_ad_sign);
}

else if (matchDomain('faz.net')) {
  if (matchDomain('zeitung.faz.net')) {
    let paywall_z = document.querySelector('.c-red-carpet');
    if (paywall_z) {
      removeDOMElement(paywall_z);
      let og_url = document.querySelector('meta[property="og:url"][content]');
      if (og_url)
        window.location.href = og_url.content;
    }
    let sticky_advt = document.querySelector('.sticky-advt');
    removeDOMElement(sticky_advt);
  } else {
    let paywall = document.querySelector('#paywall-form-container-outer, .atc-ContainerPaywall');
    if (paywall) {
      removeDOMElement(paywall);
      let url = new URL(window.location.href);
      let mUrl = new URL(url.pathname, 'https://m.faz.net/');
      try {
        fetch(mUrl)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              let parser = new DOMParser();
              let doc = parser.parseFromString(html, 'text/html');
              let json = doc.querySelector('script[id="schemaOrgJson"]');
              if (json) {
                let json_text = json.text.replace(/(\r|\n)/g, '');
                let split1 = json_text.split('"ArticleBody": "');
                let split2 = split1[1].split('","author":');
                if (split2[0].includes('"'))
                  json_text = split1[0] + '"ArticleBody": "' + split2[0].replace(/(\\)?"/g, "'") + '","author":' + split2[1];
                try {
                  json_text = JSON.parse(json_text).ArticleBody;
                } catch (err) {
                  console.log(err);
                  return;
                }
                if (!json_text)
                  return;
                let article_text = document.querySelector('.art_txt.paywall,.atc-Text.js-atc-Text');
                article_text.innerText = '';
                json_text = breakText(json_text);
                json_text.split("\n\n").forEach(
                  (p_text) => {
                  let elem;
                  if (p_text.length < 80) {
                    elem = document.createElement("h2");
                    elem.setAttribute('class', 'atc-SubHeadline');
                  } else {
                    elem = document.createElement("p");
                    elem.setAttribute('class', 'atc-TextParagraph');
                  };
                  elem.innerText = p_text;
                  article_text.appendChild(elem);
                });
              }
            })
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    let lay_paysocial = document.querySelector('div.lay-PaySocial');
    let ads = document.querySelectorAll('div.iqadtile_wrapper');
    removeDOMElement(lay_paysocial, ...ads);
  }
}

else if (matchDomain('freiepresse.de')) {
  let url = window.location.href;
  let article_teaser = document.querySelector('div.article-teaser');
  if (article_teaser && url.match(/(\-artikel)(\d){6,}/)) {
    window.setTimeout(function () {
      window.location.href = url.replace('-artikel', '-amp');
    }, 500);
  } else if (url.match(/(\-amp)(\d){6,}/)) {
    let amp_ads = document.querySelectorAll('amp-fx-flying-carpet, amp-ad, amp-embed');
    let pw_layer = document.querySelector('.pw-layer');
    removeDOMElement(...amp_ads, pw_layer);
  }
}

else if (matchDomain('golem.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.paywall-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('p#gpar1');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('jacobin.de')) {
  let paywall = pageContains('h3.m-auto', 'Dieser Artikel ist nur mit Abo zugänglich.');
  if (paywall.length) {
    let slash = document.querySelector('div.slash');
    removeDOMElement(paywall[0].parentNode, slash);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props.pageProps.sections && json.props.pageProps.sections[1].content) {
          let url_next = json.query.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.sections[1].content;
          let first_par = document.querySelector('body > div#__next p.bodyText');
          if (first_par) {
            let par_class = first_par.getAttribute('class');
            let article = first_par.parentNode;
            if (article) {
              let add_par = false;
              for (let par of pars) {
                if (!add_par) {
                  if (par.type === 'paywall')
                    add_par = true;
                } else {
                  if (par.text) {
                    let elem_type = 'p';
                    let elem_class = par_class;
                    let elem_style;
                    if (['paragraph', 'quote'].includes(par.type)) {
                      if (par.type === 'quote')
                        elem_style = 'font-size: 36px; font-weight: bold;';
                    } else if (par.type === 'header') {
                      elem_type = 'h2';
                      elem_class = 'content-element font-headline h2 my-1em';
                    }
                    let content = par.text.replace(/&nbsp;/g, '');
                    let parser = new DOMParser();
                    let content_new = parser.parseFromString('<' + elem_type + ' class="' + elem_class + (elem_style ? '" style="' + elem_style : '') + '">' + DOMPurify.sanitize(content) + '</' + elem_type + 'p>', 'text/html');
                    article.appendChild(content_new.querySelector(elem_type));
                  } else
                    console.log(par);
                }
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('krautreporter.de')) {
  let paywall = document.querySelector('.js-article-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    window.setTimeout(function () {
      let paywall_divider = document.querySelector('.js-paywall-divider');
      let steady_checkout = document.querySelector('#steady-checkout');
      removeDOMElement(paywall_divider, steady_checkout);
      let blurred = document.querySelectorAll('.blurred');
      for (let elem of blurred)
        elem.classList.remove('blurred', 'json-ld-paywall-marker', 'hidden@print');
    }, 500);
  }
}

else if (matchDomain(['ksta.de', 'rundschau-online.de'])) {
  let paywall = document.querySelector('div[data-tm-placeholder]');
  if (paywall) {
    removeDOMElement(paywall);
    let span_hidden = document.querySelector('div.dm-paint');
    if (span_hidden)
      span_hidden.removeAttribute('class');
  } else {
    let paywall_new = document.querySelector('div.paywalled-content');
    if (paywall_new)
      paywall_new.removeAttribute('class');
    let wrapper = document.querySelector('div.dm-paywall-wrapper');
    removeDOMElement(wrapper);
  }
  let banners = document.querySelectorAll('div.dm-slot, div[id^="taboola-feed"]');
  removeDOMElement(...banners);
}

else if (matchDomain('kurier.at')) {
  let paywall = document.querySelector('div.plusContent');
  if (paywall) {
    paywall.classList.remove('plusContent');
    window.setTimeout(function () {
      let elem_hidden = paywall.querySelectorAll('.ng-star-inserted[style="display: none;"]');
      for (let elem of elem_hidden)
        elem.removeAttribute('style');
    }, 2000);
  }
  let banners = document.querySelectorAll('div#view-offer, app-paywall, adfullbanner, outbrain');
  removeDOMElement(...banners);
}

else if (matchDomain(['noz.de', 'shz.de', 'svz.de'])) {
  if (window.location.pathname.endsWith('/amp')) {
    amp_unhide_access_hide('="NOT data.reduced"', '="data.reduced"', 'amp-ad, amp-embed, .ads-wrapper, #flying-carpet-wrapper');
  } else {
    let ads = document.querySelectorAll('div.nozmhn_ad');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('nw.de')) {
  if (!window.location.pathname.endsWith('.amp.html')) {
    let paywall = document.querySelector('div[data-tracking-visible^="paywall-"]');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  } else {
    amp_unhide_access_hide('="loggedIn AND hasAbo"', '', 'amp-ad, amp-embed, .banner');
  }
}

else if (matchDomain('nzz.ch')) {
  if (!window.location.href.includes('/amp/')) {
    let ads = document.querySelectorAll('div.resor');
    hideDOMElement(...ads);
  } else {
    let amp_ads = document.querySelectorAll('amp-ad');
    removeDOMElement(...amp_ads);
  }
}

else if (matchDomain('philomag.de')) {
  let paywall = document.querySelector('div[id^="block-paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articlebody.replace(/%paywall%/g, '').replace(/(\\r)?\\n/g, '<br><br>');
        let content = document.querySelector('div.content-center > div.description');
        if (json_text && content) {
          content.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.appendChild(article_new);
        }
      }
    }
  }
}


else if (matchDomain('schwaebische.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.sve-paywall-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'div.article_body');
    let body = document.querySelector('body');
    if (body)
      body.removeAttribute('style');
    waitDOMAttribute('body', 'body', 'style', node => node.removeAttribute('style'), true);
  }
  window.setTimeout(function () {
    let ads = document.querySelectorAll('div.fp-ad-placeholder');
    hideDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('spiegel.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div[data-area="paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div[data-area="body"]');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('tagesspiegel.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article--paid');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('zeit.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('aside#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-body');
    if (article)
      article.firstChild.before(archiveLink(url));
    let fade = document.querySelector('div.paragraph--faded');
    if (fade)
      fade.classList.remove('paragraph--faded');
  }
}

else if (matchDomain(de_lv_domains)) {
  let paywall_topagrar = document.querySelector('div > div.paywall-package');
  let paywall_other = document.querySelector('div[id^="paymentprocess-"]');
  if (paywall_topagrar || paywall_other) {
    if (paywall_topagrar)
      removeDOMElement(paywall_topagrar.parentNode);
    else {
      let intro = document.querySelector('div.m-paywall__textFadeOut');
      removeDOMElement(paywall_other, intro);
    }
    let div_hidden = document.querySelector('div.paywall-full-content[style]');
    if (div_hidden) {
      div_hidden.removeAttribute('class');
      div_hidden.removeAttribute('style');
    }
  }
  let banners = document.querySelectorAll('.adZone');
  removeDOMElement(...banners);
}

else if (matchDomain(de_westfalen_medien_domains)) {
  let url = window.location.href;
  if (url.includes('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed, section[class^="fp-ad"]');
  } else {
    let paywall = document.querySelector('.fp-article-paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall) {
      removeDOMElement(paywall);
      if (amphtml)
        window.location.href = amphtml.href;
    }
  }
}

else if (matchDomain(de_funke_medien_domains) || document.querySelector('a[href="https://www.funkemedien.de/"]')) {
  if (window.location.search.startsWith('?service=amp'))
    amp_unhide_access_hide('="NOT p.showRegWall AND NOT p.showPayWall"', '', 'amp-ad, amp-embed, amp-fx-flying-carpet');
  else
    sessionStorage.setItem('deobfuscate', 'true');
}

else if (matchDomain(de_madsack_domains) || document.querySelector('link[href*=".rndtech.de/"]')) {
  // plus code in contentScript_once_var.js (timing)
  if (!window.location.search.startsWith('?outputType=valid_amp')) {
    let ads = document.querySelectorAll('div[class^="Adstyled__AdWrapper"]');
    hideDOMElement(...ads);
  } else {
    ampToHtml();
  }
}

else if (matchDomain(de_vrm_domains) || document.querySelector('meta[name^="cXenseParse:vrm-"]')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.storyElementWrapper__paywallContainer');
  let article = document.querySelector('section[data-testid="storyPage-main-content"]');
  if (paywall && article) {
    removeDOMElement(paywall);
    fetch(url)
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          if (html.includes('window.__INITIAL_STATE__=')) {
            let split1 = html.split('window.__INITIAL_STATE__=')[1];
            let state = (split1.split('};')[0] + '}').split('</script>')[0];
            if (state) {
              try {
                let json = JSON.parse(state);
                if (json) {
                  let json_text = json.contentPage.data.context.storylineText;
                  let pars = json_text.split(/(?=<p>)/);
                  let page_items = json.contentPage.data.context.elements;
                  if (json_text && page_items) {
                    let n = 0;
                    let new_article = document.createElement('div');
                    new_article.setAttribute('style', 'font-size: 17px; font-family:Calibri, Helvetica, Arial; margin: auto; max-width: 620px;');
                    for (let item of page_items) {
                      let elem = document.createElement('p');
                      if (item.type === 'paragraph') {
                        if (pars[n]) {
                          let par = pars[n];
                          n++;
                          elem.innerText = par.replace(/<\/?p>/g, '');
                        }
                      } else if (item.type === 'subhead') {
                        if (item.fields) {
                          elem = document.createElement('h2');
                          elem.appendChild(document.createTextNode(item.fields[0].value));
                        }
                      } else if (item.type === 'internal_link') {
                        if (item.relation) {
                          let par_link = document.createElement('a');
                          par_link.href = item.relation.href;
                          par_link.innerText = item.relation.title;
                          elem.appendChild(par_link);
                        }
                      } else if (item.type === 'embed') {
                        let fields = item.fields[0];
                        if (fields.name && fields.name === 'uri' && fields.value) {
                          let par_link = document.createElement('a');
                          par_link.href = fields.value;
                          par_link.innerText = fields.value.split('?')[0];
                          par_link.target = '_blank';
                          elem.appendChild(par_link);
                        }
                      } else if (!['dateline', 'headline', 'image', 'leadtext', 'linkbox', 'linkbox_title', 'relation'].includes(item.type)) {
                        elem = '';
                        console.log(item.type);
                        console.log(item);
                      }
                      if (elem)
                        new_article.appendChild(elem);
                    }
                      if (new_article.hasChildNodes())
                        article.appendChild(new_article);
                  }
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
        })
      }
    })
  }
}

else if (document.querySelector('script[src^="https://assets.static-chmedia.ch/"]')) {// nzz.ch regional/CH Media
  let infobox_body = document.querySelector('div.infobox__body');
  if (infobox_body)
    infobox_body.removeAttribute('class');
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(dk|fi|se)$/)) {//denmark/finland/sweden

if (matchDomain('aftonbladet.se')) {
  let url = window.location.href;
  let paywall = document.querySelectorAll('div.paywall');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let article = document.querySelector('article');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('dn.se')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.esi-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article__content');
    if (article)
      article.appendChild(archiveLink(url));
  }
}

else if (matchDomain('etc.se')) {
  let paywall = document.querySelector('div.paywalled');
  if (paywall) {
    paywall.removeAttribute('class');
    let gradient = document.querySelector('div.bg-gradient-white');
    if (gradient)
      gradient.removeAttribute('class');
    let footer = document.querySelector('footer');
    removeDOMElement(footer.parentNode);
  }
  let ads = document.querySelectorAll('div[class$="-ad"]');
  removeDOMElement(...ads);
  let video_iframes = document.querySelectorAll('div.embed-block > iframe[width][height]');
  for (let elem of video_iframes) {
    if (elem.width > 1000) {
      let ratio = elem.width / 640;
      if (window.navigator.userAgent.toLowerCase().includes('mobile'))
        ratio = elem.width / 320;
      elem.width = elem.width / ratio;
      elem.height = elem.height / ratio;
    }
  }
}

else if (matchDomain('nyteknik.se')) {
  let locked_article = document.querySelector('div.locked-article');
  if (locked_article)
    locked_article.classList.remove('locked-article');
  window.setTimeout(function () {
    let hidden_images = document.querySelectorAll('img[src=""][data-proxy-image]');
    for (let hidden_image of hidden_images)
      hidden_image.setAttribute('src', hidden_image.getAttribute('data-proxy-image').replace('_320', '_640'));
  }, 2000);
}

else if (matchDomain('suomensotilas.fi')) {
  let obscured = document.querySelector('div.epfl-pw-obscured');
  if (obscured)
    obscured.classList.remove('epfl-pw-obscured');
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(es|pt|cat)$/) || matchDomain(['diariocordoba.com', 'diariovasco.com', 'elconfidencial.com', 'elcorreo.com', 'elespanol.com', 'elpais.com', 'elperiodico.com', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'expansion.com', 'larioja.com', 'lavanguardia.com', 'levante-emv.com', 'marca.com', 'mundodeportivo.com', 'politicaexterior.com'])) {//spain/portugal

if (matchDomain(['ara.cat', 'arabalears.cat'])) {
  let url = window.location.href;
  if (!window.location.pathname.endsWith('.amp.html')) {
    let paywall = document.querySelector('div.paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  }
}

else if (matchDomain(['cmjornal.pt', 'record.pt'])) {
  let paywall = document.querySelector('.bloqueio_exclusivos, .container_assinatura');
  let amphtml = document.querySelector('link[rel="amphtml"]');
  let url = window.location.href;
  if (!url.includes('/amp/')) {
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  } else {
    amp_unhide_subscr_section('amp-ad, amp-embed, amp-consent, .detalheAds, .exclusivos_bar');
    let amp_links = document.querySelectorAll('a[href^="https://www-cmjornal-pt.cdn.ampproject.org/c/s/"]');
    for (let amp_link of amp_links)
      amp_link.href = amp_link.href.replace('www-cmjornal-pt.cdn.ampproject.org/c/s/', '');
  }
}

else if (matchDomain('elconfidencial.com')) {
  let premium = document.querySelector('div.newsType__content--closed');
  if (premium)
    premium.classList.remove('newsType__content--closed');
  let ads = document.querySelectorAll('div[id^="mega_"], div[id^="roba_"]');
  removeDOMElement(...ads);
}

else if (matchDomain('eldiario.es')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('^="access"');
  } else {
    let ads = document.querySelectorAll('.edi-advertising, .header-ad');
    removeDOMElement(...ads);
  }
}

else if (matchDomain('elespanol.com')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let paywall = document.querySelector('div.full-suscriptor-container');
    let adverts = document.querySelectorAll('[id*="superior"], [class*="adv"]');
    removeDOMElement(paywall, ...adverts);
  }
}

else if (matchDomain(es_unidad_domains)) {
  let premium = document.querySelector('.ue-c-article__premium');
  let url = window.location.href;
  if (!window.location.hostname.match(/^amp(-[a-z]{2})?\./)) {
    if (premium) {
      removeDOMElement(premium);
      window.location.href = url.replace('/www.', '/amp.');
    }
  } else {
    amp_unhide_access_hide('="authorized=true"', '="authorized!=true"');
    amp_unhide_subscr_section('.advertising, amp-embed, amp-ad');
  }
}

else if (matchDomain('elpais.com')) {
  let login_register = document.querySelector('.login_register');
  if (window.location.pathname.endsWith('.amp.html') || window.location.search.match(/(\?|&)outputType=amp/)) {
    amp_unhide_access_hide('="vip"], [amp-access="success"', '="NOT vip"], [amp-access="NOT success"');
    removeDOMElement(login_register);
  } else {
    let counter = document.querySelector('#counterLayerDiv');
    removeDOMElement(counter);
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (login_register && amphtml) {
      removeDOMElement(login_register, video);
      window.location.href = amphtml.href;
    }
  }
  let paywall_offer = document.querySelector('.paywallOffer');
  let ctn_closed_article = document.querySelector('#ctn_closed_article, #ctn_freemium_article, #ctn_premium_article');
  removeDOMElement(paywall_offer, ctn_closed_article);
}

else if (matchDomain('elperiodico.com')) {
  let url = window.location.href;
  if (!url.includes('amp.elperiodico.com')) {
    let div_hidden = document.querySelector('div.closed');
    if (div_hidden)
      div_hidden.classList.remove('closed');
    else {
      let paywall = document.querySelector('.ep-masPeriodico-info-login');
      removeDOMElement(paywall);
      if (paywall)
        window.location.href = url.replace('www.', 'amp.');
    }
  } else {
    let not_logged = document.querySelector('.ep-masPeriodico-info-login');
    if (not_logged) {
      removeDOMElement(not_logged);
      amp_unhide_access_hide('^="logged"', '^="NOT logged"');
    }
    window.setTimeout(function () {
      let amp_img = document.querySelectorAll('amp-img > img');
      for (let elem of amp_img) {
        if (elem.src)
          elem.src = elem.src.replace('amp.elperiodico.com/clip/', 'estaticos-cdn.elperiodico.com/clip/');
      }
    }, 3000);
  }
}

else if (matchDomain(es_grupo_vocento_domains)) {
  let paywall = document.querySelector('.voc-paywall, .container-wall-exclusive, .cierre-suscripcion:not([style="display: none;"])');
  if (!window.location.pathname.endsWith('_amp.html')) {
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (!amphtml)
      amphtml = {href: window.location.pathname.replace('.html', '_amp.html')};
    if (paywall && amphtml && !matchDomain(['diariovasco.com', 'eldiariomontanes.es'])) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    } else {
      let banners = document.querySelectorAll('.voc-advertising, div.ev-em-modal, span.mega-superior, .v-adv');
      removeDOMElement(...banners);
    }
  } else {
    amp_unhide_access_hide('="result=\'ALLOW_ACCESS\'"', '="result!=\'ALLOW_ACCESS\'"', 'amp-ad, amp-embed, .v-adv');
    removeDOMElement(paywall);
    let body_top = document.querySelector('body#top');
    if (body_top)
      body_top.removeAttribute('id');
  }
}

else if (matchDomain(es_epiberica_domains) || matchDomain(es_epiberica_custom_domains)) {
  if (window.location.href.includes('.amp.html')) {
    let truncated = document.querySelector('div.article-body--truncated');
    if (truncated)
      truncated.classList.remove('article-body--truncated');
    amp_unhide_access_hide('="NOT access"], [amp-access="FALSE"', '="access"');
  } else if (window.location.hostname === 'amp.epe.es') {
    amp_unhide_access_hide('="loggedIn"', '="NOT loggedIn"', 'amp-ad, amp-embed, amp-next-page');
  } else {
    let ads = document.querySelectorAll('div.commercial-up-full__wrapper, div.sidebar--sticky__space, div[data-bbnx-id*="cxense"]');
    removeDOMElement(...ads);
  }
}

else if (matchDomain(['lavanguardia.com', 'mundodeportivo.com'])) {
  let ads = document.querySelectorAll('span.content-ad, span.hidden-ad, span.ad-unit, div.ad-div');
  hideDOMElement(...ads);
}

else if (matchDomain('observador.pt')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelector('.premium-article');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      paywall.classList.remove('premium-article');
      window.location.href = amphtml.href;
    }
  } else {
    amp_unhide_subscr_section('amp-ad, amp-consent, section > .modal');
  }
}

else if (matchDomain('politicaexterior.com')) {
  let paywall = document.querySelector('div[class^="paywall-"]');
  if (paywall) {
    let article = document.querySelector('div.entry-content-text');
    let json = document.querySelector('script[type="application/ld+json"]:not([class])');
    if (json) {
      let json_text = JSON.parse(json.text).description.replace(/&amp;nbsp;/g, '');
      let article_new = document.createElement('div');
      article_new.setAttribute('class', 'entry-content-text');
      article_new.innerText = '\r\n' + json_text;
      article.parentNode.replaceChild(article_new, article);
    }
    removeDOMElement(paywall);
  }
}

else
  csDone = true;

} else if ((window.location.hostname.endsWith('.fr') && !matchDomain(['lemagit.fr'])) || matchDomain(['bienpublic.com', 'connaissancedesarts.com', 'journaldunet.com', 'la-croix.com', 'ledauphine.com', 'legrandcontinent.eu', 'lejsl.com', 'lesinrocks.com', 'lesoir.be', 'loeildelaphotographie.com', 'marianne.net', 'nouvelobs.com', 'parismatch.com', 'science-et-vie.com', 'sudinfo.be'].concat(fr_groupe_nice_matin_domains))) {//france

if (matchDomain('alternatives-economiques.fr')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('#temp-paywall');
    removeDOMElement(paywall);
    let data_ae_poool = document.querySelector('div[data-ae-poool]');
    if (data_ae_poool)
      data_ae_poool.removeAttribute('style');
  }, 500);
}

else if (matchDomain('atlantico.fr')) {
  let paywall = document.querySelector('div.markup[class*="Paywall"]');
  if (paywall)
    paywall.setAttribute('class', 'markup');
}

else if (matchDomain('autoplus.fr')) {
  let ads = document.querySelectorAll('div.placeholder-pub_dfp');
  removeDOMElement(...ads);
}

else if (matchDomain(['challenges.fr', 'sciencesetavenir.fr'])) {
  if (window.location.pathname.endsWith('.amp')) {
    amp_unhide_access_hide('="paywall.access OR cha.access"', '="NOT (paywall.access OR cha.access)"');
  } else {
    let amorce = document.querySelector('div.amorce.manual');
    hideDOMElement(amorce);
    let content = document.querySelectorAll('.user-paying-content');
    for (let elem of content) {
      elem.classList.remove('user-paying-content');
      elem.removeAttribute('hidden');
    }
    let paywall = document.querySelector('.temp-paywall');
    removeDOMElement(paywall);
    let ads = document.querySelectorAll('div[class^="pub-container"], div[id^="moneytag-"]');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('charliehebdo.fr')) {
  window.setTimeout(function () {
    let paywalled_content = document.querySelector('div.ch-paywalled-content');
    if (paywalled_content)
      paywalled_content.removeAttribute('style');
    let poool_widget = document.querySelector('div#poool-widget');
    removeDOMElement(poool_widget);
  }, 500);
}

else if (matchDomain('connaissancedesarts.com')) {
  let ads = document.querySelectorAll('div.ad-container');
  removeDOMElement(...ads);
}

else if (matchDomain('elle.fr')) {
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_access_hide('="poool.access OR cmi_premium.access"');
  } else {
    let hidden_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
    for (let hidden_image of hidden_images)
      hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
    let subscription_bar = document.querySelector('.tc-subscription-bar');
    removeDOMElement(subscription_bar);
  }
}

else if (matchDomain(fr_be_groupe_rossel)) {
  if (matchDomain('sudinfo.be')) {
    let paywall = document.querySelector('div.r-blurred');
    if (paywall) {
      let paywall_header = document.querySelector('.r-paywall--header');
      let intro = document.querySelector('div.r-not-blurred');
      removeDOMElement(paywall, paywall_header, intro);
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody.replace(/&nbsp;/g, '').replace(/\[.*\]/, '');
          let content = document.querySelector('article');
          if (json_text && content) {
            let par = document.createElement('p');
            par.innerText = '\r\n' + json_text;
            content.appendChild(par);
          }
        }
      }
    }
  }
  let ads = document.querySelectorAll('div[id^="article_"], r-pub, div#rossel-leader-top');
  hideDOMElement(...ads);
}

else if (matchDomain(fr_groupe_ebra_domains)) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div.preview');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  } else {
    amp_unhide_access_hide('="access"', '="NOT access"', 'amp-ad, amp-embed');
  }
}

else if (matchDomain(fr_groupe_la_depeche_domains)) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let paywall = document.querySelector('div.paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall) {
      removeDOMElement(paywall);
      if (amphtml)
        window.location.href = amphtml.href;
      else {
        let json_script = getArticleJsonScript();
        if (json_script) {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = parseHtmlEntities(json.articleBody);
            let content = document.querySelector('div.article-full__body-content');
            if (json_text && content) {
              content.innerHTML = '';
              let article_new = document.createElement('p');
              article_new.innerText = json_text;
              content.appendChild(article_new);
              content.removeAttribute('style');
              content.removeAttribute('data-state');
            }
          }
        }
      }
    }
  }
}

else if (matchDomain(fr_groupe_nice_matin_domains)) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_access_hide('="access"', '="NOT access"', 'amp-ad, amp-embed');
  } else {
    let paywall = document.querySelector('div#article-teaser');
    if (paywall)
      paywall.removeAttribute('id');
  }
  let ads = document.querySelectorAll('div[class^="ad-slot-"]');
  hideDOMElement(...ads);
}

else if (matchDomain('franc-tireur.fr')) {
  let paywall = document.querySelector('.paywall');
  removeDOMElement(paywall);
}

else if (matchDomain('humanite.fr')) {
  if (window.location.search.startsWith('?amp')) {
    let qiota_script = document.querySelector('amp-script[src^="https://www.qiota.com/"]');
    if (qiota_script) {
      let amphtml_fill_content = qiota_script.querySelector('div.i-amphtml-fill-content');
      if (amphtml_fill_content)
        amphtml_fill_content.removeAttribute('class');
      let i_amphtml_sizer = qiota_script.querySelector('i-amphtml-sizer');
      removeDOMElement(i_amphtml_sizer);
    }
  } else {
    let banner = document.querySelector('div.qiota');
    removeDOMElement(banner);
  }
}

else if (matchDomain('journaldunet.com')) {
  let reg_wall = document.querySelector('.reg_wall');
  removeDOMElement(reg_wall);
  let entry_reg_wall = document.querySelector('.entry_reg_wall');
  if (entry_reg_wall) {
    entry_reg_wall.removeAttribute('style');
  }
}

else if (matchDomain('la-croix.com')) {
  let url = window.location.href;
  if (!url.includes('la-croix.com/amp/')) {
    let ads = document.querySelectorAll('div[class^="ads-wrapper-"]');
    removeDOMElement(...ads);
  } else {
    let paywall_block = document.querySelector('#paywall_block');
    let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
    removeDOMElement(paywall_block, ...amp_ads);
  }
}

else if (matchDomain('lanouvellerepublique.fr')) {
  let alert_didacticiel = document.querySelector('div.alert-didacticiel');
  let loading = document.querySelectorAll('span.loading');
  removeDOMElement(alert_didacticiel, ...loading);
}

else if (matchDomain('lecourrierdesstrateges.fr')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.jpw-truncate-btn');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let content = document.querySelector('div.content-inner');
          if (json_text && content) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.parentNode.replaceChild(content_new, content);
            let hidden_images = document.querySelectorAll('img[src][srcset]');
            for (let elem of hidden_images)
              elem.removeAttribute('srcset');
            let entry_content = document.querySelector('div.entry-content[style]');
            if (entry_content)
              entry_content.removeAttribute('style');
          }
        }
      }
    }
  }, 500);
}

else if (matchDomain('lefigaro.fr')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#fig-premium-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('article');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('legrandcontinent.eu')) {
  let paywall = document.querySelector('body.paywall, body.pw, body.softwall');
  if (paywall)
    paywall.classList.remove('paywall', 'pw', 'softwall');
  let banners = document.querySelectorAll('div#fix-pw, div.disposableBanner');
  removeDOMElement(...banners);
}

else if (matchDomain(['lejdd.fr', 'parismatch.com', 'public.fr'])) {
  let poool_banner = document.querySelector('#poool-container');
  let poool_widget = document.querySelector('#poool-widget-content');
  let forbidden = document.querySelector('.forbidden');
  let ads = document.querySelectorAll('div[class^="lmn-"]');
  removeDOMElement(poool_banner, poool_widget, forbidden, ...ads);
  let bottom_hide = document.querySelector('.cnt[data-poool-mode="hide"]');
  if (bottom_hide) {
    bottom_hide.removeAttribute('data-poool-mode');
    bottom_hide.removeAttribute('style');
  }
}

else if (matchDomain('leparisien.fr')) {
  let paywall = document.querySelector('div.paywall');
  if (window.location.pathname.startsWith('/amp/')) {
    if (paywall) {
      let paywall_sticky = document.querySelector('div.paywall-sticky');
      removeDOMElement(paywall, paywall_sticky);
      let section_hidden = document.querySelectorAll('section[hidden]');
      for (let elem of section_hidden)
        elem.removeAttribute('hidden');
      let mask = document.querySelector('.amp-premium-first-content');
      if (mask)
        mask.classList.remove('amp-premium-first-content');
    }
  } else {
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  }
}

else if (matchDomain('lesechos.fr')) {
  if (window.location.pathname.startsWith('/amp/')) {
    ampToHtml();
  } else {
    window.setTimeout(function () {
      let abo_banner = document.querySelector('div[class*="pgxf3b-2"]');
      let ad_blocks = document.querySelectorAll('[class*="jzxvkd"]');
      hideDOMElement(...ad_blocks);
      if (abo_banner && dompurify_loaded) {
        removeDOMElement(abo_banner);
        let url = window.location.href;
        let html = document.documentElement.outerHTML;
        try {
          let split1 = html.split(/window\.__REACT_QUERY_STATE__\s?=/)[1];
          let state = split1.split('</script>')[0].trim().replace(/;$/, '');
          let data = JSON.parse(state);
          let data_article = data.queries[1].state;
          let url_loaded = data_article.data.path;
          if (url_loaded && (!url_loaded.slice(-7).match(/\d+/) || !url.includes(url_loaded.slice(-7))))
            refreshCurrentTab();
          else {
            let article = data_article.data.stripes[0].mainContent[0].data.description.replace(/allowfullscreen='(true)?'/g, '');
            let paywallNode = document.querySelector('.post-paywall');
            if (paywallNode) {
              let contentNode = document.createElement('div');
              let parser = new DOMParser();
              let article_html = parser.parseFromString('<div>' + DOMPurify.sanitize(article) + '</div>', 'text/html');
              let article_par = article_html.querySelector('div');
              if (article_par) {
                contentNode.appendChild(article_par);
                contentNode.className = paywallNode.className;
                paywallNode.before(contentNode);
                removeDOMElement(paywallNode);
                let paywallLastChildNode = document.querySelector('.post-paywall  > :last-child');
                if (paywallLastChildNode) {
                  paywallLastChildNode.setAttribute('style', 'height: auto !important; overflow: hidden !important; max-height: none !important;');
                }
              }
            }
            let styleElem = document.head.appendChild(document.createElement('style'));
            styleElem.innerHTML = ".post-paywall::after {height: auto !important;}";
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);
  }
}

else if (matchDomain('lesinrocks.com')) {
  if (window.location.search.match(/(\?|&)amp/)) {
    let size_defined = document.querySelector('amp-script.i-amphtml-layout-size-defined');
    if (size_defined)
      size_defined.style = 'overflow:visible !important;';
    let overlays = document.querySelectorAll('section.learn_more, div.sidebar, div.menu-footer, div.tooltip_bib, footer.content-info');
    removeDOMElement(...overlays);
  }
}

else if (matchDomain('letelegramme.fr')) {
  let paywall = document.querySelectorAll('div.tlg-paywalled');
  for (let elem of paywall)
    elem.classList.remove('tlg-paywalled');
  let ads = document.querySelectorAll('div[id^="pub_"]');
  hideDOMElement(...ads);
}

else if (matchDomain('lexpress.fr')) {
  let ads = document.querySelectorAll('div[class^="block_pub"], div.bottom-bar-full, div.tead, div.ban-bottom, div.placeholder--ban-atf');
  hideDOMElement(...ads);
}

else if (matchDomain('loeildelaphotographie.com')) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
  }
  let premium_pic_boxes = document.querySelectorAll('.premium-pic-box');
  let banners = document.querySelectorAll('.membership-promo-container, .login_form_litle');
  removeDOMElement(...premium_pic_boxes, ...banners);
  let blurred_images = document.querySelectorAll('img[style*="blur"]');
  for (let blurred_image of blurred_images)
    blurred_image.removeAttribute('style');
}

else if (matchDomain('marianne.net')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall && dompurify_loaded) {
    let article_source = document.querySelector('div.article-body[data-content-src]');
    if (article_source) {
      let article_text = decode_utf8(atob(article_source.getAttribute('data-content-src')));
      let parser = new DOMParser();
      let html = parser.parseFromString('<div>' + DOMPurify.sanitize(article_text) + '</div>', 'text/html');
      let article = html.querySelector('div');
      article_source.innerHTML = '';
      article_source.appendChild(article);
      article_source.removeAttribute('data-content-src');
    }
    removeDOMElement(paywall);
  }
}

else if (matchDomain('nouvelobs.com')) {
  let paywall = document.querySelector('.paywall');
  removeDOMElement(paywall);
  let fade = document.querySelector('div.paywall--gradient-top');
  if (fade)
    fade.classList.remove('paywall--gradient-top');
}

else if (matchDomain('science-et-vie.com')) {
  if (window.location.hostname.startsWith('amp.')) {
    let pars = document.querySelectorAll('.qiota_reserve > p, .qiota_reserve > h2');
    let pars_text = [];
    for (let par of pars) {
      if (pars_text.includes(par.innerText))
        removeDOMElement(par);
      else
        pars_text.push(par.innerText);
    }
    let sizer = document.querySelector('div.article-content > amp-script > i-amphtml-sizer');
    removeDOMElement(sizer);
    let replaced_content = document.querySelector('div.i-amphtml-replaced-content');
    if (replaced_content)
      replaced_content.removeAttribute('class');
  }
}

else if (matchDomain(['sudouest.fr', 'charentelibre.fr', 'larepubliquedespyrenees.fr'])) {
  let paywall = document.querySelectorAll('.visible-not-premium');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let visible_premium = document.querySelectorAll('div.visible-premium');
    for (let elem of visible_premium)
      elem.classList.remove('visible-premium');
  }
  window.setTimeout(function () {
    let footer_premium = document.querySelector('.footer-premium');
    let ads = document.querySelectorAll('div.pub, div.ph-easy-subscription');
    hideDOMElement(footer_premium, ...ads);
  }, 500);
}

else if (matchDomain('lamontagne.fr') || document.querySelector('ul.list-inline > li > a[href="https://www.centrefrance.com/"]')) {// Groupe Centre France
  let paywall = document.querySelector('div#poool-widget');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let content = document.querySelector('div.entry-content');
        if (json_text && content) {
          content.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.appendChild(article_new);
        }
      }
    }
  }
}

else
  csDone = true;

} else if (window.location.hostname.endsWith('.it') || matchDomain(['eastwest.eu', 'italian.tech', 'limesonline.com', 'quotidiano.net'])) {//italy

if (matchDomain('corriere.it')) {
  if (window.location.pathname.endsWith('_amp.html')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    if (window.location.pathname.includes('_preview.shtml') && !window.location.pathname.startsWith('/podcast/')) {
      window.setTimeout(function () {
        window.location.href = window.location.pathname.replace('_preview.shtml', '.shtml');
      }, 500);
    }
  }
}

else if (matchDomain('corrieredellosport.it')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div[class^="MainTextTruncated_paragraph__"]');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
    let ads = document.querySelectorAll('div[class^="AdUnit_placeholder"]');
    removeDOMElement(...ads);
  } else {
    let ads = document.querySelectorAll('amp-ad, amp-embed');
    removeDOMElement(...ads);
  }
}

else if (matchDomain('eastwest.eu')) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('style');
    paywall.classList.remove('paywall');
    let intro = document.querySelectorAll('div#testo_articolo > p, div#testo_articolo > h3');
    let offerta = document.querySelectorAll('div.offerta_abbonamenti');
    removeDOMElement(...intro, ...offerta);
  }
}

else if (matchDomain('gazzetta.it')) {
  function header_nofix(header) {
    if (header) {
      let nofix_div = document.createElement('div');
      nofix_div.setAttribute('style', 'margin: 20px; font-weight: bold; color: red;');
      nofix_div.innerText = 'BPC > no fix';
      header.appendChild(nofix_div);
    }
  }
  if (window.location.pathname.endsWith('_preview.shtml')) {
    let paywall = document.querySelector('section.bck-freemium__wall');
    if (paywall) {
      removeDOMElement(paywall);
      if (!window.location.search.startsWith('?reason=unauthenticated')) {
        window.location.href = window.location.pathname.replace('_preview', '') + '?gaa_at=g';
      } else {
        let json_script = getArticleJsonScript();
        let header = document.querySelector('div.content > h2');
        if (json_script) {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = json.articleBody.replace(/(\s{3}|&nbsp;)/g, '\r\n\r\n');
            let content = document.querySelector('div.content > p.has-first-letter');
            if (json_text && content) {
              let content_new = document.createElement('p');
              content_new.innerText = json_text;
              content.parentNode.replaceChild(content_new, content);
              let article_body = document.querySelector('section.body-article');
              if (article_body)
                article_body.style = 'height: auto;';
            } else
              header_nofix(header);
          }
        } else
          header_nofix(header);
      }
    }
  } else if (window.location.pathname.endsWith('_amp.shtml'))
    ampToHtml();
}

else if (matchDomain('ilfattoquotidiano.it')) {
  let url = window.location.href;
  if (url.includes('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed, div#_4sVideoContainer');
    let comments = document.querySelector('div.content.comments');
    removeDOMElement(comments);
  } else if (window.location.pathname.match(/\/\d{4}\/\d{2}\/\d{2}\//)) {
    let paywall = document.querySelector('div.read-more');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = window.location.pathname + 'amp';
    }
  }
}

else if (matchDomain('ilfoglio.it')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, [class^="adv-"], div#gmpVideoContainer');
  } else {
    let paywall = document.querySelector('div.paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
    let ads = document.querySelectorAll('.advertisement');
    removeDOMElement(...ads);
  }
}

else if (matchDomain('ilmanifesto.it')) {
  window.setTimeout(function () {
    if (window.location.pathname.match(/((\w)+(\-)+){3,}/)) {
      let paywall = document.querySelector('div[class^="PostPaywall_PostPaywall__"]');
      if (paywall && dompurify_loaded) {
        removeDOMElement(paywall);
        let json_script = document.querySelector('script#__NEXT_DATA__');
        if (json_script) {
          let json = JSON.parse(json_script.innerText);
          if (json && json.props.pageProps.content && json.props.pageProps.content.content) {
            let article_new = json.props.pageProps.content.content;
            let article = document.querySelector('div.ArticleBody');
            if (article) {
              article.innerHTML = '';
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
              let content_new = doc.querySelector('div');
              article.appendChild(content_new);
            }
          } else
            window.location.reload(true);
        }
      }
    }
    let service_page = document.querySelector('div.service-page');
    if (service_page) {
      window.setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    }
  }, 1000);
}

else if (matchDomain(['iltirreno.it', 'lanuovasardegna.it']) || matchDomain(['gazzettadimodena.it', 'gazzettadireggio.it', 'lanuovaferrara.it'])) {
  if (window.location.pathname.includes('/news/')) {
    window.setTimeout(function () {
      let banners = document.querySelectorAll('div.MuiSnackbar-root, div.css-16cchgy');
      removeDOMElement(...banners);
    }, 1000);
  }
}

else if (matchDomain(it_ilmessaggero_domains)) {
  if (window.location.pathname.toLowerCase().includes('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  }
}

else if (matchDomain(it_quotidiano_domains)) {
  if (window.location.pathname.endsWith('/amp') || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="c.customGranted"', '="NOT c.customGranted"', 'amp-ad, amp-embed, amp-fx-flying-carpet, .watermark-adv, .amp__watermark');
  } else {
    let paywall = document.querySelector('div[data-testid="paywall-container"], div[class^="Paywall_paywall_"]');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (!amphtml)
      amphtml = {href: window.location.pathname + '/amp'};
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    } else {
      let ads = document.querySelectorAll('div[id^="div-gpt-ad"]');
      removeDOMElement(...ads);
    }
  }
}

else if (matchDomain('italiaoggi.it')) {
  let paywall = document.querySelector('div.boxAbb');
  if (paywall && dompurify_loaded) {
    let overlay = document.querySelector('div.article-locked-overlay');
    removeDOMElement(paywall, overlay);
    let article_locked = document.querySelector('div.article-locked');
    if (article_locked) {
      article_locked.classList.remove('article-locked');
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let content = article_locked.querySelector('section');
          if (json_text && content) {
            let parser = new DOMParser();
            json_text = json_text.replace(/&amp;apos;/g, "'").replace(/;/g, '');
            let doc = parser.parseFromString('<div><section>' + DOMPurify.sanitize(json_text) + '</section></div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.parentNode.replaceChild(content_new, content);
          }
        }
      }
    }
  }
}

else if (matchDomain(it_gedi_domains)) {
  if (matchDomain('espresso.repubblica.it')) {
    if (!window.location.pathname.match(/\amp(\/)?$/)) {
      let paywall = document.querySelector('div#paywall');
      let amphtml = document.querySelector('link[rel="amphtml"]');
      if (paywall && amphtml) {
        removeDOMElement(paywall);
        window.location.href = amphtml.href;
      }
    } else {
      amp_unhide_access_hide('="showContent"', '="NOT (showContent)"', 'amp-ad, amp-embed');
      let logo = document.querySelector('div.logo-container > a');
      if (logo) {
        logo.innerText = "L'Espresso";
        logo.style.color = 'white';
      }
      let placeholders = document.querySelectorAll('figure > amp-img[placeholder][src]');
      for (let elem of placeholders) {
        let img = document.createElement('img');
        img.src = elem.getAttribute('src');
        elem.parentNode.replaceChild(img, elem);
      }
      let inline_videos = document.querySelectorAll('div.video-container > iframe[src]');
      for (let video of inline_videos) {
        let elem = document.createElement('a');
        elem.href = video.src;
        elem.innerText = '>>> external video-link';
        elem.target = '_blank';
        video.parentNode.replaceChild(elem, video);
      }
    }
  } else {
    if (!window.location.pathname.match(/\amp(\/)?$/)) {
      let paywall = document.querySelector('div#paywall');
      let ads = document.querySelectorAll('div[id^="adv"]');
      removeDOMElement(paywall, ...ads);
    } else
      ampToHtml();
  }
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(be|nl)$/) || matchDomain(['artsenkrant.com', 'lavenir.net'])) {//belgium/netherlands

if (matchDomain(be_groupe_ipm_domains)) {
  let paywall = document.querySelector('div.is-preview');
  if (paywall) {
    paywall.classList.remove('is-preview');
    window.setTimeout(function () {
      let div_hidden = document.querySelector('div.is-hidden');
      if (div_hidden)
        div_hidden.classList.remove('is-hidden');
    }, 1000);
  }
  let ads = document.querySelectorAll('div.ap-AdContainer, div.ap-Outbrain');
  hideDOMElement(...ads);
}

else if (matchDomain('fd.nl')) {
  let reg_modal = document.querySelector('div.modal.upsell');
  if (reg_modal)
    refreshCurrentTab();
}

else if (matchDomain('ftm.nl')) {
  let banners = document.querySelectorAll('div.banner-pp, a.readmore');
  removeDOMElement(...banners);
}

else if (matchDomain(be_roularta_domains)) {
  let paywall = document.querySelector('div[id*="wall-modal"]');
  if (paywall) {
    removeDOMElement(paywall);
    let html = document.querySelector('html[class]');
    if (html)
      html.removeAttribute('class');
    function roularta_noscroll(node) {
      node.removeAttribute('style');
      node.removeAttribute('class');
    }
    waitDOMAttribute('html', 'html', 'class', roularta_noscroll, true);
    let intro = document.querySelectorAll('div.article-body > p, div.article-body > style');
    removeDOMElement(...intro);
    let locked = document.querySelector('body.locked');
    if (locked)
      locked.classList.remove('locked');
  }
  if (!window.navigator.userAgent.toLowerCase().includes('chrome') && !matchDomain(['artsenkrant.com', 'kw.be']) && window.location.href.match(/\/((\w)+(\-)+){3,}/)) {
    let lazy_images = document.querySelectorAll('[src^="data:image/"][data-lazy-src]');
    for (let elem of lazy_images) {
      elem.src = elem.getAttribute('data-lazy-src');
    }
  }
  let ads = document.querySelectorAll('div.rmgAd');
  hideDOMElement(...ads);
}

else if (matchDomain(['lc.nl', 'dvhn.nl'])) {
  if (true) {
    let paywall = document.querySelector('div.signupPlus, div.pw-wrapper');
    if (paywall && dompurify_loaded) {
      let intro = document.querySelector('div.startPayWall');
      removeDOMElement(paywall, intro);
      let html = document.documentElement.outerHTML;
      if (html.includes('window.__NUXT__=')) {
        let json = html.split('window.__NUXT__=')[1].split('</script>')[0].trim();
        let url_nuxt = json.includes(',url:"') ? json.split(',url:"')[1].split('",')[0].replace(/\\u002F/g, '/') : '';
        if (url_nuxt.startsWith('/auteur/'))
          url_nuxt = json.includes(',routePath:"') ? json.split(',routePath:"')[1].split('",')[0].replace(/\\u002F/g, '/') : '';
        if (url_nuxt && !url_nuxt.includes(window.location.pathname.match(/-\d+\.html$/)))
          refreshCurrentTab();
        else if (json.includes(',body:')) {
          let json_text = json.split(',body:')[1].split(/,(leadText|brand_key|tts):/)[0].replace(/([{,])([a-zA-Z_0-9]+\d?):/g, "$1\"$2\":").replace(/\":(\[)?([\w\$\.]+)([\]},])/g, "\":$1\"$2\"$3");
          let article = document.querySelector('div.content');
          if (article) {
            article.innerHTML = '';
            try {
              let pars = JSON.parse(json_text);
              function addParText(elem, par_text, add_br = false) {
                if (par_text.length > 2) {
                  let span = document.createElement('span');
                  span.innerText = par_text;
                  elem.appendChild(span);
                  if (add_br)
                    elem.appendChild(document.createElement('br'));
                }
              }
              for (let par of pars) {
                let elem = document.createElement('p');
                if (par.typename === 'HTMLCustomEmbed') {
                  if (par.code) {
                    let parser = new DOMParser();
                    let article_html = parser.parseFromString('<div>' + DOMPurify.sanitize(par.code, {ADD_TAGS: ['iframe']}) + '</div>', 'text/html');
                    elem = article_html.querySelector('div');
                  }
                } else if (par.insertbox_head || par.insertbox_text) {
                  if (par.insertbox_head && par.insertbox_head.length > 2) {
                    addParText(elem, par.insertbox_head, true);
                  }
                  if (par.insertbox_text) {
                    for (let item of par.insertbox_text) {
                      if (item.children) {
                        for (let child of item.children) {
                          if (child.text) {
                            addParText(elem, child.text, true);
                          } else if (child.href && child.href.length > 2) {
                            let par_link = document.createElement('a');
                            par_link.href = child.href;
                            par_link.innerText = child.children[0].text;
                            elem.appendChild(par_link);
                            elem.appendChild(document.createElement('br'));
                          } else if (child.children) {
                            for (let sub_child of child.children) {
                              if (sub_child.text) {
                                addParText(elem, sub_child.text);
                              } else if (sub_child.children && sub_child.children.length && sub_child.children[0].text) {
                                addParText(elem, sub_child.children[0].text);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else if (par.text) {
                  addParText(elem, par.text);
                } else if (par.children) {
                  for (let child of par.children) {
                    if (child.relation) {
                      if (child.type === 'img' && child.relation.href) {
                        let figure = document.createElement('figure');
                        let img = document.createElement('img');
                        img.src = child.relation.href;
                        figure.appendChild(img);
                        if (child.relation.caption && child.relation.caption.length > 2) {
                          let caption = document.createElement('figcaption');
                          caption.innerText = item.caption;
                          figure.appendChild(caption);
                        }
                        elem.appendChild(figure);
                      } else if (child.relation.link && child.relation.link.length > 2 && ((child.relation.title && child.relation.title.length > 2) || child.relation.imageAlt)) {
                        let par_link = document.createElement('a');
                        par_link.href = child.relation.link;
                        par_link.innerText = child.relation.title.length > 2 ? child.relation.title : (child.relation.imageAlt.length > 2 ? child.relation.imageAlt : child.relation.link);
                        elem.appendChild(par_link);
                      }
                    } else if (child.text) {
                      addParText(elem, child.text);
                    } else if (child.children && child.children.length && child.children[0].text && child.children[0].text.length > 2) {
                      if ((child.href && child.href.length > 2) || (child.relation && child.relation.follow && child.relation.follow.url)) {
                        let par_link = document.createElement('a');
                        par_link.href = child.href || child.relation.follow.url;
                        par_link.innerText = child.children[0].text;
                        elem.appendChild(par_link);
                      } else {
                        addParText(elem, child.children[0].text);
                      }
                    }
                  }
                } else if (par.typename.length > 2)
                  console.log(par);
                if (elem.hasChildNodes()) {
                  article.appendChild(elem);
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  }
  let ads = document.querySelectorAll('.top__ad, .marketingblock-article');
  removeDOMElement(...ads);
}

else if (matchDomain(['limburger.nl'])) {
  let button_close = document.querySelector('span[data-testid="button-close"]');
  if (button_close)
    button_close.click();
  let url = window.location.href;
  let paywall = document.querySelector('div[data-cj-root="subscription-wall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('footer.article__footer');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain(nl_mediahuis_region_domains)) {
  window.setTimeout(function () {
    let close_button = document.querySelector('button[data-testid="button-close"]');
    if (close_button)
      close_button.click();
    let premium = document.querySelector('div.common-components-plus_pluslabel--container');
    if (premium && dompurify_loaded) {
      let hidden_article = document.querySelector('div[data-auth-body="article"]');
      if (hidden_article)
        hidden_article.removeAttribute('style');
      let paywall = document.querySelector('div[data-auth-root="paywall"]');
      removeDOMElement(paywall);
      let auth_body = document.querySelector('div[data-auth-body="article"]');
      if (paywall && auth_body) {
        let auth_body_par_count = auth_body.querySelectorAll('p');
        if (auth_body_par_count.length < 2) {
          let json_script = document.querySelector('script[data-fragment-type="PacoArticleContent"]');
          let json_str = json_script.text.substring(json_script.textContent.indexOf('{'));
          try {
            let json = JSON.parse(json_str);
            let article = Object.values(json)[0]['data']['article']['body'];
            auth_body.innerHTML = '';
            let par_html, par_dom, par_elem, par_div, par_key;
            let parser = new DOMParser();
            for (let par of article) {
              for (let key in par) {
                par_dom = document.createElement('p');
                par_elem = '';
                par_key = par[key];
                if (key === 'subhead') {
                  par_html = parser.parseFromString('<div><strong>' + DOMPurify.sanitize(par_key) + '</strong></div>', 'text/html');
                  par_elem = par_html.querySelector('div');
                } else if (key === 'twitter' || key === 'instagram') {
                  par_elem = document.createElement('a');
                  Object.assign(par_elem, {
                    href: par_key,
                    innerText: par_key.split('?')[0],
                    target: '_blank'
                  });
                } else if (key === 'youtube') {
                  par_elem = document.createElement('iframe');
                  Object.assign(par_elem, {
                    src: 'https://www.youtube.com/embed/' + par_key.id,
                    id: 'ytplayer',
                    type: 'text/html',
                    width: 640,
                    height: 360,
                    frameborder: 0
                  });
                } else if (key === 'streamone') {
                  par_elem = document.createElement('iframe');
                  Object.assign(par_elem, {
                    src: 'https://content.tmgvideo.nl/embed/item=' + par_key.id,
                    type: 'text/html',
                    width: 640,
                    height: 360,
                    frameborder: 0
                  });
                } else if (key === 'image') {
                  par_elem = document.createElement('div');
                  let par_img = document.createElement('img');
                  par_img.src = par_key.url;
                  par_elem.appendChild(par_img);
                  par_div = document.createElement('div');
                  par_div.innerText = par[key].caption ? par[key].caption : '';
                  par_div.innerText += par[key].credit ? '\n' + par[key].credit : '';
                  par_elem.appendChild(par_div);
                } else {
                  par_html = parser.parseFromString('<p style="font-size: 18px; line-height: 1.625;">' + DOMPurify.sanitize(par_key) + '</div>', 'text/html');
                  par_elem = par_html.querySelector('p');
                }
                if (par_elem)
                  par_dom.appendChild(par_elem);
                auth_body.appendChild(par_dom);
              }
            }
          } catch (err) {
            console.warn('unable to parse text');
            console.warn(err);
          }
        }
      }
    }
  }, 500);
}

else if (matchDomain(nl_dpg_adr_domains.concat(['hln.be']))) {
  let url = window.location.href;
  let paywall = document.querySelector('div#remaining-paid-content');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article__body');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain(nl_dpg_media_domains)) {
  let banners = document.querySelectorAll('div[data-temptation-position^="PAGE_"], div[class^="ad--"]');
  let paywall = document.querySelectorAll('[data-temptation-position^="ARTICLE_"]');
  removeDOMElement(...banners, ...paywall);
}

else if (matchDomain('nrc.nl')) {
  let banners = document.querySelectorAll('div[id$="modal__overlay"], div.header__subscribe-bar, div.banner');
  removeDOMElement(...banners);
}

else if (matchDomain('telegraaf.nl')) {
  if (window.location.href.startsWith('https://www.telegraaf.nl/error?ref=/')) {
    window.setTimeout(function () {
      window.location.href = window.location.href.split('&')[0].replace('error?ref=/', '');
    }, 500);
  }
  let refresh = document.querySelector('div[id="content"] > meta[http-equiv="refresh"]');
  if (refresh) {
    window.setTimeout(function () {
      window.location.reload(true);
    }, 500);
  }
  let paywall = document.querySelector('div.MeteringNotification__backdrop, data-hydrate[data-name="SubscriptionCard"]');
  let article_body = document.querySelector('section.TextArticlePage__imageWrapper, section > div.DetailArticleImage');
  if (paywall && article_body) {
    let div_main = document.createElement('div');
    div_main.style = 'margin: 20px 0px;';
    let div_elem = document.createElement('div');
    let par_style = 'font-weight: normal; font-size: 16px; line-height: 1.5;';
    let scripts = document.querySelectorAll('script:not([src], [type])');
    let apollo_script;
    for (let script of scripts) {
      if (script.text.includes('window.__APOLLO_STATE__=')) {
        apollo_script = script;
        break;
      }
    }
    if (apollo_script) {
      removeDOMElement(paywall);
      try {
        let apollo_json = JSON.parse(apollo_script.text.replace(/(^window.__APOLLO_STATE__=|;$)/g, ''));
        let start = false;
        for (let key in apollo_json) {
          let elem = apollo_json[key];
          if (!start) {
            if (key.includes('.introBlocks.'))
              start = true;
          } else {
            let typename = elem.__typename;
            if (key.startsWith('Article:') || ['ArticleAuthorBiography'].includes(typename))
              break;
            else {
              let par = document.createElement('p');
              if (typename === 'HtmlBlock') {
                let item = document.createElement('p');
                item.innerText = elem.contentHTML.replace(/((<|\\u003c)([^>]+)(>|\\u003e))/gi, '');
                item.style = par_style;
                par.appendChild(item);
              } else if (typename === 'SubheadBlock') {
                let item = document.createElement('p');
                item.innerText = elem.text.replace(/((<|\\u003c)([^>]+)(>|\\u003e))/gi, '');
                item.style = par_style;
                par.appendChild(item);
              } else if (typename === 'Image') {
                let figure = document.createElement('figure');
                let img = document.createElement('img');
                img.src = elem.url.startsWith('https:') ? elem.url : 'https:' + elem.url;
                img.width = !mobile ? 640 : 320;
                figure.appendChild(img);
                if (elem.description) {
                  let caption = document.createElement('figcaption');
                  caption.innerText = elem.description + (elem.copyright ? ' | ' + elem.copyright : '');
                  figure.appendChild(caption);
                }
                par.appendChild(figure);
              } else if (typename === 'Article') {
                let item = document.createElement('a');
                item.href = elem.url.startsWith('https:') ? elem.url : 'https:' + elem.url;
                item.innerText = elem.title;
                par.appendChild(item);
              } else if (!['ImageBlock', 'InlineRelatedArticlesBlock', 'Video', 'Webshop'].includes(typename))
                console.log(elem);
              if (par.childNodes) {
                div_main.appendChild(par); ;
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      let json_script = getArticleJsonScript();
      if (json_script) {
        removeDOMElement(paywall);
        try {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = json.articleBody;
            if (json_text) {
              let intro = document.querySelector('span[id^="articleIntro"], p.Article__intro > span');
              if (intro)
                json_text = json_text.replace(intro.innerText + '\n\n', '');
              let text_array = json_text.split('\\n');
              text_array.forEach(p_text => {
                let p_div = document.createElement('p');
                p_div.innerText = p_text;
                p_div.style = par_style;
                div_elem.appendChild(p_div);
              });
              div_main.appendChild(div_elem);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    article_body.after(div_main);
  }
  let banners = document.querySelectorAll('.ArticleBodyBlocks__inlineArticleSpotXBanner, .WebpushOptin');
  removeDOMElement(...banners);
}

else if (matchDomain('vn.nl')) {
  let paywall = document.querySelector('div.content__message-no-access-container');
  if (paywall && dompurify_loaded) {
    let content_restriction = document.querySelector('div.content__restriction');
    removeDOMElement(paywall, content_restriction);
    let body = document.querySelector('body');
    if (body)
      body.style = 'height:auto !important;';
    let article_content = document.querySelector('section[data-article-content-element]');
    if (article_content)
      article_content.style = 'max-height:none !important;';
    let json_url_dom = document.querySelector('link[rel="alternate"][type="application/json"]');
    if (json_url_dom) {
      let json_url = json_url_dom.href;
      fetch(json_url)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            let json_text = json.content.rendered;
            let content = document.querySelector('div[data-article-content-target]');
            if (json_text && content) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div data-article-content-target>' + DOMPurify.sanitize(json_text, {ADD_TAGS: ['iframe'], ADD_ATTR: ['frameborder']}) + '</div>', 'text/html');
              let content_new = doc.querySelector('div');
              content.parentNode.replaceChild(content_new, content);
            }
          });
        }
      });
    }
  }
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(ie|uk)$/) || matchDomain(['citywire.com', 'ft.com', 'scotsman.com', 'tes.com'])) {//united kingdom/ireland

if (matchDomain(['belfasttelegraph.co.uk', 'independent.ie'])) {
  let flip_pay = document.querySelector('div#flip-pay[style]');
  if (flip_pay && dompurify_loaded) {
    let content = document.querySelector('script[data-fragment-type="ArticleContent"]');
    if (content) {
      removeDOMElement(flip_pay);
      let intro = document.querySelector('div[data-auth-intro="article"]');
      if (intro && intro.parentNode) {
        let content_text = content.innerText;
        if (content_text.includes('__PRELOADED_STATE_GRAPH')) {
          content_text = content_text.replace(/window\["__PRELOADED_STATE_GRAPH__.+"\]\s=\s/, '');
          try {
            let json = JSON.parse(content_text);
            if (Object.keys(json).length) {
              let key = Object.keys(json)[0];
              let pars = json[key].data.article.body;
              let parser = new DOMParser();
              for (let par of pars) {
                for (let type in par) {
                  let item = par[type];
                  let elem = document.createElement('p');
                  elem.setAttribute('style', "margin: 10px;");
                  if (type === 'bullet_list') {
                    let ul = document.createElement('ul');
                    for (let sub_item of item) {
                      let li = document.createElement('li');
                      li.innerText = sub_item;
                      ul.appendChild(li);
                    }
                    elem.appendChild(ul);
                  } else if (type === 'image') {
                    let figure = document.createElement('figure');
                    let img = document.createElement('img');
                    img.src = item.url;
                    figure.appendChild(img);
                    let caption = document.createElement('figcaption');
                    caption.innerText = item.caption;
                    figure.appendChild(caption);
                    elem.appendChild(figure);
                  } else if (type === 'related') {
                    if (item.articles) {
                      let articles = item.articles;
                      for (let article of articles) {
                        let elem_link = document.createElement('a');
                        elem_link.href = article.webcmsRelativeUrl;
                        elem_link.innerText = article.title;
                        elem.appendChild(elem_link);
                        elem.appendChild(document.createElement('br'));
                      }
                    }
                  } else if (type !== 'ad') {
                    let html = parser.parseFromString('<p style="font-size: 18px; font-family: Georgia, serif; margin: 10px;">' + DOMPurify.sanitize(item, {ADD_TAGS: ['iframe']}) + '</p>', 'text/html');
                    elem = html.querySelector('p');
                    if (!['p', 'subhead', 'legacy-ml'].includes(type)) {
                      console.log(type);
                      console.log(item);
                    }
                  }
                  window.setTimeout(function () {
                    if (elem)
                      intro.parentNode.appendChild(elem);
                  }, 500);
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else
      flip_pay.removeAttribute('style');
  }
  let ads = document.querySelectorAll('div[id^="ad_article"]');
  hideDOMElement(...ads);
}

else if (matchDomain('businesspost.ie')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#bp_paywall_content');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-body-section');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('citywire.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.locked-content.cw-article-body');
  if (paywall) {
    paywall.classList.remove('locked-content');
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'div.cw-article-body');
  }
  window.setTimeout(function () {
    let banner = document.querySelector('div#lockedLoginPanel');
    removeDOMElement(banner);
    let article = document.querySelector('div.cw-article-body');
    if (article)
      removeDOMElement(article.nextSibling);
  }, 1000);
}

else if (matchDomain('ft.com')) {
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_subscr_section('.ad-container, amp-ad');
  } else {
    let banners = document.querySelectorAll('.o-cookie-message, .js-article-ribbon, .o-ads, .o-banner');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('independent.co.uk')) {
  let url = window.location.href;
  if (window.location.search.match(/(\?|&)amp/)) {
    let ads = document.querySelectorAll('amp-ad, amp-embed, [id^="ad-"]');
    removeDOMElement(...ads);
  } else {
    let paywall = document.querySelector('div.article-premium');
    let related = document.querySelector('div.related');
    let msg = document.querySelector('div#bpc_archive');
    if (paywall && !related && !msg) {
      paywall.classList.remove('article-premium');
      let article = document.querySelector('div#main');
      if (article)
        article.firstChild.before(archiveLink(url));
    }
  }
}

else if (matchDomain('prospectmagazine.co.uk')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.paywall_overlay_blend, div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'main');
  }
  window.setTimeout(function () {
    let ads = document.querySelectorAll('.ad-banner, .advert');
    removeDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('spectator.co.uk')) {
  let banner = document.querySelector('#subscribe-ribbon');
  removeDOMElement(banner);
}

else if (matchDomain('stylist.co.uk')) {
  let paywall = document.querySelector('div.css-1agpii8');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json.props.pageProps.data.post.acf.widgets) {
          let url_next = json.props.pageProps.data.post.id;
          if (url_next && !window.location.pathname.endsWith(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.data.post.acf.widgets;
          let first_par = document.querySelector('p.css-12ac4a9');
          if (first_par) {
            let par_class = first_par.getAttribute('class');
            let article = first_par.parentNode;
            let teaser = article.querySelectorAll('div.css-1q9dbt6 > p');
            removeDOMElement(...teaser);
            if (article) {
              let parser = new DOMParser();
              for (let par of pars) {
                let elem = document.createElement('p');
                elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
                if (par.paragraph) {
                  let content = par.paragraph;
                  let content_new = parser.parseFromString('<div class="css-1q9dbt6">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                  elem = content_new.querySelector('div');
                } else if (par.acf_fc_layout === 'heading') {
                  if (par.text)
                    elem.appendChild(document.createTextNode(par.text));
                } else if (par.image) {
                  let figure = document.createElement('figure');
                  let img = document.createElement('img');
                  img.src = par.image.url;
                  img.alt = par.image.alt;
                  img.style = mobile ? 'width: 320px;' : 'width: 640px;';
                  figure.appendChild(img);
                  if (par.image.caption || par.image.description) {
                    let caption = document.createElement('figcaption');
                    caption.innerText = par.image.caption + ' ' + par.image.description;
                    figure.appendChild(caption);
                  }
                  elem.appendChild(figure);
                } else if (par.acf_fc_layout === 'listicle') {
                  let ul = document.createElement('ul');
                  for (let sub_item of par.item) {
                    let li = document.createElement('li');
                    if (sub_item.url) {
                      let par_link = document.createElement('a');
                      par_link.href = sub_item.url;
                      par_link.innerText = sub_item.title;
                      par_link.target = '_blank';
                      li.appendChild(par_link);
                    } else
                      li.innerText = sub_item.title;
                    if (sub_item.paragraph) {
                      let content = sub_item.paragraph;
                      let content_new = parser.parseFromString('<div class="css-1q9dbt6">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                      let par_elem = content_new.querySelector('div');
                      li.appendChild(par_elem);
                    }
                    if (sub_item.image) {
                      let img = document.createElement('img');
                      img.src = sub_item.image.url;
                      img.alt = sub_item.image.alt;
                      img.style = mobile ? 'width: 320px;' : 'width: 640px;';
                      li.appendChild(img);
                      li.appendChild(document.createElement('br'));
                    }
                    li.style = 'font-size: 20px; margin: 20px 0px;';
                    ul.appendChild(li);
                  }
                  elem.appendChild(ul);
                } else if (par.embed_link) {
                  let par_link = document.createElement('a');
                  par_link.href = par.embed_link;
                  par_link.innerText = 'Embedded link: ' + par.embed_link;
                  par_link.target = '_blank';
                  elem.appendChild(par_link);
                } else if (par.acf_fc_layout === 'divider') {
                  elem.appendChild(document.createElement('hr'));
                } else if (par.acf_fc_layout === 'related_articles') {
                  if (par.posts) {
                    for (let post of par.posts) {
                      if (post.link && post.title.rendered) {
                        let par_link = document.createElement('a');
                        par_link.href = post.link;
                        par_link.innerText = 'You may also like: ' + post.title.rendered;
                        elem.appendChild(par_link);
                        elem.appendChild(document.createElement('br'));
                      }
                    }
                  }
                } else if (!['newsletter_signup', 'pull-quote'].includes(par.acf_fc_layout))
                  console.log(par);
                if (elem.hasChildNodes)
                  article.appendChild(elem);
              }
              let div_nostyle = document.querySelectorAll('div.css-1q9dbt6 > *');
              for (let elem of div_nostyle)
                elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('telegraph.co.uk')) {
  if (window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelectorAll('.premium-paywall');
    if (paywall.length) {
      let truncated_content = document.querySelector('.truncated-content');
      removeDOMElement(...paywall, truncated_content);
      amp_unhide_access_hide('="c.result=\'ALLOW_ACCESS\'"', '', 'amp-ad, amp-embed', false);
    } else {
      let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
      removeDOMElement(...amp_ads);
    }
  } else {
    let subwall = document.querySelectorAll('[class^="subwall"]');
    let ads = document.querySelectorAll('.advert, .commercial-unit');
    removeDOMElement(...subwall, ...ads);
  }
}

else if (matchDomain('tes.com')) {
  let banner = document.querySelector('div.js-paywall-info');
  removeDOMElement(banner);
}

else if (matchDomain('theneweuropean.co.uk')) {
  let paywall = document.querySelector('div[data-show-fade-on-noaccess]');
  if (paywall) {
    removeDOMElement(paywall);
    let content = document.querySelector('div[data-show-has-access]');
    if (content)
      content.removeAttribute('data-show-has-access');
  }
  let banners = document.querySelectorAll('div[data-show-subs-blocked]');
  removeDOMElement(...banners);
}

else if (matchDomain('thetimes.co.uk')) {
  let url = window.location.href;
  if (window.location.hostname !== 'epaper.thetimes.co.uk') {
    let paywall = document.querySelector('div#paywall-portal-article-footer');
    if (paywall && !url.includes('?shareToken=')) {
      removeDOMElement(paywall);
      let article = document.querySelector('article[class^="responsive__BodyContainer"]');
      if (article)
        article.firstChild.before(archiveLink(url));
      waitDOMAttribute('body', 'BODY', 'style', node => node.removeAttribute('style'), true);
      waitDOMAttribute('html', 'HTML', 'style', node => node.removeAttribute('style'), true);
    }
    let paywall_page = document.querySelector('div#paywall-portal-page-footer');
    let block = document.querySelector('.subscription-block');
    let ads = document.querySelectorAll('#ad-article-inline, #sticky-ad-header, div[class*="InlineAdWrapper"], div[class*="NativeAd"], div.gyLkkj');
    removeDOMElement(paywall_page, block, ...ads);
  }
}

else if (matchDomain(uk_nat_world_domains) || document.querySelector('footer > div a[href^="https://www.nationalworldplc.com"]')) {
  let premium = document.querySelector('div.premium');
  if (premium)
    premium.removeAttribute('class');
  let amp_images = document.querySelectorAll('article amp-img[src^="https://"]');
  for (let amp_image of amp_images) {
    let elem = document.createElement('img');
    Object.assign(elem, {
      src: amp_image.getAttribute('src'),
      alt: amp_image.getAttribute('alt')
    });
    amp_image.parentNode.replaceChild(elem, amp_image);
  }
  let ads = document.querySelectorAll('div[class^="MarkupAds__Container-"], div[class*="_AdContainer-"], div[class^="Dailymotion__Wrapper-"], div.OUTBRAIN');
  removeDOMElement(...ads);
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(ar|br|cl|pe|uy)$/) || matchDomain(['clarin.com', 'elespectador.com', 'elmercurio.com', 'eltiempo.com', 'latercera.com', 'lasegunda.com', 'valor.globo.com'])) {//south america

if (matchDomain('abril.com.br')) {
  if (window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelector('.piano-modal');
    let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
    removeDOMElement(paywall, ...amp_ads);
  }
}

else if (matchDomain(ar_grupo_clarin_domains)) {
  let ads = document.querySelectorAll('.ad-slot, .box-adv, .sticky, .wrapperblock');
  removeDOMElement(...ads);
}

else if (matchDomain('crusoe.uol.com.br')) {
  let paywall = document.querySelector('#wallcontent');
  let ads = document.querySelectorAll('#gpt-leaderboard, .ads_desktop, .catchment-box');
  removeDOMElement(paywall, ...ads);
}

else if (matchDomain(pe_grupo_elcomercio_domains)) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    paywall.removeAttribute('style');
    let fade = document.querySelector('p.story-contents--fade');
    if (fade)
      fade.classList.remove('story-contents--fade');
  }
  let ads = document.querySelectorAll('div[class^="content_gpt"]');
  removeDOMElement(...ads);
}

else if (matchDomain('elespectador.com')) {
  if (window.location.search.match(/(\?|&)outputType=amp/)) {
    amp_unhide_subscr_section('amp-ad, amp-embed, [class^="Widget"], amp-fx-flying-carpet');
  } else {
    let paywall = document.querySelector('div.exclusive_validation');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  }
}

else if (matchDomain('elmercurio.com')) {
  window.setTimeout(function () {
    let elem_hidden = document.querySelectorAll('[style="visibility:hidden"]');
    for (let elem of elem_hidden)
      elem.removeAttribute('style');
    let page_pdf_content = document.querySelector('div.page_pdf_content');
    let close_html = document.querySelector('div.close_html');
    let cont_page_full = document.querySelector('div.cont_page_full');
    removeDOMElement(page_pdf_content, close_html, cont_page_full);
  }, 1000);
  window.setTimeout(function () {
    let cont_articlelight = document.querySelector('div.cont_articlelight');
    if (cont_articlelight)
      cont_articlelight.setAttribute('style', 'height: 100% !important; width: 90% !important');
  }, 3000);
}

else if (matchDomain('elobservador.com.uy')) {
  if (window.location.pathname.endsWith('/amp')) {
    amp_unhide_access_hide('="observador.mostrarNota"');
    let amp_images = document.querySelectorAll('div.fixed-container > amp-img.null');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      Object.assign(elem, {
        src: amp_image.getAttribute('src'),
        alt: amp_image.getAttribute('alt'),
        title: amp_image.getAttribute('title')
      });
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  } else {
    let paywall = document.querySelector('div.mensaje_member');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = window.location.pathname + '/amp';
    }
  }
}

else if (matchDomain('eltiempo.com')) {
  let modulos = document.querySelector('div.modulos');
  if (modulos)
    modulos.classList.remove('modulos');
}

else if (matchDomain('em.com.br')) {
  if (!window.location.pathname.endsWith('/amp.html')) {
    let paywall = document.querySelector('.news-blocked-content');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
    let ads = document.querySelectorAll('.ads, .containerads');
    removeDOMElement(...ads);
  } else {
    amp_unhide_subscr_section('amp-ad, amp-embed, amp-fx-flying-carpet');
    let compress_text = document.querySelector('div.compress-text');
    if (compress_text)
      compress_text.classList.remove('compress-text');
  }
}

else if (matchDomain('estadao.com.br')) {
  if (window.location.pathname.match(/(\.amp$|^\/amp\/)/) || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="outputValue=\'hide_paywall\'"', '="outputValue=\'show_paywall\'"', 'amp-ad, amp-embed, amp-fx-flying-carpet, div[class^="pAd"]');
  } else {
    let paywall = document.getElementById('paywall-wrapper-iframe-estadao');
    let ads = document.querySelectorAll('div[class^="styles__Container-sc-"]');
    removeDOMElement(paywall, ...ads);
  }
}

else if (matchDomain('folha.uol.com.br')) {
  if (matchDomain('piaui.folha.uol.com.br')) {
    if (window.location.search.startsWith('?amp')) {
      amp_unhide_subscr_section();
    } else {
      let paywall = document.querySelector('.revista--interna__assineonly');
      let amphtml = document.querySelector('link[rel="amphtml"]');
      if (paywall && amphtml) {
        removeDOMElement(paywall);
        window.location.href = amphtml.href;
      }
    }
  } else {
    if (window.location.pathname.startsWith('/amp/')) {
      amp_unhide_subscr_section('amp-ad, amp-sticky-ad, amp-embed');
    } else {
      let signup = document.querySelector('.c-top-signup');
      removeDOMElement(signup);
    }
  }
}

else if (matchDomain('blogfolha.uol.com.br')) {
  let hidden_images = document.querySelectorAll('div[id^="attachment_"] > a > img[src^="http:"][srcset]');
  for (let hidden_image of hidden_images) {
    hidden_image.src = hidden_image.src.replace('http:', 'https:');
    hidden_image.srcset = '';
  }
}

else if (matchDomain('gauchazh.clicrbs.com.br')) {
  let ads = document.querySelectorAll('div.ad-banner, div.ad-container');
  hideDOMElement(...ads);
}

else if (matchDomain('ladiaria.com.uy')) {
  if (window.location.search.startsWith('?display=amp')) {
    csDoneOnce = true;
    ampToHtml();
  } else {
    let banners = document.querySelectorAll('div.softwall, div.subscribe-notice');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('latercera.com')) {
  let subscr_banner = document.querySelector('.empty');
  removeDOMElement(subscr_banner);
}

else if (matchDomain('lasegunda.com')) {
  let url = window.location.href;
  if (url.includes('digital.lasegunda.com/mobile')) {
    let lessreadmore = document.querySelectorAll('article.lessreadmore');
    for (let article of lessreadmore)
      article.classList.remove('lessreadmore');
    let bt_readmore = document.querySelectorAll('div[id*="bt_readmore_"]');
    removeDOMElement(...bt_readmore);
  }
}

else if (matchDomain('valor.globo.com')) {
  let url = window.location.href;
  if (!window.location.pathname.startsWith('/google/amp/')) {
    let paywall = document.querySelector('div.paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
    let ads = document.querySelectorAll('[id^="ad-container"], .content-ads');
    removeDOMElement(...ads);
  } else {
    amp_unhide_subscr_section('amp-ad, amp-embed');
    let amp_images = document.querySelectorAll('figure > amp-img[src^="https://"]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      elem.src = amp_image.getAttribute('src');
      elem.alt = amp_image.getAttribute('alt');
      elem.style = mobile ? 'width: 320px;' : 'margin: 0px 250px; display:block;';
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  }
}

else if (window.location.hostname.endsWith('.cl') && document.querySelector('meta[property="og:image"][content*="://impresa.soy-chile.cl/"]')) {
  window.setTimeout(function () {
    let content = document.querySelector('div.content');
    if (content)
      content.setAttribute('id', 'content_new');
    let modal_wrapper = document.querySelector('div.modal-wrapper');
    removeDOMElement(modal_wrapper);
  }, 1000);
  waitDOMAttribute('body', 'BODY', 'class', node => node.removeAttribute('class'), true);
  csDoneOnce = true;
}

else
  csDone = true;

} else {//other (like com/org & not at/be/br/ch/cl/de/dk/fi/fr/es/ie/nl/no/pe/pt/se/uk))

if (matchDomain(usa_adv_local_domains)) {
  let url = window.location.href;
  if (url.includes('?outputType=amp')) {
    let amp_ads = document.querySelectorAll('.amp-ad-container, amp-embed');
    removeDOMElement(...amp_ads);
  } else {
    let paywall = document.querySelector('.paywall');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (!amphtml)
      amphtml = {href: window.location.pathname + '?outputType=amp'};
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
    let ads = document.querySelectorAll('div.ad');
    removeDOMElement(...ads);
  }
}

else if (matchDomain('americanbanker.com') || matchDomain(usa_arizent_custom_domains)) {
  let inline_gate = document.querySelector('.inline-gate');
  if (inline_gate) {
    inline_gate.classList.remove('inline-gate');
    let inline_gated = document.querySelectorAll('.inline-gated');
    for (let elem of inline_gated)
      elem.classList.remove('inline-gated');
  }
}

else if (matchDomain('artnet.com')) {
  if (window.location.pathname.endsWith('/amp-page')) {
    amp_unhide_subscr_section();
  } else {
    let body_hidden = document.querySelector('.article-body');
    if (body_hidden)
      body_hidden.style = 'display:block;';
  }
}

else if (matchDomain('asia.nikkei.com')) {
  let popup = document.querySelector('#pianoj_ribbon');
  removeDOMElement(popup);
}

else if (matchDomain('axios.com')) {
  function axios_noscroll(node) {
    node.removeAttribute('style');
    let overlay = document.querySelector('div[class^="Modal_paywallContainer"]');
    hideDOMElement(overlay);
  }
  waitDOMAttribute('html', 'HTML', 'style', axios_noscroll, true);
  let banners = document.querySelectorAll('div[data-vars-experiment="pro-paywall"], .apexAd');
  hideDOMElement(...banners);
  csDoneOnce = true;
}

else if (matchDomain('barrons.com')) {
  let url = window.location.href;
  if (!url.includes('barrons.com/amp/')) {
    let body_continuous = document.querySelector('body.is-continuous');
    let snippet = document.querySelector('meta[content="snippet"]');
    if (body_continuous && snippet) {
      removeDOMElement(snippet);
      window.location.href = url.replace('barrons.com', 'barrons.com/amp');
    }
    let continue_buttons = document.querySelectorAll('button.snippet__buttons--continue');
    for (let elem of continue_buttons)
      elem.addEventListener('click', function () { window.location.reload(); });
    let barrons_ads = document.querySelectorAll('.barrons-body-ad-placement');
    removeDOMElement(...barrons_ads);
  } else {
    amp_unhide_subscr_section('.wsj-ad, amp-ad');
  }
}

else if (matchDomain('billboard.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  }
}

else if (matchDomain('bloomberg.com')) {
  function bloomberg_noscroll(node) {
    node.removeAttribute('data-paywall-overlay-status');
  }
  waitDOMElement('div[id^="fortress-"]', 'DIV', removeDOMElement, true);
  waitDOMAttribute('body', 'BODY', 'data-paywall-overlay-status', bloomberg_noscroll, true);
  let paywall = document.querySelectorAll('div[id^="fortress-"]');
  let leaderboard = document.querySelector('div[id^="leaderboard"], div[class^="leaderboard"], div.canopy-container');
  let noscroll = document.querySelector('body[data-paywall-overlay-status]');
  if (noscroll)
    noscroll.removeAttribute('data-paywall-overlay-status');
  hideDOMElement(...paywall, leaderboard);
  sessionStorage.clear();
  let url = window.location.href;
  if (url.match(/s\/\d{4}-/)) {
    let page_ad = document.querySelectorAll('div.page-ad, div[data-ad-placeholder], div[class*="-ad-top"]');
    let reg_ui_client = document.querySelector('div#reg-ui-client');
    hideDOMElement(...page_ad, reg_ui_client);
    let hidden_images = document.querySelectorAll('img.lazy-img__image[src][data-native-src]');
    for (let hidden_image of hidden_images) {
      if (hidden_image.src.match(/\/(60|150)x-1\.(png|jpg)$/))
        hidden_image.setAttribute('src', hidden_image.getAttribute('data-native-src'));
      hidden_image.style.filter = 'none';
    }
    let hidden_charts = document.querySelectorAll('div[data-toaster-id][data-src]');
    for (let hidden_chart of hidden_charts) {
      let elem = document.createElement('iframe');
      Object.assign(elem, {
        src: hidden_chart.getAttribute('data-src'),
        frameborder: 0,
        height: hidden_chart.getAttribute('style').replace('min-height: ', ''),
        scrolling: 'no'
      });
      hidden_chart.parentNode.replaceChild(elem, hidden_chart);
    }
    let blur = document.querySelector('div.blur[style]');
    if (blur) {
      blur.classList.remove('blur');
      blur.removeAttribute('style');
    }
    let shimmering_content = document.querySelectorAll('div.shimmering-text');
    let body_transparent = document.querySelector('div[class*="nearly-transparent-text-blur"]');
    if ((shimmering_content.length || body_transparent) && dompurify_loaded) {
      removeDOMElement(...shimmering_content);
      if (body_transparent)
        removeClassesByPrefix(body_transparent, 'nearly-transparent-text-blur');
      let json_script = document.querySelector('script[data-component-props="ArticleBody"], script[data-component-props="FeatureBody"]');
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text;
          if (json.body)
            json_text = json.body;
          else if (json.story && json.story.body)
            json_text = json.story.body;
          if (json_text) {
            removeDOMElement(json_script);
            let article = document.querySelector('div.body-copy-v2:not(.art_done)');
            let article_class = 'body-copy-v2';
            if (!article) {
              article = document.querySelector('div.body-copy:not(.art_done)');
              article_class = 'body-copy';
            }
            if (!article) {
              article = document.querySelector('div.body-content:not(.art_done)');
              article_class = 'body-content';
            }
            if (article) {
              article_class += ' art_done';
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div class="' + article_class + '">' + DOMPurify.sanitize(json_text, {ADD_TAGS: ['iframe', 'script']}) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_new) {
                article.parentNode.replaceChild(article_new, article);
                let teaser_body = document.querySelector('div.body-content[class*="teaser-content_"]');
                removeDOMElement(teaser_body);
                let thirdparty_embed = document.querySelector('div.thirdparty-embed__container[style*="height: 0;"]');
                if (thirdparty_embed)
                  thirdparty_embed.setAttribute('style', 'height: 550px !important;');
              }
            }
          }
        }
      }
    }
  }
  if (window.location.pathname.startsWith('/live/')) {
    setInterval(function () {
      window.localStorage.clear();
    }, 15 * 60 * 1000);
  }
}

else if (matchDomain('bloombergadria.com')) {
  let article_hidden = document.querySelector('article[style]');
  if (article_hidden)
    article_hidden.removeAttribute('style');
  let ads = document.querySelectorAll('.banner');
  removeDOMElement(...ads);
}

else if (matchDomain('bostonglobe.com')) {
  if (window.location.search.startsWith('?outputType=amp')) {
    amp_unhide_subscr_section();
  } else {
    let ads = document.querySelectorAll('div.arc_ad');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('bqprime.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_subscr_section('.ad-container');
  } else {
    window.setTimeout(function () {
      let geo_block = document.querySelector('div[class*="geotag-container_"]');
      if (!window.location.search.startsWith('?rel=geo_block')) {
        if (geo_block) {
          removeDOMElement(geo_block);
          window.location.href = window.location.pathname + '?rel=geo_block';
        }
      } else {
        if (geo_block)
          refreshCurrentTab();
        else {
          let hidden_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
          for (let elem of hidden_images)
            elem.setAttribute('src', elem.getAttribute('data-src'));
        }
      }
    }, 1000);
  }
  let ads = document.querySelectorAll('.responsive-ad');
  removeDOMElement(...ads);
}

else if (matchDomain('businessinsider.com')) {
  let ads = document.querySelectorAll('div.l-ad, div.in-post-sticky, aside.has-video-ad');
  hideDOMElement(...ads);
}

else if (matchDomain('businessoffashion.com')) {
  if (window.location.search.startsWith('?outputType=amp')) {
    amp_unhide_access_hide();
  } else {
    let ads = document.querySelectorAll('div[class^="default__AdsBlockWrapper"]');
    removeDOMElement(...ads);
  }
}

else if (matchDomain(ca_gcm_domains)) {
  let paywall = document.querySelector('div._block_1dgevo');
  if (paywall) {
    removeDOMElement(paywall);
    window.setTimeout(function () {
      window.location.reload(true);
    }, 500);
  }
  let counter = document.querySelector('div#paywall-banner-content');
  removeDOMElement(counter);
}

else if (matchDomain(ca_torstar_domains)) {
  window.setTimeout(function () {
    let meter_banner = document.querySelector('.c-article-meter-banner');
    let ads = document.querySelectorAll('.seo-media-query, .c-googleadslot, .ad-slot');
    removeDOMElement(meter_banner, ...ads);
    let end_of_article = document.querySelector('#end-of-article');
    hideDOMElement(end_of_article);
    let rightrail = document.querySelector('.c-article-body__rightrail');
    hideDOMElement(rightrail);
  }, 500);
}

else if (matchDomain('cen.acs.org')) {
  let meteredBar = document.querySelector('.meteredBar');
  removeDOMElement(meteredBar);
}

else if (matchDomain(['chronicle.com', 'philanthropy.com'])) {
  let preview = document.querySelector('div[data-content-summary]');
  removeDOMElement(preview);
  let article_hidden = document.querySelector('div.contentBody[hidden]');
  if (article_hidden) {
    let attributes = article_hidden.attributes;
    for (let elem of attributes) {
      let name = elem.name;
      if (name !== 'class')
        article_hidden.removeAttribute(name);
    }
  }
}

else if (matchDomain('cnbc.com')) {
  let paywall = document.querySelector('div.ArticleGate-proGate');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.ArticleBody-articleBody');
    if (article)
      article.style = "margin: 20px 0px; font-family: Lyon,Helvetica,Arial,sans-serif; font-size: 18px; line-height: 1.66";
    let span_hidden = document.querySelectorAll('span[hidden]');
    for (let elem of span_hidden) {
      elem.removeAttribute('hidden');
      elem.removeAttribute('class');
    }
  }
}

else if (matchDomain('csmonitor.com')) {
  let paywall = document.querySelector('div.paywall');
  removeDOMElement(paywall);
}

else if (matchDomain('dailywire.com')) {
  let paywall = document.querySelector('#post-body-text > div > div[class]');
  if (paywall)
    paywall.removeAttribute('class');
}

else if (matchDomain('dallasnews.com')) {
  if (window.location.search.startsWith('?outputType=amp')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let overlay = document.querySelector('div.sl-overlay');
    removeDOMElement(overlay);
    let noscroll = document.querySelector('div#courier-body-wrapper[style]');
    if (noscroll)
      noscroll.removeAttribute('style');
  }
}

else if (matchDomain('defector.com')) {
  let paywall = document.querySelector('div[class^="ContentGate_wrapper__"]');
  removeDOMElement(paywall);
}

else if (matchDomain('digiday.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_access_hide('="NOT p.showPageviewExpired AND NOT p.showPayWall"', '', 'amp-ad, .advertisement, .ad-wrapper');
  }
}

else if (matchDomain('discovermagazine.com')) {
  window.setTimeout(function () {
    let mammoth = document.querySelector('.iXVGnF');
    if (mammoth)
      window.location.reload();
    let banner = document.querySelector('div.dPURIw');
    hideDOMElement(banner);
  }, 1000);
}

else if (matchDomain('dn.no')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#dn-ncp-popup, div.paywall, iframe[title="Paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article_sel = 'article';
    let article = document.querySelector(article_sel);
    if (article) {
      let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
      replaceDomElementExt(url_cache, true, false, article_sel);
    } else {
      article = document.querySelector('main#main-story, main.lp_article_content');
      if (article)
        article.firstChild.before(googleWebcacheLink(url));
    }
  }
  window.setTimeout(function () {
    let preview = document.querySelector('html.dn-preview-page');
    if (preview)
      preview.removeAttribute('class');
    let infobox_content = document.querySelector('div.infobox__content');
    if (infobox_content)
      infobox_content.removeAttribute('class');
    let lazy_images = document.querySelectorAll('img[class*="lazy"][data-srcset]:not([src])');
    for (let elem of lazy_images) {
      elem.src = elem.getAttribute('data-srcset').split(' ')[0];
      if (elem.classList.contains('lazy'))
        elem.classList.remove('lazy');
      else
        elem.removeAttribute('class');
    }
    let ads = document.querySelectorAll('div[id^="googlead-"]');
    removeDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('economictimes.com')) {
  if (window.location.pathname.includes('/amp_')) {
    let paywall = document.querySelector('.paywall_wrap');
    if (paywall) {
      let content = document.querySelector('.paywall[style="display:none;"]');
      if (content)
        content.setAttribute('style', 'display:block;');
      else
        window.location.href = 'https://economictimes.indiatimes.com' + window.location.pathname.replace('amp_prime', 'prime');
      let intro = document.querySelector('.art_wrap');
      let article_blocker = document.querySelector('.articleBlocker');
      let amp_ads = document.querySelectorAll('amp-ad');
      removeDOMElement(paywall, intro, article_blocker, ...amp_ads);
    }
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('div#blocker_layer');
      let data_prime = document.querySelector('div[data-prime="1"]');
      let amphtml = document.querySelector('link[rel="amphtml"]');
      if (paywall || data_prime) {
        removeDOMElement(paywall);
        if (data_prime)
          data_prime.removeAttribute('data-prime');
        if (amphtml)
          window.location.href = amphtml.href;
        else if (window.location.pathname.startsWith('/epaper/'))
          window.location.href = 'https://economictimes.indiatimes.com' + window.location.pathname;
      } else {
        let ads = document.querySelectorAll('.adContainer');
        removeDOMElement(...ads);
      }
    }, 500);
  }
}

else if (matchDomain('economictimes.indiatimes.com')) {
  let paywall = document.querySelector('section.prime_paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let content = document.querySelector('div.content1, div.artText');
    let full_text = document.querySelector('div.paywall.p1');
    if (content && full_text)
      content.innerText = full_text.innerText;
    let page_content = document.querySelector('div.pageContent:not([style])');
    if (page_content)
      page_content.setAttribute('style', 'height: auto !important;');
  }
}

else if (matchDomain('economist.com')) {
  let subscribe = document.querySelector('.subscription-proposition');
  let wrapper = document.getElementById('bottom-page-wrapper');
  let adverts = document.querySelectorAll('div.advert');
  removeDOMElement(subscribe, wrapper, ...adverts);
  let p_articles = document.querySelectorAll('p.article__body-text');
  let href;
  for (let p_article of p_articles) {
    let e_anchors = document.querySelectorAll('a');
    href = '';
    for (let e_anchor of e_anchors) {
      if (e_anchor.href) {
        href = e_anchor.href;
      } else {
        e_anchor.href = href;
      }
    }
  }
}

else if (matchDomain('enotes.com')) {
  let paywall = document.querySelectorAll('section.c-cta-section');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let blurred = document.querySelectorAll('div[class^="_"]');
    for (let elem of blurred)
      elem.removeAttribute('class');
    let intro = document.querySelectorAll('div.o-rte-text > p:not([class]), div.o-rte-text > h3');
    for (let elem of intro)
      removeDOMElement(elem);
    let section_words = pageContains('p[class="u-align--center"]', /\(The entire section contains/);
    let ads = document.querySelectorAll('.ad-hfu');
    removeDOMElement(...section_words, ...ads);
  }
}

else if (matchDomain('espn.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('aside.espn-plus-container-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    replaceDomElementExt(url, false, false, 'div.article-body');
  }
}

else if (matchDomain('fieldandstream.com')) {
  let overlay = document.querySelectorAll('div[class^="mailmunch-"]');
  removeDOMElement(...overlay);
  let noscroll = document.querySelector('html.mailmunch-pop-open');
  if (noscroll)
    noscroll.removeAttribute('class');
}

else if (matchDomain('financialexpress.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall)
    paywall.classList.remove('paywall');
  let register = document.querySelector('div.pcl-wrap');
  let ads_selector = window.location.pathname.endsWith('/lite/') ? 'amp-ad, amp-embed, .ad-bg-container' : 'div[class*="-ads-blocks-ad-unit"]';
  let ads = document.querySelectorAll(ads_selector);
  removeDOMElement(register, ...ads);
}

else if (matchDomain('firstthings.com')) {
  let paywall = document.querySelector('.paywall');
  removeDOMElement(paywall);
}

else if (matchDomain('foreignaffairs.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('.paywall');
    let loading_indicator = document.querySelector('.loading-indicator');
    let msg_bottom = document.querySelector('.messages--container--bottom');
    removeDOMElement(paywall, loading_indicator, msg_bottom);
    let article_dropcap = document.querySelectorAll('.article-dropcap');
    for (let elem of article_dropcap)
      elem.classList.add('loaded');
  }, 1000);
}

else if (matchDomain('foreignpolicy.com')) {
  let content_ungated = document.querySelector('div.content-ungated');
  if (content_ungated && dompurify_loaded) {
    removeDOMElement(content_ungated);
    let content_gated = document.querySelector('div.content-gated');
    if (content_gated) {
      content_gated.classList.remove('content-gated');
      let insider = document.querySelector('body.is-fp-insider');
      if (insider) {
        window.setTimeout(function () {
          let json_script = getArticleJsonScript();
          if (json_script) {
            let json = JSON.parse(json_script.text);
            if (json) {
              let content = json.Articlebody.replace(/\r\n/g, '<br>');
              if (content) {
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div style="margin: 50px;">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                let content_new = doc.querySelector('div');
                content_gated.before(content_new);
              }
            }
          }
        }, 500);
      }
    }
  }
}

else if (matchDomain('fortune.com')) {
  let paywall = document.querySelector('.paywall');
  if (window.location.pathname.match(/\/amp(\/)?/)) {
    amp_unhide_access_hide('="NOT p.showRegWall AND NOT p.showPayWall"', '', '[class^="amp-ad"]');
    removeDOMElement(paywall);
  } else {
    if (paywall)
      paywall.removeAttribute('class');
  }
}

else if (matchDomain('ftm.eu')) {
  let banners = document.querySelectorAll('div.banner-pp, a.readmore');
  removeDOMElement(...banners);
}

else if (matchDomain('hbr.org')) {
  let popup = document.querySelector('.persistent-banner');
  removeDOMElement(popup);
  let paywall = document.querySelector('site-paywall');
  if (paywall) {//legacy
    removeDOMElement(paywall);
    let intro = document.querySelector('.article-ideainbrief');
    if (intro)
      intro.removeAttribute('class');
    let main_hidden = document.querySelector('div#main[style]');
    if (main_hidden)
      main_hidden.removeAttribute('style');
  }
}

else if (matchDomain('hbrchina.org')) {
  let div_hidden = document.querySelector('div#the_content');
  if (div_hidden)
    div_hidden.removeAttribute('style');
}

else if (matchDomain('hilltimes.com')) {
  let paywall = document.querySelectorAll('div[class^="paywallcont"]');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let json_script = document.querySelector('script.saswp-schema-markup-output');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        json_text = json.filter(x => x.articleBody)[0].articleBody.replace(/\s{2,}/g, '\r\n\r\n');
        let article = document.querySelector('div#fadebg > p');
        if (article)
          article.innerText = parseHtmlEntities(json_text);
      } catch (err) {
        console.log(err);
      }
    }
  }
  let banner = document.querySelector('section.hide_this_section');
  hideDOMElement(banner);
}

else if (matchDomain('hindustantimes.com')) {
  let paywall = document.querySelector('.freemium-card');
  if (paywall) {
    removeDOMElement(paywall);
    let freemium_text = document.querySelector('.freemiumText');
    if (freemium_text)
      freemium_text.classList.remove('freemiumText');
  }
  let noscroll = document.querySelector('body.open-popup');
  if (noscroll)
    noscroll.classList.remove('open-popup');
  let close_story = document.querySelector('.closeStory');
  let ads = document.querySelectorAll('div[class^="adHeight"]');
  removeDOMElement(close_story, ...ads);
}

else if (matchDomain('hindutamil.in')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div.premium-class-bt');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  }
}

else if (matchDomain('historyextra.com')) {
  let article_masked = document.querySelector('.template-article__masked');
  if (article_masked) {
    let extra_pars = document.querySelectorAll('div.template-article__masked > p');
    removeDOMElement(...extra_pars);
    article_masked.classList.remove('template-article__masked');
  }
  let ad_banner = document.querySelector('.ad-banner-container');
  removeDOMElement(ad_banner);
}

else if (matchDomain(usa_hearst_comm_domains)) {
  let wrapper = document.querySelector('.belowMastheadWrapper');
  let ads = document.querySelectorAll('div.adModule');
  removeDOMElement(wrapper, ...ads);
}

else if (matchDomain('inc42.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#inc42_article_content_lock');
  let article_sel = 'div.content-wrapper, section[amp-access="status"]';
  if (paywall) {
    removeDOMElement(paywall);
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, article_sel);
  }
  window.setTimeout(function () {
    if (window.location.pathname.endsWith('/amp/')) {
      let lazy_images = document.querySelectorAll('img.lazyload[src^="data:image/"][data-src]');
      for (let elem of lazy_images) {
        elem.src = elem.getAttribute('data-src');
        elem.classList.remove('lazyload');
        if (elem.width > 1000) {
          let ratio = elem.width / 640;
          if (window.navigator.userAgent.toLowerCase().includes('mobile'))
            ratio = elem.width / 320;
          elem.width = elem.width / ratio;
          elem.height = elem.height / ratio;
        }
      }
    }
    let also_read = document.querySelector('div > .also-read');
    if (also_read) {
      let article = document.querySelector(article_sel);
      if (article)
        article.appendChild(also_read.parentNode);
    }
  }, 1000);
}

else if (matchDomain('indianexpress.com')) {
  if (window.location.pathname.endsWith('/lite/'))
    amp_unhide_access_hide('="metering.result=\'ALLOW_ACCESS\'"', '', 'amp-ad, amp-embed');
  else {
    let paywall = document.querySelector('div#pcl-rest-content[style]');
    if (paywall)
      paywall.removeAttribute('style');
    let register = document.querySelector('div#app-pcl');
    let ads = document.querySelectorAll('div[class^="adsbox"]');
    removeDOMElement(register, ...ads);
  }
}

else if (matchDomain('indiatoday.in')) {
  if (window.location.pathname.match(/(\/amp)?\/magazine\//)) {
    let url = window.location.href;
    if (!url.includes('/amp/')) {
      let paywall = document.querySelector('#csc-paywall');
      let amphtml = document.querySelector('link[rel="amphtml"]');
      if (paywall && amphtml) {
        removeDOMElement(paywall);
        window.location.href = amphtml.href;
      }
    } else {
      amp_unhide_access_hide('="granted"', '="NOT NOT granted"', 'amp-ad, amp-embed');
    }
  } else
    csDoneOnce = true;
}

else if (matchDomain('infzm.com')) {
  let url = window.location.href;
  if (url.includes('/wap/#/')) {
    let container = document.querySelector('section.container');
    if (container)
      container.classList.remove('container');
    let overlay = document.querySelector('div.article-content[style]');
    if (overlay)
      overlay.removeAttribute('style');
  }
}

else if (matchDomain('inkl.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    let gradient_container = document.querySelector('div.gradient-container');
    removeDOMElement(gradient_container);
  }
  let what_is_inkl = document.querySelector('.what-is-inkl-container, .features-panel');
  let signup = document.querySelectorAll('.article-signup-container, .locked-sign-up-container, div[class*="/inkl-watermark.svg"]');
  let shared_banner = document.querySelector('div.shared-article-inline-banner');
  removeDOMElement(what_is_inkl, ...signup, shared_banner);
  let dismiss_button = document.querySelector('div.dismiss-button-container button.btn');
  if (dismiss_button)
    dismiss_button.click();
  let dive_deeper_summary_bodies = document.querySelectorAll('div.dive-deeper-container div.summary-body');
  if (dive_deeper_summary_bodies) {
    for (let summary_body of dive_deeper_summary_bodies) {
      if (!summary_body.querySelector('a')) {
        let ng_click = summary_body.getAttribute('ng-click').replace("showArticle('", '').replace("')", '');
        let weblink = document.createElement('a');
        weblink.text = 'open';
        weblink.href = 'https://www.inkl.com/news/' + ng_click;
        summary_body.appendChild(weblink);
      }
    }
  }
}

else if (matchDomain('ipolitics.ca')) {
  let login = document.querySelector('div.login');
  if (login && dompurify_loaded) {
    removeDOMElement(login);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.innerText);
        if (json && json.props.pageProps.post && json.props.pageProps.post.content) {
          let url_next = json.props.pageProps.post.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let article_new = json.props.pageProps.post.content;
          let article = document.querySelector('.post-body');
          if (article) {
            article.innerHTML = '';
            article.classList.remove('locked');
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            article.appendChild(content_new);
          }
        } else {
          refreshCurrentTab();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('jpost.com')) {
  let premium_banners = document.querySelectorAll('.hide-for-premium, #hiddenPremiumForm, #hiddenLink');
  removeDOMElement(...premium_banners);
}

else if (matchDomain(['latimes.com', 'sandiegouniontribune.com'])) {
  let ads = document.querySelectorAll('div.enhancement, div.google-dfp-ad-wrapper');
  removeDOMElement(...ads);
}

else if (matchDomain('ledevoir.com')) {
  let counter = document.querySelector('.paywall-breakpoint-wrapper');
  removeDOMElement(counter);
}

else if (matchDomain('livelaw.in')) {
  let paywall = document.querySelector('div#subscription_paid_message, div.subscribeNow');
  if (paywall) {
    let intro = document.querySelector('div.story');
    removeDOMElement(paywall, intro);
    let restricted_message = document.querySelector('div.restricted_message');
    if (restricted_message)
      restricted_message.classList.remove('restricted_message');
    let paywall_content = document.querySelector('div.paywall-content.hide');
    if (paywall_content)
      paywall_content.classList.remove('hide');
  }
  let ads = document.querySelectorAll('inside-post-ad, amp-ad');
  removeDOMElement(...ads);
}

else if (matchDomain('livemint.com')) {
  if (window.location.pathname.includes('/amp-')) {
    let paywall = document.querySelectorAll('[amp-access="NOT subscribed"]');
    removeDOMElement(...paywall);
  } else {
    let paywall = document.querySelector('div.paywall');
    if (paywall)
      paywall.classList.remove('paywall');
    let ads = document.querySelectorAll('[class^="ad"], [id^="ad"], #subscribeAd, .taboolaHeight');
    removeDOMElement(...ads);
  }
}

else if (matchDomain('magazine.atavist.com')) {
  let bottom_notification = document.querySelector('div.bottom-notification');
  let overlay = document.querySelector('div.notification-overlay');
  removeDOMElement(bottom_notification, overlay);
  let paywall = document.querySelector('body.paywall-notification-visible');
  if (paywall)
    paywall.classList.remove('paywall-notification-visible');
}

else if (matchDomain('marketwatch.com')) {
  let premium = document.querySelector('html.is-paywall');
  let url = window.location.href;
  if (!url.includes('/amp/')) {
    if (premium) {
      premium.classList.remove('is-paywall');
      window.location.href = url.replace('.marketwatch.com/', '.marketwatch.com/amp/');
    }
  } else {
    let meter = document.querySelector('div.meter');
    let container_sponsored = document.querySelector('div.container--sponsored');
    removeDOMElement(meter, container_sponsored);
    amp_unhide_subscr_section('.display-ad');
  }
  let ads = document.querySelectorAll('div.element--ad, div.j-ad');
  removeDOMElement(...ads);
}

else if (matchDomain('medscape.com')) {
  let ads = document.querySelectorAll('.AdUnit, [id^="ads-"]');
  removeDOMElement(...ads);
}

else if (matchDomain('mid-day.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_access_hide('="granted"', '="NOT granted"', 'amp-ad, amp-embed, [class*="BannerAd"]');
  } else {
    let paywall = document.querySelector('div#widget-_csc');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    } else {
      let read_more = document.querySelector('#read-more-my');
      if (read_more)
        read_more.click();
    }
  }
}

else if (matchDomain('nationalgeographic.com')) {
  function natgeo_func(node) {
    removeDOMElement(node);
    let body = document.querySelector('body[class]');
    if (body) {
      body.removeAttribute('class');
      body.removeAttribute('style');
    }
  }
  waitDOMElement('div[id^="fittPortal"]', 'DIV', natgeo_func, false);
  csDoneOnce = true;
  window.setTimeout(function () {
    let url = window.location.href;
    let subscribed = document.querySelector('.Article__Content--gated');
    let overlay = document.querySelector('.Article__Content__Overlay--gated');
    let msg = document.querySelector('div#bpc_archive');
    if (subscribed && !msg) {
      subscribed.appendChild(archiveLink(url));
      subscribed.setAttribute('style', 'overflow: visible !important;');
      if (overlay)
        overlay.classList.remove('Article__Content__Overlay--gated');
    }
    let ads = document.querySelectorAll('div.ad-slot, div.InsertedAd');
    removeDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('nationalreview.com')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div.continue-reading');
      if (paywall) {
        removeDOMElement(paywall);
        refreshCurrentTab();
      }
    }, 1000);
  }
  let zephr_wrapper = document.querySelector('div.zephr-wrapper');
  hideDOMElement(zephr_wrapper);
  let ads = document.querySelectorAll('amp-ad, .ad-unit, .ad-skeleton, amp-connatix-player, div[class*="-connatix-"]');
  hideDOMElement(...ads);
}

else if (matchDomain('nautil.us')) {
  let banners = document.querySelectorAll('div[class^="a__sc-np"], div.subscibe-bar');
  removeDOMElement(...banners);
}

else if (matchDomain('newleftreview.org')) {
  window.setTimeout(function () {
    let url = window.location.href;
    let paywall = document.querySelector('div.promo-wrapper');
    if (paywall) {
      removeDOMElement(paywall);
      csDoneOnce = true;
      let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
      replaceDomElementExt(url_cache, true, false, 'div.article-page');
    }
  }, 500);
}

else if (matchDomain('newrepublic.com')) {
  let modal = document.querySelector('div.article-scheduled-modal');
  let pw_popups = document.querySelector('div#pwPopups');
  let ads = document.querySelectorAll('.ad-unit, .ad-container');
  removeDOMElement(modal, pw_popups, ...ads);
}

else if (matchDomain('newscientist.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('#subscription-barrier');
  if (paywall) {
    removeDOMElement(paywall);
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'div.article-body, article');
  }
  window.setTimeout(function () {
    let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
    for (let elem of lazy_images)
      elem.src = elem.getAttribute('data-src').split('?')[0] + '?width=800';
    let ads = document.querySelectorAll('div[class*="Advert"]');
    removeDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('newsday.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_access_hide('="AccessLevel = \'Full Content Access\' OR Error = true"', '="Error != true AND UserState != \'Subscribed\'"');
  } else {
    let nd_lock = document.querySelector('html[class]');
    if (nd_lock)
      nd_lock.removeAttribute('class');
    let ads = document.querySelectorAll('div[class^="ad_full-banner_"]');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(['nola.com', 'theadvocate.com'])) {
  if (window.location.pathname.endsWith('.amp.html')) {
    let body_hidden = document.querySelector('.site-container');
    if (body_hidden)
      body_hidden.setAttribute('style', 'display:block;');
  }
}

else if (matchDomain('nybooks.com')) {
  let paywall_article = document.querySelector('.paywall-article');
  if (paywall_article)
    paywall_article.classList.remove('paywall-article');
  let banner = document.querySelector('div.toast-cta, div.inline-ad');
  removeDOMElement(banner);
}

else if (matchDomain('nytimes.com')) {
  let banners = document.querySelectorAll('div[data-testid="inline-message"], div[id^="ad-"], div.expanded-dock, div.pz-ad-box');
  removeDOMElement(...banners);
}

else if (matchDomain('nzherald.co.nz')) {
  // plus code in contentScript_once_var.js (timing)
  let premium_toaster = document.querySelector('#premium-toaster');
  let ads = document.querySelectorAll('.ad');
  hideDOMElement(premium_toaster, ...ads);
}

else if (matchDomain('outlookbusiness.com')) {
  let paywall = document.querySelector('div#csc-paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      let json = JSON.parse(json_script.innerText);
      if (json && json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description) {
        let article_new = json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description;
        let article = document.querySelector('div.story-content');
        if (article) {
          article.innerHTML = '';
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          article.appendChild(content_new);
        }
      }
    }
  }
}

else if (matchDomain('outlookindia.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = parseHtmlEntities(json.articleBody).replace(/\n/g, "$&\r\n");
        let content = document.querySelector('div#articleBody');
        if (json_text && content) {
          content.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.appendChild(article_new);
        }
      }
    }
  }
}

else if (matchDomain('project-syndicate.org')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.paywall--base');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div[data-page-area="article-body"]');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
}

else if (matchDomain('quillette.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('aside.gh-post-upgrade-cta');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('article');
    if (article)
      article.appendChild(archiveLink(url));
  }
}

else if (matchDomain('quora.com')) {
  let overlays = document.querySelectorAll('div[class*="_overlay"]');
  removeDOMElement(...overlays);
  let mask_image = document.querySelector('div.jhqnqh');
  if (mask_image)
    mask_image.classList.remove('jhqnqh');
  let read_more_buttons = document.querySelectorAll('button.puppeteer_test_read_more_button.qu-bg--gray_ultralight');
  for (let elem of read_more_buttons)
    elem.click();
  let overlay_cards = document.querySelectorAll('div[class*="OverlayCard"]');
  for (let elem of overlay_cards)
    elem.removeAttribute('class');
  window.setTimeout(function () {
    let answers = document.querySelectorAll('div[class*="dom_annotate_question_answer_item_"]');
    for (let answer of answers) {
      let wall = answer.querySelector('div.content-monetization-wall');
      if (wall) {
        wall.classList.remove('content-monetization-wall');
        let timestamp_link = answer.querySelector('a.answer_timestamp[href]');
        if (timestamp_link) {
          let answer_link = document.createElement('a');
          answer_link.innerText = 'BPC > open Quora+ answer';
          answer_link.href = timestamp_link.href;
          wall.appendChild(answer_link);
        }
      }
    }
  }, 500);
}

else if (matchDomain('rugbypass.com')) {
  if (window.location.pathname.startsWith('/plus/')) {
    let paywall = document.querySelector('.premium-fold-bottom');
    if (paywall) {
      paywall.classList.remove('premium-fold-bottom');
      let offer = document.querySelector('.plus-article-offer');
      removeDOMElement(offer);
      let fade = document.querySelector('.fade');
      if (fade)
        fade.classList.remove('fade');
    }
  } else
    csDoneOnce = true;
}

else if (matchDomain('science.org')) {
  let paywall = document.querySelector('div.alert-read-limit');
  removeDOMElement(paywall);
  let overlay = document.querySelector('body.alert-read-limit__overlay');
  if (overlay)
    overlay.classList.remove('alert-read-limit__overlay');
}

else if (matchDomain('scmp.com')) {
  if (window.location.href.includes('/amp.')) {
    let div_hidden = document.querySelectorAll('div.article-body[amp-access][amp-access-hide]');
    for (let elem of div_hidden)
      elem.removeAttribute('amp-access-hide');
    let default_meters = document.querySelectorAll('div.default-meter, div#archive-article-meter');
    let adverts = document.querySelectorAll('amp-ad, div.ad-banner, div.advert-fly-carpet-container, div.inline-advert');
    removeDOMElement(...default_meters, ...adverts);
  } else
    csDoneOnce = true;
}

else if (matchDomain('seattletimes.com')) {
  let ads = document.querySelectorAll('.top-ad-wrapper, .ad-container');
  removeDOMElement(...ads);
}

else if (matchDomain('seekingalpha.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let locked = document.querySelector('div[data-test-id="post-locked-banner"]');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (locked && amphtml) {
      locked.removeAttribute('data-test-id');
      window.location.href = amphtml.href;
    } else {
      let read_more = document.querySelector('button[id^="continueReadingButton"]');
      if (read_more)
        read_more.click();
    }
  } else {
    amp_unhide_access_hide('*="premium_access OR"', '', '.ad-wrap');
    let paywall = document.querySelector('[class*="paywall-container"]');
    removeDOMElement(paywall);
  }
}

else if (matchDomain('slate.com')) {
  let slate_roadblock = document.querySelector('.slate-roadblock');
  let ads = document.querySelectorAll('section[class*="-ad"]');
  removeDOMElement(slate_roadblock, ...ads);
}

else if (matchDomain('slideshare.net')) {
  let limit_overlay = document.querySelector('.limit-overlay');
  if (limit_overlay)
    limit_overlay.classList.remove('limit-overlay');
}

else if (matchDomain('sloanreview.mit.edu')) {
  let url = window.location.href;
  let paywall = document.querySelector('body.is-paywall');
  if (paywall) {
    paywall.classList.remove('is-paywall');
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'div#article-content');
  }
}

else if (matchDomain('sofrep.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    let intro = document.querySelector('div.non-paywall');
    removeDOMElement(intro);
    waitDOMElement('div#paywall_wrap', 'DIV', node => removeDOMElement(node.parentNode));
  }
  let banners = document.querySelectorAll('#scrollerCTA, #botCta');
  removeDOMElement(...banners);
}

else if (matchDomain('spglobal.com')) {
  let overlay = document.querySelector('.article__overlay');
  removeDOMElement(overlay);
  let html_noscroll = document.querySelector('html[class]');
  if (html_noscroll)
    html_noscroll.removeAttribute('class');
}

else if (matchDomain('sportico.com')) {
  if (window.location.pathname.endsWith('/amp/'))
    amp_unhide_subscr_section('amp-ad, amp-embed', false);
}

else if (matchDomain('staradvertiser.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section();
  } else {
    let paywall = document.querySelector('div#hsa-paywall-overlay');
    if (paywall) {
      removeDOMElement(paywall);
      let div_hidden = document.querySelector('div#hsa-paywall-content[style]');
      if (div_hidden)
        div_hidden.removeAttribute('style');
    }
  }
}

else if (matchDomain('startribune.com')) {
  let ads = document.querySelectorAll('div.ad-placeholder');
  removeDOMElement(...ads);
}

else if (matchDomain('stocknews.com')) {
  let hideme = document.querySelector('div#hideme');
  removeDOMElement(hideme);
  let blurmes = document.querySelectorAll('div[id^="blurme"]');
  for (let i = 0; i < blurmes.length; i++)
    blurmes[i].setAttribute('id', 'blurmenot' + i);
}

else if (matchDomain('statista.com')) {
  if (window.location.pathname.startsWith('/outlook/')) {
    let promo = document.querySelector('section#promotionElement');
    let chartbox_paywall = document.querySelectorAll('div.xmoChartBoxPaywall');
    removeDOMElement(promo, ...chartbox_paywall);
    let blurred = document.querySelectorAll('.blurred');
    for (let elem of blurred)
      elem.removeAttribute('class');
  }
}

else if (matchDomain('studocu.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('button[data-test-selector^="preview-banner-"]');
    if (paywall) {
      let paywall_banner = document.querySelector('#document-wrapper > div:not([style])');
      let banners = document.querySelectorAll('div.pf > :not(.page-content), div#premium-page-header');
      removeDOMElement(paywall_banner, ...banners);
      window.setTimeout(function () {
        let blurred_pages = document.querySelectorAll('div.page-content[style]');
        for (let blurred_page of blurred_pages) {
          let page = document.createElement('span');
          page.setAttribute('class', 'page-content');
          page.appendChild(blurred_page.firstChild);
          blurred_page.parentNode.replaceChild(page, blurred_page);
        }
      }, 2000);
    }
  }, 1000);
}

else if (matchDomain('techinasia.com')) {
  let paywall = document.querySelector('.paywall-content');
  if (paywall && dompurify_loaded) {
    paywall.classList.remove('paywall-content');
    let url = window.location.href;
    let url_xhr = url.replace('.com/', '.com/wp-json/techinasia/2.0/posts/').replace('/visual-story/', '/');
    fetch(url_xhr)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          let json_text = json.posts[0].content;
          json_text = json_text.replace(/width\=\"(\d){3,}\"/g, 'width="100%"').replace(/height\=\"(\d){3,}\"/g, 'height="100%"');
          let content = document.querySelector('div.content');
          if (json_text && content) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div class="jsx-1794864983 content">' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
            let content_new = doc.querySelector('div.content');
            content.parentNode.replaceChild(content_new, content);
          }
        });
      }
    });
  }
  let splash_subscribe = document.querySelector('.splash-subscribe');
  let paywall_hard = document.querySelector('.paywall-hard');
  removeDOMElement(splash_subscribe, paywall_hard);
}

else if (matchDomain(['techtarget.com', 'computerweekly.com', 'lemagit.fr'])) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let banners = document.querySelectorAll('p#firstP, div#inlineRegistrationWrapper');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('the-american-interest.com')) {
  let counter = document.getElementById('article-counter');
  removeDOMElement(counter);
}

else if (matchDomain('theathletic.com')) {
  if (!(window.location.search.match(/(\?|&)amp/) && !document.querySelector('link[rel="amphtml"]'))) {
    function theathletic_func(node) {
      removeDOMElement(node);
      let overlays = document.querySelectorAll('div[id*="overlay"], div:empty:not([data-rjs])');
      hideDOMElement(...overlays);
      let body = document.querySelector('body');
      if (body) {
        body.style.overflow = 'visible';
        body.style.position = 'relative';
      }
    }
    waitDOMElement('div[id^="slideup-"]', 'DIV', theathletic_func);
    csDoneOnce = true;
  } else {
    amp_unhide_subscr_section();
    amp_unhide_access_hide('', '*="NOT granted"');
  }
  let apron = document.querySelector('div#free-apron-cta, div.slideup-free-apron-container');
  let ads = document.querySelectorAll('div.ad-container');
  removeDOMElement(apron, ...ads);
}

else if (matchDomain('theatlantic.com')) {
  let lazy_images = document.querySelectorAll('img.Image_lazy__tutlP');
  for (let elem of lazy_images)
    elem.classList.remove('Image_lazy__tutlP');
  let banners = document.querySelectorAll('.c-nudge__container, .c-non-metered-nudge, div[class^="ArticleInjector_"]');
  hideDOMElement(...banners);
}

else if (matchDomain('thebulletin.org')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.article--cropped');
  if (paywall) {
    removeDOMElement(paywall);
    csDoneOnce = true;
    let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split('?')[0];
    replaceDomElementExt(url_cache, true, false, 'div#body-copy');
  }
}

else if (matchDomain('thedailybeast.com')) {
  let paywall = document.querySelector('div.Body__paywall-container');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script[displayName="initialState"]');
    if (json_script) {
      let json_str = json_script.text.substring(json_script.textContent.indexOf('{'));
      try {
        let json = JSON.parse(json_str);
        if (json.body) {
          let pars = json.body.sections;
          let cards = json.body.cards;
          if (pars) {
            let mobile_doc = document.querySelector('div.Mobiledoc');
            if (mobile_doc) {
              let mobile_doc_text = mobile_doc.innerText.replace(/(\r|\n)/g, '');
              for (let elem of pars) {
                let par_elem = '';
                if (elem[0] === 1) {
                  if (elem[1] === 'p') {
                    let par = '';
                    for (let part of elem[2])
                      par += part[3];
                    if (par && !mobile_doc_text.includes(par)) {
                      par_elem = document.createElement('p');
                      par_elem.innerText = par;
                    }
                  }
                } else if (elem[0] === 10) {
                  if (cards && cards[elem[1]]) {
                    let card = cards[elem[1]];
                    if (card[0] === 'pt-image') {
                      par_elem = document.createElement('p');
                      let par_fig = document.createElement('figure');
                      let par_img = document.createElement('img');
                      par_img.src = card[1].url;
                      par_fig.appendChild(par_img);
                      par_elem.appendChild(par_fig);
                      let par_cap = document.createElement('figcaption');
                      par_cap.innerText = card[1].title + ' ' + card[1].credit;
                      par_elem.appendChild(par_cap);
                    } else if (card[0] === 'pt-fancy-links-card') {
                      par_elem = document.createElement('p');
                      let par_link = document.createElement('a');
                      par_link.href = card[1].links;
                      par_link.innerText = card[1].linksData[0].long_headline;
                      par_elem.appendChild(par_link);
                    }
                  }
                }
                if (par_elem)
                  mobile_doc.appendChild(par_elem);
              }
            }
          }
        }
        csDoneOnce = true;
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('thediplomat.com')) {
  let preview = document.querySelector('.dpl-preview');
  if (preview)
    preview.classList.remove('dpl-preview');
}

else if (matchDomain('theglobeandmail.com')) {
  if (!window.location.search.startsWith('?rel=premium')) {
    let paywall = document.querySelector('div.c-paywall');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = window.location.pathname + '?rel=premium';
    }
  } else {
    let header_hidden = document.querySelectorAll('div.o-primary-header, div.c-article-meta');
    for (let elem of header_hidden)
      elem.setAttribute('style', 'display: block !important;');
  }
  let lazy_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
  for (let elem of lazy_images)
    elem.src = elem.getAttribute('data-src');
  let banners = document.querySelectorAll('div.c-ad, div#subscription-pencil-area, div.marketing-container-wrapper, div[class^="BaseAd__"]');
  hideDOMElement(...banners);
}

else if (matchDomain(['thehindu.com', 'thehindubusinessline.com'])) {
  if (!window.location.pathname.endsWith('/amp/')) {
    let counter = document.querySelector('#test');
    let ads = document.querySelectorAll('.ad, .article-ad, .dfp-ad');
    removeDOMElement(counter, ...ads);
  } else {
    let ads = document.querySelectorAll('amp-ad, amp-embed, [class^="height"], [class^="advt"], [id^="piano"]');
    removeDOMElement(...ads);
  }
  function hindu_main() {
    if (window) {
      window.Adblock = false;
      window.isNonSubcribed = false;
    }
  }
  insert_script(hindu_main);
}

else if (matchDomain('theinitium.com')) {
  let paywall = document.querySelector('section.c-wall');
  removeDOMElement(paywall);
}

else if (matchDomain(['thejuggernaut.com', 'jgnt.co'])) {
  let paywall = pageContains('div.font-mono', /\Read this article and many more by subscribing today/);
  if (paywall.length) {
    removeDOMElement(paywall[0].parentNode);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.innerText);
        if (json && json.props.pageProps.post) {
          let url_next = json.query.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.post.fields.textEssay.fields.body.content;
          let article = document.querySelector('div.opacity-50');
          if (article) {
            article.innerHTML = '';
            article.removeAttribute('class');
            let par_first = true;
            function attach_text(sub_item, elem) {
              if (sub_item.value) {
                let sub_elem = document.createElement('span');
                sub_elem.innerText = sub_item.value;
                if (sub_item.marks && sub_item.marks.length) {
                  let style = '';
                  for (let mark of sub_item.marks) {
                    if (mark.type === 'bold')
                      style += 'font-weight: bold;';
                    else if (mark.type === 'italic')
                      style += 'font-style: italic;';
                    else if (mark.type === 'underline')
                      style += 'text-decoration: underline;';
                  }
                  sub_elem.style = style;
                }
                elem.appendChild(sub_elem);
              }
            }
            function attach_hyperlink(sub_item, elem) {
              if (sub_item.content && sub_item.content[0] && sub_item.content[0].value && sub_item.data && sub_item.data.uri) {
                let sub_elem = document.createElement('a');
                sub_elem.href = sub_item.data.uri;
                sub_elem.innerText = sub_item.content[0].value;
                if (!matchUrlDomain(['thejuggernaut.com', 'jgnt.co'], sub_item.data.uri))
                  sub_elem.target = '_blank';
                sub_elem.style = 'text-decoration: underline;';
                elem.appendChild(sub_elem);
              }
            }
            function attach_paragraph(par, elem) {
              if (par.content && par.content.length) {
                let span_elem = document.createElement('span');
                for (let item of par.content) {
                  if (item.nodeType === 'text') {
                    attach_text(item, span_elem);
                  } else if (item.nodeType === 'hyperlink') {
                    attach_hyperlink(item, span_elem);
                  } else
                    console.log(item);
                }
                elem.appendChild(span_elem);
              }
            }
            for (let par of pars) {
              let elem = document.createElement('p');
              if (['paragraph', 'heading-1'].includes(par.nodeType)) {
                attach_paragraph(par, elem);
              } else if (['blockquote'].includes(par.nodeType)) {
                if (par.content && par.content.length) {
                  for (let item of par.content) {
                    if (item.nodeType === 'paragraph') {
                      elem.style = 'margin: 0px 20px; font-style: italic;';
                      attach_paragraph(item, elem);
                    } else
                      console.log(item);
                  }
                }
              } else if (par.nodeType === 'hr') {
                elem.appendChild(document.createElement('hr'));
              } else if (par.nodeType === 'embedded-asset-block') {
                if (!par_first) {
                  if (par.data && par.data.target && par.data.target.fields) {
                    if (par.data.target.fields.file && par.data.target.fields.file.url) {
                      let figure = document.createElement('figure');
                      let img = document.createElement('img');
                      img.src = par.data.target.fields.file.url;
                      figure.appendChild(img);
                      if (par.data.target.fields.description) {
                        let caption = document.createElement('figcaption');
                        caption.innerText = par.data.target.fields.description;
                        figure.appendChild(caption);
                      }
                      elem.appendChild(figure);
                    }
                  }
                } else
                  par_first = false;
              } else if (par.nodeType === 'unordered-list') {
                if (par.content && par.content.length) {
                  let ul = document.createElement('ul');
                  for (let item of par.content) {
                    if (item.nodeType === 'list-item') {
                      if (item.content) {
                        for (let sub_item_par of item.content) {
                          if (sub_item_par.nodeType === 'paragraph') {
                            let li = document.createElement('li');
                            attach_paragraph(sub_item_par, li);
                            ul.appendChild(li);
                          }
                        }
                      }
                    } else
                      console.log(item);
                  }
                  elem.appendChild(ul);
                }
              } else {
                console.log(par);
              }
              if (elem.hasChildNodes) {
                article.appendChild(document.createElement('br'));
                article.appendChild(elem);
              }
            }
          }
        } else
          refreshCurrentTab();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('thelawyersdaily.ca')) {
  if (window.location.pathname.startsWith('/amp/')) {
    ampToHtml();
  } else {
    let modal = document.querySelectorAll('#NewsletterModal, .modal-backdrop');
    removeDOMElement(...modal);
  }
}

else if (matchDomain('thenewatlantis.com')) {
  let article_gated = document.querySelector('.article-gated');
  if (article_gated)
    article_gated.classList.remove('article-gated');
}

else if (matchDomain('thepointmag.com')) {
  let overlay = document.querySelectorAll('div.overlay, div#tpopup-');
  removeDOMElement(...overlay);
}

else if (matchDomain('thequint.com')) {
  let paywall = document.querySelector('div.zsqcu');
  if (paywall) {
    removeDOMElement(paywall);
    let body_hidden = document.querySelector('div#story-body-wrapper');
    if (body_hidden)
      body_hidden.removeAttribute('class');
    function thequint_unhide(node) {
      node.removeAttribute('class');
    }
    waitDOMAttribute('div#story-body-wrapper', 'DIV', 'class', thequint_unhide, true);
  }
}

else if (matchDomain('thewrap.com')) {
  let paywall = document.querySelector('.wrappro-paywall');
  if (paywall)
    paywall.classList.remove('wrappro-paywall');
}

else if (matchDomain('timeshighereducation.com')) {
  let paywall_cta = document.querySelector('div.paywall-cta');
  if (paywall_cta) {
    paywall_cta.removeAttribute('style');
    let hidden_divs = document.querySelectorAll('div[style="display: none;"]');
    for (let hidden_div of hidden_divs)
      hidden_div.removeAttribute('style');
    let paywall_fade = document.querySelector('div.paywall-fade');
    if (paywall_fade)
      paywall_fade.classList.remove('paywall-fade');
  }
  let hidden_images = document.querySelectorAll('img.b-lazy[src^="data:image/"][data-src]');
  for (let hidden_image of hidden_images) {
    hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
    hidden_image.classList.remove('b-lazy');
    hidden_image.parentElement.classList.remove('media--loading');
  }
  let ads = document.querySelectorAll('div[id^="div-gpt-in-article-ad-"], div[class^="the-dfp__in-article-ATD"]');
  removeDOMElement(...ads);
}

else if (matchDomain(timesofindia_domains)) {
  let url = window.location.href;
  let region_block = document.querySelector('div.plan-popup.active');
  if (region_block) {
    removeDOMElement(region_block);
    let overflow = document.querySelector('html[style]');
    if (overflow)
      overflow.removeAttribute('style');
  }
  if (!window.location.pathname.includes('/amp_')) {
    let paywall = document.querySelector('div#story-blocker');
    let amphtml = document.querySelector('link[rel="amphtml"]');
    if (!amphtml)
      amphtml = {href: url.replace('/timesofindia.indiatimes.com/', '/m.timesofindia.com/').replace('/articleshow/', '/amp_articleshow/')};
    if (paywall && amphtml) {
      removeDOMElement(paywall);
      window.location.href = amphtml.href;
    }
  } else {
    let amp_images = document.querySelectorAll('div.inline-image > div.inline-imgecontent > amp-img[src]');
    for (let amp_image of amp_images) {
      amp_image.parentNode.removeAttribute('class');
      amp_image.parentNode.parentNode.removeAttribute('class');
      let elem = document.createElement('img');
      Object.assign(elem, {
        src: amp_image.getAttribute('src'),
        alt: amp_image.getAttribute('alt')
      });
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  }
}

else if (matchDomain(no_nhst_media_domains)) {
  let url = window.location.href;
  if (url.includes('.tradewindsnews.com/markets/')) {
    let paywall = document.querySelector('iframe[src]');
    removeDOMElement(paywall);
    let overflow = document.querySelector('body[style]');
    if (overflow)
      overflow.removeAttribute('style');
    let blurred = document.querySelector('body > div[style]');
    if (blurred)
      blurred.removeAttribute('style');
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('iframe#paywall-iframe');
      if (paywall && dompurify_loaded) {
        let intro = document.querySelector('div.global-article-selector');
        let article = paywall.parentNode;
        removeDOMElement(paywall, intro);
        fetch(url)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              let split1 = html.split('window.__INITIAL_STATE__=')[1];
              let state = (split1.split('};')[0] + '}').split('</script>')[0];
              if (state) {
                let json = JSON.parse(state);
                if (json) {
                  let json_text = json.article.body;
                  let parser = new DOMParser();
                  let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, {ADD_ATTR: ['itemprop'], ADD_TAGS: ['link']}) + '</div>', 'text/html');
                  let article_new = doc.querySelector('div');
                  if (article_new) {
                    if (article)
                      article.appendChild(article_new);
                  }
                }
              }
            })
          }
        })
      }
    }, 500);
  }
}

else if (matchDomain(usa_conde_nast_domains)) {
  if (window.location.pathname.endsWith('/amp')) {
    amp_unhide_subscr_section('amp-ad, amp-embed, .ad');
  } else {
    let banners = document.querySelectorAll('.paywall-bar, div[class^="MessageBannerWrapper-"');
    removeDOMElement(...banners);
  }
}

else if (matchDomain(usa_craincomm_domains)) {
  let body_hidden = document.querySelector('body[class]');
  if (body_hidden)
    body_hidden.removeAttribute('class');
  let lazy_images = document.querySelectorAll('img.lazy[data-src]');
  for (let lazy_image of lazy_images) {
    lazy_image.src = lazy_image.getAttribute('data-src');
    lazy_image.removeAttribute('class');
  }
  let lazy_sources = document.querySelectorAll('source[srcset^="data:image"]');
  removeDOMElement(...lazy_sources);
  let sponsored_article = document.querySelector('div.sponsored-article');
  if (sponsored_article)
    sponsored_article.classList.remove('sponsored-article');
}

else if (matchDomain(usa_genomeweb_domains)) {
  let banners = document.querySelectorAll('div.footer__ads-footer');
  removeDOMElement(...banners);
}

else if (matchDomain(usa_outside_mag_domains)) {
  let paywall = document.querySelector('div.o-membership-overlay');
  if (paywall) {
    let is_gated = document.querySelectorAll('[class*="is-gated"]');
    for (let elem of is_gated)
      removeClassesByPrefix(elem, 'is-gated');
    removeDOMElement(paywall);
  }
  if (matchDomain('cyclingtips.com')) {
    localStorage.removeItem('av');
    let ads = document.querySelectorAll('div[data-block-name="ads"], div#takeover');
    removeDOMElement(...ads);
  }
}

else if (matchDomain(usa_tribune_domains)) {
  let overlay = document.querySelector('div#zephr-overlay');
  removeDOMElement(overlay);
}

else if (matchDomain('usatoday.com')) {
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_access_hide('="gup.hasAssetAccess"', '', 'div[class*="ad-"]');
  } else {
    let roadblock = document.querySelector('.roadblock-container');
    if (roadblock) {
      removeDOMElement(roadblock);
      article_next = document.querySelector('article.next-in-depth-story > div.article-inner');
      if (article_next) {
        let url = article_next.getAttribute('data-url');
        let weblink = document.createElement('a');
        weblink.href = url;
        weblink.innerText = 'open next in-depth story';
        article_next.appendChild(weblink);
      }
    }
  }
}

else if (matchDomain('venturebeat.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.paywall');
    if (paywall)
      paywall.classList.remove('paywall');
  }, 500);
}

else if (matchDomain('washingtonpost.com')) {
  let leaderboard = document.querySelector('#leaderboard-wrapper');
  let adverts = document.querySelectorAll('div[data-qa$="-ad"]');
  removeDOMElement(leaderboard, ...adverts);
}

else if (matchDomain('winnipegfreepress.com')) {
  let ads = document.querySelectorAll('.billboard-ad-space, .ad, .article-ad, .fixed-sky');
  removeDOMElement(...ads);
}

else if (matchDomain('wsj.com')) {
  let url = window.location.href;
  if (location.href.includes('/articles/')) {
    let close_button = document.querySelector('div.close-btn[role="button"]');
    if (close_button)
      close_button.click();
  }
  let wsj_ads = document.querySelectorAll('div[class*="wsj-ad"], div[class*="BodyAdWrapper"]');
  removeDOMElement(...wsj_ads);
  if (url.includes('/amp/')) {
    let masthead_link = document.querySelector('div.masthead > a[href*="/articles/"]');
    if (masthead_link)
      masthead_link.href = 'https://www.wsj.com';
    amp_unhide_subscr_section();
  } else {
    let snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
    let wsj_pro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
    if (snippet || wsj_pro) {
      removeDOMElement(snippet, wsj_pro);
      window.location.href = url.replace('wsj.com', 'wsj.com/amp');
    }
  }
}

else if (matchDomain('zerohedge.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div[class^="PremiumOverlay_container__"]');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let json_script = document.querySelector('script#__NEXT_DATA__');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.innerText);
          if (json && json.props.pageProps.node.body) {
            let article_new = parseHtmlEntities(decode_utf8(atob(json.props.pageProps.node.body.substring(21))));
            let article = document.querySelector('div[class^="NodeContent_mainContent__"');
            if (article) {
              article.innerHTML = '';
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
              let content_new = doc.querySelector('div');
              article.appendChild(content_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, 1000);
}

else if (matchDomain(usa_gannett_domains) || document.querySelector('img[srcset^="https://www.gannett-cdn.com/"], link[href*=".gannett-cdn.com/"]')) {
  if (window.location.pathname.endsWith('/restricted/') && window.location.search.startsWith('?return='))
    window.location.href = decodeURIComponent(window.location.href.split('?return=')[1]);
}

else if ((domain = matchDomain(usa_lee_ent_domains)) || document.querySelector('script[src*=".townnews.com/"][src*="/tncms/"]')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('="hasAccess"', '="NOT hasAccess"', 'amp-ad, amp-embed, .amp-ads-container');
    let elem_hidden = document.querySelectorAll('html[class], body[class]');
    for (let elem of elem_hidden)
      elem.removeAttribute('class');
  } else {
    if (!domain) {
      function unscramble(t) {
        for (var n = "", i = 0, r = t.length; i < r; i++) {
          var s = t.charCodeAt(i);
          if (s >= 33 && s <= 126) {
            var sTmp = String.fromCharCode(33 + (s - 33 + 47) % 94);
            n += sTmp;
          } else
            n += t.charAt(i);
        }
        return n;
      }
      let subscriber_only = document.querySelectorAll('div.subscriber-only');
      for (let elem of subscriber_only) {
        if (elem.classList.contains('encrypted-content') && dompurify_loaded) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(unscramble(elem.innerText)) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          elem.parentNode.replaceChild(content_new, elem);
        }
        elem.removeAttribute('style');
        elem.removeAttribute('class');
      }
      let banners = document.querySelectorAll('div.subscription-required, div.redacted-overlay');
      removeDOMElement(...banners);
    }
    let ads = document.querySelectorAll('div.tnt-ads-container');
    removeDOMElement(...ads);
  }
}

else if ((domain = matchDomain(usa_mcc_domains)) ||
  (window.location.hostname.startsWith('account.') && document.querySelector('script[src*=".mcclatchyinteractive.com/"]')) ||
  (window.location.href.match(/\/\/amp\..+\.com\/(.+\/)?article(\d){8,}\.html/) && document.querySelector('a[href^="https://classifieds.mcclatchy.com/"]'))) {
  let url = window.location.href;
  let hostname = window.location.hostname;
  if (!domain)
    domain = hostname.replace(/^(account|amp)\./, '');
  if (hostname.startsWith('account.') && window.location.search.startsWith('?resume=')) {
    window.setTimeout(function () {
      window.location.href = 'https://amp.' + domain + '/article' + url.split('resume=')[1].split(/[#&]/)[0] + '.html';
    }, 500);
  } else if (url.includes('amp.' + domain + '/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed', false);
    let subscriptions_action = document.querySelector('div[subscriptions-action][subscriptions-display="NOT data.hasError"]');
    if (subscriptions_action)
      subscriptions_action.removeAttribute('subscriptions-action');
    let subscr_tag = document.querySelector('div#subscriber-exclusive-tag');
    let amp_players = document.querySelectorAll('amp-connatix-player');
    removeDOMElement(subscr_tag, ...amp_players);
  }
  let premium_svgs = document.querySelectorAll('h3 > a > svg');
  let premium_link;
  for (let premium_svg of premium_svgs) {
    premium_link = premium_svg.parentElement;
    if (premium_link.href.includes('www.'))
      premium_link.href = premium_link.href.replace('www.', 'amp.');
  }
  let ads = document.querySelectorAll('div[id^="zone-el-"]');
  removeDOMElement(...ads);
}

else if (matchDomain(usa_mng_domains) || (window.location.href.match(/\.com\/(\d){4}\/(\d){2}\/(\d){2}\/.+\/amp\//) && document.querySelector('amp-img#paywall[src*=".com/wp-content/plugins/dfm-amp-mods/"]'))) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed, div.ampWrapperInside');
  }
}

else if (document.querySelector('script[src*=".axate.io/"]')) {
  let premium = document.querySelector('.premium, div[class*="-premium"]');
  if (premium)
    premium.removeAttribute('class');
}

else
  csDone = true;
}

if (csDone || csDoneOnce) {
  addDivBpcDone();
}

} // end div_bpc_done

// General Functions
function removeDOMElement(...elements) {
  for (let element of elements) {
    if (element)
      element.remove();
  }
}

function hideDOMElement(...elements) {
  for (let element of elements) {
    if (element)
      element.style = 'display:none !important;';
  }
}

function waitDOMElement(selector, tagName = '', callback, multiple = false) {
  new window.MutationObserver(function (mutations) {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!tagName || (node.tagName === tagName)) {
          if (node.matches(selector)) {
            callback(node);
            if (!multiple)
              this.disconnect();
          }
        }
      }
    }
  }).observe(document, {
    subtree: true,
    childList: true
  });
}

function waitDOMAttribute(selector, tagName = '', attributeName = '', callback, multiple = false) {
  let targetNode = document.querySelector(selector);
  if (!targetNode)
    return;
  new window.MutationObserver(function (mutations) {
    for (let mutation of mutations) {
      if (mutation.target.attributes[attributeName]) {
        callback(mutation.target);
        if (!multiple)
          this.disconnect();
      }
    }
  }).observe(targetNode, {
    attributes: true,
    attributeFilter: [attributeName]
  });
}

function addDivBpcDone() {
  let div_bpc_new = document.createElement('div');
  div_bpc_new.setAttribute('id', 'bpc_done');
  div_bpc_new.setAttribute('style', 'display: none;');
  let insertAfter = (document.body || document.head || document.documentElement);
  insertAfter.appendChild(div_bpc_new);
}

function matchDomain(domains, hostname = window.location.hostname) {
  let matched_domain = false;
  if (typeof domains === 'string')
    domains = [domains];
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
  return matched_domain;
}

function urlHost(url) {
  if (/^http/.test(url)) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      console.log(`url not valid: ${url} error: ${e}`);
    }
  }
  return url;
}

function matchUrlDomain(domains, url) {
  return matchDomain(domains, urlHost(url));
}

function replaceDomElementExt(url, proxy, base64, selector, text_fail = '', selector_source = selector) {
  if (proxy) {
    if (!text_fail) {
      if (url.includes('webcache.googleusercontent.com'))
        text_fail = 'BPC > failed to load from Google webcache: '
    }
    ext_api.runtime.sendMessage({request: 'getExtSrc', data: {url: url, selector: selector, selector_source: selector_source, base64: base64, text_fail: text_fail}});
  } else {
    let options = {};
    if (matchUrlDomain('espn.com', url))
      options.headers = {
        'X-Forwarded-For': randomIP(185, 185)
      };
    fetch(url, options)
    .then(response => {
      let article = document.querySelector(selector);
      if (response.ok) {
        response.text().then(html => {
          replaceDomElementExtSrc(url, html, false, base64, selector, text_fail, selector_source);
        });
      } else {
        replaceTextFail(url, article, proxy, text_fail);
      }
    }).catch(function (err) {
      false;
    });
  }
}

function replaceDomElementExtSrc(url, html, proxy, base64, selector, text_fail = '', selector_source = selector) {
  let article = document.querySelector(selector);
  if (html) {
    if (base64) {
      html = decode_utf8(atob(html));
      selector_source = 'body';
    }
    let parser = new DOMParser();
    window.setTimeout(function () {
      let doc = parser.parseFromString(DOMPurify.sanitize(html, {ADD_ATTR: ['layout', 'itemprop'], ADD_TAGS: ['amp-img', 'iframe']}), 'text/html');
      //console.log(DOMPurify.removed);
      let article_new = doc.querySelector(selector_source);
      if (article_new) {
        if (article && article.parentNode)
          article.parentNode.replaceChild(article_new, article);
      }
    }, 200);
  } else {
    replaceTextFail(url, article, proxy, text_fail);
  }
}

function replaceTextFail(url, article, proxy, text_fail) {
  if (text_fail && article) {
    let text_fail_div = document.createElement('div');
    text_fail_div.setAttribute('style', 'margin: 0px 50px; font-weight: bold; color: red;');
    text_fail_div.appendChild(document.createTextNode(text_fail));
    if (proxy) {
      let a_link = document.createElement('a');
      a_link.innerText = url;
      a_link.href = url;
      a_link.target = '_blank';
      text_fail_div.appendChild(a_link);
    }
    article.firstChild.before(text_fail_div);
  }
}

function amp_iframes_replace(weblink = false, source = '') {
  let amp_iframes = document.querySelectorAll('amp-iframe' + (source ? '[src*="'+ source + '"]' : ''));
  let par, elem;
  for (let amp_iframe of amp_iframes) {
    if (!weblink) {
      elem = document.createElement('iframe');
      Object.assign(elem, {
        src: amp_iframe.getAttribute('src'),
        sandbox: amp_iframe.getAttribute('sandbox'),
        height: amp_iframe.getAttribute('height'),
        width: 'auto',
        style: 'border: 0px;'
      });
      amp_iframe.parentNode.replaceChild(elem, amp_iframe);
    } else {
      par = document.createElement('p');
      elem = document.createElement('a');
      elem.innerText = 'Media-link';
      elem.setAttribute('href', amp_iframe.getAttribute('src'));
      elem.setAttribute('target', '_blank');
      par.appendChild(elem);
      amp_iframe.parentNode.replaceChild(par, amp_iframe);
    }
  }
}

function amp_unhide_subscr_section(amp_ads_sel = 'amp-ad, .ad', replace_iframes = true, amp_iframe_link = false, source = '') {
  let preview = document.querySelectorAll('[subscriptions-section="content-not-granted"]');
  removeDOMElement(...preview);
  let subscr_section = document.querySelectorAll('[subscriptions-section="content"]');
  for (let elem of subscr_section)
    elem.removeAttribute('subscriptions-section');
  let amp_ads = document.querySelectorAll(amp_ads_sel);
  removeDOMElement(...amp_ads);
  if (replace_iframes)
    amp_iframes_replace(amp_iframe_link, source);
}

function amp_unhide_access_hide(amp_access = '', amp_access_not = '', amp_ads_sel = 'amp-ad, .ad', replace_iframes = true, amp_iframe_link = false, source = '') {
  let access_hide = document.querySelectorAll('[amp-access' + amp_access + '][amp-access-hide]:not([amp-access="error"], [amp-access^="message"], .piano)');
  for (let elem of access_hide)
    elem.removeAttribute('amp-access-hide');
  if (amp_access_not) {
    let amp_access_not_dom = document.querySelectorAll('[amp-access' + amp_access_not + ']');
    removeDOMElement(...amp_access_not_dom);
  }
  let amp_ads = document.querySelectorAll(amp_ads_sel);
  removeDOMElement(...amp_ads);
  if (replace_iframes)
    amp_iframes_replace(amp_iframe_link, source);
}

function ampToHtml() {
  window.setTimeout(function () {
    let canonical = document.querySelector('link[rel="canonical"]');
    window.location.href = canonical.href;
  }, 1000);
}

function refreshCurrentTab() {
  ext_api.runtime.sendMessage({request: 'refreshCurrentTab'});
}

function archiveLink(url, text_fail = 'BPC > Try for full article text (only report issue if not working for over a week):\r\n') {
  return externalLink(['archive.today', 'archive.is'], 'https://{domain}?run=1&url={url}', url, text_fail);
}

function googleWebcacheLink(url, text_fail = 'BPC > Full article text:\r\n') {
  return externalLink(['webcache.googleusercontent.com'], 'https://{domain}/search?q=cache:{url}', url, text_fail);
}

function ext_12ftLink(url, text_fail = 'BPC > Full article text:\r\n') {
  return externalLink(['12ft.io'], 'https://{domain}/{url}', url, text_fail);
}

function externalLink(domains, ext_url_templ, url, text_fail = 'BPC > Full article text:\r\n') {
  let text_fail_div = document.createElement('div');
  text_fail_div.id = 'bpc_archive';
  text_fail_div.setAttribute('style', 'margin: 20px; font-weight: bold; color: red;');
  let parser = new DOMParser();
  text_fail = text_fail.replace(/\[([^\]]+)\]/g, "<a href='$1' target='_blank' style='color: red'>$1</a>");
  let doc = parser.parseFromString('<span>' + text_fail + '</span>', 'text/html');
  let elem = doc.querySelector('span');
  text_fail_div.appendChild(elem);
  for (let domain of domains) {
    let ext_url = ext_url_templ.replace('{domain}', domain).replace('{url}', url.split('?')[0]);
    let a_link = document.createElement('a');
    a_link.innerText = domain;
    a_link.href = ext_url;
    a_link.target = '_blank';
    text_fail_div.appendChild(document.createTextNode(' | '));
    text_fail_div.appendChild(a_link);
  }
  return text_fail_div;
}

function removeClassesByPrefix(el, prefix) {
  let el_classes = el.classList;
  for (let el_class of el_classes) {
    if (el_class.startsWith(prefix))
      el_classes.remove(el_class);
  }
}

function removeClassesList(list) {
  for (let class_item of list) {
    let elems = document.querySelectorAll('.' + class_item);
    for (let elem of elems)
      elem.classList.remove(class_item);
  }
}

function cookieExists(name) {
  return document.cookie.split(';').some(function (item) {
    return item.trim().indexOf(name + '=') === 0
  })
}

function setCookie(name, value, domain, path, days) {
  let max_age = days * 24 * 60 * 60;
  document.cookie = name + "=" + (value || "") + "; domain=" + domain + "; path=" + path + "; max-age=" + max_age;
}

function insert_script(func, insertAfterDom) {
  let bpc_script = document.querySelector('script#bpc_script');
  if (!bpc_script) {
    let script = document.createElement('script');
    script.setAttribute('id', 'bpc_script');
    script.appendChild(document.createTextNode('(' + func + ')();'));
    let insertAfter = insertAfterDom ? insertAfterDom : (document.body || document.head || document.documentElement);
    insertAfter.appendChild(script);
  }
}

function getArticleJsonScript() {
  let scripts = document.querySelectorAll('script[type="application/ld+json"]');
  let json_script;
  for (let script of scripts) {
    if (script.innerText.match(/"(articlebody|text)":/i)) {
      json_script = script;
      break;
    }
  }
  return json_script;
}

function findKeyJson(json, keys, min_val_len = 0) {
  let source;
  if (Array.isArray(json)) {
    for (let elem of json)
      source = source || findKeyJson(json[elem], keys, min_val_len);
  } else if (typeof json === 'object') {
    for (let elem in json) {
      let json_elem = json[elem];
      if (typeof json_elem === 'string' && keys.includes(elem)) {
        if (json_elem.length > min_val_len)
          return json_elem;
      } else
        source = source || findKeyJson(json_elem, keys, min_val_len);
    }
  }
  return source;
}

function genHexString(len) {
  let output = '';
  for (let i = 0; i < len; i++)
    output += (Math.floor(Math.random() * 16)).toString(16);
  return output;
}

function makeRandomNumber(len) {
  let result = '';
  let characters = '123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < len; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIP(range_low = 0, range_high = 223) {
  let rndmIP = [];
  for (let n = 0; n < 4; n++) {
    if (n === 0)
      rndmIP.push(range_low + randomInt(range_high - range_low + 1));
    else
      rndmIP.push(randomInt(255) + 1);
  }
  return rndmIP.join('.');
}

function pageContains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function breakText(str) {
  str = str.replace(/(?:^|[A-Za-z\"\“\)])(\.|\?|!)(?=[A-ZÖÜ\„\d][A-Za-zÀ-ÿ\„\d]{1,})/gm, "$&\n\n");
  str = str.replace(/(([a-z]{2,}|[\"\“]))(?=[A-Z](?=[A-Za-zÀ-ÿ]+))/gm, "$&\n\n");
  // exceptions: names with alternating lower/uppercase (no general fix)
  let str_rep_arr = ['AstraZeneca', 'BaFin', 'BerlHG', 'BfArM', 'BilMoG', 'BioNTech', 'DiGA', 'EuGH', 'FinTechRat', 'GlaxoSmithKline', 'IfSG', 'medRxiv', 'mmHg', 'PlosOne', 'StVO'];
  let str_rep_split,
  str_rep_src;
  for (let str_rep of str_rep_arr) {
    str_rep_split = str_rep.split(/([a-z]+)(?=[A-Z](?=[A-Za-z]+))/);
    str_rep_src = str_rep_split.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue + ((currentValue !== currentValue.toUpperCase()) ? '\n\n' : '');
      });
    if (str_rep_src.endsWith('\n\n'))
      str_rep_src = str_rep_src.slice(0, -2);
    str = str.replace(new RegExp(str_rep_src, "g"), str_rep);
  }
  str = str.replace(/De\n\n([A-Z])/g, "De$1");
  str = str.replace(/La\n\n([A-Z])/g, "La$1");
  str = str.replace(/Le\n\n([A-Z])/g, "Le$1");
  str = str.replace(/Mc\n\n([A-Z])/g, "Mc$1");
  return str;
};

function parseHtmlEntities(encodedString) {
  let parser = new DOMParser();
  let doc = parser.parseFromString('<textarea>' + encodedString + '</textarea>', 'text/html');
  let dom = doc.querySelector('textarea');
  return dom.value;
}

function encode_utf8(str) {
  return unescape(encodeURIComponent(str));
}

function decode_utf8(str) {
  return decodeURIComponent(escape(str));
}
