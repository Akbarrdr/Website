const suhuText = document.getElementById("suhu");
const humidityText = document.getElementById("humidity");
const teganganText = document.getElementById("tegangan");
const bateraiText = document.getElementById("baterai");
const pintuText = document.getElementById("pintu");

const statusText = document.getElementById("status");
const alertBox = document.getElementById("alertBox");
const clockText = document.getElementById("clock");

const ctx = document.getElementById("chart").getContext("2d");

let labels = [];
let dataSuhu = [];
let lastAlert = false;

// 📊 Chart
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperature (°C)',
      data: dataSuhu,
      borderColor: '#00f7ff',
      borderWidth: 2,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 20,
        max: 40
      }
    }
  }
});

// 🕒 Jam
function updateClock(){
  const now = new Date();
  clockText.innerHTML = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// 🔥 Update Semua Data
function updateData(){

  // 🌡️ Suhu
  let suhu = (Math.random() * 10 + 25).toFixed(1);
  suhuText.innerHTML = suhu + " °C";

  if(suhu < 30){
    statusText.innerHTML = "Normal";
    statusText.style.color = "#00ff88";
    alertBox.style.display = "none";
    lastAlert = false;
  } 
  else if(suhu < 33){
    statusText.innerHTML = "Panas";
    statusText.style.color = "orange";
    alertBox.style.display = "none";
    lastAlert = false;
  }
  else{
    statusText.innerHTML = "Bahaya!";
    statusText.style.color = "#ff4d4d";

    if(!lastAlert){
      alertBox.innerHTML = "⚠️ WARNING! Suhu Melebihi Batas Aman!";
      alertBox.style.display = "block";
      lastAlert = true;
    }
  }

  // 💧 Kelembapan
  let humidity = (Math.random() * 40 + 40).toFixed(0);
  humidityText.innerHTML = humidity + " %";

  // ⚡ Tegangan
  let tegangan = (Math.random() * 10 + 215).toFixed(0);
  teganganText.innerHTML = tegangan + " V";

  // 🔋 Baterai
  let baterai = (Math.random() * 50 + 50).toFixed(0);
  bateraiText.innerHTML = baterai + " %";

  if(baterai < 30){
    bateraiText.style.color = "red";
  } else {
    bateraiText.style.color = "#00ff88";
  }

  // 🚪 Status Pintu
  let pintu = Math.random() > 0.7 ? "Terbuka" : "Tertutup";
  pintuText.innerHTML = pintu;
  pintuText.style.color = pintu === "Terbuka" ? "#ff4d4d" : "#00ff88";

  // 📊 Update Chart
  let now = new Date().toLocaleTimeString();
  labels.push(now);
  dataSuhu.push(suhu);

  if(labels.length > 12){
    labels.shift();
    dataSuhu.shift();
  }

  chart.update();
}

setInterval(updateData, 3000);
updateData();

function logout(){
  window.location.href = "index.html";
}
