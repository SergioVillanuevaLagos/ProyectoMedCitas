# Proyecto Med Citas

Este proyecto es una API para la gestión de citas médicas, pacientes, doctores y administradores.

## Tecnología

- Backend: NestJS
- Base de datos: PostgreSQL

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura la base de datos en el archivo `src/app.module.ts` y en `.env` si es necesario.

3. Inicia el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

---

## Endpoints Implementados

### **Paciente**

#### 1. Crear un Paciente

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

#### 2. Obtener Todos los Pacientes

```
GET http://localhost:3000/paciente
```

#### 3. Obtener un Paciente por ID

```
GET http://localhost:3000/paciente/:id
```


#### 4. Eliminar un Paciente

```
DELETE http://localhost:3000/paciente/:id
```

---

### **Doctor**

#### 1. Crear un Doctor

```
POST http://localhost:3000/doctor
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "nombre": "Dr. López",
  "especialidad": "Cardiología",
  "horasLibres": "2"
}
```

#### 2. Obtener Todos los Doctores

```
GET http://localhost:3000/doctor
```

#### 3. Obtener un Doctor por ID

```
GET http://localhost:3000/doctor/:id
```



#### 4. Eliminar un Doctor

```
DELETE http://localhost:3000/doctor/:id
```

---

### **Cita**

#### 1. Crear una Cita

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

#### 2. Obtener Todas las Citas

```
GET http://localhost:3000/cita
```

#### 3. Obtener una Cita por ID

```
GET http://localhost:3000/cita/:id
```



#### 4. Eliminar una Cita

```
DELETE http://localhost:3000/cita/:id
```

---

### **Administrador**

#### 1. Crear un Administrador

```
POST http://localhost:3000/administrador
```

**Ejemplo de Cuerpo de la Solicitud:**

```json
{
  "nombre": "Admin Principal",
  "email": "admin@hospital.com",
  "contraseña": "Admin123456"
}
```

#### 2. Obtener Todos los Administradores

```
GET http://localhost:3000/administrador
```

#### 3. Obtener un Administrador por ID

```
GET http://localhost:3000/administrador/:id
```


#### 4. Eliminar un Administrador

```
DELETE http://localhost:3000/administrador/:id
```

---

### **Seed (Datos de Prueba)**

#### Sembrar la Base de Datos

```
GET http://localhost:3000/seed
```

**Respuesta:**

```json
"Seed ejecutada correctamente"
```

Este endpoint inicializa la base de datos con datos de ejemplo para doctores, pacientes y citas.
