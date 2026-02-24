import { quotes } from '../content/quotes';
import FavoriteButton from '../components/FavoriteButton';
import { useGetFavorites } from '../hooks/useFavorites';
import QueryState from '../components/QueryState';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function QuotesPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: favorites, isLoading, isError, error } = useGetFavorites();

  const favoriteQuoteIds = new Set(favorites?.quotes || []);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Sacred Quotes
            </h1>
            <p className="text-lg text-muted-foreground">
              Timeless wisdom from the Bhagavad Gita and devotional teachings
            </p>
          </div>

          <QueryState
            isLoading={isAuthenticated && isLoading}
            isError={isAuthenticated && isError}
            error={error}
          >
            <div className="space-y-6">
              {quotes.map((quote) => (
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
                      <FavoriteButton
                        id={quote.id}
                        type="quote"
                        isFavorited={favoriteQuoteIds.has(quote.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </div>
    </div>
  );
}
