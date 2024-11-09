import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { command } = await req.json();

    if (!command) {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 });
    }

    // Command injection vulnerability: executes user-provided command directly
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 400 });
    }

    return NextResponse.json({ output: stdout }, { status: 200 });
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json({ error: 'Command execution failed' }, { status: 500 });
  }
}
