This is a small extension of Facebook's `TransitionGroup` and `TransitionGroupChild` components from React source code.

What's changed
==============

`TransitionGroup` listens for bubbling click events from elements inside it and looks for `data-direction` attribute. Then, it sets a class for animated element: `<animation name>-direction-<direction name>`.

There is also a `setDirection` method on `TransitionGroup` to set direction name programmatically.

Usage
=====

```jsx
var TransitionGroup = require('directions-transition-group');

// Wrap your element

<TransitionGroup name="slide" ref="tg">
  <RouteHandler />
</TransitionGroup>

// Assign data-direction attribute

<a href="#next" data-direction="forward">Next</a> //will add .slide-direction-forward class when animating elements
<Link to="step-one" data-direction="whatever">Back</Link> //will add .slide-direction-whatever class when animating elements

// "API"
this.refs.tg.setDirection("swap");

```