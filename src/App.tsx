import { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/context/PortfolioContext";

const NotFound = lazy(() => import("@/pages/not-found"));
const Overview = lazy(() => import("@/pages/Overview"));
const Experience = lazy(() => import("@/pages/Experience"));
const Projects = lazy(() => import("@/pages/Projects"));
const Skills = lazy(() => import("@/pages/Skills"));
const Languages = lazy(() => import("@/pages/Languages"));
const LanguageDetail = lazy(() => import("@/pages/LanguageDetail"));
const ProjectRagSystem = lazy(() => import("@/pages/ProjectRagSystem"));
const ProjectLlmAcademicWiki = lazy(() => import("@/pages/ProjectLlmAcademicWiki"));
const ProjectLlmServer = lazy(() => import("@/pages/ProjectLlmServer"));
const ProjectVoiceFlow = lazy(() => import("@/pages/ProjectVoiceFlow"));
const ProjectFocusPad = lazy(() => import("@/pages/ProjectFocusPad"));
const AboutMe = lazy(() => import("@/pages/AboutMe"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center animate-pulse text-[var(--c-dim)] font-mono text-xs tracking-widest uppercase">Loading...</div>}>
        <Switch>
          <Route path="/" component={Overview} />
          <Route path="/about" component={AboutMe} />
          <Route path="/experience" component={Experience} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/llm-academic-wiki" component={ProjectLlmAcademicWiki} />
          <Route path="/projects/llm-server" component={ProjectLlmServer} />
          <Route path="/projects/voiceflow" component={ProjectVoiceFlow} />
          <Route path="/projects/rag-system" component={ProjectRagSystem} />
          <Route path="/projects/focuspad" component={ProjectFocusPad} />
          <Route path="/skills" component={Skills} />
          <Route path="/languages" component={Languages} />
          <Route path="/languages/:slug" component={LanguageDetail} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <PortfolioProvider>
            <Router />
          </PortfolioProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
