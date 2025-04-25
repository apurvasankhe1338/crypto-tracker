import { Middleware } from '@reduxjs/toolkit';
import { 
  setWebsocketConnected, 
  updateSingleCrypto,
  setError 
} from '../cryptoSlice';

// Mapping of circulating supply for accurate market cap calculation
const CIRCULATING_SUPPLY: { [key: string]: number } = {
  btc: 19_600_000,
  eth: 120_000_000,
  bnb: 153_856_150,
  sol: 424_015_287,
  xrp: 45_404_028_640,
  ada: 35_000_000_000,
  doge: 141_690_000_000,
  dot: 1_200_000_000,
  matic: 9_500_000_000,
  ltc: 73_640_700
};

const SYMBOLS_TO_TRACK = Object.keys(CIRCULATING_SUPPLY).map(symbol => `${symbol}usdt`);

const createWebSocketMiddleware = (): Middleware => {
  return store => {
    let ws: WebSocket | null = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    const PRICE_HISTORY: { [key: string]: { price: number; timestamp: number }[] } = {};

    const connect = () => {
      try {
        const streams = SYMBOLS_TO_TRACK.map(symbol => `${symbol}@ticker`).join('/');
        ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.onopen = () => {
          console.log('WebSocket Connected');
          store.dispatch(setWebsocketConnected(true));
          reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.e === '24hrTicker') {
              const symbol = data.s.toLowerCase().replace('usdt', '');
              
              // Parse price and calculate metrics
              const price = parseFloat(data.c);
              const priceChange24h = parseFloat(data.P);
              const volume24h = parseFloat(data.v);
              const quoteVolume = parseFloat(data.q); // Volume in USDT
              
              // Calculate market cap using circulating supply
              const marketCap = price * CIRCULATING_SUPPLY[symbol];

              // Update price history with timestamps
              const now = Date.now();
              if (!PRICE_HISTORY[symbol]) {
                PRICE_HISTORY[symbol] = Array(7).fill({ price, timestamp: now });
              } else {
                const lastUpdate = PRICE_HISTORY[symbol][PRICE_HISTORY[symbol].length - 1];
                
                // Update every 5 minutes or if price changed significantly
                if (now - lastUpdate.timestamp >= 300000 || 
                    Math.abs(price - lastUpdate.price) / lastUpdate.price > 0.005) {
                  PRICE_HISTORY[symbol] = [
                    ...PRICE_HISTORY[symbol].slice(1),
                    { price, timestamp: now }
                  ];
                }
              }

              // Calculate 7d price change
              const priceChange7d = PRICE_HISTORY[symbol].length > 1
                ? ((price - PRICE_HISTORY[symbol][0].price) / PRICE_HISTORY[symbol][0].price) * 100
                : 0;

              store.dispatch(updateSingleCrypto({ 
                symbol,
                data: {
                  current_price: price,
                  price_change_percentage_24h: priceChange24h,
                  price_change_percentage_7d: priceChange7d,
                  total_volume: quoteVolume,
                  market_cap: marketCap,
                  sparkline_data: PRICE_HISTORY[symbol].map(entry => entry.price)
                }
              }));
            }
          } catch (error) {
            console.error('Failed to process message:', error);
          }
        };

        ws.onclose = () => {
          store.dispatch(setWebsocketConnected(false));
          
          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts++;
            setTimeout(connect, 2000 * reconnectAttempts);
          } else {
            store.dispatch(setError('Failed to connect after multiple attempts'));
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          ws?.close();
        };

      } catch (error) {
        console.error('Failed to establish WebSocket connection:', error);
        store.dispatch(setError('Failed to connect to WebSocket'));
      }
    };

    connect();

    return next => action => {
      if (action.type === '@@DESTROY') {
        ws?.close();
      }
      return next(action);
    };
  };
};

export default createWebSocketMiddleware;