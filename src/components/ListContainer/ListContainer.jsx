import { ArrowLeft, ArrowRight } from "lucide-react";
import "./ListContainer.css";

const ListContainer = ({
  data,
  listNumber,
  isChecked,
  setIsChecked,
  handleClick,
}) => {
  return (
    <div className="list">
      <label className="checkbox">
        <input
          type="checkbox"
          value={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        List {listNumber}
      </label>
      <div className="card">
        {data.map((item) => {
          if (item.list_number === listNumber || listNumber === 3) {
            return (
              <div
                className="card_items"
                key={item.id}
                onClick={() => handleClick(item, listNumber)}
              >
                <p>{item.name}</p>
                <p>{item.description}</p>
                {item.list_number === 1 ? (
                  <ArrowRight style={{ alignSelf: "flex-end" }} />
                ) : item.list_number === 2 ? (
                  <ArrowLeft style={{ alignSelf: "flex-end" }} />
                ) : (
                  <></>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ListContainer;
