/* ============================================================
 * JSON-LD Structured Data — Organization Schema
 * ============================================================ */

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DataFlow AI',
    url: 'https://dataflow.ai',
    logo: 'https://dataflow.ai/logo.svg',
    description:
      'AI-powered data automation platform. Transform, clean, and analyze data at scale with enterprise-grade reliability.',
    sameAs: [
      'https://twitter.com/dataflowai',
      'https://linkedin.com/company/dataflowai',
      'https://github.com/dataflowai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@dataflow.ai',
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DataFlow AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '29',
      highPrice: '199',
      priceCurrency: 'USD',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847',
    },
  };
}
