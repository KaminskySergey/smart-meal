"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { IGetProducts } from "@/types/product";

export async function getProducts(page: number = 1): Promise<IGetProducts> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const perProducts = 20;
  const skip = (page - 1) * perProducts;
  const products = await prisma.product.findMany({
    take: perProducts,
    skip,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.product.count();

  const totalPages = Math.ceil(totalCount / perProducts);
  return {
    data: products,
    totalPages,
    totalCount,
  };
}

export async function getCategoryPreview(categorySlug: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      subcategory: {
        include: {
          products: {
            take: 3,
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });
  return category
}
