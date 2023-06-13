const fs = require('fs/promises');
const path = require('path');

const contactsFilePath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    console.log('Reading contacts file...');
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    console.log('File contents:', data);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts file:', error);
    throw new Error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw new Error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts));
    return contactId;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw new Error(error.message);
  }
};

const addContact = async (contact) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), ...contact };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw new Error(error.message);
  }
};

const updateContact = async (contactId, updatedData) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.map((item) => {
      if (item.id === contactId) {
        return { ...item, ...updatedData };
      }
      return item;
    });
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts));
    return updatedData;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
