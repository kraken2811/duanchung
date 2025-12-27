import { Card } from "antd";
import GiaoDichNganHangView from "../component/bank_detail";

export default function BankView() {
    return (
        <div style={{ padding: 0 }}>

            <Card>
                <GiaoDichNganHangView />
            </Card>
        </div>
    );
}