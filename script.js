const teams = [
  {name:"Equipo Rojo", score:0},
  {name:"Equipo Azul", score:0},
  {name:"Equipo Verde", score:0},
  {name:"Equipo Amarillo", score:0}
];

const rounds = [
  {
    number:"INTRO",
    tag:"ALERTA ROJA",
    title:"Código Rojo: El hilo de la seguridad",
    story:"A las 23:00 h se activó una alarma crítica en Planta Base Solvente. Hubo liberación de vapores inflamables en el Tanque 34. Ustedes son el comité de investigación.",
    a:`<div class="doc-title">REPORTE INICIAL</div>
       <div class="sketch">🚨</div>
       <p><b>Ubicación:</b> Planta Base Solvente</p>
       <p><b>Equipo:</b> Tanque 34</p>
       <p><b>Evento:</b> Liberación de vapores inflamables</p>`,
    b:`<div class="doc-title">MISIÓN</div>
       <p>Analizar las evidencias y determinar qué elementos PSM fallaron.</p>
       <div class="ok-line">PSI · PHA · MOC · Integridad Mecánica · Trabajos Críticos · ERP</div>`,
    correct:"PSM",
    explain:"El caso inicia. Avancen ronda por ronda para descubrir la cadena de fallas."
  },
  {
    number:"RONDA 1",
    tag:"PSI",
    title:"La autopsia del documento",
    story:"Se compara la ficha del proceso con la SDS del solvente usado durante el lote.",
    a:`<div class="doc-title">FICHA DEL PROCESO · TANQUE 34</div>
       <div class="sketch">📈🛢️</div>
       <p><b>Solvente registrado:</b> Tipo A</p>
       <p><b>Temperatura máxima:</b> 55 °C</p>
       <p><b>Material línea:</b> Acero al carbono</p>`,
    b:`<div class="doc-title">SDS NUEVA · SOLVENTE TIPO B</div>
       <div class="danger-line"><b>Advertencia:</b> Sobre 50 °C aumenta generación de vapores inflamables.</div>
       <div class="danger-line"><b>Compatibilidad:</b> Evitar contacto prolongado con acero al carbono a temperatura elevada.</div>
       <p><b>Recomendación:</b> Revisar límites seguros antes de uso.</p>`,
    correct:"PSI",
    explain:"Falló PSI: la información de seguridad del proceso no fue actualizada ni usada para validar límites, compatibilidad y condiciones seguras."
  },
  {
    number:"RONDA 2",
    tag:"PHA / HAZOP",
    title:"Interrogatorio cruzado",
    story:"Se revisan declaraciones del operador, técnico y supervisor sobre una alarma crítica.",
    a:`<div class="doc-title">DECLARACIÓN DEL OPERADOR</div>
       <p>“La alarma de alta temperatura sonaba falso varias veces. Mantenimiento la puenteó para no detener la producción.”</p>
       <div class="sketch">👷‍♂️💬</div>`,
    b:`<div class="doc-title">DECLARACIÓN DEL SUPERVISOR</div>
       <p>“En el HAZOP esa alarma era nuestra salvaguarda principal para evitar sobrecalentamiento.”</p>
       <div class="danger-line">Salvaguarda crítica anulada sin análisis.</div>`,
    correct:"PHA",
    explain:"Falló PHA/gestión de salvaguardas: una barrera crítica definida en HAZOP fue anulada sin evaluar el riesgo."
  },
  {
    number:"RONDA 3",
    tag:"MOC",
    title:"El papelito sospechoso",
    story:"Se encuentra una orden de trabajo escrita a mano sobre un cambio temporal.",
    a:`<div class="doc-title">ORDEN DE TRABAJO</div>
       <p>“Se dañó la bomba original X-350. Se instaló temporalmente una X-200 para arrancar el turno de noche.”</p>
       <div class="danger-line">Pendiente revisar.</div>`,
    b:`<div class="doc-title">OBSERVACIÓN TÉCNICA</div>
       <p>La bomba X-200 tiene menor capacidad y diferente curva de operación.</p>
       <div class="sketch">🔄⚙️</div>`,
    correct:"MOC",
    explain:"Falló MOC: un cambio temporal en equipo puede modificar caudal, presión, control del proceso y riesgo operativo."
  },
  {
    number:"RONDA 4",
    tag:"INTEGRIDAD MECÁNICA",
    title:"La evidencia física",
    story:"La inspección en campo identifica una manguera deteriorada en el circuito de trasvase.",
    a:`<div class="doc-title">INSPECCIÓN DE CAMPO</div>
       <div class="sketch">🛢️</div>
       <p>Manguera rígida con fisuras visibles.</p>
       <p>Última inspección documentada: hace 18 meses.</p>`,
    b:`<div class="doc-title">CONDICIÓN CRÍTICA</div>
       <div class="danger-line">Posible pérdida de contención durante transferencia.</div>
       <p>Riesgo: derrame + vapores inflamables + fuente de ignición.</p>`,
    correct:"Integridad Mecánica",
    explain:"Falló Integridad Mecánica: el equipo crítico no fue inspeccionado ni mantenido oportunamente."
  },
  {
    number:"RONDA 5",
    tag:"TRABAJOS CRÍTICOS",
    title:"El contratista y la chispa",
    story:"El día anterior se realizó una reparación con esmeril cerca del área de solventes.",
    a:`<div class="doc-title">DECLARACIÓN CONTRATISTA</div>
       <p>“Era una reparación urgente. Solo fueron 15 minutos de esmerilado.”</p>
       <div class="sketch">🔥🔧</div>`,
    b:`<div class="doc-title">BÚSQUEDA DE PERMISO</div>
       <div class="danger-line">Permiso de trabajo en caliente: NO ENCONTRADO.</div>
       <p>No hay evidencia de medición de atmósfera ni retiro de inflamables.</p>`,
    correct:"Trabajos Críticos",
    explain:"Fallaron Trabajos Críticos y control de contratistas: una fuente de ignición cerca de inflamables requiere permiso, controles y autorización."
  },
  {
    number:"FINAL",
    tag:"DICTAMEN",
    title:"El dictamen del comité",
    story:"Unan las pistas: PSI desactualizado, salvaguarda anulada, cambio sin MOC, manguera deteriorada y trabajo caliente sin permiso.",
    a:`<div class="doc-title">CADENA DE FALLAS</div>
       <p>PSI → PHA → MOC → Integridad Mecánica → Trabajos Críticos</p>
       <div class="sketch">🔗</div>`,
    b:`<div class="doc-title">PREGUNTA FINAL</div>
       <p>Redacten la causa raíz en tres líneas usando el formato 5 Porqués.</p>
       <div class="ok-line">¿Por qué ocurrió? ¿Por qué no se detectó? ¿Qué sistema PSM falló?</div>`,
    correct:"Causa Raíz",
    explain:"El incidente no fue causado por una sola persona: fue una cadena de fallas del sistema PSM."
  }
];

