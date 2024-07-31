// utils/api.ts

// Mock functions for getting challenges and certificates
export const getChallengeById = async (id: string) => {
    // Replace with actual API call
    return { id, title: "Sample Challenge", description: "This is a sample challenge." };
  };
  
  export const getAllChallenges = async () => {
    // Replace with actual API call
    return [
      { id: "1", title: "Challenge 1", description: "This is challenge 1." },
      { id: "2", title: "Challenge 2", description: "This is challenge 2." },
    ];
  };
  
  export const getCertificateById = async (id: string) => {
    // Replace with actual API call
    return { id, title: "Sample Certificate", description: "This is a sample certificate." };
  };
  
  export const getAllCertificates = async () => {
    // Replace with actual API call
    return [
      { id: "1", title: "Certificate 1", description: "This is certificate 1." },
      { id: "2", title: "Certificate 2", description: "This is certificate 2." },
    ];
  };
  