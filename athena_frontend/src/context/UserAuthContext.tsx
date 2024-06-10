import React, { createContext, useContext, useEffect, useState } from "react";
import data from "@auth/firebase";
import {
  UserCredential,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useToast } from "@chakra-ui/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<UserCredential | null>;
  signInWithEmailAndPasswordFunc: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, fullName: string, password: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<UserContextState | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  const auth1 = data.auth;

  useEffect(() => {
    const unsubscribe = auth1.onAuthStateChanged((firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth1]);

  const signInWithGoogle = async (): Promise<UserCredential | null> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth1, provider);
      setUser(result.user);
      return result;
    } catch (error) {
      const authError = error as FirebaseError;
      toast({
        title: "Sign-In Error",
        description: authError.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return null;
    }
  };

  const signInWithEmailAndPasswordFunc = async (email: string, password: string): Promise<void> => {
    try {
      const result = await signInWithEmailAndPassword(auth1, email, password);
      setUser(result.user);
    } catch (error) {
      const authError = error as FirebaseError;
      toast({
        title: "Error",
        description: authError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const signUpWithEmail = async (email: string, fullName: string, password: string): Promise<void> => {
    try {
      const result = await createUserWithEmailAndPassword(auth1, email, password);
      await updateProfile(result.user, { displayName: `${fullName}` });
      await sendEmailVerification(result.user);
      toast({
        title: "Account created",
        description: "A verification email has been sent to your email address. Please verify your email before logging in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      const authError = error as FirebaseError;
      toast({
        title: "Error creating account",
        description: authError.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth1, email);
      toast({
        title: "Success",
        description: "Password reset email sent successfully. Check your inbox.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const authError = error as FirebaseError;
      toast({
        title: "Error",
        description: `Failed to send password reset email: ${authError.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sendPasswordResetEmailFunc = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth1, email);
      toast({
        title: "Success",
        description: "Password reset email sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const authError = error as FirebaseError;
      toast({
        title: "Error",
        description: authError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const contextValue = {
    isAuthenticated: !!user,
    isLoading,
    user,
    signInWithGoogle,
    signInWithEmailAndPasswordFunc,
    signUpWithEmail,
    sendPasswordResetEmail: sendPasswordResetEmailFunc,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
