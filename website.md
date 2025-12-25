

## Design System

### Color Palette (CSS Variables)
```css
:root {
  /* Brand Colors */
  --color-brand-primary: #8b5cf6; /* Purple */
  --color-brand-accent: #06b6d4;  /* Cyan */
  --color-brand-secondary: #ec4899; /* Pink */
  
  /* Backgrounds */
  --color-black: #0f0518;
  --color-dark-bg: #160824;
  --color-background: var(--color-black);
  
  /* Text Colors */
  --color-text-primary: #fff;
  --color-text-secondary: #d1d5db;
  
  /* Service Colors */
  --color-service-orange: #fe6427;
  --color-service-purple: #8638c4;
  --color-service-lime: #b9f151;
  --color-service-yellow: #fbff15;
}
```


## Website Structure

### Pages to Create

#### 1. **Homepage** (`/`)
**Layout:**
- Navbar (sticky, transparent background with blur)
- Hero Section with dynamic word animation
  - Headline: "We Build Digital [reality/brands/campaigns/websites/stories]"
  - Words should rotate every 3 seconds with different fonts/colors
  - CTA button: "Let's Create Something Amazing"
- "What Defines Us" section
- Multi-step contact form
- Copyright footer

**Key Features:**
- Animated words that change with different fonts
- Scroll-triggered animations
- Smooth scrolling to contact form

#### 2. **About Page** (`/about`)
**Content:**
- Page title: "About Us"
- Description: "We are a dynamic team of creators, innovators, and strategists dedicated to transforming bold ideas into extraordinary digital experiences that drive real business results."
- Team member cards with bios
- Team photos with hover effects

**Meta Tags:**
- Title: "About Us | Our Creative Team"
- Description: "Meet the talented individuals behind our innovative digital experiences"

#### 3. **Services Page** (`/services`)
**Services to Display:**

1. **Brand Management**
   - Description: "Comprehensive strategies to build and maintain your brand identity"
   - Color: Purple gradient
   - Link: `/services/brandManagement`

2. **Video Editing**
   - Description: "Professional editing to bring your visual stories to life"
   - Color: Pink gradient
   - Link: `/services/videoEditing`

3. **Ad Creation**
   - Description: "Eye-catching advertisements that convert viewers to customers"
   - Color: Orange/yellow gradient
   - Link: `/services/addCreation`

4. **Web Development**
   - Description: "Modern, responsive websites that deliver exceptional user experiences"
   - Color: Cyan gradient
   - Link: `/services/webDevelopment`

**Layout:**
- Large headline: "services" (lowercase, Jaro font, 122px)
- Grid layout (2x2) of service cards
- Each card should have hover effects with gradient borders
- Each service should be clickable and link to its detail page

#### 4. **Service Detail Pages**
Create individual pages for each service:
- `/services/brandManagement`
- `/services/videoEditing`
- `/services/addCreation`
- `/services/webDevelopment`

Each should have:
- Hero section with service name
- Detailed description
- Process/approach section
- Benefits list
- Related case studies
- CTA to contact form

#### 5. **Work/Portfolio Page** (`/work`)
**Featured Project:**

**The Nikah Nest**
- Category: Web Development & Design
- Description: "Built a comprehensive Islamic wedding vendor platform connecting Muslim couples with halal-certified vendors across India. Features include vendor profiles, search functionality, booking system, and community reviews."
- Technologies: Next.js, TypeScript, Tailwind CSS, Framer Motion
- Live URL: https://thenikahnest.com
- Stats:
  - 37+ Vendors
  - 5.0★ Rating
  - 20+ Cities
- Client: The Nikah Nest
- Year: 2024

**Layout:**
- Filter tabs by category (All, Web Development, Brand Management, Video Editing, Ad Creation)
- Project cards in grid layout
- Each card shows:
  - Project image/thumbnail
  - Title and category
  - Brief description
  - Technologies used
  - View project button with external link icon
  - Stats if available

**Project Card Hover Effects:**
- Scale up slightly
- Show gradient border
- Reveal more details
- Animated overlay

#### 6. **Contact Page** (`/contact`)
**Form Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Services interested in (checkboxes):
  - Brand Management
  - Video Editing
  - Ad Creation
  - Web Development
  - Social Media Marketing
  - Content Strategy
- Budget range (dropdown):
  - Under $5K
  - $5K - $10K
  - $10K - $25K
  - $25K - $50K
  - $50K+
- Message (textarea, required)

**Layout:**
- Split screen design (50/50)
- Left side: Form
- Right side: Image or animated background
- Contact information cards below form
- Floating emoji animations

**Validation:**
- Client-side validation
- Error messages in red
- Success message after submission

#### 7. **Copyright Page** (`/copyright`)
- Copyright notice
- Terms of use
- Privacy policy links
- Company information
- Year: 2024

---

