// =====================================================
// script.js — troca de conteúdo (menu) + MÓDULO 1 (Funções)
// =====================================================

const selectTipo = document.getElementById("tipo");
const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputC = document.getElementById("c");
const botaoGerar = document.getElementById("gerar");

const campoA = document.getElementById("campo-a");
const campoB = document.getElementById("campo-b");
const campoC = document.getElementById("campo-c");

const funcoes = {
  constante: (x, a, b, c) => a, // f(x) = a
  afim: (x, a, b, c) => a * x + b, // f(x) = ax + b
  linear: (x, a, b, c) => a * x, // f(x) = ax
  quadratica: (x, a, b, c) => a * x * x + b * x + c, // f(x) = ax² + bx + c
  exponencial: (x, a, b, c) => Math.pow(a, x), // f(x) = a^x
};

// Fórmula geral de cada tipo (mostrada ao lado da fórmula com os valores)
const formulasGerais = {
  constante: "f(x) = a",
  afim: "f(x) = ax + b",
  linear: "f(x) = ax",
  quadratica: "f(x) = ax² + bx + c",
  exponencial: "f(x) = aˣ",
};

function atualizarCampos() {
  const tipo = selectTipo.value;

  campoA.style.display = "block";
  campoB.style.display =
    tipo === "afim" || tipo === "quadratica" ? "block" : "none";
  campoC.style.display = tipo === "quadratica" ? "block" : "none";
}

// Calcula os pontos (x, y) de -ALCANCE_X até ALCANCE_X (grafico.js), de 0.1 em 0.1
function calcularPontos(tipo, a, b, c) {
  const f = funcoes[tipo];
  const pontos = [];

  for (let i = -ALCANCE_X * 10; i <= ALCANCE_X * 10; i++) {
    const x = i / 10;
    const y = f(x, a, b, c);

    if (isFinite(y)) {
      pontos.push({ x: x, y: y });
    }
  }

  return pontos;
}

// Monta a fórmula com os valores digitados (ex: f(x) = 50x + 200)
function formulaComValores(tipo, a, b, c) {
  const { N, X } = Expr;
  let arvore;
  switch (tipo) {
    case "constante": arvore = N(a); break;
    case "linear": arvore = { k: "*", a: N(a), b: X }; break;
    case "afim": arvore = { k: "+", a: { k: "*", a: N(a), b: X }, b: N(b) }; break;
    case "quadratica":
      arvore = {
        k: "+",
        a: { k: "+", a: { k: "*", a: N(a), b: { k: "^", a: X, b: N(2) } }, b: { k: "*", a: N(b), b: X } },
        b: N(c),
      };
      break;
    case "exponencial": arvore = { k: "^", a: N(a), b: X }; break;
  }
  return "f(x) = " + Expr.texto(Expr.simplificar(arvore));
}

// Domínio, imagem e comportamento (crescente/decrescente)
function analisarFuncao(tipo, a, b, c) {
  const fmt = Expr.formatarNumero;
  const resultado = { dominio: "ℝ", imagem: "", comportamento: "" };

  // Casos que "viram" outro tipo quando a = 0
  if ((tipo === "afim" || tipo === "linear") && a === 0) tipo = "constante-zero";
  if (tipo === "quadratica" && a === 0) tipo = b === 0 ? "constante-zero" : "afim-de-quadratica";

  switch (tipo) {
    case "constante":
      resultado.imagem = `{${fmt(a)}}`;
      resultado.comportamento = "constante: o faturamento não muda com as vendas";
      break;

    case "constante-zero": {
      const valor = selectTipo.value === "quadratica" ? c : (selectTipo.value === "afim" ? b : 0);
      resultado.imagem = `{${fmt(valor)}}`;
      resultado.comportamento = "constante (com a = 0 a função vira constante)";
      break;
    }

    case "afim":
    case "linear":
      resultado.imagem = "ℝ";
      resultado.comportamento = a > 0
        ? `crescente: cada unidade a mais aumenta o faturamento em ${fmt(a)}`
        : `decrescente: cada unidade a mais diminui o faturamento em ${fmt(Math.abs(a))}`;
      break;

    case "afim-de-quadratica":
      resultado.imagem = "ℝ";
      resultado.comportamento = (b > 0 ? "crescente" : "decrescente") + " (com a = 0 a função vira afim)";
      break;

    case "quadratica": {
      const xv = -b / (2 * a);
      const yv = funcoes.quadratica(xv, a, b, c);
      if (a > 0) {
        resultado.imagem = `[${fmt(yv, 4)}, +∞)`;
        resultado.comportamento = `decrescente para x < ${fmt(xv, 4)} e crescente para x > ${fmt(xv, 4)} ` +
          `— mínimo em x = ${fmt(xv, 4)} (f = ${fmt(yv, 4)})`;
      } else {
        resultado.imagem = `(−∞, ${fmt(yv, 4)}]`;
        resultado.comportamento = `crescente para x < ${fmt(xv, 4)} e decrescente para x > ${fmt(xv, 4)} ` +
          `— maior faturamento em x = ${fmt(xv, 4)} (f = ${fmt(yv, 4)})`;
      }
      break;
    }

    case "exponencial":
      resultado.imagem = "ℝ*₊ = (0, +∞)";
      resultado.comportamento = a > 1
        ? `crescente: o faturamento cresce ${fmt((a - 1) * 100, 2)}% a cada passo`
        : `decrescente: o faturamento cai ${fmt((1 - a) * 100, 2)}% a cada passo`;
      break;
  }
  return resultado;
}

