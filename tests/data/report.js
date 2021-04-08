import { gql } from 'apollo-boost';

export const createTemplate = gql`
    mutation {
        createReportTemplate(body: {
            type: "fnb"
        }) {
            type
        }
    }
`

const template = {
    type: "fnb",
    checklist: [
    {
        category: "1. Professionalism & Staff Hygiene (10%)",
        weightage: 10,
        score: 10,
        subcategories: [
            {
                subcategory: "Professionalism",
                lineItems: [
                    {
                        lineItem: "Shop is open and ready to service patients/visitors according to operating hours.",
                    },
                    {
                        lineItem: "Staff Attendance: adequate staff for peak and non-peak hours.",
                    },
                    {
                        lineItem: "At least one (1) clearly assigned person in-charge on site.",
                    }
                ]
            },
            {
                subcategory: "Staff Hygiene",
                lineItems: [
                    {
                        lineItem: "Staff who are unfit for work due to illness should not report to work.",
                    },
                    {
                        lineItem: "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
                    },
                    {
                        lineItem: "Clean clothes/uniform or aprons are worn during food preparation and food service.",
                    },
                    {
                        lineItem: "Hair is kept tidy (long hair must be tied up) and covered with clean caps or hair nets where appropriate.",
                    },
                    {
                        lineItem: "Sores, wounds or cuts on hands, if any, are covered with waterproof and brightly-coloured plaster.",
                    },
                    {
                        lineItem: "Hands are washed thoroughly with soap and water, frequently and at appropriate times.",
                         
                    },
                    {
                        lineItem: "Fingernails are short, clean, unpolished and without nail accessories.",
                         
                    },
                    {
                        lineItem: "No wrist watches/ rings or other hand jewellery (with exception of wedding ring) is worn by staff handling food.",
                         
                    },
                    {
                        lineItem: "Food is handled with clean utensils and gloves.",
                         
                    },
                    {
                        lineItem: "Disposable gloves are changed regularly and/ or in between tasks.",
                         
                    },
                    {
                        lineItem: "Staff do not handle cash with gloved hands.",
                         
                    }
                ]
            }
        ]
    },
    {
        category: "2. Housekeeping & General Cleanliness (20%)",
        weightage: 20,
        score: 20,
        subcategories: [
            {
                subcategory: "General Environment Cleanliness",
                lineItems: [
                    {
                        lineItem: "Cleaning and maintenance records for equipment, ventilation and exhaust system.",
                         
                    },
                    {
                        lineItem: "Adequate and regular pest control.\n-Pest control record.",
                         
                    },
                    {
                        lineItem: "Goods and equipment are within shop boundary.",
                         
                    },
                    {
                        lineItem: "Store display/ Shop front is neat and tidy.",
                         
                    },
                    {
                        lineItem: "Work/ serving area is neat, clean and free of spillage.",
                         
                    },
                    {
                        lineItem: "Uncluttered circulation space free of refuse/ furniture.",
                         
                    },
                    {
                        lineItem: "Tables are cleared promptly within 10 minutes.",
                         
                    },
                    {
                        lineItem:  "Fixtures and fittings including shelves, cupboards and drawers are clean and dry, free from pests, and in a good state.",
                         
                    },
                    {
                        lineItem: "Ceiling/ ceiling boards are free from stains/ dust with no gaps.",
                         
                    },
                    {
                        lineItem: "Fans and air-con units are in proper working order and clean and free from dust. Proper maintenance and routine cleaning are carried out regularly.",
                         
                    },
                    {
                        lineItem: "Equipment, exhaust hood, crockery and utensils are clean, in good condition and serviced.",
                         
                    },
                    {
                        lineItem: "Surfaces, walls and ceilings within customer areas are dry and clean.",
                         
                    },
                    {
                        lineItem: "Floor within customer areas is clean, dry and non-greasy.",
                         
                    },
                    {
                        lineItem:  "Waste bins are properly lined with plastic bags and covered at all times.",
                         
                    },
                    {
                        lineItem: "Adequate number of covered waste pedal bins are available and waste is properly managed and disposed.\n-Waste bins are not over-filled.\n-Waste Management: Proper disposal of food stuff and waste.\n-Waste is properly bagged before disposing it at the waste disposal area/bin centre.",
                         
                    },
                ]
            },
            {
                subcategory: "Hand Hygiene Facilities",
                lineItems: [
                    {
                        lineItem: "Hand washing facilities are easily accessible, in good working condition and soap is provided.",
                         
                    },
                    {
                        lineItem: "Adequate facilities for hand hygiene are available including liquid soap and disposable hand towels.",
                         
                    }
                ]
            }
        ]
    },
    {
        category: "3. Food Hygiene (35%)",
        weightage: 35,
        score: 35,
        subcategories: [
            {
                subcategory: "Storage & Preparation of Food",
                lineItems: [
                    {
                        lineItem: "Food is stored in appropriate conditions and at an appropriate temperature.",
                         
                    },
                    {
                        lineItem: "Food and non-food are clearly segregated.\n-Non-food items (e.g. insecticides, detergents and other chemicals) are not stored together with the food items.",
                         
                    },
                    {
                        lineItem: "Food is not placed near sources of contamination.",
                         
                    },
                    {
                        lineItem:"Storage of food does not invite pest infestation.",
                         
                    },
                    {
                        lineItem: "Dry goods (e.g. canned food and drinks) and other food items are stored neatly on shelves, off the floor and away from walls.",
                         
                    },
                    {
                        lineItem: "Proper stock rotation system such as the First-Expired-First-Out (FEFO) system is used for inventory management.",
                         
                    },
                    {
                        lineItem:"Food is protected from contamination; packaging is intact and no products are found with signs of spoilage.",
                         
                    },
                    {
                        lineItem:"Ice machine is clean and well maintained.\n-Only ice is stored in the ice machine to prevent contamination of the ice.",
                         
                    },
                    {
                        lineItem: "Scoop for ice is stored outside the ice machine in a dedicated container.",
                         
                    },
                    {
                        lineItem: "Food supplied is clean and not expired.",
                         
                    },
                    {
                        lineItem:"Clear labelling of date of date of preparation/ manufacture/ expiry on all food containers/packaging.",
                         
                    },
                    {
                        lineItem:"Cooked food is properly covered to prevent cross-contamination.",
                         
                    },
                    {
                        lineItem: "Proper work flow and segregation of areas to prevent cross-contamination between raw and cooked/ ready-to-eat food areas.",
                         
                    },
                    {
                        lineItem: "Proper separation of cooked food/ ready-to-eat food, raw meat, seafood and vegetable to prevent cross-contamination.\n-E.g. Different chopping boards, knives and other utensils are used for cooked/ready-to-eat and raw food.",
                         
                    },
                    {
                        lineItem:"Frozen food is thawed in chiller, microwave or under running water.",
                         
                    },
                    {
                        lineItem:"Ingredients used are clean and washed thoroughly before cooking.",
                         
                    },
                    {
                        lineItem: "All cooking ingredient (e.g. cooking oil, sauces) are properly covered in proper containers and properly labelled, indicating the content and date of expiry.",
                         
                    },
                    {
                        lineItem: "All sauces are stored at appropriate condition & temperature.",
                         
                    },
                    {
                        lineItem:"Cooking oil is not used for more than 1 day.",
                         
                    },
                    {
                        lineItem:"Cooking oil is properly stored with a cover.",
                         
                    },
                    {
                        lineItem: "Perishable food is stored in the fridge.",
                         
                    },
                    {
                        lineItem: "Raw food and cooked food/ ready to serve food are clearly segregated.\n-Cold and/or hot holding units are clean and well maintained.",
                         
                    },
                    {
                        lineItem:"Food preparation area is free of bird and animal (e.g. dog or cat).",
                         
                    },
                    {
                        lineItem:"Food preparation area is clean, free of pests and in good state of repair.",
                         
                    },
                    {
                        lineItem: "Food is not prepared on the floor, near drain or near/ in toilet.",
                         
                    },
                    {
                        lineItem: "Personal belongings are kept separately in the staff locker area or cabinet, away from the food storage and preparation area.",
                         
                    }
                ]
            },
            {
                subcategory: "Storage of Food in Refrigerator/Warmer",
                lineItems: [
                    {
                        lineItem: "Daily Temperature Log for food storage units (freezers, chillers, warmers, steamers, ovens) using independent thermometer, etc. is maintained for inspection from time to time.",
                         
                    },
                    {
                        lineItem:"Food storage units (freezers, chillers, warmers, steamers, ovens) are kept clean and well maintained. All rubber gaskets of refrigerators / warmers are free from defect, dirt and mould.",
                         
                    },
                    {
                        lineItem:"Food storage units are not overstocked to allow good air circulation.",
                         
                    },
                    {
                        lineItem: "For walk-in freezers and chillers, food items are stored neatly on shelves and off the floor.",
                         
                    },
                    {
                        lineItem: "Frozen food is stored at a temperature of not more than -12°C.\n-Freezer’s temperature: < -12°C",
                         
                    },
                    {
                        lineItem: "Chilled food is stored at a temperature of not more than 4°C.\n-Chiller’s temperature: 0°C ~ 4°C",
                         
                    },
                    {
                        lineItem:"Hot food are held above 60°C.\n-Food warmer’s temperature: > 60°C",
                         
                    },
                    {
                        lineItem: "Perishable food is stored at a temperature of not more than 4°C.",
                         
                    },
                    {
                        lineItem:  "Dairy products are stored at a temperature of not more than 7°C.",
                         
                    },
                    {
                        lineItem:"Cooked/ ready-to-eat food are stored above raw food.",
                         
                    },
                    {
                        lineItem:"Food items are properly wrapped/covered in proper containers and protected from contamination.",
                         
                    }
                    
                ]
            }
        ]
    },
    {
        category: "4. Healthier Choice in line with HPB’s Healthy Eating’s Initiative (15%)",
        weightage: 15,
        score: 15,
        subcategories: [
            {
                subcategory: "Food",
                lineItems: [
                    {
                        lineItem: "Min. no. of healthier variety of food items per stall.\n\nLease Term:50% of food items.",
                         
                    },
                    {
                        lineItem: "Label caloric count of healthier options.",
                         
                    },
                    {
                        lineItem: "Include HPB’s Identifiers beside healthier options.",
                         
                    },
                    {
                        lineItem:"Use of healthier cooking oils.",
                         
                    },
                    {
                        lineItem: "Offer wholemeal/ whole-grain option.",
                         
                    },
                    {
                        lineItem: "Healthier option food sold at lower price than regular items.",
                         
                    },
                    {
                        lineItem: "Limit deep-fried and pre-deep fried food items sold (≤ 20% deep-fried items).",
                         
                    }
                ]
            },
            {
                subcategory: "Beverage",
                lineItems: [
                    {
                        lineItem:"No sugar / Lower-sugar brewed beverage offerings according to guidelines.",
                         
                    },
                    {
                        lineItem: "Healthier option beverages sold at lower price than regular items.",
                         
                    },
                    {
                        lineItem: "Label caloric count of healthier options.",
                         
                    },
                    {
                        lineItem:  "Limit sugar content on commercially-prepared sweetened beverages.\n(≥ 70% commercially-prepared sweetened beverages sold to have HCS)",
                         
                    }
                ]
            }
        ]
    },
    {
        category: "5. Workplace Safety & Health (20%)",
        weightage: 20,
        score: 20,
        subcategories: [
            {
                subcategory: "General Safety",
                lineItems: [
                    {
                        lineItem: "All food handlers have Basic Food Hygiene certificate and a valid Refresher Food Hygiene certificate (if applicable).",
                         
                    },
                    {
                        lineItem: "MSDS for all industrial chemicals are available and up to date.",
                         
                    },
                    {
                        lineItem:"Proper chemicals storage.",
                         
                    },
                    {
                        lineItem:"All detergent and bottles containing liquids are labelled appropriately.",
                         
                    },
                    {
                        lineItem: "All personnel to wear safety shoes and safety attire where necessary.",
                         
                    },
                    {
                        lineItem: "Knives and sharp objects are kept at a safe place.",
                         
                    },
                    {
                        lineItem:"Area under the sink should not be cluttered with items other than washing agents.",
                         
                    },
                    {
                        lineItem:"Delivery personnel do not stack goods above the shoulder level.",
                         
                    },
                    {
                        lineItem: "Stacking of goods does not exceed 600mm from the ceiling and heavy items at the bottom, light items on top.",
                         
                    },
                    {
                        lineItem: "Proper signage/ label (fire, hazards, warnings, food stuff) and Exit signs in working order.",
                         
                    },
                    {
                        lineItem:"Equipment, crockery and utensils are not chipped, broken or cracked.",
                         
                    }
                ]
            },
            {
                subcategory: "Fire & Emergency Safety",
                lineItems: [
                    {
                        lineItem:"Fire extinguishers access is unobstructed; Fire extinguishers are not expired and employees know how to use them.",
                         
                    },
                    {
                        lineItem:"Escape route and exits are unobstructed.", 
                         
                    },
                    {
                        lineItem:"First aid box is available and well-equipped.",
                         
                    }
                ]
            },
            {
                subcategory: "Electrical Safety",
                lineItems: [
                    {
                        lineItem:"Electrical sockets are not overloaded – one plug to one socket.",
                         
                    },
                    {
                        lineItem:"Plugs and cords are intact and free from exposure/tension with PSB safety mark.", 
                         
                    },
                    {
                        lineItem:"Power points that are in close proximity to flammable and/or water sources are installed with a plastic cover.",
                         
                    },
                    {
                        lineItem: "Electrical panels / DBs are covered.",
                         
                    }
                ]
            }
        ]
    }
]}