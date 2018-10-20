import React, {Fragment, Component} from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Container } from 'mdbreact';
import { withStyles } from '@material-ui/core/styles';

// Line chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Hours spent using Nhaka',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#848484',
      borderColor: '#848484',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#848484',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#848484',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [25, 30, 60, 50, 56, 55, 40]
    }
  ]
};


const styles = theme => ({
  
  myMargin:{
	  marginBottom : 20,
	  marginTop: 20,
	  height: 200,
	  width: 200
  }

  
});

class Rec extends Component {
	componentDidMount() {
        //doughnut
        var ctxD = document.getElementById("doughnutChart").getContext('2d');
        new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: ["Maths", "Content", "Agriculture", "Shona", "English"],
                datasets: [
                    {
                        data: [300, 50, 100, 40, 120],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
	}
	  render() {
		  const { classes } = this.props;
		  
		  
		return (
		<Fragment>
			<Container className={classes.margin}>
				<Line data={data} />
			</Container>
			<Container className={classes.margin}>
				<canvas id="doughnutChart"></canvas>
			</Container>
		</Fragment>
		);
	  }

};

export default withStyles(styles) (Rec);
