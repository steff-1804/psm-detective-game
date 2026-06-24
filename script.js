const teams = [
  { name: "EQUIPO ROJO", score: 0 },
  { name: "EQUIPO AZUL", score: 0 },
  { name: "EQUIPO VERDE", score: 0 },
  { name: "EQUIPO AMARILLO", score: 0 }
];

const rounds = [
  {
    title: "REPORTE INICIAL",
    tag: "ALERTA ROJA",
    evidenceA: `
      <div class="doc-title">REPORTE INICIAL</div>
      <div class="doc-box big">🚨</div>
      <div class="doc-line"><b>Ubicación:</b> Planta Base Solvente</div>
      <div class="doc-line"><b>Equipo:</b> Tanque 34</div>
      <div class="doc-line"><b>Evento:</b> Liberación de vapores inflamables</div>
    `,
    mission: `
      <p><b>Contexto del caso:</b></p>
      <p>A las 23:00 h se activó una alarma crítica durante la fabricación de un lote base solvente. Hubo liberación de vapores inflamables y la operación fue detenida.</p>
      <div class="doc-ok">Misión: observar las evidencias, discutir en equipo y determinar qué control del sistema falló.</div>
    `,
    options: ["Reporte inicial", "Cambio sin revisión", "Falla de alarma", "Falla de mantenimiento"],
    answer: "Reporte inicial",
    feedback: "Esta ronda es introductoria. Sirve para ubicar el caso antes de iniciar la investigación."
  },
  {
    title: "LA AUTOPSIA DEL DOCUMENTO",
    tag: "RONDA 1",
    evidenceA: `
      <div class="doc-title">FICHA DEL PROCESO · TANQUE 34</div>
      <div class="doc-box">🛢️ Temperatura máxima registrada: <b>55 °C</b><br>Solvente registrado: <b>Tipo A</b></div>
      <div class="doc-line"><b>Hallazgo:</b> el lote usó Solvente Tipo B.</div>
    `,
    mission: `
      <p>Compara la ficha del proceso con la información actual del químico utilizado.</p>
      <div class="doc-alert"><b>SDS nueva:</b> El Solvente Tipo B aumenta la generación de vapores inflamables sobre 50 °C y requiere revisar compatibilidad de materiales.</div>
      <p><b>Pregunta:</b> ¿Qué información crítica no se actualizó o no se revisó antes de operar?</p>
    `,
    options: ["PSI", "PHA", "MOC", "ERP", "LOTO", "Contratistas"],
    answer: "PSI",
    feedback: "Falló PSI: la información técnica del proceso no fue actualizada ni usada para validar límites, compatibilidad y condiciones seguras."
  },
  {
    title: "INTERROGATORIO CRUZADO",
    tag: "RONDA 2",
    evidenceA: `
      <div class="doc-title">DECLARACIÓN DEL OPERADOR</div>
      <div class="doc-box">👷 “La alarma de alta temperatura sonaba falso varias veces. Mantenimiento la puenteó para no detener producción.”</div>
      <div class="doc-line"><b>Dato:</b> la alarma seguía físicamente instalada, pero no estaba activa.</div>
    `,
    mission: `
      <p>Durante la investigación se revisa el HAZOP anterior.</p>
      <div class="doc-alert"><b>Hallazgo:</b> En el HAZOP, la alarma de alta temperatura aparecía como salvaguarda crítica para evitar sobrecalentamiento.</div>
      <p><b>Pregunta:</b> ¿Qué control de análisis de peligros fue debilitado?</p>
    `,
    options: ["PHA", "PSI", "MOC", "Auditorías", "Emergencias", "Capacitación"],
    answer: "PHA",
    feedback: "Falló PHA/gestión de salvaguardas: una barrera definida en HAZOP fue anulada sin analizar el riesgo."
  },
  {
    title: "EL PAPELITO SOSPECHOSO",
    tag: "RONDA 3",
    evidenceA: `
      <div class="doc-title">ORDEN DE TRABAJO</div>
      <div class="doc-box">🔧 “Se dañó la bomba original X-350. Se instaló temporalmente una X-200 para arrancar el turno de noche.”</div>
      <div class="doc-alert">Observación escrita: “pendiente revisar”.</div>
    `,
    mission: `
      <p>La bomba temporal tiene diferente capacidad y curva de operación.</p>
      <div class="doc-alert">El cambio fue realizado para continuar la producción, pero no existe evaluación formal previa.</div>
      <p><b>Pregunta:</b> ¿Qué proceso debió activarse antes de instalar la bomba temporal?</p>
    `,
    options: ["MOC", "PSI", "PHA", "ERP", "Investigación", "Secretos Industriales"],
    answer: "MOC",
    feedback: "Falló MOC: un cambio temporal en equipo puede modificar caudal, presión, control del proceso y riesgo operativo."
  },
  {
    title: "LA EVIDENCIA FÍSICA",
    tag: "RONDA 4",
    evidenceA: `
      <div class="doc-title">INSPECCIÓN EN CAMPO</div>
      <div class="doc-box big">🛢️</div>
      <div class="doc-line">Manguera rígida con fisuras visibles.</div>
      <div class="doc-alert">Última inspección documentada: hace 18 meses.</div>
    `,
    mission: `
      <p>Se inspecciona el circuito de trasvase y se encuentra una condición degradada.</p>
      <div class="doc-alert">Riesgo: pérdida de contención + vapores inflamables + fuente de ignición.</div>
      <p><b>Pregunta:</b> ¿Qué elemento debía asegurar que este equipo crítico esté en buenas condiciones?</p>
    `,
    options: ["Integridad Mecánica", "MOC", "PSI", "Contratistas", "LOTO", "Auditorías"],
    answer: "Integridad Mecánica",
    feedback: "Falló Integridad Mecánica: el equipo crítico no fue inspeccionado ni mantenido oportunamente."
  },
  {
    title: "EL CONTRATISTA Y LA CHISPA",
    tag: "RONDA 5",
    evidenceA: `
      <div class="doc-title">DECLARACIÓN CONTRATISTA</div>
      <div class="doc-box">🔥 “Era una reparación urgente. Solo fueron 15 minutos de esmerilado cerca del área.”</div>
      <div class="doc-line"><b>Búsqueda documental:</b> no se encontró permiso firmado.</div>
    `,
    mission: `
      <p>El trabajo se realizó cerca de un área donde podían existir vapores inflamables.</p>
      <div class="doc-alert"><b>Permiso de trabajo en caliente:</b> NO ENCONTRADO.</div>
      <p><b>Pregunta:</b> ¿Qué tipo de control falló antes de ejecutar la tarea?</p>
    `,
    options: ["Trabajos Críticos", "Contratistas", "ERP", "MOC", "PSI", "PHA"],
    answer: "Trabajos Críticos",
    feedback: "Fallaron Trabajos Críticos y control de contratistas: una fuente de ignición cerca de inflamables requiere permiso, controles y autorización."
  }
];

