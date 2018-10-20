import { createSelector } from 'reselect';
import { selectApplicationForm } from './selectApplicationForm';

export const selectApplicationFormQuestionsHashMap = createSelector([
  selectApplicationForm,
], (application) => {
  return application && application.questions.reduce((res, question) => ({
    ...res,
    [question._id]: question,
  }), {});
});
