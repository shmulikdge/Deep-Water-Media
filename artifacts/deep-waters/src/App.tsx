import { Suspense, lazy, useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CookieBanner } from "@/components/CookieBanner";
import { BackToTop } from "@/components/BackToTop";
import { HearTheCanyon } from "@/components/HearTheCanyon";

import Home from "@/pages/Home";

const NotFound = lazy(() => import("@/pages/not-found"));
const TourPage = lazy(() => import("@/pages/TourPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const GuidePage = lazy(() => import("@/pages/GuidePage"));
const GuideArticlePage = lazy(() => import("@/pages/GuideArticlePage"));
const AdventureGame = lazy(() => import("@/pages/AdventureGame"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const WelcomeOverlay = lazy(() =>
  import("@/components/WelcomeOverlay").then((m) => ({ default: m.WelcomeOverlay })),
);

const queryClient = new QueryClient();

const PAGE_FALLBACK = <div className="min-h-screen bg-background" aria-hidden />;

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tour">
          <Suspense fallback={PAGE_FALLBACK}>
            <TourPage />
          </Suspense>
        </Route>
        <Route path="/gallery">
          <Suspense fallback={PAGE_FALLBACK}>
            <GalleryPage />
          </Suspense>
        </Route>
        <Route path="/about">
          <Suspense fallback={PAGE_FALLBACK}>
            <AboutPage />
          </Suspense>
        </Route>
        <Route path="/guide/:slug">
          <Suspense fallback={PAGE_FALLBACK}>
            <GuideArticlePage />
          </Suspense>
        </Route>
        <Route path="/guide">
          <Suspense fallback={PAGE_FALLBACK}>
            <GuidePage />
          </Suspense>
        </Route>
        <Route path="/adventure-game">
          <Suspense fallback={PAGE_FALLBACK}>
            <AdventureGame />
          </Suspense>
        </Route>
        <Route path="/contact">
          <Suspense fallback={PAGE_FALLBACK}>
            <ContactPage />
          </Suspense>
        </Route>
        <Route path="/privacy-policy">
          <Suspense fallback={PAGE_FALLBACK}>
            <PrivacyPolicyPage />
          </Suspense>
        </Route>
        <Route path="/terms">
          <Suspense fallback={PAGE_FALLBACK}>
            <TermsPage />
          </Suspense>
        </Route>
        <Route>
          <Suspense fallback={PAGE_FALLBACK}>
            <NotFound />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let id: number;
    if (typeof window.requestIdleCallback !== "undefined") {
      id = window.requestIdleCallback(() => setShowOverlay(true), { timeout: 1500 }) as unknown as number;
    } else {
      id = window.setTimeout(() => setShowOverlay(true), 500);
    }
    return () => {
      if (typeof window.requestIdleCallback !== "undefined") {
        window.cancelIdleCallback(id);
      } else {
        window.clearTimeout(id);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <HearTheCanyon />
            <CookieBanner />
            <BackToTop />
          </WouterRouter>
          {showOverlay && (
            <Suspense fallback={null}>
              <WelcomeOverlay />
            </Suspense>
          )}
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
