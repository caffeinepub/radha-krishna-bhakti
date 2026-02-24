import { Loader2, AlertCircle } from 'lucide-react';
import { type ReactNode } from 'react';

interface QueryStateProps {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

export default function QueryState({
  isLoading,
  isError,
  error,
  isEmpty = false,
  emptyMessage = 'No items found',
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertCircle size={48} className="text-destructive" />
        <div className="text-center">
          <p className="font-medium text-destructive">Something went wrong</p>
          <p className="text-sm text-muted-foreground mt-1">
            {error?.message || 'Failed to load data'}
          </p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
