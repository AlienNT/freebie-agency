import {defineConfig} from "vite";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import * as path from "path";

export default defineConfig(({command}) => {
    const base = command === 'build' ? '/freebie-agency' : '/'

    return {
        plugins: [postcss()],
        css: {
            postcss: {
                plugins: [autoprefixer]
            }
        },
        assetsInclude: ['images/*.webp', 'images/*.png'],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~@": path.resolve(__dirname, "/src"),
            },
        },
        base
    }
})