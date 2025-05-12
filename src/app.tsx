import {
  BrowserRouter,
  Route,
  Routes
} from "react-router";

import { Provider } from "./providers";

import HomePage from "./views/home";
import OopsPage from "./views/error/oops";

const App = (): React.ReactNode => {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route
            path={"*"}
            element={
              <OopsPage />
            }
          />
          <Route
            path={"/"}
            element={
              <HomePage />
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App