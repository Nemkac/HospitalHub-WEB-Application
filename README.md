<a href="https://ibb.co/5n09yrp"><img src="https://i.ibb.co/wwkLXSG/NavLogo.png" alt="NavLogo" border="0"></a>
# HospitalHub
HospitalHub is a web application designed to enable the rental and delivery of medical equipment to private and public clinics, hospitals and surgeries.
The application was developed as our college project. HospitalHub enables the user to easily and quickly search for equipment and companies that offer the equipment he needs and order it easily.


As with all other ordering and delivery applications, HospitalHub allows you to monitor the preparation and delivery of your order at any time. For owners of private, unlicensed clinics, 
the application offers several partner programs that are adapted to every budget.


Customer satisfaction always comes first, and accordingly, HospitalHub places a clear emphasis on safety when it comes to equipment delivery.
In addition, the application also offers a modern interface that is, above all, easy to use, so that the client can, in just a few steps, search and order what he is interested in.

## Key Features
* <b>User-Friendly Interface</b>: HospitalHub boasts an intuitive design for seamless navigation, ensuring users can easily discover and engage with the platform.
* <b>Comprehensive Equipment Catalog</b>: A curated catalog presents a diverse range of medical equipment, categorized for quick and efficient browsing.
* <b>Direct Ordering</b>: The platform facilitates a direct ordering process, simplifying transactions between users and equipment providers.
* <b>Reliable Network</b>: We've collaborated with reputable companies, creating a trusted network to ensure the quality and reliability of the equipment offered.

## How it works:
1. <b>Company Exploration</b>: Users can explore a list of vetted companies, each offering a unique selection of medical equipment for rent.
2. <b>Equipment Discovery</b>: The platform hosts a detailed database, allowing users to explore and select specific medical equipment that suits their requirements.
3. <b>Order Placement</b>: Users can place orders directly through HospitalHub, streamlining the communication and transaction process.
4. <b>Convenient Delivery</b>: The chosen company then ensures the timely and hassle-free delivery of the ordered equipment.
  
# Application structure
<a href="https://ibb.co/MZZLvgd"><img src="https://i.ibb.co/DzznJ1d/Hospital-Hub-Class-Diagram-drawio.png" alt="Hospital-Hub-Class-Diagram-drawio" border="0"></a>

# Backend
The backend part of the application was created using Java Spring Boot technology. PostgreSQL database is used for data storage.


Regarding security, the application uses the JWT service and generates a token for each logged-in user. The token is later used to display and enable the corresponding functionalities.
Also, for additional protection, we used options from the Spring Security package. 
On the other hand, Spring Data JPA is used to work with the database and manipulate data.


In addition to users, for whom HospitalHub is primarily intended, there are also Company Administrator and System Administrator roles. Each of these roles has an adequately adapted interface and available functionalities.

# Frontend

The frontend part of the application was developed using the Angular framework. During development, the team made sure that the design was consistent on every page.
The style of the application is predefined and maintained throughout the development. A predefined color palette was also used, as well as the size and positioning of text and components on the pages.


The Leaflet library was used to display the company on the map and to display and monitor delivery. 
In this way, we provided both the user and the delivery person with a clear view and all the necessary information related to the location.


Overall, the goal for the design of this application is to be minimalistic and adapted to each type of user, while at the same time being modern.
It is necessary to provide each type of user with all possible information and all possible functionalities without cluttering the pages with content that will only divert his attention from why he is there.

# Functionality

### Login and Register

As with any platform that deals with selling, reselling, renting, etc., in order to use the services that HospitalHub offers, you must have an account. 

Logging in to the platform is done through the login form, which also offers options for logging in via Google or Facebook profiles, while a simple user-friendly registration form is provided for those who do not have an account on HospitalHub.
During registration, it is necessary to confirm and activate the profile via the activation link sent to the email entered by the user in the registration form.

A new user who has just registered, after activating the profile, is assigned the role of *AUTHENTICATED USER*, and in accordance with that role, he is shown the appropriate links and is enabled to perform the appropriate activities on the application.

Each user logs in using their email address, which must be unique, and a password that is hashed to maintain the security of the account.

<a href="https://ibb.co/xszCLPM"><img src="https://i.ibb.co/hM279hK/Login.png" alt="Login" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>
<a href="https://ibb.co/G5rYPLB"><img src="https://i.ibb.co/yQxvs1G/Register.png" alt="Register" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>

# Authors
* <a href="https://github.com/NemanjaRanitovic">Nemanja Ranitović
* <a href="https://github.com/blanusa">Vladimir Blanuša
* <a href="https://github.com/AndreaaMi">Andrea Mitić
* <a href="https://github.com/Nemkac">Nemanja Todorović
