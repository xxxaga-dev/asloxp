(function asloLeagueArena(){
"use strict";
const root=document.getElementById("league-arena");if(!root)return;
const lm=window.asloLeagues,league=lm?.current?.()||{id:"metropolitana",name:"Liga Metropolitana Amateur",sport:"futbol",country:"Colombia",region:"Cundinamarca",city:"Bogotá",scope:"ciudad",scopeDetail:"Bogotá",conditions:"",description:"",categories:[],demo:true};
const isDefault=league.id==="metropolitana";
lm?.select?.(league.id);
const sportsName=lm?.sports?.[league.sport]?.name||league.sport;
const sportWhere=[league.city,league.region,league.country].filter(Boolean).join(", ");
const sportCode={"futbol":"photo-1522778119026-d647f0596c20","baloncesto":"photo-1519861531473-9200262188bf","voleibol":"photo-1612872087720-bb876e2e67d1","tenis":"photo-1622279457486-62dcc4a431d6"}[league.sport]||"photo-1522778119026-d647f0596c20";
const leaguePhoto="https://images.unsplash.com/"+sportCode+"?auto=format&fit=crop&w=1600&q=80";
const auth=window.asloAuth||{}, lang=(auth.lang&&auth.lang())||"es",nm=auth.getAccount&&auth.getAccount()?.name||"Invitado";
const tr=(es,en,de)=>({es,en,de})[lang]||es;
const P="https://images.unsplash.com/";
const photos={
hero:P+"photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1700&q=82",
sport:P+"photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1100&q=80",
match:P+"photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=78",
cup:P+"photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1100&q=78",
people:P+"photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=78",
ball:P+"photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=78"
};
const tournaments=[
{id:"apertura",name:"Apertura 2026",category:"Adultos",sub:"Fútbol · Adultos",teams:12,matches:24,state:"En disputa",photo:photos.sport,description:"La emoción de una nueva temporada."},
{id:"femenina",name:"Copa Femenina",category:"Adultas",sub:"Fútbol · Femenino",teams:10,matches:12,state:"Próximo",photo:photos.people,description:"Una competición para hacer historia."},
{id:"juvenil",name:"Copa Juvenil",category:"Juvenil",sub:"Fútbol · Juvenil",teams:16,matches:8,state:"En disputa",photo:photos.hero,description:"El talento joven entra en juego."}
];
const sponsors=[
{id:"altura",name:"ALTURA",tag:"SPORT",color:"#20bafe",line:"El deporte nos impulsa.",sub:"Equipamiento deportivo"},
{id:"pulso",name:"PULSO+",tag:"ENERGY",color:"#d7fd63",line:"Energía para cada encuentro.",sub:"Bienestar y actividad"},
{id:"tribuna",name:"TRIBUNA",tag:"FAN",color:"#e58dff",line:"La pasión también juega.",sub:"Comunidad deportiva"},
{id:"nexo",name:"NEXO",tag:"FIT",color:"#ffbb68",line:"Muévete con tu equipo.",sub:"Actividad física"}
];
const nav=[["inicio","⌂",tr("Mi liga","My league","Meine Liga")],["torneos","🏆",tr("Torneos","Tournaments","Turniere")],["partidos","⚽",tr("Encuentros","Matches","Spiele")],["planilla","▣",tr("Planilla","Match sheet","Spielbericht")],["premios","✦",tr("Premiación","Prizes","Preise")],["patrocinadores","◇",tr("Patrocinadores","Sponsors","Sponsoren")],["liga","⚙",tr("Configuración","Settings","Einstellungen")]];
const safe=(s)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read=(k,fallback)=>{try{return JSON.parse(sessionStorage.getItem(k))||fallback}catch{return fallback}};
const save=(k,val)=>{try{sessionStorage.setItem(k,JSON.stringify(val))}catch{}};
const state={view:new URLSearchParams(location.search).get("vista")||"inicio",leagueSection:new URLSearchParams(location.search).get("seccion")||"general",tournament:0,matchTab:"alineaciones",tourTab:(["resumen","inscripciones","fases","partidos","solicitudes","oficiales","escenarios","planillas","disciplina","clasificacion","premios","noticias","cierre"].includes(new URLSearchParams(location.search).get("tab"))?new URLSearchParams(location.search).get("tab"):"resumen"),sponsor:0,more:false,modal:false,notifications:read("aslo-arena-news:"+league.id,[]),added:read("aslo-arena-tournaments:"+league.id,[]),award:read("aslo-arena-awards:"+league.id,{description:"Premios deportivos del torneo · Por confirmar",note:""})};
if(!nav.some(([id])=>id===state.view))state.view="inicio";
/* Direct access from organizer search: retain the selected league and tournament. */
var requestedTournament=new URLSearchParams(location.search).get("torneo");
if(requestedTournament){
 var wantedIndex=(isDefault?tournaments:[]).concat(state.added).findIndex(function(t){return t.id===requestedTournament});
 if(wantedIndex>=0){state.tournament=wantedIndex;state.view="torneos";}
}
function allTournaments(){return (isDefault?tournaments:[]).concat(state.added)}
function selected(){return allTournaments()[state.tournament]||allTournaments()[0]||null}
function activeAwardKey(){return "aslo-arena-awards:"+league.id+":"+(selected()?.id||"none")}
function activeAward(){return read(activeAwardKey(),{description:"Premios deportivos del torneo · Por confirmar",note:""})}
function noTournaments(){
return '<section class="arena-block arena-empty-league"><div class="arena-overline">ASLO / COMPETITION</div><h2>'+tr("Aún no hay torneos en esta liga","No tournaments in this league yet","Noch keine Turniere in dieser Liga")+'</h2><p>'+tr("Prepara el primer torneo con los criterios independientes de esta liga. Los equipos se vinculan por invitación.","Prepare the first tournament with this league’s eligibility. Teams join by invitation.","Erstelle das erste Turnier mit den Bedingungen dieser Liga.")+'</p><button data-new-tournament type="button" class="arena-action arena-action-solid">+ '+tr("Preparar torneo","Prepare tournament","Turnier vorbereiten")+'</button></section>';
}
function leagueConfigShortcut(){
return '<div class="arena-league-shortcuts"><a class="arena-action arena-action-outline" href="mis-ligas.html">'+tr("Todas mis ligas","All leagues","Alle Ligen")+' ↗</a><a class="arena-action arena-action-outline" href="'+(lm?.formLink?.(league.id)||"mis-ligas.html")+'">'+tr("Configurar esta liga","Configure this league","Diese Liga bearbeiten")+' ⚙</a></div>';
}

/* Operational demonstration per league / per tournament: registrations, capacity, substitutions. */
const DEMO_TEAMS=["Halcones FC","Tigres FC","Águilas FC","Leones FC","Dragones FC","Panteras FC","Raptors FC","Real Bogotá","Unión FC","Estrellas FC","Andes FC","Campeones FC","Fortaleza FC","Juventud FC","Olimpo FC","Titanes FC","Nueva Esperanza FC","Deportivo Sol FC","Atletas FC","Academia Horizonte FC","Barrio Unido FC","Club Deportivo Norte"];
function tourKey(t){return "aslo-tour-operations:"+league.id+":"+(t?.id||"none")}
function tourOps(t=selected()){
 if(!t)return null;
 const defaults={capacity:Math.max(8,t.maxTeams||t.teams||8),open:t.state==="Próximo"||t.state==="Borrador",
  slots:(isDefault?DEMO_TEAMS.slice(0,t.teams||0):[]).map((name,i)=>({id:"seed-"+i,team:name,points:Math.max(0,10-i),played:Math.max(0,4-Math.floor(i/4))})),
  pending:null,replacements:[]};
 const stored=read(tourKey(t),null);
 const ops=stored&&Array.isArray(stored.slots)?stored:defaults;
 if(t.state==="Finalizado")ops.open=false;
 return ops;
}
function persistOps(t,ops){save(tourKey(t),ops)}
function tourOperations(){
 const t=selected();if(!t)return "";
 const o=tourOps(t),total=o.slots.length,space=Math.max(0,o.capacity-total);
 return '<section class="arena-block arena-operations">'+headline("◉",tr("Cupos e inscripciones","Capacity & registrations","Plätze & Anmeldungen"),tr("Reglas particulares de este torneo. Ninguna inscripción de prueba es real.","Independent rules for this tournament; demo only.","Regeln für dieses Turnier; nur Demo."))+
 '<div class="arena-operations-summary"><div><small>'+tr("Cupos ocupados","Registered slots","Belegte Plätze")+'</small><strong>'+total+' / '+o.capacity+'</strong></div><div><small>'+tr("Inscripciones","Registration","Anmeldung")+'</small><strong>'+(!o.open?tr("Cerradas","Closed","Geschlossen"):space===0?tr("Cupo completo","Full","Voll"):tr("Abiertas","Open","Offen"))+'</strong></div><div><small>'+tr("Cupos libres","Free slots","Freie Plätze")+'</small><strong>'+space+'</strong></div></div>'+
 '<div class="arena-operations-actions"><button type="button" class="arena-action arena-action-outline" data-capacity-modal>⚙ '+tr("Configurar cupos e inscripción","Configure capacity","Plätze bearbeiten")+'</button><button type="button" class="arena-action arena-action-solid" data-replace-modal>⇄ '+tr("Reemplazar equipo","Replace team","Team ersetzen")+'</button></div>'+
 '<p class="arena-fine">'+tr("No se admiten nuevos equipos por inscripción abierta cuando el torneo está lleno o las inscripciones están cerradas. Un reemplazo autorizado recupera un cupo existente.","No open registration after closure or when capacity is full. Replacement reuses an existing slot.","Keine offene Anmeldung nach Schließung oder bei voller Kapazität. Ersatz nutzt denselben Platz.")+'</p>'+
 '<h3>'+tr("Equipos participantes (demostración)","Participating teams (demo)","Teilnehmende Teams (Demo)")+'</h3>'+
 (total?'<div class="arena-slots">'+o.slots.map((x,i)=>'<div><span class="arena-slot-index">'+String(i+1).padStart(2,"0")+'</span><strong>'+safe(x.team)+'</strong><small>'+x.points+' '+tr("pts. de cupo","slot pts","Platzpunkte")+'</small></div>').join('')+'</div>':'<p>'+tr("Sin equipos vinculados. La incorporación real requiere invitación y aceptación.","No linked teams. Real entry requires an invitation and acceptance.","Keine Teams. Echte Teilnahme erfolgt mit Einladung und Annahme.")+'</p>')+
 (o.pending?'<div class="arena-pending-replacement"><h3>◷ '+tr("Reemplazo pendiente de aceptación del equipo invitado","Replacement awaiting invited team acceptance","Ersatz wartet auf Bestätigung")+'</h3><p>'+safe(o.pending.from)+' → '+safe(o.pending.to)+' · '+(o.pending.mode==="inherit"?tr("Asume saldo competitivo del cupo","Inherits slot balance","Übernimmt Platzpunkte"):tr("Inicia con cero","Starts at zero","Beginnt bei null"))+'</p><p>'+tr("El organizador no acepta invitaciones en nombre del equipo. Para probar el flujo, utiliza el simulador de respuesta del equipo.","The organizer cannot accept for the team. Use the simulated team reply to test.","Der Organisator kann nicht für das Team zustimmen.")+'</p><button type="button" class="arena-action arena-action-outline" data-simulate-accept>'+tr("Simular aceptación del equipo (demo)","Simulate team acceptance (demo)","Team-Zustimmung simulieren")+'</button> <button type="button" class="arena-action arena-action-outline" data-cancel-replacement>'+tr("Cancelar invitación","Cancel invitation","Einladung abbrechen")+'</button></div>':'')+
 '<div class="arena-replacement-log"><h3>'+tr("Historial de sustituciones","Replacement audit","Ersatzverlauf")+'</h3>'+
 (o.replacements.length?o.replacements.map((x,i)=>'<div><span>↪</span><strong>'+safe(x.from)+' → '+safe(x.to)+'</strong><small>'+safe(x.mode==="inherit"?tr("Hereda saldo del cupo","Inherited slot balance","Platzpunkte übernommen"):tr("Inicia de cero","Starts at zero","Beginn bei null"))+' · '+safe(x.reason)+'</small></div>').join(''):'<p class="arena-fine">'+tr("Ninguna sustitución registrada.","No replacements recorded.","Keine Ersetzungen erfasst.")+'</p>')+'</div></section>';
}
function opsModal(){
 const t=selected(),o=tourOps(t);
 if(!o)return "";
 if(state.modal==="capacity"){
 return '<span class="arena-overline">ASLO / CUPOS</span><h2 id="arena-modal-title">'+tr("Configurar inscripciones","Registration setup","Anmeldungen konfigurieren")+'</h2><p>'+safe(t.name)+'</p><form id="arena-capacity-form"><label>'+tr("Máximo de equipos","Maximum teams","Maximale Teams")+'<input name="capacity" type="number" min="'+o.slots.length+'" max="512" value="'+o.capacity+'" required></label><label>'+tr("Estado de inscripción","Registration status","Anmeldestatus")+'<select name="open"><option value="true" '+(o.open?"selected":"")+'>'+tr("Abiertas","Open","Offen")+'</option><option value="false" '+(!o.open?"selected":"")+'>'+tr("Cerradas","Closed","Geschlossen")+'</option></select></label><p>'+tr("Cerrar inscripciones impide incorporar equipos nuevos por esa vía. El cupo ocupado permanece reservado para un reemplazo excepcional.","Closure prevents new ordinary entries; replacement can reuse an occupied slot.","Nach Schließung sind keine regulären Neuanmeldungen möglich.")+'</p><button class="arena-action arena-action-solid" type="submit">'+tr("Guardar configuración demo","Save demo settings","Einstellungen speichern")+' →</button></form>';
 }
 if(state.modal==="replacement"){
 const opts=o.slots.map((x,i)=>'<option value="'+i+'">'+safe(x.team)+'</option>').join('');
 return '<span class="arena-overline">ASLO / REEMPLAZOS</span><h2 id="arena-modal-title">'+tr("Reemplazar equipo del torneo","Replace a tournament team","Team im Turnier ersetzen")+'</h2><p>'+tr("El equipo saliente mantiene sus actas y resultados históricos. El nuevo participante ocupará su cupo una vez acepte la invitación.","Historical matches stay with the departing team. The incoming team joins after accepting the invitation.","Alte Spiele bleiben beim bisherigen Team. Das neue Team muss zustimmen.")+'</p><form id="arena-replacement-form"><label>'+tr("Equipo que sale","Departing team","Ausscheidendes Team")+'<select name="from" required>'+opts+'</select></label><label>'+tr("Equipo independiente invitado","Invited independent team","Eingeladenes unabhängiges Team")+'<select name="to" required>'+DEMO_TEAMS.filter(n=>!o.slots.some(x=>x.team===n)).map(n=>'<option value="'+safe(n)+'">'+safe(n)+'</option>').join('')+'</select></label><label>'+tr("Criterio deportivo para el nuevo equipo","How the incoming team starts","Übernahme der Platzierung")+'<select name="mode"><option value="zero">'+tr("Comenzar con cero puntos y cero partidos propios","Start at zero","Bei null beginnen")+'</option><option value="inherit">'+tr("Asumir el saldo y la posición del cupo","Inherit the tournament slot's balance","Platzstand übernehmen")+'</option></select></label><label>'+tr("Motivo documentado","Recorded reason","Begründung")+'<textarea name="reason" rows="3" minlength="8" maxlength="240" required placeholder="'+tr("Ej. retirada o incumplimiento de condiciones de la liga","Withdrawal or unmet league terms","Rückzug oder Regelverstoß")+'"></textarea></label><p>'+tr("ASLO no cobra ni confirma pagos. Esta acción no altera actas anteriores ni acredita una aceptación real.","ASLO neither processes nor confirms payments. Existing match records remain unchanged.","ASLO verarbeitet keine Zahlungen. Historische Spielberichte bleiben erhalten.")+'</p><button type="submit" class="arena-action arena-action-solid">'+tr("Enviar invitación de reemplazo (demo)","Send replacement invitation (demo)","Ersatz-Einladung senden (Demo)")+' →</button></form>';
 }
 return "";
}

function badge(s){return '<span class="arena-status '+(s==="En disputa"?"arena-live":s==="Próximo"?"arena-next":"arena-draft")+'">'+safe(s)+'</span>'}
function sponsCard(s,variant){return '<a class="arena-sponsor aslo-fx-tilt '+(variant||'')+'" href="#patrocinador-'+s.id+'" data-sponsor="'+s.id+'" aria-label="'+tr("Ver patrocinador","View sponsor","Sponsor anzeigen")+' '+safe(s.name)+'" style="--brand:'+s.color+'"><span class="arena-sponsor-kicker">'+tr("PATROCINADOR · DEMO","SPONSOR · DEMO","SPONSOR · DEMO")+'</span><strong>'+safe(s.name)+'<small>'+safe(s.tag)+'</small></strong><span>'+safe(s.line)+'</span><em>'+tr("Conocer campaña","View campaign","Kampagne ansehen")+' ↗</em></a>'}
function ad(label){return '<aside class="arena-ad" aria-label="'+tr("Espacio publicitario reservado","Reserved advertising space","Reservierter Werbeplatz")+'"><span>AD</span> '+safe(label||tr("PUBLICIDAD · ESPACIO RESERVADO","ADVERTISING · RESERVED SPACE","WERBUNG · RESERVIERT"))+'</aside>'}
function headline(icon,title,subtitle,action){return '<div class="arena-section-heading"><div><div class="arena-overline">'+icon+' ASLO / '+tr("COMPETICIÓN","COMPETITION","WETTBEWERB")+'</div><h2>'+title+'</h2>'+(subtitle?'<p>'+subtitle+'</p>':'')+'</div>'+(action||'')+'</div>'}
function goBtn(view,label,variant){return '<button class="arena-action '+(variant||'')+'" type="button" data-go="'+view+'">'+label+' <span aria-hidden="true">→</span></button>'}
function stat(n,label,icon){return '<div class="arena-stat"><span>'+icon+'</span><strong>'+n+'</strong><small>'+label+'</small></div>'}
function tournamentCards(){return allTournaments().map((t,i)=>'<button type="button" class="arena-tournament-mini aslo-fx-tilt '+(state.tournament===i?'is-selected':'')+'" data-pick="'+i+'"><span class="arena-tournament-mini-photo" style="background-image:url(\''+t.photo+'\')"></span><span class="arena-tournament-mini-content">'+badge(t.state)+'<strong>'+safe(t.name)+'</strong><small>'+safe(t.sub)+' · '+t.teams+' '+tr("equipos","teams","Teams")+'</small></span><span class="arena-chevron">↗</span></button>').join('')}
function sponsorRow(){return '<div class="arena-sponsors-intro"><div><span class="arena-overline">PARTNERS / ASLO</span><h3>'+tr("Patrocinadores de la liga","League sponsors","Liga-Sponsoren")+'</h3><p>'+tr("Campañas ficticias independientes · sin acuerdos comerciales reales","Independent fictitious campaigns · no actual commercial agreements","Eigenständige fiktive Kampagnen · keine echten Verträge")+'</p></div>'+goBtn("patrocinadores",tr("Ver patrocinadores","View sponsors","Sponsoren ansehen"),"arena-action-outline")+'</div><div class="arena-sponsor-strip">'+sponsors.map(s=>sponsCard(s,"arena-sponsor-compact")).join('')+'</div>'}
function top(){
const ava=safe(nm.slice(0,1).toUpperCase()),demo='<span class="arena-demo">'+tr("PROTOTIPO · DATOS FICTICIOS","PROTOTYPE · FICTIONAL DATA","PROTOTYP · FIKTIVE DATEN")+'</span>';
return '<div class="arena-shell"><header class="arena-top"><a class="arena-logo" href="organizador.html?vista=inicio" aria-label="ASLO, espacio del organizador"><span class="arena-logo-mark">▲</span> ASLO</a><a class="arena-league-name" href="organizador.html?vista=ligas" title="'+tr("Cambiar de liga","Switch league","Liga wechseln")+'"><span class="arena-league-icon">🏆</span><span><strong>'+safe(league.name)+'</strong><small>'+safe(sportsName+" · "+sportWhere)+'</small></span><span class="arena-down">⌄</span></a><div class="arena-top-right">'+demo+'<a class="arena-top-link" href="index.html">'+tr("Ver como visitante","Visitor view","Besucheransicht")+' ↗</a><a class="arena-avatar" href="cuenta.html?tab=perfil" aria-label="'+tr("Mi cuenta","My account","Mein Konto")+'">'+ava+'</a><button class="arena-menu-button" id="arena-toggle-menu" type="button" aria-controls="arena-menu-mobile" aria-expanded="'+state.more+'">☰</button></div></header>'+
'<div class="arena-columns"><aside class="arena-sidebar"><span class="arena-side-kicker">LEAGUE MANAGEMENT</span><div class="arena-side-head"><span>LM</span><strong>'+safe(league.name)+'</strong><small>'+tr("Modo organizador","Organizer mode","Organisatorenmodus")+'</small></div><nav class="arena-side-nav" aria-label="'+tr("Navegación administrador","Administrator navigation","Administratornavigation")+'">'+nav.map(x=>'<button type="button" data-go="'+x[0]+'" class="'+(state.view===x[0]?'active':'')+'"><span>'+x[1]+'</span>'+x[2]+'</button>').join('')+'</nav><div class="arena-sidebar-foot"><span>⚡ ASLO XP</span><small>'+tr("El deporte se vive aquí","Live the sport","Sport erleben")+'</small><a href="organizador.html?vista=ligas">'+tr("Todas mis ligas","All leagues","Alle Ligen")+' ↗</a><a href="modos.html">'+tr("Cambiar modo","Switch mode","Modus wechseln")+' ↗</a></div></aside>'+
'<div id="arena-menu-mobile" class="arena-mobile-menu" '+(state.more?'':'hidden')+'><nav>'+nav.map(x=>'<button type="button" data-go="'+x[0]+'">'+x[1]+' '+x[2]+'</button>').join('')+'<a href="organizador.html?vista=ligas">'+tr("Todas mis ligas","All leagues","Alle Ligen")+'</a><a href="modos.html">'+tr("Cambiar modo","Switch mode","Modus wechseln")+'</a><a href="index.html">'+tr("Noticias públicas","Public news","Öffentliche Nachrichten")+'</a></nav></div><main class="arena-main" id="arena-content">';
}
function end(){return '</main></div><nav class="arena-bottomnav" aria-label="'+tr("Navegación del organizador","Organizer navigation","Organisator-Navigation")+'">'+[nav[0],nav[1],nav[2],nav[4]].map(x=>'<button type="button" data-go="'+x[0]+'" class="'+(state.view===x[0]?'active':'')+'"><span>'+x[1]+'</span><small>'+x[2]+'</small></button>').join('')+'<button type="button" id="arena-bottom-more"><span>☰</span><small>'+tr("Más","More","Mehr")+'</small></button></nav></div>'}
function arenaHome(){
if(!isDefault){
return '<section class="arena-hero aslo-fx-hero" style="--arena-photo:url(\''+leaguePhoto+'\')"><div class="arena-hero-copy aslo-fx-depth"><span class="arena-hero-kicker">⚡ ASLO / LEAGUE ARENA</span><h1>'+safe(league.name)+'</h1><p>'+safe(sportsName+" · "+sportWhere)+'</p><div class="arena-hero-actions"><button data-new-tournament class="arena-action arena-action-solid" type="button">+ '+tr("Crear primer torneo","Create first tournament","Erstes Turnier erstellen")+'</button></div></div></section>'+
'<div class="arena-stats">'+stat(allTournaments().length,tr("Torneos","Tournaments","Turniere"),"🏆")+stat("0",tr("Equipos vinculados","Teams","Teams"),"◉")+stat("0",tr("Encuentros","Matches","Spiele"),"⚽")+stat("0",tr("Sedes","Venues","Spielorte"),"⌖")+'</div>'+
leagueConfigShortcut()+(allTournaments().length?headline("🏆",tr("Torneos de esta liga","League tournaments","Turniere dieser Liga"),safe(league.name))+tournamentCards():noTournaments())+ad();
}
const pick=selected();
return '<section class="arena-hero aslo-fx-hero" style="--arena-photo:url(\''+photos.hero+'\')"><div class="arena-hero-copy aslo-fx-depth"><span class="arena-hero-kicker"><span class="arena-beacon"></span>'+tr("CENTRO DE COMPETICIÓN","COMPETITION CENTER","WETTBEWERBSZENTRUM")+' · ASLO XP</span><h1>'+tr("Dirige tu liga.","Lead your league.","Leite deine Liga.")+'<br><em>'+tr("Vive cada partido.","Feel every match.","Erlebe jedes Spiel.")+'</em></h1><p>'+tr("Los torneos, equipos, encuentros y reconocimientos hacen que el deporte cobre vida.","Tournaments, teams, matches and achievements bring sport to life.","Turniere, Teams und Spiele erwecken den Sport zum Leben.")+'</p><div class="arena-hero-actions">'+goBtn("torneos",tr("Explorar torneos","Explore tournaments","Turniere entdecken"),"arena-action-solid")+goBtn("partidos",tr("Centro de partidos","Match center","Spielzentrum"),"arena-action-outline")+'</div><span class="arena-hero-place">⌖ Bogotá · Colombia &nbsp; ⚽ Fútbol</span></div><div class="arena-hero-overlay"><span>ASLO / LEAGUE ARENA</span><span class="arena-hero-bar"></span><b>01 / 03</b></div></section>'+
'<div class="arena-stats">'+stat(allTournaments().length,"Torneos","🏆")+stat("32","Equipos","◉")+stat("64","Encuentros","⚽")+stat("3","Sedes","⌖")+'</div>'+
'<div class="arena-grid-main"><section class="arena-block arena-showcase arena-reveal" data-showcase>'+headline("🏆",tr("Torneos en juego","Tournaments in play","Laufende Turniere"),tr("Mueve la rueda del mouse sobre las tarjetas o utiliza los controles.","Scroll over the cards or use the controls.","Scrolle über die Karten oder nutze die Tasten."),'<button type="button" class="arena-plain" data-new-tournament>+ '+tr("Preparar torneo","Prepare tournament","Turnier vorbereiten")+'</button>')+
'<div class="arena-feature-photo" id="arena-feature-photo" style="background-image:url(\''+pick.photo+'\')"><div class="arena-feature-info"><span class="arena-overline">COMPETITION / 2026</span><h3 id="arena-feature-title">'+safe(pick.name)+'</h3><p id="arena-feature-description">'+safe(pick.description)+'</p><button type="button" class="arena-action arena-action-solid" data-go="torneos">'+tr("Entrar al torneo","Enter tournament","Zum Turnier")+' →</button></div><div class="arena-feature-counter"><button type="button" data-slide="-1" aria-label="'+tr("Anterior torneo","Previous tournament","Vorheriges Turnier")+'">←</button><span id="arena-feature-index">01 / 0'+allTournaments().length+'</span><button type="button" data-slide="1" aria-label="'+tr("Siguiente torneo","Next tournament","Nächstes Turnier")+'">→</button></div></div>'+
'<div class="arena-tournament-list" id="arena-tournament-list">'+tournamentCards()+'</div></section>'+
'<section class="arena-block arena-match-widget arena-reveal">'+headline("⚡",tr("La próxima jornada","Next matchday","Nächster Spieltag"),tr("Encuentros de ejemplo","Demo matches","Beispielspiele"))+
'<div class="arena-match-stage"><span class="arena-status arena-next">● '+tr("PROGRAMADO","SCHEDULED","GEPLANT")+'</span><div class="arena-match-teams"><div><span class="arena-team-crest">H</span><strong>Halcones FC</strong></div><div class="arena-match-versus"><b>VS</b><span>SÁB · 24 OCT</span><small>16:00</small></div><div><span class="arena-team-crest alt">T</span><strong>Tigres FC</strong></div></div><p>⌖ '+tr("Cancha Norte","North Field","Nordplatz")+' · Apertura 2026</p>'+goBtn("partidos",tr("Ver encuentro","View match","Spiel ansehen"),"arena-action-outline")+'</div>'+
'<div class="arena-mini-highlights"><div><span>01</span><strong>'+tr("Actas y planillas","Match sheets","Spielberichte")+'</strong><small>'+tr("Revisión según roles deportivos","Review by authorized sports roles","Prüfung nach Sportrollen")+'</small></div><div><span>02</span><strong>'+tr("Premiación","Prizes","Preise")+'</strong><small>'+tr("Trofeos y reconocimientos","Trophies and achievements","Pokale und Auszeichnungen")+'</small></div></div></section></div>'+
sponsorRow()+ad()+newsPanel();
}
function newsPanel(){
return '<section class="arena-news"><div class="arena-overline">LEAGUE PULSE</div><h2>'+tr("Lo que está pasando","What is happening","Was gerade passiert")+'</h2><div class="arena-news-grid">'+[
["🏆","Apertura 2026","Se prepara una jornada de encuentros."],
["⚽","Próximo encuentro","Halcones FC se medirá con Tigres FC."],
["✦","Premiación","Reconocimientos del torneo disponibles para consulta."]
].concat(state.notifications).slice(-6).map(n=>'<article class="arena-news-tile aslo-fx-tilt"><span>'+safe(n[0])+'</span><strong>'+safe(n[1])+'</strong><p>'+safe(n[2])+'</p></article>').join('')+'</div></section>';
}

function tournamentSections(){
 const groups=[
 {name:tr("COMPETICIÓN","COMPETITION","WETTBEWERB"),tabs:[
 ["resumen",tr("Resumen","Overview","Übersicht")],
 ["inscripciones",tr("Equipos y cupos","Teams & slots","Teams & Plätze")],
 ["fases",tr("Fases y cruces","Stages & brackets","Phasen & Paarungen")],
 ["partidos",tr("Calendario","Schedule","Spielplan")]]},
 {name:tr("OPERACIÓN","OPERATIONS","BETRIEB"),tabs:[
 ["solicitudes",tr("Solicitudes","Requests","Anfragen")],
 ["oficiales",tr("Árbitros","Officials","Schiedsrichter")],
 ["escenarios",tr("Escenarios","Venues","Spielstätten")],
 ["planillas",tr("Planillas","Match sheets","Spielberichte")],
 ["disciplina",tr("Disciplina","Discipline","Disziplin")]]},
 {name:tr("SEGUIMIENTO","FOLLOW-UP","ÜBERSICHT"),tabs:[
 ["clasificacion",tr("Clasificación","Standings","Tabelle")],
 ["premios",tr("Premiación","Awards","Preise")],
 ["noticias",tr("Noticias","News","Nachrichten")],
 ["cierre",tr("Estado y cierre","Status & completion","Status & Abschluss")]]}
 ];
 return '<nav class="arena-tourney-sections" aria-label="'+tr("Operaciones del torneo","Tournament operations","Turnieroperationen")+'">'+groups.map(g=>
 '<div class="arena-tourney-group"><strong>'+g.name+'</strong><div>'+g.tabs.map(x=>
 '<button type="button" data-tour-tab="'+x[0]+'" class="'+(state.tourTab===x[0]?"active":"")+'" aria-current="'+(state.tourTab===x[0]?"page":"false")+'">'+x[1]+'</button>'
 ).join("")+'</div></div>').join("")+'</nav>';
}
function previewTournament(section){
 const specs={
 fases:[tr("Fases, grupos y cruces","Stages, groups & brackets","Phasen, Gruppen & Paarungen"),
  tr("Cada torneo configura sus fases, grupos desde un equipo, criterios de avance y cruces. Las fases posteriores iniciadas no se recomponen.","Each tournament defines its stages, groups and progressions.","Turnierphasen, Gruppen und Paarungen.")],
 solicitudes:[tr("Solicitudes y reprogramaciones","Requests and rescheduling","Anfragen und Spielverlegungen"),
  tr("Equipos presentan motivos; un organizador o asistente autorizado decide. La solicitud no modifica el calendario automáticamente.","Teams make requests; authorized people decide. Requests do not change the schedule automatically.","Anfragen ändern den Spielplan nicht automatisch.")],
 oficiales:[tr("Funciones y designaciones arbitrales","Officiating positions and assignments","Schiedsrichter und Aufgaben"),
  tr("Se configuran puestos y cantidades por ronda, con jueces independientes o escuelas y sustituciones de emergencia. No imponemos un único árbitro central.","Positions are configured per round, including multiple referees with the same role.","Rollen und Anzahl pro Runde werden frei konfiguriert.")],
 escenarios:[tr("Escenarios, franjas y disponibilidad","Venues and available slots","Spielstätten und Zeitfenster"),
  tr("Los responsables de escenarios asignan franjas; el organizador programa partidos sin reservas duplicadas ni asumir la administración del escenario.","Venue owners assign timeslots; organizers schedule within permitted availability.","Spielstätten vergeben Zeitfenster.")],
 planillas:[tr("Planillas y hechos","Match records and events","Spielberichte und Ereignisse"),
  tr("Los hechos del encuentro proceden de los oficiales y planillas autorizadas. La consulta no concede al organizador potestad arbitral.","The match sheet is the authoritative source. Viewing it does not confer refereeing rights.","Der Spielbericht ist die maßgebliche Quelle.")],
 disciplina:[tr("Disciplina y decisiones deportivas","Discipline and sporting decisions","Disziplin und Entscheidungen"),
  tr("Sanciones, incomparecencias y resultados administrativos requieren competencia, reglamento, defensa y trazabilidad; no inventan goles personales.","Decisions require proper authority, rules and audit trail; no fictional player goals.","Entscheidungen erfordern Befugnis und Nachvollziehbarkeit.")],
 cierre:[tr("Suspensión, cancelación y cierre","Suspension, cancellation & completion","Aussetzung und Abschluss"),
  tr("Antes del primer partido puede aplicarse cancelación autorizada; iniciado el torneo no se cancela, solo se suspende. No concluye sin campeón reglamentario.","A started tournament cannot be cancelled, and cannot finish without a valid champion.","Ein gestartetes Turnier kann nicht storniert werden.")],
 partidos:[tr("Calendario del torneo","Tournament schedule","Turnierkalender"),
  tr("No hay encuentros de muestra registrados para esta competición.","No sample matches are registered for this tournament.","Keine Beispiele angesetzt.")],
 noticias:[tr("Noticias de la competición","Tournament updates","Turniernachrichten"),
  tr("No hay noticias de muestra propias de esta competición.","No sample news for this tournament.","Keine Beispielmeldungen.")],
 };
 const s=specs[section]||[tr("Vista de referencia","Concept view","Konzeptansicht"),tr("Funcionalidad pendiente de prototipo interactivo","Interactive prototype pending","Interaktiver Prototyp ausstehend")];
 return '<section class="arena-block arena-function-preview"><span class="arena-overline">'+tr("COBERTURA DE HISTORIAS DE USUARIO","USER STORY COVERAGE","ABDECKUNG DER USER STORIES")+'</span>'+
 '<h2>'+s[0]+'</h2><p>'+s[1]+'</p><div class="arena-preview-boundary">'+tr("Diseño contextual en análisis. Esta parte aún no simula formularios, solicitudes ni guardados. No se han creado hechos deportivos.","Contextual design under review. No operational saves or sports events implemented.","Kontextdesign in Prüfung; keine echten Vorgänge implementiert.")+'</div></section>';
}

function arenaTournaments(){
if(!allTournaments().length)return headline("🏆",tr("Arena de torneos","Tournament arena","Turnier-Arena"),safe(league.name))+
leagueConfigShortcut()+noTournaments()+ad();
const t=selected();
return headline("🏆",tr("Torneo seleccionado","Selected tournament","Ausgewähltes Turnier"),safe(t.name),'<div class="arena-tour-head-actions"><a class="arena-action arena-action-outline" href="organizador.html?vista=torneos">← '+tr("Todos mis torneos","All my tournaments","Alle meine Turniere")+'</a><button type="button" class="arena-action arena-action-solid" data-new-tournament>＋ '+tr("Preparar torneo","Prepare tournament","Turnier vorbereiten")+'</button></div>')+
'<section class="arena-tournament-hero aslo-fx-hero" style="--arena-photo:url(\''+t.photo+'\')"><div class="aslo-fx-depth"><span class="arena-overline">SEASON 2026 · '+safe(t.sub)+'</span><h2>'+safe(t.name)+'</h2><div class="arena-tour-hero-stats">'+badge(t.state)+'<span>◉ '+t.teams+' '+tr("equipos","teams","Teams")+'</span><span>⚽ '+t.matches+' '+tr("encuentros","matches","Spiele")+'</span></div><p>'+safe(t.description)+'</p></div></section>'+

tournamentSections()+
'<div class="arena-tour-content">'+(state.tourTab==="inscripciones"?tourOperations():state.tourTab==="fases"?previewTournament("fases"):state.tourTab==="solicitudes"?previewTournament("solicitudes"):state.tourTab==="oficiales"?previewTournament("oficiales"):state.tourTab==="escenarios"?previewTournament("escenarios"):state.tourTab==="disciplina"?previewTournament("disciplina"):state.tourTab==="planillas"?(selected()?.id==="apertura"?arenaMatchSheet():previewTournament("planillas")):state.tourTab==="cierre"?previewTournament("cierre"):state.tourTab==="resumen"?'<div class="arena-info-grid">'+infoTile("◉",tr("Equipos independientes","Independent teams","Unabhängige Teams"),tr("La inscripción y vinculación se realiza por invitación y aceptación.","Entry by invitation and acceptance.","Teilnahme durch Einladung und Annahme."))+infoTile("⚙",tr("Categoría y edades","Category and age limits","Kategorie und Altersgrenzen"),tr("Categoría ilustrativa del catálogo ASLO; edades configuradas por la liga.","Illustrative ASLO category; ages set by the league.","Beispielkategorie von ASLO; Altersgrenzen durch die Liga."))+infoTile("⌖",tr("Diferentes escenarios","Multiple venues","Mehrere Spielorte"),tr("Los partidos pueden disputarse en sedes distintas.","Matches may take place at different venues.","Spiele können an verschiedenen Orten stattfinden."))+infoTile("✦",tr("Trofeos y premios","Trophies and prizes","Pokale und Preise"),tr("La premiación puede actualizarse con motivo y noticia.","Prizes may change with a reason and news post.","Preise können mit Begründung angepasst werden."))+'</div>':state.tourTab==="partidos"?(selected()?.id==="apertura"?matchesTable():previewTournament("partidos")):state.tourTab==="clasificacion"?standings():state.tourTab==="premios"?awards():state.tourTab==="noticias"&&selected()?.id==="apertura"?newsPanel():previewTournament("noticias"))+'</div>'+
'<div class="arena-tour-footer"><a href="organizador.html?vista=torneos">'+tr("← Todos mis torneos","← All my tournaments","← Alle meine Turniere")+'</a></div>';
}
function infoTile(icon,title,detail){return '<article class="arena-info-tile aslo-fx-tilt"><span>'+icon+'</span><h3>'+title+'</h3><p>'+detail+'</p></article>'}
function matchesTable(){
if(!isDefault)return noTournaments();
const matches=[["Halcones FC","Tigres FC","24 OCT · 16:00","Próximo"],["Águilas FC","Leones FC","24 OCT · 18:00","Próximo"],["Halcones FC","Águilas FC","18 OCT · 15:00","2 - 1"]];
return '<section class="arena-block">'+headline("⚽",tr("Encuentros del torneo","Tournament matches","Turnierspiele"),tr("Marcadores y programación ficticios","Fictional scores and schedule","Fiktive Ergebnisse und Spielplan"))+'<div class="arena-table-wrap"><table class="arena-table"><thead><tr><th>'+tr("Local","Home","Heim")+'</th><th>'+tr("Encuentro","Match","Spiel")+'</th><th>'+tr("Visita","Away","Gast")+'</th><th>'+tr("Fecha","Date","Datum")+'</th><th></th></tr></thead><tbody>'+matches.map(x=>'<tr><td>'+x[0]+'</td><td><strong>'+x[3]+'</strong></td><td>'+x[1]+'</td><td>'+x[2]+'</td><td>'+goBtn("planilla",tr("Ver planilla","Match sheet","Spielbericht"),"arena-action-small")+'</td></tr>').join('')+'</tbody></table></div></section>';
}
function standings(){
const ops=tourOps(),teams=ops?.slots||[];
if(!teams.length)return noTournaments();
return '<section class="arena-block">'+headline("◉",tr("Clasificación de ejemplo","Sample standings","Beispieltabelle"),"Apertura 2026")+'<div class="arena-table-wrap"><table class="arena-table"><thead><tr><th>#</th><th>'+tr("Equipo","Team","Team")+'</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>PTS</th></tr></thead><tbody>'+teams.slice().sort((a,b)=>b.points-a.points).slice(0,16).map((x,i)=>{const v=[x.team,x.played,0,0,0,x.points];return v}).map((x,i)=>'<tr><td>'+(i+1)+'</td><td>'+x[0]+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td><td>'+x[3]+'</td><td>'+x[4]+'</td><td><strong>'+x[5]+'</strong></td></tr>').join('')+'</tbody></table></div><p class="arena-fine">'+tr("Esta tabla es ilustrativa y no utiliza cálculos oficiales.","This table is illustrative and not an official calculation.","Diese Tabelle ist nur ein Beispiel.")+'</p></section>';
}
function arenaMatches(){
if(!isDefault)return headline("⚽",tr("Encuentros de esta liga","Matches of this league","Spiele dieser Liga"),safe(league.name))+"<section class=\"arena-block\"><h2>"+tr("No hay encuentros programados","No scheduled matches","Keine Spiele angesetzt")+"</h2><p>"+tr("La liga necesita un torneo, equipos vinculados y programación.","This league needs a tournament, invited teams, and a schedule.","Diese Liga benötigt ein Turnier und einen Spielplan.")+"</p></section>"+ad();
return headline("⚽",tr("Centro de encuentros","Match center","Spielzentrum"),tr("Sigue el desarrollo de la competición.","Follow the competition.","Verfolge den Wettbewerb."))+
'<section class="arena-match-banner aslo-fx-hero" style="--arena-photo:url(\''+photos.match+'\')"><div class="aslo-fx-depth"><span class="arena-overline">NEXT MATCH / APERTURA 2026</span><h2>'+tr("Cada minuto cuenta.","Every minute matters.","Jede Minute zählt.")+'</h2><p>'+tr("Programación, sedes y actividad deportiva.","Schedules, venues and sporting activity.","Spielplan, Spielorte und Sportereignisse.")+'</p></div></section>'+matchesTable()+ad()+
'<section class="arena-block arena-reveal">'+headline("▣",tr("Planillas del encuentro","Match sheets","Spielberichte"),tr("Consulta las actas según los permisos y reglamentos del deporte.","View match sheets subject to roles and sporting regulations.","Spielberichte gemäß Berechtigungen und Sportregeln ansehen."))+goBtn("planilla",tr("Abrir planilla de ejemplo","Open sample match sheet","Beispiel-Spielbericht öffnen"),"arena-action-solid")+'</section>';
}
function arenaMatchSheet(){
if(!isDefault)return headline("▣",tr("Planillas de esta liga","Match sheets for this league","Spielberichte dieser Liga"),safe(league.name))+"<section class=\"arena-block\"><h2>"+tr("Sin actas de encuentros","No match records yet","Noch keine Spielberichte")+"</h2><p>"+tr("Las actas aparecen cuando existen encuentros y los oficiales autorizados las registran.","Records appear when officials register matches.","Spielberichte erscheinen nach den Spielen.")+"</p></section>"+ad();
const tabNames=[["alineaciones",tr("Alineaciones","Lineups","Aufstellungen")],["incidencias",tr("Incidencias","Events","Ereignisse")],["firmas",tr("Firmas y acta","Signatures & record","Unterschriften & Bericht")]];
return headline("▣",tr("Planilla del encuentro","Match sheet","Spielbericht"),tr("Documento deportivo · consulta del organizador (demostración)","Sport record · organizer read-only demo","Sportbericht · Veranstalteransicht"))+
'<section class="arena-match-detail"><div class="arena-match-detail-head"><span class="arena-overline">APERTURA 2026 · JORNADA 3</span><span class="arena-status arena-ended">'+tr("FINALIZADO · DEMO","FINISHED · DEMO","BEENDET · DEMO")+'</span></div><div class="arena-match-detail-score"><span><b class="arena-team-crest">H</b><strong>Halcones FC</strong></span><div><strong>2 <em>:</em> 1</strong><small>18 OCT · 15:00</small></div><span><b class="arena-team-crest alt">T</b><strong>Tigres FC</strong></span></div><p>⌖ Cancha Norte · Bogotá &nbsp; ◉ '+tr("Árbitro asignado: por confirmar","Referee: to be confirmed","Schiedsrichter: wird bestätigt")+'</p></section>'+
'<div class="arena-tabbar" role="tablist" aria-label="Planilla">'+tabNames.map(x=>'<button type="button" role="tab" aria-selected="'+(state.matchTab===x[0])+'" data-match-tab="'+x[0]+'" class="'+(state.matchTab===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div>'+
'<div class="arena-match-sheet-content">'+(state.matchTab==="alineaciones"?'<div class="arena-two-cols">'+teamTable("Halcones FC",["1 · J. Rivera","4 · L. Torres","7 · S. Muñoz","9 · M. López","10 · J. Moreno"])+teamTable("Tigres FC",["1 · D. Castro","3 · A. Pérez","5 · F. Gómez","8 · C. Ruiz","11 · N. Vega"])+'</div>':state.matchTab==="incidencias"?'<section class="arena-block"><h3>'+tr("Cronología del encuentro","Match timeline","Spielverlauf")+'</h3><div class="arena-events"><p><b>23′</b> ⚽ Halcones FC — gol (demo)</p><p><b>56′</b> ⚽ Tigres FC — gol (demo)</p><p><b>82′</b> ⚽ Halcones FC — gol (demo)</p></div></section>':'<section class="arena-block"><h3>'+tr("Estado documental","Document status","Dokumentstatus")+'</h3><p>'+tr("Las firmas, validaciones y momentos del acta dependen del deporte, su reglamento y los oficiales autorizados. Esta pantalla no simula firmas reales ni una homologación.","Signatures, validation and match records depend on the sport and authorized officials. No real signatures or approval are simulated.","Unterschriften und Freigaben richten sich nach Sport und zuständigen Offiziellen. Keine echten Unterschriften.")+'</p><span class="arena-status arena-next">'+tr("Demostración de consulta","Read-only demonstration","Ansichtsdemonstration")+'</span></section>')+'</div>'+
'<div class="arena-sheet-warning">ⓘ '+tr("Como administrador puedes consultar el estado del encuentro; registrar hechos arbitrales y cerrar la planilla corresponde a los oficiales autorizados.","Organizers may consult the match status; recording and closing the official sheet belongs to authorized officials.","Der Organisator sieht den Status. Erfassung und Abschluss sind Sache der zuständigen Offiziellen.")+'</div>'+ad();
}
function teamTable(name,people){return '<section class="arena-block"><h3>'+name+'</h3><ol class="arena-lineup">'+people.map(x=>'<li><span>◉</span>'+x+'</li>').join('')+'</ol><p class="arena-fine">'+tr("Participantes ficticios para ilustrar la interfaz.","Fictional names shown for interface demonstration.","Fiktive Namen als Beispiel.")+'</p></section>'}
function awards(){
const award=activeAward();
return '<div class="arena-award-hero"><div><div class="arena-overline">🏆 TOURNAMENT REWARDS</div><h2>'+tr("La gloria se conquista.","Earn the glory.","Ruhm wird erspielt.")+'</h2><p>'+tr("Reconocimientos de la competición. La definición y modificación de premios puede realizarse durante el torneo con justificación y noticia.","Tournament recognitions. Changes to prizes require a reason and a tournament news post.","Auszeichnungen: Änderungen erfordern Begründung und Turniernachricht.")+'</p></div><span class="arena-award-trophy">🏆</span></div><div class="arena-award-cards">'+[["🥇",tr("Campeón","Champion","Meister"),tr("Trofeo del torneo","Tournament trophy","Turnierpokal")],["🥈",tr("Subcampeón","Runner-up","Vizemeister"),tr("Reconocimiento deportivo","Sports recognition","Sportauszeichnung")],["⭐",tr("Distinción individual","Individual honor","Einzelauszeichnung"),tr("Por definir","To be defined","Noch offen")]].map(a=>'<article class="arena-award-card aslo-fx-tilt"><span>'+a[0]+'</span><h3>'+a[1]+'</h3><p>'+a[2]+'</p></article>').join('')+'</div><section class="arena-block"><h3>'+tr("Premiación complementaria","Additional prizes","Weitere Auszeichnungen")+'</h3><p>'+safe(activeAward().description)+'</p>'+(award.note?'<p class="arena-fine">✦ '+tr("Última actualización justificada:","Last justified update:","Letzte begründete Änderung:")+' '+safe(award.note)+'</p>':'')+'<button class="arena-action arena-action-outline" data-award-modal type="button">'+tr("Proponer ajuste de premiación (demo)","Edit prizes (demo)","Preise bearbeiten (Demo)")+' →</button></section>'+ad();
}
function arenaPrizes(){return headline("✦",tr("Premiación","Prizes & trophies","Preise und Pokale"),tr("Los logros también cuentan historias.","Achievements tell stories.","Erfolge erzählen Geschichten."))+awards()+sponsorRow();}
function arenaSponsors(){
return headline("◇",tr("Patrocinadores y campañas","Sponsors and campaigns","Sponsoren und Kampagnen"),tr("Cada patrocinador ocupa un espacio propio. Estas campañas son ficticias.","Each sponsor has its own space. Campaigns are fictional.","Jeder Sponsor hat seinen eigenen Platz. Kampagnen sind fiktiv."))+
'<div class="arena-sponsor-feature"><span class="arena-overline">BRANDS / ASLO</span><h2>'+tr("La pasión también tiene aliados.","Every game has its partners.","Jedes Spiel hat Partner.")+'</h2><p>'+tr("La publicidad de redes se mantiene separada de las campañas de los patrocinadores.","Network ads are separate from direct sponsorship campaigns.","Netzwerkanzeigen sind getrennt von Sponsor-Kampagnen.")+'</p></div>'+
'<div class="arena-sponsor-grid">'+sponsors.map(s=>sponsCard(s)).join('')+'</div>'+
'<section class="arena-block">'+headline("▧",tr("Publicidad comercial","Advertising","Werbung"),tr("Ubicaciones reservadas sin anuncios activos.","Reserved placements, no active ads.","Reservierte Plätze ohne aktive Anzeigen."))+ad("DISPLAY · 970 × 90 · DEMO")+ad("DISPLAY · MÓVIL · DEMO")+'</section>';
}
function leagueSectionNav(){
 const sections=[
 ["general",tr("Información general","General information","Allgemeine Angaben")],
 ["participacion",tr("Participación","Eligibility","Teilnahme")],
 ["reglas",tr("Reglamentos","Rules","Regeln")],
 ["responsables",tr("Responsables","Administrators","Verantwortliche")],
 ["noticias",tr("Noticias de liga","League news","Liga-Nachrichten")]
 ];
 return '<nav class="arena-league-sections" aria-label="'+tr("Gestión de la liga","League management","Ligaverwaltung")+'">'+sections.map(function(s){
 return '<button type="button" class="'+(state.leagueSection===s[0]?"active":"")+'" aria-current="'+(state.leagueSection===s[0]?"page":"false")+'" data-league-section="'+s[0]+'">'+s[1]+'</button>';
 }).join("")+'</nav>';
}
function leaguePreview(title,intro,bullets){
 return '<section class="arena-block arena-league-preview"><span class="arena-overline">'+tr("COBERTURA FUNCIONAL · SIN IMPLEMENTAR","FUNCTIONAL PREVIEW · NOT IMPLEMENTED","FUNKTIONSVORSCHAU · NICHT IMPLEMENTIERT")+'</span><h2>'+title+'</h2><p>'+intro+'</p><div class="arena-league-preview-points">'+bullets.map(x=>'<div>▸ '+x+'</div>').join("")+'</div><p class="arena-fine">'+tr("Esta sección refleja responsabilidades documentadas, pero todavía no simula operaciones reales ni guarda sus cambios.","This section reflects documented responsibilities but does not yet simulate operations or save changes.","Dieser Bereich zeigt dokumentierte Aufgaben, aber keine implementierten Aktionen.")+'</p></section>';
}
function arenaLeague(){
 const section=state.leagueSection||"general";
 const edit='<a href="'+(lm?.formLink?.(league.id)||"mis-ligas.html")+'" class="arena-action arena-action-solid">'+tr("Editar datos de la liga","Edit league details","Ligadaten bearbeiten")+' ↗</a>';
 const blockGeneral='<section class="arena-block"><div class="arena-league-data-title"><h2>'+tr("Información general","General information","Allgemeine Angaben")+'</h2>'+edit+'</div>'+
 '<div class="arena-league-key-values"><div><span>'+tr("Nombre","Name","Name")+'</span><strong>'+safe(league.name)+'</strong></div>'+
 '<div><span>'+tr("Deporte","Sport","Sport")+'</span><strong>'+safe(sportsName)+'</strong></div>'+
 '<div><span>'+tr("Ubicación de referencia","Reference location","Referenzstandort")+'</span><strong>'+safe(sportWhere)+'</strong></div>'+
 '<div><span>'+tr("Estado de verificación","Verification status","Verifizierungsstatus")+'</span><strong>'+tr("Operación permitida sin verificación ASLO","Operation permitted without ASLO verification","Betrieb ohne ASLO-Verifizierung erlaubt")+'</strong></div></div>'+
 '<p>'+safe(league.description||tr("Sin descripción de demostración","No demo description","Keine Beschreibung"))+'</p></section>';
 const blockParticipation='<section class="arena-block"><div class="arena-league-data-title"><h2>'+tr("Condiciones de participación","Participation conditions","Teilnahmebedingungen")+'</h2>'+edit+'</div>'+
 '<div class="arena-league-key-values"><div><span>'+tr("Cobertura","Territory","Gebiet")+'</span><strong>'+safe(league.scopeDetail||league.scope||"—")+'</strong></div>'+
 '<div><span>'+tr("Condiciones","Conditions","Bedingungen")+'</span><strong>'+safe(league.conditions||"—")+'</strong></div></div>'+
 '<h3>'+tr("Categorías y edades","Categories and ages","Kategorien und Alter")+'</h3><div class="arena-league-category-list">'+(league.categories||[]).map(cat=>'<div><strong>'+safe(lm?.catName?.(league.sport,cat.id)||cat.id)+'</strong><span>'+cat.min+'–'+cat.max+' '+tr("años","years","Jahre")+'</span></div>').join("")+'</div>'+
 '<p class="arena-fine">'+tr("El territorio de participación es independiente de la ubicación de los escenarios de juego.","Participation territory is separate from venue locations.","Teilnahmegebiet und Spielort sind unterschiedlich.")+'</p></section>';
 const rules=leaguePreview(tr("Versiones de reglamento","Rules and versions","Regelversionen"),
 tr("La liga define y versiona sus reglas. Una competición conserva la versión aplicable y no reescribe sus torneos anteriores.","A league versions its rules without rewriting earlier tournaments.","Eine Liga versioniert Regeln, ohne frühere Turniere zu überschreiben."),
 [tr("Consultar las versiones publicadas y su vigencia.","Review published versions and their validity.","Versionen und Gültigkeit ansehen."),
  tr("Preparar un cambio para nuevas competiciones.","Prepare a change for future competitions.","Neue Regeln für zukünftige Wettbewerbe vorbereiten."),
  tr("Identificar qué versión utiliza cada torneo.","Identify each tournament's rules version.","Regelversion pro Turnier ansehen.")]);
 const people=leaguePreview(tr("Administradores y asistentes","Administrators and assistants","Administratoren und Assistenten"),
 tr("Los permisos se vinculan a personas, no a cuentas de ligas. Cada persona actúa dentro del ámbito autorizado.","Permissions belong to people, not league logins.","Berechtigungen gehören Personen, nicht Liga-Logins."),
 [tr("Consultar quién administra y quién asiste a esta liga.","List permitted administrators and assistants.","Administratoren und Assistenten einsehen."),
  tr("Invitar y resolver relaciones según sus competencias.","Manage invitations with valid authority.","Einladungen mit Berechtigung verwalten."),
  tr("Modificar o retirar facultades conservando la trazabilidad.","Change or revoke access with history.","Berechtigungen mit Verlauf ändern.")]);
 const news='<section class="arena-league-news">'+newsPanel()+'<p class="arena-fine">'+tr("Las publicaciones de terceros no requieren aprobación previa del organizador; ASLO mantiene los mecanismos de reporte y moderación.","Third-party posts do not require league pre-approval.","Beiträge anderer benötigen keine Vorabgenehmigung durch den Organisator.")+'</p></section>';
 return headline("⚙",tr("Gestión de liga","League management","Ligaverwaltung"),safe(league.name),
 '<a class="arena-action arena-action-outline" href="organizador.html?vista=ligas">← '+tr("Mis ligas","My leagues","Meine Ligen")+'</a>')+
 '<div class="arena-league-crumb"><a href="organizador.html?vista=ligas">'+tr("Mis ligas","My leagues","Meine Ligen")+'</a><span aria-hidden="true">/</span><strong>'+safe(league.name)+'</strong></div>'+
 leagueSectionNav()+
 '<div class="arena-league-section-body">'+(section==="participacion"?blockParticipation:section==="reglas"?rules:section==="responsables"?people:section==="noticias"?news:blockGeneral)+'</div>';
}

function render(){
document.title="ASLO · "+(nav.find(n=>n[0]===state.view)||nav[0])[2];
root.innerHTML=top()+(state.view==="inicio"?arenaHome():state.view==="torneos"?arenaTournaments():state.view==="partidos"?arenaMatches():state.view==="planilla"?arenaMatchSheet():state.view==="premios"?arenaPrizes():state.view==="patrocinadores"?arenaSponsors():arenaLeague())+end();
if(state.modal)root.insertAdjacentHTML("beforeend",modalHtml());

}
function show(view){state.view=view;state.more=false;state.modal=false;history.pushState({vista:view},"",lm?.leagueLink?.(league.id,view)||("liga-admin.html?vista="+view));render();window.scrollTo(0,0)}
function modalHtml(){
const modal=state.modal;
return '<div class="arena-modal-shade" role="presentation"><div class="arena-modal" role="dialog" aria-modal="true" aria-labelledby="arena-modal-title"><button class="arena-modal-close" type="button" data-close-modal aria-label="'+tr("Cerrar","Close","Schließen")+'">×</button>'+(modal==="capacity"||modal==="replacement"?opsModal():modal==="tour"?'<span class="arena-overline">COMPETITION LAB · DEMO</span><h2 id="arena-modal-title">'+tr("Preparar torneo","Prepare tournament","Turnier vorbereiten")+'</h2><p>'+tr("Solo datos de muestra. La categoría procede del catálogo ASLO; los rangos de edad corresponden a la liga.","Sample data only. The category comes from ASLO; age ranges belong to the league.","Nur Beispieldaten. Kategorie von ASLO, Altersgrenzen der Liga.")+'</p><form id="arena-new-tour-form"><label>'+tr("Nombre del torneo","Tournament name","Turniername")+'<input required maxlength="46" name="name" placeholder="Copa Ciudad 2026"></label><label>'+tr("Categoría ilustrativa ASLO","Illustrative ASLO category","ASLO-Beispielkategorie")+'<select name="category" required>'+((league.categories||[]).map(c=>'<option value="'+safe(c.id)+'">'+safe(lm?.catName?.(league.sport,c.id)||c.id)+' ('+c.min+'–'+c.max+' '+tr("años","years","Jahre")+')</option>').join(''))+'</select></label><label>'+tr("Número máximo de equipos","Maximum teams","Maximale Teams")+'<input type="number" name="capacity" min="2" max="512" value="16" required></label><p>'+tr("Las edades se heredan de la categoría seleccionada para esta liga. Si necesitas ajustarlas, configura primero la liga.","Age limits are configured per league category.","Altersgrenzen stehen in der Ligakategorie.")+'</p><button class="arena-action arena-action-solid" type="submit">'+tr("Crear torneo de prueba","Create demo tournament","Demo-Turnier erstellen")+' →</button></form>':'<span class="arena-overline">PRIZE LAB · DEMO</span><h2 id="arena-modal-title">'+tr("Ajustar premiación","Edit prizes","Preise ändern")+'</h2><p>'+tr("La modificación requiere un motivo y generará una noticia del torneo, solo dentro de esta demostración.","Every change requires a reason and generates a demo tournament news item.","Jede Änderung benötigt einen Grund und erzeugt eine Demo-Nachricht.")+'</p><form id="arena-award-form"><label>'+tr("Descripción de la premiación","Prize description","Preisbeschreibung")+'<input required maxlength="100" name="description" value="'+safe(activeAward().description)+'"></label><label>'+tr("Motivo del cambio","Reason for change","Änderungsgrund")+'<textarea required minlength="8" maxlength="200" name="note" rows="3" placeholder="'+tr("Explica el ajuste","Explain the update","Änderung erklären")+'"></textarea></label><button type="submit" class="arena-action arena-action-solid">'+tr("Guardar y publicar noticia demo","Save & post demo news","Speichern und Demo-Nachricht veröffentlichen")+' →</button></form>')+'</div></div>';
}
root.addEventListener("click",function(e){
const leagueSection=e.target.closest("[data-league-section]");
if(leagueSection){state.leagueSection=leagueSection.dataset.leagueSection;var url=new URL(location.href);url.searchParams.set("seccion",state.leagueSection);history.replaceState({vista:state.view},"",url.pathname+url.search);render();root.querySelector('[data-league-section="'+state.leagueSection+'"]')?.focus();return}
const go=e.target.closest("[data-go]");if(go){show(go.dataset.go);return}
const pick=e.target.closest("[data-pick]");if(pick){state.tournament=+pick.dataset.pick;var selectedTournament=selected();if(selectedTournament){var u=new URL(location.href);u.searchParams.set("torneo",selectedTournament.id);history.replaceState({vista:state.view},"",u.pathname+u.search)}render();return}
const slide=e.target.closest("[data-slide]");if(slide){state.tournament=(state.tournament+allTournaments().length+(+slide.dataset.slide))%allTournaments().length;render();return}
const mt=e.target.closest("[data-match-tab]");if(mt){state.matchTab=mt.dataset.matchTab;render();return}
const tt=e.target.closest("[data-tour-tab]");if(tt){state.tourTab=tt.dataset.tourTab;var u=new URL(location.href);u.searchParams.set("tab",state.tourTab);history.replaceState({vista:state.view},"",u.pathname+u.search);render();root.querySelector('[data-tour-tab="'+state.tourTab+'"]')?.focus();return}
const sponsor=e.target.closest("[data-sponsor]");if(sponsor){e.preventDefault();const s=sponsors.find(x=>x.id===sponsor.dataset.sponsor);if(s){state.view="patrocinadores";history.pushState({vista:"patrocinadores"},"",lm?.leagueLink?.(league.id,"patrocinadores")||"liga-admin.html?vista=patrocinadores");render();const cards=root.querySelectorAll(".arena-sponsor-grid .arena-sponsor");const c=[...cards].find(x=>x.dataset.sponsor===s.id);if(c){c.classList.add("arena-highlight");c.scrollIntoView({block:"center",behavior:"smooth"})}}return}
if(e.target.closest("[data-new-tournament]")){state.modal="tour";render();setTimeout(()=>root.querySelector(".arena-modal input")?.focus(),0);return}
if(e.target.closest("[data-capacity-modal]")){state.modal="capacity";render();return}
if(e.target.closest("[data-replace-modal]")){if(selected()?.state==="Finalizado")return;state.modal="replacement";render();return}
if(e.target.closest("[data-cancel-replacement]")){const t=selected(),o=tourOps(t);if(o){o.pending=null;persistOps(t,o)}render();return}
if(e.target.closest("[data-simulate-accept]")){
 const t=selected(),o=tourOps(t),p=o?.pending;
 if(!p)return;
 const slot=o.slots.find(x=>x.id===p.slot);
 if(!slot||slot.team!==p.from){o.pending=null;persistOps(t,o);render();return}
 const previous={team:slot.team,points:slot.points,played:slot.played};
 slot.team=p.to;slot.points=p.mode==="inherit"?previous.points:0;slot.played=p.mode==="inherit"?previous.played:0;
 o.replacements.unshift({from:p.from,to:p.to,mode:p.mode,reason:p.reason,prior:previous,recorded:new Date().toISOString()});
 o.pending=null;persistOps(t,o);render();return;
}
if(e.target.closest("[data-award-modal]")){state.modal="award";render();setTimeout(()=>root.querySelector(".arena-modal input")?.focus(),0);return}
if(e.target.closest("[data-close-modal]")||e.target.classList.contains("arena-modal-shade")){state.modal=false;render();return}
if(e.target.closest("#arena-toggle-menu,#arena-bottom-more")){state.more=!state.more;render();return}
});
root.addEventListener("submit",function(e){
if(e.target.id==="arena-capacity-form"){
 e.preventDefault();const f=new FormData(e.target),t=selected(),o=tourOps(t),capacity=+f.get("capacity");
 if(!Number.isInteger(capacity)||capacity<o.slots.length||capacity>512){alert(tr("El límite no puede ser inferior a los equipos presentes.","Capacity cannot be lower than occupied slots.","Die Kapazität darf nicht kleiner als die Belegung sein."));return}
 o.capacity=capacity;o.open=t.state==="Finalizado"?false:f.get("open")==="true";
 persistOps(t,o);state.modal=false;render();return;
}else if(e.target.id==="arena-replacement-form"){
 e.preventDefault();const f=new FormData(e.target),t=selected(),o=tourOps(t),i=+f.get("from"),slot=o.slots[i];
 const to=String(f.get("to")||""),mode=String(f.get("mode")||""),reason=String(f.get("reason")||"").trim();
 if(t.state==="Finalizado"||o.pending){alert(tr("Torneo finalizado o invitación pendiente.","Tournament finished or invitation pending.","Turnier beendet oder Einladung offen."));return}
 if(!slot||!DEMO_TEAMS.includes(to)||o.slots.some(x=>x.team===to)||!["inherit","zero"].includes(mode)||reason.length<8)return;
 o.pending={slot:slot.id,from:slot.team,to,mode,reason};persistOps(t,o);state.modal=false;render();return;
}else if(e.target.id==="arena-new-tour-form"){
 e.preventDefault();const f=new FormData(e.target);
 const category=String(f.get("category")||""),leagueCategory=(league.categories||[]).find(x=>x.id===category),capacity=+f.get("capacity");
 if(!leagueCategory||!Number.isInteger(capacity)||capacity<2||capacity>512){alert(tr("Configura una categoría de la liga y un cupo válido.","Choose a configured category and valid capacity.","Wähle eine gültige Kategorie und Kapazität."));return}
 const name=String(f.get("name")||"").trim();if(!name)return;
 const id="local-"+Date.now();state.added.push({id,name,category, maxTeams:capacity,sub:sportsName+" · "+(lm?.catName?.(league.sport,category)||category),teams:0,matches:0,state:"Borrador",photo:leaguePhoto,description:tr("Torneo de demostración · sin publicación real.","Demo tournament · not actually published.","Demo-Turnier · nicht veröffentlicht.")});save("aslo-arena-tournaments:"+league.id,state.added);
 state.tournament=allTournaments().length-1;persistOps(selected(),{capacity,open:true,slots:[],pending:null,replacements:[]});state.modal=false;show("torneos");
}else if(e.target.id==="arena-award-form"){
 e.preventDefault();const f=new FormData(e.target);const description=String(f.get("description")||"").trim(),note=String(f.get("note")||"").trim();
 if(!description||note.length<8)return;
 state.award={description,note};save(activeAwardKey(),state.award);
 state.notifications.push(["✦",tr("Cambio de premiación (demo)","Prize change (demo)","Preisänderung (Demo)"),note]);save("aslo-arena-news:"+league.id,state.notifications);
 state.modal=false;render();
}
});
let lastWheel=0;
root.addEventListener("wheel",function(e){
if(!e.target.closest(".arena-tournament-list"))return;
if(window.innerWidth<1000||Math.abs(e.deltaY)<15||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
const now=performance.now();if(now-lastWheel<700)return;
const next=state.tournament+(e.deltaY>0?1:-1);
if(next<0||next>=allTournaments().length)return;
e.preventDefault();lastWheel=now;state.tournament=next;render();
},{passive:false});
root.addEventListener("keydown",function(e){
if(e.key==="Escape"&&state.modal){state.modal=false;render();return}
if(e.target.closest(".arena-tournament-list")&&(e.key==="ArrowDown"||e.key==="ArrowUp")){e.preventDefault();state.tournament=(state.tournament+allTournaments().length+(e.key==="ArrowDown"?1:-1))%allTournaments().length;render()}
});
window.addEventListener("popstate",function(){var ps=new URLSearchParams(location.search);state.view=ps.get("vista")||"inicio";state.leagueSection=ps.get("seccion")||"general";if(!nav.some(([id])=>id===state.view))state.view="inicio";var requested=ps.get("torneo");if(requested){var j=allTournaments().findIndex(function(t){return t.id===requested});if(j>=0){state.tournament=j;state.view="torneos"}}state.modal=false;render()});
render();
})();