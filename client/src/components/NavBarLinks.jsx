import { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { SocketContext } from "../utils/SocketContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
const NavBarLinksOwner = ({ toggleMenu }) => {
  const { unreadMessageCount } = useContext(SocketContext);
  const { t } = useTranslation();
  return (
    <>
      <Link to="/owner" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          {t("home")}
        </Button>
      </Link>
      <Link
        to="/owner/property/post"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("postProperty")}
        </Button>
      </Link>
      <Link
        to="/owner/archived"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("archived")}
        </Button>
      </Link>
      <Link
        to="/owner/viewing"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("viewings")}
        </Button>
      </Link>
      <Link
        to="/owner/contacts/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("contacts")}
        </Button>
      </Link>
      <Link to="/owner/rentDetail" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          {t("rent")}
        </Button>
      </Link>
      <Link
        to="/owner/chat"
        onClick={toggleMenu}
        className="text-center relative"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
            position: "relative",
          }}
        >
           {t("chat")}
          {unreadMessageCount > 0 && (
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">
              {unreadMessageCount}
            </div>
          )}
        </Button>
      </Link>
      {/* <div className="flex justify-center mt-2">
  <LanguageSwitcher />
</div> */}
    </>
  );
};

const NavBarLinksTenant = ({ toggleMenu }) => {
  const { unreadMessageCount } = useContext(SocketContext);
  
  const { t } = useTranslation();
  return (
    <>
      <Link to="/tenant" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          {t("home")}
        </Button>
      </Link>
      <Link
        to="/tenant/rental-properties/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("properties")}
        </Button>
      </Link>
      <Link
        to="/tenant/rental-properties/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("properties")}
        </Button>
      </Link>
  
      <Link
        to="/tenant/viewing"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
           {t("viewings")}
        </Button>
      </Link>
      <Link
        to="/tenant/real-estate/saved/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          {t("saved")}
        </Button>
      </Link>
      <Link
        to="/tenant/contacts/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          {t("contacts")}
        </Button>
      </Link>
      <Link
        to="/tenant/chat"
        onClick={toggleMenu}
        className="text-center relative"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
            position: "relative",
          }}
        >
           {t("chat")}
          {unreadMessageCount > 0 && (
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">
              {unreadMessageCount}
            </div>
          )}
        </Button>
      </Link>
      {/* <div className="text-center relative">
  <LanguageSwitcher />
</div> */}
    </>
  );
};

export { NavBarLinksOwner, NavBarLinksTenant };
