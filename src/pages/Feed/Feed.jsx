import axios from "axios";
import { useEffect, useState } from "react";


const Feed = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const exchangeCodeForToken = async () => {
    const TU_APP_ID = "907662524513353";
    const TU_APP_SECRET = "b6dfa4c8054c10e157f16df777b5cbcb";
    const TU_REDIRECT_URI = "https://whitneyst.github.io/findy-app-redux-firebase/"
    const code = 'AQDFdIrTpnq85HxkridsHNz8MU20y_3uFlXpdyWFQNz0CudZAl6Ej6xZ6OsByOH_mJ1VSGRuX1HIihO7QBdZv0rnIEtsfZpTuZDqugPa2YpWVwiorxclCx27sjTcp2tAfqUpSUm1G-hQl4UX_4WXxP7L3iQkRQ0nQrEVhXq-HYhZkSCYcR7hGZgtK5jh4rZ2JVgl67H2DtbnykA0ysvVce7aM3S1JRpuwJSz6I8YcCw_aQ#_'
      const formData = new FormData();
      formData.append("client_id", TU_APP_ID);
      formData.append("client_secret", TU_APP_SECRET);
      formData.append("grant_type", "authorization_code");
      formData.append("redirect_uri", TU_REDIRECT_URI);
      formData.append("code", code);

      try {
        const response = await axios.post(
          "https://api.instagram.com/oauth/access_token",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAccessToken(response.data.access_token);
      } catch (err) {
        setError("Error al obtener el token de acceso");
        console.error("Error:", err);
      }
    };

    const handleAuthentication = () => {
      // Esta URL debería ser construida con tus parámetros reales
      const authUrl = `https://api.instagram.com/oauth/authorize?client_id=TU_APP_ID&redirect_uri=TU_REDIRECT_URI&scope=user_profile,user_media&response_type=code`;

      // Abre una nueva ventana para la autenticación
      window.open(authUrl, "_blank");
    };

  //   // Esta función debería ser llamada cuando se recibe el código de autorización
  //   const handleRedirect = (code) => {
  //     exchangeCodeForToken(code);
  // };

  useEffect(() => {
    exchangeCodeForToken()
  },[])
  
  return (
    <div className="p-4">
      <button
        onClick={handleAuthentication}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Autenticar con Instagram
      </button>
      {accessToken && (
        <p className="mt-4">Token de acceso obtenido: {accessToken}</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default Feed