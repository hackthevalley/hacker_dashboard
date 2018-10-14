import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/pages/profile.css';
import {getMeAction, updateHackerAction} from '../redux/actions';
import {selectHackersMe} from '../selectors';
import {ErrorCodes} from '../components';
import SchoolNameServiceProvider from "../providers/SchoolNameServiceProvider";

class _Profile extends Component {

    constructor(props) {
        super(props);
        this.schoolList = SchoolNameServiceProvider.getList();
    }

    state = {
        updateMe: null,
        updateMeErrorCodes: false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
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
        const {updateMe, updateMeErrorCodes} = this.state;
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

                <ErrorCodes errorCodes={updateMeErrorCodes}/>
                <datalist id="data-schools">
                    {this.schoolList.map(name => <option>{name}</option>)}
                </datalist>
            </form>
        )
    }
}

export const Profile = connect((state) => ({
    me: selectHackersMe(state),
}))(_Profile);
