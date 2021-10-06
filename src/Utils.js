import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import TrackPlayer from "react-native-track-player";

//TODO: to remove all db passes
const db = firestore();
//check of employee has a borrowed book and return it, else return null
export const checkBorrowBookForEmployee = async (employee, db) => {
	let bookID = null;
	let author = null;
	let businessBookID = null;
	const employeeSnap = await db
		.doc(
			`businesses/${employee.businessID}/employees/${employee.employeeID}`
		)
		.get();

	if (employeeSnap.data().borrowedBook) {
		const businessBookSnap = await db
			.doc(
				`businesses/${employee.businessID}/businessBooks/${
					employeeSnap.data().borrowedBook
				}`
			)
			.get();
		bookID = businessBookSnap.data().books;
		author = businessBookSnap.data().author;
		businessBookID = businessBookSnap.id;
		return {
			bookID,
			author,
			businessBookID,
		};
	} else {
		return null;
	}
};

//check if the given businessbookid is the same as the borrowedBook and return true or false
export const isCurrentBorrowBook = async (employee, businessBookID, db) => {
	const employeeSnap = await db
		.doc(
			`businesses/${employee.businessID}/employees/${employee.employeeID}`
		)
		.get();

	if (employeeSnap.data().borrowedBook) {
		const businessBookSnap = await db
			.doc(
				`businesses/${employee.businessID}/businessBooks/${
					employeeSnap.data().borrowedBook
				}`
			)
			.get();

		if (businessBookSnap.id === businessBookID) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const saveUserLastPlay = async (
	uid,
	bookID,
	chapter,
	positionSeconds,
	db
) => {
	await db
		.collection("users")
		.doc(uid)
		.collection("savedBooksPosition")
		.doc(bookID)
		.set({
			chapter,
			positionSeconds,
		});
};

export const convertMinutesHours = (totalSeconds) => {
	let timeToDisplay = "";
	hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	minutes = Math.floor(totalSeconds / 60);
	seconds = totalSeconds % 60;

	if (hours > 0) {
		timeToDisplay += hours + ":";
	}

	if (minutes < 10) {
		timeToDisplay += "0" + minutes + ":";
	} else {
		timeToDisplay += minutes + ":";
	}

	if (seconds < 10) {
		timeToDisplay += "0" + seconds;
	} else {
		timeToDisplay += seconds;
	}

	return timeToDisplay;
};

//save the chapter that is playing to track progress on book lisenning
export const saveBookProgress = async (bookID) => {
	const userID = auth().currentUser.uid;
	const currentTrackIndex = await TrackPlayer.getCurrentTrack();
	const currentTrack = await TrackPlayer.getTrack(currentTrackIndex);
	const totalLenght = await TrackPlayer.getDuration();
	const currentPosition = await TrackPlayer.getPosition();
	let percent = Math.round((currentPosition / totalLenght) * 100);

	await db
		.collection("users")
		.doc(userID)
		.collection("booksProgress")
		.doc(bookID)
		.collection("chapters")
		.doc(currentTrack.id)
		.set({
			chapterName: currentTrack.id,
			totalLenght: totalLenght,
			secondsProgress: currentPosition,
			progress: percent,
			isComplete: percent > 75 ? true : false,
		});
};
