  <a href="https://ibb.co/5n09yrp"><img src="https://i.ibb.co/wwkLXSG/NavLogo.png" alt="NavLogo" border="0"></a>
# HospitalHub
HospitalHub is a web application designed to enable the rental and delivery of medical equipment to private and public clinics, hospitals, and surgeries.
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

## How It Works:
1. <b>Company Exploration</b>: Users can explore a list of vetted companies, each offering a unique selection of medical equipment for rent.
2. <b>Equipment Discovery</b>: The platform hosts a detailed database, allowing users to explore and select specific medical equipment that suits their requirements.
3. <b>Order Placement</b>: Users can place orders directly through HospitalHub, streamlining the communication and transaction process.
4. <b>Convenient Delivery</b>: The chosen company then ensures the timely and hassle-free delivery of the ordered equipment.

# How To Run
1. The first thing to start is docker. First, you need to pull the RabbitMQ image with this command:
   ```
   docker pull rabbitmq:3.12.12-management
   ```
   
   After that, the pulled image is started with the following command from cmd:
   
   ```
   docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3.12.12-management
   ```
   
   **If you do not run the image from the terminal but from the desktop application, it is important to choose the default RabbitMQ port 5672.**
   
3. The next thing to run is backend. It is run from IntelliJ or any other environment as you would run any other java project.

4. After backend is started, the next thing to start is the frontend part.
Before starting, you need to have node.js and npm installed on your computer and it is necessary to update the versions of the used libraries and extensions by running the following command from the terminal:

   ```node.js
   npm update
   ```

   Finally, the frontend part is started with the following command from the terminal:

   ```Angular
   ng serve
   ```

# Application structure
<a href='https://postimg.cc/7CkTppvC' target='_blank'><img src='https://i.postimg.cc/5tHqFVnm/Hospital-Hub-Class-Diagram-drawio.png' border='0' alt='Hospital-Hub-Class-Diagram-drawio'/></a>

# Database design
### 1. Logical 
<a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/sxFWbkm9/Hospital-Hub-Logical-Model.png' border='0' alt='Hospital-Hub-Logical-Model'/></a>

### 2. Relational
<a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/MHDGtNFG/Hospital-Hub-Relational-Model.png' border='0' alt='Hospital-Hub-Relational-Model'/></a>
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

<a href='https://postimg.cc/069H3qT4' target='_blank'><img src='https://i.postimg.cc/zfhZyz0q/Login.png' border='0' alt='Login'/></a>
<a href='https://postimg.cc/fVd3VVRG' target='_blank'><img src='https://i.postimg.cc/T37nHmM3/Register.png' border='0' alt='Register'/></a>

### Profiles
Each user has the option to view their profile and make certain changes to it. What will be displayed on the profile page in addition to personal information about the user depends on the role the logged-in user has.
#### 1. Company Administrator

In addition to personal information, the company administrator has his personal work calendar on the profile page, which he can view on a daily, monthly, and yearly basis. The work calendar is related to the company where the administrator is employed. The calendar shows all available and reserved appointments for equipment pickup that belong to the logged-in admin.

In addition, the admin can review the details for each appointment as well as create a new appointment that will automatically be displayed as a new free appointment on the page of the company where the administrator works.

<a href='https://postimg.cc/tsKK3m52' target='_blank'><img src='https://i.postimg.cc/nLrntyQb/company-Admin-Profile.png' border='0' alt='company-Admin-Profile'/></a>
<a href='https://postimg.cc/yDcQH6my' target='_blank'><img src='https://i.postimg.cc/kghkWBDz/appointment-Info.png' border='0' alt='appointment-Info'/></a>
<a href='https://postimg.cc/HcZ32rmd' target='_blank'><img src='https://i.postimg.cc/prx7Pj1h/new-Appointment.png' border='0' alt='new-Appointment'/></a>

#### 2. System Administrator

A newly registered user cannot become a system or company admin on his own. The system administrator is responsible for creating such users, who has options for creating a new system or company administrator on his profile. 

In addition, it has the option to register new companies on the system at the request of the company owner.

