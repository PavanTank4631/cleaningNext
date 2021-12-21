<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Project Shop CarX</h3>
    <img src="public/static/x_logo.svg" alt="Logo" width="80px">



</div>



<!-- TABLE OF CONTENTS -->
<details open>
  <summary><b>Table of Contents</b></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Up and Running Locally</a>
    </li>
    <li><a href="#GraphQl">How GraphQl and Redux Toolkit Queries Are Being Made</a></li>
    <li><a href="#Todo">TODO LIST TASKS (Updated 12/20!)</a></li>
    <li><a href="#Completed">Completed Tasks</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

 <img src="https://i.imgur.com/3rKyotM.jpeg" alt="Logo" width="350px">


<table>
<tr>
<td>

ShopCarX.com is a web application that allows users to search for and purchase used AND new cars. 
The organization of the directory sucks and needs to constantly be updated. Sorry for that, I suck - Sean Modd.

<details open>
<summary><b>Inventory of Vehicles</b></summary>
<br />


The **ShopCarX** inventory is being scraped on a daily basis from the following dealerships:

- [Stevens Creek Chrysler Jeep Dodge](https://www.stevenscreekchryslerjeepdodge.net/)
- [Stevens Creek Kia](https://www.stevenscreekkia.com/)
- [Fremont Mazda](http://fremontmazda.com/)
- [Serramonte Subaru](https://www.serramontesubaru.com/)
- [Serramonte Volkswagen](https://www.serramontevw.com/)
- [Hayward Volkswagen](https://www.vwhayward.com/)
- [Hayward Nissan](http://www.haywardnissan.com/)
- [Stoneridge Chrysler Dodge Jeep Ram](https://www.stoneridgechryslerjeepdodgeofdublin.com/)
- [Sunnyvale Chrysler Dodge Jeep Ram](https://www.sunnyvalecdjr.com/)

The **ShopCarX** scraper is not linked here as Sean is actively working on it himself at the moment, contact him for more information.
The scraper is still under development, right now the vehicles are just showing dummy inventory data.

</details>


</td>
</tr>
</table>

<details open>
<summary><b>Key Pages</b></summary>
<br>

<table>
<tr>
<td>
<div align="left">
 <h3>Page for all car inventory: </h3>
 <body> - The path is <code>/dashboard/shop</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/1tErCwQ.jpeg" alt="Car" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Page for single car: </h3>
 <body> - The path is <code>/dashboard/shop/[makeName]/[id]</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/8KH1D6c.jpeg" alt="Car" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via Make & Model: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
</div>
<br/>
 <img src="https://i.imgur.com/PT8Be5L.jpeg" alt="CarFax" width="350px">
</td>
</tr>

<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via Vehicle VIN: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
 <br/>
 <body> - Then you must click on the Vehicle VIN button!</body>
</div>
<br/>
 <img src="https://i.imgur.com/0iyblCG.jpeg" alt="CarFax" width="350px">
</td>
</tr>

<tr>
<td>
<div align="left">
 <h3>Entry Page for Carfax Price Estimate via License Plate: </h3>
 <body> - The path is <code>/dashboard/carfax-value</code></body>
 <br/>
 <body> - Then you must click on the License Plate button!</body>
</div>
<br/>
 <img src="https://i.imgur.com/IHKZj5K.jpeg" alt="CarFax" width="350px">
</td>
</tr>





</td>
</tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>
</details>


<!-- GETTING STARTED -->
## Getting Started
<details open>
<summary><b>Installation Details</b></summary>
<br />

<b>1. Start the **ShopCarX** server:</b>
- Clone [server from the repo here](https://github.com/seanmodd/jamstack-final-backend/).
   ```sh
   git clone https://github.com/seanmodd/jamstack-final-backend.git
   ```
- Once you have cloned it locally, run <code>npm install</code> to install all the dependencies.
- Now run <code>npm run develop</code> to start the server, now the server should be live on localhost:1337!

<b>2. Start the **ShopCarX** frontend:</b>
- Clone this github repo to your local machine.
```sh
   git clone https://github.com/seanmodd/cleaningNext.git
   ```
- Once you have cloned it locally, ***you don't need to access branch vSean unlike the next12 repo!!*** 
- Great, now you run <code>yarn install</code> to install all the dependencies.
- Now run <code>yarn run start</code> and you can visit the web app now live on localhost:3000!

</details>




<!-- GraphQl -->
## GraphQl

#### Explained: How GraphQl is being used with Redux for Server-Side Rendering
<summary>Overview of the GraphQl Queries occuring on page <code>/dashboard/shop</code>, <code>/dashboard/shop/[makeName]</code> and <code>/dashboard/[makeName]/[id]</code> which <b>server-side render</b> all cars from the Strapi GraphQl API</summary>
<br />


<details open>
<summary><b>How the GraphQl Queries Are Being Called?</b></summary>
<br />


The GraphQl Queries are being both **server-side rendered** while being dispatched via **redux toolkit** in the following approach:

- To see a sample of it occurring, please visit the page <code>/dashboard/shop/index</code>
- You will notice two critical redux-related imports: <code>import { getProducts, filterProducts } from 'src/___redux/slices/product';</code> and <code>import { wrapperStore } from 'src/___redux/store.js';</code>
  - The redux is being server-side rendered due to the wrapperstore which is imported from <code>import { wrapperStore } from 'src/___redux/store.js';</code> and is not as relevant in this instance
  - More relevant: the getProducts and filterProducts being imported from <code>import { getProducts, filterProducts } from 'src/___redux/slices/product';</code> 
- Open the file from <code>import { getProducts, filterProducts } from 'src/___redux/slices/product';</code>
- In order to see the GraphQl query, go to the getProducts dispatch and you will see how the GraphQl queries are being made!
  - You'll notice a lot of them are just junk queries and not currently being utilized, we should clean this up definitely but for now it's just there for reference I guess... sorry I suck

</details>

<details open>
<summary><b>How to Test the GraphQl Queries?</b></summary>
<br />


The GraphQl Queries can be made through a playground I have created on **Apollo Studio**, follow the steps below to test it:

 <img src="https://i.imgur.com/VmonacB.jpeg" width="350px">

- Go to the shared playground I have created [here in Apollo Studio](https://studio.apollographql.com/graph/ShopCarX-Pavan/explorer?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoCGeAlmagM4CyZA1ggBQAkA7gBb4LpEAUgGUA8gDkAlEWAAdJESIA3CtTqsefAV154E0uQsVEAxMtU0UtGfONFKYW8awoCTxWagQANhDzvTIlpKAC8EANpXb3CjRQAHKigYuygKAH0kMkQA1Lw0uGYEDKzk4wSIMBgoFBtY4wcAxUzsusVUlAQAcz9iQzs7BtbjZtL%2BojAEWigqOJRKCCRGogBfeVWjdfWQABoQFSoyACNo2gwQPqJZEE09K4ELxSvyyuq72rGrkbSvVDJKJFobyuUG4hFo0X8IAC60UmxAyyAA&variant=current)
  - You may have to create your own free Apollo Studio account to test the GraphQl queries, please go ahead and do so!
- Now you may run sample GraphQl queries, or even the very same ones I have made and dispatched from within <code>'src/___redux/slices/product'</code> 

</details>


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Todo -->
## Todo

#### MOST IMPORTANT ACTION ITEM:
<summary><b>Showing All Likes On User Dashboard</b></summary>

*Please accept my invite I made to you so you can create your own branch off of THIS repo, cleaningNext!*  
<img src="https://i.imgur.com/C2iyFC0.jpeg" />

- [x] Create an option to favorite a vehicle with the open heart
- [x] After click, item will be added to the favorites list
- [ ] ENSURE THAT THE USER CAN ONLY FAVORITE A VEHICLE ONCE SO IT IS NOT DOUBLE-COUNTED ON THE FAVORITE LIST IN THE BACKEND - NOT COMPLETED
- [ ] Currently, when user clicks favorite, it doesn't signify it on the frontend, thus, after one click, the heart will turn to FILLED to signify that favorite is true 
- [ ] After second click, the heart will turn back to EMPTY to signify that favorite is false 
  
#### SECOND MOST IMPORTANT ACTION ITEM:
<summary><b>Create Visitor Popup to Retrieve Emails</b></summary>

- [ ] For visitors who have been on website for over 5 seconds as guest, create a dialog popup to retrieve email for new announcements and more


#### THIRD MOST IMPORTANT ACTION ITEM:
<summary><b>Carfax Price Estimator</b></summary>

- [ ] Complete the carfax price estimator page on <code>/dashboard/carfax-value</code> with the 3 approaches to find out your car's value immediately
  - [ ] Before we show the price of the vehicle, request for mobile number or email address and we must store that data internally and get notified of it internally!
  - [x] Make and model carfax esitmator must be created on <code>/dashboard/carfax-value</code> and after submitting valid data, redirects to <code>/dashboard/carfax-value/make</code>...
  - [x] VIN carfax estimator must be created on <code>/dashboard/carfax-value</code> and after submitting valid data, redirects to <code>/dashboard/carfax-value/vin</code>...
  - [ ] License Plate and state estimator must be created on <code>/dashboard/carfax-value</code> and after submitting valid data, redirects to <code>/dashboard/carfax-value/vin</code>... <b>this is because the license plate and state data points retrieve the VIN and then the VIN is used to retrieve the vehicle so we're back to the same approach utilized in the VIN estimator</b>



#### ALL OTHER ACTION ITEMS:
<summary><b>Create the Inbox Page for Users Who Have Signed In</b></summary>

- [ ] On <code>/dashboard/mail/all</code> complete the look and functionality to allow users to send messages back and forth with Admin (us)

<summary><b>Fully Featured Authentication Flow</b></summary>

- [ ] Create registration
  - [x] Verification required via email after registration with sendgrid or nodemailer...
- [ ] Create login
  - [x] If email already exists, notify the user of this...
- [ ] Create a reset password and trigger emails with sendgrid or nodemailer

<summary><b>Finish the Vehicle Search Capability</b></summary>

- [ ] Create a search capability utilizing the search bar component which is already created

<summary><b>Automatically Request for Zip Code Access</b></summary>

- [ ] Ask for location access in the app in order to get the zip code

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- COMPLETED -->
## Completed

<summary><b>Completed Tasks</b></summary>

- [x] Integrate with minimals.cc template and update to utilize Next12
- [x] Fetch Data from Scraper that's connected to Strapi backend...
- [x] Extract VIN number from Scraper and fetch car features from calling CarXE API by searching up that VIN number the Scraper had retrieved...
- [x] Initialize firebase v8 for authentication
- [x] Establish valid registration
- [x] Establish a valid login capability
- [x] Create logout flow
- [x] Create a [makeName] subcategory through which every [id] is dynamically generated
- [x] Fetch all data using SSR rendering from Redux onto /dashboard/shop so it picks it up on ‘page inspect’ for SEO purposes...
- [x] Sort by price



<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

My Twitter and Email - [@persiansean](https://twitter.com/@persiansean) - sean@senpex.com <br/>
<b>Pavan Tank is helping on the ShopCarX project as well and is a great guy!</b>

Project Link: [https://github.com/seanmodd/cleaningNext](https://github.com/seanmodd/cleaningNext)

<p align="right">(<a href="#top">back to top</a>)</p>

