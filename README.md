# CLASE MARTES SEPT 03/2024
--------
1. Socializarles a qué se debía la inconsistencia: En el store, operación se completaba con éxito aunque la petición generaba error.
2. Ejercicio de implementación de Firebase servicio de autenticación:
	- Registro de usuarios con email y contraseña 
	- Inicio de sesión con email y contraseña
	- Inicio de sesión con google
	- Inicio de sesión con telefono (envío de código de verificación SMS)
	- Cómo realizar el despliegue con Firebase Hosting

- Comenzar un nuevo proyecto react con vite:

```bash
  npm create vite@latest my-findy-app -- --template react
```
- abrimos la carpeta del proyecto en VSC e instalamos dependencias con: npm install
- Instalar librerías:
	- Redux toolkit
	- react-redux
	- React router dom
	- React icons
   ```bash
	npm install @reduxjs/toolkit react-redux react-router-dom react-icons
   ```
-Eliminar los archivos de la template que no necesitamos
- Organizar la estructura de carpetas inicial del proyecto
```
└── 📁src
    └── 📁components
    └── 📁Firebase
        └── firebaseConfig.js
    └── 📁pages
        └── 📁Feed
            └── Feed.jsx
        └── 📁Login
            └── Login.jsx
        └── 📁PostDetails
            └── PostDetails.jsx
        └── 📁Profile
            └── Profile.jsx
        └── 📁Register
            └── Register.jsx
    └── 📁redux o store
    └── 📁router
        └── AppRouter.jsx
        └── PriveRoutes.jsx
        └── PublicRoutes.jsx
    └── 📁services
    └── main.jsx
```

- En el archivo `main.jsx` se instancia el componente `<AppRouter/>`

*****************
###  CREAR Y CONFIGURAR EL PROYECTO DESDE LA CONSOLA DE FIREBASE
- Ir a la consola de firebase: https://firebase.google.com/?hl=es
- Click en crear un proyecto 
- Darle nombre al proyecto
- Deshabilitar Google Analitycs y crear proyecto
- Cuando se cree el proyecto en firebase, se debe dar click en la opción web `(</>)`
- Registrar App y seguir el paso a paso que nos proporciona firebase
	- Instalar firebase:
  ```Bash
   npm install firebase
  ```
	- Copiar el código de inicialización de firebase en el proyecto
	- Pegar el código en el archivo `firebaseConfig.js`
	- Click en ir a consola
- Activar el servicio de autenticación de Firebase: Click a la card Authentication
- Click en comenzar
- Escoger el primer método de acceso: Correo y contraseña
 - Habilitar el método de acceso y se Guarda

**************
###  CONFIGURAR E INTEGRAR EL SERVICIO DE AUTH EN EL PROYECTO 

- En `firebaseConfig.js` inicializamos el servicio de auth con el método `getAuth` que viene de `firebase/auth`

*************
### CONFIGURAR REDUX TOOLKIT EN NUESTRO PROYECTO 

- Ir a la carpeta `redux/` o `store/`
- crear el archivo `store.js`
- crear la carpeta donde se guardarán los archivos relacionados al slice
```
└── 📁src
    └── 📁components
    └── 📁Firebase
        └── firebaseConfig.js
    └── 📁pages
        └── 📁Feed
            └── Feed.jsx
        └── 📁Login
            └── Login.jsx
        └── 📁PostDetails
            └── PostDetails.jsx
        └── 📁Profile
            └── Profile.jsx
        └── 📁Register
            └── Register.jsx
    └── 📁redux o store
        └── 📁auth
            └── authSlice.js
        └── store.js
    └── 📁router
        └── AppRouter.jsx
        └── PriveRoutes.jsx
        └── PublicRoutes.jsx
    └── 📁services
    └── main.jsx
```

- Configurar el store con el método `configureStore` de redux toolkit:
```
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        
    }
})

export default store;
```
- En `authSlice.js`, creamos los thunks con `createAsyncThunk` y el slice

```
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";

export const createAccountThunk = createAsyncThunk("auth/createAccount", async ({ email, password, name, photo }) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
    })
    return {
        id: userCredentials.user.uid,
        displayName: name,
        email: email,
        accessToken: userCredentials.user.accessToken,
        photoURL: photo
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccountThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(createAccountThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null
        }).addCase(createAccountThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

const authReducer = authSlice.reducer;
export default authReducer;
```
- Incluimos el slice en los reducers del store
```
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";


const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;
```

- Integrar redux en la aplicación en `main.jsx`
```
import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
```

- Para el jueves continuamos con el acceso de los estados globales guardados en el store desde los componentes
# CLASE JUEVES SEPT 05/2024
