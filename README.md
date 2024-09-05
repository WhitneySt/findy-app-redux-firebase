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
- abrimos la carpeta del proyecto en VSCode e instalamos dependencias con:
  ```bash
  npm install
  ```
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
```javascript
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        
    }
})

export default store;
```
- En `authSlice.js`, creamos los thunks con `createAsyncThunk` y el slice

```javascript
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
```javascript
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
```javascript
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
## EN LOS COMPONENTES
- Definir las rutas de las páginas (Sin implementar aún protección de rutas) en `AppRouter.jsx`
 - Crear el componente Layout:

1. Incluirlo en la estructura de carpetas del proyecto dentro de `components/`:  Creamos el archivo y el componente `Layout.jsx`
```
└── 📁src
    └── 📁components
        └── 📁Layout
            └── Layout.jsx
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
    └── 📁redux
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

2. En el componente Layout.jsx
```javascript
import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
      <div>Layout
          <Outlet/>
    </div>
  )
}

export default Layout
```
 3. Definir las rutas en el componente `<AppRouter/>`
```javascript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Feed from "../pages/Feed/Feed";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="post/:postId" element={<PostDetails />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to={'/' } /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

```
- Instalar formik y yup para trabajar con formularios en el componente `Register.jsx`:
```Bash
npm install formik yup --save
```
- Construir el componente de Registro
	- ¿Qué es lo que queremos mostrar en el componente?
	- ¿Cómo queremos mostrarlo? (Estilizado y aplicación de diseño)
	- Las funcionalidades que debe tener cada elemento que conforman el componente.
- Para manejar el archivo que se recibe en el input tipo `file` del formulario, se debe subir esa foto de perfil en el servidor de cloudinary
  
	CONFIGURACION DE CLAOUDINARY
	-Ir a la página de cloudinary: [https://cloudinary.com/](https://cloudinary.com/)
	- Iniciamos sesión
	- ir al dashboard
	- asegurar el cloud name (copiarlo)
	- Ir a settings
	- Ir a la opción Upload
	- Ir a upload preset
	- dar clik a add upload preset
	- Asignar un nombre al preset y copiarlo
	- En el signing mode, le asignamos la opción unsiged
	- Le asigamos un nombre al folder donde se guardarían los archivos cargados desde el proyecto
	- Click en Save
   
	CREAR EL SERVICIO O LA FUNCION DESDE EL PROYECTO QUE NOS PERMITIRÁ CARGAR LOS ARCHIVOS A CLOUDINARY
	- Crear el archivo `uploadFiles.js` en `services/`
```
	└── 📁src
	    └── 📁components
	        └── 📁Layout
	            └── Layout.jsx
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
	    └── 📁redux
	        └── 📁auth
	            └── authSlice.js
	        └── store.js
	    └── 📁router
	        └── AppRouter.jsx
	        └── PriveRoutes.jsx
	        └── PublicRoutes.jsx
	    └── 📁services
	        └── uploadFiles.js
	    └── main.jsx
```

- En `uploadFiles.js` colocar el siguiente código:

```javascript
const uploadFiles = async (file) => {
  const cloudName = "";		//Colocar el cloudName de su cuenta
  const uploadPreset = "";	//Colocar el preset que se creó en cloudinary para el proyecto

  const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const resp = await fetch(urlCloudinary, {
      method: "post",
      body: formData,
    });

    if (!resp.ok) return null;

    const data = await resp.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadFiles;
```

- Colocar el cloudName de su cuenta en la constante `cloudName`
- Colocar el preset que se creó en cloudinary para el proyecto en la constante `uploadPreset`

- En la función que recibe el atributo `onSubmit` del componente ` Formik` que se encuentra `Register.jsx`, se ejecuta la función que nos permite cargar una imagen. Dentro de esta función, se valida si se ha ejecutado con éxito la operación de carga de imagen, si se carga con éxito, se actualiza la propiedad `photo` dentro del objeto `values` (los datos que se recogen del formulario). De lo contrario, aparece un sweetalert con el mensaje del error. Antes de esto, se debe instalar la librería:

```Bash
npm install sweetalert2
```
## En `Register.jsx`
- Disparar la acción asíncrona que permite crear una nueva cuenta en Firebase Auth
- Accedemos al store o state para tomar los datos del slice `auth` y poder mostrar los errores o la información de sesión iniciada con éxito desde el componente `Register.jsx`

- Para mostrar los errores desde `Register.jsx`
	- Crear una acción en el slice `authSlice` para limpiar los errores en `authSlice.js`
```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";

export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async ({ email, password, name, photo }) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    return {
      id: userCredentials.user.uid,
      displayName: name,
      email: email,
      accessToken: userCredentials.user.accessToken,
      photoURL: photo,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError } = authSlice.actions;

```
	- Validamos si existe un error desde componente `Register.jsx`
	
```javascript
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import uploadFiles from "../../services/uploadFiles";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createAccountThunk } from "../../redux/auth/authSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
  photo: Yup.mixed()
    .test("fileSize", "El archivo no debe exceder los 2MB", (value) => {
      if (!value) return true; // Permitir que no se seleccione ningún archivo
      return value && value.size <= 2 * 1024 * 1024;
    })
    .required("Debes seleccionar una foto de perfil"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  if (error) {
        Swal.fire({
          title: "Oops!",
          text: "¡Ha ocurrido un error en la creación de tu cuenta!",
          icon: "error",
        }).then(()=>dispatch(clearError()))
  }

  if (isAuthenticated) {
    Swal.fire({
      title: `¡Excelente, ${user?.displayName}!`,
      text: "¡Has creado exitosamente tu cuenta!",
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main>
      <h1>Crear una cuenta</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          photo: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const profileImage = await uploadFiles(values.photo);
          if (profileImage) {
            values.photo = profileImage;
            dispatch(createAccountThunk(values));

          } else {
            Swal.fire({
              title: "Oops!",
              text: "¡Ha ocurrido un error en la carga de tu imagen de perfil! Intenta nuevamente.",
              icon: "error",
            });
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label htmlFor="name">Nombre completo</label>
            <Field name="name" id="name" placeholder="Whitney" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="email">Correo electrónico:</label>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="ejemplo@email.com"
            />
            <ErrorMessage name="email" />

            <label htmlFor="password">Contraseña:</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="xxxxxx"
            />
            <ErrorMessage name="password" />

            <label htmlFor="repeatPassword">Confirmar contraseña:</label>
            <Field
              name="repeatPassword"
              id="repeatPassword"
              type="password"
              placeholder="xxxxxx"
            />
            <ErrorMessage name="repeatPassword" />

            <label htmlFor="photo">Escoja una foto de perfil</label>
            <Field name="photo">
              {() => (
                <input
                  type="file"
                  id="photo"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="photo" />

            <button disabled={isSubmitting} type="submit">
              Crear cuenta
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Si ya tiene una cuenta, por favor dar click{" "}
        <Link to={"/login"}>aqui!</Link>
      </p>
    </main>
  );
};

export default Register;

```
