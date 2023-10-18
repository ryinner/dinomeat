export async function request<T>(url: string, fetchSettings?: RequestInit): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    if (!url.includes('http')) {
      url = process.env.NEXT_PUBLIC_APP_PATH + url;
    }
    const res = await fetch(url, fetchSettings);
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await res.json();
    if (res.status === 200) {
      resolve(result);
    } else {
      reject(result);
    }
  })
}

type BaseAnswer<Type> = {  
  [Property in keyof Type]: Type[Property];
}
