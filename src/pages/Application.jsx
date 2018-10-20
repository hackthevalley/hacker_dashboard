import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {getEventsAction, getApplicationsAction} from "../redux/actions";
import '../scss/pages/application.scss';
import {selectHackersMe} from "../selectors";

class _Application extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getEventsAction());
    dispatch(getApplicationsAction());
  }

  applicationStarted = (id) => {
    const applications = this.props.applications || [];
    for(let i = 0; i < applications.length; i++) {
      if(applications[i].application._id === id) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { applications, events } = this.props;
    return (
      <section className="app">
        <h1>Applications</h1>
        <br/>
          <div className="app__content">
          <div className="app__col">
            <h2>My Applications</h2>
            <ul className="app__items">
            {
              applications.length > 0?
              applications.map((app, key) => {
                return (
                  <li className="app__item" key={key}>
                    <h3>{app.application.event.name} - {app.application.name}</h3>
                    <p
                      className="app__description">{app.application.description ? app.application.description : "404: Description Not Found"}</p>
                    <small className="app__small-label">
                      You haven't submitted your application yet, please ensure you submit your application before the deadline.
                    </small>
                    <Link
                      className="app__apply-btn"
                      to={`/app/${app.application._id}`}
                    >
                      Continue Application
                    </Link>
                  </li>
                )
              }):
              <li className="app__item app__item--empty">
                <span className="app__shrug">¯\_(ツ)_/¯</span>
                <h3 className="app__shrug-header">No applications found</h3>
                <span>Fortune favors the bold, apply now!</span>
              </li>
            }
            </ul>
          </div>
          <div className="app__col">
            <h2>Open Applications</h2>
            <div className="app__event">
              {
                events.map(({_id, name, applications}) =>
                  <div key={ _id } className="app__event">
                    <h3>{ name }</h3>
                    <ul className="app__items">
                      {
                        applications.map(app => {
                          return (
                            <li key={app._id} className="app__item">
                              <h4>{app.name}</h4>
                              {app.open ? (
                                <React.Fragment>
                                {!this.applicationStarted(app._id) ? (
                                    <React.Fragment>
                                      <p
                                        className="app__description">{app.description ? app.description : "404: Description Not Found"}</p>
                                      <Link
                                        className="app__apply-btn"
                                        to={`/app/${app._id}`}
                                      >
                                        Start Application
                                      </Link>
                                    </React.Fragment>
                                  ): (
                                    <small className="app__small-label">
                                      You already started this application, check My Applications section for more details.
                                    </small>
                                  )}
                                </React.Fragment>
                              ) : (
                                <Link
                                  className="app__apply-btn app__apply-btn--disabled"
                                  to={`/app`}
                                >
                                  Application Not Yet Open
                                </Link>
                              )}

                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export const Application = connect((state) => ({
  me: selectHackersMe(state),
  events: state.events.allEvents,
  applications: state.applications.allApplications
}))(_Application);
