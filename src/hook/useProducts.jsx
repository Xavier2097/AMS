import { useState, useEffect } from "preact/hooks";

const useProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data)); // Guardar en localStorage
        })
        .catch(() => setError("Error al cargar los productos")) // Omitir `err`
        .finally(() => setLoading(false));
    }
  }, [url]);

  return { products, loading, error };
};

export default useProducts;
