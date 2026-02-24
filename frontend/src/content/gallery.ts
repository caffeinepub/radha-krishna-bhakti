export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/assets/generated/rk-gallery-set-1.dim_1024x1024.png',
    alt: 'Radha Krishna devotional art with lotus and mandala motifs',
    title: 'Divine Love',
  },
  {
    id: 'g2',
    src: '/assets/generated/rk-gallery-set-2.dim_1024x1024.png',
    alt: 'Radha Krishna with peacock feather and temple arches',
    title: 'Sacred Union',
  },
  {
    id: 'g3',
    src: '/assets/generated/rk-hero-bg.dim_1920x1080.png',
    alt: 'Devotional background with lotus and mandala patterns',
    title: 'Divine Presence',
  },
  {
    id: 'g4',
    src: '/assets/generated/rk-emblem.dim_512x512.png',
    alt: 'Radha Krishna emblem',
    title: 'Sacred Symbol',
  },
];
