import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Идеальный Дом — стеклянные конструкции", short_name: "Идеальный Дом", description: "Проектирование, изготовление и монтаж изделий из стекла.", start_url: "/", display: "standalone", background_color: "#f4f1ea", theme_color: "#122027", lang: "ru" };
}
