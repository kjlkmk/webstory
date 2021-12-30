onmessage = function (e) {

    var userdata = e.data;

    for (var i = 1; i <= 8140000; i++) {


        var lotto_45 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

        //첫번째 로또 번호 추출
        var lotto6 = [];
        var lotto_1 = lotto_45.splice(Math.floor(Math.random() * lotto_45.length), 1);

        lotto6.push(lotto_1[0]);
        let lotto_44 = lotto_45.filter((element) => element !== lotto_1);

        //두번째 로또 번호 추출
        var lotto_2 = lotto_44.splice(Math.floor(Math.random() * lotto_44.length), 1);

        lotto6.push(lotto_2[0]);
        let lotto_43 = lotto_44.filter((element) => element !== lotto_2);

        // 세번째 로또 번호 추출
        var lotto_3 = lotto_43.splice(Math.floor(Math.random() * lotto_43.length), 1);

        lotto6.push(lotto_3[0]);
        let lotto_42 = lotto_43.filter((element) => element !== lotto_3);

        // 네번째 로또 번호 추출
        var lotto_4 = lotto_42.splice(Math.floor(Math.random() * lotto_42.length), 1);

        lotto6.push(lotto_4[0]);
        let lotto_41 = lotto_42.filter((element) => element !== lotto_4);

        // 다섯번째 로또 번호 추출
        var lotto_5 = lotto_41.splice(Math.floor(Math.random() * lotto_41.length), 1);

        lotto6.push(lotto_5[0]);
        let lotto_40 = lotto_41.filter((element) => element !== lotto_5);

        // 여섯번째 로또 번호 추출
        var lotto_6 = lotto_40.splice(Math.floor(Math.random() * lotto_40.length), 1);

        lotto6.push(lotto_6[0]);

        //오름차순으로 숫자 정렬
        lotto6.sort(function (a, b) {
            return a - b;
        });

        var autodata = JSON.stringify(lotto6);

        if (userdata === autodata) {

            postMessage([autodata, i, 1]);
            break;
        } else {

            postMessage([autodata, i, 0]);
        }

    }

}