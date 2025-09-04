'use client';

import { Zap, Shield, Heart, Brain } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'SUSTAINED ENERGY',
    description: 'Natural caffeine from plant sources provides clean energy without the jitters or crash.',
  },
  {
    icon: Shield,
    title: 'IMMUNE SUPPORT',
    description: 'Seabuckthorn and Moringa boost your immune system with powerful antioxidants.',
  },
  {
    icon: Heart,
    title: 'HEART HEALTH',
    description: 'Beetroot and natural nitrates support cardiovascular health and blood flow.',
  },
  {
    icon: Brain,
    title: 'STRESS RELIEF',
    description: 'Ashwagandha helps your body adapt to stress while maintaining peak performance.',
  },
];

export default function BenefitsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold uppercase mb-4 text-gradient">
            WHY CHOOSE SUPERCHARGED?
          </h2>
          <p className="text-xl text-gray-600">
            Science-backed ingredients for optimal performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-light-bg card-hover"
            >
              <div className="w-16 h-16 bg-[#004d26] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#004d26]">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}