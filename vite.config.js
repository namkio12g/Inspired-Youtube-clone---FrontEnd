import {
  defineConfig,
  loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({
  mode
}) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd());

  console.log('VITE_API_URL:', env.VITE_API_URL); // Debugging log

  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || "http://localhost:2500", // Fallback if not defined
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          logLevel: 'debug',
        },
      },
    },
    plugins: [react()],
  };
});
