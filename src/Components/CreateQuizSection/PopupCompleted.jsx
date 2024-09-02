import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Style from "../../Styles/CreateQuiz/popupCompleted.module.css";

const PopupCompleted = ({ url }) => {
	const onCopyFunc = () => {
		toast.success("Link copied to your clipboard");
	};
	return (
		<div className={Style.PopupContainer}>
			<Link to={"/dashboard"}>
				<RxCross2 className={Style.closeIcon} />
			</Link>
			<h1>Congrats your Quiz is Published!</h1>
			<div className={Style.urlDiv}>{url}</div>
			<CopyToClipboard text={url} onCopy={onCopyFunc}>
				<button>Share</button>
			</CopyToClipboard>
		</div>
	);
};
export default PopupCompleted;
