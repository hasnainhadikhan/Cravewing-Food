import { IMGS } from "./brand";

// ─── Menu Categories (used on Home page) ─────────────────────────────────────
export const menuCategories = [
  { title: "Classic Wings", img: IMGS.classicWings, items: ["Buffalo Classic", "Honey Mustard Gold", "Lemon Pepper", "Garlic Parm"], slug: "classic-wings" },
  { title: "Boneless Wings", img: IMGS.bonelessWings, items: ["Nashville Hot", "Mango Habanero", "BBQ Smoke", "Sweet Chili"], slug: "boneless-wings" },
  { title: "Tenders", img: IMGS.tenders, items: ["Plain Crispy", "Ranch Dipped", "Spicy Ranch", "Honey Gold"], slug: "tenders" },
  { title: "Sandwiches", img: IMGS.sandwiches, items: ["Classic Crispy", "Nashville Stacker", "Garlic Parm Melt", "Spicy Habanero"], slug: "sandwiches" },
  { title: "Loaded Fries", img: IMGS.loadedFries, items: ["Char Fries", "Cheese & Bacon", "Ranch Bomb", "Spicy Nacho"], slug: "loaded-fries" },
  { title: "Dips & Sides", img: IMGS.dips, items: ["Ranch", "Bleu Cheese", "Honey Mustard", "Comeback Sauce"], slug: "dips-sides" },
  { title: "Shakes & Drinks", img: IMGS.shakes, items: ["Vanilla Cream", "Chocolate Fudge", "Strawberry Gold", "Salted Caramel"], slug: "shakes" },
];

// ─── Sauces ───────────────────────────────────────────────────────────────────
const sauceImg = (id: string) => `https://images.unsplash.com/${id}?w=240&h=240&fit=crop&auto=format`;
export const sauces = [
  { name: "Buffalo Classic", heat: 2, desc: "The OG. Tangy, buttery, and just the right kick. A wing religion.", color: "#E8420A", img: sauceImg("photo-1575919159574-e49dc9e1228f") },
  { name: "Honey Mustard Gold", heat: 1, desc: "Sweet honey meets sharp mustard. Zero heat, full flavor.", color: "#FCB316", img: sauceImg("photo-1600984177310-c86c8f8fa9c7") },
  { name: "Lemon Pepper", heat: 1, desc: "Zesty citrus, cracked pepper crust. Light, bright, addictive.", color: "#F0C040", img: sauceImg("photo-1734989435134-7e4885259231") },
  { name: "Garlic Parm", heat: 1, desc: "Roasted garlic, aged parmesan, herb butter. The crowd pleaser.", color: "#C8A96E", img: sauceImg("photo-1563599175592-c58dc214deff") },
  { name: "Mango Habanero", heat: 4, desc: "Sweet tropical fruit with a habanero sucker-punch. Wildly good.", color: "#F26B21", img: sauceImg("photo-1779939855596-8506096e2ebe") },
  { name: "Nashville Hot", heat: 5, desc: "Cayenne-forward, bold spice paste. Not for the faint of heart.", color: "#D6291E", img: sauceImg("photo-1533841175647-39fea57b86ba") },
];

export const SAUCES_LIST = ["Buffalo Classic", "Honey Mustard Gold", "Lemon Pepper", "Garlic Parm", "Mango Habanero", "Nashville Hot"];