let current = 0;
let activeTeam = 0;
let seconds = 20*60;
let timer;

const answerList = ["PSI","PHA","MOC","Integridad Mecánica","Trabajos Críticos","ERP","LOTO","Contratistas"];

function init(){
  renderTeams();
  renderSelectors();
  renderRound();
  document.getElementById("startBtn").onclick = startGame;
  document.getElementById("nextBtn").onclick = nextRound;
  document.getElementById("correctBtn").onclick = () => scoreActive(50,"Respuesta correcta y justificada.");
  document.getElementById("partialBtn").onclick = () => scoreActive(25,"Respuesta parcial. Faltó explicar la consecuencia o el control.");
  document.getElementById("wrongBtn").onclick = () => scoreActive(-10,"Respuesta incorrecta. Revisen la evidencia.");
  renderAnswerButtons();
}
function renderTeams(){
  const scores = document.getElementById("scores");
  scores.innerHTML = "";
  teams.forEach((t,i)=>{
    const div = document.createElement("div");
    div.className = "score-card" + (i===activeTeam ? " active":"");
    div.innerHTML = `<span>${t.name}</span><strong>${t.score}</strong><div class="bar"><i style="width:${Math.min(100,Math.max(5,t.score/5))}%"></i></div>`;
    scores.appendChild(div);
  });
  document.getElementById("activeTeam").textContent = teams[activeTeam].name;
}
function renderSelectors(){
  const sel = document.getElementById("teamSelect");
  sel.innerHTML = "";
  teams.forEach((t,i)=>{
    const o = document.createElement("option");
    o.value = i;
    o.textContent = t.name;
    sel.appendChild(o);
  });
  sel.onchange = () => { activeTeam = Number(sel.value); renderTeams(); };
}
function renderAnswerButtons(){
  const box = document.getElementById("answerButtons");
  box.innerHTML = "";
  answerList.forEach(a=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = a;
    btn.onclick = () => checkAnswer(a);
    box.appendChild(btn);
  });
}
function renderRound(){
  const r = rounds[current];
  document.getElementById("roundNumber").textContent = r.number;
  document.getElementById("roundTag").textContent = r.tag;
  document.getElementById("roundTitle").textContent = r.title;
  document.getElementById("roundStory").textContent = r.story;
  document.getElementById("docA").innerHTML = r.a;
  document.getElementById("docB").innerHTML = r.b;
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.toggle("hidden", current===0);
  document.getElementById("startBtn").classList.toggle("hidden", current!==0);
}
function startGame(){
  current = 1;
  renderRound();
  startTimer();
}
function startTimer(){
  clearInterval(timer);
  timer = setInterval(()=>{
    seconds--;
    const m = String(Math.floor(seconds/60)).padStart(2,"0");
    const s = String(seconds%60).padStart(2,"0");
    document.getElementById("timer").textContent = `${m}:${s}`;
    if(seconds<=0){ clearInterval(timer); finalModal(); }
  },1000);
}
function nextRound(){
  if(current < rounds.length-1){
    current++;
    renderRound();
  } else {
    finalModal();
  }
}
function checkAnswer(ans){
  const r = rounds[current];
  if(current===0) return;
  if(ans === r.correct){
    scoreActive(50,`✅ Correcto: ${r.explain}`);
  } else {
    scoreActive(-10,`❌ No es lo principal en esta ronda. Elemento esperado: ${r.correct}. ${r.explain}`);
  }
}
function scoreActive(points,msg){
  const selected = Number(document.getElementById("teamSelect").value);
  activeTeam = selected;
  teams[activeTeam].score += points;
  const fb = document.getElementById("feedback");
  fb.textContent = `${teams[activeTeam].name}: ${msg} (${points>0?"+":""}${points} puntos)`;
  fb.classList.remove("hidden");
  activeTeam = (activeTeam + 1) % teams.length;
  document.getElementById("teamSelect").value = activeTeam;
  renderTeams();
}
function finalModal(){
  clearInterval(timer);
  const modal = document.getElementById("finalModal");
  const sorted = [...teams].sort((a,b)=>b.score-a.score);
  document.getElementById("finalText").textContent =
    "Causa raíz esperada: El evento ocurrió por una cadena de fallas PSM: PSI desactualizado, salvaguarda crítica anulada sin análisis, cambio temporal sin MOC, deficiencias de integridad mecánica y trabajo caliente sin permiso.";
  document.getElementById("finalRanking").innerHTML = sorted.map((t,i)=>`<div class="rank-row"><b>${i+1}. ${t.name}</b><span>${t.score} puntos</span></div>`).join("");
  modal.classList.remove("hidden");
}
init();
