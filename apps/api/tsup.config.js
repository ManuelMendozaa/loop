import { defineConfig } from 'tsup';

module.exports = defineConfig({
  entry: ['src/**/*.ts'],
  format: ['cjs'],
  target: 'node22',
  platform: 'node',
  outDir: 'dist',
  sourcemap: true,
  clean: true,
  dts: false,
  splitting: true,
  shims: true,
  bundle: false,
});
