import "./style.css";

import { InputSearch } from "../../components/input/InputSearch";
import { ProductCard } from "../../components/card/ProductCard";
import { useFetchProducts } from "../../hook/useFetchProducts";
import Pagination from "../../components/other/Pagination";
import { useState } from "preact/hooks";

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { products, loading, error } = useFetchProducts();
  const [searchProduct, setSearchProduct] = useState(""); // Estado para la búsqueda

  // Filtrar productos basándose en el término de búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.model.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return <div>Cargando productos...</div>; // Mostrar un mensaje de carga
  if (error) return <div>Error: {error}</div>; // Mostrar mensaje de error

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value.toLowerCase());
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  return (
    <div className="home">
      <div className={"search-container"}>
        <InputSearch onChange={handleSearchChange} />
      </div>

      <div className="product-grid">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} // Asegúrate de pasar el id del producto
            brand={product.brand}
            model={product.model}
            price={product.price}
            image={product.imgUrl}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </div>
  );
}
