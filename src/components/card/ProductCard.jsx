import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation } from "preact-iso";


export function ProductCard({id, brand, model, price, image }) {

  const { route } = useLocation();  // Usamos navigate de useLocation para manejar la navegación

  const handleCardClick = () => {
    route(`/product-details/${id}`);  // Navegamos al detalle del producto con el id
  };


    return (
      <Card
        sx={{
          width: "auto", // Aumentar el ancho de la tarjeta
          height: 300, // Aumento de altura para acomodar los nuevos campos
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          padding: "16px",
          backgroundColor: "var(--card-color)",
          border: "1px solid var(--primary-color)",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
        onClick={handleCardClick} // Maneja el clic sobre la tarjeta
      >
        {/* Contenedor de la imagen */}
        <div
          style={{
            height: 180,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            borderRadius: "10px",
            marginBottom: "16px",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={model} // Usar model como alt para mayor especificidad
            sx={{
              maxWidth: "100%",
              maxHeight: "70%",
              objectFit: "contain",
            }}
          />
        </div>
  
        {/* Icono de favorito */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "var(--icon-bg-color)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "var(--icon-hover-bg-color)" },
            transition: "background-color 0.3s ease",
          }}
        >
          <FavoriteBorderIcon sx={{ color: "var(--icon-color)" }} />
        </IconButton>
  
        {/* Contenido de la tarjeta */}
        <CardContent sx={{ padding: "8px 16px" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--secondary-color)",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              marginBottom: "8px",
            }}
          >
            {model} {/* Mostrar el modelo del producto */}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#777",
              marginBottom: "4px",
            }}
          >
            {brand} {/* Mostrar la marca */}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", fontWeight: 500, color: "#777" }}
          >
           {/* Mostrar el precio */}
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(price)}
          </Typography>
        </CardContent>
  
        {/* Icono de carrito */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "var(--icon-bg-color)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "var(--icon-hover-bg-color)" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ color: "var(--icon-color)" }} />
        </IconButton>
      </Card>
    );
  }
