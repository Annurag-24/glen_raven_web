import { useState } from 'react';
import { type ColDef } from 'ag-grid-community';
import Table from '@/components/dashboard/table/Table';
import Badge, { type BadgeVariant } from '@/components/Badge';
import Pagination from '@/components/dashboard/table/Pagination';
import OrderLinesRightSideDrawer from '@/components/dashboard/table/right-side-drawer/OrderLinesRightSideDrawer';

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case 'Included In Shipment':
      return 'included';
    case 'Pending':
      return 'warning';
    case 'Shipped':
      return 'sky';
    default:
      return 'default';
  }
};

const StatusCellRenderer = (props: { value: string }) => {
  return <Badge variant={getStatusVariant(props.value)} title={props.value} />;
};

const colDefs: ColDef[] = [
  { field: 'Product ID' as const, filter: true },
  { field: 'Product' as const, filter: true },
  { field: 'Order ID' as const, filter: true },
  { field: 'Order Date' as const, filter: true },
  { field: 'Quantity' as const, filter: true },
  { field: 'Line Total' as const, filter: true },
  { field: 'Fulfillment Method' as const, filter: true },
  { field: 'Ship Node' as const, filter: true },
  {
    field: 'Status' as const,
    cellRenderer: StatusCellRenderer,
    filter: true,
  },
];

const rowData = [
  {
    'Product ID': '295782',
    Product: 'Awning Molding #555 Aluminium 90 degree 7\'-6"',
    'Order ID': '295782',
    'Order Date': 'Nov 12, 2025 09:15 AM',
    Quantity: '10.00 Each',
    'Line Total': '$14.97',
    'Fulfillment Method': 'Shipping',
    'Ship Node': 'Dallas DC',
    Status: 'Included In Shipment',
  },
  {
    'Product ID': '295783',
    Product: 'Awning Molding #555 Aluminium 90 degree 7\'-6"',
    'Order ID': '295783',
    'Order Date': 'Nov 12, 2025 09:15 AM',
    Quantity: '10.00 Each',
    'Line Total': '$14.97',
    'Fulfillment Method': 'Shipping',
    'Ship Node': 'Dallas DC',
    Status: 'Included In Shipment',
  },
  {
    'Product ID': '95784',
    Product: 'Awning Molding #555 Aluminium 90 degree 7\'-6"',
    'Order ID': '95784',
    'Order Date': 'Nov 12, 2025 09:15 AM',
    Quantity: '10.00 Each',
    'Line Total': '$14.97',
    'Fulfillment Method': 'Shipping',
    'Ship Node': 'Dallas DC',
    Status: 'Included In Shipment',
  },
];

const OrderLinesTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrderLine, setSelectedOrderLine] = useState<(typeof rowData)[0] | null>(null);

  const handleRowClick = (data: (typeof rowData)[0]) => {
    setSelectedOrderLine(data);
    setIsDrawerOpen(true);
    console.log('Selected order line:', data);
  };

  console.log('selectedOrderLine: ', selectedOrderLine);

  return (
    <div className="p-4 bg-white rounded-lg">
      <Table
        rowData={rowData}
        columnDefs={colDefs}
        onRowClicked={(event) => handleRowClick(event.data)}
      />

      <div className="mt-5">
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>

      <OrderLinesRightSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default OrderLinesTable;
