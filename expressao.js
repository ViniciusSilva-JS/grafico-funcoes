// =====================================================
// expressao.js — base usada por Limites, Derivadas e Integrais
// Lê o texto digitado (ex: "3x^2 + 2x - 5"), transforma numa árvore,
// calcula valores, simplifica e escreve a expressão de volta bonita.
// =====================================================

const Expr = (function () {

    class ErroExpressao extends Error {}

    // ---------- 1. Leitura do texto (tokens) ----------

    const FUNCOES = {
        sen: "sin", sin: "sin", cos: "cos", tan: "tan", tg: "tan",
        ln: "ln", log: "log", sqrt: "sqrt", raiz: "sqrt", exp: "exp", abs: "abs"
    };
    // Nomes reconhecidos, do maior para o menor (para "sen" vencer "se", "exp" vencer "e"...)
    const NOMES = [...Object.keys(FUNCOES), "pi", "se", "x", "e"].sort((a, b) => b.length - a.length);

    function tokenizar(texto) {
        const s = texto.toLowerCase()
            .replace(/[−–—]/g, "-").replace(/[·×]/g, "*").replace(/÷/g, "/")
            .replace(/²/g, "^2").replace(/³/g, "^3").replace(/π/g, "pi").replace(/√/g, "sqrt")
            .replace(/≤/g, "<=").replace(/≥/g, ">=").replace(/\*\*/g, "^");

        const tokens = [];
        let i = 0;
        while (i < s.length) {
            const ch = s[i];
            if (/\s/.test(ch)) { i++; continue; }

            // Número (aceita vírgula ou ponto como decimal: 0,05 ou 0.05)
            if (/[0-9.,]/.test(ch)) {
                let j = i;
                while (j < s.length && /[0-9.,]/.test(s[j])) j++;
                const bruto = s.slice(i, j).replace(",", ".");
                if (!/^(\d+\.?\d*|\.\d+)$/.test(bruto)) {
                    throw new ErroExpressao(`Número inválido: "${s.slice(i, j)}"`);
                }
                tokens.push({ t: "num", v: parseFloat(bruto) });
                i = j;
                continue;
            }

            // Letras: x, e, pi, funções e a palavra "se" (funções por partes)
            if (/[a-z]/.test(ch)) {
                const nome = NOMES.find(n => s.startsWith(n, i));
                if (!nome) throw new ErroExpressao(`Símbolo desconhecido: "${ch}". Use x como variável.`);
                if (nome === "se") tokens.push({ t: "se" });
                else if (FUNCOES[nome]) tokens.push({ t: "fn", n: FUNCOES[nome] });
                else if (nome === "x") tokens.push({ t: "x" });
                else tokens.push({ t: "const", n: nome });
                i += nome.length;
                continue;
            }

            if (s.startsWith("<=", i) || s.startsWith(">=", i)) {
                tokens.push({ t: "cmp", v: s.substr(i, 2) });
                i += 2;
                continue;
            }
            if (ch === "<" || ch === ">") { tokens.push({ t: "cmp", v: ch }); i++; continue; }
            if ("+-*/^()|;".includes(ch)) { tokens.push({ t: ch }); i++; continue; }

            throw new ErroExpressao(`Caractere inválido: "${ch}"`);
        }
        return tokens;
    }

    // ---------- 2. Montagem da árvore (parser) ----------
    // Nós: {k:"n",v} número | {k:"x"} | {k:"c",n:"e"|"pi"} | {k:"+"|"-"|"*"|"/"|"^",a,b}
    //      {k:"neg",a} | {k:"f",n,a} função | {k:"pw",pecas} função por partes

    function analisar(texto) {
        if (texto === undefined || texto === null || !String(texto).trim()) {
            throw new ErroExpressao("Digite uma função.");
        }
        const tokens = tokenizar(String(texto));
        let pos = 0;
        const ver = () => tokens[pos];

        function esperar(t, msg) {
            const tk = tokens[pos];
            if (!tk || tk.t !== t) throw new ErroExpressao(msg);
            pos++;
            return tk;
        }

        const iniciaFator = tk => tk && ["num", "x", "const", "fn", "("].includes(tk.t);

        function expr() {
            let no = termo();
            while (ver() && (ver().t === "+" || ver().t === "-")) {
                const op = tokens[pos++].t;
                no = { k: op, a: no, b: termo() };
            }
            return no;
        }

        function termo() {
            let no = unario();
            while (true) {
                const tk = ver();
                if (tk && (tk.t === "*" || tk.t === "/")) {
                    pos++;
                    no = { k: tk.t, a: no, b: unario() };
                } else if (iniciaFator(tk)) {
                    // multiplicação implícita: 3x, 2(x+1), x(100 - 2x)
                    no = { k: "*", a: no, b: potencia() };
                } else break;
            }
            return no;
        }

        function unario() {
            if (ver() && ver().t === "-") { pos++; return { k: "neg", a: unario() }; }
            if (ver() && ver().t === "+") { pos++; return unario(); }
            return potencia();
        }

        function potencia() {
            const base = primario();
            if (ver() && ver().t === "^") {
                pos++;
                return { k: "^", a: base, b: unario() };
            }
            return base;
        }

        function primario() {
            const tk = ver();
            if (!tk) throw new ErroExpressao("Expressão incompleta.");
            if (tk.t === "num") { pos++; return { k: "n", v: tk.v }; }
            if (tk.t === "x") { pos++; return { k: "x" }; }
            if (tk.t === "const") { pos++; return { k: "c", n: tk.n }; }
            if (tk.t === "(") {
                pos++;
                const no = expr();
                esperar(")", "Parêntese aberto e não fechado.");
                return no;
            }
            if (tk.t === "|") {
                pos++;
                const no = expr();
                esperar("|", "Módulo |...| não fechado.");
                return { k: "f", n: "abs", a: no };
            }
            if (tk.t === "fn") {
                pos++;
                let arg;
                if (ver() && ver().t === "(") {
                    pos++;
                    arg = expr();
                    esperar(")", "Parêntese aberto e não fechado.");
                } else {
                    arg = potencia();
                }
                if (tk.n === "exp") return { k: "^", a: { k: "c", n: "e" }, b: arg };
                return { k: "f", n: tk.n, a: arg };
            }
            const nomes = { ")": "parêntese fechando", "se": "se", "cmp": "comparação", ";": ";" };
            throw new ErroExpressao(`Símbolo fora do lugar: "${nomes[tk.t] || tk.t}".`);
        }

        // Funções por partes: "10x se x < 100; 8x se x >= 100"
        function peca() {
            const e = expr();
            const conds = [];
            if (ver() && ver().t === "se") {
                pos++;
                let esq = expr();
                if (!ver() || ver().t !== "cmp") {
                    throw new ErroExpressao("Condição inválida. Use <, >, <= ou >= (ex: 10x se x < 100).");
                }
                while (ver() && ver().t === "cmp") {
                    const op = tokens[pos++].v;
                    const dir = expr();
                    conds.push({ op, a: esq, b: dir });
                    esq = dir;
                }
            }
            return { expr: e, conds };
        }

        const pecas = [peca()];
        while (ver() && ver().t === ";") {
            pos++;
            if (!ver()) break;
            pecas.push(peca());
        }
        if (pos < tokens.length) {
            throw new ErroExpressao("Expressão com símbolos sobrando. Confira os parênteses e operadores.");
        }
        if (pecas.length === 1 && pecas[0].conds.length === 0) return pecas[0].expr;
        return { k: "pw", pecas };
    }

    // ---------- 3. Cálculo numérico ----------

    function avaliar(no, x) {
        switch (no.k) {
            case "n": return no.v;
            case "x": return x;
            case "c": return no.n === "e" ? Math.E : Math.PI;
            case "+": return avaliar(no.a, x) + avaliar(no.b, x);
            case "-": return avaliar(no.a, x) - avaliar(no.b, x);
            case "*": return avaliar(no.a, x) * avaliar(no.b, x);
            case "/": {
                const d = avaliar(no.b, x);
                return d === 0 ? NaN : avaliar(no.a, x) / d;
            }
            case "^": {
                const a = avaliar(no.a, x), b = avaliar(no.b, x);
                if (a === 0 && b < 0) return NaN;
                return Math.pow(a, b);
            }
            case "neg": return -avaliar(no.a, x);
            case "f": {
                const a = avaliar(no.a, x);
                switch (no.n) {
                    case "sin": return Math.sin(a);
                    case "cos": return Math.cos(a);
                    case "tan": return Math.abs(Math.cos(a)) < 1e-15 ? NaN : Math.tan(a);
                    case "ln": return a > 0 ? Math.log(a) : NaN;
                    case "log": return a > 0 ? Math.log10(a) : NaN;
                    case "sqrt": return a >= 0 ? Math.sqrt(a) : NaN;
                    case "abs": return Math.abs(a);
                }
                return NaN;
            }
            case "pw": {
                for (const p of no.pecas) {
                    const ok = p.conds.every(c => comparar(avaliar(c.a, x), c.op, avaliar(c.b, x)));
                    if (ok) return avaliar(p.expr, x);
                }
                return NaN;
            }
        }
        return NaN;
    }

    function comparar(a, op, b) {
        switch (op) {
            case "<": return a < b;
            case ">": return a > b;
            case "<=": return a <= b;
            case ">=": return a >= b;
        }
        return false;
    }

    function temX(no) {
        switch (no.k) {
            case "x": return true;
            case "n": case "c": return false;
            case "neg": case "f": return temX(no.a);
            case "pw": return true;
            default: return temX(no.a) || temX(no.b);
        }
    }

    const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // ---------- 4. Simplificação ----------

    const N = v => ({ k: "n", v });
    const X = { k: "x" };
    const ehNum = (no, v) => no.k === "n" && (v === undefined || Math.abs(no.v - v) < 1e-12);
    const basePot = no => no.k === "^" ? [no.a, no.b] : [no, N(1)];
    const ehPotX = no => no.k === "x" || (no.k === "^" && no.a.k === "x" && no.b.k === "n");

    function simp(no) {
        switch (no.k) {
            case "n": case "x": case "c": return no;

            case "pw":
                return { k: "pw", pecas: no.pecas.map(p => ({ expr: simp(p.expr), conds: p.conds })) };

            case "neg": {
                const a = simp(no.a);
                if (a.k === "n") return N(-a.v);
                if (a.k === "neg") return a.a;
                if (a.k === "*" && a.a.k === "n") return simp({ k: "*", a: N(-a.a.v), b: a.b });
                return { k: "neg", a };
            }

            case "f": {
                const a = simp(no.a);
                if (a.k === "n") {
                    const r = avaliar({ k: "f", n: no.n, a }, 0);
                    if (isFinite(r) && Math.abs(r - Math.round(r)) < 1e-12) return N(Math.round(r));
                }
                if (no.n === "ln" && a.k === "c" && a.n === "e") return N(1);
                return { k: "f", n: no.n, a };
            }

            case "+": {
                const a = simp(no.a), b = simp(no.b);
                if (ehNum(a, 0)) return b;
                if (ehNum(b, 0)) return a;
                if (a.k === "n" && b.k === "n") return N(a.v + b.v);
                if (b.k === "neg") return simp({ k: "-", a, b: b.a });
                if (b.k === "n" && b.v < 0) return { k: "-", a, b: N(-b.v) };
                if (b.k === "*" && b.a.k === "n" && b.a.v < 0) {
                    return simp({ k: "-", a, b: { k: "*", a: N(-b.a.v), b: b.b } });
                }
                if (a.k === "neg") return simp({ k: "-", a: b, b: a.a });
                if (igual(a, b)) return simp({ k: "*", a: N(2), b: a });
                return { k: "+", a, b };
            }

            case "-": {
                const a = simp(no.a), b = simp(no.b);
                if (ehNum(b, 0)) return a;
                if (ehNum(a, 0)) return simp({ k: "neg", a: b });
                if (a.k === "n" && b.k === "n") return N(a.v - b.v);
                if (igual(a, b)) return N(0);
                if (b.k === "neg") return simp({ k: "+", a, b: b.a });
                if (b.k === "n" && b.v < 0) return { k: "+", a, b: N(-b.v) };
                if (b.k === "*" && b.a.k === "n" && b.a.v < 0) {
                    return simp({ k: "+", a, b: { k: "*", a: N(-b.a.v), b: b.b } });
                }
                return { k: "-", a, b };
            }

            case "*": {
                let a = simp(no.a), b = simp(no.b);
                if (ehNum(a, 0) || ehNum(b, 0)) return N(0);
                if (ehNum(a, 1)) return b;
                if (ehNum(b, 1)) return a;
                if (ehNum(a, -1)) return simp({ k: "neg", a: b });
                if (ehNum(b, -1)) return simp({ k: "neg", a });
                if (a.k === "n" && b.k === "n") return N(a.v * b.v);
                if (b.k === "n") [a, b] = [b, a]; // número sempre na frente
                if (a.k === "neg") return simp({ k: "neg", a: { k: "*", a: a.a, b } });
                if (b.k === "neg") return simp({ k: "neg", a: { k: "*", a, b: b.a } });
                if (a.k === "n" && b.k === "*" && b.a.k === "n") return simp({ k: "*", a: N(a.v * b.a.v), b: b.b });
                if (a.k === "n" && b.k === "/" && b.a.k === "n") return simp({ k: "/", a: N(a.v * b.a.v), b: b.b });
                if (a.k !== "n" && b.k === "*" && b.a.k === "n") return simp({ k: "*", a: b.a, b: { k: "*", a, b: b.b } });
                if (a.k === "*" && a.a.k === "n") return simp({ k: "*", a: a.a, b: { k: "*", a: a.b, b } });
                const [ba, ea] = basePot(a), [bb, eb] = basePot(b);
                if (igual(ba, bb) && ea.k === "n" && eb.k === "n") return simp({ k: "^", a: ba, b: N(ea.v + eb.v) });
                if (b.k === "/" && ehNum(b.a, 1)) return simp({ k: "/", a, b: b.b });
                if (a.k === "/" && igual(a.b, b)) return a.a; // (1/x)·x = 1
                if (b.k === "/" && igual(b.b, a)) return b.a;
                // x vem antes das funções: cos(x²)·x vira x·cos(x²)
                if (a.k !== "n" && ehPotX(b) && !ehPotX(a)) return { k: "*", a: b, b: a };
                return { k: "*", a, b };
            }

            case "/": {
                const a = simp(no.a), b = simp(no.b);
                if (ehNum(b, 0)) return { k: "/", a, b };
                if (ehNum(a, 0)) return N(0);
                if (ehNum(b, 1)) return a;
                if (a.k === "n" && b.k === "n") return N(a.v / b.v);
                if (igual(a, b)) return N(1);
                if (b.k === "n") return simp({ k: "*", a: N(1 / b.v), b: a });
                if (a.k === "neg") return simp({ k: "neg", a: { k: "/", a: a.a, b } });
                const [ba, ea] = basePot(a), [bb, eb] = basePot(b);
                if (igual(ba, bb) && ea.k === "n" && eb.k === "n") return simp({ k: "^", a: ba, b: N(ea.v - eb.v) });
                if (b.k === "/") return simp({ k: "/", a: { k: "*", a, b: b.b }, b: b.a });
                return { k: "/", a, b };
            }

            case "^": {
                const a = simp(no.a), b = simp(no.b);
                if (ehNum(b, 0)) return N(1);
                if (ehNum(b, 1)) return a;
                if (ehNum(a, 1)) return N(1);
                if (a.k === "n" && b.k === "n" && Number.isInteger(b.v)) {
                    const r = Math.pow(a.v, b.v);
                    if (isFinite(r)) return N(r);
                }
                if (a.k === "^" && a.b.k === "n" && b.k === "n") return simp({ k: "^", a: a.a, b: N(a.b.v * b.v) });
                return { k: "^", a, b };
            }
        }
        return no;
    }

    // Polinômios: [c0, c1, c2, ...] — junta termos semelhantes (ex: 50x - 50x - 200 = -200)
    function paraPoli(no) {
        switch (no.k) {
            case "n": return [no.v];
            case "x": return [0, 1];
            case "+": case "-": {
                const a = paraPoli(no.a), b = paraPoli(no.b);
                if (!a || !b) return null;
                const s = no.k === "+" ? 1 : -1;
                const r = [];
                for (let i = 0; i < Math.max(a.length, b.length); i++) r[i] = (a[i] || 0) + s * (b[i] || 0);
                return r;
            }
            case "neg": {
                const a = paraPoli(no.a);
                return a && a.map(c => -c);
            }
            case "*": {
                const a = paraPoli(no.a), b = paraPoli(no.b);
                if (!a || !b || a.length + b.length > 30) return null;
                return multPoli(a, b);
            }
            case "/": {
                const a = paraPoli(no.a);
                if (!a || temX(no.b)) return null;
                const d = avaliar(no.b, 0);
                if (!isFinite(d) || d === 0 || no.b.k === "c" || contemConst(no.b)) return null;
                return a.map(c => c / d);
            }
            case "^": {
                if (no.b.k !== "n" || !Number.isInteger(no.b.v) || no.b.v < 0 || no.b.v > 20) return null;
                const a = paraPoli(no.a);
                if (!a) return null;
                let r = [1];
                for (let i = 0; i < no.b.v; i++) r = multPoli(r, a);
                return r;
            }
        }
        return null;
    }

    function contemConst(no) {
        if (no.k === "c") return true;
        if (no.k === "n" || no.k === "x") return false;
        if (no.k === "neg" || no.k === "f") return contemConst(no.a);
        if (no.k === "pw") return true;
        return contemConst(no.a) || contemConst(no.b);
    }

    function multPoli(a, b) {
        const r = new Array(a.length + b.length - 1).fill(0);
        a.forEach((ca, i) => b.forEach((cb, j) => { r[i + j] += ca * cb; }));
        return r;
    }

    function dePoli(c) {
        let r = null;
        for (let d = c.length - 1; d >= 0; d--) {
            const v = Math.round((c[d] || 0) * 1e10) / 1e10;
            if (v === 0) continue;
            const pos = Math.abs(v);
            const base = d === 0 ? null : (d === 1 ? X : { k: "^", a: X, b: N(d) });
            const mono = base === null ? N(pos) : (pos === 1 ? base : { k: "*", a: N(pos), b: base });
            if (r === null) {
                r = v > 0 ? mono : (base === null ? N(v) : (pos === 1 ? { k: "neg", a: base } : { k: "*", a: N(v), b: base }));
            } else {
                r = { k: v < 0 ? "-" : "+", a: r, b: mono };
            }
        }
        return r || N(0);
    }

    function canon(no) {
        if (no.k === "n" || no.k === "x" || no.k === "c") return no;
        if (no.k === "pw") return { k: "pw", pecas: no.pecas.map(p => ({ expr: canon(p.expr), conds: p.conds })) };
        const p = paraPoli(no);
        if (p) return dePoli(p);
        if (no.k === "neg" || no.k === "f") return { ...no, a: canon(no.a) };
        return { ...no, a: canon(no.a), b: canon(no.b) };
    }

    const simplificar = no => simp(canon(simp(no)));

    // ---------- 5. Escrita bonita (para mostrar na tela) ----------

    const SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

    function fracao(v) {
        if (Number.isInteger(v)) return null;
        if (Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-9) return null; // decimal curto: 0.05, 1.5
        for (let q = 2; q <= 12; q++) {
            const p = Math.round(v * q);
            if (Math.abs(v * q - p) < 1e-9) return { p, q };
        }
        return null;
    }

    function formatarNumero(v, casas = 6) {
        if (v === Infinity) return "+∞";
        if (v === -Infinity) return "−∞";
        if (!isFinite(v)) return "indefinido";
        if (Math.abs(v - Math.round(v)) < 1e-9) v = Math.round(v);
        if (Object.is(v, -0)) v = 0;
        let s;
        if (Number.isInteger(v)) s = String(v);
        else {
            const fr = fracao(v);
            s = fr ? `${fr.p}/${fr.q}` : String(parseFloat(v.toFixed(casas)));
        }
        if (s.includes("e")) s = v.toPrecision(6);
        return s.replace("-", "−");
    }

    function prec(no) {
        switch (no.k) {
            case "+": case "-": return 1;
            case "*": case "/": case "neg": return 2;
            case "^": return 4;
            case "n": return no.v < 0 || formatarNumero(no.v).includes("/") ? 2 : 5;
            default: return 5;
        }
    }

    const paren = (no, min) => prec(no) < min ? `(${str(no)})` : str(no);

    // Ajustes só para exibir: x^(-2) vira 1/x², 3·x^(-1) vira 3/x
    function exibicao(no) {
        if (no.k === "n" || no.k === "x" || no.k === "c") return no;
        if (no.k === "pw") return { k: "pw", pecas: no.pecas.map(p => ({ expr: exibicao(p.expr), conds: p.conds })) };
        if (no.k === "neg") {
            const a = exibicao(no.a);
            return a.k === "n" ? N(-a.v) : { k: "neg", a }; // −2 em vez de −(2)
        }
        if (no.k === "f") return { ...no, a: exibicao(no.a) };
        const a = exibicao(no.a), b = exibicao(no.b);
        if (no.k === "^" && b.k === "n" && b.v < 0) {
            return { k: "/", a: N(1), b: ehNum(b, -1) ? a : { k: "^", a, b: N(-b.v) } };
        }
        if (no.k === "*" && b.k === "/" && ehNum(b.a, 1)) return { k: "/", a, b: b.b };
        return { k: no.k, a, b };
    }

    function str(no) {
        switch (no.k) {
            case "n": return formatarNumero(no.v);
            case "x": return "x";
            case "c": return no.n === "e" ? "e" : "π";
            case "+": return `${str(no.a)} + ${paren(no.b, 2)}`;
            case "-": return `${str(no.a)} − ${paren(no.b, 2)}`;
            case "neg": return `−${paren(no.a, 2)}`;
            case "*": return strMult(no);
            case "/": return `${paren(no.a, 2)}/${paren(no.b, 3)}`;
            case "^": {
                const base = (no.a.k === "x" || no.a.k === "c" || no.a.k === "f" || (no.a.k === "n" && no.a.v >= 0 && prec(no.a) === 5))
                    ? str(no.a) : `(${str(no.a)})`;
                const e = no.b;
                if (e.k === "n" && Number.isInteger(e.v) && e.v >= 0) {
                    return base + String(e.v).split("").map(d => SUP[d]).join("");
                }
                const atomico = e.k === "x" || e.k === "c" || (e.k === "n" && prec(e) === 5);
                return atomico ? `${base}^${str(e)}` : `${base}^(${str(e)})`;
            }
            case "f": {
                if (no.n === "abs") return `|${str(no.a)}|`;
                if (no.n === "sqrt") return `√(${str(no.a)})`;
                const nome = { sin: "sen", cos: "cos", tan: "tan", ln: "ln", log: "log" }[no.n];
                if (no.a.k === "f" && no.a.n === "abs") return nome + str(no.a); // ln|x|
                return `${nome}(${str(no.a)})`;
            }
            case "pw":
                return no.pecas.map(p => {
                    if (!p.conds.length) return str(p.expr);
                    const cond = str(p.conds[0].a) + p.conds.map(c => ` ${c.op.replace("<=", "≤").replace(">=", "≥")} ${str(c.b)}`).join("");
                    return `${str(p.expr)}, se ${cond}`;
                }).join(" ; ");
        }
        return "?";
    }

    function strMult(no) {
        const { a, b } = no;
        if (a.k === "n") {
            // também 1/2, 1/4 (0.5·x² fica x²/2)
            const meio = [2, 3, 4].map(q => ({ p: Math.round(a.v * q), q })).find(f => Math.abs(f.p) === 1 && Math.abs(a.v * f.q - f.p) < 1e-9);
            const fr = fracao(a.v) || meio;
            if (fr && temX(b)) {
                // (1/3)·x³ vira x³/3
                const sinal = fr.p < 0 ? "−" : "";
                const p = Math.abs(fr.p);
                const num = p === 1 ? paren(b, 3) : p + juntar(b);
                return `${sinal}${num}/${fr.q}`;
            }
            if (ehNum(a, -1)) return `−${paren(b, 2)}`;
            return formatarNumero(a.v) + juntar(b);
        }
        return `${paren(a, 2)}·${paren(b, 2)}`;
    }

    // Como escrever "número seguido de b": 3x, 3x², 2(x + 1), 0.05·e^x
    function juntar(b) {
        if (b.k === "*" && ehPotX(b.a)) return str(b); // 2x·cos(x²)
        if (b.k === "x" || (b.k === "^" && b.a.k === "x") || (b.k === "c" && b.n === "pi")) return str(b);
        if (prec(b) === 1) return `(${str(b)})`;
        return `·${paren(b, 2)}`;
    }

    const texto = no => str(exibicao(no));

    // Lê um número que pode ser expressão constante: "2", "pi/2", "1,5", "inf"
    function lerNumero(textoValor, aceitaInfinito = false) {
        const t = String(textoValor).trim().toLowerCase().replace(/\s/g, "");
        if (aceitaInfinito) {
            if (["inf", "+inf", "∞", "+∞", "infinito", "+infinito"].includes(t)) return Infinity;
            if (["-inf", "−inf", "-∞", "−∞", "-infinito", "−infinito"].includes(t)) return -Infinity;
        }
        if (!t) throw new ErroExpressao("Preencha o valor.");
        const no = analisar(t);
        if (temX(no)) throw new ErroExpressao("O valor não pode ter x.");
        const v = avaliar(no, 0);
        if (!isFinite(v)) throw new ErroExpressao(`Valor inválido: "${textoValor}"`);
        return v;
    }

    return {
        ErroExpressao, analisar, avaliar, temX, igual, simplificar, paraPoli, dePoli,
        texto, formatarNumero, lerNumero, N, X
    };
})();


