const selectTipo = document.getElementById("tipo");
const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputC = document.getElementById("c");
const botaoGerar = document.getElementById("gerar");

const campoA = document.getElementById("campo-a");
const campoB = document.getElementById("campo-b");
const campoC = document.getElementById("campo-c");

const canvas = document.getElementById("grafico");
const ctx = canvas.getContext("2d"); // "pincel" para desenhar

const funcoes = {
  constante:   (x, a, b, c) => a,                  // f(x) = a
  afim:        (x, a, b, c) => a * x + b,          // f(x) = ax + b
  linear:      (x, a, b, c) => a * x,              // f(x) = ax
  quadratica:  (x, a, b, c) => a * x * x + b * x + c, // f(x) = ax² + bx + c
  exponencial: (x, a, b, c) => Math.pow(a, x)      // f(x) = a^x
};

function atualizarCampos() {
  const tipo = selectTipo.value;

  campoA.style.display = "block";
  campoB.style.display = (tipo === "afim" || tipo === "quadratica") ? "block" : "none";
  campoC.style.display = (tipo === "quadratica") ? "block" : "none";
}

selectTipo.addEventListener("change", atualizarCampos);
atualizarCampos(); // roda uma vez ao carregar a página

const ESCALA = 40; // 1 unidade matemática = 40 pixels

function paraPixelX(x) {
  return canvas.width / 2 + x * ESCALA;
}

function paraPixelY(y) {
  return canvas.height / 2 - y * ESCALA; // o sinal de menos inverte o eixo
}

function desenharEixos() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Grade
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  for (let x = w / 2 % ESCALA; x <= w; x += ESCALA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = h / 2 % ESCALA; y <= h; y += ESCALA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Eixos X e Y
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
}

function desenharFuncao(tipo, a, b, c) {
  const f = funcoes[tipo];

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();

  let primeiroPonto = true;

  for (let px = 0; px <= canvas.width; px++) {
    // pixel -> valor de x matemático
    const x = (px - canvas.width / 2) / ESCALA;
    const y = f(x, a, b, c);

    // ignora valores inválidos
    if (!isFinite(y)) {
      primeiroPonto = true;
      continue;
    }

    const py = paraPixelY(y);

    if (primeiroPonto) {
      ctx.moveTo(px, py);
      primeiroPonto = false;
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
}

function gerarGrafico() {
  const tipo = selectTipo.value;
  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);
  const c = parseFloat(inputC.value);

  // Validação básica
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Preencha todos os valores corretamente!");
    return;
  }
  if (tipo === "exponencial" && (a <= 0 || a === 1)) {
    alert("Na função exponencial, a deve ser maior que 0 e diferente de 1.");
    return;
  }

  desenharEixos();
  desenharFuncao(tipo, a, b, c);
}

botaoGerar.addEventListener("click", gerarGrafico);
desenharEixos(); // mostra os eixos vazios ao abrir a página