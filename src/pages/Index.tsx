
import { lazy, Suspense } from "react";
import QuoteDisplay from "../components/QuoteDisplay";

// Lazy load the Navigation component
const Navigation = lazy(() => import("../components/Navigation"));

const Index = () => {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-[#E8E6E1]"></div>}>
        <Navigation />
      </Suspense>
      <QuoteDisplay />
    </>
  );
};

export default Index;
