//"use strict";
var ext_api = (typeof browser === 'object') ? browser : chrome;
var mobile = window.navigator.userAgent.toLowerCase().includes('mobile');
var domain;
var csDone;
var csDoneOnce;
var dompurify_loaded = (typeof DOMPurify === 'function');
var dompurify_options = {ADD_TAGS: ['amp-img', 'iframe', 'list'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'itemprop', 'layout', 'target']};

var ar_grupo_clarin_domains = ['clarin.com', 'lavoz.com.ar', 'losandes.com.ar'];
var be_groupe_ipm_domains = ['dhnet.be', 'lalibre.be', 'lavenir.net'];
var be_roularta_domains = ['artsenkrant.com', 'beleggersbelangen.nl', 'femmesdaujourdhui.be', 'flair.be', 'knack.be', 'kw.be', 'levif.be', 'libelle.be'];
var ca_gcm_domains = ['lesoleil.com'].concat(['latribune.ca', 'lavoixdelest.ca', 'ledroit.com', 'ledroitfranco.com', 'lenouvelliste.ca', 'lequotidien.com']);
var ca_torstar_domains = ['niagarafallsreview.ca', 'stcatharinesstandard.ca', 'thepeterboroughexaminer.com', 'therecord.com', 'thespec.com', 'thestar.com', 'wellandtribune.ca'];
var de_funke_medien_domains = ['abendblatt.de', 'ikz-online.de', 'nrz.de', 'otz.de', 'thueringer-allgemeine.de', 'tlz.de', 'waz.de', 'wp.de', 'wr.de'];
var de_lv_domains = ['profi.de', 'topagrar.at', 'topagrar.com', 'wochenblatt.com'];
var de_madsack_domains = ['haz.de', 'kn-online.de', 'ln-online.de', 'lvz.de', 'maz-online.de', 'neuepresse.de', 'ostsee-zeitung.de', 'rnd.de'];
var de_mhs_custom_domains = ['cannstatter-zeitung.de', 'esslinger-zeitung.de', 'frankenpost.de', 'insuedthueringen.de', 'krzbb.de', 'kurier.de', 'np-coburg.de'];
var de_vrm_domains = ['allgemeine-zeitung.de', 'echo-online.de', 'wiesbadener-kurier.de'];
var de_vrm_custom_domains = ['buerstaedter-zeitung.de', 'hochheimer-zeitung.de', 'lampertheimer-zeitung.de', 'lauterbacher-anzeiger.de', 'main-spitze.de', 'mittelhessen.de', 'oberhessische-zeitung.de', 'wormser-zeitung.de'];
var de_westfalen_medien_domains = ['muensterschezeitung.de', 'westfalen-blatt.de', 'wn.de'];
var es_epiberica_domains = ['diariodemallorca.es', 'eldia.es', 'elperiodico.com', 'epe.es', 'farodevigo.es', 'informacion.es', 'laprovincia.es', 'levante-emv.com', 'lne.es', 'mallorcazeitung.es'];
var es_epiberica_custom_domains = ['diaridegirona.cat', 'diariocordoba.com', 'diariodeibiza.es', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'laopinioncoruna.es', 'laopiniondemalaga.es', 'laopiniondemurcia.es', 'laopiniondezamora.es', 'regio7.cat'];
var es_grupo_vocento_domains = ['abc.es', 'diariosur.es', 'diariovasco.com', 'elcomercio.es', 'elcorreo.com', 'eldiariomontanes.es', 'elnortedecastilla.es', 'hoy.es', 'ideal.es', 'larioja.com', 'lasprovincias.es', 'laverdad.es', 'lavozdigital.es'];
var es_unidad_domains = ['elmundo.es', 'expansion.com', 'marca.com'];
var fr_be_groupe_rossel = ['aisnenouvelle.fr', 'courrier-picard.fr', 'lardennais.fr', 'lavoixdunord.fr', 'lesoir.be', 'lest-eclair.fr', 'liberation-champagne.fr', 'lunion.fr', 'nordlittoral.fr', 'paris-normandie.fr', 'sudinfo.be'];
var fr_groupe_la_depeche_domains = ['centrepresseaveyron.fr', 'ladepeche.fr', 'lindependant.fr', 'midilibre.fr', 'nrpyrenees.fr', 'petitbleu.fr', 'rugbyrama.fr'];
var fr_groupe_nice_matin_domains = ['monacomatin.mc', 'nicematin.com', 'varmatin.com'];
var it_ilmessaggero_domains = ['corriereadriatico.it', 'ilgazzettino.it', 'ilmattino.it', 'ilmessaggero.it', 'quotidianodipuglia.it'];
var it_gedi_domains = ['ilsecoloxix.it', 'italian.tech', 'lastampa.it', 'lescienze.it', 'moda.it', 'repubblica.it'];
var it_quotidiano_domains = ['ilgiorno.it', 'ilrestodelcarlino.it', 'iltelegrafolivorno.it', 'lanazione.it', 'quotidiano.net'];
var medium_custom_domains = ['betterprogramming.pub', 'towardsdatascience.com'];
var nl_dpg_adr_domains = ['ad.nl', 'bd.nl', 'bndestem.nl', 'destentor.nl', 'ed.nl', 'gelderlander.nl', 'pzc.nl', 'tubantia.nl'];
var nl_dpg_media_domains = ['demorgen.be', 'flair.nl', 'humo.be', 'libelle.nl', 'margriet.nl', 'parool.nl', 'trouw.nl', 'volkskrant.nl'];
var no_nhst_media_domains = ['europower.no', 'fiskeribladet.no', 'intrafish.com', 'intrafish.no', 'rechargenews.com', 'tradewindsnews.com', 'upstreamonline.com'];
var pe_grupo_elcomercio_domains = ['diariocorreo.pe', 'elcomercio.pe', 'gestion.pe'];
var timesofindia_domains = ['timesofindia.com', 'timesofindia.indiatimes.com'];
var uk_incisive_media_domains = ['businessgreen.com', 'internationalinvestment.net', 'investmentweek.co.uk', 'professionaladviser.com', 'professionalpensions.com'];
var uk_nat_world_domains = ['scotsman.com', 'yorkshirepost.co.uk'];
var usa_adv_local_domains = ['al.com', 'cleveland.com', 'lehighvalleylive.com', 'masslive.com', 'mlive.com', 'nj.com', 'oregonlive.com', 'pennlive.com', 'silive.com', 'syracuse.com'];
var usa_arizent_custom_domains = ['accountingtoday.com', 'benefitnews.com', 'bondbuyer.com', 'dig-in.com', 'financial-planning.com', 'nationalmortgagenews.com'];
var usa_conde_nast_domains = ['architecturaldigest.com', 'bonappetit.com', 'cntraveler.com', 'epicurious.com', 'gq.com' , 'newyorker.com', 'vanityfair.com', 'vogue.com', 'wired.com'];
var usa_craincomm_domains = ['360dx.com', 'adage.com', 'autonews.com', 'chicagobusiness.com', 'crainscleveland.com', 'crainsdetroit.com', 'crainsnewyork.com', 'european-rubber-journal.com', 'genomeweb.com', 'modernhealthcare.com', 'pionline.com', 'plasticsnews.com', 'precisionmedicineonline.com', 'rubbernews.com', 'sustainableplastics.com', 'tirebusiness.com', 'utech-polyurethane.com'];
var usa_gannett_domains = ['azcentral.com', 'cincinnati.com', 'commercialappeal.com', 'courier-journal.com', 'democratandchronicle.com', 'detroitnews.com', 'freep.com', 'indystar.com', 'jsonline.com', 'knoxnews.com', 'news-press.com', 'northjersey.com', 'oklahoman.com', 'statesman.com', 'tennessean.com'];
var usa_hearst_comm_domains = ['ctpost.com', 'expressnews.com', 'houstonchronicle.com', 'nhregister.com', 'sfchronicle.com', 'timesunion.com'];
var usa_lee_ent_domains = ['buffalonews.com', 'journalnow.com', 'journalstar.com', 'madison.com', 'nwitimes.com', 'omaha.com', 'richmond.com', 'stltoday.com', 'tucson.com', 'tulsaworld.com'];
var usa_mcc_domains = ['bnd.com', 'charlotteobserver.com', 'fresnobee.com', 'kansas.com', 'kansascity.com', 'kentucky.com', 'mcclatchydc.com', 'miamiherald.com', 'newsobserver.com', 'sacbee.com', 'star-telegram.com', 'thestate.com', 'tri-cityherald.com'];
var usa_mng_domains =   ['denverpost.com', 'eastbaytimes.com', 'mercurynews.com', 'ocregister.com', 'pressenterprise.com', 'twincities.com'];
var usa_nymag_domains = ['curbed.com', 'grubstreet.com', 'nymag.com', 'thecut.com', 'vulture.com'];
var usa_outside_mag_domains = ["backpacker.com", "betamtb.com", "betternutrition.com", "cleaneatingmag.com", "climbing.com", "outsideonline.com", "oxygenmag.com", "skimag.com", "trailrunnermag.com", "triathlete.com", "vegetariantimes.com", "womensrunning.com", "yogajournal.com"];
var usa_tribune_domains = ['baltimoresun.com', 'chicagotribune.com', 'courant.com', 'dailypress.com', 'mcall.com', 'nydailynews.com', 'orlandosentinel.com', 'pilotonline.com', 'sun-sentinel.com'];

// clean local storage of sites (with an exemption for hold-list)
var arr_localstorage_hold = ['augsburger-allgemeine.de', 'barrons.com', 'business-standard.com', 'businessinsider.com', 'businessoffashion.com', 'businesspost.ie', 'challenges.fr', 'charliehebdo.fr', 'cmjornal.pt', 'columbian.com', 'corriere.it', 'corrieredellosport.it', 'crikey.com.au', 'cyclingtips.com', 'digiday.com', 'dvhn.nl', 'economictimes.com', 'eldiario.es', 'elespanol.com', 'elle.fr', 'elpais.com', 'elperiodico.com', 'enotes.com', 'estadao.com.br', 'forbes.com', 'fortune.com', 'freiepresse.de', 'gauchazh.clicrbs.com.br', 'globo.com', 'ilfoglio.it', 'inc42.com', 'indianexpress.com', 'indiatoday.in', 'inews.co.uk', 'janes.com', 'jazziz.com', 'ksta.de', 'kurier.at', 'lanouvellerepublique.fr', 'latimes.com', 'lc.nl', 'lesechos.fr', 'livemint.com', 'mid-day.com', 'mundodeportivo.com', 'nationalreview.com', 'nrc.nl', 'nw.de', 'nytimes.com', 'nzherald.co.nz', 'record.pt', 'ruhrnachrichten.de', 'rundschau-online.de', 'sandiegouniontribune.com', 'scmp.com', 'seekingalpha.com', 'techinasia.com', 'telegraph.co.uk', 'tes.com', 'the-tls.co.uk', 'theatlantic.com', 'thebulletin.org', 'thecritic.co.uk', 'thetimes.co.uk', 'theweek.com', 'tt.com', 'tuttosport.com', 'uol.com.br', 'vol.at', 'weser-kurier.de', 'wsj.com'].concat(be_roularta_domains, ca_gcm_domains, ca_torstar_domains, de_funke_medien_domains, de_lv_domains, de_vrm_domains, de_vrm_custom_domains, de_westfalen_medien_domains, es_epiberica_domains, es_epiberica_custom_domains, es_grupo_vocento_domains, es_unidad_domains, fr_groupe_la_depeche_domains, fr_groupe_nice_matin_domains, it_gedi_domains, it_quotidiano_domains, nl_dpg_media_domains, no_nhst_media_domains, timesofindia_domains, usa_hearst_comm_domains, usa_mcc_domains);
if (!matchDomain(arr_localstorage_hold)) {
  window.localStorage.clear();
}

function runOnMessage(bg2csData, dompurify_loaded) {
// custom/updated sites: load text from json (script[type="application/ld+json"])
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
              json = json.filter(x => Object.keys(x).find(key => key.match(/^articlebody$/i))) || json.filter(x => Object.keys(x).find(key => key.match(/^text$/i)));
              if (json[0]) {
                json_key = Object.keys(json[0]).find(key => key.match(/^(articlebody|text)$/i));
                if (json_key)
                  json_text = parseHtmlEntities(json[0][json_key]);
              }
            } else {
              json_key = Object.keys(json).find(key => key.match(/^articlebody$/i)) || Object.keys(json).find(key => key.match(/^text$/i));
              json_text = parseHtmlEntities(json[json_key]);
            }
            if (json_text) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div style="margin: 25px 0px">' + DOMPurify.sanitize(breakText(json_text).replace(/\n\n/g, '<br><br>'), dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                article.innerHTML = '';
                article.appendChild(article_new);
              } else if (article.parentNode)
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

// custom/updated sites: load text from json (script#__NEXT_DATA__)
if (bg2csData.ld_json_next && dompurify_loaded) {
  if (bg2csData.ld_json_next.includes('|')) {
    window.setTimeout(function () {
      let ld_json_next_split = bg2csData.ld_json_next.split('|');
      let paywall_sel = ld_json_next_split[0];
      let article_sel = ld_json_next_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      let article_append = ld_json_next_split[2]; // optional
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = document.querySelector('script#__NEXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            let url_next = findKeyJson(json, ['slug']);
            if (url_next && !window.location.pathname.endsWith(url_next))
              refreshCurrentTab();
            let json_text = parseHtmlEntities(findKeyJson(json, ['body', 'content', 'description'], 500));
            if (json_text) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                article.innerHTML = '';
                article.appendChild(article_new);
              } else if (article.parentNode)
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

// custom/updated sites: load text from json (link[rel="alternate"][type="application/json"][href])
if (bg2csData.ld_json_url && dompurify_loaded) {
  if (bg2csData.ld_json_url.includes('|')) {
    window.setTimeout(function () {
      let ld_json_url_split = bg2csData.ld_json_url.split('|');
      let paywall_sel = ld_json_url_split[0];
      let article_sel = ld_json_url_split[1];
      let article_append = ld_json_url_split[2]; // optional
      let article_hold = ld_json_url_split[3]; // optional
      getJsonUrl(paywall_sel, '', article_sel, {art_append: article_append, art_hold: article_hold, art_style: 'margin: 25px 0px;'});
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
        if (document.querySelector('head > link[rel="next"]'))
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
          case '1ft.io':
            article.firstChild.before(nftLink(url));
            break;
          case 'google_webcache':
            article.firstChild.before(googleWebcacheLink(url));
            break;
          case 'google_search_tool':
            article.firstChild.before(googleSearchToolLink(url));
            break;
          }
        }
      }
    }, 1000);
  }
}

// check for opt-in confirmation (from background.js)
if (bg2csData.optin_setcookie) {
  false;
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
    let amphtml = document.querySelector('head > link[rel="amphtml"]');
    let amp_page = amp_script && !amphtml;
    if (!amp_page) {
      amp_redirect(bg2csData.amp_redirect);
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
    if (elem.rm_elem_wait)
      waitDOMElement(elem.cond, elem.cond.match(/^\w+/)[0], removeDOMElement, true);
  }
}

// custom/updated sites: cs_code
if (bg2csData.cs_code) {
  window.setTimeout(function () {
    cs_code_elems(bg2csData.cs_code);
  }, 1000);
}

}// runOnMessage

var msg_once;
if (ext_api.runtime) {
  ext_api.runtime.onMessage.addListener(
    function (request, sender) {
    if (request.msg === 'bg2cs' && !msg_once) {
      msg_once = true;
      runOnMessage(request.data, dompurify_loaded);
    }
  })
}

window.addEventListener('message', function (event) {
  if (event.data) {
    if (event.data.type === 'from_page') {
      if (domain = matchDomain(['businesspost.ie', 'lepoint.fr'])) {
        let article_options = {
          'businesspost.ie': 'div.article-body-section',
          'lepoint.fr': 'div#contenu'
        };
        let article_sel = article_options[domain];
        let data = event.data.data;
        let article = document.querySelector(article_sel);
        if (data && article && dompurify_loaded && !msg_once) {
          msg_once = true;
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(data, dompurify_options) + '</div>', 'text/html');
          let article_new = doc.querySelector('div');
          if (article_new) {
            article.innerHTML = '';
            article.appendChild(article_new);
          }
        }
      }
    }
  }
}, false);

