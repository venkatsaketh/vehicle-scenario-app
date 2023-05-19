 # Steps to install project in local
 1. Download Project as zip file from this link https://github.com/venkatsaketh/vehicle-scenario-app/tree/master. (use master branch).
 2. Extract the zip file and open project in VS code.
 3. Do `npm install` in terminal.
 4. After node modules are installed. Run json-server with this cmd - `json-server --port 4000 --watch db.json`.
 5. Open another terminal and run `npm start` cmd.

#  Brief explanation about the project.
  1. In this project i have done create, display, update, delete operations for Scenario and Vehicle data. Every Scenario has multiple vehicles.
  2. scenario fields are scenarioName, time.
  3. vehicle fields are scenarioList, vehicleName, speed, positionX, positionY, direction.
  4. scenarioList in vehicle data will be one of the scenarioName.
