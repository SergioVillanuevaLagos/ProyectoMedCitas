import React, { useState, useEffect } from 'react';

function DoctoresPage() {
    const [docs, setDocs] = useState([]);
    const [form, setForm] = useState({ nombre: '', especialidad: '', horasLibres: 'Mañana' });
    const API = 'http://localhost:3000/doctor';

    useEffect(() => {
        fetch(API).then(res => res.json()).then(data => setDocs(data)).catch(console.error);
    }, []);

    const save = (e) => {
        e.preventDefault();
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(() => {
            setForm({ nombre: '', especialidad: '', horasLibres: 'Mañana' });
            return fetch(API);
        }).then(res => res.json()).then(data => setDocs(data));
    };

    return (
        <div>
            <h1>Doctores</h1>

            {/* Formulario */}
            <div className="card">
                <form onSubmit={save}>
                    <div className="form-group"><label>Nombre</label><input className="input" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                    <div className="form-group"><label>Especialidad</label><input className="input" value={form.especialidad} onChange={e => setForm({ ...form, especialidad: e.target.value })} required /></div>
                    <button className="btn-save">Guardar Doctor</button>
                </form>
            </div>

            {/* TABLA DE DOCTORES */}
            <div className="card table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map(d => (
                            <tr key={d.id}>
                                <td>{d.nombre}</td>
                                <td>{d.especialidad}</td>
                                <td>{d.horasLibres || '-'}</td>
                            </tr>
                        ))}
                        {docs.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay doctores registrados</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DoctoresPage;