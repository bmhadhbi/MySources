import { Routes } from '@angular/router';

// tables
import { AppBasicTableComponent } from './basic-table/basic-table.component';
import { AppDynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { AppExpandTableComponent } from './expand-table/expand-table.component';
import { AppFooterRowTableComponent } from './footer-row-table/footer-row-table.component';
import { AppHttpTableComponent } from './http-table/http-table.component';
import { AppMixTableComponent } from './mix-table/mix-table.component';
import { AppMultiHeaderFooterTableComponent } from './multi-header-footer-table/multi-header-footer-table.component';
import { AppPaginationTableComponent } from './pagination-table/pagination-table.component';
import { AppRowContextTableComponent } from './row-context-table/row-context-table.component';
import { AppSelectionTableComponent } from './selection-table/selection-table.component';
import { AppSortableTableComponent } from './sortable-table/sortable-table.component';
import { AppStickyColumnTableComponent } from './sticky-column-table/sticky-column-table.component';
import { AppStickyHeaderFooterTableComponent } from './sticky-header-footer-table/sticky-header-footer-table.component';
import { AppFilterableTableComponent } from './filterable-table/filterable-table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic-table',
        component: AppBasicTableComponent,
      },
      {
        path: 'dynamic-table',
        component: AppDynamicTableComponent,
      },
      {
        path: 'expand-table',
        component: AppExpandTableComponent,
      },
      {
        path: 'filterable-table',
        component: AppFilterableTableComponent,
      },
      {
        path: 'footer-row-table',
        component: AppFooterRowTableComponent,
      },
      {
        path: 'http-table',
        component: AppHttpTableComponent,
      },
      {
        path: 'mix-table',
        component: AppMixTableComponent,
      },
      {
        path: 'multi-header-footer-table',
        component: AppMultiHeaderFooterTableComponent,
      },
      {
        path: 'pagination-table',
        component: AppPaginationTableComponent,
      },
      {
        path: 'row-context-table',
        component: AppRowContextTableComponent,
      },
      {
        path: 'selection-table',
        component: AppSelectionTableComponent,
      },
      {
        path: 'sortable-table',
        component: AppSortableTableComponent,
      },
      {
        path: 'sticky-column-table',
        component: AppStickyColumnTableComponent,
      },
      {
        path: 'sticky-header-footer-table',
        component: AppStickyHeaderFooterTableComponent,
      },
    ],
  },
];
