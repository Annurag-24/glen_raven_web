import orderIcon from '@/assets/icons/orders-tertiary.svg';
import arrowIcon from '@/assets/icons/arrow-up-right.svg';
import SearchCard from '@/components/dashboard/search/SearchCard';

export type OrderCardItem = {
  id?: string | number;
  title?: string;
  orderNumber?: string | number;
  date?: string;
  customerId?: string;
  companyName?: string;
  phone?: string;
  contactName?: string;
  email?: string;
  address?: string;
  [key: string]: unknown;
};

type Props = {
  item: OrderCardItem;
  onClick?: (item: OrderCardItem) => void;
  searchQuery?: string;
};

export default function OrderCard({ item, onClick, searchQuery = '' }: Props) {
  const handleClick = () => onClick?.(item);

  const renderOrderNumber = () => {
    const orderNum = item.orderNumber?.toString() ?? item.id?.toString() ?? '';
    if (!searchQuery || !orderNum.includes(searchQuery)) {
      return <span className="text-tertiary">{orderNum}</span>;
    }

    const index = orderNum.indexOf(searchQuery);
    const before = orderNum.substring(0, index);
    const match = orderNum.substring(index, index + searchQuery.length);
    const after = orderNum.substring(index + searchQuery.length);

    return (
      <>
        <span className="text-[#757575]">{before}</span>
        <span className="text-tertiary">{match}</span>
        <span className="text-[#757575]">{after}</span>
      </>
    );
  };

  return (
    <SearchCard onClick={handleClick}>
      {/* Top Row: Icon, Order ID, Date, Arrow */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <img src={orderIcon} alt="Order" className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#333333]">
              Order ID {renderOrderNumber()}
            </div>
          </div>
        </div>

        <div className="text-sm text-[#5C6288]">{item.date}</div>
      </div>

      {/* Bottom Row: Two Column Grid with Arrow */}
      <div className="flex items-center justify-between gap-4">
        <div className="grid grid-cols-2 gap-6 text-sm flex-1">
          {/* Left Column */}
          <div className="space-y-1">
            {item.customerId && (
              <div className="text-[#5C6288]">
                <span className="text-gray-500">Customer ID :</span>
                <span className="font-semibold text-[#3F4560] ml-1">{item.customerId}</span>
              </div>
            )}
            {item.companyName && (
              <div className="text-[#5C6288]">
                <span className="text-gray-500">Company Name :</span>
                <span className="font-semibold text-[#3F4560] ml-1">{item.companyName}</span>
              </div>
            )}
            {item.phone && (
              <div className="text-[#5C6288]">
                <span className="text-gray-500">Phone Number :</span>
                <span className="font-semibold text-[#3F4560] ml-1">{item.phone}</span>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-1">
            {item.contactName && (
              <div className="text-[#5C6288]">
                <span className="text-gray-500">Contact Name :</span>
                <span className="font-semibold text-[#3F4560] ml-1">{item.contactName}</span>
              </div>
            )}
            {item.email && (
              <div className="text-[#5C6288]">
                <span className="text-gray-500">Email :</span>
                <span className="font-semibold text-[#3F4560] ml-1">{item.email}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="text-[#3F3F46] hover:text-tertiary transition-colors flex-shrink-0 pr-8 cursor-pointer"
          aria-label="View order"
        >
          <img src={arrowIcon} alt="View" className="w-3 h-3" />
        </button>
      </div>
    </SearchCard>
  );
}
