
let grafico = null;

function desenharGrafico(pontos, nomeFuncao) {

    const canvas = document.getElementById("grafico");

    // Remove o gráfico anterior
    if (grafico !== null) {
        grafico.destroy();
    }

    // Configuração do gráfico
    grafico = new Chart(canvas, {

        type: "scatter",

        data: {
            datasets: [{
                label: nomeFuncao,
                data: pontos,

                showLine: true,

                borderColor: "#2563eb",
                backgroundColor: "#2563eb",

                borderWidth: 3,

                pointRadius: 0,
                pointHoverRadius: 6,

                tension: 0
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,
            parsing: false,

            interaction: {
                mode: "nearest",
                intersect: false
            },

            plugins: {

                legend: {
                    display: true,
                    position: "top",

                    labels: {
                        color: "#334155",
                        font: {
                            size: 14
                        }
                    }
                },

                tooltip: {
                    enabled: true,

                    callbacks: {
                        label: function(context) {
                            return `X: ${context.parsed.x.toFixed(2)} | Y: ${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },

            scales: {

                x: {
                    type: "linear",

                    title: {
                        display: true,
                        text: "Eixo X",
                        color: "#1e293b",
                        font: {
                            weight: "bold"
                        }
                    },

                    grid: {
                        color: "#e2e8f0"
                    },

                    ticks: {
                        color: "#64748b"
                    }
                },

                y: {

                    title: {
                        display: true,
                        text: "Eixo Y",
                        color: "#1e293b",
                        font: {
                            weight: "bold"
                        }
                    },

                    grid: {
                        color: "#e2e8f0"
                    },

                    ticks: {
                        color: "#64748b"
                    }
                }
            }
        }
    });
}
