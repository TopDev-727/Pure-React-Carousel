import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../helpers';
import s from './ButtonBack.css';

const ButtonBack = class ButtonBack extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    currentSlide: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    step: PropTypes.number.isRequired,
    store: PropTypes.object.isRequired,
  };

  static defaultProps = {
    disabled: null,
    onClick: null,
    className: null,
  }

  static setDisabled(disabled, currentSlide) {
    if (disabled !== null) return disabled;
    if (currentSlide === 0) return true;
    return false;
  }

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      disabled: ButtonBack.setDisabled(props.disabled, props.currentSlide),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: ButtonBack.setDisabled(nextProps.disabled, nextProps.currentSlide),
    });
  }

  handleOnClick(ev) {
    const { currentSlide, onClick, step, store } = this.props;
    const newCurrentSlide = Math.max(
      currentSlide - step,
      0,
    );
    store.setState({
      currentSlide: newCurrentSlide,
    }, onClick !== null && onClick.call(this, ev));
  }

  render() {
    const { className, currentSlide, disabled, onClick, step, store, ...props } = this.props;

    const newClassName = cn([
      s.buttonBack,
      'carousel__back-button',
      className,
    ]);

    return (
      <button
        aria-label="previous"
        className={newClassName}
        onClick={this.handleOnClick}
        disabled={this.state.disabled}
        {...props}
      >{this.props.children}</button>
    );
  }
};

export default ButtonBack;