# ImageMagick Modulate Calculator

This demo calculates the resulting hue when a modulate command is applied to a source color. 

<br/>
  
🌎 You can view a demo here: <br/>
https://r0d3r1ck0rd0n3z.github.io/ImageMagick-Modulate-Calculator/

<br/>

<p>Modulate is an ImageMagick command that shifts the hue of a given color by the provided percentage. More info <a target='_blank' href='https://legacy.imagemagick.org/Usage/color_mods/#modulate_hue'>here</a>. To understand how 'hue shift' works, imagine a colorwheel where:</p>
<p>
  A = original color, used as a base for the computations<br/>
  B = new color, as shifted from A by 𝒏 percent
</p><br />

<p>
ImageMagick takes the base color and assigns it a value of 100%. It then works out the % values of the other colors :  
  <ul>
  <li>The opposite color on the wheel is assigned 0%.</li>
  <li>Starting from 0% moving clockwise, it adds 1% for each color until it reaches 100%.</li>
  <li>Starting from 100% moving clockwise, it adds 1% for each color until it reaches 200%.</li>
</ul>
</p>

<br/>

## Current issues

* The demo may have issues if the HSL input does not strictly follow the <tt>hsl( xx , xx% , xx% )</tt> format.
* Rounding errors may occur that can shift the resulting hue by 1~4%. Always try to double-check the results using another tool.
* I've tried my best to anticipate possible errors, but results may be off if it encounters unconventional inputs.
