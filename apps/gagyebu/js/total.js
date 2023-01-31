const dbReq = indexedDB.open('kjlkmkDB', 1);
let db;
dbReq.addEventListener('success', function (event) {
    db = event.target.result;
});
dbReq.addEventListener('error', function (event) {
    const error = event.target.error;
    console.log('error', error.name);
});
dbReq.addEventListener('upgradeneeded', function (event) {
    db = event.target.result;
    let oldVersion = event.oldVersion;
    if (oldVersion < 1) {
        const caldb = db.createObjectStore('calculate', { keyPath: 'date' });
        caldb.createIndex('date', 'date', { unique: true });
    }
});

function serchInfo () {
    var d = new Date();
    var year = d.getFullYear();
    var month = (d.getMonth() + 1);
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    var start = year + "-" + month + "-" + "01";
    var end = year + "-" + month + "-" + day;


    document.getElementById("thead").innerHTML = "";
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("tfoot").innerHTML = "";
    document.getElementById("thead2").innerHTML = "";
    document.getElementById("tbody2").innerHTML = "";
    document.getElementById("tfoot2").innerHTML = "";
    document.getElementById("thead3").innerHTML = "";
    document.getElementById("tbody3").innerHTML = "";
    document.getElementById("tfoot3").innerHTML = "";

    var data = [];

    const keyRangeValue = IDBKeyRange.bound(start, end);
    let store = db.transaction('calculate', 'readonly').objectStore('calculate');
    let curReq = store.openCursor(keyRangeValue);
    curReq.addEventListener('success', async function (event) {
        const cursor = event.target.result;

        if (cursor) {

            data.push(cursor.value);
            cursor.continue();
        } else {

            await theadCreate();
            await tableCreate(data);
            await tfootCreate(data);
            await thead2Create();
            await table2Create(data);
            await tfoot2Create(data);
            await thead3Create();
            await table3Create(data);
            await tfoot3Create(data);
        }

    });

}

function theadCreate () {

    var thead = document.getElementById("thead");
    var row = document.createElement("tr");
    var col1 = document.createElement("th");
    col1.textContent = "날짜";
    var col2 = document.createElement("th");
    col2.textContent = "현금";
    var col3 = document.createElement("th");
    col3.textContent = "외상";
    var col4 = document.createElement("th");
    col4.textContent = "통장";
    var col5 = document.createElement("th");
    col5.textContent = "신용";
    var col6 = document.createElement("th");
    col6.textContent = "합계";

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    thead.appendChild(row);

}

function tableCreate (data) {

    var tbody = document.getElementById("tbody");
    data.forEach(function (r) {
        var row = document.createElement("tr");
        var col1 = document.createElement("td");
        col1.textContent = r.date;
        var col2 = document.createElement("td");
        col2.textContent = numberWithCommas(r.cash1);
        var col3 = document.createElement("td");
        col3.textContent = numberWithCommas(r.cash2);
        var col4 = document.createElement("td");
        col4.textContent = numberWithCommas(r.cash3);
        var col5 = document.createElement("td");
        col5.textContent = numberWithCommas(r.cash4);
        var col6 = document.createElement("td");
        col6.textContent = numberWithCommas(r.cash5);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        row.appendChild(col6);
        tbody.appendChild(row);

    });
}

function tfootCreate (data) {

    const cash1 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash1);
    }, 0);

    const cash2 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash2);
    }, 0);

    const cash3 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash3);
    }, 0);

    const cash4 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash4);
    }, 0);

    const cash5 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash5);
    }, 0);

    var tfoot = document.getElementById("tfoot");
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    col1.textContent = "합계";
    var col2 = document.createElement("td");
    col2.textContent = numberWithCommas(cash1);
    var col3 = document.createElement("td");
    col3.textContent = numberWithCommas(cash2);
    var col4 = document.createElement("td");
    col4.textContent = numberWithCommas(cash3);
    var col5 = document.createElement("td");
    col5.textContent = numberWithCommas(cash4);
    var col6 = document.createElement("td");
    col6.textContent = numberWithCommas(cash5);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    tfoot.appendChild(row);

}

function thead2Create () {

    var thead2 = document.getElementById("thead2");
    var row = document.createElement("tr");
    var col1 = document.createElement("th");
    col1.textContent = "날짜";
    var col2 = document.createElement("th");
    col2.textContent = "기름";
    var col3 = document.createElement("th");
    col3.textContent = "수리비";
    var col4 = document.createElement("th");
    col4.textContent = "기타";
    var col5 = document.createElement("th");
    col5.textContent = "플비";
    var col6 = document.createElement("th");
    col6.textContent = "수수료";
    var col7 = document.createElement("th");
    col7.textContent = "미경";
    var col8 = document.createElement("th");
    col8.textContent = "지출합계";
    var col9 = document.createElement("th");
    col9.textContent = "실제수입";

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    row.appendChild(col7);
    row.appendChild(col8);
    row.appendChild(col9);

    thead2.appendChild(row);

}

