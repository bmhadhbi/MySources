import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppDialogComponent } from './dialog/dialog.component';
import { AppDividerComponent } from './divider/divider.component';
import { AppExpansionComponent } from './expansion/expansion.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppPaginatorComponent } from './paginator/paginator.component';
import { AppProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { AppProgressComponent } from './progress/progress.component';
import { AppRipplesComponent } from './ripples/ripples.component';
import { AppSlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { AppSliderComponent } from './slider/slider.component';
import { AppSnackbarComponent } from './snackbar/snackbar.component';
import { AppTabsComponent } from './tabs/tabs.component';
import { AppToolbarComponent } from './toolbar/toolbar.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'expansion',
        component: AppExpansionComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'dialog',
        component: AppDialogComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'divider',
        component: AppDividerComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'paginator',
        component: AppPaginatorComponent,
      },
      {
        path: 'progress',
        component: AppProgressComponent,
      },
      {
        path: 'progress-spinner',
        component: AppProgressSnipperComponent,
      },
      {
        path: 'ripples',
        component: AppRipplesComponent,
      },
      {
        path: 'slide-toggle',
        component: AppSlideToggleComponent,
      },
      {
        path: 'slider',
        component: AppSliderComponent,
      },
      {
        path: 'snackbar',
        component: AppSnackbarComponent,
      },
      {
        path: 'tabs',
        component: AppTabsComponent,
      },
      {
        path: 'toolbar',
        component: AppToolbarComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
    ],
  },
];
