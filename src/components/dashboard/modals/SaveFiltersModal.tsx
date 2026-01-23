import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (filterName: string) => void;
  onCancel?: () => void;
  title?: string;
};

export default function SaveFiltersModal({
  open,
  onClose,
  onSave,
  onCancel,
  title = 'Save Filter',
}: Props) {
  const [filterName, setFilterName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset filter name when modal opens - state during render pattern
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setFilterName('');
    }
  }

  // Focus input when modal opens - this is a legitimate use of useEffect
  // because we're synchronizing with the DOM (external system)
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  function handleSave() {
    if (filterName.trim()) {
      onSave(filterName.trim());
      setFilterName('');
    }
  }

  const content = (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Name Saved Search</label>
      <input
        ref={inputRef}
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Type"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && filterName.trim()) {
            handleSave();
          }
        }}
        className="mt-1 block w-full rounded-sm border border-[#E0E0E0] bg-white py-2 px-3 text-sm text-[#242424] placeholder-[#707070] focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      title={title}
      showFooter
      confirmText="Save"
      cancelText="Cancel"
      confirmDisabled={!filterName.trim()}
      onConfirm={handleSave}
    >
      {content}
    </Modal>
  );
}
