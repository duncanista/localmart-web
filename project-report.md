# Project 1

##### TC3041 - Advanced Databases | Julio Guillermo Arriaga Blumenkron

## Team:
* **Natalia Meraz Tostado** - A01745008
* **Jordan González Bustamante** - A01745993
* **Luis Alfonso Alcántar López Ortega** - A01374785
* **Roberto Téllez Perezyera** - A01374866

---
### Contents:
- [Rationale](#rationale)
- [Design & implementation](#application-and-database-design-and-implementation)
- [User's manual](#user-manual)
- [Info sources](#information-sources)

---

## Rationale
_LocalMart_ is an ally for all those who wish to buy or sell an article or service online, but only within a local community they belong to. It could be a university campus, a residential zone or complex. Users who want to sell something just have to post the article, add its name, description, and image. A company or brand also has to be added with the listing, which can be selected if already stored in the application’s database, thus, preventing users from typing the brand name differently, which could result in some products not showing up if a search is made by the company.

We decided to use the React library because we find an excellent ally to make all kinds of web or mobile applications. Basically it is about rendering HTML on the server and on the client, reducing the workload to make a friendly search engine. By having the views associated with the data, we don't need to write code to manipulate the page every time the data changes. Also, each component contains the logic and the visual part, so it is easier to reuse them within other components, and even on further projects.


## Application and database design and implementation

Nowadays, developers have to plan, design and implement technological solutions at a fast pace. This means that programmers have to create new methodologies and technologies in order to fulfill requirements of projects and meet the organization’s expectations. One good example where all this fits is the one with web applications. It’s a MUST for all companies to have their own landing pages and web apps. Programmers will find that they will need to reuse components they have previously developed, and that’s one of the reasons ReactJS was created. 

Data storage, as well as requirements and stakeholder needs on this subject have also changed and are part of the fast-paced atmosphere that businesses and individuals live in. Though relational databases are robust and reliable, given the sets of rules (schemas) that make up every relational database, new tools and data modeling techniques that no longer rely on such strict rules (schemaless) have also proven to be effective and positioned themselves well in the map of available database products, some of them being MongoDB and Google’s Realtime Database and Cloud Firestore, the last two part of a larger offering: Firebase.

For the application’s database implementation, Cloud Firestore was chosen. This NoSQL database follows a document-collection model, in which objects are stored in a tree hierarchy made up of collections containing documents.

Documents, much like JSON objects or dictionaries contain key-value pairs, called fields in the Cloud Firestore nomenclature. Fields can be from numbers and strings to maps, which resemble another JSON object contained in the document. Documents cannot exceed a MegaByte in size.
All documents must be contained in collections, where we can group and keep documents of the same type, storing information for the same object. Documents cannot contain other documents within them, but they can point to other collections (i.e., sub-collections, which would be one level down in the hierarchical tree). The root of the tree only contains collections, since documents can only exist within them.

![Firestore's data model](/report-images/IMG_0554.PNG)
>An example of how data is modeled in Firestore: collections containing documents, potentially pointing to sub-collections.  

The core advantage of this model is how fast and easy reading becomes, given that all the information we could require is already in one place, due to the usage of denormalized data. Therefore, there is no longer need to use join operations and searching through multiple tables to take place. And while writing will now have to take place multiple times, in multiple places, the idea behind this model is that in the majority of cases, database reads will outnumber writes.

To get data, Firestore implements shallow queries. With the alternating “collection-document-collection-...” nomenclature, we can retrieve only the data we want from a collection or document without unnecessarily reading any collections and documents nested further. When we do need access deeper, in terms of code, we just have to keep drilling-down.  
>i.e.,  
``collection().document()`` will only acess the requested document even if it points to a sub-collection  
``collection().document().collection().document()`` would give us access to data in a nested document

Certainly, not having a schema and filling certain fields “by convention” when writing can seem risky, and coding defensively IS encouraged when working with schemaless databases. Nonetheless, this offers the ability of adding additional fields or omitting fields in documents for various reasons without error. And Firestore’s security rules, also configured by the developer, contribute significantly to enforcing certain measures or guaranteeing that no user (no matter the privilege level, if any) has access to data they shouldn’t see or modify.

![Our preliminary model](/report-images/initial-diagram-chido.jpeg)

Considering the requirements of the real world situation and Cloud Firestore’s data model, Localmart’s database is comprised of the following collections:

- Communities
  - Contains the community documents.
  - Each document is comprised of the community name or alias only. No other fields are needed (e.g., we could think of city, state, ZIP code), since the unique name for each community is sufficient to then display to users linked to a particular community all the available listings within that community.

- Companies
  - Brand names of articles being sold are stored in individual documents.

- Products
  - Its documents store the information of the articles for sale, including (but not limited to, considering this is a NoSQL model) the product brand, name and description of the article, which user is selling it, as well as a “sold” boolean flag.

- Users 
  - Necessary to keep track of who is selling or buying a product within the system.



## User manual

1. Visit: https://localmarto.web.app/  

To access, click on the _Log in_ button on the top right corner.
![01](/report-images/01_manual.jpeg)

2. On the login prompt, you may use the following to access:
>:credit_card: **Your credentials:**  
Username: ``julio@localmart.mx``  
Super strong password: ``julius`` (we had to fulfill the 6 character minimum)
![02](/report-images/02_manual.jpeg)

### Welcome to the LocalMart landing page!
![04](/report-images/04_manual.jpeg)

3. Click on **Users** to see the registered users to date.
![05](/report-images/05_manual.jpeg)

:bulb: Since you have admin privileges (and very likely you will want to test all the functionality of the database, which includes writing and not only reading), you can click on the blue ``Add`` button on the top left to add a new user.

4. You can now add values in the fields, which will be recorded in a new document in Firestore when you save your changes.  
This is a bit of a private, admin-controlled user sign up page, hence the prompts for passwords.  
You can also define if this new user will have admin privileges or not.
![06](/report-images/06_manual.png)

5. Need to remove a user? On the table showing all the existing users, click on any user. It should take you here:
![08](/report-images/08_manual.png)  
You can now click on the ``Delete`` button should you want to remove the user from the app and the database.

6. As you'd expect, you an also edit users.  
Again, click on a user from the table. You should see a screen like the previous one.  
**Now, try editing one of the fields** :warning: otherwise, the ``Save`` button will not be enabled.
![09](/report-images/09_manual.png)  

7. Don't forget to visit the products section too! Go to **Products** in the navbar.
You should be able to see current listing, and not to add a listing, not using the blue ``Add`` button on the top left.
![07](/report-images/07_manual.jpeg)
As with users, you can also edit details of the listings or remove them.



## Information sources
* Firebase. (March 26, 2018). _What is a NoSQL Database? How is Cloud Firestore structured? | Get to Know Cloud Firestore #1_. Retrieved from: https://youtu.be/v_hR4K4auoQ 

* Firebase Documentation (n.d.). _Cloud Firestore data model_. Retrieved from: https://firebase.google.com/docs/firestore/data-model  

* GitHub Guides (January 15, 2014). _Mastering Markdown_. Retrieved from: https://guides.github.com/features/mastering-markdown/ 

* Mahmood, H. (May 27, 2018). _Advantages of developing modern web apps with React.js_. Retrieved from: https://medium.com/@hamzamahmood/advantages-of-developing-modern-web-apps-with-react-js-8504c571db71  
