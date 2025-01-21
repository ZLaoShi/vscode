/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// import { EditorPane } from '../../../../browser/parts/editor/editorPane.js';
// import { Dimension } from '../../../../../base/browser/dom.js';
// import { StockDetailsInput } from './StockDetailsInput.js';
// import { IWebviewService, IOverlayWebview } from '../../../../contrib/webview/browser/webview.js';
// import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
// import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
// import { IStorageService } from '../../../../../platform/storage/common/storage.js';
// import { CancellationToken } from '../../../../../base/common/cancellation.js';
// import { IEditorOptions } from '../../../../../platform/editor/common/editor.js';
// import { IEditorOpenContext } from '../../../../common/editor.js';
// import { IEditorGroup } from '../../../../services/editor/common/editorGroupsService.js';
// import * as DOM from '../../../../../base/browser/dom.js';

// export class StockDetailsEditor extends EditorPane {
// 	static readonly ID = 'workbench.editor.stockDetails';

// 	private webview: IOverlayWebview | null = null;

// 	constructor(
// 		group: IEditorGroup,
// 		@ITelemetryService telemetryService: ITelemetryService,
// 		@IThemeService themeService: IThemeService,
// 		@IStorageService storageService: IStorageService,
// 		@IWebviewService private readonly webviewService: IWebviewService
// 	) {
// 		super(StockDetailsEditor.ID, group, telemetryService, themeService, storageService);
// 	}

// 	/**
// 	 * 创建编辑器容器并初始化 WebView。
// 	 */
// 	protected createEditor(parent: HTMLElement): void {
// 		// 使用 WebView 服务创建 IOverlayWebview 实例
// 		this.webview = this.webviewService.createWebviewOverlay({
// 			providedViewType: 'stockDetailsEditor',
// 			title: '股票详情',
// 			options: { retainContextWhenHidden: true },
// 			contentOptions: {
// 				allowScripts: true,
// 				localResourceRoots: [], // 根据需求设置本地资源根路径
// 			},
// 			extension: undefined,
// 		});

// 		// 将 WebView 定位到父元素
// 		if (this.webview) {
// 			// 获取当前激活的窗口
// 			const targetWindow = DOM.getActiveWindow();

// 			if (!targetWindow) {
// 				console.error('无法获取活动窗口');
// 				return;
// 			}

// 			// Claim WebView 所有权，绑定到目标窗口
// 			this.webview.claim(this, targetWindow as any, undefined);

// 			// 使用 layoutWebviewOverElement 方法，将 WebView 定位到 `parent`
// 			this.webview.layoutWebviewOverElement(parent, new Dimension(parent.offsetWidth, parent.offsetHeight));
// 		}

// 	}

// 	/**
// 	 * 设置编辑器输入并更新 WebView 内容。
// 	 */
// 	override async setInput(
// 		input: StockDetailsInput,
// 		options: IEditorOptions | undefined,
// 		context: IEditorOpenContext,
// 		token: CancellationToken
// 	): Promise<void> {
// 		await super.setInput(input, options, context, token);

// 		if (this.webview && input.resource) {
// 			const stockCode = input.getCode();

// 			if (!stockCode || stockCode.trim() === '') {
// 				this.renderErrorMessage('股票代码为空，请选择有效的股票。');
// 				return;
// 			}

// 			// 设置 WebView HTML 内容
// 			const htmlContent = this.generateWebviewContent(stockCode);
// 			this.webview.setHtml(htmlContent);
// 		}
// 	}

