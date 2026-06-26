import type { Feature } from '@/types';

export const FEATURES: readonly Feature[] = [
  {
    id: 'smart-automation',
    title: 'Smart Automation',
    description:
      'Build intelligent data pipelines that adapt in real-time. Our AI engine detects patterns, optimizes workflows, and self-heals when errors occur.',
    icon: 'automation',
    gradient: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
    span: 'wide',
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description:
      'Transform raw data into actionable forecasts. Machine learning models trained on your data deliver predictions with enterprise-grade accuracy.',
    icon: 'analytics',
    gradient: 'linear-gradient(135deg, #114C5A 0%, #172B36 100%)',
    isDarkTheme: true,
    span: 'default',
  },
  {
    id: 'universal-integration',
    title: 'Universal Integration',
    description:
      'Connect to 200+ data sources in seconds. REST APIs, databases, cloud storage, and legacy systems — all unified under one platform.',
    icon: 'integration',
    gradient: 'linear-gradient(135deg, #D9E8E2 0%, #F1F6F4 100%)',
    span: 'default',
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II certified. End-to-end encryption, role-based access control, and audit logging keep your data protected at every layer.',
    icon: 'security',
    gradient: 'linear-gradient(135deg, #172B36 0%, #114C5A 100%)',
    isDarkTheme: true,
    span: 'default',
  },
  {
    id: 'lightning-speed',
    title: 'Lightning Speed',
    description:
      'Process millions of records in seconds. Our distributed architecture scales horizontally to handle any workload without bottlenecks.',
    icon: 'speed',
    gradient: 'linear-gradient(135deg, #FF9932 0%, #FFC801 100%)',
    span: 'default',
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description:
      'Shared workspaces, version control, and real-time co-editing. Your entire team can build, test, and deploy data pipelines together.',
    icon: 'collaboration',
    gradient: 'linear-gradient(135deg, #114C5A 0%, #D9E8E2 100%)',
    isDarkTheme: true,
    span: 'wide',
  },
] as const;
