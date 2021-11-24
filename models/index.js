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

//! List and Task
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

//! Category for List, Task, Icon,and User
UserModel.hasMany(CategoryModel,{
  as: "list categories",
  foreignKey: 'userId'
})
CategoryModel.belongsTo(UserModel);

ListModel.hasOne(CategoryModel,{
  as: "category",
  foreignKey: 'categoryId'
})
CategoryModel.belongsTo(ListModel);

TaskModel.hasOne(CategoryModel,{
  as: "category",
  foreignKey: 'categoryId'
})
CategoryModel.belongsTo(TaskModel);

TaskModel.hasOne(CategoryModel,{
  as: "subCategory",
  foreignKey: 'subCategoryId'
})
CategoryModel.belongsTo(TaskModel);

CategoryModel.hasOne(IconModel, {
  as: "icon",
  foreignKey: 'iconId'
})
IconModel.belongsTo(CategoryModel);

//! Habit and Icon
UserModel.hasMany(HabitModel, {
  as: "habits",
  foreignKey: "userId"
})
HabitModel.belongsTo(UserModel);

HabitModel.hasOne(IconModel, {
  as: "icon",
  foreignKey: "iconId"
})
IconModel.belongsTo(HabitModel);

//! Notebook and Page
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

//! Deck and NoteCard
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
