// =====================================================
// aulas.js — conteúdo de ensino de cada aula (baseado no material da professora)
// Cada aula tem: introdução, cartões com conceito + exemplo do dia a dia,
// dicas, teste rápido e um botão que leva o exemplo para a calculadora.
//
// História usada em todas as aulas: a "Doceria da Vila", uma pequena empresa
// que quer entender o próprio faturamento (problema do README).
//
// Dentro dos textos, **assim** deixa a palavra em destaque.
// =====================================================

const AULAS = {

    // =================================================
    // AULA 1 — FUNÇÕES
    // =================================================
    funcoes: {
        numero: 1,
        titulo: "Funções",
        intro: [
            "Uma função é como uma **máquina**: você coloca uma entrada (x) e ela devolve uma saída (f(x)). " +
            "Cada entrada gera **uma única** saída.",
            "Na **Doceria da Vila**, x pode ser a **quantidade de brigadeiros vendidos** e f(x) o **faturamento em reais**. " +
            "Saber qual função descreve o faturamento ajuda a dona da doceria a prever quanto vai ganhar."
        ],
        conceitos: [
            { nome: "Domínio", texto: "todas as entradas possíveis (quais valores de x posso usar)." },
            { nome: "Imagem", texto: "todas as saídas que realmente aparecem (quais valores f(x) pode ter)." },
            { nome: "Gráfico", texto: "o desenho de todos os pares (x, f(x)): mostra o comportamento de uma vez." }
        ],
        grupos: [
            {
                titulo: "Os 5 tipos de função",
                cards: [
                    {
                        titulo: "1. Função Constante",
                        formula: "f(x) = b",
                        texto: "A saída é **sempre a mesma**, não importa o valor de x. O gráfico é uma reta **horizontal**.",
                        diaADia: "A doceria paga **R$ 1.500 de aluguel** por mês. Vendendo 10 ou 1.000 brigadeiros, o aluguel é o mesmo: f(x) = 1500.",
                        itens: ["Domínio: ℝ", "Imagem: {b}", "Não cresce nem decresce (taxa de variação 0)"],
                        testar: { rotulo: "Ver f(x) = 1500", valores: { tipo: "constante", a: "1500" } }
                    },
                    {
                        titulo: "2. Função Afim (1º grau)",
                        formula: "f(x) = ax + b",
                        texto: "O gráfico é uma **reta**. O **a** é a inclinação (quanto sobe a cada unidade) e o **b** é onde a reta corta o eixo y.",
                        diaADia: "Encomenda de festa: **R$ 50 de entrega + R$ 2 por brigadeiro**. f(x) = 2x + 50. Uma festa com 100 brigadeiros dá f(100) = **R$ 250**.",
                        itens: ["Domínio: ℝ  •  Imagem: ℝ", "a > 0 → crescente  •  a < 0 → decrescente", "Zero da função: x = −b/a"],
                        testar: { rotulo: "Ver f(x) = 2x + 50", valores: { tipo: "afim", a: "2", b: "50" } }
                    },
                    {
                        titulo: "3. Função Linear",
                        formula: "f(x) = ax",
                        texto: "É uma afim com **b = 0**. A reta passa pela **origem (0, 0)**: é a proporção direta.",
                        diaADia: "Venda no balcão: **R$ 2 por brigadeiro**, sem taxa. f(x) = 2x. Vendeu o dobro, faturou o dobro. Sem vendas, R$ 0.",
                        itens: ["Domínio: ℝ  •  Imagem: ℝ", "Passa por (0, 0)", "Função ímpar: f(−x) = −f(x)"],
                        testar: { rotulo: "Ver f(x) = 2x", valores: { tipo: "linear", a: "2" } }
                    },
                    {
                        titulo: "4. Função Quadrática (2º grau)",
                        formula: "f(x) = ax² + bx + c",
                        texto: "O gráfico é uma **parábola**. Se a < 0 ela abre para baixo e tem um **ponto máximo**; se a > 0, abre para cima e tem um **ponto mínimo**.",
                        diaADia: "Promoção por volume: quanto mais caixas o cliente leva, mais barato sai cada uma. O faturamento f(x) = −2x² + 100x **sobe e depois cai**. " +
                            "O vértice xᵥ = −b/2a = −100/(2·(−2)) = **25 caixas**, com faturamento máximo f(25) = **R$ 1.250**.",
                        itens: ["Vértice: xᵥ = −b/2a  e  yᵥ = f(xᵥ)", "Raízes: Δ = b² − 4ac", "Imagem depende do sinal de a"],
                        testar: { rotulo: "Ver f(x) = −2x² + 100x", valores: { tipo: "quadratica", a: "-2", b: "100", c: "0" } }
                    },
                    {
                        titulo: "5. Função Exponencial",
                        formula: "f(x) = aˣ   (a > 0, a ≠ 1)",
                        texto: "A variável está **no expoente**. Cresce (a > 1) ou decai (0 < a < 1) cada vez mais rápido. Sempre passa por **(0, 1)**.",
                        diaADia: "O faturamento da doceria cresce **10% ao mês**: f(x) = 1,1ˣ (em R$ mil). Em 12 meses, 1,1¹² ≈ **3,14 mil**: mais que o triplo. " +
                            "É a mesma ideia dos **juros compostos**: M = C(1 + i)ᵗ.",
                        itens: ["Domínio: ℝ", "Imagem: (0, +∞) — nunca é zero nem negativa", "a > 1 → crescimento  •  0 < a < 1 → decaimento"],
                        testar: { rotulo: "Ver f(x) = 1,1ˣ", valores: { tipo: "exponencial", a: "1.1" } }
                    }
                ]
            }
        ],
        dicas: [
            "Identifique o tipo pela fórmula: x sozinho (afim/linear), x² (quadrática), x no expoente (exponencial).",
            "Na exponencial, confira a base: a > 0 e a ≠ 1.",
            "O vértice da parábola sai direto de xᵥ = −b/2a — não precisa de Bhaskara.",
            "Use o gráfico para conferir se a resposta faz sentido."
        ],
        quiz: [
            {
                pergunta: "Uma gráfica cobra R$ 30 fixos + R$ 0,50 por cópia. Qual função representa o valor cobrado?",
                opcoes: ["f(x) = 30x + 0,5", "f(x) = 0,5x + 30", "f(x) = 30", "f(x) = 0,5x²"],
                certa: 1,
                explicacao: "É uma **função afim**: tem uma parte que muda com a quantidade (R$ 0,50 por cópia) e uma parte fixa (R$ 30).",
                erros: {
                    0: "Os números foram trocados: 30x diria que **cada cópia custa R$ 30**, e a taxa fixa seria só R$ 0,50.",
                    2: "f(x) = 30 ignora as cópias: seria **só a taxa fixa**, como se ninguém imprimisse nada.",
                    3: "Não há x² no problema: o preço de cada cópia é **sempre o mesmo**, então o gráfico é uma reta, não uma parábola."
                },
                passos: [
                    "A parte que depende da quantidade é **0,5 · x** (cada cópia custa R$ 0,50).",
                    "A parte que não depende de x é a taxa fixa: **b = 30**.",
                    "Juntando no formato ax + b: **f(x) = 0,5x + 30**, com a = 0,5 e b = 30."
                ],
                exemplo: "Um pedido de 100 cópias custa f(100) = 0,5 · 100 + 30 = **R$ 80**."
            },
            {
                pergunta: "Em f(x) = −x² + 10x, qual quantidade dá o faturamento máximo?",
                opcoes: ["x = 10", "x = 5", "x = 25", "x = 0"],
                certa: 1,
                explicacao: "O ponto mais alto de uma parábola que abre para baixo (a < 0) é o **vértice**. A quantidade ideal é o xᵥ.",
                erros: {
                    0: "Em x = 10 o faturamento é f(10) = −100 + 100 = **0**: é onde a parábola corta o eixo x (uma raiz), não o topo.",
                    2: "25 é o **valor do faturamento máximo** (yᵥ), não a quantidade que dá esse máximo (xᵥ).",
                    3: "x = 0 também é uma raiz: f(0) = 0. Sem vender nada, o faturamento é zero."
                },
                passos: [
                    "Identifique os coeficientes: **a = −1** e **b = 10**.",
                    "Use a fórmula do vértice: xᵥ = −b / (2a) = −10 / (2 · (−1)) = −10 / (−2) = **5**.",
                    "Como a < 0, a parábola abre para baixo, então o vértice é o **ponto máximo**.",
                    "O faturamento máximo é f(5) = −25 + 50 = **25**."
                ],
                exemplo: "Vendendo 5 caixas a doceria fatura o máximo (25). Vendendo 6, já cai para f(6) = 24: o desconto passa a pesar mais."
            },
            {
                pergunta: "Qual é a imagem de f(x) = 3ˣ?",
                opcoes: ["ℝ", "(0, +∞)", "[0, +∞)", "{3}"],
                certa: 1,
                explicacao: "A imagem é o conjunto de **todos os valores que f(x) pode dar**. Na exponencial, o resultado é sempre positivo e nunca chega a zero.",
                erros: {
                    0: "ℝ incluiria **números negativos**, e 3ˣ nunca dá negativo.",
                    2: "[0, +∞) inclui o **zero**, mas 3ˣ nunca vale exatamente 0, só chega cada vez mais perto.",
                    3: "{3} seria uma função constante. Em 3ˣ o resultado **muda** conforme x muda."
                },
                passos: [
                    "Teste alguns valores: 3⁰ = 1,  3² = 9,  3⁻¹ = 1/3,  3⁻² = 1/9.",
                    "Com x muito grande, 3ˣ **cresce sem parar** (vai para +∞).",
                    "Com x muito negativo, 3ˣ fica **cada vez mais perto de 0**, mas nunca chega a 0 nem fica negativo.",
                    "Por isso a imagem é **(0, +∞)**: todos os números positivos."
                ],
                exemplo: "Um faturamento que triplica todo mês pode ficar pequeno se olharmos para o passado, mas **nunca vira zero nem negativo**."
            },
            {
                pergunta: "O aluguel de R$ 1.500, que não muda com as vendas, é uma função…",
                opcoes: ["Afim", "Quadrática", "Constante", "Exponencial"],
                certa: 2,
                explicacao: "Uma **função constante** dá sempre a mesma saída, não importa qual seja a entrada.",
                erros: {
                    0: "Na afim a saída **muda com x** (tem o termo ax). O aluguel não muda.",
                    1: "Na quadrática aparece **x²** e o gráfico é uma parábola. Aqui não há nada variando.",
                    3: "Na exponencial o x fica **no expoente** e o valor cresce ou diminui. O aluguel é sempre igual."
                },
                passos: [
                    "A entrada x é a **quantidade de doces vendidos**.",
                    "A saída é sempre **1.500**, para qualquer valor de x.",
                    "Isso se escreve **f(x) = 1500**: uma função constante, cujo gráfico é uma reta horizontal."
                ],
                exemplo: "Vendendo 0 ou 1.000 brigadeiros, a doceria paga **os mesmos R$ 1.500** de aluguel."
            }
        ],
        pratica: "Escolha um tipo de função, mude os valores de a, b e c e veja a tabela, o gráfico, o domínio e a imagem mudarem na hora."
    },

    // =================================================
    // AULA 2 — LIMITES
    // =================================================
    limites: {
        numero: 2,
        titulo: "Limites",
        intro: [
            "O limite responde a pergunta: **para onde f(x) vai quando x chega cada vez mais perto de um valor?**",
            "Não importa o que acontece **exatamente** no ponto, e sim o **caminho** até ele. " +
            "É como andar em direção a uma porta: você já sabe aonde vai chegar antes mesmo de encostar nela."
        ],
        conceitos: [
            { nome: "lim x→a f(x) = L", texto: "quando x se aproxima de a, f(x) se aproxima de L." },
            { nome: "Laterais", texto: "x→a⁻ chega pela esquerda (valores menores); x→a⁺ chega pela direita (valores maiores)." },
            { nome: "Existe se", texto: "o limite pela esquerda é igual ao limite pela direita." }
        ],
        grupos: [
            {
                titulo: "Entendendo o limite",
                cards: [
                    {
                        titulo: "1. Ideia intuitiva",
                        formula: "lim x→a f(x) = L",
                        texto: "Olhamos os valores de f(x) com x **bem perto** de a (mas diferente de a). Se eles se aproximam de L, o limite é L — mesmo que f(a) nem exista.",
                        diaADia: "A fórmula do preço médio da doceria \"trava\" com exatamente **10 encomendas** (dá 0/0). Mas com 9,99 ou 10,01 encomendas o valor fica colado em **R$ 20**. O limite é 20.",
                        testar: { rotulo: "Ver (x² − 100)/(x − 10) com x → 10", valores: { "lim-funcao": "(x^2 - 100)/(x - 10)", "lim-ponto": "10", "lim-tipo": "bilateral" } }
                    },
                    {
                        titulo: "2. Limites laterais",
                        formula: "lim x→a⁻ = L₁    lim x→a⁺ = L₂",
                        texto: "O limite **só existe** se os dois lados chegam no mesmo valor: L₁ = L₂ = L. Se forem diferentes, o limite **não existe**.",
                        diaADia: "Preço de atacado: até 100 doces, **R$ 10** cada; a partir de 100, **R$ 8**. Chegando em 100 pela esquerda o faturamento vai para **R$ 1.000**; pela direita, **R$ 800**. Lados diferentes → **não existe**.",
                        testar: { rotulo: "Ver o degrau do atacado", valores: { "lim-funcao": "10x se x < 100; 8x se x >= 100", "lim-ponto": "100", "lim-tipo": "bilateral" } }
                    },
                    {
                        titulo: "3. Propriedades",
                        formula: "lim (f ± g) = L ± M    lim (k·f) = k·L",
                        texto: "Se lim f = L e lim g = M: o limite da **soma** é a soma dos limites, do **produto** é o produto (L·M), do **quociente** é L/M (se M ≠ 0) e da **potência** é Lⁿ.",
                        diaADia: "Faturamento total = doces + salgados. O limite do total é o limite dos doces **mais** o limite dos salgados. Com 3x + 1 e x → 2: 3·2 + 1 = **7**.",
                        testar: { rotulo: "Ver 3x + 1 com x → 2", valores: { "lim-funcao": "3x + 1", "lim-ponto": "2", "lim-tipo": "bilateral" } }
                    }
                ]
            },
            {
                titulo: "Como calcular",
                cards: [
                    {
                        titulo: "Substituição direta",
                        formula: "lim x→a f(x) = f(a)",
                        texto: "Se a função é **contínua** no ponto, é só trocar x por a. Funciona com polinômios, exponenciais, seno, cosseno…",
                        diaADia: "Faturamento f(x) = 3x + 1 sem pulos: com x → 2, o valor esperado é simplesmente f(2) = 7."
                    },
                    {
                        titulo: "Fatoração e simplificação",
                        formula: "(x² − 4)/(x − 2) = x + 2",
                        texto: "Quando a substituição dá **0/0** (indeterminação), fatoramos e cortamos o termo que zera: (x−2)(x+2)/(x−2) = x + 2 → em x = 2, o limite é **4**.",
                        diaADia: "É \"consertar\" a fórmula que travou para descobrir o valor que deveria estar ali.",
                        testar: { rotulo: "Ver (x² − 4)/(x − 2) com x → 2", valores: { "lim-funcao": "(x^2 - 4)/(x - 2)", "lim-ponto": "2", "lim-tipo": "bilateral" } }
                    },
                    {
                        titulo: "Limites no infinito",
                        formula: "lim x→∞ f(x)",
                        texto: "Para frações de polinômios, compare os **graus**: numerador menor → 0; iguais → razão dos coeficientes líderes; numerador maior → ±∞.",
                        diaADia: "Por mais que a doceria invista em propaganda, o bairro tem clientes limitados: f(x) = 100x/(x + 5) → **100**. É o **teto do mercado** (graus iguais: 100/1).",
                        testar: { rotulo: "Ver 100x/(x + 5) com x → ∞", valores: { "lim-funcao": "100x/(x + 5)", "lim-ponto": "inf", "lim-tipo": "bilateral" } }
                    },
                    {
                        titulo: "Limites especiais",
                        formula: "lim x→0 sen(x)/x = 1",
                        texto: "Alguns limites aparecem tanto que vale decorar: sen x / x → 1,  (1 − cos x)/x² → 1/2,  (eˣ − 1)/x → 1.",
                        diaADia: "Mesmo dando 0/0 no ponto, a tabela mostra os valores chegando em 1 pelos dois lados.",
                        testar: { rotulo: "Ver sen(x)/x com x → 0", valores: { "lim-funcao": "sen(x)/x", "lim-ponto": "0", "lim-tipo": "bilateral" } }
                    }
                ]
            },
            {
                titulo: "Continuidade e descontinuidades",
                juntos: true, // cartões curtos: aparecem todos na mesma tela
                cards: [
                    {
                        titulo: "Função contínua",
                        formula: "lim x→a f(x) = f(a)",
                        texto: "Três condições: **f(a) existe**, **o limite existe** e **os dois são iguais**. No gráfico: dá para desenhar sem tirar o lápis do papel.",
                        diaADia: "Um faturamento que cresce aos poucos, sem pulos nem buracos."
                    },
                    {
                        titulo: "Removível (buraco)",
                        texto: "O limite existe, mas f(a) não existe ou é diferente dele.",
                        diaADia: "A fórmula do preço médio que trava em 10 encomendas: tem um \"buraco\" no gráfico, mas o valor esperado é conhecido."
                    },
                    {
                        titulo: "De salto (degrau)",
                        texto: "Os limites laterais existem, mas são **diferentes**.",
                        diaADia: "Tabela de preços de atacado: o faturamento dá um pulo quando muda a faixa de preço."
                    },
                    {
                        titulo: "Infinita",
                        texto: "O limite vai para +∞ ou −∞ (assíntota vertical).",
                        diaADia: "Custo por unidade quando a doceria produz quase nada: o custo fixo dividido por quase zero dispara.",
                        testar: { rotulo: "Ver 1/x com x → 0", valores: { "lim-funcao": "1/x", "lim-ponto": "0", "lim-tipo": "bilateral" } }
                    }
                ]
            }
        ],
        dicas: [
            "1º tente substituir x pelo valor direto.",
            "Deu 0/0 ou ∞/∞? Use fatoração, racionalização ou um limite especial.",
            "Quando a função muda de regra no ponto, analise os limites laterais.",
            "Simplifique e confira o resultado na tabela.",
            "Interprete: o que esse limite significa para a empresa?"
        ],
        quiz: [
            {
                pergunta: "Quanto vale lim x→3 (2x + 1)?",
                opcoes: ["6", "7", "3", "Não existe"],
                certa: 1,
                explicacao: "Quando a função é **contínua** (sem buracos nem saltos), o limite é igual ao valor da função: basta **substituir**.",
                erros: {
                    0: "6 é só o 2 · 3. **Faltou somar o 1.**",
                    2: "3 é o valor de **x**, não de f(x). O limite pergunta para onde f(x) vai.",
                    3: "O limite existe: 2x + 1 é um polinômio, contínuo em todos os pontos, **sem saltos**."
                },
                passos: [
                    "2x + 1 é um polinômio, e todo polinômio é **contínuo**.",
                    "Então dá para substituir direto: **2 · 3 + 1**.",
                    "6 + 1 = **7**."
                ],
                exemplo: "Se o faturamento é 2x + 1 (em R$ mil), chegando perto de 3 encomendas ele se aproxima de **R$ 7 mil**."
            },
            {
                pergunta: "Quanto vale lim x→2 (x² − 4)/(x − 2)?",
                opcoes: ["0", "4", "Não existe", "∞"],
                certa: 1,
                explicacao: "Substituir direto dá **0/0**, que não é uma resposta: é um aviso de que a expressão pode ser **simplificada**.",
                erros: {
                    0: "0 é só o numerador. **0/0 não vale zero**: é uma indeterminação.",
                    2: "O limite existe. O que não existe é **f(2)** (há um \"buraco\" no gráfico), mas os valores perto de 2 chegam em 4.",
                    3: "∞ apareceria se **só o denominador** zerasse. Aqui os dois zeram, e a fração pode ser simplificada."
                },
                passos: [
                    "Substitua x = 2: (4 − 4) / (2 − 2) = **0/0** → indeterminação.",
                    "Fatore o numerador: **x² − 4 = (x − 2)(x + 2)**.",
                    "Corte o (x − 2) de cima com o de baixo: sobra **x + 2**.",
                    "Agora substitua: 2 + 2 = **4**."
                ],
                exemplo: "Na tabela da calculadora: com x = 1,999 o valor é 3,999 e com x = 2,001 é 4,001. **Os dois lados chegam em 4.**"
            },
            {
                pergunta: "Pela esquerda f(x) vai para 5 e pela direita vai para 8. O limite…",
                opcoes: ["é 5", "é 8", "é 6,5", "não existe"],
                certa: 3,
                explicacao: "O limite só existe quando a função chega **no mesmo valor pelos dois lados**.",
                erros: {
                    0: "5 é só o **lado esquerdo**. O limite precisa que os dois lados sejam iguais.",
                    1: "8 é só o **lado direito**. O limite precisa que os dois lados sejam iguais.",
                    2: "**Não se tira média** dos lados. Se eles são diferentes, o limite simplesmente não existe."
                },
                passos: [
                    "Limite pela esquerda: **L₁ = 5**.",
                    "Limite pela direita: **L₂ = 8**.",
                    "Como 5 ≠ 8, o limite **não existe**.",
                    "No gráfico isso aparece como um **degrau** (descontinuidade de salto)."
                ],
                exemplo: "Preço de atacado: logo antes de 100 doces o faturamento chega em um valor, logo depois **pula** para outro."
            },
            {
                pergunta: "Quanto vale lim x→∞ (3x² + 1)/(x² + 2)?",
                opcoes: ["0", "1", "3", "∞"],
                certa: 2,
                explicacao: "Quando x fica enorme, quem manda na fração são os **termos de maior grau**. O resto fica pequeno demais para fazer diferença.",
                erros: {
                    0: "O limite seria 0 se o grau de cima fosse **menor** que o de baixo. Aqui são iguais.",
                    1: "1 ignora o **coeficiente 3** do termo principal de cima.",
                    3: "O limite seria ∞ se o grau de cima fosse **maior** que o de baixo. Aqui são iguais."
                },
                passos: [
                    "Maior grau em cima: **3x²**. Maior grau embaixo: **x²**.",
                    "Os graus são **iguais** (2 e 2).",
                    "Então o limite é a razão dos coeficientes: **3 / 1 = 3**.",
                    "O +1 e o +2 ficam insignificantes perto de x² quando x é muito grande."
                ],
                exemplo: "Com x = 1.000: 3.000.001 / 1.000.002 ≈ **2,99999**, já colado em 3."
            }
        ],
        pratica: "Digite qualquer função, escolha para onde x vai (um número, inf ou -inf) e veja a tabela se aproximando do ponto pelos dois lados."
    },

    // =================================================
    // AULA 3 — DERIVADAS
    // =================================================
    derivadas: {
        numero: 3,
        titulo: "Derivadas",
        intro: [
            "A derivada mede **a rapidez com que algo muda naquele instante**. O velocímetro do carro mostra uma derivada: quantos km por hora você anda **agora**.",
            "Na **Doceria da Vila**, a derivada do faturamento é o **faturamento marginal**: quanto entra a mais vendendo **um doce a mais**. " +
            "Quando a derivada vale zero, a doceria encontrou a quantidade que dá o **maior faturamento**."
        ],
        conceitos: [
            { nome: "Geométrica", texto: "inclinação da reta tangente ao gráfico no ponto." },
            { nome: "Física", texto: "velocidade instantânea." },
            { nome: "Econômica", texto: "taxa de variação: custo marginal, receita marginal." }
        ],
        grupos: [
            {
                titulo: "O conceito",
                cards: [
                    {
                        titulo: "Definição pelo limite",
                        formula: "f'(x) = lim h→0 [f(x + h) − f(x)] / h",
                        texto: "É a **taxa de variação média** num intervalo cada vez menor (h → 0). O resultado é a taxa **instantânea**.",
                        diaADia: "Se a doceria fatura f(10) = R$ 800 com 10 caixas e f(11) = R$ 858 com 11, a 11ª caixa rendeu cerca de R$ 58. A derivada f'(10) = **60** dá esse valor \"exato\" no instante."
                    }
                ]
            },
            {
                titulo: "As regras de derivação",
                cards: [
                    {
                        titulo: "1. Constante",
                        formula: "d/dx [c] = 0",
                        texto: "Uma constante **não muda**, então sua taxa de variação é zero.",
                        diaADia: "O aluguel de **R$ 1.500** não muda quando a doceria vende mais: derivada **0**.",
                        testar: { rotulo: "Derivar 1500", valores: { "der-funcao": "1500", "der-ponto": "" } }
                    },
                    {
                        titulo: "2. Potência",
                        formula: "d/dx [xⁿ] = n·xⁿ⁻¹",
                        texto: "O expoente \"desce\" multiplicando e diminui 1.",
                        diaADia: "x³ → **3x²**.  x² → 2x.  x → 1.",
                        testar: { rotulo: "Derivar x³", valores: { "der-funcao": "x^3", "der-ponto": "" } }
                    },
                    {
                        titulo: "3. Múltiplo constante",
                        formula: "d/dx [k·f(x)] = k·f'(x)",
                        texto: "O número que multiplica **fica**, e deriva-se só a função.",
                        diaADia: "5x² → 5·2x = **10x**.",
                        testar: { rotulo: "Derivar 5x²", valores: { "der-funcao": "5x^2", "der-ponto": "" } }
                    },
                    {
                        titulo: "4. Soma e diferença",
                        formula: "d/dx [f ± g] = f' ± g'",
                        texto: "Deriva-se **termo a termo**.",
                        diaADia: "Faturamento com desconto f(x) = −2x² + 100x → f'(x) = **−4x + 100**. Com 10 caixas, f'(10) = 60: a próxima caixa traz cerca de R$ 60.",
                        testar: { rotulo: "Derivar −2x² + 100x em x = 10", valores: { "der-funcao": "-2x^2 + 100x", "der-ponto": "10" } }
                    },
                    {
                        titulo: "5. Produto",
                        formula: "d/dx [f·g] = f'·g + f·g'",
                        texto: "Deriva a primeira e mantém a segunda, **mais** mantém a primeira e deriva a segunda.",
                        diaADia: "Faturamento = quantidade × preço: f(x) = x·(100 − 2x) → f'(x) = 1·(100 − 2x) + x·(−2) = **100 − 4x**.",
                        testar: { rotulo: "Derivar x·(100 − 2x)", valores: { "der-funcao": "x(100 - 2x)", "der-ponto": "" } }
                    },
                    {
                        titulo: "6. Quociente",
                        formula: "d/dx [f/g] = (f'·g − f·g') / g²",
                        texto: "\"Deriva a de cima vezes a de baixo, **menos** a de cima vezes a derivada da de baixo, tudo sobre a de baixo ao quadrado.\"",
                        diaADia: "Faturamento médio por caixa: f(x) = (50x + 200)/x → f'(x) = **−200/x²**. Negativo: quanto mais vende, menor o valor médio.",
                        testar: { rotulo: "Derivar (50x + 200)/x", valores: { "der-funcao": "(50x + 200)/x", "der-ponto": "" } }
                    },
                    {
                        titulo: "7. Regra da cadeia",
                        formula: "d/dx [f(g(x))] = f'(g(x))·g'(x)",
                        texto: "Para funções **compostas**: deriva a função **de fora** (mantendo a de dentro) e multiplica pela derivada **de dentro**.",
                        diaADia: "Faturamento crescendo 5% ao mês: f(x) = e^(0,05x) → f'(x) = **0,05·e^(0,05x)**. Outro: sen(3x) → 3·cos(3x).",
                        testar: { rotulo: "Derivar e^(0,05x)", valores: { "der-funcao": "e^(0,05x)", "der-ponto": "" } }
                    }
                ]
            },
            {
                titulo: "Tabela rápida e aplicações",
                cards: [
                    {
                        titulo: "Derivadas que vale decorar",
                        itens: [
                            "(eˣ)' = eˣ     (aˣ)' = aˣ·ln a",
                            "(ln x)' = 1/x     (√x)' = 1/(2√x)",
                            "(sen x)' = cos x     (cos x)' = −sen x",
                            "(tg x)' = sec²x     (1/x)' = −1/x²"
                        ]
                    },
                    {
                        titulo: "Máximos e mínimos",
                        formula: "f'(x) = 0",
                        texto: "Onde a derivada é zero, o gráfico para de subir (ou de descer): é um **ponto de máximo ou mínimo**.",
                        diaADia: "−4x + 100 = 0 → x = **25 caixas**. Antes de 25 cada venda aumenta o faturamento; depois, diminui. O máximo é f(25) = **R$ 1.250**.",
                        testar: { rotulo: "Ver o máximo em x = 25", valores: { "der-funcao": "-2x^2 + 100x", "der-ponto": "25" } }
                    }
                ]
            }
        ],
        dicas: [
            "Erro comum: esquecer a regra da cadeia (derivar a função de dentro).",
            "Erro comum: trocar o sinal nas trigonométricas — (cos x)' = −sen x.",
            "Identifique o tipo de função antes de escolher a regra.",
            "Simplifique o resultado e confira se faz sentido (sinal, unidade)."
        ],
        quiz: [
            {
                pergunta: "Qual é a derivada de x⁴?",
                opcoes: ["x³", "4x³", "4x⁴", "x⁵/5"],
                certa: 1,
                explicacao: "Use a **regra da potência**: (xⁿ)' = n · xⁿ⁻¹. O expoente desce multiplicando e depois diminui 1.",
                erros: {
                    0: "O expoente diminuiu, mas **faltou multiplicar pelo 4** que desce.",
                    2: "O 4 desceu multiplicando, mas **o expoente não diminuiu** (deveria virar 3).",
                    3: "x⁵/5 é a **integral** de x⁴, o caminho contrário da derivada."
                },
                passos: [
                    "Aqui **n = 4**.",
                    "O expoente desce multiplicando: **4 · x**…",
                    "…e o expoente diminui 1: 4 − 1 = **3**.",
                    "Resultado: **4x³**."
                ],
                exemplo: "Em x = 2, a taxa de variação é 4 · 2³ = **32**: nesse ponto a curva sobe 32 unidades para cada 1 de x."
            },
            {
                pergunta: "Qual é a derivada de f(x) = 7?",
                opcoes: ["7", "7x", "0", "1"],
                certa: 2,
                explicacao: "A derivada mede **o quanto algo varia**. Uma constante não varia, então a derivada é **0**.",
                erros: {
                    0: "7 é o **valor** da função, não a variação dela.",
                    1: "7x é uma **primitiva** (integral) de 7, o caminho contrário.",
                    3: "1 é a derivada de **x**, não de um número fixo."
                },
                passos: [
                    "f(x) = 7 vale **7 para qualquer x**.",
                    "O gráfico é uma **reta horizontal**: inclinação zero.",
                    "Logo **f'(x) = 0**."
                ],
                exemplo: "O aluguel fixo não aumenta quando a doceria vende mais: a **taxa de variação é zero**."
            },
            {
                pergunta: "Qual é a derivada de sen(5x)?",
                opcoes: ["cos(5x)", "5·cos(5x)", "−5·cos(5x)", "5·sen(5x)"],
                certa: 1,
                explicacao: "É uma **função composta**: o seno (de fora) aplicado em 5x (de dentro). Por isso se usa a **regra da cadeia**.",
                erros: {
                    0: "Faltou multiplicar pela **derivada de dentro** (o 5). É o erro mais comum na regra da cadeia.",
                    2: "A derivada do seno é o cosseno **positivo**. O sinal negativo aparece na derivada do **cosseno**.",
                    3: "A derivada do seno é o **cosseno**, não o próprio seno."
                },
                passos: [
                    "Função de fora: sen(u). Sua derivada é **cos(u)**.",
                    "Função de dentro: u = 5x. Sua derivada é **5**.",
                    "Multiplique as duas: cos(5x) · 5.",
                    "Resultado: **5 · cos(5x)**."
                ],
                exemplo: "Vendas sazonais que sobem e descem 5 vezes mais rápido também **mudam 5 vezes mais rápido**."
            },
            {
                pergunta: "Se f'(10) = 60, onde f é o faturamento ao vender x caixas, isso significa que…",
                opcoes: [
                    "a doceria fatura R$ 60 com 10 caixas",
                    "a 11ª caixa traz cerca de R$ 60 a mais",
                    "o faturamento máximo é R$ 60",
                    "o faturamento está caindo"
                ],
                certa: 1,
                explicacao: "A derivada do faturamento é o **faturamento marginal**: quanto entra a mais vendendo **uma unidade extra**.",
                erros: {
                    0: "O faturamento com 10 caixas é **f(10)**. O f'(10) é a **variação**, não o total.",
                    2: "O máximo acontece onde **f'(x) = 0**, não onde vale 60.",
                    3: "f' **positivo** significa que o faturamento ainda está **subindo**."
                },
                passos: [
                    "f'(10) mede quanto f muda quando x passa de 10 para **um pouco mais**.",
                    "Na prática: de 10 para 11 caixas, o faturamento muda **cerca de 60**.",
                    "Como 60 é **positivo**, ainda vale a pena vender mais."
                ],
                exemplo: "Com f(x) = −2x² + 100x: f(10) = R$ 800 e f(11) = R$ 858. A 11ª caixa rendeu **R$ 58 ≈ 60**."
            }
        ],
        pratica: "Digite uma função e veja a derivada com o passo a passo de cada regra. Informe um ponto para ver a reta tangente e o faturamento marginal."
    },

    // =================================================
    // AULA 4 — INTEGRAIS
    // =================================================
    integrais: {
        numero: 4,
        titulo: "Integrais",
        intro: [
            "A integral **soma pedacinhos para chegar no total**. Se você sabe quanto a doceria fatura **por dia**, a integral dá o faturamento do **mês inteiro**.",
            "Ela é o **caminho inverso da derivada**: a derivada diz quanto algo muda; a integral reconstrói quanto foi **acumulado**. " +
            "No gráfico, a integral definida é a **área sob a curva**."
        ],
        conceitos: [
            { nome: "Primitiva", texto: "F(x) é primitiva de f(x) se F'(x) = f(x)." },
            { nome: "+ C", texto: "constante de integração: o valor inicial (o que já estava no caixa)." },
            { nome: "Definida", texto: "∫ de a até b = F(b) − F(a) = área sob a curva." }
        ],
        grupos: [
            {
                titulo: "O conceito",
                cards: [
                    {
                        titulo: "Integral indefinida",
                        formula: "∫ f(x) dx = F(x) + C",
                        texto: "Procuramos uma função F cuja **derivada** é f. Como a derivada de qualquer constante é zero, existem infinitas respostas: por isso o **+ C**.",
                        diaADia: "Se o faturamento cresce R$ 4 mil por mês (a taxa), a integral reconstrói o faturamento acumulado. O **C** é quanto a doceria já tinha antes de começar a contar."
                    },
                    {
                        titulo: "Propriedades",
                        formula: "∫ [a·f + b·g] dx = a∫f dx + b∫g dx",
                        texto: "**Linearidade**: constantes saem para fora e a integral da soma é a soma das integrais. Além disso, ∫F'(x)dx = F(x) + C e d/dx[∫f(x)dx] = f(x).",
                        diaADia: "Faturamento total = total dos doces + total dos salgados."
                    }
                ]
            },
            {
                titulo: "As regras de integração",
                cards: [
                    {
                        titulo: "1. Constante",
                        formula: "∫ k dx = kx + C",
                        texto: "Uma taxa constante acumula de forma **linear**.",
                        diaADia: "Assinatura de **R$ 500 por mês** durante 12 meses: ∫₀¹² 500 dx = 500·12 = **R$ 6.000**.",
                        testar: { rotulo: "∫ 500 dx de 0 a 12", valores: { "int-funcao": "500", "int-tipo": "definida", "int-a": "0", "int-b": "12" } }
                    },
                    {
                        titulo: "2. Potência",
                        formula: "∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C   (n ≠ −1)",
                        texto: "Soma 1 no expoente e **divide** pelo novo expoente. Caso especial: ∫ 1/x dx = ln|x| + C.",
                        diaADia: "∫₀³ x² dx = 3³/3 − 0 = **9**.",
                        testar: { rotulo: "∫ x² dx de 0 a 3", valores: { "int-funcao": "x^2", "int-tipo": "definida", "int-a": "0", "int-b": "3" } }
                    },
                    {
                        titulo: "3. Soma e subtração",
                        formula: "∫ (f ± g) dx = ∫f dx ± ∫g dx",
                        texto: "Integra-se **termo a termo**.",
                        diaADia: "A doceria fatura f(x) = 4x + 100 mil por mês (começa em 100 e cresce 4 por mês). Em 10 meses: ∫₀¹⁰ (4x + 100) dx = 2x² + 100x = **R$ 1.200 mil**.",
                        testar: { rotulo: "∫ (4x + 100) dx de 0 a 10", valores: { "int-funcao": "4x + 100", "int-tipo": "definida", "int-a": "0", "int-b": "10" } }
                    },
                    {
                        titulo: "4. Exponencial",
                        formula: "∫ eˣ dx = eˣ + C     ∫ aˣ dx = aˣ/ln a + C",
                        texto: "A função eˣ é a única que é **igual à própria derivada** — e à própria integral.",
                        diaADia: "Faturamento que cresce de forma exponencial: ∫₀¹ eˣ dx = e − 1 ≈ **1,7183**.",
                        testar: { rotulo: "∫ eˣ dx de 0 a 1", valores: { "int-funcao": "e^x", "int-tipo": "definida", "int-a": "0", "int-b": "1" } }
                    },
                    {
                        titulo: "5. Trigonométrica",
                        formula: "∫ sen x dx = −cos x + C     ∫ cos x dx = sen x + C",
                        texto: "Cuidado com o **sinal** do seno.",
                        diaADia: "Vendas **sazonais** (sobem e descem como uma onda): ∫₀^(π/2) cos x dx = sen(π/2) − sen(0) = **1**.",
                        testar: { rotulo: "∫ cos x dx de 0 a π/2", valores: { "int-funcao": "cos(x)", "int-tipo": "definida", "int-a": "0", "int-b": "pi/2" } }
                    },
                    {
                        titulo: "6. Substituição",
                        formula: "∫ f(g(x))·g'(x) dx = ∫ f(u) du",
                        texto: "1) Escolha u = g(x).  2) Calcule du = g'(x)dx.  3) Substitua.  4) Resolva e volte para x. É a regra da cadeia \"ao contrário\".",
                        diaADia: "∫ 2x·cos(x²) dx: u = x², du = 2x dx → ∫ cos u du = sen u = **sen(x²) + C**.",
                        testar: { rotulo: "∫ 2x·cos(x²) dx", valores: { "int-funcao": "2x*cos(x^2)", "int-tipo": "indefinida" } }
                    }
                ]
            },
            {
                titulo: "Integral definida e mais técnicas",
                cards: [
                    {
                        titulo: "Teorema Fundamental do Cálculo",
                        formula: "∫ₐᵇ f(x) dx = F(b) − F(a)",
                        texto: "**Conecta derivada e integral**: para achar a área de a até b, calcule a primitiva nos dois pontos e subtraia.",
                        diaADia: "É como olhar o saldo do caixa no fim e no começo do período: a diferença é o que entrou."
                    },
                    {
                        titulo: "Por partes (saiba mais)",
                        formula: "∫ u dv = u·v − ∫ v du",
                        texto: "Útil para **produtos** como polinômio × exponencial. Ex.: ∫ x·eˣ dx = eˣ(x − 1) + C. " +
                            "A calculadora resolve esse tipo pela integral definida (cálculo numérico).",
                        diaADia: "Faturamento que cresce com o tempo **e** com uma taxa exponencial ao mesmo tempo."
                    }
                ]
            }
        ],
        dicas: [
            "Não esqueça o + C na integral indefinida.",
            "Confira a resposta derivando: a derivada de F tem que dar f.",
            "Identifique o tipo de integral antes de escolher a regra.",
            "Na integral definida, o resultado é um número (a área), sem + C."
        ],
        quiz: [
            {
                pergunta: "Quanto é ∫ 6 dx?",
                opcoes: ["6 + C", "6x + C", "0", "3x² + C"],
                certa: 1,
                explicacao: "Use a **regra da constante**: ∫ k dx = kx + C. Integrar é achar uma função cuja **derivada** dá 6.",
                erros: {
                    0: "A derivada de 6 + C é **0**, não 6. Faltou o x.",
                    2: "0 é a **derivada** de 6, o caminho contrário da integral.",
                    3: "A derivada de 3x² é **6x**, não 6."
                },
                passos: [
                    "Pergunte: qual função tem **derivada igual a 6**?",
                    "A derivada de **6x** é 6. ✓",
                    "Some a constante de integração: **6x + C**."
                ],
                exemplo: "Faturando R$ 6 mil por mês, em x meses o total é **6x mil**, mais o que já havia no caixa (o C)."
            },
            {
                pergunta: "Quanto é ∫ x³ dx?",
                opcoes: ["3x² + C", "x⁴ + C", "x⁴/4 + C", "x³/3 + C"],
                certa: 2,
                explicacao: "Use a **regra da potência**: soma 1 no expoente e **divide** pelo novo expoente.",
                erros: {
                    0: "3x² é a **derivada** de x³, não a integral.",
                    1: "A derivada de x⁴ é 4x³, não x³: **faltou dividir por 4**.",
                    3: "O expoente precisa **aumentar 1** (de 3 para 4). Aqui ele continuou 3."
                },
                passos: [
                    "Expoente atual: 3. Novo expoente: 3 + 1 = **4**.",
                    "Divida pelo novo expoente: **x⁴/4**.",
                    "Some a constante: **x⁴/4 + C**.",
                    "Confira derivando: (x⁴/4)' = 4x³/4 = **x³** ✓."
                ],
                exemplo: "**Conferir derivando** é o jeito mais seguro de saber se a integral está certa."
            },
            {
                pergunta: "Quanto vale ∫₀² 3 dx?",
                opcoes: ["3", "5", "6", "9"],
                certa: 2,
                explicacao: "Na integral definida, calcule a primitiva **nos dois limites e subtraia**: F(b) − F(a). O resultado é a área sob a curva.",
                erros: {
                    0: "3 é a **altura** do retângulo. Falta multiplicar pela base (2).",
                    1: "5 seria **somar** 2 + 3. Área é base **vezes** altura.",
                    3: "9 usaria base 3, mas o intervalo vai **de 0 a 2** (base 2)."
                },
                passos: [
                    "Primitiva de 3: **F(x) = 3x**.",
                    "Calcule nos limites: F(2) = **6** e F(0) = **0**.",
                    "Subtraia: 6 − 0 = **6**.",
                    "No gráfico: um **retângulo** de base 2 e altura 3, área 2 × 3 = 6."
                ],
                exemplo: "Faturando R$ 3 mil por mês durante 2 meses, o total acumulado é **R$ 6 mil**."
            },
            {
                pergunta: "Por que a integral indefinida tem \"+ C\"?",
                opcoes: [
                    "Porque é obrigatório escrever",
                    "Porque a derivada de qualquer constante é zero, então há infinitas primitivas",
                    "Porque C é a área sob a curva",
                    "Porque C é sempre igual a 1"
                ],
                certa: 1,
                explicacao: "Várias funções têm **a mesma derivada**, pois a derivada de qualquer número é zero. O C representa **todas** essas funções de uma vez.",
                erros: {
                    0: "Não é só formalidade: sem o C a resposta fica **incompleta**, porque mostra só uma das primitivas.",
                    2: "A área sai da **integral definida**, que dá um número e não tem C.",
                    3: "C pode ser **qualquer número real**, não só 1."
                },
                passos: [
                    "Veja: (x²)' = 2x,  (x² + 5)' = 2x,  (x² − 3)' = 2x.",
                    "Todas são **primitivas de 2x**: a diferença entre elas é só um número somado.",
                    "Por isso escrevemos **x² + C**, onde C pode ser qualquer número."
                ],
                exemplo: "Sabendo só quanto a doceria fatura por mês, não dá para saber quanto **já havia no caixa** antes: esse valor é o C."
            }
        ],
        pratica: "Digite uma função, escolha integral indefinida ou definida e veja o passo a passo, a primitiva e a área pintada no gráfico."
    }
};

