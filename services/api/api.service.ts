export async function getData(url: string, fetchSettings?: RequestInit): Promise<object> {
  if (!url.includes('http')) {
    url = process.env.NEXT_PUBLIC_APP_PATH + url;
  }
  const res = await fetch(url, fetchSettings);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}
