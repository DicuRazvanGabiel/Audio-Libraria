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
