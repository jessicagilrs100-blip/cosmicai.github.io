import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    allowedHosts: ['5173-irxmwqoio83ruul6rzrl4-4f9e9250.us2.manus.computer']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
