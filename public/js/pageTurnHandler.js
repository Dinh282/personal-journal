var journalPage = document.getElementById('journal');

window.addEventListener('resize', function (e) {
  journalPage.style.width = '';
  journalPage.style.height = '';
  $(journalPage).turn(
    'size',
    journalPage.clientWidth,
    journalPage.clientHeight
  );
});

$(journalPage).turn({
  autoCenter: true,
});
