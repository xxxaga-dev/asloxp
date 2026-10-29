/* ASLO / Organizer account: global identity controls, never mode-specific work.
   Uses the existing account, languages, appearance, and mode routes. */
(function(){
"use strict";
const control=document.getElementById("ow-account-menu");
const auth=window.asloAuth;
if(!control||!auth)return;
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
sel("ow-account-language")?.addEventListener("change",function(){
 if(auth.selectLanguage?.(this.value)){location.reload()}
});
sel("ow-account-logout")?.addEventListener("click",()=>auth.logout?.());
document.addEventListener("click",e=>{
 if(control.open&&!control.contains(e.target))control.open=false;
});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&control.open){
  control.open=false;sel("ow-account-trigger")?.focus();
 }
});
control.addEventListener("toggle",()=>{
 if(control.open)control.querySelector(".ow-account-panel a:not([hidden]),.ow-account-panel select")?.focus({preventScroll:true});
});
render();
})();