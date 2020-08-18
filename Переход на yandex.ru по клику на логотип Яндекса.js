const puppeteer = require('puppeteer');

const URL_TEST = 'https://qa-routes.praktikum-services.ru/';

async function testUrl() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Клик по логотипу Яндекса');
    const yaButton = await page.$('.cXsyOG');
    await yaButton.click();

    try {
      console.log('Ожидание перехода на главную страницу Яндекса');
      await page.waitForNavigation({ timeout: 5000 });

      console.log('Сравнение URL');
      const urlYandex = page.url();

      if (urlYandex === 'https://yandex.ru/') {
          console.log("Test passed");
      } else {
          console.log("Test didn't pass");
      }
    } catch (e) {
      if (e.name && e.name.startsWith('TimeoutError')) {
        console.log('Test didn\'t pass');
      } else {
        console.error(e.message);
      }
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testUrl();
