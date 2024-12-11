import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../../../services/apiConfig';

interface Order {
  orderId: number;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
}

export const UserOrder  = () => {
  const [orders, setOrders] = useState([] as Order[]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getOrdersByBuyerId(userId));
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }
    return (
        <>
        <div className=" w-full pl-4 ">
        <h2 className="text-2xl font-bold mb-6">Ordered</h2>
          <table className="w-full text-left">
            <thead className="bg-gray-100 border border-solid rounded">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Price</th>
                <th className="p-3 w-4 float-left">Status</th>
                <th className="p-3 ">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className=" border border-solid rounded h-20 hover:bg-[#f5faf5]"
                >
                  <td className="p-3  font-semibold">
                    
                      {order.orderId}
                   
                  </td>

                  <td className="p-3 font-semibold"> {order.totalAmount.toFixed(2)}</td>


                  
                   <td className="p-3  font-semibold">
                  
                  {order.orderStatus}
                  </td>
                  <td className="p-3  font-semibold">
                  
                  {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 ">
                    <button
                       className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() => window.location.href = `/checkorder/${order.orderId}`}
                    >Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        </>
      );

}
