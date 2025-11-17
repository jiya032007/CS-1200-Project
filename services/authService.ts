import { auth } from '@/config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential
} from 'firebase/auth';

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

export const signUp = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    // Return the specific error code to be handled by the UI
    return { success: false, error: error.code };
  }
};

export const signIn = async (email: string, password:string): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    // Return the specific error code to be handled by the UI
    return { success: false, error: error.code };
  }
};

export const resetPassword = async (email: string): Promise<ResetPasswordResult> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.code };
  }
};

export const logout = async (): Promise<ResetPasswordResult> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.code };
  }
};
