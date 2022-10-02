import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchCommentCount from '@/hooks/api/comment/useFetchCommentCount';
import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import { GroupQuery } from '@/models';
import { CommentFields } from '@/models/group';
import { h4Font } from '@/styles/fontStyles';
import { checkNumNull } from '@/utils/utils';

function CommentsContainer(): ReactElement {
  const perPage = 15;

  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;
  const { data: user } = useFetchUserProfile();
  const { data: commentCount } = useFetchCommentCount(groupId);
  const { query, refState } = useInfiniteFetchComments({
    perPage,
  });
  const { mutate: addCommentMutate } = useAddComment(perPage);
  const { mutate: deleteCommentMutate } = useDeleteComment(perPage);

  const onSubmit = useCallback((commentForm: CommentFields) => addCommentMutate({
    ...commentForm,
    groupId,
  }), [groupId, addCommentMutate]);

  const onRemoveComment = useCallback((commentId: string) => deleteCommentMutate({
    commentId, groupId,
  }), [groupId, deleteCommentMutate]);

  return (
    <>
      <CommentCount>{`댓글 ${checkNumNull(commentCount)}`}</CommentCount>
      <CommentForm
        user={user}
        onSubmit={onSubmit}
      />
      <CommentsView
        user={user}
        comments={query.data.pages}
        isLoading={query.isLoading && ['idle', 'fetching'].includes(query.fetchStatus)}
        onRemove={onRemoveComment}
        refState={refState}
      />
    </>
  );
}

export default CommentsContainer;

const CommentCount = styled.h4`
  ${h4Font(true)}
  margin-top: 24px;
  margin-bottom: 16px;
`;
