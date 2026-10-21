(function visitorApp(){
  const leagues=[
    {id:"metropolitana",name:"Liga Metropolitana Amateur",place:"Bogotá D.C.",area:"Bogotá",short:"LMA",tournaments:["apertura","capital"],news:"Gaelian FC lidera el torneo Apertura"},
    {id:"sabana",name:"Circuito Sabana",place:"Soacha, Cundinamarca",area:"Cundinamarca",short:"CS",tournaments:["sabana"],news:"Publicada la próxima jornada de la Sabana"},
    {id:"atlantico",name:"Red Atlántica Amateur",place:"Barranquilla, Atlántico",area:"Atlántico",short:"RA",tournaments:["costa"],news:"Inició el Torneo Costa"}
  ];
  const tournaments=[
    {id:"apertura",league:"metropolitana",name:"Torneo Apertura 2026",status:"En curso",teams:["Gaelian FC","Deportivo Prisma","Halcones Norte","Atlético Horizonte"],rounds:[["Jornada 1","03 oct",[["Gaelian FC","Halcones Norte",2,1],["Deportivo Prisma","Atlético Horizonte",1,1]]],["Jornada 2","10 oct",[["Gaelian FC","Deportivo Prisma",1,1],["Halcones Norte","Atlético Horizonte",3,0]]],["Jornada 3","17 oct",[["Gaelian FC","Atlético Horizonte",3,0],["Halcones Norte","Deportivo Prisma",0,2]]],["Jornada 4","24 oct",[["Gaelian FC","Halcones Norte",null,null]]]],news:["Gaelian FC se mantiene en el primer puesto","La cuarta jornada ya tiene programación"]},
    {id:"capital",league:"metropolitana",name:"Copa Capital 2026",status:"Próximo inicio",teams:["Atlético Horizonte","Gaelian FC","Estrella Sur","Unión Centro"],rounds:[["Jornada 1","31 oct",[["Atlético Horizonte","Gaelian FC",null,null],["Estrella Sur","Unión Centro",null,null]]]],news:["Copa Capital anuncia su primera jornada"]},
    {id:"sabana",league:"sabana",name:"Liga Sabana 2026",status:"En curso",teams:["Unión Sabana","Deportivo Sur","Real Cumbre","Estrella Verde"],rounds:[["Jornada 1","04 oct",[["Unión Sabana","Real Cumbre",2,0],["Deportivo Sur","Estrella Verde",0,0]]],["Jornada 2","18 oct",[["Unión Sabana","Deportivo Sur",1,1],["Estrella Verde","Real Cumbre",2,1]]],["Jornada 3","25 oct",[["Unión Sabana","Estrella Verde",null,null]]]],news:["Unión Sabana sigue entre los primeros"]},
    {id:"costa",league:"atlantico",name:"Torneo Costa 2026",status:"En curso",teams:["Brisa Norte","Atlético Puerto","Deportivo Arena","Bahía FC"],rounds:[["Jornada 1","18 oct",[["Brisa Norte","Bahía FC",2,1],["Atlético Puerto","Deportivo Arena",0,0]]],["Jornada 2","25 oct",[["Brisa Norte","Atlético Puerto",null,null]]]],news:["Brisa Norte comienza con victoria"]}
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const one=(xs,id)=>xs.find(x=>x.id===id)||xs[0];
  const lu=id=>"liga.html?id="+encodeURIComponent(id);
  const tu=(id,tab)=>"torneo.html?id="+encodeURIComponent(id)+(tab?"&tab="+encodeURIComponent(tab):"");
  const param=new URLSearchParams(location.search);
  const page=document.body.dataset.page;
  const shell=(html,nav="")=>{document.body.innerHTML=window.asloAuth.chrome(html,nav)};
  const leagueCard=l=>`<a class="card" href="${lu(l.id)}"><span class="chip">${esc(l.area)}</span><h3>${esc(l.name)}</h3><p>${esc(l.place)} · ${l.tournaments.length} competición(es)</p><span class="link">Conocer la liga ↗</span></a>`;
  const newsCards=()=>leagues.map(l=>`<a class="card" href="${lu(l.id)}"><span class="eyebrow">Noticias · ${esc(l.area)}</span><h3>${esc(l.news)}</h3><p>${esc(l.name)} · Información pública simulada.</p><span class="link">Ver liga ↗</span></a>`).join("");
  function start(){
    const t=tournaments[0];
    shell(`<section class="hero"><div class="shell hero-grid"><div><span class="eyebrow">ASLO · EL DEPORTE DE CERCA</span><h1>El deporte local tiene mucho que contar.</h1><p>Encuentra ligas, descubre los torneos y consulta resultados y noticias deportivas. Sin iniciar sesión, sin distracciones.</p><a class="btn primary" href="ligas.html">Explorar ligas ↗</a><a class="btn" href="${tu("apertura")}">Ver torneo destacado →</a></div><a class="score" href="${tu(t.id,"partidos")}"><small>TORNEO APERTURA 2026 · JORNADA 3</small><div class="names"><span>Gaelian FC</span><strong>3 : 0</strong><span>Atlético Horizonte</span></div><small>Finalizado · Ver resultados ↗</small></a></div></section><section class="section shell"><div class="flexhead"><div><span class="eyebrow">Competiciones</span><h2>Ligas para descubrir</h2><p>Consulta cómo avanzan sus torneos.</p></div><a class="link" href="ligas.html">Ver todas ↗</a></div><div class="cards">${leagues.map(leagueCard).join("")}</div></section><section class="section shell"><span class="eyebrow">Actualidad</span><h2>Noticias deportivas</h2><div class="cards">${newsCards()}</div></section>`,"inicio")
  }
  function list(){
    shell(`<section class="shell"><div class="pagehead"><div class="crumb"><a href="index.html">Inicio</a> / Ligas</div><span class="eyebrow">EXPLORAR</span><h1>Encuentra tu liga.</h1><p class="intro">Consulta la actividad deportiva pública de las ligas sin iniciar sesión.</p></div><div class="searchbar"><input id="q" type="search" placeholder="Buscar liga o ciudad" aria-label="Buscar liga o ciudad">${["Todas","Bogotá","Cundinamarca","Atlántico"].map((c,i)=>`<button type="button" data-area="${c}" class="filter ${i===0?"on":""}">${c}</button>`).join("")}</div><p id="count" class="muted" aria-live="polite"></p><div id="results" class="cards"></div><div id="empty" class="empty" hidden>No hay ligas con esos filtros.</div></section>`,"ligas");
    let area="Todas";const input=document.querySelector("#q");
    const render=()=>{const q=input.value.toLowerCase().trim();const found=leagues.filter(x=>(area==="Todas"||x.area===area)&&(x.name+" "+x.place).toLowerCase().includes(q));document.querySelector("#results").innerHTML=found.map(leagueCard).join("");document.querySelector("#count").textContent=found.length+" ligas disponibles en la demostración";document.querySelector("#empty").hidden=found.length>0};
    input.addEventListener("input",render);document.querySelectorAll("[data-area]").forEach(b=>b.addEventListener("click",()=>{area=b.dataset.area;document.querySelectorAll("[data-area]").forEach(x=>x.classList.toggle("on",x===b));render()}));render();
  }
  function leaguePage(){
    const l=one(leagues,param.get("id"));
    shell(`<div class="shell"><section class="pagehead"><div class="crumb"><a href="index.html">Inicio</a> / <a href="ligas.html">Ligas</a> / ${esc(l.name)}</div><span class="eyebrow">Liga · fútbol</span><h1>${esc(l.name)}</h1><p>${esc(l.place)}</p><div class="statline"><span>${l.tournaments.length} torneos</span><span>Actividad pública</span></div></section><div class="column"><section><h2>Sus torneos</h2><p>Entra en una competición para consultar cómo va.</p><div class="panel">${l.tournaments.map(id=>{const t=one(tournaments,id);return `<a class="item" href="${tu(t.id)}"><span class="chip">${esc(t.status)}</span><h3>${esc(t.name)}</h3><p>Fútbol · Adultos</p><span class="link">Ver torneo ↗</span></a>`}).join("")}</div></section><aside class="panel"><h2>Noticias de la liga</h2><div class="item"><span class="eyebrow">Actualidad</span><h3>${esc(l.news)}</h3><p>Información pública simulada.</p></div><a class="link" href="${tu(l.tournaments[0],"noticias")}">Ver noticias de torneos ↗</a></aside></div></div>`,"ligas")
  }
  const played=t=>t.rounds.flatMap(r=>r[2].filter(m=>m[2]!=null));
  function standings(t){
    let data=t.teams.map(name=>({name,pj:0,w:0,d:0,l:0,gf:0,gc:0,pts:0}));
    played(t).forEach(m=>{const a=data.find(x=>x.name===m[0]),b=data.find(x=>x.name===m[1]);if(!a||!b)return;a.pj++;b.pj++;a.gf+=m[2];a.gc+=m[3];b.gf+=m[3];b.gc+=m[2];if(m[2]===m[3]){a.d++;b.d++;a.pts++;b.pts++}else if(m[2]>m[3]){a.w++;b.l++;a.pts+=3}else{a.l++;b.w++;b.pts+=3}});
    data.sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf);
    return `<div class="tablebox"><table class="standings"><thead><tr><th>#</th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>DG</th><th>Pts</th></tr></thead><tbody>${data.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.name)}</td><td>${x.pj}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.gf-x.gc}</td><td class="points">${x.pts}</td></tr>`).join("")}</tbody></table></div>`;
  }
  const match=m=>`<div class="match"><span>${esc(m[0])}</span><b>${m[2]==null?"—":m[2]+" : "+m[3]}</b><span>${esc(m[1])}</span></div>`;
  function tournamentPage(){
    const t=one(tournaments,param.get("id")),l=one(leagues,t.league),tabs=["resumen","tabla","partidos","noticias"];
    const tab=tabs.includes(param.get("tab"))?param.get("tab"):"resumen";
    const last=t.rounds.filter(r=>r[2].some(m=>m[2]!=null)).at(-1);
    let content="";
    if(tab==="resumen")content=`<div class="column"><div><h2>Últimos resultados</h2><div class="panel">${last?last[2].map(match).join(""):"Aún no hay resultados"}</div><h2 style="margin-top:30px">Tabla del torneo</h2>${standings(t)}<p>Clasificación de torneo, no ranking oficial de ASLO.</p></div><aside class="panel"><h2>Actividad</h2>${t.news.map(x=>`<div class="item">${esc(x)}</div>`).join("")}<a class="link" href="${tu(t.id,"partidos")}">Todos los partidos ↗</a></aside></div>`;
    if(tab==="tabla")content=`<h2>Clasificación del torneo</h2><p>Resultados simulados del torneo. No son puntos de ranking ASLO.</p>${standings(t)}`;
    if(tab==="partidos")content=`<h2>Programación y resultados</h2>${t.rounds.map(r=>`<div class="round panel"><h3>${esc(r[0])} · ${esc(r[1])}</h3>${r[2].map(match).join("")}</div>`).join("")}`;
    if(tab==="noticias")content=`<h2>Noticias del torneo</h2><div class="cards">${t.news.map(x=>`<article class="card"><span class="eyebrow">Novedades</span><h3>${esc(x)}</h3><p>Noticia simulada para la revisión del modo visitante.</p></article>`).join("")}</div>`;
    shell(`<div class="shell"><section class="pagehead"><div class="crumb"><a href="index.html">Inicio</a> / <a href="ligas.html">Ligas</a> / <a href="${lu(l.id)}">${esc(l.name)}</a> / ${esc(t.name)}</div><span class="eyebrow">${esc(l.name)}</span><h1>${esc(t.name)}</h1><p><span class="chip">${esc(t.status)}</span> · Fútbol · Adultos</p></section><nav class="tabs" aria-label="Contenido del torneo">${tabs.map(n=>`<a class="${n===tab?"active":""}" href="${tu(t.id,n)}">${({resumen:"Resumen",tabla:"Tabla",partidos:"Partidos",noticias:"Noticias"})[n]}</a>`).join("")}</nav><section class="section">${content}</section></div>`,"ligas")
  }
  ({inicio:start,ligas:list,liga:leaguePage,torneo:tournamentPage}[page]||start)();
})();