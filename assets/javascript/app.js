// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// anime({
//     targets: 'div',
//     translateX: [
//       { value: 100, duration: 1200 },
//       { value: 0, duration: 800 }
//     ],
//     rotate: '1turn',
//     backgroundColor: '#FFF',
//     duration: 2000,
//     loop: true
//   });

var path = anime.path('path');

anime({
    targets: '#green-path .el',
  translateX: path,
  translateY: path,
  rotate: path,
  duration: 3000,
  loop: true,
  easing: 'linear'
});

anime({
  targets: 'path',
  opacity: 0,
  duration: 6000,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutExpo'
});

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCZrnNIWl79s__DwKDv90QevHvjtBgAMU",
    authDomain: "trains-f257c.firebaseapp.com",
    databaseURL: "https://trains-f257c.firebaseio.com",
    projectId: "trains-f257c",
    storageBucket: "trains-f257c.appspot.com",
    messagingSenderId: "663561580736"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empName = $("#employee-name-input").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      name: empName,
      role: empRole,
      start: empStart,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empName),
      $("<td>").text(empRole),
      $("<td>").text(empStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  