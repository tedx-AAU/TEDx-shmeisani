const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  'http://localhost:5001';

export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token?: string
): Promise<any> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add token if provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const url = endpoint.startsWith('http')
      ? endpoint
      : `${API_URL}/${endpoint}`;
    const response = await fetch(url, options);

    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || response.statusText;
      const error = new Error(errorMessage);
      (error as any).responseData = responseData;
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error(`❌ API Request Failed:`, error);
    throw error;
  }
};
