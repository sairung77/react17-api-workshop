import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore, applyMiddleware} from 'redux'
import reducer from './reducer';
import { Provider } from 'react-redux';
import StudenLists from './Student-lists';
import AddStudent from './Add-student'
import EditStudent from './Edit-student'
import Header from './Header'
import PageNotFound from './Page-not-found'
import thunk from 'redux-thunk'

const middlewares = [thunk];

function App() {
  const store =createStore(reducer, applyMiddleware(...middlewares))
  return (
     <Provider store={store}>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/edit/:id" component={EditStudent} />
            <Route exact path="/add" component={AddStudent} />
            <Route exact path="/" component={StudenLists} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
