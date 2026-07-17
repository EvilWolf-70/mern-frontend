import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useOrders } from "../contexts/OrderContext";
const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const { placeOrder, getMyOrders } = useOrders();
  

  const handlePlaceOrder = async () => {


    const orderData = {
      shippingAddress: {
        fullName: "John Doe",
        phone: "9876543210",
        address: "12 Main Street",
        city: "Salem",
        state: "Tamil Nadu",
        postalCode: "636001",
        country: "India",
      },

      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        quantity: item.qty,
        price: item.price,
      })),

      paymentMethod: "COD",

      itemsPrice: totalPrice,

      shippingPrice: 100,

      taxPrice: totalPrice * 0.18,

      totalPrice: totalPrice + 100 + totalPrice * 0.18,
    };

    const result = await placeOrder(orderData);

    if (result.success) {
      await getMyOrders();
      
      alert("Order placed successfully!");
  

      clearCart();

      navigate("/");
    } else {
      alert(result.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition duration-300"
          >
            Clear Cart
          </button>
        )}
      </div>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-xl p-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>

                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <div className="bg-gray-100 p-6 rounded-xl w-80">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>

            <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
