(function visitorHomeV4(){
"use strict";
const lang=()=>window.asloAuth?.lang?.()||"es";
const tx=(es,en,de)=>({es,en,de})[lang()]||es;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&quot;"}[c]));
const img=(photo,w=900)=>"https://images.unsplash.com/"+photo+"?auto=format&fit=crop&w="+w+"&q=72";
const photos={
field:img("photo-1574629810360-7efbbe195018",1100),
soccer:img("photo-1522778119026-d647f0596c20",1200),
stadium:img("photo-1540747913346-19e32dc3e97e",1100),
ball:img("photo-1579952363873-27f3bade9f55",700),
basket:img("photo-1519861531473-9200262188bf",800),
tennis:img("photo-1622279457486-62dcc4a431d6",800),
cycling:img("photo-1517649763962-0c623066013b",800),
run:img("photo-1552674605-db6ffd4facb5",800),
swim:img("photo-1530549387789-4c1017266635",700),
training:img("photo-1530549387789-4c1017266635",700)
};
const sports=[
["all","✦","Todos","All","Alle"],["futbol","⚽","Fútbol","Football","Fußball"],["baloncesto","🏀","Baloncesto","Basketball","Basketball"],["voleibol","🏐","Voleibol","Volleyball","Volleyball"],["tenis","🎾","Tenis","Tennis","Tennis"],["ciclismo","🚴","Ciclismo","Cycling","Radsport"],["atletismo","🏃","Atletismo","Athletics","Leichtathletik"],["natacion","🏊","Natación","Swimming","Schwimmen"]
];
const sportName=s=>{const x=sports.find(x=>x[0]===s)||sports[0];return x[lang()==="de"?4:lang()==="en"?3:2]};
const geo={
"Colombia":{"Cundinamarca":["Soacha","Bogotá","Chía"],"Antioquia":["Medellín","Envigado"],"Valle del Cauca":["Cali","Palmira"]},
"México":{"Ciudad de México":["Ciudad de México"],"Jalisco":["Guadalajara"]},
"España":{"Madrid":["Madrid","Alcalá de Henares"],"Cataluña":["Barcelona"]}
};
const sponsors=[
{brand:"ADIDAS",tag:"IMPULSA TU PASIÓN",photo:photos.soccer,link:"https://www.adidas.com/",tone:"orange"},
{brand:"NIKE",tag:"SIN LÍMITES",photo:photos.run,link:"https://www.nike.com/",tone:"blue"},
{brand:"GATORADE",tag:"HIDRATA EL JUEGO",photo:photos.basket,link:"https://www.gatorade.com/",tone:"red"},
{brand:"PUMA",tag:"JUEGA COMO ERES",photo:photos.field,link:"https://us.puma.com/",tone:"green"},
{brand:"ASICS",tag:"EN MOVIMIENTO",photo:photos.run,link:"https://www.asics.com/",tone:"blue"},
{brand:"UNDER ARMOUR",tag:"SUPERAR TUS LÍMITES",photo:photos.training,link:"https://www.underarmour.com/",tone:"red"},
{brand:"NEW BALANCE",tag:"SIEMPRE EN MOVIMIENTO",photo:photos.cycling,link:"https://www.newbalance.com/",tone:"orange"},
{brand:"DECATHLON",tag:"DEPORTE PARA TODOS",photo:photos.tennis,link:"https://www.decathlon.com/",tone:"green"}
];
const news=[
{id:1,sport:"futbol",country:"Colombia",region:"Cundinamarca",city:"Soacha",rank:98,age:1,photo:photos.soccer,category:"FÚTBOL",title:["La pasión del fútbol se vive en cada rincón","Football excitement reaches every corner","Fußballbegeisterung überall"],description:["Los equipos locales protagonizan otra jornada vibrante.","Local teams light up another exciting round.","Lokale Teams erleben einen spannenden Spieltag."]},
{id:2,sport:"baloncesto",country:"Colombia",region:"Cundinamarca",city:"Soacha",rank:96,age:2,photo:photos.basket,category:"BALONCESTO",title:["La nueva generación conquista la cancha","A new generation takes the court","Eine neue Generation erobert das Spielfeld"],description:["Jóvenes talentos destacan en sus torneos.","Young talent shines in local competitions.","Junge Talente überzeugen in lokalen Wettbewerben."]},
{id:3,sport:"tenis",country:"Colombia",region:"Cundinamarca",city:"Bogotá",rank:93,age:3,photo:photos.tennis,category:"TENIS",title:["Una promesa avanza en el torneo regional","Rising talent advances in regional tournament","Nachwuchstalent erreicht die nächste Runde"],description:["Los mejores encuentros siguen en marcha.","The best matches continue.","Die besten Spiele gehen weiter."]},
{id:4,sport:"ciclismo",country:"Colombia",region:"Antioquia",city:"Medellín",rank:90,age:4,photo:photos.cycling,category:"CICLISMO",title:["Etapa decisiva en la vuelta regional","A decisive stage in the regional race","Entscheidende Etappe im regionalen Rennen"],description:["La competencia se define en cada kilómetro.","Every kilometer counts.","Jeder Kilometer zählt."]},
{id:5,sport:"voleibol",country:"Colombia",region:"Cundinamarca",city:"Chía",rank:88,age:5,photo:photos.stadium,category:"VOLEIBOL",title:["Las campeonas mantienen su invicto","Champions extend their unbeaten run","Die Meisterinnen bleiben ungeschlagen"],description:["La temporada mantiene su intensidad.","The season keeps up its pace.","Die Saison bleibt spannend."]},
{id:6,sport:"futbol",country:"Colombia",region:"Cundinamarca",city:"Bogotá",rank:90,age:6,photo:photos.field,category:"FÚTBOL",title:["El clásico deja emociones hasta el final","A thrilling derby goes down to the wire","Das Derby bleibt bis zum Schluss spannend"],description:["Resultados y novedades de la región.","Regional results and updates.","Ergebnisse und Neuigkeiten aus der Region."]},
{id:7,sport:"atletismo",country:"México",region:"Jalisco",city:"Guadalajara",rank:87,age:7,photo:photos.run,category:"ATLETISMO",title:["Una nueva marca sorprende en la pista","A new record surprises on the track","Eine neue Bestmarke auf der Laufbahn"],description:["La jornada entrega grandes historias.","Another day full of sporting stories.","Ein Tag voller Sportgeschichten."]},
{id:8,sport:"natacion",country:"España",region:"Madrid",city:"Madrid",rank:91,age:8,photo:photos.swim,category:"NATACIÓN",title:["Récords y emoción en la piscina","Records and excitement in the pool","Rekorde und Spannung im Schwimmbad"],description:["Competencias de ejemplo del ecosistema multideportivo.","Example competitions across sports.","Beispielwettbewerbe verschiedener Sportarten."]},
{id:9,sport:"futbol",country:"México",region:"Ciudad de México",city:"Ciudad de México",rank:89,age:9,photo:photos.stadium,category:"FÚTBOL",title:["La afición llena los escenarios deportivos","Fans fill local stadiums","Fans füllen die Sportstätten"],description:["Más jornadas en el mundo del deporte.","More action across the sports world.","Mehr Sport aus aller Welt."]}
];
const leagues=[
{id:"metropolitana",name:"Liga Metropolitana Amateur",region:"Cundinamarca",city:"Soacha",country:"Colombia",sport:"futbol",rank:96,level:"1ª División",photo:photos.field,href:"liga.html?id=metropolitana"},
{id:"sabana",name:"Circuito Sabana",region:"Cundinamarca",city:"Chía",country:"Colombia",sport:"futbol",rank:93,level:"Liga regional",photo:photos.stadium,href:"liga.html?id=sabana"},
{id:"atlantico",name:"Red Atlántica Amateur",region:"Valle del Cauca",city:"Cali",country:"Colombia",sport:"futbol",rank:88,level:"Liga regional",photo:photos.soccer,href:"liga.html?id=atlantico"},
{id:"otra",name:"Liga Ciudad del Sol",region:"Antioquia",city:"Medellín",country:"Colombia",sport:"futbol",rank:85,level:"Liga local",photo:photos.field,href:"ligas.html"},
{id:"baloncesto",name:"Liga Urbana de Baloncesto",region:"Cundinamarca",city:"Soacha",country:"Colombia",sport:"baloncesto",rank:92,level:"Liga de demostración",photo:photos.basket,href:"ligas.html"},
{id:"tenis",name:"Circuito de Tenis Bogotá",region:"Cundinamarca",city:"Bogotá",country:"Colombia",sport:"tenis",rank:90,level:"Liga de demostración",photo:photos.tennis,href:"ligas.html"}
];
const matches=[
{sport:"futbol",kind:"live",region:"Cundinamarca",city:"Soacha",country:"Colombia",rank:97,league:"Liga Metropolitana",a:"Gaelian FC",b:"Halcones Norte",score:"2 - 1",minute:"76′",date:"Hoy",id:"apertura"},
{sport:"futbol",kind:"live",region:"Cundinamarca",city:"Bogotá",country:"Colombia",rank:93,league:"Circuito Capital",a:"Deportivo Prisma",b:"Atlético Horizonte",score:"1 - 0",minute:"53′",date:"Hoy",id:"apertura"},
{sport:"futbol",kind:"live",region:"Antioquia",city:"Medellín",country:"Colombia",rank:90,league:"Liga del Norte",a:"Brisa Norte",b:"Bahía FC",score:"0 - 0",minute:"41′",date:"Hoy",id:"costa"},
{sport:"futbol",kind:"finished",region:"Cundinamarca",city:"Soacha",country:"Colombia",rank:98,league:"Liga Metropolitana",a:"Gaelian FC",b:"Atlético Horizonte",score:"3 - 0",minute:"FINAL",date:"Hoy",id:"apertura"},
{sport:"futbol",kind:"upcoming",region:"Cundinamarca",city:"Soacha",country:"Colombia",rank:95,league:"Liga Metropolitana",a:"Gaelian FC",b:"Halcones Norte",score:"VS",minute:"18:00",date:"Hoy",id:"apertura"},
{sport:"futbol",kind:"upcoming",region:"Cundinamarca",city:"Bogotá",country:"Colombia",rank:91,league:"Copa Capital",a:"Deportivo Prisma",b:"Atlético Horizonte",score:"VS",minute:"20:30",date:"Hoy",id:"capital"},
{sport:"baloncesto",kind:"live",region:"Cundinamarca",city:"Soacha",country:"Colombia",rank:93,league:"Liga Urbana",a:"Águilas",b:"Titanes",score:"61 - 58",minute:"4º Q",date:"Hoy",id:null},
{sport:"baloncesto",kind:"upcoming",region:"Cundinamarca",city:"Bogotá",country:"Colombia",rank:87,league:"Copa Regional",a:"Linces",b:"Estrellas",score:"VS",minute:"19:00",date:"Hoy",id:null},
{sport:"tenis",kind:"finished",region:"Cundinamarca",city:"Bogotá",country:"Colombia",rank:93,league:"Circuito Abierto",a:"A. Torres",b:"M. León",score:"2 - 1",minute:"FINAL",date:"Hoy",id:null},
{sport:"voleibol",kind:"live",region:"Cundinamarca",city:"Chía",country:"Colombia",rank:90,league:"Liga Voleibol",a:"Las Estrellas",b:"Águilas",score:"2 - 1",minute:"3er set",date:"Hoy",id:null},
{sport:"ciclismo",kind:"finished",region:"Antioquia",city:"Medellín",country:"Colombia",rank:88,league:"Vuelta Regional",a:"Team Sur",b:"Team Norte",score:"1º / 2º",minute:"FINAL",date:"Hoy",id:null}
];
let prefSport="all",sponsorStart=0,heroIndex=0,newsCount=5,featuredIndex=0,locationOpen=false,search="",sponsorTimer=null,featureTimer=null,heroTimer=null;
let region={country:"Colombia",state:"Cundinamarca",city:"Soacha"};
try{const x=JSON.parse(localStorage.getItem("asloxp-demo-location")||"null");if(x&&geo[x.country]?.[x.state]?.includes(x.city))region=x}catch(e){}
try{const v=sessionStorage.getItem("asloxp-demo-sport");if(sports.some(s=>s[0]===v))prefSport=v}catch(e){}
function sportOk(x){return prefSport==="all"||x.sport===prefSport}
function locationWeight(x){let n=0;if(x.country===region.country)n+=45;if(x.region===region.state)n+=40;if(x.city===region.city)n+=65;return n}
function sortedNews(){const q=search.toLowerCase();return news.filter(n=>sportOk(n)&&(!q||[...n.title,n.category,n.city].join(" ").toLowerCase().includes(q))).sort((a,b)=>(locationWeight(b)+b.rank-b.age)-(locationWeight(a)+a.rank-a.age))}
function rankedMatches(){return matches.filter(sportOk).sort((a,b)=>(locationWeight(b)+b.rank)-(locationWeight(a)+a.rank))}
function priorityMatches(){const r=rankedMatches();const live=r.filter(x=>x.kind==="live");return live.length?live:r.filter(x=>x.kind==="finished")}
function sponsorCount(){return window.innerWidth<660?1:window.innerWidth<1100?2:4}
function sponsorCard(x){return `<a class="v4-sponsor v4-${x.tone}" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer sponsored" style="--photo:url('${x.photo}')" aria-label="${esc(x.brand)} — ${tx("Visitar sitio de ejemplo","Visit example store","Beispielshop besuchen")}"><span class="v4-sponsor-top">${tx("PATROCINADOR · DEMO","SPONSOR · DEMO","SPONSOR · DEMO")}</span><strong class="v4-sponsor-brand">${esc(x.brand)}</strong><span class="v4-sponsor-copy">${esc(x.tag)}</span><span class="v4-sponsor-cta">${tx("VISITAR TIENDA","VISIT STORE","SHOP ÖFFNEN")} ↗</span></a>`}
function sponsorUI(){return `<section class="v4-sponsor-zone" aria-label="${tx("Patrocinadores de demostración","Demo sponsors","Demo-Sponsoren")}"><div class="v4-sponsor-header"><div><strong>${tx("PATROCINADORES","SPONSORS","SPONSOREN")}</strong><span>${tx("Carrusel de ejemplos — no representan acuerdos con ASLO","Sample carousel — not ASLO partnerships","Beispielkarussell — keine ASLO-Partnerschaften")}</span></div><div class="v4-carousel-controls"><button type="button" data-sponsor="-1" aria-label="${tx("Patrocinadores anteriores","Previous sponsors","Vorherige Sponsoren")}">‹</button><div class="v4-carousel-dots" aria-hidden="true">${Array.from({length:Math.ceil(sponsors.length/sponsorCount())},(_,i)=>`<i class="${i===Math.floor(sponsorStart/sponsorCount())?"active":""}"></i>`).join("")}</div><button type="button" data-sponsor="1" aria-label="${tx("Siguientes patrocinadores","Next sponsors","Nächste Sponsoren")}">›</button></div></div><div class="v4-sponsor-cards">${Array.from({length:sponsorCount()},(_,i)=>sponsorCard(sponsors[(sponsorStart+i)%sponsors.length])).join("")}</div></section>`}
const sportItems=()=>sports.map(s=>`<button type="button" data-sport="${s[0]}" role="option" aria-selected="${prefSport===s[0]}" class="${prefSport===s[0]?"selected":""}"><span aria-hidden="true">${s[1]}</span><span>${sportName(s[0])}</span></button>`).join("");
function regionUI(){return `<div class="v4-location"><button type="button" id="v4-change-location" aria-expanded="${locationOpen}" aria-controls="v4-location-pop"><span>⌖</span><small>${tx("Ubicación de ejemplo","Sample location","Beispielstandort")}</small><strong>${esc(region.country)} › ${esc(region.state)} › ${esc(region.city)}</strong><u>${tx("Cambiar","Change","Ändern")}</u></button>${locationOpen?`<div id="v4-location-pop" class="v4-location-pop"><strong>${tx("Explorar desde otra ubicación","Explore from another location","Anderen Standort wählen")}</strong><label>${tx("País","Country","Land")}<select id="v4-country">${Object.keys(geo).map(x=>`<option ${region.country===x?"selected":""}>${esc(x)}</option>`).join("")}</select></label><label>${tx("Región","Region","Region")}<select id="v4-state">${Object.keys(geo[region.country]).map(x=>`<option ${region.state===x?"selected":""}>${esc(x)}</option>`).join("")}</select></label><label>${tx("Ciudad","City","Stadt")}<select id="v4-city">${geo[region.country][region.state].map(x=>`<option ${region.city===x?"selected":""}>${esc(x)}</option>`).join("")}</select></label><p>${tx("La ubicación es simulada, no geolocalizamos al visitante.","This is a demo location; no device geolocation.","Demo-Standort, keine Geräteortung.")}</p></div>`:""}</div>`}
function topSection(){const current=sports.find(s=>s[0]===prefSport)||sports[0];return `<div class="v4-top-extras"><div class="v4-geo-slot">${regionUI()}</div><details class="v4-sports-menu" id="v4-sports-menu"><summary><span aria-hidden="true">${current[1]}</span><strong>${sportName(prefSport)}</strong><span>⌄</span></summary><div class="v4-sport-menu-inner"><div class="v4-sport-menu-title">${tx("Selecciona un deporte","Choose a sport","Sportart auswählen")}</div>${sportItems()}</div></details></div>`}
function miniMatch(m,kind){return `<a class="v4-match" href="${m.id?"torneo.html?id="+encodeURIComponent(m.id)+"&tab=partidos":"#v4-sample-match"}" ${m.id?"":"data-sample-match"}><div class="v4-match-meta"><span>${esc(m.league)}</span><small class="${kind==="live"?"onair":""}">${kind==="live"?`● ${esc(m.minute)}`:kind==="finished"?tx("FINAL","FINAL","ENDE"):esc(m.minute)}</small></div><div class="v4-match-body"><b>${esc(m.a)}</b><strong>${esc(m.score)}</strong><b>${esc(m.b)}</b></div></a>`}
function matchPanel(){const rank=rankedMatches(),live=rank.filter(m=>m.kind==="live"),fallback=rank.filter(m=>m.kind==="finished");const top=live.length?live:fallback;
 const upcoming=rank.filter(m=>m.kind==="upcoming");
 return `<section class="v4-match-block"><div class="v4-panel-title"><h2>${live.length?tx("Partidos en vivo","Live matches","Live-Spiele"):tx("Últimos finalizados","Latest results","Letzte Ergebnisse")}</h2><span class="${live.length?"v4-live-tag":"v4-final-tag"}">${live.length?tx("● EN VIVO","● LIVE","● LIVE"):tx("FINAL","FINAL","ENDE")}</span></div><div class="v4-match-list">${top.slice(0,3).map(m=>miniMatch(m,m.kind)).join("")||`<p class="v4-none">${tx("Sin encuentros registrados en esta demostración.","No demo matches.","Keine Demo-Spiele.")}</p>`}</div></section><section class="v4-match-block"><div class="v4-panel-title"><h2>${tx("Próximos encuentros","Upcoming matches","Nächste Spiele")}</h2><a href="torneo.html?id=apertura&tab=partidos">${tx("Ver todos","See all","Alle")}</a></div><div class="v4-match-list">${upcoming.slice(0,3).map(m=>miniMatch(m,m.kind)).join("")||`<p class="v4-none">${tx("Sin encuentros próximos en la muestra.","No upcoming demo games.","Keine geplanten Demo-Spiele.")}</p>`}</div></section>`}
function heroNews(){const ranked=sortedNews();const n=ranked.length?ranked[heroIndex%ranked.length]:null;if(!n)return `<section class="v4-hero-news v4-empty">${tx("Sin noticias para este filtro.","No news matches this filter.","Keine passenden Meldungen.")}</section>`;return `<section class="v4-hero-news" style="--hero-photo:url('${n.photo}')"><span class="v4-news-sport">${esc(sportName(n.sport))}</span><div class="v4-hero-news-content"><div class="v4-hero-badge">${tx("DESTACADO","FEATURED","HIGHLIGHT")}</div><h1>${esc(n.title[lang()==="de"?2:lang()==="en"?1:0])}</h1><p>${esc(n.description[lang()==="de"?2:lang()==="en"?1:0])}</p><button type="button" data-read-news="${n.id}" class="v4-read-news">${tx("LEER NOTICIA","READ STORY","ARTIKEL LESEN")} →</button><div class="v4-hero-dots">${ranked.slice(0,4).map((_,i)=>`<button type="button" data-hero-dot="${i}" class="${heroIndex%ranked.length===i?"active":""}" aria-label="${tx("Ver noticia","View story","Meldung ansehen")} ${i+1}"></button>`).join("")}</div></div></section>`}
function newsGrid(){return `<section class="v4-news-section" id="noticias"><div class="v4-section-title"><h2>${tx("Noticias destacadas","Featured news","Top-Meldungen")}</h2><button type="button" id="v4-load-news">${tx("Ver más","More news","Mehr anzeigen")} ↗</button></div><div class="v4-news-grid">${sortedNews().slice(0,newsCount).map(n=>`<button type="button" class="v4-news-card" data-read-news="${n.id}"><div class="v4-news-card-photo" style="--card-photo:url('${n.photo}')"><span>${esc(sportName(n.sport))}</span></div><h3>${esc(n.title[lang()==="de"?2:lang()==="en"?1:0])}</h3><small>${tx("Hace","Updated","Vor")} ${n.age} h · ${esc(n.city)}</small></button>`).join("")}</div></section>`}
function featuredMatch(){const arr=priorityMatches();const m=arr.length?arr[featuredIndex%arr.length]:null;if(!m)return "";return `<div class="v4-featured-match"><span class="v4-featured-kicker">${tx("ENCUENTROS DESTACADOS","FEATURED MATCHES","TOP-SPIELE")} · ${m.kind==="live"?tx("EN VIVO","LIVE","LIVE"):tx("FINAL","FINAL","ENDE")}</span><div class="v4-featured-values"><span>${esc(m.a)}</span><strong>${esc(m.score)}</strong><span>${esc(m.b)}</span></div><small>${esc(m.league)} · ${esc(m.minute)} · ${esc(m.city)}</small><div class="v4-featured-ctrl"><button type="button" data-featured="-1">‹</button><span>${(featuredIndex%arr.length)+1} / ${arr.length}</span><button type="button" data-featured="1">›</button></div></div>`}
function asideAd(){return `<aside class="v4-side-ad"><div class="v4-ad-label">${tx("PUBLICIDAD · DEMO","AD SPACE · DEMO","WERBEFLÄCHE · DEMO")}</div><div class="v4-side-ad-copy"><b>ASLO AD SPACE</b><h3>${tx("EL DEPORTE NOS UNE","SPORT CONNECTS US","SPORT VERBINDET UNS")}</h3><p>${tx("Espacio reservado para Google Ads o campañas comerciales.","Reserved for Google Ads or commercial campaigns.","Reserviert für Anzeigen und Kampagnen.")}</p><span>${tx("ESPACIO DISPONIBLE","AD SPACE","WERBEPLATZ")}</span></div></aside>`}
function leagueStrip(){const list=leagues.filter(sportOk).sort((a,b)=>(locationWeight(b)+b.rank)-(locationWeight(a)+a.rank)).slice(0,5);return `<section class="v4-leagues"><div class="v4-section-title"><h2>${tx("Ligas para descubrir","Explore leagues","Ligen entdecken")}</h2><a href="ligas.html">${tx("Explorar todas","Explore all","Alle ansehen")} ↗</a></div><div class="v4-leagues-row">${list.map(l=>`<a href="${esc(l.href)}" class="v4-league-chip"><div class="v4-league-image" style="--league-photo:url('${l.photo}')"></div><div><b>${esc(l.name)}</b><small>${esc(l.city)} · ${esc(l.country)}</small><span>${esc(l.level)}</span></div><i>↗</i></a>`).join("")||`<p>${tx("No hay ligas ficticias para este deporte en la muestra.","No sample leagues for this sport.","Keine Beispiel-Ligen für diese Sportart.")}</p>`}</div></section>`}
function adBottom(){return `<section class="v4-bottom-ad" aria-label="${tx("Espacio publicitario","Advertisement space","Werbefläche")}"><span>${tx("PUBLICIDAD · ESPACIO RESERVADO","AD SPACE · RESERVED","WERBEFLÄCHE · RESERVIERT")}</span><div><b>ASLO <em>SPORTS</em></b><strong>${tx("LA EXPERIENCIA SIGUE","KEEP THE GAME GOING","DAS SPIEL GEHT WEITER")}</strong><small>${tx("Bloque reservado a campañas publicitarias; sin anuncio real.","Reserved ad placement; no real ad.","Reservierter Anzeigenplatz; keine echte Anzeige.")}</small></div></section>`}
function floatingNotice(){return `<div class="v4-demo-caption">${tx("DEMO VISUAL · PARTIDOS, NOTICIAS Y PATROCINIOS FICTICIOS","VISUAL DEMO · FICTIONAL MATCHES, NEWS & SPONSORS","VISUELLE DEMO · BEISPIELSPIELE, NACHRICHTEN & SPONSOREN")}</div>`}
function render(){
 const main=`<div class="v4-root">${sponsorUI()}<div class="v4-sport-row" id="v4-expand-sports" hidden>${sportItems()}</div><div class="v4-main-grid"><div class="v4-hero-slot">${heroNews()}</div><div class="v4-live-slot">${matchPanel()}</div>${asideAd()}</div><div class="v4-featured-row">${featuredMatch()}</div><div class="v4-secondary-grid"><div>${newsGrid()}</div><div class="v4-results-aside"><div class="v4-section-title"><h2>${tx("Resultados destacados","Featured results","Top-Ergebnisse")}</h2></div>${rankedMatches().filter(m=>m.kind==="finished").slice(0,3).map(m=>miniMatch(m,m.kind)).join("")}</div></div>${leagueStrip()}${adBottom()}${floatingNotice()}</div>`;
 document.body.classList.add("v4-visitor");
 document.body.innerHTML=window.asloAuth.chrome(main,"inicio");
 buildHeader();window.asloAuth.attachChrome();bindControls();window.asloVisitorNavRefresh?.();
 document.title="asloXP · "+tx("Noticias y deporte","News & sport","Sport und Nachrichten");
}
function buildHeader(){
 const brand=document.querySelector(".sitehead .brand");if(brand)brand.innerHTML=`<span class="v4-logo">▲</span> ASLO`;
 const nav=document.querySelector(".sitehead .publicnav");
 if(nav)nav.innerHTML=`<a href="index.html" class="sel">${tx("Noticias","News","Nachrichten")}</a><a href="ligas.html">${tx("Ligas","Leagues","Ligen")}</a><a href="torneo.html?id=apertura">${tx("Torneos","Tournaments","Turniere")}</a><a href="torneo.html?id=apertura&tab=partidos">${tx("Resultados","Results","Ergebnisse")}</a>`;
 const head=document.querySelector(".sitehead .headrow");
 if(head){const wrapper=document.createElement("div");wrapper.className="v4-header-tools";wrapper.innerHTML=`<label class="v4-search"><span>⌕</span><input id="v4-search" type="search" value="${esc(search)}" placeholder="${tx("Buscar noticias…","Search news…","Nachrichten suchen…")}" aria-label="${tx("Buscar noticias","Search news","Nachrichten suchen")}"></label>${topSection()}`;
 const actions=head.querySelector(".account-actions");if(actions)head.insertBefore(wrapper,actions);else head.appendChild(wrapper);
 const theme=document.createElement("button");theme.className="v4-theme";theme.type="button";theme.id="v4-theme";theme.textContent="◐";theme.title=tx("Cambiar tema","Change theme","Design ändern");if(actions)actions.insertBefore(theme,actions.firstChild);}
}
function refresh(){const at=heroIndex;render();heroIndex=at}
function updateSponsor(){const area=document.querySelector(".v4-sponsor-zone");if(!area)return;const copy=document.createElement("div");copy.innerHTML=sponsorUI();area.replaceWith(copy.firstChild)}
function advanceSponsor(direction=1){const count=sponsorCount();sponsorStart=(sponsorStart+direction*count+sponsors.length*2)%sponsors.length;updateSponsor()}
function updateHero(){const root=document.querySelector(".v4-hero-slot");if(root){root.innerHTML=heroNews()}}
function updateFeatured(){const root=document.querySelector(".v4-featured-row");if(root)root.innerHTML=featuredMatch()}
function menuClick(e){const b=e.target.closest("[data-sport]");if(!b)return;prefSport=b.dataset.sport;try{sessionStorage.setItem("asloxp-demo-sport",prefSport)}catch(e){}heroIndex=0;featuredIndex=0;newsCount=5;render();}
function updateLocation(){try{localStorage.setItem("asloxp-demo-location",JSON.stringify(region))}catch(e){}heroIndex=0;featuredIndex=0;render();}
function bindControls(){
 if(bound)return;bound=true;
 document.addEventListener("click",click);
 document.addEventListener("input",searchInput);
 document.addEventListener("change",onChange);
}
let bound=false;
function click(e){
 const sponsor=e.target.closest("[data-sponsor]");if(sponsor){e.preventDefault();advanceSponsor(Number(sponsor.dataset.sponsor));return}
 const sp=e.target.closest("[data-sport]");if(sp){e.preventDefault();menuClick(e);return}
 const locationButton=e.target.closest("#v4-change-location");if(locationButton){locationOpen=!locationOpen;render();return}
 const newsButton=e.target.closest("#v4-load-news");if(newsButton){newsCount=Math.min(sortedNews().length,newsCount+5);render();return}
 const read=e.target.closest("[data-read-news]");if(read){const n=news.find(n=>n.id===Number(read.dataset.readNews));if(n){e.preventDefault();openStory(n)}return}
 const dot=e.target.closest("[data-hero-dot]");if(dot){heroIndex=Number(dot.dataset.heroDot);updateHero();return}
 const fm=e.target.closest("[data-featured]");if(fm){const length=priorityMatches().length;if(length){featuredIndex=(featuredIndex+Number(fm.dataset.featured)+length)%length;updateFeatured()}return}
 const theme=e.target.closest("#v4-theme");if(theme){const next=document.documentElement.getAttribute("data-theme")==="light"?"dark":"light";try{localStorage.setItem("asloxp-theme",next)}catch(e){}location.reload();return}
 const sample=e.target.closest("[data-sample-match]");if(sample){e.preventDefault();alert(tx("Este partido es ficticio. El detalle para este deporte se diseñará más adelante.","This match is fictional; its details are not yet designed.","Dieses Spiel ist fiktiv; die Detailansicht ist noch nicht gestaltet."));}
}
function searchInput(e){if(e.target.id!=="v4-search")return;search=e.target.value;const cards=document.querySelector(".v4-news-grid");if(cards){cards.innerHTML=sortedNews().slice(0,newsCount).map(n=>`<button type="button" class="v4-news-card" data-read-news="${n.id}"><div class="v4-news-card-photo" style="--card-photo:url('${n.photo}')"><span>${sportName(n.sport)}</span></div><h3>${esc(n.title[lang()==="de"?2:lang()==="en"?1:0])}</h3><small>${n.city}</small></button>`).join("")}heroIndex=0;updateHero();}
function onChange(e){if(!["v4-country","v4-state","v4-city"].includes(e.target.id))return;
if(e.target.id==="v4-country"){region.country=e.target.value;region.state=Object.keys(geo[region.country])[0];region.city=geo[region.country][region.state][0]}
if(e.target.id==="v4-state"){region.state=e.target.value;region.city=geo[region.country][region.state][0]}
if(e.target.id==="v4-city"){region.city=e.target.value}
locationOpen=true;updateLocation();
}
function openStory(n){
 const existing=document.getElementById("v4-story");if(existing)existing.remove();
 const overlay=document.createElement("div");overlay.id="v4-story";overlay.className="v4-story-backdrop";
 overlay.innerHTML=`<article role="dialog" aria-modal="true" aria-labelledby="v4-story-title" class="v4-story-modal"><button type="button" id="v4-close-story" aria-label="${tx("Cerrar","Close","Schließen")}">×</button><div class="v4-story-photo" style="background-image:url('${n.photo}')"></div><div class="v4-story-body"><span>${esc(sportName(n.sport))} · ${esc(n.city)}</span><h2 id="v4-story-title">${esc(n.title[lang()==="de"?2:lang()==="en"?1:0])}</h2><p>${esc(n.description[lang()==="de"?2:lang()==="en"?1:0])}</p><small>${tx("Noticia de demostración: no describe hechos reales.","Demonstration story; not a real event.","Beispielmeldung, kein reales Ereignis.")}</small></div></article>`;
 document.body.appendChild(overlay);overlay.querySelector("#v4-close-story").addEventListener("click",()=>overlay.remove());overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.remove()});
}
function cycle(){
 sponsorTimer=setInterval(()=>{if(document.visibilityState!=="hidden")advanceSponsor(1)},7800);
 featureTimer=setInterval(()=>{const n=priorityMatches().length;if(n&&document.visibilityState!=="hidden"){featuredIndex=(featuredIndex+1)%n;updateFeatured()}},6200);
 heroTimer=setInterval(()=>{const n=sortedNews().length;if(n&&document.visibilityState!=="hidden"){heroIndex=(heroIndex+1)%Math.min(4,n);updateHero()}},9000);
}
render();cycle();window.addEventListener("resize",()=>{const cards=document.querySelectorAll(".v4-sponsor").length;if(cards!==sponsorCount()){sponsorStart=0;updateSponsor()}});
window.addEventListener("pagehide",()=>{clearInterval(sponsorTimer);clearInterval(featureTimer);clearInterval(heroTimer)});
})();