import { APIProvider, Map, MapCameraChangedEvent, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { supabase } from '../supabaseClient';
import { useEffect, useState, useMemo } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';

type Spot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  wifi: boolean;
  power: boolean;
  talking: boolean;
};




// supabaseからデータ取得


const MapPage = () => {

  const navigate=useNavigate();
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filters, setFilters] = useState<{ wifi: boolean; power: boolean; talking: boolean }>({
    wifi: false,
    power: false,
    talking: false,
  });

  const toggleFilters = (key: 'wifi' | 'power' | 'talking') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    async function fetchSpots() {
      const { data, error } = await supabase.from('study_spots').select('*');

      if (error) {
        console.error('Error fetching spots:', error);
      } else {
        console.log('Data fetched:', data);
        setSpots(data);
      }
    }

    fetchSpots();
  }, []);

  const filteredSpots = useMemo(()=>{
  return spots.filter((spot) => {
    if (filters.wifi && !spot.wifi) return false;
    if (filters.power && !spot.power) return false;
    if (filters.talking && !spot.talking) return false;
    return true;
  });
  },[spots, filters])



  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <button onClick={() => toggleFilters('wifi')}>{filters.wifi ? '✅' : ''}</button>
      <button onClick={() => toggleFilters('power')}>power</button>
      <button onClick={() => toggleFilters('talking')}>talking</button>

      <APIProvider apiKey={apiKey}>
        <Map
          key={JSON.stringify(filters)}
          style={{ width: '100%', height: '100%' }}
          defaultZoom={13}
          defaultCenter={{ lat: 49.2796, lng: -123.115 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        >
          {filteredSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              title={spot.name}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}

          {/*  吹き出し（InfoWindow）の追加部分 */}
          {selectedSpot && (
            <InfoWindow
              position={{
                lat: selectedSpot.latitude,
                lng: selectedSpot.longitude,
              }}
              onCloseClick={() => setSelectedSpot(null)} // 閉じたら非表示
            >
              <div>
                <h4>{selectedSpot.name}</h4>
                <p>WiFi: {selectedSpot.wifi ? 'あり' : 'なし'}</p>
                <p>電源: {selectedSpot.power ? 'あり' : 'なし'}</p>
                <p>声出しOK: {selectedSpot.talking ? 'OK' : '不可'}</p>
                <button onClick={() => navigate(`/spot/${selectedSpot.id}`)}>詳細を見る</button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapPage;



// //  修正版 MapPage.tsx
// import { APIProvider, Map, MapCameraChangedEvent, Marker, InfoWindow } from '@vis.gl/react-google-maps';
// import { supabase } from '../supabaseClient';
// import { useEffect, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

// // --- Spot型定義 ---
// type Spot = {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
//   wifi: boolean;
//   power: boolean;
//   talking: boolean;
// };

// const MapPage = () => {
//   const navigate = useNavigate();
//   const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   const [spots, setSpots] = useState<Spot[]>([]);

//   // filters のキーは Supabase カラムに合わせて talking に統一
//   const [filters, setFilters] = useState<{ wifi: boolean; power: boolean; talking: boolean }>({
//     wifi: false,
//     power: false,
//     talking: false,
//   });

//   //oggleFilters: prevState を使って安全にトグル更新
//   const toggleFilters = (key: 'wifi' | 'power' | 'talking') => {
//     setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   //  Supabaseからデータを取得
//   useEffect(() => {
//     async function fetchSpots() {
//       const { data, error } = await supabase.from('study_spots').select('*');
//       if (error) {
//         console.error('Error fetching spots:', error);
//       } else {
//         console.log('Data fetched:', data);
//         setSpots(data);
//       }
//     }
//     fetchSpots();
//   }, []);

//   //  useMemoで filters に依存して再計算
//   const filteredSpots = useMemo(() => {
//     const result = spots.filter((spot) => {
//       if (filters.wifi && !spot.wifi) return false;
//       if (filters.power && !spot.power) return false;
//       if (filters.talking && !spot.talking) return false;
//       return true;
//     });

//     console.log('filters:', filters);
//     console.log('filteredSpots:', result);
//     return result;
//   }, [spots, filters]); // ← filtersが変わるたびに再評価される

//   return (
//     <div style={{ height: '100vh', width: '100vw' }}>
//       {/*  フィルターボタン */}
//       <div style={{ display: 'flex', gap: '8px', padding: '8px' }}>
//         <button onClick={() => toggleFilters('wifi')}>
//           WiFi {filters.wifi ? '✅' : ''}
//         </button>
//         <button onClick={() => toggleFilters('power')}>
//           Power {filters.power ? '✅' : ''}
//         </button>
//         <button onClick={() => toggleFilters('talking')}>
//           Voice OK {filters.talking ? '✅' : ''}
//         </button>
//       </div>

//       <APIProvider apiKey={apiKey}>
//         {/*  filtersをkeyにしてMap再描画を強制 */}
//         <Map
//           key={JSON.stringify(filters)}
//           style={{ width: '100%', height: '100%' }}
//           defaultZoom={13}
//           defaultCenter={{ lat: 49.2796, lng: -123.115 }}
//           onCameraChanged={(ev: MapCameraChangedEvent) =>
//             console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
//           }
//         >
//           {/* filteredSpotsを使ってピンを描画 */}
//           {filteredSpots.map((spot) => (
//             <Marker
//               key={spot.id}
//               position={{ lat: spot.latitude, lng: spot.longitude }}
//               title={spot.name}
//               onClick={() => setSelectedSpot(spot)}
//             />
//           ))}

//           {/* ピンをクリックしたときのInfoWindow */}
//           {selectedSpot && (
//             <InfoWindow
//               position={{
//                 lat: selectedSpot.latitude,
//                 lng: selectedSpot.longitude,
//               }}
//               onCloseClick={() => setSelectedSpot(null)}
//             >
//               <div>
//                 <h4>{selectedSpot.name}</h4>
//                 <p>WiFi: {selectedSpot.wifi ? 'あり' : 'なし'}</p>
//                 <p>電源: {selectedSpot.power ? 'あり' : 'なし'}</p>
//                 <p>声出しOK: {selectedSpot.talking ? 'OK' : '不可'}</p>
//                 <button onClick={() => navigate(`/spot/${selectedSpot.id}`)}>
//                   詳細を見る
//                 </button>
//               </div>
//             </InfoWindow>
//           )}
//         </Map>
//       </APIProvider>
//     </div>
//   );
// };

// export default MapPage;
