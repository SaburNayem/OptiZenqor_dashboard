import { DashboardProvider } from "../store/DashboardContext";

function AppProviders({ children }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

export default AppProviders;
