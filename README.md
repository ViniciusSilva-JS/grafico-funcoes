Fechado! Copia o bloco abaixo e cola no seu `README.md`, no lugar do que está lá:

```markdown
# Gerador de Gráfico de Funções

Trabalho em grupo para mostrar visualmente como funcionam os gráficos das funções matemáticas. O usuário escolhe uma função, digita os valores de a, b e c, e o gráfico é gerado na tela.

## Funções disponíveis

- **Constante:** y = b
- **Linear:** y = ax
- **Afim:** y = ax + b
- **Quadrática:** y = ax² + bx + c
- **Exponencial:** y = a · 2ˣ

## Estrutura do HTML

A página é dividida em caixas (`div`):

- **container:** caixa principal, que deixa os controles e o gráfico lado a lado.
- **controles:** caixa da esquerda, com tudo que o usuário mexe:
  - **select (tipo):** menu para escolher a função.
  - **campo-a, campo-b e campo-c:** cada um tem um `label` (o texto) e um `input` (o campo de número). Ficam em `div` separadas para poderem ser mostradas ou escondidas conforme a função.
  - **botão (gerar):** gera o gráfico.
- **grafico-container:** caixa da direita, com o `canvas`, o quadro onde o gráfico é desenhado.

## Tecnologias

- **HTML:** estrutura da página
- **CSS:** visual e posicionamento
- **JavaScript:** cálculos e desenho do gráfico
- **Chart.js:** biblioteca de gráficos

## Como rodar

1. Clone o repositório: `git clone LINK-DO-REPOSITORIO`
2. Abra a pasta no VS Code.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

## Integrantes

- Vinicius
- (adicione os colegas aqui)
```

Depois de colar, salva, faz o commit e o push. No GitHub, o README aparece formatado bonitinho na página do repositório. Só falta colocar os nomes dos colegas no final.
