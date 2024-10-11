import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { url } from 'inspector';

interface props {
    urlOfApi: string; // URL của API    
    onDataReceive: (data: any) => void; // Hàm callback nhận dữ liệu
}

// Khởi tạo state ban đầu
const initialState = {
    data: null,
    loading: true,
    error: null,
};

// Reducer để quản lý các hành động
function apiReducer(state: any, action: any) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

const CallApi: React.FC<props> = ({ urlOfApi, onDataReceive }) => {

    // Gọi useReducer với reducer và state ban đầu
    const [state, dispatch] = useReducer(apiReducer, initialState);

    // Hàm async để gọi API
    const fetchData = async () => {
        try {
            const response = await fetch(urlOfApi); // Sử dụng URL từ apiConfig.js
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Dispatch action khi fetch thành công
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            // Gọi hàm callback nhận dữ liệu từ component cha
            onDataReceive(data);
        } catch (error: any) {
            // Dispatch action khi có lỗi xảy ra
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
    };
    // Chỉ gọi API một lần khi component được mount
    useEffect(() => {
        fetchData();
    }, [urlOfApi]); // Gọi lại API nếu urlOfApi thay đổi

    // Hiển thị loading, error, hoặc data tùy vào trạng thái
    if (state.loading) {
        return <div>Loading...</div>;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }
}

export default CallApi