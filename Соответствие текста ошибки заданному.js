const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testErrorText() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Заполнение поля Откуда');
    const fromInput = await page.$('#form-input-from');
    await fromInput.type('dsfgdsgjfdjghfdj');

    console.log('Заполнение поля Куда');
    const toInput = await page.$('#form-input-to');
    await toInput.type('Комсомольский проспект, 18');

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('#form-input-from');

    console.log('Получение строки с результатом');
    const text = await page.$eval('.ljKqQV', element => element.textContent);

    console.log('Проверка условия тест-кейса');
        if (text.startsWith('Вы ввели некорректный адрес')) {
        console.log('Успех');
    } else {
          console.log('Сообщение содержит ошибку')
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testErrorText();
