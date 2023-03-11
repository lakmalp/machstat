import DialogBox from "../../_components/dialog-box/dialog-box";
import { MessageBox, MessageBoxConstants } from "../../_components/message-box/message-box";

export default function NodeDialog() {
    return (
        <MessageBox button={MessageBoxConstants.Buttons.MB_Ok} message="The message" title="The title" type={MessageBoxConstants.Type.Warning}></MessageBox>
    )
}