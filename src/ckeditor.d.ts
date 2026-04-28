// src/ckeditor.d.ts
declare module "@ckeditor/ckeditor5-react" {
  import * as React from "react";
  import type { Editor } from "@ckeditor/ckeditor5-core";

  export interface CKEditorProps {
    editor: any;
    config?: Record<string, any>;
    data?: string;
    disabled?: boolean;
    onReady?: (editor: Editor) => void;
    onChange?: (event: Event, editor: Editor) => void;
    onBlur?: (event: Event, editor: Editor) => void;
    onFocus?: (event: Event, editor: Editor) => void;
  }

  export class CKEditor extends React.Component<CKEditorProps> {}
}
