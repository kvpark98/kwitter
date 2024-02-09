import { Wrapper } from "../../styles/auth-components";
import DeleteAccountErrors from "../../alert/error/auth/delete-account/delete-account-errors";
import DeleteAccountPasswordForm from "./delete-account-password-form";
import DeleteAccountAgreeForm from "./delete-account-agree-form";

export interface DeleteAccountFormProps {
  isLoading: boolean;
  error: string;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
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
  goBack: () => void;
}

export default function DeleteAccountForm({
  isLoading,
  error,
  password,
  handlePassword,
  isPassword,
  noSpace,
  reset,
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
  goBack,
}: DeleteAccountFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Delete Account</h1>
      {error && <DeleteAccountErrors error={error} />}
      <DeleteAccountAgreeForm
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
        goBack={goBack}
      />
      {dataRemovalChecked &&
        contentRetentionChecked &&
        rejoiningChecked &&
        considerationChecked && (
          <DeleteAccountPasswordForm
            isLoading={isLoading}
            password={password}
            handlePassword={handlePassword}
            isPassword={isPassword}
            noSpace={noSpace}
            reset={reset}
            deleteAccount={deleteAccount}
          />
        )}
    </Wrapper>
  );
}
