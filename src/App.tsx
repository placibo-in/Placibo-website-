import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import FaqPage from "./pages/Faq";
import CoursesPage from "./pages/courses/Index";
import UIUXDesign from "./pages/courses/UIUXDesign";
import Frontend from "./pages/courses/Frontend";
import BackendNode from "./pages/courses/BackendNode";
import BackendDjango from "./pages/courses/BackendDjango";
import GenerativeAI from "./pages/courses/GenerativeAI";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="light" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/ui-ux-design" element={<UIUXDesign />} />
          <Route path="/courses/frontend-development" element={<Frontend />} />
          <Route path="/courses/backend-nodejs" element={<BackendNode />} />
          <Route path="/courses/backend-django" element={<BackendDjango />} />
          <Route path="/courses/generative-ai" element={<GenerativeAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;