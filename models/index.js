const UserModel= require("./user"),
const CategoryModel= require("./category"),
const ListModel= require("./list"),
const TodoModel= require("./todo"),
const DeckModel= require("./deck"),
const IconModel= require("./icon"),
const NotebookModel= require("./notebook"),
const NotebookCategoryModel= require("./notebookCategory"),
const NoteCardModel= require("./noteCard"),
const PageModel= require("./page"),
const HabitModel= require("./habit")

UserModel.hasMany(ListModel, {
  as: "lists",
  foreignKey: "ownerId"
})
ListModel.belongsTo(UserModel);

ListModel.hasMany(TodoModel, {
  as: "todoItems",
  foreignKey: "listId"
})
TodoModel.belongsTo(ListModel);

UserModel.hasMany(TodoModel, {
  as: "todoItems",
  foreignKey: "ownerId"
})
TodoModel.belongsTo(UserModel);


module.exports = {
    UserModel: require("./user"),
    CategoryModel: require("./category"),
    ListModel: require("./list"),
    TodoModel: require("./todo"),
    DeckModel: require("./deck"),
    IconModel: require("./icon"),
    NotebookModel: require("./notebook"),
    NotebookCategoryModel: require("./notebookCategory"),
    NoteCardModel: require("./noteCard"),
    PageModel: require("./page"),
    HabitModel: require("./habit")
  };
  