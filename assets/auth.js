(function authApp(){
"use strict";
const KEY="asloxp-demo-account", MODE="asloxp-demo-mode";
const roleData=[
["aficionado","Aficionado","♡","Sigue ligas, jugadores y equipos.",["Mis favoritos","Noticias","Actividades"]],
["jugador","Jugador","⚽","Tu experiencia como deportista.",["Próximos partidos","Mis equipos","Trayectoria"]],
["equipo","Equipo","⬡","Gestiona el equipo al que representas.",["Gaelian FC","Participantes","Competiciones"]],
["organizador","Organizador","🏆","Gestiona una liga bajo tu responsabilidad.",["Liga Metropolitana Amateur","Torneos","Programación"]],
["juez","Juez","◇","Tu actividad como juez deportivo.",["Mis encuentros","Mi trayectoria","Informes"]],
["planillador","Planillador","▤","Registra los encuentros asignados.",["Planillas","Encuentros","Registros"]],
["asistente","Asistente de liga","◈","Apoya la operación de una liga.",["Encuentros","Resultados","Programación"]],
["academia","Academia o club","⌂","Administra los equipos de una academia.",["Equipos","Entrenadores","Entrenamientos"]],
["entrenador","Entrenador","✧","Ejercita tu rol profesional.",["Perfil","Equipos vinculados","Participantes"]],
["escuela","Escuela de jueces","♧","Coordina su actividad institucional.",["Jueces","Ligas","Actividad"]],
["escenario","Escenario deportivo","⌖","Administra las instalaciones deportivas.",["Instalaciones","Autorizaciones","Reservas"]],
["patrocinador","Patrocinador","✦","Solo para patrocinadores verificados.",["Misiones","Premios","Campañas"]],
["responsable","Adulto responsable","⚑","Supervisa la actividad de menores.",["Cuentas supervisadas","Autorizaciones","Controles"]],
["aslo","Personal ASLO","◉","Operación interna de ASLO.",["Verificación","Soporte","Integridad"]]
];
const roles=roleData.map(a=>({id:a[0],name:a[1],icon:a[2],desc:a[3],parts:a[4]}));
const DEMO=["aficionado","jugador","equipo","organizador","juez"];
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function getAccount(){try{const a=JSON.parse(sessionStorage.getItem(KEY)||"null");return a&&typeof a.name==="string"&&Array.isArray(a.roles)?a:null}catch(e){return null}}
function getMode(){const a=getAccount();if(!a)return null;let id=null;try{id=sessionStorage.getItem(MODE)}catch(e){}return a.roles.includes(id)?id:a.roles[0]}
function chrome(inner,nav=""){
 const a=getAccount(),id=getMode(),role=roles.find(x=>x.id===id);
 const buttons=a?`<a class="userlink" href="modos.html"><span class="dot"></span>${esc(role?role.name:"Mi cuenta")} <span class="switch-label">⇄ Cambiar modo</span></a>`:`<a class="loginlink" href="acceso.html">Iniciar sesión</a><a class="registerlink" href="registro.html">Crear cuenta</a>`;
 const head=`<header class="sitehead"><div class="shell headrow"><a class="brand" href="index.html">aslo<i>XP</i></a><nav class="publicnav" aria-label="Sección pública"><a class="${nav==="inicio"?"sel":""}" href="index.html">Inicio</a><a class="${nav==="ligas"?"sel":""}" href="ligas.html">Ligas</a></nav><div class="account-actions">${buttons}</div></div></header>`;
 return head+`<div class="notice"><div class="shell"><b>PROTOTIPO UX</b> · Datos ficticios · ${a?"Cuenta de demostración, sin inicio de sesión real.":"Visitante: información pública."}</div></div><main>${inner}</main><footer class="foot"><div class="shell"><b>asloXP</b> · Experiencia en revisión · No se guardan contraseñas ni se aplican permisos reales.</div></footer>`;
}
function show(html){document.body.innerHTML=chrome(html)}
function enter(a){try{sessionStorage.setItem(KEY,JSON.stringify(a));sessionStorage.setItem(MODE,a.roles[0])}catch(e){}location.assign("modos.html")}
function signout(){try{sessionStorage.removeItem(KEY);sessionStorage.removeItem(MODE)}catch(e){}location.assign("index.html")}
function loginPage(register){
 show(`<div class="auth-layout shell"><section class="auth-pitch"><span class="eyebrow">UNA CUENTA · VARIOS MODOS</span><h1>${register?"Empieza tu experiencia.":"Bienvenido de nuevo."}</h1><p>Sin registrarte puedes ver ligas, partidos y noticias. Cuando entras en tu cuenta puedes cambiar entre los modos que tienes habilitados.</p><a class="link" href="index.html">← Seguir como visitante</a><div class="auth-illustration"><span class="role-illus">⚽</span><span class="role-illus">🏆</span><span class="role-illus">◇</span><p>Cada modo muestra solamente sus funciones.</p></div></section><section class="auth-panel"><span class="eyebrow">${register?"REGISTRO":"ACCESO"}</span><h2>${register?"Crear cuenta":"Ingresar a asloXP"}</h2><p class="fineprint">Simulación: no ingreses información personal ni contraseñas reales.</p><form id="demo-form">${register?`<label for="demo-name">Nombre ficticio</label><input id="demo-name" required maxlength="40" autocomplete="off" placeholder="Ejemplo: Valeria">`:""}<label for="demo-email">Correo de ejemplo</label><input id="demo-email" type="email" required autocomplete="off" placeholder="demo@ejemplo.test"><label for="demo-pass">Contraseña de ejemplo</label><input id="demo-pass" type="password" required autocomplete="off" minlength="4" placeholder="••••••••"><button class="btn primary full" type="submit">${register?"Crear cuenta (simulado)":"Iniciar sesión (simulado)"} →</button></form>${register?"":`<div class="or">o</div><button id="demo-login" type="button" class="btn full demo-button">Entrar con cuenta de prueba multirol</button>`}<p class="fineprint">${register?'Al registrarte, solo tendrás el modo aficionado hasta obtener otras vinculaciones.':'¿No tienes una cuenta? <a class="link" href="registro.html">Regístrate</a>'}</p>${register?'<p class="fineprint">¿Ya tienes cuenta? <a class="link" href="acceso.html">Inicia sesión</a></p>':""}</section></div>`);
 document.querySelector("#demo-form").addEventListener("submit",e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;const name=register?document.querySelector("#demo-name").value.trim():"Cuenta de demostración";enter(register?{name:name||"Cuenta nueva",roles:["aficionado"]}:{name,roles:DEMO})});
 const btn=document.querySelector("#demo-login");if(btn)btn.addEventListener("click",()=>enter({name:"Cuenta de ejemplo",roles:DEMO}));
}
function chooser(){
 const a=getAccount();if(!a){location.replace("acceso.html");return}
 const enabled=roles.filter(x=>a.roles.includes(x.id));
 const waiting=roles.filter(x=>!a.roles.includes(x.id));
 show(`<div class="shell modes-view"><div class="pagehead"><div class="crumb"><a href="index.html">Inicio público</a> / Mi cuenta</div><span class="eyebrow">CUENTA DE DEMOSTRACIÓN</span><h1>¿En qué modo quieres entrar?</h1><p class="intro">Hola, <strong>${esc(a.name)}</strong>. Una misma cuenta puede usar varios modos, pero solo tendrá disponibles los que le correspondan.</p></div><h2>Mis modos disponibles</h2><div class="mode-grid">${enabled.map(x=>`<a class="mode-tile" data-mode="${x.id}" href="modo.html?modo=${x.id}"><span class="mode-icon">${x.icon}</span><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><span class="link">Entrar al modo →</span></a>`).join("")}</div><section class="other-modes"><h2>Otros modos que existen en ASLO</h2><p>Estos no están habilitados para esta cuenta de prueba. Dependen de una vinculación, función o verificación correspondiente.</p><div class="role-tags">${waiting.map(x=>`<span class="role-tag" title="${esc(x.desc)}">${x.icon} ${esc(x.name)} <small>· Sin habilitar</small></span>`).join("")}</div></section><div class="account-bottom"><a class="btn" href="index.html">Consultar información pública</a><button type="button" id="sign-out" class="btn">Cerrar sesión de prueba</button></div></div>`);
 document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>{try{sessionStorage.setItem(MODE,el.dataset.mode)}catch(e){}}));document.querySelector("#sign-out").addEventListener("click",signout);
}
function contextPage(){
 const a=getAccount();if(!a){location.replace("acceso.html");return}
 const query=new URLSearchParams(location.search),id=query.get("modo")||getMode();
 const role=roles.find(x=>x.id===id);
 if(!role||!a.roles.includes(id)){location.replace("modos.html");return}
 try{sessionStorage.setItem(MODE,id)}catch(e){}
 const extra={equipo:"Estás actuando en nombre de Gaelian FC.",organizador:"Estás actuando en nombre de Liga Metropolitana Amateur.",jugador:"Aquí ves tu actividad de jugador, no las herramientas de tu equipo.",juez:"Aquí ves tu actividad arbitral."};
 show(`<div class="shell modeview"><div class="pagehead"><div class="crumb"><a href="modos.html">Cambiar modo</a> / ${esc(role.name)}</div><span class="eyebrow">MODO ACTIVO</span><h1>${role.icon} ${esc(role.name)}</h1><p class="intro">${esc(extra[id]||role.desc)}</p><a class="btn primary" href="modos.html">⇄ Cambiar de modo</a><a class="btn" href="index.html">Explorar ligas y noticias</a></div><section class="mode-workspace"><h2>Tu espacio de ${esc(role.name.toLowerCase())}</h2><p>Esta primera iteración comprueba cómo se entra y se cambia de modo. Las funcionalidades específicas se diseñarán por partes y solo después de revisar este recorrido.</p><div class="mode-grid mode-promises">${role.parts.map(x=>`<div class="mode-tile preview-tile"><span class="chip">Más adelante</span><h3>${esc(x)}</h3><p>Esta funcionalidad aún no forma parte de la demostración.</p></div>`).join("")}</div></section><div class="account-bottom"><p class="fineprint">Sin autenticación ni permisos reales.</p><button id="sign-out" class="btn" type="button">Cerrar sesión de prueba</button></div></div>`);
 document.querySelector("#sign-out").addEventListener("click",signout);
}
window.asloAuth={chrome,getAccount,getMode};
const page=document.body.dataset.page;
if(page==="acceso")loginPage(false);
if(page==="registro")loginPage(true);
if(page==="modos")chooser();
if(page==="modo")contextPage();
})();