import React,{Fragment}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';



const products = [
  { name: 'Are the Nhaka E-Learning video lessons based on Ministry of Primary and secondary Education Standards?', desc: 'All our videos and any other content on our platform are all accessed and passed by the ministry’s department for curriculum development and technical services.' },
  { name: 'Who is the E-learning platform meant for?', desc: 'The platform is currently covering content for primary school and following 2015-2022.'},
  { name: 'Which subjects are on the platform?', desc: 'Maths and Science,ICT,Languages Heritage studies,Humanities'},
  { name: 'How much does the platform costs?', desc: 'The platform is charged per month and is charged at a flat rate of $1'},
  { name: 'Will I receive a certificate?', desc: 'No. However a student has access to a report on his portal that highlights his strengths, weakness, completion status and all these are integrated with their school management portal. ' },
  { name: 'Can I use Nhaka offline?', desc: 'No. However a student can download lesson videos using Nhaka android app ' },
  { name: 'Do you have a mobile application?', desc: 'Yes. However its only available on Android at the moment. IOS mobile app development is underway' },

];


const styles =({
  root: {
    marginLeft: 25,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
	
  
  },
});

class FAQ extends React.Component {
 
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Paper>
		   <Typography variant='h5' className={classes.root}>
		      Frequently Asked Questions
		   </Typography>
		   <List >
				{products.map(product => (
				  <ListItem>
					<ListItemText primary={product.name} secondary={product.desc} />
				  </ListItem>
				))}
				
			  </List>
		</Paper>
          
      </Fragment>
    );
  }
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FAQ);