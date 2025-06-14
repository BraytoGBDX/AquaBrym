# 💧 Aquabrym Backend

**Aquabrym Backend** es la API desarrollada con **NestJS** que permite gestionar, procesar y exponer datos en tiempo real relacionados con el consumo de agua. Esta API se comunica con sensores físicos conectados a dispositivos Arduino, y sirve como puente entre el hardware y el frontend web, permitiendo registrar lecturas, usuarios, dispositivos y generar recomendaciones personalizadas.

---

## 📖 Descripción del Proyecto

Aquabrym Backend forma parte de una solución integral para el monitoreo de agua. A través de endpoints seguros y organizados, permite a aplicaciones cliente consultar, almacenar y actualizar información relevante sobre sensores, consumos y usuarios.

---

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🧠 ¿Cómo funciona?

1. 🔧 **Los sensores** conectados a Arduino miden el flujo de agua.
2. 📡 **Los datos** se envían al backend mediante peticiones HTTP o WebSocket (futuro).
3. 🧮 **NestJS procesa** los datos y los guarda en una base de datos MySQL.
4. 🔄 **El frontend** consume esta API para mostrar información al usuario.
5. 💡 **Recomendaciones** automáticas se pueden generar según consumo registrado.

---

## ⚙️ Estructura del Proyecto

aqua-brym/
├── src/
│ ├── users/
│ ├── entities/
│ ├── sensors/
│ ├── sensor-readings/
│ ├── bills/
│ ├── app.module.ts
│ ├── main.ts
├── ormconfig.ts
├── package.json
├── tsconfig.json
└── README.md


---

## 🎯 Características principales

- CRUD completo para usuarios, sensores, lecturas y entidades.
- Almacenamiento eficiente de datos en MySQL.
- Validaciones con DTOs y TypeORM.
- Documentación automática con Swagger.
- Preparado para integración futura con WebSocket y autenticación JWT.

---

## 🧰 Tecnologías utilizadas

| Tecnología       | Descripción                                     |
|------------------|-------------------------------------------------|
| 🧱 NestJS         | Framework progresivo de Node.js para backend    |
| 📦 TypeORM        | ORM para interactuar con la base de datos       |
| 🐬 MySQL          | Base de datos relacional utilizada              |
| 📄 Swagger        | Generación automática de documentación API      |

---

## 📌 Futuras mejoras

- Autenticación de usuarios (JWT o OAuth)
- WebSocket para actualizaciones en tiempo real
- Control de roles y permisos (admin/user)
- Alertas y recomendaciones inteligentes
- Tests automatizados y despliegue continuo

---

## 🧑‍💻 Autor

Desarrollado por **AquaBrym**  
📬 Contacto: [lculpa34@gmail.com]
