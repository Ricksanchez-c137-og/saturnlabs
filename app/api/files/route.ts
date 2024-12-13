/* eslint-disable  */ 
// @ts-ignore

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function GET() {
  try {
    const files = await fs.readdir(UPLOAD_DIR);
    return NextResponse.json({ files: files.map((name) => ({ name })) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not list files' }, { status: 500 });
  }
}

export async function DELETE(req: any) {
  try {
    const { fileName } = await req.json();
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.unlink(filePath);
    return NextResponse.json({ message: 'File deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not delete file' }, { status: 500 });
  }
}
