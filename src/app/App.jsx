import { RouterProvider } from "react-router-dom";
import AppErrorBoundary from "./AppErrorBoundary";
import AppProviders from "./providers";
import { router } from "./router";

function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </AppErrorBoundary>
  );
}

export default App;
