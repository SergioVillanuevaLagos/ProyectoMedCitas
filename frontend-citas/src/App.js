import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CitasPage from './pages/CitasPage';
import DoctoresPage from './pages/DoctoresPage';
import PacientesPage from './pages/PacientesPage';

function App() {
  const [page, setPage] = useState('citas');

  return (
    <div className="layout">
      <Navbar setPage={setPage} currentPage={page} />
      <div className="main">
        {page === 'citas' && <CitasPage />}
        {page === 'doctores' && <DoctoresPage />}
        {page === 'pacientes' && <PacientesPage />}
      </div>
    </div>
  );
}

export default App;