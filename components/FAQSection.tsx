'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long does one bottle last?',
    answer: 'Each bottle contains 30 servings. Taking one serving daily, a bottle will last exactly one month.',
  },
  {
    question: 'Are there any side effects?',
    answer: 'Supercharged is made from 100% natural ingredients and is generally well-tolerated. However, consult your healthcare provider if you have specific medical conditions.',
  },
  {
    question: 'When should I take Supercharged?',
    answer: 'For best results, take 30-60 minutes before your workout or when you need sustained energy. Can be taken with or without food.',
  },
  {
    question: 'Is it suitable for vegetarians and vegans?',
    answer: 'Yes! Supercharged is 100% plant-based and suitable for both vegetarians and vegans.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold uppercase mb-4 text-gradient">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Supercharged
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm card-hover overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <HelpCircle className="w-6 h-6 text-[#22c55e]" />
                    <h3 className="text-lg font-bold text-[#004d26]">{faq.question}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#004d26] transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed ml-10">
                      {faq.answer}
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