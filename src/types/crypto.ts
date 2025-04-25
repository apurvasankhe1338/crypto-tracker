export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number | null;
  sparkline_data: number[];
  last_updated: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: keyof CryptoData | null;
  direction: SortDirection;
}

export interface FilterState {
  search: string;
  view: 'all' | 'gainers' | 'losers';
}

export interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  websocketConnected: boolean;
  sort: SortState;
  filter: FilterState;
}