import { toast } from 'react-toastify';

export async function request<T>(
  url: string,
  fetchSettings: RequestInit = {}
): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("http")) {
      url = process.env.NEXT_PUBLIC_URL + url;
    }

    try {
      const res = await fetch(url, fetchSettings);
      if (res.ok) {
        resolve(await res.json());
      } else {
        reject(res);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
  });
}

export async function frontRequest<T>(
  ...params: [...Parameters<typeof request>, { withMessage?: boolean }]
): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    const [url, settings, frontSettings] = params;
    request<T>(url, settings)
      .then((res) => {
        if (frontSettings?.withMessage ?? false) {
          toast(res.message ?? 'Успешно');
        }
        resolve(res);
      })
      .catch(async (err: Response) => {
        switch (err.status) {
          case 404:
            break;
          default:
            const res = await err.json();
            toast(res.message);
            break;
        }
      });
  });
}

type BaseAnswer<Type> = {
  [Property in keyof Type]: Type[Property];
} & { message: string };
