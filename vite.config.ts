import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    build: {
        ssr: 'src/entry-server.ts',
        outDir: 'dist/server'
    },
    plugins: [tailwindcss(), checker({ typescript: true })],
})
