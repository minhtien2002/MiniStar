import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/",
    plugins: [react()],
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: parseInt(env.PORT),
      host: true,
      origin: "localhost:8080",
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),

    },
  }
})
