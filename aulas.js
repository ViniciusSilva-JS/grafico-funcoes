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
                explicacao: "O valor por cópia (0,5) multiplica x e a taxa fixa (30) é o b: f(x) = 0,5x + 30, uma função afim."
            },
            {
                pergunta: "Em f(x) = −x² + 10x, qual quantidade dá o faturamento máximo?",
                opcoes: ["x = 10", "x = 5", "x = 25", "x = 0"],
                certa: 1,
                explicacao: "xᵥ = −b/2a = −10/(2·(−1)) = 5. Como a < 0, o vértice é o ponto máximo."
            },
            {
                pergunta: "Qual é a imagem de f(x) = 3ˣ?",
                opcoes: ["ℝ", "(0, +∞)", "[0, +∞)", "{3}"],
                certa: 1,
                explicacao: "A exponencial é sempre positiva e nunca chega a zero: imagem (0, +∞)."
            },
            {
                pergunta: "O aluguel de R$ 1.500, que não muda com as vendas, é uma função…",
                opcoes: ["Afim", "Quadrática", "Constante", "Exponencial"],
                certa: 2,
                explicacao: "A saída é sempre 1.500 para qualquer x: função constante (reta horizontal)."
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
                explicacao: "A função é contínua, então basta substituir: 2·3 + 1 = 7."
            },
            {
                pergunta: "Quanto vale lim x→2 (x² − 4)/(x − 2)?",
                opcoes: ["0", "4", "Não existe", "∞"],
                certa: 1,
                explicacao: "Substituir dá 0/0. Fatorando: (x − 2)(x + 2)/(x − 2) = x + 2 → 2 + 2 = 4."
            },
            {
                pergunta: "Pela esquerda f(x) vai para 5 e pela direita vai para 8. O limite…",
                opcoes: ["é 5", "é 8", "é 6,5", "não existe"],
                certa: 3,
                explicacao: "O limite só existe quando os dois lados chegam no mesmo valor. Aqui é uma descontinuidade de salto."
            },
            {
                pergunta: "Quanto vale lim x→∞ (3x² + 1)/(x² + 2)?",
                opcoes: ["0", "1", "3", "∞"],
                certa: 2,
                explicacao: "Os graus são iguais (2 e 2), então o limite é a razão dos coeficientes líderes: 3/1 = 3."
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
                explicacao: "Regra da potência: o 4 desce e o expoente diminui 1 → 4x³."
            },
            {
                pergunta: "Qual é a derivada de f(x) = 7?",
                opcoes: ["7", "7x", "0", "1"],
                certa: 2,
                explicacao: "A derivada de uma constante é sempre 0: ela não muda."
            },
            {
                pergunta: "Qual é a derivada de sen(5x)?",
                opcoes: ["cos(5x)", "5·cos(5x)", "−5·cos(5x)", "5·sen(5x)"],
                certa: 1,
                explicacao: "Regra da cadeia: derivada de fora cos(5x) vezes a derivada de dentro (5) → 5·cos(5x)."
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
                explicacao: "A derivada é o faturamento marginal: quanto entra a mais vendendo uma unidade extra."
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
                explicacao: "Regra da constante: ∫ k dx = kx + C → 6x + C."
            },
            {
                pergunta: "Quanto é ∫ x³ dx?",
                opcoes: ["3x² + C", "x⁴ + C", "x⁴/4 + C", "x³/3 + C"],
                certa: 2,
                explicacao: "Regra da potência: soma 1 no expoente (4) e divide por 4 → x⁴/4 + C."
            },
            {
                pergunta: "Quanto vale ∫₀² 3 dx?",
                opcoes: ["3", "5", "6", "9"],
                certa: 2,
                explicacao: "F(x) = 3x → F(2) − F(0) = 6 − 0 = 6. É a área de um retângulo 2 × 3."
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
                explicacao: "x² + 5 e x² − 3 têm a mesma derivada (2x). O C representa todas essas possibilidades."
            }
        ],
        pratica: "Digite uma função, escolha integral indefinida ou definida e veja o passo a passo, a primitiva e a área pintada no gráfico."
    }
};


