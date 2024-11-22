import { CLASS_LIST } from "../consts";

export default function MinReq({ selClassName, selClass }) {
  const close = () => {
    selClass("");
  };

  return (
    <>
      {selClassName !== "" && (
        <div>
          <span className="title-font">Barbarian Minimum Requrement</span>
          <ul>
            {Object.entries(
              Object.entries(CLASS_LIST).find(
                ([className]) => className === selClassName
              )?.[1] || {}
            ).map(([attribute, value]) => (
              <li key={attribute}>
                {attribute}: {value}
              </li>
            ))}
          </ul>
          <button onClick={close}>Close Requirement View</button>
        </div>
      )}
    </>
  );
}
