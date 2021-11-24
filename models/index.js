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
  foreignKey: "userId",
});
ListModel.belongsTo(UserModel);

ListModel.hasMany(TaskModel, {
  as: "tasks",
  foreignKey: "listId",
});
TaskModel.belongsTo(ListModel);

UserModel.hasMany(TaskModel, {
  as: "tasks",
  foreignKey: "userId",
});
TaskModel.belongsTo(UserModel);

UserModel.hasMany(HabitModel, {
  as: "habits",
  foreignKey: "userId"
})
HabitModel.belongsTo(UserModel);

UserModel.hasMany(NotebookModel, {
  as: "notebooks",
  foreignKey: "userId"
})
NotebookModel.belongsTo(UserModel);

NotebookModel.hasMany(PageModel, {
  as: "pages",
  foreignKey: "notebookId"
})
PageModel.belongsTo(NotebookModel);

UserModel.hasMany(PageModel, {
  as: "pages",
  foreignKey: "userId"
})
PageModel.belongsTo(UserModel);

UserModel.hasMany(DeckModel, {
  as: "decks",
  foreignKey: "userId"
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
