document.addEventListener('DOMContentLoaded', function() {
    // Configuração do gráfico de tendências do mercado
    const ctx = document.getElementById('marketTrendChart').getContext('2d');
    
    const marketTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1 Set', '5 Set', '10 Set', '15 Set', '20 Set', '25 Set', '27 Set'],
            datasets: [{
                label: 'BTC',
                data: [27500, 25800, 26200, 26700, 27100, 26500, 26200],
                borderColor: 'rgba(247, 147, 26, 1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false
            },
            {
                label: 'ETH',
                data: [1650, 1580, 1620, 1670, 1700, 1680, 1650],
                borderColor: 'rgba(115, 123, 182, 1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false
            },
            {
                label: 'Total',
                data: [2.25, 2.15, 2.18, 2.22, 2.28, 2.32, 2.35],
                borderColor: 'rgba(78, 166, 255, 1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
    
    // Implementação das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Desativa todos os botões e esconde todos os conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');
            
            // Ativa o botão clicado e mostra o conteúdo correspondente
            button.classList.add('active');
            document.getElementById(tabName).style.display = 'block';
        });
    });
});