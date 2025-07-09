import React, { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { createViewing } from '../../features/Viewing/viewingSlice';

const CreateViewingForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    scheduledTime: new Date(),
    notes: ''
  });

  const dispatch = useDispatch();
  const { loading, alert } = useSelector((state) => state.viewings || {});
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createViewing({
      propertyId,
      tenantId: user._id,
      scheduledTime: formData.scheduledTime,
      notes: formData.notes
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Select Date & Time"
          value={formData.scheduledTime}
          onChange={(newValue) => setFormData({ ...formData, scheduledTime: newValue })}
          renderInput={(params) => <TextField {...params} fullWidth required />}
        />
      </LocalizationProvider>

      <TextField
        label="Notes"
        multiline
        rows={3}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : 'Book Viewing'}
      </Button>

      {alert?.show && (
        <div className={`text-sm mt-2 text-${alert.type === "error" ? "red-500" : "green-600"}`}>
          {alert.message}
        </div>
      )}
    </form>
  );
};
export default CreateViewingForm;