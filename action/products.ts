"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getProducts(
  categoryId: string,
  subcategoryId: string,
  searchTerm: string,
  shoppingListId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.product.findMany({
    where: {
      categoryId,
      subcategoryId,
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
      NOT: {
        shoppingListItem: {
          some: {shoppingListId }
        }
      }
    },
  });
  return data;
}
