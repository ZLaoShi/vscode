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

import { IStockDetailsService, StockDetail } from '../../common/stockDetailsService.js';

export class PanelView extends ViewPane {
	private stockDetailContainer: HTMLElement | undefined;

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
		@IStockDetailsService private readonly stockDetailsService: IStockDetailsService // 注入股票消息传递服务
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
			hoverService
		);

		// 订阅股票选中事件
		this.stockDetailsService.onStockSelected(this.handleStockSelected, this);
	}

	override renderBody(container: HTMLElement): void {
		super.renderBody(container);

		// 创建容器，用于显示股票详情
		this.stockDetailContainer = DOM.$('div', { class: 'stock-detail' });
		container.appendChild(this.stockDetailContainer);

		// 初始化时显示默认信息
		this.stockDetailContainer.textContent = '请选择股票以查看详情';
	}

	private handleStockSelected(stock: StockDetail): void {
		// 更新容器内容
		if (this.stockDetailContainer) {
			this.stockDetailContainer.textContent = `股票代码: ${stock.code}`;
		}
	}

	override layoutBody(height: number, width: number): void {
		// 布局逻辑，如果需要调整高度和宽度
	}
}
