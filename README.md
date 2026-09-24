# SpinRate — статический сайт (HTML/CSS/JS)
Без сборки и бэкенда. Откройте `index.html` двойным кликом или разместите на GitHub Pages.

## Деплой на GitHub Pages
1. Создайте репозиторий (`spinrate` или `username.github.io`).
2. `git init && git add . && git commit -m "init" && git branch -M main && git remote add origin <URL> && git push -u origin main`
3. Settings → Pages → Source: `main` / root → Save.
4. Через 1–2 минуты сайт будет на `https://username.github.io/spinrate/`.
5. Свой домен: файл `CNAME` с доменом + DNS (A-записи GitHub или CNAME на `username.github.io`).

## Структура
`index.html` · `404.html` · `css/style.css` · `js/main.js` · `data/casinos.js` · `.nojekyll`

## Как добавить казино
Откройте `data/casinos.js` и добавьте объект в массив по образцу существующих (id, name, rating, bonus, license, minDep, payout, pay, tag, pros, cons). Данные лежат в `.js`, а не в `.json`, потому что `fetch` не работает при открытии через `file://`.
Все названия и цифры — вымышленные демо-данные.
