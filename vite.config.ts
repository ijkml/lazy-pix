import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
const resolvePath = (str: string) => resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      //* slow but merges all d.ts into one file
      // rollupTypes: true,
      //* fast alternative, creates an entry file according to package.json
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolvePath('./lib/index.ts'),
      name: 'LazyPix',
      formats: ['cjs', 'es'],
      fileName: (format) => {
        const extension = { es: 'mjs', cjs: 'cjs' };
        return `index.${extension[format]}`;
      },
    },
    copyPublicDir: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
