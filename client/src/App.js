import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Profile from './Component/Profile';
import Signin from './Component/Signin';
import Signup from './Component/signup';
import '@fortawesome/fontawesome-free/css/all.min.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Preferences from './Component/Preferences/Preferences';
import FirstStep from './Component/createdExperience/FirstStep';
import FirstStep2 from './Component/createdExperience/FirstStep2';
import SecondStep from './Component/createdExperience/SecondStep';
import ThirdStep from './Component/createdExperience/ThirdStep';
import FourthStep from './Component/createdExperience/FourthStep';
import FifthStep from './Component/createdExperience/FifthStep';
import ExperienceDetails from './Component/createdExperience/ExperienceDetails';
import ExperiencesList from './Component/createdExperience/ExperiencesList';
import Home from './Component/Home';
import Index from './Component/Admin/Index';
import UserDetails from './Component/Admin/UserDetails';

import CreatorHome from './Component/CreatorHome';
import ImagesStep from './Component/createdExperience/ImagesStep';
import ExperienceDetailsAd from './Component/Admin/ExperienceDetailsAd';
import Form from './Component/Form';
import PublishIndex from './Component/publishedExperience/PublishIndex';
import Intro from './Component/sessions/Intro';
import Session from './Component/sessions/Session';
import Publish from './Component/sessions/Publish';
import Publications from './Component/publishedExperience/Publications';
import PublicationDetails from './Component/publishedExperience/PublicationDetails';
import HandleSessions from './Component/sessions/HandleSessions';
import PeopleInterested from './Component/publishedExperience/PeopleInterested';
import PublishedSessionList from './Component/publishedExperience/PublishedSessionList';
import ShowReservation from './Component/showReservation/ShowReservation';
import Recommandations from './Component/experienceFilter/Recommandations';
import OnlineExperiences from './Component/experienceFilter/OnlineExperiences';
import InPersonExperiences from './Component/experienceFilter/InPersonExperiences';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
};

function App() {
  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/creator" component={CreatorHome} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Signin} />
          <Route path="/profile" component={Profile} />
          <Route path="/preferences" component={Preferences} />
          <Route path="/create" component={FirstStep} />
          <Route path="/first/:id" component={FirstStep2} />
          <Route path="/second/:id" component={SecondStep} />
          <Route path="/third/:id" component={ThirdStep} />
          <Route path="/fourth/:id" component={FourthStep} />
          <Route path="/fifth/:id" component={FifthStep} />
          <Route path="/experience/:id" component={ExperienceDetails} />
          <Route path="/admin/:id" component={ExperienceDetailsAd} />
          <Route path="/experiences" component={ExperiencesList} />
          <Route path="/user/:id" component={UserDetails} />
          <Route path="/image/:id" component={ImagesStep} />
          <Route path="/form" component={Form} />
          <Route path="/publish/:id" component={PublishIndex} />
          <Route path="/intro/:id" component={Intro} />
          <Route path="/session/:id" component={Session} />
          <Route path="/publication/:id" component={Publish} />
          <Route path="/explore" component={Publications} />
          <Route path="/details/:id" component={PublicationDetails} />
          <Route path="/handle/:id" component={HandleSessions} />
          <Route path="/people/:id" component={PublishedSessionList} />
          <Route path="/reservation" component={ShowReservation} />
          <Route path="/foryou" component={Recommandations} />
          <Route path="/online" component={OnlineExperiences} />
          <Route path="/inperson" component={InPersonExperiences} />

          {localStorage.getItem('token') ? (
            <Route path="/admin" component={Index} />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </AlertProvider>
    </Router>
  );
}

export default App;
