import { Redirect, Route, Switch, useHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import useAppToast from '@src/hooks/useAppToast';
import useFirebasePageViewEffect from '@src/hooks/useFirebasePageViewEffect';
import useUnhandledError from '@src/hooks/useUnhandledError';
import Admin from '@src/pages/Admin';
import Error from '@src/pages/Error';
import Post from '@src/pages/Post';
import Posts from '@src/pages/Posts';
import TempPosts from '@src/pages/TempPosts';
import Write from '@src/pages/Write';
import AppInfo from './AppInfo';
import Header from './Header';
import Layout from './Layout';
import ScrollToTop from './Layout/ScrollToTop';

export type RouterProps = {};

const Router = (props: RouterProps) => {
  const { notify } = useAppToast();
  const history = useHistory();

  useFirebasePageViewEffect();
  useUnhandledError(({ reason: error }) => {
    notify(error.message ?? 'Error', 'error');
    history.push('/error');
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path={['/', '/posts', '/temps', '/post/:slug', '/admin']}>
          <Layout>
            <Layout.Header>
              <Header />
            </Layout.Header>
            <Switch>
              <Layout.Main>
                <Route exact path={['/', '/posts']}>
                  <Posts />
                </Route>
                <Route path="/temps">
                  <TempPosts />
                </Route>
                <Route exact path="/post/:slug">
                  <Post />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Layout.Main>
            </Switch>
            <Layout.Footer>
              <AppInfo />
            </Layout.Footer>
          </Layout>
        </Route>
        <Route exact path={'/write/:slug?'}>
          <Write />
        </Route>
        <Route exact path={['/error', '/404']}>
          <Error />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
