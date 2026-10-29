/* ASLO organizer / Configuration for the shared application layout.
   This mode supplies its own navigation only; shared shell owns all chrome. */
(function(){
"use strict";
const shell=window.asloShell;
if(!shell)return;
const nav=(key,label,icon)=>({key,label,icon,href:"organizador.html?vista="+encodeURIComponent(key)});
const groups=[
 {title:"ORGANIZADOR",items:[
  nav("inicio","Inicio","⌂"),nav("ligas","Mis ligas","⬡"),nav("torneos","Torneos","▦")]},
 {title:"OPERACIÓN",items:[
  nav("agenda","Agenda y jornadas","▤"),nav("solicitudes","Solicitudes y avisos","✉"),nav("recursos","Jueces y escenarios","♧")]},
 {title:"SEGUIMIENTO",items:[
  nav("resultados","Resultados","◉"),nav("comunicaciones","Comunicaciones","◈")]}
];
shell.mount({
 host:"ow-app",modeId:"organizador",title:"Espacio del organizador",
 brandHref:"organizador.html?vista=inicio",search:true,groups,
 bottom:[
  {...groups[0].items[0],short:"Inicio"},
  {...groups[0].items[2],short:"Torneos"},
  {...groups[1].items[0],short:"Agenda"}],
 moreText:"Más",bodyId:"ow-content",
 initialContent:'<div class="ow-initial">Preparando el espacio del organizador…</div>',
 sideActions:'<a href="mis-ligas.html?nueva=1">＋ Crear liga</a>'
});
})();