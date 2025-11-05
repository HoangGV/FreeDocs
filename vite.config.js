import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true,
    allowedHosts: [
      '3638cc29-d1a1-4ff4-b5de-254526e9a771-00-391pdm4cz87wk.pike.replit.dev'
    ],
  },
});
