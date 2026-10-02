import About from "@/components/About";
import Animations from "@/components/Animations";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import { portfolio } from "@/lib/data";

export default function Home() {
  const p = portfolio;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.personal.name,
    jobTitle: p.personal.role,
    email: p.personal.email ? `mailto:${p.personal.email}` : undefined,
    address: p.personal.location,
    alumniOf: p.education.map((e) => e.institution),
    knowsAbout: p.skills.categories.flatMap((c) => c.items),
    sameAs: p.social.filter((s) => s.url.startsWith("http")).map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only z-[100] rounded bg-ink px-4 py-2 font-bold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {p.site.skipLinkLabel}
      </a>
      <Navbar
        items={p.navigation}
        extras={p.navigationExtras}
        brand={p.personal.initials}
        name={p.personal.name}
      />
      <main id="main" className="relative z-[1]">
        <Hero hero={p.hero} personal={p.personal} social={p.social} />
        <About meta={p.sections.about} about={p.about} />
        <Skills meta={p.sections.skills} categories={p.skills.categories} />
        <Projects meta={p.sections.projects} projects={p.projects} />
        <Research meta={p.sections.research} items={p.research} interests={p.researchInterests} />
        <Experience meta={p.sections.experience} items={p.experience} />
        <Education meta={p.sections.education} items={p.education} />
        <Certifications
          meta={p.sections.certifications}
          certifications={p.certifications}
          achievements={p.achievements}
        />
        <Contact meta={p.sections.contact} contact={p.contact} personal={p.personal} social={p.social} />
      </main>
      <Footer footer={p.footer} personal={p.personal} social={p.social} backToTop={p.site.backToTopLabel} />
      <Cursor />
      <Animations />
    </>
  );
}
