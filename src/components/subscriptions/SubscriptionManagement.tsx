"use client";
import React, { useState, useEffect } from 'react';
import { 
  mockSubscriptions, 
  mockSubscriptionPlans, 
  mockSubscriptionMetrics, 
  mockUsageAlerts 
} from '@/data/subscriptions';
import { mockCompanies } from '@/data';
import { Subscription, SubscriptionPlan, SubscriptionStatus } from '@/types/subscriptions';
import { 
  CreditCard, 
  Calendar, 
  Users, 
  Building, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Download, 
  Filter, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  RefreshCw,
  Package,
  Zap,
  Shield,
  Star
} from 'lucide-react';

const SubscriptionManagement: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [selectedStatus, setSelectedStatus] = useState<SubscriptionStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'plans' | 'analytics'>('overview');

  const metrics = mockSubscriptionMetrics;
  const alerts = mockUsageAlerts;

  // Filter subscriptions
  useEffect(() => {
    let filtered = subscriptions;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(sub => sub.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(sub => {
        const company = mockCompanies.find(c => c.id === sub.companyId);
        const plan = mockSubscriptionPlans.find(p => p.id === sub.planId);
        return (
          company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, selectedStatus, searchQuery]);

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-orange-100 text-orange-700';
      case 'suspended': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-500" />;
      case 'trial': return <Clock size={16} className="text-blue-500" />;
      case 'inactive': return <XCircle size={16} className="text-gray-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      case 'expired': return <AlertTriangle size={16} className="text-orange-500" />;
      case 'suspended': return <AlertTriangle size={16} className="text-yellow-500" />;
      default: return <XCircle size={16} className="text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCompanyName = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    return company?.name || 'Unknown Company';
  };

  const getPlanName = (planId: string) => {
    const plan = mockSubscriptionPlans.find(p => p.id === planId);
    return plan?.name || 'Unknown Plan';
  };

  const calculateUsagePercentage = (current: number, max: number) => {
    if (max === -1) return 0; // unlimited
    return Math.round((current / max) * 100);
  };

  // Overview Dashboard
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalSubscriptions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-green-600">{metrics.activeSubscriptions}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(metrics.monthlyRecurringRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-orange-600">{metrics.churnRate}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown size={24} className="text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown size={16} className="text-red-500 mr-1" />
            <span className="text-red-600">-2% from last month</span>
          </div>
        </div>
      </div>

      {/* Usage Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Usage Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={20} className="text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {alert.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Warning
                      </p>
                      <p className="text-sm text-gray-600">
                        Subscription {alert.subscriptionId} is at {alert.currentUsage}% usage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.severity}
                    </span>
                    {!alert.acknowledged && (
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Subscriptions</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as SubscriptionStatus | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="inactive">Inactive</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map(subscription => {
                const plan = mockSubscriptionPlans.find(p => p.id === subscription.planId);
                return (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {getCompanyName(subscription.companyId)}
                          </p>
                          <p className="text-sm text-gray-500">{subscription.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {getPlanName(subscription.planId)}
                        </span>
                        {plan?.isPopular && (
                          <Star size={14} className="text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 capitalize">
                        {subscription.billingCycle}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(subscription.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(subscription.status)}`}>
                          {subscription.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={14} className="text-gray-400" />
                          <span>{subscription.usage.users}</span>
                          {plan && plan.maxUsers > 0 && (
                            <span className="text-gray-500">/ {plan.maxUsers}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Package size={14} className="text-gray-400" />
                          <span>{subscription.usage.projects}</span>
                          {plan && plan.maxProjects > 0 && (
                            <span className="text-gray-500">/ {plan.maxProjects}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(subscription.pricing.totalAmount)}
                        </p>
                        <p className="text-gray-500 capitalize">
                          {subscription.billingCycle}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="text-gray-900">
                          {formatDate(subscription.currentPeriodEnd)}
                        </p>
                        <p className="text-gray-500">
                          {subscription.autoRenew ? 'Auto-renew' : 'Manual'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-gray-600 mt-1">
            Manage company subscriptions, plans, and billing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 text-sm ${viewMode === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('plans')}
              className={`px-4 py-2 text-sm border-l border-gray-300 ${viewMode === 'plans' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Plans
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 text-sm border-l border-gray-300 ${viewMode === 'analytics' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Analytics
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'overview' && <OverviewDashboard />}
      {viewMode === 'plans' && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Plan Management</h3>
          <p className="text-gray-600">Plan management interface coming soon...</p>
        </div>
      )}
      {viewMode === 'analytics' && (
        <div className="text-center py-12">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
          <p className="text-gray-600">Advanced analytics dashboard coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
