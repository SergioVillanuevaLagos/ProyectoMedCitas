import { Cita } from "src/cita/entities/cita.entity";
import { v4 as uuid } from 'uuid';

export const CITAS_SEED: Partial<Cita>[] = [
    {
        id: uuid(),
        doctorId: uuid(),
        pacienteId: uuid(),
        fechaHora: new Date('2023-12-01T10:00:00.000Z'),
        estado: 'pendiente',
        motivo: 'Consulta general',
    },
    {
        id: uuid(),
        doctorId: uuid(),
        pacienteId: uuid(),
        fechaHora: new Date('2023-12-02T11:00:00.000Z'),
        estado: 'confirmada',
        motivo: 'Revisión médica',
    },
    {
        id: uuid(),
        doctorId: uuid(),
        pacienteId: uuid(),
        fechaHora: new Date('2023-12-03T14:00:00.000Z'),
        estado: 'pendiente',
        motivo: 'Chequeo rutinario',
    },
    {
        id: uuid(),
        doctorId: uuid(),
        pacienteId: uuid(),
        fechaHora: new Date('2023-12-04T16:00:00.000Z'),
        estado: 'cancelada',
        motivo: 'Consulta de seguimiento',
    },
    {
        id: uuid(),
        doctorId: uuid(),
        pacienteId: uuid(),
        fechaHora: new Date('2023-12-05T09:00:00.000Z'),
        estado: 'pendiente',
        motivo: 'Consulta de urgencia',
    },
];