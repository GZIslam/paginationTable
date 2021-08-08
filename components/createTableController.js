const searchByValue = (data, value) => {
    let newData = [];
    data.forEach(item => {
        for(let key in item) {
            let searchIndex = item[key].search(new RegExp(value));
            if(searchIndex > -1) {
                console.log(item[key].search(new RegExp(value)));
                newData.push(item);
                break;
            }
        }
    });
    return newData;
};

const createTableController = place => {
    let rowsCountInput = document.createElement("input");
    rowsCountInput.placeholder = "Rows count";
    let pageRowsCountInput = document.createElement("input");
    pageRowsCountInput.placeholder = "Rows paginate count";
    let countAcceptButton = document.createElement("button");
    countAcceptButton.innerText = "Apply";
    rowsCountInput.type = "number";

    let data;

    let instructions = document.createElement("h1");
    instructions.innerText = "Write the number of all rows and rows on one page to randomly generate the table";

    let searchInput = document.createElement("input");
    searchInput.placeholder = "Search!";

    searchInput.addEventListener("keyup", () => {
        if(searchInput.value) {
            if(rowsCountInput.value) {
                let newData = searchByValue(data, searchInput.value);
                place.innerHTML = "";
                if(newData.length) {
                    headers.forEach(item => {
                        item.sort = 0;
                    });
                    let table = Table({data: newData, headers, pagCount: pageRowsCountInput.value});
                    place.append(table);
                } else {
                    let text = document.createElement("h1");
                    text.innerText = "Ничего не найдено";
                    place.append(text);
                }
            }
        } else {
            if(rowsCountInput.value) {
                let table = Table({data, headers, pagCount: pageRowsCountInput.value});
                place.innerHTML = "";
                place.append(table);
            }
        }
    });

    countAcceptButton.addEventListener("click", () => {
        if(rowsCountInput.value) {
            data = generateData(rowsCountInput.value);
            let table = Table({data, headers, pagCount: pageRowsCountInput.value});
            place.innerHTML = "";
            place.append(table);
        }
    });

    let controller = document.createElement("div");
    controller.style.display = "flex";
    controller.style.justifyContent = "space-between";
    controller.style.alignItems = "center";
    controller.style.marginBottom = "20px";

    let createTableController = document.createElement("div");
    createTableController.style.display = "flex";

    createTableController.append(rowsCountInput);
    createTableController.append(pageRowsCountInput);
    createTableController.append(countAcceptButton);
    controller.append(createTableController);

    controller.append(instructions);

    controller.append(searchInput);

    return controller;
}