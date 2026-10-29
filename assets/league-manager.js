(function asloLeagueManager(){
"use strict";
const KEY="asloxp-demo-leagues-v1",ACTIVE="asloxp-demo-active-league-v1";
const demo={
 id:"metropolitana",name:"Liga Metropolitana Amateur",sport:"futbol",
 description:"Competición deportiva de demostración de la región metropolitana.",country:"Colombia",region:"Cundinamarca",city:"Bogotá",
 scope:"ciudad",scopeDetail:"Bogotá",conditions:"Participación mediante invitación y aceptación. Ejemplo no vinculante.",
 categories:[{id:"futbol-adultos-m",min:18,max:45},{id:"futbol-adultos-f",min:18,max:45},{id:"futbol-juvenil",min:14,max:17}],demo:true
};
const sports={futbol:{name:"Fútbol",options:[["futbol-adultos-m","Adultos · masculina (demo)"],["futbol-adultos-f","Adultas · femenina (demo)"],["futbol-mixto","Mixto (demo)"],["futbol-juvenil","Juvenil (demo)"]]},baloncesto:{name:"Baloncesto",options:[["baloncesto-m","Masculina (demo)"],["baloncesto-f","Femenina (demo)"],["baloncesto-mixto","Mixta (demo)"]]},voleibol:{name:"Voleibol",options:[["voleibol-m","Masculina (demo)"],["voleibol-f","Femenina (demo)"],["voleibol-mixto","Mixta (demo)"]]},tenis:{name:"Tenis",options:[["tenis-m","Masculina (demo)"],["tenis-f","Femenina (demo)"],["tenis-mixto","Dobles mixtos (demo)"]]}};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const lang=()=>window.asloAuth?.lang?.()||"es";
const tx=(es,en,de)=>({es,en,de})[lang()]||es;
const read=()=>{try{let l=JSON.parse(sessionStorage.getItem(KEY));return Array.isArray(l)&&l.length?l:[demo]}catch(e){return [demo]}};
const copy=a=>JSON.parse(JSON.stringify(a));
const all=()=>copy(read());
const save=list=>{try{sessionStorage.setItem(KEY,JSON.stringify(list))}catch(e){}};
function current(){
 const list=read();const qs=new URLSearchParams(location.search).get("liga");
 let key=qs;try{key=key||sessionStorage.getItem(ACTIVE)}catch(e){}
 return copy(list.find(x=>x.id===key)||list[0]);
}
const byId=id=>copy(read().find(x=>x.id===id)||null);
const select=id=>{const item=byId(id);if(!item)return false;try{sessionStorage.setItem(ACTIVE,id)}catch(e){}return true};
function upsert(item){
 const list=read(),n=list.findIndex(x=>x.id===item.id);
 if(n>=0)list[n]=copy(item);else list.push(copy(item));
 save(list);select(item.id);
 return copy(item)
}
function catName(sport,id){return (sports[sport]?.options||[]).find(x=>x[0]===id)?.[1]||id}
function leagueLink(id,view="inicio"){return "liga-admin.html?liga="+encodeURIComponent(id)+"&vista="+encodeURIComponent(view)}
function formLink(id){return "mis-ligas.html?editar="+encodeURIComponent(id)}
function summary(league){
 return esc((sports[league.sport]?.name||league.sport)+" · "+(league.city||league.region||league.country||"—"));
}
function renderDirectory(){
 if(document.body.dataset.page!=="mis-ligas")return;
 const root=document.getElementById("aslo-league-directory");if(!root)return;
 const params=new URLSearchParams(location.search),editing=params.get("editar"),newItem=params.has("nueva");
 const chosen=byId(editing);
 const data=(chosen||{id:null,name:"",description:"",sport:"futbol",country:"Colombia",region:"",city:"",scope:"ciudad",scopeDetail:"",conditions:"",categories:[],demo:false});
 let rows=data.categories.length?copy(data.categories):[];
 const header='<header class="lm-top"><a href="organizador.html?vista=inicio" class="lm-brand"><span>▲</span> ASLO</a><nav><a href="organizador.html?vista=inicio">'+tx("Inicio del organizador","Organizer home","Organisator-Start")+'</a><a href="modos.html">'+tx("Modos","Modes","Modi")+'</a></nav><div class="lm-account">'+tx("GESTIÓN DE LIGAS · DEMO","LEAGUE MANAGER · DEMO","LIGAVERWALTUNG · DEMO")+'</div></header>';
 function tile(l,i){
  const thumb=["photo-1522778119026-d647f0596c20","photo-1540747913346-19e32dc3e97e","photo-1574629810360-7efbbe195018"][i%3];
  return '<article class="lm-league-card aslo-fx-tilt"><div class="lm-league-picture" style="background-image:linear-gradient(0deg,#04162bfa,transparent),url(https://images.unsplash.com/'+thumb+'?auto=format&fit=crop&w=800&q=75)"><span>'+esc(sports[l.sport]?.name||l.sport)+'</span></div><div class="lm-league-info"><div class="lm-muted">'+tx("LIGA INDEPENDIENTE","INDEPENDENT LEAGUE","EIGENSTÄNDIGE LIGA")+' '+(l.demo?"· DEMO":"· "+tx("BORRADOR LOCAL","LOCAL DRAFT","LOKALER ENTWURF"))+'</div><h3>'+esc(l.name)+'</h3><p>⌖ '+esc(l.city||l.region||l.country||"Ubicación pendiente")+'</p><div class="lm-chips"><span>'+l.categories.length+' '+tx("categorías","categories","Kategorien")+'</span><span>'+esc(({"ciudad":"Ciudad","region":"Región","pais":"País","internacional":"Internacional"})[l.scope]||"Pendiente")+'</span></div><p class="lm-clamp">'+esc(l.description||tx("Configura la identidad y las condiciones de esta liga.","Configure this league's identity and eligibility.","Lege Identität und Teilnahmebedingungen fest."))+'</p><div class="lm-card-actions"><a class="lm-button lm-primary" href="'+leagueLink(l.id)+'">'+tx("Entrar a la liga","Enter league","Liga öffnen")+' →</a><a class="lm-button" href="'+formLink(l.id)+'">⚙ '+tx("Configurar","Configure","Konfigurieren")+'</a></div></div></article>';
 }
 function optionList(sport,selected){
  return (sports[sport]?.options||[]).map(([id,title])=>'<option value="'+id+'" '+(id===selected?'selected':'')+'>'+title+'</option>').join('');
 }
 function categoryRow(row,i){
  return '<div class="lm-category-row" data-category-row="'+i+'"><label>'+tx("Categoría del catálogo","Catalog category","Katalog-Kategorie")+'<select name="catId" required>'+optionList(data.sport,row.id)+'</select></label><label>'+tx("Edad mínima","Minimum age","Mindestalter")+'<input type="number" name="min" min="0" max="120" value="'+esc(row.min)+'" required></label><label>'+tx("Edad máxima","Maximum age","Höchstalter")+'<input type="number" name="max" min="0" max="120" value="'+esc(row.max)+'" required></label><button class="lm-remove" type="button" data-remove-category="'+i+'" aria-label="'+tx("Eliminar selección de categoría","Remove category selection","Kategorieauswahl entfernen")+'">×</button></div>';
 }
 function formHtml(){
 return '<main class="lm-page"><a href="mis-ligas.html" class="lm-back">← '+tx("Mis ligas","My leagues","Meine Ligen")+'</a><div class="lm-hero lm-hero-form"><div class="lm-overline">ASLO / LEAGUE BUILDER</div><h1>'+(chosen?tx("Configura tu liga","Configure your league","Konfiguriere deine Liga"):tx("Crea una nueva liga","Create a new league","Neue Liga erstellen"))+'</h1><p>'+tx("Cada liga tiene identidad, deporte, territorio y condiciones propios. Un administrador puede gestionar varias.","Each league has its own identity, sport, territory and eligibility. One administrator can manage several.","Jede Liga hat eigene Regeln und Bedingungen. Ein Administrator kann mehrere verwalten.")+'</p></div><div class="lm-form-layout"><form id="lm-form" class="lm-form"><section><span class="lm-overline">01 / IDENTIDAD</span><h2>'+tx("Identidad de la liga","League identity","Ligaidentität")+'</h2><div class="lm-form-grid"><label>'+tx("Nombre de la liga","League name","Liganame")+'<input name="name" maxlength="90" required value="'+esc(data.name)+'" placeholder="Ej. Liga Departamental Juvenil"></label><label>'+tx("Deporte principal","Main sport","Hauptsport")+'<select name="sport">'+Object.keys(sports).map(id=>'<option value="'+id+'" '+(id===data.sport?'selected':'')+'>'+sports[id].name+'</option>').join('')+'</select></label></div><label>'+tx("Descripción","Description","Beschreibung")+'<textarea name="description" maxlength="320" rows="3">'+esc(data.description)+'</textarea></label></section>'+
 '<section><span class="lm-overline">02 / UBICACIÓN</span><h2>'+tx("Sede y cobertura territorial","Location and geographic eligibility","Ort und geografische Teilnahme")+'</h2><div class="lm-form-grid lm-form-grid-three"><label>'+tx("País","Country","Land")+'<input name="country" maxlength="70" required value="'+esc(data.country)+'"></label><label>'+tx("Departamento / región","State / region","Region")+'<input name="region" maxlength="90" value="'+esc(data.region)+'"></label><label>'+tx("Ciudad principal","Home city","Hauptstadt")+'<input name="city" maxlength="90" value="'+esc(data.city)+'"></label></div><div class="lm-form-grid"><label>'+tx("Alcance para admitir equipos","Team eligibility territory","Teilnahmegebiet")+'<select name="scope">'+[["ciudad","Ciudad"],["region","Departamento / región"],["pais","Todo el país"],["internacional","Internacional / mundial"]].map(([id,v])=>'<option value="'+id+'" '+(data.scope===id?'selected':'')+'>'+v+'</option>').join('')+'</select></label><label>'+tx("Lugar / cobertura concreta","Specific territory","Konkretes Gebiet")+'<input name="scopeDetail" maxlength="160" value="'+esc(data.scopeDetail)+'" placeholder="Ej. Cundinamarca"></label></div><p class="lm-help">'+tx("La ubicación de la liga y la procedencia elegible de los equipos son datos distintos. Se evaluarán cuando existan verificaciones reales.","League location and team eligibility are different; real verification is not implemented.","Ligaort und Teilnahmegebiet sind verschieden; keine echte Prüfung implementiert.")+'</p></section>'+
 '<section><span class="lm-overline">03 / DEPORTE Y PARTICIPACIÓN</span><h2>'+tx("Categorías y rangos de edad","Categories and age ranges","Kategorien und Altersgruppen")+'</h2><p class="lm-help">'+tx("Opciones ilustrativas del futuro catálogo ASLO. La liga solo selecciona categorías existentes y define edades; no inventa categorías deportivas oficiales.","Illustrative ASLO catalog options. Leagues select categories and set age ranges; they cannot define official categories.","Beispieloptionen des ASLO-Katalogs. Die Liga wählt Kategorien und legt Altersgrenzen fest.")+'</p><div id="lm-categories">'+rows.map(categoryRow).join('')+'</div><button type="button" id="lm-add-category" class="lm-button lm-add">+ '+tx("Agregar categoría a la liga","Add catalog category","Katalog-Kategorie hinzufügen")+'</button></section>'+
 '<section><span class="lm-overline">04 / CRITERIOS PROPIOS</span><h2>'+tx("Condiciones particulares","Additional eligibility conditions","Besondere Teilnahmebedingungen")+'</h2><label>'+tx("Requisitos y observaciones","Requirements and notes","Voraussetzungen")+'<textarea name="conditions" rows="5" maxlength="1500" placeholder="'+tx("Ej. documentación requerida, proceso de inscripción, criterios de residencia o afiliación; sujetos a reglamento aplicable.","E.g. registration and eligibility requirements, subject to the applicable rules.","Beispiel: Teilnahmevoraussetzungen gemäß geltendem Regelwerk.")+'">'+esc(data.conditions)+'</textarea></label><p class="lm-help">'+tx("Este texto no se aplica como validación automática ni reemplaza el reglamento deportivo. Las condiciones requieren revisión posterior.","These are descriptive notes only, not automated checks or a substitute for sporting regulations.","Nur Hinweise, keine automatische Prüfung oder Ersatz für Sportregeln.")+'</p></section>'+
 '<div class="lm-form-actions"><button class="lm-button lm-primary" type="submit">'+tx("Guardar liga de prueba","Save demo league","Demo-Liga speichern")+' →</button><a href="mis-ligas.html" class="lm-button">'+tx("Cancelar","Cancel","Abbrechen")+'</a></div><div id="lm-form-error" role="alert" aria-live="polite"></div></form><aside class="lm-preview"><div class="lm-preview-photo"><span>LEAGUE BUILDER</span><h2>'+tx("Tu liga, tus competiciones.","Your league, your competitions.","Deine Liga, deine Wettbewerbe.")+'</h2></div><div class="lm-preview-content"><strong>⚡ ASLO XP</strong><p>'+tx("Las ligas se administran independientemente. Los torneos heredan la configuración de su liga según la versión vigente, sin cambiar automáticamente los torneos ya iniciados.","Leagues are separate. Each tournament follows its associated rules without retroactively changing started events.","Ligen bleiben getrennt. Turniere verwenden ihre jeweilige Regelversion.")+'</p><div class="lm-notice">'+tx("Solo prototipo: las ligas se guardan en esta pestaña. No se crean entidades reales ni se validan deportistas.","Prototype only: leagues are kept within this browser tab; no real accounts or player eligibility checks.","Nur Prototyp: Speicherung in dieser Browser-Registerkarte.")+'</div></div></aside></div></main>';
 }
 const list=all();
 root.innerHTML=header+((chosen||newItem)?formHtml():'<main class="lm-page"><div class="lm-hero"><span class="lm-overline">ASLO · ORGANIZACIÓN DEPORTIVA</span><h1>'+tx("Tus ligas. Tu universo deportivo.","Your leagues. Your sports universe.","Deine Ligen. Deine Sportwelt.")+'</h1><p>'+tx("Crea, organiza y configura ligas independientes. Cada una tendrá sus propias competiciones, territorio y reglas.","Create and configure independent leagues, each with its own competitions, territory and eligibility.","Erstelle und verwalte unabhängige Ligen mit eigenen Regeln und Wettbewerben.")+'</p><a class="lm-button lm-primary" href="mis-ligas.html?nueva=1">+ '+tx("Crear nueva liga","Create new league","Neue Liga erstellen")+'</a></div><div class="lm-overline lm-directory-count">'+list.length+' '+tx("LIGAS EN ESTE PROTOTIPO","LEAGUES IN THIS DEMO","LIGEN IN DIESEM PROTOTYP")+'</div><div class="lm-directory-grid">'+list.map(tile).join('')+'<a class="lm-new-tile" href="mis-ligas.html?nueva=1"><span>+</span><strong>'+tx("Nueva liga","New league","Neue Liga")+'</strong><small>'+tx("Con sus propias condiciones","With independent eligibility","Mit eigenen Bedingungen")+'</small></a></div><aside class="lm-notice lm-bottom-note">'+tx("Datos ficticios. La información creada solo permanece en esta sesión del navegador; no está publicada para los visitantes.","Fictional data. Added leagues live only in this browser session.","Fiktive Daten. Neue Ligen bleiben nur in dieser Browsersitzung.")+'</aside></main>');
 if(!(chosen||newItem))return;
 const frm=root.querySelector("#lm-form");
 const draw=()=>{root.querySelector("#lm-categories").innerHTML=rows.map(categoryRow).join("")};
 const syncRows=()=>{rows=[...root.querySelectorAll("[data-category-row]")].map(x=>({id:x.querySelector('[name="catId"]').value,min:+x.querySelector('[name="min"]').value,max:+x.querySelector('[name="max"]').value}))};
 frm.addEventListener("change",e=>{
 if(e.target.name==="sport"){
 const sport=e.target.value;
 rows=[];data.sport=sport;draw();
 }
 });
 root.querySelector("#lm-add-category").addEventListener("click",()=>{
 syncRows();
 const opts=sports[frm.elements.sport.value]?.options||[];
 if(rows.length>=opts.length){err(tx("Ya seleccionaste todas las categorías de ejemplo de este deporte.","All sample categories have been added.","Alle Beispielkategorien wurden hinzugefügt."));return}
 const first=opts.find(o=>!rows.some(r=>r.id===o[0]));
 rows.push({id:first[0],min:18,max:35});draw();
 });
 root.querySelector("#lm-categories").addEventListener("click",e=>{
 const btn=e.target.closest("[data-remove-category]");if(!btn)return;
 syncRows();rows.splice(+btn.dataset.removeCategory,1);draw();
 });
 function err(msg){root.querySelector("#lm-form-error").textContent=msg}
 frm.addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(frm);
 const categories=[...frm.querySelectorAll("[data-category-row]")].map(el=>({id:el.querySelector('[name="catId"]').value,min:+el.querySelector('[name="min"]').value,max:+el.querySelector('[name="max"]').value}));
 if(!categories.length){err(tx("Selecciona al menos una categoría del catálogo de ejemplo.","Choose at least one example category.","Wähle mindestens eine Beispielkategorie."));return}
 if(categories.some(c=>!Number.isInteger(c.min)||!Number.isInteger(c.max)||c.min<0||c.max>120||c.min>c.max)){err(tx("Corrige los rangos: la edad mínima no puede superar la máxima.","Fix the age ranges; minimum cannot exceed maximum.","Altersgrenzen prüfen."));return}
 if(new Set(categories.map(c=>c.id)).size!==categories.length){err(tx("No repitas una categoría dentro de la misma liga.","Do not repeat categories within one league.","Kategorien dürfen nicht doppelt sein."));return}
 const sport=String(f.get("sport")),allowed=sports[sport]?.options.map(x=>x[0])||[];
 if(categories.some(c=>!allowed.includes(c.id))){err(tx("Una categoría no corresponde al deporte elegido.","A category does not belong to the chosen sport.","Eine Kategorie passt nicht zur Sportart."));return}
 const name=String(f.get("name")||"").trim(),country=String(f.get("country")||"").trim();
 if(!name||!country){err(tx("Nombre y país son obligatorios.","Name and country are required.","Name und Land sind erforderlich."));return}
 const id=chosen?.id||("liga-"+Date.now()+"-"+Math.floor(Math.random()*1e6));
 const entry={id,name:name.slice(0,90),sport,description:String(f.get("description")||"").trim().slice(0,320),country:country.slice(0,70),region:String(f.get("region")||"").trim().slice(0,90),city:String(f.get("city")||"").trim().slice(0,90),scope:String(f.get("scope")),scopeDetail:String(f.get("scopeDetail")||"").trim().slice(0,160),conditions:String(f.get("conditions")||"").trim().slice(0,1500),categories,demo:!!chosen?.demo};
 upsert(entry);
 location.assign(leagueLink(id));
 });
}
window.asloLeagues={all,current,byId,upsert,select,leagueLink,formLink,sports,catName,renderDirectory};
renderDirectory();
})();