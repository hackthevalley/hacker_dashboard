import React, {Component} from 'react';
import {connect} from "react-redux";
import {getEventsAction, getApplicationsAction} from "../redux/actions";
import '../scss/pages/application.scss';

const events = [
  {
    _id: 125,
    name: "Hack The Valley III",
    applications: [
      { _id: 12415, name: "Hacker Application" },
      { _id: 15, name: "Mentor Application", description: "You have walked the walk, now it's time for you to talk the talk" }
    ]
  }
]

class _Application extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getEventsAction());
    dispatch(getApplicationsAction());
  }

  render() {
    const { applications } = this.props;
    return (
      <section className="app">
        <h1>Applications</h1>
        <div className="app__content">
          <div className="app__col">
            <h2>My Applications</h2>
            <ul className="app__items">
            {
              applications.length > 0?
              applications.map((app, key) =>
                // TODO: style when we have something
                <li className="app__item">REEEEEEEEEEEE</li>
              ):
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
                        applications.map(app =>
                          <li key={app._id} className="app__item">
                            <h4>{ app.name }</h4>
                            <p className="app__description">{app.description ? app.description: "404: Description Not Found" }</p>
                            <button type="button" className="app__apply-btn">Apply Now</button>
                          </li>
                        )
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
  events: state.events.allEvents,
  applications: state.applications.allApplications
}))(_Application);
