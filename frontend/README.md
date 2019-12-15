# Cashcog Events Management Frontend
Purpose of this README file is let you know the steps for 
setting/running the frontend UI app.

- **Prerequisites**:
  - **OS**: Linux
  - **node**: 12.8.0
  - **npm**: 6.10.2
  
- **General Setup**:
  - `cd cem_frontend/`
  - Installing required packages:<br />
  `npm install`
  - Update following settings object according to your backend api 
    server which is inside 
    `src/settings.js` file.
    ```
    const API_SERVER = {
        protocol: 'http',
        host: 'localhost',
        port: '8000',
    };
    ```
    
- **Run Frontend UI app**:<br />
  ```
  cd cem_frontend/
  npm start
  ```