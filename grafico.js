// =====================================================
// grafico.js — desenha os gráficos com o Chart.js
// Cada canvas (grafico, lim-grafico, der-grafico, int-grafico)
// guarda o seu próprio gráfico.
// =====================================================

// O fundo do gráfico é claro (ver estilo.css), por isso as cores escuras no texto
const CORES = {
    f: "#2563eb",          // função principal
    derivada: "#db2777",   // f'(x) ou F(x)
    destaque: "#f59e0b",   // pontos, assíntotas, tangente
    area: "rgba(37, 99, 235, 0.22)",
    texto: "#1e293b",
    legenda: "#334155",
    textoFraco: "#64748b",
    grade: "#e2e8f0",
    eixo: "#000000"
};

// Até onde o eixo x vai (de -ALCANCE_X até +ALCANCE_X).
// Aumente para ver o comportamento da função por mais tempo.
const ALCANCE_X = 100;

const graficos = {};

// Cria uma linha (dataset) com o visual padrão
function serie(rotulo, pontos, cor, extra = {}) {
    return Object.assign({
        label: rotulo,
        data: pontos,
        showLine: true,
        borderColor: cor,
        backgroundColor: cor,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0,
        spanGaps: false
    }, extra);
}

// Ponto destacado (ex.: o ponto do limite)
function marcador(rotulo, pontos, cor, vazado = false) {
    return {
        label: rotulo,
        data: pontos,
        showLine: false,
        pointRadius: 7,
        pointHoverRadius: 9,
        borderWidth: 3,
        borderColor: cor,
        backgroundColor: vazado ? "#ffffff" : cor
    };
}

// Calcula pontos de f entre xMin e xMax.
// Onde f não existe (ou dá um salto/assíntota) a linha é interrompida.
function amostrar(f, xMin, xMax, n = 1000) {
    const pontos = [];
    for (let i = 0; i <= n; i++) {
        const x = xMin + (xMax - xMin) * i / n;
        const y = f(x);
        pontos.push({ x, y: isFinite(y) ? y : null });
    }
    // Quebra a linha nos saltos: variação muito maior que a dos vizinhos
    const saltos = [];
    for (let i = 1; i < pontos.length; i++) {
        const y0 = pontos[i - 1].y, y1 = pontos[i].y;
        if (y0 === null || y1 === null) continue;
        const dy = Math.abs(y1 - y0);
        const ant = (i >= 2 && pontos[i - 2].y !== null) ? Math.abs(y0 - pontos[i - 2].y) : 0;
        const prox = (i + 1 < pontos.length && pontos[i + 1].y !== null) ? Math.abs(pontos[i + 1].y - y1) : 0;
        if (dy > 1e-9 && dy > 10 * Math.max(ant, prox)) saltos.push(i);
    }
    for (let k = saltos.length - 1; k >= 0; k--) {
        const i = saltos[k];
        pontos.splice(i, 0, { x: (pontos[i - 1].x + pontos[i].x) / 2, y: null });
    }
    return pontos;
}

// Escolhe o intervalo do eixo Y ignorando valores enormes (assíntotas)
function faixaY(listas, extras = []) {
    const ys = [];
    listas.forEach(l => l.forEach(p => { if (p.y !== null && isFinite(p.y)) ys.push(p.y); }));
    extras = [...extras, 0]; // o eixo y sempre mostra o 0 (sem zoom exagerado)
    extras.filter(v => isFinite(v)).forEach(v => ys.push(v));
    if (ys.length <= 1) return {};
    ys.sort((a, b) => a - b);
    let min = ys[0], max = ys[ys.length - 1];
    const q = p => ys[Math.min(ys.length - 1, Math.max(0, Math.floor(p * (ys.length - 1))))];
    const nucleo = q(0.95) - q(0.05);
    if (nucleo > 0 && (max - min) > 8 * nucleo) {
        min = Math.min(q(0.05) - nucleo, ...extras.filter(isFinite));
        max = Math.max(q(0.95) + nucleo, ...extras.filter(isFinite));
    }
    if (max - min < 1e-9) { min -= 1; max += 1; }
    const folga = (max - min) * 0.08;
    return { yMin: min - folga, yMax: max + folga };
}

