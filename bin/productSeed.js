
const mongoose = require("mongoose");

const Products = require("../models/product-model.js");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const productData = [
  {
    sku: 12345,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://www.vondutch.fr/3776-thickbox_default/T-shirt-Homme-Von-Dutch-Eagle-Ride-Free-Gris-Clair.jpg",
    brand: "brand-A",
    price: 10.9,
    description:
      "Brand A T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-A Summer",
    size: ["S", "XS"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12346,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://images.unsplash.com/photo-1513269890889-8e4e362e5593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    brand: "brand-B",
    price: 10.7,
    description:
      "Brand B T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-B Summer",
    size: ["S", "L", "M", "XS", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12333,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ssl.quiksilver.com/www/store.quiksilver.eu/html/images/catalogs/global/quiksilver-products/all/default/large/eqmzt03070_freediver,w_brq0_frt1.jpg",
    brand: "brand-C",
    price: 11.7,
    description:
      "Brand C T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-C Summer",
    size: ["M", "XS", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12334,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ih1.redbubble.net/image.25547366.5265/ra,unisex_tshirt,x2200,fafafa:ca443f4786,front-c,392,146,750,1000-bg,f8f8f8.u3.jpg",
    brand: "brand-C",
    price: 15.7,
    description:
      "Brand C T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-C winter",
    size: ["L", "M", "XS", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12322,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://calvinklein-eu.scene7.com/is/image/CalvinKleinEU/J30J310405_099_main?$listing$",

    brand: "brand-C",
    price: 14.7,
    description:
      "Brand C T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-C summer",
    size: ["L", "M", "XS", "XL", "XS"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12333,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ih1.redbubble.net/image.25547366.5265/ra,unisex_tshirt,x2200,fafafa:ca443f4786,front-c,392,146,750,1000-bg,f8f8f8.u3.jpg",
    brand: "brand-C",
    price: 13.7,
    description:
      "Brand C T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-C winter",
    size: ["L", "M"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12133,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ih1.redbubble.net/image.376479407.8280/rco,mens_premium_t_shirt,mens,x1770,fafafa:ca443f4786,front-c,295,40,750,1000-bg,f8f8f8.lite-3u1.jpg",
    brand: "brand-D",
    price: 11.2,
    description:
      "Brand D T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-D summer",
    size: ["L", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12333,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ih1.redbubble.net/image.478694465.7798/rco,mens_premium_t_shirt,mens,x1770,fafafa:ca443f4786,front-c,295,40,750,1000-bg,f8f8f8.lite-3u1.jpg",
    brand: "brand-E",
    price: 9.2,
    description:
      "Brand E T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-E summer",
    size: ["M", "S"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12300,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://ih0.redbubble.net/image.333424266.6808/ra,classic_tee,x2000,101010:01c5ca27c6,front-c,325,112,750,1000-bg,f8f8f8.u2.jpg",
    brand: "brand-E",
    price: 9.4,
    description:
      "Brand E T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-E summer",
    size: ["M", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12301,
    category: "man",
    subcategory: "t-shirt",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzIcZumSvaYBwDfDpfOco9i5t8qyN4P83u26y4zexSiW3yo1n",
    brand: "brand-E",
    price: 9.3,
    description:
      "Brand E T shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-E summer",
    size: ["L", "S"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12301,
    category: "man",
    subcategory: "shirt",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img16/men-apparel/stores/shirt/formal._V507778024_.jpg",
    brand: "brand-E",
    price: 9.3,
    description:
      "Brand E shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-E summer",
    size: ["L", "S"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 12302,
    category: "man",
    subcategory: "shirt",
    image: "https://images-na.ssl-images-amazon.com/images/I/41k7z-JzOIL.jpg",
    brand: "brand-D",
    price: 11.3,
    description:
      "Brand E shirt with cotton fabric, wahshable and good for summer",
    name: "Brand-D summer",
    size: ["L", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13456,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/K4/42/1C/07/CQ/11/K4421C07C-Q11@10.jpg",
    brand: "KIOMI",
    price: 20,
    description:
      "Outer fabric material: 95% polyester, 5% elastane,Fabric: Jersey,Care instructions: Do not tumble dry, machine wash at 30°C, Machine wash on gentle cycle",
    name: "Jersey Dress",
    size: ["S", "M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13467,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/M9/12/1C/2U/VK/11/M9121C2UV-K11@15.1.jpg",
    brand: "MANGO",
    price: 40,
    description:
      "Outer fabric material: 100% polyester,Care instructions: Do not tumble dry, machine wash at 30°C, Machine wash on gentle cycle",
    name: "AMANDI-dress",
    size: ["M", "L", "XXL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13489,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/V1/02/1C/18/4Q/11/V1021C184-Q11@8.jpg",
    brand: "VILA",
    price: 35,
    description:
      "Outer fabric material: 97% polyamide, 3% elastane,Lining: 100% polyester, Fabric: Lace,Care instructions: Do not tumble dry, machine wash at 30°C, A shrinkage of up to 5% may occur,",
    name: "VISTASIA - Cocktail dress / Party dress",
    size: ["S", "L", "XL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13567,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/SI/L2/1C/00/0Q/11/SIL21C000-Q11@11.jpg",
    brand: "SISTA GLAM PETITE MARINA",
    price: 70,
    description:
      "Outer fabric material: 96% polyester, 4% elastane,Care instructions: Machine wash at 40°C, do not tumble dry, Machine wash on gentle cycle",
    name: "MARINA - Maxi dress",
    size: ["M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13478,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/M3/22/1C/0Q/AF/11/M3221C0QA-F11@10.jpg",
    brand: "MINT&BERRY",
    price: 40,
    description:
      "Outer fabric material: 100% polyester,Lining: 100% polyester,Care instructions: Do not tumble dry, machine wash at 30°C, Machine wash on gentle cycle,",
    name: "Day dress",
    size: ["S", "M"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13678,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/AN/62/1C/11/7I/11/AN621C117-I11@10.jpg",
    brand: "ANNA FIELD",
    price: 56,
    description:
      "Outer fabric material: 100% polyester,Lining: 100% polyester,Fabric: Chiffon,Care instructions: Do not tumble dry, machine wash at 30°C, Machine wash on gentle cycle,",
    name: "Occasion wear",
    size: ["S", "M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13123,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/IV/32/1C/02/WA/11/IV321C02W-A11@15.jpg",
    brand: "IVY & OAK",
    price: 155,
    description: "Outer fabric material: 75% cotton, 25% nylon,Fabric: Lace",
    name: "OPEN BACK FLARED - Cocktail dress / Party dress",
    size: ["M", "L", "XXXL"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13409,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/SG/72/1C/05/9G/12/SG721C059-G12@16.jpg",
    brand: "SWING",
    price: 130,
    description:
      "Outer fabric material: 86% polyamide, 12% polyester, 2% elastane,Bottom part material: 100% polyester,Lining: 95% polyester, 5% elastane,Fabric: Lace, chiffon,Care instructions: Dry clean only",
    name: "Cocktail dress / Party dress",
    size: ["S", "M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13490,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/M0/92/1C/06/GF/11/M0921C06G-F11@19.1.jpg",
    brand: "MASCARA",
    price: 265,
    description: "Outer fabric material: 100% polyester,Lining: 100% polyester",
    name: "Occasion wear",
    size: ["S"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13434,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/TF/12/1C/0F/GK/11/TF121C0FG-K11@9.jpg",
    brand: "TFNC",
    price: 60,
    description:
      "Outer fabric material: 100% polyester,Lining: 100% polyester,Care instructions: Hand wash only",
    name: "WHITNEY MAXI - Occasion wear",
    size: ["M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13345,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/JC/42/1C/02/8K/11/JC421C028-K11@10.jpg",
    brand: "J.CREW",
    price: 85,
    description:
      "Outer fabric material: 100% cotton,Care instructions: Machine wash at 30°C",
    name: "SYBIL SHIRTDRESS POPLIN - Dress",
    size: ["S"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13657,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/SE/52/1C/0L/LA/11/SE521C0LL-A11@11.jpg",
    brand: "SELECTED FEMME",
    price: 75,
    description:
      "Outer fabric material: 100% polyester,Lining: 100% viscose,Care instructions: Machine wash at 40°C, do not tumble dry, Machine wash on gentle cycle",
    name: "SLFMADDIE DAMINA ANKLE DRESS - Dress",
    size: ["S", "M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13376,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-zoom/MW/72/1C/03/EK/11/MW721C03E-K11@12.jpg",
    brand: "WEEKEND MaxMara",
    price: 335,
    description:
      "Outer fabric material: 100% cotton,Contains non-textile parts of animal origin: Yes,Care instructions: Hand wash only, Dry cleanable",
    name: "ELETTRA - Dress",
    size: ["M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13097,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic04.ztat.net/vgs/media/pdp-zoom/GS/12/1C/06/KK/11/GS121C06K-K11@9.jpg",
    brand: "G-STAR RAW",
    price: 78,
    description:
      "Outer fabric material: 57% polyester, 43% viscose,Care instructions: Do not tumble dry, machine wash at 30°C",
    name: "CORE FLARE DRESS L/S - Dress - sartho blue",
    size: ["S", "M"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13009,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-gallery/L4/22/1C/0N/MQ/11/L4221C0NM-Q11@7.jpg",
    brand: "RALPH LAUREN",
    price: 160,
    description:
      "Outer fabric material: 94% viscose, 6% elastane,Fabric: Jersey,Care instructions: Hand wash only",
    name: "NEO DEACON - Shift dress",
    size: ["M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  },
  {
    sku: 13577,
    category: "women",
    subcategory: "dresses",
    image:
      "https://mosaic03.ztat.net/vgs/media/pdp-gallery/LE/O2/1C/01/6A/11/LEO21C016-A11@9.jpg",
    brand: "LEZ A LEZ",
    price: 54,
    description:
      "Outer fabric material: 94% viscose, 6% elastane,Fabric: Jersey,Care instructions: Hand wash only",
    name: "Jersey dress",
    size: ["M", "L"],
    isFreeShipping: true,
    isVerified: "verified"
  }
];

Products.create(productData)
  .then(productResults => {
    console.log(`Inserted ${productResults.length} Products`);
  })
  .catch(err => {
    console.log("Created failure", err);
  });
