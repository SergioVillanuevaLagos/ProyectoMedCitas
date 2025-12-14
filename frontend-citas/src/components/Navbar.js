import React from 'react';

function Navbar({ setPage, currentPage }) {
    return (
        <div className="sidebar">
            <h2>🏥 Hospital</h2>
            <button
                className={`btn-menu ${currentPage === 'citas' ? 'active' : ''}`}
                onClick={() => setPage('citas')}
            >
                📅 Citas
            </button>
            <button
                className={`btn-menu ${currentPage === 'pacientes' ? 'active' : ''}`}
                onClick={() => setPage('pacientes')}
            >
                🤒 Pacientes
            </button>
            <button
                className={`btn-menu ${currentPage === 'doctores' ? 'active' : ''}`}
                onClick={() => setPage('doctores')}
            >
                👨‍⚕️ Doctores
            </button>
        </div>
    );
}

export default Navbar;