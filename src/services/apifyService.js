import { ApifyClient } from "apify-client";

console.log("ApifyClient:", ApifyClient);
const client = new ApifyClient({
  token: import.meta.env.VITE_APIFY_API_TOKEN,
});
console.log("client:", client);

export const scrapeInstagramProfile = async (username) => {
  try {
    console.log("Starting scrape for username:", username);

    const input = {
      directUrls: [`https://www.instagram.com/${username}/`],
      resultsType: "details",
      resultsLimit: 1,
      searchType: "user",
      searchLimit: 1,
    };

    // Ejecutar el Actor y esperar a que termine
    const run = await client.actor("apify/instagram-scraper").call(input);

    // Obtener los resultados del dataset del Actor
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (items.length > 0) {
        console.log("Profile data retrieved successfully");
        console.log(items);
      return items[0]; // Devolver solo el primer item, que debería ser el perfil
    } else {
      throw new Error("No data found for the given profile");
    }
  } catch (error) {
    console.error("Error scraping Instagram profile:", error);
    throw error;
  }
};

// import { ApifyClient } from "apify-client";

// const client = new ApifyClient({
//   token: import.meta.env.VITE_APIFY_API_TOKEN,
// });

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     console.log("Starting scrape for username:", username);

//     const input = {
//       directUrls: [`https://www.instagram.com/${username}/`],
//       resultsType: "details",
//       resultsLimit: 1,
//       searchType: "user",
//       searchLimit: 1,
//     };

//     // Ejecutar el Actor y esperar a que termine
//     const run = await client.actor("apify/instagram-scraper").call(input);

//     // Obtener los resultados del dataset del Actor
//     const { items } = await client.dataset(run.defaultDatasetId).listItems();

//     if (items.length > 0) {
//       console.log("Profile data retrieved successfully");
//       console.log(items);
//       return items[0]; // Devolver solo el primer item, que debería ser el perfil
//     } else {
//       throw new Error("No data found for the given profile");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };

// import axios from "axios";

// const APIFY_API_URL = "/api/v2";
// const ACTOR_TASK_ID = "I4xMjNDKL3bclfuOu";

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     console.log("Starting scrape for username:", username);

//     // Iniciar una nueva ejecución de la tarea
//     const response = await axios.post(
//       `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`,
//       {
//         input: {
//           addParentData: false,
//           directUrls: [`https://www.instagram.com/${username}/`],
//           enhanceUserSearchWithFacebookPage: false,
//           isUserReelFeedURL: false,
//           isUserTaggedFeedURL: false,
//           resultsLimit: 1,
//           resultsType: "details",
//           searchLimit: 1,
//           searchType: "user",
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//         },
//       }
//     );

//     console.log("Response from run start:", response.data);

//     const runId = response.data.data.id;
//     let runStatus = "READY";
//     let maxAttempts = 60; // 5 minutos máximo de espera (60 * 5 segundos)
//     let attempts = 0;

//     // Esperar a que la tarea termine
//     while (
//       runStatus !== "SUCCEEDED" &&
//       runStatus !== "FAILED" &&
//       attempts < maxAttempts
//     ) {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos

//       const statusResponse = await axios.get(
//         `${APIFY_API_URL}/actor-runs/${runId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//         }
//       );

//       runStatus = statusResponse.data.data.status;
//       console.log("Current status:", runStatus);
//       attempts++;
//     }

//     if (runStatus === "SUCCEEDED") {
//       // Obtener los resultados de la ejecución
//       const datasetId = response.data.data.defaultDatasetId;
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${datasetId}/items`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//           params: {
//             limit: 1, // Obtener solo el primer resultado
//           },
//         }
//       );

//       if (datasetResponse.data.length > 0) {
//         console.log(datasetResponse.data);
//         return datasetResponse.data[0]; // Devolver el primer item, que debería ser el perfil
//       } else {
//         throw new Error("No data found for the given profile");
//       }
//     } else if (runStatus === "FAILED") {
//       throw new Error("Apify run failed");
//     } else {
//       throw new Error("Apify run timed out");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     console.log("Starting scrape for username:", username);

//     const response = await axios.post(
//       `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`,
//       {
//         input: {
//           addParentData: false,
//           directUrls: [`https://www.instagram.com/${username}/`],
//           enhanceUserSearchWithFacebookPage: false,
//           isUserReelFeedURL: false,
//           isUserTaggedFeedURL: false,
//           resultsLimit: 1,
//           resultsType: "details",
//           searchLimit: 1,
//           searchType: "user",
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//         },
//       }
//     );

//     console.log("Response from run start:", response.data);

//     const runId = response.data.data.id;
//     let runStatus = "READY";

//     while (runStatus !== "SUCCEEDED" && runStatus !== "FAILED") {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos

//       const statusResponse = await axios.get(
//         `${APIFY_API_URL}/actor-runs/${runId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//         }
//       );

//       runStatus = statusResponse.data.data.status;
//       console.log("Current status:", runStatus);
//     }

