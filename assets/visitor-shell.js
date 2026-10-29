/* ASLO / Public visitor experience on the APPROVED shared layout.
   A visitor never needs an account to browse public sample information.
   This script replaces only the old public chrome, not page content or rules. */
(function(){
"use strict";
const shell=window.asloShell,auth=window.asloAuth;
if(!shell||!auth)return;
const tr=(es,en,de)=>({es,en,de})[auth.lang?.()||"es"]||es;
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const links=[
 {key:"inicio",href:"index.html",icon:"⌂",name:["Inicio","Home","Start"],short:["Inicio","Home","Start"]},
 {key:"ligas",href:"ligas.html",icon:"⬡",name:["Ligas","Leagues","Ligen"],short:["Ligas","Leagues","Ligen"]},
 {key:"torneos",href:"torneos.html",icon:"▦",name:["Torneos","Tournaments","Turniere"],short:["Torneos","Tournaments","Turniere"]},
 {key:"resultados",href:"resultados.html",icon:"◉",name:["Resultados","Results","Ergebnisse"],short:["Resultados","Results","Ergebnisse"]}
];
const languages=["es","en","de"];
function locale(label){const idx=Math.max(0,languages.indexOf(auth.lang?.()||"es"));return label[idx]||label[0]}
const sportNames=[
 ["all","✦","Todos","All","Alle"],["futbol","⚽","Fútbol","Football","Fußball"],
 ["baloncesto","🏀","Baloncesto","Basketball","Basketball"],
 ["voleibol","🏐","Voleibol","Volleyball","Volleyball"],
 ["tenis","🎾","Tenis","Tennis","Tennis"],
 ["ciclismo","🚴","Ciclismo","Cycling","Radsport"],
 ["atletismo","🏃","Atletismo","Athletics","Leichtathletik"],
 ["natacion","🏊","Natación","Swimming","Schwimmen"]
];
const activeFor={inicio:"inicio",ligas:"ligas",liga:"ligas",torneos:"torneos",torneo:"torneos",resultados:"resultados"};
let active="inicio";
function readSport(){try{return sessionStorage.getItem("asloxp-demo-sport")||"all"}catch(e){return "all"}}
function navItem(link){return {...link,label:locale(link.name),short:locale(link.short),active:link.key===active}}
function searchDialog(){
 if(document.getElementById("ow-task-dialog"))return;
 const dlg=document.createElement("dialog");
 dlg.className="ow-task-dialog aslo-public-search-dialog";dlg.id="ow-task-dialog";
 dlg.setAttribute("aria-labelledby","aslo-visitor-search-heading");
 dlg.innerHTML='<div class="ow-task-dialog-head"><div><span class="ow-eyebrow">'+
  tr("EXPLORACIÓN PÚBLICA","PUBLIC EXPLORATION","ÖFFENTLICHE SUCHE")+
  '</span><h2 id="aslo-visitor-search-heading">'+tr("¿Qué quieres encontrar?","What would you like to find?","Was möchtest du finden?")+
  '</h2></div><button type="button" class="ow-task-close" id="aslo-public-search-close" aria-label="'+tr("Cerrar","Close","Schließen")+'">×</button></div>'+
  '<label class="ow-task-search-label" for="aslo-visitor-search">'+tr("Buscar en información pública","Search public information","Öffentliche Informationen suchen")+'</label>'+
  '<input type="search" id="aslo-visitor-search" autocomplete="off" placeholder="'+tr("Ligas, torneos, resultados, noticias…","Leagues, tournaments, results, news…","Ligen, Turniere, Ergebnisse, Nachrichten…")+'">'+
  '<div class="ow-task-results" id="aslo-visitor-search-links" aria-live="polite"></div>'+
  '<p class="ow-task-foot">'+tr("Las noticias, partidos y torneos mostrados son ejemplos del prototipo.","The displayed stories and competitions are demo examples.","Meldungen und Wettbewerbe sind Demobeispiele.")+'</p>';
 document.body.appendChild(dlg);
 dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
 const input=dlg.querySelector("#aslo-visitor-search");
 const results=dlg.querySelector("#aslo-visitor-search-links");
 function list(){
  const q=input.value.trim(),norm=x=>String(x).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const filtered=links.filter(x=>!q||norm([...x.name].join(" ")).includes(norm(q))||norm(x.key).includes(norm(q)));
  results.innerHTML=(filtered.length?filtered:links).map(x=>'<a class="ow-task-result" href="'+escape(x.href)+(q&&x.key==="ligas"?"?buscar="+encodeURIComponent(q):"")+'"><span class="ow-task-dot" aria-hidden="true">'+x.icon+'</span><span><strong>'+escape(locale(x.name))+'</strong><small>'+tr("Consultar información pública","Browse public information","Öffentliche Informationen ansehen")+'</small></span><span class="ow-task-arrow" aria-hidden="true">→</span></a>').join("");
  if(active==="inicio"){
   // Keep the existing local news filter working without a parallel search engine.
   const current=document.getElementById("v4-search");
   if(current){current.value=q;current.dispatchEvent(new Event("input",{bubbles:true}))}
  }
 }
 input.addEventListener("input",list);
 dlg.querySelector("#aslo-public-search-close")?.addEventListener("click",()=>dlg.close());
 const button=document.getElementById("ow-find-task");
 button?.addEventListener("click",()=>{list();dlg.showModal();input.focus()});
 document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"&&!e.repeat){e.preventDefault();if(dlg.open)dlg.close();else{list();dlg.showModal();input.focus()}}});
 list();
}
function publicControls(){
 const drawer=document.querySelector("#ow-mobile-drawer");if(!drawer)return;
 const nav=drawer.querySelector(".ow-drawer-links");
 if(!nav)return;
 const controls=document.createElement("div");
 controls.className="aslo-visitor-drawer-controls";
 const selected=readSport();
 controls.innerHTML='<label for="aslo-public-sport">'+tr("Filtrar contenido público por deporte","Filter public content by sport","Öffentliche Inhalte nach Sport filtern")+
 '</label><select id="aslo-public-sport">'+sportNames.map(a=>'<option value="'+a[0]+'"'+(selected===a[0]?' selected':'')+'>'+a[1]+' '+escape(locale(a.slice(2)))+'</option>').join("")+'</select>'+
 '<p>'+tr("Seleccionar un deporte no requiere una cuenta.","Choosing a sport does not require an account.","Eine Sportart auswählen erfordert kein Konto.")+'</p>';
 nav.after(controls);
 controls.querySelector("select").addEventListener("change",e=>{
  try{sessionStorage.setItem("asloxp-demo-sport",e.target.value)}catch(err){}
  location.reload();
 });
}
function attach(){
 const drawer=document.getElementById("ow-mobile-drawer"),veil=document.getElementById("ow-drawer-backdrop"),button=document.getElementById("ow-mobile-more"),close=document.getElementById("ow-drawer-close");
 const closeMenu=()=>{
  if(!drawer||!veil||!button)return;
  drawer.hidden=true;veil.hidden=true;button.setAttribute("aria-expanded","false");
 };
 const toggle=()=>{
  const opening=drawer.hidden;drawer.hidden=!opening;veil.hidden=!opening;
  button.setAttribute("aria-expanded",String(opening));
  if(opening)drawer.querySelector("a")?.focus();
  else button.focus();
 };
 button?.addEventListener("click",toggle);
 close?.addEventListener("click",()=>{closeMenu();button.focus()});
 veil?.addEventListener("click",closeMenu);
 drawer?.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!drawer.hidden){closeMenu();button.focus()}});
}
function render(content,page){
 active=activeFor[page]||"inicio";
 const all=links.map(navItem);
 const groups=[
  {title:tr("EXPLORAR","EXPLORE","ENTDECKEN"),items:all}
 ];
 // Three frequent public sections + Más. The remaining section stays in the drawer.
 shell.mount({
  host:document.body,modeId:"visitante",title:tr("Exploración pública","Public exploration","Öffentlicher Bereich"),
  brandHref:"index.html",groups,search:true,
  bottom:[all[0],all[2],all[3]],
  moreText:tr("Más","More","Mehr"),
  demoText:tr("PROTOTIPO · DATOS PÚBLICOS FICTICIOS","PROTOTYPE · PUBLIC SAMPLE DATA","PROTOTYP · ÖFFENTLICHE BEISPIELDATEN"),
  bodyId:"aslo-public-content",initialContent:content
 });
 document.body.dataset.publicShell="1";
 document.body.classList.add("aslo-visitor-layout","v4-visitor");
 // mount() installs the generic drawer for non-organizer modes.
 publicControls();
 searchDialog();
 window.asloAccountMenu?.mount();
 // Explicitly no gate, sign-in redirect or role check for public browsing.
 document.querySelectorAll(".ow-nav a,.ow-mobile-nav a,.ow-drawer-links a").forEach(a=>{
  const on=a.dataset.view===active;
  a.classList.toggle("is-active",on);
  if(on)a.setAttribute("aria-current","page");
  else a.removeAttribute("aria-current");
 });
}
window.asloVisitorShell={render,publicControls,searchDialog};
})();