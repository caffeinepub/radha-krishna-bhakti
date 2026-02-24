import { useState } from 'react';
import { galleryImages } from '../content/gallery';
import Lightbox from '../components/Lightbox';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Sacred Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Beautiful devotional art celebrating Radha and Krishna
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-devotional transition-all border border-border animate-fade-in"
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <Lightbox
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
        />
      )}
    </div>
  );
}
