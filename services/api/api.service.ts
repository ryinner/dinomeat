export async function request<T>(url: string, fetchSettings: RequestInit = {}): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    if (!url.includes('http')) {
      url = process.env.NEXT_PUBLIC_URL + url;
    }

    const res = await fetch(url, fetchSettings);

    if (res.ok) {
      resolve(await res.json());
    } else {
      reject(res);
    }
  })
}

export async function frontRequest<T>(...params: [...Parameters<typeof request>, { withMessage?: boolean }]): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    const [url, settings, frontSettings] = params;
    request<T>(url, settings).then(res => {
      if (frontSettings?.withMessage ?? false) {
        // PopUp
      }
      resolve(res);
    })
    .catch((err: Response) => {
      // PopUp or redirect
    });
  });
}

type BaseAnswer<Type> = {  
  [Property in keyof Type]: Type[Property];
}
