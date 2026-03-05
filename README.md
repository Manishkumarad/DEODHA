# 🧺 DCODHA - Bhopal's Doorstep Laundry Service

<div align="center">

![DCODHA Logo](assets/icon.png)

**Complete React Native Laundry Management System**

[![React Native](https://img.shields.io/badge/React%20Native-0.73.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-55.0.5-000.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.2-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[▶️ Live Demo](https://your-demo-link.com) | [📱 Download APK](https://your-apk-link.com) | [📖 Documentation](#documentation)

</div>

---

## 📋 Table of Contents

- [🌟 About](#-about)
- [✨ Features](#-features)
- [📱 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📱 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🔐 Firebase Setup](#-firebase-setup)
- [📱 App Screens](#-app-screens)
- [💰 Revenue Model](#-revenue-model)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 About

DCODHA is a comprehensive laundry service management platform designed specifically for Bhopal residents. It connects customers with local laundry shops, provides real-time order tracking, and offers a complete business management solution for vendors and delivery agents.

**🎯 Mission:** Simplify laundry services with technology, making quality laundry care accessible to everyone in Bhopal.

---

## ✨ Features

### 👤 **For Customers**
- 🔐 **Phone Authentication** - Secure OTP-based login
- 🏪 **Shop Discovery** - Browse nearby laundry shops
- 📦 **Easy Booking** - 5-step simple order process
- 🚚 **Real-time Tracking** - Live order status updates
- 💳 **Multiple Payment Options** - Cash, UPI, Cards
- ⭐ **Reviews & Ratings** - Share your experience

### 🏪 **For Vendors (Shop Owners)**
- 📊 **Dashboard Analytics** - Business insights
- 📋 **Order Management** - Accept/reject orders
- 💰 **Pricing Control** - Set service rates
- 📈 **Revenue Tracking** - Daily/monthly earnings
- 👥 **Customer Management** - View customer history
- 🎨 **Shop Profile** - Showcase your services

### 🛵 **For Delivery Agents**
- 🗺️ **Route Optimization** - Efficient delivery paths
- 📦 **Order Assignment** - Smart order distribution
- 💵 **Earnings Dashboard** - Track daily income
- ⏰ **Flexible Schedule** - Choose working hours
- 📊 **Performance Metrics** - Delivery success rates

---

## 📱 Screenshots

<div align="center">

### Customer App
| Home | Shops | Order Tracking |
|------|-------|----------------|
| ![Home](screenshots/customer-home.png) | ![Shops](screenshots/customer-shops.png) | ![Tracking](screenshots/customer-tracking.png) |

### Vendor Dashboard
| Dashboard | Orders | Earnings |
|-----------|--------|----------|
| ![Vendor Dashboard](screenshots/vendor-dashboard.png) | ![Vendor Orders](screenshots/vendor-orders.png) | ![Vendor Earnings](screenshots/vendor-earnings.png) |

### Agent App
| Available Orders | Delivery | Earnings |
|-----------------|----------|----------|
| ![Agent Orders](screenshots/agent-orders.png) | ![Agent Delivery](screenshots/agent-delivery.png) | ![Agent Earnings](screenshots/agent-earnings.png) |

</div>

---

## 🛠️ Tech Stack

### **Frontend**
- **React Native** (0.73.4) - Cross-platform mobile development
- **Expo** (55.0.5) - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** (6.x) - Navigation and routing
- **Zustand** - State management

### **Backend & Services**
- **Firebase Authentication** - Phone-based OTP auth
- **Firebase Firestore** - Real-time database
- **Firebase Storage** - Media file storage
- **Firebase Cloud Functions** - Serverless backend logic

### **UI/UX**
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **React Native Safe Area Context** - Device compatibility
- **React Native Vector Icons** - Icon library

### **Development Tools**
- **Metro** - JavaScript bundler
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- Expo CLI installed
- Firebase project configured
- Git for version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Manishkumarad/DEODHA.git
cd DEODHA

# Install dependencies
npm install

# Install Expo CLI globally
npm install -g @expo/cli

# Start the development server
npx expo start
```

### **Run the App**

```bash
# For mobile (scan QR code with Expo Go)
npx expo start

# For web browser
npx expo start --web

# For Android emulator
npx expo start --android

# For iOS simulator
npx expo start --ios
```

---

## 📦 Installation

### **Step 1: Clone & Setup**
```bash
git clone https://github.com/Manishkumarad/DEODHA.git
cd DEODHA
npm install
```

### **Step 2: Firebase Configuration**
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Phone) and Firestore Database
3. Download configuration files
4. Add Firebase credentials to `src/config/firebase.ts`

### **Step 3: Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Add your Firebase credentials
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
```

### **Step 4: Run Development Server**
```bash
npx expo start --clear
```

---

## 🔧 Configuration

### **Firebase Setup**
1. **Authentication**
   - Enable Phone Authentication
   - Add test phone numbers for development
   - Configure reCAPTCHA settings

2. **Firestore Database**
   - Create security rules
   - Set up collections: `users`, `shops`, `orders`, `reviews`
   - Configure indexes for performance

3. **Storage**
   - Set up Firebase Storage for images
   - Configure security rules for file access

### **Environment Variables**
```bash
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# App Configuration
APP_NAME=DCODHA
APP_VERSION=1.0.0
ENVIRONMENT=development
```

---

## 📱 Usage

### **For Customers**
1. **Sign Up**: Use phone number with OTP verification
2. **Browse Shops**: View nearby laundry services
3. **Place Order**: Select services, schedule pickup/delivery
4. **Track Order**: Real-time status updates
5. **Pay & Review**: Complete payment and rate service

### **For Vendors**
1. **Register**: Create shop profile with services
2. **Manage Orders**: Accept/reject customer orders
3. **Update Status**: Mark orders as picked up, processing, ready
4. **View Analytics**: Track revenue and customer metrics

### **For Agents**
1. **Sign Up**: Register as delivery agent
2. **Accept Orders**: Choose available deliveries
3. **Navigate**: Follow optimized routes
4. **Update Status**: Mark pickups and deliveries
5. **Track Earnings**: View daily and total income

---

## 🏗️ Project Structure

```
DEODHA/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 config/             # Firebase and app configuration
│   ├── 📁 navigation/         # App navigation and routing
│   │   └── 📄 AppNavigator.tsx
│   ├── 📁 screens/            # Main app screens
│   │   ├── 📄 AuthScreen.tsx      # Phone authentication
│   │   ├── 📄 HomeScreen.tsx      # Landing page
│   │   ├── 📄 ShopsScreen.tsx     # Shop browsing
│   │   ├── 📄 OrderScreen.tsx     # Order placement
│   │   ├── 📄 TrackScreen.tsx     # Order tracking
│   │   ├── 📄 VendorScreen.tsx    # Vendor dashboard
│   │   └── 📄 AgentScreen.tsx     # Agent dashboard
│   ├── 📁 services/           # API and Firebase services
│   │   └── 📄 firebase.ts
│   ├── 📁 store/              # State management (Zustand)
│   │   └── 📄 index.ts
│   ├── 📁 theme/              # App styling and colors
│   │   └── 📄 index.ts
│   └── 📁 utils/              # Utility functions
│       └── 📄 data.ts
├── 📄 App.tsx                 # Main app entry point
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 app.json               # Expo configuration
└── 📄 README.md              # This file
```

---

## 🔐 Firebase Setup

### **1. Create Firebase Project**
1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name: `DCODHA`
4. Enable Google Analytics (optional)

### **2. Enable Services**
- **Authentication** → Sign-in method → Phone
- **Firestore Database** → Start in test mode
- **Storage** → Get started

### **3. Configure Authentication**
```javascript
// Add test phone numbers for development
+919876543210 → 123456
+911234567890 → 654321
```

### **4. Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
        (resource.data.userId == request.auth.uid || 
         resource.data.agentId == request.auth.uid);
    }
    match /shops/{shopId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'vendor';
    }
  }
}
```

---

## 📱 App Screens

### **🔐 Authentication Screen**
- Phone number input with country code
- OTP verification with auto-read
- Role selection (Customer/Vendor/Agent)
- User profile setup

### **🏠 Home Screen**
- Featured services showcase
- Quick order buttons
- Recent orders summary
- Promotional banners

### **🗺️ Shops Screen**
- Map view of nearby shops
- List view with filters
- Shop ratings and reviews
- Service catalogs

### **📦 Order Screen**
- 5-step booking process
- Service selection
- Pickup/delivery scheduling
- Address management
- Payment options

### **🚚 Track Screen**
- Real-time order tracking
- Delivery agent details
- Estimated arrival time
- Order history

### **🏪 Vendor Screen**
- Order management dashboard
- Revenue analytics
- Customer management
- Shop profile editing

### **🛵 Agent Screen**
- Available orders map
- Earnings dashboard
- Delivery history
- Performance metrics

---

## 💰 Revenue Model

### **Customer Pricing**
- **Pickup Fee**: ₹40 per order
- **Service Charges**: Based on garment type and weight
- **Delivery Fee**: Included in pickup fee
- **Express Delivery**: ₹20 extra for same-day service

### **Platform Commission**
- **Shop Commission**: 15-18% per order
- **Agent Base Pay**: ₹80 per delivery
- **Distance Bonus**: ₹5 per kilometer
- **Express Bonus**: ₹20 for urgent deliveries

### **Projected Earnings**
```
Month 1 (50 orders/day):
- Platform Revenue: ₹6,000/day = ₹1.8L/month
- Shop Earnings: ₹30,000/day = ₹9L/month
- Agent Earnings: ₹4,000/day = ₹1.2L/month

Month 6 (200 orders/day):
- Platform Revenue: ₹24,000/day = ₹7.2L/month
- Shop Earnings: ₹120,000/day = ₹36L/month
- Agent Earnings: ₹16,000/day = ₹4.8L/month
```

---

## 🚀 Deployment

### **Google Play Store**

#### **1. Generate Release Build**
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile production
```

#### **2. Create Play Store Listing**
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new application
3. Fill store listing details
4. Upload screenshots and promotional graphics
5. Set pricing and distribution
6. Submit for review

#### **3. Required Assets**
- **App Icon**: 512x512px PNG
- **Feature Graphic**: 1024x500px PNG
- **Screenshots**: Multiple device sizes
- **Privacy Policy**: Hosted on your website

### **App Store (iOS)**

#### **1. Build for iOS**
```bash
# Build for iOS
eas build --platform ios --profile production
```

#### **2. App Store Connect**
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app
3. Upload build
4. Complete app information
5. Submit for review

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **🐛 Reporting Issues**
1. Use the [Issues](https://github.com/Manishkumarad/DEODHA/issues) page
2. Provide detailed description
3. Include screenshots if applicable
4. Add steps to reproduce

### **🔧 Making Changes**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### **📋 Development Guidelines**
- Follow existing code style
- Add TypeScript types for new code
- Write meaningful commit messages
- Update documentation
- Test your changes

### **🏆 Contribution Areas**
- UI/UX improvements
- Performance optimization
- New features
- Bug fixes
- Documentation
- Testing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DCODHA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **React Native Team** - For the amazing framework
- **Expo Team** - For simplifying React Native development
- **Firebase Team** - For the powerful backend services
- **Bhopal Community** - For being our inspiration and first users

---

## 📞 Contact

- **📧 Email**: support@dcodha.com
- **📱 Phone**: +91 98765 43210
- **🌐 Website**: [www.dcodha.com](https://www.dcodha.com)
- **📱 WhatsApp**: +91 98765 43210

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ in Bhopal, India

[🔝 Back to Top](#-dcodha-bhopals-doorstep-laundry-service)

</div>
