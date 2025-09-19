'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, ShoppingCart, Eye, Filter, Search } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  category: string;
  subcategory: string;
  brand?: string;
  images: ProductImage[];
  basePrice: number;
  costPrice: number;
  salePrice?: number;
  currency: string;
  inventory: {
    stock: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
  };
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  tags?: string[];
  weight?: number;
  reviews?: {
    averageRating: number;
    totalReviews: number;
  };
  analytics?: {
    views: number;
    purchases: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, searchTerm, selectedCategory, sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sortBy,
        sortOrder,
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(
        `${apiUrl}/products?${params}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: ProductsResponse = await response.json();
      setProducts(data.data.products);
      setTotalPages(data.data.pagination.totalPages);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/categories`
      );

      if (response.ok) {
        const data = await response.json();
        const categoryNames = data.data.categories.map((cat: any) => cat._id);
        setCategories(categoryNames);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const getPrimaryImage = (images: ProductImage[]) => {
    const primaryImage = images.find(img => img.isPrimary);
    return primaryImage || images[0];
  };

  const formatPrice = (price: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading && products.length === 0) {
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

  if (error) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="section-container py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34a] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004d26] to-[#22c55e] text-white py-16">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90">
            Discover our premium collection of wellness products
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-[#22c55e]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#22c55e] text-white rounded-r-lg hover:bg-[#1ea34a] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#22c55e]"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                handleSortChange(newSortBy, newSortOrder);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#22c55e]"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="basePrice-asc">Price: Low to High</option>
              <option value="basePrice-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h2>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {products.map((product) => {
                const primaryImage = getPrimaryImage(product.images);
                const displayPrice = product.salePrice || product.basePrice;
                const hasDiscount = product.salePrice && product.salePrice < product.basePrice;

                return (
                  <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-square">
                      {primaryImage && (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-cover"
                        />
                      )}
                      {hasDiscount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          SALE
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-4 right-4 bg-[#d4af37] text-white px-2 py-1 rounded-full text-sm font-semibold">
                          FEATURED
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-sm text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.shortDescription || product.description}
                      </p>

                      {/* Rating */}
                      {product.reviews && product.reviews.totalReviews > 0 && (
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.reviews!.averageRating)
                                    ? 'text-[#d4af37] fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            ({product.reviews.totalReviews})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[#004d26]">
                            {formatPrice(displayPrice, product.currency)}
                          </span>
                          {hasDiscount && (
                            <span className="text-lg text-gray-500 line-through">
                              {formatPrice(product.basePrice, product.currency)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mb-4">
                        {product.inventory.stock > 0 ? (
                          <span className="text-sm text-green-600 font-semibold">
                            In Stock ({product.inventory.stock} available)
                          </span>
                        ) : (
                          <span className="text-sm text-red-600 font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 bg-[#22c55e] text-white px-4 py-2 rounded-lg hover:bg-[#1ea34a] transition-colors text-center font-semibold"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => {
                            // Add to cart functionality
                            console.log('Add to cart:', product._id);
                          }}
                          className="px-4 py-2 border border-[#22c55e] text-[#22c55e] rounded-lg hover:bg-[#22c55e] hover:text-white transition-colors"
                          disabled={product.inventory.stock === 0}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#22c55e] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}