import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Зміна порту на 4000
  },
  base: '/node_fs98_front_Evgeniy-Popov-98',
});
