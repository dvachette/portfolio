import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function sitemapPlugin() {
    return {
        name: 'generate-sitemap',
        closeBundle() {
            const date = new Date().toISOString().split('T')[0]
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://dvachette.fr/</loc>
        <lastmod>${date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`
            writeFileSync('dist/sitemap.xml', sitemap)
        }
    }
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), sitemapPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 5174,
    },
})
