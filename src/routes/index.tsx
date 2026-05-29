import { createFileRoute } from "@tanstack/react-router";
import { JackPortfolio } from "@/components/JackPortfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jack -- 3D Creator" },
      { name: "description", content: "Jack's portfolio landing page - 3D Creator driven by crafting striking and unforgettable projects" },
      { property: "og:title", content: "Jack -- 3D Creator" },
      { property: "og:description", content: "Jack's portfolio landing page - 3D Creator" },
    ],
  }),
  component: Index,
});

function Index() {
  return <JackPortfolio />;
}
