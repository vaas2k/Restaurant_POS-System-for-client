import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcrypt';

export async function POST(request) {
  await dbConnect();

  const { name, email, password, role } = await request.json();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response('User with this email already exists', { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || 'employee', // default role is 'employee'
  });

  try {
    await newUser.save();
    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}