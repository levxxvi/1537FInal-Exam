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
        $("#result").html(JSON.stringify(data));
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