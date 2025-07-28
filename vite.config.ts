import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // react(), -> disable/remove this as it also exists or called in reactRouter()
    tailwindcss(),
    reactRouter()
  ],
})
