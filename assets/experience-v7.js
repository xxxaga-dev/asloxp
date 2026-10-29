/* ASLO / UX iteration 7: contextual navigation and accessible landmarks.
   Existing data and role assignments remain untouched. No synthetic rankings or results. */
(function(){
  "use strict";
  var page=document.body.getAttribute("data-page")||"";
  var publicPages={inicio:1,ligas:1,liga:1,torneos:1,torneo:1,resultados:1};
  var isPublic=!!publicPages[page];
  var scheduled=false;
  function lang(){
    try{return window.asloAuth&&window.asloAuth.lang&&window.asloAuth.lang()||"es";}
    catch(e){return "es";}
  }
  function t(es,en,de){return ({es:es,en:en,de:de})[lang()]||es;}
  function el(tag,className){var x=document.createElement(tag);if(className)x.className=className;return x;}
  function activePage(){
    if(page==="inicio")return "news";
    if(page==="liga"||page==="ligas")return "leagues";
    if(page==="torneo"||page==="torneos")return "tournaments";
    return "results";
  }
  function addSkip(){
    if(document.querySelector(".a7-skip"))return;
    var main=document.querySelector("main");
    if(!main)return;
    if(!main.id)main.id="aslo-main-content";
    if(main.tabIndex<0)main.tabIndex=-1;
    var a=el("a","a7-skip");
    a.href="#"+main.id;
    a.textContent=t("Saltar al contenido","Skip to content","Zum Inhalt springen");
    document.body.insertBefore(a,document.body.firstChild);
  }
  function links(){
    return [
      {key:"news",icon:"▤",href:"index.html",name:t("Noticias","News","Nachrichten"),sub:t("Lo que mueve el deporte","Sport in motion","Sport in Bewegung")},
      {key:"leagues",icon:"⬡",href:"ligas.html",name:t("Ligas","Leagues","Ligen"),sub:t("Explora por disciplina y región","Browse sport and region","Sport und Region entdecken")},
      {key:"tournaments",icon:"✦",href:"torneos.html",name:t("Torneos","Tournaments","Turniere"),sub:t("Competiciones en un lugar","Competitions in one place","Turniere auf einen Blick")},
      {key:"results",icon:"◉",href:"resultados.html",name:t("Resultados","Results","Ergebnisse"),sub:t("Marcadores de demostración","Sample scoreboards","Beispiel-Spielstände")}
    ];
  }
  function navigation(compact){
    var nav=el("nav","a7-wayfinder"+(compact?" a7-subnav":""));
    nav.setAttribute("aria-label",t("Exploración deportiva","Explore sport","Sport entdecken"));
    var current=activePage();
    links().forEach(function(link){
      var a=el("a");a.href=link.href;
      if(link.key===current)a.setAttribute("aria-current","page");
      var icon=el("span","a7-wayfinder-icon");icon.setAttribute("aria-hidden","true");icon.textContent=link.icon;
      var label=el("span","a7-wayfinder-label");
      var strong=el("strong");strong.textContent=link.name;
      var small=el("small");small.textContent=link.sub;
      label.appendChild(strong);label.appendChild(small);
      a.appendChild(icon);a.appendChild(label);nav.appendChild(a);
    });
    return nav;
  }
  function addPublicNavigation(){
    if(!isPublic)return;
    if(page==="inicio"){
      var main=document.querySelector(".v4-root .v4-main-grid");
      if(main&&!document.querySelector(".v4-root > .a7-wayfinder"))
        main.insertAdjacentElement("afterend",navigation(false));
    }else{
      var hero=document.querySelector(".v5-root > .v5-hero");
      if(hero&&!document.querySelector(".v5-root > .a7-wayfinder"))
        hero.insertAdjacentElement("afterend",navigation(true));
    }
  }
  function heroDetail(){
    var hero=document.querySelector(".v4-hero-news:not(.v4-empty)");
    var content=hero&&hero.querySelector(".v4-hero-news-content");
    if(!hero||!content)return;
    if(!content.querySelector(".a7-hero-label")){
      var label=el("span","a7-hero-label");
      label.textContent=t("ASLO / DEPORTE SIN FRONTERAS","ASLO / SPORT WITHOUT BORDERS","ASLO / SPORT OHNE GRENZEN");
      content.insertBefore(label,content.firstChild);
    }
    if(!hero.querySelector(".a7-hero-vertical")){
      var vertical=el("span","a7-hero-vertical");
      vertical.setAttribute("aria-hidden","true");
      vertical.textContent="ASLO • SPORTS EXPERIENCE";
      hero.appendChild(vertical);
    }
  }
  function attach(){
    addSkip();
    if(isPublic){addPublicNavigation();heroDetail();}
  }
  function queue(){
    if(scheduled)return;
    scheduled=true;
    window.requestAnimationFrame(function(){scheduled=false;attach();});
  }
  attach();
  if(window.MutationObserver){
    var obs=new MutationObserver(queue);
    obs.observe(document.body,{subtree:true,childList:true});
    window.addEventListener("pagehide",function(){obs.disconnect();},{once:true});
  }
})();
