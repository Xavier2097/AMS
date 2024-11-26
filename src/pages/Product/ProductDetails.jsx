import { useLocation } from "preact-iso";
import { BtnPrimary } from "../../components/buttons/BtnPrimary";
import { SpecList } from "../../components/list/SpecList";
import { ColorSelector } from "../../components/selector/ColorSelector";
import { useEffect, useState } from "preact/hooks";
import { useProductById } from "../../hook/useProductById";
import { StorageSelector } from "../../components/selector/StorageSelector";
import { useAddToCart } from "../../hook/useAddToCart";

export function ProductDetails() {
  const { path } = useLocation();
  const productId = path.split("/")[2];

  const { product, loading, error } = useProductById(productId);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const { handleAddToCart, isAdding } = useAddToCart(
    product,
    selectedColor,
    selectedStorage
  );

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.code || "");
      setSelectedStorage(
        product.internalMemory.length === 1
          ? product.internalMemory[0]?.code
          : ""
      );
    }
  }, [product]);

  // Handlers para selección
  const handleColorSelection = (color) => setSelectedColor(color);
  const handleStorageSelection = (storage) => setSelectedStorage(storage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const specifications = [
    { label: "Marca", value: product.brand || "N/A" },
    { label: "Modelo", value: product.model || "N/A" },
    {
      label: "Precio",
      value:
        new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(product.price) || "N/A",
    },
    { label: "CPU", value: product.chipset || "N/A" },
    { label: "RAM", value: product.ram || "N/A" },
    { label: "Sistema operativo", value: product.os || "N/A" },
    {
      label: "Resolución de pantalla",
      value: product.displayResolution || "N/A",
    },
    { label: "Batería", value: product.battery || "N/A" },
    {
      label: "Cámara",
      value: (() => {
        const primary = Array.isArray(product.primaryCamera)
          ? product.primaryCamera.join(", ")
          : product.primaryCamera || "";
        const secondary = Array.isArray(product.secondaryCmera)
          ? product.secondaryCmera.join(" / ")
          : product.secondaryCmera || "";

        if (primary && secondary) {
          return `${primary} (Principal), ${secondary} (Secundaria)`;
        } else if (primary) {
          return `${primary} (Principal)`;
        } else if (secondary) {
          return `${secondary} (Secundaria)`;
        }
        return "N/A";
      })(),
    },
    { label: "Dimensiones", value: product.dimentions || "N/A" },
    { label: "Peso", value: product.weight || "N/A" },
  ];

  return (
    <div className="product-detail-container">
      {/* Contenedor general */}
      <div className="product-detail">
        {/* Columna izquierda: Imagen */}
        <div className="product-image">
          <img
            src={product.imgUrl}
            alt={product.model}
            style={{
              width: "80%",
              height: "70%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Columna derecha: Información */}
        <div className="product-info">
          <h1 className="product-title">{product.model}</h1>

          <strong>Descripción</strong>

          <SpecList specifications={specifications} />

          {/* Selección de color */}
          <div className="color-selection">
            <p>
              <strong>Colores disponibles:</strong>
            </p>
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelection}
            />
          </div>

          {/* Selección de almacenamiento */}
          <div className="storage-selection">
            <p>
              <strong>Opciones de almacenamiento:</strong>
            </p>
            <StorageSelector
              storages={product.internalMemory}
              selectedStorage={selectedStorage}
              onStorageSelect={handleStorageSelection}
            />
          </div>

          {/* Acciones */}
          <div className="actions">
            <BtnPrimary
              title={isAdding ? "Añadiendo..." : "Agregar al carrito"}
              variant="contained"
              onClick={handleAddToCart}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            />
            <BtnPrimary
              title={"Atrás"}
              variant={"contained"}
              onClick={() => window.history.back()}
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--primary-color)",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
