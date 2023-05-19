import { Component, OnInit } from '@angular/core';
import { Currency, Rate } from './models';
import { ExchangeService } from './services/exchange.service';
import {
  faGithub,
  faTelegram,
  faLinkedin,
  faGg,
} from '@fortawesome/free-brands-svg-icons';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  logoIcon = faGg;
  rates: Rate[] = [];
  links = [
    {
      icon: faGithub,
      label: 'github',
      href: 'https://github.com/marisereda/currency-converter',
    },
    {
      icon: faTelegram,
      label: 'telegram',
      href: 'https://t.me/MarynaSereda',
    },
    {
      icon: faLinkedin,
      label: 'linkedin',
      href: 'https://www.linkedin.com/in/maryna-sereda',
    },
  ];

  constructor(
    private exchangeService: ExchangeService,
    public errorService: ErrorService
  ) {}

  ngOnInit(): void {
    ['USD', 'EUR'].forEach((currency) =>
      this.exchangeService
        .getRate(currency as Currency, 'UAH')
        .subscribe((rate) => {
          if (!rate) {
            return;
          }
          this.rates.push(rate);
        })
    );
  }

  getRate(currency: Currency) {
    const rate = this.rates.find((rate) => rate.base_code === currency);
    return rate?.conversion_rate;
  }
}
