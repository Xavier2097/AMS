export function CartModal({ items, onClose }) {
    // Calcular el total de los precios
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <div
        className="modal-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "var(--background-color)",
            borderRadius: "8px",
            padding: "20px",
            minWidth: "300px",
            maxWidth: "500px",
            maxHeight: "80vh", // Limitar la altura del modal
            overflowY: "auto", // Hacer que sea desplazable
          }}
        >
          <h2>Detalles del Carrito</h2>
          {items.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              <ul style={{ padding: "0", margin: "10px 0" }}>
                {items.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                    }}
                  >
                    {/* Nombre del producto */}
                    <div>
                      <strong>{item.name}</strong>
                    </div>
  
                    {/* Información adicional: color, almacenamiento y cantidad */}
                    <div style={{ fontSize: "0.9em", color: "var(--text-color)" }}>
                      <p>Color: {item.colorCode || "N/A"}</p>
                      <p>Almacenamiento: {item.storageCode || "N/A"}</p>
                      <p>
                        Cantidad: {item.quantity} x{" "}
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
  
              {/* Total */}
              <hr style={{ margin: "10px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </span>
              </div>
            </>
          )}
          <button
            onClick={onClose}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              backgroundColor: "var(--secondary-color)",
              color: "var(--primary-color)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }
  