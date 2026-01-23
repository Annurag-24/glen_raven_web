import {
  RightSideDrawerAccordion,
  RightSideDrawerAccordionItem,
} from '@/components/dashboard/table/right-side-drawer';

export const CustomerDetails = () => {
  return (
    <RightSideDrawerAccordion title="Customer Details">
      <div className="flex flex-col gap-2">
        <RightSideDrawerAccordionItem label="Email" value="example@gmail.com" />
        <RightSideDrawerAccordionItem label="Phone No." value="+23 767-876-6543" />
      </div>
    </RightSideDrawerAccordion>
  );
};
