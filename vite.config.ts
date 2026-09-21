import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import passkeyHandler from './api/passkey.ts';

function passkeyApiPlugin(): Plugin {
  return {
    name: 'vite-plugin-passkey-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/passkey')) {
          passkeyHandler(req, res);
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), passkeyApiPlugin()],
});
