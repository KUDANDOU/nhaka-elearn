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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Img from 'react-image';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  card: {
	height: 100,
	width: 150
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
  actions: {
    display: 'flex',
  },
  rootList: {
    width: '100%',
    maxWidth: '100%' ,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 450,
  },
  avatar: {
    backgroundColor: red[500],
  },
  textMargin:{
	  marginBottom : 10,
	  marginTop: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list:{
	  marginBottom : 0,
	  marginTop: 0,
	  width: '100%'
  },
  button1: {
	marginBottom : 0,
	  marginTop: 0,
	  marginLeft: 0,
	  width: '100%'
  },
 
  
});

class Content extends Component {
  state = { 
	expanded: false,
	maths,
	spacing: '16',
	selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;
	const { spacing } = this.state;
	 


    return (
	<List className={classes.rootList} subheader={<li />}>
		
           {maths.map(value => (
				  <ListItem>
					 
					 <Grid container spacing={16}>
						 <Button variant="outlined" color="primary" className={classes.button1} >
								<Grid item >
									<Img src={value.image} className={classes.card} />
								</Grid>
								<Grid item xs>
									<Typography variant="h6" component="h3">
									 {value.title}
									</Typography>
									<Typography component="p">
									  {value.description}
									</Typography>
								</Grid>
								</Button>
							</Grid>
						
					
					
				</ListItem>
				
				))}

	</List>
	
	  
	 
	
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);