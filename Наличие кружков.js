const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testBlueRedRound() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Нахождение искомого элемента');
    const blueRound = await page.$(".sc-gzVnrw gEcWAM");
    const redRound = await page.$(".sc-gzVnrw eqLFUq");

    console.log('Проверка условия тест-кейса');
        if (!blueRound && !redRound ) {
        console.log("passed");
    } else {
          console.log("false")
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testBlueRedRound();