function table2Create (data) {

    var tbody2 = document.getElementById("tbody2");
    data.forEach(function (r) {
        var row = document.createElement("tr");
        var col1 = document.createElement("td");
        col1.textContent = r.date;
        var col2 = document.createElement("td");
        col2.textContent = numberWithCommas(r.cash6);
        var col3 = document.createElement("td");
        col3.textContent = numberWithCommas(r.cash7);
        var col4 = document.createElement("td");
        col4.textContent = numberWithCommas(r.cash8);
        var col5 = document.createElement("td");
        col5.textContent = numberWithCommas(r.cash9);
        var col6 = document.createElement("td");
        col6.textContent = numberWithCommas(r.cash10);
        var col7 = document.createElement("td");
        col7.textContent = numberWithCommas(r.cash11);
        var col8 = document.createElement("td");
        col8.textContent = numberWithCommas(r.cash12);
        var col9 = document.createElement("td");
        col9.textContent = numberWithCommas(r.cash13);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        row.appendChild(col6);
        row.appendChild(col7);
        row.appendChild(col8);
        row.appendChild(col9);
        tbody2.appendChild(row);

    });
}

function tfoot2Create (data) {

    const cash1 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash6);
    }, 0);

    const cash2 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash7);
    }, 0);

    const cash3 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash8);
    }, 0);

    const cash4 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash9);
    }, 0);

    const cash5 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash10);
    }, 0);

    const cash6 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash11);
    }, 0);

    const cash7 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash12);
    }, 0);

    const cash8 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash13);
    }, 0);

    var tfoot2 = document.getElementById("tfoot2");
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    col1.textContent = "합계";
    var col2 = document.createElement("td");
    col2.textContent = numberWithCommas(cash1);
    var col3 = document.createElement("td");
    col3.textContent = numberWithCommas(cash2);
    var col4 = document.createElement("td");
    col4.textContent = numberWithCommas(cash3);
    var col5 = document.createElement("td");
    col5.textContent = numberWithCommas(cash4);
    var col6 = document.createElement("td");
    col6.textContent = numberWithCommas(cash5);
    var col7 = document.createElement("td");
    col7.textContent = numberWithCommas(cash6);
    var col8 = document.createElement("td");
    col8.textContent = numberWithCommas(cash7);
    var col9 = document.createElement("td");
    col9.textContent = numberWithCommas(cash8);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    row.appendChild(col7);
    row.appendChild(col8);
    row.appendChild(col9);
    tfoot2.appendChild(row);

}

function thead3Create () {

    var thead3 = document.getElementById("thead3");
    var row = document.createElement("tr");
    var col1 = document.createElement("th");
    col1.textContent = "날짜";
    var col2 = document.createElement("th");
    col2.textContent = "우리집카드";
    var col3 = document.createElement("th");
    col3.textContent = "우리집현금";
    var col4 = document.createElement("th");
    col4.textContent = "우리집합계";
    var col5 = document.createElement("th");
    col5.textContent = "기타수입";
    var col6 = document.createElement("th");
    col6.textContent = "우리집실제지출";

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);

    thead3.appendChild(row);

}

function table3Create (data) {

    var tbody3 = document.getElementById("tbody3");
    data.forEach(function (r) {
        var row = document.createElement("tr");
        var col1 = document.createElement("td");
        col1.textContent = r.date;
        var col2 = document.createElement("td");
        col2.textContent = numberWithCommas(r.cash14);
        var col3 = document.createElement("td");
        col3.textContent = numberWithCommas(r.cash15);
        var col4 = document.createElement("td");
        col4.textContent = numberWithCommas(r.cash16);
        var col5 = document.createElement("td");
        col5.textContent = numberWithCommas(r.cash17);
        var col6 = document.createElement("td");
        col6.textContent = numberWithCommas(r.cash18);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        row.appendChild(col6);

        tbody3.appendChild(row);

    });
}

function tfoot3Create (data) {

    const cash1 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash14);
    }, 0);

    const cash2 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash15);
    }, 0);

    const cash3 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash16);
    }, 0);

    const cash4 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash17);
    }, 0);

    const cash5 = data.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.cash18);
    }, 0);

    var tfoot3 = document.getElementById("tfoot3");
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    col1.textContent = "합계";
    var col2 = document.createElement("td");
    col2.textContent = numberWithCommas(cash1);
    var col3 = document.createElement("td");
    col3.textContent = numberWithCommas(cash2);
    var col4 = document.createElement("td");
    col4.textContent = numberWithCommas(cash3);
    var col5 = document.createElement("td");
    col5.textContent = numberWithCommas(cash4);
    var col6 = document.createElement("td");
    col6.textContent = numberWithCommas(cash5);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);

    tfoot3.appendChild(row);

}

function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}