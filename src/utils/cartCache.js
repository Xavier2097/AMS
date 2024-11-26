const CART_COUNT_KEY = "cartCount";
const CACHE_EXPIRATION_KEY = "cartCacheExpiration";
const CART_ITEMS_KEY = "cartItems";

export const updateCartCount = (count) => {
  localStorage.setItem(CART_COUNT_KEY, count.toString());
  const expirationTime = (Date.now() + 60 * 60 * 1000).toString();
  localStorage.setItem(CACHE_EXPIRATION_KEY, expirationTime);
};

export const getCartCount = () => {
  const expirationTime = localStorage.getItem(CACHE_EXPIRATION_KEY);
  if (expirationTime && Date.now() > Number(expirationTime)) {
    localStorage.removeItem(CART_COUNT_KEY);
    localStorage.removeItem(CACHE_EXPIRATION_KEY);
    localStorage.removeItem(CART_ITEMS_KEY);
    return 0;
  }
  return Number(localStorage.getItem(CART_COUNT_KEY)) || 0;
};

export const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    const existingItemIndex = cart.findIndex((i) => i.id === item.id && i.colorCode === item.colorCode && i.storageCode === item.storageCode);
  
    if (existingItemIndex !== -1) {
      // Si el producto ya existe en el carrito, incrementa la cantidad
      cart[existingItemIndex].quantity += 1;
    } else {
      // Si el producto no existe, añade un nuevo ítem con cantidad 1
      cart.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cart));
  
    // Actualiza el contador global basado en la cantidad total de productos
    const totalItems = cart.reduce((total, i) => total + i.quantity, 0);
    updateCartCount(totalItems);
  };

  export const getCartItems = () => {
    // Recupera los items del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    return cart;  // Retorna los items del carrito
  };