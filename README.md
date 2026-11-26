# Prostore

A demo shirt shop built with Next.js 15, TypeScript, PostgreSQL (Neon) and Prisma.

**Live demo:** https://prostore-bice-nu.vercel.app

> This is a portfolio project. Orders are not shipped and payments run in
> test mode. Brands and products are fictional.

## Features

- Credentials sign-in with NextAuth (Auth.js v5)
- Product catalog with search, filters, sorting and pagination
- Cart, checkout and order history
- Payments with Stripe, PayPal or cash on delivery (test mode)
- Admin area: products, orders, users and sales overview
- Image uploads with UploadThing, receipt e-mails with Resend
- Light and dark themes

## Beyond the course

This project started from Brad Traversy's course and was extended:

- **Security:** server-side authorization on every admin action (checked
  against the database), no password hashes sent to the client, cart prices
  always read from the database, open-redirect protection, security headers,
  secure cookies and rate limiting on sign-in and sign-up
- **Production setup:** robots.txt, sitemap, Open Graph metadata, idempotent
  Stripe payment intents, BRL currency
- **Design:** a new visual identity ("woven label" price tags, Bricolage
  Grotesque display type, new logo) and redesigned storefront pages

## Getting started

```bash
npm install
cp .example-env .env   # fill in your own values
npx prisma migrate deploy
npm run dev
```

Open http://localhost:3000.

> `npx tsx ./db/seed` resets the database and creates sample users with
> known passwords. Use it only on a local or throwaway database.

## Credits

- Original course and base code: [Next.js Ecommerce](https://www.traversymedia.com/nextjs-ecommerce)
  by Brad Traversy / Traversy Media, MIT License
- Product photos: [Unsplash](https://unsplash.com), used under the
  [Unsplash License](https://unsplash.com/license)
- Fonts: [Inter](https://rsms.me/inter/) and
  [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque),
  SIL Open Font License
- UI components: [shadcn/ui](https://ui.shadcn.com), icons by [Lucide](https://lucide.dev)

## License

MIT. See [LICENSE](./LICENSE).
