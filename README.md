# ⚙️ Backend - Portafolio Personalizable

Servidor backend desarrollado en **Node.js + Express** con conexión a **MongoDB Atlas**.  
Gestiona usuarios, autenticación JWT, envío de correos y guardado de configuraciones del portafolio.

---

## 📦 Dependencias necesarias

Asegurate de tener instaladas las siguientes herramientas antes de comenzar:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (viene incluido con Node)
- Una base de datos **MongoDB Atlas** o local
- Una cuenta de **Gmail** para el envío de correos (SMTP)

---

## ⚙️ Instalación

1. Cloná el repositorio:
    ```bash
    git clone https://github.com/kevinleichner/portafolio_personalizable_backend.git
    cd portafolio_personalizable_backend

2. Instalá las dependencias:
    ```bash
    npm install

3. Creá un archivo .env en la raíz del proyecto con las siguientes variables (usá el ejemplo de .env.template):
    ```bash
    cp .env.template .env

4. Iniciá el entorno de desarrollo:
    ```bash
    npm run dev

---

## 🧩 Variables de entorno

Debés crear un archivo .env con las siguientes variables:

| Variable              | Descripción                               | Ejemplo                                                                        |
| --------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| `PORT`                | Puerto en el que corre el servidor        | `4000`                                                                         |
| `DB_CNN`              | Cadena de conexión a MongoDB              | `mongodb+srv://usuario:contraseña@cluster.mongodb.net/portafolioPersonalizado` |
| `JWT_PALABRA_SECRETA` | Palabra secreta para firmar tokens JWT    | `MiPalabraSecreta123!`                                                         |
| `SMTP_EMAIL`          | Correo usado para enviar emails (SMTP)    | `miapp@gmail.com`                                                              |
| `SMTP_PASS`           | Contraseña o App Password del correo SMTP | `abcd efgh ijkl mnop`                                                          |
| `SMTP_HOST`           | Servidor SMTP                             | `smtp.gmail.com`                                                               |
| `SMTP_PORT`           | Puerto SMTP                               | `587`                                                                          |
| `SMTP_SECURE`         | Si se usa conexión segura (true/false)    | `false`                                                                        |
| `URL_FRONTEND`        | URL del frontend para redirecciones       | `http://localhost:4321`                                                        |



También podés usar el archivo .env.template incluido en el proyecto como guía.