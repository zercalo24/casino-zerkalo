(function () {
  'use strict';

  var state = {
    license: [],
    bonusType: [],
    onlyVerified: false,
    onlyNew: false,
    sort: 'rating'
  };

  var ledgerEl = document.getElementById('ledgerList');
  var heroPicksEl = document.getElementById('heroPicks');
  var resultCountEl = document.getElementById('resultCount');

  function fmtMoney(n) {
    return n.toLocaleString('ru-RU') + ' \u20BD';
  }

  function expertNote(c) {
    var prosLine = c.pros && c.pros.length ? c.pros[0] : '';
    var consLine = c.cons && c.cons.length ? c.cons[0] : '';
    var bits = [];
    if (prosLine) bits.push(prosLine.toLowerCase());
    if (consLine) bits.push('минус — ' + consLine.toLowerCase());
    return 'Тест вывода: ' + c.withdrawSpeed + ', лимит ' + c.withdrawLimit + '. ' +
      (bits.length ? bits.join('; ') + '.' : '');
  }

  function rowTemplate(c, rank) {
    var verifiedBadge = c.verified ? '<span class="badge verified"><i class="fa fa-check"></i> Проверено</span>' : '';
    var newBadge = c.isNew ? '<span class="badge new">New</span>' : '';
    return (
      '<div class="ledger-row" data-id="' + c.id + '">' +
        '<div class="row-rank">' + String(rank).padStart(2, '0') + '</div>' +
        '<div class="row-brand">' +
          '<img src="' + iconUrl(c.key) + '" alt="' + c.name + '" loading="lazy" width="44" height="44">' +
        '</div>' +
        '<div class="row-brand">' +
          '<div><div class="name">' + c.name + '</div>' +
          '<div class="badges">' + verifiedBadge + newBadge + '</div></div>' +
        '</div>' +
        '<div class="row-stat"><div class="stat-label">Бонус</div>' +
          '<div class="stat-value">' + c.bonusText + '</div>' +
          '<div class="stat-sub">вейджер ' + c.wagering + '</div></div>' +
        '<div class="row-stat"><div class="stat-label">Вывод</div>' +
          '<div class="stat-value">' + c.withdrawSpeed + '</div>' +
          '<div class="stat-sub">' + c.withdrawLimit + '</div></div>' +
        '<div class="row-rating"><i class="fa fa-star"></i> ' + c.rating.toFixed(1) + '</div>' +
        '<a class="row-cta" href="' + c.url + '" target="_blank" rel="sponsored noopener">Играть</a>' +
        '<button class="row-note-toggle">подробнее ▾</button>' +
        '<div class="row-note">' + expertNote(c) + '</div>' +
      '</div>'
    );
  }

  function getFiltered() {
    return casinos.filter(function (c) {
      if (state.license.length && state.license.indexOf(c.license) === -1) return false;
      if (state.bonusType.length && !c.bonusTypes.some(function (t) { return state.bonusType.indexOf(t) !== -1; })) return false;
      if (state.onlyVerified && !c.verified) return false;
      if (state.onlyNew && !c.isNew) return false;
      return true;
    });
  }

  function getSorted(list) {
    var sorted = list.slice();
    if (state.sort === 'rating') sorted.sort(function (a, b) { return b.rating - a.rating; });
    if (state.sort === 'bonus') sorted.sort(function (a, b) { return b.bonusAmount - a.bonusAmount; });
    if (state.sort === 'withdraw') sorted.sort(function (a, b) { return a.withdrawSpeed.localeCompare(b.withdrawSpeed); });
    if (state.sort === 'new') sorted.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.rating - a.rating; });
    return sorted;
  }

  function render() {
    var list = getSorted(getFiltered());
    resultCountEl.textContent = list.length;
    ledgerEl.innerHTML = list.map(function (c, i) { return rowTemplate(c, i + 1); }).join('');
  }

  function renderHeroPicks() {
    var top3 = casinos.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 3);
    heroPicksEl.innerHTML = top3.map(function (c, i) {
      return '<div class="hero-pick">' +
        '<div class="rank">' + (i + 1) + '</div>' +
        '<img src="' + iconUrl(c.key) + '" alt="' + c.name + '" width="34" height="34">' +
        '<div><div class="name">' + c.name + '</div><div class="bonus">' + c.bonusText + '</div></div>' +
      '</div>';
    }).join('');
  }

  function renderMeta() {
    document.getElementById('metaTotal').textContent = casinos.length;
    document.getElementById('metaVerified').textContent = casinos.filter(function (c) { return c.verified; }).length;
    var d = new Date();
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    document.getElementById('updatedLabel').textContent = 'обновлено ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  ledgerEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.row-note-toggle');
    if (!btn) return;
    btn.closest('.ledger-row').classList.toggle('expanded');
  });

  document.querySelectorAll('input[name="license"]').forEach(function (el) {
    el.addEventListener('change', function () {
      state.license = Array.from(document.querySelectorAll('input[name="license"]:checked')).map(function (i) { return i.value; });
      render();
    });
  });
  document.querySelectorAll('input[name="bonusType"]').forEach(function (el) {
    el.addEventListener('change', function () {
      state.bonusType = Array.from(document.querySelectorAll('input[name="bonusType"]:checked')).map(function (i) { return i.value; });
      render();
    });
  });
  document.getElementById('onlyVerified').addEventListener('change', function (e) {
    state.onlyVerified = e.target.checked; render();
  });
  document.getElementById('onlyNew').addEventListener('change', function (e) {
    state.onlyNew = e.target.checked; render();
  });
  document.getElementById('sortSelect').addEventListener('change', function (e) {
    state.sort = e.target.value; render();
  });
  document.getElementById('resetFilters').addEventListener('click', function () {
    state.license = []; state.bonusType = []; state.onlyVerified = false; state.onlyNew = false;
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(function (i) { i.checked = false; });
    render();
  });

  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  themeToggle.addEventListener('click', function () {
    var html = document.documentElement;
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeIcon.className = next === 'dark' ? 'fa fa-moon' : 'fa fa-sun';
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  renderMeta();
  renderHeroPicks();
  render();
})();
