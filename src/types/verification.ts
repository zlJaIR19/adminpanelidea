export type VerificationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'expired' | 'suspended';
export type VerificationType = 'hvac_license' | 'epa_certification' | 'contractor_license' | 'insurance' | 'bonding' | 'safety_certification';
export type DocumentType = 'license' | 'certificate' | 'insurance_policy' | 'bond_document' | 'id_document' | 'other';

export interface VerificationDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
  expiryDate?: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  size: number;
  mimeType: string;
}

export interface ProfessionalVerification {
  id: string;
  userId: string;
  type: VerificationType;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  approvedAt?: string;
  rejectedAt?: string;
  expiryDate?: string;
  renewalDate?: string;
  licenseNumber?: string;
  issuingAuthority?: string;
  issuingState?: string;
  documents: VerificationDocument[];
  reviewNotes?: string;
  rejectionReason?: string;
  complianceScore?: number;
  lastUpdated: string;
  autoRenewal: boolean;
  remindersSent: number;
}

export interface VerificationRequirement {
  id: string;
  type: VerificationType;
  name: string;
  description: string;
  required: boolean;
  renewalPeriodMonths: number;
  reminderDaysBefore: number[];
  requiredDocuments: DocumentType[];
  complianceWeight: number;
  applicableStates?: string[];
  minimumExperience?: number;
}

export interface VerificationMetrics {
  totalApplications: number;
  pendingReview: number;
  approved: number;
  rejected: number;
  expired: number;
  averageReviewTime: number; // in hours
  approvalRate: number;
  expiringIn30Days: number;
  complianceScore: number;
  byType: Record<VerificationType, {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  }>;
}

export interface VerificationAlert {
  id: string;
  verificationId: string;
  type: 'expiry_warning' | 'renewal_due' | 'compliance_issue' | 'document_missing';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  dueDate?: string;
  createdAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export interface VerificationAuditLog {
  id: string;
  verificationId: string;
  action: 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'expired' | 'renewed' | 'document_uploaded' | 'document_verified';
  performedBy: string;
  performedAt: string;
  details: string;
  previousStatus?: VerificationStatus;
  newStatus?: VerificationStatus;
  metadata?: Record<string, any>;
}
