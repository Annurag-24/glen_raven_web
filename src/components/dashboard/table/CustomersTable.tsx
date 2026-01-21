import { useState } from "react";
import { type CellClickedEvent, type ColDef } from "ag-grid-community";
import Table from "@/components/dashboard/table/Table";
import Pagination from "@/components/dashboard/table/Pagination";
import CustomersRightSideDrawer from "@/components/dashboard/table/right-side-drawer/CustomersRightSideDrawer";

const colDefs: ColDef[] = [
  { field: "Customer ID" as const, filter: true, cellClass: "text-tertiary" },
  { field: "Organization" as const, filter: true },
  { field: "Phone" as const, filter: true },
  { field: "Email ID" as const, filter: true, width: 300 },
  { field: "Address" as const, filter: true, width: 300 },
];

const rowData = [
  {
    "Customer ID": "#123782",
    Organization: "Acme Corp",
    Phone: "(123) 456-7890",
    "Email ID": "acme123@example.com",
    Address: "123 Main St, Springfield, IL",
  },
  {
    "Customer ID": "#987654",
    Organization: "Globex Inc",
    Phone: "(987) 654-3210",
    "Email ID": "globex987@example.com",
    Address: "456 Elm St, Metropolis, NY",
  },
  {
    "Customer ID": "#456321",
    Organization: "Initech",
    Phone: "(456) 321-6540",
    "Email ID": "initech456@example.com",
    Address: "789 Oak St, Gotham, NJ",
  },
];

const CustomersTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof rowData)[0] | null
  >(null);

  const handleCellClick = (event: CellClickedEvent) => {
    const clickedColumn = event.colDef?.field;

    if (clickedColumn === "Customer ID") {
      // Do something different when Customer ID is clicked
      console.log("Customer ID clicked:", event.data["Customer ID"]);
      // You can add your custom logic here
    } else {
      // Open drawer for other columns
      setSelectedOrder(event.data);
      setIsDrawerOpen(true);
    }
  };

  console.log("selectedOrder:", selectedOrder);

  return (
    <div className="p-4 bg-white rounded-lg">
      <Table
        rowData={rowData}
        columnDefs={colDefs}
        onCellClicked={handleCellClick}
      />

      <div className="mt-5">
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => console.log("Page changed to:", page)}
        />
      </div>

      <CustomersRightSideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default CustomersTable;
