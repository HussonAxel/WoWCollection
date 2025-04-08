import { createFileRoute } from "@tanstack/react-router";
import HomePageBlizzard from "@/components/getBlizzardRealm";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <HomePageBlizzard />
  );
}
