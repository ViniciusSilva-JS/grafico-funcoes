# Faturamento em Gráficos

Projeto Final de CDI (AP2) – Engenharia de Software – UNICATÓLICA RN – 2026.2

Aplicação web que usa **funções, limites, derivadas e integrais** para analisar o **faturamento de uma empresa**.

---

## 1. Problema

Uma empresa precisa entender o próprio faturamento para tomar decisões:
- Quanto vou faturar se vender uma certa quantidade?
- Até onde o faturamento pode crescer?
- Vender uma unidade a mais aumenta o faturamento em quanto?
- Quanto a empresa faturou no total em um período?

Fazer essas contas à mão é demorado e fácil de errar. A aplicação faz os cálculos, mostra o gráfico e explica o resultado em linguagem simples.

## 2. Objetivos

- Modelar o faturamento com **funções** e mostrar tabela, gráfico, domínio e imagem.
- Usar **limites** para descobrir o teto de faturamento e mudanças bruscas de preço.
- Usar **derivadas** para calcular o faturamento marginal e a quantidade que dá o maior faturamento.
- Usar **integrais** para calcular o faturamento total acumulado em um período.
- Tratar entradas inválidas e explicar cada resultado.

## 3. Os quatro conteúdos aplicados ao faturamento

No canto superior direito, o usuário escolhe o conteúdo: **Funções**, **Limites**, **Derivadas** ou **Integrais**.

### Aula 1 – Funções

x = quantidade vendida (ou tempo em meses) e f(x) = faturamento em reais.

| Função | Fórmula | Exemplo no faturamento |
|---|---|---|
| Constante | f(x) = a | Valor fixo de uma assinatura mensal, que não muda com as vendas |
| Linear | f(x) = ax | Faturamento = preço × quantidade |
| Afim | f(x) = ax + b | Preço por unidade + uma taxa fixa |
| Quadrática | f(x) = ax² + bx + c | Desconto por volume: o faturamento sobe até um ponto e depois cai |
| Exponencial | f(x) = aˣ | Faturamento que cresce uma porcentagem fixa todo mês |

**O que a tela mostra:** o tipo e a fórmula, as entradas (x, a, b, c) e a saída (f(x)), a tabela de valores, o gráfico, o domínio, a imagem e se o faturamento cresce ou cai.

### Aula 2 – Limites

| Situação | Exemplo | O que significa |
|---|---|---|
| Limite no infinito | lim x→∞ 100x/(x + 5) = 100 | O faturamento nunca passa de R$ 100 mil: é o teto do mercado |
| Caso 0/0 | lim x→10 (x² − 100)/(x − 10) = 20 | Simplificando para x + 10, o valor é 20 |
| Limites laterais diferentes | Preço de R$ 10 abaixo de 100 unidades e de R$ 8 a partir de 100 | À esquerda o faturamento tende a 1000, à direita é 800. **O limite não existe**: há um salto no faturamento |
| Função contínua | lim x→2 (3x + 1) = 7 | Basta substituir: propriedade da soma e do produto por constante |

**O que a tela mostra:** a tabela com x se aproximando do ponto pelos dois lados, o limite à esquerda, o limite à direita, o resultado, se a função é contínua e a interpretação para a empresa.

### Aula 3 – Derivadas

A derivada do faturamento é o **faturamento marginal**: quanto o faturamento aumenta vendendo uma unidade a mais. Quando a derivada é zero, a empresa está na quantidade que dá o **maior faturamento**.

| Regra | Exemplo | Resultado |
|---|---|---|
| Constante | f(x) = 500 | f'(x) = 0 (a assinatura fixa não muda com as vendas) |
| Potência | f(x) = x³ | f'(x) = 3x² |
| Soma/subtração | f(x) = −2x² + 100x | f'(x) = −4x + 100 → maior faturamento em x = 25 |
| Produto | f(x) = x · (100 − 2x) (quantidade × preço) | f'(x) = 100 − 4x |
| Quociente | f(x) = (50x + 200)/x (faturamento médio por unidade) | f'(x) = −200/x² |
| Cadeia | f(x) = e^(0,05x) (crescimento de 5%) | f'(x) = 0,05 · e^(0,05x) |

**O que a tela mostra:** f'(x), o passo a passo com a regra de cada etapa, o gráfico de f e f' juntos e o valor de f' em um ponto.

