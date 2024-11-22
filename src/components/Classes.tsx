import { CLASS_LIST } from "../consts";

export default function Classes({ Attribute, selClass }) {
  const SelectedClass = Object.entries(CLASS_LIST).map(
    ([className, attributes]) => {
      const allSmaller = Object.entries(attributes).every(
        ([key, val]) => val <= Attribute[key]
      );
      return { className, allSmaller };
    }
  );

  return (
    <>
      <div key="class">
        <span className="title-font">Classes</span>
        <ul>
          {SelectedClass.map((item, index) => (
            <li key={index}>
              <span
                onClick={() => selClass(item.className)}
                style={{
                  cursor: "pointer",
                  color: item.allSmaller ? "red" : "white",
                }}
              >
                {item.className}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
