import createOrderIcon from "@/assets/icons/create-order-tertiary.svg";
import searchProductIcon from "@/assets/icons/search-order-tertiary.svg";
import createBusinessIcon from "@/assets/icons/create-business-tertiary.svg";
import customersIcon from "@/assets/icons/search-business-tertiary.svg";
import createReturnIcon from "@/assets/icons/returns-tertiary.svg";
import returnsIcon from "@/assets/icons/returns-tertiary.svg";
import trackShipmentIcon from "@/assets/icons/track-shipment-tertiary.svg";

import QuickActions from "@/components/dashboard/QuickActions";
import SearchCommand from "@/components/dashboard/search/SearchCommand";
import OrderCard from "@/components/dashboard/search-cards/OrderCard";
import CustomerCard from "@/components/dashboard/search-cards/CustomerCard";

import CallCenterPersona from "@/pages/dashboard/home/personas/CallCenter";
import InventoryPersona from "@/pages/dashboard/home/personas/Inventory";
import ItTeamPersona from "@/pages/dashboard/home/personas/ItTeam";
import PlanningPersona from "@/pages/dashboard/home/personas/Planning";
import CreditPersona from "@/pages/dashboard/home/personas/Credit";
import InsideSalesPersona from "@/pages/dashboard/home/personas/InsideSales";

const quickItems = [
    {
        name: "Create Order",
        icon: createOrderIcon,
        onClick: () => console.log("Create Order"),
    },
    {
        name: "Search Order",
        icon: searchProductIcon,
        onClick: () => console.log("Search Order"),
    },
    {
        name: "Create Business",
        icon: createBusinessIcon,
        onClick: () => console.log("Create Business"),
    },
    {
        name: "Search Business",
        icon: customersIcon,
        onClick: () => console.log("Search Business"),
    },
    {
        name: "Create Return",
        icon: createReturnIcon,
        onClick: () => console.log("Create Return"),
    },
    {
        name: "Manage Return",
        icon: returnsIcon,
        onClick: () => console.log("Manage Return"),
    },
    {
        name: "Track Shipment",
        icon: trackShipmentIcon,
        onClick: () => console.log("Track Shipment"),
    },
];

const Home = () => {
    // Dummy order data
    const dummyOrders = [
        {
            id: "12232345",
            orderNumber: "12232345",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
        {
            id: "12232346",
            orderNumber: "12232346",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
        {
            id: "12232347",
            orderNumber: "12232347",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
        {
            id: "12232345",
            orderNumber: "12232345",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
        {
            id: "12232346",
            orderNumber: "12232346",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
        {
            id: "12232347",
            orderNumber: "12232347",
            date: "12/12/2002",
            customerId: "1232345",
            companyName: "Acme Corporation",
            phone: "+657-656-8676",
            contactName: "Anya Sharma",
            email: "test@gmail.com",
        },
    ];

    // Dummy customer data
    const dummyCustomers = [
        {
            id: "cust-001",
            customerId: "1232345",
            companyName: "Acme Corporation",
            contactName: "Anya Sharma",
            email: "anya@acme.com",
            phone: "+657-656-8676",
            address: "123 Business St, NYC",
        },
        {
            id: "cust-002",
            customerId: "1232346",
            companyName: "Global Tech Inc",
            contactName: "John Smith",
            email: "john@globaltech.com",
            phone: "+657-656-8677",
            address: "456 Tech Ave, SF",
        },
        {
            id: "cust-003",
            customerId: "1232347",
            companyName: "Innovation Labs",
            contactName: "Sarah Johnson",
            email: "sarah@innovationlabs.com",
            phone: "+657-656-8678",
            address: "789 Innovation Dr, Boston",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                <div className="relative">
                    <SearchCommand
                        items={dummyOrders}
                        CardComponent={OrderCard}
                        onSelect={(order) => {
                            console.log("Selected order:", order);
                        }}
                        filterFn={(order, search) =>
                            order.orderNumber?.toString().includes(search) ??
                            false
                        }
                        placeholder="Search orders by Order ID..."
                        title="Order Search"
                        emptyMessage="Start typing to search..."
                        groupHeading="Suggested"
                    />
                </div>

                <div className="relative">
                    <SearchCommand
                        items={dummyCustomers}
                        CardComponent={CustomerCard}
                        onSelect={(customer) => {
                            console.log("Selected customer:", customer);
                        }}
                        filterFn={(customer, search) => {
                            const lowerSearch = search.toLowerCase();
                            return (
                                (customer.companyName
                                    ?.toLowerCase()
                                    .includes(lowerSearch) ??
                                    false) ||
                                (customer.contactName
                                    ?.toLowerCase()
                                    .includes(lowerSearch) ??
                                    false) ||
                                (customer.email
                                    ?.toLowerCase()
                                    .includes(lowerSearch) ??
                                    false) ||
                                (customer.phone
                                    ?.toLowerCase()
                                    .includes(lowerSearch) ??
                                    false) ||
                                (customer.customerId
                                    ?.toString()
                                    .includes(search) ??
                                    false)
                            );
                        }}
                        placeholder="Enter name, email, phone..."
                        title="Customer Search"
                        emptyMessage="Start typing to search..."
                        groupHeading="Suggested"
                    />
                </div>
            </div>

            <QuickActions items={quickItems} />

            {/* Call Center Persona */}
            <CallCenterPersona />

            {/* Inventory Persona */}
            <InventoryPersona />

            {/* IT Team Persona */}
            <ItTeamPersona />

            {/* Planning Persona */}
            <PlanningPersona />

            {/* Credit Persona */}
            <CreditPersona />

            {/* Inside Sales Persona */}
            <InsideSalesPersona />
        </div>
    );
};

export default Home;