<a href='https://postimg.cc/qNQ3HNjn' target='_blank'><img src='https://i.postimg.cc/nLfY77md/sys-Admin-Profile.png' border='0' alt='sys-Admin-Profile'/></a>
<a href='https://postimg.cc/KRp106zr' target='_blank'><img src='https://i.postimg.cc/qv42v0HY/new-Company-Admin.png' border='0' alt='new-Company-Admin'/></a>
<a href='https://postimg.cc/c641PFPD' target='_blank'><img src='https://i.postimg.cc/c1fKgjhN/new-Sys-Admin.png' border='0' alt='new-Sys-Admin'/></a>
<a href='https://postimg.cc/KKZC4HPw' target='_blank'><img src='https://i.postimg.cc/cJYWkqrx/new-Company.png' border='0' alt='new-Company'/></a>

#### 3. User

A standard user has basic options - profile modification (the previous two types of users also have this option) and an overview of all scheduled appointments. 

For each appointment, the start date and time, the duration, and the list of the equipment ordered are shown.

<a href='https://postimg.cc/dkGFLfpP' target='_blank'><img src='https://i.postimg.cc/mD5g6fSD/user-Profile.png' border='0' alt='user-Profile'/></a>
<a href='https://postimg.cc/BXrd1p5J' target='_blank'><img src='https://i.postimg.cc/qvq0SZz6/update-Profil.png' border='0' alt='update-Profil'/></a>

### My Company
The company administrator has the option to review the company he works for and make certain changes. He can add, change, and remove equipment that the company has to offer, as well as change data about the company itself.

It also has the option to view the company's work calendar. The company's work calendar shows all available and reserved appointments of all administrators working in that company.
He can also add a new appointment to the company's calendar and that appointment will be displayed on the company's calendar and will be visible to all administrators and users who visit the company's profile (until it becomes reserved). The appointment he adds to this calendar is also added to his personal calendar which is displayed on his profile.

In addition, it also has a display of all company administrators.

<a href='https://postimg.cc/LJ0HJw4h' target='_blank'><img src='https://i.postimg.cc/43XnSRrv/my-Company.png' border='0' alt='my-Company'/></a>
<a href='https://postimg.cc/MvpHXy0P' target='_blank'><img src='https://i.postimg.cc/zXngt7yr/add-Equipment.png' border='0' alt='add-Equipment'/></a>
<a href='https://postimg.cc/SJPSsHxR' target='_blank'><img src='https://i.postimg.cc/Njs5Nch6/edit-Equipment.png' border='0' alt='edit-Equipment'/></a>
<a href='https://postimg.cc/sBytDJ71' target='_blank'><img src='https://i.postimg.cc/CKfY7PKC/company-Calendar.png' border='0' alt='company-Calendar'/></a>
<a href='https://postimg.cc/s1tHgcRy' target='_blank'><img src='https://i.postimg.cc/qM7PQbbt/company-Administrators.png' border='0' alt='company-Administrators'/></a>
<a href='https://postimg.cc/0KgGPVKB' target='_blank'><img src='https://i.postimg.cc/7hhK1cHw/update-Company.png' border='0' alt='update-Company'/></a>

### Search equipment

The HospitalHub visitor, whether logged in, registered, or not, has the option to search for equipment at the level of the entire site.

Basic information is displayed for each equipment, as well as the option to add the desired equipment to the basket, from where the reservation and purchase will be made.
Only users who have an account on the site will be able to make a reservation, and only after logging in.

The user can search for equipment by name and can perform filtering based on price and type of equipment.

<a href='https://postimg.cc/8fR36Zk8' target='_blank'><img src='https://i.postimg.cc/KjwyCWdY/search-Equipment.png' border='0' alt='search-Equipment'/></a>

### Search companies

In addition to the search for equipment, users are also enabled to search for companies in two places: on the landing page, where the most popular companies will be listed first, followed by the others, and on the company search page, where the company search takes place at the level of the entire site.

The user can search for companies based on name, city, state, and minimum rating.

