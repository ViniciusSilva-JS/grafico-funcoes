// =====================================================
// limites.js — MÓDULO 2 (Aula 2)
// Calcula o limite aproximando x do ponto pelos dois lados,
// mostra a tabela, os limites laterais e a continuidade.
// =====================================================

const Limites = (function () {
    const fmt = Expr.formatarNumero;

    // Arredonda o valor estimado (100.0000004 → 100)
    function limpar(v) {
        if (!isFinite(v)) return v;
        const r = Math.round(v * 1e4) / 1e4;
        return Object.is(r, -0) ? 0 : r;
    }

    // Estima o limite de uma sequência de valores f(x) com x cada vez mais perto do ponto.
    // Devolve um número, +Infinity, -Infinity ou NaN (não existe).
    function estimar(valores) {
        const finitos = valores.filter(v => !isNaN(v));
        if (finitos.length < 3) return NaN;
        const ult = finitos.slice(-3);

        // Infinito "de verdade" (estourou)
        if (ult[2] === Infinity || ult[2] === -Infinity) return ult[2];

        // Cresce sem parar → ±∞
        const absUlt = ult.map(Math.abs);
        if (absUlt[2] > 1e5 && absUlt[2] > absUlt[1] * 1.5 && absUlt[1] > absUlt[0] * 1.5 &&
            Math.sign(ult[0]) === Math.sign(ult[2])) {
            return ult[2] > 0 ? Infinity : -Infinity;
        }

        // Escolhe o ponto onde os valores ficaram mais estáveis
        let melhor = -1, menorDif = Infinity;
        for (let i = 1; i < finitos.length; i++) {
            const dif = Math.abs(finitos[i] - finitos[i - 1]);
            if (dif <= menorDif) { menorDif = dif; melhor = i; }
        }
        const v = finitos[melhor];
        if (menorDif > 1e-3 * (1 + Math.abs(v))) return NaN; // oscila: não converge
        return limpar(v);
    }

    function lateral(f, a, lado) {
        const hs = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8];
        return estimar(hs.map(h => f(a + lado * h)));
    }

    function noInfinito(f, sinal) {
        const xs = [1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
        return estimar(xs.map(x => f(sinal * x)));
    }

    const mesmoValor = (p, q) => (p === q) || (isFinite(p) && isFinite(q) && Math.abs(p - q) < 1e-6 * (1 + Math.abs(p)));
    const existe = v => !isNaN(v);

    function calcular() {
        const campos = ["lim-funcao", "lim-ponto"];
        UI.limparErros(campos);

        let f, a;
        try {
            f = Expr.analisar(UI.el("lim-funcao").value);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            return mostrarErro(e.message, "lim-funcao");
        }
        try {
            a = Expr.lerNumero(UI.el("lim-ponto").value, true);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            return mostrarErro("Ponto inválido. Use um número, pi, inf ou -inf.", "lim-ponto");
        }

        const fx = x => Expr.avaliar(f, x);
        const tipo = UI.el("lim-tipo").value;
        const infinito = !isFinite(a);

        let esq = NaN, dir = NaN, L;
        if (infinito) {
            L = noInfinito(fx, Math.sign(a));
            if (a > 0) esq = L; else dir = L;
        } else {
            esq = lateral(fx, a, -1);
            dir = lateral(fx, a, +1);
            if (tipo === "esquerda") L = esq;
            else if (tipo === "direita") L = dir;
            else L = (existe(esq) && existe(dir) && mesmoValor(esq, dir)) ? esq : NaN;
        }

        const fa = infinito ? NaN : fx(a);

        // ---- Parte 1: expressão ----
        const seta = infinito ? (a > 0 ? "+∞" : "−∞")
            : fmt(a) + (tipo === "esquerda" ? "⁻" : tipo === "direita" ? "⁺" : "");
        UI.texto("lim-expressao", `(x→${seta}) ${Expr.texto(f)}`);
        UI.texto("lim-resultado", existe(L) ? fmt(L) : "não existe");

        // ---- Parte 2: tabela ----
        preencherTabela(fx, a, tipo, infinito);

        // ---- Parte 3: laterais, continuidade, interpretação ----
        const mostrarLado = v => existe(v) ? fmt(v) : "não existe";
        if (infinito) {
            UI.texto("lim-esquerda", a > 0 ? `${mostrarLado(esq)} (x → +∞)` : "— (x → −∞ não tem lado esquerdo)");
            UI.texto("lim-direita", a < 0 ? `${mostrarLado(dir)} (x → −∞)` : "— (x → +∞ não tem lado direito)");
        } else {
            UI.texto("lim-esquerda", mostrarLado(esq));
            UI.texto("lim-direita", mostrarLado(dir));
        }

        const { continuidade, interpretacao } = analisar(a, infinito, tipo, esq, dir, L, fa, f);
        UI.texto("lim-continuidade", continuidade);
        UI.texto("lim-interpretacao", interpretacao);
        UI.exemplo("lim-exemplo", exemploLimite(a, infinito, esq, dir, L, fa, fx));

        desenhar(fx, a, infinito, esq, dir, L, fa);
    }

    function analisar(a, infinito, tipo, esq, dir, L, fa, f) {
        const A = fmt(a);
        let continuidade, interpretacao;

        if (infinito) {
            continuidade = "não se aplica (x tende ao infinito)";
            if (isFinite(L)) {
                interpretacao = `Quando x cresce sem parar, f(x) se aproxima de ${fmt(L)}: é o teto do faturamento ` +
                    `(assíntota horizontal y = ${fmt(L)}).`;
            } else if (L === Infinity) interpretacao = `Quando x ${a > 0 ? "cresce" : "diminui"} sem parar, f(x) cresce sem limite.`;
            else if (L === -Infinity) interpretacao = `Quando x ${a > 0 ? "cresce" : "diminui"} sem parar, f(x) diminui sem limite (prejuízo cada vez maior).`;
            else interpretacao = "Os valores oscilam e não se aproximam de nenhum número: o limite não existe.";
            return { continuidade, interpretacao };
        }

        // Continuidade em x = a
        const faExiste = isFinite(fa);
        if (faExiste && isFinite(esq) && isFinite(dir) && mesmoValor(esq, dir) && mesmoValor(esq, fa)) {
            continuidade = `contínua em x = ${A} (f(${A}) = ${fmt(fa, 4)} = limite)`;
        } else if (isFinite(esq) && isFinite(dir) && mesmoValor(esq, dir)) {
            continuidade = faExiste
                ? `descontínua em x = ${A}: descontinuidade removível (f(${A}) = ${fmt(fa, 4)}, mas o limite é ${fmt(esq)})`
                : `descontínua em x = ${A}: descontinuidade removível (f(${A}) não existe, mas o limite existe)`;
        } else if (isFinite(esq) && isFinite(dir)) {
            continuidade = `descontínua em x = ${A}: descontinuidade de salto (os limites laterais são diferentes)`;
        } else if (!isNaN(esq) || !isNaN(dir)) {
            continuidade = `descontínua em x = ${A}: descontinuidade infinita (assíntota vertical x = ${A})`;
        } else {
            continuidade = `descontínua em x = ${A}: f(x) não se aproxima de nenhum valor`;
        }

        // Interpretação para a empresa
        if (tipo !== "bilateral") {
            const lado = tipo === "esquerda" ? "pela esquerda (valores menores que " + A + ")" : "pela direita (valores maiores que " + A + ")";
            interpretacao = existe(L)
                ? `Chegando em x = ${A} ${lado}, o faturamento se aproxima de ${fmt(L)}.`
                : `Chegando em x = ${A} ${lado}, f(x) não se aproxima de nenhum valor.`;
            if (isFinite(esq) && isFinite(dir) && !mesmoValor(esq, dir)) {
                interpretacao += ` Do outro lado o valor é ${fmt(tipo === "esquerda" ? dir : esq)}: há um salto no faturamento.`;
            }
        } else if (isFinite(L) && faExiste && mesmoValor(L, fa)) {
            interpretacao = `A função é contínua em x = ${A}: basta substituir x = ${A} (propriedades da soma e do produto). ` +
                `O faturamento se aproxima de ${fmt(L)}.`;
        } else if (isFinite(L) && !faExiste) {
            const zeroSobreZero = f.k === "/" && Math.abs(Expr.avaliar(f.a, a)) < 1e-9 && Math.abs(Expr.avaliar(f.b, a)) < 1e-9;
            interpretacao = (zeroSobreZero ? `Substituindo x = ${A} dá 0/0 (indeterminação), ` : `f(${A}) não existe, `) +
                `mas os valores se aproximam de ${fmt(L)}: simplificando a expressão, o limite é ${fmt(L)}.`;
        } else if (isFinite(L)) {
            interpretacao = `Os valores se aproximam de ${fmt(L)}, mas f(${A}) vale ${fmt(fa, 4)}: há um "buraco" no gráfico.`;
        } else if (isFinite(esq) && isFinite(dir)) {
            interpretacao = `À esquerda o faturamento tende a ${fmt(esq)} e à direita a ${fmt(dir)}. ` +
                `Como os lados são diferentes, o limite não existe: há um salto no faturamento.`;
        } else if (L === Infinity || L === -Infinity) {
            interpretacao = `Perto de x = ${A} o valor ${L > 0 ? "explode para +∞" : "despenca para −∞"} (assíntota vertical).`;
        } else if (!isNaN(esq) || !isNaN(dir)) {
            interpretacao = `Os lados vão para valores diferentes (esquerda: ${fmt(esq)}, direita: ${fmt(dir)}), então o limite não existe.`;
        } else {
            interpretacao = "Os valores oscilam ou não existem perto do ponto: o limite não existe.";
        }

        return { continuidade, interpretacao };
    }

    // Situação real de faturamento que explica o que o gráfico mostra
    function exemploLimite(a, infinito, esq, dir, L, fa, fx) {
        const R = UI.reais;
        const A = fmt(a);

        if (infinito) {
            if (isFinite(L)) {
                const xg = Math.sign(a) * 1e6;
                return [
                    "Uma padaria de bairro investe cada vez mais em propaganda (x cresce sem parar). " +
                    "No começo cada real investido traz muitos clientes novos, mas o bairro tem um número limitado de moradores.",
                    `Por isso o faturamento se aproxima de **${R(L)} mil**, mas nunca passa disso: é o **teto do mercado** ` +
                    `(a linha tracejada). Mesmo com x = 1.000.000, f(x) = ${fmt(fx(xg), 4)}.`
                ];
            }
            if (L === Infinity) {
                return ["Um curso online pode ser vendido infinitas vezes sem custo extra: quanto mais o tempo passa (x → ∞), " +
                    "mais o faturamento cresce, **sem teto**. Por isso o limite é +∞."];
            }
            if (L === -Infinity) {
                return ["Uma empresa que gasta mais do que fatura todo mês: com o passar do tempo (x → ∞) o prejuízo só aumenta, " +
                    "**sem fundo**. Por isso o limite é −∞."];
            }
            return ["Uma sorveteria fatura muito no verão e pouco no inverno, ano após ano: o faturamento sobe e desce para sempre " +
                "e **não se aproxima de um único valor**. Por isso o limite no infinito não existe."];
        }

        // Os dois lados existem e são iguais
        if (isFinite(esq) && isFinite(dir) && mesmoValor(esq, dir)) {
            if (isFinite(fa) && mesmoValor(fa, esq)) {
                return [
                    `Faturamento sem surpresas: vendendo ${fmt(a - 0.1, 4)} ou ${fmt(a + 0.1, 4)} unidades, ` +
                    `o faturamento fica perto de **${R(esq)}**, e com exatamente ${A} unidades é **${R(fa)}**.`,
                    "Não tem degrau nem buraco no gráfico: a função é **contínua**, então basta substituir x na fórmula."
                ];
            }
            return [
                `A fórmula calcula o faturamento, mas com exatamente **${A} unidades** a conta "trava" ` +
                (isFinite(fa) ? `(dá ${fmt(fa, 4)}, diferente do esperado)` : "(dá 0/0, uma divisão impossível)") + ".",
                `Mesmo assim, vendendo ${fmt(a - 0.001, 4)} ou ${fmt(a + 0.001, 4)} unidades o faturamento fica colado em **${R(esq)}**. ` +
                `O limite mostra o valor que "deveria" estar ali: **${R(esq)}** (a bolinha vazada no gráfico). ` +
                "Simplificando a fórmula, o buraco some."
            ];
        }

        // Lados diferentes, ambos finitos: degrau
        if (isFinite(esq) && isFinite(dir)) {
            return [
                `É como um preço de atacado: até ${A} unidades o preço por unidade é um, a partir de ${A} é outro.`,
                `Logo antes de ${A} unidades o faturamento chega perto de **${R(esq)}**; logo depois vai para **${R(dir)}**. ` +
                `Esse **degrau** no gráfico significa que cada lado aponta para um valor diferente, então o limite **não existe**.`
            ];
        }

        // Algum lado vai para o infinito
        if (!isNaN(esq) || !isNaN(dir)) {
            return [
                `Pense no custo por unidade quando a fábrica produz quase nada: o custo fixo é dividido por um número perto de zero ` +
                `e o valor **dispara**.`,
                `É o que acontece perto de x = ${A}: o gráfico sobe (ou desce) sem parar junto da linha tracejada (assíntota vertical). ` +
                "Na prática, indica uma situação que a empresa deve evitar."
            ];
        }

        return ["Perto desse ponto o faturamento não tem um valor definido (oscila ou não existe), então não dá para prever o resultado: o limite não existe."];
    }

    function preencherTabela(fx, a, tipo, infinito) {
        const linhas = [];
        const valor = x => fmt(fx(x), 6);
        const xTexto = x => fmt(x, 6);

        if (infinito) {
            [10, 100, 1000, 1e4, 1e5, 1e6].forEach(x => {
                const xx = Math.sign(a) * x;
                linhas.push(`<tr><td>${xTexto(xx)}</td><td>${valor(xx)}</td></tr>`);
            });
        } else {
            const hs = [0.1, 0.01, 0.001, 0.0001];
            if (tipo !== "direita") {
                hs.forEach(h => linhas.push(`<tr><td>${xTexto(a - h)}</td><td>${valor(a - h)}</td></tr>`));
            }
            linhas.push(`<tr class="destaque"><td>${xTexto(a)}</td><td>${valor(a)}</td></tr>`);
            if (tipo !== "esquerda") {
                [...hs].reverse().forEach(h => linhas.push(`<tr><td>${xTexto(a + h)}</td><td>${valor(a + h)}</td></tr>`));
            }
        }
        UI.el("lim-corpo-tabela").innerHTML = linhas.join("");
    }

    function desenhar(fx, a, infinito, esq, dir, L, fa) {
        let xMin, xMax;
        if (infinito) {
            xMin = a > 0 ? 0 : -ALCANCE_X * 20;
            xMax = a > 0 ? ALCANCE_X * 20 : 0;
        } else {
            const raio = Math.max(ALCANCE_X / 2, Math.abs(a) * 1.5);
            xMin = a - raio;
            xMax = a + raio;
        }

        const pf = amostrar(fx, xMin, xMax, 2000);
        const datasets = [serie("f(x)", pf, CORES.f, { gerador: fx })];
        const extras = [];

        if (infinito && isFinite(L)) {
            datasets.push(serie(`y = ${fmt(L)} (assíntota)`, [{ x: xMin, y: L }, { x: xMax, y: L }], CORES.destaque,
                { borderWidth: 2, borderDash: [6, 6] }));
            extras.push(L);
        }
        if (!infinito) {
            // Bolinha vazada onde a função se aproxima; cheia onde f(a) existe
            const ladoEsq = mesmoValor(esq, dir) ? "" : "⁻";
            if (isFinite(esq)) { datasets.push(marcador(`lim x→${fmt(a)}${ladoEsq} = ${fmt(esq)}`, [{ x: a, y: esq }], CORES.destaque, true)); extras.push(esq); }
            if (isFinite(dir) && !mesmoValor(esq, dir)) { datasets.push(marcador(`lim x→${fmt(a)}⁺ = ${fmt(dir)}`, [{ x: a, y: dir }], CORES.derivada, true)); extras.push(dir); }
            if (isFinite(fa)) { datasets.push(marcador(`f(${fmt(a)}) = ${fmt(fa, 4)}`, [{ x: a, y: fa }], CORES.texto)); extras.push(fa); }
            if (!isFinite(esq) && !isNaN(esq) || !isFinite(dir) && !isNaN(dir)) {
                const fy = faixaY([pf]);
                if (fy.yMin !== undefined) {
                    datasets.push(serie(`x = ${fmt(a)} (assíntota)`, [{ x: a, y: fy.yMin }, { x: a, y: fy.yMax }], CORES.destaque,
                        { borderWidth: 2, borderDash: [6, 6] }));
                }
            }
        }

        desenharNoCanvas("lim-grafico", datasets, {
            xMin, xMax, ...faixaY([pf], extras),
            xTitulo: "x", yTitulo: "f(x)"
        });
    }

    function mostrarErro(msg, campo) {
        UI.erro("lim-resultado", msg, campo);
        UI.texto("lim-expressao", "");
        UI.el("lim-corpo-tabela").innerHTML = "";
        ["lim-esquerda", "lim-direita", "lim-continuidade", "lim-interpretacao"].forEach(id => UI.texto(id, "—"));
        UI.exemplo("lim-exemplo", null);
    }

    function iniciar() {
        if (!UI.el("lim-funcao").value.trim()) {
            UI.el("lim-funcao").value = "(x^2 - 100)/(x - 10)";
            UI.el("lim-ponto").value = "10";
        }
        calcular();
    }

    UI.el("lim-calcular").addEventListener("click", calcular);
    UI.el("lim-tipo").addEventListener("change", calcular);
    UI.enterAciona(["lim-funcao", "lim-ponto"], calcular);

    return { iniciar, calcular };
})();