let currentRound = 0;
let activeTeam = 0;
let totalSeconds = 0;
let roundSeconds = 60;
let totalTimer = null;
let roundTimer = null;

const $ = (id) => document.getElementById(id);

function init() {
  renderScores();
  populateAnswers();
  renderRound();
  startTotalTimer();

  $("startTimerBtn").addEventListener("click", startRoundTimer);
  $("skipTeamBtn").addEventListener("click", nextTeam);
  $("prevRoundBtn").addEventListener("click", prevRound);
  $("nextRoundBtn").addEventListener("click", nextRound);
  $("correctBtn").addEventListener("click", () => grade(50));
  $("partialBtn").addEventListener("click", () => grade(25));
  $("wrongBtn").addEventListener("click", () => grade(-10));
  $("resetBtn").addEventListener("click", () => location.reload());
  $("scoresBtn").addEventListener("click", showWinner);
  $("finishBtn").addEventListener("click", showWinner);
  $("closeModalBtn").addEventListener("click", () => $("modal").classList.add("hidden"));
  $("playAgainBtn").addEventListener("click", () => location.reload());
}

function startTotalTimer() {
  totalTimer = setInterval(() => {
    totalSeconds++;
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    $("totalClock").textContent = `${m}:${s}`;
  }, 1000);
}

