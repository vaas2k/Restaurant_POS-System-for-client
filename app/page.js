import Cart from './cart/page';
import Menu from './menu/page';
import OrderUpdates from '../components/OrderUpdates';

export default function Home() {
  return (
      <div className="grid grid-cols-12">
        <div className=" col-span-8 overflow-y-scroll h-screen">
          <Menu />
        </div>
        <div className=" col-span-4">
          <Cart />
        <OrderUpdates /> 
        </div>
      </div>
  );
}
