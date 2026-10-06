import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Engine from "@/components/sections/Engine";
import ProductTabs from "@/components/sections/ProductTabs";
import Stories from "@/components/sections/Stories";
import Bridge from "@/components/sections/Bridge";
import Modules from "@/components/sections/Modules";
import Industries from "@/components/sections/Industries";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Engine />
        <ProductTabs />
        <Stories />
        <Bridge
          title={
            <>
              Make the right part, for the right order, at the right time
            </>
          }
        />
        <Modules />
        <Industries />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
