import React from 'react';
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

const emails = ['username@gmail.com', 'user02@gmail.com'];
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
	marginRight: 10
	
  },
  textFieldEdit: {
    flexBasis: 200,
  },
};


const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class SignUpDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
	
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Login</DialogTitle>
        <div>
			 <TextField
			  id="outlined-simple-start-adornment"
			  className={classNames(classes.marginEdit, classes.textField)}
			  variant="outlined"
			  InputProps={{
				startAdornment: <InputAdornment position="start">Username</InputAdornment>,
			  }}
			/>
        </div>
		<div>
			 <TextField
			  id="outlined-simple-start-adornment"
			  className={classNames(classes.marginEdit, classes.textField)}
			  variant="outlined"
			  InputProps={{
				startAdornment: <InputAdornment position="start">Password</InputAdornment>,
			  }}
			/>
        </div>
		<Button variant="contained" size="medium" color="primary" className={classNames(classes.marginEdit, classes.textField)}>
				Login
		</Button>
		
		
      </Dialog>
    );
  }
}

SignUpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SignUpDialog);