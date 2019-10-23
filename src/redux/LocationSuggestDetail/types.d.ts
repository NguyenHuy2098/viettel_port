interface Component {
  type: string;
  name: string;
  id: string;
  code: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Southwest {
  lat: number;
  lng: number;
}

interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

interface Geometry {
  location: Location;
  bounds: Bounds;
}

interface DetailSuggestedLocation {
  formattedAddress: string;
  components: Component[];
  geometry: Geometry;
  id: string;
}

// const example = {
//   formattedAddress: 'xóm 3 Thị trấn  Hưng Phú - Huyện Hưng Nguyên - Tỉnh Nghệ An',
//   components: [
//     { type: 'OTHER', name: 'xóm 3' },
//     { type: 'WARD', name: 'Hưng Phú', id: '18061', code: '44524' },
//     { type: 'DISTRICT', name: 'Hưng Nguyên', id: '431', code: 'NAHN' },
//     { type: 'PROVINCE', name: 'Nghệ An', id: '40', code: 'NAN' },
//   ],
//   geometry: {
//     location: { lat: 18.588281631469698, lng: 105.64567947387701 },
//     bounds: {
//       northeast: { lat: 18.6055393218994, lng: 105.654922485352 },
//       southwest: { lat: 18.57102394104, lng: 105.636436462402 },
//     },
//   },
//   id: '$eyJpIjoiMTgwNjEiLCJlIjoieMOzbSAzICJ9',
// };
