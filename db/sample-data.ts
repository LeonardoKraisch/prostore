import { hashSync } from "bcrypt-ts-edge";

// ATENÇÃO: os usuários abaixo são só para desenvolvimento local.
// Nunca rode o seed no banco de produção: ele apaga tudo e recria
// um admin com senha conhecida.
const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
  // Marcas fictícias. Fotos do Unsplash (https://unsplash.com/license).
  products: [
    {
      name: "Classic Oxford Shirt",
      slug: "classic-oxford-shirt",
      category: "Shirts",
      description:
        "A crisp cotton oxford with a soft collar roll. Easy to dress up with a tie or wear open on the weekend.",
      images: [
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 85.9,
      brand: "Hollin & Vale",
      rating: 0,
      numReviews: 0,
      stock: 10,
      isFeatured: true,
      banner: null,
    },
    {
      name: "Stretch Poplin Shirt",
      slug: "stretch-poplin-shirt",
      category: "Shirts",
      description:
        "Smooth poplin with a touch of stretch, so it moves with you through a long day.",
      images: [
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 59.99,
      brand: "Tidewell",
      rating: 0,
      numReviews: 0,
      stock: 5,
      isFeatured: true,
      banner: null,
    },
    {
      name: "Micro-Print Poplin Shirt",
      slug: "micro-print-poplin-shirt",
      category: "Shirts",
      description:
        "Navy poplin with a fine dot print and a contrast placket. Sharp under a blazer, relaxed on its own.",
      images: [
        "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 99.95,
      brand: "Ashgrove",
      rating: 0,
      numReviews: 0,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Everyday Twill Shirt",
      slug: "everyday-twill-shirt",
      category: "Shirts",
      description:
        "A durable twill shirt in a regular fit, made for daily wear and easy ironing.",
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 39.95,
      brand: "Hollin & Vale",
      rating: 0,
      numReviews: 0,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Brushed Flannel Overshirt",
      slug: "brushed-flannel-overshirt",
      category: "Shirts",
      description:
        "Heavy brushed cotton flannel with two chest pockets. Wear it as a shirt or a light jacket.",
      images: [
        "https://images.unsplash.com/photo-1687275160744-ef140bf5529c?w=1200&h=1200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1782226728289-f81457b760f5?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 79.99,
      brand: "Ashgrove",
      rating: 0,
      numReviews: 0,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Heavyweight Cotton Hoodie",
      slug: "heavyweight-cotton-hoodie",
      category: "Sweatshirts",
      description:
        "A thick cotton fleece hoodie with a kangaroo pocket and a structured hood.",
      images: [
        "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=1200&h=1200&fit=crop&q=80",
      ],
      price: 99.99,
      brand: "Tidewell",
      rating: 0,
      numReviews: 0,
      stock: 8,
      isFeatured: false,
      banner: null,
    },
  ],
};

export default sampleData;
