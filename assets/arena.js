(function arenaApp(){
"use strict";
const lang=()=>window.asloAuth?.lang?.()||"es";
const text=(es,en,de)=>({es,en,de})[lang()]||es;
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const leagues=[
 {id:"metropolitana",short:"LMA",name:"Liga Metropolitana Amateur",city:"Bogotá D.C.",region:"Bogotá",flag:"01",games:["apertura","capital"],news:"Gaelian FC lidera el torneo Apertura",newsEn:"Gaelian FC leads the opening tournament",newsDe:"Gaelian FC führt das Eröffnungsturnier an"},
 {id:"sabana",short:"CS",name:"Circuito Sabana",city:"Soacha, Cundinamarca",region:"Cundinamarca",flag:"02",games:["sabana"],news:"Publicada la próxima jornada de la Sabana",newsEn:"The next Sabana matchday is announced",newsDe:"Der nächste Spieltag der Sabana steht fest"},
 {id:"atlantico",short:"RA",name:"Red Atlántica Amateur",city:"Barranquilla, Atlántico",region:"Atlántico",flag:"03",games:["costa"],news:"Brisa Norte comienza con victoria",newsEn:"Brisa Norte opens with a win",newsDe:"Brisa Norte startet mit einem Sieg"}
];
const tournaments=[
{id:"apertura",league:"metropolitana",name:"Torneo Apertura 2026",status:"progress",teams:["Gaelian FC","Deportivo Prisma","Halcones Norte","Atlético Horizonte"],rounds:[["1","03 oct",[["Gaelian FC","Halcones Norte",2,1],["Deportivo Prisma","Atlético Horizonte",1,1]]],["2","10 oct",[["Gaelian FC","Deportivo Prisma",1,1],["Halcones Norte","Atlético Horizonte",3,0]]],["3","17 oct",[["Gaelian FC","Atlético Horizonte",3,0],["Halcones Norte","Deportivo Prisma",0,2]]],["4","24 oct",[["Gaelian FC","Halcones Norte",null,null]]]],news:["Gaelian FC se mantiene en el primer puesto","La cuarta jornada ya tiene programación"]},
{id:"capital",league:"metropolitana",name:"Copa Capital 2026",status:"soon",teams:["Atlético Horizonte","Gaelian FC","Estrella Sur","Unión Centro"],rounds:[["1","31 oct",[["Atlético Horizonte","Gaelian FC",null,null],["Estrella Sur","Unión Centro",null,null]]]],news:["Copa Capital anuncia su primera jornada"]},
{id:"sabana",league:"sabana",name:"Liga Sabana 2026",status:"progress",teams:["Unión Sabana","Deportivo Sur","Real Cumbre","Estrella Verde"],rounds:[["1","04 oct",[["Unión Sabana","Real Cumbre",2,0],["Deportivo Sur","Estrella Verde",0,0]]],["2","18 oct",[["Unión Sabana","Deportivo Sur",1,1],["Estrella Verde","Real Cumbre",2,1]]],["3","25 oct",[["Unión Sabana","Estrella Verde",null,null]]]],news:["Unión Sabana sigue entre los primeros"]},
{id:"costa",league:"atlantico",name:"Torneo Costa 2026",status:"progress",teams:["Brisa Norte","Atlético Puerto","Deportivo Arena","Bahía FC"],rounds:[["1","18 oct",[["Brisa Norte","Bahía FC",2,1],["Atlético Puerto","Deportivo Arena",0,0]]],["2","25 oct",[["Brisa Norte","Atlético Puerto",null,null]]]],news:["Brisa Norte comienza con victoria"]}
];
const find=(a,id)=>a.find(x=>x.id===id)||a[0];
const lurl=id=>"liga.html?id="+encodeURIComponent(id);
const turl=(id,tab)=>"torneo.html?id="+encodeURIComponent(id)+(tab?"&tab="+encodeURIComponent(tab):"");
const status=k=>k==="progress"?text("EN CURSO","IN PROGRESS","LÄUFT"):text("PRÓXIMAMENTE","COMING SOON","DEM­NÄCHST");
const note=k=>({es:k.news,en:k.newsEn,de:k.newsDe})[lang()]||k.news;
const allMatches=tournaments.flatMap(t=>t.rounds.flatMap(r=>r[2].map(m=>({teamA:m[0],teamB:m[1],a:m[2],b:m[3],date:r[1],round:r[0],league:t.league,tournament:t.id}))));
let featured=0, matchFilter="recent", region="all", search="",audioOn=false,audioCtx=null,musicTimer=null,step=0,transitioning=false;
let carouselIndex=0;
const reduced=()=>{try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
function playTone(frequency,length=0.16,volume=0.016,type="sine"){
 if(!audioOn||!audioCtx)return;try{const t=audioCtx.currentTime;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.setValueAtTime(frequency,t);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(volume,0.0002),t+0.04);g.gain.exponentialRampToValueAtTime(0.0001,t+length);o.connect(g).connect(audioCtx.destination);o.start(t);o.stop(t+length+0.04)}catch(e){}
}
function melody(){
 const seq=[196,246.94,293.66,246.94,220,261.63,329.63,261.63,174.61,220,261.63,220,196,246.94,329.63,246.94];
 playTone(seq[step%seq.length],0.65,0.009,"triangle");
 if(step%4===0)playTone(seq[step%seq.length]/2,1.45,0.008,"sine");
 step++;
}
async function audioToggle(){
 if(audioOn){audioOn=false;if(musicTimer)clearInterval(musicTimer);musicTimer=null;if(audioCtx){try{await audioCtx.close()}catch(e){}}audioCtx=null;updateSoundButton();return}
 const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio){const b=document.querySelector("#gx-audio");if(b)b.title=text("Audio no compatible","Audio not supported","Audio nicht unterstützt");return}
 try{audioCtx=new Audio();await audioCtx.resume();audioOn=true;step=0;melody();musicTimer=setInterval(melody,660);updateSoundButton()}catch(e){audioOn=false;updateSoundButton()}
}
function updateSoundButton(){const b=document.querySelector("#gx-audio");if(!b)return;b.setAttribute("aria-pressed",String(audioOn));b.innerHTML=`<span aria-hidden="true">${audioOn?"♫":"♪"}</span><span>${audioOn?text("SONIDO ACTIVADO","SOUND ON","TON AN"):text("ACTIVAR AMBIENTE","ENABLE SOUND","SOUND STARTEN")}</span>`;}
function topUI(){
 return `<div class="gx-topline"><span class="gx-status"><i></i>${text("CENTRAL DEPORTIVA · DEMOSTRACIÓN","SPORTS HUB · DEMO","SPORTZENTRALE · DEMO")}</span><span class="gx-topcenter">${text("TEMPORADA 2026 / FÚTBOL AMATEUR","SEASON 2026 / AMATEUR FOOTBALL","SAISON 2026 / AMATEURFUSSBALL")}</span><button id="gx-audio" type="button" aria-pressed="false" class="gx-audio" title="${text("Música sintetizada original y opcional","Original optional synthesized music","Optionale eigene Synthesizer-Musik")}">♪ ${text("ACTIVAR AMBIENTE","ENABLE SOUND","SOUND STARTEN")}</button></div>`;
}
function bigMatch(match,featuredId){
 const done=match.a!=null;
 return `<div class="gx-score-stamp"><span class="gx-pulse-dot"></span>${done?text("FINALIZADO","FULL TIME","ABGEPFIFFEN"):text("PRÓXIMAMENTE","UPCOMING","ANSTEHEND")} · ${esc(match.date)}</div><div class="gx-score-center"><div class="gx-club"><span class="gx-crest gx-crest-a">${esc(match.teamA.slice(0,2).toUpperCase())}</span><strong>${esc(match.teamA)}</strong></div><div class="gx-score-number">${done?`${match.a}<i>:</i>${match.b}`:"VS"}</div><div class="gx-club"><span class="gx-crest gx-crest-b">${esc(match.teamB.slice(0,2).toUpperCase())}</span><strong>${esc(match.teamB)}</strong></div></div><a class="gx-score-action" href="${turl(featuredId,"partidos")}">${text("REVISAR ENCUENTRO","VIEW MATCH","SPIEL ANSEHEN")} <span>↗</span></a>`
}
function featuredMarkup(){
 const arr=[
 {t:"apertura",m:allMatches.find(m=>m.tournament==="apertura"&&m.teamA==="Gaelian FC"&&m.a===3)},
 {t:"sabana",m:allMatches.find(m=>m.tournament==="sabana"&&m.teamA==="Unión Sabana"&&m.a===2)},
 {t:"costa",m:allMatches.find(m=>m.tournament==="costa"&&m.teamA==="Brisa Norte"&&m.a===2)}
 ];const item=arr[featured%arr.length];return `<div class="gx-featured-head"><span>${text("EN EL RADAR","ON THE RADAR","IM BLICKPUNKT")}</span><strong>0${featured+1} <i>/</i> 0${arr.length}</strong></div>${bigMatch(item.m,item.t)}`;
}
const leagueCard=l=>`<a href="${lurl(l.id)}" class="gx-league" data-tilt><div class="gx-league-bg" aria-hidden="true">${esc(l.short)}</div><div class="gx-league-header"><span>${text("LIGA","LEAGUE","LIGA")} / ${esc(l.flag)}</span><span>↗</span></div><div class="gx-league-symbol">${esc(l.short)}</div><div class="gx-league-bottom"><span>${esc(l.region)}</span><h3>${esc(l.name)}</h3><p>${esc(l.games.length)} ${text("COMPETICIONES","COMPETITIONS","WETTBEWERBE")}</p></div></a>`;
const newsCard=(l,i)=>`<a href="${lurl(l.id)}" class="gx-news gx-news-${i}"><span class="gx-news-label">${text("ACTUALIDAD","NEWS","AKTUELLES")} · ${esc(l.region)}</span><span class="gx-news-visual" aria-hidden="true">${i===0?"✶":i===1?"⌁":"◉"}</span><h3>${esc(note(l))}</h3><span class="gx-read">${text("VER LA LIGA","OPEN LEAGUE","LIGA ANSEHEN")} ↗</span></a>`;
function home(){
 const current=allMatches.filter(x=>x.a!=null).slice(-6);return `<div class="gx-app gx-home">${topUI()}<section class="gx-hero gx-panorama"><div class="gx-stadium" aria-hidden="true"><div class="gx-stadium-ring"></div><div class="gx-field"></div><div class="gx-spotlight gx-one"></div><div class="gx-spotlight gx-two"></div></div><div class="gx-hero-content"><span class="gx-kicker"><span class="gx-small-line"></span>${text("ENTRA AL JUEGO · SIN INICIAR SESIÓN","ENTER THE GAME · NO SIGN-IN","SPIEL ENTDECKEN · OHNE ANMELDUNG")}</span><h1>${text("TU CIUDAD.","YOUR CITY.","DEINE STADT.")}<em>${text("TU CANCHA.","YOUR PITCH.","DEIN SPIELFELD.")}</em></h1><p>${text("La emoción del deporte está aquí. Descubre ligas, sigue torneos y vive cada resultado. Esto apenas comienza.","This is where local sport comes alive. Discover leagues, track tournaments, feel every result.","Hier wird lokaler Sport lebendig. Entdecke Ligen, verfolge Turniere und erlebe jedes Ergebnis.")}</p><div class="gx-hero-cta"><a class="gx-button gx-primary" href="ligas.html">${text("EXPLORAR EL UNIVERSO","EXPLORE THE WORLD","SPORTWELT ENTDECKEN")} <span>↗</span></a><a class="gx-button gx-soft" href="${turl("apertura")}">${text("VER COMPETICIÓN","VIEW COMPETITION","WETTBEWERB ANSEHEN")} →</a></div><div class="gx-hero-ticker"><span>01 <b>${text("LIGAS","LEAGUES","LIGEN")}</b></span><span>02 <b>${text("TORNEOS","TOURNAMENTS","TURNIERE")}</b></span><span>03 <b>${text("RESULTADOS","RESULTS","ERGEBNISSE")}</b></span></div></div><div class="gx-score-feature"><div class="gx-featured" id="gx-featured" aria-live="polite">${featuredMarkup()}</div><div class="gx-featured-controls"><button type="button" data-carousel="-1" aria-label="${text("Partido anterior","Previous match","Vorheriges Spiel")}">←</button><div class="gx-carousel-dots" aria-hidden="true">${[0,1,2].map((x)=>`<i class="${x===featured?"active":""}"></i>`).join("")}</div><button type="button" data-carousel="1" aria-label="${text("Siguiente partido","Next match","Nächstes Spiel")}">→</button></div></div></section>
 <section class="gx-rails"><div class="gx-section-header"><div><span class="gx-kicker">${text("ELIGE TU DESTINO","CHOOSE YOUR DESTINATION","WÄHLE DEIN ZIEL")}</span><h2>${text("Explora las ligas.","Explore the leagues.","Ligen entdecken.")}</h2></div><a class="gx-text-action" href="ligas.html">${text("VER TODAS","VIEW ALL","ALLE ANSEHEN")} ↗</a></div><div class="gx-league-deck">${leagues.map(leagueCard).join("")}</div></section>
 <section class="gx-command"><div class="gx-section-header"><div><span class="gx-kicker">${text("CENTRO DE PARTIDOS","MATCH CENTER","SPIELZENTRALE")}</span><h2>${text("La jornada no se detiene.","The season never stops.","Die Saison geht weiter.")}</h2></div><div class="gx-switch" role="group" aria-label="${text("Filtrar encuentros","Filter matches","Spiele filtern")}"><button data-results="recent" class="${matchFilter==="recent"?"active":""}" type="button">${text("RESULTADOS","RESULTS","ERGEBNISSE")}</button><button data-results="upcoming" class="${matchFilter==="upcoming"?"active":""}" type="button">${text("PRÓXIMOS","UPCOMING","NÄCHSTE")}</button></div></div><div id="gx-matchboard" class="gx-matchboard">${matchboard()}</div></section>
 <section class="gx-stories"><div class="gx-section-header"><div><span class="gx-kicker">${text("DENTRO DEL JUEGO","INSIDE THE GAME","MITTENDRIN")}</span><h2>${text("Historias del deporte.","Stories from the sport.","Geschichten aus dem Sport.")}</h2></div></div><div class="gx-news-deck">${leagues.map(newsCard).join("")}</div></section><div class="gx-footer-line"><span>ASLO / <b>${text("EL DEPORTE NOS CONECTA","SPORT CONNECTS US","SPORT VERBINDET UNS")}</b></span><span>${text("PROTOTIPO · DATOS FICTICIOS","PROTOTYPE · FICTIONAL DATA","PROTOTYP · BEISPIELDATEN")}</span></div></div>`;
}
function matchboard(){
 const ms=allMatches.filter(m=>matchFilter==="recent"?m.a!=null:m.a==null).slice(0,7);
 return ms.map((m,i)=>`<a class="gx-match-row" href="${turl(m.tournament,"partidos")}"><span class="gx-match-round">0${i+1}</span><span class="gx-match-meta"><small>${esc(find(tournaments,m.tournament).name)}</small><b>${esc(m.date)}</b></span><span class="gx-match-team home">${esc(m.teamA)}</span><span class="gx-match-score">${m.a!=null?`${m.a} <i>:</i> ${m.b}`:"VS"}</span><span class="gx-match-team away">${esc(m.teamB)}</span><span class="gx-match-arrow">↗</span></a>`).join("");
}
function leaguesPage(){
 const options=["all","Bogotá","Cundinamarca","Atlántico"];
 return `<div class="gx-app gx-subpage">${topUI()}<section class="gx-subhero gx-league-hero"><div class="gx-subhero-number" aria-hidden="true">01</div><div class="gx-breadcrumb"><a href="index.html">${text("INICIO","HOME","STARTSEITE")}</a> / ${text("LIGAS","LEAGUES","LIGEN")}</div><span class="gx-kicker">${text("MAPA DE COMPETICIÓN","COMPETITION MAP","WETTBEWERBSKARTE")}</span><h1>${text("ELIGE TU","CHOOSE YOUR","WÄHLE DEINE")} <em>${text("ARENA.","ARENA.","ARENA.")}</em></h1><p>${text("Cada liga es una historia. Encuentra la tuya y entra en sus competiciones.","Every league has a story. Find yours and explore its competitions.","Jede Liga erzählt eine Geschichte. Finde deine und entdecke ihre Wettbewerbe.")}</p></section><section class="gx-rails gx-filters"><div class="gx-section-header"><div><span class="gx-kicker">${text("SELECCIÓN DE LIGAS","LEAGUE SELECT","LIGA-AUSWAHL")}</span><h2>${text("¿Por dónde empezamos?","Where do we start?","Wo geht es los?")}</h2></div><span id="gx-total" class="gx-count"></span></div><div class="gx-filter-bar"><label class="gx-searchbox"><span aria-hidden="true">⌕</span><input id="gx-search" type="search" placeholder="${text("Buscar liga o ciudad","Search league or city","Liga oder Stadt suchen")}" value="${esc(search)}" aria-label="${text("Buscar liga","Search league","Liga suchen")}"></label><div class="gx-filter-buttons">${options.map(o=>`<button type="button" data-region="${esc(o)}" class="${region===o?"active":""}">${o==="all"?text("TODAS","ALL","ALLE"):esc(o)}</button>`).join("")}</div></div><div class="gx-league-deck gx-explore" id="gx-league-results">${filteredLeagues()}</div><p id="gx-no-results" class="gx-no-results" hidden>${text("No encontramos ligas para esa búsqueda.","No leagues found for this search.","Keine passenden Ligen gefunden.")}</p></section></div>`;
}
function filteredLeagues(){return leagues.filter(l=>(region==="all"||l.region===region)&&(`${l.name} ${l.city}`.toLowerCase().includes(search.toLowerCase().trim()))).map(leagueCard).join("")}
function leagueDetail(){
 const q=new URLSearchParams(location.search),l=find(leagues,q.get("id"));
 return `<div class="gx-app gx-subpage">${topUI()}<section class="gx-subhero gx-teamhero"><div class="gx-big-initial" aria-hidden="true">${esc(l.short)}</div><div class="gx-breadcrumb"><a href="index.html">${text("INICIO","HOME","STARTSEITE")}</a> / <a href="ligas.html">${text("LIGAS","LEAGUES","LIGEN")}</a> / ${esc(l.short)}</div><span class="gx-kicker">${text("LIGA / TERRITORIO","LEAGUE / REGION","LIGA / REGION")} ${esc(l.region)}</span><h1>${esc(l.name)}<em>.</em></h1><p>${esc(l.city)} · ${text("FÚTBOL AMATEUR","AMATEUR FOOTBALL","AMATEURFUSSBALL")}</p><div class="gx-league-meta"><span><b>${l.games.length}</b> ${text("COMPETICIONES","COMPETITIONS","WETTBEWERBE")}</span><span><b>${esc(l.short)}</b> ${text("IDENTIFICADOR","IDENTIFIER","KÜRZEL")}</span></div></section><section class="gx-rails"><div class="gx-section-header"><div><span class="gx-kicker">${text("ELIGE TU COMPETICIÓN","SELECT COMPETITION","WETTBEWERB WÄHLEN")}</span><h2>${text("Entra al torneo.","Enter a tournament.","Zum Turnier.")}</h2></div></div><div class="gx-competition-deck">${l.games.map((id,i)=>{const t=find(tournaments,id);return `<a class="gx-competition" href="${turl(id)}"><span class="gx-comp-count">0${i+1}</span><span class="gx-comp-badge">${status(t.status)}</span><div class="gx-comp-symbol" aria-hidden="true">⚽</div><h3>${esc(t.name)}</h3><p>${text("FÚTBOL · ADULTOS","FOOTBALL · ADULTS","FUSSBALL · ERWACHSENE")}</p><span class="gx-comp-go">${text("ENTRAR AL TORNEO","ENTER TOURNAMENT","ZUM TURNIER")} ↗</span></a>`}).join("")}</div></section><section class="gx-stories"><div class="gx-section-header"><div><span class="gx-kicker">${text("DESDE LA LIGA","FROM THE LEAGUE","AUS DER LIGA")}</span><h2>${text("Última noticia.","Latest update.","Neueste Meldung.")}</h2></div></div><div class="gx-news-deck gx-news-single">${newsCard(l,0)}</div></section></div>`;
}
const played=t=>t.rounds.flatMap(r=>r[2].filter(m=>m[2]!=null));
function standings(t){
 const d=t.teams.map(name=>({name,pj:0,w:0,d:0,l:0,gf:0,gc:0,pts:0}));
 played(t).forEach(m=>{const a=d.find(x=>x.name===m[0]),b=d.find(x=>x.name===m[1]);if(!a||!b)return;a.pj++;b.pj++;a.gf+=m[2];a.gc+=m[3];b.gf+=m[3];b.gc+=m[2];if(m[2]===m[3]){a.d++;b.d++;a.pts++;b.pts++}else if(m[2]>m[3]){a.w++;b.l++;a.pts+=3}else{a.l++;b.w++;b.pts+=3}});
 return d.sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf);
}
function table(t){
 return `<div class="gx-table-wrap"><table class="gx-table"><thead><tr><th>#</th><th>${text("EQUIPO","TEAM","TEAM")}</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>DG</th><th>${text("PTS","PTS","PKT")}</th></tr></thead><tbody>${standings(t).map((x,i)=>`<tr><td><span class="gx-table-rank">${i+1}</span></td><td><b>${esc(x.name)}</b></td><td>${x.pj}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.gf-x.gc}</td><td class="gx-pts">${x.pts}</td></tr>`).join("")}</tbody></table></div>`
}
function matchTile(m){
 return `<div class="gx-fixture"><div class="gx-fixture-teams"><strong>${esc(m[0])}</strong><span>${m[2]!=null?`${m[2]} : ${m[3]}`:"VS"}</span><strong>${esc(m[1])}</strong></div><span class="gx-fixture-status">${m[2]!=null?text("FINAL","FINAL","ENDE"):text("PROGRAMADO","SCHEDULED","GEPLANT")}</span></div>`
}
function tournamentPage(){
 const q=new URLSearchParams(location.search),t=find(tournaments,q.get("id")),l=find(leagues,t.league),valid=["resumen","tabla","partidos","noticias"],tab=valid.includes(q.get("tab"))?q.get("tab"):"resumen";
 const recent=t.rounds.filter(r=>r[2].some(m=>m[2]!=null)).at(-1);
 const tabName={resumen:text("RESUMEN","OVERVIEW","ÜBERSICHT"),tabla:text("TABLA","TABLE","TABELLE"),partidos:text("PARTIDOS","MATCHES","SPIELE"),noticias:text("NOTICIAS","NEWS","NACHRICHTEN")};
 const newsCopy={es:t.news,en:["Latest tournament update","Upcoming matchday announced"],de:["Neuigkeiten zum Turnier","Der nächste Spieltag steht fest"]};
 let body="";
 if(tab==="resumen")body=`<div class="gx-tournament-grid"><div><div class="gx-section-header"><div><span class="gx-kicker">${text("ÚLTIMA JORNADA","LATEST ROUND","LETZTER SPIELTAG")}</span><h2>${text("Marcadores.","Scores.","Ergebnisse.")}</h2></div></div><div class="gx-fixtures">${recent?recent[2].map(matchTile).join(""):`<p>${text("No hay resultados todavía.","No results yet.","Noch keine Ergebnisse.")}</p>`}</div></div><div><div class="gx-section-header"><div><span class="gx-kicker">${text("EN LA TABLA","STANDINGS","TABELLE")}</span><h2>${text("Así va el torneo.","Tournament progress.","So steht das Turnier.")}</h2></div><a class="gx-text-action" href="${turl(t.id,"tabla")}">↗</a></div>${table(t)}</div></div>`;
 if(tab==="tabla")body=`<div class="gx-section-header"><div><span class="gx-kicker">${text("CLASIFICACIÓN DEL TORNEO","TOURNAMENT STANDINGS","TURNIERTABELLE")}</span><h2>${text("La lucha por el primer puesto.","The race for first place.","Der Kampf um Platz eins.")}</h2></div></div><p class="gx-disclaimer">${text("Tabla de torneo ficticia. No representa puntos oficiales ASLO.","Fictional tournament standings. These are not official ASLO ranking points.","Beispiel-Turniertabelle. Keine offiziellen ASLO-Ranglistenpunkte.")}</p>${table(t)}`;
 if(tab==="partidos")body=`<div class="gx-section-header"><div><span class="gx-kicker">${text("CALENDARIO DE PARTIDOS","MATCH CALENDAR","SPIELPLAN")}</span><h2>${text("Cada jornada cuenta.","Every round matters.","Jeder Spieltag zählt.")}</h2></div></div><div class="gx-rounds">${t.rounds.map(r=>`<section class="gx-round"><div class="gx-round-heading"><strong>${text("JORNADA","ROUND","SPIELTAG")} ${esc(r[0])}</strong><span>${esc(r[1])}</span></div>${r[2].map(matchTile).join("")}</section>`).join("")}</div>`;
 if(tab==="noticias")body=`<div class="gx-section-header"><div><span class="gx-kicker">${text("DESDE EL TORNEO","FROM THE TOURNAMENT","AUS DEM TURNIER")}</span><h2>${text("Lo que está pasando.","What's happening.","Was gerade passiert.")}</h2></div></div><div class="gx-news-deck">${t.news.map((v,i)=>`<article class="gx-news gx-news-${i}"><span class="gx-news-label">${text("ACTUALIDAD","NEWS","AKTUELLES")}</span><span class="gx-news-visual" aria-hidden="true">✶</span><h3>${esc(lang()==="es"?v:(newsCopy[lang()]||newsCopy.en)[i%2])}</h3><span class="gx-read">${text("INFORMACIÓN SIMULADA","SIMULATED CONTENT","BEISPIELINHALT")}</span></article>`).join("")}</div>`;
 return `<div class="gx-app gx-subpage">${topUI()}<section class="gx-subhero gx-tourneyhero"><div class="gx-subhero-number" aria-hidden="true">26</div><div class="gx-breadcrumb"><a href="index.html">${text("INICIO","HOME","STARTSEITE")}</a> / <a href="ligas.html">${text("LIGAS","LEAGUES","LIGEN")}</a> / <a href="${lurl(l.id)}">${esc(l.short)}</a> / ${esc(t.name)}</div><span class="gx-kicker">${esc(l.name)} / ${status(t.status)}</span><h1>${esc(t.name)}<em>.</em></h1><p>${text("FÚTBOL AMATEUR · TEMPORADA 2026","AMATEUR FOOTBALL · SEASON 2026","AMATEURFUSSBALL · SAISON 2026")}</p><div class="gx-competition-badge"><span>⚽</span><b>${t.teams.length}</b>${text("EQUIPOS","TEAMS","TEAMS")}</div></section><div class="gx-tabs" role="navigation" aria-label="${text("Información del torneo","Tournament information","Turnierinformationen")}">${valid.map(id=>`<a href="${turl(t.id,id)}" class="${id===tab?"active":""}">${tabName[id]}</a>`).join("")}</div><section class="gx-rails gx-tournament">${body}</section></div>`;
}
function page(){const file=location.pathname.split("/").pop()||"index.html";return file==="ligas.html"?"ligas":file==="liga.html"?"liga":file==="torneo.html"?"torneo":"inicio"}
function draw(){
 const selected=page();
 const main=selected==="ligas"?leaguesPage():selected==="liga"?leagueDetail():selected==="torneo"?tournamentPage():home();
 document.body.classList.add("gx-active");
 document.body.dataset.page=selected;
 document.body.innerHTML=window.asloAuth.chrome(main,selected==="inicio"?"inicio":"ligas");
 window.asloAuth.attachChrome();
 bindInteractions();
 document.title="asloXP · "+({inicio:text("Arena deportiva","Sports Arena","Sportarena"),ligas:text("Explorar ligas","Explore leagues","Ligen entdecken"),liga:text("Liga","League","Liga"),torneo:text("Torneo","Tournament","Turnier")})[selected];
 if(!reduced()){document.body.classList.remove("gx-enter");void document.body.offsetWidth;document.body.classList.add("gx-enter")}
}
function navigate(url){
 if(transitioning)return;
 if(audioOn)playTone(660,0.08,0.008,"sine");
 if(reduced()){history.pushState({},"",url);draw();window.scrollTo(0,0);return}
 transitioning=true;document.body.classList.add("gx-leaving");
 setTimeout(()=>{history.pushState({},"",url);region="all";search="";draw();window.scrollTo(0,0);document.body.classList.remove("gx-leaving");transitioning=false},190);
}
function bindInteractions(){
 updateSoundButton();
 const sound=document.querySelector("#gx-audio");if(sound)sound.addEventListener("click",audioToggle);
 document.querySelectorAll("[data-carousel]").forEach(el=>el.addEventListener("click",()=>{
  featured=(featured+(el.dataset.carousel==="1"?1:2))%3;const holder=document.querySelector("#gx-featured");if(holder){holder.classList.remove("gx-swap");void holder.offsetWidth;holder.classList.add("gx-swap");holder.innerHTML=featuredMarkup();document.querySelectorAll(".gx-carousel-dots i").forEach((d,i)=>d.classList.toggle("active",featured===i))}if(audioOn)playTone(430,0.08,0.008);
 }));
 document.querySelectorAll("[data-results]").forEach(el=>el.addEventListener("click",()=>{matchFilter=el.dataset.results;document.querySelectorAll("[data-results]").forEach(b=>b.classList.toggle("active",b.dataset.results===matchFilter));const board=document.querySelector("#gx-matchboard");if(board)board.innerHTML=matchboard();if(audioOn)playTone(420,0.1,0.009)}));
 const input=document.querySelector("#gx-search");
 function filter(){if(input)search=input.value;const result=document.querySelector("#gx-league-results");if(result){result.innerHTML=filteredLeagues();const count=leagues.filter(l=>(region==="all"||l.region===region)&&(`${l.name} ${l.city}`.toLowerCase().includes(search.toLowerCase().trim()))).length;const c=document.querySelector("#gx-total");if(c)c.textContent=count+" "+text("LIGAS","LEAGUES","LIGEN");const empty=document.querySelector("#gx-no-results");if(empty)empty.hidden=count>0}}
 if(input)input.addEventListener("input",filter);
 document.querySelectorAll("[data-region]").forEach(el=>el.addEventListener("click",()=>{region=el.dataset.region;document.querySelectorAll("[data-region]").forEach(b=>b.classList.toggle("active",b.dataset.region===region));filter();if(audioOn)playTone(440,0.07,0.007)}));filter();
}
document.addEventListener("click",e=>{
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest("a[href]");if(!a||a.hasAttribute("download")||a.target==="_blank")return;
 let url;try{url=new URL(a.href,location.href)}catch(err){return}
 if(url.origin!==location.origin)return;const file=url.pathname.split("/").pop()||"index.html";
 if(!["index.html","ligas.html","liga.html","torneo.html"].includes(file))return;
 e.preventDefault();navigate(url.pathname+url.search+url.hash);
});
window.addEventListener("popstate",()=>{draw()});
window.addEventListener("pagehide",()=>{if(musicTimer)clearInterval(musicTimer);if(audioCtx){try{audioCtx.close()}catch(e){}}});
draw();
})();