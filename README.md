# Cálculo no Dia a Dia

Projeto Final de CDI (AP2) · Engenharia de Software · UNICATÓLICA RN · 2026.2

Site para **aprender Funções, Limites, Derivadas e Integrais** com exemplos do dia a dia: o faturamento de uma pequena empresa, a **Doceria da Vila**.

---

## 1. Problema e objetivo

Uma empresa precisa responder perguntas como:

- Quanto vou faturar vendendo uma certa quantidade? → **Funções**
- Até onde o faturamento pode crescer? → **Limites**
- Quanto ganho a mais vendendo uma unidade extra? → **Derivadas**
- Quanto faturei no total em um período? → **Integrais**

Quem está começando costuma achar esses conteúdos abstratos. O objetivo é **ensinar cada conteúdo de forma simples**, ligando cada conceito a uma situação real, e deixar o aluno **praticar numa calculadora** que mostra o cálculo, o passo a passo e o gráfico.

## 2. Como usar

1. Escolha a aula no canto superior direito.
2. Siga a **aula guiada**: um conceito por tela, com fórmula e exemplo do dia a dia.
3. Clique em **▶ Testar** para ver o exemplo calculado na calculadora.
4. Responda às **perguntas rápidas** (a correção aparece na hora).
5. No final, **abra a calculadora** e teste suas próprias funções.

## 3. Como rodar

Não precisa instalar nada (só ter internet, para carregar o Chart.js).

1. `git clone https://github.com/ViniciusSilva-JS/grafico-funcoes.git`
2. Abra o `index.html` no navegador (ou use o **Live Server** do VS Code).

## 4. As quatro aulas

O conteúdo segue o material da professora. Em todas as aulas, **x** é a quantidade vendida (ou o mês) e **f(x)** é o faturamento.

| Aula | O que a calculadora faz | Exemplo do dia a dia | Justificativa matemática |
|---|---|---|---|
| **1. Funções** | 5 tipos: constante, afim, linear, quadrática e exponencial. Mostra tabela, gráfico, domínio, imagem e se cresce ou cai. | Promoção por volume: f(x) = −2x² + 100x | Vértice xᵥ = −b/2a = 25 → faturamento máximo f(25) = R$ 1.250 |
| **2. Limites** | Limites laterais, no infinito e casos 0/0. Diz se o limite existe e se a função é contínua. | Teto do mercado: 100x/(x + 5) | Graus iguais no numerador e no denominador → limite = 100/1 = **100** |
| **3. Derivadas** | 7 regras: constante, potência, múltiplo constante, soma, produto, quociente e cadeia. Mostra o passo a passo e a reta tangente. | Faturamento marginal de −2x² + 100x | f'(x) = −4x + 100 = 0 → x = 25 é o ponto de **máximo** |
| **4. Integrais** | 6 regras: constante, potência, soma, exponencial, trigonométrica e substituição. Faz a indefinida (+ C) e a definida (área pintada). | Faturamento acumulado em 10 meses: ∫₀¹⁰ (4x + 100) dx | F(x) = 2x² + 100x → F(10) − F(0) = **1.200** (Teorema Fundamental) |

## 5. Arquitetura

```
index.html     página: menu das aulas + uma aula e uma calculadora por conteúdo
estilo.css     visual de todas as telas

aulas.js       conteúdo das aulas (textos, exemplos, perguntas) e a aula guiada
script.js      troca de aula, abre/fecha a calculadora e calcula as funções
expressao.js   lê o que o aluno digita (ex: 3x^2 + 2x) e simplifica os resultados
limites.js     cálculo dos limites
derivadas.js   cálculo das derivadas, com o passo a passo
integrais.js   cálculo das integrais, com o passo a passo
grafico.js     desenha os gráficos (Chart.js) e cuida do zoom
```

**Fluxo:** o aluno digita (entrada) → o JavaScript calcula (processamento) → a tela mostra o resultado, o passo a passo, o gráfico e o exemplo do dia a dia (saída).

**Para editar:** os textos das aulas ficam todos no `aulas.js`. Os IDs de cada calculadora começam com `lim-`, `der-` ou `int-`.

## 6. Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML, CSS e JavaScript | Página, visual e cálculos |
| Chart.js 4.4.1 | Gráficos |
| chartjs-plugin-zoom 2.0.1 + Hammer.js 2.0.8 | Zoom e arrastar nos gráficos (mouse e toque) |

## 7. Testes

Cada linha foi testada na aplicação. Todos os resultados bateram com o esperado.

