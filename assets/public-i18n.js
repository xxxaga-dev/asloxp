(function publicTranslate(){
 const translations={
"ASLO · EL DEPORTE DE CERCA":["ASLO · SPORTS UP CLOSE","ASLO · SPORT HAUTNAH"],
"El deporte local tiene mucho que contar.":["Local sport has stories worth telling.","Lokaler Sport hat viel zu erzählen."],
"Encuentra ligas, descubre los torneos y consulta resultados y noticias deportivas. Sin iniciar sesión, sin distracciones.":["Find leagues, explore tournaments, and check scores and sports news. No sign-in needed.","Entdecke Ligen und Turniere und verfolge Ergebnisse und Neuigkeiten. Ohne Anmeldung."],
"Explorar ligas ↗":["Explore leagues ↗","Ligen entdecken ↗"],
"Ver torneo destacado →":["View featured tournament →","Turnier-Highlight ansehen →"],
"TORNEO APERTURA 2026 · JORNADA 3":["OPENING TOURNAMENT 2026 · ROUND 3","ERÖFFNUNGSTURNIER 2026 · SPIELTAG 3"],
"Finalizado · Ver resultados ↗":["Full time · View results ↗","Beendet · Ergebnisse ansehen ↗"],
"Competiciones":["Competitions","Wettbewerbe"],
"Ligas para descubrir":["Leagues to discover","Ligen entdecken"],
"Consulta cómo avanzan sus torneos.":["See how their tournaments are going.","Sieh dir den aktuellen Stand der Turniere an."],
"Ver todas ↗":["View all ↗","Alle ansehen ↗"],
"Actualidad":["Latest news","Aktuelles"],
"Noticias deportivas":["Sports news","Sportnachrichten"],
"Encuentra tu liga.":["Find your league.","Finde deine Liga."],
"EXPLORAR":["EXPLORE","ENTDECKEN"],
"Consulta la actividad deportiva pública de las ligas sin iniciar sesión.":["Browse public league information without signing in.","Sieh dir öffentliche Liga-Informationen ohne Anmeldung an."],
"Todas":["All","Alle"],
"No hay ligas con esos filtros.":["No leagues match these filters.","Keine Ligen entsprechen diesen Filtern."],
"Conocer la liga ↗":["Explore league ↗","Liga ansehen ↗"],
"Sus torneos":["Its tournaments","Turniere dieser Liga"],
"Entra en una competición para consultar cómo va.":["Open a competition to follow its progress.","Öffne einen Wettbewerb und verfolge seinen Verlauf."],
"Noticias de la liga":["League news","Liga-Nachrichten"],
"Información pública simulada.":["Simulated public information.","Simulierte öffentliche Informationen."],
"Ver noticias de torneos ↗":["See tournament news ↗","Turniernachrichten ansehen ↗"],
"Actividad pública":["Public activity","Öffentliche Aktivitäten"],
"Fútbol · Adultos":["Football · Adults","Fußball · Erwachsene"],
"En curso":["In progress","Läuft"],
"Próximo inicio":["Starting soon","Beginnt bald"],
"Últimos resultados":["Latest results","Letzte Ergebnisse"],
"Aún no hay resultados":["No results yet","Noch keine Ergebnisse"],
"Tabla del torneo":["Tournament standings","Turniertabelle"],
"Clasificación de torneo, no ranking oficial de ASLO.":["Tournament table, not an official ASLO ranking.","Turniertabelle, keine offizielle ASLO-Rangliste."],
"Actividad":["Activity","Aktivität"],
"Todos los partidos ↗":["All matches ↗","Alle Spiele ↗"],
"Clasificación del torneo":["Tournament standings","Turniertabelle"],
"Resultados simulados del torneo. No son puntos de ranking ASLO.":["Simulated tournament results. These are not ASLO ranking points.","Simulierte Turnierergebnisse. Das sind keine ASLO-Ranglistenpunkte."],
"Programación y resultados":["Fixtures and results","Spielplan und Ergebnisse"],
"Noticias del torneo":["Tournament news","Turniernachrichten"],
"Novedades":["Updates","Neuigkeiten"],
"Noticia simulada para la revisión del modo visitante.":["Simulated story for visitor-mode review.","Simulierte Nachricht zur Überprüfung des Gastmodus."],
"Resumen":["Overview","Übersicht"],
"Tabla":["Standings","Tabelle"],
"Partidos":["Matches","Spiele"],
"Noticias":["News","Nachrichten"],
"Inicio":["Home","Startseite"],
"Ligas":["Leagues","Ligen"],
"Liga · fútbol":["League · football","Liga · Fußball"],
"Ver liga ↗":["View league ↗","Liga ansehen ↗"],
"Fútbol":["Football","Fußball"],
"Adultos":["Adults","Erwachsene"],
"Gaelian FC lidera el torneo Apertura":["Gaelian FC leads the Opening Tournament","Gaelian FC führt das Eröffnungsturnier an"],
"Publicada la próxima jornada de la Sabana":["Next Sabana matchday announced","Nächster Spieltag der Sabana bekanntgegeben"],
"Inició el Torneo Costa":["The Coastal Tournament begins","Das Küstenturnier hat begonnen"],
"Gaelian FC se mantiene en el primer puesto":["Gaelian FC stays on top","Gaelian FC bleibt an der Spitze"],
"La cuarta jornada ya tiene programación":["Round four fixtures are now available","Der vierte Spieltag steht fest"],
"Copa Capital anuncia su primera jornada":["Capital Cup announces its first round","Capital-Pokal gibt ersten Spieltag bekannt"],
"Unión Sabana sigue entre los primeros":["Unión Sabana stays near the top","Unión Sabana bleibt in der Spitzengruppe"],
"Brisa Norte comienza con victoria":["Brisa Norte opens with a win","Brisa Norte startet mit einem Sieg"]
};
 const lang=window.asloAuth&&window.asloAuth.lang?window.asloAuth.lang():"es";
 function translate(s){
  if(lang==="es")return s;
  const index=lang==="de"?1:0;
  const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!m)return s;let raw=m[2];
  if(translations[raw])return m[1]+translations[raw][index]+m[3];
  const total=raw.match(/^(\d+) ligas disponibles en la demostración$/);if(total)return m[1]+(lang==="de"?total[1]+" Demo-Ligen verfügbar":total[1]+" demo leagues available")+m[3];
  const comps=raw.match(/^(\d+) competición\(es\)$/);if(comps)return m[1]+(lang==="de"?comps[1]+" Wettbewerbe":comps[1]+" competitions")+m[3];
  const tourn=raw.match(/^(\d+) torneos$/);if(tourn)return m[1]+(lang==="de"?tourn[1]+" Turniere":tourn[1]+" tournaments")+m[3];
  const rank=raw.match(/^Jornada (\d+)(.*)$/);if(rank)return m[1]+(lang==="de"?"Spieltag ":"Round ")+rank[1]+rank[2]+m[3];
  const noticias=raw.match(/^Noticias · (.*)$/);if(noticias)return m[1]+(lang==="de"?"Nachrichten":"News")+" · "+noticias[1]+m[3];
  const liga=raw.match(/^(.+) · (\d+) competición\(es\)$/);if(liga)return m[1]+liga[1]+" · "+liga[2]+(lang==="de"?" Wettbewerbe":" competitions")+m[3];
  return s;
 }
 function apply(){
  if(lang==="es"||!document.querySelector("main"))return;
  const root=document.querySelector("main");const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;const affected=[];while(node=walker.nextNode()){const parent=node.parentElement;if(parent&&["SCRIPT","STYLE","TEXTAREA"].includes(parent.tagName))continue;const translated=translate(node.nodeValue);if(translated!==node.nodeValue)affected.push([node,translated])}
  affected.forEach(([node,text])=>node.nodeValue=text);
  root.querySelectorAll("[placeholder],[aria-label]").forEach(el=>{
   for(const k of ["placeholder","aria-label"]){const v=el.getAttribute(k);if(v==="Buscar liga o ciudad")el.setAttribute(k,lang==="de"?"Liga oder Stadt suchen":"Search league or city");if(v==="Contenido del torneo")el.setAttribute(k,lang==="de"?"Turnierinhalt":"Tournament contents")}
  });
 }
 window.asloPublicTranslate={apply,translate};
})();