// =====================================================
// Ajudantes de tela usados pelos módulos
// =====================================================
const UI = {
    el: id => document.getElementById(id),

    escapar(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    texto(id, valor) {
        const e = document.getElementById(id);
        e.textContent = valor;
        e.classList.remove("erro");
    },

    // Mostra mensagem de erro no resultado e marca o campo com problema
    erro(idResultado, mensagem, idCampo) {
        const e = document.getElementById(idResultado);
        e.textContent = mensagem;
        e.classList.add("erro");
        if (idCampo) document.getElementById(idCampo).classList.add("erro");
    },

    limparErros(ids) {
        ids.forEach(id => document.getElementById(id).classList.remove("erro"));
    },

    passos(idLista, passos) {
        const ol = document.getElementById(idLista);
        ol.innerHTML = passos.map(p =>
            `<li><span class="regra">${UI.escapar(p.regra)}</span><br>` +
            `<span class="formula">${UI.escapar(p.formula)}</span></li>`
        ).join("");
    },

    // Enter dentro dos campos aciona o botão
    enterAciona(idsCampos, funcao) {
        idsCampos.forEach(id => {
            document.getElementById(id).addEventListener("keydown", ev => {
                if (ev.key === "Enter") funcao();
            });
        });
    }
};

// Valor em reais no formato brasileiro: R$ 1.250 / R$ 2,50
UI.reais = function (v) {
    if (!isFinite(v)) return v > 0 ? "R$ +∞" : (v < 0 ? "−∞" : "indefinido");
    const s = Math.abs(v).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    return (v < 0 ? "−R$ " : "R$ ") + s;
};

// Preenche o quadro "Exemplo do dia a dia". Cada item vira um parágrafo.
// Use **texto** para destacar números.
UI.exemplo = function (id, paragrafos) {
    const el = document.getElementById(id);
    if (!paragrafos || !paragrafos.length) { el.innerHTML = "—"; return; }
    const html = paragrafos.map(p =>
        "<p>" + UI.escapar(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</p>"
    ).join("");
    el.innerHTML = html;
};
