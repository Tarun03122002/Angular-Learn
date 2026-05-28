# Route Guards is used perform some business login before navigating to and away from a  route
# UseCases -> 
## Prevent unauthorized access to a  route 
## ASk user to Save form data before navigating to a route
## Delaying access to a route before getting some data from BE
## Validating route parameter before navigation to a route


# Types of Route Guard
## canActive,canActiveChild used if we want only authorized user will access that route,unauthorized user will unable to access that route
## canDeactive -> used for  user to Save form data before navigating to a route
## resolve -> Delaying access to a route before getting some data from BE
## canLoad -> It prevent the loading of lazy load module. if we want only authorized user will access the source code of a project/application


<!-- Using route guard -->
# Create a function which contains business logic and return a boolean value
# assign that function to a specific route gurad property of route object