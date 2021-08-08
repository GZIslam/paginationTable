let headers = [{value: "Name", key: "name", sort: 0}, {value: "Second name", key: "secondName", sort: 0},{value: "Position", key: "position", sort: 0}];
let tablePlace = document.createElement("div");

let createTableControllerElement = createTableController(tablePlace);

let app = document.createElement("div");

app.append(createTableControllerElement);
app.append(tablePlace);

app.style.padding = "10px";

document.body.append(app);
