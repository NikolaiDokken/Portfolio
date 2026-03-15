// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/posts": "/tags",
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      options: {
        variants: [
          { src: ['./public/fonts/jetbrains_mono/JetBrainsMono-Regular.ttf'], weight: '400', style: 'normal' },
          { src: ['./public/fonts/jetbrains_mono/JetBrainsMono-Bold.ttf'], weight: '700', style: 'normal' },
          { src: ['./public/fonts/jetbrains_mono/JetBrainsMono-Italic.ttf'], weight: '400', style: 'italic' },
          { src: ['./public/fonts/jetbrains_mono/JetBrainsMono-BoldItalic.ttf'], weight: '700', style: 'italic' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
      options: {
        variants: [
          { src: ['./public/fonts/space_mono/SpaceMono-Regular.ttf'], weight: '400', style: 'normal' },
          { src: ['./public/fonts/space_mono/SpaceMono-Bold.ttf'], weight: '700', style: 'normal' },
          { src: ['./public/fonts/space_mono/SpaceMono-Italic.ttf'], weight: '400', style: 'italic' },
          { src: ['./public/fonts/space_mono/SpaceMono-BoldItalic.ttf'], weight: '700', style: 'italic' },
        ],
      },
    },
  ],
});
