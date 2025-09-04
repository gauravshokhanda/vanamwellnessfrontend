'use client';

import Navbar from '@/components/Navbar';
import StoryCard from '@/components/StoryCard';
import Footer from '@/components/Footer';

const stories = [
  {
    id: 1,
    title: 'Sarah\'s Marathon Success',
    content: 'How Supercharged helped me achieve my personal best in the Boston Marathon.',
    author: 'Sarah M.',
    image: 'https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg',
    category: 'Success Story',
  },
  {
    id: 2,
    title: 'From Fatigue to Energy',
    content: 'My journey from chronic fatigue to feeling energized every day.',
    author: 'Mike R.',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    category: 'Transformation',
  },
  {
    id: 3,
    title: 'Plant-Powered Performance',
    content: 'Why I switched from synthetic supplements to natural alternatives.',
    author: 'Jennifer L.',
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
    category: 'Lifestyle',
  },
];

export default function StoriesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="section-container py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold uppercase mb-4 text-gradient">
            SUCCESS STORIES
          </h1>
          <p className="text-xl text-gray-600">
            Real people, real results with plant-powered nutrition
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}