// Inicializa o App do Telegram
const tg = window.Telegram.WebApp;
tg.expand(); // Expande o app para tela inteira

// Configura tema do Telegram
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#1C1C1E');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#FFFFFF');
document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#7D7D7D');
document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#4EA6FF');
document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#4EA6FF');
document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#FFFFFF');

// Configuração do botão principal do Telegram
tg.MainButton.setText('VOLTAR AO BOT');
tg.MainButton.onClick(function() {
    tg.close();
});

// Configuração do botão de voltar em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Se estamos na página principal, volta ao bot
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                tg.close();
            } else {
                // Se não, volta para a página principal
                window.location.href = 'index.html';
            }
        });
    }
});