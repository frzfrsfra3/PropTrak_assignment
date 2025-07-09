import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantViewings, clearViewingAlert } from '../../features/Viewing/viewingSlice';

const TenantViewingsList = () => {
  const dispatch = useDispatch();
  const { viewings, loading, error, alert } = useSelector((state) => state.viewings);

  useEffect(() => {
    dispatch(getTenantViewings());
  }, [dispatch]);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        dispatch(clearViewingAlert());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (loading) return <div>جارٍ التحميل...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>مواعيد الزيارة</h2>
      {viewings.length === 0 ? (
        <p>لا توجد مواعيد زيارة مسجلة</p>
      ) : (
        <ul>
          {viewings.map((viewing) => (
            <li key={viewing._id}>
              <h3>{viewing.property.title}</h3>
              <p>الموعد: {new Date(viewing.scheduledTime).toLocaleString()}</p>
              <p>الحالة: {viewing.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TenantViewingsList;