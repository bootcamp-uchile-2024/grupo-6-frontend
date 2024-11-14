import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/categories-back": {
        target: "http://localhost:4000/categories", //http://127.0.0.1:4000/categories
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/categories-back', ""),
      },
      "/products-back": {
        target: "http://localhost:4000/products/catalog",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/products-back', ""),
      },
      "/productdetail-back": {
        target: "http://localhost:4000/products/search/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/productdetail-back', ""),
      },
      "/products-create-back": {
        target: "http://localhost:4000/products",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/products-create-back', ""),
      },
      "/create-user-back": {
        target: "http://localhost:4000/users",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/create-user-back', ""),
      },
      "/products-put": {
        target: "http://localhost:4000/products",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/products-put', ""),
      },
      "/products-delete": {
        target: "http://localhost:4000/products",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/products-delete', ""),
      },
    },
  },
  plugins: [react()],
})