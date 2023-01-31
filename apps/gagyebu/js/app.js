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

document.getElementById("btn4").addEventListener("click", doStuff);

document.getElementById("date").addEventListener("change", searchDate);
document.getElementById("btn1").addEventListener("click", ClearCell);
document.getElementById("btn2").addEventListener("click", UpdateCell);
document.getElementById("btn5").addEventListener("click", doDelete);
document.getElementById("btn3").addEventListener("click", backserch);
document.getElementById("btn6").addEventListener("click", forserch);

document.getElementById("cash5").addEventListener("mouseover", total);
document.getElementById("cash12").addEventListener("mouseover", total2);
document.getElementById("cash13").addEventListener("mouseover", total3);
document.getElementById("cash16").addEventListener("mouseover", total4);
document.getElementById("cash18").addEventListener("mouseover", total5);


// 플비();

async function doStuff () {

    await total();
    await total2();
    await total3();
    await total4();
    await total5();

    date = document.getElementById("date").value;
    cash1 = document.getElementById("cash1").value;
    cash2 = document.getElementById("cash2").value;
    cash3 = document.getElementById("cash3").value;
    cash4 = document.getElementById("cash4").value;
    cash5 = document.getElementById("cash5").value;
    cash6 = document.getElementById("cash6").value;
    cash7 = document.getElementById("cash7").value;
    cash8 = document.getElementById("cash8").value;
    cash9 = document.getElementById("cash9").value;
    cash10 = document.getElementById("cash10").value;
    cash11 = document.getElementById("cash11").value;
    cash12 = document.getElementById("cash12").value;
    cash13 = document.getElementById("cash13").value;
    cash14 = document.getElementById("cash14").value;
    cash15 = document.getElementById("cash15").value;
    cash16 = document.getElementById("cash16").value;
    cash17 = document.getElementById("cash17").value;
    cash18 = document.getElementById("cash18").value;

    let store = db.transaction('calculate', 'readwrite').objectStore('calculate');
    let timeStemp = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
    let addReq = store.add({
        date: date,
        cash1: cash1,
        cash2: cash2,
        cash3: cash3,
        cash4: cash4,
        cash5: cash5,
        cash6: cash6,
        cash7: cash7,
        cash8: cash8,
        cash9: cash9,
        cash10: cash10,
        cash11: cash11,
        cash12: cash12,
        cash13: cash13,
        cash14: cash14,
        cash15: cash15,
        cash16: cash16,
        cash17: cash17,
        cash18: cash18,
        timestamp: timeStemp
    });

    addReq.addEventListener('success', function (event) {
        console.log(event);
        alert("저장되었습니다.");
        ClearCell();
    });

    addReq.addEventListener('error', function (event) {
        const error = event.target.error;
        console.log('error', error.name);
        alert("저장에 실패하였습니다.");
    });

}

function searchDate () {
    var date = document.getElementById("date").value;


    let store = db.transaction('calculate', 'readonly').objectStore('calculate');
    let getReq = store.get(date);
    getReq.addEventListener('success', function (event) {
        console.log(event.target.result);
        if (event.target.result == undefined) {
            document.getElementById("cash1").value = "";
            document.getElementById("cash2").value = "";
            document.getElementById("cash3").value = "";
            document.getElementById("cash4").value = "";
            document.getElementById("cash5").value = "";
            document.getElementById("cash6").value = "";
            document.getElementById("cash7").value = "";
            document.getElementById("cash8").value = "";
            document.getElementById("cash9").value = "";
            document.getElementById("cash10").value = "";
            document.getElementById("cash11").value = "";
            document.getElementById("cash12").value = "";
            document.getElementById("cash13").value = "";
            document.getElementById("cash14").value = "";
            document.getElementById("cash15").value = "";
            document.getElementById("cash16").value = "";
            document.getElementById("cash17").value = "";
            document.getElementById("cash18").value = "";

            if (document.getElementById("btn2").disabled == false) {
                document.getElementById("btn2").disabled = true;
            }

            if (document.getElementById("btn4").disabled == true) {
                document.getElementById("btn4").disabled = false;
            }
            if (document.getElementById("btn5").disabled == false) {
                document.getElementById("btn5").disabled = true;
            }
        } else {
            document.getElementById("cash1").value = event.target.result.cash1;
            document.getElementById("cash2").value = event.target.result.cash2;
            document.getElementById("cash3").value = event.target.result.cash3;
            document.getElementById("cash4").value = event.target.result.cash4;
            document.getElementById("cash5").value = event.target.result.cash5;
            document.getElementById("cash6").value = event.target.result.cash6;
            document.getElementById("cash7").value = event.target.result.cash7;
            document.getElementById("cash8").value = event.target.result.cash8;
            document.getElementById("cash9").value = event.target.result.cash9;
            document.getElementById("cash10").value = event.target.result.cash10;
            document.getElementById("cash11").value = event.target.result.cash11;
            document.getElementById("cash12").value = event.target.result.cash12;
            document.getElementById("cash13").value = event.target.result.cash13;
            document.getElementById("cash14").value = event.target.result.cash14;
            document.getElementById("cash15").value = event.target.result.cash15;
            document.getElementById("cash16").value = event.target.result.cash16;
            document.getElementById("cash17").value = event.target.result.cash17;
            document.getElementById("cash18").value = event.target.result.cash18;

            document.getElementById("btn2").disabled = false;
            document.getElementById("btn4").disabled = true;
            document.getElementById("btn5").disabled = false;
        }
    });

}

