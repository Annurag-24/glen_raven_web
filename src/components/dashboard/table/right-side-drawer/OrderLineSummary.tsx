import Divider from '@/components/Divider';
import {
  RightSideDrawerAccordion,
  RightSideDrawerAccordionItem,
} from '@/components/dashboard/table/right-side-drawer';

export const OrderLineSummary = () => {
  return (
    <RightSideDrawerAccordion title="Order Line Summary" isInitiallyOpen={true}>
      <div className="flex flex-col gap-2">
        <RightSideDrawerAccordionItem label="Subtotal" value="$138.00" />
        <RightSideDrawerAccordionItem label="Shipping" value="$5.00" />
        <RightSideDrawerAccordionItem label="Tax" value="$7.00" />
        <RightSideDrawerAccordionItem label="Discounts" value="$0.00" />

        <Divider />

        <RightSideDrawerAccordionItem
          label="Total"
          value="$150.00"
          labelClassName="text-gray-700 font-bold"
          valueClassName="text-gray-700 font-bold"
        />
      </div>
    </RightSideDrawerAccordion>
  );
};
