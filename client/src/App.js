import axios from "axios";
import { useEffect, useState } from "react";
import loadingIcon from "./assets/alternate.gif";
function App() {
  const [listOfPhoneBook, setPhoneBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    axios
      .get("http://localhost:6200/getPhoneBook")
      .then((response) => {
        setPhoneBookList(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  //synthesize object for the body in the 2nd parameter these are actually states
  //add form
  const addPhoneNumber = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    axios
      .post("http://localhost:6200/addPhoneNumber", {
        name: name,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        setPhoneBookList([
          ...listOfPhoneBook,
          { name: name, phoneNumber: phoneNumber },
        ]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // setLoading(true);
      });
  };

  // if (loading) {
  //   return (
  //     <>
  //       <img src={loadingIcon} alt="" />
  //     </>
  //   );
  // }
  if (error) {
    return <h1>Error</h1>;
  }
  //get Data
  return (
    <>
      <div className="AppI">
        {loading ? (
          <>
            <img src={loadingIcon} alt="" />
          </>
        ) : (
          <div className="display">
            {listOfPhoneBook.map((contactRecord) => {
              return (
                <div>
                  <h1>Contact Name: {contactRecord?.name}</h1>
                  <h1>Phone Number : {contactRecord?.phoneNumber}</h1>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
        <button onClick={addPhoneNumber}>Add </button>
      </div>
    </>
  );
}

export default App;
