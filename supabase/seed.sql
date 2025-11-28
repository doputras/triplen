-- Seed data for products table
-- Run this after schema.sql to populate the database with luxury pajamas
-- Images are optimized for 3:4 aspect ratio display

INSERT INTO public.products (name, slug, description, price, material, featured, image_url, hover_image_url, colors, sizes, stock) VALUES
(
  'Cotton Pajama Set',
  'cotton-pajama-set',
  'Premium long-sleeve cotton pajama set with piping detail. Experience comfort like never before with our premium cotton pajama set. Crafted from breathable, long-staple cotton with elegant piping details.',
  148.00,
  '100% Long-staple Cotton, Contrast piping',
  true,
  'https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
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
  'Cashmere Sleep Set',
  'cashmere-sleep-set',
  'Ultra-soft cashmere blend sleep set. Indulge in unparalleled luxury with our cashmere sleep set. Made from the finest cashmere blend, this set offers exceptional softness and warmth.',
  398.00,
  '70% Cashmere, 30% Silk',
  true,
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
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
  'Velvet Pajama Set',
  'velvet-pajama-set',
  'Luxurious velvet pajama set for ultimate comfort. Wrap yourself in luxury with our sumptuous velvet pajama set. The rich, plush fabric and relaxed silhouette create the perfect combination.',
  218.00,
  'Premium Velvet, Satin trim',
  true,
  'https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b4?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b4?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
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
  'Silk Pajama Set',
  'silk-pajama-set',
  'Pure mulberry silk pajama set with mother of pearl buttons. Experience the ultimate in luxury with our signature silk pajama set, featuring hand-finished details and a timeless silhouette.',
  328.00,
  '100% Mulberry Silk, 22 Momme',
  true,
  'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
  '[
    {"name": "Champagne", "hex": "#f7e7ce"},
    {"name": "Navy", "hex": "#1e293b"},
    {"name": "Blush", "hex": "#ffd7d7"}
  ]'::jsonb,
  '[
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": true}
  ]'::jsonb,
  80
),
(
  'Linen Pajama Set',
  'linen-pajama-set',
  'Lightweight European linen pajama set perfect for warmer months. Stay cool and comfortable in our breathable linen pajamas. Features a relaxed fit and artisanal stonewash finish.',
  178.00,
  '100% European Linen',
  false,
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
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
  'Modal Sleep Set',
  'modal-sleep-set',
  'Silky-soft modal pajama set with contrast piping. Experience cloud-like comfort with our modal blend fabric that drapes beautifully and feels incredibly soft against your skin.',
  138.00,
  '95% Modal, 5% Spandex',
  false,
  'https://images.unsplash.com/photo-1612902456551-404b6539525e?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1612902456551-404b6539525e?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
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
  'Bamboo Pajama Set',
  'bamboo-pajama-set',
  'Eco-friendly bamboo viscose pajama set. Ultra-soft and naturally temperature regulating, our bamboo pajamas are perfect for year-round comfort with sustainable materials.',
  168.00,
  '100% Bamboo Viscose',
  false,
  'https://images.unsplash.com/photo-1613399054378-4f0e0f3cc817?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613399054378-4f0e0f3cc817?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
  '[
    {"name": "Eucalyptus", "hex": "#c8d5b9"},
    {"name": "Oatmeal", "hex": "#d6cfc4"},
    {"name": "Slate", "hex": "#6b7280"}
  ]'::jsonb,
  '[
    {"size": "XS", "inStock": true},
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": false}
  ]'::jsonb,
  95
),
(
  'Flannel Pajama Set',
  'flannel-pajama-set',
  'Cozy brushed flannel pajama set for cold nights. Made from premium brushed cotton flannel, these pajamas offer warmth and comfort during the cooler months.',
  128.00,
  '100% Brushed Cotton Flannel',
  false,
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&h=1067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&h=1067&auto=format&fit=crop&sat=-50',
  '[
    {"name": "Navy Plaid", "hex": "#1e293b"},
    {"name": "Burgundy Plaid", "hex": "#7b2240"},
    {"name": "Forest Plaid", "hex": "#2d5016"}
  ]'::jsonb,
  '[
    {"size": "S", "inStock": true},
    {"size": "M", "inStock": true},
    {"size": "L", "inStock": true},
    {"size": "XL", "inStock": true},
    {"size": "XXL", "inStock": true}
  ]'::jsonb,
  110
);
