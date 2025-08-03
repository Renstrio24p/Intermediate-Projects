import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
    const isClientBuild = command === 'build' && mode !== 'ssr'

    return {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        build: isClientBuild
            ? {
                outDir: 'dist/client',
                rollupOptions: {
                    output: {
                        manualChunks(id) {
                            if (id.includes('node_modules')) {
                                const segments = id.split('node_modules/')[1].split('/')
                                const pkgName = segments[0].startsWith('@')
                                    ? `${segments[0]}/${segments[1]}`
                                    : segments[0]
                                return `vendor-${pkgName}`
                            }
                        },
                    },
                },
            }
            : {
                ssr: true,
                outDir: 'dist/server',
            },
    }
})