### Aula 4 – Integrais

Se f(x) é quanto a empresa fatura por mês, a integral de a até b é o **faturamento total** acumulado nesse período: a área sob a curva.

| Regra | Exemplo | Resultado |
|---|---|---|
| Constante | ∫ 500 dx, de 0 a 12 | 500x + C → R$ 6.000 em 12 meses |
| Potência | ∫ x² dx, de 0 a 3 | x³/3 + C → 9 |
| Soma/subtração | ∫ (4x + 100) dx, de 0 a 10 | 2x² + 100x + C → 1.200 |
| Exponencial | ∫ eˣ dx, de 0 a 1 | eˣ + C → e − 1 ≈ 1,7183 |
| Trigonométrica | ∫ cos x dx, de 0 a π/2 (vendas sazonais) | sen x + C → 1 |
| Substituição | ∫ 2x · e^(x²) dx | e^(x²) + C (com u = x²) |

**O que a tela mostra:** o resultado (com + C na indefinida), o passo a passo com as regras, o valor da integral definida e a área pintada no gráfico.

## 4. Como rodar

**Não precisa instalar nada.** A única dependência é o Chart.js, que é carregado da internet.

1. Baixe o projeto: `git clone https://github.com/ViniciusSilva-JS/grafico-funcoes.git`
2. Abra a pasta no VS Code.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

Também funciona abrindo o `index.html` direto no navegador, desde que haja internet.

## 5. Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML | Estrutura da página |
| CSS | Aparência e layout |
| JavaScript | Leitura dos campos e cálculos |
| Chart.js 4.4.1 | Desenho dos gráficos |

## 6. Arquitetura

```
index.html  →  o usuário escolhe o conteúdo e preenche os campos
    │
    ├── script.js      lê os campos, troca de conteúdo e calcula as funções
    ├── limites.js     cálculo dos limites       (em desenvolvimento)
    ├── derivadas.js   cálculo das derivadas     (em desenvolvimento)
    ├── integrais.js   cálculo das integrais     (em desenvolvimento)
    │
    └── grafico.js     recebe os pontos e desenha o gráfico com o Chart.js

estilo.css  →  visual de todas as telas
```

**Fluxo:** entrada (campos) → processamento (cálculo no JavaScript) → saída (fórmula, tabela, gráfico e interpretação).

**Para quem vai mexer no código:**
- Cada conteúdo fica numa caixa própria no `index.html`: `modulo-funcoes`, `modulo-limites`, `modulo-derivadas` e `modulo-integrais`. Só uma aparece por vez; as outras ficam com o atributo `hidden`.
- Os IDs de cada conteúdo começam com o mesmo prefixo: `lim-` (Limites), `der-` (Derivadas) e `int-` (Integrais).
- O CSS usa classes (`.controles`, `.botao`, `.rodape`...) para os quatro conteúdos terem o mesmo visual.

## 7. Capturas de tela

> Adicionar os prints de cada tela na pasta `imagens/` e trocar os nomes abaixo.

<!--
![Funções](imagens/funcoes.png)
![Limites](imagens/limites.png)
![Derivadas](imagens/derivadas.png)
![Integrais](imagens/integrais.png)
-->

## 8. Testes

Cada linha é um teste feito na aplicação. A coluna **Obtido** é preenchida depois de testar.

| Conteúdo | Entrada | Esperado | Obtido | OK? |
|---|---|---|---|---|
| Funções | Afim, a = 50, b = 200, x = 10 | f(10) = 700, D = ℝ, Im = ℝ, crescente | | |
| Funções | Quadrática, a = −2, b = 100, c = 0 | Máximo em x = 25, f = 1250, Im = (−∞, 1250] | | |
| Funções | Exponencial, a = 2, x = 3 | f(3) = 8, Im = ℝ*₊, crescente | | |
| Funções | Constante, a = 500 | Im = {500}, constante | | |
| Funções | Exponencial, a = 1 (inválido) | Mensagem de erro | | |
| Limites | (x² − 100)/(x − 10), x → 10 | 20 | | |
| Limites | 100x/(x + 5), x → ∞ | 100 | | |
| Limites | Preço 10x (x < 100) e 8x (x ≥ 100), x → 100 | Esquerda 1000, direita 800, **não existe** | | |
| Limites | 3x + 1, x → 2 | 7, contínua | | |
| Derivadas | 500 | 0 | | |
| Derivadas | x³ | 3x² | | |
| Derivadas | −2x² + 100x | −4x + 100 | | |
| Derivadas | x · (100 − 2x) | 100 − 4x | | |
| Derivadas | (50x + 200)/x | −200/x² | | |
| Derivadas | e^(0,05x) | 0,05 · e^(0,05x) | | |
| Integrais | 500, de 0 a 12 | 6000 | | |
| Integrais | x², de 0 a 3 | 9 | | |
| Integrais | 4x + 100, de 0 a 10 | 1200 | | |
| Integrais | eˣ, de 0 a 1 | ≈ 1,7183 | | |
| Integrais | cos x, de 0 a π/2 | 1 | | |
| Integrais | 2x · e^(x²), indefinida | e^(x²) + C | | |
| Todos | Campo vazio | Mensagem de erro | | |

