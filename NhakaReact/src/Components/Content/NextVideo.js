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
import Img from 'react-image';
import { ReactDOM } from 'react-dom';
import VideoPlayer from './videoPlayer';


let src = "http://112.253.22.163/4/p/p/q/v/ppqvlatwcebccqgrthiutjkityurza/hc.yinyuetai.com/59EC014EDDFE31808075899973863AAD.flv";

const styles = theme => ({
 
  textMargin:{
	  marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  },
  card: {
	height: 100,
	width: 150
  },
  rootList: {
    width: '100%',
    maxWidth: '100%' ,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 590,
  },
  button: {
	width: 400,
	marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  },
  button1: {
	marginBottom : 0,
	  marginTop: 0,
	  marginLeft: 0,
	  width: 400
  },
 
  
});


class NextVideo extends Component {
	constructor(props){
		super(props);
		this.state = { 
		expanded: false,
		maths,
		spacing: '16',
		src: "http://112.253.22.163/4/p/p/q/v/ppqvlatwcebccqgrthiutjkityurza/hc.yinyuetai.com/59EC014EDDFE31808075899973863AAD.flv",
	  };
	}
  
  


  render() {
    const { classes, props} = this.props;
	const { spacing} = this.state;

	console.log('this.props.videoId');
    return (
	<Fragment>
		<Paper >
			<Grid container spacing={16}>
				 
			<Grid item xs >
				
				<Video autoPlay loop 
					controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
					poster="http://sourceposter.jpg"
					className={classes.textMargin}
					onCanPlayThrough={() => {
						// Do stuff
					}}>
					<source src={this.state.src} />
					<track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
				</Video>
				
	
				
				
				<Grid container spacing={16} >
					<Grid item xs>
						<Typography variant="h6" component="h3" className={classes.textMargin}>
							 Addition 
						</Typography>
					</Grid>
					<Grid item xs>
						<Button variant="contained" size="large" color="primary" className={classes.button} /*component={Link} to="/playing"*/onClick={this.handleClick}>
						  Take Exercise
						</Button>
					</Grid>
				</Grid>
				<Divider className={classes.textMargin}/>
				 <Typography variant="caption" gutterBottom className={classes.textMargin}>
					123,123,123 views {this.props.videoId.params.id}
					
				</Typography> 
				
				
			
			</Grid>
			<Grid item>
						<List className={classes.rootList} subheader={<li />}>
				
						   {maths.map(value => (
								  <ListItem >
									  
											<Grid container spacing={16}  >
												<Button variant="outlined" color="primary" className={classes.button1} onClick={this.changeVideo}  >
													<Grid item >
														<Img src={value.image} className={classes.card}  />
													</Grid>
													<Grid item xs>
														<Typography variant="h6" component="h3" className={classes.textMargin}>
														 {value.title}
														</Typography>
														<Typography component="body" className={classes.textMargin}>
														  {value.description}
														</Typography>
														
														
													</Grid>
												</Button>
											</Grid>
									
									 </ListItem>
								
								))}

					</List>
			</Grid>
			
		
     
		</Grid>
   </Paper>
	  
	  </Fragment>
	  
	  
    );
  }
}

NextVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NextVideo);