// =====================================================
// Aula guiada: um passo de cada vez
// Início → um conceito por tela → dicas → perguntas → conclusão.
// A calculadora fica fechada até o aluno abrir (ou clicar em "Testar").
// =====================================================
const Aulas = (function () {

    // Escapa o HTML e transforma **texto** em destaque
    const md = s => UI.escapar(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const ORDEM = ["funcoes", "limites", "derivadas", "integrais"];

    const passos = {};   // lista de passos de cada aula
    const estado = {};   // passo atual e respostas de cada aula

    // Monta a sequência de telas de uma aula
    function montarPassos(nome) {
        const a = AULAS[nome];
        const p = [{ tipo: "intro", titulo: "Início" }];
        a.grupos.forEach((g, gi) => {
            if (g.juntos) p.push({ tipo: "grupo", gi, titulo: g.titulo });
            else g.cards.forEach((c, ci) => p.push({ tipo: "card", gi, ci, titulo: c.titulo }));
        });
        p.push({ tipo: "dicas", titulo: "Dicas" });
        a.quiz.forEach((q, qi) => p.push({ tipo: "quiz", qi, titulo: `Pergunta ${qi + 1}` }));
        p.push({ tipo: "fim", titulo: "Conclusão" });
        return p;
    }

    const botaoTestar = (nome, gi, ci, rotulo) =>
        `<button class="botao-testar" data-aula="${nome}" data-grupo="${gi}" data-card="${ci}">▶ Testar: ${md(rotulo)}</button>`;

    const acertos = nome => {
        const r = estado[nome].respostas;
        return AULAS[nome].quiz.filter((q, qi) => r[qi] === q.certa).length;
    };

    // ---------- Conteúdo de cada tipo de tela ----------

    function telaIntro(nome, a) {
        return `
            <h2 class="licao-titulo">${md(a.titulo)}</h2>
            ${a.intro.map(p => `<p class="licao-texto">${md(p)}</p>`).join("")}
            <div class="licao-conceitos">
                ${a.conceitos.map(c => `<div class="conceito"><strong>${md(c.nome)}</strong><span>${md(c.texto)}</span></div>`).join("")}
            </div>
            <p class="licao-dica-nav">Vamos por partes: um conceito de cada vez. Clique em <strong>Começar</strong>.</p>`;
    }

    function telaCard(nome, a, p) {
        const g = a.grupos[p.gi], c = g.cards[p.ci];
        return `
            <span class="licao-sobre">${md(g.titulo)}</span>
            <h2 class="licao-titulo">${md(c.titulo)}</h2>
            ${c.formula ? `<div class="formula-destaque">${md(c.formula)}</div>` : ""}
            ${c.texto ? `<p class="licao-texto">${md(c.texto)}</p>` : ""}
            ${c.diaADia ? `<div class="dia-a-dia"><span>No dia a dia</span>${md(c.diaADia)}</div>` : ""}
            ${c.itens ? `<details class="licao-detalhes"><summary>Ver propriedades</summary><ul>${c.itens.map(i => `<li>${md(i)}</li>`).join("")}</ul></details>` : ""}
            ${c.testar ? botaoTestar(nome, p.gi, p.ci, c.testar.rotulo) : ""}`;
    }

    function telaGrupo(nome, a, p) {
        const g = a.grupos[p.gi];
        return `
            <h2 class="licao-titulo">${md(g.titulo)}</h2>
            <div class="licao-mini-grid">
                ${g.cards.map((c, ci) => `
                    <div class="mini-card">
                        <h4>${md(c.titulo)}</h4>
                        ${c.formula ? `<div class="formula-grande">${md(c.formula)}</div>` : ""}
                        ${c.texto ? `<p>${md(c.texto)}</p>` : ""}
                        ${c.diaADia ? `<div class="dia-a-dia"><span>No dia a dia</span>${md(c.diaADia)}</div>` : ""}
                        ${c.testar ? botaoTestar(nome, p.gi, ci, c.testar.rotulo) : ""}
                    </div>`).join("")}
            </div>`;
    }

    function telaDicas(nome, a) {
        return `
            <span class="licao-sobre">Antes das perguntas</span>
            <h2 class="licao-titulo">Dicas da professora</h2>
            <ul class="licao-dicas">${a.dicas.map(d => `<li>${md(d)}</li>`).join("")}</ul>
            <p class="licao-dica-nav">Pronto? Agora responda algumas perguntas rápidas.</p>`;
    }

    function telaQuiz(nome, a, p) {
        const q = a.quiz[p.qi];
        const resp = estado[nome].respostas[p.qi];
        const respondida = resp !== undefined;
        const opcoes = q.opcoes.map((o, oi) => {
            let cls = "quiz-opcao";
            if (respondida && oi === q.certa) cls += " certa";
            else if (respondida && oi === resp) cls += " errada";
            return `<button class="${cls}" data-q="${p.qi}" data-o="${oi}" ${respondida ? "disabled" : ""}>${md(o)}</button>`;
        }).join("");
        const acertou = resp === q.certa;
        return `
            <span class="licao-sobre">Teste rápido · Pergunta ${p.qi + 1} de ${a.quiz.length}</span>
            <h2 class="licao-titulo licao-pergunta">${md(q.pergunta)}</h2>
            <div class="quiz-opcoes">${opcoes}</div>
            ${respondida ? feedbackQuiz(q, resp, acertou) : `<p class="licao-dica-nav">Escolha uma resposta.</p>`}`;
    }

    // Explicação completa depois de responder: ideia, por que errou, passo a passo e dia a dia
    function feedbackQuiz(q, resp, acertou) {
        let h = `<div class="quiz-feedback ${acertou ? "ok" : "nao"}">`;
        h += `<p><strong class="quiz-veredito">${acertou ? "Acertou!" : "Quase!"}</strong> ${md(q.explicacao)}</p>`;
        if (!acertou) {
            h += `<p class="quiz-certa">A resposta certa é <strong>${md(q.opcoes[q.certa])}</strong>.</p>`;
        }

        // Sempre explica por que cada uma das outras opções está errada
        // (se o aluno errou, a opção que ele escolheu aparece destacada)
        const outras = q.opcoes.map((o, i) => i).filter(i => i !== q.certa && q.erros && q.erros[i]);
        if (outras.length) {
            h += `<div class="quiz-bloco quiz-outras"><span>Por que as outras opções estão erradas</span><ul>` +
                outras.map(i => `
                    <li class="${i === resp ? "escolhida" : ""}">
                        <strong class="quiz-opcao-nome">${md(q.opcoes[i])}</strong>${i === resp ? ` <em class="quiz-sua">sua resposta</em>` : ""}
                        <p>${md(q.erros[i])}</p>
                    </li>`).join("") +
                `</ul></div>`;
        }
        if (q.passos) {
            h += `<div class="quiz-bloco"><span>Como resolver</span><ol>${q.passos.map(p => `<li>${md(p)}</li>`).join("")}</ol></div>`;
        }
        if (q.exemplo) {
            h += `<div class="quiz-bloco quiz-dia"><span>No dia a dia</span><p>${md(q.exemplo)}</p></div>`;
        }
        return h + `</div>`;
    }

    function telaFim(nome, a) {
        const total = a.quiz.length, certas = acertos(nome);
        const proxima = ORDEM[ORDEM.indexOf(nome) + 1];
        const msg = certas === total ? "Excelente, acertou tudo!"
            : certas >= total / 2 ? "Muito bem! Revise as perguntas que errou."
            : "Vale a pena rever a aula com calma.";
        return `
            <div class="licao-fim">
                <span class="licao-sobre">Aula ${a.numero} concluída</span>
                <h2 class="licao-titulo">Você terminou: ${md(a.titulo)}</h2>
                <div class="placar-grande"><strong>${certas}</strong> de ${total} perguntas certas</div>
                <p class="licao-texto">${msg}</p>
                <p class="licao-texto">${md(a.pratica)}</p>
                <div class="licao-fim-botoes">
                    <button class="botao" data-calc-abrir="${nome}">Abrir a calculadora</button>
                    ${proxima ? `<button class="nav-secundario" data-proxima="${proxima}">Ir para a Aula ${AULAS[proxima].numero} · ${md(AULAS[proxima].titulo)} →</button>` : ""}
                    <button class="nav-secundario" data-ir="0">Rever a aula</button>
                </div>
            </div>`;
    }

    // ---------- Desenho da aula ----------

    function desenhar(nome) {
        const a = AULAS[nome], ps = passos[nome], st = estado[nome];
        const p = ps[st.passo];
        const ultimo = ps.length - 1;
        const pct = Math.round(st.passo / ultimo * 100);

        let corpo;
        if (p.tipo === "intro") corpo = telaIntro(nome, a);
        else if (p.tipo === "card") corpo = telaCard(nome, a, p);
        else if (p.tipo === "grupo") corpo = telaGrupo(nome, a, p);
        else if (p.tipo === "dicas") corpo = telaDicas(nome, a);
        else if (p.tipo === "quiz") corpo = telaQuiz(nome, a, p);
        else corpo = telaFim(nome, a);

        const proxRotulo = st.passo === 0 ? "Começar" : (ps[st.passo + 1] && ps[st.passo + 1].tipo === "fim" ? "Concluir" : "Próximo");

        document.querySelector(`#aula-${nome} .licao`).innerHTML = `
            <div class="licao-topo">
                <span class="aula-tag">Aula ${a.numero} · ${md(a.titulo)}</span>
                <span class="licao-contador">Passo ${st.passo + 1} de ${ps.length}</span>
            </div>
            <div class="licao-barra"><div style="width:${pct}%"></div></div>
            <div class="licao-pontos">
                ${ps.map((x, i) => `<button class="ponto${i === st.passo ? " atual" : ""}${i < st.passo ? " feito" : ""}" data-ir="${i}" title="${UI.escapar(x.titulo)}" aria-label="${UI.escapar(x.titulo)}"></button>`).join("")}
            </div>
            <div class="licao-corpo">${corpo}</div>
            <div class="licao-nav">
                <button class="nav-secundario" data-nav="-1" ${st.passo === 0 ? "disabled" : ""}>← Voltar</button>
                ${st.passo < ultimo ? `<button class="botao" data-nav="1">${proxRotulo} →</button>` : ""}
            </div>`;
    }

    function montar(nome) {
        passos[nome] = montarPassos(nome);
        estado[nome] = { passo: 0, respostas: {} };
        document.getElementById("aula-" + nome).innerHTML = `
            <div class="licao"></div>
            <div class="pratica-barra">
                <div class="pratica-texto">
                    <strong>Calculadora da aula</strong>
                    <span>${md(AULAS[nome].pratica)}</span>
                </div>
                <button class="nav-secundario" data-calc="${nome}">Abrir calculadora</button>
            </div>`;
        desenhar(nome);
    }

    function irPara(nome, passo) {
        const ps = passos[nome];
        estado[nome].passo = Math.max(0, Math.min(ps.length - 1, passo));
        desenhar(nome);
        // mantém o topo da lição visível ao trocar de passo
        const licao = document.querySelector(`#aula-${nome} .licao`);
        if (licao.getBoundingClientRect().top < 0) licao.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Botão "Testar": abre a calculadora, preenche com o exemplo e calcula
    function testar(nome, valores) {
        abrirCalculadora(nome);
        if (nome === "funcoes") {
            if (valores.tipo) selectTipo.value = valores.tipo;
            ["a", "b", "c"].forEach(k => { if (valores[k] !== undefined) document.getElementById(k).value = valores[k]; });
            atualizarCampos();
            gerarGrafico();
        } else {
            Object.entries(valores).forEach(([id, v]) => { document.getElementById(id).value = v; });
            if (nome === "integrais") {
                UI.el("int-campo-limites").hidden = UI.el("int-tipo").value !== "definida";
            }
            ({ limites: Limites, derivadas: Derivadas, integrais: Integrais })[nome].calcular();
        }
        document.getElementById("modulo-" + nome).scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---------- Cliques ----------
    document.addEventListener("click", ev => {
        const alvo = ev.target.closest("button");
        if (!alvo) return;
        const sec = alvo.closest("section.aula");
        const nome = sec ? sec.dataset.modulo : null;
        const d = alvo.dataset;

        if (d.nav && nome) return irPara(nome, estado[nome].passo + Number(d.nav));
        if (d.ir !== undefined && nome) return irPara(nome, Number(d.ir));

        if (alvo.classList.contains("botao-testar")) {
            const card = AULAS[d.aula].grupos[d.grupo].cards[d.card];
            return testar(d.aula, card.testar.valores);
        }

        if (alvo.classList.contains("quiz-opcao") && nome) {
            const qi = Number(d.q);
            if (estado[nome].respostas[qi] === undefined) {
                estado[nome].respostas[qi] = Number(d.o);
                desenhar(nome);
            }
            return;
        }

        if (d.calc) return alternarCalculadora(d.calc);
        if (d.calcAbrir) {
            abrirCalculadora(d.calcAbrir);
            document.getElementById("modulo-" + d.calcAbrir).scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        if (d.proxima) {
            selectModulo.value = d.proxima;
            trocarModulo();
        }
    });

    ORDEM.forEach(montar);

    return { montar, testar, irPara };
})();
