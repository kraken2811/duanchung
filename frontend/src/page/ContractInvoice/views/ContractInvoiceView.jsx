import ContractInvoiceForm from "../components/ContractInvoiceForm";

export default function ContractInvoiceView() {
  return (
    // Set chiều cao 100% để Form bung hết màn hình, tạo cảm giác App Desktop
    <div style={{ height: "calc(100vh - 100px)", background: "#fff", border: "1px solid #d9d9d9" }}>
      <ContractInvoiceForm />
    </div>
  );
}