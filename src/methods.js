const { buildPath, performRequest } = require('./methods/base');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('./methods/items');
const { createFile, getFiles, getFile, updateFile } = require('./methods/files');
const { getTables, getTable, createTable } = require('./methods/tables');
const { createPrivilege, getGroupPrivilege, getTablePrivilege, updatePrivilege } = require('./methods/privileges');
const { getPreference, updatePreference } = require('./methods/preferences');

module.exports = {
  buildPath,
  performRequest,

  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,

  createFile,
  getFiles,
  getFile,
  updateFile,

  getTables,
  getTable,
  createTable,

  createPrivilege,
  getGroupPrivilege,
  getTablePrivilege,
  updatePrivilege,

  getPreference,
  updatePreference
};
