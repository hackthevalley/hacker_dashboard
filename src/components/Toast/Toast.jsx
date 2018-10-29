import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeToastAction, updateToastAction } from '../../redux/actions';
import '../../scss/components/toast/toast.scss';

const LIMIT = 6; // Max number of toast
const DELAY = 350;
const QUEUE = []; // For queueing task (add/remove)
class _Toast extends Component {
  state = {
    remove: 9999,
    shift: 0,
    add: false,
    transition: true
  }

  componentDidUpdate(prevProps) {
    const size = Object.keys(this.props.items);
    if (size.length > Object.keys(prevProps.items).length) {
      this.setState({ add: true })
    }
  }

  removeToast = ({ currentTarget }) => {
    const { dispatch } = this.props;
    const id = currentTarget.id.slice(7);
    this.setState({
      remove: parseInt(id),
      add: false,
      transition: true,
      shift: currentTarget.clientHeight + 15
    });
    window.setTimeout(() => {
      dispatch(removeToastAction(id));
      this.setState({
        shift: 0,
        remove: 9999,
        transition: false
      })
    }, DELAY);
  }

  render() {
    const { remove, shift, add, transition } = this.state;
    const { items } = this.props;
    const keys = Object.keys(items);
    const className = `toast${transition? "": " toast--nt"}${add? " toast--add": ""}`;
    return <ul className={className}>
      {
        keys.map((id, key) => {
          const { status, title, body } = items[id];
          const style = { transform: `translate3d(0, ${shift}px, 0)` };
          const name = `toast__item${status ? ` toast__item--${status}` : ""}${remove === parseInt(id)? " toast__item--remove": ""}`;
          return (
            <li key={key} id={`toast--${id}`} style={remove < id? style: null} className={name} onClick={this.removeToast}>
              <h6 className="toast__title">{ title + id }</h6>
              <div className="toast__body">{ body }</div>
            </li>
          )
        })
      }
    </ul>
  }
}

const mapStateToProps = state => ({
  items: state.toast.toasts,
  update: state.toast.update
});

export const Toast = connect(mapStateToProps)(_Toast)