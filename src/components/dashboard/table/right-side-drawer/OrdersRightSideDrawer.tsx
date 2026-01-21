import RightSideDrawer from "@/components/dashboard/table/right-side-drawer";
import Divider from "@/components/Divider";
import { ItemCard, type ILineItem } from "./ItemCard";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerAddress } from "./CustomerAddress";
import { OrderSummary } from "./OrderSummary";

interface IOrdersRightSideDrawer {
    isOpen: boolean;
    onClose: () => void;
}

const OrdersRightSideDrawer: React.FC<IOrdersRightSideDrawer> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <RightSideDrawer isOpen={isOpen} onClose={onClose}>
                <div className="space-y-5">
                    <TotalLineItems />

                    <Divider />

                    <CustomerDetails />

                    <CustomerAddress />

                    <OrderSummary />
                </div>
            </RightSideDrawer>
        </>
    );
};

const TotalLineItems = () => {
    const items: ILineItem[] = [
        {
            trackingId: "1Z999AA10123456784",
            description: "Serge Ferrari Soltis Proof 502",
            details: "878438 Black, Size Standard Pack 43.745 Yards",
            quantity: "80.00",
            unit: "Yard",
            price: "$329.99",
            imageUrl: "https://placehold.co/68x71",
        },
        {
            trackingId: "1Z999AA10123456785",
            description: "Serge Ferrari Soltis Proof 502",
            details: "878438 Black, Size Standard Pack 43.745 Yards",
            quantity: "80.00",
            unit: "Yard",
            price: "$329.99",
            imageUrl: "https://placehold.co/68x71",
        },
        {
            trackingId: "1Z999AA10123456785",
            description: "Serge Ferrari Soltis Proof 502",
            details: "878438 Black, Size Standard Pack 43.745 Yards",
            quantity: "80.00",
            unit: "Yard",
            price: "$329.99",
            imageUrl: "https://placehold.co/68x71",
        },
    ];

    return (
        <div className="space-y-2">
            <div className="px-4 py-3 bg-gray-50 rounded-md outline-1 -outline-offset-1 outline-gray-100 flex justify-between items-center">
                <div className="justify-center text-zinc-800 text-sm font-semibold leading-3">
                    Total Line Items
                </div>
                <div className="justify-center text-tertiary text-sm font-extrabold leading-3">
                    03
                </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                {items.map((item) => (
                    <ItemCard key={item.trackingId} item={item} />
                ))}
            </div>
        </div>
    );
};

export default OrdersRightSideDrawer;
