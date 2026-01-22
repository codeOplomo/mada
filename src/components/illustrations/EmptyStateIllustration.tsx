import React from 'react';

export function EmptyStateIllustration() {
  return (
    <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hospital building */}
      <rect x="30" y="60" width="70" height="80" rx="4" fill="#F0F9FB" stroke="#2B9DB3" strokeWidth="2"/>
      <rect x="45" y="75" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      <rect x="73" y="75" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      <rect x="45" y="95" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      <rect x="73" y="95" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      <rect x="45" y="115" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      <rect x="73" y="115" width="12" height="12" rx="2" fill="#2B9DB3" opacity="0.3"/>
      
      {/* Hospital cross */}
      <rect x="55" y="35" width="20" height="6" rx="2" fill="#E85D5D"/>
      <rect x="62" y="28" width="6" height="20" rx="2" fill="#E85D5D"/>
      
      {/* Package box */}
      <g transform="translate(140, 70)">
        <rect x="0" y="20" width="60" height="50" rx="4" fill="#FFFFFF" stroke="#6DC58A" strokeWidth="2"/>
        <path d="M0 20 L30 0 L90 0 L60 20 Z" fill="#E8F7EE" stroke="#6DC58A" strokeWidth="2"/>
        <path d="M60 20 L90 0 L90 50 L60 70 Z" fill="#D4F0DE" stroke="#6DC58A" strokeWidth="2"/>
        <line x1="30" y1="35" x2="30" y2="70" stroke="#6DC58A" strokeWidth="2"/>
        <line x1="0" y1="35" x2="60" y2="35" stroke="#6DC58A" strokeWidth="2"/>
        
        {/* Medical cross on box */}
        <rect x="20" y="45" width="20" height="6" rx="2" fill="#6DC58A"/>
        <rect x="27" y="38" width="6" height="20" rx="2" fill="#6DC58A"/>
      </g>
      
      {/* Checklist */}
      <g transform="translate(70, 155)">
        <rect x="0" y="0" width="50" height="35" rx="4" fill="#FFFFFF" stroke="#2B9DB3" strokeWidth="2"/>
        <circle cx="8" cy="10" r="3" fill="#6DC58A"/>
        <line x1="15" y1="10" x2="42" y2="10" stroke="#0F2C3A" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="20" r="3" fill="#6DC58A"/>
        <line x1="15" y1="20" x2="42" y2="20" stroke="#0F2C3A" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="27" r="3" stroke="#6B7785" strokeWidth="1.5" fill="none"/>
        <line x1="15" y1="27" x2="30" y2="27" stroke="#6B7785" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      
      {/* Connecting arrows */}
      <path d="M 100 100 Q 120 100 140 90" stroke="#2B9DB3" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead)"/>
      <path d="M 170 120 Q 150 140 120 155" stroke="#6DC58A" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead2)"/>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#2B9DB3" />
        </marker>
        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#6DC58A" />
        </marker>
      </defs>
    </svg>
  );
}
