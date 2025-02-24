import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      exclude: [
        'src/**/*.stories.tsx',
        'src/pages/**/*.tsx', // This will be tested with E2E tests
        'src/main.tsx',
        'src/pages/index/index.tsx',
      ],
      include: ['src/**/*.tsx'],
      reporter: ['text', 'lcov'],
    },
  },
});
