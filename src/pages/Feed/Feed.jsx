import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/instagram/auth",
        { code }
      );
      setAccessToken(response.data.access_token);
    } catch (err) {
      setError("Error al obtener el token de acceso");
      console.error("Error:", err);
    }
  };

  const handleAuthentication = () => {
    const TU_APP_ID = "907662524513353";
    const TU_REDIRECT_URI =
      "https://whitneyst.github.io/findy-app-redux-firebase/";
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${TU_APP_ID}&redirect_uri=${TU_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

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
};

export default Feed;
