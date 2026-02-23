const suhuText = document.getElementById("suhu");
const statusText = document.getElementById("status");
const alertBox = document.getElementById("alertBox");
const clockText = document.getElementById("clock");

const ctx = document.getElementById("chart").getContext("2d");

let labels = [];
let dataSuhu = [];
let lastAlert = false;

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

// 🔥 JAM REALTIME
function updateClock(){
  const now = new Date();
  clockText.innerHTML = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// 🔥 UPDATE SUHU DUMMY
function updateData() {

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

    // 🔔 NOTIFIKASI HANYA SEKALI SAAT MASUK BAHAYA
    if(!lastAlert){
      alertBox.innerHTML = "⚠️ WARNING! Suhu Melebihi Batas Aman!";
      alertBox.style.display = "block";
      lastAlert = true;
    }
  }

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

function logout(){
  window.location.href = "index.html";
}
