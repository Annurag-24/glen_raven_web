import RightSideDrawer, {
  RightSideDrawerCard,
  RightSideDrawerCardLabel,
  RightSideDrawerCardValue,
} from "@/components/dashboard/table/right-side-drawer";
import DetailsIcon from "@/assets/icons/list.svg";
import ContactsIcon from "@/assets/icons/person.svg";
import ArrowIcon from "@/assets/icons/arrow-angle-up.svg";
import { Link } from "react-router";

interface ICustomersRightSideDrawer {
  isOpen: boolean;
  onClose: () => void;
}

const CustomersRightSideDrawer: React.FC<ICustomersRightSideDrawer> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <RightSideDrawer isOpen={isOpen} onClose={onClose}>
        <div className="space-y-5">
          <Details />
          <Contacts />
        </div>
      </RightSideDrawer>
    </>
  );
};

const Details = () => {
  const details = [
    {
      label: "Billing Address",
      value: "123 billing New York , NY",
    },
    {
      label: "Shipping Address",
      value: "465 Avenue New York , NY",
    },
    {
      label: "Email ID",
      value: "acme2343@gmail.com",
    },
  ];

  return (
    <RightSideDrawerCard
      title="Details"
      icon={DetailsIcon}
      iconBgColor="bg-indigo-100"
    >
      <div className="w-full flex flex-col gap-4">
        {details.map((detail) => (
          <div className="w-full flex flex-col gap-1" key={detail.label}>
            <RightSideDrawerCardLabel>{detail.label}</RightSideDrawerCardLabel>
            <div className="w-full flex items-center">
              <RightSideDrawerCardValue>
                {detail.value}
              </RightSideDrawerCardValue>
            </div>
          </div>
        ))}
      </div>
    </RightSideDrawerCard>
  );
};

const Contacts = () => {
  const contacts = [
    {
      label: "Anya Sharma",
      value: "anyasharma5236@gmail.com",
      subLabel: "AP",
      href: "#",
    },
    {
      label: "Eliza Sommers",
      value: "eliza.sommers84@gmail.com",
      subLabel: "AP",
      href: "#",
    },
    {
      label: "Jean Valjean",
      value: "jean.valjean44@gmail.com",
      subLabel: "AP",
      href: "#",
    },
    {
      label: "Ricardo Aranda",
      value: "ricardo.aranda@gmail.com",
      subLabel: "AP",
      href: "#",
    },
    {
      label: "Lisbeth Salander",
      value: "lisbeth.salander@protonmail.com",
      subLabel: "Regular",
      href: "#",
    },
  ];

  return (
    <RightSideDrawerCard
      title="Contacts"
      icon={ContactsIcon}
      iconBgColor="bg-yellow-100"
    >
      <div className="w-full flex flex-col gap-4">
        {contacts.map((contact) => (
          <div className="w-full flex flex-col gap-1" key={contact.label}>
            <RightSideDrawerCardLabel>
              {contact.label} <span>{contact.subLabel}</span>
            </RightSideDrawerCardLabel>
            <div className="w-full flex items-center justify-between">
              <RightSideDrawerCardValue>
                {contact.value}
              </RightSideDrawerCardValue>
              <Link to={contact.href}>
                <img src={ArrowIcon} alt="Arrow Icon" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </RightSideDrawerCard>
  );
};

export default CustomersRightSideDrawer;
