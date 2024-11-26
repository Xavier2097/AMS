export const SpecList = ({ specifications }) => {
    return (
      <ul className="spec-list">
        {specifications.map((spec, index) => (
          <li key={index}>
            <strong>{spec.label}:</strong> {spec.value}
          </li>
        ))}
      </ul>
    );
  };
  