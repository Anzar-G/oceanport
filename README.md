# Personal Link Hub | Mysterious Navy Depths

A sophisticated personal Linktree-style web application with a mysterious navy theme, built with modern technologies for a professional and memorable user experience.

## ✨ Features

- **Mysterious Navy Theme**: Deep ocean-inspired design with bioluminescent effects
- **Professional Dashboard**: Full-featured management interface
- **Real-time Preview**: Live preview of changes as you edit
- **Responsive Design**: Optimized for all devices
- **Secure Authentication**: Supabase-powered auth system
- **Smooth Animations**: Framer Motion powered interactions
- **TypeScript**: Full type safety throughout the application

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** database
- **Row Level Security** for data protection
- **Real-time subscriptions**

### Development Tools
- **Vite** for fast development
- **ESLint** for code quality
- **TypeScript** strict mode
- **Hot reload** development server

## 🎨 Design Features

- **Choreographed Animations**: Sophisticated entrance sequences
- **Platform-Specific Glow Effects**: Each social platform has unique hover effects
- **Glass Morphism**: Backdrop blur effects throughout
- **Floating Particles**: Ambient background animations
- **Gradient Text Effects**: Navy → Cyan → Purple gradients
- **Responsive Grid System**: Adaptive layouts for all screen sizes

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linktree-personal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy the database schema from the documentation
   - Set up Row Level Security policies
   - Create storage bucket for avatars

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Database Schema

The application uses three main tables:

- **profiles**: User profile information
- **social_links**: Social media links and platforms
- **site_settings**: Theme and customization options

See the full schema in the technical documentation.

## 🎯 Key Components

### Landing Page
- Animated profile card with avatar
- Platform-specific social link cards
- Call-to-action section
- Mysterious navy background effects

### Dashboard
- Profile editor with avatar upload
- Social links management
- Live preview panel
- Responsive sidebar navigation

### Authentication
- Secure login with Supabase Auth
- Protected routes
- Session management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 🎨 Customization

### Colors
The mysterious navy theme uses these primary colors:
- Navy Base: `#0A1628`
- Cyan Glow: `#00D9FF`
- Teal Accent: `#1DD3B0`
- Purple Depth: `#7B68EE`

### Fonts
- Display: Space Grotesk
- Accent: Syne

### Animations
All animations are built with Framer Motion and can be customized in the component files.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Secure file uploads to Supabase Storage
- Input validation with Zod schemas
- XSS protection
- HTTPS enforcement

## 📈 Performance

- Code splitting with React.lazy
- Image optimization
- Lazy loading
- Minimal bundle size
- GPU-accelerated animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from deep ocean bioluminescence
- Supabase for the excellent backend platform
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling

---

**Built with ❤️ for the deep web**