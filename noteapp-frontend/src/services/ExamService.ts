import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Exam } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const uploadExam = async (exam: Omit<Exam, 'id'>, file: File) => {
  try {
    // PDF dosyasını Storage'a yükle
    const fileId = uuidv4();
    const fileRef = ref(storage, `exams/${fileId}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    // Exam verisini Firestore'a ekle
    const examData = {
      ...exam,
      fileUrl,
      uploadDate: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'exams'), examData);
    return { id: docRef.id, ...examData };
  } catch (error) {
    console.error('Exam upload error:', error);
    throw error;
  }
};

export const getExams = async (userId?: string) => {
  try {
    let q = collection(db, 'exams');
    
    if (userId) {
      q = query(q, where('authorId', '==', userId));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Exam[];
  } catch (error) {
    console.error('Get exams error:', error);
    throw error;
  }
};

export const updateExam = async (examId: string, updates: Partial<Exam>) => {
  try {
    const examRef = doc(db, 'exams', examId);
    await updateDoc(examRef, updates);
  } catch (error) {
    console.error('Update exam error:', error);
    throw error;
  }
};

export const deleteExam = async (examId: string) => {
  try {
    await deleteDoc(doc(db, 'exams', examId));
  } catch (error) {
    console.error('Delete exam error:', error);
    throw error;
  }
};