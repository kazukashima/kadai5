import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function SpotDetailPage() {
  const { id } = useParams();
  const [spot, setSpot] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("study_spots")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setSpot(data));
  }, [id]);

  if (!spot) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{spot.name}</h2>
      <p>住所: {spot.address}</p>
      <p>営業時間: {spot.hours}</p>
      {/* 以下の理解 */}
      {spot.photo_url && <img src={spot.photo_url} alt={spot.name} />}
      <a href={`https://maps.google.com/?q=${spot.latitude},${spot.longitude}`}>開く</a>
    </div>
  );
}
