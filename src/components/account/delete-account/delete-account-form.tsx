import DeleteAccountAgreeTitle from "./delete-account-agree-title";
import DeleteAccountAgreeData from "./delete-account-agree-data";
import { Alert, Form } from "react-bootstrap";
import DeleteAccountAgreeContent from "./delete-account-agree-content";
import DeleteAccountAgreeRejoin from "./delete-account-agree-rejoin";
import DeleteAccountAgreeConsideration from "./delete-account-agree-consideration";
import DeleteAccountAgreeAll from "./delete-account-agree-all";
import DeleteAccountFooter from "./delete-account-footer";
import DeleteAccountPasswordInput from "./delete-account-password-input";

export interface DeleteAccountFormProps {
  isLoading: boolean;
  deletePasswordInputType: boolean;
  changeDeletePasswordType: () => void;
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

export default function DeleteAccountForm({
  isLoading,
  deletePasswordInputType,
  changeDeletePasswordType,
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
}: DeleteAccountFormProps) {
  return (
    <Form onSubmit={deleteAccount}>
      <Alert
        variant="light"
        className="overflow-y-auto rounded-0 m-0 p-4 w-100"
        style={{ maxHeight: "500px" }}
      >
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
        {dataRemovalChecked &&
          contentRetentionChecked &&
          rejoiningChecked &&
          considerationChecked && (
            <DeleteAccountPasswordInput
              deletePasswordInputType={deletePasswordInputType}
              changeDeletePasswordType={changeDeletePasswordType}
              deletePassword={deletePassword}
              handleDeletePassword={handleDeletePassword}
              noSpace={noSpace}
            />
          )}
      </Alert>
      <DeleteAccountFooter
        isLoading={isLoading}
        isDeletePassword={isDeletePassword}
        resetDeletePassword={resetDeletePassword}
      />
    </Form>
  );
}
