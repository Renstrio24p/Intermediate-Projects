// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'dist/client',
        manifest: true,
        ssrManifest: true,
        rollupOptions: {
            input: '/src/entry-client.ts',
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const parts = id.split('node_modules/')[1].split('/')
                        const pkg = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]
                        return `vendor-${pkg}`
                    }
                },
            },
        },
    },
    ssr: {
        noExternal: true,
    },
})
