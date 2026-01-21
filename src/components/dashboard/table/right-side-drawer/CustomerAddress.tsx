import {
    RightSideDrawerAccordion,
    RightSideDrawerAccordionItem,
} from "@/components/dashboard/table/right-side-drawer";

export const CustomerAddress = () => {
    return (
        <RightSideDrawerAccordion title="Customer Address">
            <div className="flex flex-col gap-2">
                <RightSideDrawerAccordionItem
                    label="Ship To"
                    value="456 shipping Avenue, San Francisco, CA"
                />
                <RightSideDrawerAccordionItem
                    label="Bill To"
                    value="789 delivery Road, Seattle, WA"
                />
                <RightSideDrawerAccordionItem
                    label="Sold To"
                    value="321 main Street, Austin, TX"
                />
            </div>
        </RightSideDrawerAccordion>
    );
};
