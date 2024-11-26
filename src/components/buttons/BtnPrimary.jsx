import { Button } from "@mui/material";

export function BtnPrimary({
  variant,
  onClick = () => {},
  color = "var(--secondary-color)",
  style = {},
  title,
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="btn-primary"
      style={{
        color,
        ...style,
      }}
    >
      {title || BtnPrimary}
    </Button>
  );
}
