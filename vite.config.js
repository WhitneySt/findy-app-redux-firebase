import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cors from "cors";

export default defineConfig({
  plugins: [react()],
  base: "https://whitneyst.github.io/findy-app-redux-firebase/",
  define: {
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.apify.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("Origin", "http://localhost:5173");
          });
        },
      },
    },
    middleware: [
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
        optionsSuccessStatus: 204,
      }),
    ],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import cors from "cors";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "https://whitneyst.github.io/findy-app-redux-firebase",
//   define: {
//     "process.env": {},
//     global: {},
//   },
//   resolve: {
//     alias: {
//       process: "process/browser",
//       util: "util",
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: "globalThis",
//       },
//     },
//   },
//   // define: {
//   //   "process.env": {},
//   //   global: {},
//   // },
//   // resolve: {
//   //   alias: {
//   //     process: "process/browser",
//   //     util: "util",
//   //   },
//   // },
//   // optimizeDeps: {
//   //   esbuildOptions: {
//   //     define: {
//   //       global: "globalThis",
//   //     },
//   //   },
//   // },
//   // resolve: {
//   //   alias: {
//   //     process: "process/browser",
//   //     util: "util",
//   //   },
//   // },
//   // define: {
//   //   "process.env": {},
//   //   global: {},
//   // },
//   // server: {
//   //   proxy: {
//   //     "/api": {
//   //       target: "https://api.apify.com",
//   //       changeOrigin: true,
//   //       rewrite: (path) => path.replace(/^\/api/, ""),
//   //       configure: (proxy, options) => {
//   //         proxy.on("proxyReq", (proxyReq, req, res) => {
//   //           proxyReq.setHeader("Origin", "http://localhost:5173");
//   //         });
//   //       },
//   //     },
//   //   },
//   //   middleware: [
//   //     cors({
//   //       origin: "*",
//   //       methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   //       allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   //       credentials: true,
//   //       optionsSuccessStatus: 204,
//   //     }),
//   //   ],
//   // },
// });
