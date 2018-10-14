import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getEventsAction, getApplicationsAction} from "../redux/actions";

class _Application extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getEventsAction());
        dispatch(getApplicationsAction());
    }

    render() {
        return (
            <React.Fragment>
                <h1>My Applications</h1>
                {this.props.applications.length ? (
                    <React.Fragment>
                        
                    </React.Fragment>
                ): <p>You don't have any active applications.</p>}
                <h1>Open Applications</h1>
                {this.props.events.map(event => {
                    return (
                        <div key={event._id}>
                            <h2>{ event.name }</h2>
                            {event.applications.map(application => {
                              return (
                                  <React.Fragment key={application._id}>
                                      <h3>{application.name}</h3>
                                      <p>{application.description ? application.description: "This application does not have any description."}</p>
                                      <button>Apply Now</button>
                                  </React.Fragment>
                              )
                            })}
                        </div>
                    )
                })}
            </React.Fragment>
        )
    }
}

export const Application = connect((state) => ({
    events: state.events.allEvents,
    applications: state.applications.allApplications
}))(_Application);
