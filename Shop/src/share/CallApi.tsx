import React, { useEffect, useReducer } from "react";

// Định nghĩa kiểu cho props
interface Props {
  urlOfApi: string;
  onDataReceive: (data: any) => void; // Hàm callback để truyền dữ liệu về component cha
}

// Trạng thái ban đầu
const initialState = {
  data: null,
  loading: true,
  error: null,
};

// Reducer để quản lý trạng thái API
function apiReducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const CallApi: React.FC<Props> = ({ urlOfApi, onDataReceive }) => {
  // Quản lý trạng thái với useReducer
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Hàm async để gọi API
  const fetchData = async () => {
    try {
      const response = await fetch(urlOfApi); // Lấy URL từ props
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Dispatch action khi fetch thành công
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      // Truyền dữ liệu qua callback
      onDataReceive(data);
    } catch (error: any) {
      // Dispatch action khi xảy ra lỗi
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  // Gọi API khi component được mount hoặc URL thay đổi
  useEffect(() => {
    fetchData();
  }, [urlOfApi]);

  // Hiển thị loading, error, hoặc không render gì (dữ liệu được trả về qua callback)
  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return null; // Không hiển thị gì trong component này
};

export default CallApi;
