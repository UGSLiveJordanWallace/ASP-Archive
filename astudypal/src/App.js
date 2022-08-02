// Important Components and Basic Components 
import BasicRoute, { PrivateRoute } from "./Route-Types/RouteTypes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import "./CSS/class.css";
import './CSS/App.css';

// Classes And Sub-Classes
import ForeignLanguagesClass from "./components/Classes/ForeignLanguagesClass";
import PreCalculus from "./components/Classes/sub-classes/math/PreCalculus";
import Chemistry from "./components/Classes/sub-classes/science/Chemistry";
import Geometry from "./components/Classes/sub-classes/math/Geometry";
import SubjectHelp from "./components/service-components/SubjectHelp";
import Algebra1 from "./components/Classes/sub-classes/math/Algebra1";
import Algebra2 from "./components/Classes/sub-classes/math/Algebra2";
import StudentResources from "./components/Classes/StudentResources";
import Editor from "./components/Classes/sub-classes/english/Editor";
import HistoryClass from "./components/Classes/HistoryClass";
import ScienceClass from "./components/Classes/ScienceClass";
import EnglishClass from "./components/Classes/EnglishClass";
import TableOfContents from "./components/TableOfContents";
import MathClass from "./components/Classes/MathClass";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <BasicRoute exact path="/" component={WelcomePage}/>
            <BasicRoute path="/asp-login-authentication" component={Login}/>
            <PrivateRoute path="/understanding/:id" component={SubjectHelp}/>
            <PrivateRoute exact path="/table-of-contents" component={TableOfContents}/>
            <PrivateRoute exact path="/table-of-contents/math-class" component={MathClass}/>
            <PrivateRoute exact path="/table-of-contents/science-class" component={ScienceClass}/>
            <PrivateRoute exact path="/table-of-contents/history-class" component={HistoryClass}/>
            <PrivateRoute exact path="/table-of-contents/english-class" component={EnglishClass}/>
            <PrivateRoute exact path="/table-of-contents/student-resources" component={StudentResources}/>
            <PrivateRoute exact path="/table-of-contents/foreign-languages-class" component={ForeignLanguagesClass}/>
            <PrivateRoute path="/table-of-contents/math-class/sub-class-geometry" component={Geometry}/>
            <PrivateRoute path="/table-of-contents/math-class/sub-class-algebra1" component={Algebra1}/>
            <PrivateRoute path="/table-of-contents/math-class/sub-class-algebra2" component={Algebra2}/>
            <PrivateRoute path="/table-of-contents/math-class/sub-class-pre-calculus" component={PreCalculus}/>
            <PrivateRoute path="/table-of-contents/science-class/sub-class-chemistry" component={Chemistry}/>
            <PrivateRoute exact path="/table-of-contents/english-class/sub-class-editor" component={Editor}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
