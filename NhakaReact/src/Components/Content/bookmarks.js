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


const styles = theme => ({
  card: {
	height: 290,
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
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
	marginRight: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  textMargin:{
	  marginBottom : 10,
	  marginTop: 40,
  },
  textMarginD:{
	  marginBottom : 10,
	  marginTop: 10,
	  
  },
   noCoursesMargin:{
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

class Bookmarks extends Component {
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
	
	let cardView;
	
	
	if (subs.length != 0) {
      cardView  = <Grid container className={classes.root} spacing={16}>
			<Grid item xs={0}>
			  <Grid container className={classes.demo}   spacing={Number(spacing)}>
				{subs.map(value => (
				  <Grid key={value} item>
						<Card className={classes.card}>
						<CardMedia
						  className={classes.media}
						  image={value.image}/>
						<CardContent className={classes.content}>
						  <Typography component="p">
						  {value.title}
						  </Typography>
						  <Typography component="p">
							{value.description}
						  </Typography>
						</CardContent>
						<CardActions className={classes.actions} disableActionSpacing>
						  <IconButton
							className={classnames(classes.expand, {
							  [classes.expandOpen]: this.state.expanded,
							})}
							onClick={this.handleExpandClick}
							aria-expanded={this.state.expanded}
							aria-label="Show more"
							component={Link} to="course/player">
						  <ExpandMoreIcon  className={classes.noCoursesMargin}/>
						</IconButton>
						</CardActions>
					  </Card>
				  </Grid>
				))}
			  </Grid>
			</Grid>
		  </Grid>;
    } else {
      cardView = <div>
      <Paper className={classes.textMargin} elevation={1}>
        <Typography variant="h5" component="h3" className={classes.noCoursesMargin}>
          Looks like you are yet to save your favourite courses 
        </Typography>
        <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/explore">
		   Explore courses
		</Button>
      </Paper>
    </div>
    }

    return (
	<Fragment>
	
	  <Typography className={classes.textMargin} variant="h6">
			  My Favourites
		</Typography>
		<Divider className={classes.textMarginD} />
			{cardView}
	   
	  </Fragment>
    );
  }
}

Bookmarks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmarks);
