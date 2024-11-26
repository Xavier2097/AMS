import { useEffect, useState } from "preact/hooks";

export const useProductById = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null); // Limpiar errores previos
      const storedProduct = localStorage.getItem(`product-${productId}`);

      if (storedProduct) {
        setProduct(JSON.parse(storedProduct)); // Usar el producto desde localStorage
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            `https://itx-frontend-test.onrender.com/api/product/${productId}`
          );

          if (!response.ok) {
            throw new Error("Error al obtener el producto"); // Manejo de errores HTTP
          }

          const data = await response.json();

          // Validar los campos esenciales antes de asignarlos al estado
          if (!data || !data.id || !data.imgUrl) {
            throw new Error("El producto tiene información incompleta");
          }

          // Configurar valores por defecto para campos faltantes
          const validatedProduct = {
            id: data.id,
            model: data.model,
            brand: data.brand || "Marca no especificada",
            imgUrl: data.imgUrl,
            price: data.price,
            colors: data.colors || [],
            internalMemory: data.internalMemory || ["N/A"],
            ram: data.ram || "N/A",
            networkSpeed: data.networkSpeed || "N/A",
            networkTechnology: data.networkTechnology || "N/A",
            battery: data.battery || "N/A",
            dimentions: data.dimentions || "N/A",
            os: data.os || "N/A",
            primaryCamera: data.primaryCamera || ["N/A"],
            secondaryCmera: data.secondaryCmera || ["N/A"],
            wlan: data.wlan || ["N/A"],
            bluetooth: data.bluetooth || ["N/A"],
            chipset: data.chipset || "N/A",
            displayType: data.displayType || "N/A",
          };

          setProduct(validatedProduct);
          localStorage.setItem(`product-${productId}`, JSON.stringify(validatedProduct)); // Guardar producto en localStorage
        } catch (err) {
          setError(err.message || "Error desconocido");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
