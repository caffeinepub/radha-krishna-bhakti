import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FavoriteId } from '../backend';

export function useGetFavorites() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<{ quotes: FavoriteId[]; prayers: FavoriteId[] }>({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getFavorites();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useFavoriteQuote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (quoteId: FavoriteId) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addFavoriteQuote(quoteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (quoteId: FavoriteId) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeFavoriteQuote(quoteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return {
    addQuote: addMutation.mutateAsync,
    removeQuote: removeMutation.mutateAsync,
    isAddingQuote: addMutation.isPending,
    isRemovingQuote: removeMutation.isPending,
  };
}

export function useFavoritePrayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (prayerId: FavoriteId) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addFavoritePrayer(prayerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (prayerId: FavoriteId) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeFavoritePrayer(prayerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return {
    addPrayer: addMutation.mutateAsync,
    removePrayer: removeMutation.mutateAsync,
    isAddingPrayer: addMutation.isPending,
    isRemovingPrayer: removeMutation.isPending,
  };
}
