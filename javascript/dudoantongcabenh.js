const apiDuDoanTongCaBenh = 
  "http://localhost:8081/api/predicts"

Promise.all([fetch(apiDuDoanTongCaBenh)])
  .then(function (responses) {
    return Promise.all(
      responses.map(function (response) {
        const result = response.json()

        return result;
      })
    );
  })
  .then(function (data) {
    // if(data), call main function to display results(data)
    window.onload = main(data);
  })
  .catch(function (error) {
    // if(!data), call error
    console.log(error);
  });

const cabenhArray = new Array(),
  cachliArray = new Array(),
  cachliCaNhiemArray = new Array(),
  cachliCaKhoiArray = new Array(),
  cachliCaTuVongArray = new Array();

let duDoanTongCaBenhArray = new Array();

function main(data) {
//   bangCaBenh(data);
//   CachLi(getCachli(data));
//   BangCachLi(cachliArray);
  getDuDoanTongCaBenh(data);
//   chartCaBenhTheoNgay();
//   chartTongCaBenh();
  chartDuDoanTongCaBenh();
}

const getDuDoanTongCaBenh = (data) => {
  duDoanTongCaBenhArray = data[0].map(({date, confirmed}) => ([[date, confirmed]]))
}

function chartDuDoanTongCaBenh() {
  var ctx = document.getElementById("chartDuDoanTongCaBenh").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: duDoanTongCaBenhArray.map((x) => x[0][0]),
      datasets: [
        {
          label: "Tổng số ca nhiễm toàn quốc",
          data: duDoanTongCaBenhArray.map((x) => x[0][1]),
          backgroundColor: [
            "rgba(47, 118, 209, 0.2)",
            "rgba(88, 12, 100, 0.2)",
            "rgba(16, 30, 211, 0.2)",
            "rgba(101, 234, 134, 0.2)",
            "rgba(128, 161, 242, 0.2)",
            "rgba(178, 176, 57, 0.2)",
          ],
          borderColor: [
            "rgba(47, 118, 209, 1)",
            "rgba(88, 12, 100, 1)",
            "rgba(16, 30, 211, 1)",
            "rgba(101, 234, 134, 1)",
            "rgba(128, 161, 242, 1)",
            "rgba(178, 176, 57, 1)",
          ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      reponsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}