import { useGetFavorites } from '../hooks/useFavorites';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { quotes } from '../content/quotes';
import { prayers } from '../content/prayers';
import FavoriteButton from '../components/FavoriteButton';
import QueryState from '../components/QueryState';
import { Heart, LogIn } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function FavoritesPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: favorites, isLoading, isError, error } = useGetFavorites();

  const favoriteQuotes = quotes.filter((q) => favorites?.quotes.includes(q.id));
  const favoritePrayers = prayers.filter((p) => favorites?.prayers.includes(p.id));
  const hasNoFavorites = favoriteQuotes.length === 0 && favoritePrayers.length === 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Heart className="mx-auto text-primary" size={64} />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to save and access your favorite quotes and prayers from any device.
            </p>
            <button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-devotional disabled:opacity-50"
            >
              <LogIn size={20} />
              {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal collection of sacred quotes and prayers
            </p>
          </div>

          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEmpty={hasNoFavorites && !isLoading}
            emptyMessage="You haven't added any favorites yet"
          >
            <div className="space-y-12">
              {favoriteQuotes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif font-semibold text-primary mb-6 flex items-center gap-2">
                    <Heart size={24} className="fill-current" />
                    Favorite Quotes ({favoriteQuotes.length})
                  </h2>
                  <div className="space-y-6">
                    {favoriteQuotes.map((quote) => (
                      <div
                        key={quote.id}
                        className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border hover:shadow-devotional transition-all animate-fade-in"
                      >
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <blockquote className="text-lg md:text-xl text-foreground/90 mb-3 italic">
                              "{quote.text}"
                            </blockquote>
                            {quote.author && (
                              <p className="text-sm text-muted-foreground">— {quote.author}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <FavoriteButton id={quote.id} type="quote" isFavorited={true} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {favoritePrayers.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif font-semibold text-primary mb-6 flex items-center gap-2">
                    <Heart size={24} className="fill-current" />
                    Favorite Prayers ({favoritePrayers.length})
                  </h2>
                  <div className="space-y-8">
                    {favoritePrayers.map((prayer) => (
                      <div
                        key={prayer.id}
                        className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border hover:shadow-devotional transition-all animate-fade-in"
                      >
                        <div className="flex gap-4 mb-4">
                          <h3 className="flex-1 text-2xl font-serif font-semibold text-primary">
                            {prayer.title}
                          </h3>
                          <div className="flex-shrink-0">
                            <FavoriteButton id={prayer.id} type="prayer" isFavorited={true} />
                          </div>
                        </div>
                        <div className="text-foreground/90 whitespace-pre-line leading-relaxed">
                          {prayer.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {hasNoFavorites && (
                <div className="text-center py-12 space-y-4">
                  <p className="text-lg text-muted-foreground">
                    Start building your collection by exploring our{' '}
                    <Link to="/quotes" className="text-primary hover:underline font-medium">
                      quotes
                    </Link>{' '}
                    and{' '}
                    <Link to="/prayers" className="text-primary hover:underline font-medium">
                      prayers
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </QueryState>
        </div>
      </div>
    </div>
  );
}
