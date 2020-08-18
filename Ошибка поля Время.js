const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testFalseHour() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Шаг 1: ввод часов и минут');
    const hoursInput = await page.$('#form-input-hour');
    await hoursInput.type('8');

    const minutesInput = await page.$('#form-input-minute');
    await minutesInput.type('00');

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('#form-input-hour');

    console.log('Получение строки с результатом');
    const error = await page.$('.sc-htoDjs kUbUul');

    console.log('Проверка условия тест-кейса');
        if (!error) {
        console.log("passed");
    } else {
          console.log("false")
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testFalseHour();
