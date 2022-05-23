import "./textterminal.css";
import { useState } from "react";

function TextTerminal(props) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div className="text-box-container">
      <p>
        {"<"} Enter Text {">"}
      </p>
      <textarea
        className="text-box"
        placeholder="> |"
        value={message}
        onChange={handleMessageChange}
        cols="50"
        rows="10"
        maxLength="100"
      ></textarea>
    </div>
  );
}

export default TextTerminal;