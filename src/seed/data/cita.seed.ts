import { Cita } from "src/cita/entities/cita.entity";
import { v4 as uuid } from 'uuid';


export const BRANDS_SEED: Cita[] = [
    { id: uuid(), name: 'Volvo', createdAt: new Date().getTime() },
    { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
    { id: uuid(), name: 'Honda', createdAt: new Date().getTime() },
    { id: uuid(), name: 'Jeep', createdAt: new Date().getTime() },
    { id: uuid(), name: 'Tesla', createdAt: new Date().getTime() },
];