// 	/**
// 	 * 生成 WebView 的 HTML 内容。
// 	 */
// 	// private generateWebviewContent(stockCode: string): string {
// 	// 	return `
// 	//         <!DOCTYPE html>
// 	//         <html lang="en">
// 	//         <head>
// 	//             <meta charset="UTF-8">
// 	//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
// 	//             <title>股票详情</title>
// 	//             <style>
// 	//                 body {
// 	//                     font-family: Arial, sans-serif;
// 	//                     margin: 0;
// 	//                     padding: 20px;
// 	//                     background: #f5f5f5;
// 	//                     color: #333;
// 	//                 }
// 	//                 h1 {
// 	//                     font-size: 24px;
// 	//                     margin-bottom: 10px;
// 	//                 }
// 	//                 .info {
// 	//                     margin: 5px 0;
// 	//                 }
// 	//             </style>
// 	//         </head>
// 	//         <body>
// 	//             <h1>股票详情</h1>
// 	//             <div class="info">代码: ${stockCode}</div>
// 	//             <div class="info">价格: ¥123.45</div>
// 	//             <div class="info">涨跌幅: +3.21%</div>
// 	//         </body>
// 	//         </html>
// 	//     `;
// 	// }

// 	private generateWebviewContent(stockCode: string): string {
// 		return `
// 			<!DOCTYPE html>
// 			<html lang="en">
// 			<head>
// 				<meta charset="UTF-8">
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 				<title>股票详情</title>
// 				<style>
// 					body {
// 						font-family: Arial, sans-serif;
// 						margin: 0;
// 						padding: 20px;
// 						background: #f5f5f5;
// 						color: #333;
// 					}
// 					h1 {
// 						font-size: 24px;
// 						margin-bottom: 10px;
// 					}
// 					.info {
// 						margin: 5px 0;
// 					}
// 				</style>
// 			</head>
// 			<body>
// 				<h1>股票详情</h1>
// 				<div class="info">代码: ${stockCode}</div>
// 				<div id="price" class="info">价格: ¥加载中...</div>
// 				<div id="change" class="info">涨跌幅: 加载中...</div>

// 				<script>
// 					// 模拟异步获取股票数据
// 					setTimeout(() => {
// 						document.getElementById('price').textContent = '价格: ¥' + (Math.random() * 100).toFixed(2);
// 						document.getElementById('change').textContent = '涨跌幅: ' + (Math.random() * 10 - 5).toFixed(2) + '%';
// 					}, 1000);
// 				</script>
// 			</body>
// 			</html>
// 		`;
// 	}

// 	/**
// 	 * 渲染错误消息。
// 	 */
// 	private renderErrorMessage(message: string): void {
// 		if (this.webview) {
// 			const errorContent = `
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <title>错误</title>
//                 </head>
//                 <body>
//                     <h1 style="color: red;">错误</h1>
//                     <p>${message}</p>
//                 </body>
//                 </html>
//             `;
// 			this.webview.setHtml(errorContent);
// 		}
// 	}

// 	/**
// 	 * 布局调整。
// 	 */
// 	override layout(dimension: Dimension): void {
// 		if (this.webview && this.webview.container) {
// 			const webviewContainer = this.webview.container;

// 			// 设置 WebView 的宽高
// 			webviewContainer.style.width = `${dimension.width}px`;
// 			webviewContainer.style.height = `${dimension.height}px`;

// 			// 限制 WebView 到当前编辑器区域
// 			const clippingContainer = this.getContainer();
// 			if (clippingContainer) {
// 				this.webview.layoutWebviewOverElement(clippingContainer, dimension);
// 			}
// 		}
// 	}

// 	/**
// 	 * 清空输入内容。
// 	 */
// 	override clearInput(): void {
// 		if (this.webview) {
// 			this.webview.setHtml('<!DOCTYPE html><html><body></body></html>'); // 清空内容
// 		}
// 		super.clearInput();
// 	}
// }

