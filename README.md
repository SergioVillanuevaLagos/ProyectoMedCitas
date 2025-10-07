# Proyecto Med Citas

Este proyecto es una API para la gestión de citas médicas, pacientes, doctores y usuarios.

## Tecnología

- Backend: NestJS
- Base de datos: PostgreSQL

## Endpoints Implementados

### 1. Crear un Paciente

```
POST http://localhost:3000/paciente
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "nombre": "Ana",
  "apellidos": "García",
  "fechaNacimiento": "1990-05-15",
  "direccion": "Calle Falsa 123",
  "telefono": "555-1234",
  "email": "ana.garcia@example.com"
}
```

### 2. Obtener Todos los Pacientes

```
GET http://localhost:3000/paciente
```

**Ejemplo de Respuesta:**

```json
[
  {
    "id": "uuid-generado",
    "nombre": "Ana",
    "apellidos": "García",
    "fechaNacimiento": "1990-05-15T00:00:00.000Z",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "email": "ana.garcia@example.com",
    "updatedAt": 1690000000000,
    "citas": []
  }
]
```

### 3. Crear un Doctor

```
POST http://localhost:3000/doctor
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "nombre": "Dr. López",
  "especialidad": "Cardiología"
}
```

### 4. Crear una Cita

```
POST http://localhost:3000/cita
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "doctorId": "uuid-doctor",
  "pacienteId": "uuid-paciente",
  "fechaHora": "2023-12-01T10:00:00.000Z",
  "estado": "pendiente",
  "motivo": "Consulta general"
}
```

### 5. Sembrar la Base de Datos

```
GET http://localhost:3000/seed
```

**Ejemplo de Respuesta:**
Este endpoint inicializa la base de datos con datos de ejemplo para doctores, pacientes y citas.


```json
{
  "message": "Seed ejecutada correctamente"
}
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura la base de datos en el archivo `src/app.module.ts`.
4. Inicia el servidor con `npm run start:dev`.
