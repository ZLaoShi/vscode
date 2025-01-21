/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class HttpService {
	async fetchJson(url: string, options: RequestInit = {}): Promise<any> {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
		}
		return response.json();
	}

	async fetchText(url: string, options: RequestInit = {}): Promise<string> {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
		}
		return response.text();
	}

	async fetchPostJson(url: string, body: any, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<any> {
		console.log('Fetching data with body:', body);
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
		}
		return response.json();
	}

	// 新增 GET 方法
	async fetchGetJson(
		url: string,
		params: Record<string, string> = {},
		headers: Record<string, string> = {}
	): Promise<any> {
		// 将参数转换为查询字符串
		const queryString = new URLSearchParams(params).toString();

		// 添加请求头
		const customHeaders = {
			...headers,
			'ngrok-skip-browser-warning': 'true', // 跳过 ngrok 的警告页面
		};

		// 发送 GET 请求
		const response = await fetch(`${url}?${queryString}`, {
			method: 'GET',
			headers: customHeaders, // 添加自定义请求头
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
		}

		// 返回 JSON 格式的响应
		try {
			return await response.json();
		} catch (err) {
			const text = await response.text(); // 尝试获取原始响应
			console.error('Failed to parse JSON:', err, 'Response text:', text);
			throw new Error('Invalid JSON response');
		}
	}
}

// 导出单例
export const httpService = new HttpService();
