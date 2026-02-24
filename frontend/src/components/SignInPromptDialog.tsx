import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn } from 'lucide-react';

interface SignInPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SignInPromptDialog({ open, onOpenChange }: SignInPromptDialogProps) {
  const { login, loginStatus } = useInternetIdentity();

  const handleLogin = async () => {
    try {
      await login();
      onOpenChange(false);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In Required</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Please sign in to save your favorite quotes and prayers. Your favorites will be
            securely stored and available across all your devices.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <button
            onClick={handleLogin}
            disabled={loginStatus === 'logging-in'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-devotional disabled:opacity-50"
          >
            <LogIn size={18} />
            {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign In'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
