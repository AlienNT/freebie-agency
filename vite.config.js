import {defineConfig} from "vite";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
    plugins:[postcss()],
    css: {
        postcss: {
            plugins: [autoprefixer]
        }
    }
})