/*
name: jQuery Push Pop
version: 0.0.2
author: Darren Schnare
constributors: Mathieu Bouchard
copyright: Darren Schnare, Mathieu Bouchard 2013
license: MIT (http://opensource.org/licenses/MIT)
*/
(function ($) {
	/// Helpers ///

	function isObject(o) {
		return o === Object(o);
	}

	function isArray(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	/// Methods ///

	var methods = {
		// pushAttr(attributeName, value)
		// pushAttr(attributeName, function(index, attr))
		// pushAttr(attributes)
		pushAttr: function (a, b) {
			if (arguments.length >= 1) {
				this.each(function () {
					var $self, stack;

					$self = $(this);
					stack = $self.data('pushpop:attr');

					if (!isArray(stack)) {
						$self.data('pushpop:attr', stack = []);
					}

					if (typeof a === 'string') {
						$self.attr(a, b);
						stack.push(a);
					} else if (isObject(a)) {
						var keys = [];
						for (var k in a) {
							$self.attr(k, a[k]);
							keys.push(k);
						}
						stack.push(keys);
					}
				});
			}

			return this;
		},
		// popAttr()
		popAttr: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:attr');

				if (!isArray(stack)) {
					$self.data('pushpop:attr', stack = []);
				}

				a = stack.pop();
				if (isArray(a)) {
					while (a.length) {
						$self.removeAttr(a.pop());
					}
				} else {
					$self.removeAttr(a);
				}
			});

			return this;
		},
		// clearAttrs()
		clearAttrs: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:attr');

				if (isArray(stack)) {
					while (stack.length) {
						methods.popAttrs.call(this);
					}
				}
			});

			return this;
		},
		// pushClass(className)
		// pushClass(function(index, currentClass))
		pushClass: function (a) {
			if (arguments.length === 1) {
				this.each(function () {
					var $self, stack;

					$self = $(this);
					stack = $self.data('pushpop:class');

					if (!isArray(stack)) {
						$self.data('pushpop:class', stack = []);
					}

					if (typeof a === 'function') {
						$self.addClass(function (index, currentClass) {
							// We call a and override it to the returned class at the same time.
							return a = a.call(this, index, currentClass);
						});
					} else {
						$self.addClass(a);
					}

					stack.push(a);
				});
			}

			return this;
		},
		// popClass()
		popClass: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:class');

				if (!isArray(stack)) {
					$self.data('pushpop:class', stack = []);
				}

				a = stack.pop();
				$self.removeClass(a);
			});

			return this;
		},
		// clearClasses()
		clearClasses: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:class');

				if (isArray(stack)) {
					while (stack.length) {
						methods.popClass.call(this);
					}
				}
			});

			return this;
		},
		// pushCss(propertyName, value)
		// pushCss(propertyName, function(index, value))
		// pushCss(properties)
		pushCss: function (a, b) {
			// NOTE: This implementation is identical to pushAttr(),
			// but we keep them separate because we need to use a
			// different array to save state and the css() function
			// may have its arguments changed in the future.
			if (arguments.length >= 1) {
				this.each(function () {
					var $self, stack;

					$self = $(this);
					stack = $self.data('pushpop:css');

					if (!isArray(stack)) {
						$self.data('pushpop:css', stack = []);
					}

					if (typeof a === 'string') {
						$self.attr(a, b);
						stack.push(a);
					} else if (isObject(a)) {
						var keys = [];
						for (var k in a) {
							$self.attr(k, a[k]);
							keys.push(k);
						}
						stack.push(keys);
					}
				});
			}

			return this;
		},
		// popCss()
		popCss: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:css');

				if (!isArray(stack)) {
					$self.data('pushpop:css', stack = []);
				}

				a = stack.pop();
				if (isArray(a)) {
					while (a.length) {
						$self.css(a.pop(), '');
					}
				} else {
					$self.css(a, '');
				}
			});

			return this;
		},
		// clearCss()
		clearCss: function () {
			this.each(function () {
				var $self, stack, a;

				$self = $(this);
				stack = $self.data('pushpop:css');

				if (isArray(stack)) {
					while (stack.length) {
						methods.popCss.call(this);
					}
				}
			});

			return this;
		},
		// toggleClass(className)
		// toggleClass(className, className)
		toggleClass: function (a, b) {
			b = b || '';
			a = a.split(' ');
			b = b.split(' ');

			var i, al = a .length, bl = b.length;

			for (i = 0; i < al; i += 1) {
				if (i >= bl || a[i] === b[i]) {
					if (this.hasClass(a[i])) {
						this.removeClass(a[i]);
					} else {
						this.addClass(a[i]);
					}
				} else {
					if (this.hasClass(a[i])) {
						this.removeClass(a[i]);
						this.addClass(b[i]);
					} else {
						this.removeClass(b[i]);
						this.addClass(a[i]);
					}
				}
			}

			while (i < bl) {
				i += 1;
				if (this.hasClass(b[i])) {
					this.removeClass(b[i]);
				} else {
					this.addClass(b[i]);
				}
			}

			return this;
		}
	};

	// These are the most practical but jQuery plugin docs frowns on this.

	$.fn.pushAttr = methods.pushAttr;
	$.fn.popAttr = methods.popAttr;
	$.fn.clearAttrs = methods.clearAttrs;
	$.fn.pushClass = methods.pushClass;
	$.fn.popClass = methods.popClass;
	$.fn.clearClasses = methods.clearClasses;
	$.fn.pushCss = methods.pushCss;
	$.fn.popCss = methods.popCss;
	$.fn.clearCss = methods.clearCss;
	$.fn.toggleClass = methods.toggleClass;

	// This might be better, but not as practical.

	// pushpop(methodName, ...)
	//
	// Example:
	// jquery.pushpop('pushAttr', 'data-hash', 'myHash');
	$.fn.pushpop = function (methodName) {
		var method = methods[methodName];

		if (typeof method === 'function') {
			if (arguments.length) {
				method.apply(this, ([]).slice.call(arguments));
			} else {
				method.call(this);
			}
		} else {
			throw new Error('Method does not exist: ' + methodName);
		}

		return this;
	};
	// Alias pushpop with pp.
	//
	// Example:
	// jquery.pp('pushAttr', 'data-hash', 'myHash');
	$.fn.pp = $.fn.pushpop;
}(this.jQuery));