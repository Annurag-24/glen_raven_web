import { useState } from "react";
import SearchBar from "@/components/dashboard/table/SearchBar";
import FiltersModal from "@/components/dashboard/modals/FiltersModal";
import ExportModal from "@/components/dashboard/modals/ExportModal";
import SaveFiltersModal from "@/components/dashboard/modals/SaveFiltersModal";
import PreferencesModal from "@/components/dashboard/modals/PreferencesModal";
import type { FilterField } from "@/components/dashboard/modals/FiltersModal";
import SavedSearches from "@/components/dashboard/table/SavedSearches";
import OrdersTable from "@/components/dashboard/table/OrdersTable";

const AllOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [saveFiltersOpen, setSaveFiltersOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [savedSearches, setSavedSearches] = useState<
    Array<Record<string, string | string[]>>
  >([]);
  const [searchValue, setSearchValue] = useState("");
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

  console.log("saved searches:", savedSearches);

  const filterFields: FilterField[] = [
    {
      key: "orderId",
      label: "Order ID",
      type: "select-component",
      placeholder: "Select",
      options: [
        { value: "1", label: "ORD-001" },
        { value: "2", label: "ORD-002" },
        { value: "3", label: "ORD-003" },
      ],
    },
    {
      key: "customerId",
      label: "Customer ID",
      type: "select-component",
      placeholder: "Select",
      options: [
        { value: "1", label: "CUST-001" },
        { value: "2", label: "CUST-002" },
        { value: "3", label: "CUST-003" },
      ],
    },
    {
      key: "customerName",
      label: "Customer Name",
      type: "multiselect",
      placeholder: "Select",
      options: [
        { value: "initech", label: "Initech" },
        { value: "acme", label: "Acme corporation" },
        { value: "abc", label: "ABC textiles" },
        { value: "textiles", label: "Textiles" },
        { value: "ks", label: "KS Corporation" },
      ],
    },
    {
      key: "postalCode",
      label: "Postal Code",
      type: "input",
      placeholder: "40041",
    },
    {
      key: "status",
      label: "Status",
      type: "select-component",
      placeholder: "Select status",
      options: [
        { value: "pending", label: "Pending" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
      ],
    },
    {
      key: "orderDate",
      label: "Order Date",
      type: "date",
    },
  ];

  const preferenceItems = [
    { key: "orderId", label: "Order ID" },
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "postalCode", label: "Postal Code" },
    { key: "address", label: "Address" },
    { key: "orderTotal", label: "Order Total" },
    { key: "status", label: "Status" },
    { key: "orderDate", label: "Order Date" },
  ];

  function handlePreferencesApply(prefs: Record<string, boolean>) {
    setPreferences(prefs);
    setPreferencesOpen(false);
    console.log("Preferences applied:", prefs);
    // TODO: Save preferences to localStorage or API
  }

  const exportColumns = [
    { key: "orderId", label: "Order ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "servingDc", label: "Serving DC" },
    { key: "orderValue", label: "Order Value" },
    { key: "status", label: "Status" },
  ];
  const [exportOpen, setExportOpen] = useState(false);

  function handleFilterApply(values: Record<string, string | string[]>) {
    setFilters(values);
    setFilterOpen(false);
    console.log("Filters applied:", values);
    // TODO: Apply filters to table/API call
  }

  const filtersApplied = Object.values(filters).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && String(v) !== "";
  });

  function handleClearSearch() {
    setFilters({});
    console.log("Cleared filters");
  }

  function handleSaveSearch() {
    setSaveFiltersOpen(true);
  }

  function handleSaveFilterName(filterName: string) {
    setSavedSearches((s) => [...s, { ...filters, name: filterName }]);
    console.log("Saved search with name:", filterName, "Filters:", filters);
  }

  function handleDeleteSearch() {
    setSavedSearches((s) => {
      if (s.length === 0) return s;
      const next = s.slice(0, -1);
      console.log("Deleted saved search, remaining:", next);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search orders"
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
        title="All Orders"
        savedSearches={[
          "Saved Search 1",
          "Saved Search 2",
          "Saved Search 3",
          "Saved Search 4",
          "Saved Search 5",
          "Saved Search 6",
          "Saved Search 7",
          "Saved Search 8",
          "Saved Search 9",
          "Saved Search 10",
          "Saved Search 11",
          "Saved Search 12",
          "Saved Search 13",
          "Saved Search 14",
          "Saved Search 15",
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
          console.log("Export requested:", format, selected);
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

      <OrdersTable />

      {/* FIGMA UI CODE */}
      {/* <div className="self-stretch p-4 bg-Natural-White rounded-md inline-flex flex-col justify-start items-center gap-8">
        <div className="self-stretch pb-2 border-b border-Grey-100 inline-flex justify-between items-center">
          <div className="w-20 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Order ID
          </div>
          <div className="w-20 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Customer ID
          </div>
          <div className="w-44 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Customer Name
          </div>
          <div className="w-28 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Preferred DC
          </div>
          <div className="w-24 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Order Total
          </div>
          <div className="w-24 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Status
          </div>
          <div className="w-36 justify-center text-Grey-500 text-xs font-bold font-['Inter']">
            Order Date
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <div className="self-stretch h-10 py-2 border-b border-Grey-100 inline-flex justify-between items-center">
            <div className="w-20 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              #295782
            </div>
            <div className="w-20 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              123457
            </div>
            <div className="w-44 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Initech
            </div>
            <div className="w-28 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Dallas DC
            </div>
            <div className="w-24 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              $350.75
            </div>
            <div className="w-24 inline-flex flex-col justify-start items-start gap-2.5">
              <div
                data-property-1="Pending"
                className="px-3 py-1 bg-yellow-400/20 rounded-[60px] inline-flex justify-start items-start"
              >
                <div className="text-center justify-center text-Accent-600 text-xs font-semibold font-['Inter']">
                  Pending
                </div>
              </div>
            </div>
            <div className="w-36 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Nov 12, 2025 09:15 AM
            </div>
          </div>
          <div className="self-stretch h-10 py-2 border-b border-Grey-100 inline-flex justify-between items-center">
            <div className="w-20 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              #295783
            </div>
            <div className="w-20 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              123458
            </div>
            <div className="w-44 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Hooli
            </div>
            <div className="w-28 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Dallas DC
            </div>
            <div className="w-24 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              $450.00
            </div>
            <div className="w-24 inline-flex flex-col justify-start items-start gap-2.5">
              <div
                data-property-1="In transit"
                className="px-3 py-1 bg-blue-500/20 rounded-[60px] inline-flex justify-start items-start"
              >
                <div className="text-center justify-center text-Blue-600 text-xs font-semibold font-['Inter']">
                  In Transit
                </div>
              </div>
            </div>
            <div className="w-36 justify-center text-Grey-500 text-xs font-normal font-['Inter']">
              Nov 12, 2025 09:15 AM
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AllOrders;
