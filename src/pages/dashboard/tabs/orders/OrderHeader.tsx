import { ShoppingCart } from 'lucide-react';
import Badge, { type BadgeVariant } from '@/components/Badge';
import DropdownMenu, { type DropdownOption } from '@/components/ui/DropdownMenu';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import HugeiconsContactIcon from '@/assets/icons/hugeicons_contact.svg';
export type OrderStatus = 'confirmed' | 'pending' | 'shipped' | 'delivered' | 'cancelled';

export type CustomerTag = {
  label: string;
  variant?: BadgeVariant;
};

export type OrderHeaderProps = {
  // Customer Info (Left Side)
  customerName: string;
  customerTags?: CustomerTag[];
  poNumber?: string;
  paymentTerms?: string;
  contactDetails?: DropdownOption[];
  customerNotes?: DropdownOption[];
  changeContact?: DropdownOption[];
  onChangeContact?: (option: DropdownOption) => void;
  onContactDetailsClick?: (option: DropdownOption) => void;
  onCustomerNotesClick?: (option: DropdownOption) => void;

  // Order Status (Right Side)
  orderNumber: string;
  orderStatus: OrderStatus;
  orderDate: Date | string;
  orderNotes?: DropdownOption[];
  onOrderNotesClick?: (option: DropdownOption) => void;

  // Optional customizations
  className?: string;
};

const statusConfig: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  confirmed: { label: 'Confirmed', variant: 'confirmed' },
  pending: { label: 'Pending', variant: 'pending' },
  shipped: { label: 'Shipped', variant: 'shipped' },
  delivered: { label: 'Delivered', variant: 'delivered' },
  cancelled: { label: 'Cancelled', variant: 'cancelled' },
};

export default function OrderHeader({
  customerName,
  customerTags = [],
  poNumber,
  paymentTerms,
  contactDetails,
  customerNotes,
  changeContact,
  onChangeContact,
  onContactDetailsClick,
  onCustomerNotesClick,
  orderNumber,
  orderStatus,
  orderDate,
  orderNotes,
  onOrderNotesClick,
  className,
}: OrderHeaderProps) {
  const status = statusConfig[orderStatus];
  const formattedDate =
    typeof orderDate === 'string' ? orderDate : format(orderDate, 'EEE, d MMM h:mm a');

  return (
    <div className={cn('w-full  border-b border-[#A4A4A429]   px-6 py-4', className)}>
      <div className="flex items-start justify-between gap-6">
        {/* Left Side - Customer Info */}
        <div className="flex-1 flex items-start gap-4">
          {/* Profile Icon */}
          <div className="shrink-0 w-[60px] h-[60px] rounded-full bg-[#4F6BED]/10 flex items-center justify-center">
            <img
              src={HugeiconsContactIcon}
              className="w-[32.66666603088379px] h-[32.666671752929688px]"
            />
          </div>

          {/* Customer Details */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Name and Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <h2 className="text-[18px] font-semibold text-gray-900">{customerName}</h2>
              {customerTags.map((tag, index) => (
                <Badge
                  className="py-[6.5px] px-[7.5px]"
                  key={index}
                  title={tag.label}
                  variant={tag.variant || 'default'}
                />
              ))}
              {changeContact && changeContact.length > 0 && (
                <DropdownMenu
                  trigger={<span className="text-[12px] font-semibold">Change Contact</span>}
                  options={changeContact}
                  onOptionClick={onChangeContact}
                />
              )}
            </div>

            {/* PO Number, Payment Terms, Contact Details, Customer Notes - All in one row */}
            <div className="flex items-start gap-6 flex-wrap">
              {/* PO Number */}
              {poNumber && (
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-gray-700 mb-1">PO Number</span>
                  <span className="text-[12px] text-[#71717A]">{poNumber}</span>
                </div>
              )}

              {/* Payment Terms */}
              {paymentTerms && (
                <div className="flex flex-col ">
                  <span className="text-[12px] font-semibold text-gray-700 mb-1">
                    Payment Terms
                  </span>
                  <span className="text-[12px] text-[#71717A]">{paymentTerms}</span>
                </div>
              )}

              {/* Contact Details */}
              {contactDetails && contactDetails.length > 0 && (
                <DropdownMenu
                  trigger={<span className="text-[12px]  font-semibold">Change Contact</span>}
                  options={contactDetails}
                  onOptionClick={onContactDetailsClick}
                  className="justify-end"
                />
              )}

              {/* Customer Notes */}
              {customerNotes && customerNotes.length > 0 && (
                <DropdownMenu
                  trigger={<span className="text-[12px] font-semibold">Change Contact</span>}
                  options={customerNotes}
                  onOptionClick={onCustomerNotesClick}
                  className="justify-start"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Order Status */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-end gap-2">
            {/* Status Badge and Order Number */}
            <div className="flex items-center gap-3">
              <Badge title={status.label} variant={status.variant} />
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-medium text-gray-900">Order #{orderNumber}</span>
              </div>
              <div className="bg-[#B75E001A] rounded-full w-[60px] h-[60px] flex justify-center items-center">
                <ShoppingCart className="w-5 h-5" color="#B75E00" />
              </div>
            </div>

            {/* Date and Actions */}
            <div className="flex items-center gap-4">
              {orderNotes && orderNotes.length > 0 && (
                <DropdownMenu
                  trigger={
                    <span className="text-[12px] font-semibold text-[#3F3F46]">Order Notes</span>
                  }
                  options={orderNotes}
                  onOptionClick={onOrderNotesClick}
                  align="end"
                />
              )}
              <span className="text-[14px] text-[#71717A]">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
