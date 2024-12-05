const FetchRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    console.log('response:', url, response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }

    // Nếu không có dữ liệu trả về (status 204 hoặc không có content-type JSON)
    if (response.status === 204 || !response.headers.get('Content-Type')?.includes('application/json')) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error in fetchRequest:', error);
    throw error;
  }
};

export default FetchRequest;