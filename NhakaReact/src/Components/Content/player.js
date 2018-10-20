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
import {maths} from '../../data/info.js';
import {HorizontalList } from 'react-key-navigation';
import Divider from '@material-ui/core/Divider';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import FullWidthTabs from './Tabs';
import Paper from '@material-ui/core/Paper';
import { ContextMenu, Item, Separator, Submenu, ContextMenuProvider } from 'react-contexify';


const styles = theme => ({
 
  textMargin:{
	  marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  },
  button: {
	width: 400,
	marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  },
 
  
});

class MyPlayer extends Component {
  state = { 
	expanded: false,
	maths,
	spacing: '16',
  };
  
 
 handleClick(e, data) {
  console.log(data.foo);
}




  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  


  render() {
    const { classes } = this.props;
	const { spacing } = this.state;
	let src ='http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4';

    return (
	<Fragment>
		<Paper >
			<Grid container spacing={16} >
				 
			<Grid item xs  >
			
				<ContextMenuProvider id="menu_id">
					<Video loop 
						controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
						poster="http://sourceposter.jpg"
						className={classes.textMargin}
						onContextMenu={this.contextMenu}
						onCanPlayThrough={() => {
							// Do stuff
						}}>
						<source src="http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4" />
						<track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
					</Video>
				
				 </ContextMenuProvider>
				<ContextMenu id='menu_id'>
			   <Item >Home</Item>
				<Separator />
			   <Item >Recommendations</Item>
				<Separator />
				<Item >Explore</Item>
				 <Separator />
				<Item >Learn</Item>
				<Separator />
				<Item >Favourites</Item>
      
       
			</ContextMenu>
					
			
					
					
				
			
				
				
				<Grid container spacing={16} >
					<Grid item xs>
					
						<Typography variant="h6" component="h3" className={classes.textMargin}>
							 Addition
						</Typography>
						
					</Grid>
					<Grid item xs>
						<Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/playing">
						  Enroll Now
						</Button>
					</Grid>
				</Grid>
				<Divider className={classes.textMargin}/>
				<Typography variant="caption" gutterBottom className={classes.textMargin}>
				  123,123,123 views
			</Typography> 
			</Grid>
			<Grid item>
				<FullWidthTabs/>
			</Grid>
			
		
     
		</Grid>
   </Paper>
	    
	  </Fragment>
	  
	 
    );
  }
}

MyPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyPlayer);