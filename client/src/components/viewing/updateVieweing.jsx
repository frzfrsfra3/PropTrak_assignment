import React from 'react';
import { useDispatch } from 'react-redux';
import { updateViewingStatus } from '../../features/Viewing/viewingSlice';

const ViewingStatusUpdater = ({ viewingId }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = (status) => {
    dispatch(updateViewingStatus({
      viewingId,
      status,
      feedback: 'تم تحديث الحالة'
    }));
  };

  return (
    <div>
      <button onClick={() => handleStatusUpdate('completed')}>تمت الزيارة</button>
      <button onClick={() => handleStatusUpdate('canceled')}>إلغاء الموعد</button>
    </div>
  );
};
export default ViewingStatusUpdater;