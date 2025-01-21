/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ViewPaneContainer } from '../../../../browser/parts/views/viewPaneContainer.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IConfigurationService } from '../../../../../platform/configuration/common/configuration.js';
import { IExtensionService } from '../../../../services/extensions/common/extensions.js';
import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
import { IStorageService } from '../../../../../platform/storage/common/storage.js';
import { IWorkbenchLayoutService } from '../../../../services/layout/browser/layoutService.js';
import { IContextMenuService } from '../../../../../platform/contextview/browser/contextView.js';
import { IViewDescriptorService } from '../../../../common/views.js';
import { IWorkspaceContextService } from '../../../../../platform/workspace/common/workspace.js';


export class AuiliaryViewContainer extends ViewPaneContainer {
	constructor(
		@IInstantiationService instantiationService: IInstantiationService,
		@IConfigurationService configurationService: IConfigurationService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IExtensionService extensionService: IExtensionService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IWorkspaceContextService contextService: IWorkspaceContextService
	) {
		super(
			'workbench.view.auxiliaryExample',
			{ mergeViewWithContainerWhenSingleView: true },
			instantiationService,
			configurationService,
			layoutService,
			contextMenuService,
			telemetryService,
			extensionService,
			themeService,
			storageService,
			contextService,
			viewDescriptorService
		);
	}

	override getTitle(): string {
		return ''; // 返回空字符串，确保没有容器标题和冒号
	}

}
