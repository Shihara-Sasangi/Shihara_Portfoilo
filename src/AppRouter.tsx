import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { App as HomePage } from "./App";
import { AcademicModulesPage } from "./pages/AcademicModulesPage";
import { PersonalProjectsPage } from "./pages/PersonalProjectsPage";
import { UniversityParticipantsPage } from "./pages/UniversityParticipantsPage";
import { UniversityProjectsPage } from "./pages/UniversityProjectsPage";

const NavigateAndScrollHome: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateSection = (id: string) => {
    // Home must mount first; App scrolls after paint using location.state (see App.tsx).
    navigate("/", { state: { scrollToSectionId: id } });
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects/personal"
        element={<PersonalProjectsPage onNavigateSection={handleNavigateSection} />}
      />
      <Route
        path="/projects/university"
        element={<UniversityProjectsPage onNavigateSection={handleNavigateSection} />}
      />
      <Route
        path="/experience/academic-modules"
        element={<AcademicModulesPage onNavigateSection={handleNavigateSection} />}
      />
      <Route
        path="/experience/university-participants"
        element={<UniversityParticipantsPage onNavigateSection={handleNavigateSection} />}
      />
    </Routes>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigateAndScrollHome />
    </BrowserRouter>
  );
};

