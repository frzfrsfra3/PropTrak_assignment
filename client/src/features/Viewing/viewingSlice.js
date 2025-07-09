import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetch from "../../utils/axiosCreate";
import i18next from 'i18next';

// Create new viewing appointment
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || i18next.t('viewings2.errors.createError')
      );
    }
  }
);

// Get tenant's viewings
export const getTenantViewings = createAsyncThunk(
  "viewings/getTenantViewings",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get("/viewings/tenant");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || i18next.t('viewings2.errors.fetchError')
      );
    }
  }
);

// Get owner's viewings
export const getOwnerViewings = createAsyncThunk(
  "viewings/getOwnerViewings",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get("/viewings/owner");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || i18next.t('viewings2.errors.fetchError')
      );
    }
  }
);

// Update viewing status
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || i18next.t('viewings2.errors.updateError')
      );
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
    type: null, // 'success' or 'error'
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
    resetViewingState: () => initialState,
    // New reducer to set translated messages
    setAlertMessage: (state, action) => {
      if (state.alert.show) {
        state.alert.message = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Create viewing
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
          message: i18next.t('viewings2.messages.createSuccess')
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
      
      // Get tenant's viewings
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
      
      // Get owner's viewings
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
      
      // Update viewing status
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
          message: i18next.t('viewings2.messages.updateSuccess')
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

export const { clearViewingAlert, resetViewingState, setAlertMessage } = viewingSlice.actions;
export default viewingSlice.reducer;