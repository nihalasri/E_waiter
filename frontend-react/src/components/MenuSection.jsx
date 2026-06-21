import React, { useState, useEffect, useRef } from 'react';

// Sea Food Starter Images
import crabMeatOmlette from '../assets/dishes/crab_meat_omlette.png';
import crispyFishFinger from '../assets/dishes/crispy_fish_finger.png';

// Veg Soup Images
import sweetCornSoup from '../assets/dishes/sweet_corn_soup.png';
import hotAndSourSoup from '../assets/dishes/hot_and_sour_soup.png';
import spinachGarlicSoup from '../assets/dishes/spinach_garlic_soup.png';
import pumpkinGingerSoup from '../assets/dishes/pumpkin_ginger_soup.png';
import vegClearSoup from '../assets/dishes/veg_clear_soup.png';
import tomatoSoup from '../assets/dishes/tomato_soup.png';
import creamOfMushroomSoup from '../assets/dishes/cream_of_mushroom_soup.png';
import mushroomSoup from '../assets/dishes/mushroom_soup.png';
import vegManchowSoup from '../assets/dishes/veg_manchow_soup.png';

// Veg Rice Images
import schezwanMushroomFriedRice from '../assets/dishes/schezwan_mushroom_fried_rice.png';
import paneerFriedRice from '../assets/dishes/paneer_fried_rice.png';
import schezwanPaneerFriedRice from '../assets/dishes/schezwan_paneer_fried_rice.png';
import chillyBasilVegFriedRice from '../assets/dishes/chilly_basil_veg_fried_rice.png';
import leefuVegRice from '../assets/dishes/leefu_veg_rice.png';
import basmatiSteamedRice from '../assets/dishes/basmati_steamed_rice.png';
import creamyCurdRice from '../assets/dishes/creamy_curd_rice.png';

// Non-Veg Rice Images
import chillyBasilChickenFriedRice from '../assets/dishes/chilly_basil_chicken_fried_rice.png';
import muttonFriedRiceNonVeg from '../assets/dishes/mutton_fried_rice_non_veg.png';
import schezwanPrawnFriedRiceNonVeg from '../assets/dishes/schezwan_prawn_fried_rice_non_veg.png';
import schezwanMuttonFriedRiceNonVeg from '../assets/dishes/schezwan_mutton_fried_rice_non_veg.png';
import schezwanBeefFriedRiceNonVeg from '../assets/dishes/schezwan_beef_fried_rice_non_veg.png';

// Veg Noodle Images
import chillyBasilVegNoodle from '../assets/dishes/chilly_basil_veg_noodle.png';

// Non-Veg Noodle Images
import chillyBasilChickenNoodle from '../assets/dishes/chilly_basil_chicken_noodle.png';
import prawnNoodle from '../assets/dishes/prawn_noodle.png';
import schezwanPrawnNoodle from '../assets/dishes/schezwan_prawn_noodle.png';
import garlicButterChickenNoodle from '../assets/dishes/garlic_butter_chicken_noodle.png';
import mixedMeatNoodle from '../assets/dishes/mixed_meat_noodle.png';
import beefNoodle from '../assets/dishes/beef_noodle.png';
import schezwanBeefNoodle from '../assets/dishes/schezwan_beef_noodle.png';
import muttonNoodle from '../assets/dishes/mutton_noodle.png';
import butterChickenNoodle from '../assets/dishes/butter_chicken_noodle.png';

// Veg Gravy Images
import kadaiVegetable from '../assets/dishes/kadai_vegetable.png';
import kadaiPaneer from '../assets/dishes/kadai_paneer.png';
import paneerTikkaMasala from '../assets/dishes/paneer_tikka_masala.png';
import dalThadka from '../assets/dishes/dal_thadka.png';
import kadaiMushroom from '../assets/dishes/kadai_mushroom.png';
import vegKoftaGravy from '../assets/dishes/veg_kofta_gravy.png';

// Non-Veg Gravy Images
import chickenChettinadGravy from '../assets/dishes/chicken_chettinad_gravy.png';
import punjabiMasalaChickenGravy from '../assets/dishes/punjabi_masala_chicken_gravy.png';
import chickenRoganJoshGravy from '../assets/dishes/chicken_rogan_josh_gravy.png';
import kadaiChickenGravy from '../assets/dishes/kadai_chicken_gravy.png';
import prawnMasalaGravy from '../assets/dishes/prawn_masala_gravy.png';
import crabPepperMasalaGravy from '../assets/dishes/crab_pepper_masala_gravy.png';
import eggBurjiMasalaGravy from '../assets/dishes/egg_burji_masala_gravy.png';
import hyderabadiChickenMasalaGravy from '../assets/dishes/hyderabadi_chicken_masala_gravy.png';
import pepperChickenMasalaGravy from '../assets/dishes/pepper_chicken_masala_gravy.png';
import andraChickenMasalaGravy from '../assets/dishes/andra_chicken_masala_gravy.png';
import chickenPatiyalaGravy from '../assets/dishes/chicken_patiyala_gravy.png';

// Biryani Images
import chickenKabsa from '../assets/dishes/chicken_kabsa.png';
import chickenMandi from '../assets/dishes/chicken_mandi.png';
import chickenMadghout from '../assets/dishes/chicken_madghout.png';

