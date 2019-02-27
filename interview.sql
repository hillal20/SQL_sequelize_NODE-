DDL (Data Definition Language)
  – It allows you to perform various operations on the database 
  such as CREATE, ALTER and DELETE objects.


DML ( Data Manipulation Language)
   – It allows you to access and manipulate data. 
   It helps you to insert, update, delete and retrieve data from the database.

DCL ( Data Control Language) 
– It allows you to control access to the database.
   Example – Grant, Revoke access permissions.

table refers to a collection of data 
  Example Table: StudentInformation
          Field: Stu Id, Stu Name, Stu Marks


Primary key is a column (or collection of columns) 
    that uniquely identifies each row in the table.


Constraints : 
    NOT NULL
    CHECK
    DEFAULT
    UNIQUE
   PRIMARY KEY
   FOREIGN KEY

Foreign key :  is a link between the data in two tables.
This index :  does not allow the field to have duplicate values


create table channel (
  id integer primary key autoincrement,
  name varchar(128),
  organization_id integer,
  
  CONSTRAINT fk_channel_organization_id
  foreign key (organization_id) references organization (id)
  ON DELETE CASCADE
);



Question 1: SQL Query to find second highest salary of Employee

SELECT name, max(salary)  from employee 
where salary < (select max(salary) from employee);



SELECT * FROM suppliers
where length(supplierName) <> 20; -- not equal

SELECT * FROM customers
where CustomerName like "%market%"
        

SELECT * FROM customers
where CustomerName like "%market__"
        