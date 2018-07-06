import React, {Component} from 'react'
import {Link} from "react-router-dom"
/*import axios from "axios/index";
import PropTypes from 'prop-types';*/
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import InputAdornment from '@material-ui/core/es/InputAdornment/InputAdornment'
import {signIn} from '../redux/actions/auth.action'

const styles = {
    card: {
        margin: '64px auto 0',
        textAlign: 'center',
        width: '350px'
    },
    cardActions: {
        display: 'block',
    },
    btn: {
        margin: '0 auto'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        margin: '0 auto',
    },
    pg8: {
        padding: '8px'
    },
    content: {
        width: '250px',
        margin: '0 auto'
    }
}

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            showPassword: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(signIn(user))
    }

    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps !== this.props) {
            this.props.user && this.props.user.success && this.props.history.push('/')
        }
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        const {classes, user} = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="title">
                            Sign In
                        </Typography>
                        <TextField
                            id="username"
                            label="Username"
                            onChange={this.handleChange('username')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography variant="caption" color="error">
                            {user && user.message}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button type='submit' className={classes.btn} color="primary">Sign In</Button>
                        <Link to={'/signUp'} className={classes.link}>
                            <Typography variant="caption" className={classes.pg8}>
                                No account?
                            </Typography>
                        </Link>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

const mapStateToProps = store => ({
    user: store.user
})

export default connect(mapStateToProps)(withStyles(styles)(SignIn))