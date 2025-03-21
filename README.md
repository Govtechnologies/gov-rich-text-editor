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

## 📸 Preview

Support light and dark theme by tailwind css

### Dark

![Editor Preview](https://raw.githubusercontent.com/Govtechnologies/gov-rich-text-editor/main/assets/darkthemepreview.png)

### Light

![Editor Preview](https://raw.githubusercontent.com/Govtechnologies/gov-rich-text-editor/main/assets/lightthemepreview.png)

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

## 🦜 Css

This css is required to properly support H headings and p tag because tailwind css remove H heading and p tags default text styles.
you can apply this class where your editer is implemented and where you are showing edited contents.

### Css

```css
/* editer styles  */
.custom-content h1 {
  font-weight: bold;
  font-size: xx-large;
}

.custom-content h2 {
  font-weight: bold;
  font-size: x-large;
}

.custom-content h3 {
  font-weight: bold;
  font-size: larger;
}

.custom-content h4 {
  font-weight: bold;
  font-size: large;
}

.custom-content h5 {
  font-weight: bold;
  font-size: medium;
}

.custom-content h6 {
  font-weight: bold;
  font-size: small;
}
.custom-content p {
  padding: 8px;
}
```
### TSX
```tsx
import React, { useState } from "react";
import Editor from "gov-rich-text-editor";

const MyComponent = () => {
  const [content, setContent] = useState("");

  return (
    <div className="custom-content">
      <Editor
        name="myEditor"
        content={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </div>
  );
};

export default MyComponent;
```




## 📝 License

This project is licensed under the **MIT License**.

## ✨ Author

Developed by **Govind Mishra**.

