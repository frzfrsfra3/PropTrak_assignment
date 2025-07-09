import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetch from "../../utils/axiosCreate";

// إنشاء موعد زيارة جديد
export const createViewing = createAsyncThunk(
  "viewings/createViewing",
  async ({ propertyId, tenantId, scheduledTime, notes }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/viewings", {
        propertyId,
        tenantId,
        scheduledTime,
        notes
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "حدث خطأ أثناء إنشاء الموعد");
    }
  }
);

// الحصول على مواعيد الزيارة للمستأجر
export const getTenantViewings = createAsyncThunk(
  "viewings/getTenantViewings",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get("/viewings/tenant");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "حدث خطأ أثناء جلب المواعيد");
    }
  }
);

// الحصول على مواعيد الزيارة للمالك
export const getOwnerViewings = createAsyncThunk(
  "viewings/getOwnerViewings",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get("/viewings/owner");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "حدث خطأ أثناء جلب المواعيد");
    }
  }
);

// تحديث حالة الموعد
export const updateViewingStatus = createAsyncThunk(
  "viewings/updateViewingStatus",
  async ({ viewingId, status, feedback }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.patch(`/viewings/${viewingId}/status`, {
        status,
        feedback
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "حدث خطأ أثناء تحديث الموعد");
    }
  }
);

const initialState = {
  viewings: [],
  currentViewing: null,
  loading: false,
  error: null,
  success: false,
  alert: {
    show: false,
    type: null, // 'success' أو 'error'
    message: ''
  }
};

const viewingSlice = createSlice({
  name: "viewings",
  initialState,
  reducers: {
    clearViewingAlert: (state) => {
      state.alert.show = false;
      state.alert.type = null;
      state.alert.message = '';
    },
    resetViewingState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // إنشاء موعد
      .addCase(createViewing.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createViewing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.viewings.push(action.payload.viewing);
        state.alert = {
          show: true,
          type: 'success',
          message: 'تم حجز موعد الزيارة بنجاح'
        };
      })
      .addCase(createViewing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.alert = {
          show: true,
          type: 'error',
          message: action.payload
        };
      })
      
      // جلب مواعيد المستأجر
      .addCase(getTenantViewings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTenantViewings.fulfilled, (state, action) => {
        state.loading = false;
        state.viewings = action.payload.viewings;
      })
      .addCase(getTenantViewings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // جلب مواعيد المالك
      .addCase(getOwnerViewings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOwnerViewings.fulfilled, (state, action) => {
        state.loading = false;
        state.viewings = action.payload.viewings;
      })
      .addCase(getOwnerViewings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // تحديث حالة الموعد
      .addCase(updateViewingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateViewingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.viewings = state.viewings.map(viewing =>
          viewing._id === action.payload.viewing._id ? action.payload.viewing : viewing
        );
        state.alert = {
          show: true,
          type: 'success',
          message: 'تم تحديث حالة الموعد بنجاح'
        };
      })
      .addCase(updateViewingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.alert = {
          show: true,
          type: 'error',
          message: action.payload
        };
      });
  }
});

export const { clearViewingAlert, resetViewingState } = viewingSlice.actions;
export default viewingSlice.reducer;