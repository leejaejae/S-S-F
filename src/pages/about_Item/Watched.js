import { useEffect, useState } from "react";
import Posts from "./Posts";

//최근본상품 컴포넌트
export default function Watched(props) {
	//watched에 상품의 정보들이 담긴다.
	const [watched, setWatched] = useState();

	useEffect(() => {
		let localarray = localStorage.getItem("watched");
		//localStorage watche에 상품들의 id가 존재하면
		if (localarray.length > 0) {
			setWatched(null);
			localarray = JSON.parse(localarray);
			let copy = [];
			console.log(props.store);
			console.log(localarray);
			//해당 상품의 정보를 copy에 unshift로 앞에서 부터 넣는다.
			localarray.map((a, index) => {
				let itemindex = 0;
				if (index < 3) {
					//store에 50개의 데이터밖에 없어서 그 이상의 데이터가 들어오면 못 찾음.
					itemindex = props.store.findIndex((item) => Number(item.id) == Number(a));
					console.log(itemindex);
					console.log(props.store[itemindex]);
					//console.log(itemindex);
					//local저장소의 watch에는 unshift로 넣는게 맞는데 여기서는 push를 해주어야 앞의 값부터 나오기때문에.
					//copy.unshift(props.store[itemindex]);
					copy.push(props.store[itemindex]);
				}
			});
			//copy를 state 배열에 저장해준다.
			setWatched(copy);
		}
	}, []);

	//최근본상품은 3개의 상품만 보여주기 때문에 아래와 같이 설정.
	const currentPosts = () => {
		//페이지처음접속시 최근본 상품 목록이 3개미만일때
		if (watched.length < 3) {
			console.log(watched);
			return watched;
		}
		//3개이상일때 앞에서부터 3개짤라서 보여줌.
		else if (watched.length >= 3) {
			let currentPosts = 0;
			currentPosts = watched.slice(0, 3);
			console.log(currentPosts);
			return currentPosts;
		}
	};

	if (!watched) return null;

	console.log(watched);

	return (
		<div className="Item-Wrap">
			{/* currentPosts에 위의 watched에 담긴 상품들을 전달 */}
			{watched ? <Posts currentPosts={currentPosts()} watched={watched} setWatched={setWatched} /> : null}
		</div>
	);
}
