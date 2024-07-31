// utils/auth.ts
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return token;
};

export const signUp = async (email: string, password: string) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
};
