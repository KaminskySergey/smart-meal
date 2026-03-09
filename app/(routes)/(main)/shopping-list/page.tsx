
import { getInventory } from '@/action/inventory';
import { getShoppingList } from '@/action/shopping-list';
import ShoppingListComponent from '@/components/shopping-list/ShoppingListComponent';

export default async function ShoppingListPage() {
    const shoppingList = await getShoppingList()
    console.log(shoppingList)
    const inventoryItems = await getInventory()
  return (
    <ShoppingListComponent inventoryItems={inventoryItems} shoppingList={shoppingList}/>
  );
}