function renderScores() {
  const board = $("scoreboard");
  board.innerHTML = "";
  teams.forEach((team, index) => {
    const card = document.createElement("div");
    card.className = `score-card ${index === activeTeam ? "active" : ""}`;
    card.innerHTML = `
      <small>👥 ${team.name}</small>
      <strong>${team.score}${index === 0 ? " 🏆" : ""}</strong>
      <div class="mini-bar"><i style="width:${Math.min(100, Math.max(5, team.score / 5))}%"></i></div>
    `;
    board.appendChild(card);
  });
  $("activeTeamName").textContent = teams[activeTeam].name;
}

function populateAnswers() {
  const select = $("answerSelect");
  select.innerHTML = "";
  rounds[currentRound].options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

function renderRound() {
  const round = rounds[currentRound];

  $("roundStatus").textContent = `${currentRound + 1} de ${rounds.length}`;
  $("evidenceA").innerHTML = round.evidenceA;
  $("mission").innerHTML = `
    <p><b>${round.tag}: ${round.title}</b></p>
    ${round.mission}
  `;

  populateAnswers();
  $("notes").value = "";
  $("lastPoints").textContent = "0";
  $("feedback").className = "feedback hidden";
  $("feedback").textContent = "";
  resetRoundTimer();
  renderDots();

  $("prevRoundBtn").disabled = currentRound === 0;
  $("nextRoundBtn").disabled = currentRound === rounds.length - 1;
}

function renderDots() {
  const dots = $("dots");
  dots.innerHTML = "";
  rounds.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === currentRound ? "active" : ""} ${index < currentRound ? "done" : ""}`;
    dot.textContent = index + 1;
    dot.addEventListener("click", () => {
      currentRound = index;
      renderRound();
    });
    dots.appendChild(dot);
  });
}

function startRoundTimer() {
  clearInterval(roundTimer);
  roundSeconds = 60;
  updateRoundClock();

  roundTimer = setInterval(() => {
    roundSeconds--;
    updateRoundClock();

    if (roundSeconds <= 0) {
      clearInterval(roundTimer);
      showFeedback("⏱ Tiempo agotado. El turno pasa al siguiente equipo.", "bad");
      nextTeam();
    }
  }, 1000);
}

function updateRoundClock() {
  const m = String(Math.floor(roundSeconds / 60)).padStart(2, "0");
  const s = String(roundSeconds % 60).padStart(2, "0");
  $("roundTimer").textContent = `${m}:${s}`;
}

function resetRoundTimer() {
  clearInterval(roundTimer);
  roundSeconds = 60;
  updateRoundClock();
}

function nextTeam() {
  activeTeam = (activeTeam + 1) % teams.length;
  renderScores();
  resetRoundTimer();
}

function grade(points) {
  const selected = $("answerSelect").value;
  const expected = rounds[currentRound].answer;

  teams[activeTeam].score += points;
  $("lastPoints").textContent = points > 0 ? `+${points}` : points;

  if (points === 50) {
    showFeedback(`✅ Correcto. ${rounds[currentRound].feedback}`, "good");
  } else if (points === 25) {
    showFeedback(`🟡 Parcial. Respuesta esperada: ${expected}. ${rounds[currentRound].feedback}`, "good");
  } else {
    showFeedback(`❌ Incorrecto. Respuesta esperada: ${expected}. ${rounds[currentRound].feedback}`, "bad");
  }

  renderScores();
  resetRoundTimer();
}

function showFeedback(text, type) {
  const fb = $("feedback");
  fb.textContent = text;
  fb.className = `feedback ${type === "good" ? "good" : "bad"}`;
}

function prevRound() {
  if (currentRound > 0) {
    currentRound--;
    renderRound();
  }
}

function nextRound() {
  if (currentRound < rounds.length - 1) {
    currentRound++;
    renderRound();
  }
}

function showWinner() {
  clearInterval(roundTimer);
  clearInterval(totalTimer);

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  $("winnerTitle").textContent = `Ganador: ${winner.name}`;
  $("winnerText").textContent = `Felicitaciones. ${winner.name} obtuvo ${winner.score} puntos en la auditoría forense PSM.`;
  $("ranking").innerHTML = sorted.map((team, index) => `
    <div class="rank-row">
      <span>${index === 0 ? "🏆" : (index + 1) + "."} ${team.name}</span>
      <strong>${team.score} puntos</strong>
    </div>
  `).join("");

  $("modal").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", init);
