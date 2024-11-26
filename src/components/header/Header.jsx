import { useEffect, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import amsLogo from "../../assets/logo/ams-shop-logo.png";
import { ThemeToggle } from "../../components/buttons/ThemeToggle.jsx";
import { BtnPrimary } from "../buttons/BtnPrimary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getCartCount, getCartItems } from "../../utils/cartCache";
import { CartModal } from "../modal/CartModal";

export function Header({ navButtons }) {
  const { url } = useLocation();
  const [active, setActive] = useState(url);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [isModalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartCount(getCartCount());
    setCartItems(getCartItems());
  }, [cartItems]);

  const openCartModal = () => {
    setCartItems(getCartItems());
    setModalOpen(true);
  };

  const closeCartModal = () => setModalOpen(false);

  // Función para manejar la selección de categorías
  const BtnNavHeader = (category = "") => {
    setActive(category);
  };

  // Obtener la ruta actual para el breadcrumb
  const currentPage =
    navButtons.find((button) => button.href === url)?.title || "DETALLES";

  return (
    <header className="header">
      <div className="logo-container">
        {/* Logo como enlace a la página principal */}
        <a href="/" className="logo-img">
          <img src={amsLogo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="nav-container">
        <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
          {/* Navegación */}
          <nav>
            {navButtons.map((button) => (
              <a
                key={button.id}
                href={button.href}
                class={url === button.href ? "active" : ""}
                onClick={() => BtnNavHeader(button.id)} // Establecer el botón activo
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "25px",
                }}
              >
                <BtnPrimary
                  key={button.id}
                  variant="text"
                  onClick={() => BtnNavHeader(button.id)}
                  title={button.title}
                  color={
                    active === button.id
                      ? "var(--secondary-color)"
                      : "var(--terciary-color)"
                  }
                />
              </a>
            ))}
            <span
              style={{
                flex: 1,
                borderRadius: "25px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginLeft: "15px",
                marginRight: "15px",
                fontWeight: "bolder",
              }}
            >
              /{currentPage}
            </span>
          </nav>
          {/* Botón del carrito con eventos de hover */}
          <div
            className="cart-container"
            style={{ position: "relative", cursor: "pointer" }}
            onMouseEnter={openCartModal}
            onMouseLeave={closeCartModal}
          >
            <span className="cart-items" style={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon style={{ fontSize: 20, marginRight: "5px" }} />
              {cartCount} ítem(s)
            </span>
            {isModalOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <CartModal items={cartItems} onClose={closeCartModal} />
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
