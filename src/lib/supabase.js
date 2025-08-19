import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getCurrentUser = () => supabase.auth.getUser();

export const subscribeToAuthChanges = (callback) => {
  const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return () => subscription.subscription.unsubscribe();
};

// Default content structure (kept in sync with previous Firebase version)
const getDefaultContent = () => ({
  hero: {
    title: 'Welcome',
    subtitle: 'Transform your business with our innovative solutions',
    buttonText: 'Get Started',
    backgroundImage: '/hero-bg.jpg',
    imageSlider: [
      { id: 1, image: '/campaigns/slider2.png', title: 'Welcome', subtitle: 'Transform your business with our innovative solutions' },
    ],
  },
  features: {
    title: 'Our Features',
    description: 'Discover what makes us special',
    items: [
      { id: 1, title: 'Fast Performance', description: 'Lightning-fast performance that scales with your needs', icon: 'Speed' },
    ],
  },
  products: [
    { id: 1, name: 'Product 1', description: 'High-quality product with excellent features', image: '/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg', price: '$99.99' },
  ],
  about: {
    title: 'About Our Company',
    description: 'We are a leading technology company dedicated to providing innovative solutions.',
    image: '/about-image.jpg',
  },
  contact: {
    title: 'Get in Touch',
    description: 'Ready to get started? Contact us today!',
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
  },
});

// Content CRUD via Supabase
// Table: content (id: text primary key, data: jsonb)
export const getContent = async () => {
  try {
    const { data, error } = await supabase.from('content').select('data').eq('id', 1).single();
    if (error && error.code !== 'PGRST116') {
      return { success: false, error: error.message };
    }
    if (!data || !data.data) {
      return { success: true, data: getDefaultContent() };
    }
    return { success: true, data: data.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateContent = async (content) => {
  try {
    const { error } = await supabase.from('content').upsert({ id: 1, data: content }, { onConflict: 'id' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Storage helpers
// Bucket: assets (public)
export const uploadImageToStorage = async (file, folder = 'uploads') => {
  try {
    if (!file) return { success: false, error: 'No file provided' };
    const fileExtension = file.name?.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const safeName = (file.name || `image.${fileExtension}`).replace(/[^a-zA-Z0-9_.-]/g, '_');
    const path = `${folder}/${timestamp}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('assets').upload(path, file, { upsert: true, cacheControl: '3600' });
    if (uploadError) return { success: false, error: uploadError.message };
    const { data } = supabase.storage.from('assets').getPublicUrl(path);
    return { success: true, url: data.publicUrl };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default supabase;


