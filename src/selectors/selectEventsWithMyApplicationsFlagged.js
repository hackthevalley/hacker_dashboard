import { createSelector } from 'reselect';
import { selectEvents } from './selectEvents';
import { selectApplications } from './selectApplications';

export const selectEventsWithMyApplicationsFlagged = createSelector([
  selectEvents,
  selectApplications,
], (
  events,
  myApplications
) => {
  return (events && myApplications) && events.map((event) => ({
    ...event,
    applications: event.applications.map((app) => ({
      ...app,
      isStarted: myApplications.some(myApp => myApp.application._id === app._id),
    }))
  }));
});
