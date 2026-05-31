# TaskFlowSPA
Project to understand the structure of a single-page application (SPA), improve its logic and distribution of responsibilities, as well as API usage

## 📂 Project Structure

El proyecto está dividido en dos partes principales:

- **`/client`**: Contiene la interfaz de usuario construida con **Vite** y **Tailwind CSS**.
- **`/api`**: Contiene el backend, simulando el servidor de datos utilizando **json-server**.

```bash
.
├── api
│   ├── database.json
├── client
│   ├── index.html
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   ├── controllers
│   │   ├── main.js
│   │   ├── router
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   └── views
│   └── vite.config.ts
├── LICENSE
└── README.md

```

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS.
- **Herramientas de Construcción:** Vite.
- **Backend (Simulado):** JSON Server.

## 🚀 Installation

1.  Instala las dependencias en la carpeta del `cliente`:
    ```bash
    cd client
    npm install
    npm run dev
    ```
2.  Configura e inicia tu servidor en la carpeta `api`:
    ```bash
    cd api
    npm install
    npx json-server database.json
    ```

## 👨‍💻 Author

- GitHub: **[Danilo-Doria](https://github.com/Danilo-Doria)**
- LinkedIn: **[Danilo Doria Diaz](https://www.linkedin.com/in/danilodd)**
- Correo: **danilodoria519@gmail.com**

## 📄 Licence

This project is for educational and personal use.