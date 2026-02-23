async function getSuhu(){
  const res = await fetch("/api/suhu");
  const data = await res.json();
  document.getElementById("suhu").innerText = data.temperature + " °C";
}

setInterval(getSuhu, 2000);

function logout(){
  window.location.href = "index.html";
}