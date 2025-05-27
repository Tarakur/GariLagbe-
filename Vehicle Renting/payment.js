// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    // Add your Firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to save payment data to Firestore
export async function savePaymentData(paymentData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated');
        }

        // Add user ID and timestamp to payment data
        const paymentWithMetadata = {
            ...paymentData,
            userId: user.uid,
            createdAt: serverTimestamp(),
            status: 'pending'
        };

        // Save to payments collection
        const docRef = await addDoc(collection(db, "payments"), paymentWithMetadata);
        return docRef.id;
    } catch (error) {
        console.error("Error saving payment data:", error);
        throw error;
    }
}

// Function to process payment
export async function processPayment(paymentData) {
    try {
        // Save payment data to database
        const paymentId = await savePaymentData(paymentData);
        
        // Here you would typically integrate with a payment gateway
        // For now, we'll just simulate a successful payment
        return {
            success: true,
            paymentId: paymentId,
            message: 'Payment processed successfully'
        };
    } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
    }
} 