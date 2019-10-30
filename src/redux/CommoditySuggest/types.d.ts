interface CommoditySuggestedItem {
  name: string;
  description: string;
  price: number;
}

interface SuggestedCommodity {
  items: CommoditySuggestedItem[];
}
