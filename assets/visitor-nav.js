(function publicNavigation(){
"use strict";
const lang=()=>window.asloAuth?.lang?.()||"es",tx=(es,en,de)=>({es,en,de})[lang()]||es;
const account=()=>window.asloAuth?.getAccount?.();
const sports=[["all","✦","Todos","All","Alle"],["futbol","⚽","Fútbol","Football","Fußball"],["baloncesto","🏀","Baloncesto","Basketball","Basketball"],["voleibol","🏐","Voleibol","Volleyball","Volleyball"],["tenis","🎾","Tenis","Tennis","Tennis"],["ciclismo","🚴","Ciclismo","Cycling","Radsport"],["atletismo","🏃","Atletismo","Athletics","Leichtathletik"],["natacion","🏊","Natación","Swimming","Schwimmen"]];
const sname=x=>x[lang()==="de"?4:lang()==="en"?3:2];
const getSport=()=>{try{return sessionStorage.getItem("asloxp-demo-sport")||"all"}catch(e){return"all"}};
const links=[["index.html","news","Noticias","News","Nachrichten"],["ligas.html","map","Ligas","Leagues","Ligen"],["torneos.html","trophy","Torneos","Tournaments","Turniere"],["resultados.html","chart","Resultados","Results","Ergebnisse"]];
const icon={news:"▤",map:"⌖",trophy:"🏆",chart:"◉"};
const file=location.pathname.split("/").pop()||"index.html";
const active=file==="index.html"?"index.html":file==="liga.html"?"ligas.html":file==="torneo.html"?"torneos.html":file;
function normalizeHeader(){
 const nav=document.querySelector(".sitehead .publicnav");
 if(nav)nav.innerHTML=links.map(x=>`<a class="${active===x[0]?"sel":""}" href="${x[0]}">${lang()==="de"?x[4]:lang()==="en"?x[3]:x[2]}</a>`).join("");
 const row=document.querySelector(".sitehead .headrow");if(!row)return;
 if(!row.querySelector(".v4-header-tools")){
  const el=document.createElement("div");el.className="v4-header-tools";
  el.innerHTML=`<details class="v4-sports-menu"><summary><span aria-hidden="true">${sports.find(x=>x[0]===getSport())?.[1]||"⚽"}</span><strong>${sname(sports.find(x=>x[0]===getSport())||sports[0])}</strong><span>⌄</span></summary><div class="v4-sport-menu-inner"><div class="v4-sport-menu-title">${tx("Seleccionar deporte","Choose sport","Sportart wählen")}</div>${sports.map(s=>`<button type="button" data-v5-sport="${s[0]}">${s[1]} ${sname(s)}</button>`).join("")}</div></details>`;
  const acc=row.querySelector(".account-actions");if(acc)row.insertBefore(el,acc);else row.append(el);
 }
}
function build(){
 const previous=document.getElementById("v5-mobile-menu");if(previous)previous.remove();
 document.getElementById("v5-menu-backdrop")?.remove();
 document.querySelector(".v5-bottomnav")?.remove();
 document.getElementById("v5-mobile-hamburger")?.remove();
 normalizeHeader();
 const row=document.querySelector(".sitehead .headrow");if(!row)return;
 const button=document.createElement("button");
 button.type="button";button.className="v5-mobile-hamburger";button.id="v5-mobile-hamburger";button.setAttribute("aria-label",tx("Abrir menú","Open menu","Menü öffnen"));button.setAttribute("aria-expanded","false");button.setAttribute("aria-controls","v5-mobile-menu");button.innerHTML=`<span aria-hidden="true">☰</span><span>${tx("Menú","Menu","Menü")}</span>`;
 row.append(button);
 const shade=document.createElement("div");shade.id="v5-menu-backdrop";shade.className="v5-menu-backdrop";shade.hidden=true;
 const menu=document.createElement("section");menu.id="v5-mobile-menu";menu.className="v5-mobile-menu";menu.hidden=true;menu.setAttribute("aria-label",tx("Opciones del visitante","Visitor options","Besucheroptionen"));
 const user=account(),uname=user?.name||"";
 const areaMap={"Colombia":{"Cundinamarca":["Soacha","Bogotá","Chía"],"Antioquia":["Medellín","Envigado"],"Valle del Cauca":["Cali","Palmira"]},"México":{"Ciudad de México":["Ciudad de México"],"Jalisco":["Guadalajara"]},"España":{"Madrid":["Madrid","Alcalá de Henares"],"Cataluña":["Barcelona"]}};
 let place={country:"Colombia",state:"Cundinamarca",city:"Soacha"};
 try{const p=JSON.parse(localStorage.getItem("asloxp-demo-location")||"null");if(areaMap[p?.country]?.[p?.state]?.includes(p?.city))place=p}catch(e){}
 const locationOpts=(entries,chosen)=>entries.map(x=>`<option value="${x}" ${x===chosen?"selected":""}>${x}</option>`).join("");
 const mobileLocation=`<div class="v5-menu-section v5-menu-geo"><strong>⌖ ${tx("Ubicación de muestra","Sample location","Demo-Standort")}</strong><label>${tx("País","Country","Land")} <select id="v5-geo-country">${locationOpts(Object.keys(areaMap),place.country)}</select></label><label>${tx("Región","Region","Region")} <select id="v5-geo-state">${locationOpts(Object.keys(areaMap[place.country]),place.state)}</select></label><label>${tx("Ciudad","City","Stadt")} <select id="v5-geo-city">${locationOpts(areaMap[place.country][place.state],place.city)}</select></label></div>`;
 const items=`<h2>${tx("Tu experiencia","Your experience","Dein Erlebnis")}</h2><div class="v5-menu-grid">${sports.map(s=>`<button type="button" data-v5-sport="${s[0]}" aria-pressed="${getSport()===s[0]}"><span aria-hidden="true">${s[1]}</span>${sname(s)}</button>`).join("")}</div>${mobileLocation}<div class="v5-menu-section"><label>${tx("Idioma","Language","Sprache")}<select id="v5-mobile-language" aria-label="${tx("Idioma","Language","Sprache")}"><option value="es" ${lang()==="es"?"selected":""}>Español</option><option value="en" ${lang()==="en"?"selected":""}>English</option><option value="de" ${lang()==="de"?"selected":""}>Deutsch</option></select></label><button type="button" id="v5-mobile-theme">${tx("Cambiar tema claro/oscuro","Switch light/dark theme","Hell/Dunkel wechseln")} ◐</button></div><div class="v5-menu-section">${user?`<strong>${tx("Cuenta","Account","Konto")}: ${uname.replace(/[<>]/g,"")}</strong><a href="cuenta.html?tab=perfil">${tx("Mi perfil","My profile","Mein Profil")}</a><a href="cuenta.html?tab=seguridad">${tx("Seguridad","Security","Sicherheit")}</a><a href="modos.html">${tx("Cambiar modo","Switch mode","Modus wechseln")}</a><button type="button" id="v5-mobile-signout">${tx("Cerrar sesión","Sign out","Abmelden")}</button>`:`<a class="v5-menu-primary" href="acceso.html">${tx("Iniciar sesión","Sign in","Anmelden")}</a><a href="registro.html">${tx("Crear cuenta","Create account","Konto erstellen")}</a>`}</div>`;
 menu.innerHTML=items;
 document.body.append(shade,menu);
 const bottom=document.createElement("nav");bottom.className="v5-bottomnav";bottom.setAttribute("aria-label",tx("Navegación principal","Main navigation","Hauptnavigation"));
 bottom.innerHTML=links.map(x=>`<a href="${x[0]}" class="${active===x[0]?"active":""}" ${active===x[0]?'aria-current="page"':""}><span aria-hidden="true">${icon[x[1]]}</span>${lang()==="de"?x[4]:lang()==="en"?x[3]:x[2]}</a>`).join("");
 document.body.append(bottom);
 function close(){menu.hidden=true;shade.hidden=true;button.setAttribute("aria-expanded","false");button.setAttribute("aria-label",tx("Abrir menú","Open menu","Menü öffnen"));button.querySelector("span").textContent="☰"}
 function open(){menu.hidden=false;shade.hidden=false;button.setAttribute("aria-expanded","true");button.setAttribute("aria-label",tx("Cerrar menú","Close menu","Menü schließen"));button.querySelector("span").textContent="×"}
 button.addEventListener("click",()=>menu.hidden?open():close());
 shade.addEventListener("click",close);
 window.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 if(!window.__asloV5SportClickBound){window.__asloV5SportClickBound=true;document.addEventListener("click",e=>{const sport=e.target.closest("[data-v5-sport]");if(!sport)return;try{sessionStorage.setItem("asloxp-demo-sport",sport.dataset.v5Sport)}catch(e){}location.reload()});}
 const countryControl=document.getElementById("v5-geo-country"),stateControl=document.getElementById("v5-geo-state"),cityControl=document.getElementById("v5-geo-city");
 function saveLocation(){try{localStorage.setItem("asloxp-demo-location",JSON.stringify(place))}catch(e){}location.reload()}
 countryControl?.addEventListener("change",e=>{place.country=e.target.value;place.state=Object.keys(areaMap[place.country])[0];place.city=areaMap[place.country][place.state][0];saveLocation()});
 stateControl?.addEventListener("change",e=>{place.state=e.target.value;place.city=areaMap[place.country][place.state][0];saveLocation()});
 cityControl?.addEventListener("change",e=>{place.city=e.target.value;saveLocation()});
 const language=document.getElementById("v5-mobile-language");language?.addEventListener("change",e=>{try{localStorage.setItem("asloxp-language",e.target.value)}catch(err){}location.reload()});
 document.getElementById("v5-mobile-theme")?.addEventListener("click",()=>{try{localStorage.setItem("asloxp-theme",document.documentElement.getAttribute("data-theme")==="light"?"dark":"light")}catch(e){}location.reload()});
 document.getElementById("v5-mobile-signout")?.addEventListener("click",()=>window.asloAuth?.logout?.());
}
window.asloVisitorNavRefresh=build;
build();
})();