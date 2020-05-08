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
  packages: PackageItem[];
  services: string[];
  saleOffice: string;
  source: string;
  freightTerm: string;
}

interface PackageItem {
  name: string;
  description: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  note: string;
  packageType: string;
  quantity: number;
  category: string;
  weightUnit: string;
  goodsValue: number;
  currency: string;
  cod: number;
  dimensionUnit: string;
  commodityType: string;
  id: string;
}
