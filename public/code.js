receivedArray = []

function createTable(data) {
  result = "";
  result = "<table>"
  result += `<tr>`
  let keys = []
  for (let i = 0; i < data.length; i++) {

    let currentKeys = Object.keys(data[i])

    for (let j = 0; j < currentKeys.length; j++) {
      if (!keys.includes(currentKeys[j]))
        keys.push(currentKeys[j])
    }
  }
  for (let k = 0; k < keys.length; k++) {
    result += `<th>${keys[k]}</th>`

  }
  result += `</tr>`

  data.map((aUnicorn) => {

    if (aUnicorn["vaccinated"] == true)
      result += `<tr class="red">`
    else
      result += `<tr class="">`
    for (var field of keys) {
      result += `<td>${aUnicorn[field]}</td>`
    }
    result += `</tr>`
  })
  result += "</table>"

  $("#result").html(result);
}

// function appendUnicornToTable(unicorn) {
//   $("#result").append(`
//     <tr>
//       <td>${unicorn.name}</td>
//       <td>${unicorn.dob}</td>
//       <td>${unicorn.loves}</td>
//       <td>${unicorn.weight}</td>
//       <td>${unicorn.gender}</td>
//       <td>${unicorn.vampires}</td>
//       <td>${unicorn.vaccinated}</td>
//     </tr>
//   `)
// }

// function tableCreate() {
//   const body = document.body,
//         tbl = document.createElement('table');
//   tbl.style.width = '100px';
//   tbl.style.border = '1px solid black';

//   for (let i = 0; i < 3; i++) {
//     const tr = tbl.insertRow();
//     for (let j = 0; j < 2; j++) {
//       if (i === 2 && j === 1) {
//         break;
//       } else {
//         const td = tr.insertCell();
//         td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
//         td.style.border = '1px solid black';
//         if (i === 1 && j === 1) {
//           td.setAttribute('rowSpan', '2');
//         }
//       }
//     }
//   }
//   body.appendChild(tbl);
// }
// tableCreate()

// function appendUnicornToTable(unicorn) {

// }

function setup() {
  $("#getByNameBtn").click(function () {
    $.ajax({
      url: "http://localhost:5000/getUnicornByNameRoute",
      type: "POST",
      data: {
        unicornNameInHTTPBody: $("#unicornNameInHTML").val()
      },
      success: function (data) {
        console.log(data);
        receivedArray = data;
        // result = "";
        // result += "<table>"
        // $("#result").append(`
        //   <tr>
        //     <td>${data.name}</td>
        //     <td>${data.dob}</td>
        //     <td>${data.loves}</td>
        //     <td>${data.weight}</td>
        //     <td>${data.gender}</td>
        //     <td>${data.vampires}</td>
        //     <td>${data.vaccinated}</td>
        //   </tr>
        // `)
        // result += "</table>"
        // result = "";
        // result += "<table>"
        // data.map((element) => {
        //   result +=
        //     `
        //   <tr> 
        //     <td>
        //       ${element.name}
        //     </td>
        //   </tr>
        //   `
        // })
        // result += "</table>"
        $("#result").html(JSON.stringify(data));
        // appendUnicornToTable(data)
        createTable(data)
        console.log(receivedArray);
      }
    });
  })

  $("#getByWeightBtn").click(function () {
    $.ajax({
      url: "http://localhost:5000/getUnicornByWeightRoute",
      type: "POST",
      data: {
        unicornLowerWeightInHTTPBody: $("#unicornLowerWeightInHTML").val(),
        unicornUpperWeightInHTTPBody: $("#unicornUpperWeightInHTML").val()
      },
      success: function (data) {
        console.log(data);
        receivedArray = data;
        $("#result").html(JSON.stringify(data));
        // $("#result").html()
        // result = "";
        // result = "<table>"
        // data.map((aUnicorn) => {
        //   console.log("aUnicorn", aUnicorn);
        //   if (aUnicorn["vaccinated"] == true)
        //     result += `<tr class="red">`
        //   else
        //     result += `<tr class="">`

        //   for (var field in aUnicorn) {
        //     result += `<td>${aUnicorn[field]}</td>`
        //   }
        //   result += `</tr>`
        // })
        // result += "</table>"
        createTable(data)
        console.log(receivedArray);
      }
    });
  })

  $("#getByFavFoodBtn").click(function () {
    let favFood = []
    if ($(appleFilter).prop("checked")) {
      favFood.push("apple")
    }
    if ($(carrotFilter).prop("checked")) {
      favFood.push("carrot")
    }
    $.ajax({
      url: "http://localhost:5000/getUnicornByFavFoodRoute",
      type: "POST",
      data: {
        unicornFavFoodInHTTPBody: favFood
      },
      success: function (data) {
        console.log(data);
        receivedArray = data;
        $("#result").html(JSON.stringify(data));
        createTable(data)
        console.log(receivedArray);
      }
    });
    // anotherArray = receivedArray.filter((item) => {
    //   return item.loves.includes("carrots");
    // })
    // $("#result").html(JSON.stringify(anotherArray));
  })

  $(".submitBtn").click(function () {
    console.log("change");
  })

  $(".filterChoices").change(function () {
    if ($("#nameFilter").prop("checked") && $("#weightFilter").prop("checked")) {
      anotherArray = receivedArray.map((item) => {
        return [item.name, item.weight];
      })
      $("#result").html(JSON.stringify(anotherArray, undefined, 2));

    } else if ($("#nameFilter").prop("checked")) {
      anotherArray = receivedArray.map((item) => {
        return item.name;
      })
      $("#result").html(JSON.stringify(anotherArray, undefined, 2));
    } else if ($("#weightFilter").prop("checked")) {
      anotherArray = receivedArray.map((item) => {
        return item.weight;
      })
      $("#result").html(JSON.stringify(anotherArray, undefined, 2));
    } else {
      anotherArray = receivedArray.map((item) => {
        return item;
      })
      $("#result").html(JSON.stringify(anotherArray, undefined, 2));

    }
  })
}

$(document).ready(setup)