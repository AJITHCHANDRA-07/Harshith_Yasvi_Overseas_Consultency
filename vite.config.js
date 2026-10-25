import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import net from 'net'

// Function to find an unused dynamic port from the OS
function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
  })
}

export default defineConfig(async () => {
  const dynamicPort = await getFreePort()
  return {
    plugins: [react()],
    server: {
      port: dynamicPort,
      strictPort: false,
      host: true,
      open: true
    },
    preview: {
      port: dynamicPort,
      strictPort: false,
      host: true,
      open: true
    }
  }
})
