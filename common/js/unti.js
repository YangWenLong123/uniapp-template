/**
 * 获取时间 时+分
 */
function getTime() {
		let data = new Date();
		let hour = data.getHours();
		let minute = data.getMinutes();
		
		hour = hour > 9 ? hour : '0' + hour;
		minute = minute > 9 ? minute : '0' + minute;
		
		return `${hour}:${minute}`
	}

/**
 * 获取时间 年+月+日
 */
function getDate() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	
	return `${year}-${month}-${day}`
}

export {
	getTime,
	getDate
}