import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListContainer from "../../components/ListContainer/ListContainer";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [list3Data, setList3Data] = useState([]);
  const [list1Checked, setList1Checked] = useState(false);
  const [list2Checked, setList2Checked] = useState(false);
  const [list3Checked, setList3Checked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apis.ccbp.in/list-creation/lists"
        );
        const json = await response.json();
        setData(json.lists);
      } catch (error) {
        console.log(error.message);
        navigate("/fail");
      }
    };
    fetchData();
  }, [navigate]);

  const handleListCheck = useCallback(() => {
    if (list1Checked && list2Checked) {
      setList3Checked(true);
      setError("");
    } else {
      setList3Checked(false);
      setError("You should select exactly 2 lists to create a new list");
    }
    setIsClicked(true);
  }, [list1Checked, list2Checked]);

  const handleListContainers = (entry, listNumber) => {
    if (listNumber === 1 || listNumber === 2) {
      setList3Data((prev) => [...prev, entry]);
      setData((prev) => prev.filter((item) => item.id !== entry.id));
    } else if (listNumber === 3) {
      let exitList = list3Data.filter((item) => item.id !== entry.id);
      let moveList = list3Data.find((item) => item.id === entry.id);

      if (entry.list_number === 1) {
        setList3Data(exitList);
        setData((prev) => [{ ...moveList, list_number: 2 }, ...prev]);
      } else if (entry.list_number === 2) {
        setList3Data(exitList);
        setData((prev) => [{ ...moveList, list_number: 1 }, ...prev]);
      }
    }
  };

  console.log("list3data", list3Data);
  console.log("data", data);

  return (
    <section className="hero_container">
      <h1>List Creation</h1>
      <button onClick={handleListCheck}>Create a new list</button>
      {isClicked && <p className="error_message">{error}</p>}
      <div className="list_container">
        <ListContainer
          data={data}
          setData={setData}
          listNumber={1}
          isChecked={list1Checked}
          setIsChecked={setList1Checked}
          handleClick={handleListContainers}
        />
        {list3Checked && (
          <ListContainer
            data={list3Data}
            setData={setList3Data}
            listNumber={3}
            handleClick={handleListContainers}
          />
        )}
        <ListContainer
          data={data}
          setData={setData}
          listNumber={2}
          isChecked={list2Checked}
          setIsChecked={setList2Checked}
          handleClick={handleListContainers}
        />
      </div>
    </section>
  );
};

export default Hero;
