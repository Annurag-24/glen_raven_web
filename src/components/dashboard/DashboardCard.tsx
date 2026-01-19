import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface IDashboardCardProps {
    title: string;
    showViewAll?: boolean;
    viewAllLink?: string;
    children: React.ReactNode;
    wrapperClassName?: string;
    showBottomViewAll?: boolean;
    bottomViewAllLink?: string;
    bottomViewAllLabel?: string;
}

interface ITextProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
}

interface ITableProps {
    children: React.ReactNode;
    className?: string;
}

interface ITableHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface ITableRowProps {
    children: React.ReactNode;
    className?: string;
    isLast?: boolean;
}

interface ITableCellProps {
    children: React.ReactNode;
    className?: string;
    width?: string;
}

const DashboardCard: React.FC<IDashboardCardProps> = ({
    title,
    showViewAll = false,
    viewAllLink,
    children,
    wrapperClassName,
    showBottomViewAll = false,
    bottomViewAllLink,
    bottomViewAllLabel,
}) => {
    return (
        <div
            className={cn([
                "self-stretch p-6 bg-white rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 -outline-offset-1 outline-slate-200 inline-flex flex-col justify-start items-start gap-4",
                wrapperClassName,
            ])}
        >
            <div className="self-stretch inline-flex justify-between items-center">
                <p className="justify-center text-Grey-600 text-lg font-bold leading-7">
                    {title}
                </p>
                {showViewAll && (
                    <Link
                        to={viewAllLink || "#"}
                        className="justify-center text-tertiary text-base font-semibold leading-7 hover:opacity-70 transition-opacity"
                    >
                        View All
                    </Link>
                )}
            </div>
            <div className="w-full">{children}</div>
            {showBottomViewAll && (
                <div className="self-stretch flex justify-start mt-2">
                    <Link
                        to={bottomViewAllLink || "#"}
                        className="text-sm text-tertiary font-medium hover:underline"
                    >
                        {bottomViewAllLabel || "View All"}
                    </Link>
                </div>
            )}
        </div>
    );
};

export const CardPrimaryText: React.FC<ITextProps> = ({
    children,
    className,
    color = "text-gray-600",
}) => {
    return (
        <p
            className={cn([
                `${color} text-base font-semibold leading-6`,
                className,
            ])}
        >
            {children}
        </p>
    );
};

export const CardSecondaryText: React.FC<ITextProps> = ({
    children,
    className,
    color = "text-gray-500",
}) => {
    return (
        <p
            className={cn([
                `${color} text-sm font-normal leading-5`,
                className,
            ])}
        >
            {children}
        </p>
    );
};

export const CardTable: React.FC<ITableProps> = ({ children, className }) => {
    return (
        <div className={cn(["w-full overflow-x-auto", className])}>
            <table className="min-w-full">{children}</table>
        </div>
    );
};

export const CardTableHeader: React.FC<ITableHeaderProps> = ({
    children,
    className,
}) => {
    return (
        <thead className={cn(["bg-gray-50", className])}>
            <tr>{children}</tr>
        </thead>
    );
};

export const CardTableHeaderCell: React.FC<ITableCellProps> = ({
    children,
    className,
    width = "w-36",
}) => {
    return (
        <th
            className={cn([
                "px-4 py-2 text-left text-gray-500 text-xs font-bold uppercase leading-4 whitespace-nowrap",
                width,
                className,
            ])}
        >
            {children}
        </th>
    );
};

export const CardTableBody: React.FC<ITableProps> = ({
    children,
    className,
}) => {
    return <tbody className={className}>{children}</tbody>;
};

export const CardTableRow: React.FC<ITableRowProps> = ({
    children,
    className,
    isLast = false,
}) => {
    return (
        <tr className={cn([!isLast && "border-b border-gray-200", className])}>
            {children}
        </tr>
    );
};

export const CardTableCell: React.FC<ITableCellProps> = ({
    children,
    className,
    width = "w-36",
}) => {
    return (
        <td
            className={cn([
                "px-4 py-3 text-gray-600 text-sm font-normal leading-5 whitespace-nowrap",
                width,
                className,
            ])}
        >
            {children}
        </td>
    );
};

export const CardTableCellPrimary: React.FC<ITableCellProps> = ({
    children,
    className,
    width = "w-36",
}) => {
    return (
        <td
            className={cn([
                "px-4 py-3 text-gray-800 text-sm font-medium leading-5 whitespace-nowrap",
                width,
                className,
            ])}
        >
            {children}
        </td>
    );
};

export default DashboardCard;
