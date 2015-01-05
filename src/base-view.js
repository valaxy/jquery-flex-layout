define(function () {

	// the css key
	var MARGIN1_KEY = ['top', 'left']
	var SIZE_KEY = ['height', 'width']
	var MARGIN2_KEY = ['bottom', 'right']


	var BaseView = function () {
		// nothing
	}


	/**
	 *
	 * @param type can be 0, 1, 2
	 *      - 0 由第一边框确定位置
	 *      - 1 由双边确定位置
	 *      - 2 由第二边框确定位置
	 * @param parent the parent linear-layout
	 * @param $dom
	 * @private
	 */
	BaseView.prototype._init = function (type, parent, $dom) {
		this._setDefault(type, parent, $dom)
		this._initForType()
	}


	// set some useful value
	BaseView.prototype._setDefault = function (type, parent, $dom) {
		this._type = type
		this._parent = parent
		this.$dom = $dom.css({ // set default css value
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			width: 'auto',
			height: 'auto'
		}).show()
	}


	BaseView.prototype._initForType = function () {
		var isHor = this._parent._isHor ? 1 : 0
		switch (this._type) {
			case 0:
				this.$dom.css(MARGIN2_KEY[isHor], 'auto')
				break
			case 1:
				this.$dom.css(SIZE_KEY[isHor], 'auto')
				break
			case 2:
				this.$dom.css(MARGIN1_KEY[isHor], 'auto')
				break
		}
	}

	// - margin1: 第一边框边距
	// - size: 盒子的大小
	// - margin2: 第二边框边距
	BaseView.prototype._setSize = function (options) {
		var css = {}
		var isHor = this._parent._isHor ? 1 : 0
		if (options.margin1) {
			css[MARGIN1_KEY[isHor]] = options.margin1 + 'px'
		}
		if (options.size) {
			css[SIZE_KEY[isHor]] = options.size + 'px'
		}
		if (options.margin2) {
			css[MARGIN2_KEY[isHor]] = options.margin2 + 'px'
		}
		this.$dom.css(css)
	}

	return BaseView
})


//BaseView.prototype._margin1 = function () {
//	return this.$dom.css(MARGIN1_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
//};
//
//BaseView.prototype._margin2 = function () {
//	return this.$dom.css(MARGIN2_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
//};
//
//BaseView.prototype._size = function () {
//	return this.$dom.css(SIZE_KEY[this._parent._isHor ? 1 : 0]).extractNumber();
//};

