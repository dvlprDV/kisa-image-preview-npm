# kisa-image-preview-npm

## Installation
```
  npm i kisa-image-preview-npm
```
## Usage
import scss file in the root.

```html
@import "./../node_modules/kisa-image-preview-npm/styles.scss";
```

```html
import { init } from 'kisa-image-preview-npm';

imageArray = [
  {
    name: 'test',
    previewUrl: 'https://.....'
  }
];

init(imageArray)

```
