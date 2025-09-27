document.addEventListener('DOMContentLoaded', function() {
    // Configuração do gráfico de alocação do portfolio
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    const portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['BTC', 'ETH', 'SOL', 'Outros'],
            datasets: [{
                data: [7000.80, 2775.00, 475.95, 0],
                backgroundColor: [
                    'rgba(247, 147, 26, 0.8)',
                    'rgba(115, 123, 182, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(78, 166, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(247, 147, 26, 1)',
                    'rgba(115, 123, 182, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(78, 166, 255, 1)'
                ],
                borderWidth: 1
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
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}$${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
    
    // Adicionando funcionalidade para esconder/mostrar o valor do portfolio
    const balanceValue = document.querySelector('.balance .value');
    if (balanceValue) {
        balanceValue.addEventListener('click', function() {
            const currentValue = balanceValue.textContent;
            if (currentValue.includes('*')) {
                balanceValue.textContent = '$10,250.75';
            } else {
                balanceValue.textContent = '$**,***.**';
            }
        });
    }
});