// =====================================================
// integrais.js — MÓDULO 4 (Aula 4)
// Integral indefinida (primitiva + C) e definida (área sob a curva).
// =====================================================

const Integrais = (function () {
    const { N, X, simplificar, texto, temX, avaliar, paraPoli, dePoli } = Expr;
    const fmt = Expr.formatarNumero;

    const ln = a => ({ k: "f", n: "ln", a });
    const abs = a => ({ k: "f", n: "abs", a });
    const mult = (a, b) => ({ k: "*", a, b });
    const div = (a, b) => ({ k: "/", a, b });
    const pot = (a, b) => ({ k: "^", a, b });

    // Se u = kx + m, devolve {k, m}
    function linear(u) {
        const p = paraPoli(u);
        if (!p || p.length > 2 || Math.abs(p[1] || 0) < 1e-12) return null;
        return { k: p[1], m: p[0] || 0 };
    }

    // a(x)/b(x) é constante? Testa em vários pontos.
    function razaoConstante(a, b) {
        const xs = [0.37, 0.81, 1.23, 1.77, 2.31, -0.53, -1.19, 3.07];
        const rs = [];
        for (const x of xs) {
            const va = avaliar(a, x), vb = avaliar(b, x);
            if (isFinite(va) && isFinite(vb) && Math.abs(vb) > 1e-9) rs.push(va / vb);
        }
        if (rs.length < 3) return null;
        const r0 = rs[0];
        if (!rs.every(r => Math.abs(r - r0) <= 1e-7 * Math.max(1, Math.abs(r0)))) return null;
        return Math.round(r0 * 1e9) / 1e9;
    }

    // Separa um produto em fatores: 2·x·e^(x²) → [2, x, e^(x²)]
    function fatores(no) {
        if (no.k === "*") return [...fatores(no.a), ...fatores(no.b)];
        if (no.k === "/") {
            const den = no.b.k === "^" && !temX(no.b.b)
                ? pot(no.b.a, simplificar({ k: "neg", a: no.b.b }))
                : pot(no.b, N(-1));
            return [...fatores(no.a), den];
        }
        return [no];
    }

    // Para a substituição: F = h(g(x)). Devolve g e a primitiva de h em g.
    function externa(F) {
        if (F.k === "^" && F.a.k === "c" && F.a.n === "e" && temX(F.b)) return { g: F.b, prim: F };
        if (F.k === "f" && F.n === "sin") return { g: F.a, prim: { k: "neg", a: { k: "f", n: "cos", a: F.a } } };
        if (F.k === "f" && F.n === "cos") return { g: F.a, prim: { k: "f", n: "sin", a: F.a } };
        if (F.k === "f" && F.n === "sqrt") return { g: F.a, prim: mult(N(2 / 3), pot(F.a, N(1.5))) };
        if (F.k === "^" && temX(F.a) && !temX(F.b) && F.a.k !== "x") {
            const n = avaliar(F.b, 0);
            if (Math.abs(n + 1) < 1e-12) return { g: F.a, prim: ln(abs(F.a)) };
            return { g: F.a, prim: div(pot(F.a, N(n + 1)), N(n + 1)) };
        }
        return null;
    }

    // Regra da substituição: ∫ k·g'(x)·h(g(x)) dx = k·H(g(x))
    function substituicao(no) {
        const fs = fatores(no);
        for (let i = 0; i < fs.length; i++) {
            const cand = externa(fs[i]);
            if (!cand) continue;
            const outros = fs.filter((_, j) => j !== i);
            const resto = outros.length ? outros.reduce((a, b) => mult(a, b)) : N(1);
            const dg = Derivadas.derivar(cand.g);
            const k = razaoConstante(resto, dg);
            if (k !== null) {
                return { res: mult(N(k), cand.prim), g: cand.g };
            }
        }
        return null;
    }

    // Integra "no" registrando o passo a passo
    function integrar(no, passos) {

        function I(f) {
            const indice = passos.length;
            passos.push(null);
            const { regra, res } = regraPara(f);
            const r = simplificar(res);
            const integrando = (f.k === "+" || f.k === "-") ? `(${texto(f)})` : texto(f);
            passos[indice] = { regra, formula: `∫ ${integrando} dx = ${texto(r)}` };
            return r;
        }

        function falha(f) {
            throw new Expr.ErroExpressao(
                `Não encontrei a primitiva de ${texto(f)} com as regras estudadas ` +
                `(constante, potência, soma, exponencial, trigonométrica e substituição).`
            );
        }

        function regraPara(f) {
            if (!temX(f)) return { regra: "Regra da constante", res: mult(f, X) };

            switch (f.k) {
                case "x":
                    return { regra: "Regra da potência", res: div(pot(X, N(2)), N(2)) };

                case "+": case "-":
                    return { regra: "Regra da soma/subtração", res: { k: f.k, a: I(f.a), b: I(f.b) } };

                case "neg":
                    return { regra: "Regra do múltiplo constante", res: { k: "neg", a: I(f.a) } };

                case "*": {
                    if (!temX(f.a)) return { regra: "Regra do múltiplo constante", res: mult(f.a, I(f.b)) };
                    if (!temX(f.b)) return { regra: "Regra do múltiplo constante", res: mult(f.b, I(f.a)) };
                    const p = paraPoli(f);
                    if (p) return { regra: "Distributiva (expandir o produto)", res: I(dePoli(p)) };
                    const s = substituicao(f);
                    if (s) return { regra: `Regra da substituição (u = ${texto(s.g)})`, res: s.res };
                    return falha(f);
                }

                case "/": {
                    if (!temX(f.b)) return { regra: "Regra do múltiplo constante", res: div(I(f.a), f.b) };
                    const pn = paraPoli(f.a), pd = paraPoli(f.b);
                    if (pn && pd) {
                        const naoNulos = pd.map((c, i) => [c, i]).filter(([c]) => Math.abs(c) > 1e-12);
                        if (naoNulos.length === 1) {
                            // denominador c·xᵏ: divide termo a termo
                            const [c, k] = naoNulos[0];
                            let soma = null;
                            pn.forEach((coef, i) => {
                                if (Math.abs(coef) < 1e-12) return;
                                const termo = mult(N(coef / c), pot(X, N(i - k)));
                                soma = soma ? { k: "+", a: soma, b: termo } : termo;
                            });
                            if (pn.length === 1 && k === 1) {
                                // c/x → c·ln|x|
                                return { regra: "Regra do logaritmo (∫ 1/x dx = ln|x|)", res: mult(N(pn[0] / c), ln(abs(X))) };
                            }
                            return { regra: "Divisão termo a termo", res: I(simplificar(soma || N(0))) };
                        }
                        const L = linear(f.b);
                        if (L && pn.length === 1) {
                            return { regra: "Regra do logaritmo + Substituição", res: mult(N(pn[0] / L.k), ln(abs(f.b))) };
                        }
                    }
                    const s = substituicao(f);
                    if (s) return { regra: `Regra da substituição (u = ${texto(s.g)})`, res: s.res };
                    return falha(f);
                }

                case "^": {
                    const u = f.a, v = f.b;
                    if (!temX(v)) {
                        const n = avaliar(v, 0);
                        const L = linear(u);
                        if (L) {
                            const sub = u.k === "x" ? "" : " + Substituição";
                            if (Math.abs(n + 1) < 1e-12) {
                                return { regra: "Regra do logaritmo (∫ 1/x dx = ln|x|)" + sub, res: mult(N(1 / L.k), ln(abs(u))) };
                            }
                            return { regra: "Regra da potência" + sub, res: div(pot(u, N(n + 1)), N(L.k * (n + 1))) };
                        }
                        const p = paraPoli(f);
                        if (p) return { regra: "Distributiva (expandir a potência)", res: I(dePoli(p)) };
                    } else if (!temX(u)) {
                        const L = linear(v);
                        if (L) {
                            const ehE = u.k === "c" && u.n === "e";
                            const sub = v.k === "x" ? "" : " + Substituição";
                            if (ehE) return { regra: "Regra da exponencial" + sub, res: div(f, N(L.k)) };
                            return { regra: "Regra da exponencial (aˣ)" + sub, res: div(f, mult(N(L.k), ln(u))) };
                        }
                    }
                    const s = substituicao(f);
                    if (s) return { regra: `Regra da substituição (u = ${texto(s.g)})`, res: s.res };
                    return falha(f);
                }

                case "f": {
                    const u = f.a, L = linear(u);
                    if (L) {
                        const sub = u.k === "x" ? "" : " + Substituição";
                        const k = N(L.k);
                        switch (f.n) {
                            case "sin": return { regra: "Regra trigonométrica" + sub, res: div({ k: "neg", a: { k: "f", n: "cos", a: u } }, k) };
                            case "cos": return { regra: "Regra trigonométrica" + sub, res: div({ k: "f", n: "sin", a: u }, k) };
                            case "tan": return { regra: "Regra trigonométrica" + sub, res: div({ k: "neg", a: ln(abs({ k: "f", n: "cos", a: u })) }, k) };
                            case "sqrt": return { regra: "Regra da potência (√u = u^(1/2))" + sub, res: div(mult(N(2 / 3), pot(u, N(1.5))), k) };
                            case "ln": return { regra: "Integração por partes" + sub, res: div({ k: "-", a: mult(u, ln(u)), b: u }, k) };
                        }
                    }
                    const s = substituicao(f);
                    if (s) return { regra: `Regra da substituição (u = ${texto(s.g)})`, res: s.res };
                    return falha(f);
                }

                case "pw":
                    throw new Expr.ErroExpressao("Função por partes: use a integral definida (cálculo numérico).");
            }
            return falha(f);
        }

        return I(no);
    }

    // Regra de Simpson (cálculo numérico da área)
    function simpson(f, a, b, n = 2000) {
        const h = (b - a) / n;
        let s = f(a) + f(b);
        for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
        return s * h / 3;
    }

    function calcular() {
        const campos = ["int-funcao", "int-a", "int-b"];
        UI.limparErros(campos);
        const definida = UI.el("int-tipo").value === "definida";

        let f;
        try {
            f = Expr.analisar(UI.el("int-funcao").value);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            return mostrarErro(e.message, "int-funcao");
        }

        // Primitiva com passo a passo
        const passos = [];
        let F = null, motivo = "";
        try {
            F = integrar(f, passos);
        } catch (e) {
            if (!(e instanceof Expr.ErroExpressao)) throw e;
            motivo = e.message;
        }

        const regras = new Set();
        passos.filter(Boolean).forEach(p => p.regra.split(" + ").forEach(r => regras.add(r.replace(/ \(.*\)$/, ""))));

        if (!definida) {
            if (!F) return mostrarErro(motivo, "int-funcao");
            UI.el("int-funcao-exibida").textContent = texto(f);
            UI.texto("int-resultado", `${texto(F)} + C`);
            mostrarPassos(passos);
            UI.texto("int-valor", "— (escolha \"Definida\" para calcular a área)");
            UI.texto("int-regras", [...regras].join(", ") || "—");
            UI.exemplo("int-exemplo", exemploIndefinida(F));
            return desenharIndefinida(f, F);
        }

        // Integral definida
        let a, b;
        try { a = Expr.lerNumero(UI.el("int-a").value); }
        catch (e) { return mostrarErro("Limite inferior (a) inválido.", "int-a"); }
        try { b = Expr.lerNumero(UI.el("int-b").value); }
        catch (e) { return mostrarErro("Limite superior (b) inválido.", "int-b"); }

        const fx = x => avaliar(f, x);

        // A função precisa existir em todo o intervalo
        const n = 2000;
        for (let i = 0; i <= n; i++) {
            const x = a + (b - a) * i / n;
            if (!isFinite(fx(x))) {
                return mostrarErro(
                    `f(x) não existe em x = ${fmt(x, 4)}, dentro do intervalo [${fmt(a)}, ${fmt(b)}]. ` +
                    `Escolha outro intervalo (a integral seria imprópria).`, "int-funcao");
            }
        }

        let valor;
        const numerico = simpson(fx, a, b);
        if (F) {
            const Fb = avaliar(F, b), Fa = avaliar(F, a);
            valor = Fb - Fa;
            if (!isFinite(valor)) valor = numerico;
            passos.push({
                regra: "Teorema Fundamental do Cálculo",
                formula: `F(${fmt(b)}) − F(${fmt(a)}) = ${fmt(Fb, 4)} − ${fmt(Fa, 4)} = ${fmt(valor, 4)}`
            });
            regras.add("Teorema Fundamental do Cálculo");
        } else {
            valor = numerico;
            passos.length = 0;
            passos.push({ regra: "Sem primitiva pelas regras estudadas", formula: motivo });
            passos.push({ regra: "Regra de Simpson (cálculo numérico)", formula: `área ≈ ${fmt(valor, 4)}` });
            regras.add("Regra de Simpson (numérica)");
        }

        if (Math.abs(valor) < 1e-10) valor = 0;
        const exato = Math.abs(valor - Math.round(valor)) < 1e-9;
        const textoValor = exato ? fmt(valor) : `≈ ${fmt(valor, 4)}`;

        UI.el("int-funcao-exibida").innerHTML =
            `<sub>${UI.escapar(fmt(a, 4))}</sub><sup>${UI.escapar(fmt(b, 4))}</sup> (${UI.escapar(texto(f))})`;
        UI.texto("int-resultado", textoValor);
        mostrarPassos(passos);

        let interpretacao = `${textoValor} → faturamento total acumulado de x = ${fmt(a, 4)} até x = ${fmt(b, 4)}`;
        if (valor < 0) interpretacao += " (valor negativo: a curva fica mais abaixo do eixo x do que acima)";
        UI.texto("int-valor", interpretacao);
        UI.texto("int-regras", [...regras].join(", ") || "—");
        UI.exemplo("int-exemplo", exemploDefinida(fx, a, b, valor));

        desenharDefinida(f, a, b);
    }

    // Situação real de faturamento para a integral definida (área pintada)
    function exemploDefinida(fx, a, b, valor) {
        const R = UI.reais;
        const ini = Math.min(a, b), fim = Math.max(a, b);
        const meses = fim - ini;
        const textos = [
            "Pense em f(x) como o faturamento **por mês** de uma sorveteria (em R$ mil), e x como o mês. " +
            `A área pintada de x = ${fmt(a, 4)} até x = ${fmt(b, 4)} junta o faturamento de todos esses meses: ` +
            `no total foram **${R(valor)} mil**.`,
            `É como somar todos os extratos mensais de uma vez. No início do período a loja faturava ${R(fx(ini))} mil por mês ` +
            `e no fim ${R(fx(fim))} mil por mês` +
            (meses > 0 ? `; na média, **${R(valor / (b - a))} mil por mês** durante ${fmt(meses, 4)} meses.` : ".")
        ];
        if (valor < 0) {
            textos.push("O resultado deu negativo porque a curva passa mais tempo abaixo do eixo x: na prática, os meses de prejuízo superaram os de lucro.");
        }
        return textos;
    }

    // Situação real de faturamento para a integral indefinida (primitiva)
    function exemploIndefinida(F) {
        return [
            "Pense em f(x) como quanto a sorveteria fatura **por mês** (a curva azul). A primitiva F(x) (curva rosa) é o " +
            "**faturamento acumulado** até o mês x: o total que já entrou no caixa desde o começo.",
            `Aqui F(x) = ${texto(F)} + C. O **"+ C"** é o valor que já estava no caixa antes de começar a contar ` +
            "(o saldo inicial): ele muda onde a curva começa, mas não muda o quanto ela cresce.",
            "Para saber quanto a loja faturou entre dois meses, escolha **Definida** e informe o mês inicial (a) e o final (b)."
        ];
    }

    function mostrarPassos(passos) {
        const lista = passos.filter(Boolean);
        const LIMITE = 14;
        UI.passos("int-passos", lista.length > LIMITE
            ? [...lista.slice(0, LIMITE), { regra: "…", formula: `mais ${lista.length - LIMITE} etapas parecidas` }]
            : lista);
    }

    function desenharIndefinida(f, F) {
        const xMin = -ALCANCE_X, xMax = ALCANCE_X;
        const pf = amostrar(x => avaliar(f, x), xMin, xMax);
        const pF = amostrar(x => avaliar(F, x), xMin, xMax);
        desenharNoCanvas("int-grafico", [
            serie("f(x)", pf, CORES.f, { gerador: x => avaliar(f, x) }),
            serie("F(x) (primitiva com C = 0)", pF, CORES.derivada, { borderWidth: 2, gerador: x => avaliar(F, x) })
        ], { xMin, xMax, ...faixaY([pf, pF]), xTitulo: "x", yTitulo: "y" });
    }

    function desenharDefinida(f, a, b) {
        const ini = Math.min(a, b), fim = Math.max(a, b);
        const folga = Math.max(ALCANCE_X / 2, (fim - ini) * 1.5);
        const xMin = ini - folga, xMax = fim + folga;
        const fx = x => avaliar(f, x);

        const pf = amostrar(fx, xMin, xMax);
        const area = [];
        for (let i = 0; i <= 300; i++) {
            const x = ini + (fim - ini) * i / 300;
            area.push({ x, y: fx(x) });
        }

        desenharNoCanvas("int-grafico", [
            serie("f(x)", pf, CORES.f, { gerador: fx }),
            serie(`Área de ${fmt(a, 4)} a ${fmt(b, 4)}`, area, CORES.area, {
                borderWidth: 0, fill: "origin", backgroundColor: CORES.area, pointHoverRadius: 0
            })
        ], { xMin, xMax, ...faixaY([pf], [0]), xTitulo: "x (tempo ou quantidade)", yTitulo: "f(x)" });
    }

    function mostrarErro(msg, campo) {
        UI.erro("int-resultado", msg, campo);
        UI.el("int-funcao-exibida").textContent = UI.el("int-funcao").value || "?";
        UI.el("int-passos").innerHTML = "";
        UI.texto("int-valor", "—");
        UI.texto("int-regras", "—");
        UI.exemplo("int-exemplo", null);
    }

    // Mostra os campos a e b só na integral definida
    function atualizarTipo() {
        UI.el("int-campo-limites").hidden = UI.el("int-tipo").value !== "definida";
    }

    function iniciar() {
        if (!UI.el("int-funcao").value.trim()) {
            UI.el("int-funcao").value = "4x + 100";
            UI.el("int-tipo").value = "definida";
            UI.el("int-a").value = "0";
            UI.el("int-b").value = "10";
        }
        atualizarTipo();
        calcular();
    }

    UI.el("int-tipo").addEventListener("change", () => { atualizarTipo(); calcular(); });
    UI.el("int-calcular").addEventListener("click", calcular);
    UI.enterAciona(["int-funcao", "int-a", "int-b"], calcular);
    atualizarTipo();

    return { iniciar, calcular, integrar };
})();
