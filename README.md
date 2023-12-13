<a href="https://ibb.co/5n09yrp"><img src="https://i.ibb.co/wwkLXSG/NavLogo.png" alt="NavLogo" border="0"></a>
# HospitalHub
HospitalHub is a web application designed to enable the rental and delivery of medical equipment to private and public clinics, hospitals and surgeries.
The application was developed as our college project. HospitalHub enables the user to easily and quickly search for equipment and companies that offer the equipment he needs and order it easily.
<br><br>As with all other ordering and delivery applications, HospitalHub allows you to monitor the preparation and delivery of your order at any time. For owners of private, unlicensed clinics, 
the application offers several partner programs that are adapted to every budget.
<br><br>Customer satisfaction always comes first, and accordingly, HospitalHub places a clear emphasis on safety when it comes to equipment delivery.
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
<br><br>Regarding security, the application uses the JWT service and generates a token for each logged-in user. The token is later used to display and enable the corresponding functionalities. 
On the other hand, Spring Data JPA is used to work with the database and manipulate data.
<br><br>In addition to users, for whom HospitalHub is primarily intended, there are also Company Administrator and System Administrator roles. Each of these roles has an adequately adapted interface and available functionalities.
