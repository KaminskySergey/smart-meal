import { Container } from '../ui/Container';
import TitleWithAction from '../ui/TitleWithAction';
import { IShoppingList } from '@/types/shopping-list';
import ShoppingListGallery from './ShoppingListGallery';
import HomeListProducts from './HomeListProducts';
import { House } from 'lucide-react';
import NoItemsShopping from '../ui/NoItemsShopping';
import { IInventoryItem } from '@/types/inventory';
interface IShoppingListComponent {
    shoppingList: IShoppingList[]
    inventoryItems: IInventoryItem[]
}

export default function ShoppingListComponent({ shoppingList, inventoryItems }: IShoppingListComponent) {
    return (
        <section className='py-16 '>
            <Container className='flex flex-col gap-8'>
                <TitleWithAction title='My Shopping List' titleBtn='Create List' />
                <div className='flex gap-12 px-6'>
                    {/* shopping list */}
                    <div className='w-[70%] '>
                        {shoppingList.length !== 0 ? <ShoppingListGallery shoppingList={shoppingList} /> : <NoItemsShopping title='You don`t have any shopping lists yet'/>}
                        
                    </div>


                    {/* at home */}
                    <div className='w-[30%] '>
                        <h2 className='flex gap-2 items-center font-bold text-3xl mb-5'>
                            <House className='w-9 h-9 text-purple-500'/> At Home
                        </h2>
                        <HomeListProducts inventoryItems={inventoryItems}/>
                    </div>
                </div>
            </Container>
        </section>
    );
}