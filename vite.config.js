import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works when uploaded into any folder
// on shared hosting (e.g. public_html/ or a sub-directory).
export default defineConfig({
  plugins: [react()],
  base: './',
})
