import { Provider } from 'react-redux';
import CryptoTable from './components/CryptoTable';
import FilterBar from './components/FilterBar';
import Layout from './components/Layout';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Cryptocurrency Prices</h2>
          <p className="text-gray-400">
            Track real-time crypto prices, market cap, volume, and more with our live dashboard. 
            All data is sourced directly from Binance's WebSocket API.
          </p>
        </div>
        
        <FilterBar />
        <CryptoTable />
      </Layout>
    </Provider>
  );
}

export default App;