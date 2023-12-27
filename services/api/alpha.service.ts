import { request } from './api.service';

const BASE_URL = 'https://alfa.rbsuat.com/payment/';

export function register (query: AlphaApi.Rest.Register.Request) {
  const { amount, ...body } = query;

  const url = new URLSearchParams({
    userName: process.env.APLHA_LOGIN,
    password: process.env.APLHA_PASSWORD,
    amount: String(amount * 100),
    ...body
  })

  return request<AlphaApi.Rest.Register.Response>(`${BASE_URL}/rest/register.do?${url.toString()}`, {
    method: 'GET',
  });
}

export declare namespace AlphaApi {
  namespace Rest {
    namespace Register {
      interface Request {
        amount: number;
        orderNumber: string;
        returnUrl: string;
        email: string;
        postAddress: string;
      }
      interface Response {
        orderId: number;
        formUrl: string;
        errorCode: number;
        errorMessage: string;
      }
    }
  }
}
