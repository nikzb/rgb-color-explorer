# RGB Color Explorer

## Version 0 - Work in Progress

To do:
* Try removing the Hide / Show color components button and just clicking on the circle group instead - will save tons of space
* Decide what to do about code box - ideas below
  * no editing
  * when you edit, it stays in current number of bits and does validation
  * when you edit, it will try to make it work based on number of bits / symbols (for example, if you had 2 bits per and deleted 3 of the 6 bits, it would automatically switch to 1 bit per?)
  * In terms of readability - put spaces between 3 component parts or split into three UI elements and color code by RGB
  * Have the code display do validation on code it receives and turn red when it is invalid based on number system / bits per component
* Add event for + - buttons so you can hold the mouse click down on them and they will continue to fire

* Responsive css for various screen sizes

Super awesome version ideas:
* Make it so you can add multiple colors. When you add a new color, the existing colors get moved (or can be moved) off to other locations, and will show their code below them (hex codes will start with #). In this case, do we need a reset button? Maybe not, person could just refresh the page. But would need a "new color" button? Probably yes.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
