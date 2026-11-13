# Gerador de Gráfico de Funções

Site feito em grupo para a disciplina de Cálculo. Ele mostra, de forma visual, como funcionam as funções, os limites, as derivadas e as integrais.

## Como usar

1. No canto superior direito, escolha o conteúdo: **Funções**, **Limites**, **Derivadas** ou **Integrais**.
2. Preencha os campos da esquerda.
3. Clique no botão para calcular.
4. O resultado aparece à direita: a fórmula em cima, uma tabela ao lado do gráfico e as conclusões embaixo.

## O que cada conteúdo faz

| Conteúdo | O que o usuário informa | O que aparece |
|---|---|---|
| **Funções** | O tipo de função e os valores de a, b e c | Fórmula, tabela de valores, gráfico, domínio, imagem e se a função é crescente ou decrescente |
| **Limites** (Aula 2) | A função e para onde x tende | O valor do limite, os limites pela esquerda e pela direita, se a função é contínua e se o limite existe |
| **Derivadas** (Aula 3) | A função | A derivada, o passo a passo com as regras usadas e o gráfico da função e da derivada |
| **Integrais** (Aula 4) | A função e, se for definida, os limites a e b | A integral, o passo a passo com as regras usadas e a área no gráfico |

**Funções disponíveis:** constante f(x) = a, linear f(x) = ax, afim f(x) = ax + b, quadrática f(x) = ax² + bx + c e exponencial f(x) = aˣ.

## Como rodar

1. Baixe o projeto: `git clone https://github.com/ViniciusSilva-JS/grafico-funcoes.git`
2. Abra a pasta no VS Code.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

Também funciona abrindo o `index.html` direto no navegador, desde que haja internet para carregar a biblioteca de gráficos.

## Arquivos do projeto

| Arquivo | Para que serve |
|---|---|
| `index.html` | A estrutura da página: menu, campos, tabelas e espaço dos gráficos |
| `estilo.css` | A aparência: cores, tamanhos e posição de cada parte |
| `script.js` | Lê o que o usuário digitou e faz os cálculos |
| `grafico.js` | Desenha o gráfico na tela |

Usamos **HTML**, **CSS**, **JavaScript** e a biblioteca **Chart.js** para os gráficos.

## Para quem vai mexer no código

- Cada conteúdo fica numa caixa própria no `index.html`: `modulo-funcoes`, `modulo-limites`, `modulo-derivadas` e `modulo-integrais`.
- Só uma caixa aparece por vez. As outras ficam escondidas com o atributo `hidden`.
- Os IDs de cada conteúdo começam com o mesmo prefixo, para facilitar no JavaScript:
  - Limites: `lim-` (exemplo: `lim-funcao`, `lim-resultado`, `lim-grafico`)
  - Derivadas: `der-` (exemplo: `der-funcao`, `der-resultado`, `der-grafico`)
  - Integrais: `int-` (exemplo: `int-funcao`, `int-resultado`, `int-grafico`)
- O CSS usa classes (`.controles`, `.botao`, `.rodape`...) para que os quatro conteúdos tenham o mesmo visual.

## Andamento

- [x] Estrutura do HTML dos quatro conteúdos
- [x] Visual (CSS)
- [x] Gráfico das funções
- [ ] Tabela, domínio, imagem e comportamento das funções
- [ ] Menu trocando de conteúdo
- [ ] Cálculo de limites
- [ ] Cálculo de derivadas
- [ ] Cálculo de integrais

## Integrantes

| Nome | Parte |
|---|---|
| Vinicius | HTML |
| jonh | CSS |
| (salviano) | |
| Riquelme | |
