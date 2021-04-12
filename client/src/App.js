import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Component/Profile";
import Signin from "./Component/Signin";
import Signup from "./Component/signup";
import Admin from "./Component/Admin";
import "@fortawesome/fontawesome-free/css/all.min.css";

//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Preferences from "./Component/Preferences";
import FirstStep from "./Component/createdExperience/FirstStep";
import FirstStep2 from "./Component/createdExperience/FirstStep2";
import SecondStep from "./Component/createdExperience/SecondStep";
import ThirdStep from "./Component/createdExperience/ThirdStep";
import FourthStep from "./Component/createdExperience/FourthStep";
import FifthStep from "./Component/createdExperience/FifthStep";
import ExperienceDetails from "./Component/createdExperience/ExperienceDetails";
import ExperiencesList from "./Component/createdExperience/ExperiencesList";
import CreatedExperienceListAd from "./Component/Admin/CreatedExperienceListAd";
import Home from "./Component/Home";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
};

function App() {
  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Route exact path="/" component={Home} />

        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route exact path="/admin" component={Admin} /> */}
        <Route exact path="/preferences" component={Preferences} />
        <Route exact path="/first" component={FirstStep} />
        <Route exact path="/first/:id" component={FirstStep2} />
        <Route exact path="/second/:id" component={SecondStep} />
        <Route exact path="/third/:id" component={ThirdStep} />
        <Route exact path="/fourth/:id" component={FourthStep} />
        <Route exact path="/fifth/:id" component={FifthStep} />
        <Route exact path="/experience/:id" component={ExperienceDetails} />
        <Route exact path="/experiences" component={ExperiencesList} />
        <Route exact path="/admin" component={CreatedExperienceListAd} />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
