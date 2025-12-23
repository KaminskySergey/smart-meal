
import { getShoppingList } from '@/action/shopping-list';
import ShoppingListComponent from '@/components/shopping-list/ShoppingListComponent';

export default async function ShoppingListPage() {
    const shoppingList = await getShoppingList()
    console.log(shoppingList)
  return (
    <ShoppingListComponent shoppingList={shoppingList}/>
  );
}