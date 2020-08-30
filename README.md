This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The Essentials Shop 

Inventory Management of a recently a new online store opened on the internet that sells Mask & Gloves.
( Completely Responsive Web App )

## Work Flow

- Fill the mandatory details and click on checkout to get the price of items.
 (if no. of qty. exceeds then popup will appear to get the inventory details after clicking on checkout button ).
- Then click on buy now to get order placed.(pop up will apear after succesful order placed).
- Then click on Home page to order again (PLEASE NOTE : NO. OF QTY. REDUCED IN INVENTORY).
- The cycle repeats on each order placed.

## Project Scenarios

- Inventor management of new online store opened on internet that sells masks & gloves.
- They are faced with an interesting problem of managing thier inventory accross 2 countries : UK & Germany.
- Purpose of a program is to maintain inventory and minimize the sale price for online customers.
- The prices are different based on the country where the inventory  is stored.
- The in inventory in two countries is limited.
- There are 100 mask in UK which have a sale price of 65£ for each whereas there are 100 in germany which have a sale price of 100£.
- There are 100 gloves in UK which have a sale price of 100£ whereas there are 50 in germany which have a sale price of 150£.
- For simplicity we will use GBP as our transaction currency.
- The order should be fulfilled fully or not at all.
- If the inventory from one country used up then item have to be fetched from another country.
- There is transport cost involved when the items needs to shipped from one country to another incase the purchase country is different than the inventory country.
- Shipping cost is 400£ for every 10 uints of item type (no mixing up of item types).
- Transport cost is always in multiples of 10 units.
- If customer passport belongs to local country then the customer will get 20% discount on the shipping charge.
 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
