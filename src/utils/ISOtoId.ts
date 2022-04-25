export default function ISOtoId(isoId: string): number {
  switch (isoId) {
    case 'fr':
      return 1;
    case 'en':
      return 2;
    default:
      return 2;
  }
}
