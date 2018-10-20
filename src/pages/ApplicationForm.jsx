import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { ApplicationFormField, ErrorCodes } from '../components';
import { getApplicationsAction, getEventsAction, getMeAction, createHackerApplicationAction, updateHackerApplicationQuestionAction } from "../redux/actions";
import '../scss/pages/application.scss';
import { selectApplicationForm, selectHackersMe, selectMyApplicationQuestionsHashMap, selectApplicationFormQuestionsHashMap } from '../selectors';

async function chain(arr, fn) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(await fn(arr[i], i, arr));
  }
  return result;
}

function transformAnswer(question, answer) {
  if (question.question_type === 'checkbox') {
    return [{
      on: 'Yes',
      off: 'No',
    }[answer[0]]];
  }
  return answer;
}

class _ApplicationForm extends Component {
  state = {
    questionErrorCodes: {},
    questionSaved: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMeAction());
    dispatch(getEventsAction());
    dispatch(getApplicationsAction());
  }

  handleSave = async (event) => {
    const {
      dispatch,
      me,
      application,
      applicationQuestionsById,
    } = this.props;
    this.setState({
      questionErrorCodes: {},
      questionSaved: {},
    });
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = application.questions
      .reduce((res, question) => ({
        ...res,
        [question._id]: formData.getAll(question._id),
      }), {});

    const hackerApplication = me.applications.find(
      hackerApp => hackerApp.application._id === application._id);
    let hackerApplicationId = hackerApplication && hackerApplication._id;

    if (!hackerApplication) {
      const [action] = await dispatch(createHackerApplicationAction(application._id));
      hackerApplicationId = action.application._id;
    }

    const questionIds = Object.keys(answers);
    // const updateQuestionActions = await Promise.all(questionIds.map(
    const updateQuestionActions = await chain(questionIds,
      (questionId) => dispatch(updateHackerApplicationQuestionAction(
        hackerApplicationId,
        questionId,
        transformAnswer(applicationQuestionsById[questionId], answers[questionId])
      ))
    );
    const questionErrorCodes = updateQuestionActions.reduce((res, [action], i) => ({
      ...res,
      [questionIds[i]]: action.error && action.error.errorCodes,
    }), {});

    this.setState({
      questionErrorCodes,
      questionSaved: Object.keys(questionErrorCodes)
        .reduce((res, question_id) => ({
          ...res,
          [question_id]: !questionErrorCodes[question_id],
        }), {})
    });
  }

  render() {
    const {
      me,
      myApplicationAnswersByQuestionId,
      application,
    } = this.props;
    const {
      questionErrorCodes,
      questionSaved,
    } = this.state;
    if (!me || !application || !myApplicationAnswersByQuestionId) {
      return null;
    }
    return (
      <form onSubmit={this.handleSave}>
        <h1>{application.name}</h1>

        <p>{application.description}</p>

        {application.questions.map((question) => (
          <Fragment key={question._id}>
            <ApplicationFormField
              {...question}
              answers={myApplicationAnswersByQuestionId[question._id]}
            />
            {questionSaved[question._id] && (<p style={{color: '#4c4' }}>Saved</p>)}
            <ErrorCodes errorCodes={questionErrorCodes[question._id]} />
          </Fragment>
        ))}

        <button type="submit">Save</button>
      </form>
    )
  }
}

export const ApplicationForm = connect((state, props) => ({
  me: selectHackersMe(state),
  myApplicationAnswersByQuestionId: selectMyApplicationQuestionsHashMap(state, props),
  application: selectApplicationForm(state, props),
  applicationQuestionsById: selectApplicationFormQuestionsHashMap(state, props),
}))(_ApplicationForm);
