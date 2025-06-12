# BIOCAD Sequence Alignment Tool

A React application for protein sequence alignment visualization with Material-UI components and styled-components. Features a beautiful space-themed wallpaper background and responsive design.

## 🌟 Features

- **Interactive Header**: Clean header section with space-themed background
- **Main Application**: Sequence alignment tool with the same stunning wallpaper
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Material-UI components with custom styling

## 🚀 Deployment

This project is configured to deploy to both GitHub Pages and Vercel with simplified relative path configuration.

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages at:
`https://penguinmirage.github.io/biocadtest`

To deploy manually:
```bash
npm run deploy
```

### Vercel Deployment

The project is configured for Vercel deployment with:
- Simplified `vercel.json` configuration
- SPA routing support for single-page application

Vercel will automatically deploy when you push to your main branch.

## 🛠️ Development

### Prerequisites
- Node.js 18.x (specified in `.nvmrc` and `.node-version`)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```

### Build for Production

Universal build command that works for both platforms:
```bash
npm run build
```

## 🔧 Technology Stack

- **React 19.1.0** - Frontend framework
- **TypeScript 4.9.5** - Type safety (compatible with react-scripts 5.0.1)
- **Material-UI 7.1.1** - Component library
- **Styled Components 6.1.18** - CSS-in-JS styling
- **React Hook Form 7.57.0** - Form handling
- **React Toastify 11.0.5** - Notifications

## 📁 Project Structure

```
biocadtest/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── utils/       # Utility functions
│   └── App.tsx      # Main application component
├── build/           # Production build output
├── vercel.json      # Vercel deployment configuration
└── package.json     # Dependencies and scripts
```

## 🐛 Troubleshooting

### Common Issues

1. **npm install fails with dependency conflicts**
   - The project uses compatible versions of TypeScript (4.9.5) and AJV (6.12.6) that work with react-scripts 5.0.1
   - If you encounter peer dependency warnings, they are expected and won't break the build

2. **Deployment showing blank page**
   - The project now uses relative paths (`./`) which work universally
   - Simply run `npm run build` for any deployment target

3. **TypeScript errors**
   - The project uses TypeScript 4.9.5 for compatibility with react-scripts 5.0.1
   - Upgrading to TypeScript 5.x will cause peer dependency conflicts

4. **Background image not loading**
   - The project uses an external wallpaper from wallpaperaccess.com
   - If the image doesn't load, check your internet connection or firewall settings

## 🎨 Design

The application features a stunning space-themed background (`https://wallpaperaccess.com/full/3312124.png`) applied to both the header and main content areas, creating a cohesive and visually appealing experience.

## 📝 License

Exclusively for BIOCAD - 2025 penguinmirage Web Development