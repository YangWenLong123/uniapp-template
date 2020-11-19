function drawLine(ctx, x, y, lineLength, lineWidth, color, vertical) {
	ctx.save();

	ctx.beginPath(0);
	ctx.setStrokeStyle(color);
	ctx.setLineJoin('round');
	ctx.setLineWidth(lineWidth);
	ctx.moveTo(x, y);
	if (vertical) {
		ctx.lineTo(x, y + lineLength);
	} else {
		ctx.lineTo(x + lineLength, y);
	}
	ctx.stroke();
	ctx.restore();
}

/**
 * @description 渐变矩形
 * @param {Object} ctx		//画笔
 * @param {Object} x		//x坐标
 * @param {Object} y		//y坐标
 * @param {Object} w		//宽度
 * @param {Object} h		//高度
 * @param {Object} r		//半径
 * @param {Object} color0	//开始渐变色
 * @param {Object} color1	//结束渐变色
 */
function roundRectColor(ctx, x, y, w, h, r, color, type = false, color0 = null, color1 = null) {
	ctx.save();
	ctx.beginPath(0);
	ctx.setFillStyle(color);
	ctx.setLineJoin('round'); //交点设置成圆角
	ctx.setLineWidth(0);
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
	ctx.lineTo(x + r, y + h);
	ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
	ctx.lineTo(x, y + r);
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);
	ctx.lineTo(x + w - r, y);
	ctx.arc(x + w - r, y + r, r, Math.PI * 3 / 2, Math.PI * 2);
	ctx.lineTo(x + w, y + h - r);
	if (type) {
		const grad = ctx.createLinearGradient(x, y, x + w, y + w);

		grad.addColorStop(0, color0);
		grad.addColorStop(1, color1);
		ctx.fillStyle = grad;
	}
	ctx.fillRect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}

/**
 * 绘制圆角矩形（纯色填充）
 * @param {Object} ctx
 * @param {Object} x
 * @param {Object} y
 * @param {Object} w
 * @param {Object} h
 * @param {Object} r
 * @param {Object} color
 * @param {Object} strokeolor
 */
function roundRectBorderColor(ctx, x, y, w, h, r, color, strokeolor) {
	ctx.save();
	ctx.beginPath(0);
	ctx.setFillStyle(color);
	ctx.setStrokeStyle(strokeolor);
	ctx.setLineJoin('round'); //交点设置成圆角
	ctx.setLineWidth(0);
	//从右下角顺时针绘制，弧度从0到1/2PI  
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
	//矩形下边线  
	ctx.lineTo(x + r, y + h);
	//左下角圆弧，弧度从1/2PI到PI  
	ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
	//矩形左边线  
	ctx.lineTo(x, y + r);
	//左上角圆弧，弧度从PI到3/2PI  
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);
	//上边线  
	ctx.lineTo(x + w - r, y);
	//右上角圆弧  
	ctx.arc(x + w - r, y + r, r, Math.PI * 3 / 2, Math.PI * 2);
	//右边线  
	ctx.lineTo(x + w, y + h - r);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}


/**
 * @description 渐变矩形
 * @param {Object} ctx		//画笔
 * @param {Object} x		//x坐标
 * @param {Object} y		//y坐标
 * @param {Object} w		//宽度
 * @param {Object} h		//高度
 * @param {Object} x0		//渐变x0坐标
 * @param {Object} y0		//渐变y0坐标
 * @param {Object} x1		//渐变x1坐标
 * @param {Object} y1		//渐变y1坐标
 * @param {Object} color0	//开始渐变色
 * @param {Object} color1	//结束渐变色
 */
