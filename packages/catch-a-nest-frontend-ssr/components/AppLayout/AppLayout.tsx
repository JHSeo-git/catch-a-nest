import AppHeader from '../AppHeader';
import AppInfo from '../AppInfo';
import Layout from '../Layout';

type LayoutType = 'basic' | 'naked';

export type AppLayoutProps = {
  layoutType?: LayoutType;
  children: React.ReactNode;
};

const AppLayout = ({ layoutType = 'basic', children }: AppLayoutProps) => {
  if (layoutType === 'naked') {
    return <Layout>{children}</Layout>;
  }
  return (
    <Layout>
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout.Main>{children}</Layout.Main>
      <Layout.Footer>
        <AppInfo />
      </Layout.Footer>
    </Layout>
  );
};

export default AppLayout;
