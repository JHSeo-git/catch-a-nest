import useFirebasePageViewEffect from '@src/hooks/useFirebasePageViewEffect';
import Admin from '@src/pages/Admin';
import Error from '@src/pages/Error';
import Post from '@src/pages/Post';
import Posts from '@src/pages/Posts';
import TempPosts from '@src/pages/TempPosts';
import Write from '@src/pages/Write';
import { Redirect, Route, Switch } from 'react-router';
import AppInfo from './AppInfo';
import Header from './Header';
import Layout from './Layout';

export type RouterProps = {};

const Router = (props: RouterProps) => {
  useFirebasePageViewEffect();

  return (
    <Switch>
      <Route exact path={['/', '/temps', '/post/:slug', '/admin']}>
        <Layout>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Switch>
            <Layout.Main>
              <Route exact path="/">
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
      <Route exact path="/error">
        <Error />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default Router;
