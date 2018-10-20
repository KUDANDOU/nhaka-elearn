import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridList from '@material-ui/core/GridList';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import {subs} from '../../data/info.js';
import {HorizontalList } from 'react-key-navigation';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';




const styles = theme => ({
  card: {
	height: 250,
	width: 200
  },
  root: {
    flexGrow: 1,
	width: '100%'
  },
  media: {
    height: 140,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    height: 0,
  },
  avatar: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  rootList: {
    width: '100%',
    maxWidth: '100%' ,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 450,
  },
  nameSpace: {
    marginLeft: 10,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: 'auto',
	width: 400,
	 
	
  },
  
});



class Overview extends Component {
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
	<List className={classes.rootList} subheader={<li />}>
      <ListItem >
           <Typography className={classes.textMargin} variant="h6">
			  Course Details
		</Typography>    
       </ListItem>
	   <ListItem >
           <Typography className={classes.textMargin} variant="caption">
			  1h 7m - Beginner - Released: February 22, 2017 - 5 chapter quizzes
		</Typography>
		    
       </ListItem>
	   <ListItem >
           <Typography className={classes.textMargin} variant="body">
			<div className={classes.textMargin}>
			  Planning projects, assigning tasks, tracking progress, and releasing results 
			  can all be managed in Jira, the popular and collaborative software for development 
			  teams. In this course, Robert Anthony shares his expertise as he guides you through 
			  the fundamentals of using Jira. Robert shows you how to create tickets, locate issues 
			  assigned to you and others, use advanced search, customize dashboards, run reports, and 
			  set up workflow boards to organize work. In addition, he facilitates several challenges 
			  and solutions so you can practice what you learn as you follow along.
			 </div>
		</Typography>
		    
       </ListItem>
	   	  
         <Divider className={classes.textMargin}/>  

		<ListItem >
          <Typography variant="body" gutterBottom>
				48,396 viewers watched this course
			</Typography>    
       </ListItem>
	   
	   <Divider className={classes.textMargin}/>
	   
	   <ListItem >
          <Typography variant="subtitle1" gutterBottom>
				Skills covered in this course
			</Typography> 
				
       </ListItem>
	   <ListItem >
          <Chip label="Counting" className={classes.chip} variant="outlined" /> 
          <Chip label="Multiplication" className={classes.chip} variant="outlined" /> 
          <Chip label="Addition" className={classes.chip} variant="outlined" /> 
          <Chip label="Long Division" className={classes.chip} variant="outlined" /> 
       </ListItem>
	   
	   <Divider className={classes.textMargin}/>
	   
	   
       
    </List>
	
    );
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);