import React, {Fragment, Component} from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';




const styles = theme => ({
 
  textMargin:{
	  marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  }
 
  
});


export default ({match}) =>{
	
	
	return <div> 
		hi {match}
	</div>
}