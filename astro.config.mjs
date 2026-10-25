// @ts-check
import { defineConfig, fontProviders } from "astro/config";

const JETBRAINS_MONO = "./src/assets/fonts/jetbrains_mono";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "horizon",
      },
    },
  },
  image: {
    // Generate srcset/sizes for images, including the ones in Markdown posts
    layout: "constrained",
    responsiveStyles: true,
  },
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
          { src: [`${JETBRAINS_MONO}/JetBrainsMono-Regular.ttf`], weight: "400", style: "normal" },
          { src: [`${JETBRAINS_MONO}/JetBrainsMono-Bold.ttf`], weight: "700", style: "normal" },
          { src: [`${JETBRAINS_MONO}/JetBrainsMono-Italic.ttf`], weight: "400", style: "italic" },
          { src: [`${JETBRAINS_MONO}/JetBrainsMono-BoldItalic.ttf`], weight: "700", style: "italic" },
        ],
      },
    },
  ],
});
