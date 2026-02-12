// 地図初期化
const map = L.map("map").setView([33.5597, 133.5311], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let userMarker;
let shelterMarkers = [];
let routeLine;

// 避難所データ（例）
const shelters = [
  { name: "高知市役所", lat: 33.55883, lng: 133.53122 },
  { name: "中央公園", lat: 33.56160, lng: 133.53377 }
];

// 現在地取得
function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    if (userMarker) map.removeLayer(userMarker);

    userMarker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup("現在地")
      .openPopup();

    map.setView([lat, lng], 15);
  });
}

// 避難所表示
function showShelters() {
  shelterMarkers.forEach(m => map.removeLayer(m));
  shelterMarkers = [];

  shelters.forEach(s => {
    const m = L.marker([s.lat, s.lng])
      .addTo(map)
      .bindPopup("避難所：" + s.name);
    shelterMarkers.push(m);
  });
}

// 最寄り避難所へ
function routeToShelter() {
  if (!userMarker) {
    alert("先に現在地を取得してください");
    return;
  }

  const u = userMarker.getLatLng();
  let nearest = shelters[0];
  let minDist = Infinity;

  shelters.forEach(s => {
    const d = Math.hypot(u.lat - s.lat, u.lng - s.lng);
    if (d < minDist) {
      minDist = d;
      nearest = s;
    }
  });

  if (routeLine) map.removeLayer(routeLine);

  routeLine = L.polyline([
    [u.lat, u.lng],
    [nearest.lat, nearest.lng]
  ]).addTo(map);

  alert("最寄り避難所は " + nearest.name);
}

