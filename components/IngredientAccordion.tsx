'use client';

import { useState } from 'react';
import { ChevronDown, Leaf } from 'lucide-react';

const ingredients = [
  {
    name: 'Seabuckthorn',
    benefits: 'Skin Health • Heart Support • Immune Boost',
    description: 'Rich in vitamins C and E, omega fatty acids, and antioxidants. Supports skin health, cardiovascular function, and immune system strength.',
  },
  {
    name: 'Moringa',
    benefits: 'Superfood Vitamins • Energy • Antioxidants',
    description: 'Known as the "miracle tree," moringa provides essential amino acids, vitamins, and minerals for sustained energy and overall wellness.',
  },
  {
    name: 'Ashwagandha',
    benefits: 'Stress Relief • Stamina • Adaptogen',
    description: 'Ancient adaptogenic herb that helps reduce stress, improve stamina, and support the body\'s natural response to physical and mental challenges.',
  },
  {
    name: 'Beetroot',
    benefits: 'Stamina • Heart Health • Nitric Oxide',
    description: 'Natural source of nitrates that support cardiovascular health, improve blood flow, and enhance exercise performance and endurance.',
  },
  {
    name: 'Spirulina',
    benefits: 'Protein • B-Vitamins • Iron',
    description: 'Blue-green algae packed with complete protein, B-vitamins, and iron for energy production and muscle recovery.',
  },
  {
    name: 'Avocado Extract',
    benefits: 'Healthy Fats • Vitamin K • Fiber',
    description: 'Provides healthy monounsaturated fats and nutrients that support nutrient absorption and sustained energy release.',
  },
];

export default function IngredientAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold uppercase mb-4 text-gradient">
              PREMIUM INGREDIENTS
            </h2>
            <p className="text-xl text-gray-600">
              8 science-backed superfoods for optimal wellness
            </p>
          </div>

          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div 
                key={index}
                className="bg-gradient-light-bg rounded-2xl overflow-hidden card-hover"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#004d26] rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#004d26]">{ingredient.name}</h3>
                      <p className="text-[#22c55e] text-sm font-semibold">{ingredient.benefits}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#004d26] transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed ml-16">
                      {ingredient.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}