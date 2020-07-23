export const chartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  legend: false,
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'ID',
          fontSize: 20
        },
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Votes',
          fontSize: 20
        }
      }
    ]
  }
};
