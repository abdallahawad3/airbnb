# LinkedIn Post - Airbnb Clone Project

## 🏠 Project Description

Excited to share my latest full-stack project - a feature-rich **Airbnb Clone** built with modern web technologies! This application replicates the core functionality of Airbnb, allowing users to list properties, make reservations, and manage their bookings seamlessly.

---

## 🚀 Key Features

### 🔐 **Authentication & Authorization**

- **Multi-provider authentication** with NextAuth v5
- Google OAuth integration for seamless sign-in
- GitHub OAuth support
- Credential-based authentication with secure password hashing (bcryptjs)
- Protected routes and session management
- Prisma Adapter for database integration

### 🏡 **Property Listings Management**

- **Create and publish property listings** with detailed information
- Upload property images via Cloudinary integration
- Set pricing, capacity (guest count, rooms, bathrooms)
- Add comprehensive property descriptions
- Categorize properties across 16+ categories:
  - 🏖️ Beach, 🏔️ Mountains, 🏰 Castles, 🏝️ Islands
  - ⛷️ Skiing, 🏊 Pools, 🌵 Desert, 🏕️ Camping
  - 🧑‍🌾 Farms, 🏚️ Barns, 🌊 Lakes, ❄️ Arctic
  - 🕳️ Caves, 💎 Luxury, 🏘️ Modern, 🌾 Countryside

### 📍 **Location & Map Integration**

- Interactive map integration using **React Leaflet**
- Country selection with `world-countries` library
- Visual property location display
- Geographic coordinates tracking

### 📅 **Reservation System**

- **Book properties** with custom date ranges
- Real-time availability checking using `react-date-range`
- Automatic price calculation based on stay duration
- View and manage your trips
- Cancel reservations

### ❤️ **Favorites & Wishlist**

- Add properties to favorites
- Manage personal wishlist
- Quick access to saved properties
- Heart button toggle functionality

### 🎨 **User Interface & Experience**

- **Responsive design** with Tailwind CSS v4
- Modern, clean interface inspired by Airbnb
- Loading states with React Spinners
- Toast notifications for user feedback (react-hot-toast)
- Smooth transitions and animations
- Mobile-first approach

### 🔍 **Advanced Search & Filtering**

- Filter by category (Beach, Mountains, Luxury, etc.)
- Location-based search
- Date range filtering
- Guest capacity filtering
- Query string-based URL parameters

### 👤 **User Dashboard**

- **My Properties** - Manage your listings
- **My Trips** - View upcoming and past reservations
- **My Favorites** - Access saved properties
- **My Reservations** - Manage bookings on your properties

### 🛠️ **Property Management**

- Edit and update listings
- Delete properties
- View reservation statistics
- Cancel guest reservations

---

## 💻 **Tech Stack**

### **Frontend**

- ⚛️ **Next.js 16** (App Router)
- ⚛️ **React 19** with React DOM
- 🎨 **Tailwind CSS v4** for styling
- 🗺️ **React Leaflet** for maps
- 📅 **React Date Range** for date selection
- 🎯 **Redux Toolkit** for state management
- 📋 **React Hook Form** with Zod validation
- 🖼️ **Next Cloudinary** for image management

### **Backend**

- 🚀 **Next.js API Routes**
- 🔒 **NextAuth v5** for authentication
- 🗄️ **Prisma ORM** with MongoDB
- 🔐 **bcryptjs** for password hashing
- ✅ **Zod** for schema validation

### **Database**

- 🍃 **MongoDB** with Prisma Client
- Prisma Accelerate for enhanced performance

### **Development Tools**

- 📘 **TypeScript** for type safety
- 🎯 **ESLint** for code quality
- 🔧 **PostCSS** for CSS processing

---

## 📊 **Database Schema**

### **Models:**

- **User** - User profiles with authentication data
- **Account** - OAuth provider accounts
- **Listing** - Property listings with details
- **Reservation** - Booking information and dates

### **Relationships:**

- Users can create multiple listings
- Users can make multiple reservations
- Users can favorite multiple properties
- Listings can have multiple reservations

---

## 🎯 **Key Functionalities**

✅ User registration and login (Email/Password, Google, GitHub)  
✅ Create, read, update, delete (CRUD) property listings  
✅ Upload and manage property images  
✅ Interactive map for location selection  
✅ Advanced search with multiple filters  
✅ Date-based reservation system  
✅ Favorite/unfavorite properties  
✅ Manage trips and reservations  
✅ Responsive design for all devices  
✅ Real-time form validation  
✅ Optimistic UI updates  
✅ Server-side rendering (SSR)  
✅ Protected API routes

---

## 🌟 **What I Learned**

- Building scalable applications with Next.js 16 App Router
- Implementing authentication with multiple providers
- State management with Redux Toolkit
- Database design and relationships with Prisma
- Image optimization and cloud storage
- Form handling and validation patterns
- Map integration in React applications
- TypeScript best practices
- Responsive design principles

---

## 🔗 **Project Highlights**

This project demonstrates proficiency in:

- Full-stack development
- Modern React patterns and hooks
- Database design and ORM usage
- Authentication and authorization
- RESTful API design
- Cloud services integration
- State management
- Type-safe development

---

**Built with ❤️ using Next.js, React, and TypeScript**
