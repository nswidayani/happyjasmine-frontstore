#!/usr/bin/env node

/**
 * Firebase Initialization Script
 * This script helps initialize your Firebase project with default content
 * 
 * Usage: node scripts/init-firebase.js
 * 
 * Make sure to:
 * 1. Set up your Firebase project first
 * 2. Configure your .env.local file
 * 3. Enable Firestore Database
 * 4. Set up authentication
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

// Check if environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease check your .env.local file and ensure all Firebase configuration variables are set.');
  process.exit(1);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Default content structure
const defaultContent = {
  hero: {
    title: "Welcome to Happy Jasmine",
    subtitle: "Transform your business with our innovative solutions",
    buttonText: "Get Started",
    backgroundImage: "/hero-bg.jpg",
    imageSlider: [
      {
        id: 1,
        image: "/campaigns/slider2.png",
        title: "Welcome",
        subtitle: "Transform your business with our innovative solutions"
      },
      {
        id: 2,
        image: "/campaigns/slider1.jpeg",
        title: "Innovation",
        subtitle: "Cutting-edge solutions for modern businesses"
      }
    ]
  },
  features: {
    title: "Our Features",
    description: "Discover what makes us special",
    items: [
      {
        id: 1,
        title: "Fast Performance",
        description: "Lightning-fast performance that scales with your needs",
        icon: "Speed"
      },
      {
        id: 2,
        title: "Secure & Reliable",
        description: "Bank-level security with 99.9% uptime guarantee",
        icon: "Security"
      },
      {
        id: 3,
        title: "Easy Integration",
        description: "Simple API integration that works with your existing tools",
        icon: "Integration"
      }
    ]
  },
  products: [
    {
      id: 1,
      name: "Premium Product 1",
      description: "High-quality product with excellent features and modern design",
      image: "/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg",
      price: "$99.99"
    },
    {
      id: 2,
      name: "Premium Product 2",
      description: "Premium product designed for modern needs and professional use",
      image: "/products/WhatsApp Image 2025-08-18 at 16.42.28 (2).jpeg",
      price: "$149.99"
    },
    {
      id: 3,
      name: "Premium Product 3",
      description: "Innovative solution for everyday challenges and business growth",
      image: "/products/WhatsApp Image 2025-08-18 at 16.42.28 (1).jpeg",
      price: "$79.99"
    }
  ],
  about: {
    title: "About Our Company",
    description: "We are a leading technology company dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.",
    image: "/about-image.jpg"
  },
  contact: {
    title: "Get in Touch",
    description: "Ready to get started? Contact us today!",
    email: "hello@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345"
  },
  theme: {
    mode: "light",
    primaryColor: "#005F73",
    secondaryColor: "#FFE347",
    warningColor: "#FF90AD",
    backgroundDefault: "#F5F5F5",
    backgroundPaper: "#FFFFFF"
  }
};

async function initializeFirebase() {
  try {
    console.log('🚀 Initializing Firebase...');
    console.log(`📁 Project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
    
    // Set default content
    await setDoc(doc(db, 'content', 'main'), defaultContent);
    
    console.log('✅ Firebase initialized successfully!');
    console.log('📝 Default content has been created in Firestore');
    console.log('🔐 You can now log in to your admin panel at /admin');
    
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure your Firebase project is set up correctly');
    console.error('2. Verify your environment variables in .env.local');
    console.error('3. Ensure Firestore Database is enabled');
    console.error('4. Check that your Firebase security rules allow writes');
    process.exit(1);
  }
}

// Run the initialization
initializeFirebase();
