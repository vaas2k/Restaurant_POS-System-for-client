import Order from '../../../models/Order';
import dbConnect from '../../../lib/dbConnect';
import { formatDate } from '../../../utils/formatDate';

export async function POST(request) {
  const { items, waiterName, tableNumber } = await request.json();

  console.log(items, waiterName, tableNumber);

  try {
    await dbConnect();
    const newOrder = new Order({
      items,
      waiterName,
      tableNumber,
      createdAt: new Date(),
    });

    await newOrder.save();

    return new Response(JSON.stringify({ message: 'Order placed successfully' }), {
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

export async function GET(request) {
  await dbConnect();

  const { startDate, endDate } = Object.fromEntries(request.nextUrl.searchParams);

  try {
    const filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(`${startDate} 00:00:00`),
        $lte: new Date(`${endDate} 23:59:59`),
      };
    }

    const orders = await Order.find(filter);

    return new Response(JSON.stringify(orders), {
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