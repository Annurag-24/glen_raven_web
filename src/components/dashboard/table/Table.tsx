import {
  AllCommunityModule,
  ModuleRegistry,
  type CellClickedEvent,
  type ColDef,
  type RowClickedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps {
  rowData: Array<Record<string, unknown>>;
  columnDefs: ColDef[];
  onRowClicked?: (event: RowClickedEvent) => void;
  onCellClicked?: (event: CellClickedEvent) => void;
}

const Table: React.FC<TableProps> = ({ rowData, columnDefs, onRowClicked, onCellClicked }) => {
  return (
    <div className="ag-theme-alpine w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowHeight={40}
        headerHeight={40}
        domLayout="autoHeight"
        onRowClicked={onRowClicked}
        onCellClicked={onCellClicked}
      />

      <style>{`
        .ag-theme-alpine {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #ffffff;
          --ag-odd-row-background-color: #ffffff;
          --ag-row-hover-color: #f1f5f9;
          --ag-foreground-color: #71717A;
          --ag-font-size: 14px;
          --ag-font-family: Inter, sans-serif;
          --ag-borders: none;
          --ag-row-border-width: 0px;
          --ag-cell-horizontal-border: none;
        }
        .ag-theme-alpine .ag-root-wrapper {
          border: none;
        }
        .ag-theme-alpine .ag-header {
        }
        .ag-theme-alpine .ag-row {
        }
        .ag-theme-alpine .ag-cell {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Table;
