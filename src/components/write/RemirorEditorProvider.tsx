import React, { PropsWithChildren, ReactElement } from 'react';

import { Remirror, useRemirror } from '@remirror/react';
import css from 'refractor/lang/css';
import java from 'refractor/lang/java';
import javascript from 'refractor/lang/javascript';
import json from 'refractor/lang/json';
import markdown from 'refractor/lang/markdown';
import typescript from 'refractor/lang/typescript';
import { htmlToProsemirrorNode } from 'remirror';
import {
  AnnotationExtension,
  BlockquoteExtension,
  BoldExtension,
  CodeBlockExtension,
  CodeExtension,
  DropCursorExtension,
  HeadingExtension,
  HorizontalRuleExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  StrikeExtension,
  WhitespaceExtension,
} from 'remirror/extensions';

import palette from '@/styles/palette';

const extensions = () => [
  new LinkExtension({
    autoLink: true,
  }),
  new AnnotationExtension(),
  new WhitespaceExtension(),
  new StrikeExtension(),
  new HeadingExtension(),
  new BoldExtension(),
  new ItalicExtension(),
  new ImageExtension({ enableResizing: true }),
  new DropCursorExtension({ color: palette.success }),
  new BlockquoteExtension(),
  new CodeBlockExtension({
    supportedLanguages: [css, javascript, json, markdown, typescript, java],
    syntaxTheme: 'dracula',
  }),
  new HorizontalRuleExtension(),
  new CodeExtension(),
];

function RemirorEditorProvider({ children }: PropsWithChildren<unknown>): ReactElement {
  const { manager, state, onChange } = useRemirror({
    extensions,
    content: '',
    selection: 'start',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <Remirror
      manager={manager}
      initialContent={state}
      onChange={onChange}
      suppressHydrationWarning
      placeholder="내용을 입력해주세요"
    >
      {children}
    </Remirror>
  );
}

export default RemirorEditorProvider;
