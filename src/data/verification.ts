import { 
  ProfessionalVerification, 
  VerificationRequirement, 
  VerificationMetrics, 
  VerificationAlert,
  VerificationAuditLog
} from '@/types/verification';

export const mockVerificationRequirements: VerificationRequirement[] = [
  {
    id: 'req-001',
    type: 'hvac_license',
    name: 'HVAC Contractor License',
    description: 'State-issued HVAC contractor license required for all technicians',
    required: true,
    renewalPeriodMonths: 24,
    reminderDaysBefore: [60, 30, 14, 7],
    requiredDocuments: ['license', 'id_document'],
    complianceWeight: 30,
    applicableStates: ['CA', 'TX', 'FL', 'NY'],
    minimumExperience: 2
  },
  {
    id: 'req-002',
    type: 'epa_certification',
    name: 'EPA Section 608 Certification',
    description: 'EPA certification for handling refrigerants',
    required: true,
    renewalPeriodMonths: 60,
    reminderDaysBefore: [90, 60, 30, 14],
    requiredDocuments: ['certificate'],
    complianceWeight: 25,
    minimumExperience: 1
  },
  {
    id: 'req-003',
    type: 'insurance',
    name: 'General Liability Insurance',
    description: 'Minimum $1M general liability insurance coverage',
    required: true,
    renewalPeriodMonths: 12,
    reminderDaysBefore: [45, 30, 14, 7],
    requiredDocuments: ['insurance_policy'],
    complianceWeight: 20
  },
  {
    id: 'req-004',
    type: 'safety_certification',
    name: 'OSHA Safety Certification',
    description: 'OSHA 10-hour or 30-hour safety training certification',
    required: false,
    renewalPeriodMonths: 36,
    reminderDaysBefore: [60, 30, 14],
    requiredDocuments: ['certificate'],
    complianceWeight: 15,
    minimumExperience: 0
  }
];

export const mockProfessionalVerifications: ProfessionalVerification[] = [
  {
    id: 'ver-001',
    userId: 'user-002',
    type: 'hvac_license',
    status: 'approved',
    submittedAt: '2024-01-15T10:00:00Z',
    reviewedAt: '2024-01-18T14:30:00Z',
    reviewedBy: 'admin-001',
    approvedAt: '2024-01-18T14:30:00Z',
    expiryDate: '2026-01-15',
    renewalDate: '2025-11-15',
    licenseNumber: 'HVAC-CA-123456',
    issuingAuthority: 'California Contractors State License Board',
    issuingState: 'CA',
    documents: [
      {
        id: 'doc-001',
        name: 'hvac_license_ca.pdf',
        type: 'license',
        url: '/documents/hvac_license_ca.pdf',
        uploadedAt: '2024-01-15T10:00:00Z',
        expiryDate: '2026-01-15',
        verified: true,
        verifiedBy: 'admin-001',
        verifiedAt: '2024-01-18T14:30:00Z',
        size: 2048000,
        mimeType: 'application/pdf'
      },
      {
        id: 'doc-002',
        name: 'drivers_license.jpg',
        type: 'id_document',
        url: '/documents/drivers_license.jpg',
        uploadedAt: '2024-01-15T10:05:00Z',
        verified: true,
        verifiedBy: 'admin-001',
        verifiedAt: '2024-01-18T14:30:00Z',
        size: 1024000,
        mimeType: 'image/jpeg'
      }
    ],
    reviewNotes: 'All documents verified. License is valid and in good standing.',
    complianceScore: 95,
    lastUpdated: '2024-01-18T14:30:00Z',
    autoRenewal: true,
    remindersSent: 0
  },
  {
    id: 'ver-002',
    userId: 'user-003',
    type: 'epa_certification',
    status: 'pending',
    submittedAt: '2024-03-01T09:00:00Z',
    licenseNumber: 'EPA-608-789012',
    issuingAuthority: 'Environmental Protection Agency',
    documents: [
      {
        id: 'doc-003',
        name: 'epa_608_certificate.pdf',
        type: 'certificate',
        url: '/documents/epa_608_certificate.pdf',
        uploadedAt: '2024-03-01T09:00:00Z',
        expiryDate: '2029-03-01',
        verified: false,
        size: 1536000,
        mimeType: 'application/pdf'
      }
    ],
    complianceScore: 0,
    lastUpdated: '2024-03-01T09:00:00Z',
    autoRenewal: false,
    remindersSent: 0
  },
  {
    id: 'ver-003',
    userId: 'user-004',
    type: 'insurance',
    status: 'under_review',
    submittedAt: '2024-02-20T11:30:00Z',
    reviewedAt: '2024-02-22T10:00:00Z',
    reviewedBy: 'admin-002',
    expiryDate: '2025-02-20',
    renewalDate: '2025-01-20',
    issuingAuthority: 'State Farm Insurance',
    documents: [
      {
        id: 'doc-004',
        name: 'liability_insurance_policy.pdf',
        type: 'insurance_policy',
        url: '/documents/liability_insurance_policy.pdf',
        uploadedAt: '2024-02-20T11:30:00Z',
        expiryDate: '2025-02-20',
        verified: false,
        size: 3072000,
        mimeType: 'application/pdf'
      }
    ],
    reviewNotes: 'Policy amount verification in progress. Waiting for confirmation from insurance provider.',
    complianceScore: 0,
    lastUpdated: '2024-02-22T10:00:00Z',
    autoRenewal: true,
    remindersSent: 0
  },
  {
    id: 'ver-004',
    userId: 'user-005',
    type: 'hvac_license',
    status: 'rejected',
    submittedAt: '2024-02-10T14:00:00Z',
    reviewedAt: '2024-02-12T16:45:00Z',
    reviewedBy: 'admin-001',
    rejectedAt: '2024-02-12T16:45:00Z',
    licenseNumber: 'HVAC-TX-654321',
    issuingAuthority: 'Texas Department of Licensing and Regulation',
    issuingState: 'TX',
    documents: [
      {
        id: 'doc-005',
        name: 'hvac_license_tx_expired.pdf',
        type: 'license',
        url: '/documents/hvac_license_tx_expired.pdf',
        uploadedAt: '2024-02-10T14:00:00Z',
        expiryDate: '2023-12-31',
        verified: false,
        size: 1792000,
        mimeType: 'application/pdf'
      }
    ],
    reviewNotes: 'License has expired. Please submit current, valid license.',
    rejectionReason: 'Expired license - renewal required before approval',
    complianceScore: 0,
    lastUpdated: '2024-02-12T16:45:00Z',
    autoRenewal: false,
    remindersSent: 1
  },
  {
    id: 'ver-005',
    userId: 'user-006',
    type: 'safety_certification',
    status: 'approved',
    submittedAt: '2024-01-25T13:15:00Z',
    reviewedAt: '2024-01-26T11:20:00Z',
    reviewedBy: 'admin-002',
    approvedAt: '2024-01-26T11:20:00Z',
    expiryDate: '2027-01-25',
    renewalDate: '2026-11-25',
    licenseNumber: 'OSHA-30-456789',
    issuingAuthority: 'Occupational Safety and Health Administration',
    documents: [
      {
        id: 'doc-006',
        name: 'osha_30_certificate.pdf',
        type: 'certificate',
        url: '/documents/osha_30_certificate.pdf',
        uploadedAt: '2024-01-25T13:15:00Z',
        expiryDate: '2027-01-25',
        verified: true,
        verifiedBy: 'admin-002',
        verifiedAt: '2024-01-26T11:20:00Z',
        size: 1280000,
        mimeType: 'application/pdf'
      }
    ],
    reviewNotes: 'OSHA 30-hour certification verified. Excellent safety training record.',
    complianceScore: 88,
    lastUpdated: '2024-01-26T11:20:00Z',
    autoRenewal: true,
    remindersSent: 0
  }
];

