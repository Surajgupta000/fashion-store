const products = [
  {
    id: 1,
    name: "Red Saree",
    brand: "Zara",
    price: 1999,
    category: "Sarees",
    image: new URL("../assets/Saree-collections.jpeg", import.meta.url).href
  },
  {
    id: 2,
    name: "Lehenga Set",
    brand: "Biba",
    price: 4999,
    category: "Lehengas",
    image: new URL("../assets/Lehenga.jpeg", import.meta.url).href
  },
  {
    id: 3,
    name: "Designer Suit",
    brand: "W",
    price: 2999,
    category: "Suits",
    image: new URL("../assets/suit2.jpg", import.meta.url).href
  },
  {
    id: 4,
    name: "Anarkali Dress",
    brand: "Zara",
    price: 3499,
    category: "Dresses",
    image: new URL("../assets/Anarkali suit.jpg", import.meta.url).href
  },
  {
    id: 5,
    name: "Dupatta",
    brand: "W",
    price: 999,
    category: "Dupattas",
    image: new URL("../assets/net dupata.jpg", import.meta.url).href
  },
  {
    id: 6,
    name: "Fabric Material",
    brand: "Local",
    price: 799,
    category: "Fabrics",
    image: new URL("../assets/Mixed fabrics.jpg", import.meta.url).href
  }
];

export default products;