import { defineConfig } from 'astro/config';

// https://astro.build/config
import vue from "@astrojs/vue";
import AutoImport from 'unplugin-auto-import/astro';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), AutoImport({
    /* options */
    imports: ['vue']
  }), tailwind()],
  output: "server",
  adapter: cloudflare()
});