import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, AppBar, Toolbar, List, Typography, Divider , CssBaseline} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import SimpleDialog from './Dialog';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Footer from '../Content/Footer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
   color: {
     color: '#4b55dd',	
  },
  footerColor: {
	   backgroundColor: '#4b55dd',
	   marginBottom: 0
  },
  space:{
	  marginLeft: 1100
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
	height: '100%'
  },
   avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
   margin: {
	    textAlign: "center",
		textColor: "white",
	    width: '100%',
		color: 'white',
  }
});


const emails = ['username@gmail.com', 'user02@gmail.com'];
var opened = false;

class MiniDrawer extends Component {

  state = {
    open: false,
	opened: false
  };

  handleDrawerOpen = () => {
    this.setState({ opened: true });
  };

  handleDrawerClose = () => {
    this.setState({ opened: false });
  };
  
   handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes, theme,children } = this.props;
	
	
	const navItems = (
		  <div>
			<ListItem button component={Link} to="/" >
			  <ListItemIcon className={classes.color}>
				<AssignmentIcon />
			  </ListItemIcon>
			  <ListItemText primary="Home" />
			</ListItem>
			<ListItem button component={Link} to="/reccommended">
			  <ListItemIcon className={classes.color}>
				<StarIcon />
			  </ListItemIcon>
			  <ListItemText primary="Reccommendations"  />
			</ListItem>
			<ListItem button component={Link} to="/explore">
			  <ListItemIcon className={classes.color}>
				<LocationOnIcon />
			  </ListItemIcon>
			  <ListItemText primary="Explore" />
			</ListItem>
			<ListItem button component={Link} to="/video/learn">
			  <ListItemIcon className={classes.color}>
				<PlayArrowIcon />
			  </ListItemIcon>
			  <ListItemText primary="Learn"/>
			</ListItem>
			<ListItem button component={Link} to="/bookmarks">
			  <ListItemIcon className={classes.color}>
				<FavoriteIcon />
			  </ListItemIcon>
			  <ListItemText primary="Favorites"/>
			</ListItem>
		  </div>
		);

    return (
	<Fragment>
		<CssBaseline/>
		  <div className={classes.root}>
			<AppBar
			  position="absolute"
			  className={classNames(classes.appBar, this.state.opened && classes.appBarShift)}>
			  <Toolbar disableGutters={!this.state.opened}>
				<IconButton
				  color="inherit"
				  aria-label="Open drawer"
				  onClick={this.handleDrawerOpen}
				  className={classNames(classes.menuButton, this.state.opened && classes.hide)}>
				  <MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit" noWrap>
				  Nhaka
				</Typography>
				<div className={classes.space}>
					<IconButton color='white'>
					  <AccountCircle onClick={this.handleClickOpen} />
					</IconButton>
					<SimpleDialog
					  selectedValue={this.state.selectedValue}
					  open={this.state.open}
					  onClose={this.handleClose}
					/>
				</div>
			  </Toolbar>
			</AppBar>
			<Drawer
			  variant="permanent"
			  classes={{
				paper: classNames(classes.drawerPaper, !this.state.opened && classes.drawerPaperClose),
			  }}
			  opened={this.state.opened}
			>
			  <div className={classes.toolbar}>
				<IconButton onClick={this.handleDrawerClose}>
				  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			  </div>
			  <Divider />
			  <List>{navItems}</List>
			  
			</Drawer>
			<main className={classes.content} >
			  <div className={classes.toolbar} />
			  {children}
			</main>
		  </div>
		  <div className={classes.footerColor} >
		   
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
	  </Fragment>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true },withRouter)(MiniDrawer);
