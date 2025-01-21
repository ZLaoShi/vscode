/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import {
	ViewContainerLocation,
	IViewContainersRegistry,
	IViewsRegistry,
	Extensions
} from '../../../common/views.js';
import { ILocalizedString, localize } from '../../../../nls.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { ExampleViewContainer } from './views/exampleViewContainer.js';
import { ExampleView } from './views/exampleView.js';
import { AuxiliaryView } from './views/auxiliaryView.js';
import { AuiliaryViewContainer } from './views/auiliaryViewContainer.js';
import { PanelView } from './views/panelView.js';
import { PanelViewContainer } from './views/panelViewContainer.js';
import { IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { EditorExtensions } from '../../../common/editor.js';
import { StockDetailsEditor } from './editors/StockDetailsEditor.js';
import { StockDetailsInput } from './editors/StockDetailsInput.js';
import { IStockDetailsService, StockDetailsService } from '../common/stockDetailsService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';

// 注册消息传递服务
registerSingleton(IStockDetailsService, StockDetailsService, InstantiationType.Delayed);

// 如果需要为 Extensions 使用别名，可以在此处赋值
const ViewContainerExtensions = Extensions;
const ViewExtensions = Extensions;

// 注册图标
const exampleIcon = registerIcon(
	'example-view-icon',
	Codicon.beaker,
	localize('exampleViewIcon', 'Example View 的图标')
);

// 注册侧边栏视图容器
const viewContainer = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry).registerViewContainer(
	{
		id: 'workbench.view.example',
		title: { value: localize('example', '组合'), original: 'Example' },
		ctorDescriptor: new SyncDescriptor(ExampleViewContainer),
		icon: exampleIcon,
		order: 6,
	},
	ViewContainerLocation.Sidebar
);

// 定义视图选项
const exampleViewOptions: IViewPaneOptions = {
	id: 'exampleView',
	title: '示例视图',
};

//生成本地化字符串对象
function localizedString(key: string, defaultMessage: string, original: string): ILocalizedString {
	console.log(`Registering Example View Container... Key: ${key}`);
	// eslint-disable-next-line local/code-no-unexternalized-strings
	return { value: localize(key, defaultMessage), original };
}

// 注册侧边栏视图
Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews(
	[
		{
			id: 'exampleView',
			name: localizedString('exampleView', '示例视图', 'Example View'),
			ctorDescriptor: new SyncDescriptor(ExampleView, [exampleViewOptions]),
		},
	],
	viewContainer
);

// 注册 EditorPane
Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
	EditorPaneDescriptor.create(
		StockDetailsEditor, // 编辑器的类
		StockDetailsEditor.ID, // 编辑器唯一标识符hi
		localize('stockDetails', 'Stock Details') // 编辑器的本地化名称
	),
	[new SyncDescriptor(StockDetailsInput)] // 绑定的 EditorInput 类型
);

// 注册图标
const auxiliaryIcon = registerIcon(
	'auxiliary-view-icon',
	Codicon.beaker,
	localize('auxiliaryViewIcon', 'Auxiliary View Icon')
);

// 注册副侧边栏容器
const auxiliaryContainer = Registry.as<IViewContainersRegistry>(Extensions.ViewContainersRegistry).registerViewContainer(
	{
		id: 'workbench.view.auxiliaryExample',
		title: { value: localize('auxiliaryExample', '副侧边栏示例'), original: 'Auxiliary Example' },
		ctorDescriptor: new SyncDescriptor(AuiliaryViewContainer),
		icon: auxiliaryIcon,
		order: 1, // 确保显示顺序
		hideIfEmpty: true,// 如果没有视图则隐藏
	},
	ViewContainerLocation.AuxiliaryBar // 注册到副侧边栏
);

// 注册副侧边栏视图
Registry.as<IViewsRegistry>(Extensions.ViewsRegistry).registerViews(
	[
		{
			id: 'auxiliaryExampleView',
			name: localizedString('auxiliaryExampleView', '副侧边栏视图', 'auxiliaryExampleView'), // 使用 localize 返回的值
			ctorDescriptor: new SyncDescriptor(AuxiliaryView), // 使用 ExampleView 的类定义
		},
	],
	auxiliaryContainer
);

//注册底栏容器
const panelContainer = Registry.as<IViewContainersRegistry>(Extensions.ViewContainersRegistry).registerViewContainer(
	{
		id: 'workbench.view.panelExample',
		title: { value: localize('panelExample', '全部'), original: 'Panel Example' },
		ctorDescriptor: new SyncDescriptor(PanelViewContainer),
		icon: auxiliaryIcon,
		order: 6, // 确保显示顺序
		hideIfEmpty: true,// 如果没有视图则隐藏
	},
	ViewContainerLocation.Panel // 注册底栏
);

//注册底栏视图
Registry.as<IViewsRegistry>(Extensions.ViewsRegistry).registerViews(
	[
		{
			id: 'panelExample',
			name: localizedString('panelExample', '底栏视图', 'panelExample'),
			ctorDescriptor: new SyncDescriptor(PanelView),
		},
	],
	panelContainer
);



console.log('初始化完成');

