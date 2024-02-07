import { Container } from "react-bootstrap";
import Footer from "../../components/header&footer/footer/footer";
import Header from "../../components/header&footer/header/header";
import SettingsSidebar from "../../components/settings/settings-sidebar";
import SettingsTitle from "../../components/settings/settings-title";
import ScrollProfile from "../../components/scrolls/scrollProfile";
import SettingsAccountContent from "../../components/settings/settings-account-content";

export default function SettingsAccount() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Container className="mt-5 h-100">
          <SettingsTitle />
          <hr />
          <div className="d-flex h-100">
            <SettingsSidebar />
            <SettingsAccountContent />
          </div>
          <ScrollProfile />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
