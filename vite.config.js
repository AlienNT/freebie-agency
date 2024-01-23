import {defineConfig} from "vite";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({command}) => {
    const base = command === 'build' ? '/freebie-agency' : '/'

    return {
        plugins: [postcss()],
        css: {
            postcss: {
                plugins: [autoprefixer]
            }
        },
        base
    }
})