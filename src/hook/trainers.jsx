// src/store/slices/trainersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/api";
import { Pagination } from "react-bootstrap";

export const fetchTrainers = createAsyncThunk(
  "trainers/fetchTrainers",
  async (_, thunkAPI) => {
    try {
      
      // const params = new URLSearchParams();
      const state = thunkAPI.getState(); // Access Redux state
      const response = await axios.get(
        // `${API_URL}/trainer/admin/trainers?paginated=10&page=${page}`,
        `${API_URL}/trainers`, 
      );
console.log(response.data.data,"response.data.data");

      return response.data.data;
    } catch (error) {
    console.log("Axios Error:", error);
    console.log("Response:", error.response);
    console.log("Request:", error.request);
    console.log("Message:", error.message);

    return thunkAPI.rejectWithValue(error.message);
}
  }
);
export const fetchTrainer = createAsyncThunk(
  "trainers/fetchTrainer",
  async (trainerID, thunkAPI) => {
    
    try {
      // const params = new URLSearchParams();
      const state = thunkAPI.getState(); // Access Redux state



      const response = await axios.get(
        `${API_URL}/admin/trainers/${trainerID}`,
        {
          headers: {
            Authorization: `Bearer ${state.auth.userArray.access_token}`,
          },
        }
      );
console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors
          ? Object.values(error.response.data.errors)[0][0]
          : "حدث خطأ أثناء جلب العقارات"
      );
    }
  }
);
export const addTrainer = createAsyncThunk(
  "trainers/addTrainer",
  async (trainerData, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); // Access Redux state

      const response = await axios.post(`${API_URL}/trainers`, trainerData, {
        headers: {
          Authorization: `Bearer ${state.auth.userArray.access_token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log(error?.response?.data?.errors,"error.response?.data");
      return thunkAPI.rejectWithValue(Object.values(error.response.data.errors)[0][0] || "فشل إضافة الصف");
    }
  }
);
export const updateTrainer = createAsyncThunk(
  "trainers/updateTrainer",
  async (trainerData, thunkAPI) => {
    
    try {
      const state = thunkAPI.getState(); // Access Redux state

      const response = await axios.put(`${API_URL}/trainers/${trainerData?.id}`, trainerData, {
        headers: {
          Authorization: `Bearer ${state.auth.userArray.access_token}`,
        },
      });
      console.log(response.data.data,"response.data.dataresponse.data.data");
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(Object.values(error.response.data.errors)[0][0] || "فشل إضافة الصف");
    }
  }
);export const deleteTrainer = createAsyncThunk(
  "trainers/deleteTrainer",
  async (trainerID, thunkAPI) => {
    console.log(trainerID,"trainerData");
    
    try {
      const state = thunkAPI.getState(); // Access Redux state

      const response = await axios.delete(`${API_URL}/trainers/${trainerID}`);
      console.log(response.data.data);
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "فشل إضافة الصف");
    }
  }
);

const trainersSlice = createSlice({
  name: "trainers",
  initialState: {
    list: [],
      singleTrainer: null,
Pagination:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      .addCase(fetchTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTrainer = action.payload;
      })
      .addCase(fetchTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(addTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrainer.fulfilled, (state, action) => {
        state.loading = false;
        // state.list.push(action.payload);
      })
      .addCase(addTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(updateTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(deleteTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.loading = false;
        // state.list.push(action.payload);
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default trainersSlice.reducer;
