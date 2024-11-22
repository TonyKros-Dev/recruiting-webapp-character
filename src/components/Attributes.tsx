export default function Attributes({ updateAtt, attList, index }) {
    return (
      <div>
        <span className="title-font">Attributes</span>
        <ul>
          {Object.entries(attList).map(([key, val]) => {
            const numericVal = Number(val); // Ensure 'val' is treated as a number
            return (
              <li key={key}>
                <span>
                  {key}: {numericVal} (Modifier:{" "}
                  {Math.floor((numericVal - 10) / 2)})
                </span>
                <button onClick={() => updateAtt(index, key, 1)}>+</button>
                <button onClick={() => updateAtt(index, key, -1)}>-</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  