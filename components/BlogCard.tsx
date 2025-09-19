'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, User, Eye } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  author?: {
    name?: {
      first: string;
      last: string;
    };
    avatar?: string;
  };
  createdAt: string;
  publishedAt?: string;
  readingTime?: number;
  views?: number;
  status: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const displayDate = post.publishedAt || post.createdAt;
  const authorName = post.author?.name 
    ? `${post.author.name.first} ${post.author.name.last}`.trim()
    : 'Anonymous';
  const imageUrl = post.featuredImage?.url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';
  const imageAlt = post.featuredImage?.alt || post.title;

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="aspect-video overflow-hidden">
        <Image 
          src={imageUrl}
          alt={imageAlt}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {post.category && (
            <span className="bg-[#22c55e]/10 text-[#004d26] px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          )}
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(displayDate).toLocaleDateString()}
          </div>
        </div>

        {/* Author and Reading Time */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {authorName}
          </div>
          {post.readingTime && (
            <span>{post.readingTime} min read</span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-[#004d26] mb-3 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer with views and read more */}
        <div className="flex items-center justify-between">
          <Link 
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center text-[#004d26] font-semibold hover:text-[#22c55e] transition-colors"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          
          {post.views && (
            <div className="flex items-center text-gray-500 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}