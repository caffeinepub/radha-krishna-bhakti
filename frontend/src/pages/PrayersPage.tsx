import { prayers } from '../content/prayers';
import FavoriteButton from '../components/FavoriteButton';
import { useGetFavorites } from '../hooks/useFavorites';
import QueryState from '../components/QueryState';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function PrayersPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: favorites, isLoading, isError, error } = useGetFavorites();

  const favoritePrayerIds = new Set(favorites?.prayers || []);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Devotional Prayers
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with the divine through sacred mantras and prayers
            </p>
          </div>

          <QueryState
            isLoading={isAuthenticated && isLoading}
            isError={isAuthenticated && isError}
            error={error}
          >
            <div className="space-y-8">
              {prayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border hover:shadow-devotional transition-all animate-fade-in"
                >
                  <div className="flex gap-4 mb-4">
                    <h2 className="flex-1 text-2xl font-serif font-semibold text-primary">
                      {prayer.title}
                    </h2>
                    <div className="flex-shrink-0">
                      <FavoriteButton
                        id={prayer.id}
                        type="prayer"
                        isFavorited={favoritePrayerIds.has(prayer.id)}
                      />
                    </div>
                  </div>
                  <div className="text-foreground/90 whitespace-pre-line leading-relaxed">
                    {prayer.text}
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
