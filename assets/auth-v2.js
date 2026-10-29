(function uiApp(){
"use strict";
const ACCOUNT="asloxp-demo-account",MODE="asloxp-demo-mode",LANG="asloxp-language",THEME="asloxp-theme";
const roles=[
["aficionado","fan","♡",["favorites","news","activities"]],
["jugador","player","⚽",["fixtures","myteams","history"]],
["equipo","team","⬡",["Gaelian FC","members","competitions"]],
["organizador","organizer","🏆",["Liga Metropolitana Amateur","tournaments","schedule"]],
["juez","referee","◇",["assignments","history","reports"]],
["planillador","scorer","▤",["scoresheets","assignments","pending"]],
["asistente","assistant","◈",["fixtures","results","schedule"]],
["academia","academy","⌂",["myteams","coaches","training"]],
["entrenador","coach","✧",["professional","myteams","members"]],
["escuela","school","♧",["referees","leagues","activities"]],
["escenario","venue","⌖",["venues","authorizations","bookings"]],
["patrocinador","sponsor","✦",["missions","prizes","campaigns"]],
["responsable","guardian","⚑",["supervised","authorizations","controls"]],
["aslo","operator","◉",["verification","support","integrity"]]
];
const DEMO=["aficionado","jugador","equipo","organizador","juez"];
const dictionaries={
es:{
home:"Inicio",leagues:"Ligas",guest:"Visitante",login:"Iniciar sesión",signup:"Crear cuenta",account:"Mi cuenta",profile:"Mi perfil",settings:"Configuración",security:"Seguridad",appearance:"Apariencia",language:"Idioma",modes:"Mis modos",switch:"Cambiar modo",logout:"Cerrar sesión",sample:"PROTOTIPO UX · Datos ficticios",sessionSample:"Sesión simulada. No es un acceso real.",guestSample:"Información pública, sin necesidad de cuenta.",footer:"Prototipo para revisión · No hay autenticación ni permisos reales.",public:"Explorar información pública",back:"Volver",changesSaved:"Preferencia guardada en este navegador.",notReal:"Esta función necesita la futura implementación real; aquí solo evaluamos su ubicación.",fan:"Aficionado",player:"Jugador",team:"Equipo",organizer:"Organizador",referee:"Juez",scorer:"Planillador",assistant:"Asistente de liga",academy:"Academia o club",coach:"Entrenador",school:"Escuela de jueces",venue:"Escenario deportivo",sponsor:"Patrocinador",guardian:"Adulto responsable",operator:"Personal ASLO",favorites:"Favoritos",news:"Noticias",activities:"Actividades",fixtures:"Próximos partidos",myteams:"Mis equipos",history:"Trayectoria",members:"Participantes",competitions:"Competiciones",tournaments:"Torneos",schedule:"Programación",assignments:"Encuentros asignados",reports:"Informes",scoresheets:"Planillas",pending:"Pendientes",results:"Resultados",coaches:"Entrenadores",training:"Entrenamientos",professional:"Perfil profesional",referees:"Jueces",venues:"Instalaciones",authorizations:"Autorizaciones",bookings:"Reservas",missions:"Misiones",prizes:"Premios",campaigns:"Campañas",supervised:"Cuentas supervisadas",controls:"Controles",verification:"Verificación",support:"Soporte",integrity:"Integridad",notAvailable:"No disponible",comingLater:"Se diseñará en una próxima iteración",modeDescription:"Cada modo muestra solo lo que le compete a esa función.",selectorTitle:"¿En qué modo quieres entrar?",selectorHelp:"Una cuenta puede tener varios modos, pero solo los autorizados estarán disponibles.",availableModes:"Mis modos disponibles",otherModes:"Otros modos de ASLO",otherNote:"Se habilitan según las vinculaciones, funciones y verificaciones correspondientes.",enterMode:"Entrar a este modo",modeTitle:"Espacio de",modeWork:"Las funciones propias de este modo se incorporarán por partes. Por ahora puedes revisar la cuenta y cambiar de contexto.",noPerm:"El selector no concede permisos reales.",joined:"Actuando en nombre de",introModes:"UNA CUENTA · VARIOS MODOS",hello:"Bienvenido de nuevo.",welcome:"Empieza tu experiencia.",introAuth:"Puedes explorar el deporte como visitante. Al acceder verás únicamente los modos habilitados de tu cuenta.",continueGuest:"Seguir como visitante",sampleOnly:"Prueba únicamente con datos ficticios. No introduzcas tu correo o contraseña reales.",displayName:"Nombre de ejemplo",email:"Correo de ejemplo",password:"Contraseña de ejemplo",loginDemo:"Entrar (simulado)",registerDemo:"Crear cuenta (simulado)",multiDemo:"Probar una cuenta con varios modos",or:"o",askRegister:"¿No tienes cuenta?",askLogin:"¿Ya tienes cuenta?",newFan:"Una cuenta nueva empieza como aficionado; otros modos necesitan autorización o vinculación.",accountHeading:"Gestiona tu experiencia",accountIntro:"Tu perfil, seguridad, apariencia e idioma son comunes a todos tus modos.",personalData:"Datos de cuenta",displayNameHelp:"Cambia el nombre de ejemplo que aparece en el encabezado.",save:"Guardar",yourAvatar:"Identidad de cuenta",sessionMode:"Modo activo",profileDesc:"Estos datos son simulados; no existe un perfil real almacenado en un servidor.",securityIntro:"Aquí estarán los controles para proteger tu cuenta cuando exista autenticación real.",changePassword:"Cambiar contraseña",twoFactor:"Verificación en dos pasos",devices:"Sesiones y dispositivos",disabledDemo:"No disponible en esta demostración",securityWarning:"Nunca introduzcas contraseñas reales en este prototipo público.",themeIntro:"Elige cómo se ve asloXP. La preferencia se conserva en este navegador.",theme:"Tema",light:"Claro",dark:"Oscuro",system:"Según dispositivo",languageIntro:"Selecciona el idioma de la interfaz. Se conserva para tus próximas visitas desde este navegador.",langName:"Español",langEn:"English",langDe:"Deutsch",apply:"Aplicar",activeMode:"Modo activo",viewPublic:"Ver sitio público"
},
en:{
home:"Home",leagues:"Leagues",guest:"Visitor",login:"Sign in",signup:"Create account",account:"My account",profile:"My profile",settings:"Settings",security:"Security",appearance:"Appearance",language:"Language",modes:"My modes",switch:"Switch mode",logout:"Sign out",sample:"UX PROTOTYPE · Fictional data",sessionSample:"Demo session. Not a real sign-in.",guestSample:"Public information, no account required.",footer:"Prototype for review · No real authentication or permissions.",public:"Explore public information",back:"Back",changesSaved:"Preference saved in this browser.",notReal:"This feature requires real implementation; here we are only reviewing its placement.",fan:"Fan",player:"Player",team:"Team",organizer:"Organizer",referee:"Referee",scorer:"Scorekeeper",assistant:"League assistant",academy:"Academy or club",coach:"Coach",school:"Referee school",venue:"Sports venue",sponsor:"Sponsor",guardian:"Parent or guardian",operator:"ASLO staff",favorites:"Favorites",news:"News",activities:"Activities",fixtures:"Upcoming matches",myteams:"My teams",history:"Sporting history",members:"Participants",competitions:"Competitions",tournaments:"Tournaments",schedule:"Schedule",assignments:"Assigned matches",reports:"Reports",scoresheets:"Match sheets",pending:"Pending items",results:"Results",coaches:"Coaches",training:"Training",professional:"Professional profile",referees:"Referees",venues:"Facilities",authorizations:"Authorizations",bookings:"Bookings",missions:"Missions",prizes:"Prizes",campaigns:"Campaigns",supervised:"Supervised accounts",controls:"Controls",verification:"Verification",support:"Support",integrity:"Integrity",notAvailable:"Unavailable",comingLater:"To be designed in a future iteration",modeDescription:"Each mode shows only the tools relevant to that role.",selectorTitle:"Which mode would you like to use?",selectorHelp:"One account may have several modes, but only authorized modes are available.",availableModes:"My available modes",otherModes:"Other ASLO modes",otherNote:"Enabled through the corresponding relationships, roles and verification.",enterMode:"Enter this mode",modeTitle:"Your",modeWork:"Features for this mode will be added step by step. For now, review your account and switch contexts.",noPerm:"The selector does not grant real permissions.",joined:"Acting on behalf of",introModes:"ONE ACCOUNT · MANY MODES",hello:"Welcome back.",welcome:"Start your experience.",introAuth:"You can browse sports as a visitor. When signed in, you see only the modes available to your account.",continueGuest:"Continue as visitor",sampleOnly:"Use fictional details only. Do not enter real email addresses or passwords.",displayName:"Sample name",email:"Sample email",password:"Sample password",loginDemo:"Sign in (demo)",registerDemo:"Create account (demo)",multiDemo:"Try a multi-role demo account",or:"or",askRegister:"No account yet?",askLogin:"Already have an account?",newFan:"New accounts start as fans; other modes require a relationship or authorization.",accountHeading:"Make ASLO yours",accountIntro:"Your profile, security, appearance and language apply across all your modes.",personalData:"Account details",displayNameHelp:"Change the sample name shown in the header.",save:"Save",yourAvatar:"Account identity",sessionMode:"Active mode",profileDesc:"These details are simulated; no real user profile is stored on a server.",securityIntro:"These controls will protect your account once real authentication exists.",changePassword:"Change password",twoFactor:"Two-step verification",devices:"Sessions and devices",disabledDemo:"Not available in this demo",securityWarning:"Never enter real passwords in this public prototype.",themeIntro:"Choose how asloXP looks. This preference is saved in your browser.",theme:"Theme",light:"Light",dark:"Dark",system:"Follow device",languageIntro:"Choose the interface language. It will be remembered on future visits in this browser.",langName:"Español",langEn:"English",langDe:"Deutsch",apply:"Apply",activeMode:"Active mode",viewPublic:"View public site"
},
de:{
home:"Startseite",leagues:"Ligen",guest:"Gast",login:"Anmelden",signup:"Konto erstellen",account:"Mein Konto",profile:"Mein Profil",settings:"Einstellungen",security:"Sicherheit",appearance:"Darstellung",language:"Sprache",modes:"Meine Modi",switch:"Modus wechseln",logout:"Abmelden",sample:"UX-PROTOTYP · Beispieldaten",sessionSample:"Demo-Sitzung. Keine echte Anmeldung.",guestSample:"Öffentliche Informationen ohne Benutzerkonto.",footer:"Prototyp zur Überprüfung · Keine echte Anmeldung oder Berechtigungen.",public:"Öffentliche Inhalte ansehen",back:"Zurück",changesSaved:"Einstellung in diesem Browser gespeichert.",notReal:"Diese Funktion benötigt die spätere echte Umsetzung. Hier prüfen wir nur ihre Platzierung.",fan:"Fan",player:"Spieler",team:"Mannschaft",organizer:"Veranstalter",referee:"Schiedsrichter",scorer:"Spielprotokollführer",assistant:"Liga-Assistent",academy:"Sportakademie oder Verein",coach:"Trainer",school:"Schiedsrichterschule",venue:"Sportstätte",sponsor:"Sponsor",guardian:"Erziehungsberechtigte",operator:"ASLO-Team",favorites:"Favoriten",news:"Neuigkeiten",activities:"Aktivitäten",fixtures:"Nächste Spiele",myteams:"Meine Mannschaften",history:"Sportliche Laufbahn",members:"Teilnehmer",competitions:"Wettbewerbe",tournaments:"Turniere",schedule:"Spielplan",assignments:"Zugewiesene Spiele",reports:"Berichte",scoresheets:"Spielberichte",pending:"Ausstehend",results:"Ergebnisse",coaches:"Trainer",training:"Training",professional:"Berufsprofil",referees:"Schiedsrichter",venues:"Anlagen",authorizations:"Genehmigungen",bookings:"Reservierungen",missions:"Missionen",prizes:"Preise",campaigns:"Kampagnen",supervised:"Betreute Konten",controls:"Kontrollen",verification:"Verifizierung",support:"Support",integrity:"Integrität",notAvailable:"Nicht verfügbar",comingLater:"Wird in einer späteren Phase gestaltet",modeDescription:"Jeder Modus zeigt nur die zugehörigen Funktionen.",selectorTitle:"Welchen Modus möchtest du nutzen?",selectorHelp:"Ein Konto kann mehrere Modi haben, aber nur die freigegebenen sind verfügbar.",availableModes:"Meine verfügbaren Modi",otherModes:"Weitere ASLO-Modi",otherNote:"Sie werden durch Verknüpfungen, Rollen oder Prüfungen freigegeben.",enterMode:"Diesen Modus öffnen",modeTitle:"Dein Bereich:",modeWork:"Die Funktionen werden schrittweise ergänzt. Jetzt kannst du dein Konto verwalten und zwischen Modi wechseln.",noPerm:"Die Modusauswahl gewährt keine echten Berechtigungen.",joined:"Im Namen von",introModes:"EIN KONTO · MEHRERE MODI",hello:"Willkommen zurück.",welcome:"Starte dein Erlebnis.",introAuth:"Du kannst den Sport als Gast entdecken. Nach der Anmeldung siehst du nur die für dein Konto verfügbaren Modi.",continueGuest:"Als Gast fortfahren",sampleOnly:"Bitte nur erfundene Daten eingeben. Keine echten E-Mail-Adressen oder Passwörter.",displayName:"Beispielname",email:"Beispiel-E-Mail",password:"Beispielpasswort",loginDemo:"Anmelden (Demo)",registerDemo:"Konto erstellen (Demo)",multiDemo:"Demo-Konto mit mehreren Modi testen",or:"oder",askRegister:"Noch kein Konto?",askLogin:"Hast du bereits ein Konto?",newFan:"Neue Konten beginnen als Fan. Weitere Modi erfordern Freigaben oder Verknüpfungen.",accountHeading:"Gestalte dein ASLO-Erlebnis",accountIntro:"Profil, Sicherheit, Darstellung und Sprache gelten in allen Modi.",personalData:"Kontodaten",displayNameHelp:"Ändere den Beispielnamen im Kopfbereich.",save:"Speichern",yourAvatar:"Kontoinformationen",sessionMode:"Aktiver Modus",profileDesc:"Diese Daten sind simuliert. Es gibt kein echtes Benutzerprofil auf einem Server.",securityIntro:"Diese Funktionen schützen später dein Konto, sobald eine echte Anmeldung verfügbar ist.",changePassword:"Passwort ändern",twoFactor:"Zwei-Faktor-Authentifizierung",devices:"Sitzungen und Geräte",disabledDemo:"In dieser Demo nicht verfügbar",securityWarning:"Bitte niemals echte Passwörter in diesem öffentlichen Prototyp eingeben.",themeIntro:"Wähle das Design. Die Einstellung wird in deinem Browser gespeichert.",theme:"Design",light:"Hell",dark:"Dunkel",system:"Geräteeinstellung",languageIntro:"Wähle die Sprache der Oberfläche. Sie wird für spätere Besuche in diesem Browser gespeichert.",langName:"Español",langEn:"English",langDe:"Deutsch",apply:"Anwenden",activeMode:"Aktiver Modus",viewPublic:"Öffentliche Seite ansehen"
}};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* Shared illustrated account avatars. Fixed SVG paths and palette, no external images.
   The account owns its visual identity across all modes; sports are visual choices,
   not role assignments or eligibility records. */
const avatarCatalog=[
 {id:"classic",es:"Clásico",en:"Classic",de:"Klassisch",color:"#68cbfa",shirt:"#204d78",hair:"#253951",sport:"person"},
 {id:"futbol",es:"Fútbol",en:"Football",de:"Fußball",color:"#b8f38b",shirt:"#258456",hair:"#202b3b",sport:"football"},
 {id:"basket",es:"Baloncesto",en:"Basketball",de:"Basketball",color:"#ffa36e",shirt:"#a24429",hair:"#33283e",sport:"basketball"},
 {id:"volley",es:"Voleibol",en:"Volleyball",de:"Volleyball",color:"#e9a0fc",shirt:"#713eae",hair:"#4b2c53",sport:"volleyball"},
 {id:"tenis",es:"Tenis",en:"Tennis",de:"Tennis",color:"#dcf779",shirt:"#437a41",hair:"#2a3e4b",sport:"tennis"},
 {id:"running",es:"Atletismo",en:"Athletics",de:"Leichtathletik",color:"#ffc875",shirt:"#b75151",hair:"#2d3043",sport:"running"},
 {id:"referee",es:"Arbitraje",en:"Referee",de:"Schiedsrichter",color:"#95d2ee",shirt:"#364451",hair:"#26323d",sport:"referee"},
 {id:"coach",es:"Entrenamiento",en:"Coaching",de:"Training",color:"#f6b783",shirt:"#3e7279",hair:"#3c3138",sport:"coach"},
 {id:"captain",es:"Capitán",en:"Captain",de:"Kapitän",color:"#8fb6ff",shirt:"#4157ab",hair:"#252945",sport:"captain"},
 {id:"esports",es:"Competición",en:"Competition",de:"Wettkampf",color:"#eb99d1",shirt:"#7f3a7e",hair:"#252944",sport:"competition"}
];
function avatarLabel(v){return v[lang()]||v.es}
function avatarMarkup(id="classic",sizeClass=""){
 const a=avatarCatalog.find(x=>x.id===id)||avatarCatalog[0],p=a.sport;
 const gear=p==="football"?'<circle cx="69" cy="64" r="10" fill="#fff" stroke="#23334c" stroke-width="2"/><path d="M69 59l5 4-2 6h-6l-3-6z" fill="#243b4b"/><path d="M69 54v5m-10 3 4 1m13 0 3-2m-7 8 3 4m-9-4-3 4" stroke="#263e4f" stroke-width="2"/>':
 p==="basketball"?'<circle cx="70" cy="64" r="11" fill="#f6a04f" stroke="#8d4423" stroke-width="2"/><path d="M59 64h22M70 53v22M61 58q15 6 17 13M78 58q-15 7-17 13" fill="none" stroke="#813c21" stroke-width="1.7"/>':
 p==="volleyball"?'<circle cx="69" cy="64" r="11" fill="#f3edf9" stroke="#5c71a0" stroke-width="1.6"/><path d="M61 58q8 1 12 13m-9-15q8 0 14 9m-18 4q8-10 18-10m-13 15q4-10 14-12" fill="none" stroke="#6e81b6" stroke-width="2"/>':
 p==="tennis"?'<ellipse cx="70" cy="61" rx="8" ry="13" transform="rotate(31 70 61)" fill="none" stroke="#deffb6" stroke-width="3"/><path d="M72 72l7 11M60 61l19 0m-11-12v24" stroke="#2a6679" stroke-width="2"/><circle cx="55" cy="73" r="6" fill="#d8f765"/>':
 p==="referee"?'<rect x="62" y="56" width="16" height="22" rx="2" fill="#eaf4fa" stroke="#465f73"/><rect x="65" y="58" width="10" height="13" fill="#f9d878"/><path d="M67 76h6" stroke="#566577" stroke-width="1.5"/>':
 p==="coach"?'<rect x="60" y="54" width="20" height="25" rx="3" fill="#c5e0ea" stroke="#517889" stroke-width="2"/><path d="M65 62h10m-10 5h10m-10 5h6" stroke="#32536b" stroke-width="1.8"/>':
 p==="captain"?'<path d="M58 65l6 3 6-8 7 8 6-3-4 15H62z" fill="#f9d56e" stroke="#9b7e27" stroke-width="1.5"/><circle cx="70" cy="60" r="3" fill="#fff5c8"/>':
 p==="running"?'<path d="M61 75l8-18 9 15" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M65 61l13-4M68 69l-10 10" stroke="#fff" stroke-width="4" stroke-linecap="round"/>':
 p==="competition"?'<path d="M57 68l9-10h8l9 10-5 10H62z" fill="#d9b7e9" stroke="#694b8a" stroke-width="2"/><circle cx="70" cy="69" r="4" fill="#653f89"/>':
 '<path d="M62 63h16m-8-8v16" stroke="#e4f9ff" stroke-width="4" stroke-linecap="round"/>';
 const hair=a.id==="volley"||a.id==="esports"?'<path d="M27 50q-3-37 17-39 22-1 22 39l-7 6-4-24-23 1-2 24z" fill="'+a.hair+'"/>':
 '<path d="M24 34q1-23 23-23 19 0 20 22-12-8-22-10-9 13-21 11z" fill="'+a.hair+'"/>';
 return '<svg class="aslo-avatar-svg '+sizeClass+'" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'+
 '<rect width="96" height="96" rx="22" fill="'+a.color+'"/><circle cx="48" cy="42" r="35" fill="#ffffff" opacity=".12"/>'+
 '<path d="M7 96q0-31 26-32l15 7 15-7q25 1 26 32" fill="'+a.shirt+'"/>'+
 '<path d="M36 63l12 11 12-11v-13H36z" fill="#c68b69"/>'+
 '<ellipse cx="48" cy="39" rx="22" ry="27" fill="#e7b18e"/>'+
 '<path d="M25 39q-6 3-4 10 2 7 7 6M71 39q6 3 4 10-2 7-7 6" fill="#e7b18e"/>'+
 hair+
 '<path d="M38 42h3m14 0h3" stroke="#293341" stroke-width="3" stroke-linecap="round"/>'+
 '<path d="M43 54q5 4 10 0" fill="none" stroke="#9a624e" stroke-width="2.2" stroke-linecap="round"/>'+
 '<path d="M28 76l18 13h5l18-13" fill="none" stroke="#ffffff" stroke-opacity=".42" stroke-width="2"/>'+
 '<circle cx="70" cy="67" r="17" fill="#0e2539" stroke="#ffffff" stroke-width="2"/>'+gear+
 '</svg>';
}
function validPhoto(s){return typeof s==="string"&&s.length<=250000&&/^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(s)}
function avatarForAccount(a,extraClass=""){
 const src=a&&validPhoto(a.photoData)?a.photoData:"";
 if(src)return '<img class="aslo-account-avatar '+extraClass+'" src="'+src+'" alt="" loading="lazy" decoding="async">';
 return '<span class="aslo-account-avatar '+extraClass+'" aria-hidden="true">'+avatarMarkup(a?.avatarId||"classic")+'</span>';
}
function saveVisual(patch){
 const a=account();if(!a)return false;
 const next={...a,...patch};
 try{sessionStorage.setItem(ACCOUNT,JSON.stringify(next));return true}catch(e){return false}
}

function prefGet(key,defaultValue){try{return localStorage.getItem(key)||defaultValue}catch(e){return defaultValue}}
function prefSet(key,val){try{localStorage.setItem(key,val)}catch(e){}}
const lang=()=>["es","en","de"].includes(prefGet(LANG,"es"))?prefGet(LANG,"es"):"es";
const theme=()=>["light","dark","system"].includes(prefGet(THEME,"dark"))?prefGet(THEME,"dark"):"dark";
function tr(key){return dictionaries[lang()][key]||dictionaries.es[key]||key}
function applyPreferences(){
 const current=theme();let picked=current;
 if(current==="system"){let light=false;try{light=window.matchMedia("(prefers-color-scheme: light)").matches}catch(e){}picked=light?"light":"dark"}
 document.documentElement.setAttribute("data-theme",picked);document.documentElement.lang=lang();
}
applyPreferences();
function account(){try{const a=JSON.parse(sessionStorage.getItem(ACCOUNT)||"null");return a&&typeof a.name==="string"&&Array.isArray(a.roles)?a:null}catch(e){return null}}
function activeMode(){const a=account();if(!a)return null;let id;try{id=sessionStorage.getItem(MODE)}catch(e){}return a.roles.includes(id)?id:a.roles[0]}
const role=id=>{const x=roles.find(r=>r[0]===id);return x?{id:x[0],name:tr(x[1]),icon:x[2],parts:x[3]}:null};
function changeMode(id){const a=account();if(!a||!a.roles.includes(id))return;try{sessionStorage.setItem(MODE,id)}catch(e){}}
function logout(){try{sessionStorage.removeItem(ACCOUNT);sessionStorage.removeItem(MODE)}catch(e){}location.assign("index.html")}
function languages(){
 return `<label class="header-lang"><span class="sr-only">${tr("language")}</span><select id="global-lang" aria-label="${tr("language")}"><option value="es" ${lang()==="es"?"selected":""}>ES</option><option value="en" ${lang()==="en"?"selected":""}>EN</option><option value="de" ${lang()==="de"?"selected":""}>DE</option></select></label>`
}
function topbar(section){
 const a=account(),r=role(activeMode());const inMode=section==="mode";
 const identityPages=["modos","modo","cuenta"].includes(document.body.dataset.page);
 const navigation=identityPages?`<nav class="publicnav" aria-label="Mis espacios ASLO"><a href="modos.html">${tr("modes")}</a><a href="cuenta.html?tab=perfil">${tr("account")}</a><a href="index.html">${tr("public")}</a></nav>`:inMode?"":`<nav class="publicnav" aria-label="${tr("public")}"><a href="index.html" class="${section==="inicio"?"sel":""}">${tr("home")}</a><a href="ligas.html" class="${section==="ligas"?"sel":""}">${tr("leagues")}</a></nav>`;
 const user=a?`<details class="account-menu"><summary class="account-trigger" aria-label="${tr("account")}">${avatarForAccount(a,"aslo-account-avatar--small")}<span class="account-trigger-copy"><strong>${esc(a.name)}</strong><small>${r?esc(r.name):tr("account")}</small></span><span aria-hidden="true">⌄</span></summary><div class="account-popover"><div class="popover-title"><span class="avatar">${esc(a.name.trim().slice(0,1).toUpperCase()||"U")}</span><div><strong>${esc(a.name)}</strong><small>${tr("account")}</small></div></div><a href="cuenta.html?tab=perfil">${tr("profile")}</a><a href="cuenta.html?tab=seguridad">${tr("security")}</a><a href="cuenta.html?tab=apariencia">${tr("appearance")}</a><a href="cuenta.html?tab=idioma">${tr("language")}</a><a href="modos.html">${tr("switch")}</a><button type="button" data-logout class="logout-option">${tr("logout")}</button></div></details>`:`<a class="loginlink" href="acceso.html">${tr("login")}</a>`;
 return `<header class="sitehead"><div class="shell headrow"><a class="brand" href="index.html">${identityPages?'<span class="brand-symbol">▲</span> ASLO':'aslo<i>XP</i>'}</a>${navigation}<div class="account-actions">${languages()}${user}</div></div></header>`;
}
function chrome(content,section=""){
 const a=account();return topbar(section)+`<div class="notice"><div class="shell"><b>${tr("sample")}</b> · ${a?tr("sessionSample"):tr("guestSample")}</div></div><main>${content}</main><footer class="foot"><div class="shell">asloXP · ${tr("footer")}</div></footer>`
}
function attachChrome(){
 const sel=document.querySelector("#global-lang");if(sel)sel.addEventListener("change",e=>{prefSet(LANG,e.target.value);location.reload()});
 document.querySelectorAll("[data-logout]").forEach(b=>b.addEventListener("click",logout));
}
function render(body,section=""){document.body.innerHTML=chrome(body,section);attachChrome()}
function signin(a){try{sessionStorage.setItem(ACCOUNT,JSON.stringify({name:a.name,roles:a.roles}));sessionStorage.setItem(MODE,a.roles[0])}catch(e){}location.assign("modos.html")}
function loginForm(isRegister){
 const tt=(es,en,de)=>({es,en,de})[lang()]||es;
 const heading=isRegister?tt("Tu próxima historia comienza aquí.","Your next chapter starts here.","Deine nächste Geschichte beginnt hier."):tt("La pasión continúa contigo.","The game continues with you.","Das Spiel geht mit dir weiter.");
 const subheading=isRegister?tt("Únete a la experiencia deportiva de ASLO.","Join the ASLO sports experience.","Werde Teil der ASLO-Sportwelt."):tt("Accede a tus espacios y descubre todo lo que mueve al deporte.","Enter your spaces and follow the world of sport.","Entdecke deine Sportwelt und deine Bereiche.");
 const label=isRegister?tt("CREA TU PERFIL","CREATE YOUR PROFILE","ERSTELLE DEIN PROFIL"):tt("TU MUNDO DEPORTIVO","YOUR SPORTS WORLD","DEINE SPORTWELT");
 const btnText=isRegister?tt("Crear cuenta","Create account","Konto erstellen"):tt("Entrar en ASLO","Sign in to ASLO","Bei ASLO anmelden");
 document.body.classList.add("aslo-auth-v7");
 render(`<div class="aslo-auth-stage">
  <section class="aslo-auth-scene" aria-label="${tt("Escena deportiva de ASLO","ASLO sports imagery","ASLO-Sportmotiv")}">
   <div class="aslo-auth-scene-inner">
    <div class="aslo-auth-kicker"><span class="aslo-auth-kicker-dot"></span>${tt("ASLO · EL DEPORTE NOS CONECTA","ASLO · SPORT CONNECTS US","ASLO · SPORT VERBINDET UNS")}</div>
    <h1>${heading}</h1>
    <p>${subheading}</p>
    <div class="aslo-auth-scene-highlights">
     <span>⚽ ${tt("Ligas","Leagues","Ligen")}</span>
     <span>🏆 ${tt("Torneos","Tournaments","Turniere")}</span>
     <span>◉ ${tt("Resultados","Results","Ergebnisse")}</span>
    </div>
    <a class="aslo-auth-back" href="index.html">← ${tt("Volver a noticias","Back to news","Zurück zu Nachrichten")}</a>
   </div>
  </section>
  <section class="aslo-auth-card" aria-labelledby="aslo-auth-title">
   <div class="aslo-auth-brand"><span class="aslo-auth-brand-mark">▲</span> ASLO <span class="aslo-auth-brand-suffix">XP</span></div>
   <div class="aslo-auth-eyebrow">${label}</div>
   <h2 id="aslo-auth-title">${isRegister?tt("Crea tu cuenta","Create your account","Konto erstellen"):tt("Bienvenido de nuevo","Welcome back","Willkommen zurück")}</h2>
   <p class="aslo-auth-description">${isRegister?tt("Completa los datos para crear una cuenta de demostración.","Enter your details to create a demo account.","Gib deine Daten für ein Demo-Konto ein."):tt("Ingresa a la experiencia deportiva de ASLO.","Sign in to the ASLO sports experience.","Melde dich bei ASLO an.")}</p>
   <div class="aslo-auth-demo-alert" role="note"><span aria-hidden="true">ⓘ</span> ${tt("Prototipo de demostración. No utilices credenciales ni contraseñas reales.","Demo prototype. Do not use real passwords or credentials.","Demo-Prototyp. Keine echten Passwörter oder Zugangsdaten verwenden.")}</div>
   <form id="demo-form" class="aslo-auth-form">
    ${isRegister?`<label for="demo-name">${tr("displayName")}</label><input id="demo-name" name="name" required maxlength="40" autocomplete="off" placeholder="${tt("Tu nombre","Your name","Dein Name")}">`:""}
    <label for="demo-email">${tr("email")}</label><input id="demo-email" name="email" type="email" required autocomplete="off" placeholder="demo@example.test">
    <label for="demo-pass">${tr("password")}</label><div class="aslo-auth-password"><input id="demo-pass" name="password" type="password" required minlength="4" autocomplete="off" placeholder="••••••••"><button id="aslo-auth-show-password" type="button" aria-controls="demo-pass" aria-pressed="false">${tt("Mostrar","Show","Anzeigen")}</button></div>
    <button type="submit" class="aslo-auth-submit">${btnText}<span aria-hidden="true"> →</span></button>
   </form>
   ${isRegister?`<div class="aslo-auth-alt"><p>${tr("askLogin")}</p><a class="aslo-auth-secondary" href="acceso.html">${tt("Entrar","Sign in","Anmelden")} →</a></div>`:`<div class="aslo-auth-alt"><p>${tr("askRegister")}</p><a class="aslo-auth-secondary" href="registro.html">${tt("Crear cuenta","Create account","Konto erstellen")} →</a></div><div class="aslo-auth-demo-entry"><div class="aslo-auth-divider"><span>${tr("or")}</span></div><button id="demo-login" type="button">${tt("Explorar con usuario demo","Explore with demo account","Mit Demo-Konto erkunden")}</button></div>`}
   <div class="aslo-auth-card-footer">${tt("ASLO · Experiencia deportiva de demostración","ASLO · Demo sports experience","ASLO · Demo-Sporterlebnis")}</div>
  </section>
 </div>
 <aside class="aslo-auth-safe-ad" aria-label="${tt("Panel publicitario reservado","Reserved advertising panel","Reservierte Werbefläche")}">${tt("PUBLICIDAD · ESPACIO RESERVADO","ADVERTISING · RESERVED SPACE","WERBUNG · RESERVIERTER PLATZ")}</aside>`);
 const brand=document.querySelector(".sitehead .brand");if(brand)brand.innerHTML='<span class="aslo-auth-header-icon" aria-hidden="true">▲</span> ASLO';
 const nav=document.querySelector(".sitehead .publicnav");
 if(nav)nav.innerHTML=`<a href="index.html">${tt("Noticias","News","Nachrichten")}</a><a href="ligas.html">${tt("Ligas","Leagues","Ligen")}</a><a href="torneos.html">${tt("Torneos","Tournaments","Turniere")}</a><a href="resultados.html">${tt("Resultados","Results","Ergebnisse")}</a>`;
 const form=document.querySelector("#demo-form");
 form.addEventListener("submit",e=>{e.preventDefault();if(!e.target.reportValidity())return;const name=isRegister?document.querySelector("#demo-name").value.trim():"Demo";signin({name:name||"Demo",roles:isRegister?["aficionado"]:DEMO})});
 const demo=document.querySelector("#demo-login");if(demo)demo.addEventListener("click",()=>signin({name:"Alex",roles:DEMO}));
 const show=document.querySelector("#aslo-auth-show-password");if(show)show.addEventListener("click",()=>{const field=document.querySelector("#demo-pass"),reveal=field.type==="password";field.type=reveal?"text":"password";show.setAttribute("aria-pressed",String(reveal));show.textContent=reveal?tt("Ocultar","Hide","Verbergen"):tt("Mostrar","Show","Anzeigen")});
}
function choose(){
 const a=account();if(!a){location.replace("acceso.html");return}
 const enabled=roles.filter(x=>a.roles.includes(x[0])),waiting=roles.filter(x=>!a.roles.includes(x[0]));
 render(`<div class="shell modes-view"><section class="pagehead"><div class="crumb"><a href="index.html">${tr("home")}</a> / ${tr("modes")}</div><span class="eyebrow">${tr("account")}</span><h1>${tr("selectorTitle")}</h1><p class="intro">${tr("selectorHelp")}</p></section><h2>${tr("availableModes")}</h2><div class="mode-grid">${enabled.map(x=>`<a class="mode-tile" data-mode="${x[0]}" href="${x[0]==="organizador"?"organizador.html":"modo.html?modo="+x[0]}"><span class="mode-icon">${x[2]}</span><h3>${tr(x[1])}</h3><p>${tr("modeDescription")}</p><span class="link">${tr("enterMode")} →</span></a>`).join("")}</div><section class="other-modes"><h2>${tr("otherModes")}</h2><p>${tr("otherNote")}</p><div class="role-tags">${waiting.map(x=>`<span class="role-tag">${x[2]} ${tr(x[1])} <small>· ${tr("notAvailable")}</small></span>`).join("")}</div></section><div class="account-bottom"><a class="btn" href="cuenta.html?tab=perfil">${tr("profile")}</a><a class="btn" href="index.html">${tr("public")}</a><button data-logout type="button" class="btn">${tr("logout")}</button></div></div>`,"mode");
}
function modePage(){
 const a=account();if(!a){location.replace("acceso.html");return}
 const qp=new URLSearchParams(location.search);const id=qp.get("modo")||activeMode();if(!a.roles.includes(id)){location.replace("modos.html");return}
 changeMode(id);if(id==="organizador"){location.replace("organizador.html");return}const r=role(id);
 render(`<div class="shell modeview"><section class="pagehead"><div class="crumb"><a href="modos.html">${tr("modes")}</a> / ${esc(r.name)}</div><span class="eyebrow">${tr("activeMode")}</span><h1>${r.icon} ${esc(r.name)}</h1><p class="intro">${tr("modeDescription")}</p><a href="modos.html" class="btn primary">${tr("switch")}</a><a href="cuenta.html?tab=perfil" class="btn">${tr("account")}</a></section><section class="mode-workspace"><h2>${tr("modeTitle")} ${esc(r.name)}</h2><p>${tr("modeWork")}</p><div class="mode-grid mode-promises">${r.parts.map(k=>`<div class="mode-tile preview-tile"><span class="chip">${tr("comingLater")}</span><h3>${esc(tr(k))}</h3></div>`).join("")}</div></section><p class="fineprint">${tr("noPerm")}</p></div>`,"mode");
}

function avatarPicker(a){
 const t3=(es,en,de)=>({es,en,de})[lang()]||es;
 const hasPhoto=validPhoto(a.photoData);
 const items=avatarCatalog.map(v=>
  '<button type="button" class="aslo-avatar-choice '+(!hasPhoto&&(a.avatarId||"classic")===v.id?'selected':'')+
  '" data-pick-avatar="'+v.id+'" aria-pressed="'+(!hasPhoto&&(a.avatarId||"classic")===v.id)+'" aria-label="'+esc(avatarLabel(v))+'">'+
  avatarMarkup(v.id)+'<span>'+esc(avatarLabel(v))+'</span></button>').join("");
 return '<section class="aslo-avatar-settings" aria-labelledby="avatar-choose-title">'+
  '<h3 id="avatar-choose-title">'+t3("Tu personaje deportivo","Your sports character","Deine Sportfigur")+'</h3>'+
  '<p class="fineprint">'+t3("Elige un personaje para identificarte en tus distintos modos y deportes. No cambia tus permisos.","Choose a character for every mode and sport. It does not grant permissions.","Wähle eine Figur für alle Modi und Sportarten. Keine Berechtigungsänderung.")+'</p>'+
  '<div class="aslo-avatar-grid" role="group" aria-label="'+t3("Elegir avatar","Choose avatar","Avatar auswählen")+'">'+items+'</div>'+
  '<label class="aslo-photo-picker" for="profile-photo-upload">'+
   '<span class="aslo-photo-picker-icon" aria-hidden="true">▣</span><span><strong>'+
   t3("Usar una foto de perfil","Use a profile photo","Profilfoto verwenden")+'</strong><small>'+
   t3("JPG, PNG o WebP · foto solo para esta sesión de demostración","JPG, PNG or WebP · photo for this demo session only","JPG, PNG oder WebP · Foto nur für diese Demo-Sitzung")+'</small></span></label>'+
  '<input id="profile-photo-upload" class="aslo-photo-input" type="file" accept="image/jpeg,image/png,image/webp">'+
  (hasPhoto?'<button type="button" class="aslo-remove-photo" id="aslo-remove-photo">'+t3("Quitar foto y usar avatar","Remove photo and use avatar","Foto entfernen, Avatar verwenden")+'</button>':'')+
  '<p id="avatar-feedback" class="fineprint" role="status" aria-live="polite"></p></section>';
}

function settings(){
 if(!account()){location.replace("acceso.html");return}
 const qp=new URLSearchParams(location.search);let tab=qp.get("tab")||"perfil";if(!["perfil","seguridad","apariencia","idioma"].includes(tab))tab="perfil";
 const a=account();const tabs=[["perfil","profile"],["seguridad","security"],["apariencia","appearance"],["idioma","language"]];
 const pane=tab==="perfil"?`<span class="eyebrow">${tr("profile")}</span><h2>${tr("personalData")}</h2><p>${tr("profileDesc")}</p><div class="profile-preview">${avatarForAccount(a,"aslo-account-avatar--large")}<div><strong>${esc(a.name)}</strong><small>${tr("sessionMode")}: ${esc(role(activeMode())?.name||"")}</small></div></div><form id="profile-form"><label for="profile-name">${tr("displayName")}</label><input id="profile-name" required maxlength="40" value="${esc(a.name)}"><p class="fineprint">${tr("displayNameHelp")}</p><button type="submit" class="btn primary">${tr("save")}</button></form>${avatarPicker(a)}`:
 tab==="seguridad"?`<span class="eyebrow">${tr("security")}</span><h2>${tr("security")}</h2><p>${tr("securityIntro")}</p><div class="security-warning">${tr("securityWarning")}</div>${["changePassword","twoFactor","devices"].map(k=>`<div class="security-line"><div><strong>${tr(k)}</strong><p class="fineprint">${tr("disabledDemo")}</p></div><button type="button" disabled title="${tr("notReal")}">${tr("notAvailable")}</button></div>`).join("")}`:
 tab==="apariencia"?`<span class="eyebrow">${tr("appearance")}</span><h2>${tr("appearance")}</h2><p>${tr("themeIntro")}</p><fieldset class="pref-choices"><legend>${tr("theme")}</legend>${["light","dark","system"].map(v=>`<label class="pref-option"><input type="radio" name="theme" value="${v}" ${theme()===v?"checked":""}><span>${tr(v)}</span></label>`).join("")}</fieldset><p class="fineprint">${tr("changesSaved")}</p>`:
 `<span class="eyebrow">${tr("language")}</span><h2>${tr("language")}</h2><p>${tr("languageIntro")}</p><fieldset class="pref-choices"><legend>${tr("language")}</legend>${[["es","langName"],["en","langEn"],["de","langDe"]].map(([code,key])=>`<label class="pref-option"><input type="radio" name="language" value="${code}" ${lang()===code?"checked":""}><span>${tr(key)}</span></label>`).join("")}</fieldset><p class="fineprint">${tr("changesSaved")}</p>`;
 render(`<div class="shell settings-shell"><section class="pagehead"><div class="crumb"><a href="modos.html">${tr("modes")}</a> / ${tr("settings")}</div><span class="eyebrow">${tr("account")}</span><h1>${tr("accountHeading")}</h1><p class="intro">${tr("accountIntro")}</p></section><div class="settings-grid"><nav class="settings-tabs" aria-label="${tr("settings")}">${tabs.map(([id,key])=>`<a class="${tab===id?"selected":""}" href="cuenta.html?tab=${id}">${tr(key)} <span aria-hidden="true">›</span></a>`).join("")}</nav><section class="settings-main" id="settings-panel">${pane}<div id="pref-feedback" aria-live="polite"></div></section></div></div>`);

 document.querySelectorAll("[data-pick-avatar]").forEach(button=>button.addEventListener("click",()=>{
  if(!saveVisual({avatarId:button.dataset.pickAvatar,photoData:null}))return;
  settings();document.querySelector('[data-pick-avatar="'+button.dataset.pickAvatar+'"]')?.focus();
 }));
 const upload=document.querySelector("#profile-photo-upload");
 if(upload)upload.addEventListener("change",function(){
  const file=this.files?.[0];if(!file)return;
  const status=document.querySelector("#avatar-feedback");
  const tmsg=(es,en,de)=>({es,en,de})[lang()]||es;
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>5*1024*1024){
   status.textContent=tmsg("Elige una imagen JPG, PNG o WebP de menos de 5 MB.","Choose a JPG, PNG or WebP image under 5 MB.","Bitte ein JPG-, PNG- oder WebP-Bild unter 5 MB wählen.");this.value="";return;
  }
  status.textContent=tmsg("Preparando imagen…","Processing image…","Bild wird verarbeitet…");
  const reader=new FileReader();
  reader.onerror=()=>{status.textContent=tmsg("No se pudo abrir la imagen.","Could not read image.","Bild konnte nicht gelesen werden.")};
  reader.onload=()=>{
   const image=new Image();
   image.onerror=()=>{status.textContent=tmsg("Formato de imagen no compatible.","Unsupported image format.","Bildformat nicht unterstützt.")};
   image.onload=()=>{
    try{
     const canvas=document.createElement("canvas"),context=canvas.getContext("2d");
     if(!context)throw Error("Canvas unavailable");
     canvas.width=canvas.height=192;
     const side=Math.min(image.naturalWidth,image.naturalHeight),x=(image.naturalWidth-side)/2,y=(image.naturalHeight-side)/2;
     context.drawImage(image,x,y,side,side,0,0,192,192);
     const data=canvas.toDataURL("image/jpeg",.76);
     if(!validPhoto(data)||!saveVisual({photoData:data}))throw Error("Session storage unavailable");
     settings();
    }catch(e){status.textContent=tmsg("No se pudo guardar la foto en esta sesión.","Could not save this photo in the demo session.","Foto konnte in dieser Sitzung nicht gespeichert werden.")}
   };
   image.src=String(reader.result||"");
  };
  reader.readAsDataURL(file);
 });
 document.getElementById("aslo-remove-photo")?.addEventListener("click",()=>{
  if(saveVisual({photoData:null}))settings();
 });
 const form=document.querySelector("#profile-form");if(form)form.addEventListener("submit",e=>{e.preventDefault();const v=document.querySelector("#profile-name").value.trim();if(!v)return;const old=account();old.name=v;try{sessionStorage.setItem(ACCOUNT,JSON.stringify(old))}catch(e){}location.reload()});
 document.querySelectorAll('input[name="theme"]').forEach(r=>r.addEventListener("change",e=>{prefSet(THEME,e.target.value);applyPreferences();document.querySelector("#pref-feedback").textContent=tr("changesSaved")}));
 document.querySelectorAll('input[name="language"]').forEach(r=>r.addEventListener("change",e=>{prefSet(LANG,e.target.value);location.reload()}));
}
window.asloAuth={chrome,attachChrome,tr,lang,theme,getAccount:account,getMode:activeMode,logout,esc,avatarForAccount,avatarMarkup,avatarCatalog,saveVisual,selectLanguage(code){if(["es","en","de"].includes(code)){prefSet(LANG,code);return true}return false},selectTheme(value){if(["light","dark","system"].includes(value)){prefSet(THEME,value);applyPreferences();return true}return false}};
const page=document.body.dataset.page;
if(page==="acceso"||page==="registro")loginForm(page==="registro");
if(page==="modos")choose();
if(page==="modo")modePage();
if(page==="cuenta")settings();
})();