import "./textterminal.css";

function TextTerminal() {
  return (
    <div className="text-box-container">
      <p>
        {"<"} Enter Text {">"}
      </p>
      <textarea
        className="text-box"
        cols="50"
        rows="10"
        maxLength="100"
      ></textarea>
    </div>
  );
}

export default TextTerminal;
