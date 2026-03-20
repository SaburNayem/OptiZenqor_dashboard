import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { buildDashboardView, createDashboardActions, createSeedState } from "./dashboardStore";
import { loadPersistedDashboardState, persistDashboardState } from "./persistence";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, setState] = useState(() => loadPersistedDashboardState() ?? createSeedState());

  useEffect(() => {
    persistDashboardState(state);
  }, [state]);

  const value = useMemo(() => {
    const actions = createDashboardActions(setState);

    return {
      ...buildDashboardView(state),
      ...actions,
    };
  }, [state]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }

  return context;
}
