import React, { useEffect, useReducer } from 'react';

interface Props {
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

const CallApi: React.FC<Props> = ({ urlOfApi, onDataReceive }) => {
    const [state, dispatch] = useReducer(apiReducer, initialState);

    // Hàm async để gọi API
    const fetchData = async () => {
        try {
            const response = await fetch(urlOfApi);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            onDataReceive(data);
        } catch (error: any) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
    };

    // Gọi API một lần khi component được mount
    useEffect(() => {
        fetchData();
    }, [urlOfApi]);

    // Hiển thị loading, error, hoặc data tùy vào trạng thái
    if (state.loading) {
        return <div>Loading...</div>;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    return <div>Data: {JSON.stringify(state.data)}</div>;
}

export default CallApi;
