import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  imageAlt: string;
}

export default function Lightbox({ open, onOpenChange, imageSrc, imageAlt }: LightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-0">
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
          <X size={24} />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="flex items-center justify-center p-4 min-h-[60vh] max-h-[90vh]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
