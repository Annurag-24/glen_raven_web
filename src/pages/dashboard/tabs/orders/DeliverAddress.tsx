import React from 'react';
import { cn } from '@/lib/utils';

export interface DeliveryAddress {
  line1: string;
  area?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  icon: string;
}

interface DeliverAddressProps {
  address: DeliveryAddress;
  className?: string;
}

const DeliverAddress: React.FC<DeliverAddressProps> = ({ address, className }) => {
  const formattedAddress = [
    address.line1,
    address.area,
    address.city,
    address.state,
    address.country,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className={cn('bg-white p-4 rounded-lg', className)}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <img src={address.icon} alt="Deliver Icon" className="w-5 h-5 mt-1" />

        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">Deliver To</span>
          <span className="text-sm text-gray-500">{formattedAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliverAddress;
