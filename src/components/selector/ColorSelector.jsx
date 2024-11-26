export const ColorSelector = ({ colors, selectedColor, onColorSelect }) => {
    return (
      <div className="color-buttons">
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              margin: "5px",
              border: selectedColor === color ? "3px solid black" : "1px solid gray",
            }}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    );
  };
  