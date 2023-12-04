export function generateRandom (length: number = 6): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const hash: string[] = [];
  for (let i = 0; i < length; i++) {
      hash.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }

  return hash.join('');
}