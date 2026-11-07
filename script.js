const selectTipo = document.getElementById("tipo");
const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputC = document.getElementById("c");
const botaoGerar = document.getElementById("gerar");

const campoA = document.getElementById("campo-a");
const campoB = document.getElementById("campo-b");
const campoC = document.getElementById("campo-c");

const funcoes = {
  constante:   (x, a, b, c) => a,                     // f(x) = a
  afim:        (x, a, b, c) => a * x + b,             // f(x) = ax + b
  linear:      (x, a, b, c) => a * x,                 // f(x) = ax
  quadratica:  (x, a, b, c) => a * x * x + b * x + c, // f(x) = ax² + bx + c
  exponencial: (x, a, b, c) => Math.pow(a, x)         // f(x) = a^x
};

function atualizarCampos() {
  const tipo = selectTipo.value;

  campoA.style.display = "block";
  campoB.style.display = (tipo === "afim" || tipo === "quadratica") ? "block" : "none";
  campoC.style.display = (tipo === "quadratica") ? "block" : "none";
}

// Calcula os pontos (x, y) de -10 até 10, de 0.1 em 0.1
function calcularPontos(tipo, a, b, c) {
  const f = funcoes[tipo];
  const pontos = [];

  for (let i = -100; i <= 100; i++) {
    const x = i / 10;
    const y = f(x, a, b, c);

    if (isFinite(y)) {
      pontos.push({ x: x, y: y });
    }
  }

  return pontos;
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

  const pontos = calcularPontos(tipo, a, b, c);
  const nomeFuncao = selectTipo.options[selectTipo.selectedIndex].text;

  desenharGrafico(pontos, nomeFuncao); // função que está no grafico.js
}

selectTipo.addEventListener("change", atualizarCampos);
botaoGerar.addEventListener("click", gerarGrafico);

atualizarCampos(); // ajusta os campos ao abrir a página
gerarGrafico();    // já mostra um gráfico ao abrir a página
