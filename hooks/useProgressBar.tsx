import { IShoppingListItem } from "@/types/shopping-list";

export function useProgressBar(items: IShoppingListItem[]) {
    const boughtCount = items.reduce((acc, el) => acc + (el.bought ? 1 : 0), 0)
    const totalCount = items.length;
    const progressPercent = totalCount ? Math.round((boughtCount / totalCount) * 100) : 0


    return {
        boughtCount,
        totalCount,
        progressPercent
    }
}