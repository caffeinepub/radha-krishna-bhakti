import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useFavoriteQuote, useFavoritePrayer } from '../hooks/useFavorites';
import SignInPromptDialog from './SignInPromptDialog';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  id: string;
  type: 'quote' | 'prayer';
  isFavorited: boolean;
}

export default function FavoriteButton({ id, type, isFavorited }: FavoriteButtonProps) {
  const { identity } = useInternetIdentity();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const isAuthenticated = !!identity;

  const { addQuote, removeQuote, isAddingQuote, isRemovingQuote } = useFavoriteQuote();
  const { addPrayer, removePrayer, isAddingPrayer, isRemovingPrayer } = useFavoritePrayer();

  const isLoading =
    type === 'quote'
      ? isAddingQuote || isRemovingQuote
      : isAddingPrayer || isRemovingPrayer;

  const handleClick = async () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    try {
      if (isFavorited) {
        if (type === 'quote') {
          await removeQuote(id);
          toast.success('Removed from favorites');
        } else {
          await removePrayer(id);
          toast.success('Removed from favorites');
        }
      } else {
        if (type === 'quote') {
          await addQuote(id);
          toast.success('Added to favorites');
        } else {
          await addPrayer(id);
          toast.success('Added to favorites');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update favorites');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`p-2 rounded-full transition-all ${
          isFavorited
            ? 'text-primary bg-primary/10 hover:bg-primary/20'
            : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={20}
          className={`transition-all ${isLoading ? 'animate-pulse' : ''}`}
          fill={isFavorited ? 'currentColor' : 'none'}
        />
      </button>
      <SignInPromptDialog open={showSignInPrompt} onOpenChange={setShowSignInPrompt} />
    </>
  );
}
