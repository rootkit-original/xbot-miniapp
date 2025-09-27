document.addEventListener('DOMContentLoaded', function() {
    // Configuração do gráfico de desempenho
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            datasets: [{
                label: 'Desempenho',
                data: [0, 1.2, 2.5, 1.8, 0.5, -1.0, -1.5],
                backgroundColor: 'rgba(78, 166, 255, 0.1)',
                borderColor: 'rgba(78, 166, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(78, 166, 255, 1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(1) + '%';
                            }
                            return label;
                        }
                    }
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
                        callback: function(value) {
                            return value + '%';
                        },
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
});