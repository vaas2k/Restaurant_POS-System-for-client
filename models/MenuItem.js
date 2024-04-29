import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  image :{
    type : String,
    required : true
  }
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);