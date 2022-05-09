import "./statusbanner.css";

function StatusBanner() {
  return (
    <div className="status-banner status-online">
      <div className="status-circle"></div>
      <p>System Online! :)</p>
      <div className="status-circle"></div>
    </div>
  );
}

export default StatusBanner;
