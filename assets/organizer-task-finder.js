/* ASLO organizer task finder. Searches documented capabilities, then selects the correct
   organizational scope. The palette never elevates permissions or implies backend actions. */
(function(){
"use strict";
var dialog=document.getElementById("ow-task-dialog"),search=document.getElementById("ow-task-search");
if(!dialog||!search)return;
var items=[
 ["Información general","liga","general","nombre,datos generales,identidad,ubicación"],
 ["Categorías y participación","liga","participacion","edad,rangos,territorio,elegibilidad"],
 ["Reglamentos y versiones","liga","reglas","normas,reglas,versionar,publicar nueva versión"],
 ["Administradores y asistentes","liga","responsables","permisos,invitar,aceptar,retirar,autoridad"],
 ["Noticias de una liga","liga","noticias","publicaciones,comunicados,comunidad"],
 ["Reconocimiento y ranking ASLO","liga","reconocimiento","verificación,puntuación,validación,reputación"],
 ["Cupos e inscripciones","torneo","inscripciones","invitar equipos,cupos,participantes,inscribir"],
 ["Reemplazar equipo","torneo","inscripciones","sustituciones,baja,abandono,heredar puntos,equipos"],
 ["Fases, grupos y cruces","torneo","fases","eliminatorias,sorteos,clasificar,fase,cierre de fase"],
 ["Competiciones interligas","torneo","interligas","ligas participantes,clasificación interligas"],
 ["Calendario y jornadas","torneo","partidos","programación,partidos,fechas,programar,suspender jornada"],
 ["Solicitudes de reprogramación","torneo","solicitudes","posponer,cambio de horario,avisos"],
 ["Árbitros y escuelas","torneo","oficiales","juez,designación,escuela,central,puestos,sustitución de juez"],
 ["Sedes y franjas","torneo","escenarios","cancha,escenario,disponibilidad,reserva,franja,bloqueos"],
 ["Planillas y actas","torneo","planillas","firmas,registro,sincronización,hechos,marcador"],
 ["Clasificaciones y resultados","torneo","clasificacion","tabla,posiciones,partidos,ganador,marcador"],
 ["Sanciones y decisiones","torneo","disciplina","disciplina,incomparecencia,reclamaciones,victoria administrativa"],
 ["Premiación del torneo","torneo","premios","premios,trofeos,cambiar premio,noticia"],
 ["Noticias del torneo","torneo","noticias","publicaciones,comunicados,partido,comunidad"],
 ["Suspensión y cierre de torneo","torneo","cierre","cancelación,reactivar,finalizar,campeón,inactividad"],
 ["Mis ligas","vista","ligas","ver,buscar,administrar,crear,configurar"],
 ["Mis torneos","vista","torneos","ver,buscar,filtrar,competición"],
 ["Agenda de todas las competiciones","vista","agenda","calendario,jornadas,partidos,programación"],
 ["Bandeja de solicitudes y avisos","vista","solicitudes","reprogramación,notificaciones,bloqueos"],
 ["Coordinación arbitral y escenarios","vista","recursos","escuelas,jueces,reservas,servicios"],
 ["Consultar resultados","vista","resultados","clasificación,tablas,planilla"],
 ["Comunicaciones y patrocinios","vista","comunicaciones","noticias,publicaciones,premios,publicidad"]
];
var ES=["Liga","Torneo","Organizador"],EN=["League","Tournament","Organizer"],DE=["Liga","Turnier","Organisator"];
function lang(){return window.asloAuth?.lang?.()||"es"}
function norm(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase()}
function escape(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function href(item){
 if(item[1]==="vista")return "organizador.html?vista="+item[2];
 return "organizador.html?vista="+(item[1]==="liga"?"ligas":"torneos")+"&accion="+encodeURIComponent(item[2]);
}
function open(){
 if(!dialog.open){dialog.showModal();search.value="";render();setTimeout(()=>search.focus(),0);}
}
function close(){if(dialog.open)dialog.close()}
function render(){
 var q=norm(search.value.trim());var matched=items.filter(x=>norm(x[0]+" "+x[3]).includes(q)).slice(0,20);
 document.getElementById("ow-task-results").innerHTML=matched.map(function(x){
  var names=lang()==="en"?EN:lang()==="de"?DE:ES;
  var scope=names[x[1]==="liga"?0:x[1]==="torneo"?1:2];
  return '<a class="ow-task-result" href="'+href(x)+'"><span class="ow-task-dot" aria-hidden="true">↗</span><span><strong>'+escape(x[0])+'</strong><small>'+escape(scope)+(x[1]!=="vista"?" · "+(lang()==="es"?"Selecciona el ámbito":"Select a scope"):"")+'</small></span><span class="ow-task-arrow" aria-hidden="true">→</span></a>'
 }).join("")||'<p class="ow-task-empty">'+(lang()==="es"?"No se encontró una función con ese término.":"No matching task.")+'</p>';
}
document.getElementById("ow-find-task")?.addEventListener("click",open);
document.getElementById("ow-task-close")?.addEventListener("click",close);
search.addEventListener("input",render);
search.addEventListener("keydown",e=>{
 if(e.key==="Enter"){
  var first=document.querySelector("#ow-task-results a");if(first){e.preventDefault();first.click();}
 }
});
document.addEventListener("keydown",e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();dialog.open?close():open();}
});
dialog.addEventListener("click",e=>{if(e.target===dialog)close()});
render();
})();