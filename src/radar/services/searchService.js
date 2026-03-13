import { commerces } from '../../data/commerces';

export const searchCommerces = query =>
  commerces.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
