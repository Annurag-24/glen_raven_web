import RightSideDrawer from "@/components/dashboard/table/right-side-drawer";
import Divider from "@/components/Divider";
import { ItemCard, type ILineItem } from "./ItemCard";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerAddress } from "./CustomerAddress";
import { OrderLineSummary } from "./OrderLineSummary";
import { OrderSummary } from "./OrderSummary";

interface IOrderLinesRightSideDrawer {
    isOpen: boolean;
    onClose: () => void;
}

const OrderLinesRightSideDrawer: React.FC<IOrderLinesRightSideDrawer> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <RightSideDrawer isOpen={isOpen} onClose={onClose}>
                <div className="space-y-5">
                    <OrderLineDetails />

                    <Divider />

                    <CustomerDetails />

                    <CustomerAddress />

                    <OrderLineSummary />

                    <OrderSummary />
                </div>
            </RightSideDrawer>
        </>
    );
};

const OrderLineDetails = () => {
    const item: ILineItem = {
        trackingId: "1Z999AA10123456784",
        description: "Awning Molding #555 Aluminium 90 degree 7'-6\"",
        details: "Product SKU: 295782",
        quantity: "10.00",
        unit: "Each",
        price: "$14.97",
        imageUrl: "https://placehold.co/68x71",
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-col justify-start items-start gap-2">
                <ItemCard key={item.trackingId} item={item} />
            </div>
        </div>
    );
};

export default OrderLinesRightSideDrawer;
