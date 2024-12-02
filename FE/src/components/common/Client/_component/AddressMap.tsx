import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFkdWMiLCJhIjoiY200MmNkdnU1Mmo5dTJscXQ0cWFtNGJqeCJ9.3pBGjdx-XHSvKR3BIg-e0Q";

interface Iprop {
  coordinates: { lat: number; lng: number } | null;
  setCoordinates: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

const AddressMap = ({ coordinates, setCoordinates }: Iprop) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !coordinates) return; // Kiểm tra nếu không có coordinates

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates, // Sử dụng coordinates nếu có
      zoom: 12
    });

    // Lắng nghe sự kiện click trên bản đồ
    map.on("click", (e) => {
      const newCoordinates = e.lngLat; // Lấy tọa độ của điểm người dùng click
      setCoordinates({
        lat: newCoordinates.lat,
        lng: newCoordinates.lng
      });
      console.log(
        "Tọa độ mới sau khi click:",
        newCoordinates.lng,
        newCoordinates.lat
      );
    });

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "30vh"
      }}
    />
  );
};

export default AddressMap;
