export default function toBool(value: string): boolean {
  return ['true', '1', 'yes', 'y', 'on'].includes((value).toLowerCase());
}
