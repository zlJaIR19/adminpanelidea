"use client";
import React, { useState, useEffect } from 'react';
import { 
  mockProfessionalVerifications, 
  mockVerificationRequirements, 
  mockVerificationMetrics, 
  mockVerificationAlerts 
} from '@/data/verification';
import { mockUsers } from '@/data';
import { ProfessionalVerification, VerificationStatus, VerificationType } from '@/types/verification';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Award, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Plus,
  RefreshCw,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const VerificationManagement: React.FC = () => {
  const [verifications, setVerifications] = useState<ProfessionalVerification[]>(mockProfessionalVerifications);
  const [filteredVerifications, setFilteredVerifications] = useState<ProfessionalVerification[]>(mockProfessionalVerifications);
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<VerificationType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'overview' | 'pending' | 'analytics'>('overview');

  const metrics = mockVerificationMetrics;
  const alerts = mockVerificationAlerts;

  // Filter verifications
  useEffect(() => {
    let filtered = verifications;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(ver => ver.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(ver => ver.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(ver => {
        const user = mockUsers.find(u => u.id === ver.userId);
        return (
          user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ver.licenseNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ver.issuingAuthority?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ver.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredVerifications(filtered);
  }, [verifications, selectedStatus, selectedType, searchQuery]);

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-orange-100 text-orange-700';
      case 'suspended': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'under_review': return <Eye size={16} className="text-blue-500" />;
      case 'rejected': return <XCircle size={16} className="text-red-500" />;
      case 'expired': return <AlertTriangle size={16} className="text-orange-500" />;
      case 'suspended': return <AlertTriangle size={16} className="text-gray-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getTypeIcon = (type: VerificationType) => {
    switch (type) {
      case 'hvac_license': return <Award size={16} className="text-blue-500" />;
      case 'epa_certification': return <Shield size={16} className="text-green-500" />;
      case 'contractor_license': return <FileText size={16} className="text-purple-500" />;
      case 'insurance': return <Shield size={16} className="text-orange-500" />;
      case 'bonding': return <Shield size={16} className="text-indigo-500" />;
      case 'safety_certification': return <AlertTriangle size={16} className="text-red-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const formatVerificationType = (type: VerificationType) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry <= thirtyDaysFromNow && expiry > now;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  // Overview Dashboard
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
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
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{metrics.pendingReview}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Avg. review time: {metrics.averageReviewTime}h</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{metrics.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Approval rate: {metrics.approvalRate}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.complianceScore}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+3% from last month</span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Verification Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={20} className={
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'high' ? 'text-orange-600' :
                      'text-yellow-600'
                    } />
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        Verification ID: {alert.verificationId}
                        {alert.dueDate && ` • Due: ${formatDate(alert.dueDate)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
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

      {/* Verifications Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Professional Verifications</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search verifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as VerificationStatus | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as VerificationType | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="hvac_license">HVAC License</option>
                <option value="epa_certification">EPA Certification</option>
                <option value="contractor_license">Contractor License</option>
                <option value="insurance">Insurance</option>
                <option value="bonding">Bonding</option>
                <option value="safety_certification">Safety Certification</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVerifications.map(verification => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {getUserName(verification.userId)}
                        </p>
                        <p className="text-sm text-gray-500">{verification.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(verification.type)}
                      <span className="text-sm text-gray-900">
                        {formatVerificationType(verification.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(verification.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(verification.status)}`}>
                        {verification.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="text-gray-900">{verification.licenseNumber || 'N/A'}</p>
                      <p className="text-gray-500">{verification.issuingState}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="text-gray-900">{formatDate(verification.submittedAt)}</p>
                      {verification.reviewedAt && (
                        <p className="text-gray-500">Reviewed: {formatDate(verification.reviewedAt)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {verification.expiryDate ? (
                        <>
                          <p className={`${
                            isExpired(verification.expiryDate) ? 'text-red-600 font-medium' :
                            isExpiringSoon(verification.expiryDate) ? 'text-orange-600 font-medium' :
                            'text-gray-900'
                          }`}>
                            {formatDate(verification.expiryDate)}
                          </p>
                          {isExpiringSoon(verification.expiryDate) && (
                            <p className="text-orange-500">Expiring soon</p>
                          )}
                          {isExpired(verification.expiryDate) && (
                            <p className="text-red-500">Expired</p>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye size={16} />
                      </button>
                      {verification.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900" title="Review">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900" title="Download Documents">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
          <h1 className="text-2xl font-bold text-gray-900">Professional Verification</h1>
          <p className="text-gray-600 mt-1">
            Manage and review professional certifications and licenses
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
              onClick={() => setViewMode('pending')}
              className={`px-4 py-2 text-sm border-l border-gray-300 ${viewMode === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Pending ({metrics.pendingReview})
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
            Export Report
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'overview' && <OverviewDashboard />}
      {viewMode === 'pending' && (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pending Reviews</h3>
          <p className="text-gray-600">Detailed pending review interface coming soon...</p>
        </div>
      )}
      {viewMode === 'analytics' && (
        <div className="text-center py-12">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Analytics</h3>
          <p className="text-gray-600">Advanced analytics dashboard coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default VerificationManagement;
