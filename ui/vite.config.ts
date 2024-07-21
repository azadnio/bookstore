import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;
process.env = { ...process.env, ...env };

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_isDev ? 'http://localhost:8000' : 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