// Tabela de valores de x = -5 até x = 10
function preencherTabela(tipo, a, b, c) {
  const corpo = document.getElementById("corpo-tabela");
  const f = funcoes[tipo];
  let linhas = "";
  for (let x = -5; x <= 10; x++) {
    linhas += `<tr><td>${x}</td><td>${Expr.formatarNumero(f(x, a, b, c), 4)}</td></tr>`;
  }
  corpo.innerHTML = linhas;
}

function gerarGrafico() {
  const tipo = selectTipo.value;
  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);
  const c = parseFloat(inputC.value);

  [inputA, inputB, inputC].forEach(i => i.classList.remove("erro"));

  // Validação básica (só dos campos que o tipo usa)
  const usados = { constante: [inputA], linear: [inputA], exponencial: [inputA], afim: [inputA, inputB], quadratica: [inputA, inputB, inputC] }[tipo];
  const invalidos = usados.filter(i => isNaN(parseFloat(i.value)));
  if (invalidos.length) {
    invalidos.forEach(i => i.classList.add("erro"));
    alert("Preencha todos os valores corretamente!");
    return;
  }
  if (tipo === "exponencial" && (a <= 0 || a === 1)) {
    inputA.classList.add("erro");
    alert("Na função exponencial, a deve ser maior que 0 e diferente de 1.");
    return;
  }

  const pontos = calcularPontos(tipo, a, b || 0, c || 0);
  const nomeFuncao = selectTipo.options[selectTipo.selectedIndex].text;

  // PARTE 1: tipo + fórmula
  document.getElementById("info-tipo").textContent = nomeFuncao;
  document.getElementById("info-formula").textContent =
    `${formulasGerais[tipo]} → ${formulaComValores(tipo, a, b || 0, c || 0)}`;

  // PARTE 2: tabela + gráfico
  preencherTabela(tipo, a, b || 0, c || 0);
  desenharGrafico(pontos, nomeFuncao, x => funcoes[tipo](x, a, b || 0, c || 0)); // função que está no grafico.js

  // PARTE 3: domínio, imagem e comportamento
  const info = analisarFuncao(tipo, a, b || 0, c || 0);
  document.getElementById("info-dominio").textContent = info.dominio;
  document.getElementById("info-imagem").textContent = info.imagem;
  document.getElementById("info-comportamento").textContent = info.comportamento;

  // PARTE 4: exemplo do dia a dia
  UI.exemplo("fun-exemplo", exemploFuncao(tipo, a, b || 0, c || 0));
}

