import "./App.css";
import ApplicationRoutes from "routes/application";
import { ThemeProvider } from "@mui/system";
import theme from "themes";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { Provider } from "react-redux";
import { store, persistor } from "redux_store";
import { PersistGate } from "redux-persist/lib/integration/react";
import "./firebase_config";
import { SnackToast } from "components";
import { Chart, registerables } from "chart.js";
import Modal from "components/loader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { LocalizationProvider } from "@mui/lab";

Chart.register(...registerables);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={theme}>
              <ApplicationRoutes />
            </ThemeProvider>
          </LocalizationProvider>
          <SnackToast />
          <Modal />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
