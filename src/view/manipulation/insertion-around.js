define(function (require, exports) {

	return function (View) {
		/** Create a parent layout, append both of this and `adder`, the `adder` will at `position` of this
		 ** adder:        the new added view
		 ** position:     'top' | 'bottom' | 'left' | 'right'
		 ** adderOptions: options of adder
		 ** thisOptions:  options of this
		 ** return: this
		 */
		View.prototype.split = function (adder, position, adderOptions, thisOptions) {
			if (adder.parent()) {
				adder.remove()
			}

			// init paras
			var type = (position == 'left' || position == 'right') ? 'horizontal' : 'vertical'
			var isVertical = type == 'vertical'
			position = position || (isVertical ? 'bottom' : 'right')


			// split it
			if (!this.parent()) { // root element
				var wrap = new View.LinearLayout({
					direction: isVertical ? 'column' : 'row'
				})
				var $parent = this._$dom.parent()
				this._$dom.detach()

				// root element no need to remove from layout
				if (position == 'top' || position == 'left') {
					wrap.appendView(adder, adderOptions)
					wrap.appendView(this, thisOptions)
				} else {
					wrap.appendView(this, thisOptions)
					wrap.appendView(adder, adderOptions)
				}
				$parent.append(wrap._$dom)
			} else {
				var parent = this.parent()
				var index = parent.findViewAt(this)
				var oldOptions = this.getConfig()
				parent.removeViewAt(index)

				var wrap = View.createLinearLayout({
					direction: isVertical ? 'column' : 'row'
				})

				if (position == 'top' || position == 'left') {
					wrap.appendView(adder, adderOptions)
					wrap.appendView(this, thisOptions)
				} else {
					wrap.appendView(this, thisOptions)
					wrap.appendView(adder, adderOptions)
				}
				parent.addViewAt(index, wrap, oldOptions)
			}
			return this
		}


		/** Wrap by `wrapper`
		 ** options: options of this as child of wrapper
		 ** return: this
		 */
		View.prototype.wrap = function (wrapper, options) {
			if (!(wrapper instanceof View.LinearLayout) || !(wrapper.isIsolate())) {
				throw new Error('wrapper should be LinearLayout and empty and no parent')
			}

			if (this.parent()) {
				var thisParent = this.parent()
				var index = thisParent.indexOfView(this)
				var originalOptions = this.getConfig()
				thisParent.removeViewAt(index)
				thisParent.addViewAt(index, wrapper, originalOptions)
			} else {
				var $root = this.$dom().parent() // $root is not in any SimpleView/LinearLyaout
				this.$dom().detach()
				$root.append(wrapper.$dom())
			}

			wrapper.appendView(this, options)
			return this
		}


		/** Replace this with another `view`, use original options
		 ** return: this
		 **/
		View.prototype.replaceWith = function (view) {
			var oldFlex = this.flex()
			if (this.parent()) {
				var parent = this.parent()
				var index = parent.indexOfView(this)
				parent.removeViewAt(index)
				parent.addViewAt(index, view, {
					flex: oldFlex
				})
			} else {
				this._$dom.replaceWith(view._$dom)
			}
			return this
		}

	}
})