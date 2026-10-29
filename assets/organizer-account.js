/* ASLO / Organizer account: global identity controls, never mode-specific work.
   Uses the existing account, languages, appearance, and mode routes. */
(function(){
"use strict";
let control=document.getElementById("ow-account-menu");
const auth=window.asloAuth;
if(!auth)return;
const markup="<details class=\"ow-account-menu\" id=\"ow-account-menu\">\n <summary class=\"ow-account-trigger\" id=\"ow-account-trigger\" aria-label=\"Abrir opciones de cuenta\">\n  <span class=\"ow-profile-copy\"><strong id=\"ow-account-name\">Invitado</strong><small id=\"ow-account-mode\">Organizador</small></span>\n  <span class=\"ow-profile-visual\" id=\"ow-account-image\" aria-hidden=\"true\"></span>\n  <span class=\"ow-account-chevron\" aria-hidden=\"true\">⌄</span>\n </summary>\n <div class=\"ow-account-panel\" aria-label=\"Opciones de cuenta\">\n  <div class=\"ow-account-panel-head\">\n   <span class=\"ow-panel-avatar\" id=\"ow-panel-avatar\" aria-hidden=\"true\"></span>\n   <div><strong id=\"ow-panel-name\">Invitado</strong><small id=\"ow-panel-mode\">Organizador</small></div>\n  </div>\n  <div class=\"ow-account-personal\" id=\"ow-account-personal\">\n   <a href=\"cuenta.html?tab=perfil\" data-account-label=\"profile\"><span aria-hidden=\"true\">♙</span><span>Mi perfil y avatar</span><b aria-hidden=\"true\">›</b></a>\n   <a href=\"cuenta.html?tab=apariencia\" data-account-label=\"appearance\"><span aria-hidden=\"true\">◐</span><span>Apariencia</span><b aria-hidden=\"true\">›</b></a>\n   <a href=\"cuenta.html?tab=seguridad\" data-account-label=\"security\"><span aria-hidden=\"true\">◇</span><span>Seguridad</span><b aria-hidden=\"true\">›</b></a>\n   <a href=\"modos.html\" data-account-label=\"switch\"><span aria-hidden=\"true\">⇄</span><span>Mis modos</span><b aria-hidden=\"true\">›</b></a>\n  </div>\n  <label class=\"ow-account-language\" for=\"ow-account-language\">\n   <span><span aria-hidden=\"true\">文</span> <span id=\"ow-language-label\">Idioma</span></span>\n   <select id=\"ow-account-language\" aria-label=\"Idioma de la interfaz\"><option value=\"es\">Español</option><option value=\"en\">English</option><option value=\"de\">Deutsch</option></select>\n  </label>\n  <button class=\"ow-account-logout\" id=\"ow-account-logout\" type=\"button\"><span aria-hidden=\"true\">↪</span><span>Cerrar sesión</span></button>\n  <a class=\"ow-account-signin\" id=\"ow-account-signin\" href=\"acceso.html\" hidden>Iniciar sesión</a>\n  <small class=\"ow-account-hint\" id=\"ow-account-hint\">Cuenta personal · opciones disponibles en todos tus modos</small>\n </div>\n </details>";
function mount(){
 const slot=document.getElementById("aslo-account-slot");
 if(slot&&!document.getElementById("ow-account-menu"))slot.innerHTML=markup;
 const node=document.getElementById("ow-account-menu");
 if(!node)return;
 control=node;
 if(!node.dataset.accountReady){
  node.dataset.accountReady="1";
  node.addEventListener("toggle",()=>{
   if(node.open)node.querySelector(".ow-account-panel a:not([hidden]),.ow-account-panel select")?.focus({preventScroll:true});
  });
 }
 render();
}
const sel=id=>document.getElementById(id);
const labels={
 es:{account:"Abrir opciones de cuenta",organizer:"Organizador",guest:"Visitante",profile:"Mi perfil y avatar",appearance:"Apariencia",security:"Seguridad",switch:"Mis modos",language:"Idioma",theme:"Tema",light:"Claro",dark:"Oscuro",system:"Automático",logout:"Cerrar sesión",login:"Iniciar sesión",hint:"Cuenta personal · las mismas preferencias en todos tus modos",guestHint:"Inicia sesión para acceder a las opciones personales"},
 en:{account:"Open account options",organizer:"Organizer",guest:"Guest",profile:"My profile & avatar",appearance:"Appearance",security:"Security",switch:"My modes",language:"Language",theme:"Theme",light:"Light",dark:"Dark",system:"Automatic",logout:"Sign out",login:"Sign in",hint:"Personal account · shared preferences across your modes",guestHint:"Sign in to access personal settings"},
 de:{account:"Kontomenü öffnen",organizer:"Organisator",guest:"Gast",profile:"Mein Profil und Avatar",appearance:"Darstellung",security:"Sicherheit",switch:"Meine Modi",language:"Sprache",theme:"Design",light:"Hell",dark:"Dunkel",system:"Automatisch",logout:"Abmelden",login:"Anmelden",hint:"Persönliches Konto · dieselben Einstellungen in allen Modi",guestHint:"Melde dich an, um Kontoeinstellungen zu öffnen"}
};
function text(el,string){if(el)el.textContent=string}
function render(){
 const lang=auth.lang?.()||"es",d=labels[lang]||labels.es,acct=auth.getAccount?.();
 const roles={aficionado:"fan",jugador:"player",equipo:"team",organizador:"organizer",juez:"referee",planillador:"scorer",asistente:"assistant",academia:"academy",entrenador:"coach",escuela:"school",escenario:"venue",patrocinador:"sponsor",responsable:"guardian",aslo:"operator"};
 const currentMode=control.closest("[data-aslo-mode]")?.dataset.asloMode||document.body.dataset.activeMode||"organizador";
 const key=roles[currentMode]||"organizer";
 const mode=auth.tr?.(key)||d.organizer;
 const name=(acct?.name||d.guest).trim()||d.guest;
 const figure=auth.avatarForAccount?.(acct,"ow-figure")||'<span class="aslo-account-avatar" aria-hidden="true">♙</span>';
 text(sel("ow-account-name"),name);
 text(sel("ow-account-mode"),mode);
 text(sel("ow-panel-name"),name);
 text(sel("ow-panel-mode"),mode);
 const icon=sel("ow-account-image"),panelIcon=sel("ow-panel-avatar");
 if(icon)icon.innerHTML=figure;
 if(panelIcon)panelIcon.innerHTML=figure;
 text(sel("ow-language-label"),d.language);
 text(sel("ow-account-hint"),acct?d.hint:d.guestHint);
 control.querySelector("summary")?.setAttribute("aria-label",d.account+" · "+name);
 control.querySelectorAll("[data-account-label]").forEach(a=>{
  const part=a.querySelector("span:nth-child(2)");
  if(part)text(part,d[a.dataset.accountLabel]||"");
 });
 const langSelect=sel("ow-account-language");
 if(langSelect){langSelect.value=lang;langSelect.setAttribute("aria-label",d.language)}
 const logout=sel("ow-account-logout");
 if(logout){logout.hidden=!acct;text(logout.querySelector("span:nth-child(2)"),d.logout)}
 const signin=sel("ow-account-signin");
 if(signin){signin.hidden=!!acct;text(signin,d.login)}
 const personal=sel("ow-account-personal");
 if(personal){
  personal.hidden=false;
  personal.querySelectorAll("a[data-account-label]").forEach(link=>{
   if(!link.dataset.realHref)link.dataset.realHref=link.getAttribute("href");
   if(acct){link.href=link.dataset.realHref;link.classList.remove("ow-account-gated");link.removeAttribute("title")}
   else{
    link.href="acceso.html";
    link.classList.add("ow-account-gated");
    link.title=d.guestHint;
   }
  });
 }
 const menu=sel("ow-account-language")?.closest(".ow-account-language");
 if(menu&&!sel("ow-account-theme")){
  const themeRow=document.createElement("label");
  themeRow.className="ow-account-language ow-account-theme";
  themeRow.setAttribute("for","ow-account-theme");
  themeRow.innerHTML='<span><span aria-hidden="true">◐</span> <span id="ow-theme-label"></span></span>'+
   '<select id="ow-account-theme" aria-label="'+d.theme+'"><option value="dark"></option><option value="light"></option><option value="system"></option></select>';
  menu.parentNode.insertBefore(themeRow,menu);
 }
 const themeSelect=sel("ow-account-theme");
 if(themeSelect){
  text(sel("ow-theme-label"),d.theme);
  themeSelect.setAttribute("aria-label",d.theme);
  ["dark","light","system"].forEach((x,i)=>text(themeSelect.options[i],d[x]));
  themeSelect.value=auth.theme?.()||"dark";
 }
}
document.addEventListener("change",e=>{
 if(e.target?.id==="ow-account-language"&&auth.selectLanguage?.(e.target.value)){location.reload()}
 if(e.target?.id==="ow-account-theme"&&auth.selectTheme?.(e.target.value)){
  const isGeneric=document.body.dataset.page==="modo";
  if(isGeneric){const el=document.getElementById("ow-account-menu");if(el)el.open=false}
 }
});
document.addEventListener("click",e=>{
 if(e.target.closest("#ow-account-logout")){auth.logout?.();return}
 if(control?.open&&!control.contains(e.target))control.open=false;
});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&control?.open){
  control.open=false;sel("ow-account-trigger")?.focus();
 }
});
window.asloAccountMenu={mount};
mount();
})();