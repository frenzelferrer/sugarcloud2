import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  price?: string;
  variant?: 'classic' | 'midnight' | 'assorted';
}

export function ProductCard({
  name,
  description,
  image,
  price,
  variant = 'classic',
}: ProductCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Circular Product Frame */}
        <div className="relative mb-6 w-48 h-48 md:w-56 md:h-56 group">
          <div className="absolute inset-0 rounded-full border-4 border-dusty-rose/30 bg-gradient-to-br from-blush-pink to-warm-cream shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
            <div className="absolute inset-4 rounded-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          {/* Decorative Heart Badge */}
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-dusty-rose rounded-full flex items-center justify-center text-warm-cream text-lg font-bold shadow-md">
            ♥
          </div>
        </div>

        {/* Product Info */}
        <h3 className="text-2xl md:text-3xl font-semibold text-deep-mauve mb-2">
          {name}
        </h3>
        <p className="text-sm md:text-base text-dusty-rose mb-4 max-w-xs">
          {description}
        </p>
        {price && (
          <p className="text-lg md:text-xl font-semibold text-cookie-brown">
            {price}
          </p>
        )}
      </div>
    </div>
  );
}
