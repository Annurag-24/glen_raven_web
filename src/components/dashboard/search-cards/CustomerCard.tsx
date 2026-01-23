import businessIcon from '@/assets/icons/business-outline.svg';
import arrowIcon from '@/assets/icons/arrow-up-right.svg';
import SearchCard from '@/components/dashboard/search/SearchCard';

export type CustomerCardItem = {
  id?: string | number;
  customerId?: string | number;
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
};

type Props = {
  item: CustomerCardItem;
  onClick?: (item: CustomerCardItem) => void;
};

export default function CustomerCard({ item, onClick }: Props) {
  const handleClick = () => onClick?.(item);

  return (
    <SearchCard onClick={handleClick}>
      {/* Top Row: Company Name and ID */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#333333]">
          {item.companyName || 'Unknown Company'}
        </h3>
        {item.customerId && (
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Company ID:
              <span className="text-sm font-semibold text-[#3F4560]">{item.customerId}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row: Icon, Address/Email, Contact/Phone, Arrow */}
      <div className="flex items-center gap-4">
        {/* Icon Column */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 flex-shrink-0">
          <img src={businessIcon} alt="Business" className="w-5 h-5" />
        </div>

        {/* Address and Email Column */}
        <div className="flex-1 text-sm space-y-1">
          {item.address && (
            <div className="text-[#5C6288]">
              <span className="text-gray-500">Address: </span>
              <span className="font-semibold text-[#3F4560]">{item.address}</span>
            </div>
          )}
          {item.email && (
            <div className="text-[#5C6288]">
              <span className="text-gray-500">Email: </span>
              <span className="font-semibold text-[#3F4560]">{item.email}</span>
            </div>
          )}
        </div>

        {/* Contact Name and Phone Column */}
        <div className="flex-1 text-sm space-y-1">
          {item.contactName && (
            <div className="text-[#5C6288]">
              <span className="text-gray-500">Contact Name: </span>
              <span className="font-semibold text-[#3F4560]">{item.contactName}</span>
            </div>
          )}
          {item.phone && (
            <div className="text-[#5C6288]">
              <span className="text-gray-500">Phone Number: </span>
              <span className="font-semibold text-[#3F4560]">{item.phone}</span>
            </div>
          )}
        </div>

        {/* Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="text-gray-400 hover:text-orange-600 transition-colors shrink-0 pr-4"
          aria-label="View customer"
        >
          <img src={arrowIcon} alt="View" className="w-3 h-3" />
        </button>
      </div>
    </SearchCard>
  );
}
