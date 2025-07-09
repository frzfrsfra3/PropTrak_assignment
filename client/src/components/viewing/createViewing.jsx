import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createViewing } from '../../features/Viewing/viewingSlice';

const CreateViewingForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    scheduledTime: '',
    notes: ''
  });
  const dispatch = useDispatch();
  const { loading, alert } = useSelector((state) => state.viewings);

  const { user } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createViewing({
      propertyId,
      tenantId: user._id, // يمكنك الحصول عليه من حالة المستخدم
      scheduledTime: formData.scheduledTime,
      notes: formData.notes
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        value={formData.scheduledTime}
        onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
        required
      />
      <textarea
        placeholder="ملاحظات"
        value={formData.notes}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'جاري الحفظ...' : 'حجز موعد زيارة'}
      </button>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
    </form>
  );
};

export default CreateViewingForm;