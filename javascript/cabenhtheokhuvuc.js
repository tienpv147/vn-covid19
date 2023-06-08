const apiCaBenh =
  "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST";

Promise.all([fetch(apiCaBenh)])
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

function main(data) {
  bangCaBenh(data);
  chartTongCaBenh();
}

// Bảng thông tin khu vực ca bệnh
function caBenh(khuvuc) {
  return [
    khuvuc.name,
    khuvuc.death,
    khuvuc.treating,
    khuvuc.cases,
    khuvuc.recovered,
    khuvuc.casesToday,
  ];
}

const getCaBenh = (data) => {
  cabenhArray.push(data[0]["detail"]);
  return [cabenhArray[0].map((khuvuc) => caBenh(khuvuc))];
};

const bangCaBenh = (data) => {
  let temp = "",
    d = getCaBenh(data)[0];
  d.forEach((cabenh, index) => {
    temp += `<tr>`;
    temp += `<td>${index + 1}</td>`;
    temp += `<td>${cabenh[0]}</td>`;
    temp += `<td>${cabenh[3]}</td>`;
    temp += `<td>${cabenh[1]}</td>`;
    temp += `<td>${cabenh[2]}</td>`;
    temp += `<td>${cabenh[4]}</td>`;
    temp += `<td>${cabenh[5]}</td>`;
    temp += `</tr>`;
    document.getElementById("tableCaBenh").innerHTML = temp;
  });
};

function chartTongCaBenh() {
  var ctx = document.getElementById("chartTongCaBenh").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: cabenhArray[0].map((khuvuc) => khuvuc["name"]),
      datasets: [
        {
          label: "Tổng ca bệnh",
          data: cabenhArray[0].map((khuvuc) => khuvuc["cases"]),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          hoverOffset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Tổng ca bệnh",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}