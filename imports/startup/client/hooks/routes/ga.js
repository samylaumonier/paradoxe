import { ReactGA } from 'react-ga';

ReactGA.initialize('UA-49256058-7');

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
