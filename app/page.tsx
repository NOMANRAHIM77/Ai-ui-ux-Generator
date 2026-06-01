// app/page.tsx

import Hero from "./_shared/Hero";
import Header from "./_shared/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f5fb]">
      <Header />
      <Hero />
    </main>
  );
}