// =====================================================
// Montagem das aulas na página
// =====================================================
const Aulas = (function () {

    // Escapa o HTML e transforma **texto** em destaque
    const md = s => UI.escapar(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    function cardHTML(nome, card, gi, ci) {
        let h = `<article class="aula-card">`;
        h += `<h4>${md(card.titulo)}</h4>`;
        if (card.formula) h += `<div class="formula-grande">${md(card.formula)}</div>`;
        if (card.texto) h += `<p>${md(card.texto)}</p>`;
        if (card.itens) h += `<ul>${card.itens.map(i => `<li>${md(i)}</li>`).join("")}</ul>`;
        if (card.diaADia) h += `<div class="dia-a-dia"><span>No dia a dia</span>${md(card.diaADia)}</div>`;
        if (card.testar) {
            h += `<button class="botao-testar" data-aula="${nome}" data-grupo="${gi}" data-card="${ci}">` +
                `▶ ${md(card.testar.rotulo)}</button>`;
        }
        return h + `</article>`;
    }

    function quizHTML(nome, quiz) {
        return quiz.map((q, qi) => `
            <div class="quiz-pergunta" data-aula="${nome}" data-q="${qi}">
                <p class="quiz-enunciado"><strong>${qi + 1}.</strong> ${md(q.pergunta)}</p>
                <div class="quiz-opcoes">
                    ${q.opcoes.map((o, oi) => `<button class="quiz-opcao" data-o="${oi}">${md(o)}</button>`).join("")}
                </div>
                <p class="quiz-feedback" hidden></p>
            </div>`).join("");
    }

    function montar(nome) {
        const aula = AULAS[nome];
        const sec = document.getElementById("aula-" + nome);
        if (!aula || !sec) return;

        let h = `
            <div class="aula-intro">
                <span class="aula-tag">Aula ${aula.numero}</span>
                <h2>${md(aula.titulo)}</h2>
                ${aula.intro.map(p => `<p>${md(p)}</p>`).join("")}
                <div class="aula-conceitos">
                    ${aula.conceitos.map(c => `<div class="conceito"><strong>${md(c.nome)}</strong><span>${md(c.texto)}</span></div>`).join("")}
                </div>
            </div>`;

        aula.grupos.forEach((g, gi) => {
            h += `<h3 class="aula-grupo-titulo">${md(g.titulo)}</h3>`;
            h += `<div class="aula-grid">${g.cards.map((c, ci) => cardHTML(nome, c, gi, ci)).join("")}</div>`;
        });

        h += `
            <div class="aula-rodape">
                <div class="aula-dicas">
                    <h3>Dicas da professora</h3>
                    <ul>${aula.dicas.map(d => `<li>${md(d)}</li>`).join("")}</ul>
                </div>
                <div class="quiz">
                    <h3>Teste rápido <span class="quiz-placar" id="placar-${nome}">0 de ${aula.quiz.length}</span></h3>
                    ${quizHTML(nome, aula.quiz)}
                </div>
            </div>
            <div class="pratica-titulo">
                <h2>Agora é sua vez: pratique na calculadora</h2>
                <p>${md(aula.pratica)}</p>
            </div>`;

        sec.innerHTML = h;
    }

    // Botão "Testar": preenche a calculadora com o exemplo e calcula
    function testar(nome, valores) {
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

    const acertos = {};

    // Cliques (botões de testar e respostas do quiz)
    document.addEventListener("click", ev => {
        const bt = ev.target.closest(".botao-testar");
        if (bt) {
            const card = AULAS[bt.dataset.aula].grupos[bt.dataset.grupo].cards[bt.dataset.card];
            testar(bt.dataset.aula, card.testar.valores);
            return;
        }

        const op = ev.target.closest(".quiz-opcao");
        if (op) {
            const box = op.closest(".quiz-pergunta");
            if (box.classList.contains("respondida")) return;
            const nome = box.dataset.aula;
            const q = AULAS[nome].quiz[box.dataset.q];
            const escolha = Number(op.dataset.o);
            box.classList.add("respondida");
            box.querySelectorAll(".quiz-opcao").forEach((b, i) => {
                if (i === q.certa) b.classList.add("certa");
                else if (i === escolha) b.classList.add("errada");
                b.disabled = true;
            });
            const acertou = escolha === q.certa;
            if (acertou) acertos[nome] = (acertos[nome] || 0) + 1;
            const fb = box.querySelector(".quiz-feedback");
            fb.hidden = false;
            fb.className = "quiz-feedback " + (acertou ? "ok" : "nao");
            fb.innerHTML = (acertou ? "<strong>Acertou!</strong> " : "<strong>Quase!</strong> ") + md(q.explicacao);
            document.getElementById("placar-" + nome).textContent = `${acertos[nome] || 0} de ${AULAS[nome].quiz.length}`;
        }
    });

    Object.keys(AULAS).forEach(montar);

    return { montar, testar };
})();
