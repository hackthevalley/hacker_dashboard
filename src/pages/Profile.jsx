import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/pages/profile.css';
import { getMeAction, updateHackerAction } from '../redux/actions';
import { selectHackersMe } from '../selectors';
import { ErrorCodes } from '../components';

class _Profile extends Component {
  state = {
    updateMe: null,
    updateMeErrorCodes: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMeAction());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.me !== nextProps.me) {
      this.setState({
        updateMe: nextProps.me,
      })
    }
  }

  handleUpdateMe = async (event) => {
    const {
      dispatch,
      me,
    } = this.props;
    event.preventDefault();
    this.setState({
      updateMeErrorCodes: false,
    });
    const formData = new FormData(event.target);
    const action = await dispatch(updateHackerAction(me._id, {
      first_name: formData.get('first_name') || null,
      last_name: formData.get('last_name') || null,
      gender: formData.get('gender') || null,
      dob: formData.get('dob') || null,
      school: formData.get('school') || null,
      github: formData.get('github') || null,
      linkedin: formData.get('linkedin') || null,
      website: formData.get('website') || null,
      // avatar: formData.get('avatar') || null,
      description: formData.get('description') || null,
    }));
    if (action.error) {
      this.setState({
        updateMeErrorCodes: action.error.errorCodes,
      });
      return;
    }
  }

  render() {
    const { updateMe, updateMeErrorCodes } = this.state;
    if (!updateMe) {
      return null;
    }
    return (
      <form
        className="profile"
        onSubmit={this.handleUpdateMe}
      >
        <h1>Profile</h1>

        <label
          className="profile__label"
          htmlFor="email_address"
        >
          Email address
        </label>

        <input
          id="email_address"
          type="email"
          className="profile__input"
          name="email_address"
          value={updateMe.email_address || ''}
          autoComplete="email"
          placeholder="john.doe@example.com"
          disabled
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="first_name"
        >
          First Name
        </label>

        <input
          id="first_name"
          type="text"
          className="profile__input"
          name="first_name"
          value={updateMe.first_name || ''}
          autoComplete="given-name"
          placeholder="john"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="last_name"
        >
          Last Name
        </label>

        <input
          id="last_name"
          type="text"
          className="profile__input"
          name="last_name"
          value={updateMe.last_name || ''}
          autoComplete="family-name"
          placeholder="doe"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="gender"
        >
          Gender
        </label>

        <select
          id="gender"
          name="gender"
          className="profile__input"
          value={updateMe.gender || ''}
          autoComplete="sex"
        >
          <option value="">
            Prefer not to answer
          </option>
          <option value="female">
            Female
          </option>
          <option value="male">
            Male
          </option>
          <option value="other">
            Other
          </option>
        </select>

        <br/>

        <label
          className="profile__label"
          htmlFor="dob"
        >
          Date of birth
        </label>

        <input
          id="dob"
          type="date"
          className="profile__input"
          name="dob"
          value={updateMe.dob || ''}
          autoComplete="bday"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="dob"
        >
          University
        </label>

        <input
          id="school"
          type="text"
          className="profile__input"
          name="school"
          value={updateMe.school || ''}
          autoComplete="off"
          list="data-schools"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="github"
        >
          GitHub
        </label>

        <input
          id="github"
          type="text"
          className="profile__input"
          name="github"
          value={updateMe.github || ''}
          autoComplete="url"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="linkedin"
        >
          LinkedIn
        </label>

        <input
          id="linkedin"
          type="text"
          className="profile__input"
          name="linkedin"
          value={updateMe.linkedin || ''}
          autoComplete="url"
        />

        <br/>

        <label
          className="profile__label"
          htmlFor="website"
        >
          Website/Portfolio
        </label>

        <input
          id="website"
          type="text"
          className="profile__input"
          name="website"
          value={updateMe.website || ''}
          autoComplete="url"
        />

        <br/>

        {/* <label htmlFor="avatar">
          Avatar
        </label> */}

        {/* <input
          id="avatar"
          type="text"
          className="profile__input"
          name="avatar"
          value={updateMe.avatar || ''}
          autoComplete="photo"
        /> */}

        {/* <br/> */}

        <label
          className="profile__label"
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          className="profile__input profile__input_large"
          autoComplete="off"
        >
          {updateMe.description || ''}
        </textarea>

        <br/>

        <input
          type="submit"
          value="Save"
          className="profile__button"
        />

        <ErrorCodes errorCodes={updateMeErrorCodes} />

        {/* https://en.wikipedia.org/wiki/List_of_universities_in_Canada */}
        <datalist id="data-schools">
          <option>Acadia University</option>
          <option>Algoma University</option>
          <option>Athabasca University</option>
          <option>Atlantic School of Theology</option>
          <option>Bishop's University</option>
          <option>Booth University College</option>
          <option>Brandon University</option>
          <option>Brock University</option>
          <option>Canadian Mennonite University</option>
          <option>Cape Breton University</option>
          <option>Capilano University</option>
          <option>Carleton University</option>
          <option>Concordia University</option>
          <option>Crandall University</option>
          <option>Dalhousie University</option>
          <option>Dominican University College</option>
          <option>École de technologie supérieure</option>
          <option>École nationale d'administration publique</option>
          <option>École Polytechnique de Montréal</option>
          <option>Emily Carr University of Art and Design</option>
          <option>Fairleigh Dickinson University</option>
          <option>First Nations University of Canada</option>
          <option>HEC Montréal</option>
          <option>Huron University College</option>
          <option>Institut national de la recherche scientifique</option>
          <option>Kingswood University</option>
          <option>Kwantlen Polytechnic University</option>
          <option>Lakehead University</option>
          <option>Laurentian University</option>
          <option>MacEwan University</option>
          <option>McGill University</option>
          <option>McMaster University</option>
          <option>Memorial University of Newfoundland</option>
          <option>Mount Allison University</option>
          <option>Mount Royal University</option>
          <option>Mount Saint Vincent University</option>
          <option>New York Institute of Technology</option>
          <option>Nipissing University</option>
          <option>NSCAD University</option>
          <option>OCAD University</option>
          <option>Queen's University</option>
          <option>Quest University</option>
          <option>Redeemer University College</option>
          <option>Royal Military College of Canada</option>
          <option>Royal Roads University</option>
          <option>Ryerson University</option>
          <option>Saint Francis Xavier University</option>
          <option>Saint Mary's University</option>
          <option>Saint Paul University</option>
          <option>Simon Fraser University</option>
          <option>St. Stephen's University</option>
          <option>St. Thomas University</option>
          <option>The King's University</option>
          <option>Thompson Rivers University</option>
          <option>Trent University</option>
          <option>Trinity Western University</option>
          <option>Tyndale University College</option>
          <option>Université de Moncton</option>
          <option>Université de Montréal</option>
          <option>Université de Saint-Boniface</option>
          <option>Université de Sherbrooke</option>
          <option>Université du Québec à Chicoutimi</option>
          <option>Université du Québec à Montréal</option>
          <option>Université du Québec à Rimouski</option>
          <option>Université du Québec à Trois-Rivières</option>
          <option>Université du Québec en Abitibi-Témiscamingue</option>
          <option>Université du Québec en Outaouais</option>
          <option>Université Laval</option>
          <option>Université Sainte-Anne</option>
          <option>University Canada West</option>
          <option>University College of the North</option>
          <option>University of Alberta</option>
          <option>University of British Columbia</option>
          <option>University of Calgary</option>
          <option>University of Fredericton</option>
          <option>University of Guelph</option>
          <option>University of King's College</option>
          <option>University of Lethbridge</option>
          <option>University of Manitoba</option>
          <option>University of New Brunswick</option>
          <option>University of Northern British Columbia</option>
          <option>University of Ontario Institute of Technology</option>
          <option>University of Ottawa</option>
          <option>University of Prince Edward Island</option>
          <option>University of Regina</option>
          <option>University of Saskatchewan</option>
          <option>University of the Fraser Valley</option>
          <option>University of Toronto</option>
          <option>University of Toronto Scarborough</option>
          <option>University of Toronto Mississauga</option>
          <option>University of Victoria</option>
          <option>University of Waterloo</option>
          <option>University of Western Ontario</option>
          <option>University of Windsor</option>
          <option>University of Winnipeg</option>
          <option>Vancouver Island University</option>
          <option>Wilfrid Laurier University</option>
          <option>York University</option>
        </datalist>
      </form>
    )
  }
}

export const Profile = connect((state) => ({
  me: selectHackersMe(state),
}))(_Profile);
