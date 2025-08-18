import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'src/data/content.json');

// GET - Retrieve all content
export async function GET() {
  try {
    const fileContents = fs.readFileSync(contentFilePath, 'utf8');
    const content = JSON.parse(fileContents);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

// PUT - Update content
export async function PUT(request) {
  try {
    const updatedContent = await request.json();
    
    // Write the updated content back to the file
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
