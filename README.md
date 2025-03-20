# gov-rich-text-editor

A **Tailwind CSS + TypeScript** rich text editor for **React & Next.js**, built on **Tiptap**.

## 📦 Installation

```sh
npm install gov-rich-text-editor
```

or

```sh
yarn add gov-rich-text-editor
```

## 🚀 Usage

### Import and Use the `Editor` Component

```tsx
import React, { useState } from "react";
import Editor from "gov-rich-text-editor";

const MyComponent = () => {
  const [content, setContent] = useState("");

  return (
    <Editor
      name="myEditor"
      content={content}
      onChange={(event) => setContent(event.target.value)}
    />
  );
};

export default MyComponent;
```

## 📘 API

### Props for `Editor` Component

| Prop       | Type                                      | Description                            |
|-----------|-----------------------------------------|----------------------------------------|
| `content` | `string`                                | The current content of the editor.    |
| `name`    | `string`                                | Use as html input tag's name attribute.      |
| `onChange`| `(event: { target: { name: string; value: string } }) => void` | Callback function to handle content changes. |

## 🛠 Interface

```ts
interface IEditor {
  content: string;
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}
```

## 📝 License

This project is licensed under the **MIT License**.

## ✨ Author

Developed by **Govind Mishra**.

