# Firebase Integration Setup Guide

This guide will help you set up Firebase for your landing page admin panel.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Node.js and npm installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name and follow the setup wizard
4. Enable Google Analytics if desired

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Create Admin User

1. In Authentication, go to "Users" tab
2. Click "Add user"
3. Enter your admin email and password
4. Click "Add user"

## Step 4: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location for your database
5. Click "Done"

## Step 5: Set Up Security Rules

In Firestore Database > Rules, update the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to content
    match /content/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 6: Get Firebase Configuration

1. In your Firebase project, click the gear icon next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web app icon (</>)
5. Register your app with a nickname
6. Copy the configuration object

## Step 7: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
```

## Step 8: Initialize Content

1. Start your development server: `npm run dev`
2. Go to `/admin` and log in with your Firebase credentials
3. The system will automatically create default content in Firestore
4. Edit and save your content - it will be stored in Firebase

## Step 9: Deploy

1. Build your project: `npm run build`
2. Deploy to your hosting platform
3. Make sure to set the environment variables in your production environment

## Security Notes

- The current setup allows anyone to read content but only authenticated users can write
- Consider implementing more restrictive rules for production
- Regularly review your Firebase security rules
- Monitor your Firebase usage and costs

## Troubleshooting

### Common Issues:

1. **Authentication failed**: Check your email/password and ensure the user exists in Firebase
2. **Content not loading**: Verify your Firestore rules allow read access
3. **Save failed**: Ensure your Firestore rules allow write access for authenticated users
4. **Environment variables not working**: Restart your development server after adding `.env.local`

### Debug Mode:

Add this to your browser console to see Firebase connection status:
```javascript
import { auth, db } from '../lib/firebase';
console.log('Auth:', auth);
console.log('DB:', db);
```

## Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify your configuration values
3. Check browser console for JavaScript errors
4. Ensure all dependencies are installed correctly
