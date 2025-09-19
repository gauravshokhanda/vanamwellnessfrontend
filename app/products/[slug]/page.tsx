'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, ArrowLeft } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface NutritionInfo {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  nutrients: {
    name: string;
    amount: string;
    dailyValue?: string;
  }[];
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
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  nutritionInfo?: NutritionInfo;
  ingredients?: string[];
  directions?: string;
  warnings?: string[];
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

interface ProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(
        `${apiUrl}/products/${slug}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError('Product not found');
        } else {
          throw new Error('Failed to fetch product');
        }
        return;
      }

      const data: ProductResponse = await response.json();
      const product = data.data?.product || (data as any).product || data;
      setProduct(product);

      // Track product view
      if (product._id) {
        trackProductView(product._id);
      }
    } catch (err) {
      setError('Failed to load product. Please try again later.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const trackProductView = async (productId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/view`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Error tracking product view:', err);
    }
  };

  const formatPrice = (price: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.inventory.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add to cart logic here
    console.log('Adding to cart:', {
      productId: product._id,
      quantity,
      price: product.salePrice || product.basePrice,
    });

    // Show success message or redirect to cart
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    // Direct checkout logic here
    console.log('Buy now:', {
      productId: product._id,
      quantity,
      price: product.salePrice || product.basePrice,
    });

    // Redirect to checkout
    router.push(`/checkout?product=${product._id}&quantity=${quantity}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.shortDescription || product?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
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

  if (error || !product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="section-container py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {error === 'Product not found' ? 'Product Not Found' : 'Error Loading Product'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error === 'Product not found' 
                ? 'The product you are looking for does not exist or has been removed.'
                : error
              }
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <Link
                href="/products"
                className="px-6 py-3 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34a] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const displayPrice = product.salePrice || product.basePrice;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="section-container py-4 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#22c55e]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#22c55e]">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-[#22c55e]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {product.images[selectedImageIndex] && (
                <Image
                  src={product.images[selectedImageIndex].url}
                  alt={product.images[selectedImageIndex].alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-[#22c55e]' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category and Brand */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
              {product.brand && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                </>
              )}
              {product.featured && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm bg-[#d4af37] text-white px-2 py-1 rounded-full">
                    FEATURED
                  </span>
                </>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviews && product.reviews.totalReviews > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.reviews!.averageRating)
                          ? 'text-[#d4af37] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.reviews.averageRating.toFixed(1)} ({product.reviews.totalReviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#004d26]">
                  {formatPrice(displayPrice, product.currency)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.basePrice, product.currency)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-gray-700 text-lg">
                {product.shortDescription}
              </p>
            )}

            {/* Stock Status */}
            <div>
              {product.inventory.stock > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-semibold">
                    In Stock ({product.inventory.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inventory.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.inventory.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.inventory.stock === 0}
                className="flex-1 bg-[#22c55e] text-white px-6 py-3 rounded-lg hover:bg-[#1ea34a] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.inventory.stock === 0}
                className="flex-1 bg-[#004d26] text-white px-6 py-3 rounded-lg hover:bg-[#003d1f] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="w-5 h-5 text-[#22c55e]" />
                <span>Free delivery on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <RotateCcw className="w-5 h-5 text-[#22c55e]" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="w-5 h-5 text-[#22c55e]" />
                <span>100% authentic products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-[#22c55e] text-[#22c55e] font-semibold">
                Description
              </button>
            </div>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.directions && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Directions</h3>
                  <p>{product.directions}</p>
                </div>
              )}

              {product.warnings && product.warnings.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Warnings</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-600">
                    {product.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.nutritionInfo && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Nutrition Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Serving Size:</strong> {product.nutritionInfo.servingSize}</p>
                    <p><strong>Servings Per Container:</strong> {product.nutritionInfo.servingsPerContainer}</p>
                    <p><strong>Calories:</strong> {product.nutritionInfo.calories}</p>
                    
                    {product.nutritionInfo.nutrients.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Nutrients:</h4>
                        <div className="space-y-1">
                          {product.nutritionInfo.nutrients.map((nutrient, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{nutrient.name}</span>
                              <span>
                                {nutrient.amount}
                                {nutrient.dailyValue && ` (${nutrient.dailyValue} DV)`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}