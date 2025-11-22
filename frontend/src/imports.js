// ************************************************Components************************************************

// Components/header
export { Header } from "./components/header/Header";
export { UserDropDown } from "./components/header/UserDropDown";
// Components/home
export { StepCard } from "./components/home/StepCard";
// Components/routes
export { PrivateRoute } from "./components/routes/PrivateRoute";
// Components/profile
export { SideBar } from "./components/profile/SideBar";
export {Applicant} from "./components/profile/Applicant"
export {Sponsor} from "./components/profile/Sponsor"
// Components/utils
export { FadeInWhenVisible } from "./components/FadeWhenVisible";
export { BasicAlert } from "./components/BasicAlert";
export { Footer } from "./components/Footer";

// ************************************************Pages************************************************

// Pages
export { HomePage } from "./pages/HomePage";
export { SignupPage } from "./pages/SignupPage";
export { LoginPage } from "./pages/LoginPage";
// Pages/settings
export { ProfileLayout } from "./pages/profile/ProfileLayout";
export { OrganizationSettings } from "./pages/profile/OrganizationSettings";
export { ProfileSettings } from "./pages/profile/ProfileSettings";

// Routes
export { AllRoutes } from "./routes/AllRoutes";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useUpdateSettings } from "./hooks/useUpdateSettings";
// export * from './hooks/useForm';
// export * from './hooks/useLocalStorage';

// Contexts
// export * from './contexts/AuthContext';
// export * from './contexts/ThemeContext';

// Services
// export * from './services/api';
// export * from './services/auth';

// Utils
// export * from './utils/constants';
// export * from './utils/helpers';

export { applicantSteps } from "./utils/steps";
export { brandSteps } from "./utils/steps";

// Types
// export * from './types';

// Store
// export * from './store/actions';
// export * from './store/reducers';

// Note: Uncomment the exports as you create the corresponding files and components
