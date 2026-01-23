import { Suspense, type ComponentType } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

interface LazyRouteProps {
  component: ComponentType;
}

export default function LazyRoute({ component: Component }: LazyRouteProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
