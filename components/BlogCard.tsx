'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="aspect-video overflow-hidden">
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-[#22c55e]/10 text-[#004d26] px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-[#004d26] mb-3 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/blogs/${post.id}`}
          className="inline-flex items-center text-[#004d26] font-semibold hover:text-[#22c55e] transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </article>
  );
}