// import { defineConfig } from 'vite';

export default{
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
};
