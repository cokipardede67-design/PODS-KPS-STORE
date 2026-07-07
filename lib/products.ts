export type Product = {
  id: string;
  name: string;
  subcat: string;
  price: number;
  flavors: string[];
  nic?: string[] | null;
  sold?: boolean;
};

const PRICE = 50000; // semua liquid seharga 50.000 Riel

export const saltnicProducts: Product[] = [
  // ❄️ Dingin Banget
  {
    id: "american-winter",
    name: "American Winter",
    subcat: "Dingin Banget",
    price: PRICE,
    flavors: ["Apple", "Honeydew", "Lychee", "Mango", "Berry"],
    nic: null,
  },
  {
    id: "icelands",
    name: "Icelands",
    subcat: "Dingin Banget",
    price: PRICE,
    flavors: ["Strawberry", "Mango", "Grape"],
    nic: null,
  },
  {
    id: "foom-dingin-banget",
    name: "Foom",
    subcat: "Dingin Banget",
    price: PRICE,
    flavors: [
      "Strawberry Mint",
      "Icy Mango",
      "Icy Passionfruit",
      "Icy Berry",
      "Icy Honeydew",
      "Icy Apple",
      "Icy Watermelon",
      "Icy Blackcurrant",
      "Icy Mango MAX",
      "Icy Lychee",
      "Icy Strawberry",
      "Icy Grape",
      "Icy Menthol",
      "Icy Mint",
      "Icy Menthol High-Nic",
    ],
    nic: null,
  },
  {
    id: "ice-pedia",
    name: "Ice Pedia",
    subcat: "Dingin Banget",
    price: PRICE,
    flavors: ["Blackcurrant", "Watermelon", "Apple", "Honeydew", "Lychee", "Mango", "Blueberry"],
    nic: null,
  },

  // ❄️ Dingin Sedang
  {
    id: "foom-dingin-sedang",
    name: "Foom",
    subcat: "Dingin Sedang",
    price: PRICE,
    flavors: ["Iced Lychee Tea", "Iced Tea", "Blackcurrant Lychee Tea", "Iced Lemon Tea"],
    nic: null,
  },
  {
    id: "bequ",
    name: "Bequ",
    subcat: "Dingin Sedang",
    price: PRICE,
    flavors: ["Strawberry", "Blackcurrant", "Watermelon", "Honeydew", "Mango Freeze"],
    nic: null,
  },
  {
    id: "paradewa-dingin-sedang",
    name: "Paradewa",
    subcat: "Dingin Sedang",
    price: PRICE,
    flavors: ["Mangga Hera", "Apple Zeus", "Anggur Athena"],
    nic: null,
  },
  {
    id: "buaqita-dingin-sedang",
    name: "BuaQita",
    subcat: "Dingin Sedang",
    price: PRICE,
    flavors: ["Grape Berry", "Lychee", "Strawberry", "Grape", "Blackcurrant"],
    nic: null,
  },

  // ❄️ Dingin Manis
  {
    id: "makna",
    name: "Makna",
    subcat: "Dingin Manis",
    price: PRICE,
    flavors: ["Berry Dough (V1)", "Taro Milk Cheese (V2)", "Sea Salt Caramel Latte (V3)"],
    nic: null,
  },
  {
    id: "buaqita-dingin-manis",
    name: "BuaQita",
    subcat: "Dingin Manis",
    price: PRICE,
    flavors: ["Mango", "Banana"],
    nic: null,
  },

  // 🔥 Creamy
  {
    id: "lunar-emkay",
    name: "Lunar by Emkay Brewer",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Strawberry Cheesecake"],
    nic: null,
  },
  {
    id: "emkay-signature",
    name: "Emkay Signature",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Coffeemel (40MG)", "Banana Licious (35MG)"],
    nic: null,
  },
  {
    id: "jinak-pods",
    name: "Jinak Pods",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Es Cendol"],
    nic: null,
  },
  {
    id: "paradewa-creamy",
    name: "Paradewa",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Sang Hercules (Pisang Stroberi)"],
    nic: null,
  },
  {
    id: "a-la-carte",
    name: "A La Carte",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Cream Poundcake", "Cream Banana", "Cream Biscuit"],
    nic: null,
  },
  {
    id: "muffin-xes",
    name: "Muffin & Xes",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Blueberry Muffin", "Banana Muffin", "Strawberry Cream"],
    nic: null,
  },
  {
    id: "orama-juice",
    name: "The O Rama Juice",
    subcat: "Creamy",
    price: PRICE,
    flavors: ["Kaya Toast", "Banana Butter"],
    nic: null,
  },
];

export const cartridgeProducts: Product[] = [
  {
    id: "oxva-xlim-pro",
    name: "Oxva Xlim Pro Cartridge",
    subcat: "Oxva",
    price: PRICE,
    flavors: ["0.4 Ohm", "0.6 Ohm", "0.8 Ohm"],
    nic: null,
  },
  {
    id: "vaporesso-xros",
    name: "Vaporesso Xros",
    subcat: "Vaporesso",
    price: PRICE,
    flavors: ["0.4 Ohm", "0.6 Ohm", "0.8 Ohm", "1.0 Ohm"],
    nic: null,
  },
  {
    id: "foom-pod-x",
    name: "Foom Pod X Refillable",
    subcat: "Foom",
    price: PRICE,
    flavors: ["1 Pack Isi 3"],
    nic: null,
  },
];

export const deviceProducts: Product[] = [
  {
    id: "oxva-xlim-pro2",
    name: "Oxva Xlim Pro 2",
    subcat: "Pod System",
    price: 315000,
    flavors: ["Brown Python"],
    nic: null,
  },
  {
    id: "caliburn-ak3",
    name: "Caliburn AK3",
    subcat: "Pod System",
    price: 200000,
    flavors: ["Red", "Gold"],
    nic: null,
  },
  {
    id: "centaurus-p200",
    name: "Centaurus P200",
    subcat: "Mod",
    price: 300000,
    flavors: ["Blue Thunder", "Siren Echo", "Shadow Dynasty"],
    nic: null,
  },
];
