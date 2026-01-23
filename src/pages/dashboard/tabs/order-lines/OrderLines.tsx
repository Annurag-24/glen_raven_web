import { useState } from 'react';
import SearchBar from '@/components/dashboard/table/SearchBar';
import FiltersModal from '@/components/dashboard/modals/FiltersModal';
import ExportModal from '@/components/dashboard/modals/ExportModal';
import SaveFiltersModal from '@/components/dashboard/modals/SaveFiltersModal';
import PreferencesModal from '@/components/dashboard/modals/PreferencesModal';
import type { FilterField } from '@/components/dashboard/modals/FiltersModal';
import SavedSearches from '@/components/dashboard/table/SavedSearches';
import OrderLinesTable from '@/components/dashboard/table/OrderLinesTable';

const OrderLines = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [saveFiltersOpen, setSaveFiltersOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [savedSearches, setSavedSearches] = useState<Array<Record<string, string | string[]>>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    orderId: true,
    customerId: false,
    customerName: false,
    postalCode: false,
    address: false,
    orderTotal: false,
    status: false,
    orderDate: false,
  });

  console.log('saved searches:', savedSearches);

  const filterFields: FilterField[] = [
    {
      key: 'orderId',
      label: 'Order ID',
      type: 'select-component',
      placeholder: 'Select',
      options: [
        { value: '1', label: 'ORD-001' },
        { value: '2', label: 'ORD-002' },
        { value: '3', label: 'ORD-003' },
      ],
    },
    {
      key: 'customerId',
      label: 'Customer ID',
      type: 'select-component',
      placeholder: 'Select',
      options: [
        { value: '1', label: 'CUST-001' },
        { value: '2', label: 'CUST-002' },
        { value: '3', label: 'CUST-003' },
      ],
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      type: 'multiselect',
      placeholder: 'Select',
      options: [
        { value: 'initech', label: 'Initech' },
        { value: 'acme', label: 'Acme corporation' },
        { value: 'abc', label: 'ABC textiles' },
        { value: 'textiles', label: 'Textiles' },
        { value: 'ks', label: 'KS Corporation' },
      ],
    },
    {
      key: 'postalCode',
      label: 'Postal Code',
      type: 'input',
      placeholder: '40041',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select-component',
      placeholder: 'Select status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
      ],
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      type: 'date',
    },
  ];

  const preferenceItems = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'customerId', label: 'Customer ID' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'postalCode', label: 'Postal Code' },
    { key: 'address', label: 'Address' },
    { key: 'orderTotal', label: 'Order Total' },
    { key: 'status', label: 'Status' },
    { key: 'orderDate', label: 'Order Date' },
  ];

  function handlePreferencesApply(prefs: Record<string, boolean>) {
    setPreferences(prefs);
    setPreferencesOpen(false);
    console.log('Preferences applied:', prefs);
    // TODO: Save preferences to localStorage or API
  }

  const exportColumns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'servingDc', label: 'Serving DC' },
    { key: 'orderValue', label: 'Order Value' },
    { key: 'status', label: 'Status' },
  ];
  const [exportOpen, setExportOpen] = useState(false);

  function handleFilterApply(values: Record<string, string | string[]>) {
    setFilters(values);
    setFilterOpen(false);
    console.log('Filters applied:', values);
    // TODO: Apply filters to table/API call
  }

  const filtersApplied = Object.values(filters).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && String(v) !== '';
  });

  function handleClearSearch() {
    setFilters({});
    console.log('Cleared filters');
  }

  function handleSaveSearch() {
    setSaveFiltersOpen(true);
  }

  function handleSaveFilterName(filterName: string) {
    setSavedSearches((s) => [...s, { ...filters, name: filterName }]);
    console.log('Saved search with name:', filterName, 'Filters:', filters);
  }

  function handleDeleteSearch() {
    setSavedSearches((s) => {
      if (s.length === 0) return s;
      const next = s.slice(0, -1);
      console.log('Deleted saved search, remaining:', next);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search"
        value={searchValue}
        onChange={setSearchValue}
        onFilter={() => setFilterOpen(true)}
        onSettings={() => setPreferencesOpen(true)}
        showRefresh
        showFilter
        showSettings
        showExport
        filtersApplied={filtersApplied}
        onClearSearch={handleClearSearch}
        onSaveSearch={handleSaveSearch}
        onDeleteSearch={handleDeleteSearch}
        onExport={() => setExportOpen(true)}
      />

      <SavedSearches
        title="Order Lines"
        savedSearches={[
          'Saved Search 1',
          'Saved Search 2',
          'Saved Search 3',
          'Saved Search 4',
          'Saved Search 5',
          'Saved Search 6',
          'Saved Search 7',
          'Saved Search 8',
          'Saved Search 9',
          'Saved Search 10',
          'Saved Search 11',
          'Saved Search 12',
          'Saved Search 13',
          'Saved Search 14',
          'Saved Search 15',
        ]}
      />
      <FiltersModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        fields={filterFields}
        initialValues={filters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        columns={exportColumns}
        onExport={(format, selected) => {
          console.log('Export requested:', format, selected);
          // TODO: implement export functionality (API or client-side)
        }}
      />

      <SaveFiltersModal
        open={saveFiltersOpen}
        onClose={() => setSaveFiltersOpen(false)}
        onSave={handleSaveFilterName}
      />

      <PreferencesModal
        open={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        items={preferenceItems}
        initialPreferences={preferences}
        onApply={handlePreferencesApply}
      />

      <OrderLinesTable />
    </div>
  );
};

export default OrderLines;
