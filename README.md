# Backend

This backend was developed in C# using .Net Core 6.

I am using SQL Server as my Database. 

In the Connection String in AppSettings.Development.json please use your own SQL Server Connection String. 

Run the Migrations to create all database tables by going into Nuget Management Console and running "dotnet ef database update"

You can now Run Pizza.API to start the backend

## Client

Before starting the client dev server, run "npm install" to get the latest libraries needed for client to run.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Home

The Home page will have four buttons to take you to where you want to go. You can see, add, and edit Employees with the Employees Button. You can see how many Customers the restaurant has with the Customers button. 

You can also see, add, and edit Orders with the Orders Button. Lastly, you can see the reports in Reporting.

## Employees

To add an employee, click Add Employee. First and Last Name, and Salary are required. 

To edit an employee, click the pencil icon next to the first name of the employee. You can also disable employees by editing an employee and unchecking is current employee. Disabled employees will be grayed out but can still be edited. Disabled employees will no longer be selected for delivering Orders.

## Customers

You can see the list of customers in this page. 

## Orders

To add an order, click Add Order. Pizza Type, size, price, delivery address, estimated time, customer first and last name, and phone number are all required. 

To edit an order, click the pencil icon next to the pizza type. 

Depending on the order status you can update the employee assigned or the tip. You can only assigned employee assigned when order status is 'delivering'. You can assign the tip when the status is 'delivered'.

Also, when updating the order status, you are only allowed to click the next order status. Order statuses should be updated sequentially. 

Orders are also capturing the date and time when orders are made, out for delivery, and completed for reporting purposes. 

## Reporting

You will have three reports on this page. 

You have two date filters (start and end) on top to apply to the reports. Once you have your date fields selected, click Apply Filters to query the new reports. 

Employee Compensation Report allows you to see how many hours an employee worked, total salary paid, total tip, and the total (salary + tip) the employee got that day. 

Hours worked is computing how many hours the employee drove to their destination multiplied by two because it would take them the same amount of time to get back to the restaurant.

With the hours worked multiplied by the hourly wage is the Total Salary Paid. 

Total Tip is added to the total salary paid to get the total paid the employee got during the days selected in the filters.


Employee Orders Report allows you to see the price, tip, employee, completion time, estimated time and the difference between completion and estimated time. If the difference is negative, then the background of that row and column will turn red. If it is positive, it will be green. 

Revenue Report allows you to see the revenue, employee compensation and profit of the restaurant. If profit is negative, the background color of row and column will be red. If it is positive, it will be green. 