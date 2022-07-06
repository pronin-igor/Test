const monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
];
const d = new Date();
document.getElementById('profile').innerHTML += ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log('ошибка');
    } else {
        const users = JSON.parse(xhr.responseText);
        console.log(users);
        let currentUsers = [];
        //выявление пользователей по дате
        users.forEach((value, index, array) => {
            const date = new Date(users[index].date_of_arrival);
            if (date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() - 1) {
                currentUsers.push(value);
            }
        });
        //возраст
        let currentAges = Array.from(currentUsers, ({tourist_age}) => tourist_age);
        let uniqueAges = Array.from(new Set(currentAges));
        let uniqueAgesCounter = new Array(uniqueAges.length).fill(0);
        currentAges.forEach((value, index, array) => {
            uniqueAgesCounter[uniqueAges.findIndex(value2 => value2 === value)]++;
        });
        const maxAgesCounter = Math.max.apply(null, uniqueAgesCounter)
        const popularAgeString = uniqueAges[uniqueAgesCounter.findIndex(value => value == maxAgesCounter)];
        let popularAgeInt =  parseSomeInt(popularAgeString);
        if (popularAgeInt == 11 || popularAgeInt == 12 || popularAgeInt == 13 || popularAgeInt == 14 || popularAgeInt == 15 ||
            popularAgeInt == 16 || popularAgeInt == 17 || popularAgeInt == 18 || popularAgeInt == 19 || popularAgeInt == 20) {
            popularAgeInt += ' лет';
        } else if (popularAgeInt % 10 == 5 || popularAgeInt % 10 == 6 || popularAgeInt % 10 == 7 || popularAgeInt % 10 == 8
            || popularAgeInt % 10 == 9 || popularAgeInt % 10 == 0) {
            popularAgeInt += ' лет';
        } else if (popularAgeInt % 10 == 1) {
            popularAgeInt += ' год';
        } else if (popularAgeInt % 10 == 2 || popularAgeInt % 10 == 3 || popularAgeInt % 10 == 4) {
            popularAgeInt += ' года';
        }
        let percentOfMen = 0;
        let percentOfWomen = 0;
        currentUsers.forEach((value) => {
            if (value.gender === 'мужской') {
                percentOfMen++;
            } else {
                percentOfWomen++;
            }
        });
        percentOfMen = (percentOfMen / currentUsers.length * 100);
        percentOfWomen = (100 - percentOfMen).toFixed(1);
        percentOfMen = percentOfMen.toFixed(1);

        if (percentOfWomen > percentOfMen) {
            document.getElementById('photo').style.backgroundImage = "url('./women.jpg')";
        } else {
            document.getElementById('photo').style.backgroundImage = "url('./men.jpg')";
        }

        document.getElementById('age').innerHTML = popularAgeInt + '<br />' + 'М - ' + percentOfMen + ' %' +
            '<br />' + 'Ж - ' + percentOfWomen + ' %';
        //цель
        let currentPurpose = Array.from(currentUsers, ({goal}) => goal);
        let uniquePurpose = Array.from(new Set(currentPurpose));
        let uniquePurposeCounter = new Array(uniquePurpose.length).fill(0);
        currentPurpose.forEach((value, index, array) => {
            uniquePurposeCounter[uniquePurpose.findIndex(value2 => value2 === value)]++;
        });
        const maxPurposeCounter = Math.max.apply(null, uniquePurposeCounter)
        const popularPurposeString = uniquePurpose[uniquePurposeCounter.findIndex(value => value == maxPurposeCounter)];
        document.getElementById('purpose').innerHTML = 'Цель' + '<br />' + popularPurposeString;
        //средняя сумма за день
        let currentAverageDay = Array.from(currentUsers, ({income}) => parseSomeInt(income));
        currentUsers.map((value, index, array) => {
            currentAverageDay[index] = currentAverageDay[index] / value.days_cnt;
        });
        let averageDay = 0;
        for (const index in currentAverageDay) {
            averageDay += currentAverageDay[index];
        }
        averageDay = averageDay / currentAverageDay.length;
        averageDay = averageDay * 1000;
        averageDay = averageDay.toFixed(2);
        document.getElementById('averageDay').innerHTML = averageDay + ' ₽' + '<br />' + 'Средняя сумма трат за один день';
        //средняя сумма
        let currentAverage = Array.from(currentUsers, ({income}) => parseSomeInt(income));
        let average = 0;
        for (const index in currentAverage) {
            average += currentAverage[index];
        }
        average = average / currentAverage.length;
        average = average * 1000;
        average = average.toFixed(2);
        document.getElementById('average').innerHTML = average + ' ₽' + '<br />' + 'Средняя сумма трат';
        //средний доход
        let currentIncome = Array.from(currentUsers, ({income}) => income);
        let uniqueIncome = Array.from(new Set(currentIncome));
        let uniqueIncomeCounter = new Array(uniqueIncome.length).fill(0);
        currentIncome.forEach((value, index, array) => {
            uniqueIncomeCounter[uniqueIncome.findIndex(value2 => value2 === value)]++;
        });
        const maxIncomeCounter = Math.max.apply(null, uniqueIncomeCounter)
        const popularIncomeString = uniqueIncome[uniqueIncomeCounter.findIndex(value => value == maxIncomeCounter)];
        let popularIncomeInt =  parseSomeInt(popularIncomeString);
        document.getElementById('income').innerHTML = popularIncomeInt + ' 000 ' + ' ₽' + '<br />' + 'Средний доход';
        //средняя длительность
        let currentDuration = Array.from(currentUsers, ({days_cnt}) => +days_cnt);
        let duration = 0;
        for (const index in currentDuration) {
            duration += currentDuration[index];
        }
        duration = duration / currentDuration.length;
        duration = Math.trunc(duration);
        if (duration == 11 || duration == 12 || duration == 13 || duration == 14 || duration == 15 ||
            duration == 16 || duration == 17 || duration == 18 || duration == 19 || duration == 20) {
            duration += ' дней';
        } else if (duration % 10 == 5 || duration % 10 == 6 || duration % 10 == 7 || duration % 10 == 8
            || duration % 10 == 9 || duration % 10 == 0) {
            duration += ' дней';
        } else if (duration % 10 == 1) {
            duration += ' день';
        } else if (duration % 10 == 2 || duration % 10 == 3 || duration % 10 == 4) {
            duration += ' дня';
        }
        document.getElementById('duration').innerHTML = duration + '<br />' + 'средняя длительность посещения';
        console.log('DONE!!!')
    }
}

function parseSomeInt(string) {
    const el = string;
    let numEl = '';
    let numbers = [];
    let result = 0;
    for (const index in el) {
        if ( parseInt(el[index]) || el[index] === '0') {
            numEl += el[index]
        }
        if ( !parseInt(el[index]) && parseInt(el[index - 1])) {
            numbers.push(parseInt(numEl));
            numEl = '';
        }
    }
    for (const index in numbers) {
        result += numbers[index];
    }
    result = Math.round(result / numbers.length);
    return result;
}

getData();

setInterval(getData, 60000);
