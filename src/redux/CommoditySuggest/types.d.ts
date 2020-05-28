interface CommoditySuggestedItem {
  name: string;
  description: string;
  price: number;
}

interface CommoditySuggestedItemInter {
  goodsValue: number;
  weight: number;
  name: string;
  quantity: number;
  commodityType: string;
}

interface SuggestedCommodity {
  items: CommoditySuggestedItem[];
}
