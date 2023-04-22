import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { fbdb } from '../firebaseConfig';
const firestore = fbdb;

export const addData = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await setDoc(docRef, data);
    return { success: true, message: 'Data added successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error adding data.' };
  }
};

export const updateData = async (collectionName, docId, data) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await updateDoc(docRef, data);
    return { success: true, message: 'Data updated successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error updating data.' };
  }
};

export const deleteData = async (collectionName, docId) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, message: 'Data deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error deleting data.' };
  }
};

export const appendField = async (collectionName, documentId, field, value) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await updateDoc(docRef, {
      [field]: value,
    });
    return { success: true, message: 'Field appended successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error appending field.' };
  }
};

export const checkDocumentExists = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkFieldExists = async (
  collectionName,
  documentId,
  fieldName
) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return Object.prototype.hasOwnProperty.call(data, fieldName);
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
