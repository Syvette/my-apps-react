const { Sequelize, DataTypes } = require("sequelize");

// define connection
const sequelize = new Sequelize("hello_world", "admin", "123admin123", {
  host: "localhost",
  dialect: "mariadb",
});

// try connecting to the databaase
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection established.`);
  })
  .catch((error) => {
    console.error(`Connection cannot be established due to: `, error);
  });

// create a model
const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: "low",
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// sync changes to database
// sequelize
//   .sync()
//   .then(() => {
//     console.log(`Creation of Tasks table successful.`);

//     // insert a new record

//     Task.create({
//       name: "Ken Okamoto",
//       description: "Walk the dragon",
//     })
//       .then((res) => {
//         console.log(res);

//         // after inserting a record, query all records
//         sequelize
//           .sync()
//           .then(() => {
//             // findAll()
//             Task.findAll()
//               .then((res) => {
//                 console.log("Retrieving all records ...");
//                 console.log(res);
//               })
//               .catch((error) => {
//                 console.log(
//                   `Error retrieving all recors of Task due to: `,
//                   error
//                 );
//               });
//           })
//           .catch((error) => {
//             console.log(`Failed to sync after insertion of a record: `, error);
//           });

//         // ()after inserting a record, query all records
//       })
//       .catch((error) => {
//         console.log(`Failed to insert new task: `, error);
//       });
//   })
//   .catch((error) => {
//     console.error(`Creation of Tasks table failed due to: `, error);
//   });

// query all records of the databaase
// model.findAll()
// findAll()
//             Task.findAll()
//               .then((res) => {
//                 console.log("Retrieving all records ...");
//                 console.log(res);
//               })
//               .catch((error) => {
//                 console.log(
//                   `Error retrieving all recors of Task due to: `,
//                   error
//                 );
//               });

// query one record
// model.findOne({condition})
/*
  {
    where: {
        id: 3
    }
  }
*/
// sequelize
//   .sync()
//   .then(() => {
//     Task.findOne({
//       where: {
//         id: 33,
//       },
//     })
//       .then((res) => {
//         console.log(res.dataValues);
//         sequelize.close();
//       })
//       .catch((error) => {
//         console.log(`Unable to find a record with id 3`);
//         sequelize.close();
//       });
//   })
//   .catch((error) => {
//     console.log(`Unable to sync database`);
//   });

// deleting a record
// sequelize
//   .sync()
//   .then(
//     // delete a record
//     Task.destroy({
//       where: {
//         id: 5,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         sequelize.close();
//       })
//       .catch((error) => {
//         console.log(`Unable to detelte id 5 due to: `, error);
//         sequelize.close();
//       })
//   )
//   .catch((error) => {
//     console.log(`Unable to sync`);
//   });

sequelize
  .sync()
  .then(async () => {
    const task01 = await Task.findOne({ where: { id: 3 } });
    console.log(task01.name);
    task01.name = "Jerwin Cruz";
    console.log(task01.name);
    task01.save();
    // sequelize.close();
  })
  .catch();
