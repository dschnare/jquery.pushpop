# Overview

A simple jQuery plugin that makes managing attributes, classes and styles easier.



# Usage

	// Adds a class to all '.link' elements.
	$('.link').pushClass('disabled');

	// Later in code remove the pushed class from all '.link' elements.
	$('.link').popClass();

	// Add more classes.
	$('.link').pushClass('active big');

	// Much later in code remove all pushed classes from all '.link' elements.
	$('.link').clearClasses();

	// To toggle a class on or off.
	// NOTE: If the element has the class 'active' then the class will be removed
	// otherwise the class will be added.
	$('.play.btn').toggleClass('active');

	// To toggle between a class and its inverse.
	$('.play.btn').toggleClass('icon-play', 'icon-pause');

	// To toggle between a class and its inverse and toggle a class on and off.
	// NOTE: This is a contrived example.
	$('.play.btn').toggleClass('icon-play active', 'icon-pause');


**NOTE: The pop* functions work by undoing the last push* operation. Where as the clear* functions work by undoing all the last push* operations.**



# API

*Attributes*

	pushAttr(attributeName, value)
	pushAttr(attributeName, function(index, attr))
	pushAttr(attributes)
	popAttr()
	clearAttrs()

*Classes*

	pushClass(className)
	pushClass(function(index, currentClass))
	popClass()
	clearClasses()

	toggleClass(className)
	toggleClass(className, className)

*CSS*

	pushCss(propertyName, value)
	pushCss(propertyName, function(index, value))
	pushCss(properties)
	popCss()
	clearCss()