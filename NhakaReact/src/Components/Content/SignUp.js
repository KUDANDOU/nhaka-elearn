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
import Paper from '@material-ui/core/Paper';
import Img from 'react-image';
import { ReactDOM } from 'react-dom';
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import OutlinedInput from '@material-ui/core/OutlinedInput';



const styles =  {
 
   root: {
    display: 'flex',
    flexWrap: 'wrap'
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
	marginLeft: 23,
	marginBottom: 10,
	marginRight: 10,
	width: 180,
  }, 
  myMargin:{
	   marginTop: 10,
	marginLeft: 10,
	marginBottom: 10,
	marginRight: 10,
  }
  
};



const steps = ['Student Information', 'Current Residence', 'Contact Information','Review'];


var profile = [];
class SignUp extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			activeStep: 0,
				name: '',
				dob: '',
				gender:'',
				nationality:'',
				nationalId:'',
				faith:'',
				language:'',
				special:'',
				school:'',
				schoolAdress:'',
				grade:'',
				address:'',
				suburb:'',
				city:'',
				guardian:'',
				phone:'',
				email:'',
				profile: ['',],
		 };
		  
		this.handleChange = this.handleChange.bind(this);
		this.getStepContent = this.getStepContent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
 


 getStepContent(step){
  switch (step) {
    case 0:
      return <Fragment width='300'>
	 
	  <List>
	   <ListItem>
			 <TextField
			      required
				  id="studentname"
				  label="Full Name"
				  type="name"
				  value={this.state.name}
				  onChange={this.handleChange('name')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	    <ListItem>
		  <TextField
			      required
				  id="studentname"
				  label="Date of Birth"
				  type="date"
				  value={this.state.dob}
				  onChange={this.handleChangeDOB('dob')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  			 
	   </ListItem>
	     <ListItem>
			  
				  
				 
				<Select
				    autoWidth="true"
					value={this.state.gender}
					onChange={this.handleChangeGender('gender')}
					input={
					  <OutlinedInput
						name="gender"
						label="gender"
						id="outlined-age-simple"
					  />
					}
				  >
					<MenuItem value="Male">Male</MenuItem>
					<MenuItem value="Female">Female</MenuItem>
				  </Select>
				  
				  
				  
			   
				  	  
	   </ListItem>
	   <ListItem>
			 <TextField
			      required
				  id="nationality"
				  label="Nationality"
				  type="nationality"
				  value={this.state.nationality}
				  onChange={this.handleChangeNat('nationality')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>	   
	   <ListItem>
			 <TextField
			      required
				  id="nationalid"
				  label="National ID No"
				  type="nationalId"
				  value={this.state.nationalid}
				  onChange={this.handleChangeId('nationalId')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	   <ListItem>
			 <TextField
				  id="fath"
				  label="Faith"
				  type="fath"
				  value={this.state.faith}
				  onChange={this.handleChangeFaith('faith')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	    <ListItem>
			 <TextField
			      required
				  id="language"
				  label="Home language"
				  type="language"
				  value={this.state.language}
				  onChange={this.handleChangeLang('language')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	    <ListItem>
			 <TextField
				  id="language"
				  label="Special Needs"
				  type="language"
				  value={this.state.special}
				  onChange={this.handleChangeSpecial('special')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	    <ListItem>
			 <TextField
			      required
				  id="school"
				  label="Present/ Last School"
				  type="school"
				  value={this.state.school}
				  onChange={this.handleChangeSchool('school')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	   <ListItem>
			 <TextField
			      required
				  id="school"
				  label="Present/Last School Address"
				  type="school"
				  value={this.state.schooladd}
				  onChange={this.handleChangeSchoolAdd('schoolAddress')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	   <ListItem>
			 <TextField
			      required
				  id="school"
				  label="Grade/Form"
				  type="number"
				  value={this.state.grade}
				  onChange={this.handleChangeGrade('grade')}
				  margin="none"
				  fullWidth
				  variant="outlined"/>
		  
	   </ListItem>
	     
	    
	
	  </List>
	  

    </Fragment>;
    case 1:
      return <Fragment>
       <List>
		   <ListItem>
				 <TextField
					  required
					  id="studentname"
					  label="Address"
					  type="name"
					  value={this.state.address}
				      onChange={this.handleChangeAddress('address')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
			  
		   </ListItem>
			<ListItem>
			  <TextField
					  required
					  id="studentname"
					  label="Suburb"
					  type="string"
					  value={this.state.suburb}
				      onChange={this.handleChangeSub('suburb')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
						 
		   </ListItem>
			 <ListItem>
				 <TextField
					  required
					  id="gender"
					  label="City"
					  type="gender"
					  value={this.state.city}
				      onChange={this.handleChangeCity('city')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
						  
		   </ListItem>
		   
		</List>
    </Fragment>;
	
	case 2:
      return <Fragment>
        <List>
		   <ListItem>
				 <TextField
					  required
					  id="studentname"
					  label="Guardian Name"
					  type="name"
					  value={this.state.guardian}
				      onChange={this.handleChangeGuardian('guardian')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
			  
		   </ListItem>
			<ListItem>
			  <TextField
					  required
					  id="studentname"
					  label="Phone"
					  type="Home phone"
					  value={this.state.phone}
				      onChange={this.handleChangePhone('phone')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
						 
		   </ListItem>
		   <ListItem>
				 <TextField
					  required
					  id="gender"
					  label="Email"
					  type="email"
					  value={this.state.email}
				      onChange={this.handleChangeEmail('email')}
					  margin="none"
					  fullWidth
					  variant="outlined"/>
						  
		   </ListItem>
		   
		</List>
     
    </Fragment>;
	
	case 3:
      return <Fragment>
     
      <List disablePadding>
        {profile.map(profile => (
          <ListItem key={profile.name}>
            <ListItemText primary={profile.name} />
            <Typography variant="body2">{profile.desc}</Typography>
          </ListItem>
        ))}
      </List>
     
    </Fragment>;
	  
    default:
      throw new Error('Unknown step');
  }
}
 
 handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleChangeDOB = dob => event => {
    this.setState({
      [dob]: event.target.value,
    });
  };
  
  handleChangeGender = gender => event => {
    this.setState({
      [gender]: event.target.value,
    });
  };
  
  
  handleChangeNat = nationality => event => {
    this.setState({
      [nationality]: event.target.value,
    });
  };
  
   handleChangeId = nationalId => event => {
    this.setState({
      [nationalId]: event.target.value,
    });
  };
  
   handleChangeFaith = faith => event => {
    this.setState({
      [faith]: event.target.value,
    });
  };
  
  
  handleChangeLang = language => event => {
    this.setState({
      [language]: event.target.value,
    });
  };
  
   handleChangeSpecial = special => event => {
    this.setState({
      [special]: event.target.value,
    });
  };
  
  handleChangeSchool = school => event => {
    this.setState({
      [school]: event.target.value,
    });
  };
  
   handleChangeSchoolAdd = schoolAddress => event => {
    this.setState({
      [schoolAddress]: event.target.value,
    });
  };
  
  handleChangeGrade = grade => event => {
    this.setState({
      [grade]: event.target.value,
    });
  };
  
  handleChangeAddress = address => event => {
    this.setState({
      [address]: event.target.value,
    });
  };
  
  handleChangeSub = suburb => event => {
    this.setState({
      [suburb]: event.target.value,
    });
  };
  
  
  handleChangeCity = city => event => {
    this.setState({
      [city]: event.target.value,
    });
  };
  
  handleChangeGuardian = guardian => event => {
    this.setState({
      [guardian]: event.target.value,
    });
  };
  
  handleChangePhone = phone => event => {
    this.setState({
      [phone]: event.target.value,
    });
  };
  
  handleChangeEmail = email => event => {
    this.setState({
      [email]: event.target.value,
	 
    });
	 profile = [
	   {name : 'Name', desc: this.state.name},
	   {name : 'Date of birth', desc: this.state.dob},
	   {name : 'Gender', desc: this.state.gender},
	   {name : 'Nationality', desc: this.state.nationality},
	   {name : 'National Identification Number', desc: this.state.nationalId},
	   {name : 'Faith', desc: this.state.faith},
	   {name : 'Home Language', desc: this.state.language},
	   {name : 'Special Needs', desc: this.state.special},
	   {name : 'School', desc: this.state.school},
	   {name : 'School Address', desc: this.state.schoolAddress},
	   {name : 'Grade', desc: this.state.grade},
	   {name : 'Address', desc: this.state.address},
	   {name : 'Suburb', desc: this.state.suburb},
	   {name : 'City', desc: this.state.city},
	   {name : 'Guardian', desc: this.state.guardian},
	   {name : 'Home Phone', desc: this.state.phone},
	   {name : 'Gurdian Email', desc: this.state.email},
	  ]
  };
  
  
  
  handleSubmit(event) {
    alert('Done');
   
  
  }
	
	


  render() {
    const { classes, props} = this.props;
	const { activeStep } = this.state;
	

	
    return (
	<Fragment>
		<CssBaseline />
		<Paper className={classes.myMargin} >
			<Grid container spacing={16}>
				 
			<Grid item>
				<Img src="https://cdn.pixabay.com/photo/2018/03/01/09/33/laptop-3190194__340.jpg" className={classes.myMargin} />
				
			</Grid>
			<Grid item>
				<main className={classes.layout}>
					<Typography component="h1" variant="h4" className={classes.button}>
					  Sign Up
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
					  {steps.map(label => (
						<Step key={label}>
						  <StepLabel>{label}</StepLabel>
						</Step>
					  ))}
					</Stepper>
					<Fragment>
					  {activeStep === steps.length ? (
						<Fragment>
						  <Button 
						     variant="contained"
							  color="primary"
							  className={classes.button}
							  onClick={this.handleSubmit}>
						     Submit
						  </Button>
						</Fragment>
					  ) : (
						<Fragment>
						  {this.getStepContent(activeStep)}
						  <div className={classes.buttons}>
							{activeStep !== 0 && (
							  <Button onClick={this.handleBack} className={classes.button}>
								Back
							  </Button>
							)}
							<Button
							  variant="contained"
							  color="primary"
							  onClick={this.handleNext}
							  className={classes.button}>
							  {activeStep === steps.length - 1 ? 'Finalise' : 'Next'}
							</Button>
						  </div>
						</Fragment>
					  )}
					</Fragment>
				</main>
			</Grid>
			
		    
			</Grid>
		 
			</Paper>
   </Fragment>
	  
	 
	  
	  
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);