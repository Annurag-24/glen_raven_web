import LineItem, { type LineItemData } from './LineItem';
import { cn } from '@/lib/utils';

type LineItemsListProps = {
  items: LineItemData[];
  className?: string;
};

export default function LineItemsList({ items, className }: LineItemsListProps) {
  if (items.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-sm text-gray-500">No line items found</p>
      </div>
    );
  }
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <LineItem key={item.id} item={item} />
      ))}
    </div>
  );
}
