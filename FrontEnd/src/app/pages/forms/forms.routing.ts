import { Routes } from '@angular/router';

// Forms
import {
  AppAutocompleteComponent,
  AppButtonComponent,
  AppCheckboxComponent,
  AppDatepickerComponent,
  AppRadioComponent,
} from './form-elements';
import { AppFormHorizontalComponent } from './form-horizontal/form-horizontal.component';
import { AppFormLayoutsComponent } from './form-layouts/form-layouts.component';
import { AppFormVerticalComponent } from './form-vertical/form-vertical.component';
import { AppFormWizardComponent } from './form-wizard/form-wizard.component';

export const FormsRoutes: Routes = [
  {
    path: 'forms-elements',
    children: [
      {
        path: 'autocomplete',
        component: AppAutocompleteComponent,
        
      },
      {
        path: 'button',
        component: AppButtonComponent,
        
      },
      {
        path: 'checkbox',
        component: AppCheckboxComponent,
       
      },

      {
        path: 'radio',
        component: AppRadioComponent,
       
      },
      {
        path: 'datepicker',
        component: AppDatepickerComponent,
        
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'form-layouts',
        component: AppFormLayoutsComponent,
        
      },
      {
        path: 'form-horizontal',
        component: AppFormHorizontalComponent,
       
      },
      {
        path: 'form-vertical',
        component: AppFormVerticalComponent,
       
      },
      {
        path: 'form-wizard',
        component: AppFormWizardComponent,
       
      },
    ],
  },
];
