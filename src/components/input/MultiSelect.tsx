import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

export type MultiSelectOption = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  showSearch?: boolean;
  showSelectAll?: boolean;
  isOpen?: boolean;
  disabled?: boolean;
  className?: string;
  maxHeight?: string;
};

export default function MultiSelect({
  label,
  placeholder = 'Select options',
  options,
  value,
  defaultValue = [],
  onChange,
  showSearch = true,
  showSelectAll = true,
  isOpen: controlledOpen,
  disabled = false,
  className = '',
  maxHeight = 'max-h-64',
}: MultiSelectProps) {
  const isControlled = typeof value !== 'undefined';
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state with defaultValue changes - state during render pattern
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
  if (!isControlled && defaultValue !== prevDefaultValue && Array.isArray(defaultValue)) {
    setPrevDefaultValue(defaultValue);
    setInternal(defaultValue);
  }

  const selected = isControlled ? (value as string[]) : internal;
  const displayOpen = typeof controlledOpen !== 'undefined' ? controlledOpen : open;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (displayOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [displayOpen]);

  function handleChange(optionValue: string) {
    let newSelected: string[];
    if (selected.includes(optionValue)) {
      newSelected = selected.filter((v) => v !== optionValue);
    } else {
      newSelected = [...selected, optionValue];
    }

    if (!isControlled) setInternal(newSelected);
    onChange?.(newSelected);
  }

  function handleSelectAll() {
    const allValues = options.map((o) => o.value);
    const newSelected = selected.length === options.length ? [] : allValues;

    if (!isControlled) setInternal(newSelected);
    onChange?.(newSelected);
  }

  function handleRemove(optionValue: string) {
    const newSelected = selected.filter((v) => v !== optionValue);
    if (!isControlled) setInternal(newSelected);
    onChange?.(newSelected);
  }

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabels = options.filter((o) => selected.includes(o.value)).map((o) => o.label);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!displayOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-[#E0E0E0] rounded-sm text-sm hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(options.find((o) => o.label === label)?.value || '');
                  }}
                  className="hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-[#707070]">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#616161] transition-transform ${
            displayOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {displayOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#E0E0E0] rounded-md shadow-lg">
          {showSearch && (
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 text-sm border border-[#E0E0E0] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className={`overflow-y-auto ${maxHeight}`}>
            {showSelectAll && (
              <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={selected.length === options.length && options.length > 0}
                  onChange={handleSelectAll}
                  style={{ accentColor: 'var(--tertiary)' }}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Select All</span>
              </label>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                    style={{ accentColor: '#036fed' }}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
