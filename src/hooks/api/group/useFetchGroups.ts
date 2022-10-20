import { useQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { fetchGroups } from '@/services/api/group';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchGroups() {
  const groupsCondition = useRecoilValue(groupsConditionState);

  const query = useQuery<Group[], FirestoreError>(['groups', groupsCondition], () => fetchGroups(groupsCondition), {
    suspense: true,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '팀 리스트를 불러오는데 실패했어요! 다시 시도해주세요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchGroups;
