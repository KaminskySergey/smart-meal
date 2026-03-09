"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getProductsInventory(
  categoryId: string,
  subcategoryId: string,
  searchTerm: string
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
      inventoryItem: {
        none: {
          userId: session.user.id,
        },
      },
    },
  });
  return data;
}

export async function getInventory() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.inventoryItem.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      product: true,
    },
  });
  return data;
}

export async function addProductToInventory(
  productId: string,
  quantity: number
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) throw new Error("Product not found");

  const newItem = await prisma.inventoryItem.create({
    data: {
      userId: session.user.id,
      productId: product.id,
      quantity,
      unit: product.unit,
    },
    include: {
      product: true,
    },
  });
  revalidatePath('/inventory')
  return newItem;
}

export async function deleteInventoryItem(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const item = await prisma.inventoryItem.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!item) {
    throw new Error("Not Found Item");
  }
  await prisma.inventoryItem.delete({
    where: { id: item.id },
  });
  revalidatePath("/inventory");
  
}

export async function changeQuantityInventoryItem(id: string, quantity: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const item = await prisma.inventoryItem.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!item) {
    throw new Error("Not Found Item");
  }
  await prisma.inventoryItem.update({
    where: { id },
    data: {
      quantity,
    }
  });
  revalidatePath('/inventory')
}
