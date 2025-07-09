import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealEstateDetail,
  deleteProperty,
  archiveProperty,
  clearAlert,
} from "../../features/realEstateOwner/realEstateOwnerSlice";
import {
  PageLoading,
  Footer,
  ImageCarousal,
  ConfirmModal,
  AlertToast,
} from "../../components";
import { dateFormatter, createNumberFormatter } from "../../utils/valueFormatter";
import { Button, CircularProgress } from "@mui/material";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import HorizontalSplitRoundedIcon from "@mui/icons-material/HorizontalSplitRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ArchiveIcon from "@mui/icons-material/Archive";
import countryToCurrency from "country-to-currency";
import { countries } from "../../utils/countryList";
import { useTranslation } from "react-i18next";

const PersonalRealEstateDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRealEstateDetail({ slug }));
  }, [slug, dispatch]);

  const {
    realEstate,
    isLoading,
    isProcessing,
    alertFlag,
    alertMsg,
    alertType,
    postSuccess,
  } = useSelector((store) => store.realEstateOwner);

  const currentCountry = countries.find(
    (country) => country.label === realEstate?.address?.country
  );
  const format = createNumberFormatter(currentCountry?.code);

  // Redirect to detail page of the property after successful contract creation
  useEffect(() => {
    if (postSuccess) {
      const timer = setTimeout(() => {
        navigate(`/owner`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [postSuccess, navigate, slug]);

  //close the alert toast
  const handleAlertClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  //handle modal open and close state
  const [open, setOpen] = useState(false);
  const handleModalOpen = useCallback(() => setOpen(true), []);
  const handleModalClose = useCallback(() => setOpen(false), []);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const handleArchiveModalOpen = () => setArchiveOpen(true);
  const handleArchiveModalClose = () => setArchiveOpen(false);
  const handleDeleteProperty = useCallback(() => {
    dispatch(deleteProperty({ slug }));
    handleModalClose();
  }, [dispatch, slug, handleModalClose]);
  const handleArchiveProperty = useCallback(() => {
    dispatch(archiveProperty({ slug }));
    handleArchiveModalClose();
  }, [dispatch, slug]);

  if (isLoading) return <PageLoading />;

  if (!realEstate)
    return <h1 className="mt-6 text-center">{t('noPropertyFound')}</h1>;

  return (
    <>
      <main className="mb-12 mt-10 mx-4 md:mx-12">
        <div className="flex flex-col gap-4 mx-auto">
          <h3 className="font-heading font-bold">{t('propertyDetails')}</h3>
          <section className="flex flex-col gap-12 rounded-md md:flex-row">
            <div className="w-full md:w-2/3">
              <ImageCarousal realEstateImages={realEstate?.realEstateImages} />
            </div>
            <div className="flex flex-col rounded-md gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">{realEstate?.title}</h3>
                <div>
                  <p className="font-roboto text-gray-500">
                    {realEstate?.category}
                  </p>
                </div>
                <p className="-ml-1 text-base tracking-tight">
                  <LocationOnOutlinedIcon sx={{ color: "#019149" }} />
                  {realEstate?.address?.streetName}, {" "}
                  {realEstate?.address?.city},{" "}
                  {realEstate?.address?.state}, {" "}
                  {realEstate?.address?.country}
                </p>
                <div className="">
                  <p className="font-robotoNormal text-xs font-semibold tracking-tight">
                    {t('postedOn')}: {dateFormatter(realEstate?.createdAt)}
                  </p>
                  <p className="font-robotoNormal text-xs tracking-tight">
                    {t('propertyId')}: {realEstate?.propertyId}
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-md">
                  <span className="font-semibold text-lg text-primaryDark">
                    {currentCountry!=undefined ?  
                      `${countryToCurrency[currentCountry.code]} ${format(realEstate?.price)}` : ''}
                  </span>
                </div>
              </div>
              {/* Render the edit and create contract if the real estate property is available for rental */}
              {realEstate?.status === true ? (
                <div className="flex flex-wrap gap-4 mt-2 text-center">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: "#fff" }}
                    size="small"
                    onClick={() => {
                      navigate(`/owner/real-estate/update/${slug}`);
                    }}
                    startIcon={<BorderColorIcon />}
                  >
                    {t('edit')}
                  </Button>
                  <Link
                    to={`/owner/contract/create`}
                    state={{
                      realEstateId: realEstate?._id,
                      title: realEstate?.title,
                      price: realEstate?.price,
                      slug: slug,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ 
                        color: "#fff",
                        backgroundColor: "#6a1b9a",
                        '&:hover': {
                          backgroundColor: '#4a148c',
                        }
                      }}
                      size="small"
                      startIcon={<GavelIcon />}
                    >
                      {t('createContract')}
                    </Button>
                  </Link>
                  <Button
                    disabled={
                      isProcessing || (alertFlag && alertType === "success")
                    }
                    variant="contained"
                    color="error"
                    sx={{ color: "#fff" }}
                    size="small"
                    onClick={handleModalOpen}
                    startIcon={<DeleteForeverRoundedIcon />}
                  >
                    {isProcessing ? (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "#fff",
                        }}
                      />
                    ) : (
                      t('deleteProperty')
                    )}
                  </Button>
                  <Button
                    disabled={
                      isProcessing || (alertFlag && alertType === "success")
                    }
                    variant="contained"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#ff9800",
                      '&:hover': {
                        backgroundColor: '#f57c00',
                      }
                    }}
                    size="small"
                    onClick={handleArchiveModalOpen}
                    startIcon={<ArchiveIcon />}
                  >
                    {isProcessing ? (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "#fff",
                        }}
                      />
                    ) : (
                      t('archiveProperty')
                    )}
                  </Button>
                </div>
              ) : (
                <div className="">
                  <Link to={`/owner/contract/${realEstate?._id}/${slug}`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ color: "#fff" }}
                      startIcon={<ArticleIcon />}
                    >
                      {t('viewContract')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
          <div className="">
            <h3 className="font-semibold p-3">{t('description')}</h3>
            <hr className="w-3/4 ml-3 border-t-2 rounded-md" />
            <p className="text-lg p-3 tracking-normal">
              {realEstate?.description}
            </p>
          </div>
          <div className="">
            <h3 className="font-semibold p-3">{t('overview')}</h3>
            <hr className="w-3/4 ml-3 border-t-2 rounded-md" />
            <div className="flex flex-wrap">
              <div className="flex p-3 mt-2 gap-2 items-center">
                <SquareFootRoundedIcon sx={{ color: "#738FA7" }} />
                <span className="font-semibold">{t('propertyArea')}</span>
                <p>{format(realEstate?.area)} {t('sqFeet')}</p>
              </div>
              <div className="flex p-3 mt-2 gap-2 items-center">
                <HorizontalSplitRoundedIcon />
                <span className="font-semibold">
                  {realEstate?.floors > 1 ? t('numberOfFloors') : t('numberOfFloor')}
                </span>
                <p>{format(realEstate?.floors)}</p>
              </div>
              <div className="flex p-3 mt-2 gap-2 items-center">
                <ExploreRoundedIcon sx={{ color: "#29b46e" }} />
                <span className="font-semibold">{t('propertyFacing')}</span>
                <p>{realEstate?.facing}</p>
              </div>
              <div className="flex p-3 mt-2 gap-2 items-center">
                <span className="font-semibold">{t('bedrooms')}</span>
                <p>{format(realEstate?.bedrooms)}</p>
              </div>
              <div className="flex p-3 mt-2 gap-2 items-center">
                <span className="font-semibold">{t('bathrooms')}</span>
                <p>{format(realEstate?.bathrooms)}</p>
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="font-semibold p-3">{t('amenities')}</h3>
            <hr className="w-3/4 ml-3 border-t-2 rounded-md" />
            <div className="flex flex-wrap p-3 gap-2">
              {realEstate?.amenities?.map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <ConfirmModal open={open} handleModalClose={handleModalClose}>
            <h3 className="text-center">{t('confirmDelete')}</h3>
            <p className="text-center my-4">
              {t('deleteConfirmationMessage')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <Button onClick={handleModalClose} color="error">
                {t('close')}
              </Button>
              <Button
                onClick={handleDeleteProperty}
                color="success"
                variant="contained"
              >
                {t('confirm')}
              </Button>
            </div>
          </ConfirmModal>
        </div>
        <div> 
          <ConfirmModal open={archiveOpen} handleModalClose={handleArchiveModalClose}>
            <h3 className="text-center">{t('confirmArchive')}</h3>
            <p className="text-center my-4">
              {t('archiveConfirmationMessage')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <Button onClick={handleArchiveModalClose} color="error">
                {t('close')}
              </Button>
              <Button
                onClick={handleArchiveProperty}
                color="success"
                variant="contained"
              >
                {t('confirmArchive')}
              </Button>
            </div>
          </ConfirmModal>
        </div>
        <AlertToast
          alertFlag={alertFlag}
          alertMsg={alertMsg}
          alertType={alertType}
          handleClose={handleAlertClose}
        />
      </main>
      <Footer />
    </>
  );
};

export default PersonalRealEstateDetail;