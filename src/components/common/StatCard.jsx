import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, gradient, trend, trendValue }) => {
  return (
    <div className={`rounded-xl p-5 text-white relative overflow-hidden ${gradient}`}>
      <div className="flex justify-between items-start z-10 relative">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          {Icon && <Icon size={20} className="text-white" />}
        </div>
        {trend && (
          <div className="flex items-center text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
            {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="z-10 relative mt-3">
        <div className="text-2xl font-bold font-display">{value}</div>
        <div className="text-sm font-medium opacity-90 mt-1">{title}</div>
        <div className="text-xs opacity-70 mt-0.5">{subtitle}</div>
      </div>
      
      {/* Decorative large circle */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
    </div>
  );
};

export default StatCard;
