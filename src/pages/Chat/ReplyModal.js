import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReplyModal(props) {
	const navigate = useNavigate();
	const actoken = localStorage.accessToken;
	const retoken = localStorage.refreshToken;

	const [replymsg, setReplyMsg] = useState();

	function closeModal() {
		props.closeModal();
	}
	function reply() {
		const dataToSend = {
			content: replymsg,
			receiveMember: props.senderNickname,
			postId: props.msgid,
		};
		console.log(replymsg);
		console.log(props.senderNickname);
		console.log(props.msgid);

		axios
			.post("/api/messages", dataToSend, {
				headers: { Authorization: `Bearer ${actoken}`, Auth: retoken },
			})
			.then((response) => {
				console.log("메세지 전송 성공: ", response);
				alert("메시지가 전송되었습니다");
				navigate(-1);
			})
			.catch((error) => {
				if (error.response.data.code == "511") {
					alert("로그인이 만료되어 로그인 페이지로 이동합니다");
					window.location.replace("/loginpage");
				}
				console.error("메세지 전송 실패:", error);
			});
	}
	return (
		<div className="Modal" onClick={closeModal}>
			<div className="modalBody" onClick={(e) => e.stopPropagation()}>
				<button id="modalCloseBtn" onClick={closeModal}>
					X
				</button>
				<div style={{ marginTop: "12px" }}>수신 : {props.senderNickname}</div>
				<textarea
					label="내용"
					multiline
					rows={10}
					onChange={(e) => {
						setReplyMsg(e.target.value);
					}}
				></textarea>
				<button onClick={reply} style={{ marginTop: "15px" }}>
					전송
				</button>
			</div>
		</div>
	);
}
