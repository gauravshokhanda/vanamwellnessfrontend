'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle
} from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  author?: {
    _id: string;
    name?: {
      first: string;
      last: string;
    };
    avatar?: string;
    bio?: string;
  };
  createdAt: string;
  publishedAt?: string;
  readingTime?: number;
  views?: number;
  likes?: number;
  status: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface BlogDetailResponse {
  success: boolean;
  data: {
    blog: BlogPost;
    relatedBlogs: BlogPost[];
  };
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError('Blog not found');
        } else {
          throw new Error('Failed to fetch blog');
        }
        return;
      }

      const data: BlogDetailResponse = await response.json();
      setBlog(data.data.blog);
      setRelatedBlogs(data.data.relatedBlogs || []);
      setLikesCount(data.data.blog.likes || 0);
    } catch (err) {
      setError('Failed to load blog. Please try again later.');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!blog) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blog._id}/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like'
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLikesCount(data.data.likesCount);
        setLiked(!liked);
      }
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const formatContent = (content: string) => {
    // Simple content formatting - you might want to use a proper markdown parser
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="section-container py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {error === 'Blog not found' ? 'Blog Not Found' : 'Error Loading Blog'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error === 'Blog not found' 
                ? 'The blog you are looking for does not exist or has been removed.'
                : 'There was an error loading the blog. Please try again later.'
              }
            </p>
            <div className="space-x-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              <Link
                href="/blogs"
                className="px-6 py-3 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34a] transition-colors inline-block"
              >
                View All Blogs
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const displayDate = blog.publishedAt || blog.createdAt;
  const authorName = blog.author?.name 
    ? `${blog.author.name.first} ${blog.author.name.last}`.trim()
    : 'Anonymous';

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Blog Header */}
      <article className="section-container py-12">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-[#22c55e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </button>
        </div>

        {/* Blog Header */}
        <header className="mb-12">
          {blog.category && (
            <div className="mb-4">
              <span className="bg-[#22c55e]/10 text-[#004d26] px-4 py-2 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#004d26] mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(displayDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            {blog.readingTime && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{blog.readingTime} min read</span>
              </div>
            )}
            {blog.views && (
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                <span>{blog.views} views</span>
              </div>
            )}
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                liked 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 mr-2">Share:</span>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-12">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <Image
                src={blog.featuredImage.url}
                alt={blog.featuredImage.alt}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {blog.featuredImage.caption && (
              <p className="text-center text-gray-500 text-sm mt-4 italic">
                {blog.featuredImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed">
            {formatContent(blog.content)}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {blog.author?.bio && (
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              {blog.author.avatar && (
                <Image
                  src={blog.author.avatar}
                  alt={authorName}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {authorName}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {blog.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center text-[#004d26] mb-12">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                <BlogCard key={relatedBlog._id} post={relatedBlog} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blogs"
                className="inline-flex items-center px-6 py-3 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34a] transition-colors"
              >
                View All Blogs
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}