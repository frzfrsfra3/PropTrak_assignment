import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  getTenantViewings, 
  clearViewingAlert,
  updateViewingStatus 
} from '../../features/Viewing/viewingSlice';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  styled
} from '@mui/material';
import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';


const StatusButton = styled(Button)(({ theme, status }) => ({
  margin: theme.spacing(0.5),
  ...(status === 'scheduled' && {
    backgroundColor: theme.palette.warning.light,
    '&:hover': { backgroundColor: theme.palette.warning.main }
  }),
  ...(status === 'completed' && {
    backgroundColor: theme.palette.success.light,
    '&:hover': { backgroundColor: theme.palette.success.main }
  }),
  ...(status === 'canceled' && {
    backgroundColor: theme.palette.error.light,
    '&:hover': { backgroundColor: theme.palette.error.main }
  }),
}));

const TenantViewingsList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { viewings, loading, error, alert } = useSelector((state) => state.viewings);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTenantViewings());
  }, [dispatch]);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        // dispatch(clearViewingAlert());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  const handleStatusUpdate = (viewingId, status) => {
    dispatch(updateViewingStatus({
      viewingId,
      status,
      feedback: t('statusUpdated')
    }));
  };

  const formatDate = (dateString) => {
    const locale = i18n.language === 'ar' ? arSA : enUS;
    return format(new Date(dateString), 'PPPPp', { locale });
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>{t('loading')}</Typography>
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  );

  return (
    <Box sx={{ p: 3, direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', textAlign: 'right' }}>
        {t('viewingsTitle')}
      </Typography>

      <Snackbar
        open={alert.show}
        autoHideDuration={5000}
        // onClose={() => dispatch(clearViewingAlert())}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>

      {viewings.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">{t('noViewings')}</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="viewings table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('property')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('address')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('owner')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('tenant')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('scheduledTime')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('notes')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {viewings.map((viewing) => (
                <TableRow key={viewing._id}>
                  <TableCell>
                    <Typography fontWeight="medium">{viewing.property.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('price')}: SAR {viewing.property.price.toLocaleString() || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {`${viewing.property.address.streetName}, ${viewing.property.address.city}`}
                  </TableCell>
                  <TableCell>
                    <Typography>{`${viewing.owner.firstName} ${viewing.owner.lastName}`}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {viewing.owner.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography>{`${viewing.tenant.firstName} ${viewing.tenant.lastName}`}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {viewing.tenant.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(viewing.scheduledTime)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={t(viewing.status)} 
                      color={
                        viewing.status === 'scheduled' ? 'warning' :
                        viewing.status === 'completed' ? 'success' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>{viewing.notes}</TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <StatusButton
                        variant="contained"
                        size="small"
                        status="completed"
                        onClick={() => handleStatusUpdate(viewing._id, 'completed')}
                      >
                        {t('completed')}
                      </StatusButton>
                      <StatusButton
                        variant="contained"
                        size="small"
                        status="canceled"
                        onClick={() => handleStatusUpdate(viewing._id, 'canceled')}
                      >
                        {t('cancel')}
                      </StatusButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TenantViewingsList;