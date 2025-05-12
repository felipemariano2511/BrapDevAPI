const TOKEN = '9XA6UncG1fwai6G125WnzT'; 
const SYMBOLS = ['AZUL4', 'PBR', 'HAPV3', 'CORN11', 'B3SA3', 'ITSA4', 'PETR4'];
const banner = document.getElementById('stock-banner');

function fetchStockData(symbol) {
  return fetch(`https://brapi.dev/api/quote/${symbol}?token=${TOKEN}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const stock = data?.results?.[0]; 

      if (!stock) {
        throw new Error('Dados de ação inválidos ou ausentes.');
      }

      const changePercent = regularMarketChangePercent ?? 0;
      const regularMarketPrice = stock.regularMarketPrice ?? 0;
      const variationClass = changePercent > 0 ? 'positive' : 'negative';

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${stock.logourl || 'https://via.placeholder.com/40'}" alt="Logo">
        <div class="ticker">${stock.symbol}</div>
        <div class="name">${stock.longName || stock.shortName || 'Empresa Desconhecida'}</div>
        <div class="price">R$ ${regularMarketPrice.toFixed(2)}</div>
        <div class="variation ${variationClass}">
          ${changePercent.toFixed(2)}%
        </div>
      `;

      banner.appendChild(card);
    })
    .catch(err => {
      console.error(`Erro ao buscar dados da ação ${symbol}:`, err);
    });
}

SYMBOLS.forEach(symbol => {
  fetchStockData(symbol);
});