const MOCK_ITEMS = [
  // Chef Signature
  { id: 101, name: "Butter Chicken Masala", category: "Chef Signature", price: 290, image: "https://i.pinimg.com/originals/93/e9/79/93e97987768f9240c5ffda2475c0ce28.jpg" },
  { id: 102, name: "Paneer Lababdar", category: "Chef Signature", price: 280, image:"https://thecurryculture.ca/wp-content/uploads/2020/12/Paneer-lababdar.jpg" },
  { id: 103, name: "Dal Bukhara", category: "Chef Signature", price: 220, image: "https://th.bing.com/th/id/R.3df0e520be50a36a47a5c3afa6399672?rik=MeKt00uZV92laQ&riu=http%3a%2f%2fwww.evergreenrecipes.com%2fwp-content%2fuploads%2f2016%2f02%2fP1010328-2.jpg&ehk=PDaFT3%2buKRQ4KxkcLz%2b71qfyqgvAWfRHQdrrzLngpdc%3d&risl=&pid=ImgRaw&r=0" },
  { id: 104, name: "Hyderabadi Chicken Dum Biryani", category: "Chef Signature", price: 350, image: "https://img.freepik.com/premium-photo/hyderabadi-chicken-biryani-food-photos_410516-42775.jpg" },
  { id: 105, name: "Dynamite Shrimp", category: "Chef Signature", price: 420, image: "https://therecipecritic.com/wp-content/uploads/2023/07/dynamite-shrimp-4-1153x1536.jpg" },
  { id: 106, name: "Hyderabad Haleem", category: "Chef Signature", price: 190, image: "https://getamazedwithtaste.com/wp-content/uploads/2022/03/IMG_3253-scaled.jpg" },
  { id: 107, name: "Beef Shawarma", category: "Chef Signature", price: 120, image: "https://d33wubrfki0l68.cloudfront.net/ded5dcf64224de49380d90290d21831d06dd62a5/dfcfc/images/uploads/2022_03_18_beef_shawarma_8.jpg" },

  // Veg Soup
  { id: 201, name: "Hot & Sour Veg", category: "Veg Soup", price: 130, image: hotAndSourSoup },
  { id: 202, name: "Spinach & Garlic Soup", category: "Veg Soup", price: 140, image: spinachGarlicSoup },
  { id: 203, name: "Pumpkin Ginger Soup", category: "Veg Soup", price: 120, image: pumpkinGingerSoup },
  { id: 204, name: "Veg Clear Soup", category: "Veg Soup", price: 120, image: "https://www.vegrecipesofindia.com/wp-content/uploads/2024/06/clear-soup.jpg"},
  { id: 205, name: "Tomato Soup", category: "Veg Soup", price: 130, image: tomatoSoup },
  { id: 206, name: "Cream Of Mushroom", category: "Veg Soup", price: 150, image: "https://thecozyapron.com/wp-content/uploads/2019/08/cream-of-mushoom-soup_thecozyapron_1.jpg" },
  { id: 207, name: "SweetCorn Soup", category: "Veg Soup", price: 140, image: "https://media.istockphoto.com/id/494154858/photo/hot-homemade-corn-chowder.jpg?s=612x612&w=0&k=20&c=NuwffkneEU9yGgu_SnSZd45wPB_MeJO5YBGfg70x-L0=" },
  { id: 208, name: "Mushroom Soup", category: "Veg Soup", price: 140, image: "https://i.pinimg.com/736x/ed/10/79/ed107911f19b9b8cbae54acb208799ec.jpg" },
  { id: 209, name: "Veg Manchow Soup", category: "Veg Soup", price: 150, image: "https://i0.wp.com/asthaskitchendilse.wordpress.com/wp-content/uploads/2022/02/wp-1643806181558.jpg?fit=900%2C1200&ssl=1&w=640" },

  // Non-Veg Soup
  { id: 301, name: "Chicken Manchow", category: "Non-Veg Soup", price: 170, image: "https://tse1.mm.bing.net/th/id/OIP.OIxVKDNd76yv2xCziSYocAHaLG?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 302, name: "Mutton Bone Soup", category: "Non-Veg Soup", price: 250, image: "https://www.foodfusion.com/wp-content/uploads/2018/12/Mutton-bone-soup-Recipe-by-Food-fusion-3-300x225.jpg?v=1587764249" },
  { id: 303, name: "Cream of Chicken", category: "Non-Veg Soup", price: 220, image: "https://www.saltedside.com/wp-content/uploads/2025/10/Cream-of-Chicken-Soup.jpg" },
  { id: 304, name: "Crab Soup", category: "Non-Veg Soup", price: 220, image: "https://images.pexels.com/photos/28559504/pexels-photo-28559504.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 305, name: "Chicken Lemon Coriander", category: "Non-Veg Soup", price: 210, image: "https://cdn.grofers.com/assets/search/usecase/banner/chicken_lemon_coriander_soup_01.png" },

  // Veg Starter
  { id: 401, name: "Paneer Tikka Royale", category: "Veg Starter", price: 240, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80" },
  { id: 402, name: "Crispy Chilly Babycorn", category: "Veg Starter", price: 190, image: "https://mayurgroup.com/blog/wp-content/uploads/2021/07/CHINESE-CHILLI-BABY-CORN-mayur.jpg" },
  { id: 403, name: "Gobi Manchurian", category: "Veg Starter", price: 220, image: "https://www.palatesdesire.com/wp-content/uploads/2022/09/dry-gobi-manchurian-recipe@palates-desire.jpg" },
  { id: 404, name: "Paneer 65", category: "Veg Starter", price: 240, image: "https://purendesi.in/wp-content/uploads/2024/07/Paneer-65-recipe-2.jpg" },
  { id: 405, name: "Mushroom Duplex", category: "Veg Starter", price: 260, image: "https://2.bp.blogspot.com/-frJBr1pQIGE/XJ6yRT9K85I/AAAAAAAAHWw/F0GGV_DJaU03Kg1xkOnjjShWTci70tQYQCLcBGAs/s1600/IMG_20190329_214436.jpg" },
  { id: 406, name: "Dragon Paneer", category: "Veg Starter", price: 270, image: "https://i.ytimg.com/vi/flLY3YJ_bL0/maxresdefault.jpg" },
  { id: 407, name: "Hariyali Paneer Tikka", category: "Veg Starter", price: 290, image: "https://mykitchendiaries.com/wp-content/uploads/2025/08/Thumbnail.webp" },
  { id: 408, name: "Dragon Mushroom", category: "Veg Starter", price: 260, image: "https://www.bitensip.com/wp-content/uploads/2023/11/dragon-mushroom-1024x614.jpg" },
  { id: 409, name: "Gobi 65", category: "Veg Starter", price: 210, image: "https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/06/1966.png?fit=1200%2C675&ssl=1" },
  { id: 410, name: "Mushroom Tikka", category: "Veg Starter", price: 270, image: "https://tse1.mm.bing.net/th/id/OIP.XF6IgFzOe4-Jl-OMfmLhrgHaLG?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 411, name: "Corn Cheese Ball", category: "Veg Starter", price: 230, image: "https://www.cookingcarnival.com/wp-content/uploads/2017/08/Cheese-corn-balls-5-1024x1024.jpg" },

  // Non-Veg Starter
  { id: 501, name: "Chicken 65 Special", category: "Non-Veg Starter", price: 260, image: "https://www.shutterstock.com/image-photo/chicken-fry-kebab-kabab-65-600nw-1774422587.jpg" },
  { id: 502, name: "Lemon Garlic Chicken", category: "Non-Veg Starter", price: 280, image: "https://jamiesitalian.sg/wp-content/uploads/2025/03/italian-chicken-with-garlic-and-lemon-recipe-1742016017.jpeg" },
  { id: 503, name: "Mutton Seekh Kabab", category: "Non-Veg Starter", price: 420, image: "https://www.licious.in/blog/wp-content/uploads/2022/11/blog-image-01-1-750x750.jpg" },
  { id: 504, name: "Dragon Chicken", category: "Non-Veg Starter", price: 270, image: "https://aromaticessence.co/wp-content/uploads/2022/04/dragon_chicken_dry_version_featured.jpg" },
  { id: 505, name: "Thai Basil Chicken", category: "Non-Veg Starter", price: 280, image: "https://i.pinimg.com/736x/60/08/d2/6008d24dadacf61af607a566f4dff651.jpg" },
  { id: 506, name: "Murg Malai Tikka", category: "Non-Veg Starter", price: 290, image: "https://tse1.mm.bing.net/th/id/OIP.Ai9Mpm9ORLV9CkrNpMFeBgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 507, name: "Mutton Pepper Fry", category: "Non-Veg Starter", price: 380, image: "https://www.spiceindiaonline.com/wp-content/uploads/2021/09/Mutton-Pepper-Fry-2.jpg" },
  { id: 508, name: "Crispy Chilli Beef", category: "Non-Veg Starter", price: 340, image: "https://tse4.mm.bing.net/th/id/OIP.WZa46XsqlhWf6zqXkWhOoAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 509, name: "Mutton Chukka", category: "Non-Veg Starter", price: 360, image: "https://www.lekhafoods.com/media/1051277/virudhunagar-mutton-sukka.jpg" },
  { id: 510, name: "Chicken Manchurian Dry", category: "Non-Veg Starter", price: 260, image: "https://orders.popskitchen.in/storage/2024/09/image-148.png" },
  { id: 511, name: "Chicken Lollipop Saucy", category: "Non-Veg Starter", price: 280, image: "https://th.bing.com/th/id/R.3fbf4ff93fd0d12c1830e7462594efd8?rik=Y5o0Tl9LmU1kVQ&riu=http%3a%2f%2fshahiriwayat.com%2fcdn%2fshop%2farticles%2fchicken_lollipop_905a12a0-c272-4dd1-a8b9-a35710da656f.jpg%3fv%3d1756899645&ehk=EImUDJPvv9gVYEICrBdElD9aNUpw13AUc0MSz4t6x3Q%3d&risl=&pid=ImgRaw&r=0" },
  { id: 512, name: "Honey Chicken", category: "Non-Veg Starter", price: 270, image: "https://mydailybites.com/wp-content/uploads/2025/02/number00004_58940_Crispy_Baked_Hot_Honey_Chicken_Amateur_photo__b5a6ac6b-ba4c-4d24-a62a-bd2603f1f17f.png" },
  { id: 513, name: "Chicken Majestic", category: "Non-Veg Starter", price: 290, image: "https://tse1.mm.bing.net/th/id/OIP.-kw-JG0UFss_dQUK1eJD1gHaLK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 514, name: "Smokey Chicken Cigar", category: "Non-Veg Starter", price: 280, image: "https://i.ytimg.com/vi/yoETINXpdKw/maxresdefault.jpg" },

  // Sea Food Starter
  { id: 601, name: "Golden Fried Prawns", category: "Sea Food Starter", price: 380, image: "https://tse2.mm.bing.net/th/id/OIP.UjGueOvPdeuMGQUl7V79pAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 602, name: "Apollo Fish", category: "Sea Food Starter", price: 350, image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Apollo-Fish-750x750.jpg" },
  { id: 603, name: "Butter Garlic Prawns", category: "Sea Food Starter", price: 420, image: "https://www.jocooks.com/wp-content/uploads/2021/09/garlic-butter-shrimp-1-10.jpg" },
  { id: 604, name: "Crispy Calamari Rings", category: "Sea Food Starter", price: 320, image: "https://nykdaily.com/wp-content/uploads/2021/08/Untitled-design-27-640x640.png" },
  { id: 605, name: "Tandoori Fish Tikka", category: "Sea Food Starter", price: 380, image: "https://i0.wp.com/spiceandcolour.com/wp-content/uploads/2020/06/fish-tandoori-1.jpg?w=1140&ssl=1" },
  { id: 606, name: "Crab meat omlette", category: "Sea Food Starter", price: 170, image: crabMeatOmlette },
  { id: 607, name: "Crispy Fish Finger", category: "Sea Food Starter", price: 200, image: crispyFishFinger },
  { id: 608, name: "Prawn 65", category: "Sea Food Starter", price: 310, image: "https://i.pinimg.com/736x/66/b2/f7/66b2f783542d77ef71ce852fcec53039.jpg" },
  { id: 609, name: "Vanjaram Tawa Fry", category: "Sea Food Starter", price: 320, image: "https://img-global.cpcdn.com/recipes/b757790feb86e07a/1200x630cq80/photo.jpg" },
  { id: 610, name: "Tandoori Prawn", category: "Sea Food Starter", price: 350, image: "https://tse1.mm.bing.net/th/id/OIP.oKrDg8M-L7STCZPkeICD3AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"},
  { id: 611, name: "Nethili Fish Fry", category: "Sea Food Starter", price: 280, image: "https://i.pinimg.com/originals/5d/a3/ab/5da3ab596f628fa2c50e1628438c02bb.jpg" },
  { id: 612, name: "Calamari 65 (Squid)", category: "Sea Food Starter", price: 280, image: "https://preview.redd.it/calamari-65-v0-93sh0hq3l98c1.jpeg?auto=webp&s=dbb5e37359531b89f7bb0681683eeb1c20d7c41d" },
  { id: 613, name: "Crab Lollipop", category: "Sea Food Starter", price: 350, image: "https://i.pinimg.com/originals/f0/b0/7e/f0b07eb5918e637077a8062e5b1bd3b5.jpg" },

  // Veg Rice
  { id: 701, name: "Veg Fried Rice", category: "Veg Rice", price: 220, image: "https://enjoyinfourseason.com/wp-content/uploads/2022/05/Fourseason-VEG-FRIED-RICE.jpg" },
  { id: 702, name: "Schezwan Veg Rice", category: "Veg Rice", price: 240, image: "https://currytown.ca/wp-content/uploads/2024/04/SchezwanFriedRice5-600x717.jpg" },
  { id: 703, name: "Mushroom Fried Rice", category: "Veg Rice", price: 260, image: "https://i0.wp.com/southindianrecipes.in/wp-content/uploads/2021/06/Mushroom-Fried-Rice.jpg" },
  { id: 704, name: "Jeera Rice", category: "Veg Rice", price: 180, image: "https://i1.wp.com/vegecravings.com/wp-content/uploads/2017/04/jeera-rice-recipe-step-by-step-instructions.jpg?w=2076&quality=65&strip=all&ssl=1" },
  { id: 705, name: "Schezwan Mushroom Fried Rice", category: "Veg Rice", price: 260, image: schezwanMushroomFriedRice },
  { id: 706, name: "Paneer Fried rice", category: "Veg Rice", price: 250, image: paneerFriedRice },
  { id: 707, name: "Schezwan Paneer Fried Rice", category: "Veg Rice", price: 270, image: schezwanPaneerFriedRice },
  { id: 708, name: "chilly basil veg fried rice", category: "Veg Rice", price: 240, image: chillyBasilVegFriedRice },
  { id: 709, name: "Leefu Veg Rice", category: "Veg Rice", price: 260, image: leefuVegRice },
  { id: 710, name: "Basmati Streamed Rice", category: "Veg Rice", price: 120, image: basmatiSteamedRice },
  { id: 711, name: "Creamy Curd Rice", category: "Veg Rice", price: 150, image: creamyCurdRice },

  // Non-Veg Rice
  { id: 801, name: "Chicken Fried Rice", category: "Non-Veg Rice", price: 220, image: "https://www.sharmispassions.com/wp-content/uploads/2018/03/chicken-fried-rice8-360x540.jpg" },
  { id: 802, name: "Egg Fried Rice", category: "Non-Veg Rice", price: 180, image: "https://stretchrecipes.com/wp-content/uploads/2025/01/16.-Indian-Egg-Fried-Rice.jpg" },
  { id: 803, name: "Mixed Meat Fried Rice", category: "Non-Veg Rice", price: 340, image: "https://yellowchilis.com/wp-content/uploads/2021/01/indo-chinese-schezwan-chicken-fried-rice-recipe-with-vegetables-and-eggs-500x500.jpg" },
  { id: 804, name: "Schezwan Chicken Rice", category: "Non-Veg Rice", price: 230, image: "https://img.freepik.com/premium-photo/tasty-schezwan-chicken-fried-rice-with-tomato-sauce-served-white-bowl-rustic-wooden-background-indian-cuisine-selective-focus_726363-487.jpg?w=1060" },
  { id: 805, name: "Chilly Basil Chicken Fried Rice", category: "Non-Veg Rice", price: 240, image: chillyBasilChickenFriedRice },
  { id: 806, name: "Prawn fried Rice", category: "Non-Veg Rice", price: 280, image: "https://crazymasalafood.com/wp-content/images/2023/11/seven-bites-caf-restaurant.jpg" },
  { id: 807, name: "Mutton Fried Rice", category: "Non-Veg Rice", price: 320, image: muttonFriedRiceNonVeg },
  { id: 808, name: "Nasi Lemak", category: "Non-Veg Rice", price: 260, image: "https://wallpapers.com/images/hd/malaysian-cuisine-nasi-lemak-dutch-angle-shot-rww2io77riofzcce.jpg" },
  { id: 809, name: "Beef Fried Rice", category: "Non-Veg Rice", price: 270, image: "https://thecozycook.com/wp-content/uploads/2023/12/Beef-Fried-Rice-3-700x744.jpg"},
  { id: 810, name: "Schezwan Prawn fried Rice", category: "Non-Veg Rice", price: 300, image: schezwanPrawnFriedRiceNonVeg },
  { id: 811, name: "Schezwan Mutton Fried Rice", category: "Non-Veg Rice", price: 340, image: schezwanMuttonFriedRiceNonVeg },
  { id: 812, name: "Schezwan Beef Fried Rice", category: "Non-Veg Rice", price: 290, image: schezwanBeefFriedRiceNonVeg },

  // Veg Noodles
  { id: 901, name: "Veg Hakka Noodles", category: "Veg Noodles", price: 210, image: "https://myfoodstory.com/wp-content/uploads/2021/02/Vegetable-Hakka-Noodles-Restaurant-Style-3-720x720.jpg" },
  { id: 902, name: "Veg Schezwan Noodles", category: "Veg Noodles", price: 230, image: "https://img.freepik.com/premium-photo/schezwan-veg-noodles-popular-indochinese-dish-made-with-noodles-vegetables-schezwan-sauce-served-rustic-wooden-background-selective-focus_726363-1146.jpg" },
  { id: 903, name: "Veg Singapore Noodles", category: "Veg Noodles", price: 240, image: "https://thewoksoflife.com/wp-content/uploads/2018/09/vegetarian-singapore-noodles-3-340x470.jpg" },
  { id: 904, name: "Chilly Basil Veg Noodle", category: "Veg Noodles", price: 240, image: chillyBasilVegNoodle },
  { id: 905, name: "Paneer Cube Noodle", category: "Veg Noodles", price: 260, image: "https://img.freepik.com/premium-photo/paneer-noodles-popular-indochinese-dish-served-rustic-wooden-background-selective-focus_726363-1014.jpg" },
  { id: 906, name: "Mushroom Noodle", category: "Veg Noodles", price: 250, image: "https://zenaskitchen.com/wp-content/uploads/2024/03/saucy-mushroom-noodles.jpg" },
  { id: 907, name: "Veg Pad Thai Noodle", category: "Veg Noodles", price: 280, image: "https://fullofplants.com/wp-content/uploads/2022/03/easy-vegan-pad-thai-noodle-dish-with-bean-sprouts-thumb.jpg" },
  { id: 908, name: "Schezwan Paneer Cube Noodle", category: "Veg Noodles", price: 270, image: "https://dukaan.b-cdn.net/1000x1000/webp/projecteagle/images/f88951e2-7c1e-4333-aa87-dac2621364d2.jpg" },
  { id: 909, name: "Schezwan Mushroom Noodle", category: "Veg Noodles", price: 260, image: "https://i.pinimg.com/originals/9f/a9/41/9fa94104e08e22c6d023bc9574680b60.jpg" },
  { id: 910, name: "Mixed Veg Noodles", category: "Veg Noodles", price: 250, image: "https://www.cookwithkushi.com/wp-content/uploads/2021/09/best_veg_noodles_recipe.jpg" },

  // Non-Veg Noodles
  { id: 1001, name: "Chicken Hakka Noodles", category: "Non-Veg Noodles", price: 280, image: "https://runoflif.com/wp-content/uploads/2025/11/chicken-hakka-noodles-2-1.jpg" },
  { id: 1002, name: "Chicken Schezwan Noodles", category: "Non-Veg Noodles", price: 300, image: "https://thumbs.dreamstime.com/b/chicken-schezwan-noodles-bowl-wooden-background-279293131.jpg" },
  { id: 1003, name: "Egg Hakka Noodles", category: "Non-Veg Noodles", price: 250, image: "https://b2958125.smushcdn.com/2958125/wp-content/uploads/stir-fried-egg-hakka-noodles-1-2.jpg?lossy=1&strip=1&webp=1" },
  { id: 1004, name: "Chilly Basil Chicken Noodle", category: "Non-Veg Noodles", price: 290, image: chillyBasilChickenNoodle },
  { id: 1005, name: "Prawn Noodle", category: "Non-Veg Noodles", price: 320, image: prawnNoodle },
  { id: 1006, name: "Schezwan Prawn Noodle", category: "Non-Veg Noodles", price: 340, image: "https://muchbutter.com/wp-content/uploads/2024/02/Yaki-Udon-28.jpg" },
  { id: 1007, name: "Garlic Butter Chicken Noodle", category: "Non-Veg Noodles", price: 310, image: garlicButterChickenNoodle },
  { id: 1008, name: "Mixed Meat Noodle", category: "Non-Veg Noodles", price: 380, image: mixedMeatNoodle },
  { id: 1009, name: "Beef Noodle", category: "Non-Veg Noodles", price: 330, image: beefNoodle },
  { id: 1010, name: "Schezwan Beef Noodle", category: "Non-Veg Noodles", price: 350, image: schezwanBeefNoodle },
  { id: 1011, name: "Mutton Noodle", category: "Non-Veg Noodles", price: 360, image: muttonNoodle },
  { id: 1012, name: "Butter Chicken Noodle", category: "Non-Veg Noodles", price: 350, image: butterChickenNoodle },

  // Veg Gravy
  { id: 1101, name: "Paneer Butter Masala", category: "Veg Gravy", price: 280, image: "https://tse4.mm.bing.net/th/id/OIP.LRorO9eoX__28SlTrMuizAHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1102, name: "Veg Manchurian Gravy", category: "Veg Gravy", price: 240, image: "https://media.istockphoto.com/id/1284771656/photo/veg-manchurian-gravy-balls-in-black-bowl-in-dark-slate-table-top-vegetarian-manchurian-is.jpg?s=612x612&w=0&k=20&c=Gxl10HWwnzu7w4ZeCR9x7XkGrFqc0lqdy9JhIGQJ8-E=" },
  { id: 1103, name: "Mix Veg Curry", category: "Veg Gravy", price: 220, image: "https://thechupitosbar.com/wp-content/uploads/2024/04/Indian-vegetable-curry.jpg" },
  { id: 1104, name: "Dal Makhani", category: "Veg Gravy", price: 260, image: "https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg" },
  { id: 1105, name: "Kadai Vegetable", category: "Veg Gravy", price: 240, image: "https://x9s2d6a3.rocketcdn.me/wp-content/uploads/2023/04/kadai-vegetable-gravy-1200x1200-1.jpg" },
  { id: 1106, name: "Kadai Paneer", category: "Veg Gravy", price: 270, image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg" },
  { id: 1107, name: "Paneer Tikka Masala", category: "Veg Gravy", price: 290, image: "https://tse4.mm.bing.net/th/id/OIP.WgK16QECU-vZ6r44TTerGgHaF4?rs=1&pid=ImgDetMain&o=7&rm=3"},
  { id: 1108, name: "Dal Thadka", category: "Veg Gravy", price: 180, image: "https://glebekitchen.com/wp-content/uploads/2019/05/daltadkafrontscene2-836x1024.jpg" },
  { id: 1109, name: "Kadai Mushroom", category: "Veg Gravy", price: 260, image: "https://i.pinimg.com/originals/e4/08/0c/e4080cd33a68a0739019523d819ac9b1.jpg" },
  { id: 1110, name: "Veg Kofta gravy", category: "Veg Gravy", price: 250, image: "https://img.freepik.com/premium-photo/plate-food-with-side-food_865967-228788.jpg" },

  // Non-Veg Gravy
  { id: 1201, name: "Butter Chicken", category: "Non-Veg Gravy", price: 350, image: "https://i.pinimg.com/originals/93/e9/79/93e97987768f9240c5ffda2475c0ce28.jpg" },
  { id: 1202, name: "Chicken Tikka Masala", category: "Non-Veg Gravy", price: 360, image: "https://i0.wp.com/currykits.com/wp-content/uploads/2023/01/Chicken-tikka-masala-curry-recipe.png?resize=768%2C577&ssl=1" },
  { id: 1203, name: "Indo-Chinese Chilli Chicken", category: "Non-Veg Gravy", price: 320, image: "https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1498639676-min-750x750.jpg" },
  { id: 1204, name: "Mutton Rogan Josh", category: "Non-Veg Gravy", price: 450, image: "https://1.bp.blogspot.com/-S_1HJb6StqY/X9WeCN8qLTI/AAAAAAAACjc/0VBiiWhlIlk5tsXxM6EsmMojTmM0UzAUQCLcBGAsYHQ/s709/Rogan-Josh-2-PictureTheRecipe.jpg" },
  { id: 1205, name: "Chicken Chettinad", category: "Non-Veg Gravy", price: 320, image: "https://i.pinimg.com/originals/b5/2e/20/b52e2005c3070d803a4a56d2071e30cb.webp" },
  { id: 1206, name: "Punjabi Masala", category: "Non-Veg Gravy", price: 340, image: "https://yummyindiankitchen.com/wp-content/uploads/2023/04/punjabi-chicken-recipe.jpg" },
  { id: 1207, name: "Chicken Rogan Josh", category: "Non-Veg Gravy", price: 360, image:"https://www.krumpli.co.uk/wp-content/uploads/2021/11/Chicken-Rogan-Josh-01-810x1080.jpg" },
  { id: 1208, name: "Kadai chicken", category: "Non-Veg Gravy", price: 310, image: "https://as2.ftcdn.net/v2/jpg/01/18/05/05/1000_F_118050522_XfowJwoIVwyfXzFtmYWn5o9q533DP2Mm.jpg" },
  { id: 1209, name: "Prawn Masala", category: "Non-Veg Gravy", price: 420, image: "https://www.whiskaffair.com/wp-content/uploads/2023/02/Shrimp-Masala-2-1.jpg" },
  { id: 1210, name: "Crab Masala", category: "Non-Veg Gravy", price: 450, image: "https://thumbs.dreamstime.com/b/crab-masala-indian-style-56223587.jpg" },
  { id: 1211, name: "Egg Burji Masala Gravy", category: "Non-Veg Gravy", price: 240, image: "https://i.ytimg.com/vi/oOVozAXNZhw/maxresdefault.jpg" },
  { id: 1212, name: "Hyderabadi Chicken Masala", category: "Non-Veg Gravy", price: 330, image: "https://spiceeats.com/wp-content/uploads/2020/07/Chicken-Hyderabadi-768x512.jpg" },
  { id: 1213, name: "Pepper Chicken Masala", category: "Non-Veg Gravy", price: 320, image: "https://www.gohealthyeverafter.com/wp-content/uploads/2022/06/Pepper-chicken-gravy-09.jpg" },
  { id: 1214, name: "Andra Chicken Masala", category: "Non-Veg Gravy", price: 320, image: andraChickenMasalaGravy },
  { id: 1215, name: "Chicken Patiyala", category: "Non-Veg Gravy", price: 380, image: "https://tse1.mm.bing.net/th/id/OIP.8M8U71GVJ1jUUlM_IboTOAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1216, name: "Chicken Mugalai Masala", category: "Non-Veg Gravy", price: 390, image: "https://tse3.mm.bing.net/th/id/OIP.SVYOKxItCiQB2TTeHMlNdwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },

  // Biryani
  { id: 1301, name: "Hyderabadi Chicken Dum Biryani", category: "Biryani", price: 350, image: "https://img.freepik.com/premium-photo/hyderabadi-chicken-biryani-food-photos_410516-42775.jpg" },
  { id: 1302, name: "Prawn Biryani", category: "Biryani", price: 280, image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Prawn-Biryani-Recipe.jpg" },
  { id: 1303, name: "Bamboo Mutton Biryani", category: "Biryani", price: 480, image: "https://www.shutterstock.com/image-photo/all-types-biryani-bamboo-600nw-2286375863.jpg" },
  { id: 1304, name: "Egg Biryani", category: "Biryani", price: 260, image: "https://img.freepik.com/premium-photo/kerala-style-egg-biryani-with-jeera-rice-spices_1105604-27973.jpg" },
  { id: 1305, name: "Chicken Kabsa", category: "Biryani", price: 240, image: "https://stewwithsaba.com/wp-content/uploads/2025/06/IMG_5601-1-edited.jpg"},
  { id: 1306, name: "Chicken Mandi Biryani", category: "Biryani", price: 250, image: "https://content.jdmagicbox.com/v2/comp/armoor/d9/9999p8463.8463.240305211435.j4d9/catalogue/al-arabian-mandi-family-restaurant-ac-armoor-journalist-colony-armoor-restaurants-AW2NpdaQ37.jpg" },
  { id: 1307, name: "Chicken Madghout", category: "Biryani", price: 270, image: "https://biralrawhaa.com/Pdfmenu/wp-content/uploads/2024/07/15-01-2.jpg" },

  // Indian Bread
  { id: 1701, name: "Tandoori Roti", category: "Indian Bread", price: 40, image: "https://sinfullyspicy.com/wp-content/uploads/2024/05/1200-by-1200-images.jpg" },
  { id: 1702, name: "Tandoori Paratha", category: "Indian Bread", price: 50, image: "https://thumbs.dreamstime.com/b/indian-layered-paratha-flat-bread-roti-kerala-porotta-chicken-curry-side-69315087.jpg" },
  { id: 1703, name: "Butter Roti", category: "Indian Bread", price: 50, image: "https://gadegal-homestay.himwebx.com/wp-content/uploads/2023/10/butter-roti.jpg" },
  { id: 1704, name: "Naan", category: "Indian Bread", price: 55, image: "https://cdn.uengage.io/uploads/28289/image-SUU66D-1742797461.jpg" },
  { id: 1705, name: "Butter Naan", category: "Indian Bread", price: 60, image: "https://t3.ftcdn.net/jpg/08/95/50/04/360_F_895500474_IDUMxbOGEBn29tyPyjG8oLEEWlK8ZlOg.jpg" },
  { id: 1706, name: "Cheese Naan", category: "Indian Bread", price: 80, image: "https://masalahouse.com.sa/wp-content/uploads/2022/09/Cheesy-Naan-Bread.jpg" },
  { id: 1707, name: "Kashmiri Naan", category: "Indian Bread", price: 90, image: "https://www.tasteatlas.com/images/dishes/1b4d7450b4e746b1ad5b9410fabac888.jpg" },
  { id: 1708, name: "Garlic Butter Naan", category: "Indian Bread", price: 75, image: "https://cdn.tasteatlas.com/images/dishes/bb78aadeae4e4a1c87b3843d8120aa9a.jpg" },
  { id: 1709, name: "Kulcha", category: "Indian Bread", price: 50, image: "https://www.vegrecipesofindia.com/wp-content/uploads/2018/10/kulcha-recipe-1.jpg" },
  { id: 1710, name: "Masala Kulcha", category: "Indian Bread", price: 65, image: "https://sankrantisg.com/wp-content/uploads/2025/03/MASALA-KULCHA-1.jpg" },
  { id: 1711, name: "Paneer Kulcha", category: "Indian Bread", price: 80, image: "https://jalojog.com/wp-content/uploads/2024/04/Paneer_Kulcha.jpg" },
  { id: 1712, name: "Lachha Paratha", category: "Indian Bread", price: 65, image: "https://myfoodstory.com/wp-content/uploads/2022/08/Homemade-Lachha-Paratha-2.jpg" },
  { id: 1713, name: "Aloo Paratha", category: "Indian Bread", price: 70, image: "https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000058JR-Indian-Aloo-Paratha-Potato-Stuffed-Flatbread-From-Punjab-FTR1-ph01-Shtr_SMALL.jpg" },

  // Pasta
  { id: 1401, name: "Penne Arrabbiata", category: "Pasta", price: 220, image: "https://tse3.mm.bing.net/th/id/OIP.TrOYBPNvxQ-AuVF6E9oEXwHaJf?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1402, name: "Creamy Fettuccine Alfredo", category: "Pasta", price: 250, image: "https://eatsdelightful.com/wp-content/uploads/2020/09/fettuccine-alfredo-complete.jpg" },
  { id: 1403, name: "Basil Pesto Pasta", category: "Pasta", price: 180, image: "https://healthiersteps.com/wp-content/uploads/2011/09/pesto-pasta-1.jpg" },
  { id: 1404, name: "Pink Sauce Pasta", category: "Pasta", price: 260, image: "https://instantcooks.com/wp-content/uploads/2025/03/Hearty-Pink-Sauce-Pasta-with-Parmigiano-Reggiano.jpg" },
  { id: 1405, name: "Spaghetti Carbonara", category: "Pasta", price: 290, image: "https://th.bing.com/th/id/OIP.ZwzSdPVkveJYjIhmWY2H8wHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1406, name: "Lasagna Classico", category: "Pasta", price: 350, image: "https://th.bing.com/th/id/R.f89d0a9218e8fa11dc2115510eb4da21?rik=HwA2wtUs14FMvg&riu=http%3a%2f%2fcdn.allotta.io%2fimage%2fupload%2fv1697473845%2fdxp-images%2fbrands%2fRecipes%2fall-recipe-assets%2fclassico-two-sauce-lasagna%2fa76481fe75494e8885fa1d34a31408e2_eiwpgh.jpg&ehk=LlkEuVfD6KS0Qkew%2frshQSJDoOVFWrqOOgW18VY%2bTlM%3d&risl=&pid=ImgRaw&r=0" },
  { id: 1407, name: "Mushroom Ravioli", category: "Pasta", price: 310, image: "https://tse2.mm.bing.net/th/id/OIP.sdWNxzR84hLaQ-EpALF1fQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },

  // Desserts
  { id: 1501, name: "Tiramisu Classic", category: "Desserts", price: 220, image: "https://www.wellseasonedstudio.com/wp-content/uploads/2023/11/Italian-tiramisu-on-a-plate-with-cocoa-powder-and-chocolate-shavings.jpg" },
  { id: 1502, name: "Saphire Cheesecake", category: "Desserts", price: 170, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80" },
  { id: 1503, name: "Gulab Jamun with Ice Cream", category: "Desserts", price: 150, image: "https://someindiangirl.com/wp-content/uploads/2021/08/Gulab-Jamun-Ice-Cream-1-3-of-14-scaled.jpg" },
  { id: 1504, name: "Saffron Rasmalai", category: "Desserts", price: 110, image: "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a051055034094cbca09cdf2082d7a032.jpeg?resize=1000:*&output-format=jpg&output-quality=auto" },
  { id: 1505, name: "Belgian Chocolate Mousse", category: "Desserts", price: 150, image: "https://cabbi.com/wp-content/uploads/2021/01/chocolate-mousse.jpg" },
  { id: 1506, name: "Choclate Brownie", category: "Desserts", price: 90, image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/06/chocolate-brownies-3-1024x1536.jpg" },
  { id: 1507, name: "Red Velvet Layer Cake", category: "Desserts", price: 140, image: "https://tse1.mm.bing.net/th/id/OIP.kQCLPSNIbxS5i4wJorJZjAHaNl?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1508, name: "Panna Cotta", category: "Desserts", price: 180, image: "https://www.myhouseofpizza.com/wp-content/uploads/2025/01/UTF-8panna-cotta-recipe2028429.jpg" },
  { id: 1509, name: "Blueberry Macarons", category: "Desserts", price: 120, image: "https://cambreabakes.com/wp-content/uploads/2022/03/blueberry-macarons-6-1.jpg" },

  // Drinks
  { id: 1601, name: "Masala Chai", category: "Drinks", price: 40, image: "https://foodandroad.com/wp-content/uploads/2021/04/masala-chai-indian-drink-3-500x500.jpg" },
  { id: 1602, name: "Lassi", category: "Drinks", price: 60, image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/lassi-recipe-1.jpg" },
  { id: 1603, name: "Roasted Jeera Water", category: "Drinks", price: 35, image: "https://tse4.mm.bing.net/th/id/OIP.TKVb-oaytndb4u9e3j0XEQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 1604, name: "Indian Filter Coffee", category: "Drinks", price: 55, image: "https://images.indianexpress.com/2024/03/indian-filter-coffee.jpg" },
  { id: 1605, name: "Masala Lemonade", category: "Drinks", price: 45, image: "https://th.bing.com/th/id/R.eeaf6be2591597afdd141e88bbbf133f?rik=zXKYHBib8Ke8uA&riu=http%3a%2f%2fderafarms.com%2fcdn%2fshop%2ffiles%2fdera_products_2_grande.jpg%3fv%3d1718339598&ehk=1nTin1orGEk9Arl1noMTjBMaISvM4C8DoKMIqu35zO0%3d&risl=&pid=ImgRaw&r=0" },
  { id: 1606, name: "Coke 350ml", category: "Drinks", price: 40, image: "https://cdn.dooca.store/418/products/coca.jpg?v=1589835707&webp=0" },
  { id: 1607, name: "Bovonto 500ml", category: "Drinks", price: 50, image: "https://www.jiomart.com/images/product/600x600/491185319/bovonto-soft-drink-500-ml-product-images-o491185319-p590040997-0-202211081805.jpg" },
  { id: 1608, name: "Sprite 350ml", category: "Drinks", price: 40, image: "https://i.pinimg.com/736x/6d/89/46/6d89468f6907639780e323204dd66b38.jpg" },
  { id: 1609, name: "Spiced Butter Milk", category: "Drinks", price: 40, image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/masala-chaas-recipe.jpg" },
  { id: 1610, name: "Fresh Lime Soda", category: "Drinks", price: 50, image: "https://www.thealigarhchef.com/wp-content/uploads/2021/05/fresh-lime-soda-sweet-salted-1024x1024-1.jpg" },
  { id: 1611, name: "Rose Milkshake", category: "Drinks", price: 80, image: "https://modestmunchies.com/wp-content/uploads/2022/12/Rose-milkshake-2-of-4-640x427.jpg" },
  { id: 1612, name: "BlueBerry Mojito", category: "Drinks", price: 120, image: "https://thenovicechefblog.com/wp-content/uploads/2013/05/Blueberry-Mojito-1.jpg" },
];

const MenuSection = ({ cart, setCart, addToCart, removeFromCart, cartCount, onNavigate, initialCategory }) => {
  const [categories] = useState([
    "Chef Signature",
    "Veg Soup",
    "Non-Veg Soup",
    "Veg Starter",
    "Non-Veg Starter",
    "Sea Food Starter",
    "Veg Rice",
    "Non-Veg Rice",
    "Veg Noodles",
    "Non-Veg Noodles",
    "Veg Gravy",
    "Non-Veg Gravy",
    "Biryani",
    "Indian Bread",
    "Pasta",
    "Desserts",
    "Drinks",
  ]);
  const [activeCat, setActiveCat] = useState(initialCategory || "Chef Signature");
  const [items, setItems] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const tabsRef = useRef(null);

  useEffect(() => {
    setActiveCat(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    // Fetch stock availability from the backend
    fetch('http://127.0.0.1:5000/api/menu')
      .then(res => res.json())
      .then(data => {
        const stockMap = {};
        data.forEach(item => { stockMap[item.id] = item.is_available === 1 || item.is_available === true; });
        setStockInfo(stockMap);
      })
      .catch(err => console.error("Failed to fetch menu stock:", err));
  }, []);

  useEffect(() => {
    // Smoothly scroll the active tab into view (centered)
    const activeTabElement = tabsRef.current?.querySelector(".tab.active");
    if (activeTabElement) {
      activeTabElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }, [activeCat]);

  useEffect(() => {
    // Comprehensive background pre-loading for all unique images in MOCK_ITEMS
    const preloadAllImages = () => {
      // Delay pre-loading to prioritize initial render bandwidth
      setTimeout(() => {
        const allUrls = [...new Set(MOCK_ITEMS.map(item => item.image))];
        allUrls.forEach(url => {
          if (url && typeof url === 'string' && url.startsWith('http')) {
            const img = new Image();
            img.src = url;
          }
        });
      }, 1500); 
    };
    preloadAllImages();
  }, []);

  useEffect(() => {
    // Filter items based on active category and merge stock info
    const filtered = MOCK_ITEMS.filter((i) => i.category === activeCat).map(item => ({
        ...item,
        is_available: stockInfo[item.id] !== undefined ? stockInfo[item.id] : true
    }));
    setItems(filtered);
  }, [activeCat, stockInfo]);

  return (
    <div className="menu-section">
      <div className="menu-container">
        <header className="menu-header">
          <h2>Our Menu</h2>
          <div
            className="cart-icon-wrapper"
            onClick={() => onNavigate("cart")}
          >
            <ion-icon name="cart-outline"></ion-icon>
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>
        </header>

        <div className="category-tabs" ref={tabsRef}>
          {categories.map((c) => (
            <div
              key={c}
              className={`tab ${activeCat === c ? "active" : ""}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </div>
          ))}
        </div>

        <div className="dish-grid">
          {items.length > 0 ? (
            items.map((dish) => {
              const inCart = cart.find(i => i.id === dish.id);
              const isPriority = items.indexOf(dish) < 6; // First row/visible items
              return (
                <div key={dish.id} className={`dish-card glass-card glass ${dish.is_available === false ? 'out-of-stock' : ''}`} style={{ opacity: dish.is_available === false ? 0.6 : 1 }}>
                  <img
                    className="dish-img"
                    style={{ filter: dish.is_available === false ? 'grayscale(100%)' : 'none' }}
                    src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"}
                    alt={dish.name}
                    loading={isPriority ? "eager" : "lazy"}
                    fetchpriority={isPriority ? "high" : "auto"}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="dish-info">
                    <div className="dish-name">{dish.name}</div>
                    <div className="dish-price">₹{dish.price}</div>
                  </div>
                  
                  <div className="dish-actions">
                    {inCart ? (
                      <div className="quantity-control">
                        <button className="qty-btn" onClick={() => removeFromCart(dish)}>
                          <ion-icon name="remove-outline"></ion-icon>
                        </button>
                        <span className="quantity">{inCart.quantity}</span>
                        <button className="qty-btn" onClick={() => addToCart(dish)}>
                          <ion-icon name="add-outline"></ion-icon>
                        </button>
                      </div>
                    ) : (
                      <button 
                          className="add-btn" 
                          onClick={() => addToCart(dish)} 
                          disabled={dish.is_available === false}
                          style={{
                              background: dish.is_available === false ? 'rgba(255,255,255,0.1)' : '',
                              color: dish.is_available === false ? '#94a3b8' : '',
                              cursor: dish.is_available === false ? 'not-allowed' : 'pointer'
                          }}
                      >
                        {dish.is_available === false ? (
                            "OUT OF STOCK"
                        ) : (
                            <><ion-icon name="cart-outline"></ion-icon> ADD TO CART</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="loading-text">
              No items available in {activeCat} category.
            </p>
          )}
        </div>
      </div>

      {cartCount > 0 && (
        <div className="cart-pop">
          <div className="cart-pop-left">
            <ion-icon name="cart-outline"></ion-icon>
            <span>{cartCount} {cartCount === 1 ? 'Item' : 'Items'} Added</span>
          </div>
          <div className="cart-pop-right">
            <button className="view-cart-btn" onClick={() => onNavigate("cart")}>
              VIEW CART
            </button>
            <button className="clear-cart-pop-btn" onClick={() => setCart([])}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSection;
