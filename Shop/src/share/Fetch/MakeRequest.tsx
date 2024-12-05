import FetchRequest from "./FetchRequest";

const MakeRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    headers: Record<string, string> = { 'Content-Type': 'application/json', 'Accept': '*/*' }
  ) => {
    const options: RequestInit = {
      method,
      headers,
    };
  
    // Chỉ thêm `body` nếu cần thiết (POST, PUT...)
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    return await FetchRequest(url, options);
  };

export default MakeRequest;

  