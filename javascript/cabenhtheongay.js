const apiCaBenhTheoNgay =
  "https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST";

Promise.all([fetch(apiCaBenhTheoNgay)])
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
  CachLi(getCachli(data));
  BangCachLi(cachliArray);
  chartCaBenhTheoNgay();
}

// Bảng thông tin ca bệnh theo ngày
const getCachli = (data) => {
  cachliCaNhiemArray.push(data[0]["canhiem"]);
  cachliCaKhoiArray.push(data[0]["cakhoi"]);
  cachliCaTuVongArray.push(data[0]["catuvong"]);
  
  return [cachliCaNhiemArray[0], cachliCaKhoiArray[0], cachliCaTuVongArray[0]];
};

const CachLi = (getCachLi) => {
  for (const key in cachliCaNhiemArray[0]) {
    if (
      cachliCaNhiemArray[0].hasOwnProperty.call(cachliCaNhiemArray[0], key) ===
        cachliCaKhoiArray[0].hasOwnProperty.call(cachliCaKhoiArray[0], key) &&
      cachliCaNhiemArray[0].hasOwnProperty.call(cachliCaNhiemArray[0], key) ===
        cachliCaTuVongArray[0].hasOwnProperty.call(cachliCaTuVongArray[0], key)
    ) {
      const canhiem = cachliCaNhiemArray[0][key];
      const cakhoi = cachliCaKhoiArray[0][key];
      const catuvong = cachliCaTuVongArray[0][key];
      cachliArray.push([
        [
          canhiem["day"].replace("-", "/"),
          canhiem["quantity"],
          cakhoi["quantity"],
          catuvong["quantity"],
        ],
      ]);
    }
  }
  return cachliArray;
};

function BangCachLi(cachliArray) {
  let temp = "",
    d = new Array(cachliArray);

  d[0]
    .slice()
    .reverse()
    .forEach((data, index) => {
      temp += `<tr>`;
      temp += `<td>${index + 1}</td>`;
      temp += `<td>${data[0][0]}</td>`;
      temp += `<td>${data[0][1]}</td>`;
      temp += `<td>${data[0][2]}</td>`;
      temp += `<td>${data[0][3]}</td>`;
      temp += `</tr>`;
    });
  document.getElementById("tableCaBenhTheoNgay").innerHTML = temp;
}

function chartCaBenhTheoNgay() {
  var ctx = document.getElementById("chartCaBenhTheoNgay").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: cachliArray.map((x) => x[0][0]),
      datasets: [
        {
          label: "Số ca nhiễm",
          data: cachliArray.map((x) => x[0][1]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
        {
          label: "Số ca khỏi",
          data: cachliArray.map((x) => x[0][2]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
        {
          label: "Số ca tử vong",
          data: cachliArray.map((x) => x[0][3]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      reponsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}