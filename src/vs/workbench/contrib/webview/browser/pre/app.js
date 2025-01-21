/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
	// 模拟异步获取股票数据
	setTimeout(() => {
		document.getElementById('price').textContent = '价格: ¥' + (Math.random() * 100).toFixed(2);
		document.getElementById('change').textContent = '涨跌幅: ' + (Math.random() * 10 - 5).toFixed(2) + '%';
	}, 100);
});
