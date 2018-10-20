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
  ) => me && (
    // If hacker has a hacker application for this application
    myHackerApp
    // Construct a hash map<question_id, answer>
    ? myHackerApp.answers
      .reduce((res, answer) => ({
        ...res,
        [answer.question_id]: answer.answer,
      }), {})
    // Hacker has no answers, return an empty hash map
    : {}
  )
)
