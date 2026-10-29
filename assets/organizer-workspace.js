/* ASLO organizer workspace — task-first navigation.
   Uses the already-existing mock league store and tournament session fixtures.
   No server, no new privileges, no ranking algorithms or invented sporting rules. */
(function(){
"use strict";
var root=document.getElementById("ow-content");
if(!root)return;
var manager=window.asloLeagues;
var demoTournaments=[
 {id:"apertura",name:"Apertura 2026",category:"Adultos",sub:"Fútbol · Adultos",teams:12,matches:24,state:"En disputa"},
 {id:"femenina",name:"Copa Femenina",category:"Adultas",sub:"Fútbol · Femenino",teams:10,matches:12,state:"Próximo"},
 {id:"juvenil",name:"Copa Juvenil",category:"Juvenil",sub:"Fútbol · Juvenil",teams:16,matches:8,state:"En disputa"}
];
var words={
 es:{organizer:"Organizador",home:"Inicio",leagues:"Mis ligas",tournaments:"Torneos",switch:"Cambiar modo",account:"Mi cuenta",demo:"PROTOTIPO · DATOS DE MUESTRA",
  intro:"Todo en su lugar.",help:"Encuentra primero tu liga o torneo. Las herramientas aparecen en su contexto.",
  createLeague:"Crear liga",eyebrow:"TU ESPACIO / ORGANIZACIÓN",overview:"Organiza sin perderte.",overviewDesc:"Accede a tus ligas y torneos desde un solo lugar. Busca, filtra y entra directamente a lo que necesitas.",
  goTournaments:"Encontrar un torneo",goLeagues:"Ver mis ligas",heroAside:"Primero encuentra. Luego gestiona.",heroHelp:"La navegación conserva siempre los mismos lugares: Inicio, Ligas y Torneos. Cada competencia reúne sus propias operaciones.",
  countLeagues:"Ligas",countTournaments:"Torneos",countActive:"Torneos en disputa",quick:"¿Qué quieres hacer?",leagueShortcut:"Gestionar una liga",leagueShortcutDesc:"Ubica tu liga y abre sus herramientas.",tourShortcut:"Abrir un torneo",tourShortcutDesc:"Ve directo a una competición sin recorrer menús.",
  leagueTitle:"Tus ligas",leagueDesc:"Consulta tus ligas independientes. Cada una conserva su propia configuración.",
  tourTitle:"Todos tus torneos",tourDesc:"Consulta torneos de todas tus ligas desde este mismo espacio.",
  searchLeagues:"Buscar liga",searchTournaments:"Buscar torneo",searchPlaceholderLeagues:"Nombre, deporte, ciudad o país",searchPlaceholderTournaments:"Nombre, liga, categoría o deporte",
  sport:"Deporte",league:"Liga",status:"Estado",allSports:"Todos los deportes",allLeagues:"Todas las ligas",allStatuses:"Todos los estados",
  reset:"Limpiar filtros",name:"Nombre",location:"Ubicación",category:"Categoría",teams:"Equipos",actions:"Acciones",
  openLeague:"Abrir liga",openTournament:"Abrir torneo",configure:"Configurar",showing:"Mostrando",of:"de",entries:"resultados",perPage:"Por página",previous:"Anterior",next:"Siguiente",page:"Página",
  noLeagues:"No hay ligas con estos filtros.",noTournaments:"No hay torneos con estos filtros.",
  noLeaguesTip:"Prueba otra búsqueda o crea una liga de demostración.",noTournamentsTip:"Modifica los filtros o entra a una liga para preparar un torneo.",
  onlyDemo:"Datos ficticios almacenados en esta pestaña. Sin servicios reales ni modificaciones a competiciones auténticas.",
  breadcrumb:"Espacio del organizador",sample:"Ejemplos actuales",viewAll:"Ver todos", createFirst:"Crear primera liga",
  leagueAction:"Abrir esta liga",relatedTo:"De",noActive:"Todavía no hay torneos en disputa",direct:"Acceso directo",typeToSearch:"Buscar en esta sección",emptyAll:"Aún no hay datos en esta vista."},
 en:{organizer:"Organizer",home:"Home",leagues:"My leagues",tournaments:"Tournaments",switch:"Switch mode",account:"My account",demo:"PROTOTYPE · SAMPLE DATA",
  intro:"Everything in its place.",help:"Find the league or tournament first; the relevant tools appear in context.",
  createLeague:"Create league",eyebrow:"YOUR SPACE / ORGANIZATION",overview:"Organize without getting lost.",overviewDesc:"Your leagues and tournaments, all in one place. Search, filter and open exactly what you need.",
  goTournaments:"Find a tournament",goLeagues:"View my leagues",heroAside:"Find first. Manage next.",heroHelp:"Navigation keeps the same locations: Home, Leagues and Tournaments. Each competition holds its own operations.",
  countLeagues:"Leagues",countTournaments:"Tournaments",countActive:"Tournaments in progress",quick:"What would you like to do?",leagueShortcut:"Manage a league",leagueShortcutDesc:"Find your league and open its tools.",tourShortcut:"Open a tournament",tourShortcutDesc:"Go straight to a competition with no detours.",
  leagueTitle:"Your leagues",leagueDesc:"Explore your independently configured leagues.",tourTitle:"All your tournaments",tourDesc:"Find tournaments from all your leagues in one place.",
  searchLeagues:"Search leagues",searchTournaments:"Search tournaments",searchPlaceholderLeagues:"Name, sport, city or country",searchPlaceholderTournaments:"Name, league, category or sport",
  sport:"Sport",league:"League",status:"Status",allSports:"All sports",allLeagues:"All leagues",allStatuses:"All statuses",reset:"Clear filters",
  name:"Name",location:"Location",category:"Category",teams:"Teams",actions:"Actions",openLeague:"Open league",openTournament:"Open tournament",configure:"Configure",
  showing:"Showing",of:"of",entries:"results",perPage:"Per page",previous:"Previous",next:"Next",page:"Page",noLeagues:"No matching leagues.",noTournaments:"No matching tournaments.",
  noLeaguesTip:"Try other filters or create a sample league.",noTournamentsTip:"Change the filters or open a league to prepare a tournament.",
  onlyDemo:"Fictional session data. No real services or competition updates.",breadcrumb:"Organizer workspace",sample:"Current samples",viewAll:"View all",createFirst:"Create first league",leagueAction:"Open this league",relatedTo:"From",noActive:"No tournaments in progress yet",direct:"Direct access",typeToSearch:"Search in this section",emptyAll:"There is no data for this view yet."},
 de:{organizer:"Organisator",home:"Start",leagues:"Meine Ligen",tournaments:"Turniere",switch:"Modus wechseln",account:"Mein Konto",demo:"PROTOTYP · BEISPIELDATEN",
  intro:"Alles an seinem Platz.",help:"Finde zuerst die Liga oder das Turnier. Die Werkzeuge erscheinen im jeweiligen Kontext.",
  createLeague:"Liga erstellen",eyebrow:"DEIN BEREICH / ORGANISATION",overview:"Alles im Blick.",overviewDesc:"Alle Ligen und Turniere an einem Ort. Suche, filtere und öffne direkt, was du brauchst.",
  goTournaments:"Turnier finden",goLeagues:"Meine Ligen",heroAside:"Erst finden. Dann verwalten.",heroHelp:"Die Navigation bleibt immer gleich: Start, Ligen und Turniere. Jede Competition hat eigene Werkzeuge.",
  countLeagues:"Ligen",countTournaments:"Turniere",countActive:"Laufende Turniere",quick:"Was möchtest du tun?",leagueShortcut:"Liga verwalten",leagueShortcutDesc:"Finde deine Liga und öffne die Werkzeuge.",tourShortcut:"Turnier öffnen",tourShortcutDesc:"Ohne Umwege direkt zum Turnier.",
  leagueTitle:"Deine Ligen",leagueDesc:"Unabhängig konfigurierte Ligen.",tourTitle:"Alle deine Turniere",tourDesc:"Turniere aller Ligen an einem Ort.",
  searchLeagues:"Ligen durchsuchen",searchTournaments:"Turniere durchsuchen",searchPlaceholderLeagues:"Name, Sport, Ort oder Land",searchPlaceholderTournaments:"Name, Liga, Kategorie oder Sport",
  sport:"Sport",league:"Liga",status:"Status",allSports:"Alle Sportarten",allLeagues:"Alle Ligen",allStatuses:"Alle Status",reset:"Filter löschen",
  name:"Name",location:"Ort",category:"Kategorie",teams:"Teams",actions:"Aktionen",openLeague:"Liga öffnen",openTournament:"Turnier öffnen",configure:"Bearbeiten",showing:"Anzeige",
  of:"von",entries:"Ergebnissen",perPage:"Pro Seite",previous:"Zurück",next:"Weiter",page:"Seite",noLeagues:"Keine passenden Ligen.",noTournaments:"Keine passenden Turniere.",
  noLeaguesTip:"Andere Filter versuchen oder Beispiel-Liga erstellen.",noTournamentsTip:"Filter ändern oder eine Liga öffnen, um ein Turnier anzulegen.",
  onlyDemo:"Fiktive Sitzungsdaten. Keine echten Dienste oder Wettkampfänderungen.",breadcrumb:"Organisatorbereich",sample:"Beispieldaten",viewAll:"Alle ansehen",createFirst:"Erste Liga erstellen",leagueAction:"Diese Liga öffnen",relatedTo:"Von",noActive:"Noch keine laufenden Turniere",direct:"Direkter Zugang",typeToSearch:"In diesem Bereich suchen",emptyAll:"Noch keine Daten vorhanden."}
};
var language=(()=>{try{return window.asloAuth?.lang?.()||"es"}catch(e){return"es"}})();
var extension={
 es:{agenda:"Agenda y jornadas",solicitudes:"Solicitudes y avisos",recursos:"Jueces y escenarios",resultados:"Resultados",comunicaciones:"Comunicaciones",operations:"OPERACIÓN",tracking:"SEGUIMIENTO",globalSearch:"Buscar función o tarea",context:"Alcance",allItems:"Todos los torneos",demoView:"Vista conceptual · las operaciones que aún no tienen datos o simulación se indican expresamente.",explore:"Abrir funciones del torneo",lookup:"Buscar actividades",back:"Volver al organizador",openContext:"Abrir su contexto",tasks:"Tareas y accesos",leagueSettings:"Administración de liga",dataEmpty:"No existen registros de demostración de estas gestiones en esta sesión.",seeDemo:"Ver torneo",selectLeague:"Seleccionar liga",limited:"Pendiente de prototipo funcional",available:"Disponible en la demostración"},
 en:{agenda:"Schedule & rounds",solicitudes:"Requests & notices",recursos:"Officials & venues",resultados:"Results",comunicaciones:"Communications",operations:"OPERATIONS",tracking:"FOLLOW-UP",globalSearch:"Find a function or task",context:"Scope",allItems:"All tournaments",demoView:"Conceptual view · unavailable actions and data are labeled.",explore:"Open tournament tools",lookup:"Find tasks",back:"Back to organizer",openContext:"Open context",tasks:"Tasks and shortcuts",leagueSettings:"League administration",dataEmpty:"No demonstration records exist for these processes in this session.",seeDemo:"View tournament",selectLeague:"Select a league",limited:"Functional prototype pending",available:"Demo available"},
 de:{agenda:"Kalender und Spieltage",solicitudes:"Anfragen und Hinweise",recursos:"Offizielle und Spielstätten",resultados:"Ergebnisse",comunicaciones:"Mitteilungen",operations:"BETRIEB",tracking:"ÜBERSICHT",globalSearch:"Funktion oder Aufgabe suchen",context:"Bereich",allItems:"Alle Turniere",demoView:"Konzeptansicht · nicht implementierte Aktionen sind gekennzeichnet.",explore:"Turnierwerkzeuge öffnen",lookup:"Aufgaben finden",back:"Zum Organisator",openContext:"Kontext öffnen",tasks:"Aufgaben und Zugänge",leagueSettings:"Ligaverwaltung",dataEmpty:"Keine Demodaten für diese Vorgänge vorhanden.",seeDemo:"Turnier ansehen",selectLeague:"Liga wählen",limited:"Funktionsprototyp ausstehend",available:"Demo verfügbar"}
};
var t=key=>(extension[language]||extension.es)[key]||extension.es[key]||(words[language]||words.es)[key]||words.es[key]||key;
var VIEWS=["inicio","ligas","torneos","agenda","solicitudes","recursos","resultados","comunicaciones"];
var isView=v=>VIEWS.includes(v);
var escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
var params=new URLSearchParams(location.search);
var state={view:isView(params.get("vista"))?params.get("vista"):"inicio",search:params.get("buscar")||"",sport:params.get("deporte")||"all",league:params.get("liga")||"all",status:params.get("estado")||"all",size:[2,5,10].includes(Number(params.get("limite")))?Number(params.get("limite")):2,page:Math.max(1,Math.min(999,Number(params.get("pagina"))||1))};
function allLeagues(){try{return manager?.all?.()||[]}catch(e){return []}}
function savedTournaments(id){
 try{var data=JSON.parse(sessionStorage.getItem("aslo-arena-tournaments:"+id));return Array.isArray(data)?data:[]}catch(e){return []}
}
function allTournaments(){
 return allLeagues().flatMap(function(l){
  var list=(l.id==="metropolitana"?demoTournaments:[]).concat(savedTournaments(l.id));
  return list.map(function(x){return {id:x.id,name:x.name||"—",category:x.category||x.sub||"—",sub:x.sub||"",state:x.state||"Borrador",teams:x.teams||0,leagueId:l.id,leagueName:l.name,sport:l.sport||"",location:l.city||l.region||l.country||""}});
 });
}
function leagueLink(l){return manager?.leagueLink?.(l.id,"inicio")||("liga-admin.html?liga="+encodeURIComponent(l.id)+"&vista=inicio")}
function tournamentLink(x){
 var base=manager?.leagueLink?.(x.leagueId,"torneos")||("liga-admin.html?liga="+encodeURIComponent(x.leagueId)+"&vista=torneos");
 return base+"&torneo="+encodeURIComponent(x.id);
}
function locationText(l){return [l.city,l.region,l.country].filter(Boolean).join(", ")||"—"}
function sportName(s){
 var names={futbol:{es:"Fútbol",en:"Football",de:"Fußball"},baloncesto:{es:"Baloncesto",en:"Basketball",de:"Basketball"},voleibol:{es:"Voleibol",en:"Volleyball",de:"Volleyball"},tenis:{es:"Tenis",en:"Tennis",de:"Tennis"}};
 return names[s]?.[language]||s||"—";
}
function updateStatic(){
 document.documentElement.lang=language;
 document.querySelector(".ow-workspace-title").textContent=t("breadcrumb");
 document.querySelector(".ow-demo").textContent=t("demo");
 document.querySelector(".ow-mode-switch").textContent=t("switch")+" ↗";
 document.querySelector(".ow-avatar").setAttribute("aria-label",t("account"));
 document.querySelectorAll(".ow-sidelabel").forEach(function(x,i){x.textContent=i===0?t("organizer").toUpperCase():i===1?t("operations"):t("tracking")});
 document.querySelectorAll(".ow-nav a[data-view]").forEach(function(a){var last=a.lastElementChild;if(last)last.textContent=t(a.dataset.view==="inicio"?"home":a.dataset.view==="ligas"?"leagues":a.dataset.view==="torneos"?"tournaments":a.dataset.view)});
 document.querySelectorAll(".ow-drawer-links a[data-view]").forEach(function(a){var key=a.dataset.view;var icon=a.textContent.trim().slice(0,1);a.textContent=icon+" "+t(key==="inicio"?"home":key==="ligas"?"leagues":key==="torneos"?"tournaments":key)});
 var drawerTitle=document.querySelector(".ow-drawer-heading strong");if(drawerTitle)drawerTitle.textContent=t("breadcrumb");
 document.querySelector(".ow-sidehelp strong").textContent=t("intro");
 document.querySelector(".ow-sidehelp p").textContent=t("help");
 ["inicio","ligas","torneos","agenda"].forEach(function(view){
  var label=t(view==="inicio"?"home":view==="ligas"?"leagues":view==="torneos"?"tournaments":"agenda");
  document.querySelectorAll('.ow-nav [data-view="'+view+'"] span:last-child').forEach(function(node){node.textContent=label;});
  document.querySelectorAll('.ow-mobile-nav [data-view="'+view+'"]').forEach(function(node){
    var icon=node.querySelector("span");var symbol=icon?icon.textContent:"";
    node.textContent=label;
    if(icon){var retained=document.createElement("span");retained.textContent=symbol;node.prepend(retained);}
  });
 });
 var side=document.querySelectorAll(".ow-sidebottom a");if(side[0])side[0].textContent="＋ "+t("createLeague");if(side[1])side[1].textContent="↩ "+t("switch");
}
function resetFilters(){state.search="";state.sport="all";state.league="all";state.status="all";state.page=1}
function writeUrl(replace){
 var url=new URL(location.href);url.searchParams.set("vista",state.view);
 [["buscar",state.search],["deporte",state.sport==="all"?"":state.sport],["liga",state.league==="all"?"":state.league],["estado",state.status==="all"?"":state.status],["pagina",state.page===1?"":state.page],["limite",state.size===2?"":state.size]].forEach(function(pair){if(pair[1])url.searchParams.set(pair[0],pair[1]);else url.searchParams.delete(pair[0])});
 history[replace?"replaceState":"pushState"]({}, "", url.pathname+url.search+url.hash);
}
function navigate(view){
 if(!isView(view))return;
 state.view=view;resetFilters();writeUrl(false);render();
 window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 root.querySelector("h1")?.focus({preventScroll:true});
}
function activateNav(){
 document.querySelectorAll("[data-view]").forEach(function(a){
  var active=a.getAttribute("data-view")===state.view;
  a.classList.toggle("is-active",active);
  if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
 });
}
function badge(s){return '<span class="ow-badge" data-status="'+escape(s)+'">'+escape(s)+'</span>'}
function heading(title,description,button){
 return '<div class="ow-heading"><div><div class="ow-eyebrow">'+escape(t("eyebrow"))+'</div><h1 tabindex="-1">'+escape(title)+'</h1><p>'+escape(description)+'</p></div>'+(button||"")+'</div>';
}

function organizerShortcuts(){
 var items=[
 {key:"agenda",icon:"▤",es:"Agenda y jornadas",en:"Schedule & rounds",de:"Kalender und Spieltage",s:"Programar y revisar jornadas y encuentros."},
 {key:"solicitudes",icon:"✉",es:"Solicitudes y avisos",en:"Requests & notices",de:"Anfragen und Hinweise",s:"Reprogramaciones, avisos e incidencias."},
 {key:"recursos",icon:"♧",es:"Jueces y escenarios",en:"Officials & venues",de:"Offizielle & Spielstätten",s:"Arbitraje, escuelas, sustituciones y sedes."},
 {key:"resultados",icon:"◉",es:"Resultados",en:"Results",de:"Ergebnisse",s:"Planillas, tablas y decisiones deportivas."},
 {key:"comunicaciones",icon:"◈",es:"Comunicaciones",en:"Communications",de:"Mitteilungen",s:"Noticias, premios y patrocinadores."}
 ];
 return '<div class="ow-section-heading"><h2>'+escape(t("tasks"))+'</h2></div>'+
 '<div class="ow-operations-shortcuts">'+items.map(function(it){
 return '<a class="ow-operation-shortcut" data-nav="'+it.key+'" href="organizador.html?vista='+it.key+'"><span class="ow-operation-symbol">'+it.icon+'</span><div><b>'+escape(it[language]||it.es)+'</b><small>'+escape(it.s)+'</small></div><span class="ow-operation-arrow" aria-hidden="true">↗</span></a>';
 }).join("")+'</div>';
}
function renderHome(){
 var leagues=allLeagues(),tours=allTournaments(),live=tours.filter(x=>x.state==="En disputa");
 return '<div class="ow-appear"><section class="ow-hero" aria-label="'+escape(t("breadcrumb"))+'"><div><div class="ow-eyebrow">'+escape(t("eyebrow"))+'</div><h1>'+escape(t("overview"))+'</h1><p>'+escape(t("overviewDesc"))+'</p><div class="ow-actions"><a class="ow-btn ow-btn-primary" href="organizador.html?vista=torneos" data-nav="torneos">'+escape(t("goTournaments"))+' →</a><a class="ow-btn" href="organizador.html?vista=ligas" data-nav="ligas">'+escape(t("goLeagues"))+'</a></div></div><aside class="ow-hero-aside"><strong>'+escape(t("heroAside"))+'</strong><p>'+escape(t("heroHelp"))+'</p></aside></section>'+
 '<section class="ow-overview-metrics" aria-label="'+escape(t("sample"))+'"><div class="ow-metric"><span>'+escape(t("countLeagues"))+'</span><strong>'+leagues.length+'</strong></div><div class="ow-metric"><span>'+escape(t("countTournaments"))+'</span><strong>'+tours.length+'</strong></div><div class="ow-metric"><span>'+escape(t("countActive"))+'</span><strong>'+live.length+'</strong></div></section>'+
 '<div class="ow-section-heading"><h2>'+escape(t("quick"))+'</h2></div><div class="ow-shortcuts"><a class="ow-shortcut" href="organizador.html?vista=ligas" data-nav="ligas"><div><b>'+escape(t("leagueShortcut"))+'</b><p>'+escape(t("leagueShortcutDesc"))+'</p></div><span aria-hidden="true">↗</span></a><a class="ow-shortcut" href="organizador.html?vista=torneos" data-nav="torneos"><div><b>'+escape(t("tourShortcut"))+'</b><p>'+escape(t("tourShortcutDesc"))+'</p></div><span aria-hidden="true">↗</span></a></div>'+
 organizerShortcuts()+
 '<div class="ow-section-heading"><h2>'+escape(t("countTournaments"))+'</h2><a href="organizador.html?vista=torneos" data-nav="torneos">'+escape(t("viewAll"))+' →</a></div>'+
 (tours.length?'<div class="ow-table-wrap ow-home-table"><table class="ow-table"><thead><tr><th scope="col">'+escape(t("name"))+'</th><th scope="col">'+escape(t("league"))+'</th><th scope="col">'+escape(t("status"))+'</th><th scope="col">'+escape(t("actions"))+'</th></tr></thead><tbody>'+tours.slice(0,3).map(function(x,i){return '<tr class="ow-row-appear" style="--ow-delay:'+(i*55)+'ms"><td><span class="ow-item-name">'+escape(x.name)+'</span></td><td>'+escape(x.leagueName)+'</td><td>'+badge(x.state)+'</td><td><a class="ow-table-action" href="'+tournamentLink(x)+'">'+escape(t("openTournament"))+' ↗</a></td></tr>'}).join("")+'</tbody></table></div><div class="ow-mobile-list ow-home-mobile">'+tours.slice(0,3).map(mobileRow).join("")+'</div>':'<div class="ow-empty"><strong>'+escape(t("emptyAll"))+'</strong><p>'+escape(t("noTournamentsTip"))+'</p></div>')+
 '<p class="ow-caption">'+escape(t("onlyDemo"))+'</p></div>';
}
function options(values,selected,firstLabel){
 return '<option value="all">'+escape(firstLabel)+'</option>'+values.map(function(x){return '<option value="'+escape(x.value)+'"'+(x.value===selected?' selected':'')+'>'+escape(x.label)+'</option>'}).join("");
}
function filters(leagueView){
 var leagues=allLeagues();
 var sports=[...new Set(leagues.map(x=>x.sport).filter(Boolean))].map(x=>({value:x,label:sportName(x)}));
 var leagueOptions=leagues.map(x=>({value:x.id,label:x.name}));
 var statuses=[...new Set(allTournaments().map(x=>x.state))].map(x=>({value:x,label:x}));
 return '<form class="ow-toolbar" id="ow-filter-form" role="search" autocomplete="off">'+
 '<div class="ow-search"><label for="ow-search">'+escape(t(leagueView?"searchLeagues":"searchTournaments"))+'</label><div class="ow-search-wrap"><input id="ow-search" name="search" type="search" placeholder="'+escape(t(leagueView?"searchPlaceholderLeagues":"searchPlaceholderTournaments"))+'" value="'+escape(state.search)+'" aria-label="'+escape(t("typeToSearch"))+'"></div></div>'+
 (leagueView?'<div class="ow-field"><label for="ow-sport">'+escape(t("sport"))+'</label><select id="ow-sport" name="sport">'+options(sports,state.sport,t("allSports"))+'</select></div>':
 '<div class="ow-field"><label for="ow-league">'+escape(t("league"))+'</label><select id="ow-league" name="league">'+options(leagueOptions,state.league,t("allLeagues"))+'</select></div><div class="ow-field"><label for="ow-status">'+escape(t("status"))+'</label><select id="ow-status" name="status">'+options(statuses,state.status,t("allStatuses"))+'</select></div>')+
 '<button class="ow-reset" id="ow-reset" type="reset">'+escape(t("reset"))+'</button></form>';
}
function normalized(x){return String(x??"").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function filtered(){
 var q=normalized(state.search.trim());
 if(state.view==="ligas"){
  return allLeagues().filter(x=>(state.sport==="all"||x.sport===state.sport)&&normalized([x.name,x.city,x.region,x.country,sportName(x.sport)].join(" ")).includes(q))
  .sort((a,b)=>a.name.localeCompare(b.name,language));
 }
 return allTournaments().filter(x=>(state.league==="all"||x.leagueId===state.league)&&(state.status==="all"||x.state===state.status)&&normalized([x.name,x.leagueName,x.category,x.sub,x.location,sportName(x.sport)].join(" ")).includes(q))
 .sort((a,b)=>a.leagueName.localeCompare(b.leagueName,language)||a.name.localeCompare(b.name,language));
}
function tableRow(item,i){
 var league=state.view==="ligas";
 var link=league?leagueLink(item):tournamentLink(item);
 return '<tr class="ow-row-appear" style="--ow-delay:'+Math.min(i*48,350)+'ms">'+
 (league?'<td><span class="ow-item-name">'+escape(item.name)+'</span><span class="ow-item-sub">'+escape(sportName(item.sport))+'</span></td><td>'+escape(locationText(item))+'</td><td>'+escape((item.categories||[]).length)+'</td>':
 '<td><span class="ow-item-name">'+escape(item.name)+'</span><span class="ow-item-sub">'+escape(item.sub||sportName(item.sport))+'</span></td><td>'+escape(item.leagueName)+'</td><td>'+badge(item.state)+'</td><td>'+escape(String(item.teams))+'</td>')+
 '<td><a class="ow-table-action" href="'+link+'">'+escape(t(league?"openLeague":"openTournament"))+' ↗</a>'+(league?'<a class="ow-text-link" href="'+escape(manager?.formLink?.(item.id)||("mis-ligas.html?editar="+encodeURIComponent(item.id)))+'">'+escape(t("configure"))+'</a>':"")+'</td></tr>';
}

function mobileRow(item,i){
 var isLeague=state.view==="ligas",url=isLeague?leagueLink(item):tournamentLink(item);
 var details=isLeague?[
  [t("sport"),sportName(item.sport)],[t("location"),locationText(item)]
 ]:[
  [t("league"),item.leagueName],[t("status"),item.state],[t("teams"),String(item.teams)]
 ];
 return '<article class="ow-mobile-result ow-row-appear" style="--ow-delay:'+Math.min(i*55,300)+'ms">'+
 '<div class="ow-mobile-result-head"><span class="ow-eyebrow">'+escape(t(isLeague?"leagues":"tournaments"))+'</span><h3>'+escape(item.name)+'</h3></div>'+
 '<dl>'+details.map(function(row){return '<div><dt>'+escape(row[0])+'</dt><dd>'+escape(row[1])+'</dd></div>'}).join("")+'</dl>'+
 '<a class="ow-btn ow-btn-primary" href="'+url+'">'+escape(t(isLeague?"openLeague":"openTournament"))+' →</a></article>';
}
function pagination(count,start,end,totalPages){
 var pages=[];var a=Math.max(1,state.page-1),b=Math.min(totalPages,state.page+1);
 for(var i=a;i<=b;i++)pages.push('<button type="button" data-page-index="'+i+'"'+(i===state.page?' class="is-current" aria-current="page"':'')+' aria-label="'+escape(t("page"))+' '+i+'">'+i+'</button>');
 return '<div class="ow-pagination"><span>'+escape(t("showing"))+' '+(count?start+1:0)+'–'+end+' '+escape(t("of"))+' '+count+' '+escape(t("entries"))+'</span>'+
 '<div class="ow-page-buttons"><button type="button" data-page-index="'+(state.page-1)+'" '+(state.page===1?'disabled':'')+' aria-label="'+escape(t("previous"))+'">‹</button>'+pages.join("")+'<button type="button" data-page-index="'+(state.page+1)+'" '+(state.page===totalPages?'disabled':'')+' aria-label="'+escape(t("next"))+'">›</button></div>'+
 '<label>'+escape(t("perPage"))+' <select id="ow-page-size" aria-label="'+escape(t("perPage"))+'">'+[2,5,10].map(n=>'<option value="'+n+'"'+(n===state.size?' selected':'')+'>'+n+'</option>').join("")+'</select></label></div>';
}
function resultList(){
 var league=state.view==="ligas",items=filtered(),totalPages=Math.max(1,Math.ceil(items.length/state.size));
 state.page=Math.max(1,Math.min(state.page,totalPages));
 var start=(state.page-1)*state.size,selected=items.slice(start,start+state.size),end=Math.min(start+state.size,items.length);
 return '<div class="ow-results-summary" role="status" aria-live="polite" aria-atomic="true"><span>'+items.length+' '+escape(t("entries"))+'</span><span>'+escape(t("page"))+' '+state.page+' / '+totalPages+'</span></div>'+
 (selected.length?'<div class="ow-table-wrap"><table class="ow-table"><thead><tr>'+(league?['name','location','category','actions']:['name','league','status','teams','actions']).map(x=>'<th scope="col">'+escape(t(x))+'</th>').join("")+'</tr></thead><tbody>'+selected.map(tableRow).join("")+'</tbody></table></div><div class="ow-mobile-list">'+selected.map(mobileRow).join("")+'</div>':
 '<div class="ow-empty"><strong>'+escape(t(league?"noLeagues":"noTournaments"))+'</strong><p>'+escape(t(league?"noLeaguesTip":"noTournamentsTip"))+'</p></div>')+pagination(items.length,start,end,totalPages);
}
function renderList(){
 var league=state.view==="ligas";
 return '<div class="ow-appear"><div class="ow-breadcrumb"><a href="organizador.html?vista=inicio" data-nav="inicio">'+escape(t("breadcrumb"))+'</a> / '+escape(t(league?"leagues":"tournaments"))+'</div>'+
 heading(t(league?"leagueTitle":"tourTitle"),t(league?"leagueDesc":"tourDesc"),league?'<a class="ow-btn ow-btn-primary" href="mis-ligas.html?nueva=1">＋ '+escape(t("createLeague"))+'</a>':"")+
 filters(league)+'<div id="ow-data-region">'+resultList()+'</div><p class="ow-caption">'+escape(t("onlyDemo"))+'</p></div>';
}

/* Transversal organizer responsibilities. The real ownership of sporting events,
   rulings and venue bookings remains with its proper actor and scope. */
function crossSpec(){
 var es={
 agenda:{intro:"Consulta la programación de tus competiciones y entra a cada torneo para coordinar sus jornadas, horarios y sedes.",cards:[
 ["▤","Programación y encuentros","Abre el calendario de un torneo y sus partidos.","partidos",true],
 ["⏸","Suspensión de jornada","La suspensión total o parcial no debe inventar resultados deportivos.","jornadas",false],
 ["⌖","Sedes y franjas","Comprueba los escenarios y las franjas admitidas antes de programar.","escenarios",false]]},
 solicitudes:{intro:"Localiza solicitudes de reprogramación, avisos de sedes y otras incidencias. Una solicitud pendiente no cambia automáticamente un partido.",cards:[
 ["✉","Solicitudes de equipos","Revisar motivos y resolver reprogramaciones autorizadas.","solicitudes",false],
 ["⌖","Alertas de escenarios","Ver bloqueos de franjas y decidir qué encuentros reprogramar.","escenarios",false],
 ["⚑","Incidencias arbitrales","Atender ausencia, sustitución y servicio efectivo con trazabilidad.","oficiales",false]]},
 recursos:{intro:"Coordina jueces, escuelas y escenarios sin administrar las cuentas de esas entidades. Las funciones y cantidades arbitrales se definen por ronda.",cards:[
 ["♧","Arbitraje y designaciones","Puestos por función y ronda, postulaciones, escuelas y suplencias.","oficiales",false],
 ["⌖","Escenarios deportivos","Disponibilidad, franjas autorizadas y programación multisede.","escenarios",false],
 ["⇄","Contingencias del encuentro","Consultar sustituciones y diferencias entre designado y efectivo.","oficiales",false]]},
 resultados:{intro:"Consulta encuentros, resultados de planillas, tablas provisionales y cierre de las competiciones. ASLO no crea marcadores alternativos.",cards:[
 ["◉","Clasificaciones","Tablas del torneo, sin confundirlas con el ranking oficial de ASLO.","clasificacion",true],
 ["▣","Planillas y hechos","Consultar los hechos registrados por oficiales competentes.","planillas",true],
 ["⚖","Decisiones y sanciones","Resultados administrativos, sanciones, reclamaciones y trazabilidad.","disciplina",false]]},
 comunicaciones:{intro:"Publica novedades de tus ligas y torneos y consulta sus reconocimientos; las publicaciones de otras personas no necesitan aprobación previa del organizador.",cards:[
 ["◈","Noticias del torneo","Comunicados sobre competición, fechas, cambios y premiación.","noticias",true],
 ["✦","Premiación","Premios propios del torneo, cambios justificados y anuncio correspondiente.","premios",true],
 ["◇","Patrocinadores de liga","Revisa las campañas y espacios comerciales de demostración.","patrocinadores",true]]}
 };
 var en={
 agenda:["Schedule, rounds and venues across your competitions.","Match schedule","Open each tournament's fixtures.","Round suspension","Partial or complete cancellation must not fabricate scores.","Venues and slots","Check approved venue availability."],
 solicitudes:["Review reschedule requests, venue notices and incidents. Requests never alter the calendar automatically.","Team requests","Review and resolve justified rescheduling requests.","Venue alerts","See blocked slots and choose rescheduling.","Officiating incidents","Track substitutions and effective officials."],
 recursos:["Coordinate judges, officiating schools and venues without managing their identities. Official positions are configured by round.","Officials and assignments","Roles, applications, schools and replacements.","Sports venues","Approved time slots and multi-venue schedules.","Match contingencies","Assigned versus actual officials."],
 resultados:["Review match reports, provisional tables and tournament completion. ASLO does not fabricate alternate score feeds.","Standings","Tournament tables, not ASLO rankings.","Match reports","Official sporting events and signatures.","Discipline and decisions","Administrative results, sanctions and complaints."],
 comunicaciones:["Publish league and tournament news; other people do not need organizer approval to post.","Tournament news","Competition updates and prize changes.","Awards","Tournament prizes and justified changes.","League sponsors","Sample commercial presence."]
 };
 if(language==="es")return es[state.view];
 var entry=es[state.view];if(!entry)return null;
 var translations=en[state.view];
 if(language==="en"&&translations) return {intro:translations[0],cards:entry.cards.map(function(card,i){return [card[0],translations[1+i*2],translations[2+i*2],card[3],card[4]]})};
 return entry;
}
function crossUrl(x,tab){
 var link=tournamentLink(x);
 if(tab==="patrocinadores")
  return manager?.leagueLink?.(x.leagueId,"patrocinadores")||link;
 return link+"&tab="+encodeURIComponent(tab);
}
function crossCard(card){
 return '<article class="ow-capability-card"><div class="ow-capability-icon" aria-hidden="true">'+card[0]+'</div>'+
 '<div class="ow-capability-details"><h3>'+escape(card[1])+'</h3><p>'+escape(card[2])+'</p>'+
 '<span class="ow-status-note '+(card[4]?"ow-status-ready":"")+'">'+escape(t(card[4]?"available":"limited"))+'</span></div></article>';
}
function crossRows(){
 var items=filtered(),totalPages=Math.max(1,Math.ceil(items.length/state.size));
 state.page=Math.max(1,Math.min(state.page,totalPages));
 var start=(state.page-1)*state.size,visible=items.slice(start,start+state.size),end=Math.min(start+state.size,items.length);
 var tab={agenda:"partidos",solicitudes:"solicitudes",recursos:"oficiales",resultados:"clasificacion",comunicaciones:"noticias"}[state.view]||"resumen";
 var head='<div class="ow-results-summary" role="status" aria-live="polite"><span>'+items.length+' '+escape(t("entries"))+'</span><span>'+escape(t("page"))+' '+state.page+' / '+totalPages+'</span></div>';
 var table=visible.length?'<div class="ow-table-wrap"><table class="ow-table"><thead><tr><th>'+escape(t("tournaments"))+'</th><th>'+escape(t("league"))+'</th><th>'+escape(t("status"))+'</th><th>'+escape(t("actions"))+'</th></tr></thead><tbody>'+
 visible.map(function(item,i){return '<tr class="ow-row-appear" style="--ow-delay:'+i*45+'ms"><td><strong class="ow-item-name">'+escape(item.name)+'</strong><small class="ow-item-sub">'+escape(item.sub)+'</small></td><td>'+escape(item.leagueName)+'</td><td>'+badge(item.state)+'</td><td><a class="ow-table-action" href="'+crossUrl(item,tab)+'">'+escape(t("openContext"))+' ↗</a></td></tr>'}).join("")+
 '</tbody></table></div><div class="ow-mobile-list">'+visible.map(function(item,i){return '<article class="ow-mobile-result"><h3>'+escape(item.name)+'</h3><p>'+escape(item.leagueName)+'</p><a class="ow-btn ow-btn-primary" href="'+crossUrl(item,tab)+'">'+escape(t("openContext"))+' →</a></article>'}).join("")+'</div>':
 '<div class="ow-empty"><strong>'+escape(t("noTournaments"))+'</strong><p>'+escape(t("noTournamentsTip"))+'</p></div>';
 return head+table+pagination(items.length,start,end,totalPages);
}
function renderCross(){
 var spec=crossSpec();
 if(!spec)return renderList();
 var title=t(state.view),all=allTournaments();
 var cards=spec.cards.map(crossCard).join("");
 return '<div class="ow-appear"><div class="ow-breadcrumb"><a href="organizador.html?vista=inicio" data-nav="inicio">'+escape(t("breadcrumb"))+'</a> / '+escape(title)+'</div>'+
 heading(title,spec.intro,'<a class="ow-btn" href="organizador.html?vista=torneos" data-nav="torneos">'+escape(t("tournaments"))+' ↗</a>')+
 '<div class="ow-section-heading"><h2>'+escape(t("tasks"))+'</h2></div>'+
 '<div class="ow-capability-grid">'+cards+'</div>'+
 '<div class="ow-section-heading"><h2>'+escape(t("allItems"))+'</h2><small>'+all.length+' '+escape(t("entries"))+'</small></div>'+
 '<p class="ow-cross-desc">'+escape(t("demoView"))+'</p>'+
 filters(false)+'<div id="ow-data-region">'+crossRows()+'</div>'+
 '<p class="ow-caption">'+escape(t("onlyDemo"))+'</p></div>';
}

function render(){
 activateNav();
 document.title="ASLO · "+t(state.view==="inicio"?"home":state.view==="ligas"?"leagues":state.view==="torneos"?"tournaments":state.view);
 root.innerHTML=state.view==="inicio"?renderHome():state.view==="ligas"||state.view==="torneos"?renderList():renderCross();
}
function refreshList(focusTarget){
 var region=document.getElementById("ow-data-region");
 if(region){
  region.innerHTML=(state.view==="ligas"||state.view==="torneos")?resultList():crossRows();writeUrl(true);
  if(focusTarget==="page")region.querySelector(".ow-page-buttons .is-current")?.focus();
  if(focusTarget==="size")region.querySelector("#ow-page-size")?.focus();
 }
}
document.addEventListener("click",function(e){
 var nav=e.target.closest("[data-nav],.ow-nav a[data-view],.ow-mobile-nav a[data-view]");
 if(nav){e.preventDefault();navigate(nav.getAttribute("data-nav")||nav.getAttribute("data-view"));return;}
 var paginationBtn=e.target.closest("[data-page-index]");
 if(paginationBtn&&!paginationBtn.disabled){state.page=Number(paginationBtn.getAttribute("data-page-index"));refreshList("page");}
});
root.addEventListener("input",function(e){
 if(e.target.id==="ow-search"){state.search=e.target.value;state.page=1;refreshList();}
});
root.addEventListener("change",function(e){
 var id=e.target.id;
 if(id==="ow-sport")state.sport=e.target.value;
 else if(id==="ow-league")state.league=e.target.value;
 else if(id==="ow-status")state.status=e.target.value;
 else if(id==="ow-page-size")state.size=Number(e.target.value);
 else return;
 state.page=1;refreshList(id==="ow-page-size"?"size":null);
});
root.addEventListener("reset",function(e){
 if(e.target.id!=="ow-filter-form")return;
 e.preventDefault();resetFilters();writeUrl(true);render();
 root.querySelector("#ow-search")?.focus();
});
window.addEventListener("popstate",function(){
 params=new URLSearchParams(location.search);
 state.view=isView(params.get("vista"))?params.get("vista"):"inicio";
 state.search=params.get("buscar")||"";state.sport=params.get("deporte")||"all";state.league=params.get("liga")||"all";state.status=params.get("estado")||"all";
 state.page=Math.max(1,Number(params.get("pagina"))||1);
 state.size=[2,5,10].includes(Number(params.get("limite")))?Number(params.get("limite")):2;
 render();
});
try{
 var account=window.asloAuth?.getAccount?.();
 if(account&&account.roles?.includes("organizador"))sessionStorage.setItem("asloxp-demo-mode","organizador");
}catch(e){}
updateStatic();
render();
})();