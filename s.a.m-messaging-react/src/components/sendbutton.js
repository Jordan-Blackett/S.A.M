import "./sendbutton.css";

function SendButton(props) {
  return (
    <button className="send-button" onClick={props.onClick}>
      Send!
    </button>
  );
}

export default SendButton;