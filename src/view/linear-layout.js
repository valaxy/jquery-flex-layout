define(function (require) {
	var View = require('./view')
	return View.LinearLayout
})


//View.createLinearLayout = function (options) {
//	return new LinearLayout(options)
//}


//LinearLayout.prototype._findAncestor = function (direction) {
//	var find = this
//	while (true) {
//		if (!find.parent()) {
//			return find
//		} else if (find.direction() == direction) {
//			return find
//		}
//
//		find = find.parent()
//	}
//}