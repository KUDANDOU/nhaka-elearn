import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import {subs} from '../../data/info.js';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
 
  root: {
	height: 'auto',
	marginBottom: 0
	},
  margin: {
	    textAlign: "center",
		textColor: "white",
	    width: '100%',
		color: 'white',
  }
  
  
  
});

class Footer extends Component {
  state = { 
	expanded: false,
	subs,
	spacing: '16'
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
	const { spacing } = this.state;
	

    return (
		
	  <div className={classes.root}>
			<ListItem button component={Link} to="/termsandconditions" >
			  <ListItemText primary="Terms and Conditions" className={classes.margin} />
			</ListItem>
			<ListItem button component={Link} to="/faq">
			  <ListItemText primary="FAQs" className={classes.margin} />
			</ListItem>
			<ListItem button >
			  <ListItemText primary="Email Support: support@nhakaelearning.com" className={classes.margin} />
			</ListItem>
		  </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);