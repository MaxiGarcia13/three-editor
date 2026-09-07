import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],

    environments: {
      client: {
        optimizeDeps: {
          noDiscovery: true,
          include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            '@react-three/fiber',
            '@react-three/drei',
            'three',
          ],
          rolldownOptions: {
            treeshake: false,
          },
        },
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'three'],
    },
  },
});
