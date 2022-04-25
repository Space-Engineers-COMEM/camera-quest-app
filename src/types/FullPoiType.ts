import TranslationType from './Translation';

export default interface FullPoiType {
  type: string;
  content: {
    poi: {
      id: number;
      exhibition_number: number;
      title: string;
      manufacturer: string;
      periode: string;
      archived: boolean;
      area: number;
      image_url: string;
      image_name: string;
      location: string;
    };
    translations: Array<TranslationType>;
    resources: [
      {
        id: number;
        url: string;
        name: string;
        id_poi: number;
        id_lang: number;
      }
    ];
    tags: [
      {
        id: number;
        name: string;
      }
    ];
  };
}
