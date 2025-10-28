import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from "./pages/Map";
import SpotDetailPage from './pages/SpotDetailPage';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* 地図ページ → "/" にアクセスしたとき */}
        <Route path="/map" element={<MapPage />} />

        {/* 詳細ページ → "/spot/3" のようなURLで開く */}
        <Route path="/spot/:id" element={<SpotDetailPage />} />
        <Route path="/" element={<Home/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