export const mockVerificationMetrics: VerificationMetrics = {
  totalApplications: 5,
  pendingReview: 1,
  approved: 3,
  rejected: 1,
  expired: 0,
  averageReviewTime: 48, // hours
  approvalRate: 75, // percentage
  expiringIn30Days: 0,
  complianceScore: 85,
  byType: {
    hvac_license: {
      total: 2,
      approved: 1,
      pending: 0,
      rejected: 1
    },
    epa_certification: {
      total: 1,
      approved: 0,
      pending: 1,
      rejected: 0
    },
    contractor_license: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0
    },
    insurance: {
      total: 1,
      approved: 0,
      pending: 1,
      rejected: 0
    },
    bonding: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0
    },
    safety_certification: {
      total: 1,
      approved: 1,
      pending: 0,
      rejected: 0
    }
  }
};

export const mockVerificationAlerts: VerificationAlert[] = [
  {
    id: 'alert-001',
    verificationId: 'ver-001',
    type: 'renewal_due',
    severity: 'medium',
    message: 'HVAC License renewal due in 60 days',
    dueDate: '2025-11-15',
    createdAt: '2024-03-01T08:00:00Z',
    acknowledged: false
  },
  {
    id: 'alert-002',
    verificationId: 'ver-003',
    type: 'expiry_warning',
    severity: 'high',
    message: 'Insurance policy expires in 30 days',
    dueDate: '2025-02-20',
    createdAt: '2024-03-01T08:00:00Z',
    acknowledged: false
  },
  {
    id: 'alert-003',
    verificationId: 'ver-004',
    type: 'compliance_issue',
    severity: 'critical',
    message: 'Rejected verification requires immediate attention',
    createdAt: '2024-02-12T16:45:00Z',
    acknowledged: true,
    acknowledgedBy: 'admin-001',
    acknowledgedAt: '2024-02-13T09:00:00Z'
  }
];

export const mockVerificationAuditLog: VerificationAuditLog[] = [
  {
    id: 'audit-001',
    verificationId: 'ver-001',
    action: 'submitted',
    performedBy: 'user-002',
    performedAt: '2024-01-15T10:00:00Z',
    details: 'HVAC license verification submitted',
    newStatus: 'pending'
  },
  {
    id: 'audit-002',
    verificationId: 'ver-001',
    action: 'document_uploaded',
    performedBy: 'user-002',
    performedAt: '2024-01-15T10:05:00Z',
    details: 'ID document uploaded'
  },
  {
    id: 'audit-003',
    verificationId: 'ver-001',
    action: 'reviewed',
    performedBy: 'admin-001',
    performedAt: '2024-01-18T14:30:00Z',
    details: 'Documents reviewed and verified',
    previousStatus: 'pending',
    newStatus: 'under_review'
  },
  {
    id: 'audit-004',
    verificationId: 'ver-001',
    action: 'approved',
    performedBy: 'admin-001',
    performedAt: '2024-01-18T14:30:00Z',
    details: 'Verification approved - all requirements met',
    previousStatus: 'under_review',
    newStatus: 'approved'
  },
  {
    id: 'audit-005',
    verificationId: 'ver-004',
    action: 'rejected',
    performedBy: 'admin-001',
    performedAt: '2024-02-12T16:45:00Z',
    details: 'Verification rejected - expired license',
    previousStatus: 'under_review',
    newStatus: 'rejected',
    metadata: {
      rejectionReason: 'Expired license - renewal required before approval'
    }
  }
];
