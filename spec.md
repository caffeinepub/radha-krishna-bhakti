# Specification

## Summary
**Goal:** Build a Radha–Krishna devotional app with a cohesive traditional theme, offline English content (quotes + prayers), a static image gallery, and authenticated per-user favorites persisted in a single Motoko backend.

**Planned changes:**
- Apply a consistent warm devotional visual theme across all pages (colors, typography, spacing, backgrounds, components), avoiding blue/purple as primary brand colors.
- Implement responsive navigation and pages: Home, Quotes, Gallery, Prayers, and authenticated-only My Favorites (Internet Identity).
- Add curated offline English content: at least 30 short quotes and at least 5 prayers/chants (title + multi-line text).
- Add favorite/unfavorite for quotes and prayers with sign-in prompt for unauthenticated users; show favorites in My Favorites.
- Backend: create a single Motoko actor API for per-user favorites (get/add/remove/clear) using stable IDs and stable storage across upgrades.
- Frontend: integrate favorites using React Query (queries + mutations) with loading, error, and empty states.
- Create Gallery page with responsive grid of static images and a full-screen/lightbox image viewer.
- Add generated images under `frontend/public/assets/generated` and use them as a Home hero/background and as Gallery entries.

**User-visible outcome:** Users can browse a themed Radha–Krishna app with quotes, prayers, and an image gallery; sign in with Internet Identity to favorite quotes/prayers and manage them in My Favorites, with favorites persisting across reloads.
