interface Matched {
  offset: number;
  length: number;
}

interface L {
  lat: number;
  lng: number;
}

interface SuggestedItem {
  id: string;
  name: string;
  matched: Matched[];
  l: L;
}

interface SuggestedLocation {
  items: SuggestedItem[];
}
