import { useState } from 'react';
import { type ColDef } from 'ag-grid-community';
import Table from '@/components/dashboard/table/Table';
import Badge, { type BadgeVariant } from '@/components/Badge';
import Pagination from '@/components/dashboard/table/Pagination';
import OrdersRightSideDrawer from '@/components/dashboard/table/right-side-drawer/OrdersRightSideDrawer';

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'In Transit':
      return 'sky';
    case 'Delivered':
      return 'success';
    default:
      return 'default';
  }
};

const StatusCellRenderer = (props: { value: string }) => {
  return <Badge variant={getStatusVariant(props.value)} title={props.value} />;
};

const colDefs: ColDef[] = [
  { field: 'Order ID' as const, filter: true },
  { field: 'Customer ID' as const, filter: true },
  { field: 'Customer Name' as const, filter: true },
  { field: 'Preferred DC' as const, filter: true },
  { field: 'Order Total' as const, filter: true },
  { field: 'Status' as const, cellRenderer: StatusCellRenderer, filter: true },
  { field: 'Order Date' as const, filter: true },
];

const rowData = [
  {
    'Order ID': 'ORD-001',
    'Customer ID': 'CUST-001',
    'Customer Name': 'Initech',
    'Preferred DC': 'DC-01',
    'Order Total': '$1,200.00',
    Status: 'Pending',
    'Order Date': 'Nov 12, 2025 09:15 AM',
  },
  {
    'Order ID': 'ORD-002',
    'Customer ID': 'CUST-002',
    'Customer Name': 'Acme corporation',
    'Preferred DC': 'DC-02',
    'Order Total': '$850.00',
    Status: 'In Transit',
    'Order Date': 'Jan 18, 2024 02:30 PM',
  },
  {
    'Order ID': 'ORD-003',
    'Customer ID': 'CUST-003',
    'Customer Name': 'ABC textiles',
    'Preferred DC': 'DC-01',
    'Order Total': '$2,300.00',
    Status: 'Delivered',
    'Order Date': 'Jan 20, 2024 10:00 AM',
  },
];

const OrdersTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<(typeof rowData)[0] | null>(null);

  const handleRowClick = (data: (typeof rowData)[0]) => {
    setSelectedOrder(data);
    setIsDrawerOpen(true);
  };

  console.log('selectedOrder:', selectedOrder);

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

      <OrdersRightSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default OrdersTable;
