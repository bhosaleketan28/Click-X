# Click X Hero Page

This repository contains a high-performance, cinematic scrollytelling hero page for **Click X**, built with Next.js 14.

## Project Summary

The application utilizes a canvas-based image sequence (120 WebP frames) to create a smooth, responsive scrollytelling experience. As the user scrolls, the product (Click X) is revealed through a series of cinematic frames, accompanied by synchronized text panels.

### Key Features:
- **Canvas Image Sequence:** High-performance rendering of 120 WebP frames.
- **Scrollytelling:** Interactive UI that responds to scroll progress.
- **Modular Architecture:** Cleanly separated components for better maintainability.
- **Next.js 14:** Utilizes the latest Next.js features, including the App Router and optimized image loading.
- **Tailwind CSS:** Modern, utility-first styling.

## Potential Improvements Identified & Implemented

The following improvements were identified and have been implemented in this refactor:

1.  **Modularization:**
    -   Decomposed the monolithic `app/page.tsx` into six reusable components: `Header`, `HeroSection`, `FeaturesGrid`, `ProductSlider`, `FAQSection`, `CtaSection`, and `Footer`.
    -   Centralized static data in `app/constants.ts` to improve content manageability.
    -   Moved helper functions to `app/utils.ts`.

2.  **Type Safety:**
    -   Extended the `Window` interface to properly handle `requestIdleCallback` and `window.Image` without using `any`.
    -   Defined proper TypeScript interfaces for components and data structures (e.g., `Panel` interface).

3.  **Asset Optimization:**
    -   Replaced standard `<img>` tags with `next/image` for automatic image optimization, lazy loading, and better performance (LCP).
    -   Configured `unoptimized: true` in `next.config.mjs` for the static export while still benefiting from the `next/image` component structure.

4.  **Accessibility (a11y):**
    -   Improved semantic HTML by using proper interactive elements (`button`, `a`) instead of non-semantic tags.
    -   Added descriptive ARIA labels to interactive elements (buttons, navigation, social links).
    -   Ensured the canvas is hidden from screen readers (`aria-hidden`) as it is a decorative background.

5.  **Code Quality:**
    -   Configured ESLint with `eslint-config-next`.
    -   Resolved all linting warnings and TypeScript errors.
    -   Cleaned up build artifacts and unnecessary files.

## Development

To start the development server:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

The build will be exported as a static site to the `out/` directory, configured with a `basePath` of `/Click-X`.
