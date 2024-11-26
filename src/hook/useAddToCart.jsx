import { useState } from "preact/hooks";
import { addToCart, getCartItems, updateCartCount } from "../utils/cartCache";

export const useAddToCart = (product, selectedColor, selectedStorage) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems()); // Inicializa con los elementos existentes en el carrito

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) {
      alert("Por favor selecciona un color y una capacidad de almacenamiento.");
      return;
    }

    setIsAdding(true); // Mostrar estado de carga
    try {
      const response = await fetch(
        "https://itx-frontend-test.onrender.com/api/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id, // ID del producto
            colorCode: selectedColor,
            storageCode: selectedStorage,
          }),
        }
      );

      if (!response.ok)
        throw new Error("Error al añadir el producto al carrito");

      const data = await response.json();
      updateCartCount(data.count); // Actualiza el contador global con la cantidad total

      // Generar un identificador único para este producto (ID + color + almacenamiento)
      const uniqueKey = `${product.id}-${selectedColor}-${selectedStorage}`;

      const updatedCartItems = [...cartItems];
      const existingItemIndex = updatedCartItems.findIndex(
        (item) => item.key === uniqueKey
      );

      if (existingItemIndex >= 0) {
        // Si el producto ya existe con el mismo color y almacenamiento, incrementa la cantidad
        updatedCartItems[existingItemIndex].quantity += 1;
      } else {
        // Si es un nuevo producto, agrégalo al carrito
        updatedCartItems.push({
          key: uniqueKey, // Clave única
          id: product.id,
          name: product.model,
          price: product.price,
          colorCode: selectedColor,
          storageCode: selectedStorage,
          quantity: 1, // Inicia con cantidad 1
        });
      }

      addToCart({
        key: uniqueKey,
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
        name: product.model,
        price: product.price,
        quantity: 1,
      });

      setCartItems(updatedCartItems); // Actualiza el carrito en la UI
      alert("Producto añadido al carrito correctamente.");
    } catch (error) {
      console.error("Error:", error.message);
      alert("No se pudo añadir el producto al carrito.");
    } finally {
      setIsAdding(false); // Restablecer el estado
    }
  };

  return { handleAddToCart, isAdding, cartItems };
};
