import React, { Component } from 'react'
import {connect} from "react-redux"
// import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import StarHalf from '@material-ui/icons/StarHalf'
import {loadReviews} from "../redux/actions/product.action"

const styles = {
    root: {
        display: 'flex'
    },
    stars: {
        color: '#ffb74d',
        fontSize: '18px'
    },
    text: {
        margin: 'auto 10px'
    }
}

class StarsRating extends Component{
    componentDidMount(){
        this.props.dispatch(loadReviews(this.props.productId))
    }

    getStarsRating = () => {
        let rateSum = 0
        let reviewsCount = 0

        this.props.reviews.map((review) => {
            rateSum += review.rate;
            reviewsCount ++;
            return {}
        })

        const rateAvg = rateSum / (reviewsCount + 1)

        let stars = []

        for (let i = 0; i < 5; i++ ){
            if (rateAvg - i >= 0.75) {
                stars.push(<Star key = {i} className = {this.props.classes.stars} />)
            } else if (rateAvg - i >= 0.25 && rateAvg - i < 0.75 ) {
                stars.push(<StarHalf key = {i} className = {this.props.classes.stars} />)
            } else {
                stars.push(<StarBorder key = {i} className = {this.props.classes.stars} />)
            }
        }
        return {stars, rateAvg, reviewsCount}
    }

    render () {
        const { classes } = this.props
        let starRating = this.getStarsRating()
        return (
            <React.Fragment>
                <div className={classes.root}>
                    {starRating.stars}
                    <Typography variant="caption" className={classes.text}>
                        {`${starRating.rateAvg.toFixed(2)} (${starRating.reviewsCount})`}
                    </Typography>
                </div>
            </React.Fragment>
        )
    }
}

StarsRating.defaultProps = {
    reviews: [],
}

const mapStateToProps = store => ({
    reviews: store.product.reviews
})

export default connect(mapStateToProps)(withStyles(styles)(StarsRating))