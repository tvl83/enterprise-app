import { useCreateConfigProposalForm } from './useCreateConfigProposalForm';
import { GovConfigFields } from '../../create-dao/gov-config/GovConfigFields';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCurrentToken } from 'pages/shared/CurrentTokenProvider';
import { ProposalForm } from '../shared/ProposalForm';
import { toUpdateGovConfigMsg } from './helpers/toUpdateGovConfigMsg';

export const ConfigProposalForm = () => {
  const dao = useCurrentDao();
  const { token } = useCurrentToken();

  const [formInput, formState] = useCreateConfigProposalForm();

  const { submitDisabled } = formState;

  return (
    <ProposalForm
      getProposalActions={() => [{ update_gov_config: toUpdateGovConfigMsg(dao, formState, token?.decimals) }]}
      disabled={submitDisabled}
    >
      <GovConfigFields daoType={dao.type} onChange={formInput} value={formState} />
    </ProposalForm>
  );
};
