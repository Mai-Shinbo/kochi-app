const map = L.map("map").setView([33.5588836,133.5312602], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let userMarker;
let shelterMarkers = [];
let routeLine;

const shelters = [
  {name:"第四小学校",lat:33.5583463,lng:133.5244659},
{name:"高知市役所本庁舎",lat:33.5584977,lng:133.5315975},
{name:"かるぽーと",lat:33.5583882,lng:133.5473320},
{name:"昭和小学校",lat:33.5601081,lng:133.5579187},
{name:"愛宕中学校",lat:33.5702820,lng:133.5353027},
{name:"江ノ口小学校",lat:33.5688332,lng:133.5382035},
{name:"城西中学校",lat:33.5598788,lng:133.5242010},
{name:"旭東小学校",lat:33.5594650,lng:133.5079585},
{name:"潮江東小学校",lat:33.5511986,lng:133.5511039},
{name:"三里小学校",lat:33.5188704,lng:133.5830265},
{name:"五台山ふれあいセンター",lat:33.5441215,lng:133.5834030},
{name:"東部健康福祉センター",lat:33.5553651,lng:133.5734148},
{name:"布師田ふれあいセンター",lat:33.5834593,lng:133.5950810},
{name:"久重小学校",lat:33.6122164,lng:133.5624342},
{name:"秦小学校",lat:33.5779072,lng:133.5355142},
{name:"初月ふれあいセンター",lat:33.5743293,lng:133.5195712},
{name:"朝倉中学校",lat:33.5442520,lng:133.4802071},
{name:"西部健康福祉センター",lat:33.5439438,lng:133.5033559},
{name:"長浜ふれあいセンター",lat:33.5025345,lng:133.5452091},
{name:"御畳瀬ふれあいセンター",lat:33.5049447,lng:133.5560331},
{name:"浦戸ふれあいセンター",lat:33.4975264,lng:133.5669427},
{name:"高知県教育センター",lat:33.5700652,lng:133.6016199},
{name:"介良ふれあいセンター",lat:33.5581890,lng:133.6063463},
{name:"鏡小学校",lat:33.6033758,lng:133.4723623},
{name:"土佐山学舎",lat:33.6338185,lng:133.5276061},
{name:"春野公民館弘岡上分館",lat:33.5044362,lng:133.4526363},
{name:"春野中学校",lat:33.5019197,lng:133.4898781},
{name:"春野東小学校",lat:33.4953766,lng:133.5141407},
{name:"種崎公園津波避難タワー",lat:33.5090914,lng:133.5724955},
{name:"長浜地区津波避難タワー",lat:33.5711719,lng:133.6920521},
{name:"甲殿西津波避難タワー",lat:33.4772146,lng:133.5159592},
{name:"中央公園",lat:33.5601947,lng:133.5404874},
{name:"弥右衛門公園",lat:33.5734414,lng:133.5566480},
{name:"比島公園",lat:33.5730012,lng:133.5509510},
{name:"福井公園",lat:33.5730012,lng:133.5509510},
{name:"萩公園",lat:33.5650372,lng:133.5079780}
];
];

function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    if (userMarker) map.removeLayer(userMarker);

    userMarker = L.circleMarker([lat, lng], {
      radius: 10,
      color: "#007bff",
      fillColor: "#007bff",
      fillOpacity: 0.8
    })
    .addTo(map)
    .bindPopup("現在地")
    .openPopup();

    map.setView([lat, lng], 15);
  });
}


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