//     if (runStatus === "SUCCEEDED") {
//       const datasetId = response.data.data.defaultDatasetId;
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${datasetId}/items`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//         }
//       );
//       return datasetResponse.data[0]; // Devuelve solo el primer item, que es el perfil
//     } else {
//       throw new Error("Apify run failed");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     console.log("Starting scrape for username:", username);

//     const response = await axios.post(
//       `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`,
//       {
//         input: {
//           username: username,
//           resultsType: "details",
//           resultsLimit: 1,
//           extendOutputFunction: `({ data, item, itemSpec, page, customData }) => {
//             return {
//               username: item.username,
//               fullName: item.fullName,
//               biography: item.biography,
//               profilePicUrl: item.profilePicUrl,
//               postsCount: item.postsCount,
//               followersCount: item.followersCount,
//               followsCount: item.followsCount
//             }
//           }`,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//         },
//       }
//     );

//     console.log("Response from run start:", response.data);

//     const runId = response.data.data.id;
//     let runStatus = "READY";

//     while (runStatus !== "SUCCEEDED" && runStatus !== "FAILED") {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos

//       const statusResponse = await axios.get(
//         `${APIFY_API_URL}/actor-runs/${runId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//         }
//       );

//       runStatus = statusResponse.data.data.status;
//       console.log("Current status:", runStatus);
//     }

//     if (runStatus === "SUCCEEDED") {
//       const datasetId = response.data.data.defaultDatasetId;
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${datasetId}/items`,
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//           },
//         }
//       );
//       console.log(datasetResponse.data[0]);
//       return datasetResponse.data[0]; // Devuelve solo el primer item, que es el perfil
//     } else {
//       throw new Error("Apify run failed");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     console.log("Starting scrape for username:", username);
//     console.log(
//       "API URL:",
//       `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`
//     );

//     const response = await axios.post(
//       `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`,
//       {
//         input: {
//           username: username,
//           resultsType: "details",
//           resultsLimit: 1,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_APIFY_API_TOKEN}`,
//         },
//       }
//     );

//     console.log("Response from run start:", response.data);

//     const runId = response.data.data.id;
//     let runStatus;
//     let waitTime = 1000;
//     const maxWaitTime = 60000;
//     let statusResponse;

//     // Esperar a que la tarea termine
//     do {
//       await new Promise((resolve) => setTimeout(resolve, waitTime));
//       statusResponse = await axios.get(`${APIFY_API_URL}/actor-runs/${runId}`, {
//         params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//       });
//       runStatus = statusResponse.data.data.status;
//       waitTime = Math.min(waitTime * 2, maxWaitTime);
//     } while (runStatus !== "SUCCEEDED" && runStatus !== "FAILED");

//     if (runStatus === "SUCCEEDED") {
//       // Obtener los resultados
//       const datasetId = statusResponse.data.data.defaultDatasetId;
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${datasetId}/items`,
//         {
//           params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//         }
//       );

//       console.log("Starting scrape for username:", username);
//       console.log(
//         "API URL:",
//         `${APIFY_API_URL}/actor-tasks/${ACTOR_TASK_ID}/runs`
//       );
//       console.log("Response from run start:", response.data);
//       console.log("Run ID:", runId);
//       console.log("Final status:", runStatus);

//       return datasetResponse.data[0];
//     } else {
//       throw new Error("Apify run failed");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     if (error.response) {
//       console.error("Data:", error.response.data);
//       console.error("Status:", error.response.status);
//       console.error("Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("Request:", error.request);
//     } else {
//       console.error("Error message:", error.message);
//     }
//     throw error;
//   }
// };

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     const response = await axios.post(
//       `${APIFY_API_URL}/acts/${ACTOR_ID}/runs`,
//       {
//         token: import.meta.env.VITE_APIFY_API_TOKEN,
//         json: {
//           search: username,
//           searchType: "user",
//           resultsType: "details",
//           resultsLimit: 1,
//         },
//       }
//     );

//     const runId = response.data.id;
//     let runStatus;
//     let waitTime = 1000; // Start with 1 second
//     const maxWaitTime = 60000; // Max wait of 1 minute

//     do {
//       await new Promise((resolve) => setTimeout(resolve, waitTime));
//       const statusResponse = await axios.get(
//         `${APIFY_API_URL}/acts/${ACTOR_ID}/runs/${runId}`,
//         {
//           params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//         }
//       );
//       runStatus = statusResponse.data.status;

//       // Increase wait time, but don't exceed maxWaitTime
//       waitTime = Math.min(waitTime * 2, maxWaitTime);
//     } while (runStatus !== "SUCCEEDED" && runStatus !== "FAILED");

//     if (runStatus === "SUCCEEDED") {
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${response.data.defaultDatasetId}/items`,
//         {
//           params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//         }
//         );
//         console.log(datasetResponse);
//       return datasetResponse.data[0];
//     } else {
//       throw new Error("Apify run failed");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };

// export const scrapeInstagramProfile = async (username) => {
//   try {
//     const response = await axios.post(
//       `${APIFY_API_URL}/acts/${ACTOR_ID}/runs`,
//       {
//         token: import.meta.env.VITE_APIFY_API_TOKEN,
//         json: {
//           search: username,
//           searchType: "user",
//           resultsType: "details",
//           resultsLimit: 1,
//         },
//       }
//     );

//     const runId = response.data.id;
//     let runStatus;

//     do {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
//       const statusResponse = await axios.get(
//         `${APIFY_API_URL}/acts/${ACTOR_ID}/runs/${runId}`,
//         {
//           params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//         }
//       );
//       runStatus = statusResponse.data.status;
//     } while (runStatus !== "SUCCEEDED" && runStatus !== "FAILED");

//     if (runStatus === "SUCCEEDED") {
//       const datasetResponse = await axios.get(
//         `${APIFY_API_URL}/datasets/${response.data.defaultDatasetId}/items`,
//         {
//           params: { token: import.meta.env.VITE_APIFY_API_TOKEN },
//         }
//       );
//       return datasetResponse.data[0];
//     } else {
//       throw new Error("Apify run failed");
//     }
//   } catch (error) {
//     console.error("Error scraping Instagram profile:", error);
//     throw error;
//   }
// };
