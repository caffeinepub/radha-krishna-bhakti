import { Link } from '@tanstack/react-router';
import { Heart, BookOpen, Image, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/rk-hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary text-balance">
              Welcome to Radha Krishna Bhakti
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 text-balance">
              Immerse yourself in the divine love of Radha and Krishna. Explore sacred quotes,
              heartfelt prayers, and beautiful devotional art.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                to="/quotes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-devotional"
              >
                <BookOpen size={20} />
                Explore Quotes
              </Link>
              <Link
                to="/prayers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                <Sparkles size={20} />
                Read Prayers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-primary">
            Discover Divine Wisdom
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link
              to="/quotes"
              className="group bg-card rounded-xl p-8 shadow-sm hover:shadow-devotional transition-all border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Sacred Quotes
              </h3>
              <p className="text-muted-foreground">
                Discover timeless wisdom from the Bhagavad Gita and devotional teachings.
              </p>
            </Link>

            <Link
              to="/prayers"
              className="group bg-card rounded-xl p-8 shadow-sm hover:shadow-devotional transition-all border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Sparkles className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Devotional Prayers
              </h3>
              <p className="text-muted-foreground">
                Connect with the divine through beautiful prayers and mantras.
              </p>
            </Link>

            <Link
              to="/gallery"
              className="group bg-card rounded-xl p-8 shadow-sm hover:shadow-devotional transition-all border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4 group-hover:bg-secondary/40 transition-colors">
                <Image className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Sacred Gallery
              </h3>
              <p className="text-muted-foreground">
                View stunning devotional art celebrating Radha and Krishna.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/10">
            <Heart className="mx-auto text-primary" size={48} />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Save Your Favorites
            </h2>
            <p className="text-foreground/80">
              Sign in to create your personal collection of favorite quotes and prayers. Access
              them anytime, anywhere.
            </p>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-devotional"
            >
              <Heart size={20} />
              My Favorites
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
