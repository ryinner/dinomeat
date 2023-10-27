// import { Session } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
// import { userFindOne } from '../orm/users.service';

export async function request<T>(url: string, fetchSettings: RequestInit = {}): Promise<BaseAnswer<T>> {
  return new Promise(async (resolve, reject) => {
    if (!url.includes('http')) {
      url = window.location.origin + url;
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

// export async function adminHandler<T>(req: NextRequest, params: T, session: null | Session, callback: (req: NextRequest, params: T) => unknown) {
//   if (!session) {
//     return NextResponse.json({ code: 401, message: 'Unauthorized' });
//   }

//   const user = await userFindOne({ where: { id: session.user.id } });

//   if (!user || !user.isAdmin) {
//     return NextResponse.json({ code: 403, message: 'Forbidden'})
//   }

//   return callback(req, params);
// }

type BaseAnswer<Type> = {  
  [Property in keyof Type]: Type[Property];
}
