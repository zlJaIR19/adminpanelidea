export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'expired' | 'trial' | 'suspended';
export type SubscriptionPlanType = 'basic' | 'professional' | 'enterprise' | 'custom';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  maxUsers: number;
  maxProjects: number;
  storageGB: number;
  supportLevel: 'basic' | 'priority' | 'dedicated';
  isPopular?: boolean;
  isCustom?: boolean;
}

export interface Subscription {
  id: string;
  companyId: string;
  planId: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  trialEndDate?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: string;
  cancelReason?: string;
  autoRenew: boolean;
  pricing: {
    baseAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    currency: string;
  };
  usage: {
    users: number;
    projects: number;
    storageUsedGB: number;
  };
  paymentMethod: {
    type: 'credit_card' | 'bank_transfer' | 'invoice';
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
    brand?: string;
  };
  invoices: Invoice[];
  addOns: SubscriptionAddOn[];
}

export interface SubscriptionAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: BillingCycle;
  quantity: number;
  startDate: string;
  endDate?: string;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  amount: {
    subtotal: number;
    tax: number;
    total: number;
    currency: string;
  };
  items: InvoiceItem[];
  downloadUrl?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  period?: {
    start: string;
    end: string;
  };
}

export interface SubscriptionMetrics {
  totalSubscriptions: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  cancelledSubscriptions: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  averageRevenuePerUser: number;
  churnRate: number;
  lifetimeValue: number;
  conversionRate: number;
}

export interface UsageAlert {
  id: string;
  subscriptionId: string;
  type: 'user_limit' | 'project_limit' | 'storage_limit';
  threshold: number;
  currentUsage: number;
  severity: 'warning' | 'critical';
  createdAt: string;
  acknowledged: boolean;
}
