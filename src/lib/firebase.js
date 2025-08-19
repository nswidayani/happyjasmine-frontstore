import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export onAuthStateChanged for auth state management
export { onAuthStateChanged };

// Authentication functions
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// Helper function for auth state management
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions for content management
export const getContent = async () => {
  try {
    const contentDoc = await getDoc(doc(db, 'content', 'main'));
    if (contentDoc.exists()) {
      return { success: true, data: contentDoc.data() };
    } else {
      // Return default content if no document exists
      return { success: true, data: getDefaultContent() };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateContent = async (content) => {
  try {
    await setDoc(doc(db, 'content', 'main'), content);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Default content structure
const getDefaultContent = () => ({
  hero: {
    title: "Welcome",
    subtitle: "Transform your business with our innovative solutions",
    buttonText: "Get Started",
    backgroundImage: "/hero-bg.jpg",
    imageSlider: [
      {
        id: 1,
        image: "/campaigns/slider2.png",
        title: "Welcome",
        subtitle: "Transform your business with our innovative solutions"
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
      }
    ]
  },
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "High-quality product with excellent features",
      image: "/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg",
      price: "$99.99"
    }
  ],
  about: {
    title: "About Our Company",
    description: "We are a leading technology company dedicated to providing innovative solutions.",
    image: "/about-image.jpg"
  },
  contact: {
    title: "Get in Touch",
    description: "Ready to get started? Contact us today!",
    email: "hello@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345"
  }
});

export default app;
