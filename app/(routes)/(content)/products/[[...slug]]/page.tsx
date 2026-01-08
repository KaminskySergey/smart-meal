import { getCategory } from "@/action/category";
import { getCategoryPreview, getProducts } from "@/action/products";
import ProductsComponent from "@/components/products/ProductsComponent";
import CategoryComponent from "@/components/products/category/CategoryComponent";
import { IGetProducts } from "@/types/product";
import { notFound } from "next/navigation";

interface IProducts {
    params: Promise<{ slug?: string[] }>,
    searchParams: Promise<{ page: number }>,
}

export default async function Products({ params, searchParams }: IProducts) {
    const { slug } = await params;
    const { page } = await searchParams
    const currentPage = Number(page) || 1;

    if (!slug) {
        const products = await getProducts(currentPage)
        return <ProductsComponent products={products.data} totalPages={products.totalPages} />
    }
    if (slug.length === 1 && slug[0] === 'category') {
        const categories = await getCategory()
        return <CategoryComponent categories={categories}/>
    }

    if(slug.length === 2 && slug[0] === 'category'){
        const category = await getCategoryPreview(slug[1])
        return <div></div>
    }
    notFound()
}