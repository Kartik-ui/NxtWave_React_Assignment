import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import "./ListContainer.css";

const ListContainer = ({
  data,
  listNumber,
  isChecked,
  isClicked,
  list3Checked,
  setIsChecked,
  handleClick,
}) => {
  const dataLength = () => {
    return isChecked && isClicked ? `(${data.length})` : null;
  };

  return (
    <div className="list">
      <label className="checkbox">
        <input
          type="checkbox"
          value={isChecked}
          checked={isChecked}
          onChange={setIsChecked}
          disabled={list3Checked}
        />
        List {listNumber} {dataLength()}
      </label>
      <div className="card">
        {data.map((item) => (
          <div
            className="card_items"
            key={item.id}
            onClick={() => {
              if (list3Checked && isClicked) handleClick(item, listNumber);
            }}
          >
            <p className="list_name">{item.name}</p>
            <p className="list_description">{item.description}</p>
            {item.list_number === 1 && list3Checked && isClicked ? (
              <ArrowRight style={{ alignSelf: "flex-end" }} />
            ) : item.list_number === 2 && list3Checked && isClicked ? (
              <ArrowLeft style={{ alignSelf: "flex-end" }} />
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ListContainer);
