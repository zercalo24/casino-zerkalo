/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         CASINO-ZERKALO.ONLINE — ЦЕНТРАЛЬНЫЙ КОНФИГ      ║
 * ║                                                          ║
 * ║  Все партнёрские ссылки хранятся ТОЛЬКО здесь.          ║
 * ║  При блокировке РКН — меняйте ссылку в этом файле.      ║
 * ║  Все страницы сайта обновятся автоматически.            ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * КАК ОБНОВИТЬ ССЫЛКУ:
 * 1. Найдите нужное казино по названию
 * 2. Замените URL внутри кавычек на новый
 * 3. Сохраните файл и загрузите на сервер
 * 4. Готово — все страницы обновились!
 */

const CASINO_LINKS = {

  // ── ТОП КАЗИНО ──────────────────────────────────────────
  "EVA CASINO":       "https://7ev4-laughy.com/drqcqyoqp",
  "VAVADA CASINO":    "https://gate707.com/?promo=d9d43ea1-0cd0-4dd8-9a86-28d352183bfe&target=register",
  "1WIN CASINO":      "https://one-vv893.com/?p=sxqe",
  "STAKE CASINO":     "http://stake1036.com/?c=UdQh5cRu",
  "DUEL CASINO":      "https://duel.com/r/RUBLIK",
  "КУШ CASINO":       "https://pl4y-zn-ksh.com/dqyptbuu1",

  // ── КАЗИНО А-Ж ──────────────────────────────────────────
  "1GO CASINO":       "https://luckyspin23.com/ce3ee979d",
  "ARKADA CASINO":    "https://orbit-burn.com/sjyfpt9lu",
  "AUF CASINO":       "https://aufas.com/d5b5799f1",
  "BANDA CASINO":     "https://play-b4nd-zn-light.com/dyrzost9y",
  "BEEF CASINO":      "https://luckyspin23.com/c2197b5c3",
  "CACTUS CASINO":    "https://lavoluntadisabel.xyz/affiliate/c_4wj3z1mk?path=%2Fbonuses",
  "CASINO X":         "https://21631.gameshere.xyz/ru/registration2?partner=p21631p3326886p3e51",
  "CAT CASINO":       "https://cosmic-propel.com/s8xpflrrv",
  "CHAMPION SLOTS":   "https://clck.ru/3PEbRM",
  "CRYPTOBOSS":       "https://cryptobossc.online/d247e5ab0",
  "DADDY CASINO":     "https://eclipse-propel.com/sjw6v0biu",
  "DRIP CASINO":      "https://drp-irrs10.com/c18ebfa90",

  // ── КАЗИНО З-Л ──────────────────────────────────────────
  "FLAGMAN CASINO":   "https://luckyspin23.com/c53208e7a",
  "FRESH CASINO":     "https://luckyspin23.com/c68dac41e",
  "FUGU CASINO":      "https://luckyspin23.com/cf06cace2",
  "GAMA CASINO":      "https://starforge-race.com/s8xcfzhvw",
  "GIZBO CASINO":     "https://luckyspin23.com/c95b15693",
  "IRVIN CASINO":     "https://irwinway64.com/ceab33ee3",
  "IZZI CASINO":      "https://luckyspin23.com/c43f751ad",
  "JET CASINO":       "https://luckyspin23.com/c8f631ce7",
  "JOY CASINO":       "https://clck.ru/3QXq6p",
  "KENT CASINO":      "https://cosmic-kinetics.com/sroosyate",
  "КОМЕТА CASINO":    "https://eclipse-vectorial.com/sgztgjshb",
  "LEEBET CASINO":    "https://play-leebet-4th.com/dakw9czmc",
  "LEGZO CASINO":     "https://legzoway63.com/cb08d1ad1",
  "LEXX CASINO":      "https://luckyspin23.com/c6a279922",

  // ── КАЗИНО М-Я ──────────────────────────────────────────
  "MARTIN CASINO":    "https://luckyspin23.com/cf930f628",
  "MONRO CASINO":     "https://luckyspin23.com/c6f3677f9",
  "R7 CASINO":        "https://hyper-trail.com/slc53vzfn",
  "RAMENBET":         "https://clck.ru/39JnjJ",
  "ROX CASINO":       "https://luckyspin23.com/c539c0617", 
  "SOL CASINO":       "https://luckyspin23.com/c6c6e3028",
  "STARDA CASINO":    "https://luckyspin23.com/c2f2d2001",
  "UNLIM CASINO":     "https://unlimc.net/d2531e71a",
  "VODKA CASINO":     "https://go676039.com/?id=17119",
  "VOLNA CASINO":     "https://luckyspin23.com/c0b60ebdc",

};

/**
 * Функция автоматической подстановки ссылок на странице.
 * Вызывается на каждой странице при загрузке.
 *
 * Ищет все элементы с атрибутом data-casino="ИМЯ КАЗИНО"
 * и подставляет в href нужную ссылку из конфига выше.
 */
function applyCasinoLinks() {
  document.querySelectorAll('[data-casino]').forEach(el => {
    const name = el.getAttribute('data-casino');
    const url = CASINO_LINKS[name];
    if (url) {
      el.href = url;
    }
  });
}

// Запускаем после загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyCasinoLinks);
} else {
  applyCasinoLinks();
}
