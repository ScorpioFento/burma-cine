import FeaturedCarousel3D from "../components/FeaturedCarousels";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <FeaturedCarousel3D />
      </main>
      <Footer />
    </>
  );
}
