exports.pad = function pad(o) {
	while (o.length < 2) {
		o = '0' + o;
	}
	return o;
}

exports.toHex = function toHex(n) {
	return pad(n.toString(16));
}