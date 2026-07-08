import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const {
    cartItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

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
                <h2 className="font-semibold text-lg">
                  {item.name}
                </h2>

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
          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>

            <span className="font-bold">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;