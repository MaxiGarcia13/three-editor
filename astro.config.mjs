import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],

    resolve: {
      dedupe: ['react', 'react-dom', 'three'],
      alias: {
        // jszip's browser field maps "./lib/index" to the UMD dist build, which
        // exposes no ESM default. Point at the CJS entry so bundlers interop it.
        jszip: fileURLToPath(new URL('./node_modules/jszip/lib/index.js', import.meta.url)),
      },
    },

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
            'jszip',
          ],
          rolldownOptions: {
            treeshake: false,
          },
        },
      },
    },
  },

  adapter: vercel(),
});
