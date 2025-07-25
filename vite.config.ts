import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [checker({ typescript: true }), tailwindcss()],
});