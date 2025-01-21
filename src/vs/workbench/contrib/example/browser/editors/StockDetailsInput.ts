/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from '../../../../../base/common/uri.js';
import { EditorInput } from '../../../../common/editor/editorInput.js';


export class StockDetailsInput extends EditorInput {
	static readonly ID = 'workbench.stockDetails.input';

	// 修改为 public
	public readonly resource: URI;

	constructor(resource: URI) {
		super();

		// 打印传入的 URI，无论是否有效
		console.log(`StockDetailsInput 创建: ${resource ? resource.toString() : 'undefined'}`);

		this.resource = resource;
	}

	override get typeId(): string {
		return StockDetailsInput.ID;
	}

	override getName(): string {
		// 获取股票代码部分
		const stockCode = this.resource.toString().replace(/^stock-details:\/\/+/, ''); // 移除前缀 'stock-details://'
		return `${stockCode}`; // 自定义标题
	}

	public getCode(): string {
		// 从 URI 中提取股票代码，移除前缀 'stock-details://'
		return this.resource.toString().replace(/^stock-details:\/\/+/, '');
	}

	override matches(other: EditorInput): boolean {
		return other instanceof StockDetailsInput && this.resource.toString() === other.resource.toString();
	}
}
