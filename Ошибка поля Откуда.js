const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testErrorFrom() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Заполнение поля Откуда');
    const fromInput = await page.$('#form-input-from');
    await fromInput.type('dsfgdsgjfdjghfdj');

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('#form-input-from');

    console.log('Получение строки с результатом');
    const error = await page.$('.sc-htoDjs ljKqQV');

    console.log('Проверка условия тест-кейса');
        if (!error) {
        console.log('Успех');
    } else {
          console.log('Ошибка')
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testErrorFrom();
