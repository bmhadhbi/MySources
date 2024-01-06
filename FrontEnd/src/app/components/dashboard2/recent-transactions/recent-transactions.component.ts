import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FeatherModule } from 'angular-feather';
import { NgFor } from '@angular/common';

interface transactions {
  id: number;
  iconColor: string;
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  status: string;
}

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [MaterialModule, FeatherModule, NgFor],
  templateUrl: './recent-transactions.component.html',
})
export class AppRecentTransactionsComponent {
  transactions: transactions[] = [
    {
      id: 1,
      iconColor: 'accent',
      icon: 'dollar-sign',
      title: 'PayPal Transfer',
      subtitle: 'Money Added',
      amount: '+$350',
      status: 'success',
    },
    {
      id: 2,
      iconColor: 'success',
      icon: 'shield',
      title: 'Wallet',
      subtitle: 'Bill Payment',
      amount: '-$560',
      status: 'error',
    },
    {
      id: 3,
      iconColor: 'error',
      icon: 'credit-card',
      title: 'Credit Card',
      subtitle: 'Money reversed',
      amount: '+$350',
      status: 'success',
    },
    {
      id: 4,
      iconColor: 'warning',
      icon: 'check',
      title: 'Bank Transfer',
      subtitle: 'Money Added',
      amount: '+$350',
      status: 'success',
    },
    {
      id: 5,
      iconColor: 'accent',
      icon: 'dollar-sign',
      title: 'Refund',
      subtitle: 'Payment Sent',
      amount: '-$50',
      status: 'error',
    },
  ];
}
