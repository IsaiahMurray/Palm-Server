const UserModel = require("./user");
const CategoryModel = require("./category");
const ListModel = require("./list");
const TaskModel = require("./task");
const DeckModel = require("./deck");
const IconModel = require("./icon");
const NotebookModel = require("./notebook");
const NotebookCategoryModel = require("./notebookCategory");
const NoteCardModel = require("./noteCard");
const PageModel = require("./page");
const HabitModel = require("./habit");

UserModel.hasMany(ListModel, {
  as: "lists",
  foreignKey: "ownerId",
});
ListModel.belongsTo(UserModel);

ListModel.hasMany(TaskModel, {
  as: "tasks",
  foreignKey: "listId",
});
TaskModel.belongsTo(ListModel);

// UserModel.hasMany(TodoModel, {
//   as: "todoItems",
//   foreignKey: "ownerId",
// });
// TodoModel.belongsTo(UserModel);

UserModel.hasMany(HabitModel, {
  as: "habits",
  foreignKey: "ownerId"
})
HabitModel.belongsTo(UserModel);

UserModel.hasMany(NotebookModel, {
  as: "notebooks",
  foreignKey: "ownerId"
})
NotebookModel.belongsTo(UserModel);

NotebookModel.hasMany(PageModel, {
  as: "pages",
  foreignKey: "notebookId"
})
PageModel.belongsTo(NotebookModel);

UserModel.hasMany(DeckModel, {
  as: "decks",
  foreignKey: "ownerId"
})
DeckModel.belongsTo(UserModel);

DeckModel.hasMany(NoteCardModel, {
  as: "noteCards",
  foreignKey: "deckId"
})
NoteCardModel.belongsTo(DeckModel);

module.exports = {
  UserModel,
  CategoryModel,
  ListModel,
  TaskModel,
  DeckModel,
  IconModel,
  NotebookModel,
  NotebookCategoryModel,
  NoteCardModel,
  PageModel,
  HabitModel,
};
