import { ThemeType } from '../recoil/appState';

const key = '__NEXT__CATCH_A_NEST_THEME';

const themeStorage = {
  get() {
    const data = localStorage.getItem(key);
    try {
      if (!data) return null;
      const parsed = JSON.parse(data) as ThemeType;
      return parsed;
    } catch (e) {
      localStorage.removeItem(key);
      return null;
    }
  },
  set(theme: ThemeType) {
    localStorage.setItem(key, JSON.stringify(theme));
  },
  clear() {
    localStorage.removeItem(key);
  },
};

export default themeStorage;
