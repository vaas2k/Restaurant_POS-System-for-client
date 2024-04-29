import dbConnect from '../../../lib/dbConnect';
import MenuItem from '../../../models/MenuItem';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    const formData = await request.json();
  
    console.log(1);
    try {
      // Connect to the database
      await dbConnect();
  
      // Upload image to Cloudinary
      const { image, ...menuItemData } = formData;
      const uploadedImage = await cloudinary.uploader.upload(image, {
        resource_type : 'image',
        folder : 'menu-items'
      });
  
      // Create new menu item with image URL
      const menuItem = new MenuItem({
        ...menuItemData,
        image: uploadedImage.secure_url
      });
  
  
      // Save menu item to the database
      await menuItem.save();
      console.log(3);
      return new Response(JSON.stringify({
        status: 200,
        body: JSON.stringify({ success: true, message: 'Menu item added successfully' })
      }));
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({
          status: 500,
          body: JSON.stringify({ success: true, message: 'Internal Server Error' })
        }));
    }
  }
