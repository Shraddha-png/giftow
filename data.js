// const { default: Rating } = require("../Frontend/src/Components/Ratings");
const bcrypt = require('bcrypt');



const data = {
    users: [
        {
            name: 'Admin User',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456', 10),

        },
        {
            name: 'John Doe',
            email: 'john@example.com',
            password: bcrypt.hashSync('123456', 10),

        },

    ],
    products: [

        {
            // _id: '2',
            name: 'Electric Coffee Stirring Cup, Automatic Coffee Cup, Automatic Stirring Milk Coffee Cup, Lazy Stirring Cup, Magnetic Cup',
            capacity: "120 ml",
            slug: "Tea and Coffee Mug-2",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-1.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: "For effortless convenience, this mug features automatic stirring for your hot drinks with just the press of a button. For busy mornings, this smart mug is designed to evenly mix your coffee, milk, or juice without any extra effort. For durability and style, this stainless steel mug is the perfect addition to your drinkware collection."
        },
        {
            // _id: '3',
            name: 'Taza De Café De Acero Inoxidable Para Oficina, Taza De Bebida Para El Hogar, Adecuada Para Beber Diariamente En Interiores',
            capacity: "200 ml",
            slug: " Tea and Coffee Mug-3",
            category: "Mug",
            variety: "250ml",
            code: "01",
            image: "/images/Mugs/Coffee/tea-coffee-2.jpeg",
            price: 0,
            countInStock: 50,

            description: "High Quality"
        },
        {

            name: 'Black Magic Mug - Heat Activated Color Changing Mug - Popular custom mugs',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-4",
            category: "Mug",
            variety: "250ml",
            code: "01",
            image: "/images/Mugs/Coffee/tea-coffee-3.jpeg",
            price: 0,
            countInStock: 10,

            description: "A magic mug, also known as a heat changing mug, transforming mug, or disappearing mug is a mug that changes color when it is filled with a hot liquid. This effect is created by using thermochromic ink."
        },
        {

            name: 'Blessed, Mug Inspirational Gift for Christians, Pastors, and Church Members - Etsy',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-5",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-4.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "At [Your Company Name], we specialize in creating custom magic coffee mugs that reveal personalized designs when filled with hot liquid. Whether for personal use, gifts, or promotional items, we offer a variety of options to suit your preferences.Our Types:Heat-Activated Magic Coffee Mugs: Watch as your design magically appears when filled with hot coffee or tea.Color-Changing Magic Coffee Mugs: Choose from various color-changing effects for a unique visual experience.Event Names: Include event names or dates to commemorate special occasions.Logo and Printing Options:Logo Printing: Add your company logo or custom design for promotional purposes.Custom Prints: Choose from various prints such as patterns, illustrations, or thematic designs. Customization Options:Color Options: Select from a range of colors to complement your design or branding.Font Choices: Choose different fonts to match your theme or personal preference.Handle Design: Customize the mug handle with initials or small designs for added personalization.For more information or to place an order, please reach out to us at:Phone: 9920033112 , Email: fmprintsolutions@gmail.com"
        },
        {

            name: 'Coffee Mug with Stainless Steel',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-6",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-5.jpg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "This Elegant Looking Mug is made with Food Plastic and Non-Magnetic Stainless Steel.As outer wall is made of Food Plastic, it is withstand Tea/Coffee Heat and is very comfortable to hold.Design of Mug provide wide range of advantages over normal tea/coffee mugs.Specially crafted to enhance the look of your kitchen. Long Life and Elegant. Ideal for daily use in home, office, workplace, canteen, shop and etc."
        },
        {

            name: 'Design Your Own Black Mug',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-7",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-6.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "Microwave-safe products do not break upon heating, they do not leach chemicals into the food or air, or damage the appliance. Dishwasher-safe refers to dishes that can withstand the high temperatures of wash cycles and strong detergents, without impacting their quality in any way. dishwasher and microwave safe"
        },
        {

            name: 'Large Ceramic Coffee Mug with Cork Bottom and Splash Proof Lid for Men, Women, Big Mug for Coffee Latte, Tea,',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-8",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-7.jpeg",
            price: 0,
            countInStock: 10,
            variety: "250ml",
            code: "01",

            description: "Best Coffee Mugs For All Drinks - These coffee cups have the perfect capacity of 15 oz, which makes them ideal for all types of your daily drinks. Whether you want to use them for your favorite cup of coffee, hot cocoa, juice, smoothie or even oatmeal, the large coffee mugs are your best companions.Superbly Gifting Idea - With beautiful matte ceramic finish and an elegant design, the coffee mug set is a great gifting solution for couples as well as during festivals. The external surface of these coffee mugs offers you an ideal space for writing your message or drawing to make a personalized gift.Does Not Overflow - The specially designed lid has a rubber gasket on the edge, which can keep the beverage hot for nearly an hour. Just make sure not to turn the coffee cup full of lid upside down, the drinks will be overflow. You can enjoy a drink through the sliding door at the top.Ergonomic Design And Cork Bottom - With cork bottom, the coffee mugs for women can be placed on the table or any surface. Its ergonomic design mug handle allows it to be used comfortablySuitable For Hand Washing - The ceramics used to make these coffee cups are of the best quality. Don't soak the cork in the water for a long time. These cups can be placed in the refrigerator or freezer, Except for dishwasher, microwave and oven."
        },
        {

            name: 'Mommy and Daddy Monogram Pink and Grey',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-9",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-8.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "High Quality"
        },
        {

            name: 'Portable Vacuum Flask Coffee Cup - New Bamboo Thermos Stainless Steel',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-10",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-9.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "-"
        },
        {

            name: 'Valentines day  white mug mockup, 11oz coffe cup template mock up, Valentine day white cup mockup bundle, Couples mug mockup',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-11",
            category: "Mug",
            image: "/images/Mugs/Coffee/tea-coffee-10.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "-"
        },
        {

            name: 'ECO FRIENDLY MUG',
            capacity: "200 ml",
            slug: "Tea and Coffee Mug-12",
            category: "Mug",
            image: "/images/Mugs/Coffee/ECO-FRIENDLY-MUG.jpg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,

            description: "-"
        },
        {

            name: 'Corel Shape Ceramic Mug',
            capacity: "150 ml",
            slug: "Tea and Coffee Mug-13",
            material: "Stainless Steel",
            image: "/images/Mugs/Coffee/5680647.jpg",
            category: "Mug",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'tea mug',
            capacity: "180 ml",
            slug: "Tea and Coffee Mug-14",
            material: " Rice Husk",
            category: "Mug",
            image: "/images/Mugs/Coffee/mug-11.png",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 20,
            description: "High Quality"
        },
        {

            name: 'Tea mug',
            capacity: "150 ml",
            slug: "Tea and Coffee Mug-15",
            material: "Stainless Steel",
            category: "Mug",
            image: "/images/Mugs/Coffee/mug-12.png",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 50,
            description: "High Quality"
        },
        {

            name: 'Coffee',
            capacity: "180 ml",
            slug: "Tea and Coffee Mug-16",
            material: "Stainless Steel",
            category: "Mug",
            image: "/images/Mugs/Coffee/mug-13.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 10,
            description: "High Quality"
        },

    ],


    tshirts: [
        {
            // _id: '1',
            name: 'Branding Desarrollo En El Campo Projects __ Photos, videos, logos, illustrations and branding',
            slug: "tshirts-1",
            category: "T-Shirt",
            image: "/images/Printing/t-shirt1.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 15,
            description: "High Quality product",
        },
        {
            // _id: '2',
            name: 'Sweatshirt weiss Gildan 18000 Mock up Mann Print on demand',
            slug: "tshirts-2",
            category: "T-Shirt",
            image: "/images/Printing/t-shirts-2.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: "High Quality",
        },
        {
            // _id: '3',
            name: 't_shirt collar cotton removebg preview',
            slug: "tshirts-3",
            category: "T-Shirt",
            image: "/images/Printing/Kion.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 50,
            description: "High Quality",
        },
        {
            // _id: '4',
            name: 'T-shirt 4',
            slug: "tshirts-5",
            category: "T-Shirt",
            image: "/images/Printing/t-shirts-4.jpeg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,
            description: "High Quality",
        },
        {
            // _id: '4',
            name: 'T-shirt 5',
            slug: "tshirts-6",
            category: "T-Shirt",
            image: "/images/Printing/t-shirts6.jpg",
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 10,
            description: "High Quality",
        }
    ],

    frostedMugs: [
        {
            name: 'FROSTED COFFEE MUG (SUBLIMATION MUG)',
            slug: 'Mug-1',
            category: 'Mugs',
            capacity: '300 ml',
            material: 'Glass',
            image: '/images/Mugs/frosted/frosted-mug-1.jpeg',
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 15,
            description: '-',
        },
        {
            name: 'FROSTED BEER MUG',
            slug: 'Mug-2',
            category: 'Mugs',
            capacity: '500 ml',
            material: 'Glass',
            image: '/images/Mugs/frosted/FROSTED-BEER-MUG.jpg',
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
        {
            name: 'Frosted Glass Mug Mockup',
            slug: 'Mug-3',
            category: 'Mugs',
            capacity: '500 ml',
            material: 'Glass',
            image: '/images/Mugs/frosted/Frosted-Glas- Mug-Mockup.jpeg',
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
        {
            name: 'Sublimatable Gradient Frosted Glass Mug',
            slug: 'Mug-4',
            category: 'Mugs',
            capacity: '500 ml',
            material: 'Glass',
            image: '/images/Mugs/frosted/frosted-mug -2.jpeg',
            price: 0,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },


    ],
    awards: [
        {
            name: 'Wholesale Walnut Black Glass Wood Plaques For Competition Prizing Ceremony Souvenirs Award',
            slug: 'Awards-2',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Awards/award-3.jpeg',
            price: 0,
            variety: "-",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
        {
            name: 'Clear Crystal Award',
            slug: 'Awards-3',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Awards/Awards-1.png',
            price: 0,
            variety: "-",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
        {
            name: 'Transparent Award Trophy',
            slug: 'Awards-4',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Awards/602.jpeg',
            price: 0,
            variety: "-",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
        {
            name: 'Custome Award Trophies, Customized Crystal Gifts',
            slug: 'Awards-5',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Awards/Awards-2.png',
            price: 0,
            variety: "-",
            code: "01",
            countInStock: 20,
            description: 'High Quality',
        },
    ],
    badges: [
        {
            name: 'Metal Name Tag',
            slug: 'Badge-1',
            category: 'badge',
            material: 'Metal',
            image: '/images/Badges/metal-badge-1.jpeg',
            price: 26,
            variety: "250ml",
            code: "01",
            countInStock: 15,
            description: 'Metal Name Tags: Durable and professional, available in various shapes and sizes with customizable engravings.We offer a range of standard sizes and custom dimensions to fit your specific requirements.',
        },

        {
            name: 'Round Pin Badge',
            slug: 'Badge-2',
            category: 'Badge',
            material: 'Metal',
            image: '/images/Badges/Custom Magnets - Badge Magnet.jpeg',
            price: 13,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'Round Pin Badges: Classic round badges, perfect for promotions, events, and brand awareness.',
        },
        {
            name: 'Rose Gold Metal Tag Nametag',
            slug: 'Badge-3',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Badges/badge-2.jpeg',
            price: 26,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'Rose Gold Metal Name Tags: Elegant and sophisticated, these name tags add a touch of luxury to your identification needs.',
        },
        {
            name: 'Dom Magnetic Badge',
            slug: 'Badge-4',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Badges/dom-badge.jpeg',
            price: 26,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'Dom Magnetic Badges: High-quality badges with magnetic backs for easy attachment and removal, available with full-color printing or custom engravings.',
        },
        {
            name: 'Wooden Engraved Name Tag',
            slug: 'Badge-5',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Badges/wooden-badge.jpeg',
            price: 26,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'Wooden Engraved Name Tags: Eco-friendly and unique, these name tags offer a natural look with precision engraving.',
        },
        {
            name: 'Sunboard and Acrylic Name Tas',
            slug: 'Badge-6',
            category: 'Mugs',
            material: 'Glass',
            image: '/images/Badges/acrylic-badge-1.png',
            price: 26,
            variety: "250ml",
            code: "01",
            countInStock: 20,
            description: 'Sunboard and Acrylic Name Tags: Lightweight and versatile, these name tags are ideal for a variety of settings with customizable options.',
        },


    ],
    bags: [
        {
            name: 'Natural Jute Bag',
            slug: 'bag-1',
            category: 'bag',
            material: 'Jute',
            image: '/images/Bags/Naturel-Jute-Bag.jpg',
            variety1: '12*12*6 Inch',
            variety2: '14*16*6 Inch',
            variety3: '-',
            variety4: '-',
            code: 'FM-911',
            price: 0,
            countInStock: 15,
            description: 'Eco Friendly and Waterproof - Made from 100% natural burlap which is laminated inside Comfort, Durable and Lightweight - 100% Bio degradable and Recyclable, Eco Friendly Jute Bag. Bio degradable and eco-friendly.REASONS TO BUY Jute India JUTE BAGS – These Jute Bags online are reusable as Jute bags for lunch for men.Light weight and foldable for easy storage. You will love to carry this eco-friendly affordable durable bag day by day.',
        },
        {
            name: 'White Jute Bag',
            slug: 'bag-2',
            category: 'Jute bag',
            material: 'White Jute',
            image: '/images/Bags/Tote-Bag.jpg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6 Inch',
            variety3: '-',
            variety4: '-',
            code: 'FM-912',
            price: 0,
            countInStock: 15,
            description: 'The tote bag is perfect for your everyday shopping needs. Each bag has been crafted to carry upto 35 lbs of weight. It is 100% biodegradable and can replace thousands of plastic bags every year.Material: 100% Cotton (5oz - light fabric) | Color: Natural (Natural, Non Dyed). BIODEGRADABLE; Our canvas tote bags are totally compostable, meaning that these reusable tote bags won’t clog up landfills; Save on plastic with our large tote bags ; Our foldable shopping bags are made from 100 percent unbleached cotton. Make your canvas cloth totes stand out from the crowd; These heavy duty tote bags can be personalized with screen printing or embroidery; Make your mark on a reusable tote and create cloth grocery bags as colorful as you are. Our reusable bags are designed to last a minimum of 150 uses each; For reusable shopping bags that will hold up under any conditions',
        },
        {
            name: 'Tapeta Nylon Bag',
            slug: 'bag-3',
            category: ' Nylon bag',
            material: 'Nylon',
            image: '/images/Bags/Naylon.jpg',
            variety1: '8*12 Inch',
            variety2: '12*16 Inch',
            variety3: '-',
            variety4: '-',
            code: 'FM-913',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Felt Bag',
            slug: 'bag-4',
            category: 'Nylon bag',
            material: 'Nylon',
            image: '/images/Bags/Felt.jpg',
            variety1: '12*14*4 inch',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            code: 'FM-914',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Jute White Bag',
            slug: 'bag-5',
            category: 'Jute bag',
            material: 'Jute',
            image: '/images/Bags/Jute-bags/JU-WHITTAPE_b.jpg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6 Inch',
            variety3: '-',
            variety4: '-',
            code: 'FM-915',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Tote Bag Long Handle',
            slug: 'bag-6',
            category: 'Tote bag',
            material: 'Tote',
            image: '/images/Bags/Tote-Bag-Long-Handle.jpg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Butterfly Tote Bag,  gifts, cute bag, holy bag_',
            slug: 'bag-7',
            category: 'Tote bag',
            material: 'Tote',
            image: '/images/Bags/Butterfly-Tote-Bag.jpeg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Custom Literature Tote Bag,  Literature Student Graduation Gift',
            slug: 'bag-8',
            category: 'Tote bag',
            material: 'Tote',
            image: '/images/Bags/Custome-Tote-Bag.jpeg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },

        {
            name: 'Factory wholesale canvas bags reusable canvas shopping bags blank cotton tote bags',
            slug: 'nonwoven bag- 10',
            category: 'nonwoven',
            material: 'nonwoven',
            image: '/images/Bags/Non-woven-bag-2.jpeg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'brand design - Studio Vivai',
            slug: 'Paper bag- 12',
            category: 'paper bag',
            material: 'paper',
            image: '/images/Bags/Paper-bag/fashion-handbag.jpeg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Mens Backpack Lightweight Simple Travel Bag School Bag Business',
            slug: 'bagpack- 18',
            category: 'backpack',
            material: 'backpack',
            image: '/images/Bags/Bagpack/Bagpack.jpeg',
            variety1: '12*12*6 inch',
            variety2: '14*16*6',
            variety3: '-',
            variety4: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 15,
            description: 'High Quality',
        },
      
    ],
    mugs: [
        {
            name: 'Insulated Thumbler',
            slug: 'Mug-1',
            capacity: '450ml',
            material: 'Stainless Steel (Double layer)',
            image: '/images/Mugs/mugs-1.jpg',
            price: 0,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Keep Hot and Cold-- The double wall vacuum insulated travel mug keeps hot/ iced beverage for 12 hours. Suitable for outdoor adventure, road trips, sports event, home, office, fit most of vehicle cup holders.Leak-proof-- Our coffee mug is equipped with a leak-proof lid allows it without leaking. The bottom of the coffee mug has a non-slip silicone pad to prevent it from sliding and tipping over.Easy Operate-- 510ML drinking capacity, the lid can be open or close by one hand. There is a handle on the lid for easy to carry. Easily remove the lid by twisting for quick filling and cleaningFunction-- Suitable for office, travel, school, work, car cup, indoor and outdoor. It is suitable for anyone, student or worker to enjoy coffee, tea, wine, juice.Reusable-- Double wall coffee cup is made of high quality stainless steel and food grade PP with BPA free polypropylene lid, durable and prevents the increase of bacteria.',
        },
        {
            name: 'Spill Proof Mug',
            slug: 'Mug-2',
            capacity: '200ml',
            material: 'Stainless Steel (Double layer)',
            image: '/images/Mugs/SPILL-PROOF-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Introducing the Swiss Military Stainless Steel Insulated Coffee Mug, the perfect blend of style, functionality, and convenience for your daily beverage needs. Crafted with precision and quality in mind, this sleek mug is designed to elevate your drinking experience whether youre at the office, commuting, or traveling.Constructed from durable stainless steel, this mug ensures long-lasting performance and superior insulation to keep your drinks hot or cold for up to 2 hours. Say goodbye to lukewarm coffee or tepid tea – with this insulated mug, your beverages will stay at the perfect temperature from the first sip to the last drop.Equipped with innovative spill-proof suction technology, this mug offers a mess-free solution for enjoying your favorite drinks on the move. Simply place it on a flat surface and watch as the suction base keeps it firmly in place, preventing accidental spills or tipping over. The included lid adds an extra layer of convenience, helping to retain heat and prevent spills during transportation. Designed with practicality in mind, this mug features an anti-skid base to provide stability on various surfaces, while the ergonomically designed handle offers a comfortable grip for easy carrying and sipping',
        },
        {
            name: 'Insulated Hot and Cold Mug',
            slug: 'Mug-3',
            capacity: '150ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/INSULATED-HOT-&-COLD-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Self Stirring mug',
            slug: 'Mug-4',
            capacity: '150ml',
            material: 'Stainless Steel (Double layer)',
            image: '/images/Mugs/SELF-STIRRING-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Take The Strain Out Of Stirring With The Self-stirring Mug. No Need To Grab A Teaspoon And Stir, Simply Press The Button And All The Hard Work Is Done For You. Its The Ultimate Idle Drinking Accessory! The Self-stirring Mug Is Also Insulated And Comes With A Non-spill Lid To Keep Your Drink Warm For Ages, What More Can You Ask From A Mug? Its Perfect For Tea, Coffee, Hot Chocolate And Even Most Soups.',
        },
        {
            name: 'Wooden mug',
            slug: 'Mug-5',
            capacity: '180ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/WOODEN-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Bamboo Coffee Mug Stainless Steel Wooden Coffee Tea Cup Insulated 12oz Features: Eco-friendly Bamboo: The thermos bottle made of natural bamboo, show a unique and stylish look, recyclable and reusable. Interior is constructed from 304 Stainless Steel. Multi-functional Travel Mug: Bamboo coffee mug works great for delic',
        },
        {
            name: 'Wooden Coffee Tumbler',
            slug: 'Mug-6',
            capacity: '200ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/WOODEN-COFFEE-TUMBLER.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Bamboo Coffee Mug Stainless Steel Wooden Coffee Tea Cup Insulated 12oz Features: Eco-friendly Bamboo: The thermos bottle made of natural bamboo, show a unique and stylish look, recyclable and reusable. Interior is constructed from 304 Stainless Steel. Multi-functional Travel Mug: Bamboo coffee mug works great for delic',
        },
        {
            name: 'Travel Tumbler',
            slug: 'Mug-7',
            capacity: '150ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/TRAVEL-TUMBLER.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'High Quality',
        },
        {
            name: 'Two Tone Sublimation  mug',
            slug: 'Mug-8',
            capacity: '300ml',
            material: 'Ceramic',
            image: '/images/Mugs/TWO-TONE-SUBLIMATION-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we specialize in crafting custom two-tone sublimation mugs that add a vibrant and personalized touch to your beverage experience. Perfect for promotional giveaways, personal gifts, or special events, our mugs are designed to stand out with high-quality sublimation printing.Two-tone sublimation mugs feature a striking color contrast between the interior and the exterior, making your custom designs and messages pop.Color Combinations: Choose from a variety of interior and exterior color combinations to suit your brand or personal style.Personalized Printing: Add your company logo, special messages, or custom designs to make your mug truly unique.Full-Color Sublimation: Utilize the full-color sublimation process to ensure vibrant and long-lasting prints.Personal Gifts: Perfect for birthdays, anniversaries, or any special occasion. Create a custom design that reflects personal sentiments or special memories.Event Favors: Great for weddings, parties, or corporate functions where guests can take home a memorable and practical keepsake. For more information or to place an order, please reach out to us at: Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Heart Shape handle Mug',
            slug: 'Mug-9',
            capacity: '300ml',
            material: 'Ceramic',
            image: '/images/Mugs/HEART-SHAPED-HANDLE.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we offer custom heart-shaped sublimation mugs that are perfect for adding a touch of love and personalization to your daily coffee or tea routine. Ideal for gifts, promotions, or special occasions, our heart-shaped mugs are designed to make a memorable impression.Our heart-shaped sublimation mugs feature a unique design that combines functionality with a romantic touch, making them perfect for any heartfelt occasion.Customization Options: Personalized Printing: Add your custom designs, names, special messages, or logos with full-color sublimation for vibrant and lasting prints.Color Choices: Choose from a range of colors to match your branding or personal style. Customize the mugs exterior or interior to create a unique look Design Layouts: Utilize the heart-shaped design to create eye-catching layouts, including romantic messages, anniversary dates, or personal photos.Gifts: Ideal for Valentines Day, anniversaries, weddings, or any occasion where a touch of love and personalization is perfect. Create a mug that holds special meaning for the recipient.Promotions: Use as a promotional item for businesses looking to make a memorable impression with a unique and thoughtful gift.Event Favors: Perfect for weddings, bridal showers, or parties where guests can take home a keepsake that reflects the theme of the event.For more information or to place an order, please reach out to us at:Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Full White sublimation Mug',
            slug: 'Mug-10',
            capacity: '200ml',
            material: 'Stainless Steel (Double layer)',
            image: '/images/Mugs/FULL-WHITE-SUBLIMATION-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we offer custom full white sublimation mugs that provide a pristine canvas for your creative designs. Perfect for a wide range of applications, from promotional items to personal gifts, our full white mugs are designed to showcase your graphics and messages with clarity and style. Our full white sublimation mugs are ideal for vibrant and detailed customization, featuring a clean white surface that enhances the quality and visibility of your prints.Customization Options:Personalized Printing: Add your custom designs, logos, messages, or images with full-color sublimation. The white surface ensures that colors appear bright and true to design.Design Flexibility: Create full-wrap designs or focal-point graphics that utilize the entire surface area of the mug. Perfect for intricate details and comprehensive branding.Color Matching: Utilize the clean white background to achieve precise color matching and high-quality prints, making your designs stand out.For more information or to place an order, please reach out to us at: Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Corel Shape Ceramic Mug',
            slug: 'Mug-11',
            capacity: '150ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/CHIPFLASK -CERAMIC-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we offer custom ceramic mugs featuring Corel shapes and designs that can be tailored to your unique specifications. Whether for marketing purposes, special events, or personal gifts, our Corel shapes ceramic mugs provide a sophisticated and personalized touch Our Corel shapes ceramic mugs are ideal for showcasing detailed and unique designs. Corel shapes allow for intricate patterns and graphics that make your mug stand out.Customization Options: Corel Shapes Designs: Utilize CorelDRAW or other graphic design tools to create complex shapes and patterns for your mug. We can print these designs in high detail to ensure your vision is brought to life. Personalized Printing: Add custom logos, messages, or images to your ceramic mugs using advanced printing techniques. Full-color sublimation ensures vibrant and durable prints.Color Choices: Choose from a variety of ceramic mug colors and finishes to complement your Corel shapes designs. Opt for classic white, or explore different hues to match your branding or personal preference.Marketing and Promotions: Perfect for corporate gifts, trade shows, or promotional events. Print your company logo or campaign graphics with Corel shapes for an eye-catching and professional lookPersonal Gifts: Ideal for creating custom mugs with intricate designs for birthdays, anniversaries, or special occasions. Personalize with Corel shapes to add a unique touch.Event Favors: Great for weddings, parties, or corporate functions. Create memorable keepsakes that feature detailed Corel shapes designs reflecting the theme of your event.please reach out to us at:Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Frosted Beer Mug',
            slug: 'Mug-12',
            capacity: '500ml',
            material: 'Glass',
            image: '/images/Mugs/frosted/FROSTED-BEER-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we offer unique frosted mugs that combine playful design with practical use. Perfect for gifts, promotional items, or special occasions, our frosted bear mugs are designed to stand out with their charming and distinctive appearance. Our frosted bear mugs feature a fun and engaging bear shape, adding a whimsical touch to your drinkware collection.Customization Options:Personalized Printing: Add custom designs, logos, or messages to the frosted surface of the bear mugs. The frosted texture provides a unique backdrop for your prints.Design Flexibility: Choose from various printing options to create eye-catching graphics or text that complement the playful bear design.Color Choices: While the mug itself has a frosted finish, you can choose colors for any printed designs to enhance visibility and impact.Gifts: Ideal for children’s birthdays, family gatherings, or any occasion where a touch of whimsy is perfect. Customize with names, messages, or images to create a memorable gift.please reach out to us at:Phone: Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Frosted Coffee Mug',
            slug: 'Mug-13',
            capacity: '300ml',
            material: 'Glass',
            image: '/images/Mugs/FROSTED-COFFE-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we offer unique frosted COFFEE mugs that combine playful design with practical use. Perfect for gifts, promotional items, or special occasions, our frosted bear mugs are designed to stand out with their charming and distinctive appearance. Our frosted bear mugs feature a fun and engaging bear shape, adding a whimsical touch to your drinkware collection.Customization Options:Personalized Printing: Add custom designs, logos, or messages to the frosted surface of the bear mugs. The frosted texture provides a unique backdrop for your prints.Design Flexibility: Choose from various printing options to create eye-catching graphics or text that complement the playful bear design.Color Choices: While the mug itself has a frosted finish, you can choose colors for any printed designs to enhance visibility and impact.Gifts: Ideal for children’s birthdays, family gatherings, or any occasion where a touch of whimsy is perfect. Customize with names, messages, or images to create a memorable gift.please reach out to us at:Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Insulated Pot Mug',
            slug: 'Mug-14',
            capacity: '200ml',
            material: 'Satinless steel (Double Layer)',
            image: '/images/Mugs/Stainless-Steel.png',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Aesthetical And Unique Design With A Premium Paint Texture Is What Makes Our Mug Handsome In True Sense. It Is Nothing Less Than A Piece Of Engineered Art That You Would Want To Flaunt. Practical And Durable Constructions With Triple Layer Of Insulation, The Handsome Mug Will Not Let You Feel The Temperature Of Your Drink When Youll Hold It. So Be It Cold Wine Or Hot Coffee, It Wont Impact The Outer Layer. Also, Thermal Insulation Layer Ensure That The Temperature Of The Drink Is Maintained For Upto 4 Hours When The Lid Is Kept Close. Just Handsome Mug Features A Lid Made Of Food Grade And Bpa Plastic And Has Silicone Seal To Make It Leak Proof From The Sides',
        },
        {
            name: 'Eco Friendly Mug',
            slug: 'Mug-15',
            capacity: '180ml',
            material: 'Rice Husk',
            image: '/images/Mugs/Coffee/ECO-FRIENDLY-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'These coffe mugs are one of the most favourite picks for their design and aesthetic appeal. Unlike other ceramic coffee mug eha mugs are made with rice husk and bamboo fibers in natural colours . These mugs will make your experience of having coffee so much better. You can carry this mug while you travel as a travel mug because of the light weight of the mug.They are made with our proprietary biocomposites technology with good durability. They are food contact safe, microwave safe and dishwasher safe. These eco-friendly mugs can be a unique gifts for men. They are made from repurposed bamboo, rice husk, coffee husk & food safe binders. They can be recycled at the end of their current use. Hence, they support circularity from product design to its end of life. This enables us to conserve resources available on our earth. Repurposed bamboo, rice husk and coffee husk locks the biogenic carbon in these products. As a result, the carbon footprint is significantly lower, supporting our fight against climate change.  From sourcing crop-residue to manufacturing these products, we create value to farmers and factories working on development of rural communities. Toxic chemicals are neither used, nor discharged while making these mugs.',
        },
        {
            name: 'Patch Sublimation Mug',
            slug: 'Mug-16',
            capacity: '300ml',
            material: 'Ceramic',
            image: '/images/Mugs/sublimation-mug.png',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we specialize in crafting custom two-tone sublimation mugs that add a vibrant and personalized touch to your beverage experience. Perfect for promotional giveaways, personal gifts, or special events, our mugs are designed to stand out with high-quality sublimation printing.Two-tone sublimation mugs feature a striking color contrast between the interior and the exterior, making your custom designs and messages pop.Color Combinations: Choose from a variety of interior and exterior color combinations to suit your brand or personal style.Personalized Printing: Add your company logo, special messages, or custom designs to make your mug truly unique.Full-Color Sublimation: Utilize the full-color sublimation process to ensure vibrant and long-lasting prints.Personal Gifts: Perfect for birthdays, anniversaries, or any special occasion. Create a custom design that reflects personal sentiments or special memories.Event Favors: Great for weddings, parties, or corporate functions where guests can take home a memorable and practical keepsake. For more information or to place an order, please reach out to us at: Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Magic Sublimation Mug',
            slug: 'Mug-17',
            capacity: '300ml',
            material: 'Ceramic',
            image: '/images/Mugs/magic-mug (2).jpeg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'At Fine Multiprint Solution, we specialize in crafting custom magic mugs that add a touch of personalization to your drinking experience. Whether for a special event, promotional giveaway, or personal enjoyment, we offer a variety of options to suit your needs.This is a magic mug which is black in color but shows the image when a hot liquid or beverage is poured in. A ravishing picture of you with your darling would look wonderful on this mug. On the occasion of birthday, anniversary, or Valentines Day, this one would be a perfect gift of love Magic mugs are a unique way to surprise and delight your recipients. These mugs reveal a hidden design or message when hot liquid is poured in.Customization Options:Color Change: Choose from a variety of base colors that change to reveal your design when heated.  Hidden Messages: Add a special message or image that appears only when the mug is filled with a hot beverage.Personalized Photos: Print photos that become visible with heat, perfect for personal gifts or memorable events.Multiple Images: Include different photos or images that can be revealed at different parts of the mug when it heats up.Special Uses for Magic Mugs Gifts: Perfect for birthdays, anniversaries, and other special occasions.Corporate Promotions: Great for promotional giveaways that leave a lasting impression.Personal Use: Add a touch of magic to your daily coffee or tea ritual Special Options for Couples and Wedding  Make your special day even more memorable with our custom magic mugs:Couples Names: Personalize mugs with the names of the couple. Wedding Dates: Include the wedding date for a lasting keepsake. Photos: Print photos of the couple that appear with heat for a truly unique touch.For more information or to place an order, please reach out to us at: Phone: 9920033112 , Email: fmprintsolutions@gmail.com',
        },
        {
            name: 'Insulated Travel Tumbler',
            slug: 'Mug-18',
            capacity: '500ml',
            material: 'Stainless Steel',
            image: '/images/Mugs/INSULATED-TRAVEL-TUMBLER.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'ANTI-SPLASH DESIGN: Our 1200 ML tumbler with a lid and straw is designed with an anti-splash feature to prevent stains. The threaded lid seals tightly to ensure a splash-proof experience, making it easy to take your favorite drinks with you wherever you go.THE PERFECT PRESENT FOR ANY OCCASION: With its vibrant colors and functional design, our insulated coffee tumbler is a great gift choice for anyone, including yourself. Its perfect for staying hydrated on the go, whether youre traveling, heading to the gym, or going to work. Give the gift of stylish and practical hydration with our colorful coffee travel mug, and make someones day a little brighter. CAR CUPHOLDER-COMPATIBLE: Our insulated coffee mug boasts a sleek, tapered design thats perfect for the on-the-go lifestyle! With a slim base that fits snugly in most cupholders, you can take your favorite beverage with you wherever you go, So whether youre commuting to work or hitting the open road, our travel mug has got you covered with style and convenience!STAINLESS STEEL DOUBLE INSULATED TUMBLER: Crafted from food-grade 304 stainless steel, our Stainless Steel Coffee Tumbler ensures firmness, rust-resistance, and no metallic aftertaste. With its vacuum double wall design, this 1200ML insulated tumbler guarantees optimal insulation, keeping your hot drinks hot for up to 8 hours and cold drinks cold for up to 12 hours DISHWASHER SAFE: Cleaning your tumbler and lid is super easy! Just pop them into the dishwasher',
        },
        {
            name: 'Steel Mug',
            slug: 'Mug-19',
            capacity: '120ml',
            material: 'Stainless Steel & Plastic',
            image: '/images/Mugs/STEEL-MUG.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'This Elegant Looking Mug is made with Food Plastic and Non-Magnetic Stainless Steel.As outer wall is made of Food Plastic, it is withstand Tea/Coffee Heat and is very comfortable to hold.Design of Mug provide wide range of advantages over normal tea/coffee mugs.Package Contains:- Stylish 1 Piece Set of Coffee Mug/Milk Mug / Tea Cup Capacity (300 ml Each).Specially crafted to enhance the look of your kitchen. Long Life and Elegant. Ideal for daily use in home, office, workplace, canteen, shop and etc.',
        },
        {
            name: 'Hipflask',
            slug: 'Mug-20',
            capacity: '180ml',
            material: 'Stainless Steel & Plastic',
            image: '/images/Mugs/Hipflex.jpg',
            price: 75,
            variety: '3 tone',
            code: '02',
            countInStock: 15,
            description: 'Liquor or Wine, whiskey, vodka alcoholic beverages holder hip flask set for men and women, Additionally, it comes with a attached unique spill proof threaded crew flip lid that makes it easier to drink directly from the flask anytime& anywhere, Easy to grasp with rounded edges for drinking comfort. Easy to take along in bags. Perfect for taking wine, vodka, whiskey and more. Holds your favorite drink perfectly, Comfort & better grip, that’s better by any measure. This hip flask has been constructed with a sturdy stainless steel body - a material lauded for its durability, It is very light and you can carry it at any time, Leak free or spill proof captive screw cap ensures safe travelling without any kind of leakage.Wine, whiskey alcoholic drinks holder pocket hip flask for men, Leak proof, rust resistant stainless steel hipflask, Captive proof cap stays with the flask permanently with out loosing, Screw cap attached permanently with the flask and gives a leak free or spill proof performance while tour & travelling or outdoor adventures like camping,Crafted from bead-blasted stainless steel for a premium finish, this light and compact hip flask is designed to fit comfortably in your hand, Designed for an easy, one-handed drinking experience this hip flask is precisely crafted with stainless steel, ensures smooth seamless and long lasting experience.Lighting weight, Comfortable & Convenient functional body shape with round edges for drinking comfort, It is easy to carry it in pockets on travels, hunting, fishing, camping, hiking and more. Easy to use & carry design for better usage, Capacity - 8 Oz (230 ml), Material - 100 % stainless steel build gives durable and stronger body than usual hip flask so that it can last longer.',
        },
    ],
    couplemugs: [

        {

            name: ' HEART HANDLE SHAPE',
            capacity: "150 ml",
            slug: "couple mug-6",
            material: "Ceramic",
            image: "/images/Mugs/12.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Couple Mug 5',
            capacity: "150 ml",
            slug: "couple mug -2",
            material: "Ceramic",
            image: "/images/Mugs/Couple-Mug.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },

    ],

    paper_mugs: [

        {

            name: 'Biodegradable Coffee Cup Lid Brown Paper Cups With Lids Disposable',
            slug: "paper mug-1",
            material: "paper",
            image: "/images/Mugs/Paper Cup/Copper _ Coffee Shop.jpeg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        }
    ],
    bomboomugs: [

        {

            name: 'Name and Initial Printed Bamboo Thermos Flask with Tea Strainer',
            slug: "bamboo mug-1",
            material: "bamboo",
            image: "/images/Mugs/WOODEN-MUG.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Personalised Bamboo Travel Mug - 500ml Insulated Drinks Flask, Laser Engraved Travel Coffee, Tea Cup, Mothers Day, Fathers Day Gift',
            slug: "bamboo mug-2",
            material: "bamboo",
            image: "/images/Mugs/WOODEN-COFFEE-TUMBLER.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        }
    ],
    hotcoldsippers: [

        {

            name: 'BOTTLES & SIPPERS',
            capacity: "500 ml",
            slug: "Bottles & Sippers1",
            material: "Stainless Stee",
            image: "/images/Sippers/hot-cold-sipper.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Stainless Steel bottles',
            capacity: "500 ml",
            slug: "couple mug -2",
            material: "Stainless Steel",
            image: "/images/Sippers/Bottles-Sippers/Stainless-Steel-Sipper.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Stainless Steel bottle ( Double Wall )',
            capacity: "150 ml",
            slug: "couple mug -3",
            material: "Stainless Steel ( Double Wall )",
            image: "/images/Sippers/stainless-steel-double-wall.jpg",
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        }
    ],
    diaries: [

        {

            name: 'Pu Leather Notebook Diary',
            slug: "diarySlug1",
            image: "/images/Diaries/Diary-1.jpg",
            price: 0,
            variety1: '/images/Extra images variety/syan diaries.jpeg',
            variety2: '/images/Extra images variety/Black Diary.jpeg',
            variety3: '/images/Extra images variety/red diary1.jpeg',
            variety4: '/images/Extra images variety/Gray diary.jpeg',
            variety5: '/images/Extra images variety/Green Color.jpeg',
            variety6: '/images/Extra images variety/Yellow Color Diary.jpeg',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Buy Daily Goal Undated Palnner',
            slug: "diarySlug2",
            image: "/images/Diaries/diary-2.jpeg",
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        },
        {

            name: 'Diary A5 Journal Book ,Five Year Memory Book ,Leather Diary ,Montana Grain Leather',
            slug: "diarySlug3",
            image: "/images/Diaries/diary-3.png",
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 15,
            description: "High Quality",

        }

    ],
    travelmugs: [
        {
            name: 'Travel Mug',
            slug: 'Travelmug-1',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/cofffee.jpg',
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 15,
            description: '8 HOURS HOT & 14 HOURS COLD - Do you like to sip your favourite brew slowly, as the day progresses or do you like to carve out a little me and tea time for yourself? In either case, our Coffeemate insulated mug is just what you need. It maintains the temperature of your favourite brew, so you can sip or drink whenever, wherever 304 GRADE, RUST-PROOF STAINLESS STEEL INSIDE- Made of the best quality, food-grade stainless steel our Coffeemate is crafted to ensure the beverage inside retains its temperature and freshness. COPPER COATED DOUBLE-WALL VACUUM INSULATION - The double wall vacuum insulation of the mug maintains the temperature of inside contents for hours and prevents condensation from forming on the bottles exterior.',
        },
        {
            name: 'Coffee Travel Mug',
            slug: 'Travelmug-3',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/Tumblers/sipper.jpeg',
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 20,
            description: 'Made from stainless steel, has nice corrosion-resistance and durability Adopts vacuum technology, supports heat and cold preservation Easy-open cup cover and smooth cup mouth bring nice using experience Matting cup body provides comfortable hand feel ',
        },
        {
            name: 'VALARUS Leakproof Stainless Steel Vacuum Insulated Travel Mug with Temperature Display - 510ml Capacity, Press & Lock Lid for Hot & Cold Drinks - Personalized Mug ',
            slug: 'Travelmug-4',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/mugs-1.jpg',
            price: 0,
            variety: '200ml',
            code: '02',
            countInStock: 20,
            description: 'Keep Hot and Cold-- The double wall vacuum insulated travel mug keeps hot/ iced beverage for 12 hours. Suitable for outdoor adventure, road trips, sports event, home, office, fit most of vehicle cup holders.Leak-proof-- Our coffee mug is equipped with a leak-proof lid allows it without leaking. The bottom of the coffee mug has a non-slip silicone pad to prevent it from sliding and tipping over.Easy Operate-- 510ML drinking capacity, the lid can be open or close by one hand. There is a handle on the lid for easy to carry. Easily remove the lid by twisting for quick filling and cleaning.Function-- Suitable for office, travel, school, work, car cup, indoor and outdoor. It is suitable for anyone, student or worker to enjoy coffee, tea, wine, juice',
        },
        {
            name: 'Travel Mug Coffee Cup Stainless Steel Coffee Mug with Handle',
            slug: 'Travelmug-5',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/Travel-Mug-Coffee-Cup.webp',
            price: 0,
            variety: '350ml',
            code: '02',
            countInStock: 20,
            description: 'High Quality Stainless steel double wall mug, mirror finish steel inside for longer life. Double Wall protects your hands from burning by hot liquid inside. Double wall also prevents cold liquid temperature increase by body heat. Store your drink gor leter with flip top drinking vent protector',
        },
        {
            name: 'Travel mug for Tea and coffee',
            slug: 'Travelmug-6',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/Travel-mug-for-Te- and-coffee.webp',
            price: 0,
            variety: '350ml',
            code: '02',
            countInStock: 20,
            description: 'Experience easy drinking on the go with our sleek black-coloured travel mug for car or desk mug. Crafted to perfection, this mug boasts a sophisticated black matte finish that exudes elegance. Equipped with a spill-proof lid featuring a convenient flip vent, sipping your favourite drinks has never been easier. The thoughtfully designed handle ensures a comfortable grip, while the interiors 304 stainless steel keeps your beverages fresh for extended periods. The exterior matte finish PP material eliminates condensation, making it a mess-free companion for your travels or daily commutes.',
        },
        {
            name: 'Personalized Travel Mugs with Picture - Custom Travel Mug with Photo, 14oz Photo Travel Mug, Custom Tumbler Personalized, Personalized Travel Coffee Mug with Lid',
            slug: 'Travelmug-7',
            category: 'Mugs',
            material: 'Stainless Steel',
            image: '/images/Mugs/Custome-Travel-mug.jpg',
            price: 0,
            variety: '350ml',
            code: '02',
            countInStock: 20,
            description: 'PERSONALIZED TRAVEL MUG - Create your own custom travel mug with your photo and text. Your design will be printed on both sides of your travel mug. CAUTION: Please double check your customization before place your order. If you need any change or update about your customization, contact us and we will update it right away.PERSONALIZED GIFTS - Perfect gift idea for friends, coworkers, boss, mom, dad. Novelty gift as a birthday gift, Mothers Day gift or Fathers Day gift.DOUBLE WALL INSULATED STAINLESS STEEL: We use 100% High Quality Stainless Steel Travel Mugs. Dishwasher SAFE! Keep your drinks up to 24 hot or up to 36 hours Cold. BPA & Lead Free. Spillproof lid included',
        }
    ],
    mgnameplates: [

        {

            name: 'Magnet Name Plate',
            slug: "nameplate1",
            image: "/images/NamePlate/nameplate.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Name Plate',
            slug: "nameplate2",
            image: "/images/NamePlate/1-138.webp",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
      

    ],
    mousepads: [

        {

            name: 'Custom Company Logo Mouse Pad _ Zazzle',
            slug: "mousepad1",
            image: "/images/Mouse-Pad/mouse-pad-1.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
       
        {

            name: 'Custom Mouse Pads',
            slug: "mousepad3",
            image: "/images/Mouse-Pad/mousepad-4.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
  
      
        {

            name: 'Personalized Monogram Desk Mat _ Zazzle',
            slug: "mousepad6",
            image: "/images/Mouse-Pad/Mouse-pad-3.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },

    ],
    mobileholds: [

        {

            name: 'Cell Phone Finger Grips',
            slug: "mobilehand1",
            image: "/images/Mobile-Holder/mobile-holder-2.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Multi Angle Adjustable',
            slug: "mobilehand2",
            image: "/images/Mobile-Holder/mobileholder-1.jpeg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
       
    ],
    clothings: [
        {
            // _id: '1',
            name: 'Positive T-shirts for Girls',
            slug: "clothings1",
            image: "/images/T-shirts/clothing-3.jpeg",
            variety1: 'white',
            variety2: 'black',
            variety3: 'red',
            variety4: 'blue',
            code: '011',
            price: 0,
            countInStock: 15,

            description: "High Quality product",
        },
        {
            // _id: '2',
            name: 'Quicq Dry Sports T-Shirt',
            slug: "clothings2",
            image: "/images/T-shirts/clothing-1.png",
            variety1: 'white',
            variety2: 'black',
            variety3: 'red',
            variety4: 'blue',
            code: '012',
            price: 0,
            countInStock: 20,

            description: "High Quality",
        },
        {
            // _id: '3',
            name: 'Man T-shirt',
            slug: "clothings3",
            image: "/images/T-shirts/clothing-2.png",
            variety1: 'white',
            variety2: 'black',
            variety3: 'red',
            variety4: 'blue',
            code: '013',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {
            // _id: '4',
            name: 'Sports T-shirt',
            slug: "clothings4",
            image: "/images/T-shirts/430.jpg",
            variety1: 'white',
            variety2: 'black',
            variety3: 'red',
            variety4: 'blue',
            code: '014',
            price: 0,
            countInStock: 10,

            description: "High Quality",
        },
    ],
    pendrives: [
        {
            // _id: '1',
            name: 'Pen Drive Printing',
            slug: "pd1",
            image: "/images/Pen-Drive/pendrivr-1.png",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            countInStock: 15,
            description: "Customised pen drives Printing, personalised pen drives, fancy pen drives,designer pen drives, Pen drive with Name or your Logo",
        },
        {
            // _id: '3',
            name: 'Wooden Surface',
            slug: "pd2",
            image: "/images/Pen-Drive/wooden-pendrive.webp",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Bat shapes Pendrive',
            slug: "pd3",
            image: "/images/Pen-Drive/Bat-shapes-Pendrive.webp",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Caneta Pen Drive',
            slug: "pd4",
            image: "/images/Pen-Drive/Bat-shapes-Pendrive.webp",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Circle Silver Pendrive',
            slug: "pd5",
            image: "/images/Pen-Drive/Circle-Silver-Pendrive.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Crystal Pendrive',
            slug: "pd6",
            image: "/images/Pen-Drive/Crystal-Pendrive.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Hook Pendrive',
            slug: "pd7",
            image: "/images/Pen-Drive/Hook-Pendrive.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Key Shapes Pendrive',
            slug: "pd8",
            image: "/images/Pen-Drive/Key-Shapes-Pendrive.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Message Bottle Pen drives',
            slug: "pd9",
            image: "/images/Pen-Drive/Message-Bottle-Pen drives.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Sleek Metal Pendrive',
            slug: "pd10",
            image: "/images/Pen-Drive/Sleek-Metal-Pendrive.webp",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Swivel Pendrive',
            slug: "pd11",
            image: "/images/Pen-Drive/Swivel-Pendrive.jpeg",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Square Wooden Pendrives',
            slug: "pd12",
            image: "/images/Pen-Drive/Square-Wooden-Pendrives.avif",
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },

    ],
    bearmugs: [
        {
            name: 'Beer Glass',
            slug: "Beer mug-1",
            image: "/images/Mugs/Bear Mug-2.jpeg",
            variety: '-',
            code: '02',
            capacity: "200 ml",
            price: 0,
            countInStock: 15,
            description: "Made from the highest-standard thick frosted glass for outstanding durability. Heavy bottom and thick walls makes this cup stand out in style.Had a rough day, a cold one from this frosty mug will put that behind you. Get for yourself or friends, family or colleagues who appreciate a laugh.Searching for the perfect gift for a beer lover. This handsome, heavy  glass beer mug will put a smile on anyone's face",
        },
        {

            name: 'Glass Beer Mug',
            slug: "Beer Mug-2",
            image: "/images/Mugs/Bear_Mug-1.png",
            variety: '-',
            code: '02',
            capacity: "200 ml",
            price: 0,
            countInStock: 0,
            description: "The glass beer mugs are made from high-quality, lead-free glass. The double wall bottom ensures they're extra sturdy so they won't shatter or tip over",
        },
        {

            name: 'Glass Beer Mug Laurel Wreath Design',
            slug: "Beer mug-4",
            image: "/images/Mugs/Glass-Beer-Mug.jpeg",
            variety: '-',
            code: '02',
            capacity: "200 ml",
            price: 0,
            countInStock: 50,
            description: "The glass beer mugs are made from high-quality, lead-free glass. The double wall bottom ensures they're extra sturdy so they won't shatter or tip over",
        }
    ],
    magicmugs: [
        {
            name: 'Different Show Images Magic Cup',
            slug: "Magic Mug-1",
            image: "/images/Mugs/magic-mug-2.jpg",
            capacity: "200 ml",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality product",
        },
        {

            name: 'Magic Cup for gifted anniversary',
            slug: "Magic Mug-2",
            image: "/images/Mugs/magic-mug (2).jpeg",
            capacity: "100 ml",
            variety: '-',
            code: '02',
            price: 0,
            countInStock: 20,

            description: "High Quality",
        },
        
    ],
    stationeries: [

        {

            name: 'Ballpoint Pen Contrast Push Mechanism',
            slug: "stationeries3",
            image: "/images/Stationery/Ballpoint-Pen-(2).jpeg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Ballpoint Pen',
            slug: "stationeries4",
            image: "/images/Stationery/Ballpoint-Pen.jpeg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Green-Polyester-Silicone-Tape',
            slug: "stationeries5",
            image: "/images/Stationery/Green-Polyester-Silicone-Tape.jpg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Pu Leather Notebook Diary',
            slug: "Mstationeries6",
            image: "/images/Stationery/Pu Leather Notebook Diary.webp",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'personalised-hard-bound-diary',
            slug: "stationeries7",
            image: "/images/Stationery/Pu-Leather-Notebook-Diary.webp",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
      
        {

            name: 'Students Notebooks',
            slug: "stationeries9",
            image: "/images/Stationery/Students-Notebooks.jpeg",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    shotglasses: [
        {
            name: 'Shot Glasses',
            slug: "Shot Glasses-1",
            image: "/images/Mugs/Shot-Glasses.jpeg",
            capacity: "200 ml",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality product",
        }
    ],
    giftsets: [
        {
            name: '3 in 1 Gift Set',
            slug: "Gift Set-1",
            image: "/images/Giftsets/giftset-1 (2).jpeg",
            price: 0,
            variety: '-',
            code: '02',

            description: "Welcome to the Team Gift for New Employee, Coworker Welcome Gift for New Employees Office Swag Kit for Event, Welcome to the Team Gift, Corporate Gift for New Hire, Office Gifts in Bulk",
        },
        {
            name: 'The Wallet Store Personalized Workday Wonder Unisex Gift Set',
            slug: "Gift Set-2",
            image: "/images/Giftsets/giftset-3.jpeg",
            price: 0,
            variety: '-',
            code: '02',

            description: "-",
        },
        {
            name: '3 in 1 Gift Sets',
            slug: "Gift Set-3",
            image: "/images/Giftsets/Giftset-1.jpeg",
            price: 0,
            variety: '-',
            code: '02',

            description: "-",
        },
        {
            name: 'Gift Set  Flask, Notebook, Pen',
            slug: "Gift Set-4",
            image: "/images/Giftsets/Giftset-1.jpeg",
            price: 0,
            variety: '-',
            code: '02',

            description: "-",
        },
        {
            name: 'Custom Coworker Gift Pack, Company Promotional Gift Box, Business Gift Pack, Best Employee Gift, Personalized Business Gift Box, Office Gift',
            slug: "Gift Set-5",
            image: "/images/Giftsets/Custom-Coworker-Gift-Pack.jpeg",
            price: 0,
            variety: '-',
            code: '02',

            description: "-",
        },
        {
            name: '4 in 1 giftsets',
            slug: "Gift Set-6",
            image: "/images/Giftsets/Capture.PNG",
            price: 0,
            variety: '-',
            code: '02',

            description: "-",
        },

    ],

    notedirs: [

        {

            name: 'Pu Leather Notebook Diarys',
            slug: "diaries1",
            image: "/images/Stationery/Pu-Leather-Notebook-Diary.webp",
            category: 'Diaries',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'personalised-hard-bound-diarys',
            slug: "diaries2",
            image: "/images/Stationery/personalised-hard-bound-diary.webp",
            category: 'Diaries',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Student Notebooks',
            slug: "stationeries9",
            image: "/images/Stationery/Students-Notebooks.jpeg",
            category: 'Notebook',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    notebooks: [

        {
            name: 'handmade books and other treasures',
            slug: "notebook-1",
            image: "/images/Notebooks/note.jpg",
            category: 'Notebook',
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Green Student Notebook',
            slug: "notebook-2",
            image: "/images/Notebooks/download(2).jpeg",
            category: 'Notebook',
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Student Notebook',
            slug: "notebook-4",
            image: "/images/Notebooks/download.jpeg",
            category: 'Notebook',
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Notebook Branding Design Inspiration',
            slug: "notebook-5",
            image: "/images/Notebooks/notebook-1.jpeg",
            category: 'Notebook',
            price: 0,
            variety1: 'Cyan',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Gray',
            variety5: 'Green',
            variety6: 'Yellow',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    singlwallsippers: [

        {

            name: 'Single Wall Sipper',
            slug: "singleWall-1",
            image: "/images/Sippers/hot-cold-sipper.jpg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Copper',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    plasticsippers: [

        {

            name: 'Plastic Sipper',
            slug: "plasticWall-1",
            image: "/images/Sippers/sipper-2.jpg",
            category: 'Sipper',
            capacity: '1 liter',
            material: ' plastic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Motivational Sport Water Bottle Fitness Jugs For Kitchen Cups',
            slug: "bottles & sipper -8",
            image: "/images/Sippers/Bottles-Sippers/sports-water-bottle.jpeg",
            category: 'drinkware',
            capacity: '300 ml',
            material: 'Ceramic',
            price: 0,
            variety: '-',
            code: 'FM 954',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    copperbottles: [    

        {

            name: 'Copper Bottle',
            slug: "copper sipper-1",
            image: "/images/Sippers/copper-bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: ' Copper',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    antiskitbottles: [

        {

            name: '1pc Clear Water Bottle',
            slug: "antiskit glass-1",
            image: "/images/Sippers/Glass-Bottles/glassbottle-1.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: ' Borosillicate Glass',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Botellas de agua personalizadas ➤ durabilidad IMBORRABLE',
            slug: "antiskit glass-2",
            image: "/images/Sippers/Glass-Bottles/glassbottle-2.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Custom borosilicate glass water bottle double wall 500ml glass bottle tea infuser water bottle',
            slug: "antiskit glass-3",
            image: "/images/Sippers/Glass-Bottles/Glass-Water-Bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Customized Silicone Rubber Sleeve, Silicone Sheath from China, Silicone Sleeve Manufacturer & Supplier',
            slug: "antiskit glass-4",
            image: "/images/Sippers/Glass-Bottles/glass-bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Glass Water Bottles with Infuser Strainer 18oz Glass Water Bottle with Stainless Steel Filter Leak Proof Tea Tumbler with Nylon Protective Sleeve',
            slug: "antiskit glass-5",
            image: "/images/Sippers/Glass-Bottles/Glass-Water-Bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    bomboobottles: [

        {

            name: 'Bomboo Bottles',
            slug: "bamboo Bottles-1",
            image: "/images/Sippers/Stainless-Steel- Bomboo.jpg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Initial Printed Bamboo Thermos Flask with Tea Strainer',
            slug: "bamboo Bottles-2",
            image: "/images/drinkware/bamboomug-1.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Wooden Tumbler Personalized, Unique Tea cup, Thermos, thermo cup, thermo mug, wood mug, personalized wooden mug engraved tumbler wood gift',
            slug: "bamboo Bottles-3",
            image: "/images/drinkware/bamboomug-2.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    borosilicategalssbottles: [

        {

            name: '1pc Clear Water Bottle',
            slug: "borosillicate glass-1",
            image: "/images/Sippers/Glass-Bottles/glassbottle-1.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Borosillicate Glass',
            price1: 260,
            price2: 230,
            price3: 195,
            price4: 165,
            variety1: '1000ml',
            variety2: '750ml',
            variety3: '500ml',
            variety4: '300ml',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Botellas de agua personalizadas ➤ durabilidad IMBORRABLE',
            slug: "borosillicate glass-2",
            image: "/images/Sippers/Glass-Bottles/glassbottle-2.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price1: 260,
            price2: 230,
            price3: 195,
            price4: 165,
            variety1: '1000ml',
            variety2: '750ml',
            variety3: '500ml',
            variety4: '300ml',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Custom borosilicate glass water bottle double wall 500ml glass bottle tea infuser water bottle',
            slug: "borosillicate glass-3",
            image: "/images/Sippers/Glass-Bottles/Glass-Water-Bottle-2.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price1: 260,
            price2: 230,
            price3: 195,
            price4: 165,
            variety1: '1000ml',
            variety2: '750ml',
            variety3: '500ml',
            variety4: '300ml',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Customized Silicone Rubber Sleeve, Silicone Sheath from China, Silicone Sleeve Manufacturer & Supplier',
            slug: "borosillicate glass-4",
            image: "/images/Sippers/Glass-Bottles/glass-bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price1: 260,
            price2: 230,
            price3: 195,
            price4: 165,
            variety1: '1000ml',
            variety2: '750ml',
            variety3: '500ml',
            variety4: '300ml',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Glass Water Bottles with Infuser Strainer 18oz Glass Water Bottle with Stainless Steel Filter Leak Proof Tea Tumbler with Nylon Protective Sleeve',
            slug: "borosillicate glass-5",
            image: "/images/Sippers/Glass-Bottles/Glass-Water-Bottle-2.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'Bomboo',
            price1: 260,
            price2: 230,
            price3: 195,
            price4: 165,
            variety1: '1000ml',
            variety2: '750ml',
            variety3: '500ml',
            variety4: '300ml',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    shakerbottles: [

        {

            name: 'Nutrition Shaker Bottle',
            slug: "Shakker bottle-1",
            image: "/images/Sippers/Nutrition-Shaker-Bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'plastic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Shaker Bottle',
            slug: "Shakker bottle-2",
            image: "/images/Sippers/Shakker-Bottle.jpeg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'plastic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Shaker Bottles for Protein Mixes',
            slug: "Shakker bottle-3",
            image: "/images/Sippers/shakker.jpg",
            category: 'Sipper',
            capacity: '1 liter',
            material: 'plastic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    roundmgbadges: [

        {

            name: '4 Free Pin Button Mockups (PSD)',
            slug: "roundbadge-1",
            image: "/images/namebadge/Round-badges/metal-badge-2.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Multiple design round-badge',
            slug: "roundbadge-2",
            image: "/images/namebadge/Round-badges/round-badge-1.jpg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Emblem Badge Mock ups',
            slug: "roundbadge-3",
            image: "/images/namebadge/Round-badges/round-badge-2.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Free Button Mockup',
            slug: "roundbadge-4",
            image: "/images/Name Badges/Free Button Mockup.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Free Pin-Back Button Badge Mockup Set - Good Mockups',
            slug: "roundbadge-5",
            image: "/images/namebadge/Round-badges/round-badge-3.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Search Results -_ wellbeing  _ Kool Badges',
            slug: "roundbadge-6",
            image: "/images/namebadge/Round-badges/round-badge-4.jpg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Custom Oval shaped Brass Name Badges_ Elevate Your Identity with our personalised engraved solid brass name badges, Your Name, Your Style',
            slug: "Oval shape Badge-2",
            image: "/images/namebadge/Oval-Shape-Badge/ovel-baadge.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 26,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    pocmagbadges: [

        {

            name: 'Pocket Magnetic Badge',
            slug: "pocket-1",
            image: "/images/Badges/Pocket-Magnetic-Badge.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    metnamebadges: [

        {

            name: 'Corporate Logo Professional Employee Faux Gold Name Tag  Zazzle',
            slug: "metal-1",
            image: "/images/namebadge/Metal-badges/metal-badge.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        
      
        {

            name: 'Silver Stainless Steel Metal Name Tag  Zazzle',
            slug: "metal-4",
            image: "/images/namebadge/Cover Page of badges/Untitled-2.jpg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    roundpinbadges: [

        {

            name: 'Round Pin Magnetic Badge',
            slug: "Round Pin Badge-1",
            image: "/images/namebadge/Round-badges/metal-badge-2.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: '4 Free Pin Button Mockups (PSD)',
            slug: "Round Pin Badge-2",
            image: "/images/namebadge/Round-badges/round-badge-1.jpg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    acrynamebadges: [

        {

            name: 'Magnetic Name Tag Display',
            slug: "Acrylic name Badge-1",
            image: "/images/namebadge/Acrylic-name-badge/acrylic badge.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    clipplabadges: [

        {

            name: 'Clip on Plastic Badge',
            slug: "Clip Badge-1",
            image: "/images/Badges/Plastic-Badge.jpeg",
            category: 'badge',
            material: 'Plastic',
            price: 13,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

       

    ],
    dommagbadges: [

        {

            name: 'Dom Magnetics Badge',
            slug: "Dom Badge-1",
            image: "/images/Name Badges/Dome Name Badge/download (14).jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 26,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Dom Magnetics Badge',
            slug: "Dom Badge-2",
            image: "/images/Badges/dom-badge.jpeg",
            category: 'badge',
            material: 'Magnet',
            price: 26,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    ovlmgbadges: [


    ],

    laptopsleeves: [

        {

            name: 'laptop bag sleeve case cover pouch with handle',
            slug: "laptop bag-1",
            image: "/images/Laptop-Sleeve/laptop-sleeve-1.jpg",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Dunlop CX Performance Tennis Backpack (Black_Red)',
            slug: "laptop bag-3",
            image: "/images/Laptop-Sleeve/loptop_sleeves1.webp",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Naylon Laptop Sleeve',
            slug: "laptop bag-4",
            image: "/images/Laptop-Sleeve/Naylo-Laptop-Sleeve.png",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Waterproof laptop',
            slug: "laptop bag-5",
            image: "/images/Laptop-Sleeve/Waterproof-laptop.jpg",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        }

    ],
    pinnmplates: [

        {

            name: 'Pin Name Plate',
            slug: "Pin name plate-1",
            image: "/images/NamePlate/Pin-name-plate.jpeg",
            category: ' Name Plate',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    domnmplates: [

        {

            name: 'Dom Name Plate',
            slug: "dom name plate-1",
            image: "/images/NamePlate/dom-name-plate.webp",
            category: 'Name Plate',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    acrnmplates: [

        {

            name: 'Acrylic Name Plate',
            slug: "Acrylic name plate-1",
            image: "/images/NamePlate/acrylic-name-plate-2.jpg",
            category: ' Name Plate',
            material: 'Acrylic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    metlnmplates: [

        {

            name: 'Metal Name Plate for Home _ Stainless steel name plates',
            slug: "Metal name plate-1",
            image: "/images/NamePlate/nameplate.jpg",
            category: ' Name Plate',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    mouse_keyboards: [

        {

            name: 'wireless mouse ',
            slug: "mouse-1",
            image: "/images/wireless-mouse-keyboard/wirelass-mouse.jpeg",
            category: 'Wirelss',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Wireless Touch Keyboard',
            slug: "keyboard-1",
            image: "/images/wireless-mouse-keyboard/Wireless-Touch-Keyboard.jpeg",
            category: 'Wirelss',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    power_banks: [

        {

            name: 'Power Bank',
            slug: "power bank-1",
            image: "/images/Powerbank.jpeg",
            category: 'power bank',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    tablelamps: [

        {

            name: 'Table Lamp',
            slug: "tablelamp-1",
            image: "/images/tablelamp.jpeg",
            category: 'Tablelamp',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    digitalclocks: [

        {

            name: 'Smart Digital Alarm Clocks For Bedrooms, LED Screen, Snooze, Dimmable, Temperature, Date, 12_24Hr, Small Electronic Desk C, Black',
            slug: "digital clock-1",
            image: "/images/Electronics/digital clock.jpeg",
            category: 'clock',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,
            description: "Pack Of Is 1. Model Name Is Digital Smart Backlight Alarm Clock With Automatic Sensor, Date & Temperature, Alarm Clocks For Bedroom. Sales Package Is 1 Alram Clock. Character Is No Character. Luminous Is No. Theme Is No Theme. Material Is Plastic. Model Number Is 1019 - Black. Net Quantity Is 1. Suitable For Is Home, Office.",
        },

    ],
    digitalphframes: [

        {

            name: 'digital photo frame',
            slug: "digital photo frame-1",
            image: "/images/digital-photo-frame/digital-photo-frame.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    photoframes: [

        {

            name: 'A5 Glass photo frame',
            slug: "photo Frame-1",
            image: "/images/photoframe/photoframe-1.jpeg",
            category: 'photo frame',
            variety: '-',
            code: '02',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Customized Frame',
            slug: "photo frame-2",
            image: "/images/photoframe/Customized-Frame.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Photo Frame',
            slug: "photo frame-3",
            image: "/images/photoframe/photoframe-2.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Wooden frame on a parquet floor design element by Teddy about wall art mockup,  plain wooden frame, light, and gallery mockup',
            slug: "photo frame-4",
            image: "/images/photoframe/Wooden-photo-frame.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Mini frame',
            slug: "photo frame-6",
            image: "/images/photoframe/Miniframe.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Posters _ Posters & prints',
            slug: "photo frame-7",
            image: "/images/photoframe/photoframe-3.jpeg",
            category: 'photo frame',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    keychains: [

       
        {

            name: 'Acrylic custom keychain/Llaveros personalizados',
            slug: "keychain-2",
            image: "/images/Keychains/Acrylic-custom-keychain/acrylic-1.jpeg",
            category: 'Acrylic custome keychain',
            material: 'Acrylic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Personalized Spotify Plaque Keychain',
            slug: "keychain-3",
            image: "/images/Keychains/Acrylic-custom-keychain/acrylic-2.jpeg",
            category: 'Acrylic custome keychain',
            material: 'Acrylic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'QR Code Business Card Your Logo Custom Keychain, Adult Unisex, variety_ Large, Pale Blue',
            slug: "keychain-4",
            image: "/images/Keychains/Acrylic-custom-keychain/QR-Code.jpeg",
            category: 'Acrylic custome keychain',
            material: 'Acrylic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Sleutelhanger hart _ Initial',
            slug: "keychain-5",
            image: "/images/Keychains/Acrylic-custom-keychain/Sleutelhanger-hart.jpeg",
            category: 'Acrylic custome keychain',
            material: 'Acrylic',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Beautiful and Memorable Personalised Gifts',
            slug: "keychain-6",
            image: "/images/Keychains/Wodden-Keychain/wooden-keychain.jpeg",
            category: 'Wodden Keychain',
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
       
        {

            name: 'Men Geo Charm Keychain',
            slug: "keychain-8",
            image: "/images/Keychains/Wodden-Keychain/wooden-keychain-2.jpeg",
            category: 'Wodden Keychain',
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
       
        {

            name: 'Mens Metal Leather Car Keychain',
            slug: "keychain-13",
            image: "/images/Keychains/Metal-keyChain/metl-keychain-1.jpeg",
            category: 'Wodden Keychain',
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
      
        {

            name: 'metal keychain',
            slug: "keychain-15",
            image: "/images/Keychains/Metal-keyChain/metal_keychain-2.jpeg",
            category: 'metal Keychain',
            material: 'metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Chaveiro Metal _ Lembrancinhas  _ Drika Brindes',
            slug: "keychain-16",
            image: "/images/Keychains/Metal-keyChain/metal-keychain-2.jpeg",
            category: 'metal Keychain',
            material: 'Matal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
       
       
        {

            name: 'Metal Keychain Chaveiros',
            slug: "keychain-21",
            image: "/images/Keychains/Metal-keyChain/Chaveiros(2).jpeg",
            category: 'metal Keychain',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'chaveiros personalizados',
            slug: "keychain-22",
            image: "/images/Keychains/Metal-keyChain/chaveiros-personalizados.jpeg",
            category: 'metal Keychain',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
       
        {

            name: 'Llavero de polipiel rectanglo',
            slug: "keychain-25",
            image: "/images/Keychains/Metal-keyChain/metal-keychain-4.jpeg",
            category: 'metal Keychain',
            material: 'Metal',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },



    ],
    lunchBoxes: [

        {

            name: 'Glass Lunch Boxes - Buy Glass Tiffins',
            slug: "lunch box-1",
            image: "/images/LunchBoxess/lunch-box-1.jpeg",
            category: 'Lunch Box',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Letter Graphic Random Lunch Box',
            slug: "lunch box-2",
            image: "/images/LunchBoxess/lunch-box-2.jpeg",
            category: 'Lunch Box',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    kettles: [

        {

            name: 'Staineless Cordless Electric Kettle with Variable Temp - Platinum',
            slug: "kettle-1",
            image: "/images/Kettles/kettle-1.jpeg",
            category: 'Kettles',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Geometric Kettle',
            slug: "kettle-2",
            image: "/images/Kettles/kettle-2.jpeg",
            category: 'Kettles',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    card_holders: [

        {

            name: 'ew Business Card Holder Mens Card Id Holders Magnetic Attractive Card Case Box Mini Wallet Male Credit Card Holder',
            slug: "Card Holder-1",
            image: "/images/card-holder/Card-Holder.jpeg",
            category: 'Card',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        
        {

            name: 'Premium Pu Leather Business Card Holder With Rfid Blocking & Magnetic Clasp - Perfect For Women & Men Professionals',
            slug: "Card Holder-5",
            image: "/images/card-holder/Card.jpeg",
            category: 'Card',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Card Holder Specialty Packaging',
            slug: "Card Holder-6",
            image: "/images/card-holder/Premium-Slim-Card-Holder-Grey.jpeg",
            category: 'Card',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    best_sellers: [

        {

            name: '1x Alarm Clock Classic Retro 4 Electroplated Silver Double-bell Alarm Clock',
            slug: "Best Seller-1",
            image: "/images/Best-Sellers/alarm.jpeg",
            price: 0,
            description: 'One94Store Vintage Table Alarm Clock, Metal Twin Bell Analog Display with Night LED Light Battery Operated Loud Sound Alarm Voice Clock for Heavy Sleepers, Students, Bedroom/Office (Silver, 4 inch)',
            countInStock: 50,
            variety: '-',
            code: '02',


        },
        {

            name: '25 Dark Academia Room Decor Ideas You’ll Fall In Love With',
            slug: "Best Seller-2",
            image: "/images/Best-Sellers/home-decorate.jpeg",
            description: "DEKAD alarm clock, black, Clock frame: Steel, 10 cm. A modern quartz movement is hidden in this clock with a clean and classic design. So you avoid being disturbed by ticking sound as time passes, but you’ll surely hear it when it’s to wake up.",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,


        },
        {

            name: 'Rubic Cube',
            slug: "Best Seller-3",
            image: "/images/Best-Sellers/Rubic-Cube.jpg",
            description: "This Cubestar Solve the Cube bundle includes 4 Rubik's Cubes, each at a different skill level. Start with the Cubestar Edge to build confidence. Then move up to the Rubik's Mini. Solved it? Try the classic Cubestar and level up to become an expert by solving the 4 x 4 Master puzzle. Each classic and super-addictive game puts players' skills to the test to see if they can make each of the sides into a solid color",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,


        },
        {

            name: '4 GB Card USB Flash Disk',
            slug: "Best Seller-4",
            image: "/images/Pen-Drive/1 (13).jpg",
            description: "credit card shaped pen drive,Supports Windows, Mac and all other Computer Operating System Fits Easily in your Pockets And wallets Full Customisation Can be Done Box optional SanDisk Alcor Chip with 5year replacement warranty Services:- Data loading and locking Speed:- 8 to 10mbp, Capacity :-2GB/4GB/8GB/16GB/32GB/64GB Supports Windows, Mac and allother Computer OperatingSystem Fits Easily in your Pockets Andwallets Full Customisation Can be Done Box optional SanDisk Alcor Chip with 5yearreplacement warranty Services:- Data loading andlocking Speed:- 8 to 10mbp",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,


        },
       
        {

            name: 'Nulaxy Dual Folding Cell Phone Stand, Fully Adjustable Foldable Desktop Phone Holder Cradle Dock Compatible , All Phones',
            slug: "Best Seller-7",
            image: "/images/Best-Sellers/mobile-holder.jpeg",
            description: "Popstand Is A Multipurpose Mobile Phone Stand With A Pen Holder. It Is Made Up Of Premium Quality Metal And Is Rust-proof. The Anti-skid Design With Anti-skid Rubber Pads Prevents Accidental Slips And Protection From Scratches. Its Sturdy Yet Lightweight Design Gives You The Freedom To Carry It Anywhere Easily. It Has An Angular Design That Gives The Perfect 180 Viewing Angle Of Your Smartphone On The Desk.",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,


        },
        {

            name: 'Giftbox',
            slug: "Best Seller-8",
            image: "/images/Best-Sellers/Giftbox.jpeg",
            description: "Buy Decor Gift Sets - Zen Bundle White Marble Gift Box - Pepperfry Online - Discover peace and simplicity with our Zen Living Bundle Meditation Box an amazing choice for gifts and special occasions. This unique box is made in India with love and care by skilled artisans, using natural materials. Feel good knowing that your gift supports local craftsmanship and is a little piece of India. ",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,


        },

    ],
    fridgeMagnets: [

        {

            name: 'Acrylic Fridge Magnets',
            slug: "Fridge Magnet-1",
            image: "/images/Fridge-Magnets/Acrylic-Fridge-Magnets.jpeg",
            price: 20,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Customize Fridge magnets',
            slug: "Fridge Magnet-2",
            image: "/images/Fridge-Magnets/Customize-Fridge-magnets.jpeg",
            price: 20,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Farmhouse Mason Jar Fridge Magnet, Wood Magnet, Bless this Home Magnet, Farmhouse Home Decor',
            slug: "Fridge Magnet-3",
            image: "/images/Fridge-Magnets/fridge-magnet.jpeg",
            price: 20,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Photo Magnets Custom Printing Magnet Gift for Him Black Friday Deals Holiday Decor Fridge Photo Magnets Idea Wedding Invitation',
            slug: "Fridge Magnet-4",
            image: "/images/Fridge-Magnets/Sunboard-Fridge-Magnet.jpeg",
            price: 20,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Good Food Good Mood Sticker _ Cooking',
            slug: "Fridge Magnet-5",
            image: "/images/Fridge-Magnets/Good-Food-Good-Mood-Sticker _ Cooking.jpeg",
            price: 20,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    coasters: [

        {

            name: 'Square tea coaster',
            slug: "tea coaster -1",
            image: "/images/tea_coaster/tea-coaster.jpeg",
            category: "MDF Tea Coaster",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Laser Cut Coaster Set with Holder',
            slug: "tea coaster -2",
            image: "/images/tea_coaster/tea-round-coaster.jpeg",
            category: "MDF Tea Coaster",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Personalised names coaster set',
            slug: "tea coaster -3",
            image: "/images/tea_coaster/teacoster.jpeg",
            category: "MDF Tea Coaster",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
       
       
        {

            name: 'Auntie My Best-Tea Coaster - Personalised Gift, Funny Gift, Birthday Gift, Best Auntie Gift',
            slug: "tea coaster -6",
            image: "/images/tea_coaster/tea-coaster-4.jpeg",
            category: "Sunboard Sublimated Tea Coaster",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],

    bands: [

        {

            name: 'Silicone Bracelet Mockup _ Wristband ',
            slug: "Silicon Bands-1",
            image: "/images/Bands/band-1.jpg",
            category: "Silicon Bands",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Save Big on Bundles! – Popular Christian Apparel',
            slug: "Silicon Bands-2",
            image: "/images/Bands/band-2.jpg",
            category: "Silicon Bands",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    brochures: [

        {

            name: 'Square Brochure Mockup PSD Set - Good Mockups',
            slug: "brochure-1",
            image: "/images/Printing/Broucher/brochures-1.jpeg",
            category: "brochure",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'I will design an awesome postcard for you',
            slug: "brochures-2",
            image: "/images/Printing/Broucher/brochures-2.jpeg",
            category: "brochure",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Magazine ad Design',
            slug: "brochures-3",
            image: "/images/Printing/Broucher/brochures-3.jpeg",
            category: "brochure",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    standees: [

        {

            name: 'Advancing Bitcoin Conference - Pull up Banner',
            slug: "standee-1",
            image: "/images/Printing/standee/standi-1.jpeg",
            category: "standee",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Roll Up standee',
            slug: "standee-2",
            image: "/images/Printing/standee/standi-2.jpeg",
            category: "standee",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
      

    ],
    occasions: [

        {

            name: 'he Wallet Store Personalized Workday Wonder Unisex Gift Set',
            slug: "occasion-1",
            image: "/images/Giftsets/Giftset-1.jpeg",
            price: 0,
            rating: 0,
            variety: '-',
            code: '02',
            numReviews: 0,
            description: "High Quality product",
        }
    ],
    printings: [

    ],
    teachaccesories: [

    ],

    sublimation_items: [
        {
            name: 'Pillow Covers/Trendy Best Friends Photo & Quote Besties Throw Pillow.',
            slug: "sublimation item-1",
            image: "/images/sublimation_item/pollo-coaster.jpg",
            category: 'Sublimation ITEMS',
            price: 0,
            countInStock: 50,
            variety: '-',
            code: '02',

            description: "High Quality",
        },
        {
            name: 'Auntie My Best-Tea Coaster - Personalised Gift, Funny Gift, Birthday Gift, Best Auntie Gift.',
            slug: "sublimation item-2",
            image: "/images/sublimation_item/tea coaster-1.jpeg",
            category: 'Sublimation ITEMS',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
    

    ],
    containers: [
        {
            name: 'Glass Jars with Bamboo Lids - Airtight Food Storage Containers with Silicone Seal - Dishwasher Safe - Containers for Sugar, Coffee, Tea, Nuts, Spice, and Pasta.',
            slug: "sublimation item-1",
            image: "/images/container.jpeg",
            category: 'container',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },


    ],
    desk_stands: [
        {
            name: 'Monitor Stand Riser,Wood & Acrylic Computer Monitor Stand with LED Light,Desk Accessories Desktop Organizer Stand for Computer,Laptop,Printer,PC & TV Screen Riser',
            slug: "desk stand -1",
            image: "/images/desk-stand.jpeg",
            category: 'Sublimation ITEMS',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },


    ],

    totebags: [
        {
            name: 'Butterfly Tote Bag, gift for mom, gifts, cute bag, holy bag',
            slug: "Tote Bag -1",
            image: "/images/Bags/Butterfly-Tote-Bag.jpeg",
            category: 'Tote Bag',
            price1: 45,
            price2: 58,
            variety1: '12*14 Inch',
            variety2: '12*16 Inch',
            code: "t11",
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Custom Literature Tote Bag, Book Lover Canvas Bag, Literature Student Graduation Gift, Personalized Tote Bag for My Best Friend',
            slug: "Tote Bag -2",
            image: "/images/Bags/Custome-Tote-Bag.jpeg",
            category: 'Tote Bag',
            price1: 45,
            price2: 58,
            variety1: '12*14 Inch',
            variety2: '12*16 Inch',
            code: "t12",
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },


    ],
    jutebags: [
        {
            name: 'natural white jute bag',
            slug: "Jute Bag -1",
            image: "/images/Bags/Jute-bags/2.jpg",
            category: 'Jute Bag',
            variety1: '12*12*6 Inch',
            price1: 65,
            variety2: '12*14*6 Inch',
            price2: 75,
            code: 'J11',
            countInStock: 50,
            description: "Eco Friendly and Waterproof - Made from 100% natural burlap which is laminated inside Comfort, Durable and Lightweight - 100% Bio degradable and Recyclable, Eco Friendly Jute Bag. Bio degradable and eco-friendly.REASONS TO BUY Jute India JUTE BAGS – These Jute Bags online are reusable as Jute bags for lunch for men.Light weight and foldable for easy storage. You will love to carry this eco-friendly affordable durable bag day by day.",
        },
        {
            name: 'natural jute bag',
            slug: "Jute Bag -2",
            image: "/images/Bags/Jute-bags/4.jpg",
            category: 'Jute Bag',
            variety1: '12*12*6 Inch',
            price1: 65,
            variety2: '12*14*6 Inch',
            price2: 75,
            code: 'J11',
            countInStock: 50,
            description: "The tote bag is perfect for your everyday shopping needs. Each bag has been crafted to carry upto 35 lbs of weight. It is 100% biodegradable and can replace thousands of plastic bags every year.Material: 100% Cotton (5oz - light fabric) | Color: Natural (Natural, Non Dyed). BIODEGRADABLE; Our canvas tote bags are totally compostable, meaning that these reusable tote bags won’t clog up landfills; Save on plastic with our large tote bags ; Our foldable shopping bags are made from 100 percent unbleached cotton. Make your canvas cloth totes stand out from the crowd; These heavy duty tote bags can be personalized with screen printing or embroidery; Make your mark on a reusable tote and create cloth grocery bags as colorful as you are. Our reusable bags are designed to last a minimum of 150 uses each; For reusable shopping bags that will hold up under any conditions",
        },
        {
            name: 'white jute bag',
            slug: "Jute Bag -3",
            image: "/images/Bags/Jute-bags/JU-WHITTAPE_b.jpg",
            category: 'Jute Bag',
            variety1: '12*12*6 Inch',
            price1: 65,
            variety2: '12*14*6 Inch',
            price2: 75,
            code: 'J1',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Jute Mini Gift Bag  (Black_Black)',
            slug: "Jute Bag -4",
            image: "/images/Bags/Jute-bags/jute-mini-bag.jpeg",
            category: 'Jute Bag',
            variety1: '12*12*6 Inch',
            price1: 65,
            variety2: '12*14*6 Inch',
            price2: 75,
            code: 'J11',
            countInStock: 50,

            description: "High Quality",
        },


    ],
    bagpacks: [

        {
            name: 'Mens Backpack Lightweight Simple Travel Bag School Bag Business Laptop Bag Waterproof',
            slug: 'bagpack- 1',
            category: 'backpack',
            material: 'backpack',
            image: '/images/Bags/Bagpack/Bagpack.jpeg',
            variety: '-',
            code: 'FM-916',
            price: 120,
            countInStock: 15,
            rating: 0,
            numReviews: 0,
            description: 'High Quality',
        },
        {
            name: 'Custom Zusa Tech Backpack',
            slug: 'bagpack- 2',
            category: 'backpack',
            material: 'backpack',
            image: '/images/Bags/Bagpack/bagpack-2.jpeg',
            variety: '-',
            code: 'FM-916',
            price: 120,
            countInStock: 15,
            rating: 0,
            numReviews: 0,
            description: 'High Quality',
        },
       
        {
            name: 'Mochila Unissex Notebook Com Cadeado, Entrada Para Usb_ Fone De Ouvido',
            slug: 'bagpack- 4',
            category: 'backpack',
            material: 'backpack',
            image: '/images/Bags/Bagpack/bagpack-3.jpeg',
            variety: '-',
            code: 'FM-916',
            price: 120,
            countInStock: 15,
            rating: 0,
            numReviews: 0,
            description: 'High Quality',
        },
 


    ],
    cardpendrives: [
        {
            name: 'card Pen Drive',
            slug: "card pen drive -1",
            image: "/images/Pen-Drive/1 (13).jpg",
            category: 'Card Pen Drive',
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'sb_cards_on_a_wooden_surface_mockup',
            slug: "card pen drive -2",
            image: "/images/Pen-Drive/wooden-pendrive.webp",
            category: 'Card Pen Drive',
            price1: 120,
            price2: 130,
            price3: 140,
            variety1: '16GB',
            variety2: '32GB',
            variety3: '64GB',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
       
    ],

    calenders: [
        {
            name: 'Calendar',
            slug: "calenders -1",
            image: "/images/Printing/calenders/Calendar.jpeg",
            category: 'calenders',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Seed Paper Desk Calendar',
            slug: "calenders -2",
            image: "/images/Printing/calenders/wooden-Calender.jpeg",
            category: 'calenders',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    flyer_pamplates: [
        {
            name: 'Premium Vector _ Business flyer template with photo',
            slug: "flyer_pamplate -2",
            image: "/images/Printing/flyer_pamplate/flyer.jpeg",
            category: 'flyer_pamplate',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    bookmarks: [
        {
            name: 'bookmarks',
            slug: "bookmarks -1",
            image: "/images/Printing/bookmarks/bookmarks.jpeg",
            category: 'bookmarks',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    folders: [  
        {
            name: 'documents folder',
            slug: "folders -1",
            image: "/images/Printing/folder/documents-folder.jpeg",
            category: 'folders',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Exacompta - Ref 53054E - PremTouch PVC Lever Arch File - 320 x 290mm in Size, 2 Rings, Can Hold A4 Documents, 50mm Spine, 55mm Rings, FSC-Certified - Assorted Vivid Colours',
            slug: "folders -2",
            image: "/images/Printing/folder/folder-1.jpeg",
            category: 'folders',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Smead, Smd17634, File Folders with Reinforced Tab, 100 _ Box, Pink',
            slug: "folders -3",
            image: "/images/Printing/folder/folder-2.jpeg",
            category: 'folders',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    magzines: [
        {
            name: 'Catalogue SM Travel',
            slug: "magzines -1",
            image: "/images/Printing/magzine/magzine.jpeg",
            category: 'magzines',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    training_mannuals: [
        {
            name: 'Human Resource Training Manual Template Visme',
            slug: "Training Mannuals -1",
            image: "/images/Printing/training Mannual/trainning-mannual.jpeg",
            category: 'Training Mannuals',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    annual_Reports: [
        {
            name: 'Clean Annual Report Brochure Template',
            slug: "Annual Report -1",
            image: "/images/Printing/Annual Report/annual-report.jpeg",
            category: 'Annual Report',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    document_printings: [
        {
            name: 'Premium Vector _ Letterhead',
            slug: "Document Printing -1",
            image: "/images/Printing/document-printing.jpeg",
            category: 'Document Printing',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    project_reports: [
        
        {
            name: 'Project Completion Report Templates in Word, Pages, Google Docs',
            slug: "Project Report -2",
            image: "/images/Printing/project-report.jpeg",
            category: 'Project Report',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    stickers: [
        {
            name: 'Custom Water Bottle, Personalized Gift for Women Men Dad Him Her, Insulated Drink Bottle, Stainless Steel Bottle,Personalized Sport Bottle',
            slug: "Stickers -1",
            image: "/images/Printing/sticker/sticker-2.jpeg",
            category: 'Stickers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Laptop Sticker Mockup PSD',
            slug: "Stickers -2",
            image: "/images/Printing/sticker/sticker-1(3).jpeg",
            category: 'Stickers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Time To Travel Sticker _ Time To Travel Water Bottle Sticker _ Travel Laptop Sticker _ Time To Travel Car Window Decal _ Colorful Lettering',
            slug: "Stickers -3",
            image: "/images/Printing/sticker/sticker.webp",
            category: 'Stickers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Photo Magnets Custom Printing Magnet Gift for Him Black Friday Deals Holiday Decor Fridge Photo Magnets Idea Wedding Invitation',
            slug: "Stickers -4",
            image: "/images/Printing/sticker/sticker-2.jpeg",
            category: 'Stickers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    notepads: [
        {
            name: 'A5 Notepads Printing in UK',
            slug: "Notepad -1",
            image: "/images/Printing/Notepad/notepad-1.jpeg",
            category: 'Notepad',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        }
      
    ],
    sippers: [
        {
            name: 'Anti skit bottles',
            slug: "sipper -1",
            image: "/images/Sippers/borosillicate/Anti-skit-bottles.jpeg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Borosilicate Glass Bottle',
            slug: "sipper -2",
            image: "/images/Sippers/borosillicate/Borosilicate-Glass-Bottle.jpeg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Nutrition Shaker Bottle',
            slug: "sipper -3",
            image: "/images/Sippers/Nutrition-Shaker-Bottle.jpeg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Plastic (Food Grade) BPA free',
            slug: "sipper -4",
            image: "/images/Sippers/sipper-bottle-1.jpg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Shakker Bottle',
            slug: "sipper -5",
            image: "/images/Sippers/Shakker-Bottle.jpeg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Stainless Steel ( Double Wall )',
            slug: "sipper -6",
            image: "/images/Sippers/Stainless-Stee-(Double-Wall).jpg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Stainless Steel',
            slug: "sipper -7",
            image: "/images/Sippers/Stainless-Steel.png",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
      
        {
            name: 'Stainless-steel -Glass Sipper',
            slug: "sipper -9",
            image: "/images/Sippers/Stainless-steel-Glass-Sipper.jpg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Stainless-steel -Glass Sipper',
            slug: "sipper -10",
            image: "/images/Sippers/Stainless-steel2-Glass-Sipper.jpg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Vacuum Flask Set',
            slug: "sipper -11",
            image: "/images/Sippers/Vacuum Flask Set.jpeg",
            category: 'sipper',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    family_tshirts: [
        {
            name: 'amily Matching Love Shirt, Valentines Day Mommy Daddy Baby Tee, Mothers Day Tees, New Mama Dada Shirt, Fathers Day Outfit, Baby Shower Gift',
            slug: "family t-shirts -1",
            image: "/images/T-shirts/family-tishirts/family-tshirt.jpeg",
            category: 'family t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    fullsleave_tshirts: [
        {
            name: 'T-Shirt Men Cotton T Shirt Full Sleeve',
            slug: "full sleave t-shirts -1",
            image: "/images/T-shirts/full-sleave_t-shirts/full-sleave.jpeg",
            category: 'full sleave t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    girls_tshirts: [
        {
            name: 'Young Womens Tees _ Juniors Tops, Graphic Tees, Basics',
            slug: "girls t-shirts -1",
            image: "/images/T-shirts/girls-tshirts/girl-tshirt.jpeg",
            category: 'girls t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    couple_tshirts: [
        {
            name: 'Valentines Day Shirts  Custom Couple Shirts  Husband And Wife Matching Shirts  Matching T Shirts For Couples  His And Her Valentine Shirts  Husband And Wife Shirt',
            slug: "couple t-shirts -1",
            image: "/images/T-shirts/couple_t-shirts/couple-tshirt.jpeg",
            category: 'couple t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    sports_tshirts: [
        {
            name: 'Mens adidas Stripe Printing Sports Short Sleeve Black T-Shirt',
            slug: "sports t-shirts -1",
            image: "/images/T-shirts/sports-tshirts/sports-tshirt.jpeg",
            category: 'sports t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    polo_tshirts: [
        {
            name: 'Polo Shirts for Men Short Sleeve Moisture Wicking Summer Casual ',
            slug: "polo t-shirts -1",
            image: "/images/T-shirts/polo_t-shirts/polo-tshirt.jpeg",
            category: 'polo t-shirts',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    dry_fit_tshirts: [
        {
            name: 'Nike Ss Youth Park VI Sportshirt Kinderen - Midnight Navy_Wit',
            slug: "dry fit t-shirts -1",
            image: "/images/T-shirts/Dry-Fit/dry-fit.jpeg",
            category: 'dry fit t-shirts',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    hoodies: [
        {
            name: 'Mens Hoodie Yellow Khaki Orange Red White Hooded Color Block Casual Cotton Cool Designer Sportswear Winter Fall Clothing Apparel Hoodies Sweatshirts',
            slug: "hoodies -1",
            image: "/images/T-shirts/hoodies/hoodies-1.jpeg",
            category: 'hoodies',
            price: 0,
            variety1: 'M',
            variety2: 'L',
            variety3: 'XL',
            variety4: 'XXL',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'hoodies with sticker',
            slug: "hoodies -2",
            image: "/images/T-shirts/hoodies/hoodies-2.webp",
            category: 'hoodies',
            price: 0,
            variety1: 'M',
            variety2: 'L',
            variety3: 'XL',
            variety4: 'XXL',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    caps: [

        {
            name: 'Mens Hats for Sale',
            slug: "cap -1",
            image: "/images/T-shirts/cap/cap-1.jpeg",
            category: 'cap',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    wallets: [

        {
            name: 'Genuine Leather Wallets for Men Bifold RFID Blocking Wallet',
            slug: "wallet -1",
            image: "/images/Wallets/wallets.jpeg",
            category: 'wallet',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    certificates: [

        {
            name: 'Modèle de certificat de diplôme dor bleu élégant _ Vecteur Premium',
            slug: "certificate -1",
            image: "/images/Certificates/certificate.jpeg",
            category: 'certificate',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    cushion_covers: [

        {
            name: 'Roupas Femininas & Masculinas, Loja de Moda Online',
            slug: "cushion cover -1",
            image: "/images/Cushion-Covers/cover.jpeg",
            category: 'cushion cover',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
      
    ],
    cushions: [

        {
            name: 'Living Room Ideas That Will Make',
            slug: "cushion -1",
            image: "/images/cushion/cushion-cover.jpg",
            category: 'cushion',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Classic Bamboo Trellis Pattern 260 Black And Yellow Throw Pillow',
            slug: "cushion -2",
            image: "/images/cushion/cushion-cover2.jpeg",
            variety: '-',
            code: 'FM-916',
            category: 'cushion',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        }
    ],
    magnetic_photoframes: [

        {
            name: 'Wrought Studio Table magnétique',
            slug: "Magnetic Photo Frame -1",
            image: "/images/photoframe/magnetic-photo-frame.jpeg",
            category: 'Magnetic Photo Frame',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    acrylic_photoprints: [

        {
            name: 'Acrylic Photo Frame',
            slug: "Acrylic Photo Frame -1",
            image: "/images/photoframe/acrylic.jpeg",
            category: 'Acrylic Photo Frame',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    id_landyards: [

        {
            name: 'Creative Id Card Design Template',
            slug: "ID and landyard -1",
            image: "/images/IDs/id-1.jpg",
            category: 'ID and landyard',
            price: 30,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Creative Id Card Design Template',
            slug: "ID and landyard -2",
            image: "/images/IDs/id-2.jpeg",
            category: 'ID and landyard',
            price: 30,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Event Badges Template',
            slug: "ID and landyard -4",
            image: "/images/IDs/id-3.jpeg",
            price: 30,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'lanyard ID badge mockup',
            slug: "ID and landyard -5",
            image: "/images/IDs/id-4.jpeg",
            price: 30,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",    
        },
        {
            name: 'Id cards template with photo abstract style',
            slug: "ID and landyard -6",
            image: "/images/IDs/id-5.jpg",
            price: 30,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    pencils: [

        {
            name: 'Best Eco Friendly Zero Waste School Supplies - The Eco Hub',
            slug: "Pencil -1",
            image: "/images/Wodden_Sustainable_items/wooden-pencils.jpeg",
            category: 'Pencil',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Plantable Sprout Pencils',
            slug: "Pencil -2",
            image: "/images/Wodden_Sustainable_items/plantable-pencil.jpeg",
            category: 'Pencil',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
  

    ],

    checkbook_covers: [


        {
            name: 'op Stub Leather Checkbook Cover-Black',
            slug: "checkbook covers -2",
            image: "/images/bag-wallet/checkbook-cover/checkbook-cover.jpeg",
            category: 'checkbook covers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    clutches: [

        {
            name: 'Clutches',
            slug: "clutches -1",
            image: "/images/bag-wallet/Clutches/download(1).jpeg",
            category: 'clutches',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Victorias Secret Bags _ Victoria’s Secret Wristlet_Wallet _ Color_ Pink _ Size_',
            slug: "clutches -2",
            image: "/images/bag-wallet/Clutches/clutches.jpeg",
            category: 'clutches',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
      
    ],
    slingbags: [

        {
            name: 'Daylite Sling Umhängetasche',
            slug: "sling bags -1",
            image: "/images/bag-wallet/siling-bags/sling-bag.jpeg",
            category: 'sling bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    travelbags: [

        {
            name: 'Bolsa De Viagem Modelo Expansiva',
            slug: "travel bags -1",
            image: "/images/bag-wallet/travel-bag/travel-bag.jpeg",
            category: 'travel bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    schoolbags: [

        {
            name: 'Multi-pocket Nylon School Backpack For Women, High Capacity, Lightweight Backpack',
            slug: "School bags -1",
            image: "/images/bag-wallet/schoolbag/schoolbag.jpeg",
            category: 'school bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        }
    ],
    non_wovenbags: [

        {
            name: 'Custom Laminated Totes Collection',
            slug: "Non Woven Bgas -2",
            image: "/images/Bags/Non-woven-bag-2.jpeg",
            category: 'Non Woven Bgas',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Customized Design Standard Size 6 Bottle Non Woven Wine Tote Bag with Handle Supplier',
            slug: "Non Woven Bgas -3",
            image: "/images/Bags/Nonwoven_bags/nan-wovebbag.jpeg",
            category: 'Non Woven Bgas',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Customized Design Standard Size 6 Bottle Non Woven Wine Tote Bag with Handle Supplier',
            slug: "Non Woven Bgas -4",
            image: "/images/Bags/Nonwoven_bags/non-wovenbag-2.jpeg",
            category: 'Non Woven Bgas',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Tissu Non Tissé - Sacs de Transport Durables pour Shopping et Marchandises',
            slug: "Non Woven Bgas -5",
            image: "/images/Bags/Nonwoven_bags/non-wovenbag-3.jpeg",
            category: 'Non Woven Bgas',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    wildcraftbags: [

        {
            name: 'Small Gym Bag, Workout Bag ',
            slug: "Wildcraft  bags -1",
            image: "/images/bag-wallet/wildcraft-bag",
            category: 'Wildcraft  bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],

    headphones: [

        {
            name: 'Best headphones',
            slug: "headphones -1",
            image: "/images/teach-accessories/headphone/headphone.jpeg",
            category: 'headphones',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'lue Bluetooth On-Ear Headphones',
            slug: "headphones -2",
            image: "/images/teach-accessories/headphone/headphone-2.jpeg",
            category: 'headphones',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    laptop_skins: [

        {
            name: 'Macbook Air engraving',
            slug: "laptop skin -1",
            image: "/images/teach-accessories/laptop-skin/laptopskin-1.jpeg",
            category: 'laptop skin',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Sity Laptop Skin Sticker',
            slug: "laptop skin -2",
            image: "/images/teach-accessories/laptop-skin/laptopskin-2.jpeg",
            category: 'laptop skin',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Source unknown yet',
            slug: "laptop skin -3",
            image: "/images/teach-accessories/laptop-skin/laptopskin-3.jpeg",
            category: 'laptop skin',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    mobile_accessories: [

        {
            name: 'Miracase Cell Phones & Accessories _ Miracase Cell Phone Holder Nwb _ Color_ Black _ Size',
            slug: "Mobile Accessories -1",
            image: "/images/teach-accessories/mobile-accessories/mobile-accessories.jpeg",
            category: 'Mobile Accessories',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    magnifires: [

        {
            name: 'HONWELL LED Magnifying Glass',
            slug: "magnifires -1",
            image: "/images/teach-accessories/magnifires/magnifire.jpeg",
            category: 'magnifires',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    bags_wallets: [

        {
            name: 'op Stub Leather Checkbook Cover-Black',
            slug: "bag-wallet -1",
            image: "/images/bag-wallet/checkbook-cover/checkbook-cover.jpeg",
            category: 'checkbook covers',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Clutches',
            slug: "bags and wallet -2",
            image: "/images/bag-wallet/Clutches/download(1).jpeg",
            category: 'clutches',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Victorias Secret Bags _ Victoria’s Secret Wristlet_Wallet _ Color_ Pink _ Size_',
            slug: "bags and wallet -3",
            image: "/images/bag-wallet/Clutches/clutches.jpeg",
            category: 'clutches',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
     
        {
            name: 'Genuine Leather Wallets for Men Bifold RFID Blocking Wallet',
            slug: "bags and wallet -5",
            image: "/images/Wallets/wallets.jpeg",
            category: 'wallet',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Backpack Lightweight Simple Travel Bag School Bag  Laptop Bag Waterproof',
            slug: "bags and wallet -6",
            image: "/images/Bags/Bagpack/Bagpack.jpeg",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Custom Zusa Tech Backpack',
            slug: "bags and wallet -7",
            image: "/images/Bags/Bagpack/bagpack-2.jpeg",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Dunlop CX Performance Tennis Backpack (Black_Red)',
            slug: "bags and wallet -8",
            image: "/images/Bags/Bagpack/Bagpack.jpeg",
            category: 'laptop bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Men Letter Graphic Large Capacity Backpack',
            slug: "bags and wallet -9",
            image: "/images/Bags/Bagpack/bagpack-2.jpeg",
            category: ' laptop bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
       
        {
            name: 'Daylite Sling Umhängetasche',
            slug: "bags and wallet -12",
            image: "/images/bag-wallet/siling-bags/sling-bag.jpeg",
            category: 'sling bags',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Genuine Leather Wallets for Men Bifold RFID Blocking Wallet',
            slug: "bags and wallet -13",
            image: "/images/Wallets/wallets.jpeg",
            category: 'wallet',
            price: 0,
            variety: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    bottle_sippers: [

        {
            name: 'Tempreture Display bottle',
            slug: "bottles & sipper -7",
            image: "/images/Mugs/Bottles-Sippers/sipper-bottle.jpeg",
            category: 'drinkware',
            capacity: '500ml',
            material: 'Stainless Steel',
            price: 150,
            variety1: 'Black',
            variety2: 'White',
            variety3: 'Red',
            variety4: 'Pink',
            variety5: 'Blue',
            code: 'FM 955',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Stainless Steel Water Bottle',
            capacity: "750 ml",
            slug: "Bottles & Sippers16",
            material: "Stainless Steel",
            image: "/images/Sippers/Bottles-Sippers/Steel-Water-Bottle.png",
            category: 'Ceramic',
            price: 120,
            variety1: 'Black',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM-916',
            countInStock: 15,

            description: "High Quality",

        },

        {
            name: 'Stainless Steel Sipper Bottle',
            slug: "bottles & sipper -1",
            image: "/images/Sippers/Bottles-Sippers/Stainless-Steel-Sipper-Bottle.jpg",
            category: 'drinkware',
            capacity: '750 ml',
            material: 'material Stainless Steel and Plastic',
            variety1: 'Black',
            variety2: 'Blue',
            variety3: 'Red',
            variety4: '-',
            variety5: '-',
            code: 'FM-955',
            price: 120,
            countInStock: 50,
            description: "At Fine Multiprint Solutions, we specialize in crafting custom sipper bottles made from high-quality stainless steel and durable plastic. Whether for sports teams, corporate giveaways, or personal use, we offer a variety of options to suit your hydration needs.Our Types:Stainless Steel Sipper Bottles: Sleek and durable, ideal for maintaining beverage temperature.Plastic Sipper Bottles: Lightweight and versatile, perfect for on-the-go hydration.Different Types of Names:Individual Names: Personalize each bottle with individual names for team members or gifts.Custom Messages: Add motivational quotes, slogans, or personal messages.Event Names: Include event names or dates to commemorate special occasions.Logo and Printing Options:Logo Printing: Add your company logo or custom design for promotional purposes.Custom Prints: Choose from various prints such as patterns, illustrations, or thematic designs.",
        },
        {
            name: 'Aluminum Bottle With Clip',
            slug: "bottles & sipper -101",
            image: "/images/Sippers/Bottles-Sippers/Aluminum-Bottle-With-Clip.jpg",
            category: 'drinkware',
            capacity: '750 ml',
            material: 'material Stainless Steel and Plastic',
            variety1: 'White',
            variety2: 'Black',
            variety3: 'Red',
            variety4: 'Blue',
            variety5: '-',
            code: 'FM-955',
            price: 120,
            countInStock: 50,
            description: "This sports water bottle is made of high-quality aluminum, making it sturdy and durable.The aluminum water bottle can be filled with hot or cold liquids and is BPA-free, so you can use it with confidence.This cycling water bottle is lightweight and durable, making it perfect for taking with you during long workouts or hikes.This thermos cup can be used for a variety of purposes, whether you use it as a sports water bottle while exercising or as a regular water bottle throughout the day.The water bottles includes a buckle screw head that can be buckled on the backpack for easy use. It's the perfect travel size bottle for participating in sporting events, enjoying the outdoors or replenishing hydration in the office.",
        },
        {
            name: 'Double Wall Sports Water Bottle',
            slug: "bottles & sipper -10",
            image: "/images/Sippers/Bottles-Sippers/double-wall-sports-bottle.webp",
            category: 'drinkware',
            capacity: '550ml',
            material: 'Ceramic',
            price: 220,
            variety1: 'Black',
            variety2: 'White',
            variety3: 'Blue',
            variety4: 'Silver',
            code: 'FM 954',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Bamboo Vacuum Insulated Bottle',
            slug: "bottles & sipper -112",
            image: "/images/Sippers/Bottles-Sippers/Bamboo-Bottle.jpeg",
            category: 'drinkware',
            capacity: '500ml',
            material: 'Ceramic',
            price: 300,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            code: 'FM 954',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Bamboo Vacuum Insulated Bottle wooden sipper',
            slug: "bottles & sipper -113",
            image: "/images/Sippers/Bottles-Sippers/wooden-sipper-bottle.jpg",
            category: 'drinkware',
            capacity: '500ml',
            material: 'Ceramic',
            price: 300,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            code: 'FM 954',
            countInStock: 50,

            description: "High Quality",
        },
        {
            name: 'Motivational Quotes Sports Water Bottle',
            slug: "bottles & sipper -8",
            image: "/images/Sippers/Bottles-Sippers/sports-water-bottle.jpeg",
            category: 'drinkware',
            capacity: '900 ml',
            material: 'Ceramic',
            price: 0,
            variety1: 'Black',
            variety2: 'Blue',
            variety3: 'Green',
            variety4: 'Pink',
            variety5: '-',
            code: 'FM 954',
            countInStock: 50,

            description: "High Quality",
        },
       
   
        {
            name: 'Magic Sublimation Mug',
            slug: "bottles & sipper -3",
            image: "/images/drinkware/Bottles-Sippers/assortment-tumbler-with-copy-space.jpg",
            category: 'drinkware',
            capacity: '1 liter',
            material: 'Ceramic',
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM 954',
            price: 190,
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Clear Water Bottle , Magic Sublimation Mug',
            slug: "Bottles & Sippers18",
            image: "/images/drinkware/Glass Bottles/clear-water-bottle.jpeg",
            category: 'Sipper',
            capacity: '300ml',
            material: 'Ceramic',
            price: 220,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Custom borosilicate glass water bottle double wall 300ml glass bottle tea infuser water bottle',
            slug: "Bottles & Sippers20",
            image: "/images/Sippers/Glass-Bottles/Glass-Water-Bottle-2.jpeg",
            category: 'Sipper',
            capacity: '300ml',
            material: 'Ceramic',
            price: 260,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM-916',
            countInStock: 50,

            description: "High Quality",
        },
       
        {

            name: 'Drinking glass, drinking glass with lid, drinking glass children',
            slug: "Bottles & Sippers23",
            image: "/images/drinkware/Bottles-Sippers/sipper-bottle-1.jpg",
            category: 'Steel Mug',
            capacity: '120 ml',
            material: 'Stainless Steel & Plastic',
            price: 180,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM 955',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Glass cup with bamboo lid & Straw',
            slug: "Bottles & Sippers24",
            image: "/images/drinkware/Bottles-Sippers/bamboo-lid.jpeg",
            category: 'Steel Mug',
            capacity: '120 ml',
            material: 'Stainless Steel & Plastic',
            price: 190,
            variety1: '-',
            variety2: '-',
            variety3: '-',
            variety4: '-',
            variety5: '-',
            code: 'FM 955',
            countInStock: 50,

            description: "High Quality",
        },
    ],
    giftcards: [

        {
            name: 'Breakfast board with motif_ GIRAFFEN HEAD - breakfast board - customizable - gift idea, wooden board with engraving',
            slug: "giftcard -1",
            image: "/images/home-product/giftcard/giftcard.jpeg",
            category: 'giftcard',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    posters: [

        {
            name: 'Matisse Print, Exhibition Poster, Pink Wall Art, Gallery Wall Art, Mid-Century Modern Art, Trendy Wall Art, Vintage Poster, Digital',
            slug: "poster -1",
            image: "/images/home-product/Poster/poster.jpeg",
            category: 'poster',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    stamps: [

        {
            name: 'Rubber Stamp PSD MockUp',
            slug: "stamp -1",
            image: "/images/home-product/Stamp/Rubber Stamp PSD MockUp.jpeg",
            category: 'stamp',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    tags: [

        {
            name: 'Personalized Die Cut Paper Tags with Eyelets (Thickness 500 GSM) Favor Swing Tags for Business_Clothes, Display Tags for Gift, Price Tags.jpeg',
            slug: "stamp -1",
            image: "/images/home-product/tags/tags.jpeg",
            category: 'tags',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    sustainablesitems: [
        {
            name: 'Bamboo Holder',
            slug: "eco-friendly -1",
            image: "/images/home-product/Wodden-Table-items/Bambo-Holder.jpeg",
            category: 'wooden table item',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "Enough to Use and Share: package contains 6 pieces of wood pen holders in the shape of cylinder, enough quantity to suffice your daily use and replacement demands, bringing you much convenience for your daily organization, also support to share with family and friends.Sturdy Bamboo Material: bamboo pencil holders are made of quality bamboo, sturdy and long lasting, by carbonization process, the surface is smooth and comfortable to the touch, not easy to deform or break, can be applied for a long time with confidence; Please note that the thickness is not completely uniform, the top of the pencil holder is smoothed and carbonized, the color of some parts of the opening will be a little light, if you mind, please be careful to buy.Both Practical and Decorative: bamboo makeup holders are not only suitable for storing office necessities, such as pens, pencils, highlighters, scissors, note pads, solid glue and more, but they can also add a sense of rusticity and elegance to your desk, both practical and decorative",
        },
        {
            name: 'Desk Pen Holder for Teacher _ Engraved Teacher Pen Stand _ Personalized Desk Pen Holder _ Gift for Teacher _ Teacher Appreciation Month',
            slug: "eco-friendly -3",
            image: "/images/home-product/Wodden-Table-items/Wooden-Pen-Holder.jpeg",
            category: 'wooden table item',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "Pack bamboo wood pencil holder is made of premium bamboo,natural,eco-friendly,safe,renewable,not easy to deform and durable.t is not just a fashionable and practical pen cup holder,perfect for storing office essentials like pens,pencils,highlighters,scissors etc,and cosmetic tools,cutlery,but also a beautiful and artistic decor on your desktop. More importantly, it is a Eco-friendly product.Because these pen holders are all made from bamboo.Bamboo's versatility as an alternative to hardwood offers the opportunity to significantly reduce the damage to the forest. In addition, bamboo fibers are stronger than wood fibers. In fact, because they do not easily deform when changing atmospheric conditions,a solid pencil cup is your best choice.The best gift you can give to friends and family! They will love the design and be impressed with the fabulous quality",
        },
        {
            name: 'Wodden Table items',
            slug: "eco-friendly -4",
            image: "/images/home-product/Wodden-Table-items/wooden-item.jpeg",
            category: 'wooden table item',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "Compartments: Conquer clutter with dedicated spaces for pens, phones, notepads, and even your AC remote. • Built-in Watch: Stay on top of your schedule with a convenient timepiece seamlessly integrated into the design. • Versatility at Its Finest: Store markers, staplers, clips, and more, keeping your essentials organized and close at hand. • Crafted for Quality: High-grade wood ensures durability and a classy, understated texture that elevates your workspace. • Brand It Your Way: Personalize with your logo or message through laser engraving or screen printing for a unique touch. • The Perfect Gift: This organizer blends functionality, style, and a timekeeping tool, making it a thoughtful present for colleagues, students, or anyone who values organization and efficiency",
        },
        {
            name: 'Photographer USBs for Weddings',
            slug: "eco-friendly -5",
            image: "/images/Wodden_Sustainable_items/wooden-pendrive.jpeg",
            category: 'wooden table item',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "Kbr Product Pendrive Is A Stylish And Visually Appealing Usb Storage Device That Combines Functionality With Aesthetic Appeal. With Unique Designs, Colors, And Patterns, They Stand Out From Traditional Pendrives, Making Them A Fashionable Accessory While Serving The Practical Purpose Of Storing And Transferring Data. Whether It's Shaped Like A Cartoon Character, A Piece Of Jewelry, Or A Sleek Modern Design, Designer Pendrives Add Personality And Flair To Your Tech Accessories",
        },
        {
            name: 'Houseplants Are the Ultimate Accessory_ Heres How to Choose One You Wont Kill',
            slug: "eco-friendly -6",
            image: "/images/Wodden_Sustainable_items/houseplants.jpeg",
            category: 'wooden table item',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
       
        {
            name: 'made from wood and as we all know plant materials are biodegradable',
            slug: "eco-friendly -8",
            image: "/images/Wodden_Sustainable_items/wooden-pencils.jpeg",
            category: 'wooden table item',
            material: 'West Material',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Paper is biodegradable; this is because is made from wood and as we all know plant materials are biodegradable. Paper can even be recycled up to 6-7 times before the paper fibers breakdown to much to be turned in to paper. Each pencil is proud to be 95% recycled. Each is made from one page of recycled newspaper rolled and wrapped around a graphite stick save approximately 16-17 trees from being shed to turned into wood pulp for pulp Recycled pencils are usually made of old newspapers that have been turned into workable mulch. This mulch then holds the graphite in place and is then baked for drying. Using sustainable alternatives like recycled paper helps check this process and promotes the significant concepts of zero-waste and reuse. Buy Pencils that You Can Plant prevent the release of numerable greenhouse gases. prevent air and water pollution that ultimately affects the health of the people as well as deteriorates the environment. The most common protective casing around the core of a pencil is made from wood. Yet, the use of the material at an industrial level leads to the unnecessary cutting of trees which inturn affects natural habitats and the climate adversely. Using sustainable alternatives like recycled paper helps check this process and promotes the significant concepts of zero-waste and reuse. Making this easy switch now to Goli Soda’s Newspaper Pencils and Colour Newspaper Pencils will help save trees by saving wood. The Colour Newspaper Pencils come with different taglines such as Join the Green Side,RePurPosers, Hi! I am sustainable. What are you?,Do the write thing, and Just a bit of paper work. Join the Green Side,RePurPosers,Hi! I am sustainable. What are you?,Do the write thing, and Just a bit of paper work. 1) Golisoda Newspaper Pencils 2) Wood Free Newspaper Pencil Made Of Tightly Rolled Good Old Newspapers. 3)No Wood Or Polymers, Just The Goodness Of Crunchy Newspaper. No Trees Were Harmed During The Making Of The Pencils",
        },
        {
            name: 'bamboo goods at DuckDuckGo',
            slug: "eco-friendly -9",
            image: "/images/Wodden_Sustainable_items/Bamboo-Holder.jpeg",
            category: 'eco-friendly ',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "You are stronger than you think - Bamboo Beat Sound Amplifier by Scrapshala is a natural sound amplifier cum mobile holder designed specifically to make your life easier and your music louder. Incredibly durable, renewable, and rich in tonal variation, this product is handcrafted from natural bamboo grass.This product falls under our Rozana range, which encourages no chopping of living mature trees for wood. The Rozana range by Scrapshala will never fail to speak of your conscious style statement and concern for the environment.",
        },
        {
            name: 'best valentines gift ',
            slug: "eco-friendly -10",
            image: "/images/Wodden_Sustainable_items/giftset.jpeg",
            category: 'eco-friendly ',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Welcome your new team members with our tailored New Joiners Gift package! Elevate your company’s onboarding experience with thoughtfully curated gifts that leave a lasting impression. From premium stationery sets to personalized tech gadgets, we’ve got everything you need to make them feel valued from day one. Contact us to customize your package and set the tone for a positive journey ahead! Boost morale with our custom employee appreciation sets! Tailored to recognize hard work, these curated gifts are sure to uplift spirits and foster a positive environment.",
        },
        {
            name: 'Eco-Friendly bag',
            slug: "eco-friendly -11",
            image: "/images/Wodden_Sustainable_items/Crafts.jpeg",
            category: 'eco-friendly ',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Elevate your eco-friendly style with our Custom Printed Jute Bags. These versatile, sustainable bags are the perfect canvas to showcase your unique designs while making an eco-conscious statement. **Sustainability at Its Best:** Our Custom Printed Jute Bags are made from natural jute fibers, a biodegradable and renewable resource. **Your Unique Style:** Personalize your jute bags with custom prints that reflect your individuality or brand. **Durable and Reliable:** Jute is renowned for its strength and durability. Our bags are built to withstand the test of time, ensuring your designs stay vibrant and functional for years. **Spacious and Versatile:** These bags offer ample space for your everyday essentials, groceries, or promotional materials. **Eco-Conscious Gifting:** When you gift a Custom Printed Jute Bag, you're not just giving a bag; you're giving a commitment to sustainability.",
        },
        {
            name: 'Custom Wood Coasters _Anniversary Coasters _ Round Wedding Coaster Personalized _Housewarming Gifts_Wedding Gifts _Bridal Shower Gift',
            slug: "eco-friendly -12",
            image: "/images/Wodden_Sustainable_items/wooden-coaster.jpeg",
            category: 'eco-friendly ',
            material: 'wooden',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Custom engraved with their names and wedding date commemorating their special day.Choose from Mr. & Mrs., Mr. & Mr., and Mrs. & Mrs. titles . Encourage your guests to raise a glass in honor of your joyous union in rustic style with our exclusively designed Farmhouse Wedding Personalized Coaster Wedding Favors. The wood coasters make excellent party favors to be used at bridal showers, rehearsal dinners or the wedding reception!  ",
        },

        {
            name: 'Custom Wood Coasters _Anniversary Coasters _ Round Wedding Coaster Personalized _Housewarming Gifts_Wedding Gifts _Bridal Shower Gift',
            slug: "eco-friendly -14",
            image: "/images/Wodden_Sustainable_items/wooden-mug.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Eco-friendly Bamboo: The thermos bottle made of natural bamboo, show a unique and stylish look, recyclable and reusable. Interior is constructed from 304 Stainless Steel.Bamboo coffee mug works great for delicious beverages, coffee, or fruit infused drinks，brew hot loose-leaf tea or any herbal beverages.Easy to Carry and Clean: This fit in a cup holder when you go to work or travel and it is easy to wash by hand,but not dishwasher, after all it is bamboo outside.A Great Gift: It's a great personalized gift idea! Best novelty coffee mugs. Coffee mugs for men and Coffee mugs for women.Unique Design: It looks great and has a distinctly elegant look that makes it different than everyone else's coffee cup,it is also comfortable to hold",
        },
        {
            name: 'Wedding Place Cards, Place Cards, Name Tag, Wedding Name Tags, Heart Name Tags, Heart Place Cards, Name Tags Wedding, Rustic Wedding Tags',
            slug: "eco-friendly -15",
            image: "/images/Wodden_Sustainable_items/wooden-tagname.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Custom-made Wooden Nameplates: Add a Personal Touch to Your Space With our custom-made wooden nameplates, you can now create a unique piece for your home, office, or as a gift for someone special. These wooden plaques can be customized with any text, quote, or message in any language of your choice. Our skilled craftsmen intricately carve your design into mahogany wood to produce a vibrant and long-lasting design that is truly one of a kind. These wooden carved signs can be mounted on a wall or door or placed on a table with a stand.",
        },
        {
            name: 'Introducing Plantable Sprout Pencils',
            slug: "eco-friendly -16",
            image: "/images/Wodden_Sustainable_items/plantable-pencil.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Custom Plantable Pencils Embark on a unique, eco-friendly journey with the Custom Printed Plantable Pencils from Merchlist, where the joy of writing meets the thrill of growing your own vegetables. This set of 5 pencils, meticulously crafted from recycled and treated newspapers, offers not only a sustainable writing experience but also a delightful gardening adventure, making it a perfect gift for schools and eco-conscious individuals. Key Features: Recycled Material: Made from recycled and treated newspapers, ensuring an eco-friendly and sustainable writing experience",
        },
        {
            name: 'Light wood engraved flip boxes',
            slug: "eco-friendly -17",
            image: "/images/Wodden_Sustainable_items/flip-boxes.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "This wooden flip box is the perfect companion to our wooden range of USB sticks but it also works with a wide range of our USB’s. The boxes can be printed or engraved and if we have them in stock then we can supply them on our express service.",
        },
        {
            name: 'seedlings and herbs with pencils',
            slug: "eco-friendly -18",
            image: "/images/Wodden_Sustainable_items/plantable-pencil.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Get creative and go green with our Grow Pencil set! These are not common pencils: they contain a seed in the handle! Plant them in a pot or in the garden and a seedling will grow. Each pencil is made of 100% biodegradable material and is infused with a variety of non-GMO seeds. Simply use the pencil to write or draw, then plant the pencil in soil when it becomes too short to use. Watch as beautiful flowers or herbs sprout from the pencil, turning your art into a living masterpiece. The set of 8 growing pencils will grow parsley, thyme, basil, sage, perilla, lucky grass, mint, and thales, making it a great gift for any artist or nature lover.",
        },
        {
            name: 'Bamboo Thermos Flask with Tea Strainer',
            slug: "eco-friendly -19",
            image: "/images/Wodden_Sustainable_items/Bamboo-Tharmas.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Bamboo and Stainless Steel Construction: The Bamboo Oasis Water Bottle brings together the strength of stainless steel and the natural beauty of bamboo. The result is a durable, eco-friendly companion that not only looks good but also stands the test of time.Leak-Proof Design: Experience worry-free hydration with our leak-proof design. The bamboo lid with a silicone seal ensures a tight seal, preventing spills and leaks whether you're on your daily commute, at the gym, or exploring the great outdoors.BPA-Free and Safe: Your health is our priority. The Bamboo Oasis Water Bottle is BPA-free, ensuring that your water remains pure and untainted. Hydrate with confidence, knowing that your bottle is free from harmful chemicals.Stylish Bamboo Exterior: The exterior of the bottle features a bamboo sleeve, not only providing a stylish and natural aesthetic but also adding a comfortable grip that stays cool to the touch. Embrace the beauty of nature while you stay hydrated.",
        },
        {
            name: 'Notebooks & journals',
            slug: "eco-friendly -20",
            image: "/images/Wodden_Sustainable_items/wooden-notebook.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "The exclusive kit can be the perfect partner to share your valuable ideas with.This comes with an eco-plantable pen, great for all purposes, collectively contained in a natural jute pouch.The price of the product does vary with quantity, please contact us for a precise quotation.",
        },
        {
            name: 'Notebooks & journals',
            slug: "eco-friendly -22",
            image: "/images/Wodden_Sustainable_items/sustainable-development-goals-still-life.jpg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Sustainable development is an approach that takes into account the well-being of both current and future generations, ensuring that the needs of the present are met without compromising the ability of future generations to meet their own needs. Given the challenges faced today, such as climate change, depletion of natural resources and social inequality, sustainable development has emerged as a crucial framework for building a more resilient and equitable future.In the Philippines, sustainable development has been a major concern, given the country’s vulnerability to natural disasters and its rapidly growing population. Over the years, the Philippines has been grappling with issues related to poverty, environmental degradation and social inequality, among other things. Fortunately, the government and other stakeholders have been working to ensure that the development is not at the expense of the environment and that economic growth is inclusive and will benefit all Filipinos",
        },
        {
            name: 'Wifi Password Sign - Wifi QR Magnet - QR Code Scanner - Guest Wifi Password',
            slug: "eco-friendly -23",
            image: "/images/Wodden_Sustainable_items/Wifi-Password-Sign.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "Present this scannable QR code magnet to your guests when they arrive at your home! This makes a great addition to any home rental or as a house warming present. Our WiFi QR Code Magnets are engraved at our home in New Hampshire.",
        },
        {
            name: 'Eco Friendly mug',
            slug: "eco-friendly -25",
            image: "/images/Wodden_Sustainable_items/Wifi-Password-Sign.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "HARVEST by Stallion is a range of bio based tableware and cutlery produced from naturally available materials such as rick husk. All Harvest products are sturdy, durable and elegant. They are a thoughtful addition to any home, office, restaurant or an event that is aware of its sustainability footprint. Eco-friendly, made using rice husk Food Grade No harmful chemicals like melamine 100% recyclable BPA Free No hazardous substances Dishwasher Safe MicrowaveableFor adding individual box for each mug or set, please mention in the special instructions box while placing your order.",
        },
        {
            name: 'Seed Paper Desk Calender',
            slug: "eco-friendly -26",
            image: "/images/Wodden_Sustainable_items/woode-Calender.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "An eco-friendly idea that needs to be adopted by more companies and individuals for sustainable living, in a world where climate change is the harshest truth. Shift to plantable seed calendars today. Completely biodegradable and non-plastic inclusion No landfill waste at all Easily sprouting plants Fully customizable calendar flaps Minimum order quantity (MOQ) - 50 pieces The price of the product does vary with quantity, please contact us for a precise quotation. Branding, Logistics, and Customized Packaging charges are added as applicable",
        },
        {
            name: 'Seed Paper Cart',
            slug: "eco-friendly -27",
            image: "/images/Wodden_Sustainable_items/Seed-Paper-Card.jpeg",
            category: 'eco-friendly ',
            material: 'Bamboo Mug',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,
            description: "These seed paper cards are a perfect solution for those who are looking for something in a manner that is environmentally responsible. This set of 50 seed paper cards is the best way to express your gratitude to your loved ones and to the mother earth at the same time. 1.Made with Basil Seed Embedded Paper; the paper which grows into plants, made from 100% genuine cotton and seeds of various plants added while making the pulp. 2.These foldable seed paper cards are 100% natural, recyclable, bio-degradable and truly Eco-friendly. 3.A perfect buy for every little reminder we have to be thankful for, no matter how big or small.",
        },
    ],
    pramotionalproducts: [

        {
            name: 'Girls T-shirts',
            slug: "pramotional  -1",
            image: "/images/T-shirts/5923761.jpg",
            category: 'Pramotional Products',
            variety: '-',
            code: 'FM-916',
            price: 0,
            countInStock: 50,

            description: "High Quality",
        },
    ],
    speakers: [

        {
            name: 'Wireless Speaker 6 Kinds Of Light Mode Wireless Charging Function Compatible With Ios _ Android System Black And White',
            slug: "G_shape_speaker",
            image: "/images/Best Sellers/Wireless Speaker.jpeg",
            category: 'Wirelss',
            price: 1399,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'bluetooth speake',
            slug: "blu_speaker",
            image: "/images/Best-Sellers/Wireless-Speaker.jpeg",
            category: 'Wirelss',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "Overview Enjoy surprisingly powerful, room-filling stereo sound with the JBL Flip Essential ultra-compact portable Bluetooth speaker. Powered by a rechargeable 3000mAh Li-ion battery, it delivers up to 10 hours of non-stop, high-quality playtime. The exterior is IPX7 rated, featuring a waterproof design with durable fabric. From tabletop to poolside, from sunny mornings to rainy nights, the Flip Essential is your ultimate all-purpose, all-weather companion. Key Features Wireless Bluetooth streaming Wirelessly stream high-quality, room-filling sound from your smartphone or tablet. 10 hours of playtime Built-in rechargeable Li-ion battery supports up to 10 hours of playtime. IPX7 waterproof Take the Flip Essential to the beach or the pool without worrying about spills or even submersion in water. Durable fabric material The durable fabric material and rugged rubber housing allows your speaker to outlast all of your adventures. JBL bass radiator Dual external passive radiators deliver powerful, ear catching JBL sound that resonates loud and clear, allowing you to hear the bass, feel the bass, and see the bass.",
        },
        {

            name: 'bluetooth speake',
            slug: "speaker_stands",
            image: "/images/Speaker/bluetooth-speaker.jpeg",
            category: 'speaker with stands',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },
        {

            name: 'Digital clock with Speaker',
            slug: "digital clock with speaker",
            image: "/images/Digital/Digital-Clock-with-speaker.jpeg",
            category: 'clock with speaker',
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 50,

            description: "High Quality",
        },

    ],
    pens: [



        {

            name: 'Metal Pen1',
            slug: "pen1",
            image: "/images/Stationery/Metal-Pen.jpeg",
            category: "Metal Pen",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Gun Metal Pen1',
            slug: "pen2",
            image: "/images/Stationery/Gun-Metal-Pen.jpeg",
            category: "Metal Pen",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Ballpoint Pen1',
            slug: "pen3",
            image: "/images/Stationery/Ballpoint-Pen.jpeg",
            category: "Metal Pen",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        
       
        {

            name: 'Personalized EXECUTIVE PEN Ballpoint Pens Gifts',
            slug: "pen6",
            image: "/images/pens/pe-1.jpeg",
            category: "Metal Pen",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Bingli Pens Beautiful Feather Personal Stationery Creative Office Gel Pen',
            slug: "pen7",
            image: "/images/pens/Pen-1.jpeg",
            category: "Metal Pen",
            price: 0,
            variety: '-',
            code: '02',
            countInStock: 15,

            description: "High Quality",

        },

    ],
    rubikcubs: [
        {

            name: '3x3x3 Speed Cube Carbon Fiber Sticker Smooth Magic Cube Puzzles',
            slug: "rubikcubs-1",
            image: "/images/Rubik-Cube/rubikcube.jpeg",
            category: "Rubik Cube",
            material: 'Plastic',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'High Speend Cube Puzzle for kids',
            slug: "rubikcubs-2",
            image: "/images/Rubik-Cube/rubikcube3.jpeg",
            category: "Rubik Cube",
            material: 'Plastic',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Sticker Rubik Cube',
            slug: "rubikcubs-3",
            image: "/images/Rubik-Cube/rubik-cube -2.jpeg",
            category: "Rubik Cube",
            material: 'Plastic',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Tech companies still fail at social media',
            slug: "rubikcubs-4",
            image: "/images/Rubik-Cube/why-rubik-cube.jpg",
            category: "Rubik Cube",
            material: 'Plastic',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
    ],
    glasstumblers: [
        {

            name: 'Super Cute Nurse Week Gift',
            slug: "glasstumblers-1",
            image: "/images/Sippers/Glass-Tumbler/glass-tumbler-1.jpeg",
            category: "Glass Tumbler",
            material: 'Glass',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Glass Tumblers customized the colors and printing',
            slug: "glasstumblers-2",
            image: "/images/Sippers/Glass-Tumbler/Glass-Tumbler.jpeg",
            category: "Glass Tumbler",
            material: 'Glass',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Travel Mug name Tumbler',
            slug: "glasstumblers-3",
            image: "/images/Sippers/Glass-Tumbler/Glass-Tumbler-2.jpeg",
            category: "Glass Tumbler",
            material: 'Glass',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
    ],
    desktopitems: [
        {

            name: 'Bamboo Holder',
            slug: "desktopItems-1",
            image: "/images/home-product/Wodden-Table-items/Bambo-Holder.jpeg",
            category: "Desktop Items",
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Desk Pen Holder for Teacher',
            slug: "desktopItems-2",
            image: "/images/home-product/Wodden-Table-items/Wooden-Pen-Holder.jpeg",
            category: "Desktop Items",
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        },
        {

            name: 'Bamboo Holder with watch',
            slug: "desktopItems-3",
            image: "/images/home-product/Wodden-Table-items/wooden-item.jpeg",
            category: "Desktop Items",
            material: 'Wooden',
            price: 0,
            variety: '-',
            code: '-',
            countInStock: 15,

            description: "High Quality",

        }
    ]

}
module.exports = data;