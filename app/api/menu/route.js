import MenuItem from '../../../models/MenuItem';
import dbConnect from '../../../lib/dbConnect';


export async function GET(request) {
  await dbConnect();

  try {
    const menuItems = await MenuItem.find({});
    return new Response(JSON.stringify(menuItems), {
      status: 200,
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