function arredondarTick(v) {
    return Math.abs(v) >= 1000 || Number.isInteger(v) ? v.toLocaleString("pt-BR") : parseFloat(v.toFixed(4)).toLocaleString("pt-BR");
}

function opcoesEixo(titulo, min, max) {
    return {
        type: "linear",
        min,
        max,
        title: { display: true, text: titulo, color: CORES.texto, font: { weight: "bold" } },
        grid: {
            color: ctx => ctx.tick && ctx.tick.value === 0 ? CORES.eixo : CORES.grade,
            lineWidth: ctx => ctx.tick && ctx.tick.value === 0 ? 2 : 1
        },
        ticks: { color: CORES.textoFraco, callback: arredondarTick, includeBounds: false }
    };
}

// Desenha (ou redesenha) um gráfico em qualquer canvas
function desenharNoCanvas(idCanvas, datasets, opcoes = {}) {
    if (typeof Chart === "undefined") return; // sem internet: os cálculos continuam funcionando

    const canvas = document.getElementById(idCanvas);
    if (graficos[idCanvas]) graficos[idCanvas].destroy();

    // Clique duplo: volta ao zoom inicial
    canvas.ondblclick = () => desenharNoCanvas(idCanvas, datasets, opcoes);

    const temZoom = typeof ChartZoom !== "undefined";
    if (temZoom) Chart.register(ChartZoom);

    graficos[idCanvas] = new Chart(canvas, {
        type: "scatter",
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false, // a altura vem do CSS (.area-grafico)
            parsing: false,
            animation: false, // sem animação: evita a curva "torta" ao dar zoom e recalcular
            interaction: { mode: "nearest", intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: { color: CORES.legenda, font: { size: 13 } }
                },
                subtitle: {
                    display: temZoom,
                    text: window.matchMedia("(pointer: coarse)").matches
                        ? "Pinça: zoom • Arrastar: mover • Toque duplo: voltar"   // celular
                        : "Rodinha do mouse: zoom  •  Arrastar: mover  •  Clique duplo: voltar",
                    color: CORES.textoFraco,
                    font: { size: 11 },
                    padding: { bottom: 6 }
                },
                zoom: {
                    zoom: {
                        wheel: { enabled: true, speed: 0.15 },
                        pinch: { enabled: true },
                        mode: "xy",
                        onZoomComplete: ({ chart }) => reamostrar(chart)
                    },
                    pan: {
                        enabled: true,
                        mode: "xy",
                        onPanComplete: ({ chart }) => reamostrar(chart)
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    displayColors: false,
                    callbacks: {
                        label: ctx => {
                            const { x, y } = ctx.parsed;
                            if (y === null || y === undefined) return "";
                            return `${ctx.dataset.label} → x: ${x.toFixed(2)} | y: ${y.toFixed(4)}`;
                        }
                    }
                }
            },
            scales: {
                x: opcoesEixo(opcoes.xTitulo || "Eixo X", opcoes.xMin, opcoes.xMax),
                y: opcoesEixo(opcoes.yTitulo || "Eixo Y", opcoes.yMin, opcoes.yMax)
            }
        }
    });
}

// Depois do zoom ou de mover o gráfico, recalcula as curvas no trecho que está na tela.
// Assim, ao afastar o zoom, a função continua aparecendo até onde você quiser.
function reamostrar(chart) {
    const { min, max } = chart.scales.x;
    if (!isFinite(min) || !isFinite(max) || max <= min) return;
    chart.data.datasets.forEach(ds => {
        if (typeof ds.gerador === "function") ds.data = amostrar(ds.gerador, min, max);
    });
    chart.stop(); // garante que nenhuma animação antiga sobrescreva os pontos novos
    chart.update("none");
}

// Usado pelo módulo de Funções (script.js)
function desenharGrafico(pontos, nomeFuncao, gerador) {
    desenharNoCanvas("grafico", [serie(nomeFuncao, pontos, CORES.f, { gerador })], {
        xMin: -ALCANCE_X,
        xMax: ALCANCE_X,
        ...faixaY([pontos]),
        xTitulo: "x (quantidade ou tempo)",
        yTitulo: "f(x) (faturamento)"
    });
}
