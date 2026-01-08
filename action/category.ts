import { prisma } from "@/lib/prisma";

export async function getCategory() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      subcategory: {
        select: {
          id: true,
          name: true,
          slug: true,
          categoryId: true,
        },
      },
    },
  });
}