function searchDate2 (date) {

    let store = db.transaction('calculate', 'readonly').objectStore('calculate');
    let getReq = store.get(date);
    getReq.addEventListener('success', function (event) {

        document.getElementById("date").value = event.target.result.date;
        document.getElementById("cash1").value = event.target.result.cash1;
        document.getElementById("cash2").value = event.target.result.cash2;
        document.getElementById("cash3").value = event.target.result.cash3;
        document.getElementById("cash4").value = event.target.result.cash4;
        document.getElementById("cash5").value = event.target.result.cash5;
        document.getElementById("cash6").value = event.target.result.cash6;
        document.getElementById("cash7").value = event.target.result.cash7;
        document.getElementById("cash8").value = event.target.result.cash8;
        document.getElementById("cash9").value = event.target.result.cash9;
        document.getElementById("cash10").value = event.target.result.cash10;
        document.getElementById("cash11").value = event.target.result.cash11;
        document.getElementById("cash12").value = event.target.result.cash12;
        document.getElementById("cash13").value = event.target.result.cash13;
        document.getElementById("cash14").value = event.target.result.cash14;
        document.getElementById("cash15").value = event.target.result.cash15;
        document.getElementById("cash16").value = event.target.result.cash16;
        document.getElementById("cash17").value = event.target.result.cash17;
        document.getElementById("cash18").value = event.target.result.cash18;

        document.getElementById("btn2").disabled = false;
        document.getElementById("btn4").disabled = true;
        document.getElementById("btn5").disabled = false;

    });

}

async function UpdateCell () {

    await total();
    await total2();
    await total3();
    await total4();
    await total5();

    date = document.getElementById("date").value;
    cash1 = document.getElementById("cash1").value;
    cash2 = document.getElementById("cash2").value;
    cash3 = document.getElementById("cash3").value;
    cash4 = document.getElementById("cash4").value;
    cash5 = document.getElementById("cash5").value;
    cash6 = document.getElementById("cash6").value;
    cash7 = document.getElementById("cash7").value;
    cash8 = document.getElementById("cash8").value;
    cash9 = document.getElementById("cash9").value;
    cash10 = document.getElementById("cash10").value;
    cash11 = document.getElementById("cash11").value;
    cash12 = document.getElementById("cash12").value;
    cash13 = document.getElementById("cash13").value;
    cash14 = document.getElementById("cash14").value;
    cash15 = document.getElementById("cash15").value;
    cash16 = document.getElementById("cash16").value;
    cash17 = document.getElementById("cash17").value;
    cash18 = document.getElementById("cash18").value;

    let store = db.transaction('calculate', 'readwrite').objectStore('calculate');
    let timeStemp = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
    let putReq = store.put({
        date: date,
        cash1: cash1,
        cash2: cash2,
        cash3: cash3,
        cash4: cash4,
        cash5: cash5,
        cash6: cash6,
        cash7: cash7,
        cash8: cash8,
        cash9: cash9,
        cash10: cash10,
        cash11: cash11,
        cash12: cash12,
        cash13: cash13,
        cash14: cash14,
        cash15: cash15,
        cash16: cash16,
        cash17: cash17,
        cash18: cash18,
        timestamp: timeStemp
    });
    putReq.addEventListener('success', function (event) {
        console.log(event);
        alert("수정되었습니다.");
        ClearCell();
    });

    putReq.addEventListener('error', function (event) {
        const error = event.target.error;
        console.log('error', error.name);
        alert("수정에 실패하였습니다.");
    });


}

function doDelete () {

    if (confirm("삭제 하시겠습니까?") == true) {
        //true는 확인버튼을 눌렀을 때 코드 작성
        var date = document.getElementById("date").value;

        let store = db.transaction('calculate', 'readwrite').objectStore('calculate');
        let deleteReq = store.delete(date);
        deleteReq.addEventListener('success', function (event) {
            console.log(event);
            alert("삭제되었습니다.");
            ClearCell();
        });

        deleteReq.addEventListener('error', function (event) {
            const error = event.target.error;
            console.log('error', error.name);
            alert("삭제 실패하였습니다.");
        });

    } else {
        // false는 취소버튼을 눌렀을 때, 취소됨

    }

}

