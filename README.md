directions-transition-group
===========================

This is a small extension of Facebook's `TransitionGroup` and `TransitionGroupChild` components from React source code.

What's changed
==============

`TransitionGroup` listens for bubbling click events from elements inside it and looks for `data-direction` attribute. Then, it sets a class for animated element: `<animation name>-direction-<direction name>`.

There is also a `setDirection` method on `TransitionGroup` to set direction name programmatically.