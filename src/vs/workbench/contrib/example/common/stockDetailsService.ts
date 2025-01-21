/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { Emitter, Event } from '../../../../base/common/event.js';

/**
 * 定义服务接口和标识符
 */
export const IStockDetailsService = createDecorator<IStockDetailsService>('stockDetailsService');

/**
 * 股票详情接口
 */
export interface StockDetail {
	code: string;
}

/**
 * 股票详情服务接口
 */
export interface IStockDetailsService {
	readonly _serviceBrand: undefined; // 用于类型检查的标识，强制接口与服务绑定
	readonly onStockSelected: Event<StockDetail>;
	selectStock(stock: StockDetail): void;
}

/**
 * 股票详情服务实现
 */
export class StockDetailsService implements IStockDetailsService {
	public readonly _serviceBrand: undefined; // 实现接口要求

	private readonly _onStockSelected = new Emitter<StockDetail>();
	public readonly onStockSelected: Event<StockDetail> = this._onStockSelected.event;

	public selectStock(stock: StockDetail): void {
		this._onStockSelected.fire(stock);
	}
}
