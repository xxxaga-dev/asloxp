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

const sportCatalog=[
 {id:"futbol",names:["FÚTBOL","FOOTBALL","FUSSBALL"],icon:"⚽",glyph:"01",tone:"field",live:true,tag:["DISPONIBLE EN ESTA DEMO","AVAILABLE IN THIS DEMO","IN DIESER DEMO VERFÜGBAR"]},
 {id:"baloncesto",names:["BALONCESTO","BASKETBALL","BASKETBALL"],icon:"🏀",glyph:"02",tone:"court",live:false,tag:["VISTA CONCEPTUAL","CONCEPT PREVIEW","KONZEPTVORSCHAU"]},
 {id:"voleibol",names:["VOLEIBOL","VOLLEYBALL","VOLLEYBALL"],icon:"🏐",glyph:"03",tone:"volley",live:false,tag:["VISTA CONCEPTUAL","CONCEPT PREVIEW","KONZEPTVORSCHAU"]},
 {id:"atletismo",names:["ATLETISMO","ATHLETICS","LEICHTATHLETIK"],icon:"🏃",glyph:"04",tone:"track",live:false,tag:["VISTA CONCEPTUAL","CONCEPT PREVIEW","KONZEPTVORSCHAU"]},
 {id:"ciclismo",names:["CICLISMO","CYCLING","RADSPORT"],icon:"🚴",glyph:"05",tone:"race",live:false,tag:["VISTA CONCEPTUAL","CONCEPT PREVIEW","KONZEPTVORSCHAU"]},
 {id:"tenis",names:["TENIS","TENNIS","TENNIS"],icon:"🎾",glyph:"06",tone:"racket",live:false,tag:["VISTA CONCEPTUAL","CONCEPT PREVIEW","KONZEPTVORSCHAU"]}
];
const sportName=x=>x.names[lang()==="en"?1:lang()==="de"?2:0];
let sportId="futbol";
try{const remembered=sessionStorage.getItem("asloxp-visitor-sport");if(sportCatalog.some(x=>x.id===remembered))sportId=remembered}catch(e){}
const currentSport=()=>sportCatalog.find(x=>x.id===sportId)||sportCatalog[0];
const previewLabel=()=>text("EJEMPLOS VISUALES · NO CONFIRMAN DEPORTES DEL LANZAMIENTO","VISUAL EXAMPLES · NOT A RELEASE COMMITMENT","VISUELLE BEISPIELE · KEINE ZUSAGE FÜR DEN START");
function selectSport(id){
 if(!sportCatalog.some(x=>x.id===id))return;
 sportId=id;region="all";search="";try{sessionStorage.setItem("asloxp-visitor-sport",id)}catch(e){}
 if(audioOn)playTone(id==="futbol"?523.25:329.63,0.13,0.013);
 draw();
}
function sportButtons(compact=false){
 return sportCatalog.map(sp=>`<button class="gx-sport-choice ${sp.id===sportId?"chosen":""} ${sp.live?"is-available":"is-preview"}" data-sport="${sp.id}" type="button" aria-pressed="${sp.id===sportId}" aria-label="${sportName(sp)}"><span class="gx-sport-icon" aria-hidden="true">${sp.icon}</span><span class="gx-sport-text"><b>${sportName(sp)}</b><small>${sp.live?text("COMPETICIONES","COMPETITIONS","WETTBEWERBE"):text("EXPLORAR CONCEPTO","EXPLORE CONCEPT","KONZEPT ENTDECKEN")}</small></span><span class="gx-sport-corner" aria-hidden="true">${sp.glyph}</span></button>`).join("");
}
function sportGate(compact=false){
 const sp=currentSport();
 return `<section class="gx-sport-gate" data-sport-scene="${sp.id}">
  <div class="gx-gate-ambient" aria-hidden="true"><div class="gx-gate-floor"></div><span class="gx-ambient-mark">${sp.icon}</span><span class="gx-ambient-index">${sp.glyph}</span><div class="gx-orbit gx-orbit-one"></div><div class="gx-orbit gx-orbit-two"></div></div>
  <div class="gx-gate-content">
   <span class="gx-kicker"><i class="gx-dot"></i>${text("ASLO / UNIVERSO DEPORTIVO","ASLO / SPORTS UNIVERSE","ASLO / SPORTUNIVERSUM")} <span class="gx-version">EXPERIENCE 01</span></span>
   <h1>${text("ELIGE TU","CHOOSE YOUR","WÄHLE DEIN")}<span>${text("DEPORTE.","SPORT.","SPORTART.")}</span></h1>
   <div class="gx-gate-selected" aria-live="polite"><div class="gx-sel-number">/${sp.glyph}</div><div><span class="gx-status-chip ${sp.live?"gx-ready":"gx-concept"}">${sp.tag[lang()==="en"?1:lang()==="de"?2:0]}</span><h2>${sportName(sp)}</h2><p>${sp.live?text("Ligas, torneos, partidos y resultados ficticios para probar la primera disciplina.","Fictional leagues, tournaments and results for the first sport demo.","Fiktive Ligen, Turniere und Ergebnisse der ersten Sport-Demo."):text("Explora cómo cambiaría la arena para este deporte. Todavía no hay ligas ni eventos de prueba.","Explore how the arena adapts to this sport. No sample leagues or events yet.","Sieh, wie sich die Arena anpasst. Noch keine Demo-Ligen oder Spiele.")}</p></div></div>
   <div class="gx-gate-cta">${sp.live?`<a class="gx-console-btn primary" href="ligas.html">${text("ENTRAR A LAS LIGAS","ENTER LEAGUES","LIGEN ÖFFNEN")} <span>↗</span></a><a class="gx-console-btn ghost" href="${turl("apertura")}">${text("TORNEO DESTACADO","FEATURED TOURNAMENT","TURNIER-HIGHLIGHT")} →</a>`:`<a class="gx-console-btn primary" href="ligas.html">${text("EXPLORAR ESTE DEPORTE","EXPLORE THIS SPORT","SPORTART ENTDECKEN")} <span>↗</span></a><button type="button" class="gx-console-btn ghost" data-sport="futbol">${text("VOLVER A FÚTBOL","BACK TO FOOTBALL","ZURÜCK ZUM FUSSBALL")} ↶</button>`}</div>
  </div>
  <div class="gx-choose-zone"><div class="gx-choose-title"><div><span>${text("SELECCIÓN DE DISCIPLINA","SPORT SELECT","SPORTAUSWAHL")}</span><strong>${text("TU PRÓXIMA EXPERIENCIA","YOUR NEXT EXPERIENCE","DEIN NÄCHSTES ERLEBNIS")}</strong></div><span class="gx-input-hint">◄ ► · ${text("ELIGE","SELECT","WÄHLEN")}</span></div><div class="gx-sport-matrix">${sportButtons()}</div><p class="gx-catalog-note">${previewLabel()}</p></div>
 </section>`;
}
function sportRibbon(){
 return `<div class="gx-sport-ribbon" aria-label="${text("Seleccionar deporte","Choose sport","Sportart wählen")}"><div class="gx-ribbon-intro"><b>${text("DEPORTE","SPORT","SPORTART")}</b><small>${text("CAMBIA EL ESCENARIO","SWITCH THE ARENA","ARENA WECHSELN")}</small></div><div class="gx-ribbon-list">${sportButtons(true)}</div></div>`;
}
function conceptualPreview(){
 const sp=currentSport();
 return `<section class="gx-concept-zone" data-sport-scene="${sp.id}"><div class="gx-concept-orbit" aria-hidden="true">${sp.icon}</div><div class="gx-concept-content"><span class="gx-kicker">${previewLabel()}</span><span class="gx-concept-id">/ ${sp.glyph}</span><h2>${sportName(sp)}</h2><p>${text("ASLO está pensado para distintos deportes. Esta es una vista de navegación, no el anuncio de una disciplina confirmada ni de competiciones existentes.","ASLO is conceived for multiple sports. This is a navigation concept, not a confirmed launch sport or real competition.","ASLO ist für mehrere Sportarten gedacht. Diese Ansicht bestätigt weder eine Sportart beim Start noch reale Wettbewerbe.")}</p><div class="gx-concept-actions"><button type="button" class="gx-console-btn primary" data-sport="futbol">${text("VER FÚTBOL DE DEMOSTRACIÓN","VIEW FOOTBALL DEMO","FUSSBALL-DEMO ANSEHEN")} ↗</button><a class="gx-console-btn ghost" href="index.html">${text("CAMBIAR DEPORTE","CHANGE SPORT","SPORTART WECHSELN")} →</a></div></div></section>`;
}
function soundDock(){
 return `<div class="gx-sound-dock"><button type="button" id="gx-audio" aria-pressed="${audioOn}" aria-label="${audioOn?text("Silenciar ambiente","Mute ambience","Ton ausschalten"):text("Activar música ambiental","Enable ambient music","Musik einschalten")}" title="${text("Música original, opcional y sin reproducción automática","Original optional music, no autoplay","Eigene optionale Musik, keine automatische Wiedergabe")}"><span aria-hidden="true">${audioOn?"♫":"♪"}</span><span>${audioOn?text("SILENCIAR","MUTE","STUMM"):text("AMBIENTE","SOUND","KLANG")}</span></button></div>`;
}

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
function updateSoundButton(){const b=document.querySelector("#gx-audio");if(!b)return;b.setAttribute("aria-pressed",String(audioOn));b.innerHTML=`<span aria-hidden="true">${audioOn?"♫":"♪"}</span><span>${audioOn?text("SILENCIAR","MUTE","STUMM"):text("AMBIENTE","SOUND","KLANG")}</span>`;}
function topUI(){
 return `<div class="gx-console-head"><span><b>ASLO</b> / ${text("ACCESO LIBRE","OPEN ACCESS","FREIER ZUGANG")}</span><span class="gx-console-center">${text("MULTIDEPORTE · PLATAFORMA MUNDIAL","MULTI-SPORT · GLOBAL PLATFORM","MULTISPORT · WELTWEITE PLATTFORM")}</span><span class="gx-console-status"><i></i> EXPERIENCE MODE</span></div>`;
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
 const football=sportId==="futbol";
 return `<div class="gx-app gx-game-launcher">${topUI()}${sportGate()}
 ${football?`
 <section class="gx-game-strip"><div class="gx-strip-left"><span class="gx-kicker">${text("ACCIÓN DESTACADA","FEATURED ACTION","HIGHLIGHT")}</span><h2>${text("El juego está en marcha.","The game is on.","Das Spiel läuft.")}</h2></div><div class="gx-strip-panel"><div id="gx-featured" class="gx-featured">${featuredMarkup()}</div><div class="gx-featured-controls"><button type="button" data-carousel="-1" aria-label="${text("Anterior","Previous","Zurück")}">←</button><div class="gx-carousel-dots" aria-hidden="true">${[0,1,2].map(i=>`<i class="${i===featured?"active":""}"></i>`).join("")}</div><button type="button" data-carousel="1" aria-label="${text("Siguiente","Next","Weiter")}">→</button></div></div></section>
 <section class="gx-rails gx-game-section"><div class="gx-section-header"><div><span class="gx-kicker">${text("MAPA DE COMPETICIÓN","COMPETITION MAP","WETTBEWERBSKARTE")}</span><h2>${text("Ligas en el radar.","Leagues on your radar.","Ligen im Blick.")}</h2></div><a class="gx-text-action" href="ligas.html">${text("IR A LAS LIGAS","BROWSE LEAGUES","LIGEN ANSEHEN")} ↗</a></div><div class="gx-league-deck">${leagues.map(leagueCard).join("")}</div></section>
 <section class="gx-command gx-game-section"><div class="gx-section-header"><div><span class="gx-kicker">${text("CENTRO DE PARTIDOS","MATCH CENTER","SPIELZENTRALE")}</span><h2>${text("Elige qué ver.","Choose your view.","Wähle deine Ansicht.")}</h2></div><div class="gx-switch"><button type="button" data-results="recent" class="${matchFilter==="recent"?"active":""}">${text("RESULTADOS","RESULTS","ERGEBNISSE")}</button><button type="button" data-results="upcoming" class="${matchFilter==="upcoming"?"active":""}">${text("PRÓXIMOS","UPCOMING","NÄCHSTE")}</button></div></div><div class="gx-matchboard" id="gx-matchboard">${matchboard()}</div></section>
 <section class="gx-stories gx-game-section"><div class="gx-section-header"><div><span class="gx-kicker">${text("HISTORIAS DEL DEPORTE","STORIES FROM SPORT","SPORTGESCHICHTEN")}</span><h2>${text("Fuera de la cancha.","Beyond the pitch.","Abseits des Feldes.")}</h2></div></div><div class="gx-news-deck">${leagues.map(newsCard).join("")}</div></section>`:`${conceptualPreview()}`}
 <div class="gx-footer-line"><span>ASLO / <b>${text("UN DEPORTE. MIL HISTORIAS.","ONE SPORT. A THOUSAND STORIES.","EIN SPORT. TAUSEND GESCHICHTEN.")}</b></span><span>${text("DATOS FICTICIOS · PROTOTIPO","FICTIONAL DATA · PROTOTYPE","BEISPIELDATEN · PROTOTYP")}</span></div>${soundDock()}</div>`;
}
function matchboard(){
 const ms=allMatches.filter(m=>matchFilter==="recent"?m.a!=null:m.a==null).slice(0,7);
 return ms.map((m,i)=>`<a class="gx-match-row" href="${turl(m.tournament,"partidos")}"><span class="gx-match-round">0${i+1}</span><span class="gx-match-meta"><small>${esc(find(tournaments,m.tournament).name)}</small><b>${esc(m.date)}</b></span><span class="gx-match-team home">${esc(m.teamA)}</span><span class="gx-match-score">${m.a!=null?`${m.a} <i>:</i> ${m.b}`:"VS"}</span><span class="gx-match-team away">${esc(m.teamB)}</span><span class="gx-match-arrow">↗</span></a>`).join("");
}
function leaguesPage(){
 const football=sportId==="futbol";
 return `<div class="gx-app gx-games-explore">${topUI()}<section class="gx-subhero gx-subhero-games"><div class="gx-breadcrumb"><a href="index.html">${text("UNIVERSO DEPORTIVO","SPORTS UNIVERSE","SPORTUNIVERSUM")}</a> / ${text("EXPLORAR","EXPLORE","ENTDECKEN")}</div><span class="gx-kicker">${text("ELIGE TU CANCHA","CHOOSE YOUR ARENA","WÄHLE DEINE ARENA")}</span><h1>${text("CADA DEPORTE.","EVERY SPORT.","JEDER SPORT.")}<em>${text("UN MUNDO.","A WORLD.","EINE WELT.")}</em></h1><p>${text("Cambia de disciplina para descubrir cómo sería su espacio en ASLO.","Switch sports to see how each would have its own space in ASLO.","Wechsle die Sportart und entdecke ihre mögliche ASLO-Arena.")}</p></section>${sportRibbon()}
 ${football?`<section class="gx-rails gx-filters gx-game-section"><div class="gx-section-header"><div><span class="gx-kicker">${text("FÚTBOL · DISPONIBLE EN EL PROTOTIPO","FOOTBALL · AVAILABLE IN THIS DEMO","FUSSBALL · IN DER DEMO VERFÜGBAR")}</span><h2>${text("Elige una liga.","Choose a league.","Wähle eine Liga.")}</h2></div><span id="gx-total" class="gx-count"></span></div><div class="gx-filter-bar"><label class="gx-searchbox"><span aria-hidden="true">⌕</span><input id="gx-search" type="search" placeholder="${text("Buscar liga o ciudad","Search league or city","Liga oder Stadt suchen")}" value="${esc(search)}" aria-label="${text("Buscar liga","Search league","Liga suchen")}"></label><div class="gx-filter-buttons">${["all","Bogotá","Cundinamarca","Atlántico"].map(o=>`<button type="button" data-region="${esc(o)}" class="${region===o?"active":""}">${o==="all"?text("TODAS","ALL","ALLE"):esc(o)}</button>`).join("")}</div></div><div class="gx-league-deck gx-explore" id="gx-league-results">${filteredLeagues()}</div><p id="gx-no-results" class="gx-no-results" hidden>${text("No hay ligas con esos filtros.","No matching leagues.","Keine passenden Ligen.")}</p></section>`:`${conceptualPreview()}`}${soundDock()}</div>`;
}
function filteredLeagues(){return leagues.filter(l=>(region==="all"||l.region===region)&&(`${l.name} ${l.city}`.toLowerCase().includes(search.toLowerCase().trim()))).map(leagueCard).join("")}
function leagueDetail(){
 const q=new URLSearchParams(location.search),l=find(leagues,q.get("id"));
 return `<div class="gx-app gx-subpage">${topUI()}${soundDock()}<section class="gx-subhero gx-teamhero"><div class="gx-big-initial" aria-hidden="true">${esc(l.short)}</div><div class="gx-breadcrumb"><a href="index.html">${text("INICIO","HOME","STARTSEITE")}</a> / <a href="ligas.html">${text("LIGAS","LEAGUES","LIGEN")}</a> / ${esc(l.short)}</div><span class="gx-kicker">${text("LIGA / TERRITORIO","LEAGUE / REGION","LIGA / REGION")} ${esc(l.region)}</span><h1>${esc(l.name)}<em>.</em></h1><p>${esc(l.city)} · ${text("FÚTBOL AMATEUR","AMATEUR FOOTBALL","AMATEURFUSSBALL")}</p><div class="gx-league-meta"><span><b>${l.games.length}</b> ${text("COMPETICIONES","COMPETITIONS","WETTBEWERBE")}</span><span><b>${esc(l.short)}</b> ${text("IDENTIFICADOR","IDENTIFIER","KÜRZEL")}</span></div></section><section class="gx-rails"><div class="gx-section-header"><div><span class="gx-kicker">${text("ELIGE TU COMPETICIÓN","SELECT COMPETITION","WETTBEWERB WÄHLEN")}</span><h2>${text("Entra al torneo.","Enter a tournament.","Zum Turnier.")}</h2></div></div><div class="gx-competition-deck">${l.games.map((id,i)=>{const t=find(tournaments,id);return `<a class="gx-competition" href="${turl(id)}"><span class="gx-comp-count">0${i+1}</span><span class="gx-comp-badge">${status(t.status)}</span><div class="gx-comp-symbol" aria-hidden="true">⚽</div><h3>${esc(t.name)}</h3><p>${text("FÚTBOL · ADULTOS","FOOTBALL · ADULTS","FUSSBALL · ERWACHSENE")}</p><span class="gx-comp-go">${text("ENTRAR AL TORNEO","ENTER TOURNAMENT","ZUM TURNIER")} ↗</span></a>`}).join("")}</div></section><section class="gx-stories"><div class="gx-section-header"><div><span class="gx-kicker">${text("DESDE LA LIGA","FROM THE LEAGUE","AUS DER LIGA")}</span><h2>${text("Última noticia.","Latest update.","Neueste Meldung.")}</h2></div></div><div class="gx-news-deck gx-news-single">${newsCard(l,0)}</div></section></div>`;
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
 return `<div class="gx-app gx-subpage">${topUI()}${soundDock()}<section class="gx-subhero gx-tourneyhero"><div class="gx-subhero-number" aria-hidden="true">26</div><div class="gx-breadcrumb"><a href="index.html">${text("INICIO","HOME","STARTSEITE")}</a> / <a href="ligas.html">${text("LIGAS","LEAGUES","LIGEN")}</a> / <a href="${lurl(l.id)}">${esc(l.short)}</a> / ${esc(t.name)}</div><span class="gx-kicker">${esc(l.name)} / ${status(t.status)}</span><h1>${esc(t.name)}<em>.</em></h1><p>${text("FÚTBOL AMATEUR · TEMPORADA 2026","AMATEUR FOOTBALL · SEASON 2026","AMATEURFUSSBALL · SAISON 2026")}</p><div class="gx-competition-badge"><span>⚽</span><b>${t.teams.length}</b>${text("EQUIPOS","TEAMS","TEAMS")}</div></section><div class="gx-tabs" role="navigation" aria-label="${text("Información del torneo","Tournament information","Turnierinformationen")}">${valid.map(id=>`<a href="${turl(t.id,id)}" class="${id===tab?"active":""}">${tabName[id]}</a>`).join("")}</div><section class="gx-rails gx-tournament">${body}</section></div>`;
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
 document.querySelectorAll("[data-sport]").forEach(el=>el.addEventListener("click",()=>selectSport(el.dataset.sport)));
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