import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		host: 'localhost',
		port: 3000,
	},
	hmr: { clientPort: 3000 },
	root: 'src',
	build: {
		outDir: '../dist',
		rollupOptions: {
			output: {
				assetFileNames: (file) => {
					console.log('files', import.meta.url, file.name);
					if (file.name == 'index.css') {
						return `assets/[ext]/styles.[ext]`;
					} else {
						return `assets/[ext]/[name].[ext]`;
					}
				},
				chunkFileNames: 'assets/[chunks]/[name].[hash].js',
				entryFileNames: 'assets/js/app.js',
			},
		},
	},
});
