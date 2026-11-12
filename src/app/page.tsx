import { Loader } from "@/components/site/loader";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Story } from "@/components/site/story";
import { Villas } from "@/components/site/villas";
import { Rooms } from "@/components/site/rooms";
import { Pack } from "@/components/site/pack";
import { Experiences } from "@/components/site/experiences";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BookingWizard } from "@/components/site/booking-wizard";
import { BookingsDrawer } from "@/components/site/bookings-drawer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <p className="demo-banner" role="note">Public demo · sample resort details · bookings and newsletter sign-ups are not sent or saved.</p>
        <Hero />
        <Marquee />
        <Story />
        <Villas />
        <Rooms />
        <Pack />
        <Experiences />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BookingWizard />
      <BookingsDrawer />
    </>
  );
}
