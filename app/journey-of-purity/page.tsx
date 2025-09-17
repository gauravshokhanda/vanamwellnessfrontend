import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import {
  Leaf,
  Zap,
  Heart,
  Shield,
  Sparkles,
  Droplets,
  Flame,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: 'Journey of Purity | Vanam Wellness',
  description: 'Discover our pure, natural ingredients sourced with care and extracted for maximum purity and effectiveness on your wellness journey.',
  keywords: 'pure ingredients, natural supplements, seabuckthorn, moringa, ashwagandha, wellness journey, purity, organic',
};

interface Ingredient {
  name: string;
  extract: string;
  amount: string;
  icon: React.ReactNode;
  benefits: string[];
  description: string;
}

const ingredients: Ingredient[] = [
  {
    name: "Seabuckthorn Extract",
    extract: "(10:1)",
    amount: "200 mg",
    icon: <Droplets className="w-8 h-8 text-orange-500" />,
    description: "Rich in omega-3, 6, 7, and 9 fatty acids.",
    benefits: [
      "Supports skin health",
      "Boosts immunity",
      "Helps in cardiovascular wellness",
    ],
  },
  {
    name: "Moringa Leaf Extract",
    extract: "(10:1)",
    amount: "200 mg",
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    description:
      "Superfood with vitamins A, C, E & minerals (calcium, iron, magnesium).",
    benefits: ["Supports energy", "Boosts immunity", "Aids detoxification"],
  },
  {
    name: "Ashwagandha Extract",
    extract: "(10:1)",
    amount: "150 mg",
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    description: "Ancient adaptogenic herb known for stress management.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Enhances mental clarity",
    ],
  },
  {
    name: "Beetroot Extract",
    extract: "(10:1)",
    amount: "180 mg",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    description:
      "Rich in nitrates and antioxidants for cardiovascular support.",
    benefits: [
      "Supports heart health",
      "Improves blood circulation",
      "Enhances exercise performance",
    ],
  },
  {
    name: "Avocado Extract",
    extract: "(10:1)",
    amount: "120 mg",
    icon: <Sparkles className="w-8 h-8 text-green-600" />,
    description: "Packed with healthy fats and essential nutrients.",
    benefits: [
      "Supports brain health",
      "Promotes healthy skin",
      "Aids nutrient absorption",
    ],
  },
  {
    name: "Quinoa Protein",
    extract: "(Concentrate)",
    amount: "250 mg",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    description: "Complete protein source with all essential amino acids.",
    benefits: [
      "Supports muscle health",
      "Provides sustained energy",
      "Aids in recovery",
    ],
  },
  {
    name: "Piperine Extract",
    extract: "(95%)",
    amount: "5 mg",
    icon: <Flame className="w-8 h-8 text-orange-600" />,
    description: "Black pepper extract that enhances nutrient absorption.",
    benefits: [
      "Improves bioavailability",
      "Enhances metabolism",
      "Supports digestion",
    ],
  },
  {
    name: "Spirulina Extract",
    extract: "(10:1)",
    amount: "100 mg",
    icon: <Star className="w-8 h-8 text-blue-500" />,
    description: "Blue-green algae superfood rich in protein and nutrients.",
    benefits: [
      "Boosts energy levels",
      "Supports immune system",
      "Rich in antioxidants",
    ],
  },
];

export default function IngredientsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-green-50 via-white to-green-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/purity-background.svg" 
              alt="Purity background" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 text-green-300">
              <Leaf className="w-full h-full" />
            </div>
            <div className="absolute top-32 right-20 w-16 h-16 text-green-200">
              <Leaf className="w-full h-full rotate-45" />
            </div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 text-green-300">
              <Leaf className="w-full h-full -rotate-12" />
            </div>
            <div className="absolute bottom-32 right-1/3 w-14 h-14 text-green-200">
              <Leaf className="w-full h-full rotate-90" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Journey of <span className="text-green-600">Purity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the pure, natural ingredients that power our wellness formula.
            </p>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-8">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            
            {/* Featured purity image */}
            <div className="flex justify-center items-center space-x-8 mt-12">
              <Image 
                src="/purity-leaf.svg" 
                alt="Pure natural leaf" 
                width={96}
                height={72}
                className="opacity-80"
              />
              <Image 
                src="/natural-elements.svg" 
                alt="Natural elements" 
                width={128}
                height={96}
                className="opacity-70"
              />
            </div>
          </div>
        </section>

      {/* Ingredients Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pure Ingredients, Pure Results
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each ingredient is sourced with care and extracted for maximum
              purity and effectiveness on your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingredients.map((ingredient, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                      {ingredient.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {ingredient.amount}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {ingredient.name}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {ingredient.extract}
                    </span>
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {ingredient.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      Benefits:
                    </h4>
                    <ul className="space-y-1">
                      {ingredient.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-24 h-24 text-amber-400">
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute top-20 right-16 w-20 h-20 text-orange-400">
            <Star className="w-full h-full" />
          </div>
          <div className="absolute bottom-16 left-1/4 w-16 h-16 text-amber-300">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute bottom-24 right-1/4 w-18 h-18 text-orange-300">
            <Zap className="w-full h-full" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Continue Your Journey of Purity
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the next step in your wellness journey with our pure, natural formula.
          </p>
          <Link
            href="/product"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
      </div>
      <Footer />
    </main>
  );
}