## Key Components to Build

### 1. **Navbar Component**
```tsx
Features:
- Logo/brand name "Vescavia"
- Navigation links: Home, About, Services, Work, Contact
- Sticky position
- Glass morphism effect (backdrop-blur)
- Smooth scroll to sections
- Mobile responsive with hamburger menu
```

### 2. **Button Component**
```tsx
Props:
- variant: 'primary' | 'secondary' | 'outline'
- size: 'sm' | 'md' | 'lg'
- Gradient background on primary
- Hover animations
- Click ripple effect
```

### 3. **Service Card Component**
```tsx
Props:
- image: StaticImageData
- title: string
- description: string
- href: string
- Gradient border on hover
- Scale animation
- Icons from react-icons
```

### 4. **Team Card Component**
```tsx
Features:
- Member photo
- Name and role
- Bio section
- Social media links
- Hover reveal animation
```

### 5. **Footer Component**
```tsx
Sections:
- Company info
- Quick links
- Social media icons
- Newsletter signup
- Copyright text
```

### 6. **Gradient Border Component**
```tsx
- Reusable wrapper for gradient borders
- Animated gradient rotation
- Customizable colors
```

### 7. **Multi-Step Contact Form**
```tsx
Steps:
1. Basic information (name, email)
2. Services selection
3. Project details (budget, timeline)
4. Message and submission
- Progress indicator
- Back/Next navigation
- Form validation
```

### 8. **Animated Word Component**
```tsx
Features:
- Word rotation animation
- Different fonts per word
- Smooth fade transition
- Configurable timing
```

### 9. **Constellation Background**
```tsx
- Animated star field
- Mouse interaction (parallax)
- Connection lines between stars
- Canvas-based rendering
```

### 10. **Scroll Animation Component**
```tsx
- Fade in on scroll
- Slide up animation
- Uses intersection observer
- Stagger children animations
```

---

## Animation Requirements

### Page Load Animations
- Fade in from bottom
- Stagger text reveals
- Hero section scale-in

### Scroll Animations
- Parallax effects
- Fade in elements as they enter viewport
- Progress bars fill on scroll
- Number counters animate

### Hover Animations
- Cards scale up (1.05)
- Gradient border appearance
- Text color transitions
- Icon rotations

### Marquee Animations
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```

---

## Special Features

### 1. **Dynamic Word Rotation (Homepage)**
Words should rotate through:
- "reality" (Jaro font, cyan color)
- "brands" (Pacifico font, purple color)
- "campaigns" (Oswald font, pink color)
- "websites" (Lora font, cyan color)
- "stories" (Indie Flower font, purple color)

Transition: Every 3 seconds with fade effect

### 2. **Gradient Text Effects**
```css
.gradient-text {
  background: linear-gradient(to bottom, #fff, #e9d5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 3. **Glass Morphism Cards**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 4. **Responsive Breakpoints**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1536px

---

## Image Requirements



### Image Specifications
- Format: WebP or AVIF preferred for web performance
- Service images: 800x600px
- Team photos: 400x400px (square)
- Project thumbnails: 1200x800px
- All images optimized with Next.js Image component

---

## SEO Requirements

### Meta Tags (Every Page)
```tsx
export const metadata = {
  title: "[Page Title] | Vescavia Digital Agency",
  description: "[Descriptive text about page]",
  keywords: ["relevant", "keywords", "here"],
  openGraph: {
    title: "[OG Title]",
    description: "[OG Description]",
    images: [{
      url: "/images/[page]/og-image.jpg",
      width: 1200,
      height: 630,
    }],
  },
};
```

### Structured Data
- Organization schema
- Local business schema
- Service schema for each service page

---

---

## Final Checklist

- [ ] All 7 pages created and functional
- [ ] Navbar with smooth navigation
- [ ] Homepage with dynamic word animation
- [ ] Services page with 4 service cards
- [ ] 4 individual service detail pages
- [ ] Work page with Nikah Nest project
- [ ] Contact page with functional form
- [ ] Copyright page
- [ ] Footer on all pages
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All animations working smoothly
- [ ] Images optimized and loading properly
- [ ] SEO meta tags on all pages
- [ ] Accessibility features implemented
- [ ] Form validation working
- [ ] Dark theme consistent throughout
- [ ] Gradient effects on headings
- [ ] Glass morphism on cards
- [ ] Constellation background on hero
- [ ] Hover effects on interactive elements

---

## Additional Notes

### Brand Voice
- Modern and innovative
- Professional yet creative
- Confident but approachable
- Focus on results and transformation

### Target Audience
- Startups and scale-ups
- E-commerce brands
- SaaS companies
- Creative agencies
- Small to medium businesses

### Unique Selling Points
- Full-service digital agency
- Creative + Strategic approach
- Modern tech stack
- Performance-driven results
- Custom solutions

---

