# Guía de Pruebas del Sistema de Autenticación

Este documento proporciona una guía paso a paso para probar todos los endpoints del módulo de autenticación implementado en el proyecto.

## Tabla de Contenidos
1. [Configuración Inicial](#configuración-inicial)
2. [Roles del Sistema](#roles-del-sistema)
3. [Endpoints](#endpoints)
4. [Pruebas Paso a Paso](#pruebas-paso-a-paso)

## Configuración Inicial

### Variables de Entorno
Asegúrate de que el archivo `.env` contenga:
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=tu_secreto_jwt_aqui
```

### Iniciar el Servidor
```bash
npm install
npm run start:dev
```

El servidor debería estar corriendo en `http://localhost:3000`

## Roles del Sistema

El sistema implementa 3 roles específicos para la gestión médica:

| Rol | Descripción |
|-----|-------------|
| `paciente` | Paciente del sistema, rol por defecto, puede agendar citas |
| `doctor` | Doctor, puede ver y gestionar sus citas asignadas |
| `administrador` | Administrador del sistema, gestiona doctores y pacientes |

## Endpoints

### Endpoints Públicos (sin autenticación)

#### 1. Registro de Usuario
- **URL**: `POST /auth/register`
- **Autenticación**: No requerida

#### 2. Login
- **URL**: `POST /auth/login`
- **Autenticación**: No requerida

### Endpoints Protegidos (requieren autenticación)

#### 3. Verificar Estado de Autenticación
- **URL**: `GET /auth/check-status`
- **Autenticación**: Token JWT requerido
- **Roles**: Cualquier usuario autenticado

#### 4. Ruta Privada Básica
- **URL**: `GET /auth/private`
- **Autenticación**: Token JWT requerido
- **Roles**: Cualquier usuario autenticado

#### 5. Ruta Privada con Roles (Método 2)
- **URL**: `GET /auth/private2`
- **Autenticación**: Token JWT requerido
- **Roles**: `administrador`, `doctor`

#### 6. Ruta Privada con Roles (Método 3 - Decorador Compuesto)
- **URL**: `GET /auth/private3`
- **Autenticación**: Token JWT requerido
- **Roles**: `administrador`

## Pruebas Paso a Paso

### Herramientas Recomendadas
- **Postman**: [Descargar aquí](https://www.postman.com/downloads/)
- **Thunder Client**: Extensión de VS Code
- **cURL**: Línea de comandos

---

### Paso 1: Registrar un Usuario Básico

**Solicitud:**
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Test123",
  "fullName": "Usuario de Prueba"
}
```

**Usando cURL:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "Test123",
    "fullName": "Usuario de Prueba"
  }'
```

**Respuesta Esperada (201 Created):**
```json
{
  "id": "uuid-aqui",
  "email": "usuario@example.com",
  "fullName": "Usuario de Prueba",
  "isActive": true,
  "roles": ["paciente"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validaciones de Contraseña:**
La contraseña debe cumplir:
- Mínimo 6 caracteres
- Máximo 50 caracteres
- Al menos 1 letra mayúscula
- Al menos 1 letra minúscula
- Al menos 1 número

**Errores Comunes:**
- Email inválido → `400 Bad Request`
- Email duplicado → `400 Bad Request` (código PostgreSQL 23505)
- Contraseña débil → `400 Bad Request` con mensaje de validación

---

### Paso 2: Registrar un Usuario Administrador

Para crear un usuario con rol administrador, necesitas modificar manualmente el usuario en la base de datos o crear un endpoint especializado. Por ahora, hazlo directamente en PostgreSQL:

```sql
-- Conectar a la base de datos
UPDATE users 
SET roles = '{administrador}' 
WHERE email = 'admin@example.com';
```

O registra un usuario y luego actualiza sus roles:

**1. Registrar:**
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123",
  "fullName": "Administrador"
}
```

**2. Actualizar en DB:**
```sql
UPDATE users 
SET roles = '{administrador}' 
WHERE email = 'admin@example.com';
```

---

### Paso 3: Login

**Solicitud:**
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Test123"
}
```

**Usando cURL:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "Test123"
  }'
```

**Respuesta Esperada (200 OK):**
```json
{
  "email": "usuario@example.com",
  "password": "$2b$10$...", 
  "id": "uuid-aqui",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Importante:** Guarda el `token` para las siguientes pruebas.

**Errores Comunes:**
- Email incorrecto → `401 Unauthorized: Credentials are not valid (email)`
- Contraseña incorrecta → `401 Unauthorized: Credentials are not valid (password)`

---

### Paso 4: Verificar Estado de Autenticación

**Solicitud:**
```bash
GET http://localhost:3000/auth/check-status
Authorization: Bearer <tu_token_aqui>
```

**Usando cURL:**
```bash
curl -X GET http://localhost:3000/auth/check-status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta Esperada (200 OK):**
```json
{
  "id": "uuid-aqui",
  "email": "usuario@example.com",
  "fullName": "Usuario de Prueba",
  "isActive": true,
  "roles": ["paciente"],
  "token": "nuevo_token_aqui"
}
```

**Errores Comunes:**
- Sin token → `401 Unauthorized`
- Token inválido → `401 Unauthorized: Token not valid`
- Usuario inactivo → `401 Unauthorized: User is inactive, talk with an admin`

---

### Paso 5: Probar Ruta Privada Básica

**Solicitud:**
```bash
GET http://localhost:3000/auth/private
Authorization: Bearer <tu_token_aqui>
```

**Usando cURL:**
```bash
curl -X GET http://localhost:3000/auth/private \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta Esperada (200 OK):**
```json
{
  "ok": true,
  "message": "This is a private route",
  "user": {
    "id": "uuid-aqui",
    "email": "usuario@example.com",
    "fullName": "Usuario de Prueba",
    "isActive": true,
    "roles": ["paciente"]
  },
  "userEmail": "usuario@example.com",
  "rawHeaders": [
    "authorization",
    "Bearer eyJhbGc...",
    "..."
  ]
}
```

---

### Paso 6: Probar Ruta con Protección de Roles (private2)

Esta ruta requiere rol `administrador` o `doctor`.

**Solicitud con usuario básico (paciente):**
```bash
GET http://localhost:3000/auth/private2
Authorization: Bearer <token_de_paciente>
```

**Respuesta Esperada (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "User Usuario de Prueba need a valid role: [administrador,doctor]",
  "error": "Forbidden"
}
```

**Solicitud con usuario administrador:**
```bash
GET http://localhost:3000/auth/private2
Authorization: Bearer <token_de_administrador>
```

**Respuesta Esperada (200 OK):**
```json
{
  "ok": true,
  "user": {
    "id": "uuid-aqui",
    "email": "admin@example.com",
    "fullName": "Administrador",
    "isActive": true,
    "roles": ["administrador"]
  }
}
```

---

### Paso 7: Probar Ruta con Decorador Compuesto (private3)

Esta ruta requiere específicamente rol `administrador`.

**Solicitud con paciente:**
```bash
GET http://localhost:3000/auth/private3
Authorization: Bearer <token_de_paciente>
```

**Respuesta Esperada (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "User Usuario de Prueba need a valid role: [administrador]",
  "error": "Forbidden"
}
```

**Solicitud con usuario administrador:**
```bash
GET http://localhost:3000/auth/private3
Authorization: Bearer <token_de_administrador>
```

**Respuesta Esperada (200 OK):**
```json
{
  "ok": true,
  "user": {
    "id": "uuid-aqui",
    "email": "admin@example.com",
    "fullName": "Administrador",
    "isActive": true,
    "roles": ["administrador"]
  }
}
```

---

## Resumen de Protección de Rutas

| Endpoint | Autenticación | Roles Permitidos | Método de Protección |
|----------|---------------|------------------|---------------------|
| POST `/auth/register` | ❌ No | Todos | Ninguno |
| POST `/auth/login` | ❌ No | Todos | Ninguno |
| GET `/auth/check-status` | ✅ Sí | Todos autenticados | `@Auth()` |
| GET `/auth/private` | ✅ Sí | Todos autenticados | `@UseGuards(AuthGuard())` |
| GET `/auth/private2` | ✅ Sí | administrador, doctor | `@RoleProtected()` + Guards manuales |
| GET `/auth/private3` | ✅ Sí | administrador | `@Auth(ValidRoles.administrador)` |

## Seguridad Implementada

### 1. **Hashing de Contraseñas**
- Usa `bcrypt` con salt rounds de 10
- Las contraseñas nunca se almacenan en texto plano
- Campo password con `select: false` por defecto

### 2. **JWT (JSON Web Tokens)**
- Tokens con expiración de 2 horas
- Secret configurable vía variables de entorno
- Payload contiene solo el ID del usuario

### 3. **Guards de Autorización**
- `AuthGuard`: Verifica token JWT válido
- `UserRoleGuard`: Verifica roles del usuario
- `@Auth()`: Decorador compuesto que combina ambos

### 4. **Validaciones**
- DTOs con validaciones de class-validator
- Email único en base de datos
- Contraseñas fuertes requeridas
- Sanitización automática de emails (lowercase, trim)

### 5. **Protección de Datos**
- Usuario inactivo no puede autenticarse
- Password nunca se retorna en respuestas (excepto login interno)
- Manejo seguro de errores sin exponer información sensible

## Troubleshooting

### Error: "Cannot find module 'bcrypt'"
```bash
npm install bcrypt
npm install --save-dev @types/bcrypt
```

### Error: "JWT_SECRET not defined"
Verifica tu archivo `.env`:
```env
JWT_SECRET=tu_secreto_seguro_aqui
```

### Error: "User not found (request)"
El token JWT no está siendo validado correctamente. Verifica que:
1. El token esté en el header `Authorization: Bearer <token>`
2. El JWT_SECRET sea el mismo que al generar el token
3. El token no haya expirado

### Base de Datos: Ver usuarios y roles
```sql
SELECT id, email, "fullName", "isActive", roles 
FROM users;
```

### Actualizar roles de un usuario
```sql
UPDATE users 
SET roles = '{administrador, paciente}' 
WHERE email = 'usuario@example.com';
```

---

## Próximos Pasos

1. **Integrar autenticación en otros módulos**: Usa el decorador `@Auth()` en otros controladores
2. **Crear endpoint para cambio de contraseña**
3. **Implementar refresh tokens**
4. **Agregar rate limiting para prevenir ataques de fuerza bruta**
5. **Implementar recuperación de contraseña vía email**

## Soporte

Para más información sobre NestJS y autenticación:
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)
