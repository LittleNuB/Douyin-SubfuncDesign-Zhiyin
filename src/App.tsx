import { ProductIntroSite } from "./components/ProductIntroSite";
import { ZhiyinDemoExperience } from "./components/ZhiyinDemoExperience";

export default function App() {
  const isIntroRoute = window.location.pathname === "/intro";

  if (isIntroRoute) {
    return <ProductIntroSite />;
  }

  return (
    <main className="app-shell">
      <ZhiyinDemoExperience />
    </main>
  );
}
