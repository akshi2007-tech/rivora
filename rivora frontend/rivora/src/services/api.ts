type ApiSuccess<T> = { success: true; data: T; message?: string };
type ApiError = { success: false; message: string };

type JsonValue = Record<string, unknown> | unknown[] | string | number | boolean | null;

type ApiResponse<T> = ApiSuccess<T> | ApiError;

const API_BASE = import.meta.env.VITE_API_URL || '';

const request = async <T>(path: string, options: RequestInit = {}): Promise<ApiSuccess<T>> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const payload = (await res.json().catch(() => ({}))) as ApiResponse<T> | JsonValue;

  const getErrorMessage = (value: unknown): string => {
    if (value && typeof value === 'object' && 'message' in value && typeof value.message === 'string') {
      return value.message;
    }
    return 'Request failed';
  };

  if (!res.ok) {
    throw new Error(getErrorMessage(payload));
  }

  if (!payload || typeof payload !== 'object' || !('success' in payload)) {
    return { success: true, data: payload as T };
  }

  if (payload.success === false) {
    throw new Error(getErrorMessage(payload));
  }

  return payload as ApiSuccess<T>;
};

export const authApi = {
  login: (payload: { email: string; password: string; role: string }) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(`/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};

export const patientApi = {
  create: (payload: Record<string, unknown>) =>
    request<Record<string, unknown>>('/api/patients', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};

export const getAuthToken = (): string | null => localStorage.getItem('rivora_auth_token');
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('rivora_auth_token', token);
  } else {
    localStorage.removeItem('rivora_auth_token');
  }
};
