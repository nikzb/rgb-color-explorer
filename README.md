# RGB Color Explorer

## Version 0 - Work in Progress

To do:
* Try removing the Hide / Show color components button and just clicking on the circle group instead - will save tons of space
* Complete text input functionality
  * when you edit, it stays in current base and number of bits and does validation
  * invalid characters are ignored, as are extra characters
    * bug- if you move the cursor back and start typing, if the input is already "full", it inserts one char then jumps to the end.
    * bug - when you try to delete all the symbols, the first one can't be deleted - maybe because it would make string code of length 0?
  * Make the button panel buttons work
  * In terms of readability - put spaces between 3 component parts or split into three UI elements and color code by RGB??
* Add event for + - buttons so you can hold the mouse click down on them and they will continue to fire
* Make Red, Green, Blue labels into buttons that you can click to toggle those colors out completely (and then back on)?

* Responsive css for various screen sizes

Super awesome version ideas:
* Make it so you can add multiple colors. When you add a new color, the existing colors get moved (or can be moved) off to other locations, and will show their code below them (hex codes will start with #). In this case, do we need a reset button? Maybe not, person could just refresh the page. But would need a "new color" button? Probably yes.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
