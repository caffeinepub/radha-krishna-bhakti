import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function AuthButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoading = loginStatus === 'logging-in' || loginStatus === 'initializing';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isAuthenticated
          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-devotional'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span className="hidden sm:inline">Loading...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </>
      ) : (
        <>
          <LogIn size={16} />
          <span className="hidden sm:inline">Login</span>
        </>
      )}
    </button>
  );
}
