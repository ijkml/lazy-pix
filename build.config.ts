import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    // 'src/index',
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist/',
    },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