// ─── Full Menu ────────────────────────────────────────────────────────────────
export const fullMenu = [
  {
    category: "Classic Wings",
    image: IMGS.classicWings,
    items: [
      { name: "6pc Classic Wings", price: "$10.99", desc: "Six bone-in wings, hand-sauced in your choice of sauce.", tags: ["Best Seller"], image: IMGS.classicWings },
      { name: "12pc Classic Wings", price: "$18.99", desc: "A full dozen. Share them. Or don't.", tags: ["Popular"], image: IMGS.classicWings },
      { name: "18pc Classic Wings", price: "$26.99", desc: "Serious wing commitment. You know who you are.", tags: [], image: IMGS.classicWings },
      { name: "Wing Combo (6pc + Fries + Drink)", price: "$14.99", desc: "The full classic experience.", tags: ["Combo Deal"], image: IMGS.classicWings },
    ],
  },
  {
    category: "Boneless Wings",
    image: IMGS.bonelessWings,
    items: [
      { name: "8pc Boneless Wings", price: "$11.99", desc: "All the flavor, none of the bones. Perfect for dipping.", tags: [], image: IMGS.bonelessWings },
      { name: "16pc Boneless Wings", price: "$20.99", desc: "Double down on the boneless life.", tags: ["Value"], image: IMGS.bonelessWings },
      { name: "Boneless Combo", price: "$15.99", desc: "8pc boneless + fries + drink.", tags: ["Combo Deal"], image: IMGS.bonelessWings },
    ],
  },
  {
    category: "Tenders",
    image: IMGS.tenders,
    items: [
      { name: "3pc Tenders", price: "$8.99", desc: "Hand-breaded, never frozen, always crispy.", tags: [], image: IMGS.tenders },
      { name: "5pc Tenders", price: "$12.99", desc: "Five golden strips of perfection.", tags: ["Best Seller"], image: IMGS.tenders },
      { name: "Tender Basket", price: "$16.99", desc: "5pc tenders, waffle fries, 2 dipping sauces.", tags: ["Combo Deal"], image: IMGS.tenders },
    ],
  },
  {
    category: "Sandwiches",
    image: IMGS.sandwiches,
    items: [
      { name: "Classic Crispy Sandwich", price: "$10.99", desc: "Crispy chicken, pickles, house slaw, brioche bun.", tags: [], image: IMGS.sandwiches },
      { name: "Nashville Stacker", price: "$12.99", desc: "Nashville hot chicken, coleslaw, dill pickles, extra hot drizzle.", tags: ["Spicy"], image: IMGS.sandwiches },
      { name: "Garlic Parm Melt", price: "$12.99", desc: "Garlic parm chicken, provolone, caramelized onion.", tags: ["Fan Fave"], image: IMGS.sandwiches },
      { name: "Spicy Habanero", price: "$13.49", desc: "Mango habanero glazed chicken, pepper jack, jalapeños. Not responsible.", tags: ["Extra Spicy"], image: IMGS.sandwiches },
    ],
  },
  {
    category: "Loaded Fries",
    image: IMGS.loadedFries,
    items: [
      { name: "Char Fries", price: "$5.99", desc: "Seasoned with our secret char blend. Simple, iconic.", tags: [], image: IMGS.loadedFries },
      { name: "Cheese & Bacon Fries", price: "$7.99", desc: "Melted cheddar, crispy bacon, ranch drizzle.", tags: ["Popular"], image: IMGS.loadedFries },
      { name: "Ranch Bomb Fries", price: "$8.49", desc: "Loaded with house ranch, jalapeños, crispy onion.", tags: [], image: IMGS.loadedFries },
      { name: "Spicy Nacho Fries", price: "$8.99", desc: "Nacho cheese, hot sauce drizzle, pickled peppers.", tags: ["Spicy"], image: IMGS.loadedFries },
    ],
  },

  {
    category: "Shakes & Drinks",
    image: IMGS.shakes,
    items: [
      { name: "Vanilla Cream Shake", price: "$5.99", desc: "Thick, creamy, real vanilla bean.", tags: [], image: IMGS.shakes },
      { name: "Chocolate Fudge Shake", price: "$5.99", desc: "Rich chocolate, whipped cream, fudge swirl.", tags: ["Popular"], image: IMGS.shakes },
      { name: "Strawberry Gold Shake", price: "$5.99", desc: "Fresh strawberry with honey drizzle.", tags: [], image: IMGS.shakes },
      { name: "Salted Caramel Shake", price: "$6.49", desc: "Sweet heat. The shake version of our sauces.", tags: ["Seasonal"], image: IMGS.shakes },
      { name: "Fountain Drinks", price: "$2.49", desc: "Pepsi, Diet Pepsi, Mountain Dew, Lemonade, Water.", tags: [], image: IMGS.shakes },
    ],
  },
  {
    category: "Combo Meals",
    image: IMGS.classicWings,
    items: [
      { name: "Classic Combo", price: "$14.99", desc: "6pc wings + char fries + fountain drink.", tags: ["Best Value"], image: IMGS.classicWings },
      { name: "Double Trouble", price: "$22.99", desc: "12pc wings + loaded fries + 2 drinks.", tags: ["For Two"], image: IMGS.classicWings },
      { name: "Tender Feast", price: "$24.99", desc: "5pc tenders + 6pc wings + fries + 2 drinks.", tags: ["Best Value"], image: IMGS.tenders },
      { name: "Family Pack", price: "$44.99", desc: "24pc wings or mix, 3 loaded fries, 4 drinks.", tags: ["Feeds 4"], image: IMGS.classicWings },
    ],
  },
];

