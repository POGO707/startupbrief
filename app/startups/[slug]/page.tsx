import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function StartupsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <Header />
      <main id="main-content" style={{ minHeight: "60vh", padding: "80px 0", textAlign: "center" }}>
        <h1>Startups - {slug}</h1>
        <p>This dynamic page is under construction.</p>
      </main>
      <Footer />
    </>
  );
}
