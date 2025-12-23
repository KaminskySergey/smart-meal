"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export async function toggleShoppingListItemBought(itemId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const shoppingItem = await prisma.shoppingListItem.findFirst({
    where: {
      id: itemId,
      shoppingList: {
        userId: session.user.id,
      },
    },
  });

  if (!shoppingItem) {
    throw new Error("Shopping list item not found or access denied");
  }

  await prisma.shoppingListItem.update({
    where: { id: itemId },
    data: {
      bought: !shoppingItem.bought,
    },
  });
  // revalidatePath(`/shopping-list/${shoppingItem.shoppingListId}`);
}

export async function deleteProductFromIShoppingList(itemId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const shoppingItem = await prisma.shoppingListItem.findFirst({
    where: {
      id: itemId,
      shoppingList: {
        userId: session.user.id,
      },
    },
  });

  if (!shoppingItem) {
    throw new Error("Item not found");
  }

  await prisma.shoppingListItem.delete({
    where: { id: itemId },
  });
  // revalidatePath(`/shopping-list/${shoppingItem.shoppingListId}`);
}

export async function addProductToShoppingList(
  productId: string,
  quantity: number,
  shoppingListId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) throw new Error("Product not found");

  const existingItem = await prisma.shoppingListItem.findFirst({
    where: {
      shoppingListId,
      productId,
    },
  });
  if (existingItem) {
    throw new Error("Product already exists in shopping list");
  }

  const newItem = await prisma.shoppingListItem.create({
    data: {
      productId,
      quantity,
      shoppingListId,
      unit: product.unit,
    },
    include: {
      product: true, 
    },
  });
  // revalidatePath(`/shopping-list/${shoppingListId}`);
  return newItem
}

export async function getShippingListById(listId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const data = await prisma.shoppingList.findUnique({
    where: { id: listId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return data;
}

export async function removeShoppingListById(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const item = await prisma.shoppingList.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!item) {
    throw new Error("Not Found Item");
  }
  await prisma.shoppingList.delete({ where: { id } });
  revalidatePath("/shopping-list");
}

export async function getShoppingList() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.shoppingList.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return data;
}

export async function createShoppingListAction(formData: FormData) {
  const session = await auth();
  const name = formData.get("name") as string;

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  if (!name) {
    throw new Error("Name is required");
  }

  await prisma.shoppingList.create({
    data: {
      name,
      userId: session.user.id,
    },
  });
  revalidatePath("/shopping-list");
}
