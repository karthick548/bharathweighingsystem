/* ============================================================
   ANNAM WEIGHING SYSTEM — Products Database
   products.js
   ============================================================ */

const PHONE = '917358863516';
const PHONE_DISPLAY = '+91-73588-63516';
const EMAIL = 'bharathweightingsystem@gmail.com';
const ADDRESS = '4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India';

const PRODUCTS = [
  /* ── WEIGHING SCALES ── */
  {
    id:'p1', name:'Electronic Table Top Weighing Scale',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹3,500', priceNum:3500, originalPrice:'₹4,200',
    desc:'High accuracy electronic table top scale with bright LED display and rechargeable battery. Suitable for all industrial and commercial environments.',
    specs:[['Capacity','30 kg – 150 kg'],['Accuracy','5g / 10g'],['Display','Bright Red LED 0.56"'],['Battery','Inbuilt SMF Rechargeable'],['Platform','Stainless Steel'],['Feature','Auto Zero Tracking'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p2', name:'Digital Table Top Weighing Scale',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹5,000', priceNum:5000, originalPrice:'₹5,800',
    desc:'Digital table top scale with high-precision sensor and large SS platter. Ideal for retail and industrial use.',
    specs:[['Capacity','50 kg – 200 kg'],['Accuracy','10g – 20g'],['Display','LCD Backlit'],['Battery','Battery + AC Adapter'],['Platform','SS 300×300mm'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p3', name:'Bench Weighing Scale',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹5,500', priceNum:5500, originalPrice:'₹6,500',
    desc:'Rugged bench scale for industrial bench-top use. Stainless steel construction with waterproof indicator.',
    specs:[['Capacity','30 – 300 kg'],['Accuracy','5g – 50g'],['IP Rating','IP65'],['Display','LED 0.56"'],['Battery','Rechargeable 24h Backup'],['Warranty','1 Year']],
    tags:['Popular']
  },
  {
    id:'p4', name:'MS Electronic Weighing Scale',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹4,500', priceNum:4500, originalPrice:'₹5,200',
    desc:'Mild steel body electronic scale for general commercial and industrial weighing applications.',
    specs:[['Capacity','60 – 500 kg'],['Body','MS Powder Coated'],['Display','LED'],['Battery','Battery/AC'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p5', name:'Check Weighing Scale',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹8,000', priceNum:8000, originalPrice:'₹9,500',
    desc:'Check weigher for quality control with Over/Under/Accept LED signals. Ideal for packing lines.',
    specs:[['Capacity','3 – 30 kg'],['Accuracy','1g'],['Signals','Traffic Light LED'],['Interface','RS232'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p6', name:'Electronic Analog Weight Machine',
    cat:'weighing', catName:'Weighing Scales',
    emoji:'⚖️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹2,500', priceNum:2500, originalPrice:'₹3,000',
    desc:'Compact analog-style electronic weighing machine ideal for small shops and personal use.',
    specs:[['Capacity','10 – 50 kg'],['Type','Spring + Electronic'],['Battery','2 × AA'],['Warranty','6 Months']],
    tags:[]
  },

  /* ── CRANE SCALES ── */
  {
    id:'p7', name:'Remote Control Crane Scale',
    cat:'crane', catName:'Crane Scales',
    emoji:'🏗️',
    img:'https://5.imimg.com/data5/SELLER/Default/2021/10/FR/FZ/CU/22283282/remote-control-crane-scale.jpg',
    price:'₹12,500', priceNum:12500, originalPrice:'₹15,000',
    desc:'Heavy-duty digital crane scale with wireless remote display. Ideal for warehouses, ports and steel plants.',
    specs:[['Capacity','500 kg – 10 Ton'],['Accuracy','0.1%'],['Display','LED + Wireless Remote'],['Remote Range','50 m'],['Battery','Rechargeable'],['Overload','120%'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p8', name:'Digital Crane Scale (50 kg)',
    cat:'crane', catName:'Crane Scales',
    emoji:'🏗️',
    img:'https://5.imimg.com/data5/SELLER/Default/2021/10/FR/FZ/CU/22283282/remote-control-crane-scale.jpg',
    price:'₹1,800', priceNum:1800, originalPrice:'₹2,400',
    desc:'Light-duty digital hanging crane scale with LED display and hold function.',
    specs:[['Capacity','50 kg'],['Accuracy','10g'],['Display','LED'],['Battery','AAA × 6'],['Warranty','6 Months']],
    tags:[]
  },
  {
    id:'p9', name:'50 kg Hanging Scale',
    cat:'crane', catName:'Crane Scales',
    emoji:'🏗️',
    img:'https://5.imimg.com/data5/SELLER/Default/2021/10/FR/FZ/CU/22283282/remote-control-crane-scale.jpg',
    price:'₹4,000', priceNum:4000, originalPrice:'₹5,000',
    desc:'Industrial hanging scale for weighing goods in warehouses. Durable steel construction.',
    specs:[['Capacity','50 kg'],['Accuracy','20g'],['Display','LCD'],['Battery','Rechargeable'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p10', name:'20 Ton Industrial Crane Scale',
    cat:'crane', catName:'Crane Scales',
    emoji:'🏗️',
    img:'https://5.imimg.com/data5/SELLER/Default/2021/10/FR/FZ/CU/22283282/remote-control-crane-scale.jpg',
    price:'₹45,000', priceNum:45000, originalPrice:'₹55,000',
    desc:'Heavy industrial crane scale for steel mills and shipyards. Wireless remote display.',
    specs:[['Capacity','20 Ton'],['Accuracy','2 kg'],['Remote','Wireless 80m'],['IP Rating','IP65'],['Warranty','1 Year']],
    tags:['Industrial']
  },
  {
    id:'p11', name:'Bluetooth Crane Scale',
    cat:'crane', catName:'Crane Scales',
    emoji:'🏗️',
    img:'https://5.imimg.com/data5/SELLER/Default/2021/10/FR/FZ/CU/22283282/remote-control-crane-scale.jpg',
    price:'₹9,500', priceNum:9500, originalPrice:'₹11,000',
    desc:'Bluetooth crane scale that connects to your phone for data logging and reporting.',
    specs:[['Capacity','500 kg – 3 Ton'],['Connectivity','Bluetooth 4.0'],['App','Android / iOS'],['Battery','Rechargeable'],['Warranty','1 Year']],
    tags:['New']
  },

  /* ── JEWELLERY SCALES ── */
  {
    id:'p12', name:'Table Top Jewellery Scale',
    cat:'jewellery', catName:'Jewellery Scales',
    emoji:'💎',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/1/KN/SF/OC/10578302/table-top-jewellery-scale-500x500.jpg',
    price:'₹7,500', priceNum:7500, originalPrice:'₹9,000',
    desc:'Precision jewellery scale with 3-display showing weight, unit weight and piece count. Auto calibration.',
    specs:[['Capacity','100g – 300g'],['Accuracy','0.01g'],['Display','3× LCD'],['Units','g / ct / tola / oz'],['Resolution','2,00,000'],['Battery','Rechargeable'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p13', name:'Digital Gold Jewellery Scale',
    cat:'jewellery', catName:'Jewellery Scales',
    emoji:'💎',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/1/KN/SF/OC/10578302/table-top-jewellery-scale-500x500.jpg',
    price:'₹6,250', priceNum:6250, originalPrice:'₹7,500',
    desc:'Precision gold scale for jewellery shops. Accurate measurement of diamonds, gems, gold and silver.',
    specs:[['Capacity','100g'],['Accuracy','0.001g'],['Units','g / ct / dwt / oz / tola'],['Display','LCD Backlit'],['Feature','Auto Calib, RS232'],['Warranty','1 Year']],
    tags:['Popular']
  },
  {
    id:'p14', name:'Magnet Base Jewellery Scale',
    cat:'jewellery', catName:'Jewellery Scales',
    emoji:'💎',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/1/KN/SF/OC/10578302/table-top-jewellery-scale-500x500.jpg',
    price:'₹6,500', priceNum:6500, originalPrice:'₹8,000',
    desc:'High accuracy jewellery scale with magnet base anti-vibration technology. Minimum maintenance.',
    specs:[['Capacity','200g'],['Accuracy','0.01g'],['Base','Magnet Anti-vibration'],['Display','LCD'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p15', name:'Label Printing Jewellery Scale',
    cat:'jewellery', catName:'Jewellery Scales',
    emoji:'💎',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/1/KN/SF/OC/10578302/table-top-jewellery-scale-500x500.jpg',
    price:'₹18,000', priceNum:18000, originalPrice:'₹22,000',
    desc:'Jewellery scale with built-in thermal label printer. Prints weight, price and barcode on stickers.',
    specs:[['Capacity','300g'],['Accuracy','0.01g'],['Printer','Thermal, 57mm'],['Barcode','Yes'],['Interface','USB, RS232'],['Warranty','1 Year']],
    tags:['Featured']
  },
  {
    id:'p16', name:'Precision Jewellery Scale',
    cat:'jewellery', catName:'Jewellery Scales',
    emoji:'💎',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/1/KN/SF/OC/10578302/table-top-jewellery-scale-500x500.jpg',
    price:'₹7,500', priceNum:7500, originalPrice:'₹9,000',
    desc:'Swiss precision jewellery balance with wind shield cover and RS232c data interface output.',
    specs:[['Capacity','100g'],['Accuracy','0.001g'],['Shield','Wind Cover'],['Interface','RS232c'],['Warranty','1 Year']],
    tags:[]
  },

  /* ── INDUSTRIAL / WEIGH BRIDGE ── */
  {
    id:'p17', name:'Electronic Weigh Scale (30T)',
    cat:'industrial', catName:'Industrial Weigh Scale',
    emoji:'🏭',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/5/NF/AQ/RQ/10578302/electronic-weigh-bridge.jpg',
    price:'₹2,50,000', priceNum:250000, originalPrice:'₹3,00,000',
    desc:'Industrial truck weigh scale for 30-ton capacity. Stainless steel load cells with remote printer support.',
    specs:[['Capacity','30 Ton'],['Accuracy','10 kg'],['Platform','MS / Concrete'],['Load Cells','SS Hermetically Sealed'],['Display','Remote LED'],['Software','Included'],['Warranty','2 Years']],
    tags:['Industrial']
  },
  {
    id:'p18', name:'Electronic Weigh Scale (100T)',
    cat:'industrial', catName:'Industrial Weigh Scale',
    emoji:'🏭',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/5/NF/AQ/RQ/10578302/electronic-weigh-bridge.jpg',
    price:'₹6,50,000', priceNum:650000, originalPrice:'₹7,50,000',
    desc:'Heavy-duty 100-ton weigh scale for trucks and heavy vehicles. Full software and printer package.',
    specs:[['Capacity','100 Ton'],['Accuracy','20 kg'],['Length','18m / 24m'],['Software','Windows-based'],['Warranty','2 Years']],
    tags:['Industrial']
  },
  {
    id:'p19', name:'Large Scale Weighing Machine',
    cat:'industrial', catName:'Industrial Weigh Scale',
    emoji:'🏭',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/5/NF/AQ/RQ/10578302/electronic-weigh-bridge.jpg',
    price:'₹35,000', priceNum:35000, originalPrice:'₹42,000',
    desc:'Large industrial floor weighing machine for heavy goods, machinery and pallet weighing.',
    specs:[['Capacity','500 kg – 5 Ton'],['Platform','1200×1200mm'],['Display','Remote LED'],['Load Cells','4 × SS'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p20', name:'Cast Iron Test Weight Set',
    cat:'industrial', catName:'Industrial Weigh Scale',
    emoji:'⚙️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/5/NF/AQ/RQ/10578302/electronic-weigh-bridge.jpg',
    price:'₹1,200', priceNum:1200, originalPrice:'₹1,500',
    desc:'Certified cast iron test weights for calibration of all types of weighing scales.',
    specs:[['Material','Cast Iron'],['Class','M1, M2'],['Range','1g – 20 kg'],['Finish','Enamel Coated'],['Certification','Legal Metrology']],
    tags:[]
  },

  /* ── BMI MACHINES ── */
  {
    id:'p21', name:'Digital BMI Weighing Scale',
    cat:'bmi', catName:'BMI Machines',
    emoji:'🏋️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/WJ/EY/VY/10578302/digital-bmi-weighing-scale.jpg',
    price:'₹15,000', priceNum:15000, originalPrice:'₹18,000',
    desc:'Advanced digital BMI scale measuring weight, height and calculating Body Mass Index automatically.',
    specs:[['Weight Capacity','200 kg'],['Height Range','80–200 cm'],['Accuracy','100g / 1mm'],['Display','Large LCD'],['Output','BMI, BMR, Fat%'],['Power','AC + Thermal Printer'],['Warranty','1 Year']],
    tags:['Popular']
  },
  {
    id:'p22', name:'Height & Weight Scale Machine',
    cat:'bmi', catName:'BMI Machines',
    emoji:'🏋️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/WJ/EY/VY/10578302/digital-bmi-weighing-scale.jpg',
    price:'₹12,000', priceNum:12000, originalPrice:'₹14,500',
    desc:'Standalone height and weight measurement machine for hospitals, clinics and fitness centres.',
    specs:[['Weight Capacity','150 kg'],['Height','Ultrasonic Sensor'],['Accuracy','100g'],['Display','LCD'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p23', name:'BMI Machine (Hospital Grade)',
    cat:'bmi', catName:'BMI Machines',
    emoji:'🏋️',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/WJ/EY/VY/10578302/digital-bmi-weighing-scale.jpg',
    price:'₹22,000', priceNum:22000, originalPrice:'₹26,000',
    desc:'Hospital-grade BMI machine with coin-operated option and thermal receipt printer for public use.',
    specs:[['Weight','200 kg'],['Height','Ultrasonic'],['Printer','Thermal Receipt'],['Coin Op','Optional'],['Warranty','1 Year']],
    tags:['New']
  },

  /* ── LAB SCALES ── */
  {
    id:'p24', name:'Scientific Laboratory Scale',
    cat:'lab', catName:'Lab Scales',
    emoji:'🔬',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/3/GX/JT/OY/10578302/scientific-weighing-scale.jpg',
    price:'₹8,500', priceNum:8500, originalPrice:'₹10,500',
    desc:'Analytical precision balance for laboratory research with internal calibration and high-resolution display.',
    specs:[['Capacity','200g'],['Accuracy','0.001g (1mg)'],['Calibration','Internal Auto'],['Display','LCD Backlit'],['Interface','RS232, USB'],['Certification','GLP/GMP'],['Warranty','1 Year']],
    tags:['Popular']
  },
  {
    id:'p25', name:'300g Laboratory Balance',
    cat:'lab', catName:'Lab Scales',
    emoji:'🔬',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/3/GX/JT/OY/10578302/scientific-weighing-scale.jpg',
    price:'₹6,500', priceNum:6500, originalPrice:'₹8,000',
    desc:'Precision laboratory balance for chemical and pharmaceutical applications. ISO calibrated.',
    specs:[['Capacity','300g'],['Accuracy','0.01g'],['Display','LCD'],['Interface','RS232'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p26', name:'Electronic Precision Balance',
    cat:'lab', catName:'Lab Scales',
    emoji:'🔬',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/3/GX/JT/OY/10578302/scientific-weighing-scale.jpg',
    price:'₹14,000', priceNum:14000, originalPrice:'₹17,000',
    desc:'High-precision analytical balance with 0.0001g readability. Wind shield draft cover included.',
    specs:[['Capacity','100g'],['Accuracy','0.0001g'],['Shield','Draft Wind Cover'],['Interface','USB + RS232'],['GLP Print','Yes'],['Warranty','1 Year']],
    tags:['Premium']
  },
  {
    id:'p27', name:'Moisture Analyser Balance',
    cat:'lab', catName:'Lab Scales',
    emoji:'🔬',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/3/GX/JT/OY/10578302/scientific-weighing-scale.jpg',
    price:'₹28,000', priceNum:28000, originalPrice:'₹34,000',
    desc:'Moisture analyzer for precise determination of moisture content in food, pharma and chemicals.',
    specs:[['Capacity','120g'],['Accuracy','0.001g'],['Temp Range','50–230°C'],['Method','Halogen Drying'],['Interface','USB + RS232'],['Warranty','1 Year']],
    tags:[]
  },

  /* ── RETAIL / PRINTING ── */
  {
    id:'p28', name:'Retail Printing Weighing Scale',
    cat:'retail', catName:'Printing Scales',
    emoji:'🏪',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹18,500', priceNum:18500, originalPrice:'₹22,000',
    desc:'Retail scale with built-in thermal label printer. Prints weight, price and barcode. Perfect for supermarkets.',
    specs:[['Capacity','15 kg'],['Accuracy','2g'],['Printer','Thermal 57mm'],['PLU','500 Items'],['Display','Dual LCD'],['Battery','AC + Backup'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p29', name:'SS Table Top Printer Scale',
    cat:'retail', catName:'Printing Scales',
    emoji:'🏪',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹38,000', priceNum:38000, originalPrice:'₹45,000',
    desc:'Full stainless steel table top scale with ticket printer. Ideal for meat, fish and vegetable counters.',
    specs:[['Capacity','6 – 30 kg'],['Accuracy','1 – 5g'],['Body','Full SS'],['Printer','Ticket Printer'],['PLU','1000 Items'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p30', name:'Price Computing Weighing Scale',
    cat:'retail', catName:'Printing Scales',
    emoji:'🏪',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹5,500', priceNum:5500, originalPrice:'₹6,800',
    desc:'Price computing scale with customer display showing weight, unit price and total simultaneously.',
    specs:[['Capacity','15 kg'],['Accuracy','5g'],['Display','Dual (Op + Customer)'],['Power','AC + Battery'],['Warranty','1 Year']],
    tags:['Popular']
  },

  /* ── POULTRY SCALES ── */
  {
    id:'p31', name:'Chicken Weighing Scale (100 kg)',
    cat:'poultry', catName:'Poultry Scales',
    emoji:'🐔',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹3,500', priceNum:3500, originalPrice:'₹4,200',
    desc:'Rugged poultry scale for chicken markets and farms. Green display, 24-hour battery backup.',
    specs:[['Capacity','100 kg'],['Accuracy','20g'],['Display','Green VFD'],['Battery','24h Backup'],['Body','MS Powder Coated'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p32', name:'Chicken Weighing Scale (500 kg)',
    cat:'poultry', catName:'Poultry Scales',
    emoji:'🐔',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹8,500', priceNum:8500, originalPrice:'₹10,000',
    desc:'Heavy-duty poultry scale for large farms. 500kg capacity with remote display and printer output.',
    specs:[['Capacity','500 kg'],['Accuracy','50g'],['Display','Green LED'],['Output','RS232 Printer'],['Battery','24h'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p33', name:'Portable Poultry Hanging Scale',
    cat:'poultry', catName:'Poultry Scales',
    emoji:'🐔',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹2,800', priceNum:2800, originalPrice:'₹3,500',
    desc:'Portable hanging scale for poultry and fish markets. Water-resistant and shock-proof construction.',
    specs:[['Capacity','50 kg'],['Accuracy','10g'],['IP Rating','IP54'],['Battery','Rechargeable'],['Hook','Stainless Steel'],['Warranty','6 Months']],
    tags:[]
  },

  /* ── PLATFORM SCALES ── */
  {
    id:'p34', name:'MS Heavy Duty Platform Scale',
    cat:'platform', catName:'Platform Scales',
    emoji:'📦',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹8,500', priceNum:8500, originalPrice:'₹10,500',
    desc:'Mild steel heavy-duty floor platform scale for warehouses and logistics operations.',
    specs:[['Capacity','500 kg – 2 Ton'],['Platform','1000×1000mm'],['Accuracy','100 – 500g'],['Display','LED'],['Warranty','1 Year']],
    tags:['Popular']
  },
  {
    id:'p35', name:'30 kg Table Top Platform Scale',
    cat:'platform', catName:'Platform Scales',
    emoji:'📦',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹3,000', priceNum:3000, originalPrice:'₹3,800',
    desc:'Compact 30kg platform scale for grocery stores and small shops. Stainless steel platter.',
    specs:[['Capacity','30 kg'],['Accuracy','5g'],['Platform','400×400mm SS'],['Display','LCD'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p36', name:'ATGO Portable Platform Scale',
    cat:'platform', catName:'Platform Scales',
    emoji:'📦',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹9,500', priceNum:9500, originalPrice:'₹11,500',
    desc:'ATGO portable scale. Water and dust resistant, perfect for field use and tough environments.',
    specs:[['Capacity','300 kg'],['IP Rating','IP67'],['Platform','SS 500×500mm'],['Battery','Rechargeable'],['Warranty','1 Year']],
    tags:['New']
  },
  {
    id:'p37', name:'Pallet Scale (2 Ton)',
    cat:'platform', catName:'Platform Scales',
    emoji:'📦',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹28,000', priceNum:28000, originalPrice:'₹34,000',
    desc:'2-ton pallet scale for logistics. Low-profile platform for easy loading with forklift.',
    specs:[['Capacity','2 Ton'],['Platform','1200×1200mm'],['Height','80mm Low-profile'],['Display','Remote LED'],['Warranty','1 Year']],
    tags:[]
  },

  /* ── COUNTING SCALES ── */
  {
    id:'p38', name:'Counting Scale (3–31 kg)',
    cat:'counting', catName:'Counting Scales',
    emoji:'🧮',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹11,500', priceNum:11500, originalPrice:'₹14,000',
    desc:'Parts counting scale for inventory management. VFD display, 340×280mm platter, serial interface.',
    specs:[['Capacity','3 – 31 kg'],['Accuracy','0.1g'],['Display','Green VFD'],['Platter','340×280mm'],['Interface','RS232 (Optional)'],['Battery','Rechargeable'],['Warranty','1 Year']],
    tags:['Bestseller']
  },
  {
    id:'p39', name:'Counting Weighing Scale (30 kg)',
    cat:'counting', catName:'Counting Scales',
    emoji:'🧮',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹9,500', priceNum:9500, originalPrice:'₹11,500',
    desc:'Inventory counting scale with automatic count improvement mode. Ideal for packaging lines.',
    specs:[['Capacity','30 kg'],['Accuracy','1g'],['Count Mode','Auto Improvement'],['Memory','Accumulate'],['Warranty','1 Year']],
    tags:[]
  },
  {
    id:'p40', name:'Sample Counting Scale (6 kg)',
    cat:'counting', catName:'Counting Scales',
    emoji:'🧮',
    img:'https://5.imimg.com/data5/SELLER/Default/2022/10/MK/YO/JX/10578302/electronic-table-top-weighing-scale.jpg',
    price:'₹7,500', priceNum:7500, originalPrice:'₹9,000',
    desc:'Sample-based counting scale for small parts. Resettable set points for check counting.',
    specs:[['Capacity','6 kg'],['Accuracy','0.1g'],['Set Points','Resettable'],['Interface','USB'],['Warranty','1 Year']],
    tags:[]
  }
];

const CAT_META = {
  weighing:   { name:'Weighing Scales',            icon:'⚖️',  desc:'Electronic, digital and industrial weighing scales for all applications.' },
  crane:      { name:'Crane Scales',               icon:'🏗️',  desc:'Remote control crane scales, hanging scales and digital crane weighers.' },
  jewellery:  { name:'Jewellery Scales',           icon:'💎',  desc:'Precision gold, diamond and jewellery weighing scales with multiple units.' },
  industrial: { name:'Industrial Weigh Scale',     icon:'🏭',  desc:'Heavy-duty weigh scales, large platform scales and test weights for industrial use.' },
  bmi:        { name:'BMI & Health Machines',      icon:'🏋️',  desc:'BMI machines, height & weight scales for hospitals and fitness centres.' },
  lab:        { name:'Laboratory Scales',          icon:'🔬',  desc:'Analytical balances, precision scales and moisture analysers for labs.' },
  retail:     { name:'Printing Scales',            icon:'🖨️',  desc:'Label printing, price computing and POS weighing scales for retail.' },
  poultry:    { name:'Poultry Scales',             icon:'🐔',  desc:'Chicken and poultry weighing scales for farms and markets.' },
  platform:   { name:'Platform Scales',            icon:'📦',  desc:'Heavy-duty floor platform scales for warehouses and logistics.' },
  counting:   { name:'Counting Scales',            icon:'🧮',  desc:'Parts counting scales for inventory management and production lines.' },
};