function lineGrad(ctx, x, y, w, h, x0, y0, x1, y1, color0, color1) {
	ctx.save();
	ctx.beginPath();

	const grad = ctx.createLinearGradient(x0, y0, x1, y1);

	grad.addColorStop(0, color0);
	grad.addColorStop(1, color1);
	ctx.fillStyle = grad;
	ctx.fillRect(x, y, w, h);

	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

/**
 * @description 图片绘制
 * @param {Object} ctx	//画笔
 * @param {Object} img	//图片路径
 * @param {Object} x	//坐标
 * @param {Object} y	//y坐标
 * @param {Object} w	//宽度
 * @param {Object} h	
 */
function drawImage(ctx, img, x, y, w, h) {
	ctx.save();
	ctx.beginPath()
	ctx.drawImage(img, x, y, w, h);
	ctx.restore();
}

/**
 * 绘制圆角矩形图片
 * @param {Object} ctx
 * @param {Object} img
 * @param {Object} x
 * @param {Object} y
 * @param {Object} w
 * @param {Object} h
 * @param {Object} r
 */
function roundRectImg(ctx, img, x, y, w, h, r) {
	ctx.save();
	ctx.beginPath()
	// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
	// ctx.setFillStyle('#ffffff')
	ctx.setStrokeStyle('transparent')
	// 左上角
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

	// border-top
	ctx.moveTo(x + r, y)
	ctx.lineTo(x + w - r, y)
	ctx.lineTo(x + w, y + r)
	// 右上角
	ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

	// border-right
	ctx.lineTo(x + w, y + h - r)
	ctx.lineTo(x + w - r, y + h)
	// 右下角
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

	// border-bottom
	ctx.lineTo(x + r, y + h)
	ctx.lineTo(x, y + h - r)
	// 左下角
	ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

	// border-left
	ctx.lineTo(x, y + r)
	ctx.lineTo(x + r, y)

	// 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
	ctx.fill()
	// ctx.stroke()
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(img, x, y, w, h);
	ctx.fillRect(0, 0, w, h)
	ctx.restore();
}

//绘制一条横线
function lineThrough(ctx, x, y, width, lineWidth, color) {
	ctx.restore();
	ctx.save();
	ctx.moveTo(x, y);
	ctx.lineTo(x + width, y);
	ctx.strokeWidth = lineWidth;
	ctx.strokeStyle = '#88909C';
	ctx.setFillStyle('#ffffff')
	ctx.fill() //保证图片无bug填充
	ctx.stroke();
	ctx.restore();
}

/**
 * @description 圆角图片绘制
 * @param {Object} ctx				//画笔
 * @param {Object} img				//图片路径
 * @param {Object} x				//x坐标
 * @param {Object} y				//y坐标
 * @param {Object} r				//图片半径
 * @param {Object} borderWidth		//边框宽度
 * @param {Object} borderColor		//边框颜色
 */
function circleImg(ctx, img, x, y, r, borderWidth, borderColor) {
	ctx.save();
	ctx.beginPath();
	var d = 2 * r;
	var cx = x + r;
	var cy = y + r;
	ctx.arc(cx, cy, r, 0, 2 * Math.PI);
	ctx.setFillStyle('transparent')
	ctx.fill();
	ctx.clip();
	ctx.drawImage(img, x, y, d, d);
	ctx.restore();
}

function drawCircle(ctx, x, y, r, color) {
	ctx.save();
	ctx.setLineWidth(0);
	ctx.setFillStyle(color);
	ctx.setFillStyle('#ffffff');
	let cx = x;
	let cy = y;
	ctx.arc(cx, cy, r, 0, 2 * Math.PI);
	ctx.fill();
	ctx.restore();
}

/**
 * @description 文本绘制
 * ctx: 画笔
 * @param 	{String}	str				//文本  
 * @param 	{Number}	x				//x坐标  
 * @param 	{Number}	y				//y坐标  
 * @param 	{Number}	fontSize		//字体大小 
 * @param 	{String}	color			//字体
 * @param 	{Number}	maxWidth		//最大宽度
 * @param 	{String}	align='left'	//对齐方式
 */
function drawText(ctx, str, x, y, fontSize, color, maxWidth, align = "left") {
	try {
		ctx.save();
		ctx.setFontSize(fontSize);
		ctx.setFillStyle(color);
		ctx.setTextAlign(align);
		let _strLastIndex = 0;
		let _strlineW = 0;
		for (let i = 0; i < str.length; i++) {
			_strlineW += ctx.measureText(str[i]).width;
			if (_strlineW > maxWidth) {
				ctx.fillText(str.substring(_strLastIndex, i), x, y);
				_strlineW = 0;
				_strLastIndex = i;
			} else if (i == str.length - 1) {
				ctx.fillText(str.substring(_strLastIndex, i + 1), x, y);
				_strlineW = 0;
			}
		}
		ctx.restore();
	} catch (e) {
		console.log('出现异常', e);
	}
}

function drawTextWrap(ctx, str, x, y, fontSize, color, maxWidth, maxLines = 0, align = "left") {
	ctx.save();
	ctx.setFontSize(fontSize); //设置标题字体大小
	ctx.setFillStyle(color); //设置标题文本颜色
	let _strLastIndex = 0; //每次开始截取的字符串的索引
	let _strlineW = 0;
	let currLine = 0;
	console.log('maxLen', maxWidth, str);
	ctx.setTextAlign(align);
	for (let i = 0; i < str.length; i++) {
		let charCode = str.charCodeAt(i);
		if (charCode > 0 && charCode <= 128) { // 英文
			_strlineW += 0.5;
		} else {
			_strlineW += 1;
		}
		// console.log('------lineW', _strlineW);
		if (_strlineW > maxWidth) {
			// 超出行数限制不再显示
			if (maxLines > 0 && maxLines - 1 == currLine) {
				ctx.fillText(str.substring(_strLastIndex, i) + '...', x, y + currLine * (fontSize + 3));
				return;
			}
			ctx.fillText(str.substring(_strLastIndex, i), x, y + currLine * (fontSize + 3));

			_strlineW = 0;
			_strLastIndex = i;
			currLine++;
			console.log(y + currLine * fontSize);
		} else if (i == str.length - 1) {
			console.log(y + currLine * fontSize);
			ctx.fillText(str.substring(_strLastIndex, str.length), x, y + currLine * fontSize);
			_strlineW = 0;
		}
	}
	ctx.restore();
}


export {
	roundRectColor,
	roundRectBorderColor,
	circleImg,
	drawText,
	drawTextWrap,
	roundRectImg,
	drawCircle,
	lineThrough,
	drawLine,
	drawImage,
	lineGrad,
}
