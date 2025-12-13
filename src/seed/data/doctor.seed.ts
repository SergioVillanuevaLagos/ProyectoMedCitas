import { Doctor } from "src/doctor/entities/doctor.entity";
import { v4 as uuid } from 'uuid';

export const DOCTORES_SEED: Partial<Doctor>[] = [
    {
        id: uuid(),
        especialidad: 'Cardiología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        especialidad: 'Neurología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        especialidad: 'Dermatología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        especialidad: 'Pediatría',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        especialidad: 'Traumatología',
        horasLibres: '[]',
    },
];