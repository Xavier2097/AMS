import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export function InputSearch({ onChange }) {
  return (
    <div>
      <TextField
        id="outlined-search"
        label="Buscar Producto"
        type="search"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={{ color: "var(--placeholder-color)" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px", // Campo redondeado
            color: "var(--secondary-color)", // Texto del input
            "& fieldset": {
              borderColor: "var(--placeholder-color)", // Borde predeterminado
            },
            "&:hover fieldset": {
              borderColor: "var(--secondary-color)", // Borde al pasar el mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--secondary-color)", // Borde cuando está enfocado
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--placeholder-color)", // Color del label predeterminado
          },
          "& .Mui-focused .MuiInputLabel-root": {
            color: "var(--secondary-color)", // Color del label cuando está enfocado
          },
          "& .MuiInputAdornment-root svg": {
            color: "var(--placeholder-color)", // Color predeterminado del ícono
          },
          "& .Mui-focused .MuiInputAdornment-root svg": {
            color: "var(--secondary-color)", // Color del ícono cuando está enfocado
          },
        }}
        onChange={onChange}
      />
    </div>
  );
}
