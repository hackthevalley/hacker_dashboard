import { createSelector } from "reselect";
import { selectHackersMe } from "./selectHackersMe";

const selectIdFromRoute = (state, props) => {
  return props.match.params.id;
}

export const selectMyApplicationForm = createSelector(
  [
    selectHackersMe,
    selectIdFromRoute,
  ],
  (me, applicationId) => me &&
    me.applications.find(hackerApp => hackerApp.application._id === applicationId)
)

export const selectMyApplicationQuestionsHashMap = createSelector(
  [
    selectHackersMe,
    selectMyApplicationForm,
  ],
  (
    me,
    myHackerApp
  ) => (
    me &&
    myHackerApp
  ) && myHackerApp.answers
    .reduce((res, answer) => ({
      ...res,
      [answer.question_id]: answer.answer,
    }), {})
)
