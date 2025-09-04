'use client';

import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Plant-Based Energy',
    excerpt: 'Discover how natural ingredients provide sustained energy without the crash.',
    category: 'Nutrition',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: '5 Benefits of Seabuckthorn for Athletes',
    excerpt: 'Learn why this superfruit is becoming a favorite among fitness enthusiasts.',
    category: 'Ingredients',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    date: '2024-01-10',
  },
  {
    id: 3,
    title: 'Pre-Workout Nutrition: Natural vs Synthetic',
    excerpt: 'A comprehensive comparison of natural and synthetic pre-workout supplements.',
    category: 'Fitness',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    date: '2024-01-05',
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="section-container py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold uppercase mb-4 text-gradient">
            WELLNESS INSIGHTS
          </h1>
          <p className="text-xl text-gray-600">
            Expert advice on plant-based nutrition and natural wellness
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}