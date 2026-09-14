export const productData = {
  name: "BOO!",
  tagline: "Not Your Ordinary Ice Cream",
  edition: "Batch No. 001 // Eclipse Edition",
  price: "$8.50",
  volume: "Single Artisan Cone",
  flavor: {
    primary: "Wild Nordic Blackcurrant",
    secondary: "Glacial Cranberry Crisp",
    base: "Velvet Charcoal Dark Cream",
    description: "Deep blackcurrant. Sharp cranberry. Unexpectedly smooth. Activated coconut husk charcoal gives the cone and cream its abyss-dark color without altering the rich berry notes.",
    notes: [
      { name: "Top Note", desc: "Tart Cranberry & Frosted Berries", intensity: "85%" },
      { name: "Heart Note", desc: "Wild Blackcurrant & Crushed Currant Leaf", intensity: "95%" },
      { name: "Base Note", desc: "Rich Cocoa Charcoal Waffle & Velvet Cream", intensity: "90%" }
    ]
  },
  textureProfile: {
    cone: "Double-fired ultra-crisp black waffle cone infused with fine culinary-grade activated charcoal.",
    cream: "Slow-churned velvet matte black ice cream with micro berry-juice veins.",
    finish: "Glistening drizzle of wild blackcurrant reduction and freeze-dried cranberry dust."
  },
  specs: [
    { label: "Color Origin", val: "100% Activated Coconut Charcoal" },
    { label: "Fruit Purity", val: "Single-Origin Nordic Berries" },
    { label: "Dairy Craft", val: "Grass-fed Alpine Cream" },
    { label: "Sugar Level", val: "Balanced Low-Glycemic Raw Cane" }
  ],
  locations: [
    { city: "Tokyo", spot: "Shibuya Underground Labs" },
    { city: "New York", spot: "SoHo Flagship Pop-up" },
    { city: "London", spot: "Mayfair Dark Chamber" },
    { city: "Paris", spot: "Le Marais Night Counter" }
  ]
};
