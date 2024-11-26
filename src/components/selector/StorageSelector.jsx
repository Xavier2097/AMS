export function StorageSelector({
  storages = [],
  selectedStorage,
  onStorageSelect,
}) {
  const handleChange = (e) => {
    const selected = e.target.value;
    onStorageSelect(selected);
  };

  return (
    <select
      value={selectedStorage || ""}
      onChange={handleChange}
      style={{
        padding: "5px",
        margin: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        width: "200px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "var(--primary-color)",
        color: "var(--secondary-color)",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <option value="" disabled>
        Selecciona una opción
      </option>
      {storages.map((storage, index) => (
        <option key={index} value={storage}>
          {storage}
        </option>
      ))}
    </select>
  );
}
