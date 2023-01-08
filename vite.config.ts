import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

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
      entry: resolve(__dirname, './lib/index.ts'),
      name: 'LazyPix',
      formats: ['cjs', 'es'],
      fileName: (format) => {
        return `index.${{ es: 'mjs', cjs: 'cjs' }[format]}`;
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