<a href='https://postimg.cc/JDD3v0SP' target='_blank'><img src='https://i.postimg.cc/mDVdcFjf/search-Companies-Landing.png' border='0' alt='search-Companies-Landing'/></a>
<a href='https://postimg.cc/0rKZHXsP' target='_blank'><img src='https://i.postimg.cc/J7Pg0SYD/search-Companies-Page.png' border='0' alt='search-Companies-Page'/></a>

### Visit company

After searching for companies, the user has the opportunity to view the profile of the company he likes the most and from which he wants to order equipment. 

The company page shows basic information related to the company itself, a map with the exact location where the company is located, a list of equipment offered by the company, and the company's work calendar.

<a href='https://postimg.cc/VrknMRqS' target='_blank'><img src='https://i.postimg.cc/tTh5Kv7z/visit-Company.png' border='0' alt='visit-Company'/></a>

The company's work calendar shows all available appointments of all administrators working in that company. 

If none of the available dates suit the user, he has the option to request a new date of his choice. If the requested appointment is within the company's working hours, it is assigned to the first administrator who does not have any predefined appointment in the requested time. 

The new appointment will be automatically added to the work calendar of the administrator to whom it is assigned, and he will be able to see all the information about the new appointment.

<a href='https://postimg.cc/ctMWSQzm' target='_blank'><img src='https://i.postimg.cc/Y0TCQRfJ/visit-Company-Calendar.png' border='0' alt='visit-Company-Calendar'/></a>
<a href='https://postimg.cc/dkRQsPkr' target='_blank'><img src='https://i.postimg.cc/9MKDBcc8/request-New-Appointment.png' border='0' alt='request-New-Appointment'/></a>

### Cart

The logged-in user has the possibility to order the desired equipment from a certain company. 

To create a reservation, the user must select the equipment he wants to order. Marked equipment is added to the cart, from where the order itself is later created. 

Before moving on to finalizing the order, the user must also select the date on which he will pick up the equipment, or request a new date if none suits him. 

When he has completed all the necessary steps, he can complete the order and after that, he receives an email with order confirmation and a QR code with which he can see all the details of the order.


<a href='https://postimg.cc/5Y9CRXBF' target='_blank'><img src='https://i.postimg.cc/KzBD4L4Q/select-Equipment.png' border='0' alt='select-Equipment'/></a>
<a href='https://postimg.cc/QVt7gWN2' target='_blank'><img src='https://i.postimg.cc/FFbx4jMH/select-Appointment.png' border='0' alt='select-Appointment'/></a>
<a href='https://postimg.cc/yWFMPWfT' target='_blank'><img src='https://i.postimg.cc/jq9RR7PB/cart.png' border='0' alt='cart'/></a>

### Delivery tracking
Once the order has been created, the user can request that the ordered equipment be delivered to the desired address. In addition, delivery tracking is enabled in real-time so that the user, at any time, can check where his equipment is located and how long it will take to reach the desired address.

To implement this functionality, RabbitMQ was used in combination with WebSocket.When the user indicates which address he wants delivery to and when he requests delivery, the route from the company to the desired location is drawn and it is possible to track the movement of the delivery vehicle along that route.

When the user indicates which address he wants delivery to and when he requests delivery, the route from the company to the desired location is drawn and it is possible to track the movement of the delivery vehicle along that route. Every 3 seconds, a message representing the current position of the delivery vehicle is entered into the message queue. The sent message is read from the message queue and forwarded to the WebSocket. The frontend is subscribed to the endpoint to which the WebSocket sends the message and reads it from there. After reading the message, the marker representing the vehicle moves to the received coordinates.

<a href='https://postimg.cc/D47vZ4LK' target='_blank'><img src='https://i.postimg.cc/1Xqfvpz4/Request-Delivery.png' border='0' alt='Request-Delivery'/></a>



# Scalability
### 1. Suggested strategy for data partitioning
Data partitioning in PostgreSQL is a strategy for organizing large tables to improve query performance and ease data management.

- Quicker search:

  Queries can execute faster because PostgreSQL can focus only on specific partitions that are relevant to the query.

- Easier maintenance:
  
  Adding, deleting, and managing data becomes simpler because it can be done at the level of individual partitions.

