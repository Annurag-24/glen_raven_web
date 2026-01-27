import React from "react";
import Badge, { type BadgeVariant } from "@/components/Badge";
import DropdownMenu, { type DropdownOption } from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";
import HugeiconsContactIcon from "@/assets/icons/hugeicons_contact.svg";

export type CustomerTag = {
    label: string;
    variant?: BadgeVariant;
};

export interface OrderHeaderLeftProps {
    customerName: string;
    customerTags?: CustomerTag[];
    poNumber?: string;
    paymentTerms?: string;
    contactDetails?: DropdownOption[];
    customerNotes?: DropdownOption[];
    changeContact?: DropdownOption[];
    onContactDetailsClick?: (option: DropdownOption) => void;
    onCustomerNotesClick?: (option: DropdownOption) => void;
    onChangeContact?: (option: DropdownOption) => void;
    className?: string;
}

const OrderUserInfo: React.FC<OrderHeaderLeftProps> = ({
    customerName,
    customerTags = [],
    poNumber,
    paymentTerms,
    contactDetails,
    customerNotes,
    changeContact,
    onContactDetailsClick,
    onCustomerNotesClick,
    onChangeContact,
    className,
}) => {
    return (
        <div className={cn("flex-1 flex items-start gap-4 ", className)}>
            <div className="shrink-0 w-[60px] h-[60px] rounded-full bg-[#4F6BED]/10 flex items-center justify-center">
                <img src={HugeiconsContactIcon} className="w-[32.66666603088379px] h-[32.666671752929688px]" alt="" />
            </div>

            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                    <h2 className="text-[18px] font-semibold text-gray-900">{customerName}</h2>
                    {customerTags.map((tag, index) => (
                        <Badge
                            className="py-[6.5px] px-[7.5px]"
                            key={index}
                            title={tag.label}
                            variant={tag.variant || "default"}
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

                <div className="flex items-start gap-6 flex-wrap">
                    {poNumber && (
                        <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-gray-700 mb-1">PO Number</span>
                            <span className="text-[12px] text-[#71717A]">{poNumber}</span>
                        </div>
                    )}
                    {paymentTerms && (
                        <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-gray-700 mb-1">Payment Terms</span>
                            <span className="text-[12px] text-[#71717A]">{paymentTerms}</span>
                        </div>
                    )}
                    {contactDetails && contactDetails.length > 0 && (
                        <DropdownMenu
                            trigger={<span className="text-[12px] font-semibold">Change Contact</span>}
                            options={contactDetails}
                            onOptionClick={onContactDetailsClick}
                            className="justify-end"
                        />
                    )}
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
    );
};

export default OrderUserInfo;
