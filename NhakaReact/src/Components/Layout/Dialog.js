import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Account, Help, Cogs } from 'mdi-material-ui';
import Divider from '@material-ui/core/Divider';


const styles  = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
   root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    flexBasis: 50,
  },
  rootEdit: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  marginEdit: {
    marginTop: 10,
	marginLeft: 10,
	marginBottom: 10,
	marginRight: 10,
	width: 400,
	height: 40,
	
  },
   marginProf: {
	width: 400,
	height: '100%',
  },
  background:{
	  color: '#0067b4',
  },
  myMargin:{
	  align: 'center',
	  width:'100%'
  },
  textFieldEdit: {
    flexBasis: 200,
  },
  button:{
	  marginTop: 10,
	marginLeft: 10,
	marginBottom: 10,
	marginRight: 10,
	width: 180,
	backgroundColor: '#0067b4',
  },
  
};


class SimpleDialog extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
		open: false,
		textFieldPass: '',
		textFieldUse: '',
		key: '',
		name: ''
	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };
  
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleCloseDialog = value => {
    this.setState({ selectedValue: value, open: false });
  };
  
  
  
  handleChange = textFieldUse => event => {
    this.setState({
      [textFieldUse]: event.target.value,
    });
  };
  
  handleChangePass = textFieldPass => event => {
    this.setState({
      [textFieldPass]: event.target.value,
    });
  };

  handleSubmit(event) {
 
    axios.post('http://192.168.1.109:3000/student/login', {
		email: this.state.textFieldUse,
		password: this.state.textFieldPass
	  })
	  .then((res) => {
		//alert(res.data.result._id);
		this.setState({
		  key : res.data.result._id,
		  name: res.data.result.firstname + " " + res.data.result.lastname
		});
	  })
	  .catch(function (error) {
		alert(error.message);
	  });
  }
  
  
  

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
	const { key, name} = this.state;
	
	
	let view;
	if(key.length <= 3){
		view =  
		<div>
		 <Typography color='inherit' variant="title" align="center" style={{margin: 10, color: '#0067b4'}}>
		     Login
		 </Typography>
		 
	   <div>
			 <TextField
			  id="username"
			  type="string"
			  label="Required"
			  value={this.state.textFieldUse}
			  onChange={this.handleChange('textFieldUse')}
			  className={classNames(classes.marginEdit, classes.textField)}
			  variant="outlined"
			  InputProps={{
				startAdornment: <InputAdornment position="start">Email</InputAdornment>,
			  }}
			/>
        </div>
		<div>
			 <TextField
			  id="password"
			  type="string"
			  label="Required"
			  className={classNames(classes.marginEdit, classes.textField)}
			  value={this.state.textFieldPass}
			  onChange={this.handleChangePass('textFieldPass')}
			  variant="outlined"
			  InputProps={{
				startAdornment: <InputAdornment position="start">Password</InputAdornment>,
			  }}
			/>
        </div>
		
		<Grid container spacing={16} >
				 
			<Grid item >
					<Button variant="contained"  color="primary" className={classes.button} component={Link} to="/signup" onClick={this.handleClose}>
						Sign Up
					</Button>
						
			</Grid>
			<Grid item >
				 <Button variant="contained"  color="primary" className={classes.button} onClick={this.handleSubmit} >
						Login
				 </Button>
			</Grid>
			
		
     
		</Grid>
		
		<Typography width='100%' align='center'>
		   By Signing in you agree with our Terms & Condititions
		</Typography>
		</div>
	} else {
		
		view =  <div>
		<Typography color='inherit' variant="title" align="center" style={{margin: 10, color: '#0067b4'}}>
		     Welcome {name}
		 </Typography>
		
		<List className={classes.marginProf}> 
           
		   <ListItem button>
            <ListItemIcon className={classes.background}>
              <Account />
            </ListItemIcon>
            <ListItemText inset primary="Profile" className={classes.background}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.background}>
              <Cogs />
            </ListItemIcon>
            <ListItemText inset primary="Settings" className={classes.background}/>
		 </ListItem>
		 <ListItem button>
            <ListItemIcon className={classes.background}>
              <Help />
            </ListItemIcon>
            <ListItemText inset primary="Help" className={classes.background} />
		 </ListItem>

		</List>
		</div>
	}
	
	
	

    return (
	   <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        
		{view}
		
      </Dialog>
     
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);
