import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";

export function TitleInput({
  handleTitleChange,
}: {
  handleTitleChange?: (title: string) => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  const onChange = (value: string | undefined) => {
    setValue(value);
    handleTitleChange?.(value ?? "");
  };

  return (
    <input
      type="text"
      placeholder="Title"
      required
      className="w-full rounded border-b-4 border-theme-700 pl-2 pt-1 text-4xl font-black text-theme-600 focus:border-theme-500 focus:bg-theme-100 md:text-7xl"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function BodyInput({
  handleBodyChange,
}: {
  handleBodyChange?: (body: string) => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  const onChange = (value: string | undefined) => {
    setValue(value);
    handleBodyChange?.(value ?? "");
  };

  return (
    <MDEditor
      height={200}
      value={value}
      onChange={onChange}
      commands={[
        commands.bold,
        commands.italic,
        commands.divider,
        commands.link,
        commands.divider,
        commands.orderedListCommand,
        commands.unorderedListCommand,
      ]}
    />
  );
}
