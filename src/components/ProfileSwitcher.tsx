import React, { useState } from 'react';
import { User, ProfileType } from '@/types';
import { ChevronDown, Users, Award, Building, Eye, Check } from 'lucide-react';

interface ProfileSwitcherProps {
  user: User;
  onProfileSwitch: (profileType: ProfileType) => void;
}

const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({ user, onProfileSwitch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getProfileIcon = (type: ProfileType) => {
    switch (type) {
      case 'basic': return <Users className="w-4 h-4" />;
      case 'verified_professional': return <Award className="w-4 h-4" />;
      case 'company_member': return <Building className="w-4 h-4" />;
      case 'investor': return <Eye className="w-4 h-4" />;
    }
  };

  const getProfileColor = (type: ProfileType) => {
    switch (type) {
      case 'basic': return 'text-gray-700';
      case 'verified_professional': return 'text-blue-700';
      case 'company_member': return 'text-green-700';
      case 'investor': return 'text-purple-700';
    }
  };

  const getProfileLabel = (type: ProfileType) => {
    switch (type) {
      case 'basic': return 'Basic User';
      case 'verified_professional': return 'Verified Professional';
      case 'company_member': return 'Company Member';
      case 'investor': return 'Investor';
    }
  };

  const getContextInfo = (type: ProfileType) => {
    switch (type) {
      case 'basic':
        return 'Personal account access';
      case 'verified_professional':
        return user.verifiedProfessional ? 
          `${user.verifiedProfessional.professionalCategory.replace('_', ' ')} • ${user.verifiedProfessional.verificationStatus}` :
          'Professional account';
      case 'company_member':
        return user.companyMember ? 
          `${user.companyMember.companyName} • ${user.companyMember.role}` :
          'Company account';
      case 'investor':
        return user.investor ? 
          `${user.investor.accessLevel} access • Analytics dashboard` :
          'Investor account';
    }
  };

  const handleProfileSwitch = (profileType: ProfileType) => {
    onProfileSwitch(profileType);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          {getProfileIcon(user.currentContext)}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">
              {getProfileLabel(user.currentContext)}
            </p>
            <p className="text-xs text-gray-500">
              {getContextInfo(user.currentContext)}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Switch Profile Context</h3>
            <p className="text-xs text-gray-500">Choose which profile to use</p>
          </div>
          
          <div className="py-2">
            {user.profileTypes.map((profileType) => (
              <button
                key={profileType}
                onClick={() => handleProfileSwitch(profileType)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 ${
                  profileType === user.currentContext ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`p-1 rounded ${
                  profileType === user.currentContext ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {getProfileIcon(profileType)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getProfileColor(profileType)}`}>
                      {getProfileLabel(profileType)}
                    </span>
                    {profileType === user.currentContext && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {getContextInfo(profileType)}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600">
              Profile switching affects your dashboard view, permissions, and available features.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
