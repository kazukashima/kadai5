import {Link} from "react-router-dom"
export default function Home(){
  return(

    <>
    <div style={{ display: "flex",
    flexDirection: "column", // 縦方向に並べる
    justifyContent: "center", // 縦の中央寄せ
    alignItems: "center", // 横の中央寄せ
    height: "100vh", // 画面の高さ100%
    textAlign: "center",}}>
      <h1>Welcome to Study Spot Finder</h1>
      <p>Find the best spots to study with WiFi and power outlets!</p>
      <div>
        <Link to="/map"><button>Go to Map</button></Link>
    </div>
    </div>
    </>
  )
}