import { EditorPane } from '../../../../browser/parts/editor/editorPane.js';
import { Dimension } from '../../../../../base/browser/dom.js';
import { StockDetailsInput } from './StockDetailsInput.js';
import { IWebviewService, IOverlayWebview } from '../../../../contrib/webview/browser/webview.js';
import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
import { IStorageService } from '../../../../../platform/storage/common/storage.js';
import { CancellationToken } from '../../../../../base/common/cancellation.js';
import { IEditorOptions } from '../../../../../platform/editor/common/editor.js';
import { IEditorOpenContext } from '../../../../common/editor.js';
import { IEditorGroup } from '../../../../services/editor/common/editorGroupsService.js';
import * as DOM from '../../../../../base/browser/dom.js';

import { FileAccess } from '../../../../../base/common/network.js';


export class StockDetailsEditor extends EditorPane {
	static readonly ID = 'workbench.editor.stockDetails';

	private webview: IOverlayWebview | null = null;

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IWebviewService private readonly webviewService: IWebviewService
	) {
		super(StockDetailsEditor.ID, group, telemetryService, themeService, storageService);
	}

	/**
	 * 创建编辑器容器并初始化 WebView。
	 */
	protected createEditor(parent: HTMLElement): void {
		this.webview = this.webviewService.createWebviewOverlay({
			providedViewType: 'stockDetailsEditor',
			title: '股票详情',
			options: { retainContextWhenHidden: true },
			contentOptions: {
				allowScripts: true,
				allowForms: true,
				localResourceRoots: [
					FileAccess.asFileUri('vs/workbench/contrib/example/browser/resources')
				], // 指定根路径
				enableCommandUris: true, // 允许命令 URI
			},
			extension: undefined,

		});

		if (this.webview) {
			const targetWindow = DOM.getActiveWindow();
			if (!targetWindow) {
				console.error('无法获取活动窗口');
				return;
			}
			this.webview.claim(this, targetWindow as any, undefined);
			this.webview.layoutWebviewOverElement(parent, new Dimension(parent.offsetWidth, parent.offsetHeight));
		}
	}

	/**
	 * 设置编辑器输入并更新 WebView 内容。
	 */
	override async setInput(
		input: StockDetailsInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken
	): Promise<void> {
		await super.setInput(input, options, context, token);

		if (this.webview && input.resource) {
			const stockCode = input.getCode();
			if (!stockCode || stockCode.trim() === '') {
				this.renderErrorMessage('股票代码为空，请选择有效的股票。');
				return;
			}

			// 获取 HTML路径
			const htmlPath = FileAccess.asBrowserUri('vs/workbench/contrib/example/browser/resources/index.html').toString();

			try {
				// 动态加载 HTML 文件内容
				const htmlContent = await fetch(htmlPath)
					.then(response => response.text())
					.then(html =>
						html
							.replace('[[STOCK_CODE]]', stockCode) // 替换股票代码
					);

				// 设置 Webview 的 HTML 内容
				this.webview.setHtml(htmlContent);


			} catch (error) {
				console.error('加载资源失败:', error);
				this.renderErrorMessage(`加载资源失败: ${error.message}`);
			}
		}
	}

	/**
	 * 渲染错误消息。
	 */
	private renderErrorMessage(message: string): void {
		if (this.webview) {
			const errorContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>错误</title>
                </head>
                <body>
                    <h1 style="color: red;">错误</h1>
                    <p>${message}</p>
                </body>
                </html>
            `;
			this.webview.setHtml(errorContent);
		}
	}

	/**
	 * 布局调整。
	 */
	override layout(dimension: Dimension): void {
		if (this.webview && this.webview.container) {
			const webviewContainer = this.webview.container;
			webviewContainer.style.width = `${dimension.width}px`;
			webviewContainer.style.height = `${dimension.height}px`;

			const clippingContainer = this.getContainer();
			if (clippingContainer) {
				this.webview.layoutWebviewOverElement(clippingContainer, dimension);
			}
		}
	}

	/**
	 * 清空输入内容。
	 */
	override clearInput(): void {
		if (this.webview) {
			this.webview.setHtml('<!DOCTYPE html><html><body></body></html>'); // 清空内容
		}
		super.clearInput();
	}


}



