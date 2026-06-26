import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import TrustedBy from '@/components/trusted-by/TrustedBy';
import AIWorkflow from '@/components/workflow/AIWorkflow';
import FeatureGrid from '@/components/features/FeatureGrid';
import PricingSection from '@/components/pricing/PricingSection';
import Testimonials from '@/components/testimonials/Testimonials';
import FAQ from '@/components/faq/FAQ';
import CTA from '@/components/cta/CTA';
import Footer from '@/components/layout/Footer';
import { getOrganizationSchema, getSoftwareApplicationSchema } from '@/lib/schema';

/**
 * Landing Page — Component Composition
 *
 * Architecture:
 * - Navbar, Hero, TrustedBy, AIWorkflow, Testimonials, CTA, Footer
 *   are memo-wrapped and receive no changing props → never re-render.
 * - FeatureGrid manages its own activeIndex state internally.
 * - PricingSection manages its own currency/billing state internally.
 * - FAQ manages its own openIndex state internally.
 *
 * Changing pricing currency/billing will ONLY re-render PricingSection
 * and its children. No sibling component will re-render.
 */
export default function Home() {
  const orgSchema = getOrganizationSchema();
  const appSchema = getSoftwareApplicationSchema();

  return (
    <>
      {/* JSON-LD Structured Data — per Next.js docs, placed in page component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appSchema).replace(/</g, '\\u003c'),
        }}
      />

      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <AIWorkflow />
        <FeatureGrid />
        <PricingSection />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
