import { Box, ToggleButtonGroup, IconButton, Divider } from "@mui/joy";
import { useState } from "react";
import { useEditorState } from "@tiptap/react";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatClearIcon from "@mui/icons-material/FormatClear";

export const Toolbar = ({ editor }) => {
  console.log("rendered");
  const [value, setValue] = useState();

  const menuBarStateSelector = () => {
    return {
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isStrike: editor?.isActive("strike") ?? false,
      isUnderline: editor?.isActive("underline") ?? false,
      canClearMarks: editor?.can().chain().unsetAllMarks().run() ?? false,

      // Lists and blocks
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
      isBlockquote: editor?.isActive("blockquote") ?? false,

      // History
      canUndo: editor?.can().chain().undo().run() ?? false,
      canRedo: editor?.can().chain().redo().run() ?? false,
    };
  };

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  return (
    <Box className="border-b-2 border-dark p-1 overflow-x-auto" sx={{ scrollbarWidth: "thin" }}>
      {/* Undo/Redo */}
      <ToggleButtonGroup
        sx={{
          "--ButtonGroup-separatorColor": "transparent",
        }}
        spacing={{ xs: 1 }}
      >
        <IconButton
          variant="solid"
          value="undo"
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
          sx={{
            color: editorState.canUndo ? "white.main" : "dark.main",
            bgcolor: editorState.canUndo ? "dark.main" : "white.main",
          }}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="redo"
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
          sx={{
            color: editorState.canRedo ? "white.main" : "dark.main",
            bgcolor: editorState.canRedo ? "dark.main" : "white.main",
          }}
        >
          <RedoIcon />
        </IconButton>

        <Divider />

        {/* Format Buttons */}

        <IconButton
          variant="solid"
          value="bold"
          onClick={() => {
            editor?.chain().focus().toggleBold().run();
          }}
          sx={{
            color: editorState.isBold ? "white.main" : "dark.main",
            bgcolor: editorState.isBold ? "dark.main" : "white.main",
          }}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="italic"
          onClick={() => {
            editor?.chain().focus().toggleItalic().run();
          }}
          sx={{
            color: editorState.isItalic ? "white.main" : "dark.main",
            bgcolor: editorState.isItalic ? "dark.main" : "white.main",
          }}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="underlined"
          onClick={() => {
            editor?.chain().focus().toggleUnderline().run();
          }}
          sx={{
            color: editorState.isUnderline ? "white.main" : "dark.main",
            bgcolor: editorState.isUnderline ? "dark.main" : "white.main",
          }}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="strike"
          onClick={() => {
            editor?.chain().focus().toggleStrike().run();
          }}
          sx={{
            color: editorState.isStrike ? "white.main" : "dark.main",
            bgcolor: editorState.isStrike ? "dark.main" : "white.main",
          }}
        >
          <StrikethroughSIcon />
        </IconButton>

        <Divider />

        <Divider />

        <IconButton
          variant="solid"
          value="bullet"
          onClick={() => {
            editor?.chain().focus().toggleBulletList().run();
          }}
          sx={{
            color: editorState.isBulletList ? "white.main" : "dark.main",
            bgcolor: editorState.isBulletList ? "dark.main" : "white.main",
          }}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="ordered"
          onClick={() => {
            editor?.chain().focus().toggleOrderedList().run();
          }}
          sx={{
            color: editorState.isOrderedList ? "white.main" : "dark.main",
            bgcolor: editorState.isOrderedList ? "dark.main" : "white.main",
          }}
        >
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="blockquote"
          onClick={() => {
            editor?.chain().focus().toggleBlockquote().run();
          }}
          sx={{
            color: editorState.isBlockquote ? "white.main" : "dark.main",
            bgcolor: editorState.isBlockquote ? "dark.main" : "white.main",
          }}
        >
          <FormatQuoteIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="align-left"
          onClick={() => {
            setValue("align-left");
            editor?.chain().focus().setTextAlign("left").run();
          }}
          sx={{
            color: value === "align-left" ? "white.main" : "dark.main",
            bgcolor: value === "align-left" ? "dark.main" : "white.main",
          }}
        >
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="align-center"
          onClick={() => {
            setValue("align-center");
            editor?.chain().focus().setTextAlign("center").run();
          }}
          sx={{
            color: value === "align-center" ? "white.main" : "dark.main",
            bgcolor: value === "align-center" ? "dark.main" : "white.main",
          }}
        >
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="align-right"
          onClick={() => {
            setValue("align-right");
            editor?.chain().focus().setTextAlign("right").run();
          }}
          sx={{
            color: value === "align-right" ? "white.main" : "dark.main",
            bgcolor: value === "align-right" ? "dark.main" : "white.main",
          }}
        >
          <FormatAlignRightIcon />
        </IconButton>
        <IconButton
          variant="solid"
          value="align-justify"
          onClick={() => {
            setValue("align-justify");
            editor?.chain().focus().setTextAlign("justify").run();
          }}
          sx={{
            color: value === "align-justify" ? "white.main" : "dark.main",
            bgcolor: value === "align-justify" ? "dark.main" : "white.main",
          }}
        >
          <FormatAlignJustifyIcon />
        </IconButton>
        <Divider />
        <IconButton
          variant="solid"
          value="clear"
          onClick={() => {
            editor?.chain().focus().clearNodes().run();
          }}
          sx={{
            color: "dark.main",
            bgcolor: "white.main",
          }}
        >
          <FormatClearIcon />
        </IconButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toolbar;
