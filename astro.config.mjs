import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Used to build absolute URLs for social-preview (Open Graph) tags
  site: 'https://portfolio-aungchooos-projects.vercel.app',
  server: {
    host: true,
    port: 4321
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
