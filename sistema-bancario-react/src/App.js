import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/clientes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
}

export default App;
