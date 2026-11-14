// =====================================================
// derivadas.js — MÓDULO 3 (Aula 3)
// Deriva a função passo a passo, mostrando a regra de cada etapa.
// =====================================================

const Derivadas = (function () {
    const { N, X, simplificar, texto, temX, avaliar } = Expr;

    // Deriva "no". Se "passos" for um array, registra cada regra usada.
    function derivar(no, passos = null) {

        function d(f, mostrar = true) {
            const indice = passos ? passos.length : -1;
            const registra = passos && mostrar && f.k !== "x";
            if (registra) passos.push(null); // reserva o lugar (a regra de fora aparece primeiro)

            let regra, r;

            if (!temX(f)) {
                regra = "Regra da constante";
                r = N(0);
            } else switch (f.k) {
                case "x":
                    regra = "Regra da potência";
                    r = N(1);
                    break;

                case "+": case "-":
                    regra = "Regra da soma/subtração";
                    r = { k: f.k, a: d(f.a), b: d(f.b) };
                    break;

                case "neg":
                    regra = "Regra do múltiplo constante";
                    r = { k: "neg", a: d(f.a) };
                    break;

                case "*":
                    if (!temX(f.a)) {
                        regra = "Regra do múltiplo constante";
                        r = { k: "*", a: f.a, b: d(f.b) };
                    } else if (!temX(f.b)) {
                        regra = "Regra do múltiplo constante";
                        r = { k: "*", a: f.b, b: d(f.a) };
                    } else {
                        regra = "Regra do produto";
                        const da = d(f.a), db = d(f.b);
                        r = { k: "+", a: { k: "*", a: da, b: f.b }, b: { k: "*", a: f.a, b: db } };
                    }
                    break;

                case "/":
                    if (!temX(f.b)) {
                        regra = "Regra do múltiplo constante";
                        r = { k: "/", a: d(f.a), b: f.b };
                    } else {
                        regra = "Regra do quociente";
                        const da = d(f.a), db = d(f.b);
                        r = {
                            k: "/",
                            a: { k: "-", a: { k: "*", a: da, b: f.b }, b: { k: "*", a: f.a, b: db } },
                            b: { k: "^", a: f.b, b: N(2) }
                        };
                    }
                    break;

                case "^": {
                    const u = f.a, v = f.b;
                    if (!temX(v)) {                       // u^n
                        const base = { k: "*", a: v, b: { k: "^", a: u, b: { k: "-", a: v, b: N(1) } } };
                        if (u.k === "x") { regra = "Regra da potência"; r = base; }
                        else { regra = "Regra da potência + Regra da cadeia"; r = { k: "*", a: base, b: d(u) }; }
                    } else if (!temX(u)) {                // a^v  ou  e^v
                        const ehE = u.k === "c" && u.n === "e";
                        const base = ehE ? f : { k: "*", a: { k: "f", n: "ln", a: u }, b: f };
                        regra = ehE ? "Derivada da exponencial" : "Derivada da exponencial (aˣ)";
                        if (v.k === "x") r = base;
                        else { regra += " + Regra da cadeia"; r = { k: "*", a: base, b: d(v) }; }
                    } else {                              // u^v
                        regra = "Derivação logarítmica";
                        r = {
                            k: "*", a: f,
                            b: {
                                k: "+",
                                a: { k: "*", a: d(v), b: { k: "f", n: "ln", a: u } },
                                b: { k: "/", a: { k: "*", a: v, b: d(u) }, b: u }
                            }
                        };
                    }
                    break;
                }

                case "f": {
                    const u = f.a;
                    let externa;
                    switch (f.n) {
                        case "sin": externa = { k: "f", n: "cos", a: u }; regra = "Derivada trigonométrica"; break;
                        case "cos": externa = { k: "neg", a: { k: "f", n: "sin", a: u } }; regra = "Derivada trigonométrica"; break;
                        case "tan": externa = { k: "/", a: N(1), b: { k: "^", a: { k: "f", n: "cos", a: u }, b: N(2) } }; regra = "Derivada trigonométrica"; break;
                        case "ln": externa = { k: "/", a: N(1), b: u }; regra = "Derivada do logaritmo"; break;
                        case "log": externa = { k: "/", a: N(1), b: { k: "*", a: u, b: { k: "f", n: "ln", a: N(10) } } }; regra = "Derivada do logaritmo"; break;
                        case "sqrt": externa = { k: "/", a: N(1), b: { k: "*", a: N(2), b: f } }; regra = "Derivada da raiz"; break;
                        case "abs": externa = { k: "/", a: u, b: f }; regra = "Derivada do módulo"; break;
                    }
                    if (u.k === "x") r = externa;
                    else { regra += " + Regra da cadeia"; r = { k: "*", a: externa, b: d(u) }; }
                    break;
                }

                case "pw":
                    throw new Expr.ErroExpressao("Funções definidas por partes não são derivadas aqui. Use uma expressão só.");
            }

            r = simplificar(r);
            if (registra) {
                passos[indice] = { regra, formula: `d/dx[ ${texto(f)} ] = ${texto(r)}` };
            }
            return r;
        }

        return d(no);
    }

    // Pontos críticos (f'(x) = 0) quando f' é polinômio de grau 1 ou 2
    function pontosCriticos(df) {
        const p = Expr.paraPoli(df);
        if (!p) return null;
        const [c = 0, b = 0, a = 0] = p;
        if (p.length > 3 && p.slice(3).some(v => Math.abs(v) > 1e-12)) return null;
        if (Math.abs(a) < 1e-12) {
            if (Math.abs(b) < 1e-12) return null;
            return [-c / b];
        }
        const delta = b * b - 4 * a * c;
        if (delta < 0) return [];
        if (Math.abs(delta) < 1e-12) return [-b / (2 * a)];
        return [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)].sort((x, y) => x - y);
    }

    function calcular() {
        const campos = ["der-funcao", "der-ponto"];
        UI.limparErros(campos);
        const fmt = Expr.formatarNumero;

        let f;
        try {
            f = Expr.analisar(UI.el("der-funcao").value);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            return mostrarErro(e.message, "der-funcao");
        }

        const passos = [];
        let df;
        try {
            df = derivar(f, passos);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            return mostrarErro(e.message, "der-funcao");
        }

        UI.texto("der-funcao-exibida", texto(f));
        UI.texto("der-resultado", texto(df));

        // Regras usadas (sem repetir)
        const regras = new Set();
        passos.forEach(p => p.regra.split(" + ").forEach(r => regras.add(r)));

        // Pontos críticos: onde o faturamento é máximo ou mínimo
        const criticos = pontosCriticos(df);
        if (criticos && criticos.length) {
            const d2 = derivar(df);
            criticos.forEach(xc => {
                const c2 = avaliar(d2, xc);
                const tipo = c2 < 0 ? "máximo" : (c2 > 0 ? "mínimo" : "ponto crítico");
                passos.push({
                    regra: "Ponto crítico (f'(x) = 0)",
                    formula: `x = ${fmt(xc)} → f(${fmt(xc)}) = ${fmt(avaliar(f, xc))} (${tipo})`
                });
            });
        }

        const LIMITE_PASSOS = 14;
        const mostrar = passos.length > LIMITE_PASSOS
            ? [...passos.slice(0, LIMITE_PASSOS), { regra: "…", formula: `mais ${passos.length - LIMITE_PASSOS} etapas parecidas` }]
            : passos;
        UI.passos("der-passos", mostrar);
        UI.texto("der-regras", [...regras].join(", ") || "—");

        // Valor de f'(x) em um ponto
        let ponto = null;
        const textoPonto = UI.el("der-ponto").value;
        if (textoPonto.trim() !== "") {
            try {
                ponto = Expr.lerNumero(textoPonto);
            } catch (e) {
                UI.el("der-ponto").classList.add("erro");
            }
        }

        if (ponto === null) {
            UI.texto("der-ponto-exibido", "x₀");
            UI.texto("der-valor-ponto", textoPonto.trim() ? "ponto inválido" : "informe um ponto para calcular");
            if (textoPonto.trim()) UI.el("der-valor-ponto").classList.add("erro");
        } else {
            const v = avaliar(df, ponto);
            UI.texto("der-ponto-exibido", fmt(ponto));
            let interpretacao;
            if (!isFinite(v)) interpretacao = " (a derivada não existe nesse ponto)";
            else if (Math.abs(v) < 1e-9) interpretacao = " → ponto crítico: aqui o faturamento para de crescer (possível máximo ou mínimo)";
            else if (v > 0) interpretacao = ` → vendendo 1 unidade a mais, o faturamento sobe cerca de ${fmt(v, 4)}`;
            else interpretacao = ` → vendendo 1 unidade a mais, o faturamento cai cerca de ${fmt(Math.abs(v), 4)}`;
            UI.texto("der-valor-ponto", fmt(v, 6) + interpretacao);
        }

        UI.exemplo("der-exemplo", exemploDerivada(f, df, ponto, criticos));
        desenhar(f, df, ponto, criticos);
    }

    // Situação real de faturamento que explica o que o gráfico mostra
    function exemploDerivada(f, df, ponto, criticos) {
        const R = UI.reais;
        const fmt = Expr.formatarNumero;
        const textos = [
            "Imagine uma fábrica de camisetas. f(x) é quanto ela fatura vendendo x camisetas, e f'(x) é o **faturamento marginal**: " +
            "quanto entra a mais vendendo **uma camiseta extra**."
        ];

        if (!temX(df) && avaliar(df, 0) === 0) {
            textos.push("Aqui f'(x) = 0 sempre: é como uma assinatura fixa. Vender mais não muda nada no faturamento, " +
                "por isso o gráfico de f é uma reta deitada.");
            return textos;
        }
        if (!temX(df)) {
            textos.push(`Aqui f'(x) é sempre **${fmt(avaliar(df, 0), 4)}**: cada camiseta a mais rende sempre o mesmo valor ` +
                `(${R(avaliar(df, 0))}), por isso f é uma reta.`);
            return textos;
        }

        if (ponto !== null) {
            const v = avaliar(df, ponto), y0 = avaliar(f, ponto);
            if (isFinite(v) && isFinite(y0)) {
                if (Math.abs(v) < 1e-9) {
                    textos.push(`Com ${fmt(ponto)} camisetas vendidas (faturando ${R(y0)}), a próxima camiseta não muda o faturamento: ` +
                        "a reta tangente fica **deitada**. É o ponto de virada.");
                } else {
                    textos.push(`Com **${fmt(ponto)} camisetas** vendidas, a fábrica fatura ${R(y0)}. A próxima camiseta ` +
                        (v > 0 ? `traz cerca de **${R(v)} a mais**.` : `faz o faturamento **cair cerca de ${R(Math.abs(v))}**.`) +
                        " A reta tracejada (tangente) mostra essa taxa: quanto mais inclinada, maior o efeito de cada venda.");
                }
            }
        } else {
            textos.push("Informe um ponto no campo ao lado para ver quanto rende a próxima camiseta naquele momento.");
        }

        const maximos = (criticos || []).filter(xc => {
            const a = avaliar(df, xc - 1e-3), b = avaliar(df, xc + 1e-3);
            return a > 0 && b < 0;
        });
        const minimos = (criticos || []).filter(xc => avaliar(df, xc - 1e-3) < 0 && avaliar(df, xc + 1e-3) > 0);
        if (maximos.length) {
            const xm = maximos[0];
            textos.push(`Até **${fmt(xm, 2)} camisetas**, cada venda extra aumenta o faturamento (f' positivo). Depois disso, ` +
                `os descontos fazem cada venda extra **diminuir** o faturamento (f' negativo). A melhor decisão é vender ` +
                `${fmt(xm, 2)} camisetas, faturando o máximo de **${R(avaliar(f, xm))}** — é onde f'(x) = 0 e a curva rosa cruza o eixo x.`);
        } else if (minimos.length) {
            const xm = minimos[0];
            textos.push(`O faturamento cai até x = **${fmt(xm, 2)}** e depois volta a subir: o pior momento é ali, com **${R(avaliar(f, xm))}** ` +
                "(onde f'(x) = 0).");
        }
        return textos;
    }

    function desenhar(f, df, ponto, criticos) {
        let centro = 0;
        if (ponto !== null) centro = ponto;
        else if (criticos && criticos.length === 1) centro = criticos[0];
        const raio = Math.max(ALCANCE_X, Math.abs(centro) * 1.5);
        const xMin = centro - raio, xMax = centro + raio;

        const pf = amostrar(x => avaliar(f, x), xMin, xMax);
        const pd = amostrar(x => avaliar(df, x), xMin, xMax);
        const datasets = [
            serie("f(x)", pf, CORES.f, { gerador: x => avaliar(f, x) }),
            serie("f'(x)", pd, CORES.derivada, { borderWidth: 2, gerador: x => avaliar(df, x) })
        ];

        if (ponto !== null) {
            const y0 = avaliar(f, ponto), m = avaliar(df, ponto);
            if (isFinite(y0) && isFinite(m)) {
                const tangente = [xMin, xMax].map(x => ({ x, y: y0 + m * (x - ponto) }));
                datasets.push(serie("Reta tangente", tangente, CORES.destaque, { borderWidth: 2, borderDash: [6, 6], gerador: x => y0 + m * (x - ponto) }));
                datasets.push(marcador(`(${Expr.formatarNumero(ponto)}, ${Expr.formatarNumero(y0, 4)})`, [{ x: ponto, y: y0 }], CORES.destaque));
            }
        }

        desenharNoCanvas("der-grafico", datasets, {
            xMin, xMax, ...faixaY([pf, pd]),
            xTitulo: "x (quantidade)",
            yTitulo: "f(x) e f'(x)"
        });
    }

    function mostrarErro(msg, campo) {
        UI.erro("der-resultado", msg, campo);
        UI.texto("der-funcao-exibida", UI.el("der-funcao").value || "?");
        UI.el("der-passos").innerHTML = "";
        UI.texto("der-regras", "—");
        UI.texto("der-ponto-exibido", "x₀");
        UI.texto("der-valor-ponto", "—");
        UI.exemplo("der-exemplo", null);
    }

    function iniciar() {
        if (!UI.el("der-funcao").value.trim()) {
            UI.el("der-funcao").value = "-2x^2 + 100x";
            UI.el("der-ponto").value = "10";
        }
        calcular();
    }

    UI.el("der-calcular").addEventListener("click", calcular);
    UI.enterAciona(["der-funcao", "der-ponto"], calcular);

    return { iniciar, calcular, derivar };
})();
