# Haleema Quran Academy Website

Premium static website for an online Quran academy. It uses open-source web standards only: HTML, CSS, JavaScript, and a small Node preview server with no external npm packages.

## Run Locally

```bash
npm.cmd run dev
```

Then open:

```text
http://localhost:4173
```

If PowerShell blocks `npm`, use:

```bash
node server.js
```

## Live Contact Details

Current website contact details:

- Email: `haleemaquranacademy@gmail.com`
- WhatsApp/phone: `+92 302 8033582`
- The trial form can compose the request through either WhatsApp or email.
- Email sending uses `mailto:` so it has no website email-service fee. It opens the visitor's email app with a ready message instead of sending through a paid backend.

## Display Features

- Visitors can switch between light and dark theme from the header.
- Visitors can switch the visible website content between English and Urdu.
- Theme and language choices are saved in the visitor's browser.

## Edit Before Publishing

- Update plan names, fees, teacher details, and testimonials with real academy information.
- Replace `assets/hero-quran.jpg` with your own academy photo if available.
- Replace the Gmail address with a domain email later if you create one in Hostinger.

## Hostinger Deployment

When hosting is purchased, upload these files to `public_html`:

- `index.html`
- `src/`
- `assets/`
- `robots.txt`
- `sitemap.xml`

The `server.js` file is only for local preview and is not needed for basic Hostinger static hosting.

Recommended plan for this version: Hostinger Business Web Hosting. It is enough for this static website and leaves room for Node.js or a future dashboard later.

## SEO Notes

- SEO title, meta description, Open Graph, Twitter card, FAQ schema, organization schema, `robots.txt`, and `sitemap.xml` are included.
- The sitemap currently uses `https://haleemaquranacademy.com/`. If your final domain is different, update `index.html`, `robots.txt`, and `sitemap.xml`.
- Search ranking cannot be guaranteed by code alone. Final ranking depends on competition, content quality, backlinks, page speed, domain history, and Google indexing.

## Asset Credit and Copyright

See `CREDITS.md`.
