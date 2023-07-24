//'use strict';
var ext_api = (typeof browser === 'object') ? browser : chrome;

if (matchDomain('gitlab.com')) {
  window.setTimeout(function () {
    let bio = document.querySelector('p.profile-user-bio');
    if (bio) {
      let split = bio.innerText.split(/(https:[\w\-/.]+)|\|/g).filter(x => x && x.trim());
      bio.innerText = '';
      for (let part of split) {
        let elem;
        if (part.startsWith('https')) {
          elem = document.createElement('a');
          elem.innerText = part;
          elem.href = part;
          elem.appendChild(document.createElement('br'));
        } else {
          elem = document.createElement('b');
          elem.appendChild(document.createTextNode(part));
          if (!part.includes(':'))
            elem.appendChild(document.createElement('br'));
        }
        bio.appendChild(elem);
      }
    }
  }, 1000);
}

else {
window.setTimeout(function () {

  let hostname = window.location.hostname;
  let custom_domain = getCookieDomain(hostname);
  let group;
  if (hostname) {
    if (document.querySelector('script[src*=".medium.com/"]') || matchDomain(['plainenglish.io']))
      group = 'medium.com';
    else if (document.querySelector('script[src*="/leaky-paywall"], link[href*="/leaky-paywall"]'))
      group = '###_wp_leaky_paywall';
    else if (document.querySelector('script[src*="/substackcdn.com/"], link[rel="stylesheet"][href*="/substackcdn.com/"]'))
      group = '###_substack_custom';// no fix
    else if (document.querySelector('script[src*="/wp-content/themes/pmgnews/scripts/promedia.js"], form[action^="https://go.promedia.nl/"]'))
      group = '###_nl_promedia';
    else if (hostname.match(/\.(com|net)\.au$/)) {
      if (document.querySelector('a[href^="https://austcommunitymedia.my.site.com/"]'))
        group = '###_au_comm_media';
      else if (hostname.endsWith('.com.au')) {
        if (document.querySelector('li > a[href*=".sevenwestmedia.com.au"]'))
          group = 'thewest.com.au';
      }
    } else if (hostname.endsWith('.be')) {
        if (matchDomain(['gva.be', 'hbvl.be', 'nieuwsblad.be', 'standaard.be']))
          group = '###_be_mediahuis';// no fix
    } else if (hostname.endsWith('.cl')) {
      if (document.querySelector('meta[property="og:image"][content*="/impresa.soy-chile.cl/"]'))
        group = 'elmercurio.com';
    } else if (hostname.match(/\.(de|at|ch)$/) || matchDomain(['horizont.net', 'lebensmittelzeitung.net'])) {
      if (document.querySelector('script[src*="/dfv.containers.piwik.pro/"]'))
        group = '###_de_dfv_medien';
      else if (document.querySelector('script[data-cmp-src*=".funkedigital.de/"], div#fmg-markenanker > a[href="https://www.funkemedien.de/"]'))
        group = '###_de_funke_medien';
      else if (document.querySelector('div.navigation__personalization > a[href^="https://www.haas-mediengruppe.de/"]'))
        group = '###_de_haas_medien';
      else if (document.querySelector('link[href*=".rndtech.de/"]'))
        group = '###_de_madsack';
      else if (document.querySelector('div.mgw-integration > a.mgw__link'))
        group = '###_de_mgw';
      else if (matchDomain(['cannstatter-zeitung.de', 'esslinger-zeitung.de', 'frankenpost.de', 'insuedthueringen.de', 'krzbb.de', 'kurier.de', 'np-coburg.de', 'verlagshaus-jaumann.de']))
        group = '###_de_mhs';
      else if (matchDomain(['aachener-nachrichten.de', 'aachener-zeitung.de', 'ga.de', 'rp-online.de', 'saarbruecker-zeitung.de', 'volksfreund.de']))
        group = '###_de_rp_aachen_medien';// no fix
      else if (matchDomain(['buerstaedter-zeitung.de', 'hochheimer-zeitung.de', 'lampertheimer-zeitung.de', 'lauterbacher-anzeiger.de', 'main-spitze.de', 'mittelhessen.de', 'oberhessische-zeitung.de', 'wormser-zeitung.de']))
        group = '###_de_vrm';
      else if (document.querySelector('link[href*="/assets.static-chmedia.ch/"]'))
        group = 'nzz.ch';
      else if (document.querySelector('link[href*=".tamedia.ch/"]'))
        group = '###_ch_tamedia';// no fix
    } else if (hostname.match(/\.(es|cat)$/) || matchDomain(['diariocordoba.com', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info'])) {
      if (document.querySelector('link[href*="/estaticos-cdn."]'))
        group = '###_es_epiberica';
      else if (document.querySelector('div > ul > li > a[href="https://www.sportlife.es/"]'))
        group = '###_es_sport_life';
    } else if (hostname.endsWith('.fi')) {
      if (document.querySelector('link[href^="https://assets.almatalent.fi"]'))
        group = '###_fi_alma_talent';// no fix
    } else if (hostname.endsWith('.fr')) {
      if (document.querySelector('link[href*=".fr/static/bloc/ripolinage/header/cf-header/"]'))
        group = '###_fr_gcf';
    } else if (hostname.endsWith('.it')) {
      if (document.querySelector('link[href^="//citynews.stgy.ovh/"]'))
        group = '###_it_citynews';// no fix
      else if (matchDomain(['gazzettadimodena.it', 'gazzettadireggio.it', 'lanuovaferrara.it']))
        group = '###_it_gruppo_sae';
    } else if (hostname.endsWith('.nl')) {
      if (document.querySelector('link[href*=".ndcmediagroep.nl/"]'))
        group = '###_nl_mediahuis_noord';
      else if (document.querySelector('link[rel="dns-prefetch"][href^="https://vmn-"][href$="imgix.net"]'))
       group = '###_nl_vmnmedia';// no fix
    } else if (hostname.endsWith('.se')) {
      if (document.querySelector('footer > div > div > a[href="https://www.nwtmedia.se/"]'))
        group = '###_se_nwt_media';
    } else if (hostname.endsWith('.co.uk')) {
      if (document.querySelector('footer > div a[href^="https://www.nationalworldplc.com"]'))
        group = '###_uk_nat_world';
    } else if (hostname.match(/\.(ca|com|net|news|org)$/)) {
      if (document.querySelector('picture > source[srcset*="%2Fgcm.omerlocdn.com%2F"]'))
        group = '###_ca_gcm';
      else if (document.querySelector('script[src*=".postmedia.digital/"], meta[content*=".postmedia.digital/"]'))
        group = '###_ca_postmedia';
      else if (document.querySelector('script[src*=".axate.io/"], script[src*=".agate.io/"]'))
        group = '###_uk_axate.io';
      else if (document.querySelector('img[srcset^="https://www.gannett-cdn.com/"], link[href*=".gannett-cdn.com/"]'))
        group = '###_usa_gannett';
      else if (document.querySelector('script[src*="/treg.hearstnp.com/"]'))
        group = '###_usa_hearst_comm';
      else if (document.querySelector('script[src*=".townnews.com/"][src*="leetemplates.com/'))
        group = '###_usa_lee_ent';
      else if (document.querySelector('script[src*=".townnews.com/"][src*="/tncms/"]'))
        group = '###_usa_townnews';
      else if (document.querySelector('meta[content^="https://www.mcclatchy-wires.com/"], a[href^="https://classifieds.mcclatchy.com/"], script[src*=".mcclatchyinteractive.com/"]'))
        group = '###_usa_mcc';
      else if (document.querySelector('script[src*=".com/wp-content/plugins/dfm"], amp-img#paywall[src*=".com/wp-content/plugins/dfm-amp-mods/"]'))
        group = '###_usa_mng';
      else if (hostname.match(/\.com$/)) {
        if (matchDomain(['journalauto.com', 'journaldupneu.com', 'j2rauto.com']))
          group = '###_fr_synerj';
        else if (document.querySelector('link[href*=".com/wp-content/themes/madavor/"]'))
          group = '###_usa_madavor';
        else if (document.querySelector('img[data-src*="/wp-content/plugins/pragmatic-pei-rebranding/"]'))
          group = '###_usa_pei';
        else if (matchDomain(['dayton.com', 'daytondailynews.com', 'journal-news.com', 'springfieldnewssun.com']))
          group = 'ajc.com';// Cox First Media
        else if (matchDomain(['accountingtoday.com', 'benefitnews.com', 'bondbuyer.com', 'dig-in.com', 'financial-planning.com', 'nationalmortgagenews.com']))
          group = 'americanbanker.com';// Arizent
      }
    }

    ext_api.runtime.sendMessage({
      request: 'custom_domain',
      data: {
        domain: custom_domain,
        group: group
      }
    });
  }

}, 1000);	
}

function matchDomain(domains, hostname) {
  var matched_domain = false;
  if (!hostname)
    hostname = window.location.hostname;
  if (typeof domains === 'string')
    domains = [domains];
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
  return matched_domain;
}

function getCookieDomain(hostname) {
  let domain = hostname;
  let n = 0;
  let parts = hostname.split('.');
  let str = '_gd' + (new Date()).getTime();
  try {
  while (n < (parts.length - 1) && document.cookie.indexOf(str + '=' + str) == -1) {
    domain = parts.slice(-1 - (++n)).join('.');
    document.cookie = str + "=" + str + ";domain=" + domain + ";";
  }
  document.cookie = str + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
  } catch (e) {
    console.log(e);
  }
  return domain;
}
