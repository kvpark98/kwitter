import { Alert } from "react-bootstrap";
import DeleteAccountAgreeTitle from "./delete-account-agree-title";
import DeleteAccountAgreeData from "./delete-account-agree-data";
import DeleteAccountAgreeContent from "./delete-account-agree-content";
import DeleteAccountAgreeRejoin from "./delete-account-agree-rejoin";
import DeleteAccountAgreeConsideration from "./delete-account-agree-consideration";
import DeleteAccountAgreeAll from "./delete-account-agree-all";
import DeleteAccountAgreeSwitcher from "./delete-account-agree-switcher";

export interface DeleteAccountAgreeFormProps {
  dataRemovalChecked: boolean;
  agreeDataRemoval: () => void;
  contentRetentionChecked: boolean;
  agreeContentRetention: () => void;
  rejoiningChecked: boolean;
  agreeRejoining: () => void;
  considerationChecked: boolean;
  agreeConsideration: () => void;
  allChecked: boolean;
  agreeAll: () => void;
  goBack: () => void;
}

export default function DeleteAccountAgreeForm({
  dataRemovalChecked,
  agreeDataRemoval,
  contentRetentionChecked,
  agreeContentRetention,
  rejoiningChecked,
  agreeRejoining,
  considerationChecked,
  agreeConsideration,
  allChecked,
  agreeAll,
  goBack,
}: DeleteAccountAgreeFormProps) {
  return (
    <Alert variant="light" className="mt-3 py-4 w-100">
      <DeleteAccountAgreeTitle />
      <DeleteAccountAgreeData
        dataRemovalChecked={dataRemovalChecked}
        agreeDataRemoval={agreeDataRemoval}
      />
      <DeleteAccountAgreeContent
        contentRetentionChecked={contentRetentionChecked}
        agreeContentRetention={agreeContentRetention}
      />
      <DeleteAccountAgreeRejoin
        rejoiningChecked={rejoiningChecked}
        agreeRejoining={agreeRejoining}
      />
      <DeleteAccountAgreeConsideration
        considerationChecked={considerationChecked}
        agreeConsideration={agreeConsideration}
      />
      <DeleteAccountAgreeAll allChecked={allChecked} agreeAll={agreeAll} />
      <DeleteAccountAgreeSwitcher goBack={goBack} />
    </Alert>
  );
}
