import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePluginFonts({
    custom: {
      families: [{
        name: 'GalanoGrotesque',
        local: 'GalanoGrotesque',
        src: 'src/assets/fonts/galano-grotesque/*.otf',
      },
      {
        name: 'ClashDisplay',
        local: 'ClashDisplay',
        src: 'src/assets/fonts/ClashDisplay/*.*',
      }
    ],
    },
  }),
  ],
})
