import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ISearchTabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface IArrowButtonProps {
  icon: string;
  classname?: string;
  onClick?: () => void;
}

interface ISavedSearchesProps {
  title: string;
  savedSearches: string[];
}

const SearchTab: React.FC<ISearchTabProps> = ({
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-10 px-4 py-0.5 rounded flex flex-col justify-center items-start gap-1.5 shrink-0 cursor-pointer transition-colors",
        isActive
          ? "bg-white outline-2 -outline-offset-2 outline-tertiary"
          : "bg-gray-50 outline-1 -outline-offset-1 outline-gray-200 hover:bg-gray-100"
      )}
    >
      <p
        className={cn(
          "justify-center text-xs whitespace-nowrap",
          isActive ? "text-tertiary font-bold" : "text-zinc-500 font-normal"
        )}
      >
        {label}
      </p>
    </button>
  );
};

const ArrowButton: React.FC<IArrowButtonProps> = ({
  icon,
  classname,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2.5 flex justify-center items-center shrink-0 cursor-pointer transition-colors"
    >
      <img
        src={icon}
        alt="Previous"
        className={cn(["w-6 h-6 invert", classname ? classname : ""])}
      />
    </button>
  );
};

const SavedSearches: React.FC<ISavedSearchesProps> = ({
  title,
  savedSearches,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-20 p-4 bg-white rounded-md flex justify-between items-center gap-1 overflow-hidden">
      {/* Active Search */}
      <SearchTab label={title} isActive={true} />

      {/* Divider */}
      <div className="w-0.5 h-12 bg-neutral-400/10 shrink-0 ml-5" />

      {/* Left Arrow */}
      <ArrowButton
        icon={ChevronRightIcon}
        classname="rotate-180"
        onClick={() => handleScroll("left")}
      />

      {/* Scrollable Saved Searches */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {savedSearches.map((search) => (
          <SearchTab key={search} label={search} />
        ))}
      </div>

      {/* Right Arrow */}
      <ArrowButton
        icon={ChevronRightIcon}
        onClick={() => handleScroll("right")}
      />
    </div>
  );
};

export default SavedSearches;
