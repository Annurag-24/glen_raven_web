import { cn } from "@/lib/utils";
import SearchBar, { type SearchBarProps } from "@/components/dashboard/table/SearchBar";

type TableSearchHeaderProps = {
    title: string;
    className?: string;
    titleClassName?: string;
    /** Props forwarded to the existing SearchBar component */
    searchBarProps: SearchBarProps;
    showBorder?: boolean;
};

export default function TableSearchHeader({
    title,
    className,
    titleClassName,
    searchBarProps,
}: TableSearchHeaderProps) {
    return (
        <div className={cn("w-full bg-[#FFFFFF] flex items-center justify-between gap-4 ", className)}>
            <div className="flex-shrink-0">
                <h2 className={cn("text-lg font-bold text-gray-900", titleClassName)}>
                    {title}
                </h2>
            </div>

            <div className="">
                    <div className="w-full max-w-[720px]">
                        <SearchBar {...searchBarProps} showBorder={false} placeholder={'Search'}/>
                    </div>
            </div>
        </div>
    );
}
