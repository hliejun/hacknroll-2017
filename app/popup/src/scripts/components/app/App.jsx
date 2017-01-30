import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Moment from 'moment';
import Parser from 'moment-parser';

import * as actions from './actions';

const propTypes = {
    currentTime: PropTypes.string,
    endTime: PropTypes.string,
    duration: PropTypes.string,
    initTimer: PropTypes.func.isRequired
};

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clockwork: null,
            errorText: ""
        };
        this.onChangePopupInputText = this.onChangePopupInputText.bind(this);
        this.setDurationToBreak = this.setDurationToBreak.bind(this);
    }

    componentDidMount() {
        this.props.tickTime();
        const clockwork = setInterval(
            this.props.tickTime,
            1000
        );
        this.setState({clockwork});
    }

    componentWillUnmount() {
        clearInterval(this.state.clockwork);
    }

    onChangePopupInputText(event) {
        try {
            const inputText = event.target.value;
            const parsedTiming = Parser.parseDuration(inputText);
            if (Moment.isDuration(parsedTiming)) {
                this.setState({errorText: ""});
            } else {
                this.setState({errorText: "Sorry, we don't understand you!"});
            }
        } catch (exception) {
            this.setState({errorText: "Sorry, we don't understand you!"});
        }
    }

    setDurationToBreak(event) {
        if (event.keyCode === 13) {
            try {
                const inputText = event.target.value;
                const parsedTiming = Parser.parseDuration(inputText);
                if (Moment.isDuration(parsedTiming)) {
                    const endTime = Moment().add(parsedTiming).format();
                    this.props.initTimer(parsedTiming, endTime);
                }
            } catch (exception) {
                // do nothing...
            }
        }
    }

    render() {
        const labelText = "How long to break?";
        const hintText = "e.g. 1 hour and 20 minutes";
        const input = (
            <TextField
                errorText={this.state.errorText}
                floatingLabelText={labelText}
                hintText={hintText}
                onChange={this.onChangePopupInputText}
                onKeyDown={this.setDurationToBreak}
            />
        );
        const display = (remainingTime, duration) => {
            const remainingMilliseconds = remainingTime;
            const durationMilliseconds = Moment.duration(duration);
            const processedMilliseconds = durationMilliseconds - remainingMilliseconds;
            let timeString = "Time's up!";
            if (remainingTime > 0) {
                timeString = Moment.utc(remainingTime).format("HH:mm:ss");
            }
            return (
                <div>
                    <CircularProgress
                        size={120}
                        thickness={8}
                        mode="determinate"
                        value={processedMilliseconds}
                        max={durationMilliseconds}
                    />
                    <div className="popup-ticker-text-wrapper">
                        <span className="popup-ticker-text">
                            {`${timeString}`}
                        </span>
                    </div>
                </div>
            );
        };
        let content = null;
        if (this.props.endTime && this.props.duration && this.props.currentTime) {
            const currentTime = Moment(this.props.currentTime);
            const endTime = Moment(this.props.endTime);
            const remainingTime = endTime.diff(currentTime);
            content = display(remainingTime, this.props.duration);
        } else {
            content = input;
        }
        return (
            <MuiThemeProvider>
                {content}
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentTime: state.currentTime,
        duration: state.duration,
        endTime: state.endTime
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        initTimer: (duration, endTime) => {
            dispatch(actions.setTimer(duration, endTime));
        },
        tickTime: () => {
            dispatch(actions.setCurrentTime());
        }
    }
}

Popup.propTypes = propTypes;
const App = connect(mapStateToProps, mapDispatchToProps)(Popup);
export default App;
