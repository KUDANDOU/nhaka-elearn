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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import {subs} from '../../data/info.js';
import Divider from '@material-ui/core/Divider';
import  { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
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
	marginBottom : 30,
	marginTop: 10,
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
	  
  },
   noCoursesMargin:{
	  marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
	  
  },
  cara: {
	height: 250,
	width: 10000000
  },
  rootTable: {
    width: 1000,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
	width: 400,
	marginBottom : 10,
	  marginTop: 10,
	  marginLeft: 10,
  },
 
  
});

let id = 0;
function createData(name, calories, fat, carbs) {
  id += 1;
  return { id, name, calories, fat, carbs };
}

const rows = [
  createData('Maths', 91, 200, 20),
  createData('Content', 20, 150, 10),
  createData('Shona', 5, 305, 2),
  createData('English', 18, 90, 3),
  createData('Agriculture', 4, 50, 1),
];



class HomeCards extends Component {
	
	constructor(props) {
    super(props);
	this.state = { 
		expanded: false,
		subs,
		spacing: '16'
	  };
  }
  

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
							aria-label="Show more">
							<FavoriteIcon />
						  </IconButton>
						  <IconButton
							className={classnames(classes.expand, {
							  [classes.expandOpen]: this.state.expanded,
							})}
							onClick={this.handleExpandClick}
							aria-expanded={this.state.expanded}
							aria-label="Show more"
							component={Link} to="course/player">
						  <ExpandMoreIcon />
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
          Looks like you are yet to start a course 
        </Typography>
        <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/explore">
		   Explore courses
		</Button>
      </Paper>
    </div>
    }
	
	
	 

	

    return (
	<Fragment>
	
		<Container>
			<Carousel
			  activeItem={1}
			  length={4}
			  showControls={false}
			  showIndicators={false}
			  className={classes.cara}>
			  <CarouselInner>
				<CarouselItem itemId="1">
				  <View>
					<img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg" alt="First slide" />
				  </View>
				</CarouselItem>
				<CarouselItem itemId="2">
				  <View>
					<img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(99).jpg" alt="Second slide" />
				  </View>
				</CarouselItem>
				<CarouselItem itemId="3">
				  <View>
					<img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg" alt="Third slide" />
				  </View>
				</CarouselItem>
				<CarouselItem itemId="4">
				  <View>
					<img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20%28143%29.jpg" alt="Mattonit's item" />
				  </View>
				</CarouselItem>
			  </CarouselInner>
			</Carousel>
      </Container>
		
		<Typography className={classes.textMargin} variant="h6">
			  Continue Learning...
		</Typography>
		<Divider className={classes.textMargin} />
		    {cardView}
		  
		  <Typography className={classes.textMargin} variant="h6">
			  My Report
		</Typography>
		<Divider className={classes.textMargin} />
		<Paper className={classes.rootTable}>
			  <Table className={classes.table}>
				<TableHead>
				<TableRow>
					<TableCell variant="h6">Student:</TableCell>
					<TableCell variant="h6">Chiwenga</TableCell>
					<TableCell variant="h6">Student ID:</TableCell>
					<TableCell variant="h6">00001</TableCell>
				  </TableRow>
				  <TableRow>
					<TableCell variant="h6">Grade:</TableCell>
					<TableCell variant="h6">2</TableCell>
					<TableCell ></TableCell>
					<TableCell></TableCell>
				  </TableRow>
				  <TableRow>
					<TableCell variant="h6">Year:</TableCell>
					<TableCell variant="h6">2017- 2018</TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
				  </TableRow>
				  <TableRow>
					<TableCell >Subject</TableCell>
					<TableCell >No of Tests taken</TableCell>
					<TableCell >Total Excersies</TableCell>
					<TableCell >Passed Excersies</TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {rows.map(row => {
					return (
					  <TableRow key={row.id}>
						<TableCell component="th" scope="row">
						  {row.name}
						</TableCell>
						<TableCell>{row.calories}</TableCell>
						<TableCell>{row.fat}</TableCell>
						<TableCell>{row.carbs}</TableCell>
					  </TableRow>
					);
				  })}
				</TableBody>
			  </Table>
			</Paper>
		  
		  
	  
	  </Fragment>
	    
    );
  }
}

HomeCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeCards);