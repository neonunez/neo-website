import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/context/PortfolioContext";
import NotFound from "@/pages/not-found";
import Overview from "@/pages/Overview";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Languages from "@/pages/Languages";
import LanguageDetail from "@/pages/LanguageDetail";
import ProjectRagSystem from "@/pages/ProjectRagSystem";
import ProjectLlmAcademicWiki from "@/pages/ProjectLlmAcademicWiki";
import ProjectLlmServer from "@/pages/ProjectLlmServer";
import ProjectVoiceFlow from "@/pages/ProjectVoiceFlow";
import ProjectFocusPad from "@/pages/ProjectFocusPad";
import AboutMe from "@/pages/AboutMe";

const queryClient = new QueryClient();

function Router() {
  return (
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
