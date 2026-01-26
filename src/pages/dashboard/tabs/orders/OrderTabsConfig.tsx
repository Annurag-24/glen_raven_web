import React from "react";
import { type TabItem } from "@/components/orders/tabs";

interface GetOrderTabsOptions {
    hidePricing?: boolean;
    hideShipping?: boolean;
    pricingContent?: React.ReactNode;
    shippingContent?: React.ReactNode;
    lineItemsContent?: React.ReactNode;
}

export const getOrderTabs = (
    options?: GetOrderTabsOptions
): TabItem[] => {
    const tabs: TabItem[] = [
        {
            id: "line-items",
            label: "Line Items",
            content: options?.lineItemsContent,
        },
    ];

    if (!options?.hidePricing) {
        tabs.push({
            id: "discount-pricing",
            label: "Discount & Pricing",
            content: options?.pricingContent || <div>Discount content</div>,
        });
    }

    if (!options?.hideShipping) {
        tabs.push({
            id: "shipping-fulfillment",
            label: "Shipping & Fulfillment",
            content: options?.shippingContent || <div>Shipping content</div>,
        });
    }

    return tabs;
};