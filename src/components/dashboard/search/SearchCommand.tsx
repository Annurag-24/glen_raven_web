import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Search from '@/components/dashboard/search/Search';

export type SearchItem = {
  id?: string | number;
  [key: string]: unknown;
};

type Props<T extends SearchItem> = {
  items: T[];
  CardComponent: React.ComponentType<{
    item: T;
    onClick?: (item: T) => void;
    searchQuery?: string;
  }>;
  onSelect: (item: T) => void;
  filterFn: (item: T, searchQuery: string) => boolean;
  placeholder?: string;
  title?: string;
  emptyMessage?: string;
  groupHeading?: string;
};

export default function SearchCommand<T extends SearchItem>({
  items,
  CardComponent,
  onSelect,
  filterFn,
  placeholder = 'Search...',
  title = 'Search',
  emptyMessage = 'Start typing to search...',
  groupHeading = 'Suggested',
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Compute filtered results directly - no need for useEffect
  const filtered = useMemo(() => {
    if (!search.trim()) return [];
    return items.filter((item) => filterFn(item, search));
  }, [search, items, filterFn]);

  // Sync open state with filtered results - state during render pattern
  const shouldBeOpen = filtered.length > 0 && search.trim().length > 0;
  if (open !== shouldBeOpen && search.trim()) {
    setOpen(shouldBeOpen);
  } else if (open && !search.trim()) {
    setOpen(false);
  }

  useEffect(() => {
    if (triggerRef.current) {
      // Subtract search button width (64px) and gap (12px)
      setWidth(triggerRef.current.offsetWidth - 76);
    }

    const handleResize = () => {
      if (triggerRef.current) {
        // Subtract search button width (64px) and gap (12px)
        setWidth(triggerRef.current.offsetWidth - 76);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={(e) => e.preventDefault()}>
        <div ref={triggerRef} className="w-full">
          <Search
            placeholder={placeholder}
            defaultValue={search}
            title={title}
            onChange={(value) => setSearch(value)}
            onSearch={(value) => {
              console.log('Search submitted:', value);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 border-0 shadow-lg"
        style={{ width: `${width}px` }}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command className="rounded-lg border">
          <CommandList className="max-h-[600px]">
            <CommandEmpty>{search ? `No results found.` : emptyMessage}</CommandEmpty>
            {filtered.length > 0 && (
              <CommandGroup heading={groupHeading} className="p-3">
                {filtered.map((item, index) => (
                  <CommandItem
                    key={item.id}
                    value={item.id?.toString()}
                    onSelect={() => {
                      onSelect(item);
                      setOpen(false);
                      setSearch('');
                    }}
                    className={`cursor-pointer !bg-transparent hover:!bg-transparent rounded-none ${
                      index < filtered.length - 1 ? 'border-b border-[#868686]' : ''
                    }`}
                  >
                    <div className="w-full py-2">
                      <CardComponent item={item} onClick={() => {}} searchQuery={search} />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
