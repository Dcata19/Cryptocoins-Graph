document.getElementById('button').addEventListener('click', drawChart);
let timeInterval = '1h';

function setTimeInterval(id) {
  timeInterval = id;
  document.getElementById('interval').innerText = 'Time Interval' + ' - ' + document.getElementById(id).innerText;
  drawChart();
}

async function drawChart() {
  let symbolCoin = await document.getElementById('symbol').value;
  document.getElementById('chart').innerHTML = '';

  const chartProperties = {
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
  };
  const domEelement = document.getElementById('chart');
  const chart = LightweightCharts.createChart(domEelement, chartProperties);
  const candleseries = chart.addCandlestickSeries();

  fetch(`https://api.binance.com/api/v3/klines?symbol=${symbolCoin}USDT&interval=${timeInterval}`)
  .then(res => res.json())
  .then(data => {
    const cdata = data.map(d => {
      return {time:d[0]/1000, open:parseFloat(d[1]), high:parseFloat(d[2]), low:parseFloat(d[3]), close:parseFloat(d[4])}
    });
    candleseries.setData(cdata);
  })
}