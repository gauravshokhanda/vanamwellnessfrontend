'use client';

import { Quote, User } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  image: string;
  category: string;
}

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="aspect-video overflow-hidden">
        <img 
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <span className="bg-[#d4af37]/10 text-[#004d26] px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
          {story.category}
        </span>
        
        <h3 className="text-xl font-bold text-[#004d26] mb-3 leading-tight">
          {story.title}
        </h3>
        
        <div className="relative mb-4">
          <Quote className="w-8 h-8 text-[#d4af37] absolute -top-2 -left-2" />
          <p className="text-gray-600 leading-relaxed pl-6">
            {story.content}
          </p>
        </div>
        
        <div className="flex items-center text-gray-500">
          <User className="w-4 h-4 mr-2" />
          <span className="font-semibold">— {story.author}</span>
        </div>
      </div>
    </article>
  );
}