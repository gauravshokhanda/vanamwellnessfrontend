"use client";

import { Shield, Brain, Heart, Zap } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Sustained Energy",
    description: "Natural caffeine and adaptogens provide clean, long-lasting energy without the crash"
  },
  {
    icon: Shield,
    title: "Immune Support", 
    description: "Packed with vitamins and antioxidants to strengthen your natural defenses"
  },
  {
    icon: Heart,
    title: "Heart Health",
    description: "Supports cardiovascular wellness with natural ingredients"
  },
  {
    icon: Brain,
    title: "Stress Relief",
    description: "Adaptogenic herbs help your body manage stress and maintain balance"
  }
];

export default function BenefitsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            WHY CHOOSE SUPERCHARGED?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of natural energy and wellness
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