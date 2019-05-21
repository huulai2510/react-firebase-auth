import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: "AIzaSyB6o7TITlB-hrUqDLT9XZtxlYR-lWQG4tA",
  authDomain: "laitodolist.firebaseapp.com",
  databaseURL: "https://laitodolist.firebaseio.com",
  projectId: "laitodolist",
  storageBucket: "laitodolist.appspot.com",
  messagingSenderId: "29392113509",
  appId: "1:29392113509:web:fda5e91774522a0b"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth()
    this.db = firebase.firestore()
  }

  login = (email, password) => {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout = () => {
		return this.auth.signOut()
	}

	 register = async (name, email, password) => {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	getCurrentUsername = () => {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}
}

export default new Firebase();