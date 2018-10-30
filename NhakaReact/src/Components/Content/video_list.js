import React, {Fragment, Component} from 'react';

export default class ExpandableCard extends Component {

    render(){
        // pass in your data through props
        const { cardDataJSONObject } = this.props

        // assuming you are getting your card data in a large json object
        let cardList = []
        Object.keys(cardDataJSONObject).forEach((cardIndex) => {
            let card = cardDataJSONObject[cardIndex]
            cardList.push (
                <Card>
                    <CardHeader
                        title={card.title}
                        subtitle={card.subtitle}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        { card.text }
                    </CardText>
                </Card>            
            )
        })

        return (
            <MuiThemeProvider>
                <div>
                    <div className='card-list'>
                        {/* here we are rendering the list of cards we build up above */}
                        { cardList }
                    </div>
                    <FloatingActionButton className="floatingButton" backgroundColor='#293C8E'>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </MuiThemeProvider>
        );
    }
}