import React, { useState, useEffect } from 'react';

function CitasPage() {
    const [citas, setCitas] = useState([]);
    const [docs, setDocs] = useState([]);
    const [pacs, setPacs] = useState([]);
    const [form, setForm] = useState({ doctorId: '', pacienteId: '', fechaHora: '', motivo: '' });

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/citas'),
            fetch('http://localhost:3000/doctor'),
            fetch('http://localhost:3000/paciente')
        ]).then(async ([resC, resD, resP]) => {
            if (resC.ok) setCitas(await resC.json());
            if (resD.ok) setDocs(await resD.json());
            if (resP.ok) setPacs(await resP.json());
        }).catch(console.error);
    }, []);

    const save = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/citas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(() => fetch('http://localhost:3000/citas'))
            .then(res => res.json())
            .then(data => setCitas(data));
    };

    return (
        <div>
            <h1>Citas Médicas</h1>
            <div className="card">
                <form onSubmit={save}>
                    <div className="form-group">
                        <label>Paciente</label>
                        <select className="input" value={form.pacienteId} onChange={e => setForm({ ...form, pacienteId: e.target.value })} required>
                            <option value="">Seleccione...</option>
                            {pacs.map(p => <option key={p.id} value={p.id}>{p.nombre} {p.apellidos}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Doctor</label>
                        <select className="input" value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })} required>
                            <option value="">Seleccione...</option>
                            {docs.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label>Fecha</label><input type="datetime-local" className="input" value={form.fechaHora} onChange={e => setForm({ ...form, fechaHora: e.target.value })} required /></div>
                    <div className="form-group"><label>Motivo</label><input className="input" value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })} required /></div>
                    <button className="btn-save">Agendar Cita</button>
                </form>
            </div>

            {/* TABLA DE CITAS */}
            <div className="card table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha y Hora</th>
                            <th>Paciente</th>
                            <th>Doctor</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(c => (
                            <tr key={c.id}>
                                <td>{new Date(c.fechaHora).toLocaleString()}</td>
                                <td>{c.paciente ? `${c.paciente.nombre} ${c.paciente.apellidos}` : 'Eliminado'}</td>
                                <td>{c.doctor ? c.doctor.nombre : 'Eliminado'}</td>
                                <td>{c.motivo}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: c.estado === 'confirmada' ? '#dcfce7' : '#fef9c3',
                                        color: c.estado === 'confirmada' ? '#166534' : '#854d0e',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem'
                                    }}>
                                        {c.estado || 'pendiente'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {citas.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No hay citas agendadas</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CitasPage;