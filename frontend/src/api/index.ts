export const apiUrl = 'http://localhost:80/api';

export async function api<T>(url: string, method: string, body?: object | FormData | string, options?: RequestInit): Promise<T> {
  try {
    const headers = {
      'Accept': 'application/json',
      ...options?.headers,
    };

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      body = body ? JSON.stringify(body) : undefined;
    }

    if (localStorage.getItem('user')) { 
      const user = JSON.parse(localStorage.getItem('user') ?? "");
      headers['Authorization'] = `Bearer ${user?.token}`;
    }

    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers,
      body,
      ...options,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Error en la solicitud');
    }

    const res = await response.json();
    return res.data ?? res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Ocurrió un error desconocido:", err);
    }
    throw err;
  }
}

export async function get<T>(url: string): Promise<T> {
  return await api(url, 'GET');
}

export async function post<T>(url: string, body?: object | FormData | string, options?: RequestInit): Promise<T> {
  return await api(url, 'POST', body, options);
}

export async function put<T>(url: string, body?: object | FormData | string, options?: RequestInit): Promise<T> {
  return await api(url, 'PUT', body, options);
}