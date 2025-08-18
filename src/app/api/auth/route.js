import { NextResponse } from 'next/server';

// Simple hardcoded credentials for demo purposes
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token: 'admin-token-' + Date.now() // Simple token for demo
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}
