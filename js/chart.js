document.addEventListener('DOMContentLoaded', function() {
    // Obtém o símbolo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const symbol = urlParams.get('symbol') || 'BTC';
    
    // Atualiza o título com o símbolo
    document.getElementById('symbol-title').textContent = `${symbol}/USDT`;
    
    // Preenche os dados da moeda (numa aplicação real, estes viriam de uma API)
    const coinData = getCoinData(symbol);
    document.getElementById('current-price').textContent = coinData.price;
    
    const changeElement = document.getElementById('price-change');
    changeElement.textContent = coinData.change;
    changeElement.className = coinData.changeValue > 0 ? 'positive' : 'negative';
    
    document.getElementById('volume').textContent = coinData.volume;
    document.getElementById('volatility').textContent = coinData.volatility;
    document.getElementById('high').textContent = coinData.high;
    document.getElementById('low').textContent = coinData.low;
    
    document.getElementById('rsi').textContent = coinData.rsi;
    document.getElementById('macd').textContent = coinData.macd;
    document.getElementById('stoch').textContent = coinData.stoch;
    
    // Configuração do gráfico de preço
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Dados fictícios para o gráfico
    const priceData = generateChartData(symbol);
    
    const priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: `${symbol}/USDT`,
                data: priceData,
                backgroundColor: 'rgba(78, 166, 255, 0.1)',
                borderColor: 'rgba(78, 166, 255, 1)',
                borderWidth: 2,
                pointRadius: 0,
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
                    intersect: false
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'HH:mm'
                        }
                    },
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
    
    // Controles de período de tempo
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            // Obtém o período selecionado
            const period = button.dataset.period;
            
            // Atualiza o gráfico com novos dados baseados no período
            updateChartData(priceChart, period, symbol);
        });
    });
    
    // Botão de criar alerta
    const alertButton = document.getElementById('alertButton');
    if (alertButton) {
        alertButton.addEventListener('click', function() {
            // Envia dados para o bot (numa implementação real)
            tg.sendData(JSON.stringify({
                action: 'create_alert',
                symbol: symbol,
                price: coinData.price.replace('$', '')
            }));
            
            alert(`Alerta para ${symbol} será criado quando o bot processar.`);
        });
    }
});

// Função para gerar dados fictícios para o gráfico
function generateChartData(symbol) {
    const data = [];
    const now = new Date();
    const multiplier = symbol === 'BTC' ? 26000 : 
                       symbol === 'ETH' ? 1600 : 
                       symbol === 'SOL' ? 25 : 1;
    
    for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        const baseValue = multiplier + (Math.random() - 0.5) * multiplier * 0.1;
        
        data.push({
            x: time,
            y: baseValue
        });
    }
    
    return data;
}

// Função para atualizar dados do gráfico com base no período
function updateChartData(chart, period, symbol) {
    const now = new Date();
    const data = [];
    let timeUnit, points;
    const multiplier = symbol === 'BTC' ? 26000 : 
                      symbol === 'ETH' ? 1600 : 
                      symbol === 'SOL' ? 25 : 1;
    
    switch(period) {
        case '1h':
            timeUnit = 60000 * 5; // 5 minutos
            points = 12;
            break;
        case '4h':
            timeUnit = 60000 * 20; // 20 minutos
            points = 12;
            break;
        case '1d':
            timeUnit = 3600000; // 1 hora
            points = 24;
            break;
        case '1w':
            timeUnit = 3600000 * 6; // 6 horas
            points = 28;
            break;
        case '1m':
            timeUnit = 3600000 * 24; // 1 dia
            points = 30;
            break;
        default:
            timeUnit = 3600000;
            points = 24;
    }
    
    for (let i = points; i >= 0; i--) {
        const time = new Date(now.getTime() - i * timeUnit);
        // Valor base + variação aleatória (mais variação para períodos maiores)
        const volatility = period === '1m' ? 0.2 : 
                          period === '1w' ? 0.15 : 
                          period === '1d' ? 0.1 : 
                          period === '4h' ? 0.05 : 0.02;
        
        const baseValue = multiplier + (Math.random() - 0.5) * multiplier * volatility;
        
        data.push({
            x: time,
            y: baseValue
        });
    }
    
    // Atualiza os dados e opções do gráfico
    chart.data.datasets[0].data = data;
    
    // Atualiza as unidades de tempo com base no período
    let timeUnitDisplay;
    switch(period) {
        case '1h': case '4h':
            timeUnitDisplay = 'minute';
            chart.options.scales.x.time.displayFormats = { minute: 'HH:mm' };
            break;
        case '1d':
            timeUnitDisplay = 'hour';
            chart.options.scales.x.time.displayFormats = { hour: 'HH:mm' };
            break;
        case '1w':
            timeUnitDisplay = 'day';
            chart.options.scales.x.time.displayFormats = { day: 'DD/MM' };
            break;
        case '1m':
            timeUnitDisplay = 'day';
            chart.options.scales.x.time.displayFormats = { day: 'DD/MM' };
            break;
    }
    
    chart.options.scales.x.time.unit = timeUnitDisplay;
    chart.update();
}

// Função para obter dados fictícios da moeda
function getCoinData(symbol) {
    // Numa aplicação real, estes dados viriam de uma API
    const coinDataMap = {
        'BTC': {
            price: '$26,235.75',
            change: '+2.3%',
            changeValue: 2.3,
            volume: '23.5B USDT',
            volatility: '3.2%',
            high: '$26,580.00',
            low: '$25,790.50',
            rsi: '58.3',
            macd: '0.45/0.22',
            stoch: '63.5'
        },
        'ETH': {
            price: '$1,645.25',
            change: '-0.7%',
            changeValue: -0.7,
            volume: '9.8B USDT',
            volatility: '2.8%',
            high: '$1,682.50',
            low: '$1,628.75',
            rsi: '46.2',
            macd: '-0.15/0.08',
            stoch: '42.7'
        },
        'SOL': {
            price: '$25.85',
            change: '+5.2%',
            changeValue: 5.2,
            volume: '1.2B USDT',
            volatility: '6.5%',
            high: '$26.40',
            low: '$24.35',
            rsi: '72.8',
            macd: '0.35/0.12',
            stoch: '81.4'
        },
        'AVAX': {
            price: '$35.45',
            change: '+15.8%',
            changeValue: 15.8,
            volume: '980M USDT',
            volatility: '12.3%',
            high: '$37.20',
            low: '$30.65',
            rsi: '85.2',
            macd: '1.25/0.45',
            stoch: '92.6'
        },
        'DOT': {
            price: '$7.23',
            change: '+3.5%',
            changeValue: 3.5,
            volume: '385M USDT',
            volatility: '5.8%',
            high: '$7.48',
            low: '$6.95',
            rsi: '62.7',
            macd: '0.22/0.08',
            stoch: '68.5'
        },
        'MATIC': {
            price: '$0.85',
            change: '+1.8%',
            changeValue: 1.8,
            volume: '425M USDT',
            volatility: '4.5%',
            high: '$0.88',
            low: '$0.82',
            rsi: '54.3',
            macd: '0.02/0.01',
            stoch: '57.2'
        }
    };
    
    // Retorna os dados da moeda selecionada ou dados padrão se não encontrar
    return coinDataMap[symbol] || {
        price: '$0.00',
        change: '0.0%',
        changeValue: 0,
        volume: '0 USDT',
        volatility: '0.0%',
        high: '$0.00',
        low: '$0.00',
        rsi: '50.0',
        macd: '0/0',
        stoch: '50.0'
    };
}