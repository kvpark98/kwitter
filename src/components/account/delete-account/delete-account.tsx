import DeleteAccountForm from "./delete-account-form";
import { Modal } from "react-bootstrap";
import DeleteAccountHeader from "./delete-account-header";

export interface DeleteAccountProps {
  showDeleteAccountModal: boolean;
  handleCloseDeleteAccountModal: () => void;
  isLoading: boolean;
  deletePassword: string;
  handleDeletePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDeletePassword: boolean;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetDeletePassword: () => void;
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
  deleteAccount: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function DeleteAccount({
  showDeleteAccountModal,
  handleCloseDeleteAccountModal,
  isLoading,
  deletePassword,
  handleDeletePassword,
  isDeletePassword,
  noSpace,
  resetDeletePassword,
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
  deleteAccount,
}: DeleteAccountProps) {
  return (
    <Modal
      show={showDeleteAccountModal}
      onHide={handleCloseDeleteAccountModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <DeleteAccountHeader
        handleCloseDeleteAccountModal={handleCloseDeleteAccountModal}
      />
      <DeleteAccountForm
        isLoading={isLoading}
        deletePassword={deletePassword}
        handleDeletePassword={handleDeletePassword}
        isDeletePassword={isDeletePassword}
        noSpace={noSpace}
        resetDeletePassword={resetDeletePassword}
        dataRemovalChecked={dataRemovalChecked}
        agreeDataRemoval={agreeDataRemoval}
        contentRetentionChecked={contentRetentionChecked}
        agreeContentRetention={agreeContentRetention}
        rejoiningChecked={rejoiningChecked}
        agreeRejoining={agreeRejoining}
        considerationChecked={considerationChecked}
        agreeConsideration={agreeConsideration}
        allChecked={allChecked}
        agreeAll={agreeAll}
        deleteAccount={deleteAccount}
      />
    </Modal>
  );
}
