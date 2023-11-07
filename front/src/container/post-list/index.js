import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";
import PostCreate from "../post-create";
import { useState, Fragment } from "react";
import { Alert, Sceleton, LOAD_STATUS } from "../../component/load";
import { getDate } from "../../container/util/getDate";

export default function Container() {
	const [status, setStatus] = useState(null);
	const [message, setMessage] = useState("");
	const [data, setData] = useState(null);

	const getData = async () => {
		setStatus(LOAD_STATUS.PROGRESS);
		try {
			const res = await fetch("http:localhost:4000/post-create",);
			const data = await res.json();
			if (res.ok) {
				setData(convertData(data));
				setStatus(LOAD_STATUS.SUCCESS);
			} else {
				setMessage(data.message);
				setStatus(LOAD_STATUS.ERROR);
			}
		} catch (error) {
			setMessage(error.message);
			setStatus(LOAD_STATUS.ERROR)
		}
	};
	const convertData = (raw) => ({
		list: raw.list.reverse().map(({ id, username, text, date }) => ({
			id,
			username,
			text,
			date: getDate(date),
		})),
		isEmpty: raw.list.length === 0,
	});
	return (
		<Grid>
			<Box>
				<Grid>
					<Title>Home</Title>
					<PostCreate
						onCreate={getData}
						placeholder="Waht is heppening ?!"
						button="Post"
					/>
				</Grid>
			</Box>
			{status === LOAD_STATUS.PROGRESS && (
				<Fragment>
					<Box>
						<Sceleton />
					</Box>
					<Box>
						<Sceleton />
					</Box>
				</Fragment>
			)}
			{status === LOAD_STATUS.ERROR && (
				<Alert status={status} message={message} />
			)}
		</Grid>
	);
}