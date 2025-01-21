/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IViewPaneOptions, ViewPane } from '../../../../browser/parts/views/viewPane.js';

import { IKeybindingService } from '../../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../../platform/contextkey/common/contextkey.js';
import { IViewDescriptorService } from '../../../../common/views.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IOpenerService } from '../../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
import { IAccessibleViewService } from '../../../../../platform/accessibility/browser/accessibleView.js';
import { IHoverService } from '../../../../../platform/hover/browser/hover.js';
import * as DOM from '../../../../../base/browser/dom.js';
import { URI } from '../../../../../base/common/uri.js';

import './media/exampleViewContainer.css';
import { IEditorService } from '../../../../services/editor/common/editorService.js';
import { StockDetailsInput } from '../editors/StockDetailsInput.js';
import { IWorkbenchLayoutService, Parts } from '../../../../services/layout/browser/layoutService.js';
import { IStockDetailsService, StockDetail } from '../../common/stockDetailsService.js';
import { httpService } from '../../common/stockHttpService.js';

export class ExampleView extends ViewPane {
	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IHoverService hoverService: IHoverService,
		@IAccessibleViewService accessibleViewService: IAccessibleViewService,
		@IEditorService private readonly editorService: IEditorService,
		@IStockDetailsService private readonly stockDetailsService: IStockDetailsService
	) {
		super(
			options,
			keybindingService,
			contextMenuService,
			configurationService,
			contextKeyService,
			viewDescriptorService,
			instantiationService,
			openerService,
			themeService,
			telemetryService,
			hoverService,

		);

		// 监听活动编辑器的变化
		this.editorService.onDidActiveEditorChange(() => this.onActiveEditorChange());
	}

	// override async renderBody(container: HTMLElement): Promise<void> {
	// 	super.renderBody(container);

	// 	// Maintain existing static data and rendering logic
	// 	const ul = DOM.$('ul');
	// 	ul.classList.add('stock-list');

	// 	const data = [
	// 		{ name: 'Stock A', code: '000001', price: 100 },
	// 		{ name: 'Stock B', code: '000002', price: 200 },
	// 		{ name: 'Stock C', code: '000003', price: 300 },
	// 		{ name: 'Stock D', code: '000004', price: 400 },
	// 		{ name: 'Stock E', code: '000005', price: 500 },
	// 	];

	// 	for (const stock of data) {
	// 		const li = DOM.$('li');
	// 		li.textContent = `${stock.name} (${stock.code}) ¥${stock.price.toFixed(2)}`;
	// 		li.classList.add('stock-item');
	// 		li.addEventListener('click', () => {
	// 			this.openStockDetails(stock);
	// 		});
	// 		ul.appendChild(li);
	// 	}

	// 	container.appendChild(ul);

	// 	// Perform a GET request to fetch composite query data
	// 	const apiUrl = 'https://c3c5-106-86-153-106.ngrok-free.app/composite/query-composite';
	// 	const queryParams = { user_id: '100093' };

	// 	try {
	// 		console.log('Fetching composite query data...');
	// 		const response = await httpService.fetchGetJson(apiUrl, queryParams); // Make the GET API call
	// 		console.log('Composite Query API Response:', response); // Print the JSON response to the console
	// 	} catch (error) {
	// 		console.error('Error fetching composite query data:', error); // Handle and log errors
	// 	}

	// 	console.log('RenderBody execution completed');
	// }

	override async renderBody(container: HTMLElement): Promise<void> {
		super.renderBody(container);

		// **渲染静态数据的死列表**
		const staticUl = DOM.$('ul');
		staticUl.classList.add('stock-list');

		const staticData = [
			{ name: 'Stock A', code: '000001', price: 100 },
			{ name: 'Stock B', code: '000002', price: 200 },
			{ name: 'Stock C', code: '000003', price: 300 },
			{ name: 'Stock D', code: '000004', price: 400 },
			{ name: 'Stock E', code: '000005', price: 500 },
		];

		for (const stock of staticData) {
			const li = DOM.$('li');
			li.textContent = `${stock.name} (${stock.code}) ¥${stock.price.toFixed(2)}`;
			li.classList.add('stock-item');
			li.addEventListener('click', () => {
				this.openStockDetails(stock); // 点击时处理股票详情逻辑
			});
			staticUl.appendChild(li);
		}

		container.appendChild(staticUl); // 将静态列表添加到容器中

		// **动态渲染从 API 获取的 strategy_name 列表**
		const dynamicUl = DOM.$('ul');
		dynamicUl.classList.add('stock-list'); // 添加样式类
		container.appendChild(dynamicUl); // 先附加空的动态列表，避免阻塞渲染

		// 发起 GET 请求获取后端数据
		const apiUrl = 'https://c3c5-106-86-153-106.ngrok-free.app/composite/query-composite';
		const queryParams = { user_id: '100093' };

		try {
			console.log('Fetching composite query data...');
			const response = await httpService.fetchGetJson(apiUrl, queryParams); // 发起 API 调用
			console.log('Composite Query API Response:', response);

			// 解析返回的数据
			const strategyData = response?.data || [];
			for (const strategy of strategyData) {
				const li = DOM.$('li');
				li.textContent = `${strategy.strategy_name}`; // 使用 strategy_name 作为显示内容
				li.classList.add('stock-item');
				li.addEventListener('click', () => {
					console.log(`Selected strategy: ${strategy.strategy_name}`); // 点击时打印选中的组合
				});
				dynamicUl.appendChild(li); // 将列表项添加到动态列表中
			}
		} catch (error) {
			console.error('Error fetching composite query data:', error); // 处理 API 调用错误
		}

		console.log('RenderBody execution completed');
	}



	private openStockDetails(stock: { name: string; code: string; price: number }): void {
		if (!stock.code || stock.code.trim() === '') {
			console.error('无法打开股票详情：股票代码为空');
			return;
		}

		console.log(`准备打开股票详情: ${stock.name} (${stock.code})`);

		const uri = URI.parse(`stock-details://${stock.code}`); // 自定义 URI
		const editorInput = new StockDetailsInput(uri); // 创建新的输入实例

		const editorService = this.instantiationService.invokeFunction(accessor => accessor.get(IEditorService)); // 获取编辑器服务
		editorService.openEditor(editorInput, { pinned: true }).then(() => {
			console.log(`成功打开股票详情: ${stock.name} (${stock.code})`);
		}).catch(err => {
			console.error(`打开股票详情失败: ${err.message}`);
		});

		// 通知服务选中股票
		const stockDetailsService = this.instantiationService.invokeFunction(accessor => accessor.get(IStockDetailsService));

		stockDetailsService.selectStock(stock);

		// 打开副侧边栏
		const layoutService = this.instantiationService.invokeFunction(accessor => accessor.get(IWorkbenchLayoutService));
		layoutService.setPartHidden(false, Parts.AUXILIARYBAR_PART); // 打开副侧边栏
	}

	private onActiveEditorChange(): void {
		const activeEditor = this.editorService.activeEditor;
		console.log('活动编辑器已更改:', activeEditor);
		if (activeEditor instanceof StockDetailsInput) {
			const stockDetail: StockDetail = {
				code: activeEditor.getCode() // 创建包含 code 的对象
			};
			this.stockDetailsService.selectStock(stockDetail); // 传递对象
		}
	}

	override layoutBody(height: number, width: number): void {
		// 布局逻辑，如果需要调整高度和宽度
	}
}

