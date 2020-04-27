interface OrderSuggestedItem {
  name: string;
  description: string;
  price: number;
  id: string;
  created: Date;
  sender: Person;
  receiver: Person;
  type: string;
  movementType: string;
  packages: RowMTZTMI031OUT[];
  services: string[];
  saleOffice: string;
  source: string;
  freightTerm: string;
}
