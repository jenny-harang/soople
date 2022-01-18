import { render, screen } from '@testing-library/react';

import WriterStatusButtons from './WriterStatusButtons';

describe('WriterStatusButtons', () => {
  const groupId = 'groupId';

  const renderWriterStatusButtons = (isCompleted: boolean) => render((
    <WriterStatusButtons
      groupId={groupId}
      isCompleted={isCompleted}
    />
  ));

  context('isCompleted가 true인 경우', () => {
    it('"팀원 보기"버튼이 보여야만 한다', () => {
      const { container } = renderWriterStatusButtons(true);

      expect(container).toHaveTextContent('팀원 보기');
    });
  });

  context('isCompleted가 false인 경우', () => {
    it('"신청현황 보기"버튼이 보여야만 한다', () => {
      const { container } = renderWriterStatusButtons(false);

      expect(container).toHaveTextContent('신청현황 보기');
      expect(screen.getByText('신청현황 보기')).toHaveAttribute('href', `/detail/${groupId}/applicants`);
    });
  });
});
