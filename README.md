
![preview](https://github.com/tpkn/animate-to-retina/blob/master/preview.png)

### Features
1. Export any object that exist in library (exept lines and fills)
2. Export single or multiple objects
3. Tool saves transform params such as skew and rotation
4. Adds 10px on each image side to prevent cutting off object's edges (line 77)
<br />

### Usage (scss)
```scss
@mixin retina($img, $width, $height) {
   $gap: 10;

   width: #{$width}px;
   height: #{$height}px;
   background-image: url($img);
   background-size: #{$width + $gap}px #{$height + $gap}px;

   background-position: 50% 50%;
   background-repeat: no-repeat;
}

.icon1 {
   @include retina('symbol1_110x26_ff6754.png', 110, 26);
}

.icon2 {
   @include retina('symbol2_253x117_309c0c.png', 253, 117);
}
```
<br />

### Installation
1. Copy .swf and .jsfl files into `C:\Users\[PC_NAME]\AppData\Local\Adobe\[ANIMATE_CC_VERSION]\en_US\Configuration\WindowSWF`
2. Restart Adobe Animate
3. Bind some shortcut for quick access to this extension (Edit > Keyboard Shortcuts)
