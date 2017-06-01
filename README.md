# RGB Color Explorer

## Version 0 - Work in Progress

To do:

* Finish fixing colors for dark background
  * Color Coder title
    * Fix shadow on game play screen?
  * Try using gradients in background?
    * Need to get body to extend all the way to the bottom of the viewport


* Look at what happens when there is no internet connection!
  * Either need to include font so it works with offline version, or need to tweak the fallback fonts to avoid ugliness
  * Need to include fonts in files so that they don't need to be fetched separately

* Put up on Souvlaki.io

* Color Coder Game
  * Double check font size for Round Number title
  * Need to remove focus from all buttons in panel when each round is completed
  * Need to figure out feedback arrow spacing - is it different in different browsers? Use svg icons instead?
  * Prevent backspace from navigating so it can function only as a way to delete characters with the keyboard
  * Add transitions between
    * level screen / game screen
    * game screen / end screen ?
    * end screen / game screen (via play again button - could me same as level screen / game screen)
    * end screen / level screen ?

* Tours
  * Add the button for resuming the tour later, once it has been exited from

* General styling
  * Clean up code for sizing of ColorViz?

* RGB Color Explorer
  * Prevent enabling button panel by selecting input via actual keyboard

* Share button(s) -- don't really need these till later


Super awesome version ideas:
* Make it so you can add multiple colors. When you add a new color, the existing colors get moved (or can be moved) off to other locations, and will show their code below them (hex codes will start with #). In this case, do we need a reset button? Maybe not, person could just refresh the page. But would need a "new color" button? Probably yes.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
