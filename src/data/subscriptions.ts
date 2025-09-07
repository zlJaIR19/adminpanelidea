import { Subscription, SubscriptionPlan, Invoice, SubscriptionMetrics, UsageAlert } from '@/types/subscriptions';

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    description: 'Perfect for small HVAC businesses getting started',
    features: [
      'Up to 10 users',
      'Up to 5 projects',
      '20GB storage',
      'Basic support',
      'Mobile app access',
      'Basic reporting'
    ],
    pricing: {
      monthly: 49,
      quarterly: 132, // 10% discount
      yearly: 470 // 20% discount
    },
    maxUsers: 10,
    maxProjects: 5,
    storageGB: 20,
    supportLevel: 'basic' as const
  },
  {
    id: 'plan-professional',
    name: 'Professional',
    description: 'Ideal for growing HVAC companies',
    features: [
      'Up to 50 users',
      'Up to 25 projects',
      '100GB storage',
      'Priority support',
      'Advanced reporting',
      'API access',
      'Custom fields',
      'Team collaboration tools'
    ],
    pricing: {
      monthly: 149,
      quarterly: 402, // 10% discount
      yearly: 1432 // 20% discount
    },
    maxUsers: 50,
    maxProjects: 25,
    storageGB: 100,
    supportLevel: 'priority' as const,
    isPopular: true
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'For large HVAC organizations with advanced needs',
    features: [
      'Unlimited users',
      'Unlimited projects',
      '1TB storage',
      'Dedicated support',
      'Advanced analytics',
      'White-label options',
      'SSO integration',
      'Custom integrations',
      'Compliance tools'
    ],
    pricing: {
      monthly: 399,
      quarterly: 1077, // 10% discount
      yearly: 3832 // 20% discount
    },
    maxUsers: -1, // unlimited
    maxProjects: -1, // unlimited
    storageGB: 1000,
    supportLevel: 'dedicated' as const
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    companyId: 'comp-001',
    planId: 'plan-professional',
    status: 'active',
    billingCycle: 'monthly',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    currentPeriodStart: '2024-03-01',
    currentPeriodEnd: '2024-04-01',
    cancelAtPeriodEnd: false,
    autoRenew: true,
    pricing: {
      baseAmount: 149,
      discountAmount: 0,
      taxAmount: 14.9,
      totalAmount: 163.9,
      currency: 'USD'
    },
    usage: {
      users: 32,
      projects: 18,
      storageUsedGB: 67
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      brand: 'Visa'
    },
    invoices: [],
    addOns: []
  },
  {
    id: 'sub-002',
    companyId: 'comp-002',
    planId: 'plan-enterprise',
    status: 'active',
    billingCycle: 'yearly',
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    currentPeriodStart: '2023-08-01',
    currentPeriodEnd: '2024-08-01',
    cancelAtPeriodEnd: false,
    autoRenew: true,
    pricing: {
      baseAmount: 3832,
      discountAmount: 383.2,
      taxAmount: 344.88,
      totalAmount: 3793.68,
      currency: 'USD'
    },
    usage: {
      users: 87,
      projects: 45,
      storageUsedGB: 432
    },
    paymentMethod: {
      type: 'bank_transfer'
    },
    invoices: [],
    addOns: [
      {
        id: 'addon-001',
        name: 'Additional Storage',
        description: '500GB extra storage',
        price: 50,
        billingCycle: 'monthly',
        quantity: 1,
        startDate: '2024-01-01'
      }
    ]
  },
  {
    id: 'sub-003',
    companyId: 'comp-003',
    planId: 'plan-basic',
    status: 'cancelled',
    billingCycle: 'monthly',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    currentPeriodStart: '2023-12-01',
    currentPeriodEnd: '2024-01-01',
    cancelAtPeriodEnd: true,
    cancelledAt: '2023-11-15',
    cancelReason: 'Switched to competitor',
    autoRenew: false,
    pricing: {
      baseAmount: 49,
      discountAmount: 0,
      taxAmount: 4.9,
      totalAmount: 53.9,
      currency: 'USD'
    },
    usage: {
      users: 8,
      projects: 3,
      storageUsedGB: 12
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '1234',
      expiryMonth: 8,
      expiryYear: 2024,
      brand: 'MasterCard'
    },
    invoices: [],
    addOns: []
  },
  {
    id: 'sub-004',
    companyId: 'comp-004',
    planId: 'plan-professional',
    status: 'trial',
    billingCycle: 'monthly',
    startDate: '2024-02-15',
    endDate: '2025-02-15',
    trialEndDate: '2024-03-15',
    currentPeriodStart: '2024-02-15',
    currentPeriodEnd: '2024-03-15',
    cancelAtPeriodEnd: false,
    autoRenew: true,
    pricing: {
      baseAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      currency: 'USD'
    },
    usage: {
      users: 5,
      projects: 2,
      storageUsedGB: 3
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '5678',
      expiryMonth: 10,
      expiryYear: 2026,
      brand: 'American Express'
    },
    invoices: [],
    addOns: []
  }
];

export const mockSubscriptionMetrics: SubscriptionMetrics = {
  totalSubscriptions: 4,
  activeSubscriptions: 3,
  trialSubscriptions: 1,
  cancelledSubscriptions: 1,
  monthlyRecurringRevenue: 12450,
  annualRecurringRevenue: 149400,
  averageRevenuePerUser: 156.25,
  churnRate: 2.5,
  lifetimeValue: 2340,
  conversionRate: 78.5
};

export const mockUsageAlerts: UsageAlert[] = [
  {
    id: 'alert-001',
    subscriptionId: 'sub-001',
    type: 'user_limit',
    threshold: 80,
    currentUsage: 64, // 32/50 users = 64%
    severity: 'warning',
    createdAt: '2024-03-01',
    acknowledged: false
  },
  {
    id: 'alert-002',
    subscriptionId: 'sub-002',
    type: 'storage_limit',
    threshold: 90,
    currentUsage: 43.2, // 432GB/1000GB = 43.2%
    severity: 'warning',
    createdAt: '2024-02-28',
    acknowledged: true
  }
];
