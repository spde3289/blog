export const ThemeScript = () => {
  const codeToRunOnClient = `(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';

      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolvedTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e)
    }
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default ThemeScript;
