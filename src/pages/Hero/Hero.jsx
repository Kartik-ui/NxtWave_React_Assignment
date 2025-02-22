import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListContainer from "../../components/ListContainer/ListContainer";
import Loader from "../../components/Loader/Loader";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [list3Data, setList3Data] = useState([]);
  const [checkedLists, setCheckedLists] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const initialDataRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://apis.ccbp.in/list-creation/lists"
        );
        const json = await response.json();
        setData(json.lists);
        initialDataRef.current = json.lists;
      } catch (err) {
        console.log(err.message);
        navigate("/fail");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const list1Data = useMemo(
    () => data.filter((item) => item.list_number === 1),
    [data]
  );
  const list2Data = useMemo(
    () => data.filter((item) => item.list_number === 2),
    [data]
  );

  const handleListCheck = () => {
    if (checkedLists[1] && checkedLists[2]) {
      setCheckedLists((prev) => ({ ...prev, 3: true }));
      setError("");
    } else {
      setCheckedLists((prev) => ({ ...prev, 3: false }));
      setError("You should select exactly 2 lists to create a new list");
    }
    setIsClicked(true);
  };

  const handleCheckChange = useCallback((listNumber) => {
    setCheckedLists((prev) => ({
      ...prev,
      [listNumber]: !prev[listNumber],
    }));
  }, []);

  const handleListContainers = useCallback(
    (entry, listNumber) => {
      if (listNumber === 1 || listNumber === 2) {
        setList3Data((prev) => [...prev, entry]);
        setData((prev) => prev.filter((item) => item.id !== entry.id));
      } else if (listNumber === 3) {
        const exitList = list3Data.filter((item) => item.id !== entry.id);
        const moveList = list3Data.find((item) => item.id === entry.id);
        if (entry.list_number === 1) {
          setList3Data(exitList);
          setData((prev) => [{ ...moveList, list_number: 2 }, ...prev]);
        } else if (entry.list_number === 2) {
          setList3Data(exitList);
          setData((prev) => [{ ...moveList, list_number: 1 }, ...prev]);
        }
      }
    },
    [list3Data]
  );

  const handleCancel = () => {
    setData(initialDataRef.current);
    setList3Data([]);
    setCheckedLists({ 1: false, 2: false, 3: false });
    setIsClicked(false);
    setError("");
  };

  const handleUpdate = () => {
    setCheckedLists({ 1: false, 2: false, 3: false });
    setIsClicked(false);
    setError("");
  };

  return (
    <section className="hero_container">
      <h1>List Creation</h1>
      <button onClick={handleListCheck}>Create a new list</button>
      {isClicked && <p className="error_message">{error}</p>}

      <div className="list_container">
        {isLoading ? (
          <div className="loader_wrapper">
            <Loader />
          </div>
        ) : (
          <>
            <ListContainer
              data={list1Data}
              listNumber={1}
              isChecked={checkedLists[1]}
              isClicked={isClicked}
              list3Checked={checkedLists[3]}
              setIsChecked={() => handleCheckChange(1)}
              handleClick={handleListContainers}
            />
            {checkedLists[3] && (
              <ListContainer
                data={list3Data}
                listNumber={3}
                isChecked={checkedLists[3]}
                isClicked={isClicked}
                list3Checked={checkedLists[3]}
                handleClick={handleListContainers}
              />
            )}
            <ListContainer
              data={list2Data}
              listNumber={2}
              isChecked={checkedLists[2]}
              isClicked={isClicked}
              list3Checked={checkedLists[3]}
              setIsChecked={() => handleCheckChange(2)}
              handleClick={handleListContainers}
            />
          </>
        )}
      </div>

      <div className="btn">
        <button onClick={handleCancel} className="cancel_btn">
          Cancel
        </button>
        <button onClick={handleUpdate} className="update_btn">
          Update
        </button>
      </div>
    </section>
  );
};

export default Hero;
