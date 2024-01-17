import { Container } from "react-bootstrap";
import Footer from "../../components/header&footer/footer";
import Header from "../../components/header&footer/header";
import SettingsSidebar from "../../components/settings/settings-sidebar";
import SettingsTitle from "../../components/settings/settings-title";

export default function SettingsProfile() {
  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Container className="mt-5 h-100">
          <SettingsTitle />
          <hr />
          <div className="d-flex h-100">
            <SettingsSidebar />
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
