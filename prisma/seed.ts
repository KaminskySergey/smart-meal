import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function getUnitBySubcategory(name: string): string {
  const map: Record<string, string> = {
    Fruits: "pcs",
    Vegetables: "pcs",
    Herbs: "g",
    Milk: "ml",
    Cheese: "g",
    Yogurt: "g",
    Chicken: "g",
    Beef: "g",
    Pork: "g",
    Salmon: "g",
    Shrimp: "g",
    Tuna: "g",
    Rice: "g",
    Oats: "g",
    Flour: "g",
    Lentils: "g",
    Chickpeas: "g",
    Beans: "g",
    Almonds: "g",
    Walnuts: "g",
    Seeds: "g",
    Spices: "g",
    Blends: "g",
    Pizza: "pcs",
    Sandwich: "pcs",
    Salad: "pcs",
    Water: "ml",
    Juice: "ml",
    Tea: "pcs",
    Chocolate: "g",
    Cake: "pcs",
    "Ice Cream": "ml",
  };
  return map[name] ?? "pcs";
}
async function main() {
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();

  const categoriesData = [
    {
      name: "Fruits and Vegetables",
      subcategories: [
        {
          name: "Fruits",
          products: ["Apple", "Banana", "Orange", "Strawberry", "Grapes"],
        },
        {
          name: "Vegetables",
          products: ["Carrot", "Tomato", "Cucumber", "Bell Pepper", "Spinach"],
        },
        { name: "Herbs", products: ["Basil", "Parsley", "Cilantro", "Mint"] },
      ],
    },
    {
      name: "Dairy and Eggs",
      subcategories: [
        {
          name: "Milk",
          products: ["Whole Milk", "Skim Milk", "Soy Milk", "Almond Milk"],
        },
        {
          name: "Cheese",
          products: ["Cheddar", "Mozzarella", "Parmesan", "Feta"],
        },
        {
          name: "Yogurt",
          products: [
            "Greek Yogurt",
            "Regular Yogurt",
            "Flavored Yogurt",
            "Plain Yogurt",
          ],
        },
      ],
    },
    {
      name: "Meat and Poultry",
      subcategories: [
        {
          name: "Chicken",
          products: [
            "Chicken Breast",
            "Chicken Thigh",
            "Chicken Wings",
            "Whole Chicken",
          ],
        },
        {
          name: "Beef",
          products: ["Beef Steak", "Ground Beef", "Beef Ribs", "Beef Roast"],
        },
        {
          name: "Pork",
          products: ["Pork Chop", "Bacon", "Pork Loin", "Sausages"],
        },
      ],
    },
    {
      name: "Fish and Seafood",
      subcategories: [
        {
          name: "Salmon",
          products: [
            "Salmon Fillet",
            "Smoked Salmon",
            "Salmon Steak",
            "Salmon Slices",
          ],
        },
        {
          name: "Shrimp",
          products: [
            "Raw Shrimp",
            "Cooked Shrimp",
            "Frozen Shrimp",
            "Shrimp Cocktail",
          ],
        },
        {
          name: "Tuna",
          products: ["Tuna Steak", "Canned Tuna", "Fresh Tuna", "Seared Tuna"],
        },
      ],
    },
    {
      name: "Grains",
      subcategories: [
        {
          name: "Rice",
          products: [
            "White Rice",
            "Brown Rice",
            "Basmati Rice",
            "Jasmine Rice",
          ],
        },
        {
          name: "Oats",
          products: [
            "Rolled Oats",
            "Steel-cut Oats",
            "Instant Oats",
            "Oat Bran",
          ],
        },
        {
          name: "Flour",
          products: [
            "Wheat Flour",
            "All-purpose Flour",
            "Whole Wheat Flour",
            "Corn Flour",
          ],
        },
      ],
    },
    {
      name: "Legumes",
      subcategories: [
        {
          name: "Lentils",
          products: [
            "Red Lentils",
            "Green Lentils",
            "Brown Lentils",
            "Split Lentils",
          ],
        },
        {
          name: "Chickpeas",
          products: [
            "Canned Chickpeas",
            "Dry Chickpeas",
            "Roasted Chickpeas",
            "Chickpea Flour",
          ],
        },
        {
          name: "Beans",
          products: [
            "Black Beans",
            "Kidney Beans",
            "Pinto Beans",
            "Navy Beans",
          ],
        },
      ],
    },
    {
      name: "Nuts and Seeds",
      subcategories: [
        {
          name: "Almonds",
          products: [
            "Raw Almonds",
            "Roasted Almonds",
            "Sliced Almonds",
            "Almond Butter",
          ],
        },
        {
          name: "Walnuts",
          products: [
            "Raw Walnuts",
            "Chopped Walnuts",
            "Walnut Halves",
            "Candied Walnuts",
          ],
        },
        {
          name: "Seeds",
          products: [
            "Sunflower Seeds",
            "Chia Seeds",
            "Pumpkin Seeds",
            "Flax Seeds",
          ],
        },
      ],
    },
    {
      name: "Herbs and Spices",
      subcategories: [
        { name: "Herbs", products: ["Basil", "Parsley", "Cilantro", "Thyme"] },
        {
          name: "Spices",
          products: ["Black Pepper", "Cinnamon", "Cumin", "Paprika"],
        },
        {
          name: "Blends",
          products: [
            "Curry Powder",
            "Italian Seasoning",
            "Chili Powder",
            "Garam Masala",
          ],
        },
      ],
    },
    {
      name: "Prepared Foods",
      subcategories: [
        {
          name: "Pizza",
          products: ["Margherita", "Pepperoni", "Veggie", "BBQ Chicken"],
        },
        {
          name: "Sandwich",
          products: [
            "Ham Sandwich",
            "Turkey Sandwich",
            "Veggie Sandwich",
            "Chicken Sandwich",
          ],
        },
        {
          name: "Salad",
          products: [
            "Caesar Salad",
            "Greek Salad",
            "Cobb Salad",
            "Garden Salad",
          ],
        },
      ],
    },
    {
      name: "Drinks",
      subcategories: [
        {
          name: "Water",
          products: [
            "Mineral Water",
            "Sparkling Water",
            "Flavored Water",
            "Spring Water",
          ],
        },
        {
          name: "Juice",
          products: [
            "Orange Juice",
            "Apple Juice",
            "Grape Juice",
            "Carrot Juice",
          ],
        },
        {
          name: "Tea",
          products: ["Green Tea", "Black Tea", "Herbal Tea", "Chamomile Tea"],
        },
      ],
    },
    {
      name: "Sweets and Desserts",
      subcategories: [
        {
          name: "Chocolate",
          products: [
            "Dark Chocolate",
            "Milk Chocolate",
            "White Chocolate",
            "Chocolate Bar",
          ],
        },
        {
          name: "Cake",
          products: [
            "Chocolate Cake",
            "Vanilla Cake",
            "Cheesecake",
            "Carrot Cake",
          ],
        },
        {
          name: "Ice Cream",
          products: [
            "Vanilla Ice Cream",
            "Chocolate Ice Cream",
            "Strawberry Ice Cream",
            "Mint Ice Cream",
          ],
        },
      ],
    },
  ];

  for (const cat of categoriesData) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: slugify(cat.name),
      },
    });

    for (const sub of cat.subcategories) {
      const subcategory = await prisma.subcategory.create({
        data: {
          name: sub.name,
          slug: slugify(`${cat.name}-${sub.name}`),
          categoryId: category.id,
        },
      });

      await Promise.all(
        sub.products.map((prod) =>
          prisma.product.create({
            data: {
              name: prod,
              slug: slugify(`${cat.name}-${sub.name}-${prod}`),
              subcategoryId: subcategory.id,
              categoryId: category.id,
              unit: getUnitBySubcategory(sub.name),
            },
          })
        )
      );
    }
  }

  console.log("Database seeded with categories, subcategories, and products!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
