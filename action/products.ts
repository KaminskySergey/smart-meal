"use server";
import { Prisma } from "@/app/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { IGetProducts } from "@/types/product";

export async function getProducts(
  page: number = 1,
  subcategorySlug?: string,
  search?: string
): Promise<IGetProducts> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const perProducts = 20;
  const skip = (page - 1) * perProducts;

  const where: Prisma.ProductWhereInput = {};

  if (subcategorySlug) {
    where.subcategory = { slug: subcategorySlug };
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [products, totalCount, subcategoryData] = await Promise.all([
    prisma.product.findMany({
      where,
      take: perProducts,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
    subcategorySlug
      ? prisma.subcategory.findUnique({ where: { slug: subcategorySlug } })
      : Promise.resolve(null),
  ]);

  const totalPages = Math.ceil(totalCount / perProducts);

  return {
    data: products,
    totalPages,
    totalCount,
    subCategoryName: subcategoryData?.name || null,
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
  return category;
}
