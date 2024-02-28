import { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./useFetch";
import loaded from "./assets/icons8-emoji-circulo-verde-96.png";
import loadings from "./assets/icons8-emoji-circulo-verde-96 (1).png";
import dotenv from "dotenv";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const { data, loading, fetchData } = useFetch();
  dotenv.config();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      if (loading) {
        favicon.href = loadings;
      } else {
        favicon.href = loaded;
      }
    }
  }, [loading]);
  useEffect(() => {
    if (!loading && data && data.content) {
      const startIndex = data.content.indexOf("WX##");
      let contentToShow = data.content;
      if (startIndex !== -1) {
        contentToShow = data.content.substring(startIndex + 4);
      }
      setHistory((prevHistory) => [
        ...prevHistory,
        { pregunta: inputValue, respuesta: contentToShow },
      ]);
      setInputValue("");
    }
  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(inputValue);
  };

  return (
    <div className="body">
      <div className="content">
        {loading && <p className="loading">loading ...</p>}
        {history.map((item, index) => (
          <div key={index}>
            <p>{item.pregunta}</p>
            <div className="line"></div>
            <pre>{item.respuesta}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <button className="button_new">New</button>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">&gt;</button>
      </form>
    </div>
  );
}

export default App;
