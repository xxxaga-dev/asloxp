/* ASLO visual evolution v6. Original, dependency-free, accessible progressive enhancement.
   Uses existing fictional fixtures already rendered by visitor-v4.js, never adds fake live feeds. */
(function(){
"use strict";
var reduce=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var fine=!!(window.matchMedia&&window.matchMedia("(pointer:fine) and (hover:hover)").matches);
var wait=0, observed=new WeakSet();
function lang(){
 try{return window.asloAuth&&window.asloAuth.lang&&window.asloAuth.lang()||"es"}
 catch(e){return "es"}
}
function t(es,en,de){return ({es:es,en:en,de:de})[lang()]||es}
function content(node,selector){var el=node&&node.querySelector(selector);return el?el.textContent.trim():""}
function mk(tag,classes,value){
 var el=document.createElement(tag);
 if(classes)el.className=classes;
 if(value!==undefined)el.textContent=value;
 return el;
}
function sourceMatches(root){
 return Array.prototype.slice.call(root.querySelectorAll(".v4-match-block .v4-match")).map(function(a){
  var league=content(a,".v4-match-meta span");
  var team=Array.prototype.slice.call(a.querySelectorAll(".v4-match-body b"));
  return {league:league,a:team[0]?team[0].textContent.trim():"",b:team[1]?team[1].textContent.trim():"",score:content(a,".v4-match-body strong"),clock:content(a,".v4-match-meta small"),url:a.getAttribute("href")||"resultados.html"};
 }).filter(function(item){return item.a&&item.b});
}
function makePulse(root){
 if(root.querySelector(".aslo-v6-signal"))return;
 var main=root.querySelector(".v4-main-grid"),sponsor=root.querySelector(".v4-sponsor-zone");
 if(!main||!sponsor)return;
 var matches=sourceMatches(root);
 if(!matches.length)return;
 var section=mk("section","aslo-v6-signal");
 section.setAttribute("aria-label",t("Radar de partidos de demostración","Demo match radar","Demo-Spielradar"));
 var head=mk("div","aslo-v6-signal-head");
 head.appendChild(mk("small",null,t("ASLO · RADAR","ASLO · RADAR","ASLO · RADAR")));
 head.appendChild(mk("strong",null,t("La jornada","Matchday","Spieltag")));
 var a=mk("a","aslo-v6-live");
 var badge=mk("span","aslo-v6-badge",t("DEMO","DEMO","DEMO"));
 var teams=mk("span","aslo-v6-live-teams");
 var meta=mk("span","aslo-v6-live-meta");
 a.appendChild(badge);a.appendChild(teams);a.appendChild(meta);
 var controls=mk("div","aslo-v6-controls");
 var prev=mk("button",null,"‹"),next=mk("button",null,"›"),count=mk("span",null,"");
 prev.type="button";next.type="button";
 prev.setAttribute("aria-label",t("Partido anterior de la muestra","Previous sample match","Vorheriges Beispielspiel"));
 next.setAttribute("aria-label",t("Partido siguiente de la muestra","Next sample match","Nächstes Beispielspiel"));
 controls.appendChild(prev);controls.appendChild(count);controls.appendChild(next);
 section.appendChild(head);section.appendChild(a);section.appendChild(controls);
 main.parentNode.insertBefore(section,main);
 var index=0;
 function show(explicit){
  var item=matches[index];teams.textContent="";
  teams.appendChild(mk("b",null,item.a));
  teams.appendChild(mk("strong",null,item.score));
  teams.appendChild(mk("b",null,item.b));
  meta.textContent=item.league+" · "+item.clock;
  a.setAttribute("href",item.url);
  count.textContent=(index+1)+" / "+matches.length;
  if(explicit&&!reduce){
   section.classList.remove("aslo-v6-pulse");void section.offsetWidth;
   section.classList.add("aslo-v6-pulse");
  }
 }
 prev.addEventListener("click",function(){index=(index+matches.length-1)%matches.length;show(true)});
 next.addEventListener("click",function(){index=(index+1)%matches.length;show(true)});
 show(false);
 /* Browser control follows the same real demo match links. No autoplay on disabled/reduced-motion devices. */
 if(!reduce&&matches.length>1){
  var timer=setInterval(function(){
   if(document.hidden||!document.contains(section))return;
   if(section.matches(":hover")||section.contains(document.activeElement))return;
   index=(index+1)%matches.length;show(false);
  },7800);
  window.addEventListener("pagehide",function(){clearInterval(timer)},{once:true});
 }
}
function makeHud(){
 var root=document.getElementById("league-arena");
 if(!root)return;
 var hero=root.querySelector(".arena-hero");
 if(!hero||hero.querySelector(".aslo-v6-hud"))return;
 var hud=mk("span","aslo-v6-hud");
 hud.setAttribute("aria-hidden","true");
 hud.appendChild(mk("b",null,"ASLO"));
 hud.appendChild(mk("span",null,t("ARENA · DATOS FICTICIOS","ARENA · DEMO DATA","ARENA · DEMODATEN")));
 hero.appendChild(hud);
}
function scene(element){
 if(!fine||reduce||observed.has(element))return;
 observed.add(element);
 var frame=0,x=0,y=0;
 element.addEventListener("pointermove",function(e){
  if(e.pointerType&&e.pointerType!=="mouse")return;
  var rect=element.getBoundingClientRect();
  x=((e.clientX-rect.left)/rect.width-.5)*-17;
  y=((e.clientY-rect.top)/rect.height-.5)*-12;
  if(frame)return;
  frame=requestAnimationFrame(function(){
   frame=0;
   element.style.setProperty("--xp-scene-x",x.toFixed(1)+"px");
   element.style.setProperty("--xp-scene-y",y.toFixed(1)+"px");
  });
 },{passive:true});
 element.addEventListener("pointerleave",function(){
  if(frame){cancelAnimationFrame(frame);frame=0}
  element.style.setProperty("--xp-scene-x","0px");
  element.style.setProperty("--xp-scene-y","0px");
 });
}
function mount(){
 var visitor=document.querySelector(".v4-root");
 if(visitor){makePulse(visitor);visitor.querySelectorAll(".v4-hero-news").forEach(scene)}
 makeHud();
 document.querySelectorAll(".arena-hero").forEach(scene);
}
function queue(){
 if(wait)return;
 wait=requestAnimationFrame(function(){wait=0;mount()});
}
mount();
if("MutationObserver" in window){
 var observer=new MutationObserver(queue);
 observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener("pagehide",function(){observer.disconnect()},{once:true});
}
})();