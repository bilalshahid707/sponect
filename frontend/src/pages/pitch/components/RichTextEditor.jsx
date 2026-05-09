import PropTypes from "prop-types";
import { EditorContent } from "@tiptap/react";
import { Toolbar } from "./Toolbar";

export const RichTextEditor = ({ editor, charCount, maxChars }) => (
  <div className="flex w-full flex-col gap-1.5">
    <div className="border border-border rounded-md overflow-hidden w-full">
      <Toolbar editor={editor} />
      <div
        className="
          h-48 overflow-y-auto p-3 text-sm text-text-primary
          [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-40
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5
          [&_.ProseMirror_li]:mb-1
          [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border
          [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_blockquote]:italic
          [&_.ProseMirror_blockquote]:text-text-secondary
        "
      >
        <EditorContent editor={editor} />
      </div>
    </div>
    <p className="text-xs text-text-muted text-right">
      <span className={charCount > maxChars ? "text-red-500 font-medium" : ""}>
        {charCount}
      </span>
      /{maxChars}
    </p>
  </div>
);

RichTextEditor.propTypes = {
  editor: PropTypes.object,
  charCount: PropTypes.number.isRequired,
  maxChars: PropTypes.number.isRequired,
};

export default RichTextEditor;
