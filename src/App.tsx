import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import FaqPage from "./pages/Faq";
import Cybersecurity from "./pages/courses/Cybersecurity";
import { ScrollToTop } from "./components/ScrollToTop";
import StudentWorkPage from "./pages/StudentWork";
import BlogIndexPage from "./pages/blog/Index";
import BlogPostPage from "./pages/blog/Post";

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
          <Route path="/student-work" element={<StudentWorkPage />} />
          <Route path="/courses/cybersecurity" element={<Cybersecurity />} />
          {/* Old course URLs now land on the only course */}
          <Route path="/courses" element={<Navigate to="/courses/cybersecurity" replace />} />
          <Route path="/courses/*" element={<Navigate to="/courses/cybersecurity" replace />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;