import { useState, useEffect } from "preact/hooks";

export function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts)); // Usar productos del localStorage
        setLoading(false);
      } else {
        try {
          setLoading(true); // Inicia el estado de carga
          const response = await fetch("https://itx-frontend-test.onrender.com/api/product/");
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setProducts(data); // Actualiza los productos
          localStorage.setItem("products", JSON.stringify(data)); // Guardar en localStorage
        } catch (err) {
          setError(err.message); // Manejo de errores
        } finally {
          setLoading(false); // Detén la carga
        }
      }
    };

    fetchProducts();
  }, []); // Solo se ejecuta al montar el componente

  return { products, loading, error };
}
