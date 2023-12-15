import React, { lazy, Suspense } from "react";

const LazyRouter = (lazyComponent: any) => {
  const Comp = lazy(lazyComponent);
  return (props: any) => (
    <Suspense fallback={<span className="loading loading-bars loading-lg" />}>
      <Comp {...props} />
    </Suspense>
  );
};

export default LazyRouter;
