import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;

    const client = {
      sandbox:
        "AVsx6PgGVnKSwIjrAj1gYzJtqM6JQA4-RTO-wetu9ErD8gjbdP-c0WU3TBHXYBecWuusYCSlJbnvLDz7",
      production: "YOUR-PRODUCTION-APP-ID",
    };
    return (
      <PaypalExpressBtn
        style={{
          size: "large",
          color: "blue",
          shape: "rect",
          label: "checkout",
        }}
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
