export type Currency = 'USD' | 'EUR' | 'GBP' | 'UAH' | 'GBP' | 'ILS' | 'PLN';

export interface Rate {
  base_code: Currency;
  target_code: Currency;
  conversion_rate: number;
}
