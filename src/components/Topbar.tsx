export function Topbar() {
  return (
    <div
      style={{
        backgroundColor: "#c1121f",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: "70px",
        color: "#fdf0d5",
        fontSize: "25px",
      }}
    >
      <h4>Foodie-POS</h4>
      <h4>Sanchaung</h4>
      <h4 style={{ cursor: "pointer" }}>Log out</h4>
    </div>
  );
}
