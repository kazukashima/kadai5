import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh", // 画面全体の高さ
        width: "100vw", // 画面全体の幅
        display: "flex",
        justifyContent: "center", // 縦方向中央
        alignItems: "center", // 横方向中央
        textAlign: "center", // テキスト中央
        flexDirection: "column", // 縦並び
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Welcome to Study Spot Finder
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Find the best spots to study with WiFi and power outlets!
      </p>
      <Link to="/map">
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1a202c",
            color: "white",
            cursor: "pointer",
          }}
        >
          Go to Map
        </button>
      </Link>
    </div>
  );
}
