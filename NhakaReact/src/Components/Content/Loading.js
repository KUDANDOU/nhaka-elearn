import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import FullWidthTabs from './Tabs';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import ContentLoader, { Facebook } from 'react-content-loader';


const styles =  ({
 
  textMargin:{
	  margin: 10,
	  height: 400,
	  width: 'auto'
	  
  },
  root: {
    margin: 10,
  },
  
});

const MyLoader = () => <ContentLoader />
const MyFacebookLoader = () => <Facebook />

class Loading extends Component {
  constructor(props){
		super(props);
		window.location = 'http://www.google.com'
		
	}
  
  
  
  

  render() {
    const { classes  } = this.props;
	

    return (
	<Fragment>
		<Paper className={classes.textMargin}>
		    
			
		    <LinearProgress variant="query" />
			<ContentLoader className={classes.root}>
			{/* Pure SVG */}
			<rect x="0" y="0" rx="5" ry="5" width="50" height="50" />
			<rect x="80" y="17" rx="4" ry="4" width="200" height="10" />
			<rect x="80" y="40" rx="3" ry="3" width="150" height="7" />
			</ContentLoader>
			  
			
      </Paper>
	  
 </Fragment>
	  
	  
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);