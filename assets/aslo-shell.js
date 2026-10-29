/* ASLO / Shared application shell v1 — common structural layout contract.
   A mode provides labels and sections; the shell owns header, account slot,
   desktop sidebar, bottom navigation, mobile drawer and responsive landmarks.
   Sections are navigation targets, never new permissions or features. */
(function(){
"use strict";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function row(item,cls){
 const href=esc(item.href||"#");
 const iv=esc(item.key||"");
 return '<a class="'+(cls||"")+(item.active?' is-active':'')+'" href="'+href+'" data-view="'+iv+'"'+(item.active?' aria-current="page"':'')+'>'+
 '<span class="aslo-nav-symbol" aria-hidden="true">'+(item.icon||"◈")+'</span>'+
 '<span class="aslo-nav-caption">'+esc(item.short||item.label)+'</span></a>';
}
function side(item){
 return '<a href="'+esc(item.href||"#")+'" data-view="'+esc(item.key||"")+'">'+
 '<span class="ow-icon" aria-hidden="true">'+(item.icon||"◈")+'</span><span>'+esc(item.label)+'</span></a>';
}
function drawerLink(item){
 return '<a href="'+esc(item.href||"#")+'" data-view="'+esc(item.key||"")+'">'+
 '<span class="aslo-drawer-symbol" aria-hidden="true">'+(item.icon||"◈")+'</span>'+
 '<span>'+esc(item.label)+'</span></a>';
}
function render(options){
 const o=options||{},groups=Array.isArray(o.groups)?o.groups:[],all=groups.flatMap(g=>g.items||[]);
 const bottom=(o.bottom||all.slice(0,3)).slice(0,3);
 const title=esc(o.title||"ASLO"),home=esc(o.brandHref||"index.html");
 const text=o.moreText||"Más";
 const sideHtml=groups.map(g=>'<section class="ow-nav-group"><h2 class="ow-sidelabel">'+esc(g.title||"")+'</h2>'+
 '<nav class="ow-nav" aria-label="'+esc(g.title||title)+'">'+(g.items||[]).map(side).join("")+'</nav></section>').join("");
 const quick=o.search?'<button type="button" id="ow-find-task" class="ow-find-task" aria-haspopup="dialog" aria-controls="ow-task-dialog"><span class="aslo-search-symbol" aria-hidden="true">⌕</span><span>Buscar función</span><kbd>Ctrl K</kbd></button>':'';
 const badge=o.demoText||"PROTOTIPO · DATOS DE MUESTRA";
 const extra=o.sideActions||"";
 const bodyId=esc(o.bodyId||"ow-content");
 const contents=o.initialContent||"";
 const mainAttrs=o.modeId?' data-aslo-mode="'+esc(o.modeId)+'"':"";
 return '<header class="ow-top aslo-shell-header"'+mainAttrs+'>'+
 '<a href="'+home+'" class="ow-brand"><span aria-hidden="true">▲</span> ASLO</a>'+
 '<span class="ow-top-division" aria-hidden="true"></span><span class="ow-workspace-title">'+title+'</span>'+quick+
 '<span class="ow-demo">'+esc(badge)+'</span>'+
 '<div id="aslo-account-slot" class="aslo-account-slot"></div></header>'+
 '<div class="ow-shell aslo-shell-frame"><aside class="ow-sidebar aslo-shell-sidebar" aria-label="'+title+'">'+
 '<div class="ow-nav-groups">'+sideHtml+'</div>'+
 (extra?'<div class="ow-sidebottom">'+extra+'</div>':'')+
 '</aside><main class="ow-main aslo-shell-main" id="ow-main" tabindex="-1">'+
 '<div id="'+bodyId+'" aria-live="off">'+contents+'</div></main></div>'+
 '<nav class="ow-mobile-nav aslo-shell-mobile-nav" aria-label="'+title+'">'+
 bottom.map(x=>row(x)).join("")+
 '<button type="button" class="ow-mobile-more" id="ow-mobile-more" aria-expanded="false" aria-controls="ow-mobile-drawer"><span class="aslo-nav-symbol" aria-hidden="true">☰</span><span class="aslo-nav-caption">'+esc(text)+'</span></button></nav>'+
 '<div class="ow-drawer-backdrop" id="ow-drawer-backdrop" hidden></div>'+
 '<aside class="ow-mobile-drawer" id="ow-mobile-drawer" aria-label="'+title+'" hidden>'+
 '<div class="ow-drawer-heading"><strong>'+title+'</strong><button type="button" id="ow-drawer-close" aria-label="Cerrar menú">×</button></div>'+
 '<nav class="ow-drawer-links" aria-label="'+title+'">'+all.map(drawerLink).join("")+'</nav></aside>';
}
function mount(config){
 const host=typeof config.host==="string"?document.getElementById(config.host):config.host;
 if(!host)throw Error("ASLO shell mount point not found");
 host.innerHTML=render(config);
 host.dataset.asloShell="v1";
 if(config.modeId&&config.modeId!=="organizador")attachGenericNavigation(host);
 return host;
}
function attachGenericNavigation(host){
 const drawer=host.querySelector("#ow-mobile-drawer"),veil=host.querySelector("#ow-drawer-backdrop"),
 button=host.querySelector("#ow-mobile-more"),close=host.querySelector("#ow-drawer-close");
 const toggle=open=>{
  if(!drawer||!veil||!button)return;
  drawer.hidden=!open;veil.hidden=!open;button.setAttribute("aria-expanded",String(open));
  if(open)drawer.querySelector("a")?.focus();
  else if(drawer.contains(document.activeElement))button.focus();
 };
 button?.addEventListener("click",()=>toggle(drawer.hidden));
 close?.addEventListener("click",()=>toggle(false));
 veil?.addEventListener("click",()=>toggle(false));
 drawer?.addEventListener("click",e=>{if(e.target.closest("a"))toggle(false)});
 host.addEventListener("click",e=>{
  const a=e.target.closest(".ow-nav a,.ow-mobile-nav a,.ow-drawer-links a");
  if(!a)return;
  host.querySelectorAll(".ow-nav a,.ow-mobile-nav a,.ow-drawer-links a").forEach(link=>{
   const active=link.dataset.view===a.dataset.view;
   link.classList.toggle("is-active",active);
   if(active)link.setAttribute("aria-current","page");
   else link.removeAttribute("aria-current");
  });
 });
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!drawer.hidden)toggle(false)});
}
window.asloShell={render,mount};
})();