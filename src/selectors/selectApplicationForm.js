import { createSelector } from 'reselect';
import { selectEvents } from './selectEvents';

const selectIdFromRoute = (state, props) => {
  return props.match.params.id;
}

export const selectApplicationForm = createSelector([
  selectEvents,
  selectIdFromRoute,
], (events, applicationFormId) => {
  const allApplicationForms = events
    .map(event => event.applications)
    .reduce((a, x) => a.concat(x), []);
  return allApplicationForms.find(app => app._id === applicationFormId);
})
