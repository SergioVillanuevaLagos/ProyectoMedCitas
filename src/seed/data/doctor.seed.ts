import { Doctor } from "src/doctor/entities/doctor.entity";
import { v4 as uuid } from 'uuid';

export const DOCTORES_SEED: Partial<Doctor>[] = [
    {
        id: uuid(),
        nombre: 'Dr. López',
        especialidad: 'Cardiología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        nombre: 'Dra. Pérez',
        especialidad: 'Neurología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        nombre: 'Dr. García',
        especialidad: 'Dermatología',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        nombre: 'Dra. Martínez',
        especialidad: 'Pediatría',
        horasLibres: '[]',
    },
    {
        id: uuid(),
        nombre: 'Dr. Rodríguez',
        especialidad: 'Traumatología',
        horasLibres: '[]',
    },
];