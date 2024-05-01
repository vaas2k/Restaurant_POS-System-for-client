import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'xxnm21nsa8x01lma232accs2q1x002';

export async function POST(request) {
  await dbConnect();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return new Response(JSON.stringify({ token , name : user.name }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}