// ─── Locations ────────────────────────────────────────────────────────────────
export const locations = [
  { name: "CraveWing — Wicker Park", address: "1847 N Milwaukee Ave, Chicago, IL 60647", phone: "(312) 555-0101", hours: "Mon–Thu 11am–11pm · Fri–Sat 11am–1am · Sun 12pm–10pm", slug: "wicker-park" },
  { name: "CraveWing — Logan Square", address: "2401 N California Ave, Chicago, IL 60647", phone: "(312) 555-0202", hours: "Mon–Thu 11am–11pm · Fri–Sat 11am–1am · Sun 12pm–10pm", slug: "logan-square" },
  { name: "CraveWing — River North", address: "540 N Wells St, Chicago, IL 60654", phone: "(312) 555-0303", hours: "Mon–Thu 11am–12am · Fri–Sat 11am–2am · Sun 11am–11pm", slug: "river-north" },
  { name: "CraveWing — Evanston", address: "818 Church St, Evanston, IL 60201", phone: "(847) 555-0404", hours: "Mon–Thu 11am–10pm · Fri–Sat 11am–11pm · Sun 12pm–9pm", slug: "evanston" },
];

// ─── Open Roles ───────────────────────────────────────────────────────────────
export const openRoles = [
  { title: "Line Cook", location: "Chicago, IL — Multiple Locations", type: "Full-time / Part-time", desc: "You know your way around a fryer and keep calm during a rush. We want you on our wing-making crew." },
  { title: "Front of House Lead", location: "River North, IL", type: "Full-time", desc: "You are the face of CraveWing. Warm, fast, and obsessed with making every guest feel like a regular." },
  { title: "Shift Supervisor", location: "Logan Square, IL", type: "Full-time", desc: "Natural leader, coolheaded problem solver. Lead shifts, support the team, keep the flavor flowing." },
  { title: "Social Media Coordinator", location: "Remote / Chicago HQ", type: "Full-time", desc: "You speak TikTok and Instagram fluently, love food culture, and know how to make a sauce drip go viral." },
  { title: "Delivery Driver", location: "Chicago, IL — All Locations", type: "Part-time / Flexible", desc: "Hot wings delivered fast. You make sure the crunch makes it to the door." },
];

// ─── Catering Packages ────────────────────────────────────────────────────────
export const cateringPackages = [
  {
    name: "The Snack Pack",
    serves: "Serves 10–15",
    price: "$129",
    items: ["40 wings (2 sauce choices)", "3 loaded fries", "Ranch & bleu cheese dips", "Plates & napkins"],
    featured: false,
  },
  {
    name: "The Party Tray",
    serves: "Serves 20–30",
    price: "$229",
    items: ["80 wings (3 sauce choices)", "5 loaded fries", "2 dozen boneless", "All dipping sauces", "Plates & napkins"],
    featured: true,
  },
  {
    name: "The Flavor Feast",
    serves: "Serves 40–60",
    price: "$429",
    items: ["160 wings (unlimited sauces)", "Boneless & tenders", "10 loaded fries", "Sandwich platter", "Full service setup"],
    featured: false,
  },
];
