import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ScallopedDivider } from '@/components/ScallopedDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  const heroRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const menuRef = useScrollReveal();

  const heroImage =
    '/images/714184576_122100606669347192_2241053203693255898_n.jpg';
  const featuredImage =
    '/images/712623579_122100606657347192_4874021295777789728_n.jpg';

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef.ref}
        className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div
              className={`transition-all duration-700 ${
                heroRef.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="mb-6">
                <p className="text-dusty-rose text-sm md:text-base font-semibold tracking-widest mb-4">
                  WELCOME TO SUGARCLOUD
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-deep-mauve mb-6 leading-tight">
                  Homemade Cookies,
                  <span className="text-dusty-rose"> Baked with Love</span>
                </h1>
              </div>
              <p className="text-lg text-deep-mauve/80 mb-8 leading-relaxed max-w-lg">
                Every cookie is crafted with premium ingredients and care. From our kitchen to your table, experience the warmth of artisanal baking.
              </p>
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-dusty-rose hover:bg-deep-mauve text-warm-cream px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-xl text-lg"
              >
                Order Now
              </button>
            </div>

            {/* Right: Hero Image */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroRef.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Sugarcloud Cookies"
                  className="w-full rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalloped Divider */}
      <ScallopedDivider color="#F3E5E7" position="bottom" />

      {/* Featured Products Section */}
      <section className="py-20 md:py-32 bg-blush-pink relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div
            ref={menuRef.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              menuRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-dusty-rose text-sm md:text-base font-semibold tracking-widest mb-4">
              OUR SPECIALTIES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-mauve mb-6">
              Featured Collections
            </h2>
            <p className="text-lg text-deep-mauve/70 max-w-2xl mx-auto">
              Discover our signature cookie varieties, each crafted with passion and the finest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProductCard
              name="Classic Chocolate Chip"
              description="Crisp edges, soft center, loaded with rich chocolate chunks."
              image="/images/710299364_122098655451347192_8853350640011998274_n.jpg"
              price="₱25 each"
            />
            <ProductCard
              name="Midnight Cloud"
              description="Deep, chocolatey goodness with a perfectly crackly top."
              image="/images/711135976_122098655463347192_8560571763386060133_n.jpg"
              price="₱35 each"
            />
            <ProductCard
              name="Assorted Delight"
              description="A perfect mix of flavors and textures in every bite."
              image="/images/710299364_122098655451347192_8853350640011998274_n.jpg"
              price="₱30 each"
            />
          </div>
        </div>
      </section>

      {/* Scalloped Divider */}
      <ScallopedDivider color="#FCF7F8" position="bottom" />

      {/* Menu & Pricing Section */}
      <section id="menu" className="py-20 md:py-32 bg-warm-cream">
        <div className="container max-w-4xl mx-auto px-4">
          <div
            ref={aboutRef.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              aboutRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-deep-mauve mb-6">
              Menu & Pricing
            </h2>
            <p className="text-lg text-deep-mauve/70">
              Choose your favorite box and enjoy fresh, homemade cookies delivered to you.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sugarcloud Classic */}
            <div className="bg-gradient-to-br from-blush-pink to-warm-cream p-8 rounded-2xl border-2 border-dusty-rose/20 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-deep-mauve mb-4">
                Sugarcloud Classic
              </h3>
              <p className="text-dusty-rose mb-6 font-medium">
                Chocolate Chip Cookie
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">4 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱95.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">6 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱145.00
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-dusty-rose hover:bg-deep-mauve text-warm-cream py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Order Now
              </button>
            </div>

            {/* Midnight Cloud */}
            <div className="bg-gradient-to-br from-blush-pink to-warm-cream p-8 rounded-2xl border-2 border-dusty-rose/20 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-deep-mauve mb-4">
                Midnight Cloud
              </h3>
              <p className="text-dusty-rose mb-6 font-medium">Brownie Cookie</p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">4 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱135.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">6 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱200.00
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-dusty-rose hover:bg-deep-mauve text-warm-cream py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Order Now
              </button>
            </div>

            {/* Assorted */}
            <div className="bg-gradient-to-br from-blush-pink to-warm-cream p-8 rounded-2xl border-2 border-dusty-rose/20 hover:shadow-lg transition-all duration-300 md:col-span-2">
              <h3 className="text-2xl font-bold text-deep-mauve mb-4">
                Assorted Box
              </h3>
              <p className="text-dusty-rose mb-6 font-medium">
                Mix of all flavors
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">4 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱120.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-deep-mauve">6 pieces</span>
                  <span className="text-xl font-bold text-cookie-brown">
                    ₱210.00
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-dusty-rose hover:bg-deep-mauve text-warm-cream py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-blush-pink">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-deep-mauve mb-8">
              About Sugarcloud
            </h2>
            <p className="text-lg text-deep-mauve/80 leading-relaxed mb-6">
              Sugarcloud co. was born from a passion for baking and a love for sharing homemade treats with those we care about. Every cookie is handcrafted in small batches using only the finest ingredients—no shortcuts, no compromises.
            </p>
            <p className="text-lg text-deep-mauve/80 leading-relaxed">
              We believe that the best cookies are made with love, butter, and a little bit of magic. Whether you're celebrating a special moment or simply treating yourself, Sugarcloud cookies bring warmth and joy to every occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-deep-mauve text-warm-cream py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sugarcloud co.</h3>
              <p className="text-warm-cream/80 mb-6">
                Homemade cookies, baked with love.
              </p>
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61590415774229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-warm-cream/20 hover:bg-dusty-rose transition-all duration-200 rounded-full flex items-center justify-center"
                  title="Follow us on Facebook"
                >
                  <svg
                    className="w-5 h-5 fill-warm-cream"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sugarcloud.cookie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-warm-cream/20 hover:bg-dusty-rose transition-all duration-200 rounded-full flex items-center justify-center"
                  title="Follow us on Instagram"
                >
                  <svg
                    className="w-5 h-5 fill-warm-cream"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.79.263-1.473.557-2.115 1.194-.643.642-.94 1.33-1.2 2.11-.266.79-.47 1.66-.53 2.94C.064 8.327 0 8.74 0 12s.015 3.673.072 4.947c.06 1.277.261 2.148.528 2.913.263.788.555 1.472 1.2 2.11.645.645 1.33.957 2.11 1.2.763.266 1.636.477 2.913.529C8.333 23.986 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.913-.528.788-.263 1.472-.555 2.11-1.2.645-.645.957-1.33 1.2-2.11.266-.763.477-1.636.529-2.913.058-1.273.072-1.687.072-4.947s-.015-3.673-.072-4.947c-.06-1.277-.261-2.148-.528-2.913-.263-.788-.555-1.472-1.2-2.11C21.557 1.406 20.873 1.104 20.1.84c-.763-.266-1.636-.477-2.913-.529C15.667.064 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.561.217.96.477 1.382.896.419.42.679.821.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.645.07 4.849 0 3.203-.009 3.585-.07 4.849-.054 1.171-.244 1.805-.408 2.227-.217.561-.477.96-.896 1.382-.42.419-.821.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.645.07-4.849.07-3.203 0-3.585-.009-4.849-.07-1.171-.054-1.805-.244-2.227-.408-.561-.217-.96-.477-1.382-.896-.419-.42-.679-.821-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.645-.07-4.849 0-3.203.009-3.585.07-4.849.054-1.171.244-1.805.408-2.227.217-.561.477-.96.896-1.382.42-.419.821-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.645-.07 4.849-.07zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-warm-cream/80">
                <li>
                  <a href="#menu" className="hover:text-warm-cream transition">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-warm-cream transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-warm-cream transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-warm-cream/80 mb-2">Facebook: sugarcloud co.</p>
              <p className="text-warm-cream/80 mb-2">Facebook: Joris Dianne Ferrer Pinoon</p>
              <p className="text-warm-cream/80">Phone: +63 (XXX) XXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-warm-cream/20 pt-8 text-center text-warm-cream/60">
            <p>
              &copy; 2026 Sugarcloud co. All rights reserved. Baked with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
