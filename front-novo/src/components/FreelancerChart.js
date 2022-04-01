import { useEffect, useState } from "react";

function FreelancerChart ({google, arrayFreelancers}) {
  const [chart, setChart] = useState(null);
  const [hasData, setHasData] = useState(false)
  const [isDifferent, setIsDifferent] = useState(false)
  const [vetorFreelancers, setVetorFreelancers] = useState([['',''],['','']])
  
  if(arrayFreelancers.length > 1){
    if(arrayFreelancers[1][1] != vetorFreelancers[1][1]){
        setVetorFreelancers(arrayFreelancers)
        setIsDifferent(true)
    }
  }

  useEffect(() => {
    if ((google && !chart) || (google && !hasData) || (google && (arrayFreelancers.length > 1) && (vetorFreelancers.length > 1) && (isDifferent))) {
        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'API_KEY'
          });
        google.charts.setOnLoadCallback(drawMarkersMap);
        function drawMarkersMap() {
        const data = new google.visualization.arrayToDataTable(arrayFreelancers);

        var options = {
            region: 'BR',
            displayMode: 'markers',
            backgroundColor: '#81d4fa',
            colorAxis: {colors: ['#D7FFE0', '#004D11']},
            height: 300,
            width: 500
        };

        var newChart = new google.visualization.GeoChart(document.getElementById('newChart_div'));
        newChart.draw(data, options);

        if(arrayFreelancers.length > 1) {
            setHasData(true);
            setVetorFreelancers(arrayFreelancers);
        }

        setChart("newChart");
        }
    }
  }, [google, chart, vetorFreelancers]);

  return (
    <>
      {!google}
      <div id="newChart_div" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default FreelancerChart;