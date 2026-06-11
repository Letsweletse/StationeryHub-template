# Deployment Note

This file was added to trigger a fresh Vercel deployment from the latest `main` branch.

The previous failed Vercel builds were cloning old commit `7b2a489`, which did not include the missing modules:

- `lib/products.ts`
- `components/WhatsAppButton.tsx`

The latest `main` branch includes those files and the redesigned StationeryHub homepage.
