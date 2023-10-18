export async function request<T>(url: string, fetchSettings?: RequestInit): Promise<BaseAnswer<T> & { status: number }> {
  if (!url.includes('http')) {
    url = process.env.NEXT_PUBLIC_APP_PATH + url;
  }
  const res = await fetch(url, fetchSettings);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

type BaseAnswer<Type> = {  
  [Property in keyof Type]: Type[Property];
}
