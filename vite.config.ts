// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// ----------------------------------------------------------------------
// IMPORTACIÓN CLAVE: Usamos 'vitest/config' para extender el tipado de Vite
// Esto hace que TypeScript reconozca la propiedad 'test'.
// ----------------------------------------------------------------------
import { configDefaults, defineConfig as defineVitestConfig } from 'vitest/config';

// Combina la configuración de Vite y Vitest en una sola función
export default defineConfig({
  plugins: [react()],
  
  // ==========================================================
  // CONFIGURACIÓN DE VITEST (AÑADIDA)
  // ==========================================================
  test: {
    // 1. Globals: Activa describe, test, expect, vi globalmente
    globals: true,
    
    // 2. Environment: Simula el navegador para renderizar React
    environment: 'jsdom',
    
    // 3. Setup: Carga el archivo de utilidades (@testing-library/jest-dom)
    setupFiles: './setupTests.js',
    
    // 4. Include: Especifica dónde buscar los archivos de prueba
    include: ['src/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], 
    
    // 5. Opcional: Excluye archivos comunes que no son tests
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
  // ==========================================================
});