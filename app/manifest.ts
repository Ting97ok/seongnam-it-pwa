import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "성남 IT 정보 교류 스터디",
    short_name: "성남IT",
    description: "성남 IT 정보 교류 스터디 PWA 애플리케이션",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    dir: "auto",
    lang: "ko-KR",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon-precomposed.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "/apple-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon-192.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon512_maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}