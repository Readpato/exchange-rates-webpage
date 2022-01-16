# Echange Rates Webpage

## HTML and CSS

#

To start building the webpage, we are going to need a navigation bar with the name of the project.

(Pseudocode that has been written from here onwards has been originally written on a physical notebook, but I will try to guide you through the thought process that went behind)

Then we are going to need some inputs:

- One input element that is going to recieve the amount of currency the user wants to convert.

- One select element that is going to allow the user select the base currency.

- One select element that is going to allow the user to select the expected currency.

After that, we just need to additional elements.

- Button that will trigger the JavaScript functions needed to create the convertion.

- Div that is going to show the result of the convertion

## JavaScript

First we are going to need to run the Fetch API that is going to allow us to get the information that we need from the currenct exchange rates from an external page.

After that what we recieve from the API, we are gonna add it to our base and expected select elements as child options.

Then going to allow the user to select between the various options of currencies.

When that is completed, the user can click the convert button and we are going to fetch the API again to select the base that it was chosen, and then do mathematical functions that are going to display the result in the div.
