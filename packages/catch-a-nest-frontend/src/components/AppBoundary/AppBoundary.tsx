import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export type AppBoundaryProps = {
  pendingFallback:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null;
  errorFallback: React.ReactElement<
    unknown,
    string | typeof React.Component | React.FunctionComponent<{}>
  > | null;
  children: React.ReactNode;
};

const AppBoundary = ({
  pendingFallback,
  errorFallback,
  children,
}: AppBoundaryProps) => {
  return (
    <Suspense fallback={pendingFallback}>
      <ErrorBoundary fallback={errorFallback}>{children}</ErrorBoundary>
    </Suspense>
  );
};

export default AppBoundary;
