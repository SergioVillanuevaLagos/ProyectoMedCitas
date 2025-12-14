import React, { useState, useEffect } from 'react';

function PacientesPage() {
    const [pacs, setPacs] = useState([]);

    // Mantenemos el formulario igual para enviar los datos al crear
    const [form, setForm] = useState({
        nombre: '', apellidos: '', email: '', telefono: '', direccion: '', fechaNacimiento: ''
    });

    const API = 'http://localhost:3000/paciente';

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(data => setPacs(data))
            .catch(console.error);
    }, []);

    const save = (e) => {
        e.preventDefault();
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(() => {
            // Limpiar formulario
            setForm({ nombre: '', apellidos: '', email: '', telefono: '', direccion: '', fechaNacimiento: '' });
            // Recargar lista
            return fetch(API);
        }).then(res => res.json()).then(data => setPacs(data));
    };

    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div>
            <h1>Pacientes</h1>

            {/* FORMULARIO DE REGISTRO */}
            <div className="card">
                <h3>Registrar Nuevo</h3>
                <form onSubmit={save}>
                    <div className="form-group"><label>Nombre</label><input className="input" name="nombre" value={form.nombre} onChange={change} /></div>
                    <div className="form-group"><label>Apellidos</label><input className="input" name="apellidos" value={form.apellidos} onChange={change} /></div>
                    <div className="form-group"><label>Email</label><input className="input" name="email" value={form.email} onChange={change} /></div>
                    <div className="form-group"><label>Teléfono</label><input className="input" name="telefono" value={form.telefono} onChange={change} required /></div>
                    <div className="form-group"><label>Fecha Nac.</label><input type="date" className="input" name="fechaNacimiento" value={form.fechaNacimiento} onChange={change} required /></div>
                    <div className="form-group"><label>Dirección</label><input className="input" name="direccion" value={form.direccion} onChange={change} required /></div>
                    <button className="btn-save">Guardar Paciente</button>
                </form>
            </div>

            {/* TABLA DE PACIENTES */}
            <div className="card table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre Completo (Usuario)</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>F. Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacs.map(p => {
                            // LÓGICA DE VISUALIZACIÓN:
                            // 1. Si existe p.user, usamos sus datos (fullName, email).
                            // 2. Si p.user es null, mostramos avisos.

                            const nombre = p.user ? p.user.fullName : '⚠️ Sin Usuario Asignado';
                            const email = p.user ? p.user.email : '-';

                            // Estilo para destacar si falta el usuario
                            const estiloNombre = p.user ? { fontWeight: 'bold' } : { color: '#ef4444', fontStyle: 'italic' };

                            return (
                                <tr key={p.id}>
                                    <td style={estiloNombre}>{nombre}</td>
                                    <td>{email}</td>
                                    <td>{p.telefono || '-'}</td>
                                    <td>{p.direccion || '-'}</td>
                                    <td>{p.fechaNacimiento ? new Date(p.fechaNacimiento).toLocaleDateString() : '-'}</td>
                                </tr>
                            );
                        })}

                        {pacs.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No hay pacientes registrados</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PacientesPage;