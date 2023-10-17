export async function getData(url: string, fetchSettings?: RequestInit): Promise<object> {
  const res = await fetch(url, fetchSettings);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}
