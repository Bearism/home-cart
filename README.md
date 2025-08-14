# Micro-Frontend E-commerce Application

A modern micro-frontend architecture demonstrating product listing and shopping cart functionality built with Next.js, Tailwind CSS, and Docker.

## 🏗️ Architecture

This project implements a micro-frontend architecture with two independent applications:

- **`home`** (Port 3000): Product listing and showcase application
- **`cart`** (Port 3001): Shopping cart and checkout application

## 🚀 Features

### Home Application
- **Modern Dark Theme**: Rich gradient backgrounds and glass morphism effects
- **Responsive Product Cards**: Beautiful product showcase with hover animations
- **Interactive Elements**: Smooth transitions and modern UI components
- **Product Management**: Add to cart functionality with visual feedback

### Cart Application
- **Shopping Cart Interface**: Clean, intuitive cart management
- **Order Summary**: Real-time price calculations and shipping estimates
- **Quantity Controls**: Increment/decrement product quantities
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Technologies

- **Frontend Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose
- **Images**: Unsplash CDN for product images

## 📦 Project Structure

```
home-cart/
├── home/                 # Product listing application
│   ├── app/
│   │   ├── page.tsx     # Home page with product grid
│   │   ├── layout.tsx   # App layout with Inter font
│   │   └── globals.css  # Dark theme styling
│   ├── Dockerfile       # Container configuration
│   └── package.json     # Dependencies and scripts
├── cart/                # Shopping cart application
│   ├── app/
│   │   ├── page.tsx     # Cart page with order summary
│   │   ├── layout.tsx   # App layout
│   │   └── globals.css  # Matching dark theme
│   ├── Dockerfile       # Container configuration
│   └── package.json     # Dependencies and scripts
├── docker-compose.yml   # Multi-service orchestration
└── README.md           # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd home-cart
   ```

2. **Start the applications**
   ```bash
   docker-compose up --build
   ```

3. **Access the applications**
   - Home App: http://localhost:3000
   - Cart App: http://localhost:3001

### Local Development

1. **Start Home Application**
   ```bash
   cd home
   npm install
   npm run dev
   ```

2. **Start Cart Application**
   ```bash
   cd cart
   npm install
   npm run dev
   ```

## 🎨 Design System

### Color Palette
- **Background**: Dark gradient (#0a0a0a to #1a1a1a)
- **Cards**: #1a1a1a with #2a2a2a borders
- **Accent**: #6366f1 (Indigo)
- **Text**: #ededed (Light gray)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Semibold, Bold

### Components
- **Glass Morphism**: Backdrop blur effects
- **Gradient Text**: Multi-color text effects
- **Hover Animations**: Smooth scale and color transitions
- **Responsive Grid**: Mobile-first design approach

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Production/development mode
- `PORT`: Application port (3000 for home, 3001 for cart)

### Docker Configuration
- **Home App**: Exposed on port 3000
- **Cart App**: Exposed on port 3001
- **Network**: Custom bridge network for inter-service communication

## 📱 Responsive Design

Both applications are fully responsive with:
- **Mobile**: Single column layout
- **Tablet**: Two-column grid
- **Desktop**: Three to four-column grid
- **Touch-friendly**: Optimized for mobile interactions

## 🎯 Micro-Frontend Benefits

1. **Independent Development**: Teams can work on separate applications
2. **Technology Flexibility**: Each app can use different frameworks
3. **Scalability**: Easy to add new micro-frontends
4. **Deployment**: Independent deployment cycles
5. **Fault Isolation**: Issues in one app don't affect others

## 🔄 Data Communication

Currently, the applications use sample data. In a production environment, you would implement:

- **State Management**: Redux Toolkit or Zustand
- **API Communication**: REST APIs or GraphQL
- **Event Bus**: Cross-application communication
- **Shared Components**: Module Federation for common UI elements

## 🚀 Deployment

### Production Build
```bash
docker-compose -f docker-compose.yml up --build -d
```

### Scaling
```bash
docker-compose up --scale home=3 --scale cart=2
```

## 📝 Development Guidelines

1. **Consistent Styling**: Use Tailwind CSS classes and CSS variables
2. **Component Reusability**: Create modular, reusable components
3. **TypeScript**: Use strict typing for better code quality
4. **Responsive Design**: Test on multiple screen sizes
5. **Performance**: Optimize images and bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ using Next.js, Tailwind CSS, and Docker**
