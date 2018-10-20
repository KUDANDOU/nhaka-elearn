import React, { Component } from 'react';
import { BrowserRouter, Switch , Route} from 'react-router-dom';
//import { NotFound } from './Errors';
import MiniDrawer from './Layout';
import HomeCards from './Content/home';
import ExploreCards from './Content/Explore';
import Rec from './Content/Rec';
import Bookmarks from './Content/bookmarks';
import MyPlayer from './Content/player';
import MyPlaying from './Content/playing';
import NextVideo from './Content/NextVideo';
import SignUp from './Content/SignUp';
import Terms from './Content/Term';
import FAQ from './Content/faq';
import Loading from './Content/Loading';


const video = ({match}) => {
	return (<NextVideo videoId={match}/>)
}

const course = ({match}) => {
	return (<MyPlayer courseId={match}/>)
}


export default class extends Component {
  
  render() {
    

    return <BrowserRouter>
      <MiniDrawer>
        <Switch>
          <Route exact path="/" render={props => <HomeCards />} />
          <Route exact path="/reccommended" render={() => <Rec />} />
          <Route exact path="/explore" render={() => <ExploreCards />} />
          <Route exact path="/video/:id" render={() => <MyPlaying />} />
          <Route exact path="/bookmarks" render={() => <Bookmarks />} />
          <Route exact path="/signup" render={() => <SignUp />} />
		  <Route exact path="/course/:course" component={course} />
		  <Route exact path="/termsandconditions" render={() => <Terms />} />
		  <Route exact path="/faq" render={() => <FAQ />} />
		  <Route exact path="/course/:course" component={course} />
		  <Route exact path="/playing" render={() => <MyPlaying />}/>
		  <Route exact path="/video/:id" component={video}/>  
		  <Route exact path="/google" render={() => <Loading />} />  
        </Switch>
      </MiniDrawer>
    </BrowserRouter>
  }
}