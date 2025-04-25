import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoData, SortState, FilterState } from '../types/crypto';

const initialCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 19543678,
    max_supply: 21000000,
    sparkline_data: Array(7).fill(0),
    last_updated: new Date().toISOString(),
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 120345678,
    max_supply: null,
    sparkline_data: Array(7).fill(0),
    last_updated: new Date().toISOString(),
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 153856150,
    max_supply: 200000000,
    sparkline_data: Array(7).fill(0),
    last_updated: new Date().toISOString(),
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 424015287,
    max_supply: null,
    sparkline_data: Array(7).fill(0),
    last_updated: new Date().toISOString(),
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0,
    price_change_percentage_1h: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 45404028640,
    max_supply: 100000000000,
    sparkline_data: Array(7).fill(0),
    last_updated: new Date().toISOString(),
  }
];

const initialState: CryptoState = {
  data: initialCryptoData,
  loading: false,
  error: null,
  lastUpdated: new Date().toISOString(),
  websocketConnected: false,
  sort: {
    column: 'market_cap',
    direction: 'desc',
  },
  filter: {
    search: '',
    view: 'all',
  },
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setWebsocketConnected: (state, action: PayloadAction<boolean>) => {
      state.websocketConnected = action.payload;
    },
    updateSingleCrypto: (state, action: PayloadAction<{ 
      symbol: string; 
      data: Partial<CryptoData>;
    }>) => {
      const { symbol, data } = action.payload;
      const crypto = state.data.find(c => c.symbol === symbol);
      
      if (crypto) {
        Object.assign(crypto, data);
        crypto.last_updated = new Date().toISOString();
        
        // Update sparkline data
        if (data.current_price) {
          crypto.sparkline_data = [
            ...crypto.sparkline_data.slice(1),
            data.current_price
          ];
        }
      }
      
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSortColumn: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const {
  setWebsocketConnected,
  updateSingleCrypto,
  setLoading,
  setError,
  setSortColumn,
  setFilter,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;