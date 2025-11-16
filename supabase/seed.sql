-- Seed data for products table
-- Run this after schema.sql to populate the database with initial products

INSERT INTO public.products (name, slug, description, price, category, material, featured, image_url, hover_image_url, colors, sizes, stock) VALUES
(
  'Silk Kimono Robe',
  'silk-kimono-robe',
  'Luxurious pure silk kimono robe with delicate embroidery. Indulge in the ultimate luxury with our handcrafted silk kimono robe. Made from 100% pure mulberry silk with intricate hand-embroidered details, this robe embodies timeless elegance.',
  298.00,
  'robes',
  '100% Mulberry Silk, Hand-embroidered details',
  true,
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Ivory", "hex": "#fafaf9"},
    {"name": "Champagne", "hex": "#f7e7ce"},
    {"name": "Navy", "hex": "#1e293b"}
  ]'::jsonb,
  '[
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": false}
  ]'::jsonb,
  100
),
(
  'Cotton Pajama Set',
  'cotton-pajama-set',
  'Premium long-sleeve cotton pajama set with piping detail. Experience comfort like never before with our premium cotton pajama set. Crafted from breathable, long-staple cotton with elegant piping details.',
  148.00,
  'pajamas',
  '100% Long-staple Cotton, Contrast piping',
  true,
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Beige", "hex": "#d6cfc4"},
    {"name": "White", "hex": "#ffffff"},
    {"name": "Sage", "hex": "#9caf88"}
  ]'::jsonb,
  '[
    {"size": "XS", "inStock": true},
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": true}
  ]'::jsonb,
  150
),
(
  'Satin Slip Nightgown',
  'satin-slip-nightgown',
  'Elegant satin slip nightgown with lace trim. Embrace timeless femininity with our satin slip nightgown. Featuring delicate lace trim and adjustable straps, this piece is crafted from premium satin.',
  128.00,
  'nightgowns',
  'Premium Satin, French lace trim',
  true,
  'https://images.unsplash.com/photo-1583008937090-a9e8e0e4d02d?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583008937090-a9e8e0e4d02d?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Champagne", "hex": "#f7e7ce"},
    {"name": "Blush", "hex": "#ffd7d7"},
    {"name": "Black", "hex": "#000000"}
  ]'::jsonb,
  '[
    {"size": "XS", "inStock": true},
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true}
  ]'::jsonb,
  80
),
(
  'Cashmere Sleep Set',
  'cashmere-sleep-set',
  'Ultra-soft cashmere blend sleep set. Indulge in unparalleled luxury with our cashmere sleep set. Made from the finest cashmere blend, this set offers exceptional softness and warmth.',
  398.00,
  'pajamas',
  '70% Cashmere, 30% Silk',
  true,
  'https://images.unsplash.com/photo-1596999595529-0267e30d5d93?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596999595529-0267e30d5d93?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Ivory", "hex": "#fafaf9"},
    {"name": "Camel", "hex": "#c19a6b"},
    {"name": "Charcoal", "hex": "#2d2d2d"}
  ]'::jsonb,
  '[
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": false}
  ]'::jsonb,
  45
),
(
  'Linen Lounge Robe',
  'linen-lounge-robe',
  'Lightweight linen robe perfect for warmer months. Stay cool and comfortable in our breathable linen lounge robe. Perfect for warmer weather, this robe features a relaxed fit.',
  168.00,
  'robes',
  '100% European Linen',
  false,
  'https://images.unsplash.com/photo-1564257577-7e83718d2a02?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564257577-7e83718d2a02?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "White", "hex": "#ffffff"},
    {"name": "Natural", "hex": "#e8e0d5"},
    {"name": "Stone", "hex": "#a8a8a8"}
  ]'::jsonb,
  '[
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": true}
  ]'::jsonb,
  90
),
(
  'Velvet Pajama Set',
  'velvet-pajama-set',
  'Luxurious velvet pajama set for ultimate comfort. Wrap yourself in luxury with our sumptuous velvet pajama set. The rich, plush fabric and relaxed silhouette create the perfect combination.',
  218.00,
  'pajamas',
  'Premium Velvet, Satin trim',
  false,
  'https://images.unsplash.com/photo-1578112010316-b44c50d27b2b?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578112010316-b44c50d27b2b?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Navy", "hex": "#1e293b"},
    {"name": "Burgundy", "hex": "#7b2240"},
    {"name": "Forest", "hex": "#2d5016"}
  ]'::jsonb,
  '[
    {"size": "XS", "inStock": true},
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true}
  ]'::jsonb,
  65
),
(
  'Modal Sleep Shirt',
  'modal-sleep-shirt',
  'Soft modal sleep shirt with mother of pearl buttons. Experience the silky-soft comfort of our modal sleep shirt. Featuring genuine mother of pearl buttons and a relaxed fit.',
  88.00,
  'nightgowns',
  '95% Modal, 5% Spandex, Mother of pearl buttons',
  false,
  'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "White", "hex": "#ffffff"},
    {"name": "Blush", "hex": "#ffd7d7"},
    {"name": "Lavender", "hex": "#e6d5e8"}
  ]'::jsonb,
  '[
    {"size": "XS", "inStock": true},
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": true}
  ]'::jsonb,
  120
),
(
  'Silk Eye Mask & Scrunchie Set',
  'silk-eye-mask-scrunchie-set',
  'Pure silk eye mask and scrunchie set. Complete your beauty sleep routine with our silk accessories set. The eye mask blocks out light while being gentle on your skin.',
  48.00,
  'accessories',
  '100% Mulberry Silk, 22 Momme',
  true,
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2400&auto=format&fit=crop&sat=-100',
  '[
    {"name": "Champagne", "hex": "#f7e7ce"},
    {"name": "Navy", "hex": "#1e293b"},
    {"name": "Rose", "hex": "#ffc0cb"}
  ]'::jsonb,
  '[
    {"size": "One Size", "inStock": true}
  ]'::jsonb,
  200
);
