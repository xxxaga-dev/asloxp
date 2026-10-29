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
 es:{account:"Abrir opciones de cuenta",organizer:"Organizador",guest:"Visitante",profile:"Mi perfil y avatar",appearance:"Apariencia",security:"Seguridad",switch:"Mis modos",language:"Idioma",logout:"Cerrar sesión",login:"Iniciar sesión",hint:"Cuenta personal · las mismas preferencias en todos tus modos"},
 en:{account:"Open account options",organizer:"Organizer",guest:"Guest",profile:"My profile & avatar",appearance:"Appearance",security:"Security",switch:"My modes",language:"Language",logout:"Sign out",login:"Sign in",hint:"Personal account · shared preferences across your modes"},
 de:{account:"Kontomenü öffnen",organizer:"Organisator",guest:"Gast",profile:"Mein Profil und Avatar",appearance:"Darstellung",security:"Sicherheit",switch:"Meine Modi",language:"Sprache",logout:"Abmelden",login:"Anmelden",hint:"Persönliches Konto · dieselben Einstellungen in allen Modi"}
};
function text(el,string){if(el)el.textContent=string}
function render(){
 const lang=auth.lang?.()||"es",d=labels[lang]||labels.es,acct=auth.getAccount?.();
 const mode=auth.tr?.("organizer")||d.organizer;
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
 text(sel("ow-account-hint"),d.hint);
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
 if(personal)personal.hidden=!acct;
}
document.addEventListener("change",e=>{
 if(e.target?.id==="ow-account-language"&&auth.selectLanguage?.(e.target.value)){location.reload()}
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