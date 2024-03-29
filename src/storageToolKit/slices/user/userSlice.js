import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../Utils/Api";
import { openNotification } from "../../../Notification/Notification";


//объявление асинхронных action-ов
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
  async function(dataOutside,{getState, fulfillWithValue, rejectWithValue, extra:api}) {
    try {
        const data = await api.getUserInfo();
        console.log({data});
        return fulfillWithValue (data);
    } catch(error) {
        console.log(error);
        return rejectWithValue(error)

    }
});

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async function (dataOutside, {getState, rejectWithValue, fulfillWithValue, extra:api}) {
        try {
            const data = dataOutside.avatar ? await api.updateAvatar(dataOutside) : await api.updateUserInfo(dataOutside);
            openNotification("success", "Успешно", dataOutside.avatar ? "Ававтар успешно изменен" : "Данные успешно изменены");
            return fulfillWithValue(data);
    } catch(error) {
      openNotification("error", "error", "Не удалось изменить данные");
        return rejectWithValue(error)
    }
    }
);
const isError = (action) => {
return action.type.endsWith('rejected')
}

//объявление изначального стейта(состояния)
const initialState = {
    data: {},
    loading: false,
    error: null,
    test: undefined
};

// создание слайса(кусочка общего стейта) user
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => 
    {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(updateUser.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        // builder.addCase(updateUser.rejected, (state,action) => {
        //     console.log({state,action});
        //     state.error = action.payload;
        //     state.loading = false;
        // });
        builder.addMatcher(isError, (state,action) => {
            state.error = (action.payload);
            state.loading = false;
            openNotification("error", "error", "Ошибка загрузки");
        });
    
    }
});

export default userSlice.reducer