## 9. Registro de uso de IA

O grupo usou IA durante o desenvolvimento. Todo código gerado foi revisado e testado pelos integrantes antes de ser usado.

| # | Ferramenta | Objetivo | Prompt | Resultado | Ajustes | Validação humana |
|---|---|---|---|---|---|---|
| 1 | Claude Code (Claude Opus 5.5) no VS Code | Revisar o HTML | "vamos mecher somente na parte do html" | Lista de pendências: tabela sem cabeçalho, rodapé incompleto, "Tipo:" fora do lugar e `div` sem fechar | — | *(preencher)* |
| 2 | Claude Code (Claude Opus 5.5) | Organizar o HTML no formato do slide | "quero estruturar o html dessa forma" (com print do layout) | HTML com fórmula em cima, tabela ao lado do gráfico e domínio/imagem embaixo | — | *(preencher)* |
| 3 | Claude Code (Claude Opus 5.5) | Entender como deixar o gráfico mais amplo | "como faço para tirar mais o som desse grafico? deixar ele mais amplo? ou é só o pessoal do js?" | Explicação: intervalo de x no `script.js` e tamanho no CSS/`grafico.js` | Nenhum código alterado | *(preencher)* |
| 4 | Claude Code (Claude Opus 5.5) | Criar o menu de conteúdos | "quero que coloque como uma lista de escolha onde o usuario vai escolher entre limites, função derivadas e integrais, quero que coloque a lista no canto superior do lado direito" | Menu `#modulo` no canto superior direito | — | *(preencher)* |
| 5 | Claude Code (Claude Opus 5.5) | Criar as telas de Limites, Derivadas e Integrais | "faça isso" (montar uma área para cada conteúdo) | Quatro módulos no HTML e CSS trocado de IDs para classes | Corrigidos menu por cima do título e gráfico estourando a largura | *(preencher)* |
| 6 | Claude Code (Claude Opus 5.5) | Documentação | "coloque no readme.md uma documentação mais simples para tanto os outros usuarios do codigo entender como tambem a professora" | README reescrito | — | *(preencher)* |
| 7 | Claude Code (Claude Opus 5.5) | Dividir as tarefas do grupo | "quero que voce divida o que por exemplo no js tem que fazer no css tem que fazer..." | Lista de tarefas por integrante | Complemento com os pontos que faltavam | *(preencher)* |
> Cada integrante deve adicionar aqui os prompts que usar, com a ferramenta, o objetivo, o texto, o resultado, o que foi ajustado e como conferiu se estava certo.

## 10. Andamento

- [x] Estrutura do HTML dos quatro conteúdos
- [x] Visual (CSS)
- [x] Gráfico das funções
- [x] Menu trocando de conteúdo
- [x] Tabela, domínio, imagem, entradas/saídas e comportamento das funções
- [x] Cálculo de limites (com propriedades, laterais, infinito e inexistência)
- [x] Cálculo de derivadas (5 regras)
- [x] Cálculo de integrais (5 regras)
- [ ] Botão "Carregar exemplo" em cada conteúdo
- [x] Tratamento de entradas inválidas
- [ ] Preencher a tabela de testes
- [ ] Prints das telas
- [ ] Completar o registro de uso de IA

## 11. Integrantes

| Nome | Parte |
|---|---|
| Vinicius | HTML e documentação |
| jonh | CSS |
| (salviano) |JS |
| Riquelme | JS|
