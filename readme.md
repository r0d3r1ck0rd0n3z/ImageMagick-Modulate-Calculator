<p>Modulate is an ImageMagick command that shifts the hue of a given color by the provided percentage. More info <a target='_blank' href='https://legacy.imagemagick.org/Usage/color_mods/#modulate_hue'>here</a>.</p>
<p>
  A = original color, used as a base for the computations<br/>
  B = new color, as shifted from A by 𝒏 percent
</p><br />

<p>
It may be easier to understand how modulate's 'hue shifting' works by using a colorwheel.  
  <ul>
  <li>The source color is assigned a value of 100%. </li>
  <li>Its opposite color on the wheel is assigned a value of 0%.</li>
  <li>The opposite color is also assigned the 200% value.</li>
  <li>To navigate colors on the left side, start at 0% then move clockwise until you reach 100%.</li>
  <li>To navigate colors on the right side, start at 100% then move clockwise until you reach 200%.</li>
</ul>

</p>