// Explica o gráfico com uma situação real de faturamento, usando os valores digitados
function exemploFuncao(tipo, a, b, c) {
  const f = x => funcoes[tipo](x, a, b, c);
  const R = UI.reais;
  const fmt = Expr.formatarNumero;

  switch (tipo) {
    case "constante":
      return [
        `Uma academia cobra mensalidade fixa de **${R(a)}**. Não importa se o aluno treina 1 ou 30 vezes no mês: ` +
        `a academia recebe sempre **${R(a)}** dele.`,
        "Por isso o gráfico é uma reta \"deitada\": o faturamento não muda quando x (uso/vendas) muda."
      ];

    case "linear":
      if (a === 0) return ["Com a = 0, cada venda rende R$ 0: o faturamento fica parado em zero."];
      return [
        `Uma lanchonete vende cada salgado por **${R(a)}**, sem nenhuma taxa extra. ` +
        `Vendendo 10 salgados fatura f(10) = **${R(f(10))}**; vendendo 20, fatura **${R(f(20))}**.`,
        "Dobrou as vendas, dobrou o faturamento. Sem vendas não há faturamento: por isso a reta passa pelo ponto (0, 0)." +
        (a < 0 ? " (Com a negativo, cada venda daria prejuízo.)" : "")
      ];

    case "afim":
      if (a === 0) return [`Com a = 0, só sobra a taxa fixa: o faturamento é sempre ${R(b)}.`];
      return [
        `Uma gráfica cobra **${R(b)}** para preparar a máquina e mais **${R(a)}** por cópia. ` +
        `Um pedido de 10 cópias rende f(10) = **${R(f(10))}**; um de 100 cópias, **${R(f(100))}**.`,
        `A taxa fixa (b = ${fmt(b)}) é onde a reta corta o eixo y: é o que a gráfica recebe mesmo antes da primeira cópia. ` +
        `O preço por cópia (a = ${fmt(a)}) é a inclinação da reta.`
      ];

    case "quadratica": {
      if (a === 0) return ["Com a = 0 a função vira afim: veja o exemplo da Função Afim."];
      const xv = -b / (2 * a), yv = f(xv);
      if (a < 0) {
        return [
          "Uma loja dá desconto por volume: quanto mais o cliente leva, mais barato sai cada unidade.",
          `No começo o faturamento sobe, mas depois de **${fmt(xv, 2)} unidades** o desconto pesa mais que a venda extra e o faturamento começa a cair. ` +
          `O melhor é vender ${fmt(xv, 2)} unidades, faturando **${R(yv)}**: é o ponto mais alto da parábola (vértice).`
        ];
      }
      return [
        "Uma loja entra em reforma: o faturamento cai enquanto a obra acontece e depois volta a subir quando a loja reabre, nova.",
        `O pior momento é em x = **${fmt(xv, 2)}**, com faturamento de **${R(yv)}**: é o ponto mais baixo da parábola (vértice). Depois dele, só sobe.`
      ];
    }

    case "exponencial": {
      const pct = fmt(Math.abs(a - 1) * 100, 2);
      if (a > 1) {
        return [
          `Um aplicativo cresce **${pct}% ao mês**. Começando com faturamento 1 (ex.: R$ 1 mil), ` +
          `em 3 meses fatura f(3) = **${fmt(f(3), 2)} mil** e em 10 meses **${fmt(f(10), 2)} mil**.`,
          "No começo o crescimento parece lento, depois \"explode\": é o efeito bola de neve, porque cada mês cresce em cima do mês anterior."
        ];
      }
      return [
        `Uma loja perde **${pct}% dos clientes por mês**. Começando com faturamento 1 (ex.: R$ 1 mil), ` +
        `depois de 3 meses fatura **${fmt(f(3), 2)} mil** e depois de 10 meses só **${fmt(f(10), 2)} mil**.`,
        "O faturamento cai cada vez mais devagar, mas nunca chega a zero: por isso a imagem é (0, +∞)."
      ];
    }
  }
  return [];
}

selectTipo.addEventListener("change", () => { atualizarCampos(); gerarGrafico(); });
botaoGerar.addEventListener("click", gerarGrafico);
[inputA, inputB, inputC].forEach(i => i.addEventListener("keydown", ev => { if (ev.key === "Enter") gerarGrafico(); }));


// =====================================================
// Menu "Escolha o conteúdo" (canto superior direito)
// =====================================================
const selectModulo = document.getElementById("modulo");
const titulo = document.getElementById("titulo");

const MODULOS = {
  funcoes: { titulo: "Gerador de gráfico de Funções", iniciar: null },
  limites: { titulo: "Calculadora de Limites", iniciar: Limites.iniciar },
  derivadas: { titulo: "Calculadora de Derivadas", iniciar: Derivadas.iniciar },
  integrais: { titulo: "Calculadora de Integrais", iniciar: Integrais.iniciar },
};
const iniciados = new Set();

function trocarModulo() {
  const escolhido = selectModulo.value;

  // Mostra só o módulo escolhido (os outros ficam com hidden)
  Object.keys(MODULOS).forEach(nome => {
    document.getElementById("modulo-" + nome).hidden = nome !== escolhido;
  });
  titulo.textContent = MODULOS[escolhido].titulo;
  document.title = MODULOS[escolhido].titulo;

  // Na primeira vez que abre, carrega um exemplo e calcula
  // (o gráfico só pode ser criado com o módulo visível)
  if (!iniciados.has(escolhido) && MODULOS[escolhido].iniciar) {
    MODULOS[escolhido].iniciar();
  }
  iniciados.add(escolhido);
}

selectModulo.addEventListener("change", trocarModulo);

atualizarCampos(); // ajusta os campos ao abrir a página
gerarGrafico(); // já mostra um gráfico ao abrir a página
trocarModulo(); // respeita o conteúdo escolhido (o navegador pode lembrar a opção ao recarregar)
