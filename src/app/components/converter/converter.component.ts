import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models';
import { ExchangeService } from 'src/app/services/exchange.service';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit {
  currencies: Currency[] = ['EUR', 'USD', 'UAH', 'GBP', 'ILS', 'PLN'];
  base: { amount: number | null; currency: Currency } = {
    amount: null,
    currency: 'USD',
  };
  target: { amount: number | null; currency: Currency } = {
    amount: null,
    currency: 'UAH' as Currency,
  };
  rate: number | null = null;
  faArrowsRotate = faArrowsRotate;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.handleCurrencyChange(true);
  }

  handleCurrencySwap() {
    [this.base.currency, this.target.currency] = [
      this.target.currency,
      this.base.currency,
    ];
    this.handleCurrencyChange(true);
  }

  handleAmountChange(isBaseChanged: boolean) {
    this.recalculateAmount(isBaseChanged);
  }

  handleCurrencyChange(isBaseChanged: boolean) {
    if (this.base.currency === this.target.currency) {
      this.rate = 1;
      this.recalculateAmount(isBaseChanged);
      return;
    }
    this.exchangeService
      .getRate(this.base.currency, this.target.currency)
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this.rate = data.conversion_rate;
        this.recalculateAmount(isBaseChanged);
      });
  }

  recalculateAmount(isBaseChanged: boolean) {
    if (!this.rate) {
      return;
    }
    if (isBaseChanged) {
      this.target.amount =
        Math.round((this.base.amount ?? 0) * this.rate * 100) / 100 || null;
    } else {
      this.base.amount =
        Math.round(((this.target.amount ?? 0) / this.rate) * 100) / 100 || null;
    }
  }
}
