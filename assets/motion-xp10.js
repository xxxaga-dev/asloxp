/* ASLO XP / Motion system 10
 * Original, dependency-free choreography inspired by gaming motion principles:
 * scroll reveals, stagger, cinematic stage entrances, depth, hover energy,
 * live progress, button feedback and transitions. No data or authority changes.
 */
(function asloMotionSystem(){
"use strict";
var page=document.body.getAttribute("data-page");
if(!["organizador","liga-admin","mis-ligas","modos","modo"].includes(page))return;
var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)");
var fine=window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)");
var motionOff=()=>!!(reduced&&reduced.matches);
var pointerFine=()=>!!(fine&&fine.matches)&&!motionOff();
var root=document.querySelector(page==="organizador"?"#ow-app":page==="liga-admin"?"#league-arena":page==="mis-ligas"?"#aslo-league-directory":"body");
if(!root)return;
document.documentElement.classList.add("xp-motion-on");
var seen=new WeakSet(), counted=new WeakSet(), activeTilt=null;
var raf=0,scanRaf=0,routeTimer=0,lastKey=null;
var targets={
 organizador:".ow-hero,.ow-heading,.ow-overview-metrics .ow-metric,.ow-section-heading,.ow-shortcut,.ow-operation-shortcut,.ow-capability-card,.ow-toolbar,.ow-results-summary,.ow-table-wrap,.ow-mobile-result,.ow-empty,.ow-task-selection,.ow-pagination",
 "liga-admin":".arena-hero,.arena-tournament-hero,.arena-identity,.arena-block,.arena-tour-head-actions,.arena-tourney-group,.arena-league-sections,.arena-league-crumb,.arena-tour-content,.arena-league-section-body,.arena-stat,.arena-info-tile,.arena-tour-footer,.arena-match-banner,.arena-news-tile,.arena-sponsor,.arena-sidebar-foot",
 "mis-ligas":".lm-league-card,.lm-hero,.lm-intro,.lm-form,.lm-form-grid,.lm-actions,.lm-banner,.lm-directory-head,.lm-page-head",
 modos:".pagehead,.mode-tile,.other-modes,.account-bottom",
 modo:".pagehead,.mode-tile,.mode-workspace"
};
var tiltSelector=".ow-operation-shortcut,.ow-shortcut,.ow-capability-card,.ow-mobile-result,.ow-metric,.lm-league-card,.arena-info-tile,.arena-news-tile,.mode-tile";
var rippleSelector=".ow-btn,.ow-nav a,.ow-mobile-nav a,.ow-tourney-group button,.ow-shortcut,.ow-operation-shortcut,.ow-page-buttons button,.ow-task-result,.ow-find-task,.arena-action,.arena-tourney-group button,.arena-league-sections button,.lm-button,.mode-tile";
function make(tag,cls){var x=document.createElement(tag);x.className=cls;return x;}
function progress(){
 if(document.querySelector(".xp-scroll-progress"))return;
 var bar=make("div","xp-scroll-progress");
 bar.setAttribute("aria-hidden","true");bar.innerHTML='<span class="xp-scroll-progress-bar"></span>';
 document.body.appendChild(bar);
}
function scrollProgress(){
 var bar=document.querySelector(".xp-scroll-progress-bar");if(!bar)return;
 var range=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
 bar.style.transform="scaleX("+Math.max(0,Math.min(1,window.scrollY/range))+")";
}
function routeKey(){
 var url=new URL(window.location.href),s=url.searchParams;
 if(page==="organizador")return page+"|"+(s.get("vista")||"inicio")+"|"+(s.get("accion")||"");
 if(page==="liga-admin")return page+"|"+(s.get("liga")||"")+"|"+(s.get("vista")||"liga")+"|"+(s.get("torneo")||"")+"|"+(s.get("tab")||"")+"|"+(s.get("seccion")||"");
 if(page==="mis-ligas")return page+"|"+(s.get("editar")||"")+"|"+s.has("nueva");
 return page;
}
function stage(){
 if(motionOff())return;
 var existing=document.querySelector(".xp-stage-sweep");
 if(existing)existing.remove();
 var v=make("div","xp-stage-sweep");
 v.setAttribute("aria-hidden","true");
 v.innerHTML='<span class="xp-stage-laser"></span><span class="xp-stage-grid"></span>';
 document.body.appendChild(v);
 window.setTimeout(function(){v.remove();},780);
}
function routeUpdate(){
 var key=routeKey();
 if(lastKey!==null&&key!==lastKey){stage();}
 lastKey=key;
}
function decorateHero(){
 if(motionOff())return;
 root.querySelectorAll(".ow-hero,.arena-hero,.arena-tournament-hero,.arena-identity,.arena-match-banner").forEach(function(hero){
  if(hero.hasAttribute("data-xp-stage"))return;
  hero.setAttribute("data-xp-stage","");
  var visual=make("div","xp-hero-hud");
  visual.setAttribute("aria-hidden","true");
  visual.innerHTML='<span class="xp-hud-corner xp-hud-tl"></span><span class="xp-hud-corner xp-hud-tr"></span><span class="xp-hud-corner xp-hud-bl"></span><span class="xp-hud-corner xp-hud-br"></span><span class="xp-hud-radar"><span></span><span></span><span></span></span><span class="xp-hud-scan"></span><span class="xp-hud-topline">ASLO <i>◆</i> SPORTS EXPERIENCE</span><span class="xp-hud-bottomline">LIVE INTERFACE <i>◆</i> CONTROL / XP</span>';
  hero.appendChild(visual);
  // The decorative layer never contains accessible text or receives events.
 });
}
function scrollObserve(el,seq){
 if(seen.has(el))return;
 seen.add(el);
 if(motionOff())return;
 el.classList.add("xp-reveal");
 el.style.setProperty("--xp-sequence",Math.min(seq%6,5));
 if(intersector){intersector.observe(el);}
 else{requestAnimationFrame(function(){el.classList.add("xp-inview");onReveal(el)})}
}
function onReveal(el){
 if(el.hasAttribute("data-xp-count-animated"))return;
 if(el.classList.contains("ow-metric")||el.classList.contains("arena-stat")){
  var node=el.querySelector("strong");if(node)countUp(node);
 }
}
function countUp(node){
 if(counted.has(node)||motionOff())return;
 counted.add(node);
 var value=Number((node.textContent||"").trim());
 if(!Number.isInteger(value)||value<=0||value>9999)return;
 var original=node.textContent;
 node.setAttribute("aria-label",original);
 var start=performance.now(),duration=740;
 function frame(time){
  if(!node.isConnected)return;
  var ratio=Math.min(1,(time-start)/duration);
  var eased=1-Math.pow(1-ratio,3);
  node.textContent=String(Math.round(eased*value));
  if(ratio<1)requestAnimationFrame(frame);
  else node.textContent=original;
 }
 requestAnimationFrame(frame);
}
var intersector=!motionOff()&&"IntersectionObserver" in window?new IntersectionObserver(function(entries){
 entries.forEach(function(entry){
  if(!entry.isIntersecting)return;
  entry.target.classList.add("xp-inview");
  onReveal(entry.target);
  intersector.unobserve(entry.target);
 });
},{rootMargin:"0px 0px 65px 0px",threshold:.08}):null;
function scan(){
 scanRaf=0;
 routeUpdate();
 decorateHero();
 var items=root.querySelectorAll(targets[page]||"");
 var i=0;
 items.forEach(function(el){
  // Never conceal a modal's focus controls; overlays animate on their own.
  if(el.closest("dialog")&&!el.closest(".ow-task-results"))return;
  scrollObserve(el,i++);
 });
 if(page==="organizador")root.querySelectorAll(".ow-hero").forEach(hero=>{
  if(!hero.hasAttribute("data-xp-data"))hero.setAttribute("data-xp-data","ORGANIZER // DASHBOARD");
 });
 scrollProgress();
}
function scheduleScan(){if(!scanRaf)scanRaf=requestAnimationFrame(scan);}
function createRipple(el,event){
 if(motionOff()||event.button!==0)return;
 var rect=el.getBoundingClientRect(),point=make("span","xp-press-ripple");
 point.setAttribute("aria-hidden","true");
 var size=Math.max(rect.width,rect.height)*1.4;
 point.style.width=point.style.height=size+"px";
 point.style.left=(event.clientX-rect.left-size/2)+"px";
 point.style.top=(event.clientY-rect.top-size/2)+"px";
 el.classList.add("xp-click-surface");
 el.appendChild(point);
 point.addEventListener("animationend",function(){point.remove()},{once:true});
 window.setTimeout(function(){point.remove()},800);
}
var lastPointer=null;
function resetTilt(node){
 if(!node)return;
 node.style.removeProperty("--xp-rotate-x");
 node.style.removeProperty("--xp-rotate-y");
 node.style.removeProperty("--xp-pointer-x");
 node.style.removeProperty("--xp-pointer-y");
 node.classList.remove("xp-tilt-active");
}
function tickPointer(){
 raf=0;
 if(!lastPointer||!pointerFine())return;
 var event=lastPointer,el=event.target.closest(tiltSelector);
 if(activeTilt!==el){resetTilt(activeTilt);activeTilt=el;}
 if(!el)return;
 var r=el.getBoundingClientRect();
 if(!r.width||!r.height)return;
 var x=Math.max(0,Math.min(1,(event.clientX-r.left)/r.width));
 var y=Math.max(0,Math.min(1,(event.clientY-r.top)/r.height));
 el.classList.add("xp-tilt-active");
 el.style.setProperty("--xp-pointer-x",(x*100).toFixed(1)+"%");
 el.style.setProperty("--xp-pointer-y",(y*100).toFixed(1)+"%");
 el.style.setProperty("--xp-rotate-x",((.5-y)*4.8).toFixed(2)+"deg");
 el.style.setProperty("--xp-rotate-y",((x-.5)*5.4).toFixed(2)+"deg");
 var hero=event.target.closest(".ow-hero,.arena-hero,.arena-tournament-hero");
 if(hero){
  hero.style.setProperty("--xp-look-x",(x*100).toFixed(1)+"%");
  hero.style.setProperty("--xp-look-y",(y*100).toFixed(1)+"%");
 }
}
function setIntro(){
 if(motionOff())return;
 document.documentElement.classList.add("xp-boot");
 window.setTimeout(function(){document.documentElement.classList.remove("xp-boot")},850);
}
function addListeners(){
 document.addEventListener("pointerdown",function(e){
  var node=e.target.closest(rippleSelector);
  if(node&&!node.matches("[disabled],:disabled")&&e.pointerType!=="touch")createRipple(node,e);
 },{passive:true});
 document.addEventListener("pointermove",function(e){
  if(e.pointerType==="touch"||!pointerFine())return;
  lastPointer=e;
  if(!raf)raf=requestAnimationFrame(tickPointer);
 },{passive:true});
 document.addEventListener("pointerover",function(e){
  if(!pointerFine())return;
  var hero=e.target.closest(".ow-hero,.arena-hero,.arena-tournament-hero");
  if(hero)hero.classList.add("xp-hero-hover");
 },{passive:true});
 document.addEventListener("pointerout",function(e){
  if(!e.relatedTarget||!e.relatedTarget.closest)return;
  var oldHero=e.target.closest(".ow-hero,.arena-hero,.arena-tournament-hero");
  if(oldHero&&!oldHero.contains(e.relatedTarget))oldHero.classList.remove("xp-hero-hover");
  if(activeTilt&&!activeTilt.contains(e.relatedTarget)){resetTilt(activeTilt);activeTilt=null;}
 },{passive:true});
 window.addEventListener("scroll",function(){if(!progressRAF)progressRAF=requestAnimationFrame(function(){progressRAF=0;scrollProgress();})},{passive:true});
 window.addEventListener("resize",scrollProgress,{passive:true});
 window.addEventListener("blur",function(){resetTilt(activeTilt);activeTilt=null});
 if(reduced&&reduced.addEventListener)reduced.addEventListener("change",function(){if(reduced.matches){
  root.querySelectorAll(".xp-reveal").forEach(function(x){x.classList.add("xp-inview");x.style.removeProperty("--xp-sequence")});
  resetTilt(activeTilt);activeTilt=null;
 }});
}
var progressRAF=0;
progress();
setIntro();
scan();
addListeners();
if("MutationObserver" in window){
 var watch=new MutationObserver(scheduleScan);
 watch.observe(root,{subtree:true,childList:true});
 window.addEventListener("pagehide",function(){watch.disconnect();if(intersector)intersector.disconnect()},{once:true});
}
})();