function backserch () {

    let store = db.transaction('calculate', 'readonly').objectStore('calculate');
    let getAllReq = store.getAll();

    getAllReq.addEventListener('success', function (event) {
        console.log(event.target.result);
        var data = event.target.result;
        var date = document.getElementById("date").value;

        var resultindex = data.findIndex(e => e.date === date);
        console.log(resultindex);

        if ((resultindex == -1) || (resultindex == 0) || (resultindex == 1)) {

            searchDate2(data[0].date);
        } else {
            var index = resultindex - 1;

            var resultdate = data[index].date;
            searchDate2(resultdate);
        }

    });

}

function forserch () {
    var date = document.getElementById("date").value;
    let store = db.transaction('calculate', 'readonly').objectStore('calculate');
    let getAllReq = store.getAll();

    getAllReq.addEventListener('success', function (event) {
        console.log(event.target.result);
        var data = event.target.result;

        var resultindex = data.findIndex(e => e.date === date);
        console.log(resultindex);

        var len = data.length;

        if ((resultindex == -1) || (resultindex == (len - 1))) {

            searchDate2(data[len - 1].date);
        } else {
            var index = resultindex + 1;

            var resultdate = data[index].date;
            searchDate2(resultdate);
        }

    });

}

function ClearCell () {

    document.getElementById("date").value = "";
    document.getElementById("cash1").value = "";
    document.getElementById("cash2").value = "";
    document.getElementById("cash3").value = "";
    document.getElementById("cash4").value = "";
    document.getElementById("cash5").value = "";
    document.getElementById("cash6").value = "";
    document.getElementById("cash7").value = "";
    document.getElementById("cash8").value = "";
    document.getElementById("cash9").value = "";
    document.getElementById("cash10").value = "";
    document.getElementById("cash11").value = "";
    document.getElementById("cash12").value = "";
    document.getElementById("cash13").value = "";
    document.getElementById("cash14").value = "";
    document.getElementById("cash15").value = "";
    document.getElementById("cash16").value = "";
    document.getElementById("cash17").value = "";
    document.getElementById("cash18").value = "";
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn4").disabled = true;
    document.getElementById("btn5").disabled = true;

}

function total () {

    var cash1 = document.getElementById("cash1").value;
    var cash2 = document.getElementById("cash2").value;
    var cash3 = document.getElementById("cash3").value;
    var cash4 = document.getElementById("cash4").value;
    if (!cash1) {
        cash1 = 0;
        document.getElementById("cash1").value = 0;
    }
    if (!cash2) {
        cash2 = 0;
        document.getElementById("cash2").value = 0;
    }
    if (!cash3) {
        cash3 = 0;
        document.getElementById("cash3").value = 0;
    }
    if (!cash4) {
        cash4 = 0;
        document.getElementById("cash4").value = 0;
    }

    document.getElementById("cash5").value = Number(cash1) + Number(cash2) + Number(cash3) + Number(cash4);

}

function total2 () {

    var cash6 = document.getElementById("cash6").value;
    var cash7 = document.getElementById("cash7").value;
    var cash8 = document.getElementById("cash8").value;
    var cash9 = document.getElementById("cash9").value;
    var cash10 = document.getElementById("cash10").value;
    var cash11 = document.getElementById("cash11").value;

    if (!cash6) {
        cash6 = 0;
        document.getElementById("cash6").value = 0;
    }
    if (!cash7) {
        cash7 = 0;
        document.getElementById("cash7").value = 0;
    }
    if (!cash8) {
        cash8 = 0;
        document.getElementById("cash8").value = 0;
    }
    if (!cash9) {
        cash9 = 0;
        document.getElementById("cash9").value = 0;
    }
    if (!cash10) {
        cash10 = 0;
        document.getElementById("cash10").value = 0;
    }
    if (!cash11) {
        cash11 = 0;
        document.getElementById("cash11").value = 0;
    }

    document.getElementById("cash12").value = Number(cash6) + Number(cash7) + Number(cash8) + Number(cash9) + Number(cash10) + Number(cash11);

}

function total3 () {

    var cash5 = document.getElementById("cash5").value;
    var cash12 = document.getElementById("cash12").value;
    if (!cash5) {
        cash5 = 0;
    }
    if (!cash12) {
        cash12 = 0;
    }

    document.getElementById("cash13").value = Number(cash5) - Number(cash12);

}

function total4 () {

    var cash14 = document.getElementById("cash14").value;
    var cash15 = document.getElementById("cash15").value;
    if (!cash14) {
        cash14 = 0;
        document.getElementById("cash14").value = 0;
    }
    if (!cash15) {
        cash15 = 0;
        document.getElementById("cash15").value = 0;
    }

    document.getElementById("cash16").value = Number(cash14) + Number(cash15);

}

function total5 () {

    var cash16 = document.getElementById("cash16").value;
    var cash17 = document.getElementById("cash17").value;
    if (!cash16) {
        cash16 = 0;
        document.getElementById("cash16").value = 0;
    }
    if (!cash17) {
        cash17 = 0;
        document.getElementById("cash17").value = 0;
    }

    document.getElementById("cash18").value = Number(cash16) - Number(cash17);

}


function times () {

    let today = getToday();

    document.getElementById("time").innerText = today;

}

function getToday () {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}