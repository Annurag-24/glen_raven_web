import RightSideDrawer, {
  RightSideDrawerAccordion,
  RightSideDrawerAccordionItem,
} from "@/components/dashboard/table/right-side-drawer";
import Divider from "@/components/Divider";
import { Input } from "@/components/ui/input";

interface ILineItem {
  trackingId: string;
  description: string;
  details: string;
  quantity: string;
  unit: string;
  price: string;
  imageUrl: string;
}

interface IOrdersRightSideDrawer {
  isOpen: boolean;
  onClose: () => void;
}

interface IItemCardProps {
  item: ILineItem;
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

const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
  return (
    <div className="w-full p-2.5 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-200 flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <img
          className="w-20 h-20 rounded-lg shrink-0"
          src={item.imageUrl}
          alt={item.description}
        />
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-gray-800 text-sm font-semibold leading-5">
              Tracking ID:{" "}
            </span>
            <span className="text-tertiary text-sm font-semibold leading-5">
              {item.trackingId}
            </span>
          </div>
          <div className="text-gray-800 text-xs font-medium leading-5">
            {item.description}
          </div>
          <div className="text-gray-500 text-xs font-medium leading-4">
            {item.details}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 text-xs font-normal">Qty.</span>
          <Input
            value={item.quantity}
            className="w-16 h-7 px-3 py-1.5 rounded outline-[0.30px] outline-offset-[-0.30px] outline-gray-500 flex justify-center items-center text-gray-500 text-xs! font-normal disabled:opacity-70"
            disabled
          />
          <span className="text-gray-500 text-xs font-normal">{item.unit}</span>
        </div>
        <div className="text-gray-800 text-xs font-semibold leading-5">
          {item.price}
        </div>
      </div>
    </div>
  );
};

const CustomerDetails = () => {
  return (
    <RightSideDrawerAccordion title="Customer Details">
      <div className="flex flex-col gap-2">
        <RightSideDrawerAccordionItem label="Email" value="example@gmail.com" />
        <RightSideDrawerAccordionItem
          label="Phone No."
          value="+23 767-876-6543"
        />
      </div>
    </RightSideDrawerAccordion>
  );
};

const CustomerAddress = () => {
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

const OrderSummary = () => {
  return (
    <RightSideDrawerAccordion title="Order Summary" isInitiallyOpen={true}>
      <div className="flex flex-col gap-2">
        <RightSideDrawerAccordionItem label="Subtotal" value="$138.00" />
        <RightSideDrawerAccordionItem label="Shipping" value="$5.00" />
        <RightSideDrawerAccordionItem label="Tax" value="$7.00" />
        <RightSideDrawerAccordionItem label="Discounts" value="$0.00" />

        <Divider />

        <RightSideDrawerAccordionItem
          label="Total"
          value="$150.00"
          labelClassName="text-tertiary font-bold"
          valueClassName="text-tertiary font-bold"
        />
      </div>
    </RightSideDrawerAccordion>
  );
};

export default OrdersRightSideDrawer;
