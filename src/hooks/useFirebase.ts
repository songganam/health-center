// FB Collection 관리 : 폴더이름
// Collection 을 미리 안만들어도 됨.
// FB 연동시 성공/실패 관리
import { appFireStore, timeStamp } from '@/fb/fbconfig';
import {
  addDoc,
  collection,
  DocumentReference,
  FirestoreError,
} from 'firebase/firestore';
import { useReducer, Reducer } from 'react';

// 상태 interface 만들기
interface State {
  document: DocumentReference | null;
  isPending: boolean | false;
  error: string | null;
  success: boolean;
}
// 액션 type 만들기
type Action =
  | { type: 'isPending' }
  | { type: 'addDoc'; payload: DocumentReference }
  | { type: 'error'; payload: string };

// State 인터페이스 활용하기
const initState: State = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'addDoc':
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// transaction 은 collection 이름이다.
export const useFirebase = (transaction: string) => {
  const [rerponse, dispatch] = useReducer(storeReducer, initState);
  const colRef = collection(appFireStore, transaction);
  // 내용 등록 함수
  const addDocument = async (doc: any) => {
    console.log('문서추가 : ', doc);
    dispatch({ type: 'isPending' });
    try {
      const createdTime = timeStamp.fromDate(new Date());

      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: (error as FirestoreError).message });
    }
  };

  // Document (문서파일) 를 삭제한다.
  const deleteDocument = (id: string) => {};

  return { rerponse, addDocument, deleteDocument };
};