| Aula | Entrada | Esperado | Obtido |
|---|---|---|---|
| Funções | Afim, a = 50, b = 200 | f(10) = 700, Im = ℝ, crescente | f(10) = 700, Im = ℝ, crescente ✅ |
| Funções | Quadrática, a = −2, b = 100, c = 0 | Máximo em x = 25, f = 1250 | Máximo em x = 25, f = 1250 ✅ |
| Funções | Exponencial, a = 2 | f(3) = 8, Im = (0, +∞) | f(3) = 8, Im = (0, +∞) ✅ |
| Funções | Constante, a = 500 | Im = {500} | Im = {500} ✅ |
| Funções | Exponencial, a = 1 (inválido) | Mensagem de erro | "a deve ser maior que 0 e diferente de 1" ✅ |
| Limites | (x² − 100)/(x − 10), x → 10 | 20 | 20 (descontinuidade removível) ✅ |
| Limites | 100x/(x + 5), x → ∞ | 100 | 100 ✅ |
| Limites | 10x se x < 100; 8x se x ≥ 100, x → 100 | Não existe | Esquerda 1000, direita 800: não existe ✅ |
| Limites | 3x + 1, x → 2 | 7, contínua | 7, contínua ✅ |
| Derivadas | 500 | 0 | 0 ✅ |
| Derivadas | x³ | 3x² | 3x² ✅ |
| Derivadas | −2x² + 100x | −4x + 100 | −4x + 100 ✅ |
| Derivadas | x · (100 − 2x) | 100 − 4x | −4x + 100 ✅ |
| Derivadas | (50x + 200)/x | −200/x² | −200/x² ✅ |
| Derivadas | e^(0,05x) | 0,05 · e^(0,05x) | 0.05·e^(0.05x) ✅ |
| Integrais | 500, de 0 a 12 | 6000 | 6000 ✅ |
| Integrais | x², de 0 a 3 | 9 | 9 ✅ |
| Integrais | 4x + 100, de 0 a 10 | 1200 | 1200 ✅ |
| Integrais | eˣ, de 0 a 1 | ≈ 1,7183 | ≈ 1.7183 ✅ |
| Integrais | cos x, de 0 a π/2 | 1 | 1 ✅ |
| Integrais | 2x · e^(x²), indefinida | e^(x²) + C | e^(x²) + C ✅ |
| Todas | Campo vazio ou expressão errada | Mensagem de erro | Mensagem de erro e campo marcado em vermelho ✅ |

Também foram verificados: os 26 botões "Testar" das aulas, o zoom dos gráficos e a tela em 7 tamanhos (de celular de 320px até monitor de 1920px).

## 8. Registro de uso de IA

O grupo usou o **Claude Code (Claude Opus 5.5)** no VS Code. Todo código gerado foi revisado e testado antes de ser usado.

| # | Objetivo | Prompt | Resultado | Ajustes | Validação humana |
|---|---|---|---|---|---|
| 1 | Revisar o HTML | "vamos mecher somente na parte do html" | Lista de pendências do HTML | — | Conferido: pendências revisadas no HTML |
| 2 | Organizar o layout | "quero estruturar o html dessa forma" (com print) | Fórmula em cima, tabela ao lado do gráfico | — | Conferido: layout comparado com o print no navegador |
| 3 | Telas dos 4 conteúdos | "faça isso" | Uma área para cada conteúdo | Menu por cima do título corrigido | Conferido: as 4 telas abertas e testadas no navegador |
| 4 | Documentação | "coloque no readme.md uma documentação mais simples [...]" | README reescrito | — | Conferido: README lido e revisado pelo grupo |
| 5 | Dividir tarefas | "quero que voce divida o que [...] no js tem que fazer no css tem que fazer" | Lista de tarefas por integrante | — | Conferido: tarefas revisadas e aceitas pelo grupo |
| 6 | Fazer o JS de todas as abas | "analise a parte do html e veja o que esta faltando na parte do js para que funcione o sistema de calculadora perfeitamente todas as abas" | Cálculo de limites, derivadas e integrais com passo a passo | Cores do gráfico ajustadas ao fundo claro | Conferido: contas refeitas à mão e testadas no navegador |
| 7 | Gráfico maior | "tire todo o zoom que tem os graficos" / "da pra expandir o grafico para uma area maior" | Gráfico maior e zoom com o mouse | Corrigido bug da curva torta no zoom | Conferido: zoom e tamanho do gráfico testados no navegador |
| 8 | Atualizar o andamento | "analisa o codigo e ver no readme.md na parte de andamento o que ja foi feito" | Checklist atualizado | — | Conferido: checklist comparado com o código |
| 9 | Comparar com o PDF da AP2 | "analise o pdf e depois analise o projeto e veja o que estar faltando" | Lista do que faltava para a nota | — | Conferido: itens comparados com o PDF da AP2 |
| 10 | Varredura final | "verifique se ficou proporcional para outras telas e tambem faça uma varredura" | 7 tamanhos de tela e 50 verificações | Corrigidos gráfico vazio em Funções e campo "ponto" em Derivadas | Conferido: telas testadas em vários tamanhos |
| 11 | Documentação final | "cuide agora da parte da documentação" | Este README | — | Conferido: README lido e revisado pelo grupo |

> Na coluna **Validação humana**, cada integrante escreve como conferiu o resultado (ex.: "refiz a conta à mão", "testei no navegador").

## 9. Integrantes

| Nome | Parte |
|---|---|
| Marcos vinicius da Silva Lima | HTML e documentação |
| John Lennon Lopes Silva | CSS |
| Pedro Salviano de Araújo neto | JS |
| Icaro Riquelme da Silva Freitas | JS |
