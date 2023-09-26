let theme;

window.addEventListener('theme-change', ev => {
  if (ev.detail.theme === 'Dark-Theme') {
    return document.body.classList.add('dark', 'bg-black');
  } else {
    if (document.body.classList.contains('dark', 'bg-black')) {
      return document.body.classList.remove('dark', 'bg-black');
    }
  }
});
if (window.localStorage) {
  if (window.localStorage.getItem('Theme') === 'Dark-Theme') {
    theme = 'dark';
  } else if (!window.localStorage.getItem('Theme')) {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkMode.matches) {
      theme = 'dark';
    }
    darkMode.addEventListener('change', ev => {
      if (ev.matches) {
        document.body.classList.add('dark', 'bg-black');
      } else {
        document.body.classList.remove('dark', 'bg-black');
      }
    });
  }
}
if (theme) {
  window.addEventListener('load', () => {
    document.body.classList.add(theme, 'bg-black');
  });
}
