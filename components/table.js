const compare = (key, way) => {
    return function(a, b) {
        const itemA = a[key]?.toUpperCase();
        const itemB = b[key]?.toUpperCase();
      
        let comparison = 0;
        if (itemA > itemB) {
          comparison = 1;
        } else if (itemA < itemB) {
          comparison = -1;
        }
        return way? comparison : comparison * -1;
    }
}

const Table = props => {
    let datas = props?.data || [];
    let headers = props?.headers || [];
    let rowsPaginateCount = +props?.pagCount || 50;

    let tables = document.createElement("div");
    
    let currentPage = {button: undefined, index: 0};
    let pages;

    let pageCount = Math.ceil(datas.length / rowsPaginateCount);
    let currentSort = undefined;

    const init = data => {
        //* CLEAR
        tables.innerHTML = "";
        pages = [];
        let pagination = document.createElement("div");

        for(let i = 0; i < pageCount; i++) {
            let page = document.createElement("div");
            page.classList.add("page");

            //* PAGINATE BUTTON 
            let paginateButton = document.createElement("button");
            paginateButton.classList.add("paginate-button");

            if(currentPage.index === i) {
                currentPage.button = paginateButton;
                currentPage.button.classList.add('is-active');
            }

            paginateButton.innerText = i + 1;
            pagination.append(paginateButton);
    
            paginateButton.addEventListener("click", () => {
                pages[currentPage.index].remove();
                currentPage.index = i;
                if(currentPage.button) currentPage.button.classList.remove("is-active");
                paginateButton.classList.add("is-active");
                currentPage.button = paginateButton;
                tables.prepend(page);
            });

            let table = document.createElement("table");
            let headerEl = document.createElement("tr");
            
            //* SORT THs
            headers.forEach(item => {
                let th = document.createElement("th");
                th.innerText = item.value;
                if(item.sort == 1) {
                    th.innerHTML += "<img src='./assets/img/sort-up.svg'></img>";
                } else if(item.sort == 2) {
                    th.innerHTML += "<img src='./assets/img/sort-down.svg'></img>";
                }
                th.addEventListener("click", () => {
                    if(currentSort && JSON.stringify(currentSort) !== JSON.stringify(item)) currentSort.sort = 0;
                    currentSort = item;
                    let key = item.key;
                    item.sort = item.sort + 1 == 3? 0 : item.sort + 1;
                    let newData = JSON.parse(JSON.stringify(datas));
                    switch (item.sort){
                        case 1:
                            init(newData.sort(compare(key, true)));
                            break;
                        case 2:
                            init(newData.sort(compare(key, false)));
                            break;
                        case 0:
                            init(datas);
                    }
                });
                headerEl.append(th);
            });
            table.append(headerEl);
    
            for(let j = i * rowsPaginateCount; j < i * rowsPaginateCount + rowsPaginateCount; j++) {
                if(data[j]) {
                    let obj = data[j];
                    let row = document.createElement("tr");
                    for(let key in obj) {
                        let td = document.createElement("td");
                        td.innerText = obj[key];
                        row.append(td);
                    }
                    table.append(row);
                }
            }
            page.append(table);
            pages.push(page);
        }
        tables.append(pages[currentPage.index]);
        tables.append(pagination);
    };

    init(datas);

    return tables;
};
