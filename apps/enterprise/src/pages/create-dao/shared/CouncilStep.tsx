import { assertDefined, removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { CouncilMember, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';
import { CouncilProposalActionType, ProposalTypesInput } from './ProposalTypesInput';

export function CouncilStep() {
  const {
    formInput,
    formState: { council: optionalCouncil, isValid },
  } = useDaoWizardForm();

  // TODO: temporary change
  const council = assertDefined(optionalCouncil);
  const { members, allowedProposalTypes } = council;

  const updateMembers = (members: CouncilMember[]) => formInput({ council: { ...council, members } });

  return (
    <WizardStep title="Add council members to your DAO" subTitle="(Optional)">
      <VStack gap={40}>
        <ProposalTypesInput
          value={allowedProposalTypes as CouncilProposalActionType[]}
          onChange={(allowedProposalTypes) => formInput({ council: { ...council, allowedProposalTypes } })}
          error={council.allowedProposalTypesError}
        />
        <Line />
        <VStack gap={8}>
          {members.map((member, index) => (
            <HStack gap={16} alignItems="center">
              <TextInput
                label={`Council member #${index + 1}`}
                placeholder="Enter council member's address"
                value={member.address}
                error={member.addressError}
                onValueChange={(address) => updateMembers(updateAtIndex(council.members, index, { address }))}
              />
              <DeleteIconButton onClick={() => updateMembers(removeByIndex(council.members, index))} />
            </HStack>
          ))}
          {isValid && <AddButton onClick={() => updateMembers([...council.members, { address: '' }])} />}
        </VStack>
      </VStack>
    </WizardStep>
  );
}
