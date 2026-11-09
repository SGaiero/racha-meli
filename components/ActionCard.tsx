import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isWide?: boolean;
}

export default function ActionCard({ icon, title, subtitle, isWide = false }: ActionCardProps) {
  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center ${isWide ? 'col-span-2 flex-row gap-4' : 'flex-col justify-center text-center'}`}>
      <div className="text-4xl mb-2 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800 text-lg leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}