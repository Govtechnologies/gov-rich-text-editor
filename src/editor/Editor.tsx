"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import GapCursor from "@tiptap/extension-gapcursor";
import Typography from "@tiptap/extension-typography";
import History from "@tiptap/extension-history";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Colour from "@tiptap/extension-color";
import UnderLine from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import OrderedList from "@tiptap/extension-ordered-list";
import { FontSize } from "./extensions/Fontsize";

import Button from "./ui/Button";

import { RiParagraph } from "react-icons/ri";
import { IoArrowUndoOutline, IoArrowRedoOutline } from "react-icons/io5";
import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignRight,
} from "react-icons/ci";
import { FontFamilies, FontSizes } from "../lib/utils";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdOutlineCode,
} from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import Input from "./ui/Input";

interface IEditor {
  content: string;
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

export default function Editor({ content, onChange, name }: IEditor) {
  const [heading, setHeadings] = useState("1");
  const [fontSize, setFontSize] = useState("12");
  const [fontFamilies, setFontFamilies] = useState(
    "Arial, Helvetica, sans-serif"
  );
  const editor = useEditor({
    extensions: [
      Document,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Paragraph,
      Text,
      GapCursor,
      Typography,
      History.configure({
        newGroupDelay: 1000,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Colour,
      UnderLine,
      Italic,
      Code,
      Bold,
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc px-4 ml-6",
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
      }),
      HardBreak.configure({
        keepMarks: false,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal px-4 ml-6",
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
      }),
      FontSize,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ target: { name, value: html } });
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const handleHeadings = (e: any) => {
    let value: any = parseInt(e.target.value);
    editor?.commands.setHeading({ level: value });
    setHeadings(value);
  };
  const handleFontFamilies = (e: any) => {
    let value: any = e.target.value;
    editor?.commands.setFontFamily(value);
    setFontFamilies(value);
  };
  const handleFontSize = (e: any) => {
    let value: any = e.target.value;
    editor?.chain().focus().setFontSize(value).run();
    setFontSize(value);
  };
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full p-4 border border-blue-gray-200 rounded-lg space-y-2">
      <div className="w-full space-x-2 flex items-center  flex-wrap space-y-2">
        {/* font families, headings and font size  */}
        <div className=" space-y-2">
          <select
            className=" outline-none px-4 py-2 rounded-lg text-black dark:text-white dark:bg-gray-600 border"
            value={fontFamilies}
            onChange={handleFontFamilies}
          >
            {FontFamilies.map((data, index) => (
              <option
                key={index}
                value={data.value}
                className=""
                style={{ fontFamily: data.value }}
              >
                {data.label}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <select
              className=" outline-none px-4 py-2 rounded-lg  text-black dark:text-white  dark:bg-gray-600 border"
              value={heading}
              onChange={handleHeadings}
            >
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
              <option value="4">H4</option>
              <option value="5">H5</option>
              <option value="6">H6</option>
            </select>
            <select
              className=" outline-none px-4 py-2 rounded-lg  text-black dark:text-white  dark:bg-gray-600 border"
              value={fontSize}
              onChange={handleFontSize}
            >
              {FontSizes.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*  color, bold, italic, underline */}
        <div className="space-y-2">
          <div className=" flex items-center space-x-2 text-black dark:text-white">
            <Input
              label="Colours"
              type="color"
              onInput={(event: any) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* bold  */}
            <Button
              name="Bold"
              icon={<MdFormatBold size={16} />}
              isActive={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            {/* Italic  */}
            <Button
              name="Italic"
              icon={<MdFormatItalic size={16} />}
              isActive={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            {/* underline  */}
            <Button
              name="Underline"
              icon={<MdFormatUnderlined size={16} />}
              isActive={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
          </div>
        </div>
        <div className="space-y-2">
          {/* text align  */}
          <div className="flex items-center space-x-2">
            <Button
              name="Align left"
              icon={<CiTextAlignLeft size={16} />}
              isActive={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            />
            <Button
              name="Align Center"
              icon={<CiTextAlignCenter size={16} />}
              isActive={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            />
            <Button
              name="Align Right"
              icon={<CiTextAlignRight size={16} />}
              isActive={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            />
            <Button
              name="Align Justify"
              icon={<CiTextAlignJustify size={16} />}
              isActive={editor.isActive({ textAlign: "justify" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* bullet list  */}
            <Button
              name="Bullet list"
              icon={<MdFormatListBulleted size={16} />}
              isActive={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            {/* numaric list  */}
            <Button
              name="Numbered list"
              icon={<MdFormatListNumbered size={16} />}
              isActive={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {/* paragraph button  */}
            <Button
              name="Paragraph"
              icon={<RiParagraph size={16} />}
              isActive={false}
              onClick={() => editor.commands.setParagraph()}
            />
            {/* code  */}
            <Button
              name="Code"
              icon={<MdOutlineCode size={16} />}
              isActive={editor.isActive("code")}
              onClick={() => editor.chain().focus().toggleCode().run()}
            />
            {/* Line Break  */}
            <Button
              name="Line Break"
              icon={<AiOutlineEnter size={16} />}
              isActive={false}
              onClick={() => editor.chain().focus().setHardBreak().run()}
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* undo redo  */}
            <div className="flex items-center space-x-2">
              <Button
                name="Undo"
                icon={<IoArrowUndoOutline size={16} />}
                isActive={false}
                onClick={() => editor.chain().focus().undo().run()}
                isDisabled={!editor.can().undo()}
              />
              <Button
                name="Redo"
                icon={<IoArrowRedoOutline size={16} />}
                isActive={false}
                onClick={() => editor.chain().focus().redo().run()}
                isDisabled={!editor.can().redo()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-black dark:text-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
