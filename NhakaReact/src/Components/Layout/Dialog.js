import React, {Fragment , Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SignUpDialog from './SignUpDialog';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


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
  textFieldEdit: {
    flexBasis: 200,
  },
  button:{
	  marginTop: 10,
	marginLeft: 10,
	marginBottom: 10,
	marginRight: 10,
	width: 180,
  }
};


class SimpleDialog extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
		open: false,
		textFieldPass: '',
		textFieldUse: ''
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
    alert('Username: '+ this.state.textFieldUse + '...' + 'Password: ' + this.state.textFieldPass );
    axios.get('http://127.0.0.1:8000/api/courses/2/enroll/', {
		username: this.state.textFieldUse,
		password: this.state.textFieldPass
	  })
	  .then((res) => {
		alert(res);
	  })
	  .catch(function (error) {
		alert(error);
	  });
  }
  
  
  

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
	
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Login</DialogTitle>
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
				startAdornment: <InputAdornment position="start">Username</InputAdornment>,
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
