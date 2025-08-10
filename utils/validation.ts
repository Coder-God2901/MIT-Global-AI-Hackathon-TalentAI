import type { UserType, ViewType } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 50) {
    errors.push('Name must be less than 50 characters');
  } else if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUserType = (userType: string): ValidationResult => {
  const errors: string[] = [];
  const validUserTypes: UserType[] = ['candidate', 'recruiter'];
  
  if (!userType) {
    errors.push('User type is required');
  } else if (!validUserTypes.includes(userType as UserType)) {
    errors.push('Please select a valid user type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSignupData = (data: {
  email: string;
  name: string;
  userType: string;
}): ValidationResult => {
  const emailValidation = validateEmail(data.email);
  const nameValidation = validateName(data.name);
  const userTypeValidation = validateUserType(data.userType);

  const allErrors = [
    ...emailValidation.errors,
    ...nameValidation.errors,
    ...userTypeValidation.errors
  ];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const sanitizeUserData = (data: {
  email: string;
  name: string;
}) => {
  return {
    email: sanitizeInput(data.email).toLowerCase(),
    name: sanitizeInput(data.name)
  };
};