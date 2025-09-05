"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, Building, Briefcase, HardHat, X, ArrowRight } from 'lucide-react';
import { mockUsers, mockCompanies, mockProjects, mockEquipment } from '@/data';
import { User, Company, Project, Equipment } from '@/types';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'user' | 'company' | 'project' | 'equipment';
  data: User | Company | Project | Equipment;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search users
    mockUsers.forEach(user => {
      if (user.name.toLowerCase().includes(lowerQuery) || 
          user.email.toLowerCase().includes(lowerQuery) ||
          user.id.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: user.id,
          title: user.name,
          subtitle: user.email,
          type: 'user',
          data: user
        });
      }
    });

    // Search companies
    mockCompanies.forEach(company => {
      if (company.name.toLowerCase().includes(lowerQuery) ||
          company.industry.toLowerCase().includes(lowerQuery) ||
          company.id.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: company.id,
          title: company.name,
          subtitle: company.industry,
          type: 'company',
          data: company
        });
      }
    });

    // Search projects
    mockProjects.forEach(project => {
      if (project.name.toLowerCase().includes(lowerQuery) ||
          project.id.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: project.id,
          title: project.name,
          subtitle: `Status: ${project.status}`,
          type: 'project',
          data: project
        });
      }
    });

    // Search equipment
    mockEquipment.forEach(equipment => {
      if (equipment.model.toLowerCase().includes(lowerQuery) ||
          equipment.brand.toLowerCase().includes(lowerQuery) ||
          equipment.type.toLowerCase().includes(lowerQuery) ||
          equipment.id.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: equipment.id,
          title: `${equipment.brand} ${equipment.model}`,
          subtitle: `${equipment.type} - ${equipment.status}`,
          type: 'equipment',
          data: equipment
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const paths = {
      user: '/users',
      company: '/companies',
      project: '/projects',
      equipment: '/equipment'
    };
    onNavigate(paths[result.type]);
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users size={16} />;
      case 'company': return <Building size={16} />;
      case 'project': return <Briefcase size={16} />;
      case 'equipment': return <HardHat size={16} />;
      default: return <Search size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return '#3b82f6';
      case 'company': return '#10b981';
      case 'project': return '#f59e0b';
      case 'equipment': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '100px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 20px'
      }}>
        {/* Search Input */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={20} color="#6b7280" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users, companies, projects, equipment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#111827'
            }}
          />
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} color="#6b7280" />
          </button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {results.map((result, index) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  backgroundColor: index === selectedIndex ? '#f3f4f6' : 'white',
                  borderBottom: index < results.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background-color 0.1s ease'
                }}
              >
                <div style={{
                  color: getTypeColor(result.type),
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {getIcon(result.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '500',
                    color: '#111827',
                    fontSize: '14px'
                  }}>
                    {result.title}
                  </div>
                  <div style={{
                    color: '#6b7280',
                    fontSize: '12px'
                  }}>
                    {result.subtitle}
                  </div>
                </div>
                <div style={{
                  backgroundColor: getTypeColor(result.type),
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {result.type}
                </div>
                <ArrowRight size={14} color="#9ca3af" />
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {query.length >= 2 && results.length === 0 && (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <Search size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
              No results found
            </div>
            <div style={{ fontSize: '14px' }}>
              Try searching for users, companies, projects, or equipment
            </div>
          </div>
        )}

        {/* Search Tips */}
        {query.length < 2 && (
          <div style={{
            padding: '20px',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <div style={{ marginBottom: '12px', fontWeight: '500' }}>Search Tips:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• Search by name, email, or ID</div>
              <div>• Use ↑↓ arrow keys to navigate</div>
              <div>• Press Enter to open selected result</div>
              <div>• Press Escape to close</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