if (!(csDone || csDoneOnce)) {

var msg_once_ses;
if (ext_api.runtime) {
  ext_api.runtime.onMessage.addListener(
    function (request, sender) {
    if (request.msg === 'showExtSrc' && !msg_once_ses) {
      msg_once_ses = true;
      replaceDomElementExtSrc(request.data.url, request.data.url_src, request.data.html, true, false, request.data.selector, request.data.text_fail, request.data.selector_source, request.data.selector_archive);
    }
  })
}

// Content workarounds/domain

if (matchDomain('medium.com') || matchDomain(medium_custom_domains) || (!matchDomain('webcache.googleusercontent.com') && document.querySelector('script[src*=".medium.com/"]'))) {
  let url = window.location.href;
  let paywall = document.querySelector('article.meteredContent');
  if (paywall) {
    paywall.removeAttribute('class');
    paywall.firstChild.before(freediumLink(url));
    paywall.firstChild.before(googleWebcacheLink(url, 'BPC > Try for full article text (articles before 2023-12-10)'));
  }
  window.setTimeout(function () {
    let banner = pageContains('div > div > p', /author made this story available to/);
    if (banner.length)
      removeDOMElement(banner[0].parentNode.parentNode);
  }, 1000);
}

else if (window.location.hostname.match(/\.(com|net)\.au$/)) {//australia

if (matchDomain('crikey.com.au')) {
  let ads = document.querySelectorAll('.advert');
  hideDOMElement(...ads);
}

else if (matchDomain('macrobusiness.com.au')) {
  let paywall = pageContains('div > p', 'The full text of this article is available');
  if (paywall[0] && dompurify_loaded) {
    let fade = document.querySelector('div.bg-gradient-to-t');
    removeDOMElement(paywall[0].parentNode, fade);
    let json_script = document.querySelector('script#__NUXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let json_text = json.filter(x => typeof x === 'string' && x.match(/(<|\\u003C)p>/))[0];
        let parser = new DOMParser();
        let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
        let content_new = doc.querySelector('div');
        let article = document.querySelector('div.content');
        if (article) {
          article.innerHTML = '';
          article.appendChild(content_new);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('thesaturdaypaper.com.au')) {
  let hide_end = document.querySelector('div.hide-end');
  if (hide_end) {
    refreshCurrentTab_bg();
    csDoneOnce = true;
  }
  let paywall = document.querySelector('div.paywall-hard-always-show');
  removeDOMElement(paywall);
}

else if (matchDomain(['brisbanetimes.com.au', 'smh.com.au', 'theage.com.au', 'watoday.com.au'])) {
  if (!window.location.hostname.startsWith('amp.')) {
    amp_redirect('head > meta[content^="FOR SUBSCRIBERS"], #paywall_prompt');
  } else {
    amp_unhide_subscr_section();
  }
}

else {
  // Australian Community Media newspapers
  let au_comm_media_domains = ['bendigoadvertiser.com.au', 'bordermail.com.au', 'canberratimes.com.au', 'centralwesterndaily.com.au', 'dailyadvertiser.com.au', 'dailyliberal.com.au', 'examiner.com.au', 'illawarramercury.com.au', 'newcastleherald.com.au', 'northerndailyleader.com.au', 'standard.net.au', 'theadvocate.com.au', 'thecourier.com.au', 'westernadvocate.com.au'];
  let au_comm_media_link = document.querySelector('a[href^="https://austcommunitymedia.my.site.com/"]');
  if (matchDomain(au_comm_media_domains) || au_comm_media_link) {
    let mask = document.querySelector('div[class^="gradient-mask-"]');
    if (mask) {
      mask.removeAttribute('class');
      let div_hidden = document.querySelectorAll('div.flex-col div.hidden');
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
    hideDOMElement(story_generic_iframe, blocker, ...overlays, ...ads);
  } else if (window.location.hostname.endsWith('.com.au')) {
    // Australia News Corp
    let au_news_corp_domains = ['adelaidenow.com.au', 'cairnspost.com.au', 'couriermail.com.au', 'dailytelegraph.com.au', 'geelongadvertiser.com.au', 'goldcoastbulletin.com.au', 'heraldsun.com.au', 'ntnews.com.au', 'theaustralian.com.au', 'thechronicle.com.au', 'themercury.com.au', 'townsvillebulletin.com.au', 'weeklytimesnow.com.au'];
    if (matchDomain(au_news_corp_domains)) {
      if (window.location.search.match(/[&\?]amp/)) {
        amp_unhide_subscr_section('amp-ad, amp-embed, [id^="ad-mrec-"], [class*="ad-container"]', false);
        let figure_stretch = document.querySelectorAll('figure.stretch');
        for (let elem of figure_stretch)
          elem.classList.remove('stretch');
        let comments = document.querySelector('#comments-load, .comments-module');
        removeDOMElement(comments);
      } else {
        let ads = document.querySelectorAll('.header_ads-container, .ad-block, .ad-container');
        hideDOMElement(...ads);
      }
    } else {
      // Australian Seven West Media
      if (matchDomain('thewest.com.au') || document.querySelector('li > a[href*=".sevenwestmedia.com.au"]')) {
        function thewest_main(node) {
          let scripts = document.querySelectorAll('script:not([src]):not([type])');
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
                refreshCurrentTab();
              //let json_video = json_pub.mainVideo;
              let url = window.location.href;
              if (!url_loaded || !url.includes(url_loaded.slice(-10)))
                refreshCurrentTab();
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
                node.before(par_dom);
              }
            } catch (err) {
              console.log(err);
            }
          }
          removeDOMElement(node);
        }
        let paywall_sel = 'div.paywall div[data-testid*="BreachScreen"], div[class*="StyledBreachWallContent"]';
        let paywall = document.querySelector(paywall_sel);
        if (paywall)
          thewest_main(paywall);
        else {
          csDoneOnce = true;
          waitDOMElement(paywall_sel, 'DIV', thewest_main, false);
        }
        let header_advert = document.querySelector('div.headerAdvertisement');
        hideDOMElement(header_advert);
      } else
        csDone = true;
    }
  } else
      csDone = true;
}

} else if (window.location.hostname.match(/\.(de|at|ch)$/) || matchDomain(['diepresse.com', 'faz.net', 'topagrar.com', 'tt.com', 'wochenblatt.com'])) {//germany/austria/switzerland - ch

if (matchDomain('aerztezeitung.de')) {
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

else if (matchDomain(['arcinfo.ch', 'lacote.ch', 'lenouvelliste.ch'])) {// Groupe ESH Médias
  let paywall = document.querySelector('section#paywall-articles');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let url_id = window.location.pathname.match(/\d+$/).pop();
    let html = document.documentElement.outerHTML;
    let og_url = document.querySelector('head > meta[name="og:url"][content]');
    if (og_url && !og_url.content.endsWith(url_id))
      refreshCurrentTab();
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
        refreshCurrentTab();
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
  let banners = document.querySelectorAll('div.piano-article');
  hideDOMElement(...banners);
}

else if (matchDomain('automobilwoche.de')) {
  let body_hidden = document.querySelector('body[class]');
  if (body_hidden)
    body_hidden.removeAttribute('class');
  let lazy_images = document.querySelectorAll('img.lazy[data-src]');
  for (let elem of lazy_images) {
    elem.src = elem.getAttribute('data-src');
    elem.removeAttribute('class');
  }
  let lazy_sources = document.querySelectorAll('source[srcset^="data:image"]');
  removeDOMElement(...lazy_sources);
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
          let url_id = json_script.text.includes('"gcid":"') ? json_script.text.split('"gcid":"')[1].split('"')[0] : '';
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
              let par_elem = pars[par];
              let elem = document.createElement('div');
              elem.style = 'font-size: 1.7rem; margin: 25px;';
              let sub_elem = '';
              if (par_elem.__typename === 'TextParagraph' && par_elem.text) {
                let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(par_elem.text) + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
              } else if (par_elem.__typename === 'EmbedParagraph' && par_elem.embedCode) {
                let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(par_elem.embedCode, dompurify_options) + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
                let iframe = sub_elem.querySelector('iframe[width]');
                if (iframe) {
                  let ratio = iframe.width / 640;
                  if (mobile)
                    ratio = iframe.width / 320;
                  iframe.width = iframe.width / ratio;
                  iframe.height = iframe.height / ratio;
                }
              } else if (par_elem.__typename === 'ImageFile') {
                if (par_elem.origin) {
                  sub_elem = document.createElement('img');
                  sub_elem.src = par_elem.origin;
                  sub_elem.alt = par_elem.alt;
                  if (par_elem.width) {
                    let ratio = par_elem.width / 640;
                    if (mobile)
                      ratio = par_elem.width / 320;
                    sub_elem.width = par_elem.width / ratio;
                    sub_elem.height = par_elem.height / ratio;
                  }
                }
              } else if (par_elem.__typename === 'Image') {
                if (par_elem.credit) {
                  sub_elem = document.createElement('p');
                  sub_elem.appendChild(document.createTextNode(par_elem.credit));
                }
              } else if (par_elem.__typename === 'ImageParagraph') {
                if (par_elem.caption) {
                  let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(par_elem.caption) + '</div>', 'text/html');
                  sub_elem = content_new.querySelector('div');
                }
              } else if (!['Article', 'Author', 'Channel', 'LandingPage', 'Query'].includes(par_elem.__typename)) {
                console.log(par_elem);
              }
              if (sub_elem) {
                elem.appendChild(sub_elem);
                article.appendChild(elem);
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
    let ads = document.querySelectorAll('[class^="traffective_"], [class^="article_billboard-"], [class^="outbrain_container"]');
    hideDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('bild.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.offer-module');
  if (paywall) {
    removeDOMElement(paywall);
    getArchive(url, 'article');
  }
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
    removeDOMElement(teasered_content_fader, btn_read_more);
    let amp_ads = document.querySelectorAll('amp-ad');
    hideDOMElement(...amp_ads);
  }
  let urban_ad_sign = document.querySelectorAll('.urban-ad-sign');
  removeDOMElement(...urban_ad_sign);
}

else if (matchDomain('diepresse.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.premium-content');
    if (article) {
      article.removeAttribute('class');
      let scripts = document.querySelectorAll('script:not([src]):not([type])');
      let json_script;
      for (let script of scripts) {
        if (script.text.match(/window\.contentInformation\s?=\s?/)) {
          json_script = script;
          break;
        }
      }
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text.split(/window\.contentInformation\s?=\s?/)[1].split('};')[0] + '}');
          if (json.flexmodule_list) {
            let pars = json.flexmodule_list;
            let par_first = false;
            let split = false;
            let parser = new DOMParser();
            for (let par of pars) {
              if (split) {
                if (par) {
                  let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par) + '</div>', 'text/html');
                  let content_new = doc.querySelector('div');
                  article.appendChild(content_new);
                }
              } else {
                if (par)
                  par_first = true;
                else if (!par && par_first)
                  split = true;
              }
              let lazy_images = article.querySelectorAll('img.lazyload[data-src]:not([src])');
              for (let elem of lazy_images) {
                elem.removeAttribute('class');
                elem.src = elem.getAttribute('data-src')
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('faz.net')) {
  if (matchDomain('zeitung.faz.net')) {// legacy
    let paywall_z = document.querySelector('div.c-red-carpet');
    if (paywall_z) {
      removeDOMElement(paywall_z);
      let og_url = document.querySelector('head > meta[property="og:url"][content]');
      if (og_url)
        window.location.href = og_url.content;
      else
        header_nofix(document.querySelector('div.article__text'));
    }
    let sticky_advt = document.querySelector('div.sticky-advt');
    removeDOMElement(sticky_advt);
  } else {
    let paywall = document.querySelector('#paywall-form-container-outer, section.atc-ContainerPaywall');
    if (paywall) {
      removeDOMElement(paywall);
      let url_mobile = 'https://m.faz.net' + window.location.pathname;
      try {
        fetch(url_mobile)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              let parser = new DOMParser();
              let doc = parser.parseFromString(html, 'text/html');
              let json_script = doc.querySelector('script[id="schemaOrgJson"]');
              if (json_script) {
                let json_text;
                try {
                  let json = JSON.parse(json_script.text.replace(/(\r|\n)/g, ''));
                  json_text = json.articleBody;
                } catch (err) {
                  console.log(err);
                  return;
                }
                let article_text = document.querySelector('div.art_txt.paywall, div.atc-Text.js-atc-Text');
                if (json_text && article_text) {
                  let pars = article_text.querySelectorAll('p.atc-TextParagraph');
                  removeDOMElement(...pars);
                  json_text = breakText_headers(json_text).split("\n\n");
                  for (let p_text of json_text) {
                    let elem = document.createElement("p");
                    elem.setAttribute('class', 'atc-TextParagraph');
                    if (p_text.length < 80)
                      elem.style = 'font-weight: bold;';
                    elem.innerText = p_text;
                    article_text.appendChild(elem);
                  };
                } else {
                  let json_script = getArticleJsonScript();
                  if (json_script) {
                    let json = JSON.parse(json_script.text);
                    if (json) {
                      let json_text = json.articleBody;
                      let article_text = document.querySelectorAll('div.copy');
                      if (json_text && article_text.length) {
                        for (let elem of article_text)
                          elem.innerText = '';
                        article_text[0].innerText = json_text;
                        let copy_intro = document.querySelector('p.copy--intro');
                        removeDOMElement(copy_intro);
                      }
                    }
                  }
                }
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
    hideDOMElement(lay_paysocial, ...ads);
  }
}

else if (matchDomain('freiepresse.de')) {
  if (window.location.pathname.includes('-artikel')) {
    let url = window.location.href;
    let func_post = function () {
      let lazy_images = document.querySelectorAll('picture.lazy');
      for (let elem of lazy_images) {
        elem.removeAttribute('class');
        let source = elem.querySelector('source[data-srcset]');
        if (source) {
          let img_new = document.createElement('img');
          img_new.src = source.getAttribute('data-srcset').split(' ')[0];
          source.parentNode.replaceChild(img_new, source);
        }
      }
    }
    getGoogleWebcache(url, 'div.article-teaser', '', 'article', func_post);
  }
}

else if (matchDomain('freitag.de')) {
  let paywall = document.querySelector('div.qa-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let related = document.querySelector('div.c-teaser-plus-related--paywall');
    if (related)
      related.classList.remove('c-teaser-plus-related--paywall');
    let article = document.querySelector('div#x-article-text');
    if (article) {
      let intro = article.querySelectorAll('p');
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = breakText_headers(json.articleBody);
          let pars = json_text.split(/\n\n/g);
          if (json_text) {
            removeDOMElement(...intro);
            let article_new = document.createElement('div');
            for (let par of pars) {
              if (!par.startsWith('Placeholder ')) {
                let par_new = document.createElement('p');
                par_new.innerText = par;
                article_new.appendChild(par_new);
              }
            }
            article.appendChild(article_new);
          }
        }
      } else {
        let hidden_article = document.querySelector('div.o-paywall');
        if (hidden_article) {
          let par_first = true;
          let pars = breakText_headers(hidden_article.innerText).split(/\n\n/g);
          for (let par of pars) {
            let par_new = document.createElement('p');
            let overlap = '';
            if (par_first) {
              let intro_last = intro[intro.length - 1];
              par = par.trim();
              overlap = findOverlap(intro_last.innerText, par);
              if (overlap)
                intro_last.innerText = intro_last.innerText.replace(new RegExp(overlap + '$'), '') + par;
              par_first = false;
            }
            if (!overlap) {
              par_new.innerText = par;
              article.appendChild(par_new);
            }
          }
        }
      }
    }
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
  window.setTimeout(function () {
    let paywall = document.querySelector('div.dm-paywall-wrapper');
    if (paywall) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        removeDOMElement(paywall);
        try {
          let json = JSON.parse(json_script.text);
          if (json && json['@graph']) {
            let json_data = json['@graph'].filter(x => x.articleBody)[0];
            let url_json = json_data['@id'];
            if (url_json && !url_json.includes(window.location.pathname))
              refreshCurrentTab();
            let json_text = json_data.articleBody;
            let article = document.querySelector('article');
            if (json_text && article) {
              let article_new = document.createElement('p');
              article_new.setAttribute('class', 'dm-paragraph my-8 dm-article-content-width');
              article_new.innerText = json_text;
              article.appendChild(article_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, 1000);
  let banners = document.querySelectorAll('div.dm-slot, div[id^="taboola-feed"]');
  hideDOMElement(...banners);
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

else if (matchDomain('letemps.ch')) {
  let url = window.location.href;
  let func_post = function () {
    let lazy_images = document.querySelectorAll('img.lazy[src="/placeholder.png"][data-src]');
    for (let elem of lazy_images) {
      elem.src = elem.getAttribute('data-src');
      elem.removeAttribute('class');
    }
    let fade = document.querySelector('div.post__content--faded');
    if (fade)
      fade.classList.remove('post__content--faded');
  }
  getGoogleWebcache(url, 'div.post-subscribe', '', 'div.post-body-wrapper', func_post);
  let ads = document.querySelectorAll('div.topad');
  hideDOMElement(...ads);
}

else if (matchDomain(['mz.de', 'volksstimme.de'])) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.fp-paywall', '', 'div[data-t-name="Article"]');
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
    amp_redirect('div[data-tracking-visible^="paywall-"]');
  } else {
    amp_unhide_access_hide('="loggedIn AND hasAbo"', '', 'amp-ad, amp-embed, .banner');
  }
}

else if (matchDomain('nzz.ch')) {
  let ads = document.querySelectorAll('div.resor');
  hideDOMElement(...ads);
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

else if (matchDomain('profil.at')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    paywall.removeAttribute('style');
    let fade = document.querySelector('div#cfs-paywall-container');
    hideDOMElement(fade);
  }
}

else if (matchDomain('schwaebische.de')) {
  let url = window.location.href;
  let paywall_sel = 'div > div.sve-paywall-wrapper_overlay';
  let paywall = document.querySelector(paywall_sel);
  getGoogleWebcache(url, paywall_sel, '', 'div.article_body');
  if (paywall) {
    removeDOMElement(paywall.parentNode);
    let body = document.querySelector('body[style]');
    if (body)
      body.removeAttribute('style');
    waitDOMAttribute('body', 'body', 'style', node => node.removeAttribute('style'), true);
  }
  window.setTimeout(function () {
    let ads = document.querySelectorAll('div.fp-ad-placeholder');
    hideDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('schweizermonat.ch')) {
  if (dompurify_loaded)
    getJsonUrl('div.entry-paywall-login', '', 'div.entry-main > div.entry__post-content');
}

else if (matchDomain('sn.at')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.article-sections__paywall', '', 'div.article-body-text');
}

else if (matchDomain('spiegel.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div[data-area="paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    getArchive(url, 'div[data-area="body"]');
  }
}

else if (matchDomain('springermedizin.de')) {
  let paywall = document.querySelector('div#pay-wall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('div > p.intro--paragraph');
        if (json_text && article) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          article.parentNode.replaceChild(article_new, article);
        }
      }
    }
  }
}

else if (matchDomain(['stuttgarter-nachrichten.de', 'stuttgarter-zeitung.de']) || matchDomain(de_mhs_custom_domains)) {
  let banners = document.querySelectorAll('div.mod-paywall, div.Billboard');
  hideDOMElement(...banners);
}

else if (matchDomain('sueddeutsche.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#sz-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-content, div.text');
    if (article)
      article.firstChild.before(archiveLink(url));
    let reduced = document.querySelector('p.sz-article-body__paragraph--reduced');
    if (reduced)
      reduced.classList.remove('sz-article-body__paragraph--reduced');
    let ads = document.querySelectorAll('div.ad-container');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('tagesspiegel.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div#paywal, div#pw');
  if (paywall) {
    removeDOMElement(paywall);
    if (matchDomain('www.tagesspiegel.de')) {
      getArchive(url, 'div#story-elements');
    } else if (matchDomain('interaktiv.tagesspiegel.de')) {
      let article = document.querySelector('div.tslr-article > p');
      if (article)
        article.firstChild.before(archiveLink(url));
    }
  }
}

else if (matchDomain('tt.com')) {
  let div_hidden = document.querySelectorAll('.exclusive-elem');
  for (let elem of div_hidden)
    elem.classList.remove('exclusive-elem');
  let ads = document.querySelectorAll('div.ad-container, div[class*="ads-container"], div.adblock-warning');
  hideDOMElement(...ads);
}

else if (matchDomain('vn.at')) {
  if (window.location.href.match(/\.vn\.at\/.+\/\d{4}\//)) {
    let paywall = document.querySelector('div.paywalled-content');
    if (paywall) {
      csDoneOnce = true;
      let par = paywall.querySelector('p');
      if (!par) {
        refreshCurrentTab_bg();
      } else {
        let lazy_images = document.querySelectorAll('img[src^="data:image/"][lazy-src]');
        for (let elem of lazy_images) {
          elem.src = elem.getAttribute('lazy-src');
        }
      }
    } else
      refreshCurrentTab_bg();
  }
}

else if (matchDomain('vol.at')) {
  if (!window.location.pathname.match(/\/amp\/?$/)) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div.vodl-region-article__premium-content');
      if (paywall && dompurify_loaded) {
        paywall.removeAttribute('class');
        if (!paywall.hasChildNodes()) {
          let json_script = document.querySelector('script#externalPostDataNode');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.text);
              let json_text = json.content.data.post.content;
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div class="entry-content">' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              let hidden_images = article_new.querySelectorAll('img[src^="/"][srcset]');
              let json_domain = json.content.data.post.thumbnail.src.match(/https:\/\/(www\.)?\w+\.at/)[0];
              for (let elem of hidden_images) {
                elem.src = elem.src.replace('https://www.vol.at', json_domain);
                elem.removeAttribute('srcset');
              }
              let hidden_comments = document.querySelector('div.vodl-region-article__content[hidden]');
              if (hidden_comments) {
                hidden_comments.removeAttribute('hidden');
                let blurred = hidden_comments.querySelector('div.blur');
                if (blurred)
                  blurred.classList.remove('blur');
              }
              let article = document.querySelector('div.article-body');
              if (article) {
                article.innerHTML = '';
                article.appendChild(article_new);
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }, 500);
    let banners = document.querySelectorAll('div[id^="rm-adslot-"], div[id^="piano_rec"]');
    hideDOMElement(...banners);
  } else
    ampToHtml();
}

else if (matchDomain('welt.de')) {
  let url = window.location.href;
  let paywall = document.querySelector('div.contains_walled_content');
  if (paywall) {
    removeDOMElement(paywall);
    getArchive(url, 'article');
  }
  let ads = document.querySelectorAll('div[data-component="Outbrain"], div[data-component="OEmbedComponent"], div[class*="c-ad"]');
  hideDOMElement(...ads);
}

else if (matchDomain('weser-kurier.de')) {
  let ads = document.querySelectorAll('div.ad-wrapper, div.anyad');
  hideDOMElement(...ads);
}

else if (matchDomain('zeit.de')) {
  let url = window.location.href.split(/[#\?]/)[0];
  let paywall = document.querySelector('aside#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    if (document.querySelector('head > link[rel="next"]'))
      url += '/komplettansicht';
    getArchive(url, 'article');
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
  let ads = document.querySelectorAll('div.adZone');
  hideDOMElement(...ads);
}

else if (matchDomain(de_westfalen_medien_domains)) {
  let url = window.location.href;
  if (url.includes('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed, section[class^="fp-ad"]');
  } else {
    amp_redirect('section.fp-article-paywall');
  }
}

else if (matchDomain(de_funke_medien_domains)) {
  sessionStorage.setItem('deobfuscate', 'true');
}

else if (matchDomain(de_madsack_domains) || document.querySelector('head > link[href*=".rndtech.de/"]')) {
  // plus code in contentScript_once_var.js (timing)
  if (!window.location.search.startsWith('?outputType=valid_amp')) {
    let ads = document.querySelectorAll('div[class^="Adstyled__AdWrapper"]');
    hideDOMElement(...ads);
  } else {
    ampToHtml();
  }
}

else if (matchDomain('ruhrnachrichten.de') || document.querySelector('a.mgw-logo[href^="https://mgw.de"]')) {
  let pathname = window.location.pathname;
  let article_id;
  if (pathname.includes('-p-'))
    article_id = pathname.split('-p-')[1].split('/')[0];
  if (dompurify_loaded)
    getJsonUrl('body.is_plus_article', {rm_class: 'is_plus_article'}, 'article', {art_append: 1, art_hold: 1}, article_id);
  let ads = document.querySelector('div.OUTBRAIN');
  hideDOMElement(ads);
  if (!matchDomain('ruhrnachrichten.de')) {
    window.setTimeout(function () {
      let push = document.querySelector('div.cleverpush-bell');
      removeDOMElement(push);
    }, 1000);
  }
}

else if (matchDomain(de_vrm_domains) || matchDomain(de_vrm_custom_domains)) {
  let ads = document.querySelectorAll('div.adSlot, div.loadingBanner');
  hideDOMElement(...ads);
}

else if (document.querySelector('script[src^="https://assets.static-chmedia.ch/"]')) {// nzz.ch regional/CH Media
  let infobox_body = document.querySelector('div.infobox__body');
  if (infobox_body)
    infobox_body.removeAttribute('class');
  let paywall = document.querySelector('div.dynamic-regwall');
  removeDOMElement(paywall);
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(dk|fi|se)$/)) {//denmark/finland/sweden

if (matchDomain('etc.se')) {
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
  hideDOMElement(...ads);
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

else if (matchDomain('suomensotilas.fi')) {
  let obscured = document.querySelector('div.epfl-pw-obscured');
  if (obscured)
    obscured.classList.remove('epfl-pw-obscured');
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(es|pt|cat)$/) || matchDomain(['diariocordoba.com', 'diariovasco.com', 'elconfidencial.com', 'elcorreo.com', 'elespanol.com', 'elpais.com', 'elperiodico.com', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'expansion.com', 'larioja.com', 'lavanguardia.com', 'levante-emv.com', 'marca.com', 'mundodeportivo.com', 'politicaexterior.com'])) {//spain/portugal

if (matchDomain(['ara.cat', 'arabalears.cat'])) {
  if (!window.location.pathname.endsWith('.amp.html')) {
    amp_redirect('div.paywall');
    let ads = document.querySelectorAll('div.advertising');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(['cmjornal.pt', 'record.pt', 'sabado.pt'])) {
  if (!window.location.pathname.includes('/amp/')) {
    amp_redirect('.bloqueio_exclusivos, .container_assinatura, .bloco_bloqueio');
  } else {
    amp_unhide_access_hide('="subscriber"', '="NOT subscriber"', 'amp-ad, amp-embed, amp-consent, .detalheAds, .exclusivos_bar');
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
  hideDOMElement(...ads);
}

else if (matchDomain('eldiario.es')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('^="access"');
  } else {
    let ads = document.querySelectorAll('.edi-advertising, .header-ad');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('elespanol.com')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let paywall = document.querySelector('div.full-suscriptor-container');
    removeDOMElement(paywall);
    let ads = document.querySelectorAll('[id*="superior"], [class*="adv"]');
    hideDOMElement(...ads);
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
  if (window.location.pathname.endsWith('.amp.html') || window.location.search.match(/(\?|&)outputType=amp/)) {
    amp_unhide_access_hide('="vip"], [amp-access="success"', '="NOT vip"], [amp-access="NOT success"');
  } else {
    let paywall = document.querySelector('div#ctn_freemium_article, div#ctn_premium_article');
    removeDOMElement(paywall);
    let ads = document.querySelectorAll('div.ad');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(es_grupo_vocento_domains)) {
  let paywall_sel = '.voc-paywall, .container-wall-exclusive, .cierre-suscripcion:not([style*="display: none;"])';
  let paywall = document.querySelector(paywall_sel);
  if (!window.location.pathname.endsWith('_amp.html')) {
    if (!matchDomain(['eldiariomontanes.es'])) {
      amp_redirect(paywall_sel, '', window.location.pathname.replace('.html', '_amp.html'));
    }
    let banners = document.querySelectorAll('.voc-advertising, div.ev-em-modal, span.mega-superior, .v-adv');
    hideDOMElement(...banners);
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
  } else if (['amp.elperiodico.com', 'amp.epe.es'].includes(window.location.hostname)) {
    amp_unhide_access_hide('="loggedIn"', '="NOT loggedIn"', 'amp-ad, amp-embed, amp-next-page');
    let amp_images = document.querySelectorAll('div > amp-img[src]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      elem.src = amp_image.getAttribute('src');
      elem.style = 'margin: 0px 50px;';
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  } else {
    let ads = document.querySelectorAll('div.commercial-up-full__wrapper, div.sidebar--sticky__space, div[data-bbnx-id*="cxense"], div.container-ad');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(['lavanguardia.com', 'mundodeportivo.com'])) {
  let ads = document.querySelectorAll('span.content-ad, span.hidden-ad, span.ad-unit, div.ad-div');
  hideDOMElement(...ads);
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

} else if ((window.location.hostname.endsWith('.fr') && !matchDomain(['lemagit.fr'])) || matchDomain(['connaissancedesarts.com', 'journaldunet.com', 'la-croix.com', 'legrandcontinent.eu', 'lesinrocks.com', 'lesoir.be', 'loeildelaphotographie.com', 'marianne.net', 'nouvelobs.com', 'parismatch.com', 'science-et-vie.com', 'sudinfo.be'].concat(fr_groupe_nice_matin_domains))) {//france

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
  hideDOMElement(...ads);
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

else if (matchDomain('cieletespace.fr')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.article-content__subscribe', '', 'div.article-content');
}

else if (matchDomain('connaissancedesarts.com')) {
  let ads = document.querySelectorAll('div.ad-container');
  hideDOMElement(...ads);
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
  let url = window.location.href;
  let paywall = document.querySelectorAll('r-panel.r-paywall--header, r-panel.r-panel--paywall');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let article = document.querySelector('article');
    if (article)
      article.firstChild.before(archiveLink(url));
  }
  let ads = document.querySelectorAll('div[id^="article_"], r-pub, div#rossel-leader-top');
  hideDOMElement(...ads);
}

else if (matchDomain(fr_groupe_la_depeche_domains)) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let paywall = document.querySelector('div.paywall');
    let amphtml = document.querySelector('head > link[rel="amphtml"]');
    if (paywall) {
      removeDOMElement(paywall);
      if (amphtml)
        amp_redirect_not_loop(amphtml);
      else {
        let json_script = getArticleJsonScript();
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            if (json) {
              if (json[0])
                json = json[0];
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
          } catch (err) {
            console.log(err);
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
  let ads = document.querySelectorAll('div[class^="ad-slot-"], div#poool-widget-content, div[class*="Rhoo"]');
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
  let reg_wall = document.querySelector('div.reg_wall');
  removeDOMElement(reg_wall);
  let entry_reg_wall = document.querySelector('div.entry_reg_wall[style]');
  if (entry_reg_wall)
    entry_reg_wall.removeAttribute('style');
}

else if (matchDomain('la-croix.com')) {
  let url = window.location.href;
  if (!url.includes('la-croix.com/amp/')) {
    let ads = document.querySelectorAll('div[class^="ads-wrapper-"], div#poool-widget');
    hideDOMElement(...ads);
  } else {
    let paywall_block = document.querySelector('#paywall_block');
    let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
    hideDOMElement(paywall_block, ...amp_ads);
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
    getArchive(url, 'div[data-component="fig-content-body"]');
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
  let poool_banners = document.querySelectorAll('#poool-container, #poool-widget-content, #poool-widget');
  let forbidden = document.querySelector('.forbidden');
  let ads = document.querySelectorAll('div[class^="lmn-"]');
  hideDOMElement(...poool_banners, forbidden, ...ads);
  let bottom_hide = document.querySelector('.cnt[data-poool-mode="hide"]');
  if (bottom_hide) {
    bottom_hide.removeAttribute('data-poool-mode');
    bottom_hide.removeAttribute('style');
  }
}

else if (matchDomain('lemonde.fr')) {
  let url = window.location.href;
  let paywall = document.querySelector('section.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    getArchive(url, 'article');
    let hide = document.querySelector('section.article__wrapper--premium');
    if (hide)
      removeClassesByPrefix(hide, 'article__content--restricted');
  }
}

else if (matchDomain('leparisien.fr')) {
  if (window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div.paywall');
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
    amp_redirect('div.paywall', '', '/amp' + window.location.pathname);
  }
}

else if (matchDomain('lepoint.fr')) {
  function lepoint_main() {
    function decryptVariable(a) {
      var t = ["point", "les", "payants", "top"],
      n = ["le", "avec", "articles", "c"],
      o = (function () {
        var o = [];
        for (var e = 0; e < 4; e++)
          o.push(n[e]), o.push(t[e]);
        return o
      })(),
      e = {
        stringify: function (o) {
          var e = {
            ct: o.ciphertext.toString(CryptoJS.enc.Base64)
          };
          return o.iv && (e.iv = o.iv.toString()),
          o.salt && (e.s = o.salt.toString()),
          JSON.stringify(e)
        },
        parse: function (o) {
          var e = JSON.parse(o),
          t = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(e.ct)
          });
          return e.iv && (t.iv = CryptoJS.enc.Hex.parse(e.iv)),
          e.s && (t.salt = CryptoJS.enc.Hex.parse(e.s)),
          t
        }
      };
      return JSON.parse(CryptoJS.AES.decrypt(JSON.stringify(a), o.join(" "), {
          format: e
        }).toString(CryptoJS.enc.Utf8))
    }
    let article = document.querySelector('div#contenu');
    if (article && window.variable_article_poool)
      window.postMessage({type: 'from_page', data: decryptVariable(window.variable_article_poool)});
  }
  if (!matchDomain(['journal.lepoint.fr'])) {
    let paywall = document.querySelectorAll('aside.paywall');
    if (paywall.length) {
      removeDOMElement(...paywall);
      insert_script(lepoint_main);
    }
    window.setTimeout(function () {
      let ads = document.querySelectorAll('div[id*="WRAP_"], div#StickyPaywall, div#paywall-sticky, div.slotpub, div.sticky-block');
      hideDOMElement(...ads);
    }, 1000);
  } else {
    let url = window.location.href;
    let paywall = document.querySelectorAll('div.accnt-cmp');
    if (paywall.length) {
      removeDOMElement(...paywall);
      getArchive(url, 'article');
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

else if (matchDomain('lamontagne.fr') || document.querySelector('head > meta[name="google-play-app"][content^="app-id=com.centrefrance"]')) {// Groupe Centre France
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

} else if (window.location.hostname.endsWith('.it') || matchDomain(['eastwest.eu', 'italian.tech', 'limesonline.com', 'quotidiano.net', 'tuttosport.com'])) {//italy

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
    amp_redirect('div[class^="MainTextTruncated_paragraph__"]');
    let ads = document.querySelectorAll('div[class^="AdUnit_placeholder"]');
    hideDOMElement(...ads);
  } else {
    let ads = document.querySelectorAll('amp-ad, amp-embed');
    hideDOMElement(...ads);
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

else if (matchDomain('editorialedomani.it')) {
  if (window.location.search.startsWith('?amp=1'))
    ampToHtml();
  else {
    let ads = document.querySelectorAll('div.ad-container');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('gazzetta.it')) {
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
    amp_redirect('div.paywall');
    let ads = document.querySelectorAll('.advertisement');
    hideDOMElement(...ads);
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
            refreshCurrentTab();
        }
      }
    }
    let service_page = document.querySelector('div.service-page');
    if (service_page) {
      refreshCurrentTab();
    }
  }, 1000);
}

else if (matchDomain(['iltirreno.it', 'lanuovasardegna.it']) || matchDomain(['gazzettadimodena.it', 'gazzettadireggio.it', 'lanuovaferrara.it'])) {
  if (window.location.pathname.includes('/news/')) {
    let paywall = document.querySelector('span > img[alt*="Paywall"]');
    if (paywall) {
      let header = paywall.parentNode.parentNode;
      header_nofix(header);
      removeDOMElement(paywall.parentNode);
    }
    window.setTimeout(function () {
      let banners = document.querySelectorAll('div.MuiSnackbar-root, div.css-16cchgy');
      removeDOMElement(...banners);
    }, 1000);
  }
}

else if (matchDomain(it_ilmessaggero_domains)) {
  if (window.location.pathname.toLowerCase().includes('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  } else {
    let noscroll = document.querySelector('html[style]');
    if (noscroll)
      noscroll.removeAttribute('style');
    let ads = document.querySelectorAll('div.adv_banner, div.inread_adv, div#outbrain');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(it_quotidiano_domains)) {
  if (window.location.pathname.endsWith('/amp') || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="c.customGranted"', '="NOT c.customGranted"', 'amp-ad, amp-embed, amp-fx-flying-carpet, .watermark-adv, .amp__watermark');
  } else {
    amp_redirect('div[data-testid="paywall-container"], div[class^="Paywall_paywall_"]', '', window.location.pathname + '/amp');
    let ads = document.querySelectorAll('div[id^="div-gpt-ad"]');
    hideDOMElement(...ads);
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
  if (matchDomain(['lastampa.it', 'repubblica.it'])) {
    if (window.location.pathname.includes('/news/')) {
      if (!window.location.pathname.match(/\amp(\/)?$/)) {
        csDoneOnce = true;
        let paywall = document.querySelector('iframe#__limio_frame');
        if (paywall)
          refreshCurrentTab_bg();
        let modal = document.querySelector('aside#widgetDP');
        removeDOMElement(modal);
        let ads = document.querySelectorAll('div[id^="adv"]');
        hideDOMElement(...ads);
      } else
        ampToHtml();
    }
  } else {
    if (!window.location.pathname.match(/\amp(\/)?$/)) {
      let paywall = document.querySelector('div#ph-paywall');
      removeDOMElement(paywall);
    } else
      ampToHtml();
  }
  let ads = document.querySelectorAll('div[id^="adv"]');
  hideDOMElement(...ads);
}

else if (matchDomain('tuttosport.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let article_images = document.querySelectorAll('div > img[data-src]:not([src])');
    for (let elem of article_images) {
      elem.src = elem.getAttribute('data-src');
      elem.removeAttribute('class');
      elem.parentNode.removeAttribute('style');
    }
    let main_images = document.querySelectorAll('div > img[class*="ArticleImage_image__"][src]');
    for (let elem of main_images) {
      elem.removeAttribute('class');
    }
    let video = document.querySelector('div[class^="VideoFloat_videoFloatCont__"]');
    if (video) {
      let og_image = document.querySelector('head > meta[property="og:image"][content]');
      if (og_image) {
        let og_image_url = og_image.getAttribute('content');
        if (og_image_url) {
          let elem = document.createElement('img');
          elem.src = og_image_url;
          elem.style = 'width: 95%;';
          video.parentNode.replaceChild(elem, video);
        }
      }
    }
    let ads = document.querySelectorAll('div[class^="AdUnit_"]');
    hideDOMElement(...ads);
  } else {
    let ads = document.querySelectorAll('amp-ad, amp-embed');
    hideDOMElement(...ads);
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

else if (matchDomain('doorbraak.be')) {
  let paywall_sel = 'div.paywall';
  let paywall = document.querySelector(paywall_sel);
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    waitDOMElement(paywall_sel, 'DIV', removeDOMElement, false);
    let json_script = document.querySelector('script#__NUXT_DATA__');
    if (json_script) {
      try {
        if (!json_script.text.substr(0, 500).includes(window.location.pathname))
          refreshCurrentTab();
        let json = JSON.parse(json_script.text);
        json = json.filter(x => typeof x === 'string' && x.startsWith('<p>'));
        let json_text = json[0];
        if (json_text) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          let article = document.querySelector('div > div.prose');
          if (article) {
            article.appendChild(content_new);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('fd.nl')) {
  let paywall = document.querySelectorAll('section.upsell, div.upsell-modal-background');
  if (paywall.length) {
    removeDOMElement(...paywall);
    refreshCurrentTab();
  }
  let header = document.querySelector('div.fd-message[data-slot="Artikel/Header"]');
  removeDOMElement(header);
}

else if (matchDomain('ftm.nl')) {
  let banners = document.querySelectorAll('div.banner-pp, a.readmore');
  removeDOMElement(...banners);
}

else if (matchDomain(be_roularta_domains)) {
  if (matchDomain('beleggersbelangen.nl')) {
    let paywall = document.querySelector('div.unlimited-access');
    if (paywall) {
      removeDOMElement(paywall);
      let no_account = document.querySelector('div.no-account');
      if (no_account)
        no_account.classList.remove('no-account');
      let content_inner = document.querySelector('div.content-inner[style]');
      if (content_inner)
        content_inner.removeAttribute('style');
    }
  } else {
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
      let lazy_images = document.querySelectorAll('img[src^="data:image/"][data-lazy-src]');
      for (let elem of lazy_images) {
        elem.src = elem.getAttribute('data-lazy-src');
      }
    }
  }
  let ads = document.querySelectorAll('div.rmgAd, div.c-header__ad');
  hideDOMElement(...ads);
}

else if (matchDomain(['lc.nl', 'dvhn.nl']) || document.querySelector('head > link[href*=".ndcmediagroep.nl/"]')) {
  let paywall = document.querySelector('div.signupPlus, div.pw-wrapper');
  if (paywall && dompurify_loaded) {
    let intro = document.querySelector('div.startPayWall');
    let html = document.documentElement.outerHTML;
    if (html.includes('window.__NUXT__=')) {
      removeDOMElement(paywall, intro);
      try {
        let json = html.split('window.__NUXT__=')[1].split('</script>')[0].trim();
        let url_nuxt = json.includes(',canonical:"') ? json.split(',canonical:"')[1].match(/\d+\.(html|ece)/)[0] : false;
        if (!url_nuxt)
          url_nuxt = json.match(/[(,]null,/) ? json.split(/[(,]null,/)[1].match(/\d+\.(html|ece)/)[0] : false;
        if (url_nuxt && !window.location.pathname.includes(url_nuxt))
          refreshCurrentTab();
        else if (json.includes(',body:')) {
          let json_text = json.split(',body:')[1].split(/,(leadText|brand_key|tts):/)[0].replace(/([{,])(\w+)(?=:(["\{\[]|[\w$]{1,2}[,\}]))/g, "$1\"$2\"").replace(/(Image\\":)(\d)([,}])/g, '$1\\"$2\\"$3').replace(/\":(\[)?([\w\$\.]+)([\]},])/g, "\":$1\"$2\"$3");
          let article = document.querySelector('div.content');
          if (article) {
            article.innerHTML = '';
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
              if (par.code) {
                let parser = new DOMParser();
                let article_html = parser.parseFromString('<div>' + DOMPurify.sanitize(par.code, dompurify_options) + '</div>', 'text/html');
                elem = article_html.querySelector('div');
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
                        caption.innerText = child.relation.caption;
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
                  } else if (child.children && child.children[0]) {
                    if (child.children[0].text && child.children[0].text.length > 2) {
                      if ((child.href && child.href.length > 2) || (child.relation && child.relation.follow && child.relation.follow.url)) {
                        let par_link = document.createElement('a');
                        par_link.href = child.href || child.relation.follow.url;
                        par_link.innerText = child.children[0].text;
                        elem.appendChild(par_link);
                      } else {
                        addParText(elem, child.children[0].text);
                      }
                    } else if (child.children[0].children && child.children[0].children[0] && child.children[0].children[0].text && child.children[0].children[0].text.length > 2)
                      addParText(elem, child.children[0].children[0].text);
                  }
                }
              } else if (par.typename.length > 2)
                console.log(par);
              if (elem.hasChildNodes()) {
                article.appendChild(elem);
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  let ads = document.querySelectorAll('.top__ad, .marketingblock-article');
  hideDOMElement(...ads);
}

else if (matchDomain(nl_dpg_adr_domains)) {
  let url = window.location.href;
  let paywall = document.querySelector('div#remaining-paid-content');
  if (paywall) {
    removeDOMElement(paywall);
    getArchive(url, 'div.article__body', '', 'div#remaining-paid-content');
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
    refreshCurrentTab();
  }
  let paywall = document.querySelector('div.MeteringNotification__backdrop, data-hydrate[data-name="PaywallHandler"]');
  let article_body = document.querySelector('div.DetailBodyBlocks, section.TextArticlePage__imageWrapper, section > div.DetailArticleImage');
  if (paywall && article_body && dompurify_loaded) {
    let div_main = document.createElement('div');
    div_main.style = 'margin: 20px 0px;';
    let div_elem = document.createElement('div');
    let par_style = 'font-weight: normal; font-size: 16px; line-height: 1.5;';
    let scripts = document.querySelectorAll('script:not([src]):not([type])');
    let window_script;
    for (let script of scripts) {
      if (script.text.length > 2500 && script.text.includes('window.telegraaf.articleBodyBlocks')) {
        window_script = script;
        break;
      }
    }
    if (window_script) {
      removeDOMElement(paywall);
      let window_text = window_script.text.split('window.telegraaf.articleBodyBlocks')[1].split('window.telegraaf.')[0].replace(/(^\s?=\s?"|";$|\\")/gm, '').replace(/\\\\u003c/gm, '<');
      let parser = new DOMParser();
      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(window_text) + '</div>', 'text/html');
      let article_new = doc.querySelector('div');
      let pars = article_new.querySelectorAll('p');
      for (let par of pars)
        par.style = 'margin: 10px 0px;';
      let placeholders = article_new.querySelectorAll('div.TeaserImage__placeholder');
      for (let elem of placeholders)
        elem.removeAttribute('class');
      let media = article_new.querySelectorAll('div.NewsletterForm, div.DetailArticleVideo');
      removeDOMElement(...media);
      div_main.appendChild(article_new);
    } else {
      let json_script = getArticleJsonScript();
      if (json_script) {
        removeDOMElement(paywall);
        try {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = json.articleBody;
            if (json_text) {
              let intro = document.querySelector('span[id^="articleIntro"], p.Article__intro > span:not([class])');
              if (intro)
                json_text = json_text.replace(intro.innerText + '\n\n', '');
              let text_array = json_text.split('\\n');
              for (let p_text of text_array) {
                let p_div = document.createElement('p');
                p_div.innerText = p_text;
                p_div.style = par_style;
                div_elem.appendChild(p_div);
              };
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

else if (matchDomain('tijd.be')) {
  if (matchDomain('belegger.tijd.be')) {
    let noscroll = document.querySelector('body.js-overflow-hidden');
    if (noscroll)
      noscroll.classList.remove('js-overflow-hidden');
    let inert = document.querySelectorAll('[inert]');
    for (let elem of inert)
      elem.removeAttribute('inert');
    let banner = document.querySelector('div[data-id="react-paywall-investor"]');
    removeDOMElement(banner);
  }
}

else if (matchDomain('vn.nl')) {
  if (dompurify_loaded)
    getJsonUrl('div.content__message-no-access-container', '', 'div[data-article-content-target]', {art_append: true});
  let content_restriction = document.querySelector('div.content__restriction');
  removeDOMElement(content_restriction);
  let article_content = document.querySelector('section[data-article-content-element]');
  if (article_content) {
    article_content.style = 'max-height:none !important;';
    let body = document.querySelector('body');
    if (body)
      body.style = 'height:auto !important;';
  }
}

else
  csDone = true;

} else if ((window.location.hostname.match(/\.(ie|uk)$/) && !matchDomain(['investmentweek.co.uk'])) || matchDomain(['apollo-magazine.com', 'citywire.com', 'fnlondon.com', 'ft.com', 'granta.com', 'scotsman.com', 'tes.com', 'unherd.com'])) {//united kingdom/ireland

if (matchDomain('apollo-magazine.com')) {
  let banner = document.querySelector('#subscribe-ribbon');
  removeDOMElement(banner);
}

else if (matchDomain('autocar.co.uk')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.ms-block, div.register-block', '', 'div.content-wrapper');
}

else if (matchDomain(['belfasttelegraph.co.uk', 'independent.ie'])) {
  let flip_pay = document.querySelector('div#flip-pay');
  if (flip_pay && flip_pay.hasChildNodes() && dompurify_loaded) {
    let content = document.querySelector('script[data-fragment-type="ArticleContent"]');
    if (content) {
      let fade = document.querySelector('div[class*="_fadetowhite"]');
      removeDOMElement(flip_pay, fade);
      let intro = document.querySelector('div > div[data-auth-intro="article"]');
      if (intro) {
        let intro_par = intro.querySelector('p[class]');
        let intro_par_class;
        if (intro_par)
          intro_par_class = intro_par.getAttribute('class');
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
                    if (item.cropped && item.cropped.url)
                      img.src = item.cropped.url;
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
                  } else if (!['ad', 'quote', 'streamone'].includes(type)) {
                    let html = parser.parseFromString('<p class="' + intro_par_class + '">' + DOMPurify.sanitize(item, dompurify_options) + '</p>', 'text/html');
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
    }
  }
  let ads = document.querySelectorAll('div[id^="ad_article"]');
  hideDOMElement(...ads);
}

else if (matchDomain('businesspost.ie')) {
  function bpie_main() {
    if ($) {
      let article_id_dom = document.querySelector('article[id]');
      let article_id;
      if (article_id_dom)
        article_id = article_id_dom.id;
      if (article_id) {
        let bp_ajaxurl = 'https://www.businesspost.ie/wp-admin/admin-ajax.php';
        let data_ajax = {
          action: 'fetch_article_content',
          type: 'POST',
          data: {
            id: article_id
          },
          dataType: 'json',
          contentType: 'application/json'
        };
        $.ajax({
          type: 'POST',
          url: bp_ajaxurl,
          data: data_ajax,
          success: function (data) {
            window.postMessage({type: 'from_page', data: data});
          }
        });
      }
    } else
      refreshCurrentTab();
  }
  csDoneOnce = true;
  window.setTimeout(function () {
    let paywall = document.querySelector('div#bp_paywall_content');
    let article_id_dom = document.querySelector('article[id]');
    let article_id;
    if (article_id_dom)
      article_id = article_id_dom.id;
    if (paywall || article_id) {
      removeDOMElement(paywall);
      insert_script(bpie_main);
    }
  }, 500);
}

else if (matchDomain('citywire.com')) {
  let url = window.location.href;
  let func_post = function () {
    let banners = document.querySelectorAll('div#lockedLoginPanel, div#lockedContentPlaceholder');
    removeDOMElement(...banners);
    let article = document.querySelector('div.cw-article-body');
    if (article)
      removeDOMElement(article.nextSibling);
  }
  getGoogleWebcache(url, 'div.locked-content.cw-article-body', {rm_class: 'locked-content'}, 'div.cw-article-body', func_post);
}

else if (matchDomain('fnlondon.com')) {
  let signin = document.querySelector('div[data-testid="articleSignInSubscribeWrapper"]');
  removeDOMElement(signin);
}

else if (matchDomain('ft.com')) {
  let paywall = document.querySelector('div.js-primary-offers-container');
  if (paywall) {
    removeDOMElement(paywall);
    refreshCurrentTab();
  }
  let banners = document.querySelectorAll('.o-cookie-message, .js-article-ribbon, .o-ads, .o-banner');
  hideDOMElement(...banners);
}

else if (matchDomain('granta.com')) {
  if (dompurify_loaded)
    getJsonUrl('div.article-sign-up-container', '', 'div.article-excerpt');
}

else if (matchDomain('independent.co.uk')) {
  let url = window.location.href;
  if (window.location.search.match(/(\?|&)amp/)) {
    let ads = document.querySelectorAll('amp-ad, amp-embed, [id^="ad-"]');
    hideDOMElement(...ads);
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

else if (matchDomain('literaryreview.co.uk')) {
  if (dompurify_loaded)
    getJsonUrl('p.subscribe-for-more', '', 'div#_articlereview');
}

else if (matchDomain('prospectmagazine.co.uk')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.paywall_overlay_blend, div.paywall', '', 'main');
  window.setTimeout(function () {
    let ads = document.querySelectorAll('.ad-banner, .advert');
    hideDOMElement(...ads);
  }, 1000);
}

else if (matchDomain('spectator.co.uk')) {
  let banners = document.querySelectorAll('#subscribe-ribbon, div.ad-slot');
  hideDOMElement(...banners);
}

else if (matchDomain('stylist.co.uk')) {
  let paywall = document.querySelector('div[data-testid="paywall-component"]');
  if (paywall && dompurify_loaded) {
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
          let first_par = document.querySelector('main div[data-column="true"] > p');
          if (first_par) {
            let article = first_par.parentNode;
            let teaser = article.querySelectorAll('div > p:not([class])');
            removeDOMElement(...teaser);
            if (article) {
              let parser = new DOMParser();
              for (let par of pars) {
                let elem = document.createElement('p');
                if (par.paragraph) {
                  let content = par.paragraph;
                  let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                  elem = content_new.querySelector('div');
                } else if (par.acf_fc_layout === 'heading') {
                  if (par.text)
                    elem.appendChild(document.createTextNode(par.text));
                } else if (['image', 'interactive_image'].includes(par.acf_fc_layout)) {
                  let image_array = [];
                  if (par.image)
                    image_array = [par.image];
                  else if (par.image_collection)
                    image_array = par.image_collection;
                  for (let img_elem of image_array) {
                    let figure = document.createElement('figure');
                    let img = document.createElement('img');
                    img.src = img_elem.url;
                    img.alt = img_elem.alt;
                    img.style = 'width: 95%;';
                    figure.appendChild(img);
                    if (img_elem.caption || img_elem.description || img_elem.alt) {
                      let caption = document.createElement('figcaption');
                      caption.innerText = img_elem.caption ? (img_elem.caption + ' ' + img_elem.description) : img_elem.alt;
                      figure.appendChild(caption);
                    }
                    elem.appendChild(figure);
                  }
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
                      let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                      let par_elem = content_new.querySelector('div');
                      li.appendChild(par_elem);
                    }
                    if (sub_item.image) {
                      let img = document.createElement('img');
                      img.src = sub_item.image.url;
                      img.alt = sub_item.image.alt;
                      img.style = 'width: 95%;';
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
                if (elem.hasChildNodes()) {
                  elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
                  article.appendChild(elem);
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

else if (matchDomain('telegraph.co.uk')) {
  if (window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelectorAll('.premium-paywall');
    if (paywall.length) {
      let truncated_content = document.querySelector('.truncated-content');
      removeDOMElement(...paywall, truncated_content);
      amp_unhide_access_hide('="c.result=\'ALLOW_ACCESS\'"', '', 'amp-ad, amp-embed', false);
    } else {
      let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
      hideDOMElement(...amp_ads);
    }
  } else {
    let subwall = document.querySelectorAll('[class^="subwall"]');
    let ads = document.querySelectorAll('.advert, .commercial-unit');
    hideDOMElement(...subwall, ...ads);
  }
}

else if (matchDomain('tes.com')) {
  let paywall = document.querySelector('div.tg-paywall-message');
  if (paywall) {
    removeDOMElement(paywall);
    let overlay = document.querySelector('div.tg-paywall-body-overlay');
    if (overlay)
      overlay.removeAttribute('class');
  }
  let banner = document.querySelector('div.js-paywall-info');
  removeDOMElement(banner);
}

else if (matchDomain('the-tls.co.uk')) {
  if (dompurify_loaded)
    getJsonUrl('div.tls-single-article__closed-paywall', '', 'div.tls-article-body', {art_class: 'tls-article-body'});
  let fade = document.querySelector('div.tls-single-article__closed-paywall-wrapper');
  let ads = document.querySelectorAll('div[class*="tls-single-article__ad-slot"]');
  hideDOMElement(fade, ...ads);
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
      getArchive(url, 'article:not([id])');
      window.setTimeout(function () {
        let headings = document.querySelectorAll('div > div[role="heading"]');
        for (let elem of headings)
          elem.parentNode.style['margin-top'] = '50px';
        let image_boxes = document.querySelectorAll('div[id*="."][style]');
        for (let elem of image_boxes)
          elem.style['margin-bottom'] = '50px';
      }, 1500);
      for (let n = 0; n < 5; n++) {
        window.setTimeout(function () {
          let page_scroll = document.querySelectorAll('html, body');
          for (let elem of page_scroll)
            elem.style = 'overflow: auto !important; height: 100% !important;';
        }, n * 500);
      }
    }
    let paywall_page = document.querySelector('div#paywall-portal-page-footer');
    let block = document.querySelector('.subscription-block');
    removeDOMElement(paywall_page, block);
    let ads = document.querySelectorAll('#ad-article-inline, div#sticky-ad-header, div[class*="InlineAdWrapper"], div[class*="NativeAd"], div.gyLkkj');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('unherd.com')) {
  let preview = document.querySelector('div#premiumpreview');
  if (preview) {
    removeDOMElement(preview);
    let premium = document.querySelector('div#premiumcontent');
    if (premium)
      premium.removeAttribute('id');
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
  hideDOMElement(...ads);
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(ar|br|cl|pe|uy)$/) || matchDomain(['cambiocolombia.com', 'clarin.com', 'elespectador.com', 'elmercurio.com', 'eltiempo.com', 'eltribuno.com', 'globo.com', 'lasegunda.com', 'latercera.com', 'revistaoeste.com'])) {//south america

if (matchDomain('abril.com.br')) {
  if (window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelector('.piano-modal');
    removeDOMElement(paywall);
    let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
    hideDOMElement(...amp_ads);
  } else {
    let ads = document.querySelectorAll('div.ads, div[class^="ads-"]');
    hideDOMElement(...ads);
  }
}

else if (matchDomain(ar_grupo_clarin_domains)) {
  let ads = document.querySelectorAll('div.ad-slot, div.box-adv, div.wrapperblock, div.banner, div[id^="div-gpt-ad-flotante"]');
  hideDOMElement(...ads);
  let ads_inline = document.querySelectorAll('div > div.sticky, div > div[id^="div-gpt-ad-inread"], div > div[id^="div-gpt-ad-caja"], div > div[id^="div-gpt-ad-horizontal"]');
  for (let ad of ads_inline)
    hideDOMElement(ad.parentNode);
}

else if (matchDomain('cambiocolombia.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div#require-access');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = '/amp' + window.location.pathname;
    }
  } else {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  }
}

else if (matchDomain('cartacapital.com.br')) {
  let paywall = document.querySelector('aside.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json[1].articleBody.replace(/\s{2,}/g, '\r\n\r\n');
          let content = document.querySelector('section.s-content__text');
          if (json_text && content) {
            content.innerHTML = '';
            let article_new = document.createElement('p');
            article_new.innerText = json_text;
            content.appendChild(article_new);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('crusoe.com.br')) {
  let ads = document.querySelectorAll('#gpt-leaderboard, .ads_desktop, .catchment-box');
  hideDOMElement(...ads);
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
  hideDOMElement(...ads);
}

else if (matchDomain('elespectador.com')) {
  if (window.location.search.match(/(\?|&)outputType=amp/)) {
    amp_unhide_subscr_section('amp-ad, amp-embed, [class^="Widget"], amp-fx-flying-carpet');
  } else {
    amp_redirect('div.exclusive_validation');
  }
}

else if (matchDomain(['elmercurio.com', 'lasegunda.com'])) {
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
  if (window.location.pathname.startsWith('/mobile')) {
    let lessreadmore = document.querySelectorAll('article.lessreadmore');
    for (let article of lessreadmore)
      article.classList.remove('lessreadmore');
    let bt_readmore = document.querySelectorAll('div[id*="bt_readmore_"]');
    removeDOMElement(...bt_readmore);
  }
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

else if (matchDomain('eltribuno.com')) {
  let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
  for (let elem of lazy_images) {
    elem.src = elem.getAttribute('data-src');
    elem.classList.remove('lazyload');
  }
}

else if (matchDomain('em.com.br')) {
  if (!window.location.pathname.endsWith('/amp.html')) {
    amp_redirect('.news-blocked-content');
    let ads = document.querySelectorAll('.ads, .containerads');
    hideDOMElement(...ads);
  } else {
    amp_unhide_subscr_section('amp-ad, amp-embed, amp-fx-flying-carpet');
    let compress_text = document.querySelector('div.compress-text');
    if (compress_text)
      compress_text.classList.remove('compress-text');
  }
}

else if (matchDomain('estadao.com.br')) {
  if (window.location.pathname.match(/(\.amp$|^\/amp\/)/) || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="outputValue=\'hide_paywall\'"', '="outputValue=\'show_paywall\'"', 'amp-ad, amp-embed, amp-fx-flying-carpet, div[class^="pAd"], div.ads-container');
  } else {
    let paywall = document.getElementById('paywall-wrapper-iframe-estadao');
    removeDOMElement(paywall);
    let ads = document.querySelectorAll('div[class^="styles__Container-sc-"]');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('folha.uol.com.br')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-sticky-ad, amp-embed');
  } else {
    let signup = document.querySelector('.c-top-signup');
    removeDOMElement(signup);
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
  window.setTimeout(function () {
    let blink = document.querySelector('div:not(.hidden) > div.body.blink');
    if (blink) {
      csDoneOnce = true;
      refreshCurrentTab();
    }
  }, 2000);
  let ads = document.querySelectorAll('div.ad-banner, div.ad-container');
  hideDOMElement(...ads);
}

else if (matchDomain('gazetadopovo.com.br')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('div.ads-amp, amp-embed', false);
  } else {
    let ads = document.querySelectorAll('div.c-ads');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('globo.com')) {
  if (matchDomain('valor.globo.com')) {
    if (!window.location.pathname.startsWith('/google/amp/')) {
      amp_redirect('div.paywall');
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
  } else if (window.location.pathname.includes('/amp/'))
    ampToHtml();
  if (!window.location.pathname.includes('/amp/')) {
    let ads = document.querySelectorAll('div[id^="ad-container"], div.content-ads, div[class^="block__advertising"]');
    hideDOMElement(...ads);
  }
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

else if (matchDomain('revistaoeste.com')) {
  if (window.location.pathname.startsWith('/revista/')) {
    let intro = document.querySelector('div.is-locked');
    let sub_panel = document.querySelector('div.subscribe-panel');
    removeDOMElement(intro, sub_panel);
    let div_hidden = document.querySelector('div.hidden[data-url]');
    if (div_hidden)
      div_hidden.classList.remove('hidden');
  } else {
    let div_expandable = document.querySelector('div.expandable');
    if (div_expandable)
      div_expandable.classList.remove('expandable');
  }
}

else if (window.location.hostname.endsWith('.cl') && document.querySelector('head > meta[property="og:image"][content*="://impresa.soy-chile.cl/"]')) {
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
    hideDOMElement(...amp_ads);
  } else {
    amp_redirect('div.paywall', '', window.location.pathname + '?outputType=amp');
    let ads = document.querySelectorAll('div.ad');
    hideDOMElement(...ads);
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

else if (matchDomain('arkansasonline.com')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.bee-page-container', '', 'div.article__body');
}

else if (matchDomain('artnet.com')) {
  if (window.location.pathname.endsWith('/amp-page')) {
    amp_unhide_subscr_section();
  } else {
    let body_hidden = document.querySelector('.article-body');
    if (body_hidden)
      body_hidden.style = 'display:block;';
    let banner = document.querySelector('div[id^="issuem-leaky-paywall-"]');
    removeDOMElement(banner);
  }
}

else if (matchDomain('asia.nikkei.com')) {
  let paywall = document.querySelector('div#paywall-offer > div.tp-container-inner');
  if (paywall) {
    removeDOMElement(paywall);
    refreshCurrentTab();
  }
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

else if (matchDomain('balkaninsight.com')) {
  if (dompurify_loaded)
    getJsonUrl('div.subscribeWrapper', '', 'div.post_teaser', {art_append: true, art_hold: true});
}

else if (matchDomain('barandbench.com')) {
  let paywall = document.querySelector('div#paywall-banner');
  if (paywall) {
    removeDOMElement(paywall);
    let fade = document.querySelector('div[class^="paywall-story-styles-"]');
    if (fade)
      fade.removeAttribute('class');
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let content = document.querySelector('div.arr--story-page-card-wrapper');
        if (json_text && content) {
          content.innerText = breakText(parseHtmlEntities(json_text));
        }
      }
    }
  }
}

else if (matchDomain('barrons.com')) {
  let url = window.location.href;
  if (!url.includes('barrons.com/amp/')) {
    amp_redirect('div#cx-interstitial-snippet', '', '/amp' + window.location.pathname);
    let continue_buttons = document.querySelectorAll('button.snippet__buttons--continue');
    for (let elem of continue_buttons)
      elem.addEventListener('click', function () { window.location.reload(); });
    let ads = document.querySelectorAll('div[class*="_AdWrapper-"], div[class*="-adWrapper-"]');
    hideDOMElement(...ads);
  } else {
    amp_unhide_subscr_section('.wsj-ad, amp-ad');
  }
}

else if (matchDomain('bhaskar.com')) {
  let paywall = document.querySelector('div > img[alt="LockIcon"]');
  if (paywall)
    refreshCurrentTab_bg();
}

else if (matchDomain('billboard.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('amp-ad, amp-embed');
  }
}

else if (matchDomain('bloomberg.com')) {
  let paywall_sel = 'div[id^="fortress-"]';
  let paywall = document.querySelectorAll(paywall_sel);
  let leaderboard = document.querySelector('div[id^="leaderboard"], div[class^="leaderboard"], div.canopy-container');
  let ads = document.querySelectorAll('div[data-ad-status], div[data-ad-type], div[class^="FullWidthAd_"], div.adWrapper');
  hideDOMElement(...paywall, leaderboard, ...ads);
  csDoneOnce = true;
  waitDOMElement(paywall_sel, 'DIV', removeDOMElement, true);
  waitDOMAttribute('body', 'BODY', 'data-paywall-overlay-status', node => node.removeAttribute('data-paywall-overlay-status'), true);
  if (window.location.pathname.startsWith('/live/')) {
    setInterval(function () {
      window.localStorage.clear();
    }, 15 * 60 * 1000);
  }
  window.setTimeout(function () {
    let shimmering = document.querySelector('article.first-story div[class^="Placeholder_placeholderParagraphWrapper-"]');
    if (shimmering) {
      header_nofix(shimmering.parentNode, 'BPC > disable Dark Reader or enable Javascript for site');
    }
  }, 5000);
}

else if (matchDomain('bloombergadria.com')) {
  let article_hidden = document.querySelector('article[style]');
  if (article_hidden)
    article_hidden.removeAttribute('style');
  let ads = document.querySelectorAll('.banner');
  hideDOMElement(...ads);
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
  hideDOMElement(...ads);
}

else if (matchDomain('business-standard.com')) {
  function bs_main(node) {
    removeDOMElement(node);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props.pageProps.data.htmlContent) {
          let json_text = json.props.pageProps.data.htmlContent;
          let content = document.querySelector('div.storycontent');
          if (json_text && content) {
            let intro = content.querySelectorAll('div:not([class]');
            removeDOMElement(...intro);
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.firstChild.before(content_new);
          }
        } else
          refreshCurrentTab();
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!window.location.pathname.startsWith('/amp/')) {
    if (dompurify_loaded) {
      let paywall_sel = 'div.subscribe-page';
      let paywall = document.querySelector(paywall_sel);
      if (paywall) {
        bs_main(paywall)
      } else {
        csDoneOnce = true;
        waitDOMElement(paywall_sel, 'DIV', bs_main, false);
      }
    }
    let banner = document.querySelector('section.sbcrbtmlfull');
    let ads = document.querySelectorAll('div.advertisement-bg, div[id^="between_article_content_"]');
    hideDOMElement(banner, ...ads);
  } else
    ampToHtml();
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
    hideDOMElement(...ads);
  }
}

else if (matchDomain(ca_gcm_domains)) {
  let paywall = document.querySelector('div._block_1dgevo');
  if (paywall) {
    removeDOMElement(paywall);
    refreshCurrentTab();
  }
  let counter = document.querySelector('div#paywall-banner-content');
  removeDOMElement(counter);
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

else if (matchDomain('columbian.com')) {
  let url = window.location.href;
  let func_post = function () {
    let modal = document.querySelector('div.modal');
    let fade = document.querySelector('div[style*="background-image: linear-gradient"]');
    removeDOMElement(modal, fade);
  }
  getGoogleWebcache(url, 'div#inline-paywall', '', 'div[itemprop="articleBody"]', func_post);
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
  }
}

else if (matchDomain('defector.com')) {
  let paywall = document.querySelector('div[class^="ContentGate_wrapper__"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_sel = 'div[class^="PostContent_wrapper__"]';
    let article = document.querySelector(article_sel);
    if (article) {
      window.setTimeout(function () {
        let pars = article.querySelectorAll('p');
        if (pars.length < 3) {
          let url = window.location.href.split('?')[0];
          replaceDomElementExt(url, false, false, article_sel);
        }
      }, 1000);
    }
  }
}

else if (matchDomain('digiday.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_access_hide('="NOT p.showPageviewExpired AND NOT p.showPayWall"', '', 'amp-ad, .advertisement, .ad-wrapper');
  } else {
    let ads = document.querySelectorAll('div[class^="ad_"]');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('discovermagazine.com')) {
  window.setTimeout(function () {
    let mammoth = document.querySelector('.iXVGnF');
    if (mammoth)
      refreshCurrentTab();
    let banner = document.querySelector('div.dPURIw');
    hideDOMElement(banner);
  }, 1000);
}

else if (matchDomain('economictimes.com')) {
  if (window.location.pathname.includes('/amp_')) {
    let paywall = document.querySelector('.paywall_wrap');
    if (paywall && dompurify_loaded) {
      let content = document.querySelector('.paywall[style="display:none;"]');
      if (content) {
        let parser = new DOMParser();
        let doc = parser.parseFromString('<div style="margin: 20px 0px;">' + DOMPurify.sanitize(content.innerText, dompurify_options) + '</div>', 'text/html');
        let content_new = doc.querySelector('div');
        if (content_new && content.parentNode)
          content.parentNode.replaceChild(content_new, content);
      } else
        window.location.href = 'https://economictimes.indiatimes.com' + window.location.pathname.replace('amp_prime', 'prime');
      let intro = document.querySelector('.art_wrap');
      let article_blocker = document.querySelector('.articleBlocker');
      removeDOMElement(paywall, intro, article_blocker);
      let amp_ads = document.querySelectorAll('amp-ad');
      hideDOMElement(...amp_ads);
    }
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('div#blocker_layer');
      let data_prime = document.querySelector('div[data-prime="1"]');
      let amphtml = document.querySelector('head > link[rel="amphtml"]');
      if (paywall || data_prime) {
        removeDOMElement(paywall);
        if (data_prime)
          data_prime.removeAttribute('data-prime');
        if (amphtml)
          amp_redirect_not_loop(amphtml);
        else if (window.location.pathname.startsWith('/epaper/'))
          window.location.href = 'https://economictimes.indiatimes.com' + window.location.pathname;
      } else {
        let ads = document.querySelectorAll('.adContainer');
        hideDOMElement(...ads);
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
    let article_wrap = document.querySelector('div.article_wrap[style]');
    if (article_wrap)
      article_wrap.removeAttribute('style');
  }
}

else if (matchDomain('economist.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    let noscroll = document.querySelector('svelte-scroller-outer');
    let hide_style = document.querySelector('body > style');
    removeDOMElement(paywall, noscroll, hide_style);
  }
  let ads = document.querySelectorAll('div[class*="_advert__"]');
  hideDOMElement(...ads);
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
    hideDOMElement(...section_words, ...ads);
  }
}

else if (matchDomain('epoch.org.il')) {
  if (dompurify_loaded)
    getJsonUrl('div.register-login-box', '', 'div.m-article > div.paywall');
}

else if (matchDomain('espn.com')) {
  let url = window.location.href;
  let paywall = document.querySelector('aside.espn-plus-container-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    replaceDomElementExt(url, false, false, 'div.article-body');
  }
}

else if (matchDomain('euobserver.com')) {
  let div_hidden = document.querySelector('div.membership-upsell.show');
  if (div_hidden)
    div_hidden.classList.remove('show');
}

else if (matchDomain('fastcompany.com')) {
  let ads = document.querySelectorAll('div[class*="ad-wrapper"]');
  hideDOMElement(...ads);
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
  hideDOMElement(register, ...ads);
}

else if (matchDomain('firstthings.com')) {
  let paywall = document.querySelector('.paywall');
  removeDOMElement(paywall);
}

else if (matchDomain('forbes.com')) {
  waitDOMAttribute('body', 'body', 'class', node => node.removeAttribute('class'), true);
  csDoneOnce = true;
  if (window.location.pathname.startsWith('/newsletters/')) {
    let paywall = document.querySelector('div > div.newsletter-teaser');
    if (paywall) {
      paywall.classList.remove('newsletter-teaser');
      let header = paywall.parentNode;
      header_nofix(header);
    }
  }
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
  let paywall = document.querySelector('div.paywallActive');
  if (window.location.pathname.match(/\/amp(\/)?/)) {
    amp_unhide_access_hide('="NOT p.showRegWall AND NOT p.showPayWall"', '="p.showPayWall"', '[class^="amp-ad"], div.paywall');
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
  function hbr_main() {
    window.top.postMessage({type: 'article-paywall:full-content'}, '*');
  }
  let popup = document.querySelector('.persistent-banner');
  removeDOMElement(popup);
  let paywall = document.querySelector('div#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    insert_script(hbr_main);
  }
}

else if (matchDomain('hilltimes.com')) {
  function hilltimes_main(node) {
    getJsonUrl('div.paywallcont', '', 'div#entry-content');
  }
  let paywall_sel = 'div.paywallcont';
  let paywall = document.querySelector(paywall_sel);
  if (dompurify_loaded) {
    if (paywall)
      hilltimes_main(paywall);
    else
      waitDOMElement(paywall_sel, 'DIV', hilltimes_main, false);
    csDoneOnce = true;
  }
  window.setTimeout(function () {
    let banner = document.querySelector('section.hide_this_section');
    hideDOMElement(banner);
  }, 1000);
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
  hideDOMElement(close_story, ...ads);
}

else if (matchDomain('hindutamil.in')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    amp_redirect('div.premium-class-bt');
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
  hideDOMElement(wrapper, ...ads);
}

else if (matchDomain('inc42.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_access_hide('="status"', '="NOT status"', 'amp-ad, amp-embed, div.wru-widget');
    let amp_images = document.querySelectorAll('body amp-img[src^="https://"]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      Object.assign(elem, {
        src: amp_image.getAttribute('src'),
        alt: amp_image.getAttribute('alt')
      });
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  } else {
    let banner = document.querySelector('div[id*="_leaderboard_"]');
    hideDOMElement(banner);
  }
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
    hideDOMElement(register, ...ads);
  }
}

else if (matchDomain('indiatoday.in')) {
  if (window.location.pathname.match(/(\/amp)?\/magazine\//)) {
    let url = window.location.href;
    if (!url.includes('/amp/')) {
      amp_redirect('div#csc-paywall');
    } else {
      amp_unhide_access_hide('="granted"', '="NOT NOT granted"', 'amp-ad, amp-embed');
    }
  }
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

else if (matchDomain('interestingengineering.com')) {
  let paywall = document.querySelectorAll('div#paywall-div');
  if (paywall.length) {
    hideDOMElement(...paywall);
    let blurred = document.querySelectorAll('div[class*="Product_makeBlur__"]');
    for (let elem of blurred)
      elem.removeAttribute('class');
    csDoneOnce = true;
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

else if (matchDomain('janes.com')) {
  let articles = document.querySelectorAll('div.article-box');
  for (let article of articles) {
    let gated_text = article.querySelector('div > div.gated-text');
    if (gated_text) {
      let art_link = article.querySelector('a[href^="mailto:"][href*="&body="]');
      if (art_link) {
        let url = decodeURIComponent(art_link.href.split('&body=')[1]);
        let url_pathname = new URL(url).pathname;
        let og_url = url_pathname.match(/\/[\w-]+\//)[0] + 'news-detail' + url_pathname.match(/\/[\w-]+$/)[0];
        let par = document.createElement('p');
        let weblink = document.createElement('a');
        weblink.href = og_url;
        weblink.innerText = 'BPC > full text';
        par.appendChild(weblink);
        gated_text.parentNode.replaceChild(par, gated_text);
      }
    }
  }
}

else if (matchDomain('japantimes.co.jp')) {
  if (!window.location.pathname.endsWith('/amp')) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div.subscribe');
      if (paywall) {
        let banner = document.querySelector('div.blocker > div.tp-container-inner');
        removeDOMElement(paywall, banner);
        let article = document.querySelector('div.article-body');
        if (article) {
          let url = window.location.href;
          article.firstChild.before(nftLink(url));
        }
      }
    }, 2000);
  } else
    ampToHtml();
}

else if (matchDomain('jazziz.com')) {
  if (dompurify_loaded) {
    let art_options = {};
    if (window.location.pathname.startsWith('/jazziz-discovery-'))
      art_options = {art_append: true, art_hold: true};
    getJsonUrl('div.emoxie-pay-wall', '', 'div.restricted-content', art_options);
    window.setTimeout(function () {
      let slideshow = document.querySelector('div[data-slider-id][style]');
      if (slideshow)
        slideshow.removeAttribute('style');
    }, 1000);
  }
}

else if (matchDomain('jpost.com')) {
  let premium_banners = document.querySelectorAll('.hide-for-premium, #hiddenPremiumForm, #hiddenLink');
  removeDOMElement(...premium_banners);
}

else if (matchDomain(['latimes.com', 'sandiegouniontribune.com'])) {
  let ads = document.querySelectorAll('div.enhancement, div.google-dfp-ad-wrapper');
  hideDOMElement(...ads);
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
  hideDOMElement(...ads);
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
    hideDOMElement(...ads);
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
  if (!window.location.pathname.startsWith('/amp/')) {
    amp_redirect('div#cx-snippet');
  } else {
    let meter = document.querySelector('div.meter');
    let container_sponsored = document.querySelector('div.container--sponsored');
    removeDOMElement(meter, container_sponsored);
    amp_unhide_subscr_section('.display-ad');
  }
  let ads = document.querySelectorAll('div.element--ad, div.j-ad');
  hideDOMElement(...ads);
}

else if (matchDomain('medscape.com')) {
  let ads = document.querySelectorAll('.AdUnit, [id^="ads-"]');
  hideDOMElement(...ads);
}

else if (matchDomain('mexiconewsdaily.com')) {
  let div_hidden = document.querySelector('body.single div.td-post-content > div.tdb-block-inner');
  if (div_hidden)
    div_hidden.classList.remove('tdb-block-inner');
}

else if (matchDomain('mid-day.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_access_hide('="granted"', '="NOT granted"', 'amp-ad, amp-embed, [class*="BannerAd"]');
  } else {
    amp_redirect('div#widget-_csc');
    let read_more = document.querySelector('#read-more-my');
    if (read_more)
      read_more.click();
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
  let paywall = document.querySelector('div[id^="fittPortal"]');
  if (paywall)
    natgeo_func(paywall);
  waitDOMElement('div[id^="fittPortal"]', 'DIV', natgeo_func, false);
  csDoneOnce = true;
  window.setTimeout(function () {
    let url = window.location.href;
    let subscribed = document.querySelector('div.Article__Content--gated');
    let msg = document.querySelector('div#bpc_archive');
    if (subscribed && !msg) {
      subscribed.appendChild(archiveLink(url));
      subscribed.setAttribute('style', 'overflow: visible !important;');
    }
    let overlay = document.querySelector('div.Article__Content__Overlay--gated');
    if (overlay)
      overlay.classList.remove('Article__Content__Overlay--gated');
    let ads = document.querySelectorAll('div.ad-slot, div.InsertedAd');
    hideDOMElement(...ads);
  }, 2000);
}

else if (matchDomain('nationalreview.com')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div.continue-reading');
      if (paywall) {
        removeDOMElement(paywall);
        refreshCurrentTab();
      }
    }, 5000);
  }
  let banners = document.querySelectorAll('div.zephr-wrapper, div#bc-root, div.cookie-text');
  hideDOMElement(...banners);
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
    getGoogleWebcache(url, 'div.promo-wrapper', '', 'div.article-page');
  }, 500);
}

else if (matchDomain('newrepublic.com')) {
  let modal = document.querySelector('div.article-scheduled-modal');
  let pw_popups = document.querySelector('div#pwPopups');
  removeDOMElement(modal, pw_popups);
  let ads = document.querySelectorAll('.ad-unit, .ad-container');
  hideDOMElement(...ads);
}

else if (matchDomain('newscientist.com')) {
  let url = window.location.href;
  let func_post = function () {
    let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
    for (let elem of lazy_images)
      elem.src = elem.getAttribute('data-src').split('?')[0] + '?width=800';
    let break_pre_array = pageContains('div.non-paywall > p', /…\s?$/);
    if (break_pre_array.length) {
      let break_pre = break_pre_array[0];
      let break_post = document.querySelector('div.paywall > p');
      if (break_post) {
        let parser = new DOMParser();
        let doc = parser.parseFromString('<p>' + DOMPurify.sanitize(break_pre.innerHTML.replace(/\s?…\s?/, ' ') + break_post.innerHTML) + '</p>', 'text/html');
        let content_new = doc.querySelector('p');
        break_pre.parentNode.replaceChild(content_new, break_pre);
        removeDOMElement(break_post);
      }
    }
  }
  getGoogleWebcache(url, 'section#subscription-barrier', '', 'div.article-body, article', func_post);
  window.setTimeout(function () {
    let ads = document.querySelectorAll('div[class*="Advert"]');
    hideDOMElement(...ads);
  }, 1500);
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

else if (matchDomain('newsweek.com')) {
  let ads = document.querySelectorAll('div#topad, div[id^="dfp-ad-"]');
  hideDOMElement(...ads);
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
  let banners = document.querySelectorAll('div.toast-cta, div.inline-ad');
  hideDOMElement(...banners);
}

else if (matchDomain('nytimes.com')) {
  waitDOMElement('div#dock-container', 'DIV', removeDOMElement, false);
  csDoneOnce = true;
  window.setTimeout(function () {
    let banners = document.querySelectorAll('div[data-testid="inline-message"], div[id^="ad-"], div.pz-ad-box');
    hideDOMElement(...banners);
  }, 1000);
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
    getArchive(url, 'div[data-page-area="article-body"]');
  }
}

else if (matchDomain('puck.news')) {
  if (dompurify_loaded)
    getJsonUrl('div[class*="paywall"]', '', 'div.entry-content', {art_append: true});
  let modal = document.querySelector('div#paywall-modal');
  removeDOMElement(modal);
  let overlay = document.querySelector('body.paywall-active');
  if (overlay)
    overlay.classList.remove('paywall-active');
  let article_style = document.querySelector('article[style]');
  if (article_style)
    article_style.removeAttribute('style');
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

else if (matchDomain('rp.pl')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'div.paywallComponentWrapper', '', 'div.main--content--body');
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
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_subscr_section('amp-ad, div.ad-banner, div.advert-fly-carpet-container, div.inline-advert');
    let default_meters = document.querySelectorAll('div[id^="default-meter-page-views"]');
    removeDOMElement(...default_meters);
  } else {
    let section_hidden = document.querySelectorAll('section[data-qa="ContentBody-ContentBodyContainer"][class]');
    for (let elem of section_hidden)
      elem.removeAttribute('class');
    let paywalled = document.querySelector('div.paywalled-content');
    if (paywalled)
      paywalled.removeAttribute('class');
    let ads = document.querySelectorAll('div[data-qa*="AdSlot"], div.adblock-message');
    hideDOMElement(...ads);
  }
}

else if (matchDomain('seattletimes.com')) {
  let ads = document.querySelectorAll('.top-ad-wrapper, .ad-container');
  hideDOMElement(...ads);
}

else if (matchDomain('seekingalpha.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    amp_redirect('div[data-test-id="post-locked-banner"]', {rm_attrib: "data-test-id"});
    let read_more = document.querySelector('button[id^="continueReadingButton"]');
    if (read_more)
      read_more.click();
  } else {
    amp_unhide_access_hide('*="premium_access OR"', '', '.ad-wrap');
    let paywall = document.querySelector('[class*="paywall-container"]');
    removeDOMElement(paywall);
  }
}

else if (matchDomain('slate.com')) {
  let slate_roadblock = document.querySelector('.slate-roadblock');
  let ads = document.querySelectorAll('section[class*="-ad"]');
  hideDOMElement(slate_roadblock, ...ads);
}

else if (matchDomain('slideshare.net')) {
  let limit_overlay = document.querySelector('.limit-overlay');
  if (limit_overlay)
    limit_overlay.classList.remove('limit-overlay');
}

else if (matchDomain('sloanreview.mit.edu')) {
  let url = window.location.href;
  getGoogleWebcache(url, 'body.is-paywall', {rm_class: 'is-paywall'}, 'div#article-content');
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
  let noscroll = document.querySelector('body[class]');
  if (noscroll)
    noscroll.style = 'overflow: auto !important; position: static !important;';
  let modal = document.querySelector('div.modal-backdrop');
  removeDOMElement(modal);
  let ads = document.querySelectorAll('div.ad-placeholder');
  hideDOMElement(...ads);
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

else if (matchDomain('stereogum.com')) {
  let paywall = document.querySelector('div.members-only-overlay-wrapper');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let json_url_dom = document.querySelector('head > link[rel="alternate"][type="application/json"][href]');
    if (json_url_dom) {
      let json_url = json_url_dom.href;
      fetch(json_url)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            try {
              let json_text = json.acf.article_modules[0].copy.replace(/data-src/g, 'src');
              let content = document.querySelector('div.article__content div.text-block__inner');
              if (json_text && content) {
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                let content_new = doc.querySelector('div');
                content.innerHTML = '';
                content.appendChild(content_new);
              }
            } catch (err) {
              console.log(err);
            }
          });
        }
      });
    }
  }
}

else if (matchDomain('stocknews.com')) {
  let hideme = document.querySelector('div#hideme');
  removeDOMElement(hideme);
  let blurmes = document.querySelectorAll('div[id^="blurme"]');
  for (let i = 0; i < blurmes.length; i++)
    blurmes[i].setAttribute('id', 'blurmenot' + i);
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

else if (matchDomain('swarajyamag.com')) {
  let paywall = document.querySelector('div#story-notification');
  if (paywall) {
    removeDOMElement(paywall);
    let non_subscriber_text = document.querySelector('div#non-subscriber-text');
    if (non_subscriber_text)
      non_subscriber_text.removeAttribute('id');
    let subscriber_text = document.querySelectorAll('div.subscriber-text');
    for (let elem of subscriber_text)
      elem.removeAttribute('class');
  }
}

else if (matchDomain('techinasia.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.paywall-content');
    if (paywall && dompurify_loaded) {
      paywall.classList.remove('paywall-content');
      let par_missing = paywall.querySelectorAll('div[id^="attachment_"], a.flourish-credit');
      let attach_xhr = Array.from(par_missing).some(x => !x.hasChildNodes());
      if (attach_xhr) {
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
    }
    let splash_subscribe = document.querySelector('div.splash-subscribe');
    let paywall_hard = document.querySelector('div.paywall-hard');
    removeDOMElement(splash_subscribe, paywall_hard);
  }, 3000);
}

else if (matchDomain(['techtarget.com', 'computerweekly.com', 'lemagit.fr'])) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let banners = document.querySelectorAll('p#firstP, div#inlineRegistrationWrapper');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('texasmonthly.com')) {
  let ads = document.querySelectorAll('div.promo-in-body');
  hideDOMElement(...ads);
}

else if (matchDomain('the-american-interest.com')) {
  let counter = document.getElementById('article-counter');
  removeDOMElement(counter);
}

else if (matchDomain('the-scientist.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let fader = document.querySelector('div.gated-fader');
    let modal = document.querySelector('div#Modal');
    removeDOMElement(fader, modal);
  }
}

else if (matchDomain('theamericanconservative.com')) {
  let paywall_sel = 'section.c-blog-post__body--locked';
  let paywall = document.querySelector(paywall_sel);
  if (paywall && dompurify_loaded) {
    let art_options = {
      art_append: true,
      func_text: function (json_text) {
        if (json_text.includes('<p class="has-drop-cap">')) {
          let split = json_text.split(/(<p class="has-drop-cap">)/);
          json_text = split[1] + split[2];
        };
        return json_text;
      }
    };
    getJsonUrl(paywall_sel, {rm_class: 'c-blog-post__body--locked'}, 'div.c-blog-post__content', art_options);
  } else {
    let img_dark = document.querySelector('div.c-hero-article__image-img.o-image');
    if (img_dark)
      img_dark.removeAttribute('class');
  }
  let modal = document.querySelector('div#emailsub-modal');
  removeDOMElement(modal);
  let noscroll = document.querySelector('body.modal-open');
  if (noscroll)
    noscroll.classList.remove('modal-open');
}

else if (matchDomain('theathletic.com')) {
  if (!(window.location.search.match(/(\?|&)amp/) && !document.querySelector('head > link[rel="amphtml"]'))) {
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
  hideDOMElement(apron, ...ads);
}

else if (matchDomain('theatlantic.com')) {
  let lazy_images = document.querySelectorAll('img[class*="Image_lazy__"]');
  for (let elem of lazy_images)
    removeClassesByPrefix(elem, 'Image_lazy__');
  let videos = document.querySelectorAll('iframe[data-src]:not([src])');
  for (let video of videos)
    video.src = video.getAttribute('data-src');
  let banners = document.querySelectorAll('aside#paywall, div[class^="LostInventoryMessage_"]');
  hideDOMElement(...banners);
}

else if (matchDomain('thebulletin.org')) {
  if (dompurify_loaded)
    getJsonUrl('div.article--cropped', '', 'div#body-copy', {art_append: true});
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
  if (matchDomain('magazine.thediplomat.com')) {
    csDoneOnce = true;
    for (let n = 0; n < 5; n++) {
      setTimeout(function () {
        let preview = document.querySelector('article.dpl-preview');
        if (preview)
          preview.classList.remove('dpl-preview');
      }, n * 500);
    }
  }
}

else if (matchDomain('theglobeandmail.com')) {
  if (!window.location.search.startsWith('?rel=premium')) {
    let paywall = document.querySelector('div.c-paywall');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = window.location.pathname + '?rel=premium';
    }
  } else {
    let html_nojs = document.querySelector('html.no-js');
    if (html_nojs)
      html_nojs.classList.remove('no-js');
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
    hideDOMElement(counter, ...ads);
  } else {
    let ads = document.querySelectorAll('amp-ad, amp-embed, [class^="height"], [class^="advt"], [id^="piano"]');
    hideDOMElement(...ads);
  }
  function hindu_main() {
    if (window) {
      window.Adblock = false;
      window.isNonSubcribed = false;
    }
  }
  insert_script(hindu_main);
}

else if (matchDomain('theimpression.com')) {
  let paywall = document.querySelector('div#modalpostsubscribe');
  if (paywall) {
    let blureffect = document.querySelectorAll('div.blureffect');
    for (let elem of blureffect)
      elem.classList.remove('blureffect');
  }
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
              if (elem.hasChildNodes()) {
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

else if (matchDomain('thenewsminute.com')) {
  let paywall = document.querySelector('div#paywall-banner');
  if (paywall) {
    removeDOMElement(paywall);
    let fade = document.querySelector('div[class^="paywall-story-styles-"]');
    if (fade)
      fade.removeAttribute('class');
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = breakText(parseHtmlEntities(json.articleBody.replace(/\.\./g, '.\r\n\r\n')));
        let article = document.querySelector('div.arr--story-page-card-wrapper');
        if (json_text && article) {
          article.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          article.appendChild(article_new);
        }
      }
    }
  }
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

else if (matchDomain('theverge.com')) {
  let paywall = document.querySelector('div.bg-paywall-fade');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let article = document.querySelector('div.duet--article--article-body-component-container');
        if (json && article) {
          let json_pars = json.props.pageProps.hydration.responses[0].data.entryRevision.body.components;
          article.innerHTML = '';
          let parser = new DOMParser();
          for (let par of json_pars) {
            let elem = document.createElement('p');
            elem.style = 'margin: 20px 0px;';
            let type = par.__typename;
            if (['EntryBodyParagraph', 'EntryBodyHeading'].includes(type)) {
              if (par.contents && par.contents.html) {
                if (type === 'EntryBodyHeading')
                  elem.style = 'font-weight: bold;';
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.contents.html) + '</div>', 'text/html');
                elem.appendChild(doc.querySelector('div'));
              }
            } else if (type === 'EntryBodyHorizontalRule') {
              elem.appendChild(document.createElement('hr'));
            } else if (type === 'EntryBodyImage') {
              if (par.image && par.image.url) {
                let figure = document.createElement('figure');
                if (par.image.asset && par.image.asset.title)
                  figure.appendChild(document.createTextNode(par.image.asset.title));
                let img = document.createElement('img');
                img.src = par.image.url;
                figure.appendChild(img);
                if (par.image.caption && par.image.caption.html) {
                  let caption = document.createElement('figcaption');
                  caption.innerText = par.image.caption.html;
                  if (par.image.credit && par.image.credit.html)
                    caption.innerText += ' - ' + par.image.credit.html;
                  figure.appendChild(caption);
                }
                elem.appendChild(figure);
              }
            } else if (type === 'EntryBodyPullquote') {
              if (par.quote && par.quote.html) {
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.quote.html) + '</div>', 'text/html');
                elem.appendChild(doc.querySelector('div'));
              }
            } else if (type === 'EntryBodyBlockquote') {
              if (par.paragraphs) {
                for (let quote_par of par.paragraphs) {
                  if (quote_par.contents && quote_par.contents.html) {
                    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(quote_par.contents.html) + '</div>', 'text/html');
                    elem.appendChild(doc.querySelector('div'));
                  }
                }
              }
            } else if (type === 'EntryBodyList') {
              if (par.items) {
                let ul = document.createElement('ul');
                for (let item of par.items) {
                  if (item.line && item.line.html) {
                    let li = document.createElement('li');
                    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(item.line.html) + '</div>', 'text/html');
                    li.appendChild(doc.querySelector('div'));
                    ul.appendChild(li);
                  }
                }
                elem.appendChild(ul);
              }
            } else
              console.log(par);
            if (elem.hasChildNodes())
              article.appendChild(elem);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('theweek.com')) {
  let paywall = document.querySelector('div.kiosq-main-layer');
  removeDOMElement(paywall);
  let locker = document.querySelector('div.paywall-locker');
  if (locker)
    locker.classList.remove('paywall-locker');
}

else if (matchDomain('thewrap.com')) {
  if (dompurify_loaded)
    getJsonUrl('div#zephr-payment-form-root', '', 'div.entry-content', {art_append: true});
  let fade = document.querySelector('div.content-area div[style*="background-image: linear-gradient"]');
  removeDOMElement(fade);
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
  hideDOMElement(...ads);
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
    amp_redirect('div[id^="story-blocker"]', '', url.replace('/timesofindia.indiatimes.com/', '/m.timesofindia.com/').replace('/articleshow/', '/amp_articleshow/'));
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
    let fade = document.querySelector('div[style*="background-image: linear-gradient"]');
    if (fade) {
      removeDOMElement(fade);
      let header = document.querySelector('div.article-body > div');
      header_nofix(header);
    }
  }
}

else if (matchDomain(uk_incisive_media_domains)) {
  let url = window.location.href;
  let paywall_sel = 'div#d-wrapper';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let live_blog = document.querySelector('head > meta[name="description"][content^="In this live blog"]');
    let article_sel = 'div.article-content';
    let article = document.querySelector(article_sel);
    if (article) {
      if (live_blog) {
        removeDOMElement(paywall);
        article.firstChild.before(googleWebcacheLink(url));
      } else {
        getGoogleWebcache(url, 'div#d-wrapper', '', article_sel);
      }
    }
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
  if (matchDomain('european-rubber-journal.com')) {
    let paywall = document.querySelector('div.article-overlay');
    if (paywall) {
      let fade = document.querySelector('div.gradient');
      removeDOMElement(paywall, fade);
      let truncated = document.querySelector('div.truncated');
      if (truncated)
        truncated.classList.remove('truncated');
    }
  } else {
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
  let banners = document.querySelectorAll('div.footer__ads-footer');
  hideDOMElement(...banners);
}

else if (matchDomain(usa_nymag_domains)) {
  let ads = document.querySelectorAll('div.m-ad');
  hideDOMElement(...ads);
}

else if (matchDomain(usa_outside_mag_domains)) {
  let ads = document.querySelectorAll('div.js-ad');
  hideDOMElement(...ads);
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

else if (matchDomain('vikatan.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div#paywallDisplay');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = parseHtmlEntities(json.articleBody);
          let content = document.querySelector('div.story-element > div');
          if (json_text && content) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.parentNode.replaceChild(content_new, content);
          }
        }
      }
    }
    let story_hidden = document.querySelector('div[class^="styles-m__story-card-wrapper_"]');
    if (story_hidden)
      story_hidden.removeAttribute('class');
  }, 500);
}

else if (matchDomain('washingtonpost.com')) {
  let leaderboard = document.querySelector('#leaderboard-wrapper');
  let ads = document.querySelectorAll('div[data-qa$="-ad"]');
  hideDOMElement(leaderboard, ...ads);
}

else if (matchDomain('winnipegfreepress.com')) {
  let ads = document.querySelectorAll('.billboard-ad-space, .ad, .article-ad, .fixed-sky');
  hideDOMElement(...ads);
}

else if (matchDomain('wsj.com')) {
  if (matchDomain('www.wsj.com'))
    blockJsReferrer();
  if (window.location.pathname.startsWith('/livecoverage/')) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div#cx-lc-snippet');
      let amphtml = document.querySelector('head > link[rel="amphtml"]');
      if (paywall) {
        removeDOMElement(paywall);
        if (amphtml) {
          amp_redirect_not_loop(amphtml);
        } else {
          let fade = document.querySelectorAll('div[class*="-CardWrapper"]');
          for (let elem of fade)
            elem.removeAttribute('class');
        }
      }
    }, 1000);
  } else {
    let url_article = window.location.pathname.includes('/articles/');
    let path_article = window.location.pathname.match(/((\w)+(\-)+){3,}\w+/);
    if (url_article || path_article) {
      if (window.location.pathname.startsWith('/amp/')) {
        amp_unhide_subscr_section();
        let masthead_link = document.querySelector('div.masthead > a[href*="-"]');
        if (masthead_link)
          masthead_link.href = 'https://www.wsj.com';
      } else {
        let snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
        if (snippet) {
          removeDOMElement(snippet);
          if (!matchDomain('www.wsj.com')) {
            if (url_article)
              window.location.href = window.location.href.replace('wsj.com', 'wsj.com/amp');
            else
              window.location.href = '/amp/articles/' + path_article[0];
          } else {
            let wsj_pro = snippet.querySelector('a[href^="https://wsjpro.com/"]');
            let article = document.querySelector('article');
            if (article) {
              window.setTimeout(function () {
                if (wsj_pro) {
                  article.firstChild.before(googleSearchToolLink(window.location.href));
                  article.firstChild.before(archiveLink(window.location.href, 'BPC > Try for full article text (articles before 2023-10-28)'));
                } else
                  article.firstChild.before(archiveLink(window.location.href));
              }, 500);
              csDoneOnce = true;
              waitDOMElement('div.paywall', 'DIV', node => hideDOMElement(...document.querySelectorAll('div#bpc_archive')), false);
            }
          }
        }
      }
    }
  }
  let ads = document.querySelectorAll('div.wsj-ad, div.adWrapper, div.uds-ad-container');
  hideDOMElement(...ads);
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

else if ((domain = matchDomain(usa_lee_ent_domains)) || matchDomain(ca_torstar_domains.concat(['abqjournal.com'])) || document.querySelector('script[src*=".townnews.com/"][src*="/tncms/"]')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('="hasAccess"', '="NOT hasAccess"', 'amp-ad, amp-embed, .amp-ads-container');
    let elem_hidden = document.querySelectorAll('html[class], body[class]');
    for (let elem of elem_hidden)
      elem.removeAttribute('class');
    let amp_images = document.querySelectorAll('div.main-content amp-img[src^="https://"]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      Object.assign(elem, {
        src: amp_image.getAttribute('src'),
        alt: amp_image.getAttribute('alt'),
        height: '400'
      });
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
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
      let paywall = document.querySelector('div.subscriber-offers');
      removeDOMElement(paywall);
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
    let ads = document.querySelectorAll('div.tnt-ads-container, div[class*="adLabelWrapper"]');
    hideDOMElement(...ads);
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
  hideDOMElement(...ads);
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

} // end bpc_done

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

function header_nofix(header, msg = 'BPC > no fix') {
  if (header && !document.querySelector('div#bpc_nofix')) {
    let nofix_div = document.createElement('div');
    nofix_div.id = 'bpc_nofix';
    nofix_div.style = 'margin: 20px; font-size: 20px; font-weight: bold; color: red;';
    nofix_div.innerText = msg;
    header.before(nofix_div);
  }
}

function blockJsReferrer() {
  if (document.head && !document.querySelector('head > meta[name="referrer"][content="no-referrer"]')) {
    var meta = document.createElement('meta');
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);
  }
}

function clearPaywall(paywall, paywall_action) {
  if (paywall) {
    if (!paywall_action)
      removeDOMElement(...paywall);
    else {
      for (let elem of paywall) {
        if (paywall_action.rm_class)
          elem.classList.remove(paywall_action.rm_class);
        else if (paywall_action.rm_attrib)
          elem.removeAttribute(paywall_action.rm_attrib);
      }
    }
  }
}

function getGoogleWebcache(url, paywall_sel, paywall_action = '', article_sel, func_post = '', article_new_sel = article_sel) {
  let url_cache = 'https://webcache.googleusercontent.com/search?q=cache:' + url.split(/[#\?]/)[0];
  let paywall = document.querySelectorAll(paywall_sel);
  if (paywall.length) {
    clearPaywall(paywall, paywall_action);
    csDoneOnce = true;
    replaceDomElementExt(url_cache, true, false, article_sel, '', article_new_sel);
    if (func_post) {
      window.setTimeout(function () {
        func_post();
      }, 1500);
    }
  }
}

function getArchive(url, selector, text_fail = '', selector_source = selector, selector_archive = selector) {
  let url_archive = 'https://' + archiveRandomDomain() + '/' + url.split(/[#\?]/)[0];
  replaceDomElementExt(url_archive, true, false, selector, text_fail, selector_source, selector_archive);
}

function replaceDomElementExt(url, proxy, base64, selector, text_fail = '', selector_source = selector, selector_archive = selector) {
  if (proxy) {
    if (!text_fail) {
      if (url.startsWith('https://webcache.googleusercontent.com'))
        text_fail = 'BPC > failed to load from Google webcache:\r\n';
      else if (url.startsWith('https://archive.'))
        text_fail = 'BPC > Try for full article text (no need to report issue for external site):\r\n';
    }
    ext_api.runtime.sendMessage({request: 'getExtSrc', data: {url: url, selector: selector, selector_source: selector_source, selector_archive: selector_archive, base64: base64, text_fail: text_fail}});
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
          replaceDomElementExtSrc(url, '', html, false, base64, selector, text_fail, selector_source);
        });
      } else {
        replaceTextFail(url, article, proxy, text_fail);
      }
    }).catch(function (err) {
      false;
    });
  }
}

function replaceDomElementExtSrc(url, url_src, html, proxy, base64, selector, text_fail = '', selector_source = selector, selector_archive = selector) {
  let article = document.querySelector(selector);
  if (html) {
    if (base64) {
      html = decode_utf8(atob(html));
      selector_source = 'body';
    }
    let parser = new DOMParser();
    window.setTimeout(function () {
      if (url.startsWith('https://archive.') && url_src) {
        let domain_archive = url.match(/^https:\/\/(archive\.\w{2})/)[1];
        let pathname = new URL(url_src).pathname;
        html = html.replace(new RegExp('https:\\/\\/' + domain_archive.replace('.', '\\.') + '\\/o\\/\\w+\\/', 'g'), '').replace(new RegExp("(src=\"|background-image:url\\(')" + pathname.replace('/', '\\/'), 'g'), "$1" + 'https://' + domain_archive + pathname);
      }
      let doc = parser.parseFromString(DOMPurify.sanitize(html, dompurify_options), 'text/html');
      //console.log(DOMPurify.removed);
      let article_new = doc.querySelector(selector_source);
      if (article_new) {
        if (article && article.parentNode) {
          if (url.startsWith('https://archive.')) {
            let arch_dom = (selector_archive !== selector) ? article_new.querySelector(selector_archive) : article_new;
            if (arch_dom) {
              arch_dom.firstChild.before(archiveLink_renew(window.location.href));
              arch_dom.firstChild.before(archiveLink(window.location.href, 'BPC > Try when layout issues (no need to report issue for external site):\r\n'));
            }
            window.setTimeout(function () {
              let targets = document.querySelectorAll('a[target="_blank"][href^="https://' + window.location.hostname + '"]');
              for (let elem of targets)
                elem.removeAttribute('target');
            }, 1500);
          }
          article.parentNode.replaceChild(article_new, article);
        }
      } else
        replaceTextFail(url, article, proxy, text_fail);
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
      if (url.startsWith('https://archive.')) {
        text_fail_div = archiveLink(url.replace(/^https:\/\/archive\.\w{2}\//, ''));
      } else {
        let a_link = document.createElement('a');
        a_link.innerText = url;
        a_link.href = url;
        a_link.target = '_blank';
        text_fail_div.appendChild(a_link);
      }
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
        height: amp_iframe.getAttribute('height'),
        width: 'auto',
        style: 'border: 0px;'
      });
      if (amp_iframe.getAttribute('sandbox'))
        elem.sandbox = amp_iframe.getAttribute('sandbox');
      amp_iframe.parentNode.replaceChild(elem, amp_iframe);
    } else {
      par = document.createElement('p');
      par.style = 'margin: 20px 0px;';
      elem = document.createElement('a');
      elem.innerText = 'Media-link';
      elem.setAttribute('href', amp_iframe.getAttribute('src'));
      elem.setAttribute('target', '_blank');
      par.appendChild(elem);
      amp_iframe.parentNode.replaceChild(par, amp_iframe);
    }
  }
}

function amp_redirect_not_loop(amphtml) {
  let amp_redirect_date = Number(sessionStorage.getItem('###_amp_redirect'));
  if (!(amp_redirect_date && Date.now() - amp_redirect_date < 2000)) {
    sessionStorage.setItem('###_amp_redirect', Date.now());
    window.location.href = amphtml.href;
  } else {
    let header = (document.body && document.body.firstChild) || document.documentElement;
    header_nofix(header, 'BPC > redirect to amp failed (disable amp-to-html extension/add-on or browser setting)');
  }
}

function amp_redirect(paywall_sel, paywall_action = '', amp_url = '') {
  let paywall = document.querySelectorAll(paywall_sel);
  let amphtml = document.querySelector('head > link[rel="amphtml"]');
  if (!amphtml && amp_url)
    amphtml = {href: amp_url};
  if (paywall.length && amphtml) {
    clearPaywall(paywall, paywall_action);
    amp_redirect_not_loop(amphtml);
  }
}

function amp_unhide_subscr_section(amp_ads_sel = 'amp-ad, .ad', replace_iframes = true, amp_iframe_link = false, source = '') {
  let preview = document.querySelectorAll('[subscriptions-section="content-not-granted"]');
  removeDOMElement(...preview);
  let subscr_section = document.querySelectorAll('[subscriptions-section="content"]');
  for (let elem of subscr_section)
    elem.removeAttribute('subscriptions-section');
  let amp_ads = document.querySelectorAll(amp_ads_sel);
  hideDOMElement(...amp_ads);
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
  hideDOMElement(...amp_ads);
  if (replace_iframes)
    amp_iframes_replace(amp_iframe_link, source);
}

function ampToHtml() {
  window.setTimeout(function () {
    let canonical = document.querySelector('head > link[rel="canonical"]');
    window.location.href = canonical.href;
  }, 1000);
}

function refreshCurrentTab() {
  window.setTimeout(function () {
    window.location.reload(true);
  }, 500);
}

function refreshCurrentTab_bg() {
  ext_api.runtime.sendMessage({request: 'refreshCurrentTab'});
}

function archiveRandomDomain() {
  let tld_array = ['fo', 'is', 'li', 'md', 'ph', 'vn'];
  let tld = tld_array[randomInt(6)];
  return 'archive.' + tld;
}

function archiveLink(url, text_fail = 'BPC > Try for full article text (no need to report issue for external site):\r\n') {
  return externalLink(['archive.today', archiveRandomDomain()], 'https://{domain}?run=1&url={url}', url, text_fail);
}

function archiveLink_renew(url, text_fail = 'BPC > Only use to renew if text is incomplete or updated:\r\n') {
  return externalLink([archiveRandomDomain()], 'https://{domain}?renew=1&url={url}', url, text_fail);
}

function googleWebcacheLink(url, text_fail = 'BPC > Try for full article text:\r\n') {
  if (!matchUrlDomain(['hbrchina.org'], url))
    url = url.split('?')[0];
  return externalLink(['webcache.googleusercontent.com'], 'https://{domain}/search?q=cache:{url}', url, text_fail);
}

function googleSearchToolLink(url, text_fail = 'BPC > Full article text (test url & copy html (tab) code to [https://codebeautify.org/htmlviewer]:\r\n') {
  return externalLink(['search.google.com'], 'https://search.google.com/test/rich-results?url={url}', encodeURIComponent(url), text_fail);
}

function nftLink(url, text_fail = 'BPC > Full article text:\r\n') {
  return externalLink(['1ft.io'], 'https://{domain}/{url}', url, text_fail);
}

function freediumLink(url, text_fail = 'BPC > Try for full article text:\r\n') {
  return externalLink(['freedium.cfd'], 'https://{domain}/{url}', url, text_fail);
}

function externalLink(domains, ext_url_templ, url, text_fail = 'BPC > Full article text:\r\n') {
  let text_fail_div = document.createElement('div');
  text_fail_div.id = 'bpc_archive';
  text_fail_div.setAttribute('style', 'margin: 20px; font-size: 20px; font-weight: bold; color: red;');
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
  let source = '';
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

function getJsonUrlText(article, callback, article_id = '') {
  let json_url_dom = document.querySelector('head > link[rel="alternate"][type="application/json"][href]');
  let json_url = json_url_dom.href;
  if (!json_url && article_id)
    json_url = 'https://' + window.location.hostname + '/wp-json/wp/v2/posts/' + article_id;
  if (json_url) {
    fetch(json_url)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          try {
            let json_text = parseHtmlEntities(json.content.rendered);
            callback(json_text, article);
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  }
}

function getJsonUrlAdd(json_text, article, art_options = {}) {
  let art_type = 'div';
  let art_attrib = '';
  if (Object.keys(art_options).length) {
    if (art_options.art_type)
      art_type = art_options.art_type;
    if (art_options.art_class)
      art_attrib += ' class="' + art_options.art_class + '"';
    if (art_options.art_id)
      art_attrib += ' id="' + art_options.art_id + '"';
    if (art_options.art_style)
      art_attrib += ' style="' + art_options.art_style + '"';
    if (art_options.func_text)
      json_text = art_options.func_text(json_text);
  }
  let parser = new DOMParser();
  let doc = parser.parseFromString('<' + art_type + art_attrib + '>' + DOMPurify.sanitize(json_text, dompurify_options) + '</' + art_type + '>', 'text/html');
  let article_new = doc.querySelector(art_type);
  if (art_options.art_append || !article.parentNode) {
    if (!art_options.art_hold)
      article.innerHTML = '';
    article.appendChild(article_new);
  } else
    article.parentNode.replaceChild(article_new, article);
}
  
function getJsonUrl(paywall_sel, paywall_action = '', article_sel, art_options = {}, article_id = '') {
  let paywall = document.querySelectorAll(paywall_sel);
  let article = document.querySelector(article_sel);
  if (paywall.length && article && dompurify_loaded) {
    clearPaywall(paywall, paywall_action);
    getJsonUrlText(article, (json_text, article) => {
      if (json_text && article)
        getJsonUrlAdd(json_text, article, art_options);
    }, article_id);
  }
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

function findOverlap(a, b) {
  if (b.length === 0)
    return "";
  if (a.endsWith(b))
    return b;
  return findOverlap(a, b.substring(0, b.length - 1));
}

function breakText(str, headers = false) {
  str = str.replace(/(?:^|[A-Za-z\"\“\)])(\.|\?|!)(?=[A-ZÖÜ\„\d][A-Za-zÀ-ÿ\„\d]{1,})/gm, "$&\n\n");
  if (headers)
    str = str.replace(/(([a-z]{2,}|[\"\“]))(?=[A-Z](?=[A-Za-zÀ-ÿ]+))/gm, "$&\n\n");
  return str;
}

function breakText_headers(str) {
  str = breakText(str, true);
  // exceptions: names with alternating lower/uppercase (no general fix)
  let str_rep_arr = ['AstraZeneca', 'BaFin', 'BerlHG', 'BfArM', 'BilMoG', 'BioNTech', 'ChatGPT', 'DiGA', 'EuGH', 'FinTechRat', 'GlaxoSmithKline', 'IfSG', 'medRxiv', 'mmHg', 'OpenAI', 'PlosOne', 'StVO', 'TikTok'];
  let str_rep_split;
  let str_rep_src;
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
}

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