- More efficient queries:
  
  Proper partitioning can result in fewer rows being scanned when executing a query, thus reducing system load.

- Improved handling:

  Existing management tools, such as PgAdmin4, provide support for working with partitioned tables, thus facilitating data administration.

- Scalability

  Partitioning can improve system performance and allow for easier database scaling as data volume increases.

- Optimization for special needs:

  You can customize the partitioning to meet the specific needs of our application, for example, distributing data by geographic regions or time periods.

- Easier data tracking:

  Partitions make it easier to view and track data, especially when organized according to logical criteria.

In our example, partitioning could be done according to the types of ordered equipment.
Each order contains information on which equipment is ordered. Partitioning would help in that case,
when querying the table because all that equipment goes through the cycle of ordering, delivery, removal...

### 2. Suggested strategy for database replication and ensuring fault tolerance
Database replication is the process of copying data from one database to another to provide redundancy, improve availability, and support read scaling. In the context of our PostgreSQL database application, replication can offer several advantages:

- High availability:

  If the source database experiences a hardware failure, network problem, or other technical difficulty, the replicas can take over functionality, ensuring minimal disruption to the application.

- Load reduction:

  Replicas can be used to distribute read queries, reducing the load on the database source and improving system performance.

- Recovery from major failures:

  In the event of a severe failure, replicas enable faster recovery and reestablishment of the system, reducing downtime.

- Analytics and reporting support:

  Replicas can be used for data analysis or reporting, allowing users to access data without affecting the performance of the transactional system.

There are 2 types of replication. Streaming and logical replication. They differ in the periods of synchronization of bases. The first is continuous (up to date) while the second is more configurable and better suits our requirements.

### 3. Suggest which user operations should be monitored in order to improve the system

We assume that the greatest attention should be paid to the reservation of equipment.
Situations such as: 
  1. The number of canceled reservations and the number of accesses to the reservation page should be monitored to see if something is distracting users from completing the action.
  2. Time spent on equipment pages, to see if users are sufficiently informed about the equipment they order.

### 4. Suggested data caching strategy
Regarding data caching, it is necessary to cache those data that are needed to perform the largest number of operations.
We use the built-in data caching library in Spring Boot.

In the micro example, data related to the user is cached. In particular, once the data related to the logged-in user is supplied, there is no longer any need to create queries to the database, but all that data is extracted from the cache memory. Only the first access goes to the base, all others go to the cache.

In addition to this, candidates for cashing are EquipmentPickupSlots as well as information about the company, whether it is from the user or the company administrator.

### 5. Suggested strategy for setting up a load balancer
Load balancers play a pivotal role in distributing incoming network traffic across multiple servers to prevent any one server from becoming overwhelmed, thereby optimizing resource utilization and ensuring high availability. In the context of our application, the strategic placement of the load balancer is crucial for the following reasons:

- High Availability:

  Placing the load balancer at the frontend ensures continuous availability by evenly distributing traffic across multiple backend servers. This minimizes the risk of downtime due to server failures or maintenance activities.

- Scalability:
  
  By intelligently distributing incoming requests, a load balancer enables seamless horizontal scaling. As our application experiences increased demand, additional servers can be easily added to the backend pool, and the load balancer dynamically adjusts traffic distribution to accommodate the surge in traffic.

- Performance Optimization:

  Load balancers can perform health checks on backend servers, directing traffic only to healthy servers. Additionally, they can employ advanced algorithms to route requests based on factors such as server load, geographic proximity, or session persistence, thereby optimizing performance and user experience.

- Security Enhancement:

  Load balancers can act as a barrier between the internet and backend servers, providing an additional layer of security by concealing server IP addresses and mitigating common web-based attacks such as DDoS (Distributed Denial of Service) attacks.


# Authors
* <a href="https://github.com/NemanjaRanitovic">Nemanja Ranitović
* <a href="https://github.com/blanusa">Vladimir Blanuša
* <a href="https://github.com/AndreaaMi">Andrea Mitić
* <a href="https://github.com/Nemkac">Nemanja Todorović
