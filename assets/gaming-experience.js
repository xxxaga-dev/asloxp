
/* ASLO original immersive interactions — no external dependency, opt-in to fine pointers. */
(function(){
"use strict";
var fine=window.matchMedia&&window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var cards=".v4-news-card,.v4-sponsor,.v4-feature-card,.v5-card,.v5-tile,.v5-item,.arena-card,.arena-sponsor,.arena-match,.arena-shortcut,.mode-tile,.lm-league-card,.arena-info-tile,.arena-award-card";
var observed=new WeakSet(),intersector=null;
if(!reduce&&"IntersectionObserver" in window){
 intersector=new IntersectionObserver(function(items){items.forEach(function(item){if(item.isIntersecting){item.target.classList.add("aslo-fx-visible");intersector.unobserve(item.target)}})},{threshold:.08,rootMargin:"0px 0px 35px 0px"});
}
function attach(){
 document.querySelectorAll(cards).forEach(function(el){if(!el.classList.contains("aslo-fx-tilt"))el.classList.add("aslo-fx-tilt")});
 if(intersector){
  document.querySelectorAll(".arena-reveal,.arena-card,.arena-sponsor,.arena-match,.v5-card").forEach(function(el){
   if(observed.has(el))return;
   observed.add(el);el.classList.add("aslo-fx-reveal");
   intersector.observe(el);
  });
  document.documentElement.classList.add("aslo-fx-ready");
 }
}
attach();
if("MutationObserver" in window){
 var queued=false;
 var mut=new MutationObserver(function(){if(!queued){queued=true;requestAnimationFrame(function(){queued=false;attach()})}});
 mut.observe(document.body,{childList:true,subtree:true});
}
if(!fine||!fine.matches)return;
var outer=document.createElement("span"),inner=document.createElement("span");
outer.className="aslo-cursor-outer";inner.className="aslo-cursor-inner";
outer.setAttribute("aria-hidden","true");inner.setAttribute("aria-hidden","true");
document.body.append(outer,inner);
document.body.classList.add("aslo-fx-running");
var px=-100,py=-100,ox=-100,oy=-100,raf=0,visible=false;
function draw(){
 ox+=(px-ox)*.16;oy+=(py-oy)*.16;
 outer.style.transform="translate3d("+(ox-19)+"px,"+(oy-19)+"px,0)";
 inner.style.transform="translate3d("+(px-3.5)+"px,"+(py-3.5)+"px,0)";
 if(visible)raf=requestAnimationFrame(draw);else raf=0;
}
document.addEventListener("pointermove",function(e){
 if(e.pointerType!=="mouse")return;
 px=e.clientX;py=e.clientY;
 if(!visible){visible=true;document.body.classList.add("aslo-fx-running")}
 if(!raf)raf=requestAnimationFrame(draw);
 var target=e.target.closest(".aslo-fx-tilt");
 if(target){
  var box=target.getBoundingClientRect();
  var u=Math.max(0,Math.min(1,(e.clientX-box.left)/box.width)),v=Math.max(0,Math.min(1,(e.clientY-box.top)/box.height));
  target.style.setProperty("--aslo-x",(u*100)+"%");
  target.style.setProperty("--aslo-y",(v*100)+"%");
  target.style.setProperty("--aslo-rotate-x",((.5-v)*3.2)+"deg");
  target.style.setProperty("--aslo-rotate-y",((u-.5)*3.2)+"deg");
 }
 var hero=e.target.closest(".aslo-fx-hero");
 if(hero){
  var h=hero.getBoundingClientRect();
  hero.style.setProperty("--aslo-par-x",(((e.clientX-h.left)/h.width-.5)*10).toFixed(1)+"px");
  hero.style.setProperty("--aslo-par-y",(((e.clientY-h.top)/h.height-.5)*7).toFixed(1)+"px");
 }
},{passive:true});
document.addEventListener("pointerover",function(e){
 if(e.target.closest("a,button,summary,[role='button'],input,select,.aslo-fx-tilt"))document.body.classList.add("aslo-fx-over");
});
document.addEventListener("pointerout",function(e){
 var before=e.target.closest("a,button,summary,[role='button'],input,select,.aslo-fx-tilt");
 if(before&&!before.contains(e.relatedTarget))document.body.classList.remove("aslo-fx-over");
 var card=e.target.closest(".aslo-fx-tilt");
 if(card&&!card.contains(e.relatedTarget)){
  card.style.setProperty("--aslo-rotate-x","0deg");
  card.style.setProperty("--aslo-rotate-y","0deg");
 }
 var hero=e.target.closest(".aslo-fx-hero");
 if(hero&&!hero.contains(e.relatedTarget)){
  hero.style.setProperty("--aslo-par-x","0px");hero.style.setProperty("--aslo-par-y","0px");
 }
});
document.addEventListener("pointerdown",function(e){
 if(e.pointerType!=="mouse")return;
 var el=e.target.closest(".aslo-fx-click,button,a");
 if(!el)return;
 var r=el.getBoundingClientRect();
 var s=document.createElement("span");s.className="aslo-fx-ripple";s.setAttribute("aria-hidden","true");
 s.style.left=(e.clientX-r.left)+"px";s.style.top=(e.clientY-r.top)+"px";
 el.appendChild(s);s.addEventListener("animationend",function(){s.remove()},{once:true});
});
window.addEventListener("blur",function(){document.body.classList.remove("aslo-fx-running");visible=false;if(raf){cancelAnimationFrame(raf);raf=0}});
window.addEventListener("focus",function(){document.body.classList.add("aslo-fx-running")});
})();
