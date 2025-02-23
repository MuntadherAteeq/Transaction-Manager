import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Transaction Manager",
    short_name: "TM",
    description: "",
    theme_color: "#5e5e5e",
    background_color: "#5c5c5c",
    display: "standalone",
    orientation: "any",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "icons/icon_72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon_96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon_128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon_144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon_152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/maskable_72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/maskable_96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/maskable_128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/maskable_144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/maskable_152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/maskable_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
