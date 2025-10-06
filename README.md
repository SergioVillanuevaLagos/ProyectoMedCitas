# Proyecto Med Citas

Este proyecto es una API para la gestión de citas médicas, pacientes, doctores y usuarios.

## Endpoints Implementados

### 1. Crear un Usuario

```
POST http://localhost:3000/usuario
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "nombre": "Juan",
  "apellidos": "Pérez",
  "email": "juan.perez@example.com"
}
```


### 3. Crear un Paciente

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

### 4. Obtener Todos los Pacientes

```
GET http://localhost:3000/paciente
```

**Ejemplo de Respuesta:**

```json
[
  {
    "id": "uuid-generado",
    "nombre": "ana",
    "apellidos": "garcía",
    "fechaNacimiento": "1990-05-15T00:00:00.000Z",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "email": "ana.garcia@example.com",
    "updatedAt": 1690000000000,
    "citas": []
  }
]
```

### 5. Crear un Doctor

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

### 6. Crear una Cita

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

## Ruta para Probar la API

La API puede ser probada localmente en la siguiente URL:

```
http://localhost:3000
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura la base de datos en el archivo `src/app.module.ts`.
4. Inicia el servidor con `npm run start:dev`.

## Tecnologías Utilizadas

- NestJS
- TypeORM
- SQLite
- TypeScript
