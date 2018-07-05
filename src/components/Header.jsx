import React, { Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import classNames from 'classnames'

const styles = {
    root: {
        flexGrow: 1,
        background: '#212121',
        padding: '0 100px'
    },
    flex: {
        flex: 1,
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit'
    }
}

class Header extends Component {
    render () {
        const { classes } = this.props
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Link to = {'/'} className = {classNames(classes.link, classes.flex)}>
                        <Typography variant="title" color="inherit">
                            Product catalog
                        </Typography>
                    </Link>
                    <Link to = {'/signIn'} className = {classes.link}>
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header);