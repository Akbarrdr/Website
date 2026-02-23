const suhuText = document.getElementById("suhu");
const statusText = document.getElementById("status");

const ctx = document.getElementById("chart").getContext("2d");

let labels = [];
let dataSuhu = [];

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

function updateData() {

  let suhu = (Math.random() * 10 + 25).toFixed(1);

  suhuText.innerHTML = suhu + " °C";

  if(suhu < 30){
    statusText.innerHTML = "Normal";
    statusText.style.color = "#00ff88";
  } 
  else if(suhu < 33){
    statusText.innerHTML = "Panas";
    statusText.style.color = "orange";
  }
  else{
    statusText.innerHTML = "Bahaya!";
    statusText.style.color = "#ff4d4d";
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
