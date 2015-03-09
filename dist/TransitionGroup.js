/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule ReactCSSTransitionGroup
 */

"use strict";

var React = require("react");

var assign = require("react/lib/Object.assign");

var ReactTransitionGroup = React.createFactory(
  require("react/lib/ReactTransitionGroup")
);
var ReactCSSTransitionGroupChild = React.createFactory(
  require("./TransitionGroupChild")
);

var ReactCSSTransitionGroup = React.createClass({
  displayName: 'ReactCSSTransitionGroup',

  propTypes: {
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      transitionEnter: true,
      transitionLeave: true
    };
  },

  _wrapChild: function(child) {
    // We need to provide this childFactory so that
    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
    // leave while it is leaving.
    return ReactCSSTransitionGroupChild(
      {
        name: this.props.transitionName,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave,
        direction: this.state.direction
      },
      child
    );
  },

  render: function() {
    return (
      React.createElement("div", {onClick: this.handleClick}, 
      ReactTransitionGroup(
        assign({}, this.props, {childFactory: this._wrapChild})
      )
      )
    );
  },

  getInitialState: function() {
    return {direction: 'forward'};
  },

  handleClick: function(event) {
    var target = closestLink(event.target);
    if (target) {
      var direction = target.dataset.direction;
      if (direction) {
        this.setState({direction: direction});
      }
    }
  },

  setDirection: function(direction) {
    this.setState({direction: direction});
  }
});

function closestLink(node) {
  if (node.dataset.direction) {
    return node;
  }

  var parent = node.parentNode;

  while (parent!=document.body) {
    if (parent && parent.dataset.direction) {
      return parent;
    } else {
      parent = parent.parentNode;
    }
  }
  return null;
}

module.exports = ReactCSSTransitionGroup;
