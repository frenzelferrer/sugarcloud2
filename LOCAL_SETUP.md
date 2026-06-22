# Sugarcloud co. - Local Development Setup Guide

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **pnpm** (recommended) or **npm** - pnpm is faster and more efficient
  - Install pnpm: `npm install -g pnpm`
- **Your favorite IDE** - VS Code, WebStorm, etc.

## Step 1: Pull the Latest Changes

Navigate to your existing repository and pull the latest changes:

```bash
cd sugarcloud2
git pull origin main
```

This will fetch all the latest updates including the website code, product photos, social media icons, and branding.

## Step 2: Install Dependencies

Install all project dependencies using pnpm (or npm):

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

This will install all required packages including React, Tailwind CSS, and other dependencies.

## Step 3: Run the Development Server

Start the local development server:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

You should see output like:
```
VITE v7.1.9  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

## Step 4: Open in Your Browser

Open your browser and navigate to:

```
http://localhost:3000/
```

The website will now be running locally! You'll see hot module replacement (HMR) enabled, meaning any changes you make to the code will automatically refresh in your browser.

## Project Structure

```
sugarcloud/
├── client/
│   ├── public/              # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (Home.tsx)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts
│   │   ├── lib/             # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles & Tailwind
│   └── index.html           # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.ts       # Tailwind CSS configuration
```

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm check

# Format code
pnpm format
```

## Making Changes

### Edit Pages
- Main page: `client/src/pages/Home.tsx`
- 404 page: `client/src/pages/NotFound.tsx`

### Edit Components
- Header: `client/src/components/Header.tsx`
- Product cards: `client/src/components/ProductCard.tsx`
- Custom components: `client/src/components/`

### Edit Styles
- Global styles: `client/src/index.css`
- Component styles: Use Tailwind CSS classes in JSX

### Edit Colors & Theme
All brand colors are defined in `client/src/index.css`:
- Blush Pink: `#F3E5E7`
- Dusty Rose: `#A97B8C`
- Deep Mauve: `#5D3E47`
- Warm Cream: `#F5F1ED`
- Cookie Brown: `#8B6F47`

## Troubleshooting

### Port 3000 Already in Use
If port 3000 is already in use, you can specify a different port:

```bash
pnpm dev -- --port 3001
```

### Dependencies Not Installing
Try clearing the cache and reinstalling:

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
pnpm install
```

### Changes Not Reflecting
Try clearing the browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete) and refresh the page.

### Build Errors
Make sure you're using Node.js v18 or higher:

```bash
node --version
```

## Deploying to Production

When you're ready to deploy:

```bash
# Build the project
pnpm build

# The built files will be in the dist/ folder
```

You can then deploy the `dist/` folder to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Or use the Manus platform's built-in hosting

## Need Help?

- Check the [Vite documentation](https://vitejs.dev/)
- Check the [React documentation](https://react.dev/)
- Check the [Tailwind CSS documentation](https://tailwindcss.com/)

## Notes

- The website uses **Tailwind CSS 4** for styling
- **React 19** with hooks for state management
- **Wouter** for client-side routing
- **shadcn/ui** components for UI elements
- **Framer Motion** for animations
- All images are stored in Manus storage (`/manus-storage/`) and will work when deployed

---

Happy coding! 🍪✨
