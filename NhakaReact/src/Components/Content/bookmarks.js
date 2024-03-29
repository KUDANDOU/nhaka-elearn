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
	  marginTop: 10,
  }
 
  
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

    return (
	<Fragment>
	
	  <Typography className={classes.textMargin} variant="h6">
			  My Bookmarks
		</Typography>
		<Divider className={classes.textMargin} />
	  <Grid container className={classes.root} spacing={16}>
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
							component={Link} to="/course/yui">
						  <ExpandMoreIcon />
						</IconButton>
						</CardActions>
					  </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
	   
	  </Fragment>
    );
  }
}

Bookmarks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmarks);
